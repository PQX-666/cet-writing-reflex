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
  return <div className="knowledge-practice"><div className="breadcrumb"><Link href="/knowledge">知识库</Link><span>/</span><span>短练习</span></div><Link className="text-link guide-context" href="/guide#knowledge">短练习怎么做 <ArrowRight size={14}/></Link><PageIntro eyebrow="A LITTLE RETRIEVAL, A REAL SENTENCE" title="少量回忆，再写一句" description="每次最多两条，约5–8分钟。先尝试，遇到困难可以看示例；完成时间随内容与个人情况变化。"/>
    {!ready ? <Empty title="正在恢复练习" text="加载本机草稿后开始，不会覆盖已有作答。"/> : !session ? <section className="panel practice-welcome stack"><Tag tone="green">回忆 → 对照 → 换情境写 → 安排复习</Tag><h2>{requested ? `练习：${requested.title}` : "从少量内容开始"}</h2><p>优先安排已到期的知识，再补充未练内容。第一次接触可以先看例子，之后再逐步减少提示。</p><button className="button primary" onClick={start}>开始这次短练习 <ArrowRight size={16}/></button><Link href="/knowledge" className="text-link">先查阅和理解 <ArrowRight size={14}/></Link></section> : completed ? <section className="panel practice-complete stack"><Check size={30}/><p className="eyebrow">KEEP THE EVIDENCE</p><h2>这次留下了 {session.completedIds.length} 条练习记录</h2><p>已保留你的作答或查看示例的记录。是否能在新题里准确使用，还需要实际写作来检验。</p><div className="row wrap"><Link className="button primary" href="/studio">带回自己的作文 <ArrowRight size={16}/></Link><Link className="button ghost" href="/review">查看原始记录</Link></div>{requested && <button className="button secondary" onClick={start}>再练：{requested.title} <RotateCcw size={15}/></button>}<details><summary>还想继续？</summary><p className="fine">短练习不是背完全部知识的要求。可以在有余力时继续，或结束今天的复习。</p><button className="button secondary small" onClick={start}><RotateCcw size={14}/> 再安排少量内容</button></details></section> : unit ? <section className="panel practice-card stack"><div className="row between wrap"><Tag tone="green">第 {session.cursor + 1} / {session.unitIds.length} 条 · {knowledgeCategoryNames[unit.category]}</Tag><span className="fine">{persisted ? "作答已自动保存在本机" : "仅保留在内存，请到设置导出"}</span></div><ol className="practice-steps" aria-label="当前练习步骤"><li className={session.step === "recall" ? "active" : "done"}>1 先回忆</li><li className={session.step === "apply" ? "active" : ""}>2 换情境应用</li></ol><div><p className="eyebrow">{session.step === "recall" ? "RETRIEVE BEFORE YOU LOOK" : "USE IT IN A DIFFERENT CONTEXT"}</p><h2>{session.step === "recall" ? unit.recall.prompt : unit.application.prompt}</h2><p className="muted">{session.step === "recall" ? (session.preparedIds?.includes(unit.id) || requestedPrepared && requested?.id === unit.id ? "本次查阅过这条知识，属于有准备的回忆。先前看过不是问题，请尝试用自己的话写。" : "允许合理的不同表达。本练习页先隐藏参考；这不是未见题测评。") : "刚看过本条参考，这次是有准备的应用。以后换题时再检验独立使用。"}</p></div><label className="field">{session.step === "recall" ? "你的回忆" : "你的新句子或短段落"}<textarea aria-label={session.step === "recall" ? "知识回忆作答" : "知识迁移作答"} className="english" rows={5} maxLength={4000} value={session.step === "recall" ? session.recallText : session.applyText} readOnly={session.revealed} onChange={(e) => update(e.target.value)} placeholder="在这里写出你的尝试……"/></label>
      {!session.revealed ? <div className="row wrap"><button className="button primary" disabled={!(session.step === "recall" ? session.recallText : session.applyText).trim()} onClick={() => reveal(false)}>保留作答并对照 <ArrowRight size={15}/></button><button className="button ghost" onClick={() => reveal(true)}><Eye size={15}/>{session.step === "recall" ? "第一次接触 / 没想起，先看示例" : "还写不出，先看思路"}</button></div> : <><div className="feedback stack"><p className="eyebrow">ONE POSSIBLE RESPONSE</p><p className="english">{session.step === "recall" ? unit.recall.reference : unit.application.reference}</p><ChineseAid text={session.step === "recall" ? unit.recall.referenceZh : unit.application.referenceZh}/>{session.step === "recall" ? <><p>{unit.recall.note}</p><p><strong>什么时候用：</strong>{unit.usage}</p><p><strong>边界：</strong>{unit.boundary}</p></> : <><p>对照时检查：</p><ul>{unit.application.criteria.map((x) => <li key={x}>{x}</li>)}</ul><p className="fine">不同答案可能同样合理。本页没有进行语义或语法自动判分。</p></>}</div>{session.step === "recall" ? <button className="button primary" onClick={nextStep}>换一个情境，自己写 <ArrowRight size={15}/></button> : <div className="stack"><p className="muted">这次对照后的感觉？仅用于安排复习。</p><div className="practice-ratings">{(["again", "hard", "good", "easy"] as CardRating[]).map((rating, i) => <button className="button secondary" key={rating} disabled={session.missed && i > 1} onClick={() => finish(rating)}>{["还写不出", "需要更多提示", "能回忆，应用需核对", "这次较顺利"][i]}</button>)}</div>{session.missed && <p className="fine">本次先看了示例或思路，安排较近的复习。看过不等于掌握。</p>}</div>}</>}
      <p className="fine">可以随时离开，刷新后会恢复步骤和作答。<Link className="text-link" href={`/knowledge/${unit.id}`}>稍后查阅这一条</Link>。</p>
    </section> : <Empty title="这条知识已更新" text="请返回知识库，按当前内容重新开始。" href="/knowledge" action="返回知识库"/>}
    {session && !completed && requested && session.unitIds[session.cursor] !== requested.id && <div className="knowledge-note"><p>已恢复上次未完成的练习。完成后可练你刚选择的“{requested.title}”。现有作答不会被自动覆盖。</p></div>}
  </div>;
}
