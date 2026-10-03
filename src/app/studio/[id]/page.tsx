import { notFound } from "next/navigation";
import { Studio } from "@/components/studio";
import { getQuestion, questions } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return questions.flatMap((q) => [q.id, ...(q.legacyIds || [])]).map((id) => ({ id })); }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const q = getQuestion(id); if (!q) notFound(); return <Studio key={q.id} question={q}/>; }
