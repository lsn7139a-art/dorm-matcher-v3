const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'users.json');
const GROUPS_FILE = path.join(__dirname, 'data', 'groups.json');

function ensureDataDir() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(GROUPS_FILE)) {
    fs.writeFileSync(GROUPS_FILE, JSON.stringify([]));
  }
}

ensureDataDir();

function readUsers() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

function readGroups() {
  return JSON.parse(fs.readFileSync(GROUPS_FILE, 'utf8'));
}

function writeGroups(groups) {
  fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2));
}

function generateId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
}

app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, answers, priorities } = req.body;
  if (!name || !answers) {
    return res.status(400).json({ error: '缺少必要字段' });
  }
  
  const users = readUsers();
  const newUser = {
    id: generateId(),
    name,
    answers,
    priorities: priorities || [],
    createdAt: new Date().toISOString(),
    uploadedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeUsers(users);
  
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: '用户不存在' });
  }
});

app.put('/api/users/:id', (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: '用户不存在' });
  }
  
  users[index] = { ...users[index], ...req.body, updatedAt: new Date().toISOString() };
  writeUsers(users);
  
  res.json(users[index]);
});

app.delete('/api/users/:id', (req, res) => {
  const users = readUsers();
  const filtered = users.filter(u => u.id !== req.params.id);
  writeUsers(filtered);
  res.json({ success: true });
});

function calculateCompatibility(userA, userB) {
  const vecA = Object.values(userA.answers).filter(v => typeof v === 'number');
  const vecB = Object.values(userB.answers).filter(v => typeof v === 'number');
  
  const minLen = Math.min(vecA.length, vecB.length);
  if (minLen === 0) return 50;
  
  let sumDiff = 0;
  for (let i = 0; i < minLen; i++) {
    sumDiff += Math.abs(vecA[i] - vecB[i]);
  }
  
  const avgDiff = sumDiff / minLen;
  const normalizedDiff = avgDiff / 5;
  const score = Math.round((1 - normalizedDiff) * 100);
  
  return Math.max(0, Math.min(100, score));
}

function greedyGrouping(users, groupSize = 6) {
  if (users.length === 0) return [];
  
  const groups = [];
  const assigned = new Set();
  const shuffled = [...users].sort(() => Math.random() - 0.5);
  
  while (assigned.size < shuffled.length) {
    const unassigned = shuffled.filter(u => !assigned.has(u.id));
    if (unassigned.length === 0) break;
    
    const seed = unassigned[0];
    assigned.add(seed.id);
    const group = [seed];
    
    const candidates = unassigned.filter(u => u.id !== seed.id);
    const scored = candidates.map(c => ({
      user: c,
      score: calculateCompatibility(seed, c)
    })).sort((a, b) => b.score - a.score);
    
    for (const { user } of scored) {
      if (group.length >= groupSize) break;
      if (!assigned.has(user.id)) {
        assigned.add(user.id);
        group.push(user);
      }
    }
    
    groups.push(group);
  }
  
  return groups;
}

app.post('/api/groups/generate', (req, res) => {
  const { groupSize = 6, strategy = 'compatibility' } = req.body;
  const users = readUsers();
  
  if (users.length < 2) {
    return res.status(400).json({ error: '至少需要2个用户才能分组' });
  }
  
  let groups;
  if (strategy === 'compatibility') {
    groups = greedyGrouping(users, groupSize);
  } else {
    groups = greedyGrouping(users, groupSize);
  }
  
  const groupData = groups.map((members, index) => ({
    id: `dorm_${String(index + 1).padStart(2, '0')}`,
    name: `宿舍${String(index + 1).padStart(2, '0')}`,
    members: members.map(m => ({
      id: m.id,
      name: m.name
    })),
    memberCount: members.length,
    createdAt: new Date().toISOString(),
    strategy
  }));
  
  writeGroups(groupData);
  
  res.json({
    success: true,
    groups: groupData,
    totalUsers: users.length,
    totalGroups: groupData.length
  });
});

app.get('/api/groups', (req, res) => {
  const groups = readGroups();
  res.json(groups);
});

app.get('/api/groups/:id', (req, res) => {
  const groups = readGroups();
  const group = groups.find(g => g.id === req.params.id);
  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ error: '小组不存在' });
  }
});

app.delete('/api/groups/:id', (req, res) => {
  const groups = readGroups();
  const filtered = groups.filter(g => g.id !== req.params.id);
  writeGroups(filtered);
  res.json({ success: true });
});

app.delete('/api/groups', (req, res) => {
  writeGroups([]);
  res.json({ success: true });
});

app.get('/api/match/:userId', (req, res) => {
  const users = readUsers();
  const currentUser = users.find(u => u.id === req.params.userId);
  
  if (!currentUser) {
    return res.status(404).json({ error: '用户不存在' });
  }
  
  const matches = users
    .filter(u => u.id !== req.params.userId)
    .map(u => ({
      user: u,
      compatibility: calculateCompatibility(currentUser, u)
    }))
    .sort((a, b) => b.compatibility - a.compatibility);
  
  res.json(matches);
});

app.get('/api/stats', (req, res) => {
  const users = readUsers();
  const groups = readGroups();
  
  res.json({
    totalUsers: users.length,
    totalGroups: groups.length,
    groupsWithMembers: groups.reduce((acc, g) => acc + g.memberCount, 0),
    lastUpdate: new Date().toISOString()
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('API 端点:');
  console.log('  GET  /api/users - 获取所有用户');
  console.log('  POST /api/users - 创建新用户');
  console.log('  POST /api/groups/generate - 生成分组');
  console.log('  GET  /api/groups - 获取所有分组');
});