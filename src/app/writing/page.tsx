import { Suspense } from "react";
import { WritingFromQuery } from "@/components/route-parameters";
export default function Page() { return <Suspense fallback={<p role="status">正在打开写作页面……</p>}><WritingFromQuery/></Suspense>; }
