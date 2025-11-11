"use client"

import CharacterCard from "./character-card"
import type { Character } from "@/types/character"

interface CharacterGridProps {
  characters: Character[]
  onSelectCharacter: (character: Character) => void
}

export default function CharacterGrid({ characters, onSelectCharacter }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.url} character={character} onClick={() => onSelectCharacter(character)} />
      ))}
    </div>
  )
}
