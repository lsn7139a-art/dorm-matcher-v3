# Checklist

- [x] questions.js 中所有27个主问题已添加 `groupId` 字段
- [x] questions.js 中15个视觉组的首问题已标记 `isGroupLeader: true`
- [x] SurveyPage.jsx 中实现了辅助函数（getVisualLeaderQuestions, getQuestionsInGroup, getNextUnansweredInGroup）
- [x] SurveyPage.jsx 导航逻辑支持渐进式展开（visibleQueue + handleAnswerWithExpansion）
- [x] 进度条显示格式为 "X/15" 而非 "X/27"
- [x] 回答视觉主问题后，同组追问正确插入到问题队列
- [x] 所有原有问题的内容、选项、权重、维度保持不变
- [x] 所有原有追问链（bed_activity→5种条件追问等）正常工作
- [x] MBTI题库（8道）作为单个视觉问题正常工作
- [x] `npm run build` 构建成功无错误（exit_code: 0）
- [x] 问卷可以完整填写并提交
- [x] 匹配算法能正确读取压缩后的答案数据
