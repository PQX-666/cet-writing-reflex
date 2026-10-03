"use client";

import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { useLearning } from "./learning-provider";
import { Empty, PageIntro, Tag } from "./ui";
import { questions, skillNames } from "@/lib/content";
import { chinaDayKey, reconcileLegacyIds } from "@/lib/learning";
import { exportLearningData, getStorageWarning, importLearningData } from "@/lib/storage";
import type { Exam, LearningState, Skill } from "@/types/learning";

function ProfileForm({ profile }: { profile: LearningState["profile"] }) {
  const { commit, notify } = useLearning();
  const [form, setForm] = useState(profile);
  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const saved = commit((state) => ({ ...state, profile: { ...form, examDate: form.examDate || undefined } }));
    if (saved) notify("学习安排已保存，首页任务会使用新的考试范围、时长与目标。");
  };
  return <form className="panel stack" onSubmit={save}><div><h2>按你能投入的时间安排</h2><p className="muted">证据不足时系统会明确按自选目标推荐；学习时长是任务安排依据，不是保证提分的时长。</p></div><div className="form-grid"><label className="field">备考考试<select value={form.exam} onChange={(e) => setForm({ ...form, exam: e.target.value as Exam })}><option value="CET6">英语六级</option><option value="CET4">英语四级</option></select></label><label className="field">每日可用时间（分钟）<input type="number" min={5} max={240} step={5} value={form.minutesPerDay} required onChange={(e) => setForm({ ...form, minutesPerDay: Number(e.target.value) })}/></label><label className="field">当前练习目标<select value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value as Skill })}>{(Object.keys(skillNames) as Skill[]).map((skill) => <option key={skill} value={skill}>{skillNames[skill]}</option>)}</select></label><label className="field">考试日期（可选）<input type="date" value={form.examDate || ""} onChange={(e) => setForm({ ...form, examDate: e.target.value || undefined })}/></label></div><div className="row"><button className="button primary" type="submit">保存学习安排</button></div></form>;
}

export function Settings() {
  const { state, ready, persisted, commit, notify } = useLearning();
  const [json, setJson] = useState("");
  const [backupText, setBackupText] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [importMessage, setImportMessage] = useState("");
  const warning = getStorageWarning();
  const download = () => {
    try {
      const exported = exportLearningData(persisted ? undefined : state);
      const blob = new Blob([exported], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = `writing-reflex-${chinaDayKey()}.json`;
      anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(persisted ? "备份文件已交给浏览器下载，包含当前学习记录与作文版本。" : "已导出当前内存中的作品与记录，包含未能保存到本机的更改。");
    } catch (error) { notify(error instanceof Error ? error.message : "导出失败，请检查浏览器权限。"); }
  };
  const importBackup = () => {
    if (!confirmed || !json.trim()) return;
    const result = importLearningData(json);
    setImportMessage(result.message);
    if (result.ok) {
      commit((loaded) => reconcileLegacyIds(loaded, questions));
      setJson(""); setConfirmed(false); notify(result.message);
    }
  };
  return <div className="stack"><PageIntro title="学习安排与数据" description="设置真实可用的时间，保存真实留下的作品。核心练习无需 API 密钥，记录存放在当前设备的浏览器中。" />
    {!ready ? <Empty title="正在加载学习安排" text="完成读取后可以修改设置。" /> : <ProfileForm key={JSON.stringify(state.profile)} profile={state.profile} />}
    {state.migratedLegacy && <div className="feedback"><Tag tone="amber">已迁移旧版记录</Tag><p>旧作文与学习活动保留为历史存档。旧形式分、关键词判定和卡片自评不作为真实成绩、正确率或掌握证据，旧浏览器键未删除。</p></div>}
    {!persisted && <div className="feedback" role="status"><Tag tone="amber">尚未保存到本机</Tag><p>当前更改保留在本页内存。请先导出备份，关闭或刷新页面可能丢失这些未保存更改。</p></div>}
    {warning && <div className="feedback" role="status"><Tag tone="amber">本地数据提示</Tag><p>{warning}</p></div>}
    <section className="panel stack"><div><h2>把作品与学习记录带走</h2><p className="muted">刷新页面会恢复已保存记录。清理浏览器数据、使用隐私窗口或换设备，会使这些本机记录不可用。请定期导出备份，再在新设备导入。</p></div><div className="row wrap"><button className="button secondary" onClick={download} disabled={!ready}><Download size={17}/> 导出 JSON 备份</button><button className="button ghost" onClick={() => setBackupText(exportLearningData(persisted ? undefined : state))} disabled={!ready}>查看 / 复制备份文本</button><Tag>版本化校验 · 含原稿与修改稿</Tag></div>{backupText && <label className="field">完整备份文本（可全选复制保存为 .json）<textarea aria-label="导出的完整 JSON 备份" rows={10} readOnly value={backupText}/></label>}<p className="fine">损坏的本地数据会导出为恢复备份，普通保存不会覆盖它。恢复备份保存原始文本供排查，不能直接当作正常学习备份导入。</p></section>
    <section className="panel stack"><div><h2>导入学习备份</h2><p className="muted">读取文件只会填入待导入内容。点击确认导入后，经过完整格式与版本验证，再替换当前本机记录；验证失败会保留当前数据。</p></div><label className="field">选择本产品导出的 JSON 文件<input type="file" accept=".json,application/json" onChange={async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.size > 5000000) { setImportMessage("备份文件超过 5 MB，请使用较小的有效备份。"); return; }
      try { setJson(await file.text()); setConfirmed(false); setImportMessage("文件已读取，请检查后确认覆盖。"); }
      catch { setImportMessage("无法读取这个文件，请重新选择或粘贴 JSON。"); }
    }}/></label><label className="field">或粘贴备份内容<textarea aria-label="待导入的 JSON 备份" rows={6} value={json} placeholder="粘贴 v2 备份或旧版 cet6 备份 JSON……" onChange={(e) => { setJson(e.target.value); setConfirmed(false); setImportMessage(""); }}/></label><label className="row"><input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)}/><span>我确认使用这份备份替换当前本机学习记录，已保存需要保留的现有数据。</span></label><div className="row"><button className="button primary" disabled={!ready || !confirmed || !json.trim()} onClick={importBackup}><Upload size={17}/> 确认覆盖并导入</button></div>{importMessage && <p className="feedback" role="status">{importMessage}</p>}</section>
    <section className="panel"><h3>反馈来源与边界</h3><p className="muted">词数与首句检查属于确定规则；段落数量与重复提示不会合成考试分数。无密钥状态下，通过教学示例与自检修改作文，系统不伪造 AI 全文评估。卡片自评、修改次数与无提示作答都是学习记录，不是分数或能力证明。</p></section>
  </div>;
}
