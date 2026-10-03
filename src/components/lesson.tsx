"use client";
import { useState } from "react";
import Link from "next/link";
import { ChineseAid, TeachingEssay } from "./chinese-aid";
import { ArrowRight, Check, Eye, PenLine, Bookmark } from "lucide-react";
import type { LearningEvent, Question, Skill } from "@/types/learning";
import { checkKeywordAnswer, checkWriting } from "@/lib/checks";
import { createId } from "@/lib/learning";
import { examName } from "@/lib/content";
import { useLearning } from "./learning-provider";
import { QuestionPrompt, SourceLinks } from "./ui";
import { KnowledgeLookupLink } from "./knowledge";

const steps = ["读懂任务", "把理由讲清", "准确地表达", "换题应用"];
export function Lesson({ question: q, initialSkill = "task" }: { question: Question; initialSkill?: Skill }) {
  const { state, ready, commit, notify } = useLearning();
  const [step, setStep] = useState(({ task: 0, reasoning: 1, organization: 1, language: 2, transfer: 3 })[initialSkill]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [keywordMessage, setKeywordMessage] = useState("");
  const [showModel, setShowModel] = useState(false);
  const history = state.events.filter((e) => e.contentId === q.id);
  function answer(key: string) { return answers[key] ?? state.exerciseDrafts?.[`${q.id}:${key}`]?.text ?? [...history].reverse().find((e) => e.taskId === `${q.id}:${key}` && e.type !== "read")?.evidence ?? ""; }
  function writeAnswer(key: string, text: string) {
    setAnswers((s) => ({ ...s, [key]: text }));
    commit((s) => ({ ...s, exerciseDrafts: { ...s.exerciseDrafts, [`${q.id}:${key}`]: { text, updatedAt: new Date().toISOString() } } }));
  }
  function usedHintFor(key: string) {
    return Boolean(revealed[key] || history.some((e) => e.taskId === `${q.id}:${key}` && (e.hintUsed || e.type === "read"))
      || showModel || history.some((e) => e.taskId === `${q.id}:model` && e.type === "read")
      || key === "keyword" && (revealed.task || history.some((e) => e.taskId === `${q.id}:task` && e.type === "read")));
  }
  function record(key: string, skill: Skill, type: LearningEvent["type"] = "practice", hint = false, outcome: LearningEvent["outcome"] = "completed") {
    const text = type === "read" ? "查看参考与提示" : answer(key).trim();
    if (!text) { notify("请先写出你的答案，空白不计作答。"); return false; }
    const event: LearningEvent = { id: createId(), contentId: q.id, taskId: `${q.id}:${key}`, skill, type, at: new Date().toISOString(), mode: hint ? "guided" : "independent", outcome: hint ? "assisted" : outcome, evidence: text, hintUsed: hint };
    return commit((s) => ({ ...s, events: [...s.events, event] }));
  }
  function reveal(key: string, skill: Skill) {
    if (answer(key).trim() && !record(key, skill, "practice", usedHintFor(key))) return;
    if (record(key, skill, "read", true)) setRevealed((s) => ({ ...s, [key]: true }));
  }
  function exercise(key: string, label: string, placeholder: string, skill: Skill, feedback: React.ReactNode) {
    const usedHint = usedHintFor(key);
    return <div className="exercise"><label htmlFor={key}>{label}</label><textarea id={key} value={answer(key)} placeholder={placeholder} disabled={!ready} maxLength={20000} onChange={(e) => writeAnswer(key, e.target.value)} rows={4}/><div className="row wrap"><button className="button primary small" disabled={!ready} onClick={() => { if (record(key, skill, "practice", usedHint) && record(key, skill, "read", true)) { setRevealed((s) => ({ ...s, [key]: true })); notify("已保存你的作答。请对照解析，判断哪里需要改。"); } }}>保存并对照 <ArrowRight size={14}/></button><button className="button ghost small" disabled={!ready} onClick={() => reveal(key, skill)}><Eye size={14}/> 先看提示</button>{usedHint && <span className="fine">有提示的练习</span>}</div>{revealed[key] && <div className="feedback"><p className="fine">参考解析 · 不自动判分</p>{feedback}<p className="fine">有不同但合理的答案也可以。修改上方作答，再保存一次，会保留两次产出。</p></div>}</div>;
  }
  if (q.evaluation) return <div className="empty"><PenLine size={32}/><h1>这是一道保留评估题</h1><p>先在限时写作中独立作答，提交后再查看本题解析。看过参考的题目会留下标记，复测时优先换一题。</p><Link className="button primary" href={`/studio/${q.id}`}>开始独立写作 <ArrowRight size={15}/></Link></div>;
  return <div className="lesson"><div className="lesson-header"><div><p className="fine">{examName(q.exam)} · {q.year}.{q.month}{q.directionsNote.includes("教学重构") && " · 真题主题 / 教学重构"}</p><h1>{q.title}</h1></div><button className="button ghost small" aria-pressed={state.favorites.includes(q.id)} onClick={() => commit((s) => ({ ...s, favorites: s.favorites.includes(q.id) ? s.favorites.filter((x) => x !== q.id) : [...s.favorites, q.id] }))}><Bookmark size={15}/>{state.favorites.includes(q.id) ? "已收藏" : "收藏题目"}</button></div><div className="lesson-grid"><div className="lesson-main"><QuestionPrompt question={q}/><div className="step-tabs">{steps.map((name, i) => <button key={name} className={step === i ? "active" : ""} aria-current={step === i ? "step" : undefined} onClick={() => setStep(i)}><span>{i + 1}</span>{name}</button>)}</div><section className="panel lesson-body">
    {step === 0 && <><h2>写出这道题要你完成什么</h2>{exercise("task", "写出题目的核心任务（中文或英文均可）", "我要向谁说明什么？必须包含哪些内容？", "task", <><p><strong>任务目的：</strong>{q.task.objective}</p><ul>{q.task.requirements.map((x) => <li key={x}>{x}</li>)}</ul><p><strong>可选思路：</strong>{q.task.optionalIdeas.join("；")}</p><p><strong>容易偏题：</strong>{q.task.avoid.join("；")}</p></>)}<details className="optional-section"><summary>再练一步：概括关键词</summary><div className="exercise"><label htmlFor="keyword">用一个短语概括题目重点</label><div className="input-action"><input id="keyword" value={answer("keyword")} disabled={!ready} onChange={(e) => writeAnswer("keyword", e.target.value)} placeholder="可以写中文或英文参考关键词"/><button className="button secondary small" disabled={!ready} onClick={() => { const result = checkKeywordAnswer(answer("keyword"), q.task.acceptedKeywords); setKeywordMessage(result.message); if (result.status !== "empty") record("keyword", "task", "practice", usedHintFor("keyword"), result.status === "accepted" ? "recalled" : "unrecognized"); }}>检查匹配</button></div>{keywordMessage && <p className="fine" role="status">{keywordMessage}</p>}</div></details></>}
    {step === 1 && <><h2>{initialSkill === "organization" ? "为这道题安排段落" : "写一个理由，解释它为什么成立"}</h2>{initialSkill === "organization" ? exercise("outline", "为这道题设计一个简短提纲", "每段解决什么问题？为什么按这个顺序？", "organization", <div className="route-grid">{q.routes.map((r) => <div key={r.label}><h4>{r.label}</h4><ol>{r.outline.map((x) => <li key={x}>{x}</li>)}</ol></div>)}</div>) : exercise("reason", "写一个观点，并解释它如何成立", "观点 → 怎么发生 / 为什么 → 具体例子 → 回扣题目", "reasoning", <>{q.reasoning.map((r, i) => <div className="reason-chain" key={i}>{[["观点", r.claim, r.claimZh], ["机制", r.mechanism, r.mechanismZh], ["例子", r.example, r.exampleZh], ["回扣", r.link, r.linkZh]].map(([label, text, translation]) => <div key={label}><span>{label}</span><div><p>{text}</p><ChineseAid text={translation} original={text}/></div></div>)}</div>)}</>)}<details className="optional-section"><summary>{initialSkill === "organization" ? "再练一步：展开一个理由" : "再练一步：安排段落提纲"}</summary>{initialSkill === "organization" ? exercise("reason", "写一个观点，并解释它如何成立", "观点 → 怎么发生 / 为什么 → 具体例子 → 回扣题目", "reasoning", <>{q.reasoning.map((r, i) => <div className="reason-chain" key={i}>{[["观点", r.claim, r.claimZh], ["机制", r.mechanism, r.mechanismZh], ["例子", r.example, r.exampleZh], ["回扣", r.link, r.linkZh]].map(([label, text, translation]) => <div key={label}><span>{label}</span><div><p>{text}</p><ChineseAid text={translation} original={text}/></div></div>)}</div>)}</>) : exercise("outline", "为这道题设计一个简短提纲", "每段解决什么问题？为什么按这个顺序？", "organization", <div className="route-grid">{q.routes.map((r) => <div key={r.label}><h4>{r.label}</h4><ol>{r.outline.map((x) => <li key={x}>{x}</li>)}</ol></div>)}</div>)}</details></>}
    {step === 2 && <><h2>改写下面这段话，把意思讲清楚</h2><blockquote className="english">{q.exercise.weakParagraph}</blockquote><ChineseAid text={q.exercise.weakParagraphZh} label="原段想表达"/>{exercise("rewrite", "写出你的修改版本", "减少空泛表达，补足必要的信息。", "language", <><p className="english">{q.exercise.improvedParagraph}</p><ChineseAid text={q.exercise.improvedParagraphZh}/><p>{q.exercise.explanation}</p></>)}<details className="optional-section"><summary>再想一步：检查使用条件</summary>{exercise("boundary", q.exercise.boundaryPrompt, "为什么这里适用 / 不适用？", "language", <p>{q.exercise.boundaryAnswer}</p>)}</details><details className="optional-section"><summary>本题表达与例句</summary><div className="expression-list">{q.expressions.map((e) => <div key={e.id}><strong className="english">{e.text}</strong><p>{e.meaning}</p><p className="english fine">{e.example}</p><ChineseAid text={e.exampleZh}/><p className="fine"><strong>使用边界：</strong>{e.boundary}</p></div>)}</div><Link className="text-link" href="/review">用回忆与造句来复习 <ArrowRight size={14}/></Link><KnowledgeLookupLink questionId={q.id}/></details><details className="optional-section"><summary>常见语言问题与修改</summary>{q.commonErrors.map((e, i) => <div className="error-pair" key={i}><p className="english"><del>{e.wrong}</del></p><ChineseAid text={e.wrongZh} label="原句想表达"/><p className="english"><Check size={14}/>{e.right}</p><ChineseAid text={e.rightZh}/><p className="fine">{e.why}</p></div>)}</details></>}
    {step === 3 && <><h2>换一个情境，独立写一段</h2><p>{q.exercise.transferPrompt}</p>{exercise("transfer", "不用照抄本题段落，完成新的写作任务", "写出与新情境有关的解释或行动细节。", "transfer", <p>{q.exercise.transferHint}</p>)}<div className="callout"><h3>把局部练习用到完整作文</h3><p>写完以后，选择一个主要问题，留下原稿与修改稿。下次换题时检验同一个问题是否还出现。</p><Link className="button primary small" href={`/studio/${q.id}`}>进入写作台 <ArrowRight size={15}/></Link></div></>}
    <div className="row between lesson-bottom"><span className="fine">作答自动保存在此浏览器。</span>{step < 3 && <button className="button secondary small" onClick={() => setStep(step + 1)}>下一步 <ArrowRight size={14}/></button>}</div></section><section className="panel model-section"><div className="row between wrap"><div><h3>参考作文与写作选择</h3></div><button className="button ghost small" disabled={!ready} onClick={() => { if (showModel) setShowModel(false); else if (record("model", "organization", "read", true)) setShowModel(true); }}>{showModel ? "收起参考" : "查看参考作文"}<Eye size={14}/></button></div>{showModel && <><p className="fine">项目原创示例 · 按本题规则计 {checkWriting(q.modelEssay, q).wordCount} 词 · 一种可行写法，不是唯一标准答案</p><TeachingEssay text={q.modelEssay} translations={q.modelEssayZh}/><ul>{q.modelNotes.map((x) => <li key={x}>{x}</li>)}</ul></>}</section><div className="task-utilities"><SourceLinks question={q}/><Link href="/guide#classroom" className="text-link">课堂用法</Link><Link href={`/studio/${q.id}`} className="text-link"><PenLine size={14}/> 写完整作文</Link></div></div></div></div>;
}
