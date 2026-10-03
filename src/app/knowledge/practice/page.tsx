import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeFromQuery } from "@/components/route-parameters";
export const metadata: Metadata = { title: "知识短练习" };
export default function Page() { return <Suspense fallback={<p className="muted" role="status">正在恢复短练习……</p>}><PracticeFromQuery/></Suspense>; }
