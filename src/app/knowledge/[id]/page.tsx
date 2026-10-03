import { notFound } from "next/navigation";
import { KnowledgeDetail } from "@/components/knowledge";
import { getKnowledgeUnit, knowledgeUnits } from "@/lib/knowledge-content";
export const dynamicParams = false;
export function generateStaticParams() { return knowledgeUnits.map((unit) => ({ id: unit.id })); }
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getKnowledgeUnit(id);
  if (!unit) notFound();
  return <KnowledgeDetail key={unit.id} unit={unit}/>;
}
