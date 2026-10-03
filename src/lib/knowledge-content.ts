import data from "@/data/knowledge.json";
import type { KnowledgeCatalog } from "@/types/knowledge";

export const knowledge = data as KnowledgeCatalog;
export const knowledgeUnits = knowledge.units;
export const getKnowledgeUnit = (id: string) => knowledgeUnits.find((unit) => unit.id === id);
export const knowledgeCategoryNames = { function: "通用表达", grammar: "准确用法", genre: "题型任务", topic: "主题应用" };
export const knowledgeThemeName = (id: string) => knowledge.themes.find((theme) => theme.id === id)?.title ?? id;
export const knowledgeFunctionName = (id: string) => knowledge.functions.find((item) => item.id === id)?.title ?? id;
