import type { Metadata } from "next";
import { LearningProvider } from "@/components/learning-provider";
import { Shell } from "@/components/shell";
import "./globals.css";
export const metadata: Metadata = { title: { default: "写作有据 · 四六级写作课堂", template: "%s · 写作有据" }, description: "用真实四六级写作任务，练习审题、论证、准确表达、修订与换题应用。" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN" data-scroll-behavior="smooth"><body><LearningProvider><Shell>{children}</Shell></LearningProvider></body></html>; }
