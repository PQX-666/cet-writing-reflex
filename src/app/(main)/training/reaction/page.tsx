"use client";

import { Suspense, useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import type { Question, TrainingRecord } from "@/types/dataset";
import { addTrainingRecord, updateQuestionProgress } from "@/lib/storage";
import { shuffleArray } from "@/lib/text";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { getTypeColor, getDifficultyColor } from "@/lib/text";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react";

type Step = "select" | "type" | "keyword" | "outline" | "template" | "result";

function ReactionTrainingContent() {
  const searchParams = useSearchParams();
  const questions = cet6WritingDataset.questions;
  const metadata = cet6WritingDataset.metadata;

  const [question, setQuestion] = useState<Question | null>(null);
  const [step, setStep] = useState<Step>("select");
  const [typeAnswer, setTypeAnswer] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordResult, setKeywordResult] = useState<{ correct: boolean; answer: string } | null>(null);
  const [outlineInputs, setOutlineInputs] = useState({ P1: "", P2: "", P3: "" });
  const [templateSelections, setTemplateSelections] = useState<Set<number>>(new Set());
  const [started, setStarted] = useState(false);

  // Select or load question
  useEffect(() => {
    const qId = searchParams.get("q");
    if (qId) {
      const q = questions.find((q) => q.id === qId);
      if (q) {
        setQuestion(q);
        setStep("type");
        setStarted(true);
      }
    }
  }, [searchParams, questions]);

  const pickRandom = () => {
    // Prefer questions with mistakes, then random
    const shuffled = shuffleArray(questions);
    setQuestion(shuffled[0]);
    setStep("type");
    setStarted(true);
    // Reset
    setTypeAnswer(null);
    setKeywordInput("");
    setKeywordResult(null);
    setOutlineInputs({ P1: "", P2: "", P3: "" });
    setTemplateSelections(new Set());
  };

  const typeOptions = useMemo(() => {
    if (!question) return [];
    const types = Object.keys(metadata.typeDefinitions);
    return shuffleArray(types);
  }, [question, metadata]);

  // Template options: correct ones + distractors from other questions
  const templateOptions = useMemo(() => {
    if (!question) return [];
    const correct = question.templateMapping.map((t) => ({
      sentence: t.sentence,
      isCorrect: true,
    }));
    const otherQuestion = questions.find((q) => q.id !== question.id);
    const distractors = otherQuestion
      ? otherQuestion.templateMapping.slice(0, 2).map((t) => ({
          sentence: t.sentence,
          isCorrect: false,
        }))
      : [];
    return shuffleArray([...correct, ...distractors]);
  }, [question, questions]);

  const handleTypeSubmit = (type: string) => {
    setTypeAnswer(type);
    const correct = type === question!.type;
    addTrainingRecord({
      id: `tr_${Date.now()}`,
      questionId: question!.id,
      type: "type_recognition",
      selectedType: type,
      typeCorrect: correct,
      completedAt: new Date().toISOString(),
    });
  };

  const handleKeywordSubmit = () => {
    const coreKw = question!.coreKeywords[0].toLowerCase();
    const input = keywordInput.toLowerCase();
    const correct = input.includes(coreKw) || coreKw.includes(input);
    setKeywordResult({ correct, answer: question!.coreKeywords[0] });
    addTrainingRecord({
      id: `kw_${Date.now()}`,
      questionId: question!.id,
      type: "keyword_extraction",
      keywordInput,
      keywordCorrect: correct,
      completedAt: new Date().toISOString(),
    });
  };

  const handleOutlineSubmit = () => {
    addTrainingRecord({
      id: `out_${Date.now()}`,
      questionId: question!.id,
      type: "outline",
      outlineSubmitted: outlineInputs,
      completedAt: new Date().toISOString(),
    });
    setStep("template");
  };

  const handleTemplateSubmit = () => {
    updateQuestionProgress(question!.id, { status: "analyzed" });
    setStep("result");
  };

  const stepLabels: Record<Step, string> = {
    select: "选择题目",
    type: "第一步：判断题型",
    keyword: "第二步：提取关键词",
    outline: "第三步：写三段提纲",
    template: "第四步：选择模板",
    result: "训练完成",
  };

  const stepOrder: Step[] = ["select", "type", "keyword", "outline", "template", "result"];
  const currentStepIdx = stepOrder.indexOf(step);

  if (!started || step === "select") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">题目反应训练</h1>
          <p className="text-sm text-gray-500 mt-1">
            训练你看到题目后的快速反应能力：题型→关键词→提纲→模板
          </p>
        </div>
        <Card className="border-dashed border-2 border-indigo-300">
          <CardContent className="p-8 text-center">
            <Zap size={48} className="mx-auto text-indigo-400 mb-4" />
            <p className="text-gray-700 font-medium text-lg mb-2">开始一次完整的反应训练</p>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              系统会随机抽取一道真题，引导你逐步完成：题型判断 → 关键词提取 → 三段提纲 → 模板匹配
            </p>
            <Button size="lg" onClick={pickRandom} className="bg-indigo-600 hover:bg-indigo-700">
              <Zap size={18} className="mr-2" />
              随机抽题开始训练
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">题目反应训练</h1>
        <p className="text-sm text-gray-500 mt-1">{stepLabels[step]}</p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {stepOrder.slice(1).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i + 1 <= currentStepIdx ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs ${i + 1 <= currentStepIdx ? "text-indigo-600 font-medium" : "text-gray-400"}`}>
              {s === "type" ? "题型" : s === "keyword" ? "关键词" : s === "outline" ? "提纲" : s === "template" ? "模板" : "结果"}
            </span>
            {i < 4 && <div className="w-8 h-0.5 bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Question prompt always visible */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-1">题目</p>
          <p className="text-lg font-medium text-gray-900">{question.prompt}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{question.sourceYear}年{question.month}月</Badge>
            <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Type Recognition */}
      <Card className={step === "type" ? "ring-2 ring-indigo-300" : ""}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
              判断题型
            </CardTitle>
            <CardDescription>这道题属于哪一类？</CardDescription>
          </CardHeader>
          <CardContent>
            {!typeAnswer ? (
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((opt) => (
                  <Button key={opt} variant="outline" onClick={() => handleTypeSubmit(opt)}>
                    {opt}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {typeAnswer === question.type ? (
                  <Alert>
                    <CheckCircle2 size={16} className="text-green-600" />
                    <AlertTitle className="text-green-700">正确！题型：{question.type}</AlertTitle>
                    <AlertDescription>
                      信号词：{question.typeSignals.slice(0, 4).join("、")}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertTriangle size={16} />
                    <AlertTitle>不正确</AlertTitle>
                    <AlertDescription>
                      正确答案：{question.type}。{question.trainingTasks.typeRecognition.explanation}
                    </AlertDescription>
                  </Alert>
                )}
                <Button size="sm" onClick={() => setStep("keyword")} className="mt-2">
                  继续 <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

      {/* Step 2: Keyword Extraction */}
      {currentStepIdx >= 2 && (
        <Card className={step === "keyword" ? "ring-2 ring-indigo-300" : ""}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">2</span>
              提取核心关键词
            </CardTitle>
            <CardDescription>圈出题目中最不能丢的核心词</CardDescription>
          </CardHeader>
          <CardContent>
            {keywordResult === null ? (
              <div className="space-y-3">
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 text-sm w-full"
                  placeholder="输入核心关键词..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                />
                <Button onClick={handleKeywordSubmit}>提交</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {keywordResult.correct ? (
                  <Alert>
                    <CheckCircle2 size={16} className="text-green-600" />
                    <AlertTitle className="text-green-700">很好！关键词抓对了</AlertTitle>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertTriangle size={16} />
                    <AlertTitle>核心词是：{keywordResult.answer}</AlertTitle>
                    <AlertDescription>
                      {question.trainingTasks.keywordExtraction.explanation}
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {question.coreKeywords.map((kw) => (
                    <Badge key={kw} className="bg-indigo-50 text-indigo-700">{kw}</Badge>
                  ))}
                </div>
                <Button size="sm" onClick={() => setStep("outline")}>
                  继续 <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Outline */}
      {currentStepIdx >= 3 && (
        <Card className={step === "outline" ? "ring-2 ring-indigo-300" : ""}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">3</span>
              写三段中文提纲
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "outline" ? (
              <div className="space-y-3">
                {(["P1", "P2", "P3"] as const).map((p) => (
                  <div key={p}>
                    <label className="text-sm font-medium text-gray-700">
                      {p === "P1" ? "第一段：引出主题" : p === "P2" ? "第二段：分析原因" : "第三段：总结建议"}
                    </label>
                    <textarea
                      className="border rounded-md px-3 py-2 text-sm w-full mt-1 h-20 resize-none"
                      placeholder={`写${p === "P1" ? "第一段" : p === "P2" ? "第二段" : "第三段"}中文提纲...`}
                      value={outlineInputs[p]}
                      onChange={(e) => setOutlineInputs({ ...outlineInputs, [p]: e.target.value })}
                    />
                  </div>
                ))}
                <Button onClick={handleOutlineSubmit}>提交提纲</Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-green-700 font-medium">标准提纲参考：</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">P1:</span> {question.immediateReactionTraining.sixtySecondOutline.P1}</p>
                  <p><span className="font-medium">P2:</span> {question.immediateReactionTraining.sixtySecondOutline.P2}</p>
                  <p><span className="font-medium">P3:</span> {question.immediateReactionTraining.sixtySecondOutline.P3}</p>
                </div>
                <Button size="sm" onClick={() => setStep("template")}>
                  继续 <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Template Selection */}
      {currentStepIdx >= 4 && (
        <Card className={step === "template" ? "ring-2 ring-indigo-300" : ""}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">4</span>
              选择可用的模板句
            </CardTitle>
            <CardDescription>从模板库中选择适合这道题的模板句（可多选）</CardDescription>
          </CardHeader>
          <CardContent>
            {step === "template" ? (
              <div className="space-y-3">
                {templateOptions.map((opt, i) => (
                  <div
                    key={i}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      templateSelections.has(i)
                        ? "border-indigo-400 bg-indigo-50"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => {
                      const next = new Set(templateSelections);
                      if (next.has(i)) next.delete(i);
                      else next.add(i);
                      setTemplateSelections(next);
                    }}
                  >
                    <p className="text-sm">{opt.sentence}</p>
                  </div>
                ))}
                <Button onClick={handleTemplateSubmit}>查看完整解析</Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-green-700 font-medium">正确的模板句：</p>
                {question.templateMapping.map((tm, i) => (
                  <div key={i} className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm">{tm.sentence}</p>
                    <p className="text-xs text-gray-500 mt-1">{tm.whyUse}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 5: Complete Analysis */}
      {step === "result" && (
        <Card className="bg-gradient-to-b from-green-50 to-white border-green-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <CheckCircle2 size={48} className="mx-auto text-green-500 mb-2" />
              <h2 className="text-xl font-bold text-green-700">训练完成！</h2>
              <p className="text-sm text-gray-600">
                很好，你已经完成了一次题目反应训练。这道题的核心是&ldquo;{question.coreKeywords[0]}&rdquo;。
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card className="border-l-4 border-l-orange-400">
                  <CardContent className="p-3">
                    <p className="text-xs text-orange-600 font-medium">10秒反应</p>
                    <p className="text-xs text-gray-700">{question.immediateReactionTraining.tenSecondReaction}</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-400">
                  <CardContent className="p-3">
                    <p className="text-xs text-blue-600 font-medium">30秒反应</p>
                    <p className="text-xs text-gray-700">{question.immediateReactionTraining.thirtySecondReaction}</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-400">
                  <CardContent className="p-3">
                    <p className="text-xs text-green-600 font-medium">60秒提纲</p>
                    <div className="text-xs text-gray-700">
                      <p>P1: {question.immediateReactionTraining.sixtySecondOutline.P1.slice(0, 50)}...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">常见错误提醒</h3>
                {question.commonMistakes.slice(0, 2).map((cm, i) => (
                  <Alert key={i} variant="destructive" className="mb-2">
                    <AlertTriangle size={14} />
                    <AlertDescription className="text-xs">{cm.mistake}</AlertDescription>
                  </Alert>
                ))}
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">推荐句式</h3>
                <div className="flex flex-wrap gap-1">
                  {question.sentenceBank.slice(0, 4).map((s) => (
                    <Badge key={s.id} variant="outline" className="text-xs">{s.sentence.slice(0, 40)}...</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-sm">下一步推荐</h3>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={pickRandom} className="bg-indigo-600 hover:bg-indigo-700">
                    换一道题继续练
                  </Button>
                  <Link href={`/questions/${question.id}`}>
                    <Button variant="outline">查看完整解析</Button>
                  </Link>
                  <Link href={`/writing?q=${question.id}`}>
                    <Button variant="outline">开始限时写作</Button>
                  </Link>
                  <Link href="/cards">
                    <Button variant="outline">背诵句式卡片</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ReactionTrainingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">加载中...</div>}>
      <ReactionTrainingContent />
    </Suspense>
  );
}
