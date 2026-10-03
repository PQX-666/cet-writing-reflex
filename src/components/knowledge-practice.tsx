"use client";

import Link from "next/link";
import { ChineseAid } from "./chinese-aid";
import { ArrowRight, Check, Eye, RotateCcw } from "lucide-react";
import { useLearning } from "./learning-provider";
import { Empty, PageIntro, Tag } from "./ui";
import { getKnowledgeUnit, knowledgeUnits, knowledgeCategoryNames } from "@/lib/knowledge-content";
import { advanceKnowledgeSession, buildKnowledgeSession, knowledgeCardId, readKnowledgeSession } from "@/lib/knowledge-learning";
import { createId, rateCard } from "@/lib/learning";
import type { CardRating, LearningEvent, LearningState } from "@/types/learning";
import type { KnowledgeSession } from "@/types/knowledge";

const sessionKey = "knowledge:session";
function storeSession(state: LearningState, session: KnowledgeSession): LearningState {
  return { ...state, exerciseDrafts: { ...state.exerciseDrafts, [sessionKey]: { text: JSON.stringify(session), updatedAt: new Date().toISOString() } } };
}

export function KnowledgePractice({ requestedUnit = "", requestedTheme = "", requestedPrepared = false }: { requestedUnit?: string; requestedTheme?: string; requestedPrepared?: boolean }) {
  const { state, ready, persisted, commit, notify } = useLearning();
  const session = ready ? readKnowledgeSession(state, knowledgeUnits.map((u) => u.id)) : undefined;
  const unit = session && getKnowledgeUnit(session.unitIds[session.cursor]);
  const requested = getKnowledgeUnit(requestedUnit);
  function start() {
    commit((s) => {
      const unfinished = readKnowledgeSession(s, knowledgeUnits.map((u) => u.id));
      if (unfinished && unfinished.cursor < unfinished.unitIds.length) return s;
      const next = buildKnowledgeSession(knowledgeUnits, s, { exam: requested ? "all" : s.profile.exam, unitId: requested?.id, themeId: requestedTheme || undefined, preparedUnitIds: requestedPrepared && requested ? [requested.id] : [] });
      if (!next.unitIds.length) { notify("这一范围目前没有到期或未练内容。可以查阅知识，或换情境写一段。"); return s; }
      return storeSession(s, next);
    });
  }
  function update(text: string) {
    if (!session) return;
    commit((s) => {
      const current = readKnowledgeSession(s, knowledgeUnits.map((u) => u.id));
      if (!current || current.startedAt !== session.startedAt || current.unitIds[current.cursor] !== session.unitIds[session.cursor] || current.cursor !== session.cursor || current.step !== session.step || current.revealed) return s;
      return storeSession(s, { ...current, ...(current.step === "recall" ? { recallText: text } : { applyText: text }) });
    });
  }
  function reveal(missed: boolean) {
    if (!session || !unit) return;
    const text = (session.step === "recall" ? session.recallText : session.applyText).trim();
    if (!missed && !text) { notify("先留下自己的尝试，或选择先看示例。"); return; }
    commit((s) => {
      const current = readKnowledgeSession(s, knowledgeUnits.map((u) => u.id));
      if (!current || current.startedAt !== session.startedAt || current.cursor !== session.cursor || current.step !== session.step || current.revealed) return s;
      const currentUnitId = current.unitIds[current.cursor];
      const currentText = (current.step === "recall" ? current.recallText : current.applyText).trim();
      if (!missed && !currentText) return s;
      const prepared = Boolean(current.preparedIds?.includes(currentUnitId) || requestedPrepared && requested?.id === currentUnitId);
      const assisted = current.step === "apply" || missed || current.missed || prepared;
      const event: LearningEvent = { id: createId(), contentId: knowledgeCardId(currentUnitId), taskId: `knowledge:${currentUnitId}:${current.step}`, skill: current.step === "recall" ? "language" : "transfer", type: currentText ? "practice" : "read", at: new Date().toISOString(), mode: assisted ? "guided" : "independent", outcome: currentText ? assisted ? "assisted" : "completed" : "assisted", evidence: currentText ? `${current.step === "recall" && prepared ? "本次查阅过这条知识，属于有准备的回忆。\n" : current.step === "recall" ? "本练习页未展开参考；既往可能学过，不属于未见题测评。\n" : ""}${currentText}` : "第一次接触或本次未想起，先查看示例。", hintUsed: assisted };
      return storeSession({ ...s, events: [...s.events, event] }, { ...current, revealed: true, missed: current.missed || missed, preparedIds: prepared ? [...new Set([...(current.preparedIds ?? []), currentUnitId])] : current.preparedIds });
    });
  }
  function nextStep() { if (session) commit((s) => {
    const current = readKnowledgeSession(s, knowledgeUnits.map((u) => u.id));
    return current?.startedAt === session.startedAt && current.cursor === session.cursor && current.step === "recall" && current.revealed ? storeSession(s, { ...current, step: "apply", revealed: false }) : s;
  }); }
  function finish(rating: CardRating) {
    if (!session || !unit || session.step !== "apply" || !session.revealed) return;
    if (session.missed && (rating === "good" || rating === "easy")) return;
    const ok = commit((s) => {
      const current = readKnowledgeSession(s, knowledgeUnits.map((u) => u.id));
      if (!current || current.startedAt !== session.startedAt || current.cursor !== session.cursor || current.step !== "apply" || !current.revealed) return s;
      if (current.missed && (rating === "good" || rating === "easy")) return s;
      const currentUnitId = current.unitIds[current.cursor];
      const next = rateCard(s, knowledgeCardId(currentUnitId), rating);
      next.events[next.events.length - 1] = { ...next.events.at(-1)!, taskId: `knowledge:${currentUnitId}:self-review`, skill: "transfer", mode: "guided", hintUsed: true, evidence: `回忆原文：\n${current.recallText || "未想起，先看示例"}\n\n换情境应用：\n${current.applyText || "未写出，先看参考"}\n\n对照后自评：${rating}。应用时已看过本条示例；没有进行客观语义评分。` };
      return storeSession(next, advanceKnowledgeSession(current));
    });
    if (ok) notify("已保留作答或查看示例的记录，并安排下次复习。请把这条知识用进自己的文章。");
  }
  const completed = session && session.cursor >= session.unitIds.length;
  return <div className="knowledge-practice">
    <div className="breadcrumb"><Link href="/knowledge">知识库</Link><span>/</span><span>短练习</span></div>
    {!session && <PageIntro title="短练习" description="每次最多两条，约5–8分钟。先尝试，再看参考。"/>}
    {!ready ? <Empty title="正在恢复练习" text="正在读取本机草稿。"/> : !session ? <section className="panel practice-welcome stack">
      <h2>{requested ? `练习：${requested.title}` : "开始今天的两条练习"}</h2><p>先回忆，再换情境写一句。第一次接触可以先看示例。</p>
      <button className="button primary" onClick={start}>开始练习 <ArrowRight size={16}/></button><Link href="/knowledge" className="text-link">先查阅知识 <ArrowRight size={14}/></Link>
      <details><summary>练习怎么安排</summary><p className="fine">优先安排已到期的知识，再补充未练内容。用时随内容与个人情况变化。</p><Link className="text-link" href="/guide#knowledge">查看使用手册 <ArrowRight size={14}/></Link></details>
    </section> : completed ? <section className="panel practice-complete stack">
      <Check size={30}/><h1 className="practice-question">完成了 {session.completedIds.length} 条练习</h1><p>作答或查看示例的记录已保留。试着把表达用进自己的作文。</p>
      <div className="row wrap"><Link className="button primary" href="/studio">去写作文 <ArrowRight size={16}/></Link><Link className="button ghost" href="/review">查看练习记录</Link></div>
      {requested && <button className="button secondary" onClick={start}>再练：{requested.title} <RotateCcw size={15}/></button>}
      <details><summary>继续练习</summary><p className="fine">短练习完成不等于已掌握，能否在新题里准确使用还需要实际写作检验。</p><button className="button secondary small" onClick={start}><RotateCcw size={14}/> 再安排少量内容</button></details>
    </section> : unit ? <section className="panel practice-card stack">
      <div className="row between wrap"><Tag tone="green">第 {session.cursor + 1} / {session.unitIds.length} 条 · {session.step === "recall" ? "先回忆" : "换情境应用"}</Tag><span className="fine">{knowledgeCategoryNames[unit.category]}</span></div>
      <div><h1 className="practice-question">{session.step === "recall" ? unit.recall.prompt : unit.application.prompt}</h1><p className="fine">{session.step === "recall" ? (session.preparedIds?.includes(unit.id) || requestedPrepared && requested?.id === unit.id ? "已查阅本条 · 有准备的回忆" : "先尝试回忆 · 允许不同的合理表达") : "已看过示例 · 有准备的应用"}</p></div>
      <label className="field">{session.step === "recall" ? "你的回忆" : "你的新句子或短段落"}<textarea aria-label={session.step === "recall" ? "知识回忆作答" : "知识迁移作答"} className="english" rows={5} maxLength={4000} value={session.step === "recall" ? session.recallText : session.applyText} readOnly={session.revealed} onChange={(e) => update(e.target.value)} placeholder="在这里写出你的尝试……"/></label>
      {!session.revealed ? <div className="row wrap"><button className="button primary" disabled={!(session.step === "recall" ? session.recallText : session.applyText).trim()} onClick={() => reveal(false)}>保留作答并对照 <ArrowRight size={15}/></button><button className="button ghost" onClick={() => reveal(true)}><Eye size={15}/>{session.step === "recall" ? "没想起，先看示例" : "先看思路"}</button></div> : <>
        <div className="feedback stack"><h3>参考与自查</h3><p className="english">{session.step === "recall" ? unit.recall.reference : unit.application.reference}</p><ChineseAid text={session.step === "recall" ? unit.recall.referenceZh : unit.application.referenceZh}/>{session.step === "recall" ? <><p>{unit.recall.note}</p><p><strong>什么时候用：</strong>{unit.usage}</p><p><strong>边界：</strong>{unit.boundary}</p></> : <><p>对照时检查：</p><ul>{unit.application.criteria.map((x) => <li key={x}>{x}</li>)}</ul><p className="fine">参考是一种可行表达，请按意思与用法核对。</p></>}</div>
        {session.step === "recall" ? <button className="button primary" onClick={nextStep}>换情境写一句 <ArrowRight size={15}/></button> : <div className="stack"><p className="muted">对照后自评，用于安排复习。</p><div className="practice-ratings">{(["again", "hard", "good", "easy"] as CardRating[]).map((rating, i) => <button className="button secondary" key={rating} disabled={session.missed && i > 1} onClick={() => finish(rating)}>{["还写不出", "需要更多提示", "能回忆，应用需核对", "这次较顺利"][i]}</button>)}</div>{session.missed && <p className="fine">本次先看了示例，将安排较近的复习。</p>}</div>}
      </>}
      {!persisted && <p className="fine" role="status">尚未保存在本机，请到设置导出备份。</p>}<details><summary>记录与恢复说明</summary><div className="stack"><p className="fine">{persisted ? "作答自动保存在本机，刷新或离开后会恢复步骤与作答。" : "作答暂时仅保留在内存，请到设置导出备份。"}</p><p className="fine">本页未展开参考不代表从未学过。查阅本条后会标记为有准备的回忆；应用时已看过示例。记录用于复习，不属于未见题测评，也没有进行语义或语法自动判分。</p><Link className="text-link" href={`/knowledge/${unit.id}`}>查阅这一条 <ArrowRight size={14}/></Link><Link className="text-link" href="/guide#knowledge">短练习使用方法 <ArrowRight size={14}/></Link></div></details>
    </section> : <Empty title="这条知识已更新" text="请返回知识库，按当前内容重新开始。" href="/knowledge" action="返回知识库"/>}
    {session && !completed && requested && session.unitIds[session.cursor] !== requested.id && <div className="knowledge-note"><p>已恢复上次练习，完成后可练“{requested.title}”。</p></div>}
  </div>;
}
