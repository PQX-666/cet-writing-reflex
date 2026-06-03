"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import {
  getQuestionProgress,
  getTrainingRecords,
  updateQuestionProgress,
} from "@/lib/storage";
import { filterQuestions, getAvailableYears, getAvailableTypes, getAvailableThemeGroups } from "@/lib/filters";
import type { FilterState, SortOption } from "@/lib/filters";
import {
  getStatusLabel,
  getStatusColor,
  getDifficultyColor,
  getTypeColor,
  truncate,
} from "@/lib/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  ArrowUpDown,
  BookOpen,
  GraduationCap,
  Clock,
  CalendarPlus,
  Filter,
  X,
} from "lucide-react";

export default function QuestionsPage() {
  const questions = cet6WritingDataset.questions;
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    year: null,
    type: null,
    themeGroup: null,
    difficulty: null,
    status: null,
    search: "",
    sort: "newest",
  });

  const years = useMemo(() => getAvailableYears(questions), [questions]);
  const types = useMemo(() => getAvailableTypes(questions), [questions]);
  const themeGroups = useMemo(() => getAvailableThemeGroups(questions), [questions]);

  const getStatus = (id: string) => {
    const p = getQuestionProgress();
    return p[id]?.status || "not_started";
  };

  const filtered = useMemo(
    () => filterQuestions(questions, filters, getStatus),
    [questions, filters]
  );

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "年份新→旧" },
    { value: "oldest", label: "年份旧→新" },
    { value: "hardest", label: "难度高→低" },
    { value: "easiest", label: "难度低→高" },
    { value: "unlearned", label: "未学习优先" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">真题库</h1>
        <p className="text-sm text-gray-500 mt-1">
          共 {questions.length} 道真题，覆盖 {types.length} 种题型、{themeGroups.length} 个主题群
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-3">
          {/* Mobile filter toggle */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="w-full justify-between">
              <span className="flex items-center gap-1"><Filter size={14} /> 筛选</span>
              {showFilters ? <X size={14} /> : <span className="text-xs text-gray-400">展开</span>}
            </Button>
          </div>
          <div className={showFilters ? "" : "hidden md:flex flex-wrap gap-3"}>
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="搜索题目、关键词、主题..."
                className="pl-9"
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
            </div>
            <Select
              value={filters.year?.toString() || "all"}
              onValueChange={(v) => updateFilter("year", v === "all" ? null : Number(v))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="年份" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部年份</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.type || "all"}
              onValueChange={(v) => updateFilter("type", v === "all" ? null : v as FilterState["type"])}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="题型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部题型</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.themeGroup || "all"}
              onValueChange={(v) => updateFilter("themeGroup", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="主题群" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部主题</SelectItem>
                {themeGroups.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.difficulty || "all"}
              onValueChange={(v) => updateFilter("difficulty", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="难度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部难度</SelectItem>
                <SelectItem value="简单">简单</SelectItem>
                <SelectItem value="中等">中等</SelectItem>
                <SelectItem value="困难">困难</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.status || "all"}
              onValueChange={(v) => updateFilter("status", v === "all" ? null : v)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="not_started">未开始</SelectItem>
                <SelectItem value="analyzed">已分析</SelectItem>
                <SelectItem value="memorized">已背诵</SelectItem>
                <SelectItem value="written">已写作</SelectItem>
                <SelectItem value="mastered">已掌握</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.sort}
              onValueChange={(v) => updateFilter("sort", v as SortOption)}
            >
              <SelectTrigger className="w-[140px]">
                <ArrowUpDown size={14} className="mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              没有匹配的题目
            </CardContent>
          </Card>
        ) : (
          filtered.map((q) => {
            const status = getStatus(q.id);
            return (
              <Card key={q.id} className="hover:border-indigo-200 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge variant="outline" className="text-xs">
                          {q.sourceYear}年{q.month}月 第{q.set}套
                        </Badge>
                        <Badge className={getTypeColor(q.type)}>{q.type}</Badge>
                        <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                        <Badge variant="secondary">{q.themeGroup}</Badge>
                        <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {q.prompt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs text-gray-500">{q.chineseTitle}</span>
                        <span className="text-gray-300">·</span>
                        {q.coreKeywords.slice(0, 3).map((kw) => (
                          <Badge key={kw} variant="outline" className="text-xs text-indigo-600 border-indigo-200">
                            {truncate(kw, 20)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link href={`/questions/${q.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <BookOpen size={14} className="mr-1" />
                          深度解析
                        </Button>
                      </Link>
                      <Link href={`/training/reaction?q=${q.id}`}>
                        <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                          <GraduationCap size={14} className="mr-1" />
                          反应训练
                        </Button>
                      </Link>
                      <Link href={`/writing?q=${q.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Clock size={14} className="mr-1" />
                          限时写作
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
