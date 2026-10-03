"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { LearningState } from "@/types/learning";
import { getLearningState, getStorageWarning, saveState, validateLearningState } from "@/lib/storage";
import { makeInitialState, reconcileLegacyIds } from "@/lib/learning";
import { questions } from "@/lib/content";

type Context = { state: LearningState; ready: boolean; persisted: boolean; commit: (recipe: (previous: LearningState) => LearningState) => boolean; notify: (message: string) => void };
const LearningContext = createContext<Context | null>(null);
export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LearningState>(makeInitialState);
  const [ready, setReady] = useState(false);
  const [persisted, setPersisted] = useState(true);
  const stateRef = useRef(state);
  const persistedRef = useRef(true);
  const [message, setMessage] = useState("");
  const apply = useCallback((next: LearningState, saved: boolean) => {
    stateRef.current = next;
    persistedRef.current = saved;
    setState(next);
    setPersisted(saved);
  }, []);
  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      const loaded = reconcileLegacyIds(getLearningState(), questions);
      apply(loaded, false);
      try { saveState(loaded); apply(loaded, true); } catch (error) { setMessage(`${error instanceof Error ? error.message : "学习记录暂时无法保存。"} 当前内容保留在本页内存，请到设置导出备份。`); }
      setReady(true);
    });
    const refresh = (event: Event) => {
      if (event.type === "storage" && !persistedRef.current) {
        setMessage("另一个窗口更新了本机记录。当前未保存内容仍保留在本页，请先导出备份，再刷新读取另一窗口的记录。");
        return;
      }
      const loaded = getLearningState();
      const warning = getStorageWarning();
      if (warning?.includes("无法读取")) { apply(stateRef.current, false); setMessage(warning); return; }
      apply(loaded, true);
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("cet-learning-change", refresh);
    return () => { alive = false; window.removeEventListener("storage", refresh); window.removeEventListener("cet-learning-change", refresh); };
  }, [apply]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 6000);
    return () => clearTimeout(timer);
  }, [message]);
  const commit = useCallback((recipe: (previous: LearningState) => LearningState) => {
    let next: LearningState;
    try {
      next = validateLearningState(recipe(stateRef.current));
    } catch (error) { setMessage(error instanceof Error ? error.message : "记录格式不正确，未应用此次更改。"); return false; }
    try {
      saveState(next);
      apply(next, true);
      return true;
    } catch (error) { apply(next, false); setMessage(`${error instanceof Error ? error.message : "本机保存失败。"} 当前更改只保留在本页内存，请到设置导出；关闭页面会丢失未保存更改。`); return false; }
  }, [apply]);
  return <LearningContext.Provider value={{ state, ready, persisted, commit, notify: setMessage }}>{children}{message && <div className="toast" role="status">{message}</div>}</LearningContext.Provider>;
}
export function useLearning() { const context = useContext(LearningContext); if (!context) throw new Error("LearningProvider is required"); return context; }
