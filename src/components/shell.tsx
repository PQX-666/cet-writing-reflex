"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BookOpen, Compass, Layers3, PenLine, RotateCcw, Settings2 } from "lucide-react";
import { useLearning } from "./learning-provider";
import type { Exam } from "@/types/learning";
const nav = [{ href: "/", label: "今日练习", icon: Compass }, { href: "/classroom", label: "真题课堂", icon: BookOpen }, { href: "/knowledge", label: "知识库", icon: Layers3 }, { href: "/studio", label: "写作与修改", icon: PenLine }, { href: "/review", label: "复习与进步", icon: RotateCcw }];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname(); const { state, commit, ready } = useLearning();
  const changeExam = (exam: Exam) => commit((s) => ({ ...s, profile: { ...s.profile, exam } }));
  return <><a className="skip-link" href="#content">跳到主要内容</a><header className="site-header"><Link href="/" className="brand"><span className="brand-symbol" aria-hidden="true"><PenLine size={22}/></span><span>写作有据</span></Link><nav className="desktop-nav" aria-label="主要导航">{nav.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={(href === "/" ? path === "/" : path.startsWith(href)) ? "active" : ""}><Icon size={16}/>{label}</Link>)}</nav><div className="header-tools"><div className="exam-switch" aria-label="考试级别"><button disabled={!ready} className={state.profile.exam === "CET4" ? "selected" : ""} onClick={() => changeExam("CET4")}>四级</button><button disabled={!ready} className={state.profile.exam === "CET6" ? "selected" : ""} onClick={() => changeExam("CET6")}>六级</button></div><Link className="icon-link" href="/settings" aria-label="学习设置"><Settings2 size={19}/></Link></div></header><main id="content" className="workspace">{children}</main><footer className="site-footer"><span>学习记录保存在当前浏览器</span><div className="row wrap"><Link href="/guide">使用手册 <BookOpen size={13}/></Link><Link href="/about">素材依据与学习方法 <ArrowRight size={13}/></Link></div></footer><nav className="mobile-nav" aria-label="移动导航">{nav.map(({href,label,icon:Icon})=><Link href={href} key={href} className={(href==="/"?path==="/":path.startsWith(href))?"active":""}><Icon size={19}/><span>{label}</span></Link>)}</nav></>;
}
