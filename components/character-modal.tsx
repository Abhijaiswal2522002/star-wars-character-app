"use client"

import { useEffect, useState } from "react"
import type { Character, Homeworld } from "@/types/character"

interface CharacterModalProps {
  character: Character
  onClose: () => void
}

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null)
  const [homeworldLoading, setHomeworldLoading] = useState(true)

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        if (!character.homeworld) return
        const response = await fetch(character.homeworld)
        if (!response.ok) throw new Error("Failed to fetch homeworld")
        const data = await response.json()
        setHomeworld(data)
      } catch (err) {
        console.error("Error fetching homeworld:", err)
      } finally {
        setHomeworldLoading(false)
      }
    }

    fetchHomeworld()
  }, [character.homeworld])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-card border border-primary/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">{character.name}</h2>
              {character.species.length > 0 && <p className="text-muted-foreground mt-1">{character.species[0]}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide">Height</h3>
              <p className="text-foreground mt-1">
                {character.height !== "unknown" ? `${character.height} cm` : "Unknown"}
              </p>
            </div>
            <div>
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide">Mass</h3>
              <p className="text-foreground mt-1">
                {character.mass !== "unknown" ? `${character.mass} kg` : "Unknown"}
              </p>
            </div>
            <div>
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide">Birth Year</h3>
              <p className="text-foreground mt-1">
                {character.birth_year !== "unknown" ? character.birth_year : "Unknown"}
              </p>
            </div>
            <div>
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide">Gender</h3>
              <p className="text-foreground mt-1">{character.gender !== "unknown" ? character.gender : "Unknown"}</p>
            </div>
          </div>

          {/* Other Details */}
          <div className="border-t border-border pt-4 space-y-3">
            <div>
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide">Films</h3>
              <p className="text-foreground mt-1">{character.films.length} film(s)</p>
            </div>
            <div>
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide">Date Added</h3>
              <p className="text-foreground mt-1">{formatDate(character.created)}</p>
            </div>
          </div>

          {/* Homeworld */}
          {homeworld && (
            <div className="border-t border-border pt-4">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">
                Homeworld: {homeworld.name}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Terrain</p>
                  <p className="text-foreground">{homeworld.terrain || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Climate</p>
                  <p className="text-foreground">{homeworld.climate || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Population</p>
                  <p className="text-foreground">
                    {homeworld.population !== "unknown" ? homeworld.population : "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Diameter</p>
                  <p className="text-foreground">{homeworld.diameter || "Unknown"} km</p>
                </div>
              </div>
            </div>
          )}

          {homeworldLoading && (
            <div className="border-t border-border pt-4">
              <p className="text-muted-foreground text-sm">Loading homeworld data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
