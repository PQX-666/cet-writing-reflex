"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import { computeTrainingStats } from "@/lib/progress";
import {
  isOnboardingStepCompleted,
  isOnboardingFullyCompleted,
  shouldRemindBackup,
  getLastExportAt,
  exportAllData,
  importAllData,
  recordExport,
  getTrainingRecords,
  getCardProgress,
} from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  GraduationCap,
  Library,
  BookOpen,
  Clock,
  BookMarked,
  TrendingUp,
  BookText,
  Layers,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  Download,
  Upload,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const questions = cet6WritingDataset.questions;
  const metadata = cet6WritingDataset.metadata;
  const stats = useMemo(() => computeTrainingStats(questions), [questions]);

  const themeGroups = metadata.themeGroups;
  const typeDefs = metadata.typeDefinitions;

  const [onboardingDone, setOnboardingDone] = useState(false);
  const [showBackupReminder, setShowBackupReminder] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importMsg, setImportMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setOnboardingDone(isOnboardingFullyCompleted());
    setShowBackupReminder(shouldRemindBackup());
  }, []);

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cet6-trainer-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    recordExport();
    setShowBackupReminder(false);
  };

  const handleImport = () => {
    const ok = importAllData(importJson);
    if (ok) {
      setImportMsg({ type: "success", text: "学习记录已导入" });
      setImportDialogOpen(false);
    } else {
      setImportMsg({ type: "error", text: "导入失败，请检查 JSON 格式" });
    }
  };

  const onboardingSteps = [
    {
      id: "formula",
      label: "了解六级作文三段式公式",
      desc: "先掌握「第一段引题、第二段两个理由、第三段总结建议」的核心框架。",
      href: "/knowledge",
      btn: "查看作文公式",
      icon: BookOpen,
    },
    {
      id: "type_recognition",
      label: "完成 1 道题型识别训练",
      desc: "训练 10 秒内判断题型。",
      href: "/training/reaction",
      btn: "开始题型识别",
      icon: Target,
    },
    {
      id: "outline",
      label: "完成 1 道三段提纲训练",
      desc: "训练 60 秒内写出 P1/P2/P3 中文提纲。",
      href: "/training/reaction",
      btn: "开始提纲训练",
      icon: Layers,
    },
    {
      id: "cards",
      label: "背诵 5 张核心句式卡片",
      desc: "优先背原因总起句、反问句、总结句。",
      href: "/cards",
      btn: "开始背诵",
      icon: BookMarked,
    },
    {
      id: "writing",
      label: "写 1 篇 30 分钟限时作文",
      desc: "完成一次完整考场模拟。",
      href: "/writing",
      btn: "开始限时写作",
      icon: Clock,
    },
  ];

  const completedSteps = onboardingSteps.filter((s) => isOnboardingStepCompleted(s.id)).length;

  // Check existing activity to refine onboarding display
  const hasAnyTraining = getTrainingRecords().length > 0;
  const hasAnyCards = Object.keys(getCardProgress()).length > 0;

  const todayTasks = [
    {
      label: "题型识别训练",
      done: stats.todayProgress.typeRecognition.done,
      target: stats.todayProgress.typeRecognition.target,
      href: "/training/reaction",
      icon: Target,
    },
    {
      label: "关键词提取训练",
      done: stats.todayProgress.keywordExtraction.done,
      target: stats.todayProgress.keywordExtraction.target,
      href: "/training/reaction",
      icon: TrendingUp,
    },
    {
      label: "三段提纲训练",
      done: stats.todayProgress.outline.done,
      target: stats.todayProgress.outline.target,
      href: "/training/reaction",
      icon: Layers,
    },
    {
      label: "背诵卡片",
      done: stats.todayProgress.cards.done,
      target: stats.todayProgress.cards.target,
      href: "/cards",
      icon: BookMarked,
    },
    {
      label: "限时写作",
      done: stats.todayProgress.writing.done,
      target: stats.todayProgress.writing.target,
      href: "/writing",
      icon: Clock,
    },
  ];

  const todayTotal = todayTasks.reduce((s, t) => s + t.done, 0);
  const todayMax = todayTasks.reduce((s, t) => s + t.target, 0);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
        <h1 className="text-2xl font-bold tracking-tight">
          六级作文真题反应训练系统
        </h1>
        <p className="mt-1 text-indigo-100 text-sm max-w-2xl">
          训练你看到题目后，快速判断题型、抓住关键词、匹配模板、生成三段提纲。不是范文资料库，而是考场反应训练系统。
        </p>
      </div>

      {/* Onboarding Guide */}
      {!onboardingDone && (
        <Card className="border-indigo-200 bg-gradient-to-b from-indigo-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap size={20} className="text-indigo-600" />
              新手推荐路径：20 分钟上手六级作文反应训练
            </CardTitle>
            <CardDescription>
              按照这 5 步走，先形成「看题 → 判断题型 → 抓关键词 → 写三段提纲」的基本能力。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 mb-3">
              <div className="text-xs text-gray-500">
                已完成 {completedSteps} / 5 步
              </div>
              <Progress value={(completedSteps / 5) * 100} className="h-1.5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {onboardingSteps.map((step, i) => {
                const done = isOnboardingStepCompleted(step.id);
                return (
                  <div key={step.id} className={`border rounded-lg p-3 ${done ? "border-green-300 bg-green-50" : "border-gray-200"}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}>
                        {done ? <CheckCircle2 size={12} /> : i + 1}
                      </span>
                      <span className={`text-xs font-medium ${done ? "text-green-700" : "text-gray-700"}`}>
                        {step.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{step.desc}</p>
                    <Link href={step.href}>
                      <Button size="sm" variant={done ? "outline" : "default"} className={`w-full text-xs ${done ? "border-green-300 text-green-600" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                        {done ? <CheckCircle2 size={12} className="mr-1" /> : <ArrowRight size={12} className="mr-1" />}
                        {done ? "已完成" : step.btn}
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {onboardingDone && (
        <Alert>
          <CheckCircle2 size={16} className="text-green-600" />
          <AlertTitle className="text-green-700">你已完成新手路径！</AlertTitle>
          <AlertDescription>
            建议进入
            <Link href="/plan" className="text-indigo-600 font-medium mx-1 hover:underline">3 天冲刺计划</Link>
            或继续
            <Link href="/training/reaction" className="text-indigo-600 font-medium mx-1 hover:underline">反应训练</Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Backup reminder */}
      {showBackupReminder && (hasAnyTraining || hasAnyCards) && (
        <Alert variant="destructive" className="border-orange-300 bg-orange-50">
          <AlertTriangle size={16} className="text-orange-600" />
          <div className="flex-1">
            <AlertTitle className="text-orange-800 text-sm">本地学习数据提醒</AlertTitle>
            <AlertDescription className="text-xs text-orange-700">
              你的训练记录、背诵进度和写作草稿目前保存在当前浏览器中。清除浏览器数据或更换设备可能导致进度丢失。建议定期导出备份。
              {getLastExportAt() && (
                <span className="block mt-0.5">上次导出：{new Date(getLastExportAt()!).toLocaleDateString("zh-CN")}</span>
              )}
            </AlertDescription>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 text-xs" onClick={handleExport}>
              <Download size={12} className="mr-1" /> 导出
            </Button>
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 text-xs" onClick={() => setImportDialogOpen(true)}>
              <Upload size={12} className="mr-1" /> 导入
            </Button>
          </div>
        </Alert>
      )}

      {/* Import dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>导入学习记录</DialogTitle>
            <DialogDescription>粘贴之前导出的 JSON 数据。这将覆盖当前所有本地记录。</DialogDescription>
          </DialogHeader>
          <textarea
            className="w-full border rounded-lg p-3 text-xs min-h-[200px] resize-y"
            placeholder="粘贴 JSON..."
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
          />
          {importMsg && (
            <Alert variant={importMsg.type === "success" ? "default" : "destructive"}>
              <AlertDescription>{importMsg.text}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>取消</Button>
            <Button onClick={handleImport}>确认导入</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Today's Training */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">今日核心训练</h2>
          <span className="text-sm text-gray-500">
            已完成 {todayTotal}/{todayMax} 项
          </span>
        </div>
        <Progress value={(todayTotal / todayMax) * 100} className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {todayTasks.map((task) => {
            const pct = task.target > 0 ? (task.done / task.target) * 100 : 0;
            const done = task.done >= task.target;
            return (
              <Link key={task.label} href={task.href}>
                <Card className={done ? "border-green-300 bg-green-50" : "hover:border-indigo-300 transition-colors"}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <task.icon size={16} className={done ? "text-green-600" : "text-indigo-600"} />
                      <span className="text-sm font-medium">{task.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={done ? "text-green-600 font-bold text-xl" : "text-indigo-600 font-bold text-xl"}>
                        {task.done}
                      </span>
                      <span className="text-xs text-gray-400">/ {task.target}</span>
                    </div>
                    <Progress value={pct} className="mt-2 h-1" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="真题数量" value={stats.totalQuestions} icon={BookText} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="题型数量" value={stats.totalTypes} icon={Layers} color="text-purple-600" bg="bg-purple-50" />
        <StatCard label="主题群" value={stats.totalThemeGroups} icon={Library} color="text-green-600" bg="bg-green-50" />
        <StatCard label="背诵卡片" value={stats.totalCards} icon={BookMarked} color="text-orange-600" bg="bg-orange-50" />
        <StatCard label="已完成训练" value={stats.completedTrainings} icon={GraduationCap} color="text-indigo-600" bg="bg-indigo-50" />
        <StatCard label="今日进度" value={`${todayTotal}/${todayMax}`} icon={Target} color="text-rose-600" bg="bg-rose-50" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">快速入口</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickActionButton href="/training/reaction" icon={GraduationCap} label="开始题目反应训练" />
          <QuickActionButton href="/questions" icon={Library} label="进入真题库" />
          <QuickActionButton href="/knowledge" icon={BookOpen} label="背诵模板句式" />
          <QuickActionButton href="/writing" icon={Clock} label="开始30分钟写作" />
          <QuickActionButton href="/review" icon={BookMarked} label="查看错题本" />
        </div>
      </div>

      {/* Theme Groups */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">高频主题群</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(themeGroups).map(([group, themes]) => (
            <Card key={group}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{group}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {themes.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Type Definitions Summary */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">六级作文公式速览</h2>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-indigo-700 mb-3">
              万能公式：{metadata.universalFormula.core}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(typeDefs).map(([type, def]) => (
                <div key={type} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="text-xs">{type}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">{def.core_logic.slice(0, 60)}...</p>
                  <p className="text-xs font-medium text-indigo-600 mt-1">{def.formula}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`rounded-lg p-2 ${bg}`}>
          <Icon size={18} className={color} />
        </div>
        <div>
          <div className={`text-xl font-bold ${color}`}>{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <Link href={href}>
      <Button variant="outline" className="w-full h-auto py-3 flex flex-col items-center gap-2 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
        <Icon size={20} className="text-indigo-600" />
        <span className="text-xs font-medium">{label}</span>
      </Button>
    </Link>
  );
}
