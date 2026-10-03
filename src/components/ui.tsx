import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import type { Question } from "@/types/learning";
import { examName, taskNames } from "@/lib/content";
import { ChineseAid } from "./chinese-aid";

export function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "amber" }) { return <span className={`tag ${tone}`}>{children}</span>; }
export function PageIntro({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) { return <div className="page-intro"><div><h1>{title}</h1><p className="lede">{description}</p></div>{children}</div>; }
export function Empty({ title, text, href, action }: { title: string; text: string; href?: string; action?: string }) { return <div className="empty"><BookOpen size={30} /><h3>{title}</h3><p>{text}</p>{href && <Link className="button primary" href={href}>{action}</Link>}</div>; }
export function SourceLinks({ question }: { question: Question }) { return <details className="source-box"><summary>题源与整理说明</summary><p className="fine">{question.directionsNote}</p>{question.sources.map((s) => <div key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.publisher} · {s.title} <ArrowUpRight size={13}/></a><p>{s.note}</p></div>)}<p className="fine">要求按来源整理；参考作文、练习与解析由本项目编写。已进行独立模型校审，未标作真人教师审核。</p></details>; }

export function QuestionPrompt({ question: q }: { question: Question }) {
  return <section className="task-prompt" aria-label="题目要求">
    <div className="row between wrap"><h2>题目要求</h2>{q.directionsNote.includes("教学重构") && <span className="fine">真题主题 · 教学重构</span>}<span className="task-rules">30 分钟 · {q.wordRange.min}–{q.wordRange.max} 词{q.wordRange.excludeOpening && "（不计给定首句）"}</span></div>
    {q.requiredOpening ? <div className="given-opening"><strong>给定首句 · 写作时须保留</strong><p className="english">{q.requiredOpening}</p><ChineseAid text={q.requiredOpeningZh}/></div> : <div className="task-topic-text"><p className="english">{q.prompt}</p>{q.promptZh !== q.prompt && <ChineseAid text={q.promptZh}/>}</div>}
    <p className="task-guidance"><strong>写作要求：</strong>{q.directionsZh}</p>
    <details className="task-directions-detail"><summary>完整英文指令</summary><p className="english task-directions">{q.directions}</p><ChineseAid text={q.directionsZh} label="题意理解"/></details>
  </section>;
}
export function QuestionCard({ question, index }: { question: Question; index?: number }) { return <Link className="question-card" href={`/classroom/${question.id}`}><div className="question-top"><span className="index-number">{index !== undefined ? String(index + 1).padStart(2, "0") : question.year}</span><Tag tone={question.deep ? "green" : "neutral"}>{question.deep ? <><Sparkles size={11}/> 深度单元</> : question.directionsNote.includes("教学重构") ? "真题主题 · 教学重构" : "真题练习"}</Tag></div><div className="question-meta">{examName(question.exam)} · {question.year}.{question.month.padStart(2, "0")} · {question.theme}</div><h3>{question.title}</h3><p className="question-prompt english">{question.prompt}</p>{question.promptZh !== question.prompt && <ChineseAid text={question.promptZh}/> }<div className="question-footer"><span>{taskNames[question.taskKind]}</span><span>进入课堂 <ArrowUpRight size={14}/></span></div></Link>; }
