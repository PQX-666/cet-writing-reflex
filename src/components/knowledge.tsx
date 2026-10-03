"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChineseAid } from "./chinese-aid";
import { ArrowRight, ArrowUpRight, Bookmark, Check, Clock3, Layers3, Search } from "lucide-react";
import { useLearning } from "./learning-provider";
import { Empty, PageIntro, Tag } from "./ui";
import { getQuestion } from "@/lib/content";
import { knowledge, knowledgeUnits, knowledgeCategoryNames, knowledgeThemeName, knowledgeFunctionName } from "@/lib/knowledge-content";
import { filterKnowledgeUnits, knowledgeCardId, knowledgeDueUnits, readKnowledgeSession } from "@/lib/knowledge-learning";
import { createId } from "@/lib/learning";
import type { KnowledgeCategory, KnowledgeUnit } from "@/types/knowledge";

export function KnowledgeEntry() {
  const { state, ready } = useLearning();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer); }, []);
  const due = knowledgeDueUnits(filterKnowledgeUnits(knowledgeUnits, { exam: state.profile.exam }), state, now).length;
  const session = ready ? readKnowledgeSession(state, knowledgeUnits.map((u) => u.id)) : undefined;
  const unfinished = session && session.cursor < session.unitIds.length;
  return <section className="knowledge-entry"><div><p className="eyebrow">RECALL · CHOOSE · USE</p><h2>把表达，变成自己的句子</h2><p>先回忆，再换情境写一句。每天少量练习，把有用的表达带回作文。</p></div><div className="stack"><Link className="button primary" href="/knowledge/practice">{unfinished ? "继续未完成的短练习" : "开始两条短练习"}<ArrowRight size={16}/></Link><Link className="text-link" href="/knowledge">按用途或主题查找 <Search size={14}/></Link><span className="fine">{ready ? `${due} 条知识到期 · 约5–8分钟` : "正在读取本机记录"}</span></div></section>;
}

function KnowledgeTile({ unit }: { unit: KnowledgeUnit }) {
  const { state } = useLearning();
  const practiced = Boolean(state.reviews[knowledgeCardId(unit.id)]);
  return <Link href={`/knowledge/${unit.id}`} className="knowledge-tile"><div className="row between"><Tag tone={unit.core ? "green" : "neutral"}>{unit.core ? "核心" : knowledgeCategoryNames[unit.category]}</Tag><span className="fine">{practiced ? "有练习记录" : "尚未练习"}</span></div><h3>{unit.title}</h3><p>{unit.meaning}</p><div className="row between"><span className="fine">{unit.functionIds.slice(0, 2).map(knowledgeFunctionName).join(" · ")}</span><ArrowUpRight size={16}/></div></Link>;
}

export function KnowledgeLookupLink({ questionId }: { questionId: string }) {
  const unit = knowledgeUnits.find((u) => u.category === "topic" && u.relatedQuestionIds.includes(questionId));
  return <Link className="text-link knowledge-lookup" href={unit?.themeIds[0] ? `/knowledge?theme=${unit.themeIds[0]}` : "/knowledge"}>查找本题相关用法与素材 <ArrowRight size={14}/></Link>;
}

export function KnowledgeIndex({ initialTheme = "", initialSearch = "" }: { initialTheme?: string; initialSearch?: string }) {
  const { state } = useLearning();
  const [search, setSearch] = useState(initialSearch);
  const [theme, setTheme] = useState(initialTheme);
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState<KnowledgeCategory | "">("");
  const [core, setCore] = useState(!initialTheme && !initialSearch);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [limit, setLimit] = useState(9);
  const found = filterKnowledgeUnits(knowledgeUnits, { exam: state.profile.exam, search, themeId: theme || undefined, functionId: purpose || undefined, category: category || undefined, coreOnly: core })
    .filter((u) => !favoritesOnly || state.favorites.includes(knowledgeCardId(u.id)));
  const coreCount = knowledgeUnits.filter((u) => u.core).length;
  function resetFilters() { setSearch(""); setTheme(""); setPurpose(""); setCategory(""); setCore(false); setFavoritesOnly(false); setLimit(9); }
  return <div className="stack knowledge-library"><PageIntro eyebrow="A SMALL LIBRARY, A USEFUL SENTENCE" title="写作知识库" description="需要时查得出，复习后写得出。先从核心表达开始，再按具体任务补充主题内容。"/>
    <div className="guide-inline"><span>第一次来？从理解一个例子开始。</span><Link className="text-link" href="/guide#knowledge">查看使用手册 <ArrowRight size={14}/></Link></div><KnowledgeEntry/>
    <div className="knowledge-paths"><button className={core ? "selected" : ""} onClick={() => { resetFilters(); setCore(true); }}><Layers3 size={20}/><strong>先练核心</strong><span>{coreCount} 条通用表达与准确用法</span></button><button className={!core && category === "topic" ? "selected" : ""} onClick={() => { resetFilters(); setCategory("topic"); }}><Search size={20}/><strong>为一道题找材料</strong><span>{knowledge.themes.length} 个主题族 · 按需选择</span></button><button className={favoritesOnly ? "selected" : ""} onClick={() => { resetFilters(); setFavoritesOnly(true); }}><Bookmark size={20}/><strong>我的收藏</strong><span>把写作中需要的内容留下</span></button></div>
    <section className="panel knowledge-filter"><label className="knowledge-search"><Search size={17}/><input aria-label="搜索知识" placeholder="搜索用途、表达或问题，如：解释原因、feedback" value={search} onChange={(e) => { setSearch(e.target.value); setCore(false); setLimit(9); }}/></label><div className="row wrap"><label>主题<select aria-label="知识主题" value={theme} onChange={(e) => { setTheme(e.target.value); setCore(false); setLimit(9); }}><option value="">全部主题</option>{knowledge.themes.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}</select></label><label>用途<select aria-label="表达用途" value={purpose} onChange={(e) => { setPurpose(e.target.value); setCore(false); setLimit(9); }}><option value="">全部用途</option>{knowledge.functions.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}</select></label><label>类型<select aria-label="知识类型" value={category} onChange={(e) => { setCategory(e.target.value as typeof category); setCore(false); setLimit(9); }}><option value="">全部类型</option>{Object.entries(knowledgeCategoryNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label><button className="button ghost small" onClick={resetFilters}>清除筛选</button></div></section>
    <div className="row between wrap"><p className="fine">找到 {found.length} 条 · 当前为{state.profile.exam === "CET4" ? "四级" : "六级"}适用内容{core ? " · 核心优先" : ""}{favoritesOnly ? " · 仅收藏" : ""}</p><Link className="text-link" href="/knowledge/coverage">主题覆盖与来源 <ArrowRight size={14}/></Link></div>
    {found.length ? <div className="knowledge-grid">{found.slice(0, limit).map((unit) => <KnowledgeTile key={unit.id} unit={unit}/>)}</div> : <Empty title="这组条件下没有内容" text="可以清除筛选，或先找一种表达用途。遇到新主题时，通用表达仍需配合具体内容。"/>}
    {found.length > limit && <button className="button ghost" onClick={() => setLimit((n) => n + 9)}>再显示 9 条</button>}
    <div className="knowledge-note"><p>{knowledgeUnits.length} 个原创单元按用途与主题整理，主题分类不代表穷尽历年或未来考试。开放作答通过参考与自查比较，不按原句匹配判分。</p><Link className="text-link" href="/knowledge/method">怎样复习更有用 · 书籍与研究依据 <ArrowRight size={14}/></Link></div>
  </div>;
}

export function KnowledgeDetail({ unit }: { unit: KnowledgeUnit }) {
  const { state, ready, commit, notify } = useLearning();
  const cardId = knowledgeCardId(unit.id);
  const draft = state.exerciseDrafts?.[`${cardId}:try`];
  const saved = draft?.text ?? "";
  const applied = Boolean(draft && state.events.some((event) => event.taskId === `${cardId}:application:${draft.updatedAt}` && event.evidence === saved.trim()));
  useEffect(() => {
    if (!ready) return;
    commit((s) => {
      const session = readKnowledgeSession(s, knowledgeUnits.map((u) => u.id));
      if (!session || session.unitIds[session.cursor] !== unit.id || session.step !== "recall" || session.revealed || session.preparedIds?.includes(unit.id)) return s;
      const prepared = { ...session, preparedIds: [...(session.preparedIds ?? []), unit.id] };
      return { ...s, exerciseDrafts: { ...s.exerciseDrafts, "knowledge:session": { text: JSON.stringify(prepared), updatedAt: new Date().toISOString() } } };
    });
  }, [ready, unit.id, commit]);
  const related = unit.relatedQuestionIds.map(getQuestion).filter((q) => q && !q.evaluation && q.exam === state.profile.exam);
  const review = state.reviews[cardId];
  function saveAttempt() {
    if (!saved.trim()) { notify("请先写下自己的句子，空白不会计作练习。"); return; }
    commit((s) => {
      const current = s.exerciseDrafts?.[`${cardId}:try`];
      if (!current?.text.trim()) return s;
      const taskId = `${cardId}:application:${current.updatedAt}`;
      if (s.events.some((event) => event.taskId === taskId && event.evidence === current.text.trim())) return s;
      return { ...s, events: [...s.events, { id: createId(), contentId: cardId, taskId, skill: "transfer", type: "practice", at: new Date().toISOString(), mode: "guided", outcome: "assisted", evidence: current.text.trim(), hintUsed: true }] };
    });
  }
  return <div className="knowledge-detail"><div className="breadcrumb"><Link href="/knowledge">知识库</Link><span>/</span><span>{unit.title}</span></div><PageIntro eyebrow="UNDERSTAND · RETRIEVE · APPLY" title={unit.title} description={unit.meaning}><button className="button ghost small" disabled={!ready} aria-pressed={state.favorites.includes(cardId)} onClick={() => commit((s) => ({ ...s, favorites: s.favorites.includes(cardId) ? s.favorites.filter((x) => x !== cardId) : [...s.favorites, cardId] }))}><Bookmark size={15}/>{state.favorites.includes(cardId) ? "已收藏" : "收藏"}</button></PageIntro><div className="knowledge-detail-grid"><div className="stack"><section className="panel stack"><div className="row wrap"><Tag tone="green">{unit.core ? "核心知识" : knowledgeCategoryNames[unit.category]}</Tag>{unit.functionIds.map((id) => <Tag key={id}>{knowledgeFunctionName(id)}</Tag>)}</div><div><p className="eyebrow">FORM & MEANING</p><h2 className="english knowledge-form">{unit.form}</h2><ChineseAid text={unit.formZh}/></div><div className="knowledge-explanation"><h3>什么时候用</h3><p>{unit.usage}</p><p className="english knowledge-example">{unit.example}</p><ChineseAid text={unit.exampleZh}/></div><div className="callout"><h3>使用边界</h3><p>{unit.boundary}</p></div></section><section className="panel stack"><p className="eyebrow">NOTICE THE DIFFERENCE</p><h2>比较一次，弄清为什么</h2><div className="knowledge-contrast"><div><span className="fine">有待改进的表达</span><p className="english">{unit.contrast.wrong}</p><ChineseAid text={unit.contrast.wrongZh} label="原句想表达"/></div><div><span className="fine">一种修改方式</span><p className="english">{unit.contrast.better}</p><ChineseAid text={unit.contrast.betterZh}/></div></div><p>{unit.contrast.reason}</p></section><section className="panel stack"><p className="eyebrow">USE IT IN A NEW CONTEXT</p><h2>现在，自己写一句</h2><p>{unit.application.prompt}</p><label className="field">你的英文<textarea className="english" aria-label="知识应用作答" value={saved} disabled={!ready} rows={4} maxLength={8000} placeholder="按新情境写出自己的表达，允许不同的合理答案。" onChange={(e) => { commit((s) => ({ ...s, exerciseDrafts: { ...s.exerciseDrafts, [`${cardId}:try`]: { text: e.target.value, updatedAt: new Date().toISOString() } } })); }}/></label><div className="row wrap"><button className="button primary small" disabled={!ready || !saved.trim() || applied} onClick={saveAttempt}>保存并对照 <ArrowRight size={15}/></button>{applied && <span className="fine row"><Check size={13}/> 已保留原始作答</span>}</div>{applied && <div className="feedback"><p className="english">{unit.application.reference}</p><ChineseAid text={unit.application.referenceZh}/><ul>{unit.application.criteria.map((x) => <li key={x}>{x}</li>)}</ul><p className="fine">这是一种可行表达；请比较意思、搭配和使用条件。已阅读上方示例，本次是有准备的应用练习。</p></div>}</section></div><aside className="stack"><section className="panel stack"><Clock3 size={22}/><h3>隔一段时间再写出来</h3><Link className="text-link" href="/guide#chinese">中文辅助怎么用 <ArrowRight size={14}/></Link><p className="muted">短练习会先隐藏参考，保留你的回忆，再换一个情境应用。</p><Link className="button primary full" href={`/knowledge/practice?unit=${unit.id}&prepared=1`}>练这一条 <ArrowRight size={15}/></Link>{review && <p className="fine">已安排 {review.reviewCount} 次复习 · 下次 {new Date(review.dueAt).toLocaleString("zh-CN")}</p>}<p className="fine">自评用于安排复习，不代表表达正确或已掌握。</p></section>{unit.themeIds.length > 0 && <section className="panel stack"><h3>相关主题</h3>{unit.themeIds.map((id) => <Link className="text-link" key={id} href={`/knowledge?theme=${id}`}>{knowledgeThemeName(id)} <ArrowRight size={14}/></Link>)}</section>}{related.length > 0 && <section className="panel stack"><h3>带回真实任务</h3>{related.slice(0, 3).map((q) => q && <Link className="text-link" key={q.id} href={`/studio/${q.id}`}>{q.title} <ArrowRight size={14}/></Link>)}</section>}<details className="source-box"><summary>依据与内容说明</summary>{unit.sourceIds.map((id) => { const source = knowledge.sources.find((x) => x.id === id); return source && <div key={id}><a href={source.url} target="_blank" rel="noreferrer">{source.publisher} · {source.title}<ArrowUpRight size={13}/></a><p>{source.note}</p></div>; })}<p className="fine">来源用于核对任务或用法。例句、应用题和解释由项目原创，不是官方标准答案；未标作真人教师审核。</p></details></aside></div></div>;
}
