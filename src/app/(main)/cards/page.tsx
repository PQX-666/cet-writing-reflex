"use client";

import { useState, useMemo } from "react";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import type { MemorizationCard as MemCard } from "@/types/dataset";
import { getCardProgress, updateCardProgress, getCardsDueForReview, getCardStats } from "@/lib/storage";
import { getCardTypeLabel } from "@/lib/text";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookMarked,
  Eye,
  EyeOff,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";

interface CardWithMeta {
  card: MemCard;
  questionId: string;
  questionTitle: string;
  themeGroup: string;
  cardIndex: number;
  globalId: string;
}

export default function CardsPage() {
  const questions = cet6WritingDataset.questions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [questionFilter, setQuestionFilter] = useState<string>("all");
  const [themeFilter, setThemeFilter] = useState<string>("all");

  // Build all cards
  const allCards: CardWithMeta[] = useMemo(() => {
    const cards: CardWithMeta[] = [];
    for (const q of questions) {
      q.memorizationCards.forEach((card, i) => {
        cards.push({
          card,
          questionId: q.id,
          questionTitle: q.chineseTitle,
          themeGroup: q.themeGroup,
          cardIndex: i,
          globalId: `card-${q.id}-${i}`,
        });
      });
    }
    return cards;
  }, [questions]);

  // Filter cards based on review status
  const filteredCards = useMemo(() => {
    let result = allCards;

    if (questionFilter !== "all") {
      result = result.filter((c) => c.questionId === questionFilter);
    }
    if (themeFilter !== "all") {
      result = result.filter((c) => c.themeGroup === themeFilter);
    }

    const progress = getCardProgress();
    const dueCards = getCardsDueForReview(allCards.map((c) => c.globalId));

    switch (filter) {
      case "due":
        result = result.filter((c) => dueCards.includes(c.globalId));
        break;
      case "unlearned":
        result = result.filter((c) => !progress[c.globalId]);
        break;
      case "weak":
        result = result.filter((c) => {
          const p = progress[c.globalId];
          return p && (p.rating === "again" || p.rating === "hard");
        });
        break;
      case "mastered":
        result = result.filter((c) => {
          const p = progress[c.globalId];
          return p && p.rating === "easy";
        });
        break;
    }

    return result;
  }, [allCards, filter, questionFilter, themeFilter]);

  const currentCard = filteredCards[currentIdx % Math.max(filteredCards.length, 1)];
  const cardProgress = getCardProgress();
  const currentProgress = currentCard ? cardProgress[currentCard.globalId] : null;

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    if (!currentCard) return;
    updateCardProgress(currentCard.globalId, rating);
    setRevealed(false);
    setCurrentIdx((prev) => (prev + 1) % Math.max(filteredCards.length, 1));
  };

  const totalCards = allCards.length;
  const reviewedCards = Object.keys(cardProgress).filter((k) => k.startsWith("card-")).length;

  const themeGroups = [...new Set(allCards.map((c) => c.themeGroup))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">背诵卡片</h1>
        <p className="text-sm text-gray-500 mt-1">
          主动回忆训练 · 共 {totalCards} 张卡片 · 已复习 {reviewedCards} 张
        </p>
        <Progress value={(reviewedCards / totalCards) * 100} className="mt-2" />
      </div>

      {/* Review Stats Panel */}
      <CardStatsPanel totalCards={totalCards} allCards={allCards} />

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Select value={filter} onValueChange={(v) => setFilter(v || "all")}>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部卡片</SelectItem>
            <SelectItem value="due">今日待复习</SelectItem>
            <SelectItem value="unlearned">未学习</SelectItem>
            <SelectItem value="weak">未掌握</SelectItem>
            <SelectItem value="mastered">已掌握</SelectItem>
          </SelectContent>
        </Select>
        <Select value={questionFilter} onValueChange={(v) => setQuestionFilter(v || "all")}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="按题目筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部题目</SelectItem>
            {questions.map((q) => (
              <SelectItem key={q.id} value={q.id}>{q.chineseTitle}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={themeFilter} onValueChange={(v) => setThemeFilter(v || "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="按主题群" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部主题</SelectItem>
            {themeGroups.map((tg) => (
              <SelectItem key={tg} value={tg}>{tg}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Flashcard */}
      {filteredCards.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            该筛选条件下没有卡片。恭喜，可能你已经掌握了全部内容！
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            卡片 {currentIdx + 1} / {filteredCards.length}
          </div>

          <Card className="min-h-[300px] flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{getCardTypeLabel(currentCard.card.type)}</Badge>
                <Badge variant="secondary">{currentCard.questionTitle}</Badge>
                <Badge className="text-xs">{currentCard.themeGroup}</Badge>
                {currentProgress && (
                  <Badge variant="secondary" className="text-xs">
                    复习 {currentProgress.reviewCount} 次
                  </Badge>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-lg font-medium text-gray-900 text-center mb-4">
                  {currentCard.card.front}
                </p>

                {!revealed ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-4">提示：{currentCard.card.hint}</p>
                    <Button onClick={() => setRevealed(true)} variant="outline">
                      <Eye size={16} className="mr-2" />
                      显示答案
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-base font-medium text-indigo-900">{currentCard.card.answer}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentCard.card.tags.map((t, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">掌握程度</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => handleRate("again")}>
                          <ThumbsDown size={14} className="mr-1" /> 不会
                        </Button>
                        <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50" onClick={() => handleRate("hard")}>
                          模糊
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50" onClick={() => handleRate("good")}>
                          <ThumbsUp size={14} className="mr-1" /> 基本会
                        </Button>
                        <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50" onClick={() => handleRate("easy")}>
                          <CheckCircle size={14} className="mr-1" /> 熟练
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
                setRevealed(false);
              }}
            >
              上一张
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentIdx((prev) => (prev + 1) % filteredCards.length);
                setRevealed(false);
              }}
            >
              下一张
            </Button>
          </div>

          <div className="text-xs text-gray-400 text-center space-y-1">
            <p>不会 → 5分钟后复习 | 模糊 → 1天后复习 | 基本会 → 3天后复习 | 熟练 → 7天后复习</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CardStatsPanel({
  totalCards,
  allCards,
}: {
  totalCards: number;
  allCards: { globalId: string }[];
}) {
  const stats = getCardStats();
  stats.total = totalCards;
  stats.unlearned = totalCards - stats.reviewed;
  stats.dueToday = getCardsDueForReview(allCards.map((c) => c.globalId)).length;

  // Future 7-day review forecast
  const cardProgress = getCardProgress();
  const today = new Date();
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    const count = Object.values(cardProgress).filter((c) => {
      const reviewDate = new Date(c.nextReviewAt).toISOString().slice(0, 10);
      return reviewDate === key;
    }).length;
    return {
      label: i === 0 ? "今天" : i === 1 ? "明天" : `${i}天后`,
      count,
    };
  });

  const maxForecast = Math.max(...next7Days.map((d) => d.count), 1);

  if (stats.reviewed === 0) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-6 text-center text-gray-500">
          <p className="text-sm">完成几张卡片后，这里会显示你的记忆曲线和未来复习压力。</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">复习统计</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
          <div className="bg-indigo-50 rounded-lg p-2">
            <p className="text-lg font-bold text-indigo-700">{stats.dueToday}</p>
            <p className="text-xs text-gray-500">今日待复习</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <p className="text-lg font-bold text-green-700">{stats.mastered}</p>
            <p className="text-xs text-gray-500">已掌握</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-2">
            <p className="text-lg font-bold text-orange-700">{stats.weak}</p>
            <p className="text-xs text-gray-500">模糊/不会</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-lg font-bold text-gray-700">{stats.unlearned}</p>
            <p className="text-xs text-gray-500">未学习</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-lg font-bold text-blue-700">{stats.totalReviews}</p>
            <p className="text-xs text-gray-500">总复习次数</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2">
            <p className="text-lg font-bold text-purple-700">{stats.streakDays}</p>
            <p className="text-xs text-gray-500">连续复习天数</p>
          </div>
        </div>

        {/* Future 7 day forecast */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">未来 7 天复习量预测</p>
          <div className="flex items-end gap-1 h-16">
            {next7Days.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-600">{d.count}</span>
                <div
                  className="w-full bg-indigo-400 rounded-t"
                  style={{ height: `${Math.max((d.count / maxForecast) * 40, 2)}px`, minHeight: "2px" }}
                />
                <span className="text-xs text-gray-400">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
