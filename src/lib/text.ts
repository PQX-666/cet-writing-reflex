export function highlightKeywords(
  text: string,
  keywords: string[],
  className: string = "font-semibold text-blue-600"
): string {
  let result = text;
  for (const kw of keywords) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    result = result.replace(
      regex,
      `<span class="${className}">$1</span>`
    );
  }
  return result;
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + "...";
}

export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDayLabel(offset: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "简单":
      return "bg-green-100 text-green-700";
    case "中等":
      return "bg-yellow-100 text-yellow-700";
    case "困难":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getTypeColor(type: string): string {
  switch (type) {
    case "重要性类":
      return "bg-blue-100 text-blue-700";
    case "社会现象类":
      return "bg-purple-100 text-purple-700";
    case "问题解决类":
      return "bg-red-100 text-red-700";
    case "对比平衡类":
      return "bg-green-100 text-green-700";
    case "方法建议类":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "not_started":
      return "未开始";
    case "analyzed":
      return "已分析";
    case "memorized":
      return "已背诵";
    case "written":
      return "已写作";
    case "mastered":
      return "已掌握";
    default:
      return "未开始";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "not_started":
      return "bg-gray-100 text-gray-600";
    case "analyzed":
      return "bg-blue-100 text-blue-600";
    case "memorized":
      return "bg-purple-100 text-purple-600";
    case "written":
      return "bg-orange-100 text-orange-600";
    case "mastered":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function getLevelColor(level: string): string {
  switch (level) {
    case "稳分版":
      return "bg-green-100 text-green-700";
    case "提分版":
      return "bg-blue-100 text-blue-700";
    case "高分版":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getCardTypeLabel(type: string): string {
  switch (type) {
    case "中译英":
      return "中译英";
    case "填空":
      return "填空";
    case "句子升级":
      return "句子升级";
    case "反问句":
      return "反问句";
    case "模板填空":
      return "模板填空";
    case "建议句":
      return "建议句";
    default:
      return type;
  }
}
