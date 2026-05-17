import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, deleteUser } from '../utils/storage'
import { getFlatQuestions, getMbtiResult, getDimensionLabel } from '../data/questions'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getCurrentUser()
    if (u) setUser(u)
  }, [])

  if (!user) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <div className="empty-state-text">你还没有填写问卷</div>
          <button className="btn btn-primary" onClick={() => navigate('/survey')}>
            去填问卷
          </button>
        </div>
      </div>
    )
  }

  const allQuestions = getFlatQuestions()
  const answeredCount = allQuestions.filter(q => user.answers?.[q.id] !== undefined).length
  const mbti = getMbtiResult(user.answers || {})

  const mbtiDesc = {
    'ISTJ': '检查员', 'ISFJ': '保护者', 'INFJ': '提倡者', 'INTJ': '建筑师',
    'ISTP': '鉴赏家', 'ISFP': '探险家', 'INFP': '调停者', 'INTP': '逻辑学家',
    'ESTP': '企业家', 'ESFP': '表演者', 'ENFP': '竞选者', 'ENTP': '辩论家',
    'ESTJ': '总经理', 'ESFJ': '执政官', 'ENFJ': '主人公', 'ENTJ': '指挥官'
  }

  const handleDelete = () => {
    if (window.confirm('确定要删除你的数据吗？此操作不可恢复。')) {
      deleteUser(user.id)
      navigate('/')
    }
  }

  const dimensionGroups = {}
  for (const q of allQuestions) {
    if (!dimensionGroups[q.dimension]) dimensionGroups[q.dimension] = []
    dimensionGroups[q.dimension].push(q)
  }

  return (
    <div className="page-container">
      <h1 className="page-title">我的档案</h1>
      <p className="page-subtitle">查看和管理你的问卷信息</p>

      <div className="profile-card card">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-meta">
            已完成 {answeredCount}/{allQuestions.length} 题
          </p>
        </div>
        <div className="profile-mbti">
          <div className="profile-mbti-type">{mbti.type}</div>
          <div className="profile-mbti-name">{mbtiDesc[mbti.type] || ''}</div>
        </div>
      </div>

      <div className="profile-actions card">
        <button className="btn btn-primary btn-block" onClick={() => navigate('/survey')}>
          ✏️ 修改问卷
        </button>
        <button className="btn btn-danger btn-block" onClick={handleDelete}>
          🗑️ 删除我的数据
        </button>
      </div>

      <div className="profile-answers">
        <h3 className="section-title">我的回答</h3>
        {Object.entries(dimensionGroups).map(([dim, questions]) => (
          <div key={dim} className="answer-category card">
            <div className="answer-cat-header">
              <span className="answer-cat-name">{getDimensionLabel(dim)}</span>
              <span className="answer-cat-count">
                {questions.filter(q => user.answers?.[q.id] !== undefined).length}/{questions.length}
              </span>
            </div>
            {questions.map(q => {
              const answer = user.answers?.[q.id]
              let answerText = '未回答'
              if (q.type === 'multi' && Array.isArray(answer)) {
                const labels = answer.map(v => q.options.find(o => o.value === v)?.label).filter(Boolean)
                answerText = labels.join('、') || '未回答'
              } else if (answer !== undefined) {
                const selectedOption = q.options.find(o => o.value === answer)
                answerText = selectedOption?.label || '未回答'
              }
              const customText = user.customTexts?.[q.id]
              return (
                <div key={q.id} className="answer-row">
                  <span className="answer-question">{q.text}</span>
                  <div className="answer-right">
                    <span className="answer-value">{answerText}</span>
                    {customText && <span className="answer-custom">"{customText}"</span>}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
