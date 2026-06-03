"use client";

import { useState, useEffect } from "react";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import { getPlanProgress, setPlanProgress, updatePlanTask, getTodayTrainingCount, getTodayCardReviewCount } from "@/lib/storage";
import type { ReviewPlanProgress } from "@/types/dataset";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CheckCircle2,
  Target,
  Zap,
  BookOpen,
  Clock,
} from "lucide-react";

interface DayPlan {
  label: string;
  tasks: { id: string; title: string; description: string }[];
}

const threeDayPlan: DayPlan[] = [
  {
    label: "Day 1：掌握基础",
    tasks: [
      { id: "d1_formula", title: "掌握作文万能公式", description: "熟记：主题重要性/现象/问题 → 两个理由 → 总结建议" },
      { id: "d1_type10", title: "做完10道题型识别", description: "在反应训练中完成10次题型判断" },
      { id: "d1_cards20", title: "背诵20张模板卡片", description: "重点背诵P1/P2/P3模板句" },
      { id: "d1_write1", title: "完成1篇限时写作", description: "选一道重要性类题目练习" },
    ],
  },
  {
    label: "Day 2：强化提升",
    tasks: [
      { id: "d2_review_weak", title: "复习薄弱题型", description: "查看错题本，重做容易判断错的题型" },
      { id: "d2_keyword10", title: "做完10道关键词提取", description: "在反应训练中完成关键词提取练习" },
      { id: "d2_cards20", title: "背诵20张主题句式", description: "重点背第二段原因句和连接词" },
      { id: "d2_write2", title: "完成2篇限时写作", description: "选不同题型的题目练习" },
    ],
  },
  {
    label: "Day 3：模拟冲刺",
    tasks: [
      { id: "d3_sim", title: "做完整模拟", description: "随机抽题，30分钟内完成作文" },
      { id: "d3_mistakes", title: "复习错题本", description: "回顾所有标注的错误" },
      { id: "d3_endings", title: "背诵结尾句和连接词", description: "重点记 Only in this way... 等高频结尾" },
      { id: "d3_write2", title: "完成2篇限时写作", description: "尝试不同主题群" },
    ],
  },
];

const sevenDayPlan: DayPlan[] = [
  {
    label: "Day 1",
    tasks: [
      { id: "7d1_type5", title: "题型识别训练 × 5", description: "掌握四种题型的信号词和公式" },
      { id: "7d1_cards15", title: "背诵模板卡 × 15", description: "开头句、原因总起、总结句" },
      { id: "7d1_write1", title: "限时写作 × 1", description: "重要性类题目" },
    ],
  },
  {
    label: "Day 2",
    tasks: [
      { id: "7d2_type5", title: "题型识别训练 × 5", description: "重点：社会现象类和对比平衡类" },
      { id: "7d2_keyword5", title: "关键词提取 × 5", description: "练习抓核心主题词" },
      { id: "7d2_cards15", title: "背诵句式卡 × 15", description: "原因句、反问句" },
    ],
  },
  {
    label: "Day 3",
    tasks: [
      { id: "7d3_outline3", title: "三段提纲训练 × 3", description: "练习写P1/P2/P3中文提纲" },
      { id: "7d3_cards15", title: "背诵主题句 × 15", description: "按主题群背诵" },
      { id: "7d3_write1", title: "限时写作 × 1", description: "问题解决类题目" },
    ],
  },
  {
    label: "Day 4",
    tasks: [
      { id: "7d4_type5", title: "题型识别训练 × 5", description: "混合题型随机练习" },
      { id: "7d4_keyword5", title: "关键词提取 × 5", description: "第二遍练习" },
      { id: "7d4_cards15", title: "复习弱项卡片 × 15", description: "只复习不会和模糊的卡片" },
    ],
  },
  {
    label: "Day 5",
    tasks: [
      { id: "7d5_outline3", title: "三段提纲训练 × 3", description: "不同题型各做一题" },
      { id: "7d5_cards15", title: "背诵高级句式 × 15", description: "高分版句式" },
      { id: "7d5_write2", title: "限时写作 × 2", description: "不同主题群" },
    ],
  },
  {
    label: "Day 6",
    tasks: [
      { id: "7d6_type3", title: "题型识别 × 3", description: "薄弱题型重点练" },
      { id: "7d6_cards20", title: "综合背诵 × 20", description: "模板句+句式+连接词" },
      { id: "7d6_write2", title: "限时写作 × 2", description: "随机题目模拟" },
    ],
  },
  {
    label: "Day 7",
    tasks: [
      { id: "7d7_sim", title: "完整模拟 × 2", description: "从抽题到完成，全程30分钟" },
      { id: "7d7_review", title: "总复习错题本", description: "回顾所有错题" },
      { id: "7d7_cards10", title: "快速过卡 × 10", description: "只复习最薄弱卡片" },
    ],
  },
];

const customTasks = [
  { id: "custom_type", title: "题型识别训练", description: "每日建议：5道" },
  { id: "custom_keyword", title: "关键词提取训练", description: "每日建议：5道" },
  { id: "custom_outline", title: "三段提纲训练", description: "每日建议：3道" },
  { id: "custom_cards", title: "背诵卡片", description: "每日建议：10张" },
  { id: "custom_write", title: "限时写作", description: "每日建议：1篇" },
];

export default function PlanPage() {
  const metadata = cet6WritingDataset.metadata;
  const [mode, setMode] = useState<"3day" | "7day" | "custom" | null>(null);
  const [plan, setPlan] = useState<ReviewPlanProgress | null>(null);

  useEffect(() => {
    const saved = getPlanProgress();
    if (saved) {
      setPlan(saved);
      setMode(saved.mode);
    }
  }, []);

  const handleStartPlan = (m: "3day" | "7day" | "custom") => {
    const newPlan: ReviewPlanProgress = {
      mode: m,
      startedAt: new Date().toISOString(),
      dayProgress: {},
    };
    setPlanProgress(newPlan);
    setPlan(newPlan);
    setMode(m);
  };

  const handleToggleTask = (dayKey: string, taskId: string, completed: boolean) => {
    if (!plan) return;
    updatePlanTask(dayKey, taskId, completed);
    // Refresh local state
    const updated = getPlanProgress();
    setPlan(updated);
  };

  const getPlanDays = (): DayPlan[] => {
    if (!mode) return [];
    switch (mode) {
      case "3day": return threeDayPlan;
      case "7day": return sevenDayPlan;
      case "custom":
        return [
          {
            label: "每日训练",
            tasks: customTasks,
          },
        ];
      default: return [];
    }
  };

  const getDayCompletion = (dayKey: string, tasks: { id: string }[]) => {
    if (!plan?.dayProgress[dayKey]) return 0;
    const completed = plan.dayProgress[dayKey].filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">复习计划</h1>
        <p className="text-sm text-gray-500 mt-1">
          根据间隔重复算法，合理安排每日训练任务
        </p>
      </div>

      {/* Algorithm Info */}
      <Card className="bg-indigo-50 border-indigo-200">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-indigo-700 mb-1">复习原则</p>
          <div className="flex flex-wrap gap-2">
            {metadata.reviewAlgorithmSuggestion.principles.map((p) => (
              <Badge key={p} className="bg-indigo-100 text-indigo-700">{p}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mode Selection */}
      {!mode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:border-indigo-300 cursor-pointer transition-colors" onClick={() => handleStartPlan("3day")}>
            <CardContent className="p-6 text-center">
              <Zap size={32} className="mx-auto text-orange-500 mb-3" />
              <h3 className="font-bold text-lg mb-1">3天冲刺模式</h3>
              <p className="text-sm text-gray-500">
                Day 1 掌握公式 · Day 2 强化练习 · Day 3 模拟冲刺
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-indigo-300 cursor-pointer transition-colors" onClick={() => handleStartPlan("7day")}>
            <CardContent className="p-6 text-center">
              <Calendar size={32} className="mx-auto text-blue-500 mb-3" />
              <h3 className="font-bold text-lg mb-1">7天提升模式</h3>
              <p className="text-sm text-gray-500">
                每天固定训练量，系统复习，逐步提升
              </p>
            </CardContent>
          </Card>
          <Card className="hover:border-indigo-300 cursor-pointer transition-colors" onClick={() => handleStartPlan("custom")}>
            <CardContent className="p-6 text-center">
              <Target size={32} className="mx-auto text-green-500 mb-3" />
              <h3 className="font-bold text-lg mb-1">自定义模式</h3>
              <p className="text-sm text-gray-500">
                选择每日训练量，按自己节奏安排
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-indigo-100 text-indigo-700 text-sm">
                {mode === "3day" ? "3天冲刺" : mode === "7day" ? "7天提升" : "自定义"}
              </Badge>
              <span className="text-sm text-gray-500 ml-2">
                开始于 {plan?.startedAt ? new Date(plan.startedAt).toLocaleDateString("zh-CN") : ""}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setMode(null); setPlan(null); }}>
              切换模式
            </Button>
          </div>

          <div className="space-y-4">
            {getPlanDays().map((day, di) => {
              const dayKey = `day_${di}`;
              const completion = getDayCompletion(dayKey, day.tasks);
              return (
                <Card key={di}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{day.label}</CardTitle>
                      <Badge variant={completion === 100 ? "default" : "outline"}>{completion}%</Badge>
                    </div>
                    <Progress value={completion} className="mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.tasks.map((task) => {
                        const taskProgress = plan?.dayProgress[dayKey]?.find((t) => t.taskId === task.id);
                        const completed = taskProgress?.completed || false;
                        return (
                          <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                            <Checkbox
                              id={`plan-${dayKey}-${task.id}`}
                              checked={completed}
                              onCheckedChange={(v) => handleToggleTask(dayKey, task.id, !!v)}
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={`plan-${dayKey}-${task.id}`}
                                className={`text-sm font-medium cursor-pointer ${completed ? "line-through text-gray-400" : "text-gray-700"}`}
                              >
                                {task.title}
                              </label>
                              <p className="text-xs text-gray-500">{task.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
