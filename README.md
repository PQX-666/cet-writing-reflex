# 写作有据 · CET Writing Reflex

可以实际使用的四六级写作训练网站。核心流程：**独立尝试 → 对照依据 → 修改原文 → 换题复测**。

[打开网站](https://pqx-666.github.io/cet-writing-reflex/) · [使用手册](https://pqx-666.github.io/cet-writing-reflex/guide/)

## 本地运行

使用 Node.js 22.13+（本次验证环境为 24.15.0）。

```powershell
npm ci
npm run dev
```

打开 http://localhost:3000 。无需注册或 API 密钥即可使用核心训练。生产运行：

```powershell
npm run check
npm run build
npm start
```

当前使用 Next.js 16.2.6 App Router、React 19、TypeScript。支持 Node.js 部署和 GitHub Pages 静态部署。Node.js 版本使用 `npm run build`、`npm start`，可配置服务端 AI 反馈；两种模式均无需下载远程字体。

## GitHub Pages 部署

仓库的 Settings → Pages → Build and deployment 中选择 **GitHub Actions**。推送 `main` 后，`.github/workflows/pages.yml` 使用 Node.js 24 安装锁定依赖，运行内容检查、测试、类型检查和 lint，再构建和部署。Pull request 运行同样的检查与静态构建；只有 `main` 分支可以发布。也可从 Actions 页面手动运行工作流。当前本地发布分支推送到远程main可用 `git push origin HEAD:main`。

默认项目路径为 `/cet-writing-reflex`。工作流按仓库名生成路径，项目网址为 `https://<GitHub 用户名>.github.io/<仓库名>/`。本地复现：

```powershell
npm run build:pages
npm run preview:pages
```

预览地址为 http://127.0.0.1:3002/cet-writing-reflex/ 。预览服务仅监听本机，直接打开子页面、带查询参数的链接和未知路径都按静态站点处理；未知路径返回 404。

构建脚本以子进程环境启用 `NEXT_PUBLIC_GITHUB_PAGES=1` 和 `NEXT_PUBLIC_BASE_PATH`，适用于 Windows、Linux。此 Next.js 版本使用 `output: "export"`、`distDir: ".next-pages"`、`trailingSlash: true`，静态文件实际输出到 `.next-pages/`；构建成功后写入 `.nojekyll`，工作流上传该目录。脚本不删除 `.next/`，但 Next.js 构建会更新内部缓存；切回本地 Node.js 生产模式时重新运行 `npm run build`、`npm start`。

如果仓库改名，或部署到其他子目录，构建与预览须使用同一路径。可以设置环境变量 `NEXT_PUBLIC_BASE_PATH`，也可以传参覆盖：

```powershell
npm run build:pages -- --base-path /my-repository
npm run preview:pages -- --base-path /my-repository
```

`--base-path /` 表示域名根目录。路径在构建时写入前端资源，修改路径后必须重新构建；使用自定义域名时也要相应调整工作流的 `NEXT_PUBLIC_BASE_PATH`。

Pages 保留题目学习、知识库、写作练习、复习、独立测评、中文辅助、备份与导入等核心功能。GitHub Pages 不运行 Node.js 服务端，**在线静态版本不启用 AI 接口**；本地 Node.js 版本仍可使用下面的可选 AI 配置。

学习记录保存在当前浏览器当前来源的本机存储中。Pages、旧 `localhost:3000` 和 `127.0.0.1:3002` 属于不同来源，记录不会自动共享。迁移前在旧站「设置」导出 JSON，再到新站导入；换设备也需要备份与导入。

发布流程参考 [GitHub 官方自定义 Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 如何学习

面向学生的完整[使用手册](https://pqx-666.github.io/cet-writing-reflex/guide/)已接入首页、知识库、课堂、写作台和全站页脚。包含基础薄弱者的起步路线、各模块操作、中文辅助的用法、设计理由与备份说明；浏览器打印时会简化导航。

知识库的48条核心/专题知识、30道题的要求与教学示例、80条表达例句和103段参考作文提供中文辅助。英文保持主体，中文在对应内容下方以小字显示；参考及其中文同时遵守原有揭示顺序。已有中文的内容避免重复显示，学生自己的作文、历史原文和AI引用不做自动翻译。中文用于理解和核对，正式输出仍以自己的英语完成。

1. 选择四级或六级，在设置填写可用时间与重点。
2. 在「写作诊断」中选保留题，限时独立完成并保存原稿。
3. 从任务覆盖、理由展开、组织和语言中选一个主要问题。
4. 真题课堂先尝试再对照，参考作文是一种可行写法。
5. 回到写作台实际修改，保存修改理由与版本。
6. 用新题或隔几天复测，检查同一个问题是否减少。

## 写作知识库

入口为 `/knowledge`，也可从首页、课堂表达区、写作台与复习页进入。

- 先练18条核心：12类通用表达与6类准确用法。
- 按用途、主题、类型和关键词查找；收藏自己确实需要的内容。
- 48个原创单元包括24个主题应用和6个题型任务，按12个主题族组织。这个框架不是全部历年题目统计，也不保证未来所有主题。
- 同一条知识同时用于查阅和练习，包含意思、形式、例句、使用边界、对比修改和新情境任务；原有80条题目表达作为关联材料保留。
- `/knowledge/practice` 每次最多两条，到期先于未练内容；已经练过但未到期的内容不会自动重复。明确选择某一条时可以主动复练。
- 先隐藏参考回忆，再对照；初次接触可先看示例；随后换情境应用。应用紧接参考，记录为有准备的练习，不标成独立迁移成功。
- 作答与步骤自动保存在现有v2备份中；对照后自评只安排下次复习，不产生正确率或掌握分数。

内容缺口与来源见 [覆盖审计](docs/knowledge-coverage.md)，书籍、原始研究和具体设计边界见 [学习依据](docs/knowledge-learning-evidence.md)。页面 `/knowledge/coverage`、`/knowledge/method` 提供学生可读的摘要。范文保留评估题不作为知识库详情的直接关联链接；通用知识的学习仍不构成严格的考试保密环境。

课堂短答、整篇草稿、修改理由和计时状态存在当前浏览器。原稿与修订版本独立保留，自动保存不会覆盖版本。清空当前文字也会保存为空。

## 内容依据

30道可追溯真题任务（六级20、四级10），12道深度单元、8道保留评估题、80条有语境和使用边界的表达。逐题包含来源、要求整理说明、计词规则、原创范文、理由链、可选路线、修改与迁移练习和反例。

官方大纲用于确认评分关注点，题目通过大学存档和教育机构公开整理核验。要求改写明确标注；没有可靠原文的首句不捏造。给定首句是否计词按题处理。缩写、所有格、连字符词按工具规则计一词。

六级17题核对了完整Directions（高校或机构整理，非考试院官方原卷）；自由探索1题明确保留核验限制；AI与职业准备2题标为真题主题的教学重构。四级题按逐题来源忠实整理，不宣称逐字原卷复现。

范文和解析为项目原创，经独立模型校审；没有标作官方标准答案或真人教师审核。自动检查仅报告字数、首句等事实，不合成考试分数。开放题使用对照反馈，关键词未识别不等于错误。

详见 [六级来源](docs/content-sources-cet6.md)、[四级来源](docs/content-sources-cet4.md)、[研究证据](docs/evidence-and-learning-design.md)、[验收记录](docs/reconstruction-report.md)。

## 可选 AI 语义反馈

本地 Node.js 版本默认关闭。复制 `.env.example` 为 `.env.local`，填写受信任且兼容 Chat Completions 的服务。开发模式重启 `npm run dev`；生产模式修改配置后重新运行 `npm run build`、`npm start`：

```dotenv
WRITING_AI_BASE_URL=https://your-provider.example/v1
WRITING_AI_KEY=your-server-key
WRITING_AI_MODEL=your-model
```

密钥仅在服务端读取。用户点击按钮才发送题目和当前作文。返回原文引用、问题、修改建议与下一步，不请求正式考试评分。设置长度、格式、引用位置校验、超时与单进程基础频率限制。失败会明确显示，不生成替代评分。正式多人部署应在主机层配置认证、配额和跨实例限流。

AI建议需要核对。本次未提供真实模型服务密钥，远程服务的反馈质量和可用性不在已验证范围内；无密钥教学路径可独立使用。

## 本机数据与迁移

v2键为 `cet_writing_reflex_v2`。设置页可以导出 JSON 备份；导入须明确确认覆盖，并通过完整版本校验。无效导入不覆盖，损坏数据普通保存拒绝覆盖，可导出原始恢复备份排查。

若浏览器不支持下载，使用「查看 / 复制备份文本」手动保存完整JSON。存储失败时仍保留本页内存稿，并明确提醒导出；关闭或刷新前请先备份。

旧 `cet6_*` 数据自动迁移为历史，原文保留且旧键不删除。旧100形式分、关键词判断与卡片自评不作为新考试成绩或掌握证据。已知旧ID通过别名迁移，无法对应的记录仍可查看。

没有账号云同步。换设备或清理浏览器数据前应先导出。

## 检查与维护

```powershell
npm run check:content
npm test
npm run typecheck
npm run lint
npm run build
```

结构检查核验数量、词数、首句与唯一性，不能替代语义或教师审阅。领域测试覆盖空答、计词、评估隔离、中国日期、后台计时、复习队列、版本保护、导入验证与迁移。

题库位于 `src/data/cet4.json`、`src/data/cet6.json`；领域模型位于 `src/types/learning.ts`，确定规则位于 `src/lib/checks.ts`，排程位于 `src/lib/learning.ts`，存储位于 `src/lib/storage.ts`。更新题库时同步来源并安排独立内容复核。

## 效果边界

研究支持检索、间隔和反馈后修改等设计原则。产品尚未完成可靠的学习者前后测与延迟迁移试验，不能宣称已验证提分。建议采用可比未见题、教师盲评与评分一致性建立效果证据。
