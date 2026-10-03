import type { CardRating, DraftVersion, LearningEvent, LearningState, WritingDraft } from "../types/learning.ts";
import { createId, makeInitialState, SKILLS } from "./learning.ts";

export const LEARNING_STORAGE_KEY = "cet_writing_reflex_v2";
const FORMAT = "cet-writing-reflex";
const LEGACY_KEYS = ["cet6_progress", "cet6_card_progress", "cet6_training_records", "cet6_writing_drafts", "cet6_favorites", "cet6_plan_progress", "cet6_settings", "cet6_onboarding"];
let storageWarning: string | undefined;

export function getStorageWarning(): string | undefined { return storageWarning; }

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("记录格式不正确");
  return value as Record<string, unknown>;
}
function string(value: unknown, max = 20000): string {
  if (typeof value !== "string" || value.length > max) throw new Error("文本格式或长度不正确");
  return value;
}
function id(value: unknown): string {
  const result = string(value, 300);
  if (!result.trim() || ["__proto__", "constructor", "prototype"].includes(result)) throw new Error("记录 ID 不正确");
  return result;
}
function bool(value: unknown): boolean {
  if (typeof value !== "boolean") throw new Error("布尔值格式不正确");
  return value;
}
function number(value: unknown, min = 0, max = 1000000): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) throw new Error("数值格式不正确");
  return value;
}
function choice<T extends string>(value: unknown, allowed: readonly T[]): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) throw new Error("记录类别不正确");
  return value as T;
}
function date(value: unknown): string {
  const result = string(value, 60);
  if (!/^\d{4}-\d{2}-\d{2}T.+(?:Z|[+-]\d{2}:\d{2})$/.test(result) || !Number.isFinite(Date.parse(result))) throw new Error("记录日期不正确");
  return result;
}
function array(value: unknown, max = 100000): unknown[] {
  if (!Array.isArray(value) || value.length > max) throw new Error("列表格式或长度不正确");
  return value;
}

function validateEvent(value: unknown): LearningEvent {
  const e = object(value);
  return { id: id(e.id), contentId: id(e.contentId), taskId: id(e.taskId), skill: choice(e.skill, SKILLS),
    type: choice(e.type, ["practice", "revision", "review", "assessment", "read", "self-check", "legacy"] as const), at: date(e.at),
    mode: choice(e.mode, ["guided", "independent", "assessment"] as const),
    outcome: choice(e.outcome, ["completed", "recalled", "assisted", "again", "unrecognized", "self-reviewed"] as const),
    evidence: string(e.evidence), hintUsed: bool(e.hintUsed),
    ...(e.durationSeconds === undefined ? {} : { durationSeconds: number(e.durationSeconds, 0, 604800) }) };
}

function validateDraft(value: unknown): WritingDraft {
  const d = object(value), timer = object(d.timer);
  const versions: DraftVersion[] = array(d.versions, 500).map((value) => {
    const v = object(value);
    return { id: id(v.id), text: string(v.text, 100000), at: date(v.at), kind: choice(v.kind, ["original", "revision"] as const), reflection: string(v.reflection) };
  });
  if (new Set(versions.map((v) => v.id)).size !== versions.length) throw new Error("作文版本 ID 重复");
  if (timer.running === true && timer.deadline === undefined) throw new Error("正在计时的作文缺少截止时间");
  return { contentId: id(d.contentId), text: string(d.text, 100000), versions, updatedAt: date(d.updatedAt),
    timer: { remainingSeconds: number(timer.remainingSeconds, 0, 86400), running: bool(timer.running),
      ...(timer.deadline === undefined ? {} : { deadline: date(timer.deadline) }) } };
}

/** Validate and copy only known fields before any imported data reaches application state. */
export function validateLearningState(value: unknown): LearningState {
  const s = object(value);
  if (s.version !== 2) throw new Error("不支持这个数据版本");
  const p = object(s.profile);
  let examDate: string | undefined;
  if (p.examDate !== undefined) {
    examDate = string(p.examDate, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(examDate) || new Date(`${examDate}T00:00:00Z`).toISOString().slice(0, 10) !== examDate) throw new Error("考试日期不正确");
  }
  const events = array(s.events).map(validateEvent);
  if (new Set(events.map((e) => e.id)).size !== events.length) throw new Error("学习事件 ID 重复");
  const exerciseDrafts: NonNullable<LearningState["exerciseDrafts"]> = {};
  const rawExercises = s.exerciseDrafts === undefined ? {} : object(s.exerciseDrafts);
  if (Object.keys(rawExercises).length > 20000) throw new Error("练习草稿记录过多");
  for (const [key, value] of Object.entries(rawExercises)) {
    const d = object(value);
    exerciseDrafts[id(key)] = { text: string(d.text, 20000), updatedAt: date(d.updatedAt) };
  }
  const drafts: LearningState["drafts"] = {};
  const rawDrafts = object(s.drafts);
  if (Object.keys(rawDrafts).length > 2000) throw new Error("作文记录过多");
  for (const [key, value] of Object.entries(rawDrafts)) {
    const draft = validateDraft(value);
    if (id(key) !== draft.contentId) throw new Error("作文 ID 不一致");
    drafts[key] = draft;
  }
  const reviews: LearningState["reviews"] = {};
  const rawReviews = object(s.reviews);
  if (Object.keys(rawReviews).length > 20000) throw new Error("卡片记录过多");
  for (const [key, value] of Object.entries(rawReviews)) {
    const r = object(value);
    if (id(key) !== id(r.cardId)) throw new Error("卡片 ID 不一致");
    reviews[key] = { cardId: key, dueAt: date(r.dueAt), intervalDays: number(r.intervalDays, 0, 3650),
      reviewCount: number(r.reviewCount), successCount: number(r.successCount), lastRating: choice<CardRating>(r.lastRating, ["again", "hard", "good", "easy"]),
      ...(r.lastReviewedAt === undefined ? {} : { lastReviewedAt: date(r.lastReviewedAt) }) };
    if (reviews[key].successCount > reviews[key].reviewCount) throw new Error("卡片次数不一致");
  }
  return { version: 2, profile: { exam: choice(p.exam, ["CET4", "CET6"] as const), minutesPerDay: number(p.minutesPerDay, 5, 240),
    focus: choice(p.focus, SKILLS), onboardingComplete: bool(p.onboardingComplete), ...(examDate ? { examDate } : {}) },
    events, drafts, reviews, favorites: [...new Set(array(s.favorites, 20000).map(id))],
    assessmentExposures: [...new Set(array(s.assessmentExposures, 2000).map(id))], migratedLegacy: bool(s.migratedLegacy), exerciseDrafts };
}

function legacyDate(value: unknown, fallback: string): string {
  return typeof value === "string" && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : fallback;
}

export function migrateLegacyData(raw: Record<string, unknown>): LearningState {
  const state = makeInitialState();
  const now = new Date().toISOString();
  state.migratedLegacy = true;
  if (raw.cet6_settings !== undefined) object(raw.cet6_settings);
  if (raw.cet6_plan_progress !== undefined && raw.cet6_plan_progress !== null) object(raw.cet6_plan_progress);
  if (raw.cet6_onboarding !== undefined) object(raw.cet6_onboarding);
  if (raw.cet6_training_records !== undefined) for (const [index, value] of array(raw.cet6_training_records).entries()) {
    const r = object(value);
    const contentId = id(r.questionId);
    state.events.push({ id: `legacy-training-${index}`, contentId, taskId: `legacy-${string(r.type, 80)}`, skill: r.type === "outline" ? "organization" : r.type === "writing" ? "language" : "task",
      type: "legacy", at: legacyDate(r.completedAt, now), mode: "guided", outcome: "completed",
      evidence: "旧版学习记录，未重新验证作答或能力。旧关键词判定及形式评分不作为正确率或考试得分。", hintUsed: true });
  }
  if (raw.cet6_writing_drafts !== undefined) for (const [index, value] of array(raw.cet6_writing_drafts, 10000).entries()) {
    const d = object(value);
    const contentId = id(d.questionId);
    const text = string(d.essay, 100000);
    const at = legacyDate(d.submittedAt ?? d.startedAt, now);
    const previous = state.drafts[contentId];
    const version: DraftVersion = { id: `legacy-draft-${index}`, text, at, kind: "original", reflection: "旧版独立稿件存档，未验证是否为修订；旧形式分未迁移为考试评分。" };
    state.drafts[contentId] = { contentId, text: !previous || Date.parse(at) >= Date.parse(previous.updatedAt) ? text : previous.text,
      updatedAt: !previous || Date.parse(at) >= Date.parse(previous.updatedAt) ? at : previous.updatedAt,
      versions: [...(previous?.versions || []), version], timer: { remainingSeconds: 1800, running: false } };
  }
  if (raw.cet6_card_progress !== undefined) for (const [cardId, value] of Object.entries(object(raw.cet6_card_progress))) {
    const card = object(value);
    state.events.push({ id: `legacy-card-${id(cardId)}`, contentId: cardId, taskId: "legacy-card-self-rating", skill: "language", type: "legacy",
      at: legacyDate(card.lastReviewedAt, now), mode: "guided", outcome: "self-reviewed", evidence: "旧卡片自评，保留作学习记录；不继承为已掌握或新表达的到期计划。", hintUsed: true });
  }
  if (raw.cet6_progress !== undefined) for (const [contentId, value] of Object.entries(object(raw.cet6_progress))) {
    const progress = object(value);
    state.events.push({ id: `legacy-progress-${id(contentId)}`, contentId, taskId: "legacy-status", skill: "task", type: "legacy",
      at: legacyDate(progress.lastStudiedAt, now), mode: "guided", outcome: "completed", evidence: `旧题目标记：${typeof progress.status === "string" ? progress.status : "未知"}。仅存档，不等同掌握。`, hintUsed: true });
  }
  if (raw.cet6_favorites !== undefined) state.favorites = array(raw.cet6_favorites, 20000).map((value) => id(object(value).sentenceId));
  return validateLearningState(state);
}

export function getLearningState(): LearningState {
  if (typeof window === "undefined") return makeInitialState();
  try {
    const raw = window.localStorage.getItem(LEARNING_STORAGE_KEY);
    if (raw) { const state = validateLearningState(JSON.parse(raw)); storageWarning = undefined; return state; }
    const legacy: Record<string, unknown> = {};
    for (const key of LEGACY_KEYS) {
      const value = window.localStorage.getItem(key);
      if (value) legacy[key] = JSON.parse(value);
    }
    if (!Object.keys(legacy).length) return makeInitialState();
    const migrated = migrateLegacyData(legacy);
    saveState(migrated);
    storageWarning = "已将旧版记录保留为未验证历史。旧形式分和自评不会计作真实成绩或已掌握。";
    return migrated;
  } catch {
    storageWarning = "本地数据暂时无法读取或保存。原有数据未清除，请先导出或检查浏览器存储权限。";
    return makeInitialState();
  }
}

function persistState(state: LearningState, replaceCorrupt = false): void {
  if (typeof window === "undefined") return;
  const validated = validateLearningState(state);
  try {
    const existing = window.localStorage.getItem(LEARNING_STORAGE_KEY);
    if (existing && !replaceCorrupt) {
      try { validateLearningState(JSON.parse(existing)); } catch {
        throw new Error("现有数据损坏，普通保存已暂停。请先导出恢复备份，再导入有效备份。");
      }
    }
    window.localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(validated));
    storageWarning = undefined;
    window.dispatchEvent(new Event("cet-learning-change"));
  } catch (error) {
    storageWarning = error instanceof Error && error.message.includes("现有数据损坏") ? error.message
      : "无法保存学习数据。请检查浏览器存储权限或空间，并导出当前记录。";
    throw new Error(storageWarning);
  }
}

export function saveState(state: LearningState): void { persistState(state); }

export function appendLearningEvent(event: LearningEvent): void {
  const checked = validateEvent(event), state = getLearningState();
  if (state.events.some((e) => e.id === checked.id)) return;
  saveState({ ...state, events: [...state.events, checked] });
}

export function upsertDraft(draft: WritingDraft): void {
  const checked = validateDraft(draft), state = getLearningState();
  const previous = state.drafts[checked.contentId];
  const merged = new Map((previous?.versions || []).map((v) => [v.id, v]));
  // Saved snapshots are immutable; autosave can update current text, never erase originals.
  for (const v of checked.versions) if (!merged.has(v.id)) merged.set(v.id, v);
  saveState({ ...state, drafts: { ...state.drafts, [checked.contentId]: { ...checked, versions: [...merged.values()] } } });
}

export function getDraft(contentId: string): WritingDraft | undefined { return getLearningState().drafts[contentId]; }

export function snapshotDraft(draft: WritingDraft, kind: "original" | "revision", reflection = "", now = new Date()): WritingDraft {
  if (!draft.text.trim()) throw new Error("空白作文不能保存为成果版本");
  if (kind === "original" && draft.versions.some((v) => v.kind === "original")) throw new Error("原稿已经保存，请创建修改版本");
  if (kind === "revision" && !draft.versions.some((v) => v.kind === "original")) throw new Error("请先保存原稿，再记录修改");
  const at = now.toISOString();
  return { ...draft, updatedAt: at, versions: [...draft.versions, { id: createId("draft"), text: draft.text, at, kind, reflection }] };
}

export function exportLearningData(stateOverride?: LearningState): string {
  if (stateOverride) {
    const state = validateLearningState(stateOverride);
    let recoveryRaw: string | undefined;
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(LEARNING_STORAGE_KEY);
        if (raw) try { validateLearningState(JSON.parse(raw)); } catch { recoveryRaw = raw; }
      } catch { /* The validated in-memory state can still be exported without browser storage. */ }
    }
    return JSON.stringify({ format: FORMAT, schemaVersion: 2, exportedAt: new Date().toISOString(), state,
      ...(recoveryRaw === undefined ? {} : { recoveryRaw }) }, null, 2);
  }
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(LEARNING_STORAGE_KEY);
    if (raw) {
      try { validateLearningState(JSON.parse(raw)); } catch {
        return JSON.stringify({ format: `${FORMAT}-recovery`, schemaVersion: 2, exportedAt: new Date().toISOString(), raw }, null, 2);
      }
    }
  }
  return JSON.stringify({ format: FORMAT, schemaVersion: 2, exportedAt: new Date().toISOString(), state: getLearningState() }, null, 2);
}

export function importLearningData(json: string): { ok: boolean; message: string } {
  if (typeof window === "undefined") return { ok: false, message: "请在浏览器中导入学习记录。" };
  try {
    if (json.length > 5000000) throw new Error("备份文件超过 5 MB");
    const data = object(JSON.parse(json));
    let state: LearningState;
    if (data.format === FORMAT && data.schemaVersion === 2) {
      date(data.exportedAt);
      state = validateLearningState(data.state);
    } else if (Object.keys(data).length > 0 && Object.keys(data).every((key) => LEGACY_KEYS.includes(key))) {
      state = migrateLegacyData(data);
    } else throw new Error("不是支持的学习备份。请使用本产品导出的 v2 备份或旧版 cet6 备份");
    // One setItem after complete validation: rejected imports cannot partially overwrite progress.
    persistState(state, true);
    return { ok: true, message: state.migratedLegacy ? "导入成功。旧记录保留为未验证历史，不计作真实成绩或掌握证据。" : "已导入并替换本地学习记录。" };
  } catch (error) {
    return { ok: false, message: `导入失败，当前记录保持不变：${error instanceof Error ? error.message : "格式不正确"}` };
  }
}
