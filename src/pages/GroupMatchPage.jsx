import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers, getCurrentUser } from '../utils/storage'
import { generateGroupMatch } from '../utils/matching'
import './GroupMatchPage.css'

function GroupMatchPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [groupResult, setGroupResult] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const u = getCurrentUser()
    setCurrentUser(u)
    const all = getAllUsers().filter(user => user.answers && Object.keys(user.answers).length > 0)
    setUsers(all)
    if (u) {
      setSelectedIds([u.id])
    }
  }, [])

  const toggleUser = (userId) => {
    setSelectedIds(prev => {
      if (prev.includes(userId)) {
        if (prev.length <= 2) return prev
        return prev.filter(id => id !== userId)
      }
      if (prev.length >= 6) return prev
      return [...prev, userId]
    })
    setGroupResult(null)
  }

  const handleMatch = () => {
    const selectedUsers = users.filter(u => selectedIds.includes(u.id))
    if (selectedUsers.length < 2) return
    const result = generateGroupMatch(selectedUsers)
    setGroupResult(result)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    if (score >= 40) return '#f97316'
    return '#ef4444'
  }

  const getLevelText = (level) => {
    const map = { high: '非常和谐', medium: '比较和谐', 'low-medium': '需要磨合', low: '冲突风险高' }
    return map[level] || '未知'
  }

  const completedUsers = users.filter(u => u.answers && Object.keys(u.answers).length > 0)

  if (completedUsers.length < 2) {
    return (
      <div className="page-container">
        <h1 className="page-title">群组匹配</h1>
        <p className="page-subtitle">选择多个同学，分析整个宿舍的兼容性</p>
        <div className="empty-state">
          <div className="empty-state-icon">🏠</div>
          <div className="empty-state-text">至少需要2位同学填写问卷才能进行群组匹配</div>
          <button className="btn btn-primary" onClick={() => navigate('/survey')}>
            去填问卷
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="page-title">群组匹配</h1>
      <p className="page-subtitle">选择2-6位同学，分析整个宿舍的兼容性</p>

      <div className="user-select-card card">
        <h3 className="select-title">选择宿舍成员（{selectedIds.length}/6）</h3>
        <div className="user-chips">
          {completedUsers.map(user => (
            <button
              key={user.id}
              className={`user-chip ${selectedIds.includes(user.id) ? 'selected' : ''}`}
              onClick={() => toggleUser(user.id)}
            >
              <span className="chip-avatar">{user.name.charAt(0)}</span>
              <span className="chip-name">{user.name}</span>
              {selectedIds.includes(user.id) && <span className="chip-check">✓</span>}
            </button>
          ))}
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={handleMatch}
          disabled={selectedIds.length < 2}
          style={{ marginTop: 16 }}
        >
          🔍 分析群组兼容性
        </button>
      </div>

      {groupResult && (
        <div className="group-result fade-in">
          <div className="group-score-card card">
            <div className="group-score-label">群组兼容性</div>
            <div className="group-score-value" style={{ color: getScoreColor(groupResult.avgScore) }}>
              {groupResult.avgScore}
            </div>
            <div className="group-score-level" style={{ color: getScoreColor(groupResult.avgScore) }}>
              {getLevelText(groupResult.level)}
            </div>
            <div className="group-members">
              {selectedIds.map(id => {
                const u = users.find(u => u.id === id)
                return u ? (
                  <span key={id} className="group-member-chip">
                    {u.name}
                  </span>
                ) : null
              })}
            </div>
          </div>

          <div className="pair-scores">
            <h3 className="section-title">两两匹配详情</h3>
            {groupResult.pairs.map((pair, idx) => (
              <div key={idx} className="pair-card card">
                <div className="pair-header">
                  <span className="pair-names">{pair.userA.name} & {pair.userB.name}</span>
                  <span className="pair-score" style={{ color: getScoreColor(pair.compatibility.score) }}>
                    {pair.compatibility.score}分
                  </span>
                </div>
                <div className="progress-bar" style={{ height: '6px', marginTop: 8 }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${pair.compatibility.score}%`,
                      background: getScoreColor(pair.compatibility.score)
                    }}
                  />
                </div>
                <div className="pair-categories">
                  {Object.entries(pair.compatibility.categories).map(([key, cat]) => (
                    <div key={key} className="pair-cat">
                      <span className="pair-cat-name">{cat.name}</span>
                      <span className="pair-cat-score" style={{ color: getScoreColor(cat.score) }}>
                        {cat.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {groupResult.harmonyPoints.length > 0 && (
            <div className="card">
              <h3 className="section-title" style={{ marginBottom: 12 }}>✅ 群组和谐点</h3>
              <div className="tags-row">
                {groupResult.harmonyPoints.map((p, i) => (
                  <span key={i} className="tag tag-success">{p.label}</span>
                ))}
              </div>
            </div>
          )}

          {groupResult.conflictRisks.length > 0 && (
            <div className="card">
              <h3 className="section-title" style={{ marginBottom: 12 }}>⚠️ 潜在冲突风险</h3>
              <div className="conflict-list">
                {groupResult.conflictRisks.map((risk, i) => (
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
}

export default GroupMatchPage
