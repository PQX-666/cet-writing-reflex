"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LegacyRedirect({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => { router.replace(href); }, [href, router]);
  return <div className="panel stack"><p>这个入口已更新，正在前往对应页面。</p><Link className="text-link" href={href}>打开学习页面 →</Link></div>;
}
