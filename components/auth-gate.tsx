"use client"

import { useAuth } from "@/hooks/use-auth"
import LoginForm from "./login-form"
import LoadingSpinner from "./loading-spinner"
import type React from "react"

interface AuthGateProps {
  children: React.ReactNode
}

export default function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}
