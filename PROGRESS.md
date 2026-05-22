# 宿舍匹配器 - 进度记录

## 已完成

### Phase 1: 项目初始化 & v1 开发
- [x] 搜索GitHub参考项目（6个）
- [x] 确定技术方案（React + Vite + localStorage）
- [x] 创建项目结构
- [x] 开发v1版本（大类标签页式问卷）

### Phase 2: v2 重构
- [x] 移除大类标签页，改为流式一题一页问答
- [x] 每题添加自定义补充说明功能
- [x] 添加条件追问（游戏类型+语音习惯）
- [x] 替换直接问I/E为8道真实MBTI情境题
- [x] 性格维度权重从0.7-1.0提升到1.5-2.0
- [x] 匹配算法添加性格加分和游戏类型加分
- [x] 匹配结果展示MBTI类型和补充说明
- [x] 首页移除六大维度展示，改为自然描述
- [x] git tag v2 打标
- [x] 复制到 dorm-matcher-v3 作为v3实验版
- [x] 创建上下文和记忆文件

### Phase 3: v3 睡眠板块优化
- [x] 重新设计睡眠问题：bed_time（几点上床）+ bed_activity（上床后做什么）+ sleep_time（几点入睡）
- [x] 非线性选项值：22:00前=0, 22:00-23:00=2, 23:00-00:00=4, 00:00-01:00=5, 01:00后=6
- [x] 残差连接式追问链：bed_time→bed_activity→5种条件追问（灯光/音乐/视频/聊天/游戏语音）
- [x] followUps 支持数组格式（多条件分支）+ 递归嵌套
- [x] normalizeFollowUps() 统一处理旧格式（对象）和新格式（数组）
- [x] getVisibleQuestions / getFlatQuestions 改为递归实现
- [x] 添加 getDescendantIds 辅助函数
- [x] SurveyPage 切换答案时自动清理子孙问题答案
- [x] matching.js 更新冲突检测（16种冲突对，新增4种睡眠相关）
- [x] matching.js 和谐点改用归一化差值判断（适配非线性值）
- [x] maxPossibleMSE 从16调整为36（适配非线性值范围0-6）

### Phase 4: v3 言行一致性与游戏行为
- [x] 言行一致性验证问题对：room_tidy ↔ room_tidy_reversed
- [x] 社会期望偏差折扣：socialDesirabilityBias = 0.7
- [x] 一致性分数计算：getConsistencyScore()，低于70分时分数打折
- [x] 高考后状态问题：summer_behavior + current_vs_summer
- [x] 状态差异折扣：|summer - current| > 2 时分数打9折
- [x] 游戏行为风险等级：getGameBehaviorProfile() → low/medium/high
- [x] 游戏时长权重：game_duration（0-4，非线性）
- [x] 游戏动机区分：game_motivation（放松/社交/竞技/打发时间/沉迷）
- [x] 游戏自控力：game_self_control（0-4）
- [x] 游戏行为兼容性计算：gameBehaviorCompatibility()
- [x] 冲突风险新增游戏风险因素展示

### Phase 5: v3 测试与反馈机制
- [x] 内置4类测试宿舍数据（TEST_DORMITORIES）：深夜游戏/早睡早起/学霸互助/社交活跃
- [x] 每个宿舍6名成员，共24名测试用户
- [x] 测试用户包含：id, name, tagline, mbti, answers
- [x] MatchPage 新增测试宿舍标签页（默认显示）
- [x] 宿舍平均分排名展示
- [x] 个人匹配详情可展开查看：游戏习惯、各维度得分、和谐点、潜在冲突
- [x] 游戏风险标签显示（🟢自律型/🟡普通型/🔴放飞型）
- [x] 反馈按钮：👍符合预期 / 👎不太符合
- [x] 反馈数据存储：addFeedback() / getFeedback()
- [x] CSS样式更新：测试模式徽章、标签页导航、宿舍卡片、反馈按钮
- [x] 构建验证通过，开发服务器 http://localhost:3002/

### Phase 6: v3 优先级系统与桥接人格
- [x] 优先级选择页面（问卷前）：最多选3项，支持排序
- [x] 10个优先级项：安静环境、作息同步、游戏搭子、干净整洁、学习氛围、社交互动、阅读看书、个人空间、无烟环境、空调温度
- [x] 排名加成：第1名+0.2，第2名+0.1，第3名无加成
- [x] 优先级影响机制：维度加分/扣分 + 冲突风险放大 + 游戏/性格权重乘数
- [x] 桥接人格识别：game_study_bridge、late_quiet_bridge、game_quiet_bridge、game_clean_bridge、early_social_bridge
- [x] 妥协力评分（0-100）：基于MBTI + 冲突处理方式 + 游戏自控力
- [x] 宿舍分配算法：分层分配策略（纯匹配优先 → 桥接混合 → 贪心聚类兜底）
- [x] Softmax分数差距放大（temperature=8）
- [x] 话题兼容性计算：共同话题匹配度

### Phase 7: v3 价值观问题与MBTI题库
- [x] 价值观问题（3题）：college_expectation、future_plan、study_motivation
- [x] 社会期望偏差折扣（0.8-0.85）
- [x] MBTI题库（21道题）：EI:6, SN:5, TF:5, JP:5
- [x] 随机抽选：每维度2道，共8道
- [x] 同一会话题目保持不变（localStorage种子）

## 待开发（v3 方向）
- [ ] 其他板块条件追问（如卫生、学习等）
- [ ] 问卷分步引导
- [ ] 可视化雷达图
- [ ] 导出/分享匹配结果
- [ ] 移动端适配优化
- [ ] 数据导入导出完善

## 当前版本特性总览
- 非线性睡眠选项值（0,2,4,5,6）
- 残差连接式条件追问（床时间→床活动→灯光/音乐/视频/聊天/游戏）
- 言行一致性验证与社会期望偏差处理
- 游戏行为聚类（时长/动机/自控力三维度）
- 优先级系统（最多3项，排名加成）
- 桥接人格系统（混合特质匹配）
- 分层宿舍分配算法
- Softmax分数差距放大
- MBTI随机题库（8题）
- 价值观问题（大学期望、未来规划、学习动力）
- 测试宿舍数据（24人，4类宿舍）
- 反馈机制（👍/👎）

## 文件结构
```
d:\程序\宿舍trae\
├── dorm-matcher/          ← v2 稳定版 (git tag: v2)
│
└── dorm-matcher-v3/       ← v3 实验版（当前工作目录）
    ├── CONTEXT.md          ← 项目上下文
    ├── MEMORY.md           ← 开发记忆
    ├── PROGRESS.md         ← 进度记录（本文件）
    ├── src/
    │   ├── data/questions.js   ← 问卷数据（含追问、MBTI题、非线性值）
    │   ├── pages/
    │   │   ├── HomePage.jsx + .css
    │   │   ├── SurveyPage.jsx + .css
    │   │   ├── MatchPage.jsx + .css
    │   │   ├── ProfilePage.jsx + .css
    │   │   └── GroupMatchPage.jsx + .css
    │   ├── utils/
    │   │   ├── matching.js     ← 匹配算法（16种冲突对）
    │   │   └── storage.js
    │   ├── App.jsx + .css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```
