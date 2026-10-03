import type { CardRating, Expression, LearningEvent, LearningState, Question, Recommendation, Skill } from "../types/learning.ts";

export const SKILLS: Skill[] = ["task", "reasoning", "language", "organization", "transfer"];
export const SKILL_LABELS: Record<Skill, string> = { task: "审题", reasoning: "理由展开", language: "准确表达", organization: "组织与衔接", transfer: "换题应用" };

export function makeInitialState(): LearningState {
  return { version: 2, profile: { exam: "CET6", minutesPerDay: 25, focus: "reasoning", onboardingComplete: false },
    events: [], drafts: {}, reviews: {}, favorites: [], assessmentExposures: [], migratedLegacy: false, exerciseDrafts: {} };
}

export function chinaDayKey(now: Date | string | number = new Date()): string {
  const date = new Date(now);
  if (!Number.isFinite(date.getTime())) throw new Error("无效日期");
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

/** A persisted deadline keeps elapsed wall time correct after refresh/backgrounding. */
export function deadlineRemaining(deadline: string | undefined, now: Date | number = new Date()): number {
  if (!deadline) return 0;
  const end = new Date(deadline).getTime();
  const current = typeof now === "number" ? now : now.getTime();
  if (!Number.isFinite(end) || !Number.isFinite(current)) return 0;
  return Math.max(0, Math.ceil((end - current) / 1000));
}

export interface SkillEvidence {
  practiceCount: number; independentRecallCount: number; assistedCount: number;
  revisionCount: number; selfReviewCount: number; lastAt?: string; label: string;
}

export function deriveEvidence(events: LearningEvent[]): Record<Skill, SkillEvidence> {
  const result = Object.fromEntries(SKILLS.map((skill) => [skill, {
    practiceCount: 0, independentRecallCount: 0, assistedCount: 0, revisionCount: 0, selfReviewCount: 0, label: "暂无练习证据",
  }])) as Record<Skill, SkillEvidence>;
  for (const event of events) {
    if (event.type === "legacy" || !result[event.skill]) continue;
    const entry = result[event.skill];
    if (event.type !== "read") entry.practiceCount++;
    if (event.outcome === "recalled" && !event.hintUsed && event.mode !== "guided") entry.independentRecallCount++;
    if (event.hintUsed || event.outcome === "assisted") entry.assistedCount++;
    if (event.type === "revision") entry.revisionCount++;
    if (event.outcome === "self-reviewed" || event.type === "self-check") entry.selfReviewCount++;
    if (!entry.lastAt || new Date(event.at).getTime() > new Date(entry.lastAt).getTime()) entry.lastAt = event.at;
  }
  for (const entry of Object.values(result)) {
    entry.label = entry.independentRecallCount > 0 ? "有无提示回忆记录，尚不等于写作掌握"
      : entry.revisionCount > 0 ? "已有修改记录，需换题复测"
        : entry.practiceCount > 0 ? "已练习，尚缺无提示应用证据" : "暂无练习证据";
  }
  return result;
}

export function getReviewQueue(expressions: Expression[], state: LearningState, now: Date = new Date()): Expression[] {
  const seen = new Set<string>();
  return expressions.filter((expression) => {
    if (seen.has(expression.id)) return false;
    seen.add(expression.id);
    const review = state.reviews[expression.id];
    return Boolean(review && new Date(review.dueAt).getTime() <= now.getTime());
  }).sort((a, b) => new Date(state.reviews[a.id].dueAt).getTime() - new Date(state.reviews[b.id].dueAt).getTime());
}

export function getNewExpressions(expressions: Expression[], state: LearningState): Expression[] {
  const seen = new Set<string>();
  return expressions.filter((expression) => {
    if (seen.has(expression.id)) return false;
    seen.add(expression.id);
    return !state.reviews[expression.id];
  });
}

export function rateCard(state: LearningState, cardId: string, rating: CardRating, now: Date = new Date()): LearningState {
  if (!cardId.trim()) throw new Error("卡片 ID 不能为空");
  const existing = state.reviews[cardId];
  const oldInterval = existing?.intervalDays || 0;
  // A transparent history-based schedule; these intervals are not a fitted memory model.
  const intervalDays = rating === "again" ? 5 / 1440
    : rating === "hard" ? Math.max(0.25, Math.min(1, oldInterval ? oldInterval * 0.5 : 0.5))
      : rating === "good" ? oldInterval < 0.5 ? 1 : Math.min(30, Math.max(3, Math.round(oldInterval * 1.8)))
        : oldInterval < 0.5 ? 3 : Math.min(60, Math.max(7, Math.round(oldInterval * 2.2)));
  const at = now.toISOString();
  const event: LearningEvent = { id: createId("review"), contentId: cardId, taskId: "expression-self-recall", skill: "language", type: "review", at,
    mode: "independent", outcome: rating === "again" ? "again" : "self-reviewed", evidence: `卡片自评：${rating}。未进行客观写作能力评估。`, hintUsed: false };
  return { ...state, reviews: { ...state.reviews, [cardId]: { cardId, dueAt: new Date(now.getTime() + intervalDays * 86400000).toISOString(), intervalDays,
    reviewCount: (existing?.reviewCount || 0) + 1, successCount: (existing?.successCount || 0) + (rating === "good" || rating === "easy" ? 1 : 0),
    lastReviewedAt: at, lastRating: rating } }, events: [...state.events, event] };
}

export function createId(prefix = "event"): string {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`;
}

export function recommendTask(questions: Question[], state: LearningState, now: Date = new Date()): Recommendation {
  const eligible = questions.filter((q) => q.exam === state.profile.exam && !q.evaluation);
  const eligibleIds = new Set(eligible.map((q) => q.id));
  const minutes = Math.max(5, Math.min(15, state.profile.minutesPerDay));
  const recent = state.events.filter((e) => eligibleIds.has(e.contentId) && e.type !== "legacy" && e.type !== "read" && e.type !== "review"
    && new Date(e.at).getTime() >= now.getTime() - 14 * 86400000 && new Date(e.at).getTime() <= now.getTime())
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 12);
  const unmodifiedDraft = eligible.find((q) => {
    const draft = state.drafts[q.id];
    return Boolean(draft?.text.trim() && draft.versions.some((v) => v.kind === "original") && !draft.versions.some((v) => v.kind === "revision"));
  });
  if (unmodifiedDraft) return { questionId: unmodifiedDraft.id, kind: "revision", skill: state.profile.focus, title: "修改上一篇，让一个问题真正解决",
    reason: "你已保存原稿，尚未留下修改版本。先选一个主要问题修改，再记录理由。", minutes };
  const problematic = recent.filter((e) => e.outcome === "again" || e.outcome === "assisted" || e.hintUsed);
  const bySkill = SKILLS.map((skill) => ({ skill, n: problematic.filter((e) => e.skill === skill).length }));
  bySkill.sort((a, b) => b.n - a.n);
  const enough = recent.length >= 3 && bySkill[0].n >= 2;
  const skill = enough ? bySkill[0].skill : state.profile.focus;
  const practicedIds = new Set(state.events.filter((e) => e.type !== "legacy" && e.type !== "read").map((e) => e.contentId));
  const question = eligible.find((q) => !practicedIds.has(q.id)) || eligible[0];
  if (!question) return { kind: "unit", skill, title: "先选择可练习的题目", reason: "当前考试类别没有可用练习题，请检查题库或更换考试类别。", minutes };
  return { questionId: question.id, kind: skill === "transfer" ? "transfer" : "unit", skill,
    title: enough ? `今天聚焦${SKILL_LABELS[skill]}` : `按你自选的目标练${SKILL_LABELS[skill]}`,
    reason: enough ? `最近 14 天的 ${recent.length} 条任务记录中，${SKILL_LABELS[skill]}有 ${bySkill[0].n} 次需要提示或重试。这是练习建议，不是能力诊断。`
      : "记录还不足以支持个性化判断，暂按你自选的练习目标安排。保留评估题不会进入学习推荐。", minutes };
}

export function reconcileLegacyIds(state: LearningState, questions: Question[]): LearningState {
  const mapping = new Map<string, string>();
  for (const q of questions) for (const oldId of q.legacyIds || []) mapping.set(oldId, q.id);
  const drafts = { ...state.drafts };
  for (const [oldId, draft] of Object.entries(state.drafts)) {
    const id = mapping.get(oldId);
    if (!id || id === oldId || drafts[id]) continue;
    drafts[id] = { ...draft, contentId: id };
    delete drafts[oldId];
  }
  const exerciseDrafts = { ...state.exerciseDrafts };
  for (const [oldKey, value] of Object.entries(state.exerciseDrafts || {})) {
    const oldId = [...mapping.keys()].find((candidate) => oldKey.startsWith(`${candidate}:`));
    if (!oldId) continue;
    const key = `${mapping.get(oldId)}${oldKey.slice(oldId.length)}`;
    if (!exerciseDrafts[key]) { exerciseDrafts[key] = value; delete exerciseDrafts[oldKey]; }
  }
  return { ...state, drafts, exerciseDrafts, events: state.events.map((e) => mapping.has(e.contentId) ? { ...e, contentId: mapping.get(e.contentId)! } : e),
    assessmentExposures: [...new Set(state.assessmentExposures.map((id) => mapping.get(id) || id))] };
}
