const STORAGE_KEY = 'dorm_matcher_users'
const CURRENT_USER_KEY = 'dorm_matcher_current'

export function getAllUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveUser(user) {
  const users = getAllUsers()
  const existingIndex = users.findIndex(u => u.id === user.id)
  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function deleteUser(userId) {
  const users = getAllUsers().filter(u => u.id !== userId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  if (getCurrentUserId() === userId) {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function getUserById(userId) {
  return getAllUsers().find(u => u.id === userId)
}

export function setCurrentUserId(userId) {
  localStorage.setItem(CURRENT_USER_KEY, userId)
}

export function getCurrentUserId() {
  return localStorage.getItem(CURRENT_USER_KEY)
}

export function getCurrentUser() {
  const id = getCurrentUserId()
  return id ? getUserById(id) : null
}

export function generateId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8)
}

export function createUser(name, answers) {
  return {
    id: generateId(),
    name,
    answers,
    createdAt: new Date().toISOString()
  }
}

export function exportData() {
  return JSON.stringify(getAllUsers(), null, 2)
}

export function importData(jsonStr) {
  try {
    const users = JSON.parse(jsonStr)
    if (!Array.isArray(users)) throw new Error('Invalid data')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    return true
  } catch {
    return false
  }
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)
}
