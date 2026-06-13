# Tasks

- [x] Task 1: 修改 questions.js - 添加视觉分组字段
  - [x] 为27个主问题添加 `groupId` 和 `isGroupLeader` 字段
  - [x] 定义15个视觉分组（见spec.md中的表格）
  - [x] 确保每个组的第一个问题标记为 `isGroupLeader: true`
  - [x] 保持所有原有问题内容、选项、追问逻辑不变

- [x] Task 2: 修改 SurveyPage.jsx - 实现渐进式展示逻辑
  - [x] 创建辅助函数（getVisualLeaderQuestions, getQuestionsInGroup, getNextUnansweredInGroup）
  - [x] 实现 visibleQueue 状态管理可见问题队列
  - [x] 实现渐进式展开逻辑（handleAnswerWithExpansion）
  - [x] 更新进度条计算逻辑，基于15个视觉主问题
  - [x] 保持原有答案存储和验证逻辑不变

- [x] Task 3: 修改 SurveyPage.css - 添加渐进式动画样式
  - [x] 添加 questionFadeIn 淡入动画效果
  - [x] 添加 expanded-question 特殊样式（左侧边框+渐变背景）
  - [x] 优化进度条样式（平滑过渡动画）
  - [x] 添加 group-indicator 组内子问题标识样式

- [x] Task 4: 验证和测试
  - [x] 运行 `npm run build` 确保构建成功（exit_code: 0, built in 1.06s）
  - [x] 验证所有代码修改正确无误

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2] (或可与Task2并行)
- [Task 4] depends on [Task 1, Task 2, Task 3]
