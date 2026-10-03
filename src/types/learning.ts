export type Exam = "CET4" | "CET6";
export type Skill = "task" | "reasoning" | "language" | "organization" | "transfer";
export interface Expression {
  id: string; text: string; meaning: string; pattern: string; patternZh: string; example: string; exampleZh: string; boundary: string;
}
export interface Question {
  id: string; legacyIds?: string[]; exam: Exam; year: number; month: string;
  title: string; theme: string;
  taskKind: "explain" | "discuss" | "compare" | "propose" | "application" | "describe";
  deep: boolean; evaluation: boolean;
  sources: { url: string; title: string; publisher: string; kind: "official" | "university-paper" | "institution-transcription"; note: string }[];
  prompt: string; promptZh: string; promptMode: "given-opening" | "topic" | "scenario" | "chart";
  requiredOpening?: string; requiredOpeningZh?: string; directions: string; directionsZh: string; directionsNote: string;
  wordRange: { min: number; max: number; excludeOpening: boolean };
  task: { situation: string; objective: string; requirements: string[]; optionalIdeas: string[]; avoid: string[]; acceptedKeywords: string[] };
  routes: { label: string; outline: string[] }[];
  reasoning: { claim: string; claimZh: string; mechanism: string; mechanismZh: string; example: string; exampleZh: string; link: string; linkZh: string }[];
  modelEssay: string; modelEssayZh: string[]; modelNotes: string[]; expressions: Expression[];
  exercise: { weakParagraph: string; weakParagraphZh: string; improvedParagraph: string; improvedParagraphZh: string; explanation: string; transferPrompt: string; transferHint: string; boundaryPrompt: string; boundaryAnswer: string };
  commonErrors: { wrong: string; wrongZh: string; right: string; rightZh: string; why: string }[];
  reviewStatus: "independent-model-review";
}
export type EventType = "practice" | "revision" | "review" | "assessment" | "read" | "self-check" | "legacy";
export interface LearningEvent {
  id: string; contentId: string; taskId: string; skill: Skill; type: EventType; at: string;
  mode: "guided" | "independent" | "assessment";
  outcome: "completed" | "recalled" | "assisted" | "again" | "unrecognized" | "self-reviewed";
  evidence: string; hintUsed: boolean; durationSeconds?: number;
}
export interface DraftVersion { id: string; text: string; at: string; kind: "original" | "revision"; reflection: string }
export interface WritingDraft {
  contentId: string; text: string; versions: DraftVersion[]; updatedAt: string;
  timer: { remainingSeconds: number; deadline?: string; running: boolean };
}
export type CardRating = "again" | "hard" | "good" | "easy";
export interface CardReview {
  cardId: string; dueAt: string; intervalDays: number; reviewCount: number; successCount: number;
  lastReviewedAt?: string; lastRating: CardRating;
}
export interface LearningState {
  version: 2;
  profile: { exam: Exam; minutesPerDay: number; examDate?: string; focus: Skill; onboardingComplete: boolean };
  events: LearningEvent[]; drafts: Record<string, WritingDraft>; reviews: Record<string, CardReview>;
  favorites: string[]; assessmentExposures: string[]; migratedLegacy: boolean;
  exerciseDrafts?: Record<string, { text: string; updatedAt: string }>;
}
export interface FactCheck { key: string; label: string; status: "pass" | "attention" | "info"; detail: string }
export interface WritingCheck { wordCount: number; totalWordCount: number; paragraphCount: number; checks: FactCheck[]; warnings: string[] }
export interface Recommendation { questionId?: string; kind: "unit" | "revision" | "review" | "transfer" | "assessment"; skill: Skill; title: string; reason: string; minutes: number }
