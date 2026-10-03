import test from "node:test";
import assert from "node:assert/strict";
import { makeInitialState, rateCard } from "../src/lib/learning.ts";
import { validateLearningState } from "../src/lib/storage.ts";
import { KNOWLEDGE_SESSION_KEY, advanceKnowledgeSession, buildKnowledgeSession, filterKnowledgeUnits,
  knowledgeCardId, knowledgeDueUnits, readKnowledgeSession } from "../src/lib/knowledge-learning.ts";

const now = new Date("2026-10-03T12:00:00.000Z");
const unit = (id, overrides = {}) => ({ id, title: "针对性反馈", category: "function", core: true, exam: "both",
  themeIds: ["learning"], functionIds: ["explain"], meaning: "反馈帮助查找学习问题", form: "ask for targeted feedback",
  usage: "用于请求具体帮助", boundary: "feedback 是不可数名词", example: "Ask for feedback on your reasoning.",
  recall: { prompt: "寻求具体反馈怎么表达？", reference: "ask for targeted feedback", note: "for 后接名词" },
  application: { prompt: "给学习伙伴提一个建议", reference: "Ask for feedback after explaining your answer.", criteria: ["说明反馈对象"] },
  contrast: { wrong: "many feedbacks", better: "useful feedback", reason: "不能加复数s" },
  relatedQuestionIds: [], relatedExpressionIds: [], sourceIds: [], ...overrides });

const saveSession = (state, session) => ({ ...state, exerciseDrafts: { ...state.exerciseDrafts,
  [KNOWLEDGE_SESSION_KEY]: { text: JSON.stringify(session), updatedAt: now.toISOString() } } });

test("knowledge review IDs cannot collide with original expression IDs", () => {
  assert.equal(knowledgeCardId("feedback"), "knowledge:feedback");
  const state = rateCard(makeInitialState(), "feedback", "again", new Date(now.getTime() - 600000));
  assert.deepEqual(knowledgeDueUnits([unit("feedback")], state, now), []);
});

test("filters use exact tags, exam compatibility and all requested search terms", () => {
  const units = [unit("both"), unit("four", { exam: "CET4", core: false, themeIds: ["learning-advanced"] }),
    unit("six", { exam: "CET6", category: "grammar", functionIds: ["compare"] })];
  assert.deepEqual(filterKnowledgeUnits(units, { exam: "CET6", themeId: "learning", functionId: "explain", coreOnly: true }).map((x) => x.id), ["both"]);
  assert.deepEqual(filterKnowledgeUnits(units, { exam: "all", themeId: "learn" }), []);
  assert.deepEqual(filterKnowledgeUnits(units, { exam: "all", functionId: "expl" }), []);
  assert.deepEqual(filterKnowledgeUnits(units, { exam: "CET6", category: "grammar" }).map((x) => x.id), ["six"]);
  assert.equal(filterKnowledgeUnits(units, { exam: "all", search: "  ＦＥＥＤＢＡＣＫ   不可数  " }).length, 3);
  assert.equal(filterKnowledgeUnits(units, { exam: "all", search: "feedback missing-text" }).length, 0);
});

test("unpractised and future cards are not due; due units are oldest first and deduplicated", () => {
  let state = makeInitialState();
  state = rateCard(state, knowledgeCardId("later"), "again", new Date(now.getTime() - 600000));
  state = rateCard(state, knowledgeCardId("older"), "again", new Date(now.getTime() - 900000));
  state = rateCard(state, knowledgeCardId("future"), "good", now);
  state.reviews[knowledgeCardId("never")] = { ...state.reviews[knowledgeCardId("older")], cardId: knowledgeCardId("never"), reviewCount: 0 };
  assert.deepEqual(knowledgeDueUnits([unit("new"), unit("future"), unit("later"), unit("older"), unit("older"), unit("never")], state, now).map((x) => x.id), ["older", "later"]);
});

test("default sessions stay short, prioritise due cards and mix categories or themes within that priority", () => {
  const units = [unit("new"), unit("first"), unit("same"), unit("different", { category: "grammar", themeIds: ["community"] })];
  let state = makeInitialState();
  for (const id of ["first", "same", "different"]) state = rateCard(state, knowledgeCardId(id), "again", new Date(now.getTime() - 600000));
  assert.deepEqual(buildKnowledgeSession(units, state, { now }).unitIds, ["first", "different"]);
  const oneDue = rateCard(makeInitialState(), knowledgeCardId("first"), "again", new Date(now.getTime() - 600000));
  assert.deepEqual(buildKnowledgeSession(units, oneDue, { now }).unitIds, ["first", "different"]);
  assert.deepEqual(buildKnowledgeSession(units, makeInitialState(), { now }).unitIds, ["new", "different"]);
});

test("completed future cards are not repeated to fill a session; an exhausted queue is empty", () => {
  const units = [unit("a"), unit("b")];
  let state = makeInitialState();
  state = rateCard(state, knowledgeCardId("a"), "good", now);
  assert.deepEqual(buildKnowledgeSession(units, state, { now }).unitIds, ["b"]);
  state = rateCard(state, knowledgeCardId("b"), "good", now);
  const empty = buildKnowledgeSession(units, state, { now });
  assert.deepEqual(empty.unitIds, []);
  assert.equal(empty.cursor, 0);
  assert.deepEqual(empty.completedIds, []);
});

test("explicit one-card selection permits a revisit without ignoring explicitly requested filters", () => {
  const units = [unit("four", { exam: "CET4" }), unit("six", { exam: "CET6", themeIds: ["community"] })];
  const state = rateCard(makeInitialState(), knowledgeCardId("four"), "good", now);
  assert.deepEqual(buildKnowledgeSession(units, state, { now, unitId: "four" }).unitIds, ["four"]);
  assert.deepEqual(buildKnowledgeSession(units, state, { now, unitId: "four", exam: "CET6" }).unitIds, []);
  assert.deepEqual(buildKnowledgeSession(units, state, { now, unitId: "missing" }).unitIds, []);
  assert.deepEqual(buildKnowledgeSession(units, state, { now, themeId: "community" }).unitIds, ["six"]);
});

test("a partly answered session survives serialisation, normal state validation and refresh", () => {
  const session = { ...buildKnowledgeSession([unit("a"), unit("b")], makeInitialState(), { now }),
    step: "apply", recallText: "Ask for targeted feedback.", applyText: "A new sentence still being written.", revealed: true, missed: false };
  const saved = saveSession(makeInitialState(), session);
  const restored = readKnowledgeSession(validateLearningState(JSON.parse(JSON.stringify(saved))), new Set(["a", "b"]));
  assert.deepEqual(restored, session);
  assert.notEqual(restored.unitIds, session.unitIds);
  assert.equal(saved.events.length, 0);
  assert.deepEqual(saved.reviews, {});
});

test("unfinished session answers do not expire merely because the learner returned much later", () => {
  const session = { ...buildKnowledgeSession([unit("a")], makeInitialState(), { now: new Date("2025-01-01T00:00:00Z") }), recallText: "My saved answer." };
  assert.deepEqual(readKnowledgeSession(saveSession(makeInitialState(), session), ["a"]), session);
});

test("each answer respects the UI's 4000-character limit, including JSON escaping during restoration", () => {
  const state = makeInitialState();
  const valid = { ...buildKnowledgeSession([unit("a")], state, { now }), step: "apply", recallText: "\"\\".repeat(2000), applyText: "\n".repeat(4000) };
  const saved = saveSession(state, valid);
  assert.ok(saved.exerciseDrafts[KNOWLEDGE_SESSION_KEY].text.length < 20000);
  assert.deepEqual(readKnowledgeSession(validateLearningState(JSON.parse(JSON.stringify(saved))), ["a"]), valid);
  for (const changes of [{ recallText: "x".repeat(4001) }, { applyText: "x".repeat(4001) }]) {
    assert.equal(readKnowledgeSession(saveSession(state, { ...valid, ...changes }), ["a"]), undefined);
  }
});

test("unfinished recall cannot contain application text from another stage", () => {
  const state = makeInitialState();
  const session = { ...buildKnowledgeSession([unit("a")], state, { now }), recallText: "My recall", applyText: "An application in the wrong stage" };
  assert.equal(readKnowledgeSession(saveSession(state, session), ["a"]), undefined);
});

test("a newly entered application stage preserves prior recall while hiding its own reference", () => {
  const state = makeInitialState();
  const session = { ...buildKnowledgeSession([unit("a")], state, { now }), step: "apply", recallText: "My earlier recall", revealed: false, missed: true };
  assert.deepEqual(readKnowledgeSession(saveSession(state, session), ["a"]), session);
});

test("prepared conditions only follow explicitly selected units and survive refresh and advancing", () => {
  const state = makeInitialState();
  const session = buildKnowledgeSession([unit("a"), unit("b")], state, { now, preparedUnitIds: ["b", "b", "not-selected"] });
  assert.deepEqual(session.preparedIds, ["b"]);
  assert.deepEqual(readKnowledgeSession(saveSession(state, session), ["a", "b"]), session);
  const next = advanceKnowledgeSession(session);
  assert.deepEqual(next.preparedIds, ["b"]);
  assert.notEqual(next.preparedIds, session.preparedIds);
  assert.deepEqual(session.preparedIds, ["b"]);
  assert.deepEqual(advanceKnowledgeSession(next).preparedIds, ["b"]);
  const single = buildKnowledgeSession([unit("a"), unit("b")], state, { now, unitId: "a", preparedUnitIds: ["b"] });
  assert.deepEqual(single.preparedIds, []);
});

test("old sessions without prepared conditions remain compatible with an explicit empty default", () => {
  const state = makeInitialState();
  const session = buildKnowledgeSession([unit("a")], state, { now });
  const legacy = { ...session };
  delete legacy.preparedIds;
  assert.deepEqual(readKnowledgeSession(saveSession(state, legacy), ["a"]), session);
  assert.deepEqual(advanceKnowledgeSession(legacy).preparedIds, []);
});

test("session restore rejects non-array, unknown, duplicate or non-string prepared IDs", () => {
  const state = makeInitialState();
  const session = buildKnowledgeSession([unit("a")], state, { now });
  for (const preparedIds of [null, "a", {}, ["b"], ["a", "a"], [1], ["a", null]]) {
    assert.equal(readKnowledgeSession(saveSession(state, { ...session, preparedIds }), ["a", "b"]), undefined);
  }
});

test("missing, malformed and removed-unit sessions are rejected without throwing", () => {
  const state = makeInitialState();
  assert.equal(readKnowledgeSession(state, ["a"]), undefined);
  const valid = buildKnowledgeSession([unit("a"), unit("b")], state, { now });
  assert.equal(readKnowledgeSession(saveSession(state, valid), ["a"]), undefined);
  for (const raw of ["{", "null", "[]", "{}", "x".repeat(20001)]) {
    const invalid = { ...state, exerciseDrafts: { [KNOWLEDGE_SESSION_KEY]: { text: raw, updatedAt: now.toISOString() } } };
    assert.doesNotThrow(() => readKnowledgeSession(invalid, ["a", "b"]));
    assert.equal(readKnowledgeSession(invalid, ["a", "b"]), undefined);
  }
});

test("session restore rejects forged cursors, completion, types and excessive queues", () => {
  const state = makeInitialState();
  const valid = buildKnowledgeSession([unit("a"), unit("b")], state, { now });
  const invalidChanges = [{ cursor: -1 }, { cursor: 3 }, { cursor: 0.5 }, { cursor: 1, completedIds: [] },
    { cursor: 1, completedIds: ["b"] }, { completedIds: ["a"] }, { step: "mastered" }, { revealed: "true" },
    { missed: 1 }, { recallText: {} }, { applyText: [] }, { startedAt: "invalid" },
    { unitIds: ["a", "a"] }, { unitIds: ["a", "b", "c"] },
    { cursor: 2, completedIds: ["a", "b"], applyText: "Unfinished text incorrectly marked complete." }];
  for (const changes of invalidChanges) {
    assert.equal(readKnowledgeSession(saveSession(state, { ...valid, ...changes }), ["a", "b", "c"]), undefined, JSON.stringify(changes));
  }
});

test("advancing clears per-card answers, preserves completed IDs and is idempotent after the end", () => {
  const original = { ...buildKnowledgeSession([unit("a"), unit("b")], makeInitialState(), { now }),
    step: "apply", recallText: "first recall", applyText: "first application", revealed: true, missed: true };
  const before = structuredClone(original);
  const next = advanceKnowledgeSession(original);
  assert.equal(next.cursor, 1);
  assert.equal(next.step, "recall");
  assert.equal(next.recallText, "");
  assert.equal(next.applyText, "");
  assert.equal(next.revealed, false);
  assert.equal(next.missed, false);
  assert.deepEqual(next.completedIds, ["a"]);
  assert.deepEqual(original, before);
  const done = advanceKnowledgeSession(next);
  assert.equal(done.cursor, 2);
  assert.deepEqual(done.completedIds, ["a", "b"]);
  assert.deepEqual(advanceKnowledgeSession(done), done);
  assert.deepEqual(readKnowledgeSession(saveSession(makeInitialState(), done), ["a", "b"]), done);
});

test("planning and filtering never mutate source state, content or produce objective mastery", () => {
  const units = [unit("a"), unit("b", { category: "grammar" })];
  const state = rateCard(makeInitialState(), knowledgeCardId("b"), "again", new Date(now.getTime() - 600000));
  const originals = structuredClone({ state, units });
  filterKnowledgeUnits(units, { exam: "CET6", search: "feedback" });
  knowledgeDueUnits(units, state, now);
  const session = buildKnowledgeSession(units, state, { now });
  advanceKnowledgeSession(session);
  assert.deepEqual({ state, units }, originals);
  assert.equal(state.events.length, 1);
  assert.equal(state.events[0].outcome, "again");
  assert.equal("mastered" in session, false);
});
