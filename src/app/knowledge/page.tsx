import type { Metadata } from "next";
import { Suspense } from "react";
import { KnowledgeFromQuery } from "@/components/route-parameters";
export const metadata: Metadata = { title: "写作知识库" };
export default function Page() { return <Suspense fallback={<p className="muted" role="status">正在打开知识库……</p>}><KnowledgeFromQuery/></Suspense>; }
