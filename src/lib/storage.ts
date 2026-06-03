"use client";

import type {
  AppProgress,
  QuestionProgress,
  CardProgress,
  TrainingRecord,
  WritingDraft,
  FavoriteSentence,
  CardRating,
  LearningStatus,
  ReviewPlanProgress,
  AppSettings,
  OnboardingProgress,
} from "@/types/dataset";

const KEYS = {
  PROGRESS: "cet6_progress",
  CARD_PROGRESS: "cet6_card_progress",
  TRAINING_RECORDS: "cet6_training_records",
  WRITING_DRAFTS: "cet6_writing_drafts",
  FAVORITES: "cet6_favorites",
  PLAN_PROGRESS: "cet6_plan_progress",
  SETTINGS: "cet6_settings",
  ONBOARDING: "cet6_onboarding",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

// Question Progress
export function getQuestionProgress(): Record<string, QuestionProgress> {
  return safeGet(KEYS.PROGRESS, {});
}

export function setQuestionProgress(progress: Record<string, QuestionProgress>): void {
  safeSet(KEYS.PROGRESS, progress);
}

export function updateQuestionProgress(
  questionId: string,
  update: Partial<QuestionProgress>
): void {
  const all = getQuestionProgress();
  const existing = all[questionId] || {
    questionId,
    status: "not_started" as LearningStatus,
    mistakeCount: 0,
  };
  all[questionId] = { ...existing, ...update };
  setQuestionProgress(all);
}

export function getQuestionStatus(questionId: string): LearningStatus {
  const all = getQuestionProgress();
  return all[questionId]?.status || "not_started";
}

// Card Progress
export function getCardProgress(): Record<string, CardProgress> {
  return safeGet(KEYS.CARD_PROGRESS, {});
}

export function setCardProgress(progress: Record<string, CardProgress>): void {
  safeSet(KEYS.CARD_PROGRESS, progress);
}

export function updateCardProgress(
  cardId: string,
  rating: CardRating
): void {
  const all = getCardProgress();
  const existing = all[cardId] || {
    cardId,
    rating: "again" as CardRating,
    reviewCount: 0,
    nextReviewAt: new Date().toISOString(),
    lastReviewedAt: new Date().toISOString(),
    correctCount: 0,
    wrongCount: 0,
  };

  const now = new Date();
  const intervals: Record<CardRating, number> = {
    again: 5,       // 5 minutes
    hard: 1440,     // 1 day
    good: 4320,     // 3 days
    easy: 10080,    // 7 days
  };

  const nextReview = new Date(now.getTime() + intervals[rating] * 60 * 1000);
  const isCorrect = rating === "good" || rating === "easy";

  all[cardId] = {
    ...existing,
    rating,
    reviewCount: existing.reviewCount + 1,
    nextReviewAt: nextReview.toISOString(),
    lastReviewedAt: now.toISOString(),
    correctCount: existing.correctCount + (isCorrect ? 1 : 0),
    wrongCount: existing.wrongCount + (isCorrect ? 0 : 1),
  };

  setCardProgress(all);
}

export function getCardsDueForReview(cardIds: string[]): string[] {
  const all = getCardProgress();
  const now = new Date();
  return cardIds.filter((id) => {
    const p = all[id];
    if (!p) return true; // never reviewed
    return new Date(p.nextReviewAt) <= now;
  });
}

// Training Records
export function getTrainingRecords(): TrainingRecord[] {
  return safeGet(KEYS.TRAINING_RECORDS, []);
}

export function addTrainingRecord(record: TrainingRecord): void {
  const records = getTrainingRecords();
  records.push(record);
  safeSet(KEYS.TRAINING_RECORDS, records);
}

export function getTrainingRecordsForQuestion(questionId: string): TrainingRecord[] {
  return getTrainingRecords().filter((r) => r.questionId === questionId);
}

export function getWrongTypeRecords(): TrainingRecord[] {
  return getTrainingRecords().filter(
    (r) => r.type === "type_recognition" && r.typeCorrect === false
  );
}

export function getWrongKeywordRecords(): TrainingRecord[] {
  return getTrainingRecords().filter(
    (r) => r.type === "keyword_extraction" && r.keywordCorrect === false
  );
}

// Writing Drafts
export function getWritingDrafts(): WritingDraft[] {
  return safeGet(KEYS.WRITING_DRAFTS, []);
}

export function saveWritingDraft(draft: WritingDraft): void {
  const drafts = getWritingDrafts();
  const idx = drafts.findIndex((d) => d.questionId === draft.questionId && !d.submittedAt);
  if (idx >= 0) {
    drafts[idx] = draft;
  } else {
    drafts.push(draft);
  }
  safeSet(KEYS.WRITING_DRAFTS, drafts);
}

export function getWritingDraftForQuestion(questionId: string): WritingDraft | undefined {
  return getWritingDrafts().find((d) => d.questionId === questionId && !d.submittedAt);
}

export function getCompletedWritings(): WritingDraft[] {
  return getWritingDrafts().filter((d) => d.submittedAt);
}

// Favorites
export function getFavoriteSentences(): FavoriteSentence[] {
  return safeGet(KEYS.FAVORITES, []);
}

export function toggleFavoriteSentence(sentenceId: string): boolean {
  const favs = getFavoriteSentences();
  const idx = favs.findIndex((f) => f.sentenceId === sentenceId);
  if (idx >= 0) {
    favs.splice(idx, 1);
    safeSet(KEYS.FAVORITES, favs);
    return false;
  } else {
    favs.push({ sentenceId, addedAt: new Date().toISOString() });
    safeSet(KEYS.FAVORITES, favs);
    return true;
  }
}

export function isSentenceFavorited(sentenceId: string): boolean {
  return getFavoriteSentences().some((f) => f.sentenceId === sentenceId);
}

// Plan Progress
export function getPlanProgress(): ReviewPlanProgress | null {
  return safeGet<ReviewPlanProgress | null>(KEYS.PLAN_PROGRESS, null);
}

export function setPlanProgress(plan: ReviewPlanProgress): void {
  safeSet(KEYS.PLAN_PROGRESS, plan);
}

export function updatePlanTask(
  dayKey: string,
  taskId: string,
  completed: boolean
): void {
  const plan = getPlanProgress();
  if (!plan) return;
  const tasks = plan.dayProgress[dayKey] || [];
  const idx = tasks.findIndex((t) => t.taskId === taskId);
  if (idx >= 0) {
    tasks[idx] = { taskId, completed, completedAt: completed ? new Date().toISOString() : undefined };
  } else {
    tasks.push({ taskId, completed, completedAt: completed ? new Date().toISOString() : undefined });
  }
  plan.dayProgress[dayKey] = tasks;
  setPlanProgress(plan);
}

// Settings
export function getSettings(): AppSettings {
  return safeGet(KEYS.SETTINGS, {
    dailyTypeRecognition: 5,
    dailyKeywordExtraction: 5,
    dailyOutline: 3,
    dailyCards: 10,
    dailyWriting: 1,
  });
}

export function setSettings(settings: AppSettings): void {
  safeSet(KEYS.SETTINGS, settings);
}

// Today's Progress
export function getTodayTrainingCount(): {
  typeRecognition: number;
  keywordExtraction: number;
  outline: number;
  writing: number;
} {
  const records = getTrainingRecords();
  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = records.filter((r) => r.completedAt.startsWith(today));
  return {
    typeRecognition: todayRecords.filter((r) => r.type === "type_recognition").length,
    keywordExtraction: todayRecords.filter((r) => r.type === "keyword_extraction").length,
    outline: todayRecords.filter((r) => r.type === "outline").length,
    writing: todayRecords.filter((r) => r.type === "writing").length,
  };
}

export function getTodayCardReviewCount(): number {
  const cards = getCardProgress();
  const today = new Date().toISOString().slice(0, 10);
  return Object.values(cards).filter((c) => c.lastReviewedAt.startsWith(today)).length;
}

// Export / Import
export function exportAllData(): string {
  if (typeof window === "undefined") return "{}";
  const data: Record<string, unknown> = {};
  for (const key of Object.values(KEYS)) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        data[key] = JSON.parse(raw);
      } catch {
        data[key] = raw;
      }
    }
  }
  return JSON.stringify(data, null, 2);
}

export function importAllData(json: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const data = JSON.parse(json) as Record<string, unknown>;
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  for (const key of Object.values(KEYS)) {
    localStorage.removeItem(key);
  }
}

// Onboarding progress
export function getOnboardingProgress(): OnboardingProgress {
  return safeGet<OnboardingProgress>(KEYS.ONBOARDING, { completedSteps: [] });
}

export function completeOnboardingStep(stepId: string): void {
  const progress = getOnboardingProgress();
  if (!progress.completedSteps.includes(stepId)) {
    progress.completedSteps.push(stepId);
  }
  safeSet(KEYS.ONBOARDING, progress);
}

export function isOnboardingStepCompleted(stepId: string): boolean {
  return getOnboardingProgress().completedSteps.includes(stepId);
}

export function isOnboardingFullyCompleted(): boolean {
  return getOnboardingProgress().completedSteps.length >= 5;
}

// Backup tracking
export function recordExport(): void {
  const progress = getOnboardingProgress();
  progress.lastExportAt = new Date().toISOString();
  safeSet(KEYS.ONBOARDING, progress);
}

export function getLastExportAt(): string | undefined {
  return getOnboardingProgress().lastExportAt;
}

export function shouldRemindBackup(): boolean {
  const lastExport = getLastExportAt();
  if (!lastExport) return true;
  const daysSince = (Date.now() - new Date(lastExport).getTime()) / (1000 * 60 * 60 * 24);
  return daysSince > 7;
}

// Card stats
export function getCardStats(): {
  total: number;
  reviewed: number;
  mastered: number;
  weak: number;
  unlearned: number;
  dueToday: number;
  totalReviews: number;
  streakDays: number;
} {
  const all = getCardProgress();
  const entries = Object.values(all);
  const now = new Date();

  const dueToday = entries.filter((c) => new Date(c.nextReviewAt) <= now).length;
  const mastered = entries.filter((c) => c.rating === "easy").length;
  const weak = entries.filter((c) => c.rating === "again" || c.rating === "hard").length;
  const totalReviews = entries.reduce((s, c) => s + c.reviewCount, 0);

  // Streak: count consecutive days with reviews
  const reviewDates = new Set(
    entries.map((c) => c.lastReviewedAt.slice(0, 10))
  );
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (reviewDates.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    total: 0, // caller fills this
    reviewed: entries.length,
    mastered,
    weak,
    unlearned: 0, // caller fills this
    dueToday,
    totalReviews,
    streakDays: streak,
  };
}
