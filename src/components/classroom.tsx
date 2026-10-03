"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { questions, examName, taskNames } from "@/lib/content";
import { useLearning } from "./learning-provider";
import { Empty, PageIntro, QuestionCard, Tag } from "./ui";
export function Classroom() {
  const { state } = useLearning(); const [search, setSearch] = useState(""); const [kind, setKind] = useState("all"); const [deepOnly, setDeepOnly] = useState(false); const [favoriteOnly, setFavoriteOnly] = useState(false);
  const pool = questions.filter((q) => q.exam === state.profile.exam && !q.evaluation);
  const filtered = pool.filter((q) => (!deepOnly || q.deep) && (!favoriteOnly || state.favorites.includes(q.id)) && (kind === "all" || q.taskKind === kind) && `${q.title} ${q.prompt} ${q.theme} ${q.year}`.toLowerCase().includes(search.toLowerCase()));
  return <><PageIntro eyebrow="THE CLASSROOM" title="真题课堂" description="每道题保留来源、要求整理说明和原创解析。先做自己的尝试，再借助材料把想法写清楚。"><Tag tone="green">{examName(state.profile.exam)} · {pool.length} 道学习真题</Tag></PageIntro><div className="filter-bar"><div className="search-field"><Search size={18}/><input aria-label="搜索真题" placeholder="搜索主题、英文关键词或年份" value={search} onChange={(e) => setSearch(e.target.value)}/></div><label className="select-field"><SlidersHorizontal size={16}/><select aria-label="表达任务" value={kind} onChange={(e) => setKind(e.target.value)}><option value="all">全部表达任务</option>{Object.entries(taskNames).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><label className="checkbox-label"><input type="checkbox" checked={deepOnly} onChange={(e) => setDeepOnly(e.target.checked)}/>只看深度单元</label><label className="checkbox-label"><input type="checkbox" checked={favoriteOnly} onChange={(e) => setFavoriteOnly(e.target.checked)}/>只看收藏</label></div><div className="row between result-line"><span className="muted">找到 {filtered.length} 道题</span><span className="fine">独立评估题保留在「写作诊断」中</span></div>{filtered.length ? <div className="question-grid">{filtered.map((q,i)=><QuestionCard key={q.id} question={q} index={i}/>)}</div> : <Empty title="没有找到符合条件的题目" text="试试其他关键词，或取消筛选。"/>}<div className="quiet-note">参考作文与表达经过独立模型校审。每道题的来源性质和核验说明，可在课堂中查看。</div></>;
}
