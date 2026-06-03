import type { EssayScore, EssayCheck, Question } from "@/types/dataset";

const CONNECTORS = [
  "first", "firstly", "second", "secondly", "third", "thirdly",
  "moreover", "furthermore", "in addition", "besides",
  "however", "nevertheless", "on the contrary", "in contrast",
  "therefore", "as a result", "consequently", "thus",
  "in conclusion", "to sum up", "on the whole", "in summary",
  "only in this way", "for example", "for instance",
];

const SUMMARY_PATTERNS = [
  "in conclusion", "to sum up", "in summary", "on the whole",
  "in a word", "all in all", "to conclude", "in brief",
];

const SUGGESTION_PATTERNS = [
  "should", "ought to", "had better", "it is necessary",
  "it is important", "we must", "need to", "have to",
  "only in this way", "it is high time",
];

export function scoreEssay(essay: string, question: Question): EssayScore {
  const cleanEssay = essay.trim();
  const wordCount = cleanEssay ? cleanEssay.split(/\s+/).filter(Boolean).length : 0;
  const paragraphs = cleanEssay ? cleanEssay.split(/\n\n+/).filter((p) => p.trim().length > 0) : [];
  const paragraphCount = paragraphs.length;

  const essayLower = cleanEssay.toLowerCase();

  const checks: EssayCheck[] = [];

  // Word count 150-200
  const wordCountOk = wordCount >= 150 && wordCount <= 200;
  checks.push({
    name: "词数 150-200",
    passed: wordCountOk,
    message: wordCountOk
      ? `词数 ${wordCount}，符合要求`
      : wordCount < 150
        ? `词数 ${wordCount}，不足 150`
        : `词数 ${wordCount}，超过 200`,
  });

  // At least 3 paragraphs
  const paragraphsOk = paragraphCount >= 3;
  checks.push({
    name: "至少三段",
    passed: paragraphsOk,
    message: paragraphsOk
      ? `共 ${paragraphCount} 段，结构清晰`
      : `仅 ${paragraphCount} 段，建议至少3段`,
  });

  // Core keywords
  const foundKeywords = question.coreKeywords.filter((kw) =>
    essayLower.includes(kw.toLowerCase())
  );
  const keywordsOk = foundKeywords.length >= 1;
  checks.push({
    name: "包含核心关键词",
    passed: keywordsOk,
    message: keywordsOk
      ? `已包含: ${foundKeywords.slice(0, 3).join(", ")}`
      : "未检测到核心关键词",
  });

  // Connectors
  const foundConnectors = CONNECTORS.filter((c) => essayLower.includes(c));
  const connectorsOk = foundConnectors.length >= 2;
  checks.push({
    name: "使用连接词",
    passed: connectorsOk,
    message: connectorsOk
      ? `已使用: ${foundConnectors.join(", ")}`
      : "连接词不足2个",
  });

  // Summary expression
  const hasSummary = SUMMARY_PATTERNS.some((p) => essayLower.includes(p));
  checks.push({
    name: "有总结表达",
    passed: hasSummary,
    message: hasSummary ? "结尾有总结表达" : "缺少总结表达（如 in conclusion）",
  });

  // Suggestion sentence
  const hasSuggestion = SUGGESTION_PATTERNS.some((p) => essayLower.includes(p));
  checks.push({
    name: "有建议句",
    passed: hasSuggestion,
    message: hasSuggestion ? "包含建议/呼吁句" : "缺少建议句（如 should, only in this way）",
  });

  // Calculate score
  let score = 0;
  score += wordCountOk ? 20 : wordCount >= 100 ? 10 : 0;
  score += paragraphsOk ? 20 : paragraphCount === 2 ? 10 : 0;
  score += keywordsOk ? Math.min(foundKeywords.length * 10, 20) : 0;
  score += connectorsOk ? Math.min(foundConnectors.length * 5, 20) : 0;
  score += hasSummary ? 10 : 0;
  score += hasSuggestion ? 10 : 0;

  return {
    score,
    wordCount,
    paragraphCount,
    checks,
    scoreType: "formal_check",
    scoreNotice: "此评分为形式完成度检查，不等同于真实六级作文得分。",
  };
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

export function countParagraphs(text: string): number {
  return text.trim()
    ? text.trim().split(/\n\n+/).filter((p) => p.trim().length > 0).length
    : 0;
}

export function detectConnectors(text: string): string[] {
  return CONNECTORS.filter((c) => text.toLowerCase().includes(c));
}

export function detectKeywords(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw.toLowerCase()));
}

export { CONNECTORS, CONNECTORS as CONNECTOR_LIST };
