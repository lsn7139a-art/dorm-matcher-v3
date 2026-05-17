import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS, getVisibleQuestions } from '../data/questions'
import { getCurrentUser, saveUser, setCurrentUserId, generateId } from '../utils/storage'
import './SurveyPage.css'

function SurveyPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState({})
  const [customTexts, setCustomTexts] = useState({})
  const [showCustom, setShowCustom] = useState({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [direction, setDirection] = useState('next')
  const [needName, setNeedName] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setName(user.name)
      setAnswers(user.answers || {})
      if (user.customTexts) setCustomTexts(user.customTexts)
    } else {
      setNeedName(true)
    }
  }, [])

  const visibleQuestions = useMemo(() => getVisibleQuestions(answers), [answers])
  const totalQuestions = visibleQuestions.length
  const currentQ = visibleQuestions[currentIdx]
  const answeredCount = visibleQuestions.filter(q => answers[q.id] !== undefined).length
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: value }
      return newAnswers
    })
  }

  const handleMultiAnswer = (questionId, value) => {
    setAnswers(prev => {
      const current = prev[questionId] || []
      const newArr = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [questionId]: newArr }
    })
  }

  const toggleCustom = (questionId) => {
    setShowCustom(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const handleCustomText = (questionId, text) => {
    setCustomTexts(prev => ({ ...prev, [questionId]: text }))
  }

  const goNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setDirection('next')
      setCurrentIdx(prev => prev + 1)
    }
  }

  const goPrev = () => {
    if (currentIdx > 0) {
      setDirection('prev')
      setCurrentIdx(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) return
    const user = getCurrentUser()
    if (user) {
      user.answers = answers
      user.customTexts = customTexts
      saveUser(user)
    } else {
      const newUser = { id: generateId(), name: name.trim(), answers, customTexts, createdAt: new Date().toISOString() }
      saveUser(newUser)
      setCurrentUserId(newUser.id)
    }
    navigate('/match')
  }

  const isCurrentAnswered = currentQ && (
    currentQ.type === 'multi'
      ? (answers[currentQ.id] || []).length > 0
      : answers[currentQ.id] !== undefined
  )
  const allComplete = visibleQuestions.every(q =>
    q.type === 'multi' ? (answers[q.id] || []).length > 0 : answers[q.id] !== undefined
  )

  if (needName && !name) {
    return (
      <div className="page-container">
        <div className="name-entry fade-in">
          <div className="name-entry-icon">🏠</div>
          <h2 className="name-entry-title">开始了解你</h2>
          <p className="name-entry-desc">先告诉我你的名字，然后我们聊聊你的生活习惯</p>
          <div className="name-input-group">
            <input
              type="text"
              className="name-input"
              placeholder="你的名字..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && setNeedName(false)}
              maxLength={20}
              autoFocus
            />
            <button
              className="btn btn-primary btn-lg"
              onClick={() => name.trim() && setNeedName(false)}
              disabled={!name.trim()}
            >
              开始
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQ) return null

  return (
    <div className="page-container survey-flow">
      <div className="survey-progress">
        <div className="progress-info">
          <span>{answeredCount}/{totalQuestions}</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
            }}
          />
        </div>
      </div>

      <div className={`question-flow ${direction === 'next' ? 'slide-in-right' : 'slide-in-left'}`} key={currentQ.id}>
        <div className="question-flow-icon">{currentQ.icon}</div>
        <h2 className="question-flow-text">{currentQ.text}</h2>
        {currentQ.isFollowUp && (
          <div className="follow-up-hint">👆 基于你之前的选择</div>
        )}

        {currentQ.type === 'multi' ? (
          <div className="multi-options">
            {currentQ.options.map(opt => {
              const selected = (answers[currentQ.id] || []).includes(opt.value)
              return (
                <button
                  key={opt.value}
                  className={`multi-option-btn ${selected ? 'selected' : ''}`}
                  onClick={() => handleMultiAnswer(currentQ.id, opt.value)}
                >
                  <span className="multi-check">{selected ? '✓' : ''}</span>
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flow-options">
            {currentQ.options.map(opt => (
              <button
                key={opt.value}
                className={`flow-option-btn ${answers[currentQ.id] === opt.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQ.id, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {currentQ.allowCustom && (
          <div className="custom-section">
            {showCustom[currentQ.id] ? (
              <div className="custom-input-area">
                <textarea
                  className="custom-textarea"
                  placeholder={currentQ.customPlaceholder}
                  value={customTexts[currentQ.id] || ''}
                  onChange={e => handleCustomText(currentQ.id, e.target.value)}
                  rows={2}
                  maxLength={200}
                />
                <button className="btn-text" onClick={() => toggleCustom(currentQ.id)}>
                  收起
                </button>
              </div>
            ) : (
              <button className="btn-text custom-trigger" onClick={() => toggleCustom(currentQ.id)}>
                ✏️ 想补充说明一下...
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flow-nav">
        <button
          className="btn btn-secondary"
          onClick={goPrev}
          disabled={currentIdx === 0}
        >
          ← 上一题
        </button>

        <span className="flow-counter">{currentIdx + 1} / {totalQuestions}</span>

        {currentIdx < totalQuestions - 1 ? (
          <button
            className="btn btn-primary"
            onClick={goNext}
            disabled={!isCurrentAnswered}
          >
            下一题 →
          </button>
        ) : (
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
            disabled={!allComplete}
          >
            ✨ 完成
          </button>
        )}
      </div>
    </div>
  )
}

export default SurveyPage
