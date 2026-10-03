import { LegacyRedirect } from "@/components/legacy-redirect";
import { getQuestion, questions } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return questions.flatMap((q) => [q.id, ...(q.legacyIds || [])]).map((id) => ({ id })); }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const q = getQuestion(id); return <LegacyRedirect href={q ? `/classroom/${q.id}` : "/classroom"}/>; }
