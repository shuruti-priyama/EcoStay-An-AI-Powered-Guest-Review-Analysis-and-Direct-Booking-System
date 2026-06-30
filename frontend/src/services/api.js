// src/services/api.js
// Centralised API client — all fetch calls go through here

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('ecostay-token')
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `API error ${res.status}`)
  return data
}

// Rooms
export const roomsAPI = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/rooms${q ? `?${q}` : ''}`)
  },
  search: (q) => request(`/rooms/search?q=${encodeURIComponent(q)}`),
  getById: (id) => request(`/rooms/${id}`),
  create: (body) => request('/rooms', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/rooms/${id}`, { method: 'DELETE' }),
}

// Bookings
export const bookingsAPI = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/bookings${q ? `?${q}` : ''}`)
  },
  getById: (id) => request(`/bookings/${id}`),
  create: (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  cancel: (id) => request(`/bookings/${id}`, { method: 'DELETE' }),
}

// Reviews
export const reviewsAPI = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/reviews${q ? `?${q}` : ''}`)
  },
  getStats: () => request('/reviews/stats'),
  create: (body) => request('/reviews', { method: 'POST', body: JSON.stringify(body) }),
  delete: (id) => request(`/reviews/${id}`, { method: 'DELETE' }),
}

// Auth
export const authAPI = {
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
}
