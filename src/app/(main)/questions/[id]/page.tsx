"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import type { Question, SentenceBankItem, TemplateMapping } from "@/types/dataset";
import {
  getQuestionProgress,
  updateQuestionProgress,
  updateCardProgress,
} from "@/lib/storage";
import { getDifficultyColor, getTypeColor, getLevelColor, getStatusColor, getStatusLabel } from "@/lib/text";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  ChevronLeft,
  Zap,
  Brain,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BookMarked,
  Clock,
  Target,
  Eye,
  EyeOff,
  ThumbsUp,
} from "lucide-react";

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const questions = cet6WritingDataset.questions;
  const question = questions.find((q) => q.id === id);

  if (!question) {
    return (
      <div className="space-y-6">
        <Link href="/questions" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
          <ChevronLeft size={16} /> 返回真题库
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-gray-500">题目未找到</CardContent>
        </Card>
      </div>
    );
  }

  const progress = getQuestionProgress();
  const status = progress[id]?.status || "not_started";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link href="/questions" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
          <ChevronLeft size={16} /> 返回真题库
        </Link>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
          <Button size="sm" variant="outline" onClick={() => updateQuestionProgress(id, { status: "analyzed" })}>
            标记为已分析
          </Button>
        </div>
      </div>

      {/* Header */}
      <QuestionHeader question={question} />

      {/* Grouped Tabs Layout */}
      <TabGroupSection question={question} />
    </div>
  );
}

// =========== Grouped Tab Section ===========

const TAB_GROUPS = {
  core: {
    title: "必看核心",
    subtitle: "先看这里：掌握这道题的考场写作路径。",
    defaultTab: "reaction",
    tabs: [
      { value: "reaction", label: "考场反应" },
      { value: "analysis", label: "审题分析" },
      { value: "blueprint", label: "三段蓝图" },
      { value: "essay", label: "范文训练" },
    ],
  },
  improve: {
    title: "提分训练",
    subtitle: "想提高表达质量，再练这些模块。",
    defaultTab: "template",
    tabs: [
      { value: "template", label: "模板映射" },
      { value: "sentences", label: "句式库" },
      { value: "upgrade", label: "表达升级" },
      { value: "training", label: "训练任务" },
    ],
  },
  review: {
    title: "复习拓展",
    subtitle: "用于复习、迁移和考前检查。",
    defaultTab: "cards",
    tabs: [
      { value: "cards", label: "背诵卡片" },
      { value: "transfer", label: "迁移训练" },
      { value: "mistakes", label: "常见错误" },
      { value: "checklist", label: "评分清单" },
    ],
  },
} as const;

function TabGroupSection({ question }: { question: Question }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    core: true,
    improve: false,
    review: false,
  });

  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({
    core: "reaction",
    improve: "template",
    review: "cards",
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setActiveTab = (sectionKey: string, tabValue: string) => {
    setActiveTabs((prev) => ({ ...prev, [sectionKey]: tabValue }));
  };

  const renderTabContent = (sectionKey: string, tabValue: string) => {
    switch (tabValue) {
      case "reaction": return <ReactionPanel question={question} />;
      case "analysis": return <TaskAnalysisPanel question={question} />;
      case "blueprint": return <ParagraphBlueprintPanel question={question} />;
      case "template": return <TemplateMappingPanel question={question} />;
      case "sentences": return <SentenceBankPanel question={question} />;
      case "upgrade": return <LowMidHighUpgradePanel question={question} />;
      case "essay": return <ModelEssayPanel question={question} />;
      case "training": return <TrainingTasksPanel question={question} />;
      case "cards": return <MemorizationCardsPanel question={question} />;
      case "transfer": return <TransferPanel question={question} />;
      case "mistakes": return <CommonMistakesPanel question={question} />;
      case "checklist": return <ScoringChecklistPanel question={question} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(TAB_GROUPS).map(([key, group]) => (
        <Card key={key} className={key === "core" ? "border-indigo-200" : ""}>
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
            onClick={() => toggleSection(key)}
          >
            <div>
              <h3 className={`font-semibold ${key === "core" ? "text-indigo-700" : "text-gray-700"}`}>
                {group.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{group.subtitle}</p>
            </div>
            <span className={`text-gray-400 transition-transform ${openSections[key] ? "rotate-180" : ""}`}>
              <ChevronLeft size={16} className="rotate-[-90deg]" />
            </span>
          </button>
          {openSections[key] && (
            <div className="px-4 pb-4">
              <Tabs value={activeTabs[key]} onValueChange={(v) => setActiveTab(key, v)}>
                <TabsList className="flex flex-wrap gap-1 h-auto mb-3">
                  {group.tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {group.tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    {renderTabContent(key, tab.value)}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

// =========== Sub-Components ===========

function QuestionHeader({ question }: { question: Question }) {
  return (
    <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-white">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline">{question.sourceYear}年{question.month}月 第{question.set}套</Badge>
          <Badge className={getTypeColor(question.type)}>{question.type}</Badge>
          <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
          <Badge variant="secondary">{question.themeGroup}</Badge>
          <Badge variant="outline">{question.wordLimit}</Badge>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">{question.prompt}</h1>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <span>{question.chineseTitle}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {question.coreKeywords.map((kw) => (
            <Badge key={kw} variant="outline" className="text-xs border-indigo-300 text-indigo-600 bg-indigo-50">
              {kw}
            </Badge>
          ))}
          {question.typeSignals.slice(0, 4).map((s) => (
            <Badge key={s} variant="outline" className="text-xs text-yellow-700 bg-yellow-50 border-yellow-300">
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ReactionPanel({ question }: { question: Question }) {
  const reaction = question.immediateReactionTraining;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-orange-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-orange-500" />
              <h3 className="text-sm font-bold text-orange-700">10秒反应</h3>
            </div>
            <p className="text-sm text-gray-700">{reaction.tenSecondReaction}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={16} className="text-blue-500" />
              <h3 className="text-sm font-bold text-blue-700">30秒反应</h3>
            </div>
            <p className="text-sm text-gray-700">{reaction.thirtySecondReaction}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-400">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-green-500" />
              <h3 className="text-sm font-bold text-green-700">60秒提纲</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <p><span className="font-medium text-green-700">P1:</span> {reaction.sixtySecondOutline.P1}</p>
              <p><span className="font-medium text-green-700">P2:</span> {reaction.sixtySecondOutline.P2}</p>
              <p><span className="font-medium text-green-700">P3:</span> {reaction.sixtySecondOutline.P3}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TaskAnalysisPanel({ question }: { question: Question }) {
  const analysis = question.taskAnalysis;
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">核心任务</CardTitle>
          <CardDescription>{analysis.mainTask}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-green-700 text-sm mb-1">必须提到</h4>
            <div className="flex flex-wrap gap-1.5">
              {analysis.mustMention.map((m) => (
                <Badge key={m} className="bg-green-50 text-green-700 border-green-200">{m}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-red-600 text-sm mb-1 flex items-center gap-1">
              <AlertTriangle size={14} /> 不要写成
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
              {analysis.notTask.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-600 text-sm mb-1">危险区</h4>
            {analysis.dangerZone.map((d, i) => (
              <Alert key={i} variant="destructive" className="mb-2">
                <AlertTriangle size={14} />
                <AlertDescription className="text-xs">{d}</AlertDescription>
              </Alert>
            ))}
          </div>
          <div>
            <h4 className="font-medium text-blue-700 text-sm mb-1">审题步骤</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-0.5">
              {analysis.thinkingSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 text-sm mb-1">评分重点</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
              {analysis.scoringFocus.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ParagraphBlueprintPanel({ question }: { question: Question }) {
  const bp = question.paragraphBlueprint;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(["P1", "P2", "P3"] as const).map((p) => {
        const section = bp[p];
        const colors = { P1: "blue", P2: "purple", P3: "green" };
        return (
          <Card key={p} className={`border-l-4 border-l-${colors[p]}-400`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className={`bg-${colors[p]}-100 text-${colors[p]}-700`}>{p}</Badge>
                {section.goal}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {section.chinesePlan && (
                <p className="text-gray-600">{section.chinesePlan}</p>
              )}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">English Skeleton</p>
                <p className="text-sm text-gray-800">{section.englishSkeleton}</p>
              </div>
              {p === "P2" && (
                <div className="space-y-1">
                  {section.reason1 && (
                    <Badge variant="outline" className="text-xs">理由1: {section.reason1}</Badge>
                  )}
                  {section.reason2 && (
                    <Badge variant="outline" className="text-xs">理由2: {section.reason2}</Badge>
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {section.requiredMove.map((m) => (
                  <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function TemplateMappingPanel({ question }: { question: Question }) {
  return (
    <div className="space-y-3">
      {question.templateMapping.map((tm, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-yellow-100 text-yellow-700">{tm.formulaStep}</Badge>
              <Badge variant="secondary">{tm.function}</Badge>
            </div>
            <p className="text-base font-medium mb-2 bg-yellow-50 p-2 rounded">
              {tm.sentence}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tm.replaceableSlots.map((slot, j) => (
                <Badge key={j} className="bg-gray-100 text-gray-600 text-xs" variant="outline">
                  {slot === "______" ? "可替换位置" : slot}
                </Badge>
              ))}
              {tm.applyTo.map((at, j) => (
                <Badge key={j} className="bg-blue-50 text-blue-600 text-xs">
                  {at}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500">{tm.whyUse}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SentenceBankPanel({ question }: { question: Question }) {
  const [filter, setFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const paragraphs = ["all", "P1", "P2", "P3"];
  const levels = ["all", "稳分版", "提分版", "高分版"];

  const filtered = question.sentenceBank.filter((s) => {
    if (filter !== "all" && s.paragraph !== filter) return false;
    if (levelFilter !== "all" && s.level !== levelFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {paragraphs.map((p) => (
          <Badge
            key={p}
            className={`cursor-pointer ${filter === p ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setFilter(p)}
          >
            {p === "all" ? "全部段落" : p}
          </Badge>
        ))}
        <Separator orientation="vertical" className="h-6" />
        {levels.map((l) => (
          <Badge
            key={l}
            className={`cursor-pointer ${levelFilter === l ? "bg-indigo-600 text-white" : getLevelColor(l)}`}
            onClick={() => setLevelFilter(l)}
          >
            {l === "all" ? "全部等级" : l}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((s) => (
          <SentenceCard key={s.id} sentence={s} />
        ))}
      </div>
    </div>
  );
}

function SentenceCard({ sentence }: { sentence: SentenceBankItem }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="outline">{sentence.paragraph}</Badge>
          <Badge className={getLevelColor(sentence.level)}>{sentence.level}</Badge>
          <Badge variant="secondary">{sentence.function}</Badge>
        </div>
        <p className="text-sm font-medium text-gray-900 mb-1">{sentence.sentence}</p>
        <p className="text-xs text-gray-500 mb-2">{sentence.cn}</p>
        <div className="flex flex-wrap gap-1">
          {sentence.replaceableSlots.map((s, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-500">{s}</Badge>
          ))}
          {sentence.transferableTo.slice(0, 3).map((t, i) => (
            <Badge key={i} className="text-xs bg-purple-50 text-purple-600">{t}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LowMidHighUpgradePanel({ question }: { question: Question }) {
  return (
    <div className="space-y-4">
      {question.lowMidHighUpgrade.map((u, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{u.function}</CardTitle>
            <CardDescription>{u.usage}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-green-50 rounded-lg p-3">
                <Badge className="bg-green-100 text-green-700 mb-2">稳分版</Badge>
                <p className="text-sm text-gray-800">{u.basic}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <Badge className="bg-blue-100 text-blue-700 mb-2">提分版</Badge>
                <p className="text-sm text-gray-800">{u.mid}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <Badge className="bg-purple-100 text-purple-700 mb-2">高分版</Badge>
                <p className="text-sm text-gray-800">{u.high}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ModelEssayPanel({ question }: { question: Question }) {
  const [revealed, setRevealed] = useState(false);
  const essay = question.modelEssayForTraining;

  return (
    <div className="space-y-4">
      {!revealed ? (
        <Card className="border-dashed border-2 border-indigo-300 bg-indigo-50">
          <CardContent className="p-8 text-center">
            <EyeOff size={40} className="mx-auto text-indigo-400 mb-4" />
            <p className="text-gray-700 font-medium mb-2">范文已隐藏</p>
            <p className="text-sm text-gray-500 mb-4">
              考场上没有范文可以参考。建议你已完成提纲再查看。
            </p>
            <Button onClick={() => setRevealed(true)} className="bg-indigo-600 hover:bg-indigo-700">
              <Eye size={16} className="mr-2" />
              我已完成提纲，查看参考范文
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-100 text-indigo-700">{essay.version}</Badge>
            <Badge variant="outline">约 {essay.wordCountApprox} 词</Badge>
          </div>

          {/* Essay paragraphs with analysis */}
          <Card>
            <CardContent className="p-6">
              <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                {essay.essay}
              </div>
            </CardContent>
          </Card>

          {/* Paragraph analysis */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">段落分析</h3>
            {essay.paragraphAnalysis.map((pa, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{pa.paragraph}</Badge>
                    <span className="text-sm font-medium text-gray-700">{pa.role}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">使用公式：</span>{pa.formulaUsed}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Color legend */}
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 mb-2">标注说明</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700">蓝色：主题句</Badge>
                <Badge className="bg-yellow-100 text-yellow-700">黄色：模板句</Badge>
                <Badge className="bg-green-100 text-green-700">绿色：连接词</Badge>
                <Badge className="bg-purple-100 text-purple-700">紫色：高级表达</Badge>
                <Badge className="bg-red-100 text-red-700">红色：易错点</Badge>
                <Badge className="bg-gray-200 text-gray-600">灰色：可替换部分</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function TrainingTasksPanel({ question }: { question: Question }) {
  const tasks = question.trainingTasks;
  const [typeAnswer, setTypeAnswer] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordResult, setKeywordResult] = useState<boolean | null>(null);
  const [outlineInputs, setOutlineInputs] = useState({ P1: "", P2: "", P3: "" });
  const [outlineSubmitted, setOutlineSubmitted] = useState(false);

  const checkKeyword = () => {
    const answer = tasks.keywordExtraction.answer.toLowerCase();
    const input = keywordInput.toLowerCase();
    setKeywordResult(
      input.includes(answer) || answer.includes(input) || input.length > 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Type Recognition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">题型识别</CardTitle>
          <CardDescription>{tasks.typeRecognition.question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!typeAnswer ? (
            <div className="flex flex-wrap gap-2">
              {[...tasks.typeRecognition.distractors, tasks.typeRecognition.answer].sort().map((opt) => (
                <Button key={opt} variant="outline" size="sm" onClick={() => setTypeAnswer(opt)}>
                  {opt}
                </Button>
              ))}
            </div>
          ) : (
            <div>
              {typeAnswer === tasks.typeRecognition.answer ? (
                <Alert>
                  <CheckCircle2 size={16} className="text-green-600" />
                  <AlertTitle className="text-green-700">正确！</AlertTitle>
                  <AlertDescription>{tasks.typeRecognition.explanation}</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertTriangle size={16} />
                  <AlertTitle>不正确</AlertTitle>
                  <AlertDescription>
                    正确答案：{tasks.typeRecognition.answer}。{tasks.typeRecognition.explanation}
                  </AlertDescription>
                </Alert>
              )}
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setTypeAnswer(null)}>
                重新选择
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Keyword Extraction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">关键词提取</CardTitle>
          <CardDescription>{tasks.keywordExtraction.question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              className="border rounded-md px-3 py-1.5 text-sm flex-1"
              placeholder="输入核心关键词..."
              value={keywordInput}
              onChange={(e) => {
                setKeywordInput(e.target.value);
                setKeywordResult(null);
              }}
            />
            <Button size="sm" onClick={checkKeyword}>提交</Button>
          </div>
          {keywordResult !== null && (
            <Alert variant={keywordResult ? "default" : "destructive"}>
              {keywordResult ? (
                <>
                  <CheckCircle2 size={16} className="text-green-600" />
                  <AlertDescription className="text-green-700">
                    很好！核心词就是 &ldquo;{tasks.keywordExtraction.answer}&rdquo;
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertTriangle size={16} />
                  <AlertDescription>
                    核心关键词：{tasks.keywordExtraction.answer}。{tasks.keywordExtraction.explanation}
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Outline Cloze */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">三段提纲填空</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {(["P1", "P2", "P3"] as const).map((p) => (
              <div key={p}>
                <label className="text-sm font-medium text-gray-700">
                  {tasks.outlineCloze[p]}
                </label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-1.5 text-sm w-full mt-1"
                  placeholder={`填写${p}...`}
                  value={outlineInputs[p]}
                  onChange={(e) => setOutlineInputs({ ...outlineInputs, [p]: e.target.value })}
                />
              </div>
            ))}
            <Button size="sm" onClick={() => setOutlineSubmitted(true)}>提交提纲</Button>
          </div>
          {outlineSubmitted && (
            <Alert>
              <CheckCircle2 size={16} className="text-green-600" />
              <AlertTitle>参考答案</AlertTitle>
              <AlertDescription>
                {tasks.outlineCloze.answers.map((a, i) => (
                  <p key={i} className="text-sm">{i === 0 ? "P1: " : i === 1 ? "P2理由1: " : i === 2 ? "P2理由2: " : "P3: "}{a}</p>
                ))}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Transfer Challenge */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">迁移挑战</CardTitle>
          <CardDescription>{tasks.transferChallenge.instruction}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {tasks.transferChallenge.topics.map((t, i) => (
              <Badge key={i} className="text-sm">{t}</Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500">{tasks.transferChallenge.sharedLogic}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function MemorizationCardsPanel({ question }: { question: Question }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        共 {question.memorizationCards.length} 张背诵卡片。点击展开可查看答案。
      </p>
      <div className="grid grid-cols-1 gap-3">
        {question.memorizationCards.map((card, i) => (
          <Accordion key={i}>
            <AccordionItem value={i}>
              <AccordionTrigger className="text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{card.type}</Badge>
                  <span>{card.front}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-gray-500">提示：{card.hint}</p>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900">{card.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {card.tags.map((t, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => updateCardProgress(`card-${question.id}-${i}`, "again")}>不会</Button>
                    <Button variant="outline" size="sm" className="text-orange-600" onClick={() => updateCardProgress(`card-${question.id}-${i}`, "hard")}>模糊</Button>
                    <Button variant="outline" size="sm" className="text-blue-600" onClick={() => updateCardProgress(`card-${question.id}-${i}`, "good")}>基本会</Button>
                    <Button variant="outline" size="sm" className="text-green-600" onClick={() => updateCardProgress(`card-${question.id}-${i}`, "easy")}>熟练</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

function TransferPanel({ question }: { question: Question }) {
  const transfer = question.transfer;
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">这道题不是孤立的</CardTitle>
          <CardDescription>掌握核心结构后可以迁移到以下题目</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-sm mb-2">相近题目</h4>
            <div className="flex flex-wrap gap-2">
              {transfer.nearTopics.map((t, i) => (
                <Badge key={i} className="text-sm bg-blue-50 text-blue-700">{t}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">共享理由</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {transfer.sharedReasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">迁移规则</h4>
            <ul className="list-decimal list-inside text-sm text-gray-600 space-y-0.5">
              {transfer.adaptRules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CommonMistakesPanel({ question }: { question: Question }) {
  return (
    <div className="space-y-3">
      {question.commonMistakes.map((cm, i) => (
        <Alert key={i} variant="destructive">
          <AlertTriangle size={16} />
          <AlertTitle className="text-sm font-medium">{cm.mistake}</AlertTitle>
          <AlertDescription className="text-xs mt-1">
            <p className="text-red-700 mb-1">为什么错：{cm.whyWrong}</p>
            <p className="text-green-700">怎么改：{cm.fix}</p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

function ScoringChecklistPanel({ question }: { question: Question }) {
  const [checks, setChecks] = useState<Record<number, boolean>>({});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-600" />
          评分自查清单
        </CardTitle>
        <CardDescription>写完作文后逐项检查</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.scoringChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Checkbox
                id={`check-${i}`}
                checked={checks[i] || false}
                onCheckedChange={(v) => setChecks({ ...checks, [i]: !!v })}
              />
              <label htmlFor={`check-${i}`} className="text-sm text-gray-700 cursor-pointer">
                {item}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          已完成 {Object.values(checks).filter(Boolean).length} / {question.scoringChecklist.length} 项
        </div>
      </CardContent>
    </Card>
  );
}
