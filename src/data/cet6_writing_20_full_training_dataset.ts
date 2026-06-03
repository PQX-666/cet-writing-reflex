export const cet6WritingDataset = {
  "metadata": {
    "name": "CET-6 Writing 20-Question Deep Training Dataset",
    "version": "1.0",
    "language": "zh-CN + English",
    "purpose": "用于英语六级作文网页版 APP：真题训练、题型识别、三段提纲、模板迁移、句式背诵、限时写作。",
    "designPrinciple": "不是资料展示，而是训练考场反应：看到题目 → 判断题型 → 抓关键词 → 匹配模板 → 生成三段提纲 → 输出作文。",
    "sourceBasis": [
      "用户上传的六级历年范文整理 PDF",
      "用户上传的四六级写作模板 PDF",
      "用户上传的六级写作课件 PDF"
    ],
    "universalFormula": {
      "core": "主题重要性/现象/问题 → 两个理由或两个方面 → 总结建议",
      "examProcess": [
        "0-10秒：圈主题词",
        "10-30秒：判断题型",
        "30-60秒：写三段中文提纲",
        "1-5分钟：确定可用模板和两个理由",
        "5-25分钟：写正文",
        "25-30分钟：检查词数、三段、主谓一致和拼写"
      ]
    },
    "typeDefinitions": {
      "重要性类": {
        "signals": [
          "importance of",
          "crucial",
          "vital",
          "essential",
          "plays a role",
          "should be encouraged"
        ],
        "core_logic": "说明某种能力、品质或意识为什么重要：个人好处 + 社会/未来要求 + 总结建议。",
        "formula": "主题重要性 → 两个原因 → 总结建议"
      },
      "社会现象类": {
        "signals": [
          "more and more people",
          "growing awareness",
          "increasingly aware",
          "begin to realize"
        ],
        "core_logic": "先描述趋势，再分析趋势出现的原因，最后评价或提出支持措施。",
        "formula": "现象出现 → 原因分析 → 趋势评价/建议"
      },
      "问题解决类": {
        "signals": [
          "challenge",
          "problem",
          "danger",
          "gap",
          "anxiety",
          "difficulty"
        ],
        "core_logic": "先指出问题，再分析原因/危害，最后提出解决措施。",
        "formula": "问题是什么 → 原因/危害 → 解决方法"
      },
      "对比平衡类": {
        "signals": [
          "equally important",
          "as much attention as",
          "both",
          "while",
          "not only ... but also"
        ],
        "core_logic": "强调两个对象都重要，分别说明价值，最后呼吁平衡发展。",
        "formula": "A重要+B也重要 → 分别解释 → 平衡发展"
      }
    },
    "themeGroups": {
      "学习成长类": [
        "independent learning ability",
        "learn how to learn",
        "basic knowledge",
        "learning new skills",
        "self-discipline",
        "realistic goals"
      ],
      "数字信息类": [
        "digital literacy",
        "critical thinking",
        "information technology in education",
        "digital gap",
        "information overload"
      ],
      "心理人格类": [
        "mental well-being",
        "appearance anxiety",
        "confidence",
        "freedom to explore",
        "ability to meet challenges"
      ],
      "合作沟通类": [
        "friendly discussion",
        "team spirit",
        "mutual trust",
        "real-world social interaction",
        "communication skills"
      ],
      "社会责任类": [
        "environmentally friendly lifestyle",
        "helping the needy",
        "elderly people's contribution",
        "social practice",
        "public awareness"
      ]
    },
    "appTrainingModules": [
      "真题库",
      "题型识别",
      "关键词提取",
      "三段提纲训练",
      "范文拆解",
      "模板句式库",
      "背诵卡片",
      "迁移训练",
      "限时写作",
      "错题本"
    ],
    "reviewAlgorithmSuggestion": {
      "cardRatings": {
        "again": "5分钟后",
        "hard": "1天后",
        "good": "3天后",
        "easy": "7天后"
      },
      "principles": [
        "主动回忆",
        "间隔重复",
        "交错练习",
        "迁移训练",
        "即时反馈"
      ]
    }
  },
  "questions": [
    {
      "id": "cet6_2024_12_01_independent_learning",
      "sourceYear": 2024,
      "month": "12",
      "set": 1,
      "prompt": "Nowadays, cultivating independent learning ability is becoming increasingly crucial for personal development.",
      "promptCn": "",
      "chineseTitle": "Independent learning ability",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "学习成长类",
      "difficulty": "中等",
      "coreKeywords": [
        "independent learning ability",
        "personal development",
        "academic success",
        "information age",
        "online resources"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明自主学习能力为什么对个人发展重要。",
        "notTask": [
          "不要写成学习方法清单",
          "不要只写老师应该怎么教",
          "不要忽略 personal development"
        ],
        "mustMention": [
          "学习效率",
          "独立解决问题",
          "适应信息时代"
        ],
        "dangerZone": [
          "容易把 independent learning 写成 self-discipline，但二者不完全一样；自主学习强调主动获取知识。"
        ],
        "thinkingSteps": [
          "先找主题词：independent learning ability",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 independent learning ability 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：independent learning ability",
        "thirtySecondReaction": "第一段写重要性；第二段写：提高学习效率并培养独立解决问题能力 + 适应信息时代和丰富学习资源；第三段写：学生主动培养，教师给予指导",
        "sixtySecondOutline": {
          "P1": "引出 independent learning ability，说明它与个人成长/现实社会有关。",
          "P2": "提高学习效率并培养独立解决问题能力；适应信息时代和丰富学习资源；可加入反问或例子。",
          "P3": "学生主动培养，教师给予指导，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 independent learning ability 的重要性。",
          "englishSkeleton": "Nowadays, cultivating independent learning ability is becoming increasingly crucial for personal development. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "提高学习效率并培养独立解决问题能力",
          "reason2": "适应信息时代和丰富学习资源",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why independent learning ability deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 independent learning ability 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, independent learning ability is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2024_12_01_independent_learning_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Independent learning ability has become increasingly important in modern society.",
          "cn": "Independent learning ability 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Independent learning ability"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why independent learning ability deserves our attention.",
          "cn": "independent learning ability 值得关注有几个原因。",
          "replaceableSlots": [
            "independent learning ability"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Independent learning ability helps students improve learning efficiency and solve problems on their own.",
          "cn": "自主学习能力帮助学生提高学习效率并独立解决问题。",
          "replaceableSlots": [
            "Independent learning ability",
            "improve learning efficiency",
            "solve problems on their own"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "It also enables students to make full use of online resources and adapt to the information age.",
          "cn": "它也使学生能够充分利用网络资源并适应信息时代。",
          "replaceableSlots": [
            "online resources",
            "adapt to the information age"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without independent learning ability, how could young people adapt to the modern world?",
          "cn": "如果没有 independent learning ability，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "independent learning ability",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Students should develop good learning habits, and teachers should offer proper guidance.",
          "cn": "学生应该培养良好的学习习惯，教师也应该给予适当指导。",
          "replaceableSlots": [],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_01_independent_learning_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Independent learning ability is important.",
          "mid": "Independent learning ability plays an important role in students’ growth.",
          "high": "It is widely accepted that Independent learning ability plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Independent learning ability helps students improve learning efficiency and solve problems on their own.",
          "mid": "It also enables students to make full use of online resources and adapt to the information age.",
          "high": "Those equipped with independent learning ability are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Nowadays, cultivating independent learning ability is becoming increasingly crucial for personal development. In today’s rapidly changing society, students cannot depend only on classroom instruction. They need to acquire knowledge actively and manage their own learning process.\n\nThere are several reasons why independent learning ability deserves our attention. First, it helps students improve learning efficiency and solve problems on their own when they meet difficulties in study. Moreover, with a wealth of online courses and learning materials available, students with this ability can make better use of resources and keep improving themselves. Without it, how could young people adapt to the information age?\n\nIn conclusion, independent learning ability is of great value to students’ academic success and future development. Students should form good learning habits, and teachers should provide proper guidance. Only in this way can students become better prepared for the future.",
        "wordCountApprox": 143,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Nowadays, cultivating independent learning ability is becoming increasingly crucial for personal development.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 independent learning ability，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "independent learning ability",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 independent learning ability。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "independent learning ability",
            "提高学习效率并培养独立解决问题能力",
            "适应信息时代和丰富学习资源",
            "学生主动培养，教师给予指导"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "learn how to learn",
            "self-discipline",
            "lifelong learning",
            "learning new skills"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“independent learning ability 值得关注有几个原因。”",
          "answer": "There are several reasons why independent learning ability deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2024_12_01_independent_learning",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "independent learning ability",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2024_12_01_independent_learning",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "学生应该培养良好的学习习惯，教师也应该给予适当指导。",
          "answer": "Students should develop good learning habits, and teachers should offer proper guidance.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2024_12_01_independent_learning",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Independent learning ability is important.",
          "answer": "It is widely accepted that Independent learning ability plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2024_12_01_independent_learning",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 independent learning ability，年轻人怎么适应现代世界？",
          "answer": "Without independent learning ability, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2024_12_01_independent_learning",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "learn how to learn",
          "self-discipline",
          "lifelong learning",
          "learning new skills"
        ],
        "sharedReasons": [
          "提高学习效率并培养独立解决问题能力",
          "适应信息时代和丰富学习资源"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 independent learning ability 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "把题目写成自律的重要性",
          "whyWrong": "自主学习更强调主动学习和获取知识，自律只是其中一个品质。",
          "fix": "第二段必须出现 acquire knowledge / online resources / learning efficiency。"
        },
        {
          "mistake": "只写老师应该教学生",
          "whyWrong": "题目主体是 cultivating independent learning ability，不是教学方法。",
          "fix": "重点写学生自身能力。"
        },
        {
          "mistake": "independent learning ability 后面动词单复数混乱",
          "whyWrong": "ability 是单数。",
          "fix": "写 ability helps / plays。"
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 independent learning ability 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2024_12_02_digital_literacy",
      "sourceYear": 2024,
      "month": "12",
      "set": 2,
      "prompt": "There is a growing awareness of the importance of digital literacy and skills in today's world.",
      "promptCn": "",
      "chineseTitle": "Digital literacy and skills",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "数字信息类",
      "difficulty": "中等",
      "coreKeywords": [
        "digital literacy",
        "digital skills",
        "information age",
        "technology",
        "false information"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明数字素养和数字技能在当今世界为什么重要。",
        "notTask": [
          "不要只写互联网的好处",
          "不要写成玩手机利弊",
          "不要忽略 literacy 表示能力和素养"
        ],
        "mustMention": [
          "获取信息",
          "提高效率",
          "辨别真假信息",
          "适应数字时代"
        ],
        "dangerZone": [
          "digital literacy 不是 digital devices；它包括获取、判断、使用数字信息的能力。"
        ],
        "thinkingSteps": [
          "先找主题词：digital literacy",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 digital literacy 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：digital literacy",
        "thirtySecondReaction": "第一段写重要性；第二段写：获取有用信息并提高学习效率 + 辨别虚假信息并适应数字时代；第三段写：学校和学生共同培养数字素养",
        "sixtySecondOutline": {
          "P1": "引出 digital literacy，说明它与个人成长/现实社会有关。",
          "P2": "获取有用信息并提高学习效率；辨别虚假信息并适应数字时代；可加入反问或例子。",
          "P3": "学校和学生共同培养数字素养，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 digital literacy 的重要性。",
          "englishSkeleton": "There is a growing awareness of the importance of digital literacy and skills in today's world. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "获取有用信息并提高学习效率",
          "reason2": "辨别虚假信息并适应数字时代",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why digital literacy deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 digital literacy 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, digital literacy is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "数字信息类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2024_12_02_digital_literacy_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Digital literacy and skills has become increasingly important in modern society.",
          "cn": "Digital literacy and skills 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Digital literacy and skills"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why digital literacy deserves our attention.",
          "cn": "digital literacy 值得关注有几个原因。",
          "replaceableSlots": [
            "digital literacy"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Digital literacy helps students access useful information and improve learning efficiency.",
          "cn": "数字素养帮助学生获取有用信息并提高学习效率。",
          "replaceableSlots": [
            "Digital literacy",
            "access useful information",
            "improve learning efficiency"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "It enables young people to distinguish facts from false information and adapt to the digital age.",
          "cn": "它使年轻人能够辨别事实与虚假信息，并适应数字时代。",
          "replaceableSlots": [
            "distinguish facts from false information",
            "adapt to the digital age"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without digital literacy, how could young people adapt to the modern world?",
          "cn": "如果没有 digital literacy，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "digital literacy",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Schools should provide proper guidance, and students should use digital tools wisely.",
          "cn": "学校应提供适当指导，学生也应理性使用数字工具。",
          "replaceableSlots": [],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_02_digital_literacy_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Digital literacy and skills is important.",
          "mid": "Digital literacy and skills plays an important role in students’ growth.",
          "high": "It is widely accepted that Digital literacy and skills plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Digital literacy helps students access useful information and improve learning efficiency.",
          "mid": "It enables young people to distinguish facts from false information and adapt to the digital age.",
          "high": "Those equipped with digital literacy are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "There is a growing awareness of the importance of digital literacy and skills in today's world. In an age when technology is developing rapidly, digital literacy has become a basic ability for study, work and daily life.\n\nThere are several reasons why digital literacy deserves our attention. To begin with, it helps students access useful information, use online learning tools and improve their learning efficiency. Moreover, the Internet is full of both valuable knowledge and misleading messages. With digital literacy, young people can distinguish facts from false information and make rational choices.\n\nIn conclusion, digital literacy is essential in the information age. Schools should provide guidance, and students should learn to use digital tools wisely. Only in this way can they adapt to the digital world.",
        "wordCountApprox": 126,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？There is a growing awareness of the importance of digital literacy and skills in today's world.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 digital literacy，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "digital literacy",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 digital literacy。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "digital literacy",
            "获取有用信息并提高学习效率",
            "辨别虚假信息并适应数字时代",
            "学校和学生共同培养数字素养"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "critical thinking",
            "online learning",
            "information technology in education",
            "digital gap"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“digital literacy 值得关注有几个原因。”",
          "answer": "There are several reasons why digital literacy deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2024_12_02_digital_literacy",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "digital literacy",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2024_12_02_digital_literacy",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "学校应提供适当指导，学生也应理性使用数字工具。",
          "answer": "Schools should provide proper guidance, and students should use digital tools wisely.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2024_12_02_digital_literacy",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Digital literacy and skills is important.",
          "answer": "It is widely accepted that Digital literacy and skills plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2024_12_02_digital_literacy",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 digital literacy，年轻人怎么适应现代世界？",
          "answer": "Without digital literacy, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2024_12_02_digital_literacy",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "critical thinking",
          "online learning",
          "information technology in education",
          "digital gap"
        ],
        "sharedReasons": [
          "获取有用信息并提高学习效率",
          "辨别虚假信息并适应数字时代"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 digital literacy 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只写 Internet is convenient",
          "whyWrong": "题目问 digital literacy，不是互联网本身。",
          "fix": "写 access information / distinguish false information / use digital tools wisely。"
        },
        {
          "mistake": "digital literacy play",
          "whyWrong": "digital literacy 是单数概念。",
          "fix": "digital literacy plays。"
        },
        {
          "mistake": "把 digital skills 写成 playing games",
          "whyWrong": "数字技能是学习、工作、生活技能，不是娱乐。",
          "fix": "用 online courses, search engines, digital tools 等表达。"
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 digital literacy 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2024_12_03_social_practice_academic_learning",
      "sourceYear": 2024,
      "month": "12",
      "set": 3,
      "prompt": "Nowadays more and more college students have come to realize social practice and academic learning are equally important.",
      "promptCn": "",
      "chineseTitle": "Social practice and academic learning",
      "type": "对比平衡类",
      "typeSignals": [
        "equally important",
        "as much attention as",
        "both",
        "while",
        "not only ... but also"
      ],
      "themeGroup": "学习成长类",
      "difficulty": "中等",
      "coreKeywords": [
        "social practice",
        "academic learning",
        "equally important",
        "theory",
        "practice"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明社会实践和学术学习为什么同样重要。",
        "notTask": [
          "不要只写社会实践",
          "不要只写学习成绩",
          "不要把 equally important 写丢"
        ],
        "mustMention": [
          "理论知识",
          "实践应用",
          "平衡发展"
        ],
        "dangerZone": [
          "这是一道典型 A+B 平衡题，必须两边都写。"
        ],
        "thinkingSteps": [
          "先找主题词：social practice",
          "再看任务信号：equally important, as much attention as, both",
          "判断题型：对比平衡类",
          "第一段：围绕 social practice 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：对比平衡类；主题：social practice",
        "thirtySecondReaction": "第一段写重要性；第二段写：学术学习提供理论基础 + 社会实践帮助应用知识并提升实践能力；第三段写：学生应平衡理论与实践",
        "sixtySecondOutline": {
          "P1": "引出 social practice，说明它与个人成长/现实社会有关。",
          "P2": "学术学习提供理论基础；社会实践帮助应用知识并提升实践能力；可加入反问或例子。",
          "P3": "学生应平衡理论与实践，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 social practice 的重要性。",
          "englishSkeleton": "Nowadays more and more college students have come to realize social practice and academic learning are equally important. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "学术学习提供理论基础",
          "reason2": "社会实践帮助应用知识并提升实践能力",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why social practice deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 social practice 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, social practice is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, people have come to realize that ______ and ______ are equally important.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "对比平衡类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "The value of both sides can be explained from two aspects.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "对比平衡类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, a balanced attitude toward both sides is necessary.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "对比平衡类",
            "学习成长类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Social practice and academic learning has become increasingly important in modern society.",
          "cn": "Social practice and academic learning 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Social practice and academic learning"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why social practice deserves our attention.",
          "cn": "social practice 值得关注有几个原因。",
          "replaceableSlots": [
            "social practice"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Academic learning provides students with theoretical knowledge and a solid foundation.",
          "cn": "学术学习为学生提供理论知识和坚实基础。",
          "replaceableSlots": [
            "Academic learning",
            "theoretical knowledge",
            "solid foundation"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Social practice enables students to apply what they have learned to real-life situations.",
          "cn": "社会实践使学生能够把所学知识应用到现实情境中。",
          "replaceableSlots": [
            "Social practice",
            "apply what they have learned",
            "real-life situations"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without social practice, how could young people adapt to the modern world?",
          "cn": "如果没有 social practice，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "social practice",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "College students should keep a balance between academic learning and social practice.",
          "cn": "大学生应该在学术学习和社会实践之间保持平衡。",
          "replaceableSlots": [],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2024_12_03_social_practice_academic_learning_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Social practice and academic learning is important.",
          "mid": "Social practice and academic learning plays an important role in students’ growth.",
          "high": "It is widely accepted that Social practice and academic learning plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Academic learning provides students with theoretical knowledge and a solid foundation.",
          "mid": "Social practice enables students to apply what they have learned to real-life situations.",
          "high": "Those equipped with social practice are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Nowadays more and more college students have come to realize social practice and academic learning are equally important. Academic learning helps students build knowledge, while social practice allows them to understand society and develop practical abilities.\n\nThe value of both sides can be explained clearly. On the one hand, academic learning provides theoretical knowledge and helps students understand complex problems. On the other hand, social practice enables them to apply knowledge to real-life situations and develop communication, teamwork and problem-solving skills.\n\nIn conclusion, college students should not separate academic learning from social practice. Schools should create more opportunities for students to combine theory with practice. Only in this way can students achieve all-round development.",
        "wordCountApprox": 117,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Nowadays more and more college students have come to realize social practice and academic learning are equally important.",
          "answer": "对比平衡类",
          "distractors": [
            "重要性类",
            "社会现象类",
            "问题解决类"
          ],
          "explanation": "因为题目核心是 social practice，并且题干信号符合 对比平衡类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "social practice",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 social practice。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "social practice",
            "学术学习提供理论基础",
            "社会实践帮助应用知识并提升实践能力",
            "学生应平衡理论与实践"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "practical ability",
            "internships",
            "volunteer work",
            "learning by doing"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“social practice 值得关注有几个原因。”",
          "answer": "There are several reasons why social practice deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2024_12_03_social_practice_academic_learning",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "social practice",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2024_12_03_social_practice_academic_learning",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "大学生应该在学术学习和社会实践之间保持平衡。",
          "answer": "College students should keep a balance between academic learning and social practice.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2024_12_03_social_practice_academic_learning",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Social practice and academic learning is important.",
          "answer": "It is widely accepted that Social practice and academic learning plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2024_12_03_social_practice_academic_learning",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 social practice，年轻人怎么适应现代世界？",
          "answer": "Without social practice, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2024_12_03_social_practice_academic_learning",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "practical ability",
          "internships",
          "volunteer work",
          "learning by doing"
        ],
        "sharedReasons": [
          "学术学习提供理论基础",
          "社会实践帮助应用知识并提升实践能力"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 social practice 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只写 social practice",
          "whyWrong": "题目说 equally important，必须写 academic learning。",
          "fix": "用 On the one hand / On the other hand。"
        },
        {
          "mistake": "把 academic learning 等同于 exam scores",
          "whyWrong": "学术学习是理论知识和学科基础，不只是成绩。",
          "fix": "用 theoretical knowledge / solid foundation。"
        },
        {
          "mistake": "没有写平衡",
          "whyWrong": "对比平衡类结尾必须回到 balance。",
          "fix": "结尾写 keep a balance between A and B。"
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 social practice 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_12_01_elderly_contribution",
      "sourceYear": 2023,
      "month": "12",
      "set": 1,
      "prompt": "With their valuable skills and experience, elderly people can continue to make significant contributions to society.",
      "promptCn": "",
      "chineseTitle": "Elderly people’s contribution",
      "type": "社会现象类",
      "typeSignals": [
        "more and more people",
        "growing awareness",
        "increasingly aware",
        "begin to realize"
      ],
      "themeGroup": "社会责任类",
      "difficulty": "中等",
      "coreKeywords": [
        "elderly people",
        "valuable skills",
        "experience",
        "contributions to society",
        "younger generations"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明老年人如何凭借经验和技能继续为社会做贡献。",
        "notTask": [
          "不要把文章写成老龄化负担",
          "不要只写养老问题",
          "不要忽视 skills and experience"
        ],
        "mustMention": [
          "经验智慧",
          "专业指导",
          "文化传承",
          "社会尊重"
        ],
        "dangerZone": [
          "这题重点是老年人的积极价值，不是老龄化危机。"
        ],
        "thinkingSteps": [
          "先找主题词：elderly people",
          "再看任务信号：more and more people, growing awareness, increasingly aware",
          "判断题型：社会现象类",
          "第一段：围绕 elderly people 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：社会现象类；主题：elderly people",
        "thirtySecondReaction": "第一段写重要性；第二段写：老年人拥有丰富经验，可以指导年轻人 + 老年人能传承文化和专业知识；第三段写：社会应尊重并创造参与机会",
        "sixtySecondOutline": {
          "P1": "引出 elderly people，说明它与个人成长/现实社会有关。",
          "P2": "老年人拥有丰富经验，可以指导年轻人；老年人能传承文化和专业知识；可加入反问或例子。",
          "P3": "社会应尊重并创造参与机会，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 elderly people 的重要性。",
          "englishSkeleton": "With their valuable skills and experience, elderly people can continue to make significant contributions to society. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "老年人拥有丰富经验，可以指导年轻人",
          "reason2": "老年人能传承文化和专业知识",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why elderly people deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 elderly people 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, elderly people is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "In recent years, more and more people have begun to realize the significance of ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "Several factors can account for this social tendency.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, this trend deserves our attention and support.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_12_01_elderly_contribution_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Elderly people’s contribution has become increasingly important in modern society.",
          "cn": "Elderly people’s contribution 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Elderly people’s contribution"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why elderly people deserves our attention.",
          "cn": "elderly people 值得关注有几个原因。",
          "replaceableSlots": [
            "elderly people"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Elderly people can provide younger generations with valuable experience and practical guidance.",
          "cn": "老年人可以为年轻一代提供宝贵经验和实践指导。",
          "replaceableSlots": [
            "Elderly people",
            "younger generations",
            "valuable experience"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "They can also pass down cultural values and professional knowledge to society.",
          "cn": "他们还可以向社会传承文化价值和专业知识。",
          "replaceableSlots": [
            "cultural values",
            "professional knowledge"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without elderly people, how could young people adapt to the modern world?",
          "cn": "如果没有 elderly people，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "elderly people",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Society should respect the elderly and create more opportunities for them to contribute.",
          "cn": "社会应尊重老年人，并为他们创造更多贡献机会。",
          "replaceableSlots": [],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_01_elderly_contribution_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Elderly people’s contribution is important.",
          "mid": "Elderly people’s contribution plays an important role in students’ growth.",
          "high": "It is widely accepted that Elderly people’s contribution plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Elderly people can provide younger generations with valuable experience and practical guidance.",
          "mid": "They can also pass down cultural values and professional knowledge to society.",
          "high": "Those equipped with elderly people are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "With their valuable skills and experience, elderly people can continue to make significant contributions to society. This idea reminds us that age does not necessarily reduce a person’s social value. Many senior citizens still have wisdom, patience and professional knowledge.\n\nThere are several reasons why their contribution deserves attention. First, elderly people can provide young people with valuable experience and practical guidance. Moreover, they can pass down cultural traditions and professional skills that may otherwise be forgotten. Their wisdom can help families, workplaces and communities make better decisions.\n\nIn conclusion, elderly people remain an important part of society. We should respect their value and create more opportunities for them to participate in social life.",
        "wordCountApprox": 115,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？With their valuable skills and experience, elderly people can continue to make significant contributions to society.",
          "answer": "社会现象类",
          "distractors": [
            "重要性类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 elderly people，并且题干信号符合 社会现象类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "elderly people",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 elderly people。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "elderly people",
            "老年人拥有丰富经验，可以指导年轻人",
            "老年人能传承文化和专业知识",
            "社会应尊重并创造参与机会"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "respect for the elderly",
            "intergenerational communication",
            "lifelong contribution"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“elderly people 值得关注有几个原因。”",
          "answer": "There are several reasons why elderly people deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_12_01_elderly_contribution",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "elderly people",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_12_01_elderly_contribution",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "社会应尊重老年人，并为他们创造更多贡献机会。",
          "answer": "Society should respect the elderly and create more opportunities for them to contribute.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_12_01_elderly_contribution",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Elderly people’s contribution is important.",
          "answer": "It is widely accepted that Elderly people’s contribution plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_12_01_elderly_contribution",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 elderly people，年轻人怎么适应现代世界？",
          "answer": "Without elderly people, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_12_01_elderly_contribution",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "respect for the elderly",
          "intergenerational communication",
          "lifelong contribution"
        ],
        "sharedReasons": [
          "老年人拥有丰富经验，可以指导年轻人",
          "老年人能传承文化和专业知识"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 elderly people 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 elderly people 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 elderly people 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_12_02_freedom_to_explore",
      "sourceYear": 2023,
      "month": "12",
      "set": 2,
      "prompt": "Nowadays parents are increasingly aware that allowing kids more freedom to explore and learn on their own helps foster their independence and boost their confidence.",
      "promptCn": "",
      "chineseTitle": "Freedom to explore",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "心理人格类",
      "difficulty": "中等",
      "coreKeywords": [
        "freedom to explore",
        "learn on their own",
        "independence",
        "confidence",
        "family education"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明给孩子更多自由探索为什么有助于独立和自信。",
        "notTask": [
          "不要写成完全放任孩子",
          "不要忽略 parents 的角色",
          "不要只写学习成绩"
        ],
        "mustMention": [
          "独立性",
          "决策能力",
          "自信心",
          "适当指导"
        ],
        "dangerZone": [
          "freedom 不是 no guidance；要写 proper freedom + proper guidance。"
        ],
        "thinkingSteps": [
          "先找主题词：freedom to explore",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 freedom to explore 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：freedom to explore",
        "thirtySecondReaction": "第一段写重要性；第二段写：自由探索培养独立性和决策能力 + 被信任能增强自尊和自信；第三段写：父母避免过度保护并适当引导",
        "sixtySecondOutline": {
          "P1": "引出 freedom to explore，说明它与个人成长/现实社会有关。",
          "P2": "自由探索培养独立性和决策能力；被信任能增强自尊和自信；可加入反问或例子。",
          "P3": "父母避免过度保护并适当引导，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 freedom to explore 的重要性。",
          "englishSkeleton": "Nowadays parents are increasingly aware that allowing kids more freedom to explore and learn on their own helps foster their independence and boost their confidence. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "自由探索培养独立性和决策能力",
          "reason2": "被信任能增强自尊和自信",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why freedom to explore deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 freedom to explore 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, freedom to explore is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "心理人格类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "心理人格类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "心理人格类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Freedom to explore has become increasingly important in modern society.",
          "cn": "Freedom to explore 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Freedom to explore"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why freedom to explore deserves our attention.",
          "cn": "freedom to explore 值得关注有几个原因。",
          "replaceableSlots": [
            "freedom to explore"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Proper freedom allows children to develop independence and decision-making skills.",
          "cn": "适当自由能让孩子培养独立性和决策能力。",
          "replaceableSlots": [
            "Proper freedom",
            "independence",
            "decision-making skills"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "When children are trusted to make choices, they are more likely to build self-confidence.",
          "cn": "当孩子被信任去做选择时，他们更容易建立自信。",
          "replaceableSlots": [
            "trusted",
            "make choices",
            "self-confidence"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without freedom to explore, how could young people adapt to the modern world?",
          "cn": "如果没有 freedom to explore，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "freedom to explore",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Parents should avoid overprotection and offer proper guidance when necessary.",
          "cn": "父母应避免过度保护，并在必要时给予适当指导。",
          "replaceableSlots": [],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_02_freedom_to_explore_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Freedom to explore is important.",
          "mid": "Freedom to explore plays an important role in students’ growth.",
          "high": "It is widely accepted that Freedom to explore plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Proper freedom allows children to develop independence and decision-making skills.",
          "mid": "When children are trusted to make choices, they are more likely to build self-confidence.",
          "high": "Those equipped with freedom to explore are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Nowadays parents are increasingly aware that allowing kids more freedom to explore and learn on their own helps foster their independence and boost their confidence. This view reflects a healthier understanding of family education. Children need space to explore the world and learn from their own experience.\n\nThere are several reasons why this approach matters. First, proper freedom allows children to handle problems by themselves and develop decision-making skills. Moreover, when children are trusted to choose their interests and solve small problems, they can build confidence and become more willing to face future challenges.\n\nIn conclusion, parents should not protect children from every difficulty. Instead, they should offer both freedom and guidance so that children can grow into independent and confident individuals.",
        "wordCountApprox": 123,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Nowadays parents are increasingly aware that allowing kids more freedom to explore and learn on their own helps foster their independence and boost their confidence.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 freedom to explore，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "freedom to explore",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 freedom to explore。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "freedom to explore",
            "自由探索培养独立性和决策能力",
            "被信任能增强自尊和自信",
            "父母避免过度保护并适当引导"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "independent learning",
            "self-confidence",
            "family education",
            "decision-making ability"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“freedom to explore 值得关注有几个原因。”",
          "answer": "There are several reasons why freedom to explore deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_12_02_freedom_to_explore",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "freedom to explore",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_12_02_freedom_to_explore",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "父母应避免过度保护，并在必要时给予适当指导。",
          "answer": "Parents should avoid overprotection and offer proper guidance when necessary.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_12_02_freedom_to_explore",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Freedom to explore is important.",
          "answer": "It is widely accepted that Freedom to explore plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_12_02_freedom_to_explore",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 freedom to explore，年轻人怎么适应现代世界？",
          "answer": "Without freedom to explore, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_12_02_freedom_to_explore",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "independent learning",
          "self-confidence",
          "family education",
          "decision-making ability"
        ],
        "sharedReasons": [
          "自由探索培养独立性和决策能力",
          "被信任能增强自尊和自信"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 freedom to explore 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 freedom to explore 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 freedom to explore 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_12_03_basic_knowledge",
      "sourceYear": 2023,
      "month": "12",
      "set": 3,
      "prompt": "As is known to all, gaining a sound knowledge of the basics is of vital importance for students to master an academic subject.",
      "promptCn": "",
      "chineseTitle": "Basic knowledge",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "学习成长类",
      "difficulty": "较低",
      "coreKeywords": [
        "basic knowledge",
        "foundation",
        "academic subject",
        "advanced concepts",
        "problem-solving"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明扎实基础知识为什么对掌握学科重要。",
        "notTask": [
          "不要只喊口号说基础重要",
          "不要写成背书方法",
          "不要忽略 master an academic subject"
        ],
        "mustMention": [
          "基础像地基",
          "理解高级知识",
          "解决复杂问题"
        ],
        "dangerZone": [
          "这题非常适合用 foundation metaphor。"
        ],
        "thinkingSteps": [
          "先找主题词：basic knowledge",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 basic knowledge 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：basic knowledge",
        "thirtySecondReaction": "第一段写重要性；第二段写：基础知识帮助理解高级概念 + 扎实基础提高解决问题能力；第三段写：学生和老师都要重视打基础",
        "sixtySecondOutline": {
          "P1": "引出 basic knowledge，说明它与个人成长/现实社会有关。",
          "P2": "基础知识帮助理解高级概念；扎实基础提高解决问题能力；可加入反问或例子。",
          "P3": "学生和老师都要重视打基础，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 basic knowledge 的重要性。",
          "englishSkeleton": "As is known to all, gaining a sound knowledge of the basics is of vital importance for students to master an academic subject. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "基础知识帮助理解高级概念",
          "reason2": "扎实基础提高解决问题能力",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why basic knowledge deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 basic knowledge 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, basic knowledge is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_12_03_basic_knowledge_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Basic knowledge has become increasingly important in modern society.",
          "cn": "Basic knowledge 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Basic knowledge"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why basic knowledge deserves our attention.",
          "cn": "basic knowledge 值得关注有几个原因。",
          "replaceableSlots": [
            "basic knowledge"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Basic knowledge helps students understand advanced concepts more easily.",
          "cn": "基础知识帮助学生更容易理解高级概念。",
          "replaceableSlots": [
            "Basic knowledge",
            "advanced concepts"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "A solid foundation also improves students’ ability to solve complex problems.",
          "cn": "扎实的基础也能提高学生解决复杂问题的能力。",
          "replaceableSlots": [
            "solid foundation",
            "solve complex problems"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without basic knowledge, how could young people adapt to the modern world?",
          "cn": "如果没有 basic knowledge，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "basic knowledge",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Students should attach importance to the basics, and teachers should guide them patiently.",
          "cn": "学生应重视基础，老师也应耐心引导。",
          "replaceableSlots": [],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_12_03_basic_knowledge_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Basic knowledge is important.",
          "mid": "Basic knowledge plays an important role in students’ growth.",
          "high": "It is widely accepted that Basic knowledge plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Basic knowledge helps students understand advanced concepts more easily.",
          "mid": "A solid foundation also improves students’ ability to solve complex problems.",
          "high": "Those equipped with basic knowledge are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "As is known to all, gaining a sound knowledge of the basics is of vital importance for students to master an academic subject. A subject is like a building, and the basics are its foundation. Without a strong foundation, further learning can hardly be successful.\n\nThere are several reasons why basic knowledge deserves attention. First, it helps students understand advanced concepts more easily and build a complete knowledge system. Moreover, a solid foundation improves students’ ability to solve complex problems. When they meet difficult tasks, they can return to basic principles and find solutions.\n\nIn conclusion, basic knowledge is essential for academic success. Students should spend enough time on the basics, and teachers should guide them patiently.",
        "wordCountApprox": 117,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？As is known to all, gaining a sound knowledge of the basics is of vital importance for students to master an academic subject.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 basic knowledge，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "basic knowledge",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 basic knowledge。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "basic knowledge",
            "基础知识帮助理解高级概念",
            "扎实基础提高解决问题能力",
            "学生和老师都要重视打基础"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "academic learning",
            "problem-solving ability",
            "learning efficiency",
            "lifelong learning"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“basic knowledge 值得关注有几个原因。”",
          "answer": "There are several reasons why basic knowledge deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_12_03_basic_knowledge",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "basic knowledge",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_12_03_basic_knowledge",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "学生应重视基础，老师也应耐心引导。",
          "answer": "Students should attach importance to the basics, and teachers should guide them patiently.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_12_03_basic_knowledge",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Basic knowledge is important.",
          "answer": "It is widely accepted that Basic knowledge plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_12_03_basic_knowledge",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 basic knowledge，年轻人怎么适应现代世界？",
          "answer": "Without basic knowledge, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_12_03_basic_knowledge",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "academic learning",
          "problem-solving ability",
          "learning efficiency",
          "lifelong learning"
        ],
        "sharedReasons": [
          "基础知识帮助理解高级概念",
          "扎实基础提高解决问题能力"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 basic knowledge 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 basic knowledge 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 basic knowledge 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_06_01_mental_wellbeing",
      "sourceYear": 2023,
      "month": "06",
      "set": 1,
      "prompt": "Today there is a growing awareness that mental well-being needs to be given as much attention as physical health.",
      "promptCn": "",
      "chineseTitle": "Mental well-being",
      "type": "对比平衡类",
      "typeSignals": [
        "equally important",
        "as much attention as",
        "both",
        "while",
        "not only ... but also"
      ],
      "themeGroup": "心理人格类",
      "difficulty": "中等",
      "coreKeywords": [
        "mental well-being",
        "physical health",
        "pressure",
        "anxiety",
        "quality of life"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明心理健康应像身体健康一样受到重视。",
        "notTask": [
          "不要只写身体健康",
          "不要把 mental well-being 写成 happiness",
          "不要忽视 as much attention as"
        ],
        "mustMention": [
          "压力",
          "焦虑",
          "学习生活质量",
          "平衡关注"
        ],
        "dangerZone": [
          "心理健康不是简单快乐，而是面对压力、稳定生活的能力。"
        ],
        "thinkingSteps": [
          "先找主题词：mental well-being",
          "再看任务信号：equally important, as much attention as, both",
          "判断题型：对比平衡类",
          "第一段：围绕 mental well-being 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：对比平衡类；主题：mental well-being",
        "thirtySecondReaction": "第一段写重要性；第二段写：心理健康影响学习表现和生活质量 + 良好心理状态帮助应对压力；第三段写：家庭学校个人共同重视心理健康",
        "sixtySecondOutline": {
          "P1": "引出 mental well-being，说明它与个人成长/现实社会有关。",
          "P2": "心理健康影响学习表现和生活质量；良好心理状态帮助应对压力；可加入反问或例子。",
          "P3": "家庭学校个人共同重视心理健康，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 mental well-being 的重要性。",
          "englishSkeleton": "Today there is a growing awareness that mental well-being needs to be given as much attention as physical health. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "心理健康影响学习表现和生活质量",
          "reason2": "良好心理状态帮助应对压力",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why mental well-being deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 mental well-being 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, mental well-being is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, people have come to realize that ______ and ______ are equally important.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "对比平衡类",
            "心理人格类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "The value of both sides can be explained from two aspects.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "对比平衡类",
            "心理人格类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, a balanced attitude toward both sides is necessary.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "对比平衡类",
            "心理人格类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Mental well-being has become increasingly important in modern society.",
          "cn": "Mental well-being 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Mental well-being"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why mental well-being deserves our attention.",
          "cn": "mental well-being 值得关注有几个原因。",
          "replaceableSlots": [
            "mental well-being"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Mental health is closely related to students’ academic performance and quality of life.",
          "cn": "心理健康与学生的学业表现和生活质量密切相关。",
          "replaceableSlots": [
            "Mental health",
            "academic performance",
            "quality of life"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "A healthy mind enables students to deal with pressure and challenges more effectively.",
          "cn": "健康的心理状态使学生能更有效地应对压力和挑战。",
          "replaceableSlots": [
            "healthy mind",
            "pressure and challenges"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without mental well-being, how could young people adapt to the modern world?",
          "cn": "如果没有 mental well-being，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "mental well-being",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Families, schools and individuals should all pay more attention to mental well-being.",
          "cn": "家庭、学校和个人都应更加重视心理健康。",
          "replaceableSlots": [],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_01_mental_wellbeing_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Mental well-being is important.",
          "mid": "Mental well-being plays an important role in students’ growth.",
          "high": "It is widely accepted that Mental well-being plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Mental health is closely related to students’ academic performance and quality of life.",
          "mid": "A healthy mind enables students to deal with pressure and challenges more effectively.",
          "high": "Those equipped with mental well-being are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Today there is a growing awareness that mental well-being needs to be given as much attention as physical health. In a society full of competition and pressure, students need not only a strong body but also a healthy mind.\n\nThe value of both sides can be explained from two aspects. On the one hand, mental health is closely related to academic performance and quality of life. On the other hand, a healthy mind helps students deal with stress, anxiety and challenges. Without mental well-being, even a physically healthy person may find it hard to live a balanced life.\n\nIn conclusion, mental well-being deserves as much attention as physical health. Families and schools should provide support, and students should learn to manage pressure in a positive way.",
        "wordCountApprox": 129,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Today there is a growing awareness that mental well-being needs to be given as much attention as physical health.",
          "answer": "对比平衡类",
          "distractors": [
            "重要性类",
            "社会现象类",
            "问题解决类"
          ],
          "explanation": "因为题目核心是 mental well-being，并且题干信号符合 对比平衡类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "mental well-being",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 mental well-being。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "mental well-being",
            "心理健康影响学习表现和生活质量",
            "良好心理状态帮助应对压力",
            "家庭学校个人共同重视心理健康"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "appearance anxiety",
            "positive attitude",
            "ability to meet challenges",
            "pressure management"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“mental well-being 值得关注有几个原因。”",
          "answer": "There are several reasons why mental well-being deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_06_01_mental_wellbeing",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "mental well-being",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_06_01_mental_wellbeing",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "家庭、学校和个人都应更加重视心理健康。",
          "answer": "Families, schools and individuals should all pay more attention to mental well-being.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_06_01_mental_wellbeing",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Mental well-being is important.",
          "answer": "It is widely accepted that Mental well-being plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_06_01_mental_wellbeing",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 mental well-being，年轻人怎么适应现代世界？",
          "answer": "Without mental well-being, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_06_01_mental_wellbeing",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "appearance anxiety",
          "positive attitude",
          "ability to meet challenges",
          "pressure management"
        ],
        "sharedReasons": [
          "心理健康影响学习表现和生活质量",
          "良好心理状态帮助应对压力"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 mental well-being 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 mental well-being 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 mental well-being 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_06_02_friendly_discussion",
      "sourceYear": 2023,
      "month": "06",
      "set": 2,
      "prompt": "When faced with differing opinions, we should try to reach agreement through friendly discussion and reasonable argument.",
      "promptCn": "",
      "chineseTitle": "Friendly discussion and reasonable argument",
      "type": "方法建议类",
      "typeSignals": [],
      "themeGroup": "合作沟通类",
      "difficulty": "中等",
      "coreKeywords": [
        "differing opinions",
        "friendly discussion",
        "reasonable argument",
        "agreement",
        "evidence and logic"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明面对不同意见时，为什么要通过友好讨论和合理争论达成一致。",
        "notTask": [
          "不要写成吵架",
          "不要只写 agree with others",
          "不要忽略 evidence and logic"
        ],
        "mustMention": [
          "理解尊重",
          "证据逻辑",
          "达成共识",
          "社会和谐"
        ],
        "dangerZone": [
          "argument 在这里是理性论证，不是 quarrel。"
        ],
        "thinkingSteps": [
          "先找主题词：differing opinions",
          "再看任务信号：题目首句给出写作方向",
          "判断题型：方法建议类",
          "第一段：围绕 differing opinions 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：方法建议类；主题：differing opinions",
        "thirtySecondReaction": "第一段写重要性；第二段写：友好讨论促进理解和尊重 + 合理论证基于证据和逻辑；第三段写：个人和社会应培养理性沟通意识",
        "sixtySecondOutline": {
          "P1": "引出 differing opinions，说明它与个人成长/现实社会有关。",
          "P2": "友好讨论促进理解和尊重；合理论证基于证据和逻辑；可加入反问或例子。",
          "P3": "个人和社会应培养理性沟通意识，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 differing opinions 的重要性。",
          "englishSkeleton": "When faced with differing opinions, we should try to reach agreement through friendly discussion and reasonable argument. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "友好讨论促进理解和尊重",
          "reason2": "合理论证基于证据和逻辑",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why differing opinions deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 differing opinions 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, differing opinions is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "方法建议类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "方法建议类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "方法建议类",
            "合作沟通类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_06_02_friendly_discussion_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Friendly discussion and reasonable argument has become increasingly important in modern society.",
          "cn": "Friendly discussion and reasonable argument 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Friendly discussion and reasonable argument"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why differing opinions deserves our attention.",
          "cn": "differing opinions 值得关注有几个原因。",
          "replaceableSlots": [
            "differing opinions"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Friendly discussion helps people understand and respect each other.",
          "cn": "友好讨论帮助人们相互理解和尊重。",
          "replaceableSlots": [
            "Friendly discussion",
            "understand and respect"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Reasonable argument allows people to reach agreement based on evidence and logic.",
          "cn": "合理论证使人们基于证据和逻辑达成一致。",
          "replaceableSlots": [
            "Reasonable argument",
            "evidence and logic"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without differing opinions, how could young people adapt to the modern world?",
          "cn": "如果没有 differing opinions，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "differing opinions",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Individuals should develop the habit of communicating in a rational and respectful way.",
          "cn": "个人应该培养理性、尊重地沟通的习惯。",
          "replaceableSlots": [],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_02_friendly_discussion_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Friendly discussion and reasonable argument is important.",
          "mid": "Friendly discussion and reasonable argument plays an important role in students’ growth.",
          "high": "It is widely accepted that Friendly discussion and reasonable argument plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Friendly discussion helps people understand and respect each other.",
          "mid": "Reasonable argument allows people to reach agreement based on evidence and logic.",
          "high": "Those equipped with differing opinions are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "When faced with differing opinions, we should try to reach agreement through friendly discussion and reasonable argument. In modern society, people often hold different views. The key is not to avoid disagreement, but to handle it properly.\n\nThere are several reasons why this approach matters. First, friendly discussion helps people listen to each other and reduce misunderstanding. Moreover, reasonable argument is based on evidence and logic, so it can make communication more convincing and help people reach agreement.\n\nIn conclusion, friendly discussion and reasonable argument are essential for social harmony. Individuals should learn to communicate rationally and respectfully.",
        "wordCountApprox": 98,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？When faced with differing opinions, we should try to reach agreement through friendly discussion and reasonable argument.",
          "answer": "方法建议类",
          "distractors": [
            "重要性类",
            "社会现象类",
            "问题解决类"
          ],
          "explanation": "因为题目核心是 differing opinions，并且题干信号符合 方法建议类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "differing opinions",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 differing opinions。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "differing opinions",
            "友好讨论促进理解和尊重",
            "合理论证基于证据和逻辑",
            "个人和社会应培养理性沟通意识"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "communication skills",
            "mutual trust",
            "cooperation",
            "social harmony"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“differing opinions 值得关注有几个原因。”",
          "answer": "There are several reasons why differing opinions deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_06_02_friendly_discussion",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "differing opinions",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_06_02_friendly_discussion",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "个人应该培养理性、尊重地沟通的习惯。",
          "answer": "Individuals should develop the habit of communicating in a rational and respectful way.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_06_02_friendly_discussion",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Friendly discussion and reasonable argument is important.",
          "answer": "It is widely accepted that Friendly discussion and reasonable argument plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_06_02_friendly_discussion",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 differing opinions，年轻人怎么适应现代世界？",
          "answer": "Without differing opinions, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_06_02_friendly_discussion",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "communication skills",
          "mutual trust",
          "cooperation",
          "social harmony"
        ],
        "sharedReasons": [
          "友好讨论促进理解和尊重",
          "合理论证基于证据和逻辑"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 differing opinions 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 differing opinions 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 differing opinions 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_06_03_learn_how_to_learn",
      "sourceYear": 2023,
      "month": "06",
      "set": 3,
      "prompt": "It is widely accepted that an important goal of education is to help students learn how to learn.",
      "promptCn": "",
      "chineseTitle": "Learn how to learn",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "学习成长类",
      "difficulty": "中等",
      "coreKeywords": [
        "learn how to learn",
        "education",
        "learning skills",
        "independence",
        "lifelong learning"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明教育为什么要帮助学生学会学习。",
        "notTask": [
          "不要只写 education is important",
          "不要只写老师传授知识",
          "不要忽略 learning skills"
        ],
        "mustMention": [
          "自主获取知识",
          "终身学习",
          "适应变化"
        ],
        "dangerZone": [
          "这题和 independent learning 高度相似，但更强调 education 的目标。"
        ],
        "thinkingSteps": [
          "先找主题词：learn how to learn",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 learn how to learn 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：learn how to learn",
        "thirtySecondReaction": "第一段写重要性；第二段写：学会学习使学生主动获取知识 + 学习能力帮助学生适应变化社会；第三段写：教师应教方法而不只是教知识",
        "sixtySecondOutline": {
          "P1": "引出 learn how to learn，说明它与个人成长/现实社会有关。",
          "P2": "学会学习使学生主动获取知识；学习能力帮助学生适应变化社会；可加入反问或例子。",
          "P3": "教师应教方法而不只是教知识，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 learn how to learn 的重要性。",
          "englishSkeleton": "It is widely accepted that an important goal of education is to help students learn how to learn. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "学会学习使学生主动获取知识",
          "reason2": "学习能力帮助学生适应变化社会",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why learn how to learn deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 learn how to learn 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, learn how to learn is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Learn how to learn has become increasingly important in modern society.",
          "cn": "Learn how to learn 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Learn how to learn"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why learn how to learn deserves our attention.",
          "cn": "learn how to learn 值得关注有几个原因。",
          "replaceableSlots": [
            "learn how to learn"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "The ability to learn enables students to acquire new knowledge independently.",
          "cn": "学习能力使学生能够独立获取新知识。",
          "replaceableSlots": [
            "ability to learn",
            "acquire new knowledge independently"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "It also helps students adapt to a changing society and keep growing throughout life.",
          "cn": "它也帮助学生适应变化中的社会并终身成长。",
          "replaceableSlots": [
            "adapt to a changing society",
            "throughout life"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without learn how to learn, how could young people adapt to the modern world?",
          "cn": "如果没有 learn how to learn，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "learn how to learn",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Teachers should help students develop learning methods instead of merely giving them knowledge.",
          "cn": "教师应帮助学生发展学习方法，而不仅仅是传授知识。",
          "replaceableSlots": [],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_06_03_learn_how_to_learn_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Learn how to learn is important.",
          "mid": "Learn how to learn plays an important role in students’ growth.",
          "high": "It is widely accepted that Learn how to learn plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "The ability to learn enables students to acquire new knowledge independently.",
          "mid": "It also helps students adapt to a changing society and keep growing throughout life.",
          "high": "Those equipped with learn how to learn are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "It is widely accepted that an important goal of education is to help students learn how to learn. Education should not only provide students with knowledge, but also teach them how to acquire knowledge by themselves.\n\nThere are several reasons why learning how to learn deserves attention. First, this ability enables students to acquire new knowledge independently when they face unfamiliar problems. Moreover, knowledge may become outdated in a rapidly changing society, but learning ability can benefit students throughout their lives.\n\nIn conclusion, helping students learn how to learn is an essential goal of education. Teachers should guide students to develop effective learning methods and lifelong learning habits.",
        "wordCountApprox": 108,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？It is widely accepted that an important goal of education is to help students learn how to learn.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 learn how to learn，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "learn how to learn",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 learn how to learn。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "learn how to learn",
            "学会学习使学生主动获取知识",
            "学习能力帮助学生适应变化社会",
            "教师应教方法而不只是教知识"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "independent learning",
            "lifelong learning",
            "learning new skills",
            "self-discipline"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“learn how to learn 值得关注有几个原因。”",
          "answer": "There are several reasons why learn how to learn deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_06_03_learn_how_to_learn",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "learn how to learn",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_06_03_learn_how_to_learn",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "教师应帮助学生发展学习方法，而不仅仅是传授知识。",
          "answer": "Teachers should help students develop learning methods instead of merely giving them knowledge.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_06_03_learn_how_to_learn",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Learn how to learn is important.",
          "answer": "It is widely accepted that Learn how to learn plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_06_03_learn_how_to_learn",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 learn how to learn，年轻人怎么适应现代世界？",
          "answer": "Without learn how to learn, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_06_03_learn_how_to_learn",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "independent learning",
          "lifelong learning",
          "learning new skills",
          "self-discipline"
        ],
        "sharedReasons": [
          "学会学习使学生主动获取知识",
          "学习能力帮助学生适应变化社会"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 learn how to learn 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 learn how to learn 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 learn how to learn 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_03_01_too_many_choices",
      "sourceYear": 2023,
      "month": "03",
      "set": 1,
      "prompt": "People are now increasingly aware of the challenges in making a decision when faced with too many choices.",
      "promptCn": "",
      "chineseTitle": "Too many choices",
      "type": "问题解决类",
      "typeSignals": [
        "challenge",
        "problem",
        "danger",
        "gap",
        "anxiety",
        "difficulty"
      ],
      "themeGroup": "数字信息类",
      "difficulty": "中等",
      "coreKeywords": [
        "too many choices",
        "decision-making",
        "challenges",
        "information overload",
        "rational choices"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明选择过多给决策带来的挑战，以及如何理性应对。",
        "notTask": [
          "不要只写选择多的好处",
          "不要偏离 decision-making",
          "不要忽略 too many"
        ],
        "mustMention": [
          "焦虑困惑",
          "信息过载",
          "理性选择",
          "明确目标"
        ],
        "dangerZone": [
          "这是问题类，不是重要性类。先写问题，再写解决。"
        ],
        "thinkingSteps": [
          "先找主题词：too many choices",
          "再看任务信号：challenge, problem, danger",
          "判断题型：问题解决类",
          "第一段：围绕 too many choices 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：问题解决类；主题：too many choices",
        "thirtySecondReaction": "第一段写重要性；第二段写：选择过多容易让人焦虑和困惑 + 信息过载让人难以做理性判断；第三段写：年轻人应明确目标并理性决策",
        "sixtySecondOutline": {
          "P1": "引出 too many choices，说明它与个人成长/现实社会有关。",
          "P2": "选择过多容易让人焦虑和困惑；信息过载让人难以做理性判断；可加入反问或例子。",
          "P3": "年轻人应明确目标并理性决策，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 too many choices 的重要性。",
          "englishSkeleton": "People are now increasingly aware of the challenges in making a decision when faced with too many choices. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "选择过多容易让人焦虑和困惑",
          "reason2": "信息过载让人难以做理性判断",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why too many choices deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 too many choices 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, too many choices is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "People are now increasingly aware of the challenges caused by ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "问题解决类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons behind this problem.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "问题解决类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "Only through joint efforts can we solve this problem step by step.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "问题解决类",
            "数字信息类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_03_01_too_many_choices_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Too many choices has become increasingly important in modern society.",
          "cn": "Too many choices 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Too many choices"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why too many choices deserves our attention.",
          "cn": "too many choices 值得关注有几个原因。",
          "replaceableSlots": [
            "too many choices"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Too many choices may make people anxious and confused.",
          "cn": "选择过多可能使人焦虑和困惑。",
          "replaceableSlots": [
            "Too many choices",
            "anxious and confused"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Information overload makes it harder for people to make rational decisions.",
          "cn": "信息过载使人更难做出理性决定。",
          "replaceableSlots": [
            "Information overload",
            "rational decisions"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without too many choices, how could young people adapt to the modern world?",
          "cn": "如果没有 too many choices，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "too many choices",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Young people should set clear goals and learn to make rational decisions.",
          "cn": "年轻人应该设定清晰目标，并学会做出理性决定。",
          "replaceableSlots": [],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_01_too_many_choices_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Too many choices is important.",
          "mid": "Too many choices plays an important role in students’ growth.",
          "high": "It is widely accepted that Too many choices plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Too many choices may make people anxious and confused.",
          "mid": "Information overload makes it harder for people to make rational decisions.",
          "high": "Those equipped with too many choices are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "People are now increasingly aware of the challenges in making a decision when faced with too many choices. In modern life, having many choices seems attractive, but it can also make decision-making more difficult.\n\nThere are several reasons behind this problem. First, too many choices may make people anxious and confused because they have to compare different possibilities. Moreover, the Internet provides a huge amount of information, but not all of it is reliable. Information overload can prevent people from making rational choices.\n\nIn conclusion, people should learn to set clear goals and evaluate information carefully. Only in this way can they make wiser decisions in a complex world.",
        "wordCountApprox": 110,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？People are now increasingly aware of the challenges in making a decision when faced with too many choices.",
          "answer": "问题解决类",
          "distractors": [
            "重要性类",
            "社会现象类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 too many choices，并且题干信号符合 问题解决类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "too many choices",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 too many choices。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "too many choices",
            "选择过多容易让人焦虑和困惑",
            "信息过载让人难以做理性判断",
            "年轻人应明确目标并理性决策"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "critical thinking",
            "rational choices",
            "information overload",
            "decision-making ability"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“too many choices 值得关注有几个原因。”",
          "answer": "There are several reasons why too many choices deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_03_01_too_many_choices",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "too many choices",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_03_01_too_many_choices",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "年轻人应该设定清晰目标，并学会做出理性决定。",
          "answer": "Young people should set clear goals and learn to make rational decisions.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_03_01_too_many_choices",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Too many choices is important.",
          "answer": "It is widely accepted that Too many choices plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_03_01_too_many_choices",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 too many choices，年轻人怎么适应现代世界？",
          "answer": "Without too many choices, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_03_01_too_many_choices",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "critical thinking",
          "rational choices",
          "information overload",
          "decision-making ability"
        ],
        "sharedReasons": [
          "选择过多容易让人焦虑和困惑",
          "信息过载让人难以做理性判断"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 too many choices 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 too many choices 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 too many choices 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_03_02_digital_gap_elderly",
      "sourceYear": 2023,
      "month": "03",
      "set": 2,
      "prompt": "People are now increasingly aware of the digital gap or challenges the elderly face in a digital world.",
      "promptCn": "",
      "chineseTitle": "Digital gap among the elderly",
      "type": "问题解决类",
      "typeSignals": [
        "challenge",
        "problem",
        "danger",
        "gap",
        "anxiety",
        "difficulty"
      ],
      "themeGroup": "数字信息类",
      "difficulty": "中等",
      "coreKeywords": [
        "digital gap",
        "elderly people",
        "digital world",
        "smartphones",
        "online payment"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明老年人在数字世界面临的困难，并提出帮助措施。",
        "notTask": [
          "不要只写年轻人数字技能",
          "不要忽略 elderly",
          "不要只写科技发展好处"
        ],
        "mustMention": [
          "数字服务困难",
          "代际差距",
          "政府媒体家庭帮助"
        ],
        "dangerZone": [
          "关键词是 elderly face challenges，必须写困难和解决。"
        ],
        "thinkingSteps": [
          "先找主题词：digital gap",
          "再看任务信号：challenge, problem, danger",
          "判断题型：问题解决类",
          "第一段：围绕 digital gap 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：问题解决类；主题：digital gap",
        "thirtySecondReaction": "第一段写重要性；第二段写：老年人使用数字服务有困难 + 数字能力差距加深代际沟通困难；第三段写：政府媒体家庭共同帮助老年人",
        "sixtySecondOutline": {
          "P1": "引出 digital gap，说明它与个人成长/现实社会有关。",
          "P2": "老年人使用数字服务有困难；数字能力差距加深代际沟通困难；可加入反问或例子。",
          "P3": "政府媒体家庭共同帮助老年人，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 digital gap 的重要性。",
          "englishSkeleton": "People are now increasingly aware of the digital gap or challenges the elderly face in a digital world. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "老年人使用数字服务有困难",
          "reason2": "数字能力差距加深代际沟通困难",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why digital gap deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 digital gap 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, digital gap is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "People are now increasingly aware of the challenges caused by ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "问题解决类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons behind this problem.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "问题解决类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "Only through joint efforts can we solve this problem step by step.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "问题解决类",
            "数字信息类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Digital gap among the elderly has become increasingly important in modern society.",
          "cn": "Digital gap among the elderly 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Digital gap among the elderly"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why digital gap deserves our attention.",
          "cn": "digital gap 值得关注有几个原因。",
          "replaceableSlots": [
            "digital gap"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Many elderly people have difficulty using smartphones, online payment and other digital services.",
          "cn": "许多老年人在使用智能手机、在线支付和其他数字服务时有困难。",
          "replaceableSlots": [
            "elderly people",
            "smartphones",
            "online payment"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "The gap in digital skills may also make communication between generations more difficult.",
          "cn": "数字技能差距也可能让代际沟通更加困难。",
          "replaceableSlots": [
            "digital skills",
            "communication between generations"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without digital gap, how could young people adapt to the modern world?",
          "cn": "如果没有 digital gap，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "digital gap",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "The government, mass media and families should help senior citizens adapt to the digital era.",
          "cn": "政府、媒体和家庭应帮助老年人适应数字时代。",
          "replaceableSlots": [],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_02_digital_gap_elderly_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Digital gap among the elderly is important.",
          "mid": "Digital gap among the elderly plays an important role in students’ growth.",
          "high": "It is widely accepted that Digital gap among the elderly plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Many elderly people have difficulty using smartphones, online payment and other digital services.",
          "mid": "The gap in digital skills may also make communication between generations more difficult.",
          "high": "Those equipped with digital gap are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "People are now increasingly aware of the digital gap or challenges the elderly face in a digital world. The digital world has brought convenience to many people, but it has also created difficulties for some senior citizens.\n\nThere are several reasons behind this problem. First, many elderly people have difficulty using smartphones, online payment and online services. Moreover, young people are usually familiar with digital products, while the elderly may feel left behind. This gap can make communication between generations more difficult.\n\nIn conclusion, joint efforts are needed to help the elderly adapt to the digital era. The government, media and families should provide patient guidance and practical support.",
        "wordCountApprox": 109,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？People are now increasingly aware of the digital gap or challenges the elderly face in a digital world.",
          "answer": "问题解决类",
          "distractors": [
            "重要性类",
            "社会现象类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 digital gap，并且题干信号符合 问题解决类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "digital gap",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 digital gap。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "digital gap",
            "老年人使用数字服务有困难",
            "数字能力差距加深代际沟通困难",
            "政府媒体家庭共同帮助老年人"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "digital literacy",
            "technology and life",
            "elderly care",
            "social inclusion"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“digital gap 值得关注有几个原因。”",
          "answer": "There are several reasons why digital gap deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_03_02_digital_gap_elderly",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "digital gap",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_03_02_digital_gap_elderly",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "政府、媒体和家庭应帮助老年人适应数字时代。",
          "answer": "The government, mass media and families should help senior citizens adapt to the digital era.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_03_02_digital_gap_elderly",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Digital gap among the elderly is important.",
          "answer": "It is widely accepted that Digital gap among the elderly plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_03_02_digital_gap_elderly",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 digital gap，年轻人怎么适应现代世界？",
          "answer": "Without digital gap, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_03_02_digital_gap_elderly",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "digital literacy",
          "technology and life",
          "elderly care",
          "social inclusion"
        ],
        "sharedReasons": [
          "老年人使用数字服务有困难",
          "数字能力差距加深代际沟通困难"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 digital gap 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 digital gap 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 digital gap 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2023_03_03_appearance_anxiety",
      "sourceYear": 2023,
      "month": "03",
      "set": 3,
      "prompt": "People are now increasingly aware of the danger of appearance anxiety or being obsessed with one’s look.",
      "promptCn": "",
      "chineseTitle": "Appearance anxiety",
      "type": "问题解决类",
      "typeSignals": [
        "challenge",
        "problem",
        "danger",
        "gap",
        "anxiety",
        "difficulty"
      ],
      "themeGroup": "心理人格类",
      "difficulty": "中等",
      "coreKeywords": [
        "appearance anxiety",
        "look",
        "social media",
        "mental health",
        "inner beauty"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明外貌焦虑的危害、原因和应对方法。",
        "notTask": [
          "不要写成外貌重要",
          "不要赞美颜值经济",
          "不要忽略 danger"
        ],
        "mustMention": [
          "媒体标准",
          "心理压力",
          "内在价值",
          "理性审美"
        ],
        "dangerZone": [
          "danger 是题眼，必须写危害。"
        ],
        "thinkingSteps": [
          "先找主题词：appearance anxiety",
          "再看任务信号：challenge, problem, danger",
          "判断题型：问题解决类",
          "第一段：围绕 appearance anxiety 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：问题解决类；主题：appearance anxiety",
        "thirtySecondReaction": "第一段写重要性；第二段写：外貌焦虑增加心理压力 + 媒体和广告制造过度外貌标准；第三段写：社会应引导人们重视内在价值",
        "sixtySecondOutline": {
          "P1": "引出 appearance anxiety，说明它与个人成长/现实社会有关。",
          "P2": "外貌焦虑增加心理压力；媒体和广告制造过度外貌标准；可加入反问或例子。",
          "P3": "社会应引导人们重视内在价值，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 appearance anxiety 的重要性。",
          "englishSkeleton": "People are now increasingly aware of the danger of appearance anxiety or being obsessed with one’s look. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "外貌焦虑增加心理压力",
          "reason2": "媒体和广告制造过度外貌标准",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why appearance anxiety deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 appearance anxiety 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, appearance anxiety is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "People are now increasingly aware of the challenges caused by ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "问题解决类",
            "心理人格类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons behind this problem.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "问题解决类",
            "心理人格类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "Only through joint efforts can we solve this problem step by step.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "问题解决类",
            "心理人格类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Appearance anxiety has become increasingly important in modern society.",
          "cn": "Appearance anxiety 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Appearance anxiety"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why appearance anxiety deserves our attention.",
          "cn": "appearance anxiety 值得关注有几个原因。",
          "replaceableSlots": [
            "appearance anxiety"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Appearance anxiety may lead to unnecessary pressure and damage young people’s mental health.",
          "cn": "外貌焦虑可能带来不必要的压力并损害年轻人的心理健康。",
          "replaceableSlots": [
            "Appearance anxiety",
            "mental health"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Social media and advertisements often create unrealistic standards of beauty.",
          "cn": "社交媒体和广告常常制造不现实的美丽标准。",
          "replaceableSlots": [
            "Social media",
            "unrealistic standards of beauty"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without appearance anxiety, how could young people adapt to the modern world?",
          "cn": "如果没有 appearance anxiety，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "appearance anxiety",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Society should encourage people to value inner beauty and personal ability.",
          "cn": "社会应鼓励人们重视内在美和个人能力。",
          "replaceableSlots": [],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2023_03_03_appearance_anxiety_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Appearance anxiety is important.",
          "mid": "Appearance anxiety plays an important role in students’ growth.",
          "high": "It is widely accepted that Appearance anxiety plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Appearance anxiety may lead to unnecessary pressure and damage young people’s mental health.",
          "mid": "Social media and advertisements often create unrealistic standards of beauty.",
          "high": "Those equipped with appearance anxiety are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "People are now increasingly aware of the danger of appearance anxiety or being obsessed with one’s look. With the influence of social media, many people pay too much attention to appearance and compare themselves with unrealistic images.\n\nThere are several reasons why this problem deserves attention. First, appearance anxiety may lead to unnecessary pressure and damage young people’s mental health. Moreover, advertisements and online platforms often create narrow standards of beauty, making people ignore their inner value and real abilities.\n\nIn conclusion, appearance anxiety should be treated wisely. Society should guide people to value inner beauty, personal ability and a healthy attitude toward themselves.",
        "wordCountApprox": 106,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？People are now increasingly aware of the danger of appearance anxiety or being obsessed with one’s look.",
          "answer": "问题解决类",
          "distractors": [
            "重要性类",
            "社会现象类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 appearance anxiety，并且题干信号符合 问题解决类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "appearance anxiety",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 appearance anxiety。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "appearance anxiety",
            "外貌焦虑增加心理压力",
            "媒体和广告制造过度外貌标准",
            "社会应引导人们重视内在价值"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "mental health",
            "social media influence",
            "self-confidence",
            "positive attitude"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“appearance anxiety 值得关注有几个原因。”",
          "answer": "There are several reasons why appearance anxiety deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2023_03_03_appearance_anxiety",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "appearance anxiety",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2023_03_03_appearance_anxiety",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "社会应鼓励人们重视内在美和个人能力。",
          "answer": "Society should encourage people to value inner beauty and personal ability.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2023_03_03_appearance_anxiety",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Appearance anxiety is important.",
          "answer": "It is widely accepted that Appearance anxiety plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2023_03_03_appearance_anxiety",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 appearance anxiety，年轻人怎么适应现代世界？",
          "answer": "Without appearance anxiety, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2023_03_03_appearance_anxiety",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "mental health",
          "social media influence",
          "self-confidence",
          "positive attitude"
        ],
        "sharedReasons": [
          "外貌焦虑增加心理压力",
          "媒体和广告制造过度外貌标准"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 appearance anxiety 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 appearance anxiety 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 appearance anxiety 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_12_01_team_spirit",
      "sourceYear": 2022,
      "month": "12",
      "set": 1,
      "prompt": "Today increasing importance is being attached to cultivating college students’ team spirit.",
      "promptCn": "",
      "chineseTitle": "Team spirit",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "合作沟通类",
      "difficulty": "较低",
      "coreKeywords": [
        "team spirit",
        "college students",
        "cooperation",
        "interpersonal skills",
        "work efficiency"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明培养大学生团队精神为什么越来越重要。",
        "notTask": [
          "不要只写朋友关系",
          "不要忽略 college students",
          "不要只写个人成功"
        ],
        "mustMention": [
          "沟通能力",
          "合作效率",
          "未来职场",
          "共同目标"
        ],
        "dangerZone": [
          "team spirit 强调合作，不是单纯善良。"
        ],
        "thinkingSteps": [
          "先找主题词：team spirit",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 team spirit 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：team spirit",
        "thirtySecondReaction": "第一段写重要性；第二段写：团队精神提升沟通能力和合作效率 + 团队精神帮助适应未来职场；第三段写：学校和学生应重视团队合作训练",
        "sixtySecondOutline": {
          "P1": "引出 team spirit，说明它与个人成长/现实社会有关。",
          "P2": "团队精神提升沟通能力和合作效率；团队精神帮助适应未来职场；可加入反问或例子。",
          "P3": "学校和学生应重视团队合作训练，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 team spirit 的重要性。",
          "englishSkeleton": "Today increasing importance is being attached to cultivating college students’ team spirit. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "团队精神提升沟通能力和合作效率",
          "reason2": "团队精神帮助适应未来职场",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why team spirit deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 team spirit 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, team spirit is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "合作沟通类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_12_01_team_spirit_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Team spirit has become increasingly important in modern society.",
          "cn": "Team spirit 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Team spirit"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why team spirit deserves our attention.",
          "cn": "team spirit 值得关注有几个原因。",
          "replaceableSlots": [
            "team spirit"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Team spirit enables students to cooperate with others, improve efficiency and achieve common goals.",
          "cn": "团队精神使学生能与他人合作、提高效率并实现共同目标。",
          "replaceableSlots": [
            "Team spirit",
            "cooperate with others",
            "common goals"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "It also helps students adapt to the modern workplace where cooperation is often required.",
          "cn": "它也帮助学生适应常常需要合作的现代职场。",
          "replaceableSlots": [
            "modern workplace",
            "cooperation"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without team spirit, how could young people adapt to the modern world?",
          "cn": "如果没有 team spirit，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "team spirit",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Schools and students should attach importance to teamwork training.",
          "cn": "学校和学生都应重视团队合作训练。",
          "replaceableSlots": [],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_01_team_spirit_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Team spirit is important.",
          "mid": "Team spirit plays an important role in students’ growth.",
          "high": "It is widely accepted that Team spirit plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Team spirit enables students to cooperate with others, improve efficiency and achieve common goals.",
          "mid": "It also helps students adapt to the modern workplace where cooperation is often required.",
          "high": "Those equipped with team spirit are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Today increasing importance is being attached to cultivating college students’ team spirit. In modern society, success often depends not only on personal ability but also on cooperation with others.\n\nThere are several reasons why team spirit deserves attention. First, it enables students to communicate with others, improve efficiency and achieve common goals. Moreover, many tasks in the future workplace require cooperation. Students with team spirit are more likely to adapt to group work and build good relationships.\n\nIn conclusion, team spirit is of great value to college students. Schools should create more group activities, and students should learn to cooperate actively.",
        "wordCountApprox": 101,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Today increasing importance is being attached to cultivating college students’ team spirit.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 team spirit，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "team spirit",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 team spirit。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "team spirit",
            "团队精神提升沟通能力和合作效率",
            "团队精神帮助适应未来职场",
            "学校和学生应重视团队合作训练"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "communication skills",
            "cooperation",
            "mutual trust",
            "group work"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“team spirit 值得关注有几个原因。”",
          "answer": "There are several reasons why team spirit deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_12_01_team_spirit",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "team spirit",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_12_01_team_spirit",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "学校和学生都应重视团队合作训练。",
          "answer": "Schools and students should attach importance to teamwork training.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_12_01_team_spirit",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Team spirit is important.",
          "answer": "It is widely accepted that Team spirit plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_12_01_team_spirit",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 team spirit，年轻人怎么适应现代世界？",
          "answer": "Without team spirit, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_12_01_team_spirit",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "communication skills",
          "cooperation",
          "mutual trust",
          "group work"
        ],
        "sharedReasons": [
          "团队精神提升沟通能力和合作效率",
          "团队精神帮助适应未来职场"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 team spirit 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 team spirit 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 team spirit 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_12_02_critical_thinking",
      "sourceYear": 2022,
      "month": "12",
      "set": 2,
      "prompt": "In an era of information explosion, it is vitally important to develop the ability to think critically and make rational choices.",
      "promptCn": "",
      "chineseTitle": "Critical thinking and rational choices",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "数字信息类",
      "difficulty": "中等",
      "coreKeywords": [
        "information explosion",
        "critical thinking",
        "rational choices",
        "reliable information",
        "false information"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明信息爆炸时代为什么需要批判性思维和理性选择能力。",
        "notTask": [
          "不要只写信息很多",
          "不要把 critical thinking 写成 negative thinking",
          "不要忽略 rational choices"
        ],
        "mustMention": [
          "辨别真假",
          "可靠信息",
          "理性选择",
          "避免被误导"
        ],
        "dangerZone": [
          "critical thinking 是判断和分析能力，不是挑刺。"
        ],
        "thinkingSteps": [
          "先找主题词：information explosion",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 information explosion 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：information explosion",
        "thirtySecondReaction": "第一段写重要性；第二段写：批判性思维帮助辨别真假信息 + 信息爆炸时代更需要独立判断；第三段写：学校家庭应培养批判性思维",
        "sixtySecondOutline": {
          "P1": "引出 information explosion，说明它与个人成长/现实社会有关。",
          "P2": "批判性思维帮助辨别真假信息；信息爆炸时代更需要独立判断；可加入反问或例子。",
          "P3": "学校家庭应培养批判性思维，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 information explosion 的重要性。",
          "englishSkeleton": "In an era of information explosion, it is vitally important to develop the ability to think critically and make rational choices. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "批判性思维帮助辨别真假信息",
          "reason2": "信息爆炸时代更需要独立判断",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why information explosion deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 information explosion 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, information explosion is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "数字信息类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_12_02_critical_thinking_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Critical thinking and rational choices has become increasingly important in modern society.",
          "cn": "Critical thinking and rational choices 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Critical thinking and rational choices"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why information explosion deserves our attention.",
          "cn": "information explosion 值得关注有几个原因。",
          "replaceableSlots": [
            "information explosion"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Critical thinking helps people distinguish facts from false information and make rational choices.",
          "cn": "批判性思维帮助人们辨别事实和虚假信息，并做出理性选择。",
          "replaceableSlots": [
            "Critical thinking",
            "distinguish facts from false information"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "In an era of information explosion, independent judgment has become increasingly necessary.",
          "cn": "在信息爆炸时代，独立判断变得越来越必要。",
          "replaceableSlots": [
            "information explosion",
            "independent judgment"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without information explosion, how could young people adapt to the modern world?",
          "cn": "如果没有 information explosion，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "information explosion",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Schools and families should help students develop critical thinking in daily learning.",
          "cn": "学校和家庭应帮助学生在日常学习中培养批判性思维。",
          "replaceableSlots": [],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_02_critical_thinking_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Critical thinking and rational choices is important.",
          "mid": "Critical thinking and rational choices plays an important role in students’ growth.",
          "high": "It is widely accepted that Critical thinking and rational choices plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Critical thinking helps people distinguish facts from false information and make rational choices.",
          "mid": "In an era of information explosion, independent judgment has become increasingly necessary.",
          "high": "Those equipped with information explosion are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "In an era of information explosion, it is vitally important to develop the ability to think critically and make rational choices. In the information age, people receive countless messages every day. However, not all information is true or useful.\n\nThere are several reasons why critical thinking deserves attention. First, it helps people distinguish facts from false information and avoid being misled. Moreover, critical thinking enables young people to analyze different choices calmly and make rational decisions in study, work and daily life.\n\nIn conclusion, critical thinking is essential in the era of information explosion. Students should develop this ability through reading, discussion and independent thinking.",
        "wordCountApprox": 105,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？In an era of information explosion, it is vitally important to develop the ability to think critically and make rational choices.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 information explosion，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "information explosion",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 information explosion。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "information explosion",
            "批判性思维帮助辨别真假信息",
            "信息爆炸时代更需要独立判断",
            "学校家庭应培养批判性思维"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "digital literacy",
            "information overload",
            "decision-making",
            "online learning"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“information explosion 值得关注有几个原因。”",
          "answer": "There are several reasons why information explosion deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_12_02_critical_thinking",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "information explosion",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_12_02_critical_thinking",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "学校和家庭应帮助学生在日常学习中培养批判性思维。",
          "answer": "Schools and families should help students develop critical thinking in daily learning.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_12_02_critical_thinking",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Critical thinking and rational choices is important.",
          "answer": "It is widely accepted that Critical thinking and rational choices plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_12_02_critical_thinking",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 information explosion，年轻人怎么适应现代世界？",
          "answer": "Without information explosion, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_12_02_critical_thinking",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "digital literacy",
          "information overload",
          "decision-making",
          "online learning"
        ],
        "sharedReasons": [
          "批判性思维帮助辨别真假信息",
          "信息爆炸时代更需要独立判断"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 information explosion 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 information explosion 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 information explosion 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_12_03_information_technology_education",
      "sourceYear": 2022,
      "month": "12",
      "set": 3,
      "prompt": "With the application of information technology in education, college students can now learn in more diverse and efficient ways.",
      "promptCn": "",
      "chineseTitle": "Information technology in education",
      "type": "社会现象类",
      "typeSignals": [
        "more and more people",
        "growing awareness",
        "increasingly aware",
        "begin to realize"
      ],
      "themeGroup": "数字信息类",
      "difficulty": "中等",
      "coreKeywords": [
        "information technology",
        "education",
        "diverse ways",
        "efficient learning",
        "online courses"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明信息技术如何让大学生以更多样、更高效的方式学习。",
        "notTask": [
          "不要只写科技很先进",
          "不要忽略 education",
          "不要只写线上学习好处而不写效率"
        ],
        "mustMention": [
          "在线资源",
          "随时随地学习",
          "学习效率",
          "合理使用"
        ],
        "dangerZone": [
          "这题是科技+教育融合，不是普通科技作文。"
        ],
        "thinkingSteps": [
          "先找主题词：information technology",
          "再看任务信号：more and more people, growing awareness, increasingly aware",
          "判断题型：社会现象类",
          "第一段：围绕 information technology 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：社会现象类；主题：information technology",
        "thirtySecondReaction": "第一段写重要性；第二段写：在线课程提供更多学习资源 + 信息技术提升学习灵活性和效率；第三段写：学生应合理使用信息技术",
        "sixtySecondOutline": {
          "P1": "引出 information technology，说明它与个人成长/现实社会有关。",
          "P2": "在线课程提供更多学习资源；信息技术提升学习灵活性和效率；可加入反问或例子。",
          "P3": "学生应合理使用信息技术，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 information technology 的重要性。",
          "englishSkeleton": "With the application of information technology in education, college students can now learn in more diverse and efficient ways. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "在线课程提供更多学习资源",
          "reason2": "信息技术提升学习灵活性和效率",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why information technology deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 information technology 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, information technology is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "In recent years, more and more people have begun to realize the significance of ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "社会现象类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "Several factors can account for this social tendency.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "社会现象类",
            "数字信息类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, this trend deserves our attention and support.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "社会现象类",
            "数字信息类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_12_03_information_technology_education_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Information technology in education has become increasingly important in modern society.",
          "cn": "Information technology in education 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Information technology in education"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why information technology deserves our attention.",
          "cn": "information technology 值得关注有几个原因。",
          "replaceableSlots": [
            "information technology"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Online courses and learning platforms provide students with more learning resources.",
          "cn": "在线课程和学习平台为学生提供更多学习资源。",
          "replaceableSlots": [
            "Online courses",
            "learning resources"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Information technology allows students to learn at any time and any place, which improves learning efficiency.",
          "cn": "信息技术使学生可以随时随地学习，从而提高学习效率。",
          "replaceableSlots": [
            "any time and any place",
            "learning efficiency"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without information technology, how could young people adapt to the modern world?",
          "cn": "如果没有 information technology，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "information technology",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Students should use information technology wisely and balance online learning with classroom learning.",
          "cn": "学生应明智使用信息技术，并平衡线上学习与课堂学习。",
          "replaceableSlots": [],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_12_03_information_technology_education_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Information technology in education is important.",
          "mid": "Information technology in education plays an important role in students’ growth.",
          "high": "It is widely accepted that Information technology in education plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Online courses and learning platforms provide students with more learning resources.",
          "mid": "Information technology allows students to learn at any time and any place, which improves learning efficiency.",
          "high": "Those equipped with information technology are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "With the application of information technology in education, college students can now learn in more diverse and efficient ways. Information technology has changed the way college students learn. It provides them with more choices beyond the traditional classroom.\n\nSeveral factors can account for this trend. First, online courses and learning platforms offer a large number of resources, helping students study according to their own needs. Moreover, information technology allows students to learn at any time and any place, which makes learning more flexible and efficient.\n\nIn conclusion, information technology has brought diversity and efficiency to education. Students should use it wisely and keep a balance between online and offline learning.",
        "wordCountApprox": 110,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？With the application of information technology in education, college students can now learn in more diverse and efficient ways.",
          "answer": "社会现象类",
          "distractors": [
            "重要性类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 information technology，并且题干信号符合 社会现象类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "information technology",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 information technology。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "information technology",
            "在线课程提供更多学习资源",
            "信息技术提升学习灵活性和效率",
            "学生应合理使用信息技术"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "digital literacy",
            "online learning",
            "independent learning",
            "learning efficiency"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“information technology 值得关注有几个原因。”",
          "answer": "There are several reasons why information technology deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_12_03_information_technology_education",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "information technology",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_12_03_information_technology_education",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "学生应明智使用信息技术，并平衡线上学习与课堂学习。",
          "answer": "Students should use information technology wisely and balance online learning with classroom learning.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_12_03_information_technology_education",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Information technology in education is important.",
          "answer": "It is widely accepted that Information technology in education plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_12_03_information_technology_education",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 information technology，年轻人怎么适应现代世界？",
          "answer": "Without information technology, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_12_03_information_technology_education",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "digital literacy",
          "online learning",
          "independent learning",
          "learning efficiency"
        ],
        "sharedReasons": [
          "在线课程提供更多学习资源",
          "信息技术提升学习灵活性和效率"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 information technology 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 information technology 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 information technology 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_09_01_real_world_interaction",
      "sourceYear": 2022,
      "month": "09",
      "set": 1,
      "prompt": "Today more and more people begin to realize the pleasure and joys of real-world social interaction.",
      "promptCn": "",
      "chineseTitle": "Real-world social interaction",
      "type": "社会现象类",
      "typeSignals": [
        "more and more people",
        "growing awareness",
        "increasingly aware",
        "begin to realize"
      ],
      "themeGroup": "合作沟通类",
      "difficulty": "中等",
      "coreKeywords": [
        "real-world social interaction",
        "face-to-face communication",
        "virtual relationship",
        "emotional connection"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明越来越多人为什么意识到现实社交的乐趣和价值。",
        "notTask": [
          "不要写成完全反对互联网",
          "不要只写聊天",
          "不要忽略 real-world"
        ],
        "mustMention": [
          "真实情感连接",
          "可靠关系",
          "线上线下平衡"
        ],
        "dangerZone": [
          "重点是现实社交的价值，而不是互联网坏处。"
        ],
        "thinkingSteps": [
          "先找主题词：real-world social interaction",
          "再看任务信号：more and more people, growing awareness, increasingly aware",
          "判断题型：社会现象类",
          "第一段：围绕 real-world social interaction 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：社会现象类；主题：real-world social interaction",
        "thirtySecondReaction": "第一段写重要性；第二段写：面对面交流带来真实情感连接 + 现实社交建立更可靠关系；第三段写：人们应平衡线上交流和线下互动",
        "sixtySecondOutline": {
          "P1": "引出 real-world social interaction，说明它与个人成长/现实社会有关。",
          "P2": "面对面交流带来真实情感连接；现实社交建立更可靠关系；可加入反问或例子。",
          "P3": "人们应平衡线上交流和线下互动，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 real-world social interaction 的重要性。",
          "englishSkeleton": "Today more and more people begin to realize the pleasure and joys of real-world social interaction. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "面对面交流带来真实情感连接",
          "reason2": "现实社交建立更可靠关系",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why real-world social interaction deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 real-world social interaction 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, real-world social interaction is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "In recent years, more and more people have begun to realize the significance of ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "社会现象类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "Several factors can account for this social tendency.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "社会现象类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, this trend deserves our attention and support.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "社会现象类",
            "合作沟通类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_09_01_real_world_interaction_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Real-world social interaction has become increasingly important in modern society.",
          "cn": "Real-world social interaction 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Real-world social interaction"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why real-world social interaction deserves our attention.",
          "cn": "real-world social interaction 值得关注有几个原因。",
          "replaceableSlots": [
            "real-world social interaction"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Face-to-face interaction can bring people genuine emotional connection.",
          "cn": "面对面互动能给人们带来真实的情感连接。",
          "replaceableSlots": [
            "Face-to-face interaction",
            "emotional connection"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Real-world social interaction helps people build stronger and more reliable relationships.",
          "cn": "现实社交帮助人们建立更牢固、更可靠的关系。",
          "replaceableSlots": [
            "Real-world social interaction",
            "reliable relationships"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without real-world social interaction, how could young people adapt to the modern world?",
          "cn": "如果没有 real-world social interaction，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "real-world social interaction",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "People should keep a balance between online communication and real-world interaction.",
          "cn": "人们应在线上交流和现实互动之间保持平衡。",
          "replaceableSlots": [],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_01_real_world_interaction_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Real-world social interaction is important.",
          "mid": "Real-world social interaction plays an important role in students’ growth.",
          "high": "It is widely accepted that Real-world social interaction plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Face-to-face interaction can bring people genuine emotional connection.",
          "mid": "Real-world social interaction helps people build stronger and more reliable relationships.",
          "high": "Those equipped with real-world social interaction are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Today more and more people begin to realize the pleasure and joys of real-world social interaction. Although online communication is convenient, many people are beginning to miss the warmth of face-to-face interaction.\n\nSeveral factors can account for this trend. First, real-world social interaction brings genuine emotional connection that virtual communication can hardly replace. Moreover, offline activities such as meeting friends, traveling with family and joining group events can help people build stronger relationships.\n\nIn conclusion, real-world social interaction is still valuable in the digital age. People should keep a balance between online communication and face-to-face contact.",
        "wordCountApprox": 103,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Today more and more people begin to realize the pleasure and joys of real-world social interaction.",
          "answer": "社会现象类",
          "distractors": [
            "重要性类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 real-world social interaction，并且题干信号符合 社会现象类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "real-world social interaction",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 real-world social interaction。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "real-world social interaction",
            "面对面交流带来真实情感连接",
            "现实社交建立更可靠关系",
            "人们应平衡线上交流和线下互动"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "communication skills",
            "virtual world",
            "social media",
            "interpersonal relationships"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“real-world social interaction 值得关注有几个原因。”",
          "answer": "There are several reasons why real-world social interaction deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_09_01_real_world_interaction",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "real-world social interaction",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_09_01_real_world_interaction",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "人们应在线上交流和现实互动之间保持平衡。",
          "answer": "People should keep a balance between online communication and real-world interaction.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_09_01_real_world_interaction",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Real-world social interaction is important.",
          "answer": "It is widely accepted that Real-world social interaction plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_09_01_real_world_interaction",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 real-world social interaction，年轻人怎么适应现代世界？",
          "answer": "Without real-world social interaction, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_09_01_real_world_interaction",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "communication skills",
          "virtual world",
          "social media",
          "interpersonal relationships"
        ],
        "sharedReasons": [
          "面对面交流带来真实情感连接",
          "现实社交建立更可靠关系"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 real-world social interaction 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 real-world social interaction 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 real-world social interaction 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_09_03_mutual_trust_openness",
      "sourceYear": 2022,
      "month": "09",
      "set": 3,
      "prompt": "It is now widely accepted that mutual trust and openness is the key to promoting cooperation.",
      "promptCn": "",
      "chineseTitle": "Mutual trust and openness",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "合作沟通类",
      "difficulty": "中等",
      "coreKeywords": [
        "mutual trust",
        "openness",
        "cooperation",
        "communication",
        "common goals"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明互信和开放为什么是促进合作的关键。",
        "notTask": [
          "不要只写 trust",
          "不要忽略 openness",
          "不要把 cooperation 写成个人努力"
        ],
        "mustMention": [
          "减少误解",
          "信息交流",
          "共同目标",
          "合作效率"
        ],
        "dangerZone": [
          "A+B 主题，mutual trust 和 openness 都要写。"
        ],
        "thinkingSteps": [
          "先找主题词：mutual trust",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 mutual trust 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：mutual trust",
        "thirtySecondReaction": "第一段写重要性；第二段写：互信减少误解并提升合作效率 + 开放促进信息交流和共同进步；第三段写：个人和团队应培养互信开放精神",
        "sixtySecondOutline": {
          "P1": "引出 mutual trust，说明它与个人成长/现实社会有关。",
          "P2": "互信减少误解并提升合作效率；开放促进信息交流和共同进步；可加入反问或例子。",
          "P3": "个人和团队应培养互信开放精神，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 mutual trust 的重要性。",
          "englishSkeleton": "It is now widely accepted that mutual trust and openness is the key to promoting cooperation. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "互信减少误解并提升合作效率",
          "reason2": "开放促进信息交流和共同进步",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why mutual trust deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 mutual trust 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, mutual trust is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "合作沟通类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "合作沟通类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Mutual trust and openness has become increasingly important in modern society.",
          "cn": "Mutual trust and openness 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Mutual trust and openness"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why mutual trust deserves our attention.",
          "cn": "mutual trust 值得关注有几个原因。",
          "replaceableSlots": [
            "mutual trust"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Mutual trust helps reduce misunderstanding and improve cooperation efficiency.",
          "cn": "相互信任有助于减少误解并提高合作效率。",
          "replaceableSlots": [
            "Mutual trust",
            "misunderstanding",
            "cooperation efficiency"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Openness enables people to share ideas and work toward common goals.",
          "cn": "开放使人们能够分享想法并朝共同目标努力。",
          "replaceableSlots": [
            "Openness",
            "share ideas",
            "common goals"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without mutual trust, how could young people adapt to the modern world?",
          "cn": "如果没有 mutual trust，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "mutual trust",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Individuals and teams should develop mutual trust and openness in cooperation.",
          "cn": "个人和团队应在合作中培养互信和开放精神。",
          "replaceableSlots": [],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_09_03_mutual_trust_openness_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Mutual trust and openness is important.",
          "mid": "Mutual trust and openness plays an important role in students’ growth.",
          "high": "It is widely accepted that Mutual trust and openness plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Mutual trust helps reduce misunderstanding and improve cooperation efficiency.",
          "mid": "Openness enables people to share ideas and work toward common goals.",
          "high": "Those equipped with mutual trust are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "It is now widely accepted that mutual trust and openness is the key to promoting cooperation. Cooperation cannot be achieved without a healthy relationship among people. Mutual trust and openness make such a relationship possible.\n\nThere are several reasons why they matter. First, mutual trust reduces misunderstanding and allows people to work together more efficiently. Moreover, openness encourages people to share ideas, accept different views and move toward common goals.\n\nIn conclusion, mutual trust and openness are essential for cooperation. Individuals, teams and even nations should value these qualities.",
        "wordCountApprox": 89,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？It is now widely accepted that mutual trust and openness is the key to promoting cooperation.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 mutual trust，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "mutual trust",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 mutual trust。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "mutual trust",
            "互信减少误解并提升合作效率",
            "开放促进信息交流和共同进步",
            "个人和团队应培养互信开放精神"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "team spirit",
            "friendly discussion",
            "communication skills",
            "cooperation"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“mutual trust 值得关注有几个原因。”",
          "answer": "There are several reasons why mutual trust deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_09_03_mutual_trust_openness",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "mutual trust",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_09_03_mutual_trust_openness",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "个人和团队应在合作中培养互信和开放精神。",
          "answer": "Individuals and teams should develop mutual trust and openness in cooperation.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_09_03_mutual_trust_openness",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Mutual trust and openness is important.",
          "answer": "It is widely accepted that Mutual trust and openness plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_09_03_mutual_trust_openness",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 mutual trust，年轻人怎么适应现代世界？",
          "answer": "Without mutual trust, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_09_03_mutual_trust_openness",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "team spirit",
          "friendly discussion",
          "communication skills",
          "cooperation"
        ],
        "sharedReasons": [
          "互信减少误解并提升合作效率",
          "开放促进信息交流和共同进步"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 mutual trust 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 mutual trust 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 mutual trust 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_06_01_environmental_lifestyle",
      "sourceYear": 2022,
      "month": "06",
      "set": 1,
      "prompt": "Nowadays more and more people choose to live an environmentally friendly lifestyle.",
      "promptCn": "",
      "chineseTitle": "Environmentally friendly lifestyle",
      "type": "社会现象类",
      "typeSignals": [
        "more and more people",
        "growing awareness",
        "increasingly aware",
        "begin to realize"
      ],
      "themeGroup": "社会责任类",
      "difficulty": "较低",
      "coreKeywords": [
        "environmentally friendly lifestyle",
        "environmental protection",
        "public awareness",
        "green society",
        "sustainable development"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明环保生活方式成为趋势的原因和意义。",
        "notTask": [
          "不要只写环境污染严重",
          "不要缺少具体行为",
          "不要只写政府责任"
        ],
        "mustMention": [
          "环保意识",
          "公共交通",
          "可回收产品",
          "绿色社会"
        ],
        "dangerZone": [
          "题目是 lifestyle，要写日常行为。"
        ],
        "thinkingSteps": [
          "先找主题词：environmentally friendly lifestyle",
          "再看任务信号：more and more people, growing awareness, increasingly aware",
          "判断题型：社会现象类",
          "第一段：围绕 environmentally friendly lifestyle 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：社会现象类；主题：environmentally friendly lifestyle",
        "thirtySecondReaction": "第一段写重要性；第二段写：环保生活能减少污染 + 日常小改变也能保护环境；第三段写：政府媒体个人共同提高环保意识",
        "sixtySecondOutline": {
          "P1": "引出 environmentally friendly lifestyle，说明它与个人成长/现实社会有关。",
          "P2": "环保生活能减少污染；日常小改变也能保护环境；可加入反问或例子。",
          "P3": "政府媒体个人共同提高环保意识，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 environmentally friendly lifestyle 的重要性。",
          "englishSkeleton": "Nowadays more and more people choose to live an environmentally friendly lifestyle. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "环保生活能减少污染",
          "reason2": "日常小改变也能保护环境",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why environmentally friendly lifestyle deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 environmentally friendly lifestyle 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, environmentally friendly lifestyle is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "In recent years, more and more people have begun to realize the significance of ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "Several factors can account for this social tendency.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, this trend deserves our attention and support.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Environmentally friendly lifestyle has become increasingly important in modern society.",
          "cn": "Environmentally friendly lifestyle 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Environmentally friendly lifestyle"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why environmentally friendly lifestyle deserves our attention.",
          "cn": "environmentally friendly lifestyle 值得关注有几个原因。",
          "replaceableSlots": [
            "environmentally friendly lifestyle"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "An environmentally friendly lifestyle can reduce pollution and help build a greener society.",
          "cn": "环保生活方式能减少污染并帮助建设更绿色的社会。",
          "replaceableSlots": [
            "environmentally friendly lifestyle",
            "reduce pollution"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Small changes in daily life can make meaningful contributions to environmental protection.",
          "cn": "日常生活中的小改变也能为环境保护做出有意义的贡献。",
          "replaceableSlots": [
            "Small changes",
            "environmental protection"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without environmentally friendly lifestyle, how could young people adapt to the modern world?",
          "cn": "如果没有 environmentally friendly lifestyle，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "environmentally friendly lifestyle",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "The government, mass media and individuals should work together to raise environmental awareness.",
          "cn": "政府、媒体和个人应共同努力提高环保意识。",
          "replaceableSlots": [],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_01_environmental_lifestyle_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Environmentally friendly lifestyle is important.",
          "mid": "Environmentally friendly lifestyle plays an important role in students’ growth.",
          "high": "It is widely accepted that Environmentally friendly lifestyle plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "An environmentally friendly lifestyle can reduce pollution and help build a greener society.",
          "mid": "Small changes in daily life can make meaningful contributions to environmental protection.",
          "high": "Those equipped with environmentally friendly lifestyle are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Nowadays more and more people choose to live an environmentally friendly lifestyle. This trend can be seen in many daily choices, such as taking public transportation and using recyclable products.\n\nSeveral factors can account for this social tendency. First, people have become more aware of environmental problems and are willing to change their habits. Moreover, small actions such as saving energy, reducing plastic use and choosing public transport can reduce pollution and protect nature.\n\nIn conclusion, an environmentally friendly lifestyle is valuable for both individuals and society. Everyone should take practical action to build a greener future.",
        "wordCountApprox": 97,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Nowadays more and more people choose to live an environmentally friendly lifestyle.",
          "answer": "社会现象类",
          "distractors": [
            "重要性类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 environmentally friendly lifestyle，并且题干信号符合 社会现象类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "environmentally friendly lifestyle",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 environmentally friendly lifestyle。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "environmentally friendly lifestyle",
            "环保生活能减少污染",
            "日常小改变也能保护环境",
            "政府媒体个人共同提高环保意识"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "environmental protection",
            "sustainable development",
            "public awareness",
            "social responsibility"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“environmentally friendly lifestyle 值得关注有几个原因。”",
          "answer": "There are several reasons why environmentally friendly lifestyle deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_06_01_environmental_lifestyle",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "environmentally friendly lifestyle",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_06_01_environmental_lifestyle",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "政府、媒体和个人应共同努力提高环保意识。",
          "answer": "The government, mass media and individuals should work together to raise environmental awareness.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_06_01_environmental_lifestyle",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Environmentally friendly lifestyle is important.",
          "answer": "It is widely accepted that Environmentally friendly lifestyle plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_06_01_environmental_lifestyle",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 environmentally friendly lifestyle，年轻人怎么适应现代世界？",
          "answer": "Without environmentally friendly lifestyle, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_06_01_environmental_lifestyle",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "environmental protection",
          "sustainable development",
          "public awareness",
          "social responsibility"
        ],
        "sharedReasons": [
          "环保生活能减少污染",
          "日常小改变也能保护环境"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 environmentally friendly lifestyle 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 environmentally friendly lifestyle 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 environmentally friendly lifestyle 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_06_02_helping_the_needy",
      "sourceYear": 2022,
      "month": "06",
      "set": 2,
      "prompt": "Nowadays more and more people take delight in helping the needy.",
      "promptCn": "",
      "chineseTitle": "Helping the needy",
      "type": "社会现象类",
      "typeSignals": [
        "more and more people",
        "growing awareness",
        "increasingly aware",
        "begin to realize"
      ],
      "themeGroup": "社会责任类",
      "difficulty": "较低",
      "coreKeywords": [
        "helping the needy",
        "social responsibility",
        "donation",
        "volunteer work",
        "social harmony"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明越来越多人乐于帮助弱者的原因和意义。",
        "notTask": [
          "不要只写捐钱",
          "不要忽略 take delight",
          "不要写成贫困问题报告"
        ],
        "mustMention": [
          "社会责任",
          "志愿服务",
          "社会温暖",
          "和谐社会"
        ],
        "dangerZone": [
          "重点是人们愿意帮助，以及帮助的社会意义。"
        ],
        "thinkingSteps": [
          "先找主题词：helping the needy",
          "再看任务信号：more and more people, growing awareness, increasingly aware",
          "判断题型：社会现象类",
          "第一段：围绕 helping the needy 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：社会现象类；主题：helping the needy",
        "thirtySecondReaction": "第一段写重要性；第二段写：帮助弱者给弱势群体带来希望 + 志愿服务增强社会责任感；第三段写：社会应鼓励公益行动",
        "sixtySecondOutline": {
          "P1": "引出 helping the needy，说明它与个人成长/现实社会有关。",
          "P2": "帮助弱者给弱势群体带来希望；志愿服务增强社会责任感；可加入反问或例子。",
          "P3": "社会应鼓励公益行动，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 helping the needy 的重要性。",
          "englishSkeleton": "Nowadays more and more people take delight in helping the needy. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "帮助弱者给弱势群体带来希望",
          "reason2": "志愿服务增强社会责任感",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why helping the needy deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 helping the needy 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, helping the needy is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "In recent years, more and more people have begun to realize the significance of ______.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "Several factors can account for this social tendency.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, this trend deserves our attention and support.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "社会现象类",
            "社会责任类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_06_02_helping_the_needy_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Helping the needy has become increasingly important in modern society.",
          "cn": "Helping the needy 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Helping the needy"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why helping the needy deserves our attention.",
          "cn": "helping the needy 值得关注有几个原因。",
          "replaceableSlots": [
            "helping the needy"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Helping the needy brings hope to disadvantaged groups and makes society warmer.",
          "cn": "帮助弱者给弱势群体带来希望，也让社会更加温暖。",
          "replaceableSlots": [
            "Helping the needy",
            "disadvantaged groups",
            "warmer society"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Volunteer work enables people to develop a stronger sense of social responsibility.",
          "cn": "志愿服务使人们培养更强的社会责任感。",
          "replaceableSlots": [
            "Volunteer work",
            "social responsibility"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without helping the needy, how could young people adapt to the modern world?",
          "cn": "如果没有 helping the needy，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "helping the needy",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Society should encourage more people to take part in public welfare activities.",
          "cn": "社会应鼓励更多人参与公益活动。",
          "replaceableSlots": [],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_02_helping_the_needy_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Helping the needy is important.",
          "mid": "Helping the needy plays an important role in students’ growth.",
          "high": "It is widely accepted that Helping the needy plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Helping the needy brings hope to disadvantaged groups and makes society warmer.",
          "mid": "Volunteer work enables people to develop a stronger sense of social responsibility.",
          "high": "Those equipped with helping the needy are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Nowadays more and more people take delight in helping the needy. This trend can be seen in donations, volunteer teaching and many other public welfare activities.\n\nSeveral factors can account for this tendency. First, with social development, more people are able and willing to help those in need. Moreover, helping others can strengthen people’s sense of social responsibility and bring warmth to disadvantaged groups.\n\nIn conclusion, helping the needy is meaningful for building a harmonious society. More people should be encouraged to take part in volunteer work and public welfare activities.",
        "wordCountApprox": 92,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Nowadays more and more people take delight in helping the needy.",
          "answer": "社会现象类",
          "distractors": [
            "重要性类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 helping the needy，并且题干信号符合 社会现象类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "helping the needy",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 helping the needy。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "helping the needy",
            "帮助弱者给弱势群体带来希望",
            "志愿服务增强社会责任感",
            "社会应鼓励公益行动"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "volunteering",
            "social responsibility",
            "public welfare",
            "kindness"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“helping the needy 值得关注有几个原因。”",
          "answer": "There are several reasons why helping the needy deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_06_02_helping_the_needy",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "helping the needy",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_06_02_helping_the_needy",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "社会应鼓励更多人参与公益活动。",
          "answer": "Society should encourage more people to take part in public welfare activities.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_06_02_helping_the_needy",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Helping the needy is important.",
          "answer": "It is widely accepted that Helping the needy plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_06_02_helping_the_needy",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 helping the needy，年轻人怎么适应现代世界？",
          "answer": "Without helping the needy, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_06_02_helping_the_needy",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "volunteering",
          "social responsibility",
          "public welfare",
          "kindness"
        ],
        "sharedReasons": [
          "帮助弱者给弱势群体带来希望",
          "志愿服务增强社会责任感"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 helping the needy 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 helping the needy 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 helping the needy 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    },
    {
      "id": "cet6_2022_06_03_learning_new_skills",
      "sourceYear": 2022,
      "month": "06",
      "set": 3,
      "prompt": "Nowadays more and more people keep learning new skills to adapt to a fast-changing world.",
      "promptCn": "",
      "chineseTitle": "Learning new skills",
      "type": "重要性类",
      "typeSignals": [
        "importance of",
        "crucial",
        "vital",
        "essential",
        "plays a role",
        "should be encouraged"
      ],
      "themeGroup": "学习成长类",
      "difficulty": "较低",
      "coreKeywords": [
        "learning new skills",
        "fast-changing world",
        "adaptation",
        "career development",
        "competitiveness"
      ],
      "wordLimit": "150-200 words",
      "taskAnalysis": {
        "mainTask": "说明为什么要不断学习新技能以适应快速变化的世界。",
        "notTask": [
          "不要只写学习知识",
          "不要忽略 new skills",
          "不要忽略 adapt to fast-changing world"
        ],
        "mustMention": [
          "就业竞争",
          "科技发展",
          "适应变化",
          "终身学习"
        ],
        "dangerZone": [
          "这题是典型成长类，可与自主学习、学会学习迁移。"
        ],
        "thinkingSteps": [
          "先找主题词：learning new skills",
          "再看任务信号：importance of, crucial, vital",
          "判断题型：重要性类",
          "第一段：围绕 learning new skills 引出中心，不要跑到泛泛而谈。",
          "第二段：写两个不重复的理由，最好一个偏个人成长，一个偏社会/未来要求。",
          "第三段：总结重要性并提出可执行建议。"
        ],
        "scoringFocus": [
          "是否紧扣题目核心词",
          "是否三段式清晰",
          "第二段理由是否不重复",
          "是否有连接词、反面论证或例子",
          "是否控制在150-200词"
        ]
      },
      "immediateReactionTraining": {
        "tenSecondReaction": "题型：重要性类；主题：learning new skills",
        "thirtySecondReaction": "第一段写重要性；第二段写：学习新技能增强就业竞争力 + 持续学习帮助适应社会进步；第三段写：年轻人应保持终身学习意识",
        "sixtySecondOutline": {
          "P1": "引出 learning new skills，说明它与个人成长/现实社会有关。",
          "P2": "学习新技能增强就业竞争力；持续学习帮助适应社会进步；可加入反问或例子。",
          "P3": "年轻人应保持终身学习意识，用 Only in this way... 升华。"
        }
      },
      "paragraphBlueprint": {
        "P1": {
          "goal": "引出主题并表明重要性",
          "chinesePlan": "照抄或改写题目句，补充现代社会背景，点明 learning new skills 的重要性。",
          "englishSkeleton": "Nowadays more and more people keep learning new skills to adapt to a fast-changing world. In modern society, it plays a vital role in students’ growth and future development.",
          "requiredMove": [
            "copy_or_paraphrase_prompt",
            "modern_context",
            "importance_judgment"
          ]
        },
        "P2": {
          "goal": "用两个理由展开主体段",
          "reason1": "学习新技能增强就业竞争力",
          "reason2": "持续学习帮助适应社会进步",
          "optionalExample": "可以使用个人经历、大学生学习场景、互联网时代场景，不建议所有题都硬套名人。",
          "englishSkeleton": "There are several reasons why learning new skills deserves our attention. First, ... Moreover, ... Without it, how could young people ...?",
          "requiredMove": [
            "body_topic_sentence",
            "reason_1",
            "reason_2",
            "contrast_or_rhetorical_question"
          ]
        },
        "P3": {
          "goal": "总结并给建议",
          "chinesePlan": "总结 learning new skills 的价值，提出学生/学校/家庭/社会应采取行动。",
          "englishSkeleton": "In conclusion, learning new skills is of great value. Therefore, ... Only in this way can we ...",
          "requiredMove": [
            "summary",
            "suggestion",
            "positive_future"
          ]
        }
      },
      "templateMapping": [
        {
          "formulaStep": "第一段引题",
          "function": "把题目变成中心观点",
          "sentence": "Nowadays, ______ has become increasingly important for college students.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "帮助用户在开头迅速进入主题，避免大脑空白。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第二段总起",
          "function": "告诉阅卷老师下面开始分析原因",
          "sentence": "There are several reasons why ______ deserves our attention.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "形成清楚的段落逻辑。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        },
        {
          "formulaStep": "第三段收束",
          "function": "总结建议，形成完整闭环",
          "sentence": "In conclusion, ______ is of great value to students’ growth and future development.",
          "replaceableSlots": [
            "______"
          ],
          "whyUse": "避免结尾突然停止或继续展开新理由。",
          "applyTo": [
            "重要性类",
            "学习成长类"
          ]
        }
      ],
      "sentenceBank": [
        {
          "id": "cet6_2022_06_03_learning_new_skills_s1",
          "paragraph": "P1",
          "function": "主题引入",
          "level": "稳分版",
          "sentence": "Learning new skills has become increasingly important in modern society.",
          "cn": "Learning new skills 在现代社会中变得越来越重要。",
          "replaceableSlots": [
            "Learning new skills"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P1",
            "主题引入",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s2",
          "paragraph": "P1",
          "function": "重要性判断",
          "level": "提分版",
          "sentence": "It plays a vital role in personal growth and future development.",
          "cn": "它在个人成长和未来发展中发挥重要作用。",
          "replaceableSlots": [
            "personal growth",
            "future development"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P1",
            "重要性判断",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s3",
          "paragraph": "P2",
          "function": "原因总起",
          "level": "稳分版",
          "sentence": "There are several reasons why learning new skills deserves our attention.",
          "cn": "learning new skills 值得关注有几个原因。",
          "replaceableSlots": [
            "learning new skills"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P2",
            "原因总起",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s4",
          "paragraph": "P2",
          "function": "原因一",
          "level": "稳分版",
          "sentence": "Learning new skills can improve one’s competitiveness in the job market.",
          "cn": "学习新技能可以提高一个人在就业市场中的竞争力。",
          "replaceableSlots": [
            "Learning new skills",
            "competitiveness",
            "job market"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P2",
            "原因一",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s5",
          "paragraph": "P2",
          "function": "原因二",
          "level": "提分版",
          "sentence": "Those who keep learning are more likely to adapt to social progress and technological innovation.",
          "cn": "持续学习的人更可能适应社会进步和技术创新。",
          "replaceableSlots": [
            "keep learning",
            "social progress",
            "technological innovation"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P2",
            "原因二",
            "提分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s6",
          "paragraph": "P2",
          "function": "反问强化",
          "level": "高分版",
          "sentence": "Without learning new skills, how could young people adapt to the modern world?",
          "cn": "如果没有 learning new skills，年轻人怎么能适应现代世界？",
          "replaceableSlots": [
            "learning new skills",
            "adapt to the modern world"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P2",
            "反问强化",
            "高分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s7",
          "paragraph": "P3",
          "function": "总结建议",
          "level": "稳分版",
          "sentence": "Young people should develop the habit of lifelong learning.",
          "cn": "年轻人应该培养终身学习的习惯。",
          "replaceableSlots": [],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P3",
            "总结建议",
            "稳分版"
          ]
        },
        {
          "id": "cet6_2022_06_03_learning_new_skills_s8",
          "paragraph": "P3",
          "function": "升华结尾",
          "level": "提分版",
          "sentence": "Only in this way can we become better prepared for the future.",
          "cn": "只有这样，我们才能为未来做好更充分的准备。",
          "replaceableSlots": [
            "this way",
            "the future"
          ],
          "transferableTo": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "appTags": [
            "P3",
            "升华结尾",
            "提分版"
          ]
        }
      ],
      "lowMidHighUpgrade": [
        {
          "function": "表达重要性",
          "basic": "Learning new skills is important.",
          "mid": "Learning new skills plays an important role in students’ growth.",
          "high": "It is widely accepted that Learning new skills plays a vital role in personal growth and future development.",
          "usage": "第一段或第三段"
        },
        {
          "function": "表达原因",
          "basic": "Learning new skills can improve one’s competitiveness in the job market.",
          "mid": "Those who keep learning are more likely to adapt to social progress and technological innovation.",
          "high": "Those equipped with learning new skills are more likely to seize opportunities and adapt to a rapidly changing society.",
          "usage": "第二段"
        }
      ],
      "modelEssayForTraining": {
        "version": "考场稳分版，原创改写，不要求死背",
        "essay": "Nowadays more and more people keep learning new skills to adapt to a fast-changing world. In a world where technology and society are changing rapidly, old knowledge and skills may soon become insufficient.\n\nThere are several reasons why learning new skills deserves attention. First, it can improve one’s competitiveness in the job market and create more career opportunities. Moreover, those who keep learning are more likely to adapt to social progress and technological innovation.\n\nIn conclusion, learning new skills is essential for future development. Young people should develop the habit of lifelong learning and keep improving themselves.",
        "wordCountApprox": 99,
        "paragraphAnalysis": [
          {
            "paragraph": "P1",
            "role": "引题+表态",
            "formulaUsed": "题目句 + 现代社会背景 + 重要性判断"
          },
          {
            "paragraph": "P2",
            "role": "主体分析",
            "formulaUsed": "原因总起 + 原因一 + 原因二 + 反问/例子"
          },
          {
            "paragraph": "P3",
            "role": "总结建议",
            "formulaUsed": "总结重要性 + 行动建议 + 未来升华"
          }
        ]
      },
      "trainingTasks": {
        "typeRecognition": {
          "question": "这道题属于哪一类？Nowadays more and more people keep learning new skills to adapt to a fast-changing world.",
          "answer": "重要性类",
          "distractors": [
            "社会现象类",
            "问题解决类",
            "对比平衡类"
          ],
          "explanation": "因为题目核心是 learning new skills，并且题干信号符合 重要性类。"
        },
        "keywordExtraction": {
          "question": "圈出题目中最不能丢的核心词。",
          "answer": "learning new skills",
          "wrongKeywords": [
            "today's world",
            "people",
            "college students",
            "modern society"
          ],
          "explanation": "这些词可以作为背景，但真正决定文章方向的是 learning new skills。"
        },
        "outlineCloze": {
          "P1": "第一段：说明 ______ 在现代社会中重要。",
          "P2": "第二段：理由一 ______；理由二 ______。",
          "P3": "第三段：总结并建议 ______。",
          "answers": [
            "learning new skills",
            "学习新技能增强就业竞争力",
            "持续学习帮助适应社会进步",
            "年轻人应保持终身学习意识"
          ]
        },
        "transferChallenge": {
          "instruction": "用同一套结构迁移到下面任意一个题目。",
          "topics": [
            "lifelong learning",
            "independent learning",
            "digital skills",
            "career development"
          ],
          "sharedLogic": "主题重要性 → 两个原因 → 总结建议；替换主题词和理由即可。"
        }
      },
      "memorizationCards": [
        {
          "type": "中译英",
          "front": "“learning new skills 值得关注有几个原因。”",
          "answer": "There are several reasons why learning new skills deserves our attention.",
          "hint": "第二段第一句",
          "tags": [
            "cet6_2022_06_03_learning_new_skills",
            "原因总起"
          ]
        },
        {
          "type": "填空",
          "front": "There are several reasons why ______ deserves our attention.",
          "answer": "learning new skills",
          "hint": "填核心主题词",
          "tags": [
            "cet6_2022_06_03_learning_new_skills",
            "模板填空"
          ]
        },
        {
          "type": "中译英",
          "front": "年轻人应该培养终身学习的习惯。",
          "answer": "Young people should develop the habit of lifelong learning.",
          "hint": "第三段建议句",
          "tags": [
            "cet6_2022_06_03_learning_new_skills",
            "建议"
          ]
        },
        {
          "type": "句子升级",
          "front": "Learning new skills is important.",
          "answer": "It is widely accepted that Learning new skills plays a vital role in personal growth and future development.",
          "hint": "从简单句升级到主语从句",
          "tags": [
            "cet6_2022_06_03_learning_new_skills",
            "句子升级"
          ]
        },
        {
          "type": "反问句",
          "front": "如果没有 learning new skills，年轻人怎么适应现代世界？",
          "answer": "Without learning new skills, how could young people adapt to the modern world?",
          "hint": "反面论证",
          "tags": [
            "cet6_2022_06_03_learning_new_skills",
            "反问"
          ]
        }
      ],
      "transfer": {
        "nearTopics": [
          "lifelong learning",
          "independent learning",
          "digital skills",
          "career development"
        ],
        "sharedReasons": [
          "学习新技能增强就业竞争力",
          "持续学习帮助适应社会进步"
        ],
        "adaptRules": [
          "保留三段结构",
          "把核心词 learning new skills 替换成新主题",
          "第二段至少替换一个理由，避免生硬套模板",
          "结尾根据主体调整建议对象：学生/学校/父母/政府/媒体"
        ]
      },
      "commonMistakes": [
        {
          "mistake": "只套模板但没有替换核心词",
          "whyWrong": "阅卷时会显得空泛，容易跑题。",
          "fix": "至少重复核心词 learning new skills 2-3 次。"
        },
        {
          "mistake": "第二段两个理由本质重复",
          "whyWrong": "主体段缺少展开层次。",
          "fix": "一个理由写个人成长，一个理由写社会/未来要求。"
        },
        {
          "mistake": "结尾没有建议",
          "whyWrong": "第三段只总结会显得收束不完整。",
          "fix": "补一句 students/schools/parents/government should..."
        }
      ],
      "scoringChecklist": [
        "是否至少出现核心词 learning new skills 2-3 次？",
        "是否有明确三段？",
        "第二段是否有两个不重复理由？",
        "是否至少使用 4 个连接词？",
        "是否有总结建议句？",
        "是否避免了 taskAnalysis.notTask 中的问题？"
      ],
      "appUse": {
        "recommendedModules": [
          "题型识别",
          "关键词提取",
          "三段提纲",
          "句式背诵",
          "迁移训练",
          "限时写作"
        ],
        "uiHighlights": {
          "blue": "主题句",
          "yellow": "模板句",
          "green": "连接词",
          "purple": "高级表达",
          "red": "易错点",
          "gray": "可替换部分"
        },
        "unlockLogic": "先完成题型识别和三段提纲，再显示范文，防止被动阅读。"
      }
    }
  ]
}

export default cet6WritingDataset;
