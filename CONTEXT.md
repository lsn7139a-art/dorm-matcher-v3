# 宿舍匹配器 - 项目上下文

## 项目概述
通过问卷分析生活习惯、性格特点等维度，智能匹配最合拍的室友，帮助开学前选择宿舍。

## 技术栈
- React 18 + React Router 6 + Vite 5
- 纯前端，数据存储在 localStorage
- 无后端依赖，开箱即用

## 参考的 GitHub 项目
| 项目 | 参考点 |
|------|--------|
| RoommateDistributor (Vue+SpringBoot) | 问卷分类设计、宿舍可视化 |
| Uni-House (微信小程序) | 问卷维度设计 |
| Personality-Matchmaking-System (Python) | 核心匹配算法（加权MSE） |
| StayMatch (生活方式兼容性引擎) | 冲突风险预测、和谐点分析 |
| RoomMateMatch (MERN栈) | 余弦相似度匹配 |
| room[ease] | 兼容性百分比匹配 |

## 版本历史

### v2（当前 dorm-matcher/ 目录，git tag: v2）
- 流式一题一页问答（移除了大类标签页）
- 每题可自定义补充说明（"✏️ 想补充说明一下..."）
- 条件追问（选打游戏→追问游戏类型+语音习惯）
- 8道真实MBTI情境题（E/I、S/N、T/F、J/P四维度）
- 性格维度权重加大（1.5-2.0），匹配算法有性格加分
- 游戏类型匹配（识别共同游戏，标注"游戏搭子"）
- 匹配结果展示MBTI类型、补充说明、和谐点、冲突风险
- 群组匹配（2-6人宿舍兼容性分析）

### v1（初始版本，已被v2覆盖）
- 六大类标签页式问卷（作息/卫生/学习/娱乐/生活/性格）
- 固定选项无自定义
- 直接问I人E人
- 无条件追问

## 核心文件说明

### src/data/questions.js
问卷数据模型。QUESTIONS 数组包含所有问题，每个问题有：
- id, text, icon, options, weight, dimension
- allowCustom: 是否允许自定义补充
- customPlaceholder: 自定义输入的占位文字
- type: 'single'(默认) 或 'multi'(多选，如游戏类型)
- followUps: 条件追问配置 { condition, questions }
- mbtiDimension: 'EI'/'SN'/'TF'/'JP'（仅MBTI题有）

辅助函数：
- getFlatQuestions(): 获取所有问题（含追问）
- getVisibleQuestions(answers): 根据已回答获取可见问题（含条件追问）
- getAnswersVector(answers): 获取数值向量（用于匹配算法）
- getWeightsVector(): 获取权重向量
- getDimensionLabel(dim): 维度中文名
- getMbtiResult(answers): 计算MBTI类型

### src/utils/matching.js
匹配算法核心。
- calculateCompatibility(userA, userB): 两两匹配
  - 加权MSE（55%权重）+ 余弦相似度（45%权重）
  - 性格维度额外加分 personalityBonus
  - 游戏类型匹配加分
  - 返回: score, level, categories, conflictRisks, harmonyPoints, mbtiA, mbtiB
- findBestMatches(currentUser, allUsers, topN): 排名推荐
- generateGroupMatch(users): 群组匹配

### src/utils/storage.js
localStorage 数据管理。
- getAllUsers(), saveUser(), deleteUser(), getUserById()
- setCurrentUserId(), getCurrentUserId(), getCurrentUser()
- createUser(name, answers), generateId()
- exportData(), importData(), clearAllData()

### src/pages/SurveyPage.jsx
流式问卷页面。一题一页，支持：
- 单选/多选
- 自定义补充文本
- 条件追问（根据前序回答动态显示）
- 进度条显示

### src/pages/MatchPage.jsx
匹配结果页面。展示：
- 当前用户MBTI类型卡片
- 匹配排名列表（可展开详情）
- 各维度匹配度进度条
- 和谐点标签、冲突风险列表
- 对方的自定义补充说明

### src/pages/GroupMatchPage.jsx
群组匹配页面。选择2-6人，分析整个宿舍兼容性。

### src/pages/ProfilePage.jsx
个人档案页面。查看/修改问卷、MBTI类型、删除数据。

### src/pages/HomePage.jsx
首页。输入名字开始问卷，已有用户快速进入。

## 设计决策记录

1. **移除大类标签页** - 用户反馈"不希望把人分门别类"，改为自然流转的问答
2. **添加自定义补充** - 用户反馈"个人习惯是模糊概念"，需要灵活性
3. **条件追问** - 用户反馈"打游戏应该延伸出具体玩什么"，找志同道合的伙伴
4. **真实MBTI情境题** - 用户反馈"直接问I人E人自己也分不清"，改为场景题
5. **性格权重加大** - 用户反馈"性格特点更能说明一个人内心"

## 运行方式
```bash
cd dorm-matcher
npm install
npm run dev    # 开发服务器 http://localhost:3001
npm run build  # 构建生产版本
```

## 待改进方向（v3 可考虑）
- 更多条件追问场景（如选了"经常外放"→追问什么类型内容）
- 问卷分步引导（先问轻松的，再问深入的）
- 可视化雷达图展示匹配维度
- 导出/分享匹配结果
- 移动端适配优化
- 数据导入导出功能完善
