import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers, addFeedback, getFeedback } from '../utils/storage'
import { findBestMatches, findTestDormMatchesWithBridge, getBridgeProfile, getCompromiseScore } from '../utils/matching'
import { getMbtiResult, getGameBehaviorProfile, TEST_DORMITORIES } from '../data/questions'
import './MatchPage.css'

function MatchPage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [matches, setMatches] = useState([])
  const [testMatches, setTestMatches] = useState(null)
  const [selectedDorm, setSelectedDorm] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [activeTab, setActiveTab] = useState('test')
  const [preferredDormId, setPreferredDormId] = useState(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || !user.answers || Object.keys(user.answers).length === 0) {
      return
    }
    setCurrentUser(user)
    const allUsers = getAllUsers()
    const results = findBestMatches(user, allUsers)
    setMatches(results)
    const testResults = findTestDormMatchesWithBridge(user, TEST_DORMITORIES)
    setTestMatches(testResults)
  }, [])

  if (!currentUser) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">你还没有填写问卷，请先完成问卷填写</div>
          <button className="btn btn-primary" onClick={() => navigate('/survey')}>
            去填问卷
          </button>
        </div>
      </div>
    )
  }

  const myMbti = getMbtiResult(currentUser.answers)
  const myGameProfile = getGameBehaviorProfile(currentUser.answers)
  const myBridgeProfile = getBridgeProfile(currentUser.answers)
  const myCompromise = getCompromiseScore(currentUser.answers)

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    if (score >= 40) return '#f97316'
    return '#ef4444'
  }

  const getLevelText = (level) => {
    const map = { high: '非常合拍', medium: '比较合拍', 'low-medium': '需要磨合', low: '不太合适' }
    return map[level] || '未知'
  }

  const getLevelEmoji = (level) => {
    const map = { high: '🌟', medium: '👍', 'low-medium': '🤔', low: '😅' }
    return map[level] || '❓'
  }

  const mbtiDesc = {
    'ISTJ': '检查员', 'ISFJ': '保护者', 'INFJ': '提倡者', 'INTJ': '建筑师',
    'ISTP': '鉴赏家', 'ISFP': '探险家', 'INFP': '调停者', 'INTP': '逻辑学家',
    'ESTP': '企业家', 'ESFP': '表演者', 'ENFP': '竞选者', 'ENTP': '辩论家',
    'ESTJ': '总经理', 'ESFJ': '执政官', 'ENFJ': '主人公', 'ENTJ': '指挥官'
  }

  const gameRiskLabel = {
    low: '🟢 自律型',
    medium: '🟡 普通型',
    high: '🔴 放飞型'
  }

  const topicLabels = {
    game: '游戏', anime: '动漫', movie: '影视', music: '音乐',
    sports: '体育', tech: '科技', study: '学习', life: '生活',
    meme: '梗/段子', reading: '阅读', art: '艺术', novel: '网文', other: '其他'
  }

  const hobbyLabels = {
    anime: '动漫', movie: '影视', music: '音乐', game: '游戏',
    sports: '体育', tech: '科技', reading: '阅读', art: '艺术',
    novel: '网文', other: '其他'
  }

  const bridgeTypeLabels = {
    game_study_bridge: '游戏+学习',
    late_quiet_bridge: '晚睡+安静',
    game_quiet_bridge: '游戏+安静',
    game_clean_bridge: '游戏+整洁',
    early_social_bridge: '早起+社交'
  }

  const handlePreferDorm = (dormId) => {
    setPreferredDormId(dormId)
    const dorm = testMatches.dormMatches.find(d => d.dormName === dormId)
    if (dorm) {
      addFeedback({
        fromUserId: currentUser.id,
        preferredDormName: dormId,
        preferredDormScore: dorm.avgScore,
        allDormScores: testMatches.dormMatches.map(d => ({
          name: d.dormName,
          score: d.avgScore
        })),
        reason: '人工选择偏好宿舍',
        type: 'dorm_preference'
      })
      setFeedbackSent(true)
    }
  }

  const renderDormCard = (dorm, idx) => {
    const isSelected = selectedDorm === dorm.dormName
    const isPreferred = preferredDormId === dorm.dormName

    return (
      <div
        key={idx}
        className={`dorm-card ${isSelected ? 'expanded' : ''} ${isPreferred ? 'preferred' : ''} ${idx === 0 ? 'best-algo' : ''}`}
        onClick={() => setSelectedDorm(isSelected ? null : dorm.dormName)}
      >
        <div className="dorm-card-header">
          <div className="dorm-rank-badge">{idx + 1}</div>
          <div className="dorm-card-info">
            <div className="dorm-card-name">
              🏠 {dorm.dormName}
              {idx === 0 && <span className="algo-best-tag">算法推荐</span>}
              {isPreferred && <span className="user-prefer-tag">✓ 我的选择</span>}
            </div>
            <div className="dorm-card-desc">{dorm.dormDescription}</div>
          </div>
          <div className="dorm-card-score" style={{ color: getScoreColor(dorm.avgScore) }}>
            {dorm.avgScore}
            <span className="score-unit">分</span>
          </div>
        </div>

        <div className="dorm-card-bar">
          <div className="progress-bar" style={{ height: '6px' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${dorm.avgScore}%`,
                background: getScoreColor(dorm.avgScore)
              }}
            />
          </div>
        </div>

        <div className="dorm-members-preview">
          {dorm.members.slice(0, 3).map((m, i) => (
            <span key={i} className="member-chip">
              {m.user.name}
              <span className="member-mbti-mini">{m.user.mbti}</span>
            </span>
          ))}
          {dorm.members.length > 3 && (
            <span className="member-chip more">+{dorm.members.length - 3}</span>
          )}
        </div>

        {dorm.hasBridgeMember && dorm.bridgeMembers && (
          <div className="dorm-bridge-info">
            <span className="bridge-indicator">🌉 含桥接人：</span>
            {dorm.bridgeMembers.map((b, i) => (
              <span key={i} className="bridge-member-chip">
                {b.name}
                <span className="bridge-type-mini">
                  {b.bridgeType.map(t => bridgeTypeLabels[t] || t).join('+')}
                </span>
              </span>
            ))}
          </div>
        )}

        {isSelected && (
          <div className="dorm-detail fade-in">
            <div className="dorm-members-list">
              {dorm.members.map((m, i) => {
                const gameProfile = getGameBehaviorProfile(m.user.answers)
                const isMemberExpanded = selectedMember === m.user.id

                return (
                  <div key={i} className="member-card">
                    <div
                      className="member-header"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMember(isMemberExpanded ? null : m.user.id)
                      }}
                    >
                      <div className="member-info">
                        <span className="member-name">{m.user.name}</span>
                        <span className="match-mbti-tag">{m.user.mbti}</span>
                        <span className={`game-risk-tag ${gameProfile.riskLevel}`}>
                          {gameRiskLabel[gameProfile.riskLevel]}
                        </span>
                      </div>
                      <div className="member-score" style={{ color: getScoreColor(m.compatibility.score) }}>
                        {m.compatibility.score}分
                      </div>
                    </div>
                    <div className="member-tagline">"{m.user.tagline}"</div>

                    {(() => {
                      const memberBridge = getBridgeProfile(m.user.answers)
                      const memberCompromise = getCompromiseScore(m.user.answers)
                      return (
                        <div className="member-badges">
                          {memberBridge.isBridge && (
                            <span className="bridge-tag-small">🌉 桥接人格 ({memberBridge.bridgeType.map(t => bridgeTypeLabels[t] || t).join(', ')})</span>
                          )}
                          <span className="compromise-badge" style={{
                            color: memberCompromise >= 70 ? '#059669' : memberCompromise >= 50 ? '#d97706' : '#dc2626'
                          }}>
                            🤝 妥协力 {memberCompromise}
                          </span>
                        </div>
                      )
                    })()}

                    {isMemberExpanded && (
                      <div className="member-detail fade-in">
                        {m.user.answers.hobby_content && (
                          <div className="detail-section">
                            <h4 className="detail-title">💡 兴趣爱好</h4>
                            <div className="tags-row">
                              {m.user.answers.hobby_content.map((h, i) => (
                                <span key={i} className="tag tag-info">{hobbyLabels[h] || h}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {m.user.answers.chat_topic && (
                          <div className="detail-section">
                            <h4 className="detail-title">💬 喜欢聊的话题</h4>
                            <div className="tags-row">
                              {m.user.answers.chat_topic.map((t, i) => (
                                <span key={i} className="tag tag-topic">{topicLabels[t] || t}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {gameProfile.riskFactors.length > 0 && (
                          <div className="detail-section">
                            <h4 className="detail-title">🎮 游戏习惯</h4>
                            <div className="tags-row">
                              {gameProfile.riskFactors.map((f, i) => (
                                <span key={i} className="tag tag-warning">{f}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {m.compatibility.topicCompatibility &&
                          m.compatibility.topicCompatibility.commonItems.length > 0 && (
                          <div className="detail-section">
                            <h4 className="detail-title">🤝 共同话题</h4>
                            <div className="tags-row">
                              {m.compatibility.topicCompatibility.commonItems.map((t, i) => (
                                <span key={i} className="tag tag-success">
                                  {topicLabels[t] || t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="detail-section">
                          <h4 className="detail-title">📊 各维度匹配度</h4>
                          <div className="category-scores">
                            {Object.entries(m.compatibility.categories).map(([key, cat]) => (
                              <div key={key} className="cat-score-row">
                                <span className="cat-score-name">{cat.name}</span>
                                <div className="cat-score-bar">
                                  <div className="progress-bar" style={{ height: '4px' }}>
                                    <div
                                      className="progress-bar-fill"
                                      style={{
                                        width: `${cat.score}%`,
                                        background: getScoreColor(cat.score)
                                      }}
                                    />
                                  </div>
                                </div>
                                <span className="cat-score-value" style={{ color: getScoreColor(cat.score) }}>
                                  {cat.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {m.compatibility.conflictRisks.length > 0 && (
                          <div className="detail-section">
                            <h4 className="detail-title">⚠️ 潜在冲突</h4>
                            <div className="conflict-list">
                              {m.compatibility.conflictRisks.slice(0, 3).map((risk, i) => (
                                <div key={i} className={`conflict-item ${risk.severity}`}>
                                  <span className="conflict-label">{risk.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {!feedbackSent && (
              <div className="dorm-prefer-section">
                <h4 className="detail-title">🤔 你最想住哪个宿舍？</h4>
                <p className="prefer-hint">选择你直觉最想住的宿舍，帮助算法了解你的真实偏好</p>
                <div className="prefer-buttons">
                  {testMatches.dormMatches.map((d, i) => (
                    <button
                      key={i}
                      className={`prefer-btn ${preferredDormId === d.dormName ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePreferDorm(d.dormName)
                      }}
                      disabled={feedbackSent}
                    >
                      <span className="prefer-dorm-name">{d.dormName}</span>
                      <span className="prefer-dorm-score" style={{ color: getScoreColor(d.avgScore) }}>
                        {d.avgScore}分
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {feedbackSent && (
              <div className="feedback-done">
                <div className="feedback-done-icon">✅</div>
                <div className="feedback-done-text">
                  已记录你的偏好！算法会根据你的选择优化权重
                </div>
                {preferredDormId && testMatches.dormMatches[0] &&
                  preferredDormId !== testMatches.dormMatches[0].dormName && (
                  <div className="feedback-insight">
                    💡 你选择了算法排名第{testMatches.dormMatches.findIndex(d => d.dormName === preferredDormId) + 1}的宿舍，
                    而算法推荐的是「{testMatches.dormMatches[0].dormName}」，这说明算法还需要调整
                  </div>
                )}
                {preferredDormId && testMatches.dormMatches[0] &&
                  preferredDormId === testMatches.dormMatches[0].dormName && (
                  <div className="feedback-insight good">
                    🎉 你和算法想的一样！当前算法推荐符合你的直觉
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="page-title">匹配结果</h1>
      <p className="page-subtitle">{currentUser.name}，以下是算法为你推荐的宿舍</p>

      <div className="my-mbti-card card">
        <div className="mbti-badge">{myMbti.type}</div>
        <div className="mbti-info">
          <div className="mbti-name">{mbtiDesc[myMbti.type] || '未知类型'}</div>
          <div className="mbti-dims">
            <span className={myMbti.scores.E >= myMbti.scores.I ? 'dim-active' : ''}>E</span>
            <span className="dim-sep">/</span>
            <span className={myMbti.scores.I > myMbti.scores.E ? 'dim-active' : ''}>I</span>
            <span className="dim-gap"></span>
            <span className={myMbti.scores.S >= myMbti.scores.N ? 'dim-active' : ''}>S</span>
            <span className="dim-sep">/</span>
            <span className={myMbti.scores.N > myMbti.scores.S ? 'dim-active' : ''}>N</span>
            <span className="dim-gap"></span>
            <span className={myMbti.scores.T >= myMbti.scores.F ? 'dim-active' : ''}>T</span>
            <span className="dim-sep">/</span>
            <span className={myMbti.scores.F > myMbti.scores.T ? 'dim-active' : ''}>F</span>
            <span className="dim-gap"></span>
            <span className={myMbti.scores.J >= myMbti.scores.P ? 'dim-active' : ''}>J</span>
            <span className="dim-sep">/</span>
            <span className={myMbti.scores.P > myMbti.scores.J ? 'dim-active' : ''}>P</span>
          </div>
        </div>
        <div className="my-game-profile">
          <span className={`game-risk-tag ${myGameProfile.riskLevel}`}>
            {gameRiskLabel[myGameProfile.riskLevel]}
          </span>
          {myBridgeProfile.isBridge && (
            <span className="bridge-tag">🌉 桥接人格</span>
          )}
          <span className="compromise-tag" style={{
            color: myCompromise >= 70 ? '#059669' : myCompromise >= 50 ? '#d97706' : '#dc2626'
          }}>
            🤝 妥协力 {myCompromise}
          </span>
        </div>
      </div>

      <div className="test-badge">🧪 测试模式 - 模拟分入不同宿舍，选择你最喜欢的帮助优化算法</div>

      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'test' ? 'active' : ''}`}
          onClick={() => setActiveTab('test')}
        >
          测试宿舍（6人间）
        </button>
        <button
          className={`tab-btn ${activeTab === 'real' ? 'active' : ''}`}
          onClick={() => setActiveTab('real')}
        >
          真实用户 {matches.length > 0 && `(${matches.length})`}
        </button>
      </div>

      {activeTab === 'test' && testMatches && (
        <div className="test-section">
          <div className="dorm-cards">
            {testMatches.dormMatches.map((dorm, idx) => renderDormCard(dorm, idx))}
          </div>
        </div>
      )}

      {activeTab === 'real' && (
        <div className="real-section">
          {matches.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <div className="empty-state-text">暂时没有其他同学可以匹配</div>
              <div className="empty-hint">邀请更多同学填写问卷，就能看到匹配结果了！</div>
              <button className="btn btn-primary" onClick={() => navigate('/survey')}>
                填写新问卷
              </button>
            </div>
          ) : (
            <div className="match-list">
              {matches.map((match) => {
                const gameProfile = match.compatibility.gameProfileB
                return (
                  <div key={match.user.id} className="match-card card slide-up">
                    <div className="match-header">
                      <div className="match-user-info">
                        <div className="match-name-row">
                          <span className="match-name">{match.user.name}</span>
                          <span className="match-mbti-tag">{match.compatibility.mbtiB}</span>
                        </div>
                        <div className="match-level">
                          {getLevelEmoji(match.compatibility.level)} {getLevelText(match.compatibility.level)}
                          {gameProfile && (
                            <span className={`game-risk-tag ${gameProfile.riskLevel}`}>
                              {gameRiskLabel[gameProfile.riskLevel]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="match-score" style={{ color: getScoreColor(match.compatibility.score) }}>
                        {match.compatibility.score}
                        <span className="score-unit">分</span>
                      </div>
                    </div>
                    <div className="match-score-bar">
                      <div className="progress-bar" style={{ height: '6px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${match.compatibility.score}%`,
                            background: getScoreColor(match.compatibility.score)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MatchPage
