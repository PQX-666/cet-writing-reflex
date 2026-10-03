import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { checkWriting } from "../src/lib/checks.ts";
const all = ["cet6", "cet4"].flatMap((name) => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), "utf8")));
test("every original teaching essay meets its own question's counting requirements", () => {
  for (const q of all) { const facts = checkWriting(q.modelEssay, q); assert.equal(facts.checks[0].status, "pass", q.id); if (q.requiredOpening) assert.equal(facts.checks.find((x) => x.key === "opening")?.status, "pass", q.id); }
});
test("held-out assessments remain separate from deep teaching", () => { assert.equal(all.filter((q) => q.evaluation).length, 8); assert.ok(all.filter((q) => q.evaluation).every((q) => !q.deep)); });
test("materials use individually unique contextual expressions", () => { const e = all.flatMap((q) => q.expressions); assert.equal(e.length, 80); assert.equal(new Set(e.map((x) => x.text.toLowerCase().trim())).size, 80); assert.ok(e.every((x) => x.boundary && x.example && x.pattern)); });
