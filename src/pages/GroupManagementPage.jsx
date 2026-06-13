import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers, fetchGroups, getStats, deleteUser, deleteGroup, clearAllGroups } from '../utils/api'
import './GroupManagementPage.css'

function GroupManagementPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGroups: 0,
    avgCompatibility: 0
  })
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

  useEffect(() => {
    loadData()
    
    if (isAutoRefresh) {
      const interval = setInterval(loadData, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoRefresh])

  const loadData = async () => {
    const [usersData, groupsData, statsData] = await Promise.all([
      fetchUsers(),
      fetchGroups(),
      getStats()
    ])
    setUsers(usersData)
    setGroups(groupsData)
    setStats(statsData)
    setLastUpdate(new Date())
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('确定要删除该用户吗？')) {
      await deleteUser(userId)
      loadData()
    }
  }

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('确定要删除该宿舍吗？')) {
      await deleteGroup(groupId)
      loadData()
    }
  }

  const handleClearAll = async () => {
    if (window.confirm('确定要清空所有宿舍分组吗？')) {
      await clearAllGroups()
      loadData()
    }
  }

  const getCompatibilityColor = (score) => {
    if (score >= 80) return '#22c55e'
    if (score >= 60) return '#eab308'
    return '#ef4444'
  }

  const getCompatibilityLabel = (score) => {
    if (score >= 80) return '非常匹配'
    if (score >= 60) return '良好'
    return '一般'
  }

  return (
    <div className="page-container">
      <div className="group-management">
        <div className="group-header">
          <div className="header-content">
            <div className="header-icon">🏠</div>
            <div className="header-text">
              <h1>宿舍分配管理后台</h1>
              <p>实时查看和管理宿舍分配情况</p>
            </div>
          </div>
          <div className="header-actions">
            <button
              className={`btn ${isAutoRefresh ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            >
              {isAutoRefresh ? '⏸ 暂停刷新' : '▶ 开始刷新'}
            </button>
            <button className="btn btn-secondary" onClick={loadData}>
              🔄 手动刷新
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              ← 返回首页
            </button>
          </div>
        </div>

        <div className="stats-cards">
          <div className="stat-card stat-users">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-label">已报名人数</div>
            </div>
          </div>
          <div className="stat-card stat-groups">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalGroups}</div>
              <div className="stat-label">已分配宿舍</div>
            </div>
          </div>
          <div className="stat-card stat-compatibility">
            <div className="stat-icon">💯</div>
            <div className="stat-content">
              <div className="stat-value">{stats.avgCompatibility}%</div>
              <div className="stat-label">平均匹配度</div>
            </div>
          </div>
        </div>

        {lastUpdate && (
          <div className="update-info">
            <span>🕐 最后更新: {lastUpdate.toLocaleTimeString()}</span>
            {isAutoRefresh && <span className="auto-badge">自动刷新中 (5秒)</span>}
          </div>
        )}

        <div className="main-content">
          <div className="groups-section">
            <div className="section-header">
              <h2 className="section-title">🏠 宿舍分配情况</h2>
              {groups.length > 0 && (
                <button className="btn btn-danger-outline" onClick={handleClearAll}>
                  🗑 清空所有分组
                </button>
              )}
            </div>
            
            {groups.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🏠</div>
                <h3>暂无宿舍分配</h3>
                <p>等待用户提交问卷后，系统将自动分配宿舍</p>
              </div>
            ) : (
              <div className="groups-grid">
                {groups.map(group => (
                  <div key={group.id} className="group-card">
                    <div className="group-header-card">
                      <div className="group-info">
                        <span className="group-name">{group.name}</span>
                        <span className="group-id">#{group.id}</span>
                      </div>
                      <div className="group-actions">
                        <button
                          className="btn-icon btn-danger"
                          onClick={() => handleDeleteGroup(group.id)}
                          title="删除该宿舍"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <div className="group-status">
                      <div className="status-bar">
                        <div
                          className="status-fill"
                          style={{
                            width: `${(group.memberCount / 6) * 100}%`,
                            backgroundColor: group.memberCount >= 4 ? '#22c55e' : '#eab308'
                          }}
                        />
                      </div>
                      <div className="status-text">
                        {group.memberCount}/6 人
                        {group.avgCompatibility && (
                          <span
                            className="compatibility-badge"
                            style={{ color: getCompatibilityColor(group.avgCompatibility) }}
                          >
                            {group.avgCompatibility}% 匹配度
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="group-members">
                      {group.members.map((member, idx) => (
                        <div key={member.id} className="member-item">
                          <div className="member-avatar">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="member-info">
                            <span className="member-name">{member.name}</span>
                            <span className="member-time">
                              {new Date(member.assignedAt).toLocaleString()}
                            </span>
                          </div>
                          <button
                            className="btn-icon"
                            onClick={() => handleDeleteUser(member.id)}
                            title="移除该成员"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    {group.memberCount < 6 && (
                      <div className="group-footer">
                        <span className="waiting-text">
                          还需 {6 - group.memberCount} 人
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="users-section">
            <div className="section-header">
              <h2 className="section-title">📋 待分配用户 ({users.length})</h2>
            </div>
            <div className="users-list">
              {users.length === 0 ? (
                <div className="empty-state small">
                  <div className="empty-icon">👤</div>
                  <p>暂无用户数据</p>
                </div>
              ) : (
                users.map((user, index) => (
                  <div key={user.id} className="user-item">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-meta">
                        {user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}
                      </span>
                    </div>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                      title="删除用户"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="legend-section">
          <h3>📊 匹配度说明</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#22c55e' }} />
              <span>80-100%: 非常匹配 - 非常适合住在一起</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#eab308' }} />
              <span>60-79%: 良好 - 可以愉快相处</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ef4444' }} />
              <span>0-59%: 一般 - 可能需要磨合</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupManagementPage