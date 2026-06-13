import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import SurveyPage from './pages/SurveyPage'
import MatchPage from './pages/MatchPage'
import ProfilePage from './pages/ProfilePage'
import GroupMatchPage from './pages/GroupMatchPage'
import GroupManagementPage from './pages/GroupManagementPage'
import { getCurrentUser } from './utils/storage'
import './App.css'

function App() {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <div className="app">
      {!isHome && (
        <nav className="navbar">
          <div className="navbar-inner">
            <NavLink to="/" className="navbar-brand">
              <span className="brand-icon">🏠</span>
              <span className="brand-text">宿舍匹配器</span>
            </NavLink>
            <div className="navbar-links">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                首页
              </NavLink>
              <NavLink to="/survey" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                填问卷
              </NavLink>
              <NavLink to="/match" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                匹配
              </NavLink>
              <NavLink to="/group" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                群组匹配
              </NavLink>
              <NavLink to="/manage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                分组管理
              </NavLink>
              {currentUser && (
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  我的
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      )}

      <main className={isHome ? '' : 'main-content'}>
        <Routes>
          <Route path="/" element={<HomePage onLogin={setCurrentUser} />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/group" element={<GroupMatchPage />} />
          <Route path="/manage" element={<GroupManagementPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
