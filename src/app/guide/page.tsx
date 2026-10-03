import Link from "next/link";
import { ArrowRight, BookOpen, Check, PenLine, RotateCcw } from "lucide-react";
import { ChineseAid } from "@/components/chinese-aid";
import { PageIntro, Tag } from "@/components/ui";
import { getKnowledgeUnit } from "@/lib/knowledge-content";

export const metadata = { title: "使用手册 · 从看懂到写出" };
const sections = [
  ["start", "选起步路线"], ["knowledge", "知识库怎么用"], ["classroom", "真题课堂怎么练"],
  ["writing", "写作与修改"], ["review", "复习与检验"], ["chinese", "中文辅助怎么用"],
  ["design", "为什么这样设计"], ["data", "保存与常见问题"],
];

export default function Guide() {
  const example = getKnowledgeUnit("kf-mechanism")!;
  return <div className="guide-page stack">
    <PageIntro title="从看懂，到自己写出来" description="先选一条起步路线，理解一个例子，留下自己的句子，再把它用进作文。每次解决一个主要问题。"/>
    <nav className="guide-toc" aria-label="使用手册目录">{sections.map(([id, title]) => <a key={id} href={`#${id}`}>{title}</a>)}</nav>

    <section className="guide-section" id="start"><div className="section-heading"><h2>第一次来，从哪里开始？</h2><Tag tone="green">先选四级或六级</Tag></div>
      <p>页面顶部切换考试级别；在「学习设置」填写每天可用的时间和当前练习目标。今日推荐会参考这些设置及本机练习记录。</p>
      <div className="guide-route-grid">
        <article className="panel stack"><BookOpen size={24}/><h3>英语基础较弱</h3><p>先读知识库里的一条核心知识。对照英文与下方中文，弄清意思和适用条件；先写一句可控制的英语，再进入课堂练一段。</p><Link className="text-link" href="/knowledge/kf-mechanism">从解释原因开始 <ArrowRight size={14}/></Link></article>
        <article className="panel stack"><PenLine size={24}/><h3>能写句子，文章展开困难</h3><p>进入真题课堂，聚焦「把理由讲清」。写出观点、作用过程和具体例子，对照后补足缺失的环节，再用于完整作文。</p><Link className="text-link" href="/classroom">选一道课堂题 <ArrowRight size={14}/></Link></article>
        <article className="panel stack"><RotateCcw size={24}/><h3>想检验独立写作</h3><p>从「写作诊断」选择没看过参考、没写过的题，限时保存原稿。选一个问题训练，之后换题检查相同问题是否减少。</p><Link className="text-link" href="/assessment">留下独立样本 <ArrowRight size={14}/></Link></article>
      </div><p className="fine">首次写得短、出现错误，都能帮助找到下一步。还无法完成整篇时，先用普通课堂题学习；看过示例后的写作如实作为有准备的练习。</p>
    </section>

    <section className="panel stack guide-section" id="knowledge"><p className="eyebrow">查得到，也要写得出</p><h2>知识库：理解一条，再用一次</h2>
      <ol className="guide-steps">
        <li><strong>选内容。</strong>「先练核心」适合起步；「为一道题找材料」按主题找具体内容；「我的收藏」保留写作中确实需要的单元。也可搜索用途或词语。</li>
        <li><strong>看懂用法。</strong>详情依次给出形式、例句、使用边界和对比修改。说出“它表达什么、什么时候适用”，比只认得单词更有帮助。</li>
        <li><strong>自己应用。</strong>在「自己写一句」按新情境留下英文，点击「保存并对照」。核对意思、搭配和条件，允许与参考不同的合理表达。</li>
        <li><strong>短练习中再回忆。</strong>点击「练这一条」，或从知识库安排最多两条。先写回忆，再对照；第一次接触或想不起来，可以先看示例。</li>
        <li><strong>换情境，再安排复习。</strong>用自己的句子回应新任务；对照后根据真实困难选择自评。已到期内容优先，未到期内容可在详情中主动复练。</li>
      </ol>
      <div className="callout"><strong>怎样选自评？</strong><p>写不出就选「还写不出」；需要更多帮助就选「需要更多提示」；能回忆但应用仍需检查就按对应项选择。在短练习中选择「先看示例」或「先看思路」时，只提供较近的复习选项。自评安排时间，不判断答案是否正确。</p></div>
      <p className="fine">刚查阅过的回忆、紧接参考的应用，都属于有准备的练习。短练习不是未见题测评；完整新题中的独立表现需要另外检验。</p>
      <Link className="text-link" href="/knowledge">进入知识库 <ArrowRight size={14}/></Link>
    </section>

    <section className="panel stack guide-section" id="classroom"><p className="eyebrow">读懂任务，再组织内容</p><h2>真题课堂：四步可以按瓶颈选择</h2>
      <div className="guide-module-grid">
        <div><h3>1. 读懂任务</h3><p>读英文要求和中文题意，确认写给谁、要做什么、必须覆盖什么。先用自己的话概括，再看任务解析。</p></div>
        <div><h3>2. 把理由讲清</h3><p>写一个观点，补充变化如何发生，再用具体情境支持。提纲说明每段解决什么问题，避免只罗列连接词。</p></div>
        <div><h3>3. 准确地表达</h3><p>修改有问题的短段落，比较原句与修改句；带走少量合适的表达，并看清搭配和使用边界。</p></div>
        <div><h3>4. 换题应用</h3><p>回应新的情境，重新判断读者、条件和行动细节。相关表达可以迁移，具体论证要随任务调整。</p></div>
      </div><p>「保存并对照」保留尝试并开放反馈；遇到困难可以「先看提示」。看完后实际修改自己的答案，再保存，才能留下可比较的变化。整篇参考作文用于理解一种写法。补充练习、表达例句和常见错误按需展开；题目下方的完整英文指令也可展开查阅。</p>
      <p className="fine">核心任务概括可用中文或英文；正式写作与表达练习要留下自己的英文。关键词检查只确认已知表达的匹配，未识别不等于错误。</p>
      <Link className="text-link" href="/classroom">进入真题课堂 <ArrowRight size={14}/></Link>
    </section>

    <section className="panel stack guide-section" id="writing"><p className="eyebrow">原稿 → 对照 → 修改稿</p><h2>写作台：让改进留在文章里</h2>
      <ol className="guide-steps">
        <li><strong>读要求并写原稿。</strong>按本题字数、首句和场景完成。要观察限时表现，可以开启30分钟计时；计时结束仍能编辑，请保留此次实际作答。</li>
        <li><strong>点击「保存本次原稿」。</strong>编辑时的自动保存用于恢复草稿；保存原稿另外建立可对照的版本。</li>
        <li><strong>只先改一个主要问题。</strong>例如遗漏任务、理由缺少作用过程、段落关系不清或搭配不当。对照清单、参考和中文理解，定位到具体句段。</li>
        <li><strong>实际改文，再写修改理由。</strong>记录“原来哪里有问题、补了什么、为什么这样改”，点击「保存修改稿」。修改稿另存，原稿可在版本记录查看。</li>
      </ol>
      <p>自动检查会报告字数、首句等可确认事实。切题、解释是否成立和语言是否自然，需要你对照判断，并在需要时请教师评价。勾选自查表示你检查过，不能当作得分。</p>
      <p className="fine">保留评估题须先保存原稿，再开放本题参考与反馈。AI语义反馈仅在管理员配置服务后出现，需要主动点击，并会发送题目及当前作文；核心流程无需密钥。</p>
      <Link className="text-link" href="/studio">进入写作台 <ArrowRight size={14}/></Link>
    </section>

    <section className="panel stack guide-section" id="review"><p className="eyebrow">隔一段时间，再独立尝试</p><h2>复习与进步：检查会不会用</h2>
      <p>知识库短练习复习通用用法与主题应用；复习页下方的表达卡按原题复习具体表达。两类内容各自排期。先写自己的英语，再看参考和中文说明；没有想起时如实选择。</p>
      <p>「学习记录」可查看真实作答、提示情况和作文版本。无提示只说明当时没有使用本页提示；收藏、完成次数和自评都不能证明表达正确或已掌握。</p>
      <div className="callout"><strong>怎样检查是否有改善？</strong><p>先留原稿 → 训练一个问题 → 换一道没有看过参考的题再写 → 隔几天再检查。比较同一问题有没有减少、是否仍需提示；整篇作文可请教师按任务完成、思想表达、连贯和语言整体评价。</p></div>
      <p className="fine">本机“未记录浏览”不保证你从未在别处看过这道题。已看过参考的题作为复练，选另一题检验陌生任务。不同题难度未经过等值标定。</p>
      <div className="row wrap"><Link className="text-link" href="/review">查看复习和记录 <ArrowRight size={14}/></Link><Link className="text-link" href="/assessment">换题检验 <ArrowRight size={14}/></Link></div>
    </section>

    <section className="panel stack guide-section" id="chinese"><p className="eyebrow">中文搭桥，英语表达</p><h2>英文下方的小字，怎样用更合适？</h2>
      <p>中文辅助帮助理解句意、条件和推理，保留英文原句的可能性与限制。先读英文，卡住时借助下方中文，再回到英文找到对应表达。错误句下方标「原句想表达」，语法修正仍要看修改句与解释。</p>
      <div className="guide-example"><p className="english">{example.example}</p><ChineseAid text={example.exampleZh}/></div>
      <ol className="guide-steps"><li>说明行动是什么、改变了什么、对谁有帮助。</li><li>找出英文中的作用表达和条件，注意can、may等不表示必然结果。</li><li>暂时遮住参考，用自己的英文再表达一次，然后换一个情境写句子。</li></ol>
      <p className="fine">中文是理解辅助，通常不是逐词替换规则，也不是必须照译的作文提纲。练习页在对照前隐藏参考及其中文，避免边看答案边误判为回忆。</p>
    </section>

    <section className="panel stack guide-section" id="design"><p className="eyebrow">每项设计，都对应一个学习动作</p><h2>为什么这样设计？</h2>
      <div className="guide-module-grid">
        <div><h3><Check size={16}/> 少量练，集中一个问题</h3><p>同时处理陌生词、语法和论证容易分散注意。短例子和最多两条的练习是控制任务量的设计选择，实际用时随基础变化。</p></div>
        <div><h3><Check size={16}/> 先尝试，再核对</h3><p>自己写能暴露“看着熟悉却写不出”的地方。散文记忆实验支持检索对延迟保持的帮助；初学者仍可先理解示例。<a className="text-link" href="https://pubmed.ncbi.nlm.nih.gov/16507066/" target="_blank" rel="noreferrer">原始研究</a></p></div>
        <div><h3><Check size={16}/> 英中邻近，先把意思弄清</h3><p>把辅助释义放在对应英文下面，减少寻找解释的步骤。英文保留主体，小字帮助核对意思；这个界面安排仍需观察学生实际使用。</p></div>
        <div><h3><Check size={16}/> 有边界，也有换情境练习</h3><p>写作要选对表达并回应题目。反例帮助比较，换情境迫使你重新判断相关性；完整新题进一步检验组织与论证。</p></div>
        <div><h3><Check size={16}/> 间隔复习，留下历史</h3><p>二语学习的研究综合支持分散练习的价值。这里根据自评历史排期，难点更快回来；它是可调整规则。<a className="text-link" href="https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12479" target="_blank" rel="noreferrer">二语间隔研究</a></p></div>
        <div><h3><Check size={16}/> 原稿保留，反馈接到修改</h3><p>保存修改前后的文字，能看清实际改变。保留题在原稿后才展示参考，帮助区分独立表现与有准备的复练。</p></div>
      </div><p className="fine">研究提供设计理由，不能直接证明本网站已经提分。每次两条、中文辅助和当前排期也未被证明适合所有人。目标是延迟后在新题中恰当地写出来。</p>
      <div className="row wrap"><Link className="text-link" href="/knowledge/method">书籍与研究依据 <ArrowRight size={14}/></Link><Link className="text-link" href="/knowledge/coverage">内容覆盖与来源 <ArrowRight size={14}/></Link></div>
    </section>

    <section className="panel stack guide-section" id="data"><p className="eyebrow">把产出保存好</p><h2>保存、备份与常见问题</h2>
      <p>作文、练习和复习安排保存在当前浏览器本机。刷新会恢复已保存的草稿；保存失败时按页面提示导出当前内容。换设备、清理浏览器数据或使用隐私窗口前，在「学习设置」导出备份。</p>
      <p>可以导出JSON文件，也可以「查看 / 复制备份文本」后完整保存。导入会验证格式，并在你明确确认后替换当前记录；先保留需要的现有备份。</p>
      <div className="guide-faq">
        <details><summary>参考答案与我写的不一样，是不是错了？</summary><p>先比较是否完成任务、意思是否成立、搭配与条件是否恰当。开放题允许不同的合理写法，本页不按逐字一致判分。</p></details>
        <details><summary>中文看懂了，但英文写不出来，怎么办？</summary><p>先缩短到一句，明确主语和一个主要动作；对照示例找合适搭配，写完核对。之后再遮住参考回忆。遇到困难使用示例是正常学习过程。</p></details>
        <details><summary>为什么刷新后保存的草稿还在，却没有原稿版本？</summary><p>自动保存与版本记录用途不同。前者恢复当前编辑文字；点击「保存本次原稿」才建立原稿版本，之后可另外保存修改稿。</p></details>
        <details><summary>为什么目前没有到期内容？</summary><p>未练内容是新内容，已练但未到期的内容等待安排时间。可进入课堂写作、选新内容，或在知识详情主动复练一条。</p></details>
        <details><summary>需要把全部内容都背完吗？</summary><p>按当前任务选择内容，先学核心用法，再补实际缺口。完成一条后把它带回段落和作文；主题库是教学框架，未来新题仍可能需要额外知识。</p></details>
      </div><Link className="text-link" href="/settings">学习设置与备份 <ArrowRight size={14}/></Link>
    </section>
    <div className="guide-finish"><h2>现在，留下一次自己的尝试</h2><p>看懂一条例子，写出一个句子，核对后改好一个地方。</p><div className="row wrap"><Link className="button primary" href="/knowledge">从核心知识开始 <ArrowRight size={15}/></Link><Link className="button ghost" href="/classroom">进入真题课堂</Link></div></div>
  </div>;
}
