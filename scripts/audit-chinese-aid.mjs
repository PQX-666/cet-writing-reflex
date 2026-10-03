import { readFileSync } from "node:fs";

const read = (name) => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), "utf8"));
const questions = ["cet4", "cet6"].flatMap(read);
const units = read("knowledge").units;
const errors = [];
let entries = 0;
const chinese = (value, path) => {
  entries++;
  if (typeof value !== "string" || !value.trim() || !/[\u4e00-\u9fff]/.test(value)) errors.push(`${path}缺少中文理解`);
};
for (const unit of units) {
  for (const key of ["formZh", "exampleZh"]) chinese(unit[key], `${unit.id}.${key}`);
  chinese(unit.recall.referenceZh, `${unit.id}.recall.referenceZh`);
  chinese(unit.application.referenceZh, `${unit.id}.application.referenceZh`);
  for (const key of ["wrongZh", "betterZh"]) chinese(unit.contrast[key], `${unit.id}.contrast.${key}`);
}
for (const q of questions) {
  for (const key of ["directionsZh", "promptZh"]) chinese(q[key], `${q.id}.${key}`);
  if (q.requiredOpening) chinese(q.requiredOpeningZh, `${q.id}.requiredOpeningZh`);
  const paragraphs = q.modelEssay.split(/\n+/);
  if (!Array.isArray(q.modelEssayZh) || q.modelEssayZh.length !== paragraphs.length) errors.push(`${q.id}范文中英文段落不对应`);
  (q.modelEssayZh ?? []).forEach((text, i) => chinese(text, `${q.id}.modelEssayZh[${i}]`));
  q.reasoning.forEach((reason, i) => {
    for (const key of ["claimZh", "mechanismZh", "exampleZh", "linkZh"]) chinese(reason[key], `${q.id}.reasoning[${i}].${key}`);
  });
  q.expressions.forEach((expression) => {
    for (const key of ["patternZh", "exampleZh"]) chinese(expression[key], `${expression.id}.${key}`);
  });
  for (const key of ["weakParagraphZh", "improvedParagraphZh"]) chinese(q.exercise[key], `${q.id}.exercise.${key}`);
  q.commonErrors.forEach((error, i) => {
    for (const key of ["wrongZh", "rightZh"]) chinese(error[key], `${q.id}.commonErrors[${i}].${key}`);
  });
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(JSON.stringify({ status: "PASS", knowledgeUnits: units.length, questions: questions.length, expressions: questions.reduce((n, q) => n + q.expressions.length, 0), essayParagraphs: questions.reduce((n, q) => n + q.modelEssayZh.length, 0), chineseEntries: entries, note: "检查中文覆盖与段落对应；不替代翻译语义审核。" }));
