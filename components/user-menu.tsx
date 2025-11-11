"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export default function UserMenu() {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-end">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-muted transition-colors text-foreground text-sm md:text-base"
            aria-label="User menu"
            aria-expanded={isOpen}
          >
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs md:text-sm">
              D
            </span>
            <span className="hidden sm:inline">demo-user</span>
            <svg
              className="w-4 h-4 md:w-5 md:h-5 transition-transform"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 md:w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg transition-colors text-destructive text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
