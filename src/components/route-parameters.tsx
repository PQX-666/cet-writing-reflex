"use client";

import { useSearchParams } from "next/navigation";
import { KnowledgeIndex } from "./knowledge";
import { KnowledgePractice } from "./knowledge-practice";
import { Lesson } from "./lesson";
import { LegacyRedirect } from "./legacy-redirect";
import { knowledge } from "@/lib/knowledge-content";
import { getQuestion, skillNames } from "@/lib/content";
import type { Question, Skill } from "@/types/learning";

export function KnowledgeFromQuery() {
  const params = useSearchParams();
  const theme = params.get("theme") || "";
  const initialTheme = knowledge.themes.some((x) => x.id === theme) ? theme : "";
  const search = (params.get("search") || "").slice(0, 300);
  return <KnowledgeIndex key={`${initialTheme}:${search}`} initialTheme={initialTheme} initialSearch={search}/>;
}

export function PracticeFromQuery() {
  const params = useSearchParams();
  return <KnowledgePractice requestedUnit={params.get("unit") || ""} requestedTheme={params.get("theme") || ""} requestedPrepared={params.get("prepared") === "1"}/>;
}

export function LessonFromQuery({ question }: { question: Question }) {
  const params = useSearchParams();
  const focus = params.get("focus") || "";
  const skill: Skill = Object.hasOwn(skillNames, focus) ? focus as Skill : "task";
  return <Lesson key={`${question.id}:${skill}`} question={question} initialSkill={skill}/>;
}

export function WritingFromQuery() {
  const params = useSearchParams();
  const question = getQuestion(params.get("questionId") || params.get("q") || "");
  return <LegacyRedirect href={question ? `/studio/${question.id}` : "/studio"}/>;
}
