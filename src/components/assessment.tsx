"use client";
import Link from "next/link";
import { ChineseAid } from "./chinese-aid";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, FileCheck2 } from "lucide-react";
import { questions, examName } from "@/lib/content";
import { useLearning } from "./learning-provider";
import { Empty, PageIntro, Tag } from "./ui";
export function Assessment() {
  const { state, ready } = useLearning();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(timer); }, []);
  const usedIds = new Set([
    ...state.events.filter((e) => e.type !== "read").map((e) => e.contentId),
    ...Object.values(state.drafts).filter((draft) => draft.text.trim() || draft.versions.length).map((draft) => draft.contentId),
  ]);
  const pool = questions.filter((q) => q.evaluation && q.exam === state.profile.exam).sort((a, b) => {
    const condition = (id: string) => state.assessmentExposures.includes(id) ? 2 : usedIds.has(id) ? 1 : 0;
    return condition(a.id) - condition(b.id);
  });
  const records = state.events.filter((e) => e.type === "assessment" && pool.some((q) => q.id === e.contentId)).sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  const completed = new Set(records.map((e) => e.contentId));
  const firstAt = records[0]?.at;
  const elapsedDays = firstAt ? Math.max(0, Math.floor((now - Date.parse(firstAt)) / 86400000)) : 0;
  if (!ready) return <Empty title="正在读取评估记录" text="加载完成后，按你设置的考试展示保留题。" />;
  return <><PageIntro eyebrow="SEE WHAT TRANSFERS" title={records.length ? "换一道题，检查应用" : "先留下一份独立写作样本"} description="保留题不进入日常练习推荐。尽量选没看过参考、没写过的题，限时独立完成，再对照上一次的主要问题。"/><div className="assessment-banner"><FileCheck2 size={28}/><div><h3>{records.length ? `你已保存 ${records.length} 次评估作答` : "从实际产出开始诊断"}</h3><p>{records.length ? `距离首次作答 ${elapsedDays} 天。可以先即时换题，再隔几天复测；时间间隔会记录，但题目难度并未经过等值标定。` : "先写原稿，再从切题、理由、组织和准确性四方面自查。首次完成后，今日页会按你选的重点安排练习。"}</p></div><Tag tone="green">{examName(state.profile.exam)} · 30 分钟</Tag></div><div className="question-grid">{pool.map((q) => { const seen = state.assessmentExposures.includes(q.id); return <div className="question-card" key={q.id}><div className="question-top"><span className="index-number">{q.year}</span><Tag tone={seen || usedIds.has(q.id) ? "amber" : "green"}>{seen ? "已看参考 · 可复练" : completed.has(q.id) ? "已作答" : usedIds.has(q.id) ? "已有练习 / 历史记录" : "未记录作答或参考浏览"}</Tag></div><div className="question-meta">{q.year}.{q.month} · {q.theme}</div><h3>{q.title}</h3><p className="question-prompt english">{q.prompt}</p>{q.promptZh !== q.prompt && <ChineseAid text={q.promptZh}/> }<div className="question-footer"><span><Clock3 size={13}/> {q.wordRange.min}–{q.wordRange.max} 词</span><Link href={`/studio/${q.id}`} className="text-link">{usedIds.has(q.id) ? "继续作文 / 复练" : "开始作答"}<ArrowRight size={14}/></Link></div></div>; })}</div>{pool.length > 0 && pool.every((q) => state.assessmentExposures.includes(q.id) || usedIds.has(q.id)) && <p className="callout">当前保留题都已有本机学习或参考记录。可以继续复练，但不能把这些表现当作未训练题的新基线；需要更多未学习题目才能补充陌生题评估。</p>}<section className="panel assessment-method"><h2>如何判断练习有没有帮助？</h2><div className="route-grid"><div><h3>1. 保留原稿</h3><p>不看本题解析，留下第一份真实文章。看过题目不一定等于看过答案，页面标记只反映本机记录。</p></div><div><h3>2. 改一个问题</h3><p>例如理由空泛、要求遗漏或搭配不当。保存修改前后文本，并说明修改依据。</p></div><div><h3>3. 新题再写</h3><p>检查相同问题是否减少、能否独立解释观点。隔几天再测，可以补充延迟表现的证据。</p></div></div><p className="fine">本工具保留你的表现证据。真实提分效果需要同条件前后测及可靠评价，暂不声称已经验证。</p></section></>;
}
