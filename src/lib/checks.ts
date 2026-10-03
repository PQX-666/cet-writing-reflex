import type { Question, WritingCheck } from "../types/learning.ts";

/** A consistent counting convention, not a prediction of examiner judgement. */
export function countWords(text: string): number {
  return (text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*|\d+(?:[.,]\d+)*/g) || []).length;
}

function normalizeText(text: string): string {
  return text.normalize("NFKC").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}

function normalizeKeyword(text: string): string {
  return normalizeText(text).toLocaleLowerCase("en-US").replace(/^[\s.,;:!?，。；：！？]+|[\s.,;:!?，。；：！？]+$/g, "");
}

export function checkKeywordAnswer(input: string, acceptedVariants: string[]): {
  status: "accepted" | "empty" | "unrecognized"; message: string;
} {
  const normalized = normalizeKeyword(input);
  if (!normalized) return { status: "empty", message: "请先写出你的答案。空白不计作答。" };
  const accepted = acceptedVariants.some((variant) => {
    const candidate = normalizeKeyword(variant);
    return candidate.length > 0 && candidate === normalized;
  });
  return accepted
    ? { status: "accepted", message: "与已审核的参考表达匹配。接下来说明它为什么是题目的重点。" }
    : { status: "unrecognized", message: "未自动识别这个表达，不代表它一定错误。请对照题目与参考表达，检查是否保留了关键含义。" };
}

export function checkWriting(
  text: string,
  question: Pick<Question, "wordRange" | "requiredOpening" | "promptMode">,
): WritingCheck {
  const clean = text.trim();
  const totalWordCount = countWords(clean);
  const opening = question.requiredOpening?.trim();
  const normalizedEssay = normalizeText(clean);
  const normalizedOpening = opening ? normalizeText(opening) : "";
  const hasOpening = Boolean(normalizedOpening && normalizedEssay.startsWith(normalizedOpening)
    && (/[.!?。！？]$/.test(normalizedOpening) || normalizedEssay.length === normalizedOpening.length
      || /\s|[.!?]/.test(normalizedEssay[normalizedOpening.length] || "")));
  const excludedWords = question.wordRange.excludeOpening && hasOpening ? countWords(opening!) : 0;
  const wordCount = Math.max(0, totalWordCount - excludedWords);
  const paragraphCount = clean ? clean.split(/\n\s*\n|\n(?=\S)/).filter((p) => p.trim()).length : 0;
  const { min, max, excludeOpening } = question.wordRange;
  const inRange = wordCount >= min && wordCount <= max;
  const checks: WritingCheck["checks"] = [
    { key: "words", label: `字数范围 ${min}–${max} 词`, status: inRange ? "pass" : "attention",
      detail: `按本工具的英文单词规则计 ${wordCount} 词，全文 ${totalWordCount} 词。${excludeOpening ? "按题目要求，不计已匹配的给定首句。" : "计入全文。"}${inRange ? "在规定范围内。" : wordCount < min ? "还不足最低词数。" : "超过题目规定的上限。"}` },
    { key: "paragraphs", label: "段落分隔", status: "info",
      detail: `检测到 ${paragraphCount} 个非空段落。段落数量不能判断结构或论证质量，按任务需要组织即可。` },
  ];
  if (question.promptMode === "given-opening" && opening) {
    checks.push({ key: "opening", label: "给定首句", status: hasOpening ? "pass" : "attention",
      detail: hasOpening ? "文章以给定句子开头（已归一化空白和引号）。" : "还未匹配题目要求的首句。请核对完整句子及其位置。" });
  }
  const warnings: string[] = [];
  const words = (clean.toLowerCase().match(/[a-z]+(?:['’\-][a-z]+)*/g) || []);
  const ignored = new Set(["the", "a", "an", "and", "or", "of", "to", "in", "it", "is", "are", "be", "that", "we", "they", "for", "with", "as", "on"]);
  const frequencies = new Map<string, number>();
  for (const word of words) if (!ignored.has(word)) frequencies.set(word, (frequencies.get(word) || 0) + 1);
  const repeated = [...frequencies].filter(([, n]) => n >= 8 && n / Math.max(words.length, 1) >= 0.12);
  if (repeated.length) warnings.push(`“${repeated.slice(0, 3).map(([word]) => word).join("、") }”出现较多。请检查是否是必要主题词，还是重复占位；此提示不评价内容质量。`);
  const sentences = clean.split(/[.!?]+/).map((s) => normalizeText(s).toLowerCase()).filter((s) => countWords(s) >= 5);
  if (new Set(sentences).size < sentences.length) warnings.push("检测到重复句子，请核对是否确有需要。重复检测不构成语义评估。");
  return { wordCount, totalWordCount, paragraphCount, checks, warnings };
}
