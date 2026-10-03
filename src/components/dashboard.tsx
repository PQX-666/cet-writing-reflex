"use client";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { useLearning } from "./learning-provider";
import { questions, expressions, examName, skillNames } from "@/lib/content";
import { chinaDayKey, deriveEvidence, getReviewQueue, recommendTask } from "@/lib/learning";
import { QuestionCard, Tag } from "./ui";
import type { Skill } from "@/types/learning";
import { KnowledgeEntry } from "./knowledge";

export function Dashboard() {
  const { state, ready, commit } = useLearning();
  const pool = questions.filter((q) => q.exam === state.profile.exam && !q.evaluation);
  const units = pool.filter((q) => q.deep);
  const recommendation = recommendTask(questions, state);
  const recommended = questions.find((q) => q.id === recommendation.questionId) ?? units[0];
  const examQuestions = questions.filter((q) => q.exam === state.profile.exam);
  const examEvents = state.events.filter((e) => examQuestions.some((q) => q.id === e.contentId || q.expressions.some((x) => x.id === e.contentId)));
  const evidence = deriveEvidence(examEvents);
  const today = examEvents.filter((e) => e.type !== "read" && e.type !== "legacy" && chinaDayKey(e.at) === chinaDayKey(new Date()));
  const due = getReviewQueue(expressions.filter((e) => examQuestions.some((q) => (!q.evaluation || state.assessmentExposures.includes(q.id) && state.drafts[q.id]?.versions.some((v) => v.kind === "original")) && q.expressions.some((x) => x.id === e.id))), state).length;
  const revisions = examEvents.filter((e) => e.type === "revision").length;
  const examDays = state.profile.examDate ? Math.round((Date.parse(`${state.profile.examDate}T00:00:00+08:00`) - Date.parse(`${chinaDayKey(new Date())}T00:00:00+08:00`)) / 86400000) : undefined;
  const href = recommendation.kind === "review" ? "/review" : recommendation.kind === "revision" ? `/studio/${recommended.id}` : `/classroom/${recommended.id}?focus=${recommendation.skill}`;
  return <div className="dashboard">
    <div className="dashboard-intro"><h1>今日练习</h1><Link className="text-link" href="/guide">使用手册 <ArrowRight size={14}/></Link></div>
    <section className="daily-section" aria-label="今日推荐">
      <div className="next-task dashboard-task">
        <div className="row between wrap"><Tag tone="green">{examName(state.profile.exam)}{state.profile.onboardingComplete && ` · ${skillNames[recommendation.skill]}`}</Tag><span className="muted row"><Clock3 size={14}/> {state.profile.onboardingComplete ? recommendation.minutes : 30} 分钟</span></div>
        {state.profile.onboardingComplete ? <>
          <h2>{recommended.title}</h2>
          <p className="fine">{recommended.year}.{recommended.month} · {recommended.theme}</p>
          <p>{recommendation.title}</p>
          <div className="row wrap"><Link className="button primary" href={href}>开始今日练习 <ArrowRight size={16}/></Link><Link className="text-link" href="/classroom">自己选题 <ArrowRight size={14}/></Link></div>
          <details className="dashboard-recommendation"><summary>为什么推荐这项练习？</summary><p className="fine">{recommendation.reason}</p></details>
        </> : <>
          <h2>先做一次写作诊断</h2>
          <p>选一道未练过的题，独立写原稿，再确定最需要改善的问题。</p>
          <div className="row wrap"><Link className="button primary" href="/assessment">开始诊断 <ArrowRight size={16}/></Link><Link className="text-link" href="/classroom">直接选题练习 <ArrowRight size={14}/></Link></div>
        </>}
      </div>
    </section>
    <section aria-label="真题入口"><div className="section-heading"><h2>选一道真题</h2><Link className="text-link" href="/classroom">全部真题 <ArrowRight size={15}/></Link></div><div className="question-grid">{units.slice(0, 3).map((q, i) => <QuestionCard key={q.id} question={q} index={i}/>)}</div></section>
    <KnowledgeEntry/>
    <details className="panel dashboard-details"><summary>学习记录与练习目标</summary><div className="stack">
      <div className="learning-pulse"><div className="section-heading compact"><h3>学习记录</h3><Tag>{ready ? "本机记录" : "加载记录"}</Tag></div><div className="metric-row"><span>今日学习活动</span><strong>{today.length}<small> 次</small></strong></div><div className="metric-row"><span>保留的修订</span><strong>{revisions}<small> 次</small></strong></div><div className="metric-row"><span>到期表达卡片</span><strong>{due}<small> 张</small></strong></div><p className="fine">每日安排 {state.profile.minutesPerDay} 分钟{examDays !== undefined && (examDays >= 0 ? ` · 距设置的考试日期 ${examDays} 天` : " · 设置的考试日期已过")}。完成次数反映练习记录；新题中的独立表现才反映应用情况。</p><div className="row wrap"><Link href="/review" className="text-link">查看记录 <ArrowRight size={14}/></Link><Link href="/assessment" className="text-link">换题复测 <ArrowRight size={14}/></Link><Link href="/settings" className="text-link">学习设置 <ArrowRight size={14}/></Link></div></div>
      <div className="focus-section"><div><h3>练习目标</h3><p className="muted">选择一项，今日任务会跟随调整。</p></div><div className="focus-options">{(Object.keys(skillNames) as Skill[]).map((skill) => <button key={skill} disabled={!ready} onClick={() => commit((s) => ({ ...s, profile: { ...s.profile, focus: skill } }))} className={state.profile.focus === skill ? "selected" : ""}><span>{skillNames[skill]}</span><small>{evidence[skill]?.label || "尚未形成练习记录"}</small></button>)}</div></div>
    </div></details>
  </div>;
}
