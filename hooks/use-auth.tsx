"use client"

import { useState, useEffect, useCallback, useContext, createContext, type ReactNode } from "react"
import {
  type AuthToken,
  mockLogin,
  refreshMockToken,
  isTokenExpired,
  getStoredToken,
  saveToken,
  clearToken,
} from "@/lib/auth"

const AuthContext = createContext<ReturnType<typeof useAuthLogic> | null>(null)

function useAuthLogic() {
  const [token, setToken] = useState<AuthToken | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = getStoredToken()
    if (storedToken) {
      if (!isTokenExpired(storedToken.expiresAt)) {
        setToken(storedToken)
        setIsAuthenticated(true)
      } else {
        clearToken()
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!token) return

    const checkAndRefresh = async () => {
      if (isTokenExpired(token.expiresAt)) {
        const newToken = await refreshMockToken(token.refreshToken)
        if (newToken) {
          setToken(newToken)
          saveToken(newToken)
        } else {
          logout()
        }
      }
    }

    const interval = setInterval(checkAndRefresh, 60000)
    return () => clearInterval(interval)
  }, [token])

  const login = useCallback(async (username: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)
      console.log("[v0] Login attempt with username:", username)

      const newToken = await mockLogin(username, password)
      if (!newToken) {
        setError('Invalid credentials. Use username: "demo", password: "password123"')
        console.log("[v0] Login failed - invalid credentials")
        return false
      }

      setToken(newToken)
      setIsAuthenticated(true)
      saveToken(newToken)
      console.log("[v0] Login successful")
      return true
    } catch (err) {
      console.log("[v0] Login error:", err)
      setError("Login failed. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    console.log("[v0] Logout triggered")
    setToken(null)
    setIsAuthenticated(false)
    clearToken()
  }, [])

  return {
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthLogic()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
