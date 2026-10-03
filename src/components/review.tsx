"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock3, History, RotateCcw } from "lucide-react";
import { useLearning } from "./learning-provider";
import { Empty, PageIntro, Tag } from "./ui";
import { examName, getQuestion, questions, skillNames } from "@/lib/content";
import { getNewExpressions, getReviewQueue, rateCard } from "@/lib/learning";
import type { CardRating, Exam, LearningEvent } from "@/types/learning";
import { KnowledgeEntry } from "./knowledge";
import { ChineseAid } from "./chinese-aid";
import { getKnowledgeUnit } from "@/lib/knowledge-content";

const eventNames: Record<LearningEvent["type"], string> = { practice: "任务尝试", revision: "修改", review: "表达复习", assessment: "保留题写作", read: "阅读解析", "self-check": "自查", legacy: "旧版存档" };
const formatDate = (value: string) => new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });

export function Review() {
  const { state, ready, commit, notify } = useLearning();
  const [mode, setMode] = useState<"due" | "new" | "history">("due");
  const [examFilter, setExamFilter] = useState<Exam | "all" | "current">("current");
  const [attempt, setAttempt] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [missed, setMissed] = useState(false);
  const [historyLimit, setHistoryLimit] = useState(30);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer); }, []);
  const exam = examFilter === "current" ? state.profile.exam : examFilter;
  const studyQuestions = questions.filter((q) => (exam === "all" || q.exam === exam)
    && (!q.evaluation || state.drafts[q.id]?.versions.some((version) => version.kind === "original") && state.assessmentExposures.includes(q.id)));
  const expressions = studyQuestions.flatMap((q) => q.expressions);
  const due = getReviewQueue(expressions, state, now);
  const fresh = getNewExpressions(expressions, state);
  const cards = mode === "new" ? fresh : due;
  const card = cards[0];
  const owner = (contentId: string) => {
    const question = getQuestion(contentId) || questions.find((q) => q.expressions.some((expression) => expression.id === contentId));
    if (question) return question;
    const unit = contentId.startsWith("knowledge:") ? getKnowledgeUnit(contentId.slice("knowledge:".length)) : undefined;
    return unit ? { title: unit.title, exam: unit.exam === "both" ? state.profile.exam : unit.exam } : undefined;
  };
  const events = state.events.filter((event) => exam === "all" || owner(event.contentId)?.exam === exam)
    .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  const drafts = Object.values(state.drafts).filter((draft) => exam === "all" || owner(draft.contentId)?.exam === exam)
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  const active = events.filter((e) => e.type !== "legacy" && e.type !== "read");
  const noHints = active.filter((e) => !e.hintUsed && e.mode !== "guided" && !["again", "assisted", "unrecognized"].includes(e.outcome));
  const resetAttempt = () => { setAttempt(""); setRevealed(false); setMissed(false); };
  const rate = (rating: CardRating) => {
    if (!card || !revealed) return;
    if (missed && (rating === "good" || rating === "easy")) return;
    const submitted = attempt.trim();
    const ok = commit((previous) => {
      const updated = rateCard(previous, card.id, rating);
      const index = updated.events.length - 1;
      updated.events[index] = { ...updated.events[index], evidence: submitted
        ? `回忆或造句原文：\n${submitted}\n\n对照后的自评：${rating}。此记录未经语义或语法评估。`
        : "本次没有想起，查看了答案。卡片自评不代表已掌握。", hintUsed: missed || !submitted, mode: missed || !submitted ? "guided" : "independent" };
      return updated;
    });
    resetAttempt();
    if (ok) notify("已保存这次原始作答与自评，并更新下次复习时间。");
  };

  return <div className="stack"><PageIntro title="复习与学习记录" description="先写出自己的英文，再对照参考表达。" />
    <div className="row between"><div className="row wrap"><button className={`button ${mode === "due" ? "primary" : "ghost"}`} onClick={() => { setMode("due"); resetAttempt(); }}>到期复习 <Tag>{due.length}</Tag></button><button className={`button ${mode === "new" ? "primary" : "ghost"}`} onClick={() => { setMode("new"); resetAttempt(); }}>新表达 <Tag>{fresh.length}</Tag></button><button className={`button ${mode === "history" ? "primary" : "ghost"}`} onClick={() => { setMode("history"); resetAttempt(); }}><History size={16}/> 学习记录</button></div><label className="row muted">范围<select aria-label="复习与记录的考试范围" value={examFilter} onChange={(e) => { setExamFilter(e.target.value as typeof examFilter); resetAttempt(); setHistoryLimit(30); }}><option value="current">当前：{examName(state.profile.exam)}</option><option value="CET6">六级</option><option value="CET4">四级</option><option value="all">全部（含旧记录）</option></select></label></div>
    {!ready ? <Empty title="正在读取本机记录" text="完成加载后可开始复习。" /> : mode !== "history" ? card ? <section className="panel stack"><div className="row between"><Tag tone="green">{mode === "new" ? "第一次回忆" : "到期表达"}</Tag><span className="muted">本次队列 {cards.length} 张</span></div><div><p className="fine">用英文表达这个意思，或在新情境中造句</p><h2>{card.meaning}</h2></div><label className="field">你的原始作答<textarea aria-label="你的英文回忆或造句" rows={4} className="english" value={attempt} readOnly={revealed} placeholder="先写一句英文，再查看参考表达……" onChange={(e) => setAttempt(e.target.value)} /></label>
      {!revealed ? <div className="row wrap"><button className="button primary" disabled={!attempt.trim()} onClick={() => setRevealed(true)}>我已尝试，查看参考 <ArrowRight size={16}/></button><button className="button ghost" onClick={() => { setMissed(true); setRevealed(true); }}>没有想起，查看答案</button></div> : <><div className="feedback"><p className="fine">参考表达</p><p className="english">{card.text}</p><ChineseAid text={card.meaning}/><p className="muted">句型：{card.pattern}</p><ChineseAid text={card.patternZh}/><p className="english">例子：{card.example}</p><ChineseAid text={card.exampleZh}/><p className="fine">适用边界：{card.boundary}</p></div><div><p className="muted">按这次回忆情况自评，系统会调整复习时间。{missed && "这次先看了答案，请选择重试或模糊。"}</p><div className="row wrap">{(["again", "hard", "good", "easy"] as CardRating[]).map((rating, index) => <button key={rating} disabled={missed && index > 1} className={`button ${index === 0 ? "ghost" : "secondary"}`} onClick={() => rate(rating)}>{["没想起 / 不会用", "有些模糊", "基本能回忆", "这次很顺利"][index]}</button>)}</div></div></>}
      {state.reviews[card.id] && <p className="fine row"><Clock3 size={14}/> 已复习 {state.reviews[card.id].reviewCount} 次 · 上次自评 {state.reviews[card.id].lastRating}</p>}
    </section> : <Empty title={mode === "due" ? "目前没有到期表达" : "这一范围的新表达已练过"} text={mode === "due" ? "到期卡片会按时间进入队列。你也可以选择新表达，或回到课堂练习一个段落。" : "练过并不代表已掌握。等待到期回忆，也可换题检验应用。"} href="/classroom" action="回到真题课堂" /> : <>
      <section className="panel"><div className="row between wrap"><h2>尝试与修改</h2><Tag>本机历史</Tag></div><div className="metric-grid"><div><strong>{active.length}</strong><p>学习活动</p></div><div><strong>{events.filter((e) => e.type === "revision").length}</strong><p>修改记录</p></div><div><strong>{noHints.length}</strong><p>无提示尝试记录</p></div></div><p className="fine">次数反映学习活动，不能直接说明写作掌握情况。</p></section>
      <section className="stack"><div className="section-heading"><h2>保留的作文版本</h2><span className="fine">原文与修订理由一起保留</span></div>{drafts.length ? drafts.map((draft) => <article className="panel stack" key={draft.contentId}><div className="row between wrap"><h3>{owner(draft.contentId)?.title || draft.contentId}</h3><span className="fine">{formatDate(draft.updatedAt)}</span></div><details><summary>当前草稿 · {draft.versions.length} 个已保存版本</summary><p className="english preserve">{draft.text || "尚无正文"}</p></details>{draft.versions.map((version, index) => <details key={version.id}><summary><Tag tone={version.kind === "revision" ? "green" : "neutral"}>{version.id.startsWith("legacy-") ? "旧版稿件" : version.kind === "original" ? "原稿" : "修改稿"}</Tag> 第 {index + 1} 版 · {formatDate(version.at)}</summary><p className="english preserve">{version.text}</p>{version.reflection && <p className="fine preserve">修改理由 / 存档说明：{version.reflection}</p>}</details>)}</article>) : <Empty title="还没有作文版本" text="在写作工作室保存原稿，完成修改后再保存修订稿。" href="/studio" action="写一篇作文" />}</section>
      <section className="stack"><div className="section-heading"><h2>任务事件</h2><span className="fine">最近记录在前</span></div>{events.length ? events.slice(0, historyLimit).map((event) => <article className="panel" key={event.id}><div className="row between wrap"><div className="row wrap"><Tag tone={event.type === "legacy" ? "amber" : "neutral"}>{eventNames[event.type]}</Tag><span>{skillNames[event.skill]} · {owner(event.contentId)?.title || "表达回忆 / 历史题目"}</span></div><time className="fine" dateTime={event.at}>{formatDate(event.at)}</time></div><p className="preserve">{event.evidence}</p><div className="row wrap fine"><span>{event.type === "legacy" ? "旧版未验证，不作为掌握证据" : event.hintUsed ? "使用了提示或答案" : "未使用提示"}</span></div></article>) : <Empty title="从一次尝试开始" text="作答、修改和卡片回忆会留下记录。你可以随时返回查看原文。" href="/classroom" action="选择一道真题" />}{events.length > historyLimit && <button className="button ghost" onClick={() => setHistoryLimit((n) => n + 30)}><RotateCcw size={15}/> 再显示 30 条</button>}</section>
    </>}
    <KnowledgeEntry/>
    <details className="panel secondary-details"><summary>复习方法与记录说明</summary><div className="stack"><p>先回忆或造句，再对照意思、搭配和使用条件。英文可以与参考不同。自评用来安排下次复习，不等于正确率或写作掌握。</p><p>复习间隔根据历史自评调整，是简单安排规则，尚不是个体记忆模型。这里按原题复习具体表达；通用用法与主题应用可进入知识库短练习。</p><p>保留评估题的表达，在保存原稿并查看本题参考或反馈后才加入；未解锁的答案不会在这里展示。</p><p className="fine">无提示说明作答条件，不说明答案正确或已掌握。旧版记录与阅读解析不计入活动统计。</p></div></details>
  </div>;
}
