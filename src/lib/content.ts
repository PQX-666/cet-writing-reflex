import cet6 from "@/data/cet6.json";
import cet4 from "@/data/cet4.json";
import type { Exam, Question, Skill } from "@/types/learning";

export const questions = [...cet6, ...cet4] as unknown as Question[];
export const expressions = questions.flatMap((q) => q.expressions);
export const getQuestion = (id: string) => questions.find((q) => q.id === id || q.legacyIds?.includes(id));
export const examName = (exam: Exam) => exam === "CET4" ? "四级" : "六级";
export const skillNames: Record<Skill, string> = { task: "读懂任务", reasoning: "展开理由", language: "准确表达", organization: "组织篇章", transfer: "换题应用" };
export const taskNames: Record<Question["taskKind"], string> = { explain: "解释原因", discuss: "讨论观点", compare: "权衡关系", propose: "提出措施", application: "情境应用", describe: "描述说明" };
export const standards = [
  { title: "切题与任务完成", text: "回应题目指定的对象、情境和关系。给定首句等要求以该题指令为准。" },
  { title: "思想表达", text: "观点清楚，用解释或具体例子支撑观点，避免只重复‘很重要’。" },
  { title: "组织与连贯", text: "句子和段落之间有清楚的关系。连接词是表达关系的工具，数量不代表质量。" },
  { title: "语言运用", text: "词汇贴切、语法正确、句式可控。先准确表达，再根据需要增加变化。" },
];
