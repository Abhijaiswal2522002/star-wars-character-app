"use client"

import { useMemo } from "react"
import type { Character } from "@/types/character"

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

const SPECIES_COLORS: Record<string, string> = {
  Human: "from-blue-600 to-blue-900",
  Wookiee: "from-amber-700 to-amber-950",
  Droid: "from-gray-600 to-gray-900",
  Ewok: "from-yellow-700 to-yellow-900",
  Gungan: "from-green-600 to-green-900",
  "Mon Calamari": "from-red-600 to-red-900",
  "Yoda's species": "from-green-700 to-green-950",
  "Twi'lek": "from-purple-600 to-purple-900",
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const imageUrl = useMemo(() => {
    // Extract character ID from URL for consistent image mapping
    const characterId = Number.parseInt(character.url.split("/").filter(Boolean).pop() || "1", 10)
    return `https://picsum.photos/300/400?random=${characterId}`
  }, [character.url])

  const getSpeciesColor = (species: string[]): string => {
    if (species.length === 0) return "from-slate-600 to-slate-900"
    const primarySpecies = species[0]
    return SPECIES_COLORS[primarySpecies] || "from-slate-600 to-slate-900"
  }

  const accentColor = getSpeciesColor(character.species)

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
      aria-label={`View details for ${character.name}`}
    >
      <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        <div className="relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`${character.name}`}
            loading="lazy"
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {character.name}
            </h3>

            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              {character.species.length > 0 && (
                <p>
                  <span className="text-accent font-medium">Species:</span> {character.species[0]}
                </p>
              )}
              {character.height !== "unknown" && (
                <p>
                  <span className="text-accent font-medium">Height:</span> {character.height}cm
                </p>
              )}
              {character.birth_year !== "unknown" && (
                <p>
                  <span className="text-accent font-medium">Birth:</span> {character.birth_year}
                </p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-accent font-semibold">Click to view details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
