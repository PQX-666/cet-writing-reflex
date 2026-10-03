export function ChineseAid({ text, label, original }: { text?: string; label?: string; original?: string }) {
  return text?.trim() && text.trim() !== original?.trim() ? <p className="zh-aid" lang="zh-CN">{label && <span>{label}：</span>}{text}</p> : null;
}

export function TeachingEssay({ text, translations }: { text: string; translations: string[] }) {
  return <div className="essay english">{text.split(/\n+/).map((paragraph, i) => <div className="bilingual-paragraph" key={i}><p lang="en">{paragraph}</p><ChineseAid text={translations[i]}/></div>)}</div>;
}
