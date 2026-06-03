"use client";

import { useState } from "react";
import cet6WritingDataset from "@/data/cet6_writing_20_full_training_dataset";
import { exportAllData, importAllData, clearAllData, recordExport } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const metadata = cet6WritingDataset.metadata;
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cet6-trainer-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    recordExport();
    setMessage({ type: "success", text: "学习记录已导出" });
  };

  const handleImport = () => {
    const success = importAllData(importJson);
    if (success) {
      setMessage({ type: "success", text: "学习记录已导入" });
      setImportDialogOpen(false);
    } else {
      setMessage({ type: "error", text: "导入失败，请检查 JSON 格式" });
    }
  };

  const handleClear = () => {
    clearAllData();
    setClearDialogOpen(false);
    setMessage({ type: "success", text: "所有本地学习记录已清除" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">设置与数据说明</h1>
        <p className="text-sm text-gray-500 mt-1">
          了解数据集设计理念和管理本地学习记录
        </p>
      </div>

      {/* Dataset Info */}
      <Card>
        <CardHeader>
          <CardTitle>数据集信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">名称</span>
              <p className="font-medium">{metadata.name}</p>
            </div>
            <div>
              <span className="text-gray-500">版本</span>
              <p className="font-medium">{metadata.version}</p>
            </div>
            <div>
              <span className="text-gray-500">语言</span>
              <p className="font-medium">{metadata.language}</p>
            </div>
            <div>
              <span className="text-gray-500">真题数量</span>
              <p className="font-medium">{cet6WritingDataset.questions.length} 道</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium text-sm mb-1">设计目的</h4>
            <p className="text-sm text-gray-600">{metadata.purpose}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-1">设计原则</h4>
            <p className="text-sm text-gray-600">{metadata.designPrinciple}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-1">万能公式</h4>
            <p className="text-sm font-medium text-indigo-700">{metadata.universalFormula.core}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">训练模块</h4>
            <div className="flex flex-wrap gap-1.5">
              {metadata.appTrainingModules.map((m) => (
                <Badge key={m} variant="secondary">{m}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">复习算法</h4>
            <div className="space-y-1 text-xs text-gray-600">
              {Object.entries(metadata.reviewAlgorithmSuggestion.cardRatings).map(([k, v]) => (
                <p key={k}>不会 → {v} | 模糊 → 1天后 | 基本会 → 3天后 | 熟练 → 7天后</p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>学习记录管理</CardTitle>
          <CardDescription>所有数据保存在浏览器本地</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download size={14} className="mr-2" />
              导出学习记录
            </Button>
            <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
              <Upload size={14} className="mr-2" />
              导入学习记录
            </Button>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => setClearDialogOpen(true)}>
              <Trash2 size={14} className="mr-2" />
              清除本地记录
            </Button>
          </div>

          {message && (
            <Alert variant={message.type === "success" ? "default" : "destructive"}>
              {message.type === "success" ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Clear Dialog */}
      <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              确认清除
            </DialogTitle>
            <DialogDescription>
              这将清除所有本地学习记录，包括训练进度、背诵卡片评分、写作草稿等。此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearDialogOpen(false)}>取消</Button>
            <Button variant="destructive" onClick={handleClear}>确认清除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>导入学习记录</DialogTitle>
            <DialogDescription>
              粘贴之前导出的 JSON 数据。这将覆盖当前所有本地记录。
            </DialogDescription>
          </DialogHeader>
          <textarea
            className="w-full border rounded-lg p-3 text-xs min-h-[200px] resize-y"
            placeholder="粘贴 JSON..."
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>取消</Button>
            <Button onClick={handleImport}>确认导入</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Technical Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">技术说明</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-gray-500 space-y-1">
          <p>本 App 是一个纯前端应用（MVP），所有学习数据存储在浏览器 localStorage 中。</p>
          <p>建议定期导出学习记录做备份。清除浏览器数据会导致学习记录丢失。</p>
          <p>数据来源：{metadata.sourceBasis.join("、")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
