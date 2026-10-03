import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import { checkKeywordAnswer, checkWriting, countWords } from "../src/lib/checks.ts";
import { chinaDayKey, deadlineRemaining, deriveEvidence, getNewExpressions, getReviewQueue, makeInitialState, rateCard, recommendTask, reconcileLegacyIds } from "../src/lib/learning.ts";
import { appendLearningEvent, exportLearningData, getDraft, getLearningState, importLearningData, LEARNING_STORAGE_KEY, migrateLegacyData, saveState, snapshotDraft, upsertDraft, validateLearningState } from "../src/lib/storage.ts";

const at = "2026-10-03T12:00:00.000Z";
const now = new Date(at);
const question = { id: "q1", exam: "CET6", evaluation: false, legacyIds: ["legacy-q1"], wordRange: { min: 150, max: 200, excludeOpening: false }, promptMode: "topic" };
const event = (overrides = {}) => ({ id: "e1", contentId: "q1", taskId: "reasoning", skill: "reasoning", type: "practice", at,
  mode: "independent", outcome: "completed", evidence: "学生实际作答", hintUsed: false, ...overrides });
const draft = (overrides = {}) => ({ contentId: "q1", text: "My original paragraph.", versions: [], updatedAt: at,
  timer: { remainingSeconds: 1800, running: false }, ...overrides });
let memory;

beforeEach(() => {
  memory = new Map();
  globalThis.window = { localStorage: { getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) => memory.set(key, value), removeItem: (key) => memory.delete(key) }, dispatchEvent() {} };
});

test("Asia/Shanghai daily boundary is local midnight, not UTC", () => {
  assert.equal(chinaDayKey("2026-10-03T15:59:59Z"), "2026-10-03");
  assert.equal(chinaDayKey("2026-10-03T16:00:00Z"), "2026-10-04");
});

test("persisted deadline uses wall time and never returns negative", () => {
  assert.equal(deadlineRemaining("2026-10-03T12:30:00Z", now), 1800);
  assert.equal(deadlineRemaining("2026-10-03T12:30:00Z", new Date("2026-10-03T12:40:00Z")), 0);
  assert.equal(deadlineRemaining("invalid", now), 0);
});

test("keyword answers reject empty and short substrings but accept authored variants", () => {
  const variants = ["independent learning ability", "自主学习能力", "self-directed learning"];
  assert.equal(checkKeywordAnswer("   ", variants).status, "empty");
  assert.equal(checkKeywordAnswer("a", variants).status, "unrecognized");
  assert.equal(checkKeywordAnswer("banana", variants).status, "unrecognized");
  assert.equal(checkKeywordAnswer("Self-Directed Learning. ", variants).status, "accepted");
  assert.equal(checkKeywordAnswer("自主学习能力", variants).status, "accepted");
});

test("facts use each exam word range; no synthetic quality score", () => {
  const text = Array(125).fill("practice").join(" ");
  const four = checkWriting(text, { ...question, wordRange: { min: 120, max: 180, excludeOpening: false } });
  const six = checkWriting(text, question);
  assert.equal(four.checks.find((c) => c.key === "words").status, "pass");
  assert.equal(six.checks.find((c) => c.key === "words").status, "attention");
  assert.equal("score" in four, false);
});

test("provided opening is checked at the start and excluded only when matched", () => {
  const q = { ...question, promptMode: "given-opening", requiredOpening: "Learning matters for everyone.", wordRange: { min: 5, max: 8, excludeOpening: true } };
  const good = checkWriting("Learning matters for everyone.\n\nWe learn to solve real problems.", q);
  assert.equal(good.totalWordCount, 10);
  assert.equal(good.wordCount, 6);
  assert.equal(good.checks.find((c) => c.key === "opening").status, "pass");
  const late = checkWriting("We learn to solve real problems. Learning matters for everyone.", q);
  assert.equal(late.wordCount, 10);
  assert.equal(late.checks.find((c) => c.key === "opening").status, "attention");
});

test("repeated filler gives only a warning, not a passing content judgement", () => {
  const result = checkWriting(Array(160).fill("banana").join(" "), question);
  assert.ok(result.warnings.length > 0);
  assert.equal(result.checks.find((c) => c.key === "paragraphs").status, "info");
  assert.equal("score" in result, false);
  assert.equal(countWords("It's useful; well-being improves. 中文"), 4);
});

test("old and self-rated records cannot create independent recall evidence", () => {
  const evidence = deriveEvidence([event({ type: "legacy", outcome: "recalled" }), event({ id: "e2", type: "review", outcome: "self-reviewed" })]);
  assert.equal(evidence.reasoning.independentRecallCount, 0);
  assert.equal(evidence.reasoning.practiceCount, 1);
  assert.equal(evidence.reasoning.selfReviewCount, 1);
  assert.notEqual(evidence.reasoning.label, "已掌握");
});

test("hinted and guided recalled events are not counted as independent retrieval", () => {
  const evidence = deriveEvidence([event({ id: "a", outcome: "recalled", hintUsed: true }), event({ id: "b", outcome: "recalled", mode: "guided" }), event({ id: "c", outcome: "recalled" })]);
  assert.equal(evidence.reasoning.independentRecallCount, 1);
});

test("new cards are separate from due reviews; queue drops rated cards immediately", () => {
  const expressions = [{ id: "x1" }, { id: "x2" }, { id: "x1" }];
  let state = makeInitialState();
  assert.deepEqual(getReviewQueue(expressions, state, now), []);
  assert.equal(getNewExpressions(expressions, state).length, 2);
  state = rateCard(state, "x1", "again", now);
  assert.equal(getReviewQueue(expressions, state, now).length, 0);
  assert.equal(getReviewQueue(expressions, state, new Date(now.getTime() + 300000)).length, 1);
  state = rateCard(state, "x1", "good", new Date(now.getTime() + 300000));
  assert.equal(getReviewQueue(expressions, state, new Date(now.getTime() + 300000)).length, 0);
});

test("review intervals respond to history and preserve events for every day", () => {
  let state = rateCard(makeInitialState(), "x1", "good", now);
  const first = state.reviews.x1.intervalDays;
  state = rateCard(state, "x1", "good", new Date(now.getTime() + 86400000));
  assert.ok(state.reviews.x1.intervalDays > first);
  assert.equal(state.events.length, 2);
  assert.equal(new Set(state.events.map((e) => chinaDayKey(e.at))).size, 2);
  const evidence = deriveEvidence(state.events);
  assert.equal(evidence.language.independentRecallCount, 0);
  state = rateCard(state, "x1", "again", now);
  assert.equal(state.reviews.x1.intervalDays, 5 / 1440);
});

test("insufficient records are explicitly self-selected; assessments excluded", () => {
  const state = makeInitialState();
  const result = recommendTask([{ ...question, id: "held-out", evaluation: true }, question], state, now);
  assert.equal(result.questionId, "q1");
  assert.match(result.reason, /自选/);
});

test("recent assistance changes recommendation; distant errors do not", () => {
  const state = makeInitialState();
  state.profile.focus = "language";
  state.events = [event({ id: "a", outcome: "assisted" }), event({ id: "b", outcome: "again" }), event({ id: "c" })];
  assert.equal(recommendTask([question], state, now).skill, "reasoning");
  state.events = state.events.map((e) => ({ ...e, at: "2025-01-01T00:00:00Z" }));
  assert.equal(recommendTask([question], state, now).skill, "language");
});

test("an unfinished revision is recommended before more full essays", () => {
  const state = makeInitialState();
  state.drafts.q1 = snapshotDraft(draft(), "original", "", now);
  assert.equal(recommendTask([question], state, now).kind, "revision");
});

test("snapshots require text, preserve original, and allow separate revision", () => {
  assert.throws(() => snapshotDraft(draft({ text: " " }), "original"));
  assert.throws(() => snapshotDraft(draft(), "revision"));
  let d = snapshotDraft(draft(), "original", "", now);
  assert.throws(() => snapshotDraft(d, "original"));
  d = snapshotDraft({ ...d, text: "My revised paragraph." }, "revision", "添加具体机制", now);
  assert.equal(d.versions[0].text, "My original paragraph.");
  assert.equal(d.versions[1].kind, "revision");
});

test("autosave restores current text and cannot delete or overwrite saved originals", () => {
  const original = snapshotDraft(draft(), "original", "", now);
  upsertDraft(original);
  upsertDraft({ ...original, text: "Edited but not yet submitted.", versions: [{ ...original.versions[0], text: "tampered original" }] });
  const restored = getDraft("q1");
  assert.equal(restored.text, "Edited but not yet submitted.");
  assert.equal(restored.versions[0].text, "My original paragraph.");
  upsertDraft({ ...original, versions: [] });
  assert.equal(getDraft("q1").versions.length, 1);
});

test("learning events are idempotent across repeated calls", () => {
  appendLearningEvent(event());
  appendLearningEvent(event());
  assert.equal(getLearningState().events.length, 1);
});

test("validated v2 backups round-trip drafts, snapshots, profile, and review events", () => {
  let state = rateCard(makeInitialState(), "x1", "easy", now);
  state.drafts.q1 = snapshotDraft(draft(), "original", "", now);
  saveState(state);
  const exported = exportLearningData();
  saveState(makeInitialState());
  assert.equal(importLearningData(exported).ok, true);
  assert.deepEqual(getLearningState(), state);
});

test("malformed, unknown-version, and arbitrary-key imports do not overwrite data", () => {
  const state = makeInitialState();
  state.events = [event()];
  saveState(state);
  const before = memory.get(LEARNING_STORAGE_KEY);
  for (const value of ["{", '{"evil":"x"}', JSON.stringify({ format: "cet-writing-reflex", schemaVersion: 3, state }),
    JSON.stringify({ format: "cet-writing-reflex", schemaVersion: 2, exportedAt: at, state: { ...state, profile: { ...state.profile, minutesPerDay: -1 } } })]) {
    assert.equal(importLearningData(value).ok, false);
    assert.equal(memory.get(LEARNING_STORAGE_KEY), before);
  }
});

test("unsafe record keys and running timers without deadlines are rejected", () => {
  const state = makeInitialState();
  state.drafts.q1 = draft({ timer: { remainingSeconds: 1800, running: true } });
  assert.throws(() => validateLearningState(state));
  const unsafe = JSON.parse(JSON.stringify(makeInitialState()));
  unsafe.drafts = JSON.parse('{"__proto__":{}}');
  assert.throws(() => validateLearningState(unsafe));
});

test("failed storage writes cannot claim successful import", () => {
  const backup = exportLearningData();
  window.localStorage.setItem = () => { throw new Error("quota"); };
  assert.equal(importLearningData(backup).ok, false);
  assert.throws(() => saveState(makeInitialState()), /无法保存/);
});

test("corrupt local records are exported for recovery and protected from ordinary save", () => {
  memory.set(LEARNING_STORAGE_KEY, "corrupt-data");
  getLearningState();
  assert.throws(() => saveState(makeInitialState()), /现有数据损坏/);
  assert.equal(memory.get(LEARNING_STORAGE_KEY), "corrupt-data");
  const recovery = JSON.parse(exportLearningData());
  assert.equal(recovery.raw, "corrupt-data");
  assert.equal(importLearningData(JSON.stringify({ format: "cet-writing-reflex", schemaVersion: 2, exportedAt: at, state: makeInitialState() })).ok, true);
});

test("legacy histories retain all manuscripts but neither false scores nor mastery", () => {
  const legacy = { cet6_training_records: [{ id: "old", questionId: "legacy-q1", type: "keyword_extraction", keywordCorrect: true, completedAt: at }],
    cet6_writing_drafts: [{ questionId: "legacy-q1", essay: "Old original.", startedAt: at, score: 100 },
      { questionId: "legacy-q1", essay: "Old later manuscript.", submittedAt: "2026-10-04T00:00:00Z", score: 100 }],
    cet6_card_progress: { "card-old-0": { rating: "easy", lastReviewedAt: at } }, cet6_progress: { "legacy-q1": { status: "mastered" } } };
  const migrated = migrateLegacyData(legacy);
  assert.equal(migrated.drafts["legacy-q1"].versions.length, 2);
  assert.ok(migrated.drafts["legacy-q1"].versions.every((v) => v.kind === "original"));
  assert.equal(migrated.drafts["legacy-q1"].text, "Old later manuscript.");
  assert.equal("score" in migrated.drafts["legacy-q1"], false);
  assert.deepEqual(migrated.reviews, {});
  assert.equal(deriveEvidence(migrated.events).task.practiceCount, 0);
  const mapped = reconcileLegacyIds(migrated, [question]);
  assert.ok(mapped.drafts.q1);
  assert.equal(mapped.drafts["legacy-q1"], undefined);
  assert.equal(importLearningData(JSON.stringify(legacy)).ok, true);
});

test("first load migrates legacy storage without removing the source backup", () => {
  const old = JSON.stringify([{ questionId: "legacy-q1", essay: "Retained manuscript.", startedAt: at }]);
  memory.set("cet6_writing_drafts", old);
  const state = getLearningState();
  assert.equal(state.migratedLegacy, true);
  assert.ok(memory.get(LEARNING_STORAGE_KEY));
  assert.equal(memory.get("cet6_writing_drafts"), old);
});

test("unfinished exercise text and revision reflection survive backup and refresh without activity inflation", () => {
  const state = makeInitialState();
  state.exerciseDrafts = { "q1:reason": { text: "A reason still being developed.", updatedAt: at }, "q1:reflection": { text: "添加因果解释", updatedAt: at } };
  saveState(state);
  assert.equal(getLearningState().exerciseDrafts["q1:reason"].text, "A reason still being developed.");
  assert.equal(getLearningState().events.length, 0);
  const backup = exportLearningData();
  saveState(makeInitialState());
  assert.equal(importLearningData(backup).ok, true);
  assert.equal(getLearningState().exerciseDrafts["q1:reflection"].text, "添加因果解释");
});

test("older v2 backup without exercise drafts remains compatible", () => {
  const state = makeInitialState();
  delete state.exerciseDrafts;
  const validated = validateLearningState(state);
  assert.deepEqual(validated.exerciseDrafts, {});
  assert.equal(importLearningData(JSON.stringify({ format: "cet-writing-reflex", schemaVersion: 2, exportedAt: at, state })).ok, true);
});

test("a valid in-memory draft exports even when browser storage cannot write", () => {
  const state = makeInitialState();
  state.drafts.q1 = draft({ text: "A draft retained in memory after a failed write." });
  window.localStorage.setItem = () => { throw new Error("quota"); };
  assert.throws(() => saveState(state));
  const backup = JSON.parse(exportLearningData(state));
  assert.equal(backup.format, "cet-writing-reflex");
  assert.equal(backup.state.drafts.q1.text, state.drafts.q1.text);
  assert.equal(backup.state.version, 2);
});

test("memory export preserves corrupt disk text separately while allowing normal restoration", () => {
  memory.set(LEARNING_STORAGE_KEY, "broken-old-data");
  const state = makeInitialState();
  state.drafts.q1 = draft({ text: "Recovered in-memory work." });
  const exported = exportLearningData(state);
  const backup = JSON.parse(exported);
  assert.equal(backup.recoveryRaw, "broken-old-data");
  assert.equal(importLearningData(exported).ok, true);
  assert.equal(getDraft("q1").text, "Recovered in-memory work.");
});

test("other-exam and held-out records cannot change the current study recommendation", () => {
  const state = makeInitialState();
  state.profile.exam = "CET6";
  state.profile.focus = "language";
  state.events = [
    event({ id: "cet4-1", contentId: "q4", outcome: "assisted" }),
    event({ id: "cet4-2", contentId: "q4", outcome: "again" }),
    event({ id: "cet4-3", contentId: "q4", outcome: "assisted" }),
    event({ id: "eval-1", contentId: "q6-eval", outcome: "assisted" }),
    event({ id: "eval-2", contentId: "q6-eval", outcome: "again" }),
    event({ id: "eval-3", contentId: "q6-eval", outcome: "assisted" }),
  ];
  const result = recommendTask([question, { ...question, id: "q4", exam: "CET4" }, { ...question, id: "q6-eval", evaluation: true }], state, now);
  assert.equal(result.questionId, "q1");
  assert.equal(result.skill, "language");
  assert.match(result.reason, /记录还不足/);
});
