import type { Question, QuestionType } from "@/types/dataset";

export type SortOption = "newest" | "oldest" | "hardest" | "easiest" | "unlearned" | "most_mistakes";

export interface FilterState {
  year: number | null;
  type: QuestionType | null;
  themeGroup: string | null;
  difficulty: string | null;
  status: string | null;
  search: string;
  sort: SortOption;
}

export function getAvailableYears(questions: Question[]): number[] {
  const years = [...new Set(questions.map((q) => q.sourceYear))];
  return years.sort((a, b) => b - a);
}

export function getAvailableTypes(questions: Question[]): string[] {
  return [...new Set(questions.map((q) => q.type))];
}

export function getAvailableThemeGroups(questions: Question[]): string[] {
  return [...new Set(questions.map((q) => q.themeGroup))];
}

export function filterQuestions(
  questions: Question[],
  filters: FilterState,
  getStatusFn: (id: string) => string
): Question[] {
  let result = [...questions];

  if (filters.year) {
    result = result.filter((q) => q.sourceYear === filters.year);
  }

  if (filters.type) {
    result = result.filter((q) => q.type === filters.type);
  }

  if (filters.themeGroup) {
    result = result.filter((q) => q.themeGroup === filters.themeGroup);
  }

  if (filters.difficulty) {
    result = result.filter((q) => q.difficulty === filters.difficulty);
  }

  if (filters.status) {
    result = result.filter((q) => getStatusFn(q.id) === filters.status);
  }

  if (filters.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (q) =>
        q.prompt.toLowerCase().includes(s) ||
        q.chineseTitle.toLowerCase().includes(s) ||
        q.coreKeywords.some((k) => k.toLowerCase().includes(s)) ||
        q.type.toLowerCase().includes(s) ||
        q.themeGroup.toLowerCase().includes(s)
    );
  }

  // Sort
  switch (filters.sort) {
    case "newest":
      result.sort((a, b) => b.sourceYear - a.sourceYear);
      break;
    case "oldest":
      result.sort((a, b) => a.sourceYear - b.sourceYear);
      break;
    case "hardest": {
      const order: Record<string, number> = { "困难": 3, "中等": 2, "简单": 1 };
      result.sort((a, b) => (order[b.difficulty] || 0) - (order[a.difficulty] || 0));
      break;
    }
    case "easiest": {
      const order: Record<string, number> = { "困难": 3, "中等": 2, "简单": 1 };
      result.sort((a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0));
      break;
    }
    case "unlearned":
      result.sort((a, b) => {
        const sa = getStatusFn(a.id);
        const sb = getStatusFn(b.id);
        if (sa === "not_started" && sb !== "not_started") return -1;
        if (sa !== "not_started" && sb === "not_started") return 1;
        return b.sourceYear - a.sourceYear;
      });
      break;
    case "most_mistakes":
      // This will be sorted externally with mistake data
      break;
  }

  return result;
}
