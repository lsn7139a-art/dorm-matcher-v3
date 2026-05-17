import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers } from '../utils/storage'
import { findBestMatches } from '../utils/matching'
import { getMbtiResult } from '../data/questions'
import './MatchPage.css'

function MatchPage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [matches, setMatches] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || !user.answers || Object.keys(user.answers).length === 0) {
      return
    }
    setCurrentUser(user)
    const allUsers = getAllUsers()
    const results = findBestMatches(user, allUsers)
    setMatches(results)
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

  if (matches.length === 0) {
    return (
      <div className="page-container">
        <h1 className="page-title">匹配结果</h1>
        <p className="page-subtitle">{currentUser.name}，暂时没有其他同学可以匹配</p>
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-text">邀请更多同学填写问卷，就能看到匹配结果了！</div>
          <button className="btn btn-primary" onClick={() => navigate('/survey')}>
            填写新问卷
          </button>
        </div>
      </div>
    )
  }

  const myMbti = getMbtiResult(currentUser.answers)

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

  return (
    <div className="page-container">
      <h1 className="page-title">匹配结果</h1>
      <p className="page-subtitle">{currentUser.name}，这是为你推荐的室友</p>

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
      </div>

      <div className="match-list">
        {matches.map((match, idx) => (
          <div
            key={match.user.id}
            className={`match-card card slide-up ${selectedMatch === idx ? 'expanded' : ''}`}
            style={{ animationDelay: `${idx * 0.05}s` }}
            onClick={() => setSelectedMatch(selectedMatch === idx ? null : idx)}
          >
            <div className="match-header">
              <div className="match-rank">#{idx + 1}</div>
              <div className="match-user-info">
                <div className="match-name-row">
                  <span className="match-name">{match.user.name}</span>
                  {match.compatibility.mbtiB && (
                    <span className="match-mbti-tag">{match.compatibility.mbtiB}</span>
                  )}
                </div>
                <div className="match-level">
                  {getLevelEmoji(match.compatibility.level)} {getLevelText(match.compatibility.level)}
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

            {selectedMatch === idx && (
              <div className="match-detail fade-in">
                <div className="detail-section">
                  <h4 className="detail-title">各维度匹配度</h4>
                  <div className="category-scores">
                    {Object.entries(match.compatibility.categories).map(([key, cat]) => (
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

                {match.compatibility.harmonyPoints.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-title">✅ 和谐点</h4>
                    <div className="tags-row">
                      {match.compatibility.harmonyPoints.map((p, i) => (
                        <span key={i} className="tag tag-success">
                          {p.label}{p.detail && p.detail !== p.label ? ` · ${p.detail}` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {match.compatibility.conflictRisks.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-title">⚠️ 潜在冲突</h4>
                    <div className="conflict-list">
                      {match.compatibility.conflictRisks.map((risk, i) => (
                        <div key={i} className={`conflict-item ${risk.severity}`}>
                          <span className="conflict-label">{risk.label}</span>
                          <span className="conflict-detail">
                            你: {risk.detailA} / 对方: {risk.detailB}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {match.user.customTexts && Object.keys(match.user.customTexts).length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-title">💬 TA的补充说明</h4>
                    <div className="custom-notes">
                      {Object.entries(match.user.customTexts).map(([qId, text]) => (
                        text && <div key={qId} className="custom-note">"{text}"</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchPage
