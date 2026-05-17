import { getFlatQuestions, getAnswersVector, getWeightsVector, getDimensionLabel, getMbtiResult } from '../data/questions'

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

function dimensionScore(answersA, answersB, dimension) {
  const allQuestions = getFlatQuestions()
  const dimQuestions = allQuestions.filter(q => q.dimension === dimension && q.type !== 'multi')
  if (dimQuestions.length === 0) return 50

  let totalDiff = 0
  let totalWeight = 0
  for (const q of dimQuestions) {
    const a = answersA[q.id]
    const b = answersB[q.id]
    if (a === undefined || b === undefined) continue
    const maxVal = Math.max(...q.options.map(o => o.value))
    const diff = Math.abs(a - b) / Math.max(maxVal, 1)
    totalDiff += diff * q.weight
    totalWeight += q.weight
  }
  if (totalWeight === 0) return 50
  const avgDiff = totalDiff / totalWeight
  return Math.round((1 - avgDiff) * 100)
}

function getConflictRisks(answersA, answersB) {
  const risks = []
  const allQuestions = getFlatQuestions()

  const criticalPairs = [
    { q: 'sleep_time', label: '作息时间差异大', threshold: 2 },
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
        severity: diff >= 3 ? 'high' : 'medium',
        detailA: optA?.label || '',
        detailB: optB?.label || ''
      })
    }
  }

  return risks
}

function getHarmonyPoints(answersA, answersB) {
  const points = []
  const allQuestions = getFlatQuestions()

  const harmonyChecks = [
    { q: 'sleep_time', label: '作息时间一致' },
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
    if (Math.abs(a - b) <= 1) {
      const qInfo = allQuestions.find(q => q.id === check.q)
      points.push({
        label: check.label,
        detail: qInfo?.options.find(o => o.value === a)?.label || ''
      })
    }
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

  return points
}

export function calculateCompatibility(userA, userB) {
  const vecA = getAnswersVector(userA.answers)
  const vecB = getAnswersVector(userB.answers)
  const weights = getWeightsVector()

  const mse = weightedMSE(vecA, vecB, weights)
  const maxPossibleMSE = 16
  const mseScore = Math.max(0, Math.min(100, Math.round((1 - mse / maxPossibleMSE) * 100)))

  const cosSim = cosineSimilarity(vecA, vecB)
  const cosScore = Math.round(((cosSim + 1) / 2) * 100)

  let finalScore = Math.round(mseScore * 0.55 + cosScore * 0.45)

  const personalityScore = dimensionScore(userA.answers, userB.answers, 'personality')
  const personalityBonus = (personalityScore - 50) * 0.15
  finalScore = Math.round(Math.max(0, Math.min(100, finalScore + personalityBonus)))

  const gameTypesA = userA.answers.game_types
  const gameTypesB = userB.answers.game_types
  if (Array.isArray(gameTypesA) && Array.isArray(gameTypesB) && gameTypesA.length > 0 && gameTypesB.length > 0) {
    const gameMatch = gameTypesMatch(gameTypesA, gameTypesB)
    finalScore = Math.round(Math.min(100, finalScore + gameMatch * 5))
  }

  const dimensions = ['sleep', 'cleanliness', 'study', 'entertainment', 'lifestyle', 'personality']
  const categories = {}
  for (const dim of dimensions) {
    categories[dim] = {
      name: getDimensionLabel(dim),
      score: dimensionScore(userA.answers, userB.answers, dim)
    }
  }

  const conflictRisks = getConflictRisks(userA.answers, userB.answers)
  const harmonyPoints = getHarmonyPoints(userA.answers, userB.answers)

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
    mbtiB: mbtiB.type
  }
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
