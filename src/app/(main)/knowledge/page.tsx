"use client";

import { useState, useMemo } from "react";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import type { SentenceBankItem, TemplateMapping } from "@/types/dataset";
import { toggleFavoriteSentence, isSentenceFavorited } from "@/lib/storage";
import { getLevelColor, getTypeColor } from "@/lib/text";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Heart, Search, BookOpen, Layers } from "lucide-react";

export default function KnowledgePage() {
  const questions = cet6WritingDataset.questions;
  const metadata = cet6WritingDataset.metadata;

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Aggregate all sentences
  const allSentences = useMemo(() => {
    const seen = new Set<string>();
    const result: SentenceBankItem[] = [];
    for (const q of questions) {
      for (const s of q.sentenceBank) {
        if (!seen.has(s.id)) {
          seen.add(s.id);
          result.push(s);
        }
      }
    }
    return result;
  }, [questions]);

  // Aggregate all template sentences
  const allTemplates = useMemo(() => {
    const seen = new Set<string>();
    const result: (TemplateMapping & { questionId: string; questionTitle: string })[] = [];
    for (const q of questions) {
      for (const t of q.templateMapping) {
        const key = t.sentence;
        if (!seen.has(key)) {
          seen.add(key);
          result.push({ ...t, questionId: q.id, questionTitle: q.chineseTitle });
        }
      }
    }
    return result;
  }, [questions]);

  const filteredSentences = useMemo(() => {
    if (!search) return allSentences;
    const s = search.toLowerCase();
    return allSentences.filter(
      (sen) =>
        sen.sentence.toLowerCase().includes(s) ||
        sen.cn.toLowerCase().includes(s) ||
        sen.function.includes(search) ||
        sen.level.includes(search) ||
        sen.paragraph.includes(search)
    );
  }, [allSentences, search]);

  const toggleFav = (sentenceId: string) => {
    const isFav = toggleFavoriteSentence(sentenceId);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (isFav) next.add(sentenceId);
      else next.delete(sentenceId);
      return next;
    });
  };

  // Group sentences by function
  const sentencesByFunction = useMemo(() => {
    const groups: Record<string, SentenceBankItem[]> = {};
    for (const s of allSentences) {
      if (!groups[s.function]) groups[s.function] = [];
      groups[s.function].push(s);
    }
    return groups;
  }, [allSentences]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">模板句式知识库</h1>
        <p className="text-sm text-gray-500 mt-1">
          汇总所有真题的模板句式和主题句式，支持搜索、筛选和收藏
        </p>
      </div>

      <Tabs defaultValue="formulas">
        <TabsList>
          <TabsTrigger value="formulas" className="text-xs">题型公式</TabsTrigger>
          <TabsTrigger value="templates" className="text-xs">通用模板</TabsTrigger>
          <TabsTrigger value="sentences" className="text-xs">主题句式</TabsTrigger>
          <TabsTrigger value="all" className="text-xs">全部句子</TabsTrigger>
        </TabsList>

        {/* Type Formulas */}
        <TabsContent value="formulas" className="space-y-4 mt-4">
          {Object.entries(metadata.typeDefinitions).map(([type, def]) => (
            <Card key={type}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge className={getTypeColor(type)}>{type}</Badge>
                  <span className="text-sm text-gray-600">{def.formula}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700">{def.core_logic}</p>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">信号词：</p>
                  <div className="flex flex-wrap gap-1">
                    {def.signals.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-base">万能公式</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-indigo-700">{metadata.universalFormula.core}</p>
              <div className="mt-2 space-y-1">
                {metadata.universalFormula.examProcess.map((step, i) => (
                  <p key={i} className="text-xs text-gray-600">{step}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates by function */}
        <TabsContent value="templates" className="space-y-4 mt-4">
          {["第一段引题", "第二段总起", "第二段展开", "第三段收束"].map((category) => {
            const templates = allTemplates.filter((t) => t.formulaStep.includes(category) || t.formulaStep.includes(category.replace("展开", "")));
            if (templates.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="font-medium text-sm text-gray-700 mb-2">{category}</h3>
                <div className="space-y-2">
                  {templates.map((t, i) => (
                    <Card key={i}>
                      <CardContent className="p-3">
                        <p className="text-sm bg-yellow-50 p-2 rounded mb-2">{t.sentence}</p>
                        <div className="flex gap-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">{t.function}</Badge>
                          {t.applyTo.slice(0, 3).map((at, j) => (
                            <Badge key={j} className="text-xs bg-blue-50 text-blue-600">{at}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

        {/* Sentences by theme group */}
        <TabsContent value="sentences" className="space-y-4 mt-4">
          {Object.entries(metadata.themeGroups).map(([group, themes]) => {
            const groupSentences = allSentences.filter((s) =>
              s.transferableTo.some((t) => themes.includes(t)) || themes.some((th) => s.sentence.toLowerCase().includes(th.toLowerCase()))
            );
            if (groupSentences.length === 0) return null;
            return (
              <div key={group}>
                <h3 className="font-medium text-sm text-gray-700 mb-2">{group}</h3>
                <div className="space-y-2">
                  {groupSentences.slice(0, 6).map((s) => (
                    <SentenceCard key={s.id} sentence={s} onToggleFav={toggleFav} />
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

        {/* All sentences with search */}
        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="搜索英文、中文、主题、功能、等级..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filteredSentences.slice(0, 50).map((s) => (
              <SentenceCard key={s.id} sentence={s} onToggleFav={toggleFav} />
            ))}
            {filteredSentences.length === 0 && (
              <p className="text-center text-gray-400 py-8">无匹配结果</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SentenceCard({
  sentence,
  onToggleFav,
}: {
  sentence: SentenceBankItem;
  onToggleFav: (id: string) => void;
}) {
  const [fav, setFav] = useState(false);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant="outline" className="text-xs">{sentence.paragraph}</Badge>
              <Badge className={getLevelColor(sentence.level) + " text-xs"}>{sentence.level}</Badge>
              <Badge variant="secondary" className="text-xs">{sentence.function}</Badge>
            </div>
            <p className="text-sm font-medium text-gray-900">{sentence.sentence}</p>
            <p className="text-xs text-gray-500 mt-1">{sentence.cn}</p>
            <div className="flex gap-1 mt-1 flex-wrap">
              {sentence.replaceableSlots.map((s, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-500">{s}</Badge>
              ))}
              {sentence.transferableTo.slice(0, 3).map((t, i) => (
                <Badge key={i} className="text-xs bg-purple-50 text-purple-600">{t}</Badge>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => {
              setFav(!fav);
              onToggleFav(sentence.id);
            }}
          >
            <Heart size={14} className={fav ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
