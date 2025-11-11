"use client"

import { useState, useEffect, useMemo } from "react"
import CharacterGrid from "@/components/character-grid"
import CharacterModal from "@/components/character-modal"
import Header from "@/components/header"
import LoadingSpinner from "@/components/loading-spinner"
import ErrorMessage from "@/components/error-message"
import SearchBar from "@/components/search-bar"
import FilterPanel from "@/components/filter-panel"
import AuthGate from "@/components/auth-gate"
import UserMenu from "@/components/user-menu"
import { AuthProvider } from "@/hooks/use-auth"
import type { Character } from "@/types/character"

function HomeContent() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)
  const [selectedHomeworld, setSelectedHomeworld] = useState<string | null>(null)

  useEffect(() => {
    fetchCharacters(currentPage)
  }, [currentPage])

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
      if (!response.ok) throw new Error("Failed to fetch characters")

      const data = await response.json()
      setAllCharacters(data.results)

      const total = Math.ceil(data.count / 10)
      setTotalPages(total)
    } catch (err) {
      setError("Failed to load characters. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((character) => {
      const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecies = !selectedSpecies || character.species.includes(selectedSpecies)
      const matchesHomeworld = !selectedHomeworld || character.homeworld === selectedHomeworld

      return matchesSearch && matchesSpecies && matchesHomeworld
    })
  }, [allCharacters, searchTerm, selectedSpecies, selectedHomeworld])

  const uniqueSpecies = useMemo(() => {
    const species = new Set<string>()
    allCharacters.forEach((char) => {
      char.species.forEach((s) => species.add(s))
    })
    return Array.from(species).sort()
  }, [allCharacters])

  const uniqueHomeworlds = useMemo(() => {
    const homeworlds = new Set<string>()
    allCharacters.forEach((char) => {
      if (char.homeworld) homeworlds.add(char.homeworld)
    })
    return Array.from(homeworlds).sort()
  }, [allCharacters])

  return (
    <main className="min-h-screen bg-background pb-8">
      <Header />
      <UserMenu />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <FilterPanel
          species={uniqueSpecies}
          homeworlds={uniqueHomeworlds}
          selectedSpecies={selectedSpecies}
          selectedHomeworld={selectedHomeworld}
          onSpeciesChange={setSelectedSpecies}
          onHomeworldChange={setSelectedHomeworld}
        />

        {error && <ErrorMessage message={error} />}

        {loading && <LoadingSpinner />}

        {!loading && !error && (
          <>
            {filteredCharacters.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-base md:text-lg">No characters found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Showing {filteredCharacters.length} character(s)
                  </p>
                </div>
                <CharacterGrid characters={filteredCharacters} onSelectCharacter={setSelectedCharacter} />
              </>
            )}

            {!searchTerm && !selectedSpecies && !selectedHomeworld && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 sm:px-6 py-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-primary-foreground font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  Previous
                </button>

                <span className="text-muted-foreground text-sm sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 sm:px-6 py-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-primary-foreground font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedCharacter && <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />}
    </main>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AuthGate>
        <HomeContent />
      </AuthGate>
    </AuthProvider>
  )
}
