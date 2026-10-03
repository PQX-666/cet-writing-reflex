import type { KnowledgeCategory, KnowledgeSession, KnowledgeUnit } from "../types/knowledge.ts";
import type { Exam, LearningState } from "../types/learning.ts";

export const KNOWLEDGE_SESSION_KEY = "knowledge:session";

export interface KnowledgeFilters {
  exam: Exam | "all";
  themeId?: string;
  functionId?: string;
  category?: KnowledgeCategory;
  search?: string;
  coreOnly?: boolean;
}

export interface KnowledgeSessionOptions {
  now?: Date;
  unitId?: string;
  themeId?: string;
  exam?: Exam | "all";
  preparedUnitIds?: string[];
}

export function knowledgeCardId(unitId: string): string {
  return `knowledge:${unitId}`;
}

const normalizeSearch = (value: string) => value.normalize("NFKC").trim().toLowerCase();

/** Tags are exact IDs. Search terms may match authored text, not partial tag IDs. */
export function filterKnowledgeUnits(units: KnowledgeUnit[], filters: KnowledgeFilters): KnowledgeUnit[] {
  const terms = normalizeSearch(filters.search ?? "").split(/\s+/).filter(Boolean);
  return units.filter((unit) => {
    if (filters.exam !== "all" && unit.exam !== "both" && unit.exam !== filters.exam) return false;
    if (filters.themeId && !unit.themeIds.includes(filters.themeId)) return false;
    if (filters.functionId && !unit.functionIds.includes(filters.functionId)) return false;
    if (filters.category && unit.category !== filters.category) return false;
    if (filters.coreOnly && !unit.core) return false;
    if (!terms.length) return true;
    const text = normalizeSearch([
      unit.title, unit.meaning, unit.form, unit.formZh, unit.usage, unit.boundary, unit.example, unit.exampleZh,
      unit.recall.prompt, unit.recall.reference, unit.recall.referenceZh, unit.recall.note,
      unit.application.prompt, unit.application.reference, unit.application.referenceZh, ...unit.application.criteria,
      unit.contrast.wrong, unit.contrast.wrongZh, unit.contrast.better, unit.contrast.betterZh, unit.contrast.reason,
    ].join(" "));
    return terms.every((term) => text.includes(term));
  });
}

function uniqueUnits(units: KnowledgeUnit[]): KnowledgeUnit[] {
  const seen = new Set<string>();
  return units.filter((unit) => {
    if (seen.has(unit.id)) return false;
    seen.add(unit.id);
    return true;
  });
}

/** Unpractised units are new, never overdue. Self-ratings only schedule revisits. */
export function knowledgeDueUnits(units: KnowledgeUnit[], state: LearningState, now: Date = new Date()): KnowledgeUnit[] {
  return uniqueUnits(units).filter((unit) => {
    const review = state.reviews[knowledgeCardId(unit.id)];
    return Boolean(review && review.reviewCount > 0 && Date.parse(review.dueAt) <= now.getTime());
  }).sort((a, b) => Date.parse(state.reviews[knowledgeCardId(a.id)].dueAt) - Date.parse(state.reviews[knowledgeCardId(b.id)].dueAt));
}

function variedNext(candidates: KnowledgeUnit[], previous: KnowledgeUnit): KnowledgeUnit | undefined {
  // Diversity only breaks the ordering within one group; due cards always precede new cards.
  const score = (unit: KnowledgeUnit) => Number(unit.category !== previous.category)
    + Number(unit.themeIds.length > 0 && previous.themeIds.length > 0
      && !unit.themeIds.some((id) => previous.themeIds.includes(id)));
  return candidates.reduce<KnowledgeUnit | undefined>((best, unit) => !best || score(unit) > score(best) ? unit : best, undefined);
}

/** A short session has at most two units. Explicit selection permits an intentional revisit. */
export function buildKnowledgeSession(units: KnowledgeUnit[], state: LearningState, options: KnowledgeSessionOptions = {}): KnowledgeSession {
  const now = options.now ?? new Date();
  // A directly selected unit is a user's choice; an explicit exam filter still applies.
  const exam = options.exam ?? (options.unitId ? "all" : state.profile.exam);
  const eligible = uniqueUnits(filterKnowledgeUnits(units, { exam, themeId: options.themeId }));
  let selected: KnowledgeUnit[];
  if (options.unitId) {
    const requested = eligible.find((unit) => unit.id === options.unitId);
    selected = requested ? [requested] : [];
  } else {
    const due = knowledgeDueUnits(eligible, state, now);
    const fresh = eligible.filter((unit) => !state.reviews[knowledgeCardId(unit.id)]);
    const first = due[0] ?? fresh[0];
    selected = first ? [first] : [];
    if (first) {
      const remainingDue = due.filter((unit) => unit.id !== first.id);
      const remainingFresh = fresh.filter((unit) => unit.id !== first.id);
      const second = variedNext(remainingDue.length ? remainingDue : remainingFresh, first);
      if (second) selected.push(second);
    }
  }
  const unitIds = selected.map((unit) => unit.id);
  const prepared = new Set(options.preparedUnitIds ?? []);
  return { unitIds, cursor: 0, step: "recall", recallText: "", applyText: "",
    revealed: false, missed: false, startedAt: now.toISOString(), completedIds: [], preparedIds: unitIds.filter((id) => prepared.has(id)) };
}

/** Restore only a structurally valid session whose units still exist in the allowed catalogue. */
export function readKnowledgeSession(state: LearningState, allowedIds: Iterable<string>): KnowledgeSession | undefined {
  try {
    const raw = state.exerciseDrafts?.[KNOWLEDGE_SESSION_KEY]?.text;
    if (typeof raw !== "string" || !raw.trim() || raw.length > 20000) return undefined;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    const data = value as Record<string, unknown>;
    const allowed = new Set(allowedIds);
    if (!Array.isArray(data.unitIds) || data.unitIds.length > 2
      || !data.unitIds.every((id) => typeof id === "string" && id.length > 0 && id.length <= 200 && allowed.has(id))
      || new Set(data.unitIds).size !== data.unitIds.length) return undefined;
    const unitIds = data.unitIds as string[];
    const preparedIds: unknown = data.preparedIds === undefined ? [] : data.preparedIds;
    if (!Array.isArray(preparedIds) || !preparedIds.every((id) => typeof id === "string" && unitIds.includes(id))
      || new Set(preparedIds).size !== preparedIds.length) return undefined;
    if (typeof data.cursor !== "number" || !Number.isInteger(data.cursor) || data.cursor < 0 || data.cursor > unitIds.length) return undefined;
    if (data.step !== "recall" && data.step !== "apply") return undefined;
    if (typeof data.recallText !== "string" || data.recallText.length > 4000
      || typeof data.applyText !== "string" || data.applyText.length > 4000
      || typeof data.revealed !== "boolean" || typeof data.missed !== "boolean") return undefined;
    if (typeof data.startedAt !== "string" || data.startedAt.length > 100
      || !/^\d{4}-\d{2}-\d{2}T/.test(data.startedAt) || !Number.isFinite(Date.parse(data.startedAt))) return undefined;
    if (!Array.isArray(data.completedIds) || data.completedIds.length !== data.cursor
      || !data.completedIds.every((id, index) => id === unitIds[index])) return undefined;
    if (data.cursor < unitIds.length && data.step === "recall" && data.applyText) return undefined;
    if (data.cursor === unitIds.length && (data.step !== "recall" || data.recallText || data.applyText || data.revealed || data.missed)) return undefined;
    return { unitIds: [...unitIds], cursor: data.cursor, step: data.step, recallText: data.recallText, applyText: data.applyText,
      revealed: data.revealed, missed: data.missed, startedAt: data.startedAt, completedIds: [...data.completedIds] as string[], preparedIds: [...preparedIds] };
  } catch {
    return undefined;
  }
}

/** Advancing records completion, not correctness or mastery, and never rates a card. */
export function advanceKnowledgeSession(session: KnowledgeSession): KnowledgeSession {
  const currentId = session.unitIds[session.cursor];
  return { ...session, unitIds: [...session.unitIds], cursor: Math.min(session.cursor + 1, session.unitIds.length),
    step: "recall", recallText: "", applyText: "", revealed: false, missed: false,
    completedIds: currentId && !session.completedIds.includes(currentId) ? [...session.completedIds, currentId] : [...session.completedIds],
    preparedIds: [...(session.preparedIds ?? [])] };
}
