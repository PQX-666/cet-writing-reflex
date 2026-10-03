import type { Exam } from "./learning";

export type KnowledgeCategory = "function" | "grammar" | "genre" | "topic";
export interface KnowledgeSource {
  id: string; title: string; url: string; publisher: string;
  kind: "official" | "exam-transcription" | "dictionary" | "book";
  note: string;
}
export interface KnowledgeTheme {
  id: string; title: string; description: string; examples: string[]; sourceIds: string[];
}
export interface KnowledgeFunction { id: string; title: string }
export interface KnowledgeUnit {
  id: string; title: string; category: KnowledgeCategory; core: boolean; exam: Exam | "both";
  themeIds: string[]; functionIds: string[];
  meaning: string; form: string; formZh: string; usage: string; boundary: string; example: string; exampleZh: string;
  recall: { prompt: string; reference: string; referenceZh: string; note: string };
  application: { prompt: string; reference: string; referenceZh: string; criteria: string[] };
  contrast: { wrong: string; wrongZh: string; better: string; betterZh: string; reason: string };
  relatedQuestionIds: string[]; relatedExpressionIds: string[]; sourceIds: string[];
}
export interface KnowledgeCatalog {
  version: 1; updatedAt: string; themes: KnowledgeTheme[];
  functions: KnowledgeFunction[]; sources: KnowledgeSource[]; units: KnowledgeUnit[];
}
export interface KnowledgeSession {
  unitIds: string[]; cursor: number; step: "recall" | "apply";
  recallText: string; applyText: string; revealed: boolean; missed: boolean;
  startedAt: string; completedIds: string[];
  preparedIds?: string[];
}
