import { getFlatQuestions, getAnswersVector, getWeightsVector, getDimensionLabel, getMbtiResult, getConsistencyScore, getGameBehaviorProfile, getTopicCompatibility, getDynamicGameWeight, getPriorityWeights } from '../data/questions'

function softmax(scores, temperature = 2.0) {
  const maxScore = Math.max(...scores)
  const exps = scores.map(s => Math.exp((s - maxScore) / temperature))
  const sumExps = exps.reduce((a, b) => a + b, 0)
  return exps.map(e => e / sumExps)
}

function applySoftmaxToDormScores(dormMatches) {
  if (dormMatches.length <= 1) return dormMatches
  const rawScores = dormMatches.map(d => d.avgScore)
  const probs = softmax(rawScores, 8)
  const maxProb = Math.max(...probs)
  const rescaledScores = probs.map(p => Math.round((p / maxProb) * 100))
  return dormMatches.map((dorm, i) => ({
    ...dorm,
    avgScore: rescaledScores[i],
    rawAvgScore: rawScores[i]
  }))
}

function weightedMSE(vecA, vecB, weights) {
  let sum = 0
  let weightSum = 0
  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - vecB[i]
    sum += weights[i] * diff * diff
    weightSum += weights[i]
  }
  return weightSum > 0 ? sum / weightSum : 0
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  if (normA === 0 || normB === 0) return 0
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

function gameTypesMatch(typesA, typesB) {
  if (!typesA || !typesB) return 0
  if (!Array.isArray(typesA) || !Array.isArray(typesB)) return 0
  if (typesA.length === 0 || typesB.length === 0) return 0
  const common = typesA.filter(t => typesB.includes(t))
  return common.length / Math.max(typesA.length, typesB.length)
}

function getSocialDesirabilityDiscount(answersA, answersB, questionId) {
  const allQuestions = getFlatQuestions()
  const q = allQuestions.find(q => q.id === questionId)
  if (!q || !q.socialDesirabilityBias) return 1.0

  const a = answersA[questionId] ?? 2
  const b = answersB[questionId] ?? 2

  const bothHigh = a >= 3 && b >= 3
  if (!bothHigh) return 1.0

  const reverseQ = allQuestions.find(rq => rq.consistencyPartner === questionId)
  if (!reverseQ) return q.socialDesirabilityBias

  const revA = answersA[reverseQ.id]
  const revB = answersB[reverseQ.id]

  if (revA === undefined || revB === undefined) return q.socialDesirabilityBias

  const aMismatch = Math.abs(a - revA)
  const bMismatch = Math.abs(b - revB)

  if (aMismatch <= 1 && bMismatch <= 1) return q.socialDesirabilityBias

  if (aMismatch >= 2 || bMismatch >= 2) return 0.3

  return q.socialDesirabilityBias * 0.6
}

function dimensionScore(answersA, answersB, dimension) {
  const allQuestions = getFlatQuestions()
  const dimQuestions = allQuestions.filter(q => q.dimension === dimension && q.type !== 'multi' && !q.isReversed)
  if (dimQuestions.length === 0) return 50

  let totalDiff = 0
  let totalWeight = 0
  for (const q of dimQuestions) {
    const a = answersA[q.id]
    const b = answersB[q.id]
    if (a === undefined || b === undefined) continue
    const maxVal = Math.max(...q.options.map(o => o.value))
    const diff = Math.abs(a - b) / Math.max(maxVal, 1)

    let discount = 1.0
    if (q.consistencyPartner) {
      discount = getSocialDesirabilityDiscount(answersA, answersB, q.id)
    }

    totalDiff += diff * q.weight * discount
    totalWeight += q.weight * discount
  }
  if (totalWeight === 0) return 50
  const avgDiff = totalDiff / totalWeight
  return Math.round((1 - avgDiff) * 100)
}

function gameBehaviorCompatibility(profileA, profileB) {
  if (profileA.riskLevel === 'low' && profileB.riskLevel === 'low') {
    return 1.0
  }
  if (profileA.riskLevel === 'high' && profileB.riskLevel === 'high') {
    return 1.0
  }
  if (profileA.riskLevel === 'low' && profileB.riskLevel === 'high') {
    return 0.4
  }
  if (profileA.riskLevel === 'low' && profileB.riskLevel === 'medium') {
    return 0.7
  }
  if (profileA.riskLevel === 'medium' && profileB.riskLevel === 'high') {
    return 0.6
  }
  if (profileA.riskLevel === 'medium' && profileB.riskLevel === 'medium') {
    return 0.9
  }
  return 0.8
}

function getConflictRisks(answersA, answersB) {
  const risks = []
  const allQuestions = getFlatQuestions()

  const criticalPairs = [
    { q: 'bed_time', label: '上床时间差异大', threshold: 3 },
    { q: 'sleep_time', label: '入睡时间差异大', threshold: 3 },
    { q: 'bed_activity', label: '睡前活动差异大', threshold: 3 },
    { q: 'sleep_sensitivity', q2: 'bed_game_voice', label: '睡眠浅 vs 床上游戏语音', threshold: 2 },
    { q: 'sleep_sensitivity', q2: 'bed_media_habit', label: '睡眠浅 vs 床上外放视频', threshold: 2 },
    { q: 'sleep_sensitivity', q2: 'bed_music_habit', label: '睡眠浅 vs 床上外放音乐', threshold: 2 },
    { q: 'sleep_sensitivity', q2: 'bed_light', label: '睡眠浅 vs 床上开大灯', threshold: 2 },
    { q: 'sleep_sensitivity', q2: 'game_voice', label: '睡眠浅 vs 游戏语音', threshold: 2 },
    { q: 'sleep_sensitivity', q2: 'music_video', label: '睡眠浅 vs 外放音视频', threshold: 2 },
    { q: 'room_tidy', label: '整洁度差异大', threshold: 2 },
    { q: 'smoking', label: '吸烟态度冲突', threshold: 2 },
    { q: 'ac_temp', label: '空调温度偏好差异', threshold: 2 },
    { q: 'study_noise', q2: 'game_voice', label: '学习需安静 vs 游戏语音', threshold: 2 },
    { q: 'study_noise', q2: 'music_video', label: '学习需安静 vs 外放音视频', threshold: 2 },
    { q: 'guest_policy', label: '访客态度差异', threshold: 2 },
    { q: 'ideal_dorm', label: '理想宿舍生活差异大', threshold: 2 },
  ]

  for (const pair of criticalPairs) {
    const a1 = answersA[pair.q] ?? 0
    const a2 = answersB[pair.q2 || pair.q] ?? 0
    const diff = Math.abs(a1 - a2)
    if (diff >= pair.threshold) {
      const q1Info = allQuestions.find(q => q.id === pair.q)
      const q2Info = allQuestions.find(q => q.id === (pair.q2 || pair.q))
      const optA = q1Info?.options.find(o => o.value === a1)
      const optB = q2Info?.options.find(o => o.value === a2)
      risks.push({
        label: pair.label,
        severity: diff >= pair.threshold * 1.5 ? 'high' : 'medium',
        detailA: optA?.label || '',
        detailB: optB?.label || ''
      })
    }
  }

  const profileA = getGameBehaviorProfile(answersA)
  const profileB = getGameBehaviorProfile(answersB)

  if (profileA.riskLevel === 'high' && profileB.riskLevel === 'low') {
    for (const factor of profileA.riskFactors) {
      risks.push({
        label: `室友游戏风险: ${factor}`,
        severity: 'medium',
        detailA: factor,
        detailB: '对方作息规律'
      })
    }
  }
  if (profileB.riskLevel === 'high' && profileA.riskLevel === 'low') {
    for (const factor of profileB.riskFactors) {
      risks.push({
        label: `室友游戏风险: ${factor}`,
        severity: 'medium',
        detailA: '对方作息规律',
        detailB: factor
      })
    }
  }

  return risks
}

function getHarmonyPoints(answersA, answersB) {
  const points = []
  const allQuestions = getFlatQuestions()

  const harmonyChecks = [
    { q: 'bed_time', label: '上床时间一致' },
    { q: 'sleep_time', label: '入睡时间一致' },
    { q: 'bed_activity', label: '睡前活动相似' },
    { q: 'room_tidy', label: '整洁度相似' },
    { q: 'ac_temp', label: '空调温度偏好一致' },
    { q: 'smoking', label: '吸烟态度一致' },
    { q: 'conflict_style', label: '矛盾处理方式相似' },
    { q: 'ideal_dorm', label: '理想宿舍生活相似' },
    { q: 'study_place', label: '学习地点偏好相似' },
  ]

  for (const check of harmonyChecks) {
    const a = answersA[check.q] ?? 0
    const b = answersB[check.q] ?? 0
    const qInfo = allQuestions.find(q => q.id === check.q)
    if (!qInfo) continue
    const maxVal = Math.max(...qInfo.options.map(o => o.value))
    const normalizedDiff = Math.abs(a - b) / Math.max(maxVal, 1)
    if (normalizedDiff <= 0.3) {
      points.push({
        label: check.label,
        detail: qInfo?.options.find(o => o.value === a)?.label || ''
      })
    }
  }

  const profileA = getGameBehaviorProfile(answersA)
  const profileB = getGameBehaviorProfile(answersB)

  if (profileA.riskLevel === 'high' && profileB.riskLevel === 'high') {
    points.push({
      label: '都是游戏搭子',
      detail: '两人游戏习惯相近'
    })
  }

  if (profileA.riskLevel === 'low' && profileB.riskLevel === 'low') {
    points.push({
      label: '作息都很规律',
      detail: '两人都不熬夜'
    })
  }

  const gameTypesA = answersA.game_types
  const gameTypesB = answersB.game_types
  if (Array.isArray(gameTypesA) && Array.isArray(gameTypesB)) {
    const common = gameTypesA.filter(t => gameTypesB.includes(t))
    if (common.length > 0) {
      const gameLabels = {
        moba: 'MOBA', fps: 'FPS', rpg: 'RPG', strategy: '策略',
        party: '派对游戏', card: '卡牌', survival: '生存建造', other: '其他'
      }
      points.push({
        label: `都玩${common.map(t => gameLabels[t] || t).join('/')}`,
        detail: '游戏搭子！'
      })
    }
  }

  const topicCompat = getTopicCompatibility(answersA, answersB)
  if (typeof topicCompat === 'object' && topicCompat.commonItems.length > 0) {
    const topicLabels = {
      game: '游戏', anime: '动漫', movie: '影视', music: '音乐',
      sports: '体育', tech: '科技', study: '学习', life: '生活',
      meme: '梗/段子', reading: '阅读', art: '艺术', novel: '网文', other: '其他'
    }
    points.push({
      label: `都聊${topicCompat.commonItems.slice(0, 3).map(t => topicLabels[t] || t).join('/')}`,
      detail: topicCompat.commonItems.length > 3 ? `还有${topicCompat.commonItems.length - 3}个共同话题` : '话题很合！'
    })
  }

  return points
}

export function calculateCompatibility(userA, userB) {
  const vecA = getAnswersVector(userA.answers)
  const vecB = getAnswersVector(userB.answers)
  const weights = getWeightsVector()

  const mse = weightedMSE(vecA, vecB, weights)
  const maxPossibleMSE = 36
  const mseScore = Math.max(0, Math.min(100, Math.round((1 - mse / maxPossibleMSE) * 100)))

  const cosSim = cosineSimilarity(vecA, vecB)
  const cosScore = Math.round(((cosSim + 1) / 2) * 100)

  let finalScore = Math.round(mseScore * 0.55 + cosScore * 0.45)

  const priorityWeightsA = getPriorityWeights(userA.priorities)
  const priorityWeightsB = getPriorityWeights(userB.priorities)

  const personalityScore = dimensionScore(userA.answers, userB.answers, 'personality')
  const personalityBonus = (personalityScore - 50) * 0.15 * Math.max(priorityWeightsA.personality, priorityWeightsB.personality)
  finalScore = Math.round(Math.max(0, Math.min(100, finalScore + personalityBonus)))

  const gameTypesA = userA.answers.game_types
  const gameTypesB = userB.answers.game_types
  if (Array.isArray(gameTypesA) && Array.isArray(gameTypesB) && gameTypesA.length > 0 && gameTypesB.length > 0) {
    const gameMatch = gameTypesMatch(gameTypesA, gameTypesB)
    finalScore = Math.round(Math.min(100, finalScore + gameMatch * 5))
  }

  const profileA = getGameBehaviorProfile(userA.answers)
  const profileB = getGameBehaviorProfile(userB.answers)
  const gameCompat = gameBehaviorCompatibility(profileA, profileB)

  const gameWeightA = getDynamicGameWeight(userA.answers)
  const gameWeightB = getDynamicGameWeight(userB.answers)
  const avgGameWeight = (gameWeightA + gameWeightB) / 2

  const entWeightMultiplier = Math.max(priorityWeightsA.entertainment, priorityWeightsB.entertainment)
  const gameBonus = (gameCompat - 0.5) * 20 * avgGameWeight * entWeightMultiplier
  finalScore = Math.round(Math.max(0, Math.min(100, finalScore + gameBonus)))

  const topicCompat = getTopicCompatibility(userA.answers, userB.answers)
  if (typeof topicCompat === 'object') {
    const topicBonus = (topicCompat.score - 0.5) * 15
    finalScore = Math.round(Math.max(0, Math.min(100, finalScore + topicBonus)))
  }

  const aspirationScore = dimensionScore(userA.answers, userB.answers, 'personality')
  const aspirationBonus = (aspirationScore - 50) * 0.08
  finalScore = Math.round(Math.max(0, Math.min(100, finalScore + aspirationBonus)))

  const consistencyA = getConsistencyScore(userA.answers)
  const consistencyB = getConsistencyScore(userB.answers)
  const avgConsistency = (consistencyA + consistencyB) / 2
  if (avgConsistency < 70) {
    finalScore = Math.round(finalScore * (avgConsistency / 100))
  }

  const summerA = userA.answers.summer_behavior ?? 1
  const currentA = userA.answers.current_vs_summer ?? 1
  const summerB = userB.answers.summer_behavior ?? 1
  const currentB = userB.answers.current_vs_summer ?? 1

  if (Math.abs(summerA - currentA) > 2 || Math.abs(summerB - currentB) > 2) {
    finalScore = Math.round(finalScore * 0.9)
  }

  const dimensions = ['sleep', 'cleanliness', 'study', 'entertainment', 'lifestyle', 'personality']
  const categories = {}
  for (const dim of dimensions) {
    const dimScore = dimensionScore(userA.answers, userB.answers, dim)
    const pWeight = Math.max(priorityWeightsA[dim] || 1, priorityWeightsB[dim] || 1)
    categories[dim] = {
      name: getDimensionLabel(dim),
      score: dimScore,
      priorityWeight: pWeight
    }
  }

  let priorityAdjustment = 0
  for (const dim of dimensions) {
    const dimScore = categories[dim].score
    const pWeight = categories[dim].priorityWeight
    if (pWeight > 1.0) {
      if (dimScore >= 70) {
        priorityAdjustment += (pWeight - 1.0) * 5
      } else if (dimScore < 40) {
        priorityAdjustment -= (pWeight - 1.0) * 8
      }
    }
  }
  finalScore = Math.round(Math.max(0, Math.min(100, finalScore + priorityAdjustment)))

  const conflictRisks = getConflictRisks(userA.answers, userB.answers)
  const harmonyPoints = getHarmonyPoints(userA.answers, userB.answers)

  for (const risk of conflictRisks) {
    const riskDim = getRiskDimension(risk.label)
    if (riskDim) {
      const pWeight = Math.max(priorityWeightsA[riskDim] || 1, priorityWeightsB[riskDim] || 1)
      if (pWeight > 1.3 && risk.severity === 'high') {
        finalScore = Math.round(finalScore * (1 - (pWeight - 1) * 0.08))
      }
    }
  }

  let level = 'low'
  if (finalScore >= 80) level = 'high'
  else if (finalScore >= 60) level = 'medium'
  else if (finalScore >= 40) level = 'low-medium'

  const mbtiA = getMbtiResult(userA.answers)
  const mbtiB = getMbtiResult(userB.answers)

  return {
    score: finalScore,
    level,
    categories,
    conflictRisks,
    harmonyPoints,
    mbtiA: mbtiA.type,
    mbtiB: mbtiB.type,
    gameProfileA: profileA,
    gameProfileB: profileB,
    topicCompatibility: typeof topicCompat === 'object' ? topicCompat : { score: 0.5, commonItems: [] },
    gameWeightA,
    gameWeightB,
    priorityWeightsA,
    priorityWeightsB
  }
}

function getRiskDimension(riskLabel) {
  if (riskLabel.includes('睡眠') || riskLabel.includes('安静') || riskLabel.includes('上床') || riskLabel.includes('入睡') || riskLabel.includes('起床') || riskLabel.includes('闹钟') || riskLabel.includes('夜猫')) return 'sleep'
  if (riskLabel.includes('整洁') || riskLabel.includes('卫生') || riskLabel.includes('干净')) return 'cleanliness'
  if (riskLabel.includes('学习') || riskLabel.includes('看书')) return 'study'
  if (riskLabel.includes('游戏') || riskLabel.includes('外放') || riskLabel.includes('语音')) return 'entertainment'
  if (riskLabel.includes('空调') || riskLabel.includes('吸烟') || riskLabel.includes('访客') || riskLabel.includes('宿舍') || riskLabel.includes('空间')) return 'lifestyle'
  return null
}

export function findBestMatches(currentUser, allUsers, topN = 10) {
  const results = allUsers
    .filter(u => u.id !== currentUser.id)
    .map(user => ({
      user,
      compatibility: calculateCompatibility(currentUser, user)
    }))
    .sort((a, b) => b.compatibility.score - a.compatibility.score)

  return results.slice(0, topN)
}

export function findTestDormMatches(currentUser, testDormitories) {
  const allTestUsers = []
  for (const dorm of testDormitories) {
    for (const member of dorm.members) {
      allTestUsers.push({
        id: member.id,
        name: member.name,
        tagline: member.tagline,
        mbti: member.mbti,
        dormName: dorm.name,
        dormDescription: dorm.description,
        answers: member.answers
      })
    }
  }

  const results = allTestUsers
    .filter(u => u.id !== currentUser.id)
    .map(user => ({
      user,
      compatibility: calculateCompatibility(currentUser, user)
    }))
    .sort((a, b) => b.compatibility.score - a.compatibility.score)

  const dormGroups = {}
  for (const result of results) {
    const dormName = result.user.dormName
    if (!dormGroups[dormName]) {
      dormGroups[dormName] = {
        dormName,
        dormDescription: result.user.dormDescription,
        members: [],
        avgScore: 0
      }
    }
    dormGroups[dormName].members.push(result)
  }

  for (const dormName in dormGroups) {
    const group = dormGroups[dormName]
    const total = group.members.reduce((sum, m) => sum + m.compatibility.score, 0)
    group.avgScore = Math.round(total / group.members.length)
  }

  return {
    individualMatches: results.slice(0, 10),
    dormMatches: applySoftmaxToDormScores(Object.values(dormGroups).sort((a, b) => b.avgScore - a.avgScore))
  }
}

export function generateGroupMatch(users) {
  if (users.length < 2) return null

  let totalScore = 0
  let pairCount = 0
  const pairs = []

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const compat = calculateCompatibility(users[i], users[j])
      pairs.push({
        userA: users[i],
        userB: users[j],
        compatibility: compat
      })
      totalScore += compat.score
      pairCount++
    }
  }

  const avgScore = Math.round(totalScore / pairCount)

  const allRisks = pairs.flatMap(p => p.compatibility.conflictRisks)
  const uniqueRisks = []
  const seen = new Set()
  for (const risk of allRisks) {
    const key = risk.label
    if (!seen.has(key)) {
      seen.add(key)
      uniqueRisks.push(risk)
    }
  }

  return {
    avgScore,
    level: avgScore >= 80 ? 'high' : avgScore >= 60 ? 'medium' : avgScore >= 40 ? 'low-medium' : 'low',
    pairs,
    conflictRisks: uniqueRisks.sort((a, b) => (a.severity === 'high' ? -1 : 1)),
    harmonyPoints: pairs.flatMap(p => p.compatibility.harmonyPoints).filter((p, i, arr) =>
      arr.findIndex(x => x.label === p.label) === i
    )
  }
}

// ============================================================
// 桥接人格 & 妥协性分析
// ============================================================

export function getCompromiseScore(answers) {
  const mbti = getMbtiResult(answers)
  const scores = mbti.scores
  let compromise = 50

  if (scores.F > scores.T) compromise += (scores.F - scores.T) * 3
  if (scores.F > scores.T * 1.5) compromise += 10

  if (scores.J > scores.P) compromise += (scores.J - scores.P) * 2
  else compromise -= (scores.P - scores.J) * 1

  const conflictStyle = answers.conflict_style ?? 1
  if (conflictStyle === 1) compromise += 10
  if (conflictStyle === 2) compromise += 5
  if (conflictStyle === 3) compromise += 8
  if (conflictStyle === 0) compromise -= 5

  const idealDorm = answers.ideal_dorm ?? 1
  if (idealDorm === 2) compromise += 8
  if (idealDorm === 1) compromise += 4
  if (idealDorm === 3) compromise += 3
  if (idealDorm === 0) compromise -= 3

  const gameSelfControl = answers.game_self_control
  if (gameSelfControl !== undefined) {
    if (gameSelfControl <= 1) compromise += 8
    if (gameSelfControl >= 3) compromise -= 5
  }

  const sleepSensitivity = answers.sleep_sensitivity ?? 2
  if (sleepSensitivity >= 3) compromise += 5

  return Math.max(0, Math.min(100, compromise))
}

export function getBridgeProfile(answers) {
  const gameProfile = getGameBehaviorProfile(answers)
  const mbti = getMbtiResult(answers)
  const compromise = getCompromiseScore(answers)

  const traits = []

  const isGamer = gameProfile.riskLevel !== 'low'
  const isStudious = (answers.study_place ?? 2) <= 1
  const isClean = (answers.room_tidy ?? 2) >= 3
  const isLateSleeper = (answers.bed_time ?? 2) >= 4
  const canBeQuiet = (answers.game_voice ?? 0) <= 1 && (answers.music_video ?? 1) <= 1
  const isSocial = (answers.ideal_dorm ?? 1) >= 2
  const isEarlySleeper = (answers.bed_time ?? 2) <= 2

  if (isGamer) traits.push('gamer')
  if (isStudious) traits.push('studious')
  if (isClean) traits.push('clean')
  if (isLateSleeper) traits.push('late_sleeper')
  if (canBeQuiet) traits.push('quiet_capable')
  if (isSocial) traits.push('social')
  if (isEarlySleeper) traits.push('early_sleeper')

  const isBridge = traits.length >= 3 &&
    ((traits.includes('gamer') && traits.includes('studious')) ||
     (traits.includes('late_sleeper') && traits.includes('quiet_capable')) ||
     (traits.includes('gamer') && traits.includes('quiet_capable')) ||
     (traits.includes('gamer') && traits.includes('clean')))

  const bridgeType = []
  if (isGamer && isStudious) bridgeType.push('game_study_bridge')
  if (isLateSleeper && canBeQuiet) bridgeType.push('late_quiet_bridge')
  if (isGamer && canBeQuiet) bridgeType.push('game_quiet_bridge')
  if (isGamer && isClean) bridgeType.push('game_clean_bridge')
  if (isEarlySleeper && isSocial) bridgeType.push('early_social_bridge')

  return {
    isBridge,
    compromise,
    traits,
    bridgeType,
    mbtiType: mbti.type
  }
}

export function getBridgeCompatibility(bridgeProfile, groupProfiles) {
  if (!bridgeProfile.isBridge) return 0

  if (groupProfiles.length === 0) return 0

  const gamers = groupProfiles.filter(p => p.traits.includes('gamer')).length
  const studious = groupProfiles.filter(p => p.traits.includes('studious')).length
  const lateSleepers = groupProfiles.filter(p => p.traits.includes('late_sleeper')).length
  const earlySleepers = groupProfiles.filter(p => p.traits.includes('early_sleeper')).length

  let score = 0

  if (bridgeProfile.bridgeType.includes('game_study_bridge') && gamers >= 2 && studious >= 2) {
    score += 30
  }
  if (bridgeProfile.bridgeType.includes('late_quiet_bridge') && lateSleepers >= 2 && earlySleepers >= 1) {
    score += 25
  }
  if (bridgeProfile.bridgeType.includes('game_quiet_bridge') && gamers >= 2) {
    score += 20
  }
  if (bridgeProfile.bridgeType.includes('game_clean_bridge') && gamers >= 2) {
    score += 15
  }

  score += bridgeProfile.compromise * 0.3

  return Math.min(100, score)
}

// ============================================================
// 混合寝室分配算法
// ============================================================

export function assignDormitories(users, dormSize = 6) {
  if (users.length === 0) return []

  const profiles = users.map(user => ({
    user,
    bridgeProfile: getBridgeProfile(user.answers),
    gameProfile: getGameBehaviorProfile(user.answers),
    compromise: getCompromiseScore(user.answers)
  }))

  const pureGroups = {
    gamers: profiles.filter(p => p.gameProfile.riskLevel === 'high'),
    quietStudious: profiles.filter(p =>
      p.gameProfile.riskLevel === 'low' && (p.user.answers.study_place ?? 2) <= 1
    ),
    socialActive: profiles.filter(p =>
      (p.user.answers.ideal_dorm ?? 1) >= 2 && p.gameProfile.riskLevel !== 'high'
    ),
    moderate: profiles.filter(p =>
      p.gameProfile.riskLevel === 'medium'
    ),
    bridges: profiles.filter(p => p.bridgeProfile.isBridge)
  }

  const assigned = new Set()
  const dorms = []

  function createDorm(members, type) {
    const dormId = `dorm_${dorms.length + 1}`
    const dormMembers = members.map(m => {
      assigned.add(m.user.id)
      return m
    })

    const pairScores = []
    for (let i = 0; i < dormMembers.length; i++) {
      for (let j = i + 1; j < dormMembers.length; j++) {
        const compat = calculateCompatibility(dormMembers[i].user, dormMembers[j].user)
        pairScores.push(compat.score)
      }
    }
    const avgScore = pairScores.length > 0
      ? Math.round(pairScores.reduce((a, b) => a + b, 0) / pairScores.length)
      : 0

    const hasBridge = dormMembers.some(m => m.bridgeProfile.isBridge)
    const bridgeMembers = dormMembers.filter(m => m.bridgeProfile.isBridge)

    dorms.push({
      id: dormId,
      type,
      members: dormMembers,
      avgScore,
      hasBridge,
      bridgeInfo: bridgeMembers.length > 0 ? {
        names: bridgeMembers.map(m => m.user.name),
        types: bridgeMembers.flatMap(m => m.bridgeProfile.bridgeType)
      } : null
    })
  }

  for (const gamer of pureGroups.gamers) {
    if (assigned.has(gamer.user.id)) continue
    const available = pureGroups.gamers.filter(p =>
      !assigned.has(p.user.id) && p.user.id !== gamer.user.id
    )
    const rest = available.slice(0, dormSize - 1)
    if (rest.length >= 2) {
      createDorm([gamer, ...rest], 'pure_gamer')
    }
  }

  for (const quiet of pureGroups.quietStudious) {
    if (assigned.has(quiet.user.id)) continue
    const available = pureGroups.quietStudious.filter(p =>
      !assigned.has(p.user.id) && p.user.id !== quiet.user.id
    )
    const rest = available.slice(0, dormSize - 1)
    if (rest.length >= 2) {
      createDorm([quiet, ...rest], 'pure_quiet')
    }
  }

  for (const social of pureGroups.socialActive) {
    if (assigned.has(social.user.id)) continue
    const available = pureGroups.socialActive.filter(p =>
      !assigned.has(p.user.id) && p.user.id !== social.user.id
    )
    const rest = available.slice(0, dormSize - 1)
    if (rest.length >= 2) {
      createDorm([social, ...rest], 'pure_social')
    }
  }

  const unassigned = profiles.filter(p => !assigned.has(p.user.id))
  if (unassigned.length > 0) {
    const bridges = unassigned.filter(p => p.bridgeProfile.isBridge)
    const others = unassigned.filter(p => !p.bridgeProfile.isBridge)

    if (bridges.length > 0 && others.length > 0) {
      const gamersLeft = others.filter(p => p.gameProfile.riskLevel === 'high')
      const quietLeft = others.filter(p => p.gameProfile.riskLevel === 'low')
      const midLeft = others.filter(p => p.gameProfile.riskLevel === 'medium')

      while (gamersLeft.length >= 2 && quietLeft.length >= 2 && bridges.length > 0) {
        const g = gamersLeft.splice(0, 2)
        const q = quietLeft.splice(0, 2)
        const b = bridges.splice(0, Math.min(2, bridges.length))
        createDorm([...g, ...q, ...b], 'bridge_mixed')
      }

      while (midLeft.length >= 2 && bridges.length > 0) {
        const m = midLeft.splice(0, Math.min(3, midLeft.length))
        const b = bridges.splice(0, Math.min(dormSize - m.length, bridges.length))
        createDorm([...m, ...b], 'bridge_moderate')
      }
    }

    const remaining = [...bridges.filter(p => !assigned.has(p.user.id)), ...others.filter(p => !assigned.has(p.user.id))]
    if (remaining.length > 0) {
      const grouped = greedyClusterByTraits(remaining, dormSize)
      for (const group of grouped) {
        createDorm(group, 'trait_matched_remaining')
      }
    }
  }

  return dorms
}

function greedyClusterByTraits(profiles, groupSize) {
  if (profiles.length === 0) return []
  if (profiles.length <= groupSize) return [profiles]

  const assigned = new Set()
  const groups = []

  function traitOverlap(a, b) {
    const setA = new Set(a.bridgeProfile.traits)
    const setB = new Set(b.bridgeProfile.traits)
    let common = 0
    for (const t of setA) {
      if (setB.has(t)) common++
    }
    const union = new Set([...setA, ...setB]).size
    return union === 0 ? 0 : common / union
  }

  function firstFeatureSimilarity(a, b) {
    const keyDims = ['bed_time', 'sleep_sensitivity', 'game_habit', 'study_place', 'room_tidy', 'ideal_dorm']
    let matchCount = 0
    for (const dim of keyDims) {
      const va = a.user.answers[dim] ?? -1
      const vb = b.user.answers[dim] ?? -1
      if (va >= 0 && vb >= 0 && Math.abs(va - vb) <= 1) matchCount++
    }
    return matchCount / keyDims.length
  }

  function affinity(a, b) {
    const traitSim = traitOverlap(a, b)
    const featureSim = firstFeatureSimilarity(a, b)
    const compat = calculateCompatibility(a.user, b.user).score / 100
    return traitSim * 0.35 + featureSim * 0.35 + compat * 0.3
  }

  while (assigned.size < profiles.length) {
    const unassigned = profiles.filter(p => !assigned.has(p.user.id))
    if (unassigned.length === 0) break

    const seed = unassigned[0]
    assigned.add(seed.user.id)

    const candidates = unassigned.filter(p => p.user.id !== seed.user.id)
    const scored = candidates.map(c => ({ profile: c, score: affinity(seed, c) }))
    scored.sort((a, b) => b.score - a.score)

    const group = [seed]
    for (const { profile } of scored) {
      if (group.length >= groupSize) break
      if (assigned.has(profile.user.id)) continue
      assigned.add(profile.user.id)
      group.push(profile)
    }

    if (group.length >= 2) {
      groups.push(group)
    } else {
      if (groups.length > 0) {
        groups[groups.length - 1].push(...group)
      } else {
        groups.push(group)
      }
    }
  }

  return groups
}

export function findTestDormMatchesWithBridge(currentUser, testDormitories) {
  const baseResult = findTestDormMatches(currentUser, testDormitories)

  const myBridge = getBridgeProfile(currentUser.answers)
  const myCompromise = getCompromiseScore(currentUser.answers)

  for (const dorm of baseResult.dormMatches) {
    const memberProfiles = dorm.members.map(m => getBridgeProfile(m.user.answers))
    const bridgeCompat = getBridgeCompatibility(myBridge, memberProfiles)

    dorm.bridgeScore = bridgeCompat
    dorm.myBridgeProfile = myBridge
    dorm.myCompromise = myCompromise

    const hasBridgeMember = memberProfiles.some(p => p.isBridge)
    dorm.hasBridgeMember = hasBridgeMember
    if (hasBridgeMember) {
      dorm.bridgeMembers = memberProfiles
        .filter(p => p.isBridge)
        .map((p, i) => ({
          name: dorm.members.find(m => getBridgeProfile(m.user.answers) === p)?.user?.name || `桥接人${i + 1}`,
          bridgeType: p.bridgeType,
          compromise: p.compromise
        }))
    }
  }

  baseResult.dormMatches.sort((a, b) => {
    const scoreA = a.avgScore * 0.7 + a.bridgeScore * 0.3
    const scoreB = b.avgScore * 0.7 + b.bridgeScore * 0.3
    return scoreB - scoreA
  })

  return baseResult
}
