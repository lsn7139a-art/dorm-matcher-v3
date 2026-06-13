import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const __dirname = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname)).replace(/^\/([A-Z]):/, '$1:');
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

function calculateCompatibility(userA, userB) {
  const vecA = Object.values(userA.answers || {}).filter(v => typeof v === 'number');
  const vecB = Object.values(userB.answers || {}).filter(v => typeof v === 'number');
  
  if (vecA.length === 0 || vecB.length === 0) {
    return 50;
  }
  
  const minLen = Math.min(vecA.length, vecB.length);
  let sumDiff = 0;
  for (let i = 0; i < minLen; i++) {
    sumDiff += Math.abs(vecA[i] - vecB[i]);
  }
  
  const avgDiff = sumDiff / minLen;
  const normalizedDiff = avgDiff / 5;
  const score = Math.round((1 - normalizedDiff) * 100);
  
  return Math.max(0, Math.min(100, score));
}

function calculateGroupCompatibility(user, groupMembers) {
  if (groupMembers.length === 0) return 100;
  
  let totalScore = 0;
  for (const member of groupMembers) {
    totalScore += calculateCompatibility(user, member);
  }
  return Math.round(totalScore / groupMembers.length);
}

function assignToGroup(user, groups, groupSize = 6, minScore = 60) {
  const compatibleGroup = groups.find(group => {
    if (group.members.length >= groupSize) return false;
    const compatibility = calculateGroupCompatibility(user, group.members);
    return compatibility >= minScore;
  });
  
  if (compatibleGroup) {
    compatibleGroup.members.push({
      id: user.id,
      name: user.name,
      assignedAt: new Date().toISOString()
    });
    compatibleGroup.memberCount = compatibleGroup.members.length;
    compatibleGroup.avgCompatibility = calculateGroupCompatibility(user, compatibleGroup.members);
    return compatibleGroup;
  }
  
  const newGroupNumber = groups.length + 1;
  const newGroup = {
    id: `dorm_${String(newGroupNumber).padStart(2, '0')}`,
    name: `宿舍${String(newGroupNumber).padStart(2, '0')}`,
    members: [{
      id: user.id,
      name: user.name,
      assignedAt: new Date().toISOString()
    }],
    memberCount: 1,
    avgCompatibility: 100,
    createdAt: new Date().toISOString(),
    lastUpdate: new Date().toISOString()
  };
  
  groups.push(newGroup);
  return newGroup;
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
  const groups = readGroups();
  
  const newUser = {
    id: generateId(),
    name,
    answers,
    priorities: priorities || [],
    createdAt: new Date().toISOString(),
    uploadedAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  const assignedGroup = assignToGroup(newUser, groups, 6, 60);
  
  writeUsers(users);
  writeGroups(groups);
  
  res.status(201).json({
    ...newUser,
    assignedGroup: {
      id: assignedGroup.id,
      name: assignedGroup.name,
      memberCount: assignedGroup.memberCount
    }
  });
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

app.delete('/api/users/:id', (req, res) => {
  const users = readUsers();
  const userToDelete = users.find(u => u.id === req.params.id);
  
  if (userToDelete) {
    const groups = readGroups();
    const filtered = users.filter(u => u.id !== req.params.id);
    
    for (const group of groups) {
      group.members = group.members.filter(m => m.id !== req.params.id);
      group.memberCount = group.members.length;
    }
    
    groups.forEach(g => {
      if (g.memberCount === 0) {
        const idx = groups.indexOf(g);
        groups.splice(idx, 1);
      }
    });
    
    writeUsers(filtered);
    writeGroups(groups);
  }
  
  res.json({ success: true });
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
    avgCompatibility: groups.length > 0 
      ? Math.round(groups.reduce((acc, g) => acc + (g.avgCompatibility || 0), 0) / groups.length)
      : 0,
    lastUpdate: new Date().toISOString()
  });
});

app.get('/api/compatibility/:userId/:groupId', (req, res) => {
  const users = readUsers();
  const groups = readGroups();
  
  const user = users.find(u => u.id === req.params.userId);
  const group = groups.find(g => g.id === req.params.groupId);
  
  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }
  if (!group) {
    return res.status(404).json({ error: '小组不存在' });
  }
  
  const compatibility = calculateGroupCompatibility(user, group.members);
  
  res.json({
    userId: user.id,
    userName: user.name,
    groupId: group.id,
    groupName: group.name,
    compatibility,
    canJoin: group.memberCount < 6 && compatibility >= 60
  });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/^\/(?!api\/).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('API 端点:');
  console.log('  GET  /api/users - 获取所有用户');
  console.log('  POST /api/users - 创建新用户（自动分配宿舍）');
  console.log('  GET  /api/groups - 获取所有分组');
  console.log('  GET  /api/stats - 获取统计信息');
});