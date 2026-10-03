import { notFound } from "next/navigation";
import { getQuestion, questions } from "@/lib/content";
import { Suspense } from "react";
import { LessonFromQuery } from "@/components/route-parameters";
export const dynamicParams = false;
export function generateStaticParams() { return questions.flatMap((q) => [q.id, ...(q.legacyIds || [])]).map((id) => ({ id })); }
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = getQuestion(id);
  if (!question) notFound();
  return <Suspense fallback={<p className="muted" role="status">正在打开真题课堂……</p>}><LessonFromQuery question={question}/></Suspense>;
}
