"use client";

import { Suspense, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import type { Question } from "@/types/dataset";
import { saveWritingDraft, getWritingDraftForQuestion, addTrainingRecord } from "@/lib/storage";
import { scoreEssay, countWords, countParagraphs, detectConnectors, detectKeywords } from "@/lib/scoring";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getTypeColor, getDifficultyColor } from "@/lib/text";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Hash,
  Layers,
} from "lucide-react";

function WritingContent() {
  const searchParams = useSearchParams();
  const questions = cet6WritingDataset.questions;

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [essay, setEssay] = useState("");
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min
  const [isRunning, setIsRunning] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<ReturnType<typeof scoreEssay> | null>(null);

  // Hidden prompts
  const [showReaction, setShowReaction] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [showSentences, setShowSentences] = useState(false);
  const [showEssay_, setShowEssay_] = useState(false);

  // Checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Auto-save indicator
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Reset confirmation
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const qId = searchParams.get("q");
    if (qId) {
      const q = questions.find((q) => q.id === qId);
      if (q) {
        setSelectedQuestion(q);
        // Load draft
        const draft = getWritingDraftForQuestion(qId);
        if (draft) {
          setEssay(draft.essay);
        }
      }
    }
  }, [searchParams, questions]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!selectedQuestion || !essay.trim()) return;
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => {
      saveWritingDraft({
        questionId: selectedQuestion.id,
        essay,
        wordCount,
        startedAt: startedAt || new Date().toISOString(),
      });
      setLastSavedAt(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 30000);
    return () => {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    };
  }, [essay]);

  const detectedConnectors = detectConnectors(essay);
  const detectedKeywords = selectedQuestion ? detectKeywords(essay, selectedQuestion.coreKeywords.slice(0, 3)) : [];

  const startTimer = () => {
    if (!selectedQuestion) return;
    if (!startedAt) setStartedAt(new Date().toISOString());
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1800);
    setStartedAt(null);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const wordCount = countWords(essay);
  const paragraphCount = countParagraphs(essay);

  const handleSave = () => {
    if (!selectedQuestion) return;
    saveWritingDraft({
      questionId: selectedQuestion.id,
      essay,
      wordCount,
      startedAt: startedAt || new Date().toISOString(),
    });
    setLastSavedAt(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  };

  const handleSubmit = () => {
    if (!selectedQuestion) return;
    setIsRunning(false);
    const result = scoreEssay(essay, selectedQuestion);
    setScoreResult(result);

    const draft = {
      questionId: selectedQuestion.id,
      essay,
      wordCount,
      startedAt: startedAt || new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      timeUsed: 1800 - timeLeft,
      checklistState: checklist,
      score: result.score,
      scoreDetail: result,
    };
    saveWritingDraft(draft);
    addTrainingRecord({
      id: `write_${Date.now()}`,
      questionId: selectedQuestion.id,
      type: "writing",
      completedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  const selectQuestion = (id: string) => {
    const q = questions.find((q) => q.id === id);
    if (q) {
      setSelectedQuestion(q);
      setEssay("");
      setSubmitted(false);
      setScoreResult(null);
      setShowReaction(false);
      setShowOutline(false);
      setShowSentences(false);
      setShowEssay_(false);
      setChecklist({});
      setLastSavedAt(null);
      resetTimer();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">限时写作训练</h1>
        <p className="text-sm text-gray-500 mt-1">
          30分钟倒计时，模拟真实考场环境。提示默认隐藏，建议先自己完成再查看。
        </p>
      </div>

      {/* Question Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium">选择题目：</span>
            <Select value={selectedQuestion?.id || ""} onValueChange={(v) => v && selectQuestion(v)}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="选择或随机一道真题" />
              </SelectTrigger>
              <SelectContent>
                {questions.map((q) => (
                  <SelectItem key={q.id} value={q.id}>
                    {q.sourceYear} - {q.chineseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectQuestion(questions[Math.floor(Math.random() * questions.length)].id)}
            >
              随机抽题
            </Button>
          </div>
        </CardContent>
      </Card>

      {!selectedQuestion ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center text-gray-500">
            请先选择一道真题开始写作训练
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main writing area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Prompt */}
            <Card className="border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getTypeColor(selectedQuestion.type)}>{selectedQuestion.type}</Badge>
                  <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>{selectedQuestion.difficulty}</Badge>
                  <Badge variant="secondary">{selectedQuestion.themeGroup}</Badge>
                </div>
                <p className="text-base font-medium text-gray-900">{selectedQuestion.prompt}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedQuestion.wordLimit}</p>
              </CardContent>
            </Card>

            {/* Timer + Stats */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xl font-bold ${
                timeLeft <= 300 ? "bg-red-100 text-red-700" : "bg-indigo-100 text-indigo-700"
              }`}>
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>
              <Button variant={isRunning ? "outline" : "default"} size="sm" onClick={startTimer} disabled={isRunning}>
                <Play size={14} className="mr-1" /> 开始
              </Button>
              <Button variant="outline" size="sm" onClick={pauseTimer} disabled={!isRunning}>
                <Pause size={14} className="mr-1" /> 暂停
              </Button>
              <Button variant="outline" size="sm" onClick={resetTimer}>
                <RotateCcw size={14} className="mr-1" /> 重置
              </Button>
              <div className="flex items-center gap-3 text-sm">
                <span className={`flex items-center gap-1 font-medium ${
                  wordCount < 150 ? "text-orange-600" : wordCount > 200 ? "text-red-600" : "text-green-600"
                }`}>
                  <FileText size={14} /> {wordCount} 词
                  {wordCount < 150 && <span className="text-xs">(不足)</span>}
                  {wordCount >= 150 && wordCount <= 200 && <span className="text-xs">(达标)</span>}
                  {wordCount > 200 && <span className="text-xs">(超标)</span>}
                </span>
                <span className={`flex items-center gap-1 ${paragraphCount < 3 ? "text-orange-600" : "text-green-600"}`}>
                  <Layers size={14} /> {paragraphCount} 段
                </span>
                {lastSavedAt && (
                  <span className="text-xs text-gray-400">
                    已自动保存 {lastSavedAt}
                  </span>
                )}
              </div>
            </div>

            {/* Word count warning */}
            {wordCount > 0 && wordCount < 150 && (
              <Alert>
                <AlertTriangle size={14} className="text-orange-500" />
                <AlertDescription className="text-orange-700">
                  词数不足，建议补充理由或例子（当前 {wordCount} 词，目标 150-200 词）
                </AlertDescription>
              </Alert>
            )}
            {wordCount > 200 && (
              <Alert variant="destructive">
                <AlertTriangle size={14} />
                <AlertDescription>
                  超过建议词数，请适当压缩（当前 {wordCount} 词，目标 150-200 词）
                </AlertDescription>
              </Alert>
            )}

            {/* Paragraph reminder */}
            {wordCount > 0 && paragraphCount < 3 && (
              <Alert>
                <AlertTriangle size={14} className="text-orange-500" />
                <AlertDescription className="text-orange-700">
                  建议使用三段式结构（当前仅 {paragraphCount} 段）
                </AlertDescription>
              </Alert>
            )}

            {/* Live detection panel */}
            {essay.trim().length > 0 && (
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <span>
                  核心词覆盖：{detectedKeywords.length > 0
                    ? detectedKeywords.map((kw) => <Badge key={kw} className="ml-1 text-xs bg-green-100 text-green-700">{kw}</Badge>)
                    : <span className="text-orange-600 ml-1">未检测到</span>}
                </span>
                <span className="border-l pl-3">
                  连接词：{detectedConnectors.length >= 2
                    ? <span className="text-green-600 font-medium">{detectedConnectors.length} 个</span>
                    : <span className="text-orange-600">{detectedConnectors.length} 个（建议≥2）</span>}
                </span>
              </div>
            )}

            {/* Essay Editor */}
            <textarea
              className="w-full border rounded-lg p-4 text-sm leading-relaxed resize-y min-h-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="在这里写作文...（建议150-200词，至少3段）&#13;&#10;&#13;&#10;第一段：引出主题&#13;&#10;&#13;&#10;第二段：展开分析&#13;&#10;&#13;&#10;第三段：总结建议"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save size={14} className="mr-1" /> 保存草稿
              </Button>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => setResetDialogOpen(true)}>
                <RotateCcw size={14} className="mr-1" /> 清空重写
              </Button>
              <Button onClick={handleSubmit} disabled={submitted} className="bg-indigo-600 hover:bg-indigo-700">
                <CheckCircle2 size={14} className="mr-1" /> 提交作文
              </Button>
            </div>

            {/* Reset confirmation dialog */}
            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>确认清空</DialogTitle>
                  <DialogDescription>
                    确定清空当前作文草稿吗？此操作不可撤销。
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setResetDialogOpen(false)}>取消</Button>
                  <Button variant="destructive" onClick={() => { setEssay(""); setResetDialogOpen(false); setLastSavedAt(null); }}>
                    确认清空
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Score Result */}
            {scoreResult && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 space-y-3">
                  <Alert>
                    <AlertTriangle size={14} className="text-yellow-600" />
                    <AlertDescription className="text-xs text-yellow-700">
                      当前评分为形式检查，只用于判断你的作文是否满足基本结构要求，例如词数、段落、关键词、连接词和总结句。它不等同于真实六级作文评分，也不能完整评估语法、逻辑深度和内容质量。
                    </AlertDescription>
                  </Alert>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">形式完成度评分</p>
                    <p className="text-3xl font-bold text-green-700">{scoreResult.score}</p>
                    <p className="text-sm text-green-600">分 / 100</p>
                    <p className="text-xs text-gray-400 mt-1">此分数 ≠ 六级真实得分</p>
                  </div>
                  <div className="space-y-2">
                    {scoreResult.checks.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        {c.passed ? (
                          <CheckCircle2 size={14} className="text-green-600" />
                        ) : (
                          <AlertTriangle size={14} className="text-yellow-600" />
                        )}
                        <span className="font-medium">{c.name}:</span>
                        <span className="text-gray-600">{c.message}</span>
                      </div>
                    ))}
                  </div>

                  {/* Post-submit recommendations */}
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">下一步推荐</p>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/questions/${selectedQuestion.id}`}>
                        <Button variant="outline" size="sm">查看评分清单</Button>
                      </Link>
                      <Link href={`/questions/${selectedQuestion.id}`}>
                        <Button variant="outline" size="sm">复习常见错误</Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          selectQuestion(questions[Math.floor(Math.random() * questions.length)].id);
                        }}
                      >
                        换一篇写
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Hidden prompts + Checklist */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">隐藏提示</CardTitle>
                <CardDescription className="text-xs text-orange-600">
                  考场上没有提示，建议先自己完成再查看
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowReaction(!showReaction)}
                >
                  {showReaction ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                  查看10秒/30秒/60秒提示
                </Button>
                {showReaction && (
                  <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 space-y-1">
                    <p>{selectedQuestion.immediateReactionTraining.tenSecondReaction}</p>
                    <p>{selectedQuestion.immediateReactionTraining.thirtySecondReaction}</p>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowOutline(!showOutline)}
                >
                  {showOutline ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                  查看三段提纲
                </Button>
                {showOutline && (
                  <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 space-y-1">
                    <p><strong>P1:</strong> {selectedQuestion.immediateReactionTraining.sixtySecondOutline.P1}</p>
                    <p><strong>P2:</strong> {selectedQuestion.immediateReactionTraining.sixtySecondOutline.P2}</p>
                    <p><strong>P3:</strong> {selectedQuestion.immediateReactionTraining.sixtySecondOutline.P3}</p>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowSentences(!showSentences)}
                >
                  {showSentences ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                  查看可用句式
                </Button>
                {showSentences && (
                  <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 space-y-1 max-h-40 overflow-y-auto">
                    {selectedQuestion.sentenceBank.slice(0, 5).map((s) => (
                      <p key={s.id}>{s.sentence}</p>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowEssay_(!showEssay_)}
                >
                  {showEssay_ ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                  查看参考范文
                </Button>
                {showEssay_ && (
                  <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 max-h-40 overflow-y-auto whitespace-pre-line">
                    {selectedQuestion.modelEssayForTraining.essay.slice(0, 500)}...
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">自查清单</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedQuestion.scoringChecklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Checkbox
                        id={`write-check-${i}`}
                        checked={checklist[`item-${i}`] || false}
                        onCheckedChange={(v) => setChecklist({ ...checklist, [`item-${i}`]: !!v })}
                      />
                      <label htmlFor={`write-check-${i}`} className="text-xs text-gray-600 cursor-pointer">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WritingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">加载中...</div>}>
      <WritingContent />
    </Suspense>
  );
}
