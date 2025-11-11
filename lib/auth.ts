// Mock authentication utilities
export interface AuthToken {
  token: string
  expiresAt: number
  refreshToken: string
}

// Mock credentials (for demo purposes)
const VALID_CREDENTIALS = {
  username: "demo",
  password: "password123",
}

// Generate mock JWT token
export function generateMockToken(): AuthToken {
  const now = Date.now()
  const expiresIn = 15 * 60 * 1000 // 15 minutes

  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      user: "demo-user",
      iat: Math.floor(now / 1000),
      exp: Math.floor((now + expiresIn) / 1000),
    }),
  )
  const signature = "mock-signature"

  return {
    token: `${header}.${payload}.${signature}`,
    expiresAt: now + expiresIn,
    refreshToken: `refresh-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
  }
}

// Mock login function
export async function mockLogin(username: string, password: string): Promise<AuthToken | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    return generateMockToken()
  }

  return null
}

// Mock token refresh
export async function refreshMockToken(refreshToken: string): Promise<AuthToken | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // In a real app, we'd validate the refresh token
  return generateMockToken()
}

// Check if token is expired
export function isTokenExpired(expiresAt: number): boolean {
  // Refresh 2 minutes before expiration
  return Date.now() >= expiresAt - 2 * 60 * 1000
}

// Get stored token from localStorage
export function getStoredToken(): AuthToken | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("authToken")
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

// Save token to localStorage
export function saveToken(token: AuthToken): void {
  if (typeof window === "undefined") return
  localStorage.setItem("authToken", JSON.stringify(token))
}

// Clear token from localStorage
export function clearToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("authToken")
}
