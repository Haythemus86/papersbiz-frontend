const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1').replace(/\/$/, '')
const adminSessionKey = 'papersbiz-admin-session'

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options = {}) {
  let response
  const session = getAdminSession()

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new ApiError('Le service est momentanément indisponible. Vérifiez votre connexion et réessayez.')
  }

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(body?.detail || 'Votre demande n’a pas pu être envoyée. Réessayez dans un instant.', response.status)
  }

  return body
}

export function submitRequest(type, data) {
  return request('/requests', {
    method: 'POST',
    body: JSON.stringify({
      type,
      data: JSON.parse(JSON.stringify(data)),
    }),
  })
}

export function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(adminSessionKey) || 'null')
  } catch {
    return null
  }
}

export async function loginAdmin(username, password) {
  const session = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  localStorage.setItem(adminSessionKey, JSON.stringify(session))
  return session
}

export function logoutAdmin() {
  localStorage.removeItem(adminSessionKey)
}

export function getAdminRequests(filters = {}) {
  const params = new URLSearchParams({
    page: String(filters.page ?? 0),
    size: String(filters.size ?? 20),
  })
  if (filters.status) params.set('status', filters.status)
  if (filters.type) params.set('type', filters.type)
  return request(`/admin/requests?${params.toString()}`)
}

export function getAdminRequest(id) {
  return request(`/admin/requests/${id}`)
}

export function updateAdminRequestStatus(id, status) {
  return request(`/admin/requests/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function updateAdminRequestPriority(id, priority) {
  return request(`/admin/requests/${id}/priority`, {
    method: 'PATCH',
    body: JSON.stringify({ priority }),
  })
}
