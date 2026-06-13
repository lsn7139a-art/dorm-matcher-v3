const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

async function supabaseRequest(table, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      ...options.headers
    }
  });
  return response.ok ? await response.json() : { error: 'Request failed' };
}

export async function fetchUsers() {
  return await supabaseRequest('users', {
    method: 'GET',
    headers: { Prefer: 'return=representation' }
  });
}

export async function createUser(name, answers, priorities = []) {
  const data = { name, answers, priorities: JSON.stringify(priorities) };
  return await supabaseRequest('users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { Prefer: 'return=representation' }
  });
}

export async function deleteUser(userId) {
  return await supabaseRequest(`users?id=eq.${userId}`, { method: 'DELETE' });
}

export async function fetchGroups() {
  return await supabaseRequest('groups', {
    method: 'GET',
    headers: { Prefer: 'return=representation' }
  });
}

export async function createGroup(data) {
  return await supabaseRequest('groups', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { Prefer: 'return=representation' }
  });
}

export async function updateGroup(groupId, data) {
  return await supabaseRequest(`groups?id=eq.${groupId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

export async function deleteGroup(groupId) {
  return await supabaseRequest(`groups?id=eq.${groupId}`, { method: 'DELETE' });
}

export async function clearAllGroups() {
  return await supabaseRequest('groups', { method: 'DELETE' });
}

export async function getStats() {
  const users = await fetchUsers();
  const groups = await fetchGroups();
  
  return {
    totalUsers: Array.isArray(users) ? users.length : 0,
    totalGroups: Array.isArray(groups) ? groups.length : 0,
    groupsWithMembers: Array.isArray(groups) 
      ? groups.reduce((acc, g) => acc + (g.member_count || 0), 0) 
      : 0,
    avgCompatibility: Array.isArray(groups) && groups.length > 0 
      ? Math.round(groups.reduce((acc, g) => acc + (g.avg_compatibility || 0), 0) / groups.length)
      : 0,
    lastUpdate: new Date().toISOString()
  };
}