const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const TOKEN_KEY = 'school_admin_token';

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }

  return data;
}

export const authApi = {
  async login(payload) {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setToken(data.token);
    return data;
  },
  logout: clearToken,
  getToken
};

export const studentsApi = {
  list(params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(`/api/students${query ? `?${query}` : ''}`);
  },
  create(payload) {
    return request('/api/students', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  update(id, payload) {
    return request(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  remove(id) {
    return request(`/api/students/${id}`, {
      method: 'DELETE'
    });
  }
};

export const employeesApi = {
  list(params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(`/api/employees${query ? `?${query}` : ''}`);
  },
  create(payload) {
    return request('/api/employees', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  update(id, payload) {
    return request(`/api/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  },
  remove(id) {
    return request(`/api/employees/${id}`, {
      method: 'DELETE'
    });
  }
};

export const admissionsApi = {
  create(payload) {
    return request('/api/admissions', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};

export const contactApi = {
  create(payload) {
    return request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};

export const contentApi = {
  list(type, params = {}) {
    const query = new URLSearchParams(params).toString();
    return request(`/api/content/${type}${query ? `?${query}` : ''}`);
  }
};
