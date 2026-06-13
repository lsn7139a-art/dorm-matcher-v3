# 渐进式问卷压缩 Spec

## Why
当前问卷有27个主问题，学生可能因为问题数量多而产生疲劳，导致瞎写降低数据真实性。需要一种新的展示方式：表面只显示15个左右的主问题，将相关问题"打包"成一道题，采用渐进式/流式的方式在回答后展开追问。

## What Changes
- **新增 `questionGroup` 字段**：标记哪些问题属于同一个"视觉组"，表面显示为一道题
- **修改 SurveyPage 展示逻辑**：只显示15个"视觉主问题"，回答后渐进式展开组内追问
- **进度条计算调整**：基于"视觉问题数"而非实际问题数
- **保留所有原有问题和内容**：不做任何删除或合并

### 压缩方案（27 → 15个视觉问题）

| 视觉问题ID | 包含的原问题 | 维度 |
|-----------|-------------|------|
| 1. summer_behavior | summer_behavior (+追问) | personality |
| 2. sleep_routine | bed_time + sleep_time + wake_time | sleep |
| 3. sleep_quality | sleep_sensitivity + late_night_scenario + alarm_reaction | sleep |
| 4. cleanliness | room_tidy + room_tidy_reversed + shower_freq + trash_habit | cleanliness |
| 5. study_habit | study_place + study_noise | study |
| 6. gaming | game_habit (+5追问) | entertainment |
| 7. media_hobby | music_video + hobby_main (+3追问) | entertainment |
| 8. lifestyle | ac_temp + smoking + guest_policy | lifestyle |
| 9. mbti_dynamic | mbti_dynamic (8道MBTI题) | personality |
| 10. conflict_style | conflict_style | personality |
| 11. sharing | sharing | personality |
| 12. ideal_dorm | ideal_dorm | personality |
| 13. college_expectation | college_expectation | personality |
| 14. future_plan | future_plan | personality |
| 15. study_motivation | study_motivation | personality |

## Impact
- Affected code: [questions.js, SurveyPage.jsx, SurveyPage.css]
- Affected specs: 问卷展示逻辑、进度条计算、问题导航

## ADDED Requirements

### Requirement: 视觉分组系统
The system SHALL provide a question grouping mechanism that:
- Groups related questions into "visual groups" displayed as a single question to the user
- Shows only the first question of each group in the main question list
- Progressively reveals follow-up questions within the same group after answering
- Maintains all original question content and logic unchanged

#### Scenario: 用户看到压缩后的问卷
- **WHEN** user opens the survey page
- **THEN** they see only 15 main questions (visual groups) instead of 27
- **AND** progress bar shows X/15 instead of X/27

#### Scenario: 渐进式展开追问
- **WHEN** user answers a visual main question (e.g., "sleep_routine")
- **THEN** the next question in that group (e.g., bed_time's follow-up bed_activity) appears as the next step
- **AND** this continues until all questions in the group are answered
- **THEN** the survey moves to the next visual group

### Requirement: 进度条适配
The system SHALL calculate progress based on:
- Visual question count (15) for display purposes
- Actual answered question count for completion detection

#### Scenario: 进度条正确显示
- **WHEN** user has answered 3 visual questions completely
- **THEN** progress shows "3/15 (20%)"

## MODIFIED Requirements

### Requirement: QUESTIONS 数据结构
Each question SHALL have an optional `groupId` field:
- Questions with the same `groupId` belong to one visual group
- The first question in each group is the "visible main question"
- Subsequent questions are hidden until their predecessors are answered

```javascript
// Example structure
{
  id: 'bed_time',
  groupId: 'sleep_routine',  // NEW: group identifier
  isGroupLeader: true,       // NEW: marks this as the visible question
  text: '你通常几点上床？',
  // ... rest unchanged
}
```

### Requirement: SurveyPage 导航逻辑
The navigation SHALL:
1. Filter visible questions to show only `isGroupLeader` questions initially
2. When a group leader is answered, insert its follow-ups into the visible queue
3. Update progress calculation to use visual question count

## REMOVED Requirements
None - All original content preserved
