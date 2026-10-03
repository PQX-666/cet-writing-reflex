import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync(new URL("../src/data/knowledge.json", import.meta.url), "utf8"));
const questions = ["cet4", "cet6"].flatMap((name) => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), "utf8")));
test("knowledge references do not open reserved question answers before assessment", () => {
  const heldOutQuestions = new Set(questions.filter((q) => q.evaluation).map((q) => q.id));
  const heldOutExpressions = new Set(questions.filter((q) => q.evaluation).flatMap((q) => q.expressions.map((e) => e.id)));
  for (const unit of catalog.units) {
    assert.ok(unit.relatedQuestionIds.every((id) => !heldOutQuestions.has(id)), unit.id);
    assert.ok(unit.relatedExpressionIds.every((id) => !heldOutExpressions.has(id)), unit.id);
  }
});
test("all theme families have distinct application tasks and traceable anchors", () => {
  const sourceIds = new Set(catalog.sources.map((s) => s.id));
  for (const theme of catalog.themes) {
    const units = catalog.units.filter((u) => u.category === "topic" && u.themeIds.includes(theme.id));
    assert.ok(units.length >= 2, theme.id);
    assert.equal(new Set(units.map((u) => u.application.prompt)).size, units.length, theme.id);
    assert.ok(theme.sourceIds.length && theme.sourceIds.every((id) => sourceIds.has(id)), theme.id);
  }
});
test("every open knowledge application includes boundaries and multiple comparison criteria", () => {
  for (const unit of catalog.units) {
    assert.ok(unit.boundary.trim(), unit.id);
    assert.ok(unit.application.criteria.length >= 2, unit.id);
    assert.notEqual(unit.contrast.wrong, unit.contrast.better, unit.id);
  }
});
