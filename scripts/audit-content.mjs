import { readFileSync } from "node:fs";
import { checkWriting } from "../src/lib/checks.ts";

const data = ["cet6", "cet4"].flatMap((name) => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), "utf8")));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
assert(data.length === 30, `题库数量应30，实际${data.length}`);
assert(data.filter((q) => q.exam === "CET6").length === 20, "六级应20题");
assert(data.filter((q) => q.exam === "CET4").length === 10, "四级应10题");
assert(data.filter((q) => q.deep).length === 12, "深度单元应12题");
assert(data.filter((q) => q.evaluation).length === 8, "保留评估应8题");
assert(new Set(data.map((q) => q.id)).size === data.length, "题目ID重复");
const expressions = data.flatMap((q) => q.expressions);
assert(expressions.length === 80, `表达应80条，实际${expressions.length}`);
assert(new Set(expressions.map((e) => e.id)).size === expressions.length, "表达ID重复");
assert(new Set(expressions.map((e) => e.text.toLowerCase().trim())).size === expressions.length, "表达文本重复");
const counts = [];
for (const q of data) {
  const check = checkWriting(q.modelEssay, q);
  counts.push({ id: q.id, words: check.wordCount, total: check.totalWordCount, excludeOpening: q.wordRange.excludeOpening });
  assert(check.wordCount >= q.wordRange.min && check.wordCount <= q.wordRange.max, `${q.id} 范文字数${check.wordCount}不合${q.wordRange.min}–${q.wordRange.max}`);
  assert(!q.deep || !q.evaluation, `${q.id} 深度教学不能同时保留评估`);
  assert(q.sources.length > 0 && q.sources.every((s) => s.url.startsWith("https://") && s.publisher && s.note), `${q.id} 来源不完整`);
  assert(q.directions && q.directionsNote && q.prompt, `${q.id} 指令或核验说明不完整`);
  assert(q.task.requirements.length > 0 && q.task.objective && q.task.avoid.length > 0, `${q.id} 任务分析不完整`);
  assert(q.routes.length >= (q.deep ? 2 : 1), `${q.id} 提纲数量不足`);
  assert(q.reasoning.length >= (q.deep ? 2 : 1), `${q.id} 理由链数量不足`);
  assert(q.reasoning.every((r) => r.claim && r.mechanism && r.example && r.link), `${q.id} 理由链缺项`);
  assert(q.modelNotes.length > 0 && q.commonErrors.length > 0 && q.commonErrors.every((e) => e.wrong !== e.right && e.why), `${q.id} 评注或反例缺项`);
  assert(Object.values(q.exercise).every((v) => typeof v === "string" && v.trim()), `${q.id} 练习缺项`);
  assert(q.expressions.length === (q.exam === "CET6" ? 3 : 2), `${q.id} 表达数量异常`);
  assert(q.expressions.every((e) => e.text && e.pattern && e.example && e.boundary), `${q.id} 表达语境或边界缺失`);
  if (q.promptMode === "given-opening") assert(check.checks.find((c) => c.key === "opening")?.status === "pass", `${q.id} 范文未匹配给定首句`);
  if (q.wordRange.excludeOpening) assert(q.promptMode === "given-opening" && Boolean(q.requiredOpening), `${q.id} 排除首句规则没有首句`);
  assert(q.reviewStatus === "independent-model-review", `${q.id} 校审声明异常`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(JSON.stringify({ status: "PASS", questions: data.length, deepUnits: 12, heldOut: 8, expressions: expressions.length, wordCounts: counts, note: "结构和计词检查通过；不替代语义、来源和教师审阅。" }, null, 2));
