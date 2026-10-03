import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync(new URL("../src/data/knowledge.json", import.meta.url), "utf8"));
const questions = ["cet4", "cet6"].flatMap((name) => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), "utf8")));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const nonempty = (value) => typeof value === "string" && Boolean(value.trim());
const unique = (items) => new Set(items).size === items.length;
const themes = new Set(catalog.themes.map((x) => x.id));
const functions = new Set(catalog.functions.map((x) => x.id));
const sources = new Set(catalog.sources.map((x) => x.id));
const questionMap = new Map(questions.map((x) => [x.id, x]));
const expressionMap = new Map(questions.flatMap((q) => q.expressions.map((e) => [e.id, q])));
assert(catalog.version === 1 && catalog.updatedAt === "2026-10-03", "目录版本或核验日期异常");
assert(catalog.units.length === 48 && catalog.units.filter((x) => x.core).length === 18, "应有48单元与18核心");
assert(themes.size === 12 && functions.size === 12, "主题和用途应各12类");
for (const [category, count] of Object.entries({ function: 12, grammar: 6, genre: 6, topic: 24 })) assert(catalog.units.filter((x) => x.category === category).length === count, `${category}数量异常`);
for (const list of [catalog.units, catalog.themes, catalog.functions, catalog.sources]) assert(unique(list.map((x) => x.id)), "目录ID重复");
assert(unique(catalog.units.map((x) => x.title)), "知识标题重复");
assert(unique(catalog.units.map((x) => x.application.reference)), "不同单元的应用参考完全重复");
for (const theme of catalog.themes) {
  assert(nonempty(theme.title) && nonempty(theme.description) && theme.examples.length > 0, `${theme.id}主题介绍不完整`);
  assert(theme.sourceIds.length > 0 && theme.sourceIds.every((id) => sources.has(id)), `${theme.id}主题缺来源`);
  assert(catalog.units.filter((x) => x.category === "topic" && x.themeIds.includes(theme.id)).length >= 2, `${theme.id}缺主题应用`);
}
for (const source of catalog.sources) {
  assert(["official", "exam-transcription", "dictionary", "book"].includes(source.kind), `${source.id}来源类别未知`);
  assert([source.title, source.publisher, source.note].every(nonempty), `${source.id}来源说明不完整`);
  try { assert(new URL(source.url).protocol === "https:", `${source.id}应使用HTTPS来源`); } catch { errors.push(`${source.id}来源URL无效`); }
}
for (const unit of catalog.units) {
  assert(/^[a-z0-9_-]+$/.test(unit.id), `${unit.id}ID不适合稳定路由`);
  assert([unit.title, unit.meaning, unit.form, unit.usage, unit.boundary, unit.example, ...Object.values(unit.recall), unit.application.prompt, unit.application.reference, ...Object.values(unit.contrast)].every(nonempty), `${unit.id}解释或练习缺项`);
  assert(["both", "CET4", "CET6"].includes(unit.exam), `${unit.id}级别未知`);
  assert(unit.core === ["function", "grammar"].includes(unit.category), `${unit.id}核心归类异常`);
  assert(unit.themeIds.every((id) => themes.has(id)) && unit.functionIds.length > 0 && unit.functionIds.every((id) => functions.has(id)), `${unit.id}主题/用途关联无效`);
  assert(unit.application.criteria.length >= 2 && unit.application.criteria.every(nonempty), `${unit.id}应用自查不足`);
  assert(unit.contrast.wrong !== unit.contrast.better, `${unit.id}对比表达没有差异`);
  assert(unit.sourceIds.length > 0 && unit.sourceIds.every((id) => sources.has(id)), `${unit.id}来源关联无效`);
  assert(unit.relatedQuestionIds.every((id) => questionMap.has(id) && !questionMap.get(id).evaluation), `${unit.id}链接了不存在或保留评估题`);
  assert(unit.relatedExpressionIds.every((id) => expressionMap.has(id) && !expressionMap.get(id).evaluation), `${unit.id}提前关联保留题表达`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(JSON.stringify({ status: "PASS", units: catalog.units.length, core: 18, themes: themes.size, functions: functions.size, sources: sources.size, note: "结构与关联通过；不证明全主题覆盖、语义质量或学习效果。" }));
