import type { Question, CardProgress, TrainingRecord, WritingDraft } from "@/types/dataset";
import { getQuestionProgress, getCardProgress, getTrainingRecords, getWritingDrafts, getTodayTrainingCount, getTodayCardReviewCount } from "./storage";

export interface TrainingStats {
  totalQuestions: number;
  totalTypes: number;
  totalThemeGroups: number;
  totalCards: number;
  completedTrainings: number;
  todayProgress: {
    typeRecognition: { done: number; target: number };
    keywordExtraction: { done: number; target: number };
    outline: { done: number; target: number };
    cards: { done: number; target: number };
    writing: { done: number; target: number };
  };
}

export function computeTrainingStats(questions: Question[]): TrainingStats {
  const types = new Set(questions.map((q) => q.type));
  const themeGroups = new Set(questions.map((q) => q.themeGroup));
  const totalCards = questions.reduce((sum, q) => sum + q.memorizationCards.length, 0);

  const progress = getQuestionProgress();
  const completedTrainings = Object.values(progress).filter(
    (p) => p.status !== "not_started"
  ).length;

  const today = getTodayTrainingCount();
  const todayCards = getTodayCardReviewCount();

  return {
    totalQuestions: questions.length,
    totalTypes: types.size,
    totalThemeGroups: themeGroups.size,
    totalCards,
    completedTrainings,
    todayProgress: {
      typeRecognition: { done: today.typeRecognition, target: 5 },
      keywordExtraction: { done: today.keywordExtraction, target: 5 },
      outline: { done: today.outline, target: 3 },
      cards: { done: todayCards, target: 10 },
      writing: { done: today.writing, target: 1 },
    },
  };
}

export interface WeaknessAnalysis {
  weakTypes: { type: string; count: number }[];
  weakThemeGroups: { theme: string; count: number }[];
  weakCards: { cardId: string; questionTitle: string; rating: string }[];
  recentWritings: WritingDraft[];
  totalMistakes: number;
}

export function analyzeWeaknesses(questions: Question[]): WeaknessAnalysis {
  const records = getTrainingRecords();
  const wrongTypes = records.filter((r) => r.type === "type_recognition" && r.typeCorrect === false);
  const wrongKeywords = records.filter((r) => r.type === "keyword_extraction" && r.keywordCorrect === false);

  // Weak types
  const typeCounts: Record<string, number> = {};
  for (const r of wrongTypes) {
    const q = questions.find((q) => q.id === r.questionId);
    if (q) {
      typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
    }
  }
  const weakTypes = Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  // Weak theme groups
  const themeCounts: Record<string, number> = {};
  const allWrongIds = [...wrongTypes, ...wrongKeywords].map((r) => r.questionId);
  for (const id of allWrongIds) {
    const q = questions.find((q) => q.id === id);
    if (q) {
      themeCounts[q.themeGroup] = (themeCounts[q.themeGroup] || 0) + 1;
    }
  }
  const weakThemeGroups = Object.entries(themeCounts)
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count);

  // Weak cards
  const cardProgress = getCardProgress();
  const weakCards = Object.entries(cardProgress)
    .filter(([, p]) => p.rating === "again" || p.rating === "hard")
    .map(([cardId, p]) => {
      const q = questions.find((q) =>
        q.memorizationCards.some((c) =>
          (c as unknown as { id?: string }).id === cardId || cardId.includes(q.id)
        )
      );
      return {
        cardId,
        questionTitle: q?.chineseTitle || "未知题目",
        rating: p.rating,
      };
    })
    .slice(0, 20);

  // Recent writings
  const writings = getWritingDrafts()
    .filter((d) => d.submittedAt)
    .sort((a, b) => new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime())
    .slice(0, 10);

  return {
    weakTypes,
    weakThemeGroups,
    weakCards,
    recentWritings: writings,
    totalMistakes: wrongTypes.length + wrongKeywords.length,
  };
}

export interface PersonalizedAdvice {
  type: "type_weak" | "theme_weak" | "general";
  message: string;
}

export function generateAdvice(analysis: WeaknessAnalysis): PersonalizedAdvice[] {
  const advice: PersonalizedAdvice[] = [];

  for (const wt of analysis.weakTypes) {
    if (wt.count >= 3) {
      advice.push({
        type: "type_weak",
        message: `你需要重点复习【${wt.type}】题型，已错 ${wt.count} 次。建议先看题型公式，再做 5 道题型识别训练。`,
      });
    }
  }

  for (const wt of analysis.weakThemeGroups) {
    if (wt.count >= 3) {
      advice.push({
        type: "theme_weak",
        message: `你在【${wt.theme}】主题上较弱，错误 ${wt.count} 次。建议复习相关题目的核心关键词和句式。`,
      });
    }
  }

  if (advice.length === 0) {
    advice.push({
      type: "general",
      message: "目前还没有足够的错误记录。继续按计划训练，系统会为你生成个性化建议。",
    });
  }

  return advice;
}
