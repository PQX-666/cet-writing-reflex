// Type definitions for CET-6 Writing Training Dataset

export interface TypeDefinition {
  signals: string[];
  core_logic: string;
  formula: string;
}

export interface UniversalFormula {
  core: string;
  examProcess: string[];
}

export interface ThemeGroups {
  [key: string]: string[];
}

export interface ReviewAlgorithmSuggestion {
  cardRatings: {
    again: string;
    hard: string;
    good: string;
    easy: string;
  };
  principles: string[];
}

export interface DatasetMetadata {
  name: string;
  version: string;
  language: string;
  purpose: string;
  designPrinciple: string;
  sourceBasis: string[];
  universalFormula: UniversalFormula;
  typeDefinitions: Record<string, TypeDefinition>;
  themeGroups: ThemeGroups;
  appTrainingModules: string[];
  reviewAlgorithmSuggestion: ReviewAlgorithmSuggestion;
}

export interface TaskAnalysis {
  mainTask: string;
  notTask: string[];
  mustMention: string[];
  dangerZone: string[];
  thinkingSteps: string[];
  scoringFocus: string[];
}

export interface SixtySecondOutline {
  P1: string;
  P2: string;
  P3: string;
}

export interface ImmediateReactionTraining {
  tenSecondReaction: string;
  thirtySecondReaction: string;
  sixtySecondOutline: SixtySecondOutline;
}

export interface ParagraphSection {
  goal: string;
  chinesePlan?: string;
  englishSkeleton: string;
  requiredMove: string[];
  reason1?: string;
  reason2?: string;
  optionalExample?: string;
}

export interface ParagraphBlueprint {
  P1: ParagraphSection;
  P2: ParagraphSection;
  P3: ParagraphSection;
}

export interface TemplateMapping {
  formulaStep: string;
  function: string;
  sentence: string;
  replaceableSlots: string[];
  whyUse: string;
  applyTo: string[];
}

export interface SentenceBankItem {
  id: string;
  paragraph: string;
  function: string;
  level: string;
  sentence: string;
  cn: string;
  replaceableSlots: string[];
  transferableTo: string[];
  appTags: string[];
}

export interface LowMidHighUpgrade {
  function: string;
  basic: string;
  mid: string;
  high: string;
  usage: string;
}

export interface ParagraphAnalysis {
  paragraph: string;
  role: string;
  formulaUsed: string;
}

export interface ModelEssayForTraining {
  version: string;
  essay: string;
  wordCountApprox: number;
  paragraphAnalysis: ParagraphAnalysis[];
}

export interface TypeRecognitionTask {
  question: string;
  answer: string;
  distractors: string[];
  explanation: string;
}

export interface KeywordExtractionTask {
  question: string;
  answer: string;
  wrongKeywords: string[];
  explanation: string;
}

export interface OutlineClozeTask {
  P1: string;
  P2: string;
  P3: string;
  answers: string[];
}

export interface TransferChallengeTask {
  instruction: string;
  topics: string[];
  sharedLogic: string;
}

export interface TrainingTasks {
  typeRecognition: TypeRecognitionTask;
  keywordExtraction: KeywordExtractionTask;
  outlineCloze: OutlineClozeTask;
  transferChallenge: TransferChallengeTask;
}

export interface MemorizationCard {
  type: string;
  front: string;
  answer: string;
  hint: string;
  tags: string[];
}

export interface Transfer {
  nearTopics: string[];
  sharedReasons: string[];
  adaptRules: string[];
}

export interface CommonMistake {
  mistake: string;
  whyWrong: string;
  fix: string;
}

export interface UIHighlights {
  blue: string;
  yellow: string;
  green: string;
  purple: string;
  red: string;
  gray: string;
}

export interface AppUse {
  recommendedModules: string[];
  uiHighlights: UIHighlights;
  unlockLogic: string;
}

export interface Question {
  id: string;
  sourceYear: number;
  month: string;
  set: number;
  prompt: string;
  promptCn: string;
  chineseTitle: string;
  type: string;
  typeSignals: string[];
  themeGroup: string;
  difficulty: string;
  coreKeywords: string[];
  wordLimit: string;
  taskAnalysis: TaskAnalysis;
  immediateReactionTraining: ImmediateReactionTraining;
  paragraphBlueprint: ParagraphBlueprint;
  templateMapping: TemplateMapping[];
  sentenceBank: SentenceBankItem[];
  lowMidHighUpgrade: LowMidHighUpgrade[];
  modelEssayForTraining: ModelEssayForTraining;
  trainingTasks: TrainingTasks;
  memorizationCards: MemorizationCard[];
  transfer: Transfer;
  commonMistakes: CommonMistake[];
  scoringChecklist: string[];
  appUse: AppUse;
}

export interface Dataset {
  metadata: DatasetMetadata;
  questions: Question[];
}

// Storage types for localStorage

export type LearningStatus = "not_started" | "analyzed" | "memorized" | "written" | "mastered";
export type CardRating = "again" | "hard" | "good" | "easy";
export type QuestionType = "重要性类" | "社会现象类" | "问题解决类" | "对比平衡类" | "方法建议类";

export interface QuestionProgress {
  questionId: string;
  status: LearningStatus;
  mistakeCount: number;
  lastStudiedAt?: string;
}

export interface CardProgress {
  cardId: string;
  rating: CardRating;
  reviewCount: number;
  nextReviewAt: string;
  lastReviewedAt: string;
  correctCount: number;
  wrongCount: number;
}

export interface TrainingRecord {
  id: string;
  questionId: string;
  type: "type_recognition" | "keyword_extraction" | "outline" | "writing";
  selectedType?: string;
  typeCorrect?: boolean;
  keywordInput?: string;
  keywordCorrect?: boolean;
  outlineSubmitted?: { P1: string; P2: string; P3: string };
  completedAt: string;
  mistakeType?: string;
}

export interface WritingDraft {
  questionId: string;
  essay: string;
  wordCount: number;
  startedAt: string;
  submittedAt?: string;
  timeUsed?: number;
  checklistState?: Record<string, boolean>;
  score?: number;
  scoreDetail?: EssayScore;
}

export interface EssayScore {
  score: number;
  wordCount: number;
  paragraphCount: number;
  checks: EssayCheck[];
  scoreType: "formal_check";
  scoreNotice: string;
}

export interface EssayCheck {
  name: string;
  passed: boolean;
  message: string;
}

export interface ReviewPlanProgress {
  mode: "3day" | "7day" | "custom";
  startedAt: string;
  dayProgress: Record<string, TaskCompletion[]>;
}

export interface TaskCompletion {
  taskId: string;
  completed: boolean;
  completedAt?: string;
}

export interface FavoriteSentence {
  sentenceId: string;
  addedAt: string;
}

// Aggregated Progress
export interface AppProgress {
  questionProgress: Record<string, QuestionProgress>;
  cardProgress: Record<string, CardProgress>;
  trainingRecords: TrainingRecord[];
  writingDrafts: WritingDraft[];
  favoriteSentences: FavoriteSentence[];
  planProgress?: ReviewPlanProgress;
  settings: AppSettings;
}

export interface AppSettings {
  dailyTypeRecognition: number;
  dailyKeywordExtraction: number;
  dailyOutline: number;
  dailyCards: number;
  dailyWriting: number;
}

export interface OnboardingProgress {
  completedSteps: string[];
  lastExportAt?: string;
}
