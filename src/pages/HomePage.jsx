import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getAllUsers, setCurrentUserId, createUser } from '../utils/storage'
import './HomePage.css'

function HomePage({ onLogin }) {
  const navigate = useNavigate()
  const [showNameInput, setShowNameInput] = useState(false)
  const [name, setName] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const users = getAllUsers()

  const handleStartSurvey = () => {
    if (!name.trim()) return
    const user = createUser(name.trim(), {})
    setCurrentUserId(user.id)
    onLogin(user)
    navigate('/survey')
  }

  const handleSelectUser = () => {
    if (!selectedUserId) return
    setCurrentUserId(selectedUserId)
    const user = users.find(u => u.id === selectedUserId)
    onLogin(user)
    navigate('/match')
  }

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-emoji">🏠</span>
            宿舍匹配器
          </h1>
          <p className="hero-desc">
            回答一些关于生活习惯和性格的问题，<br />
            找到最合拍的室友，打造舒适的宿舍空间
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setShowNameInput(true)}>
              ✨ 开始回答问题
            </button>
            {users.length > 0 && (
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/match')}>
                🔍 查看匹配结果
              </button>
            )}
          </div>
        </div>
      </div>

      {showNameInput && (
        <div className="card name-card fade-in">
          <h3 className="card-title">输入你的名字</h3>
          <p className="card-desc">你的名字将展示给其他同学，方便互相认识</p>
          <div className="name-input-group">
            <input
              type="text"
              className="name-input"
              placeholder="请输入你的名字..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStartSurvey()}
              maxLength={20}
              autoFocus
            />
            <button className="btn btn-primary" onClick={handleStartSurvey} disabled={!name.trim()}>
              开始
            </button>
          </div>
        </div>
      )}

      {users.length > 0 && !showNameInput && (
        <div className="card existing-card slide-up">
          <h3 className="card-title">已有同学</h3>
          <p className="card-desc">选择你的身份快速进入，或开始新问卷</p>
          <div className="user-select-group">
            <select
              className="user-select"
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
            >
              <option value="">-- 选择你的名字 --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              onClick={handleSelectUser}
              disabled={!selectedUserId}
            >
              进入
            </button>
          </div>
        </div>
      )}

      <div className="about-section">
        <h2 className="features-title">关于这个工具</h2>
        <div className="about-cards">
          <div className="about-card card">
            <div className="about-icon">🌙</div>
            <h4>了解你的生活习惯</h4>
            <p>作息时间、整洁度、空调偏好...这些日常小事往往是宿舍和谐的关键</p>
          </div>
          <div className="about-card card">
            <div className="about-icon">🎮</div>
            <h4>找到志同道合的伙伴</h4>
            <p>玩什么游戏？学习还是娱乐？找到和你频率相同的人</p>
          </div>
          <div className="about-card card">
            <div className="about-icon">🧠</div>
            <h4>通过真实场景了解性格</h4>
            <p>不是简单的I人E人标签，而是通过真实情境题来了解你内心的一面</p>
          </div>
          <div className="about-card card">
            <div className="about-icon">✏️</div>
            <h4>你可以自己说</h4>
            <p>每个问题都可以补充说明，因为生活习惯不是非黑即白的</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2 className="features-title">如何使用</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>回答问题</h4>
              <p>关于你的生活习惯和性格，可以随时补充说明</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>邀请同学</h4>
              <p>让其他同学也来回答，人越多匹配越准</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>查看匹配</h4>
              <p>系统分析兼容性，推荐最合拍的室友组合</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
