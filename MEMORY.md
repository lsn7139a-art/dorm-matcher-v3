# 宿舍匹配器 - 开发记忆

## 用户偏好
- 不喜欢把人分门别类，问卷应该自然流畅
- 认为个人习惯是模糊概念，需要灵活的自定义选项
- 重视找到志同道合的伙伴（如游戏搭子）
- 认为性格特点比生活习惯更能说明一个人，权重应更大
- 不喜欢直接问"你是I人还是E人"，觉得自己也分不清
- 希望通过真实场景题来了解性格
- 睡眠板块：重要的是"何时安静"，但不能直白地问，需通过分支追问推导
- 睡眠选项权重应非线性：早睡vs晚睡差异大，"都熬夜"差异小
- 喜欢"残差连接"式追问：每选一个选项，下一题基于前一个答案延伸

## 代码风格
- 中文界面
- React 函数组件 + Hooks
- CSS 独立文件，CSS变量定义在 index.css
- 无注释风格（用户要求不加注释）
- localStorage 键名: dorm_matcher_users, dorm_matcher_current

## 重要提醒
- 每次改版前先 git commit + tag
- v2 已打 tag，可通过 git checkout v2 回退
- dorm-matcher/ 是v2稳定版，dorm-matcher-v3/ 是v3实验版
- 用户习惯用 PowerShell，命令用分号 ; 而不是 &&

## 已知问题
- SurveyPage 中 visibleQuestions 依赖 answers 状态，条件追问的显示依赖 useMemo
- getAnswersVector 过滤了 type==='multi' 的题（游戏类型不参与数值向量匹配）
- 游戏类型匹配是独立的 gameTypesMatch 函数，加分上限5分
- MBTI计算基于加权分数，可能不够精确（但足够用于室友匹配场景）
- 条件追问未回答时 getAnswersVector 默认返回0（对睡眠追问题来说=最安静选项，合理）

## 匹配算法细节
- 最终分数 = round(mseScore * 0.55 + cosScore * 0.45 + personalityBonus + gameBonus)
- personalityBonus = (personalityScore - 50) * 0.15
- gameBonus = gameMatchRatio * 5
- 分数范围 0-100
- 等级: high(>=80), medium(>=60), low-medium(>=40), low(<40)
- 冲突检测: 16种关键冲突对，睡眠类threshold=3（因非线性值），其余threshold=2
- maxPossibleMSE = 36（因睡眠选项值范围0-6，最大差值平方=36）

## v3 睡眠板块设计
### 非线性选项值（bed_time / sleep_time）
- 22:00前=0, 22:00-23:00=2, 23:00-00:00=4, 00:00-01:00=5, 01:00后=6
- 效果：22:00前vs23:00-00:00差4（大），23:00-00:00vs00:00-01:00差1（小）

### 残差连接式追问链
- bed_time（几点上床）→ bed_activity（上床后做什么）→ 条件追问：
  - 看书学习 → bed_light（灯光）
  - 听音乐播客 → bed_music_habit（耳机/外放）
  - 刷手机看视频 → bed_media_habit（耳机/外放/亮度）
  - 和室友聊天 → bed_chat_duration（聊多久）
  - 打游戏 → bed_game_voice（开语音吗）
- sleep_time（几点真正入睡）→ 无追问
- wake_time / sleep_sensitivity 保留

### followUps 格式
- 旧格式（对象）: { condition, questions } — 单分支，game_habit仍在用
- 新格式（数组）: [{ condition, questions }, ...] — 多分支，bed_time/bed_activity用
- normalizeFollowUps() 统一处理两种格式
- getVisibleQuestions / getFlatQuestions 改为递归，支持任意嵌套深度

### 答案清理
- 切换父问题答案时，自动清理所有子孙问题的答案（getDescendantIds）
- 避免已隐藏的追问答案残留在状态中

## v3 言行一致性与高考后状态
### 社会期望偏差处理
- 部分问题（如 room_tidy）有 socialDesirabilityBias = 0.7
- 存在一致性验证问题对（consistencyPartner）：room_tidy ↔ room_tidy_reversed
- getSocialDesirabilityDiscount() 对双方都选择高值（>=3）且一致性验证通过的情况应用折扣
- 一致性分数计算：getConsistencyScore()，低于70分时最终分数打折

### 高考后状态差异
- summer_behavior：暑假过得怎么样（放飞程度）
- current_vs_summer：和暑假相比现在状态（收敛程度）
- 当 |summer - current| > 2 时，最终分数打9折（考虑状态不稳定）

## v3 游戏行为聚类
### 游戏风险等级（getGameBehaviorProfile）
- low：偶尔玩玩，自控力强
- medium：经常玩或有一定游戏时长
- high：游戏时长>=3小时 或 动机为沉迷/打发时间 或 自控力差 或 经常开麦

### 游戏行为兼容性（gameBehaviorCompatibility）
- high + high = 1.0（都是游戏搭子）
- low + low = 1.0（作息都规律）
- low + high = 0.4（作息差异大）
- low + medium = 0.7
- medium + high = 0.6
- medium + medium = 0.9

## v3 测试与反馈机制
### 测试数据（TEST_DORMITORIES）
- 4类测试宿舍：深夜游戏宿舍、早睡早起宿舍、学霸互助宿舍、社交活跃宿舍
- 每个宿舍6名成员，共24名测试用户
- 每人有一句话简介（tagline）和MBTI类型
- [TEST_VERSION_ONLY] 正式版必须删除

### 反馈机制
- 存储键名：FEEDBACK_STORAGE_KEY（'dorm_matcher_feedback'）
- addFeedback() / getFeedback() / clearFeedback()
- 用户可对每个匹配结果 👍/👎 反馈
- 反馈数据包含：fromUserId, toUserId, toUserName, isPositive, reason, matchScore, dormName

## v3 优先级系统
### 优先级项（最多选3项）
- 安静环境 🤫 → sleep (1.8x)
- 作息同步 🕐 → sleep (1.6x)
- 游戏搭子 🎮 → entertainment (2.0x)
- 干净整洁 ✨ → cleanliness (1.7x)
- 学习氛围 📚 → study (1.8x)
- 社交互动 🎉 → lifestyle (1.5x)
- 阅读看书 📖 → study (1.4x)
- 个人空间 🔒 → lifestyle (1.3x)
- 无烟环境 🚭 → lifestyle (1.6x)
- 空调温度 ❄️ → lifestyle (1.2x)

### 排名加成
- 第1名：+0.2
- 第2名：+0.1
- 第3名：无加成

### 优先级影响机制
1. 维度加分/扣分：优先维度得分≥70加分，<40扣分
2. 冲突风险放大：优先维度+高风险→额外惩罚
3. 游戏/性格权重乘数

## v3 桥接人格系统
### 桥接类型
- game_study_bridge：打游戏但爱学习
- late_quiet_bridge：晚睡但能保持安静
- game_quiet_bridge：打游戏但能控制音量
- game_clean_bridge：打游戏但爱干净
- early_social_bridge：早睡但爱社交

### 妥协力评分（0-100）
- MBTI F型加分，T型减分
- 冲突处理方式：私下聊(+10) > 开会(+8) > 直接说(+5) > 忍着(-5)
- 游戏自控力：能主动停(+8)，停不下来(-5)

## v3 宿舍分配算法
### 分层分配策略
1. 纯匹配优先：重度玩家→游戏宿舍，学霸→学霸宿舍，社交活跃→社交宿舍
2. 桥接混合：2游戏+2安静+2桥接→混合宿舍
3. 贪心聚类兜底：基于特质相似度分组，保证第一特征相似

### Softmax分数差距放大
- temperature=8适度放大差异
- 使宿舍排名更明显

## v3 价值观问题（新增）
- college_expectation：大学生活期待（权重0.7，社会期望折扣0.8）
- future_plan：未来规划（权重0.7，社会期望折扣0.8）
- study_motivation：学习动力（权重0.6，社会期望折扣0.85）

## v3 MBTI题库
- 4个维度共21道题（EI:6, SN:5, TF:5, JP:5）
- 每维度随机抽2道，共8道
- 同一会话题目保持不变（localStorage存储种子）
