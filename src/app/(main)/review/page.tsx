"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import { getTrainingRecords, getWritingDrafts, getCardProgress, clearAllData } from "@/lib/storage";
import { analyzeWeaknesses, generateAdvice } from "@/lib/progress";
import { formatDate, getStatusColor, getStatusLabel } from "@/lib/text";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  TrendingDown,
  BookOpen,
  Lightbulb,
  FileText,
  XCircle,
  Search,
} from "lucide-react";

export default function ReviewPage() {
  const questions = cet6WritingDataset.questions;
  const [refresh, setRefresh] = useState(0);

  const records = useMemo(() => getTrainingRecords(), [refresh]);
  const writings = useMemo(() => getCompletedWritings(), [refresh]);
  const analysis = useMemo(() => analyzeWeaknesses(questions), [questions, refresh]);
  const advice = useMemo(() => generateAdvice(analysis), [analysis]);

  const typeErrors = records.filter((r) => r.type === "type_recognition" && r.typeCorrect === false);
  const keywordErrors = records.filter((r) => r.type === "keyword_extraction" && r.keywordCorrect === false);
  const outlineRecords = records.filter((r) => r.type === "outline");

  const cardProgress = getCardProgress();
  const weakCards_ = Object.entries(cardProgress)
    .filter(([, p]) => p.rating === "again" || p.rating === "hard")
    .slice(0, 20);

  // Group type errors by type
  const typeErrorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of typeErrors) {
      const q = questions.find((q) => q.id === r.questionId);
      if (q) {
        counts[q.type] = (counts[q.type] || 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [typeErrors, questions]);

  // Group keyword errors by theme group
  const themeErrorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of keywordErrors) {
      const q = questions.find((q) => q.id === r.questionId);
      if (q) {
        counts[q.themeGroup] = (counts[q.themeGroup] || 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [keywordErrors, questions]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">错题本与学习记录</h1>
        <p className="text-sm text-gray-500 mt-1">
          回顾错误，找到薄弱点，针对性提高
        </p>
      </div>

      {/* Personalized Advice */}
      {advice.filter((a) => a.type !== "general").length > 0 && (
        <div className="space-y-2">
          {advice.map((a, i) => (
            <Alert key={i} variant={a.type === "type_weak" ? "destructive" : "default"}>
              <AlertTriangle size={14} />
              <AlertDescription className="text-sm">{a.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {records.length === 0 && writings.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center text-gray-500">
            还没有训练记录。开始反应训练和限时写作后，这里会显示你的错题和学习记录。
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview" className="text-xs">总览</TabsTrigger>
            <TabsTrigger value="type_errors" className="text-xs">题型错误</TabsTrigger>
            <TabsTrigger value="keyword_errors" className="text-xs">关键词错误</TabsTrigger>
            <TabsTrigger value="writing" className="text-xs">写作记录</TabsTrigger>
            <TabsTrigger value="cards" className="text-xs">卡片弱项</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="总训练次数" value={records.length} />
              <StatCard label="题型错误" value={typeErrors.length} color="text-red-600" />
              <StatCard label="关键词错误" value={keywordErrors.length} color="text-orange-600" />
              <StatCard label="写作次数" value={writings.length} />
            </div>

            {/* Weak Types */}
            {typeErrorCounts.length > 0 && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">易错题型</CardTitle></CardHeader>
                <CardContent>
                  {typeErrorCounts.map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between py-1">
                      <Badge>{type}</Badge>
                      <span className="text-sm text-red-600 font-medium">{count} 次错误</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Weak Theme Groups */}
            {themeErrorCounts.length > 0 && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">薄弱主题群</CardTitle></CardHeader>
                <CardContent>
                  {themeErrorCounts.map(([theme, count]) => (
                    <div key={theme} className="flex items-center justify-between py-1">
                      <Badge variant="secondary">{theme}</Badge>
                      <span className="text-sm text-orange-600 font-medium">{count} 次错误</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent writings */}
            {writings.length > 0 && (
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-sm">最近写作</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {writings.slice(0, 5).map((w, i) => {
                    const q = questions.find((q) => q.id === w.questionId);
                    return (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span>{q?.chineseTitle || w.questionId}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{w.wordCount}词</Badge>
                          {w.score !== undefined && (
                            <Badge className={w.score >= 70 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                              {w.score}分
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Type Errors */}
          <TabsContent value="type_errors" className="space-y-3 mt-4">
            {typeErrors.length === 0 ? (
              <p className="text-center text-gray-400 py-8">暂无题型识别错误</p>
            ) : (
              typeErrors.map((r, i) => {
                const q = questions.find((q) => q.id === r.questionId);
                return (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">错误</Badge>
                        <span className="text-sm">你选了：<strong>{r.selectedType}</strong></span>
                      </div>
                      {q && (
                        <div>
                          <p className="text-sm">{q.prompt}</p>
                          <Badge className="mt-1">正确答案：{q.type}</Badge>
                          <p className="text-xs text-gray-500 mt-1">{q.trainingTasks.typeRecognition.explanation}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(r.completedAt)}</p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* Keyword Errors */}
          <TabsContent value="keyword_errors" className="space-y-3 mt-4">
            {keywordErrors.length === 0 ? (
              <p className="text-center text-gray-400 py-8">暂无关键词提取错误</p>
            ) : (
              keywordErrors.map((r, i) => {
                const q = questions.find((q) => q.id === r.questionId);
                return (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">错误</Badge>
                        <span className="text-sm">你输入了：<strong>{r.keywordInput}</strong></span>
                      </div>
                      {q && (
                        <div>
                          <p className="text-sm">{q.prompt}</p>
                          <Badge className="mt-1">核心词：{q.coreKeywords[0]}</Badge>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(r.completedAt)}</p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* Writing Records */}
          <TabsContent value="writing" className="space-y-3 mt-4">
            {writings.length === 0 ? (
              <p className="text-center text-gray-400 py-8">暂无写作记录</p>
            ) : (
              writings.map((w, i) => {
                const q = questions.find((q) => q.id === w.questionId);
                return (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{q?.chineseTitle || w.questionId}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{w.wordCount}词</Badge>
                          {w.score !== undefined && (
                            <Badge className={w.score >= 70 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                              {w.score}分
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {w.startedAt && <span>开始：{formatDate(w.startedAt)}</span>}
                        {w.timeUsed && <span className="ml-3">用时：{Math.floor(w.timeUsed / 60)}分{w.timeUsed % 60}秒</span>}
                      </div>
                      {w.scoreDetail && (
                        <div className="mt-2 space-y-0.5">
                          {w.scoreDetail.checks.map((c, j) => (
                            <div key={j} className={`text-xs ${c.passed ? "text-green-600" : "text-yellow-600"}`}>
                              {c.passed ? "✓" : "✗"} {c.name}: {c.message}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* Card Weaknesses */}
          <TabsContent value="cards" className="space-y-3 mt-4">
            {weakCards_.length === 0 ? (
              <p className="text-center text-gray-400 py-8">暂无薄弱卡片</p>
            ) : (
              weakCards_.map(([cardId, progress]) => {
                const parts = cardId.split("-");
                const qId = parts.slice(1, -1).join("-");
                const cardIdx = parseInt(parts[parts.length - 1]);
                const q = questions.find((q) => q.id === qId || cardId.includes(q.id));
                const card = q?.memorizationCards[cardIdx];
                return (
                  <Card key={cardId}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">{progress.rating === "again" ? "不会" : "模糊"}</Badge>
                        <span className="text-sm">{q?.chineseTitle}</span>
                      </div>
                      {card && (
                        <div>
                          <p className="text-sm text-gray-700">{card.front}</p>
                          <p className="text-xs text-gray-400 mt-1">答案：{card.answer.slice(0, 60)}...</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        复习 {progress.reviewCount} 次 · 正确 {progress.correctCount} · 错误 {progress.wrongCount}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "text-gray-900",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </CardContent>
    </Card>
  );
}

function getCompletedWritings() {
  return getWritingDrafts().filter((d) => d.submittedAt);
}
