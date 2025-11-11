"use client"

interface FilterPanelProps {
  species: string[]
  homeworlds: string[]
  selectedSpecies: string | null
  selectedHomeworld: string | null
  onSpeciesChange: (species: string | null) => void
  onHomeworldChange: (homeworld: string | null) => void
}

export default function FilterPanel({
  species,
  homeworlds,
  selectedSpecies,
  selectedHomeworld,
  onSpeciesChange,
  onHomeworldChange,
}: FilterPanelProps) {
  // Extract readable homeworld names from URLs
  const getHomeworldName = (url: string): string => {
    const name = url.split("/").filter(Boolean).pop() || url
    return name.replace(/([A-Z])/g, " $1").trim()
  }

  return (
    <div className="mb-8 space-y-4 md:flex gap-4">
      <div className="flex-1">
        <label htmlFor="species-filter" className="block text-sm font-medium text-accent mb-2">
          Filter by Species
        </label>
        <select
          id="species-filter"
          value={selectedSpecies || ""}
          onChange={(e) => onSpeciesChange(e.target.value || null)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
          aria-label="Filter characters by species"
        >
          <option value="">All Species</option>
          {species.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="homeworld-filter" className="block text-sm font-medium text-accent mb-2">
          Filter by Homeworld
        </label>
        <select
          id="homeworld-filter"
          value={selectedHomeworld || ""}
          onChange={(e) => onHomeworldChange(e.target.value || null)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
          aria-label="Filter characters by homeworld"
        >
          <option value="">All Homeworlds</option>
          {homeworlds.map((hw) => (
            <option key={hw} value={hw}>
              {getHomeworldName(hw)}
            </option>
          ))}
        </select>
      </div>

      {(selectedSpecies || selectedHomeworld) && (
        <div className="flex items-end gap-2">
          <button
            onClick={() => {
              onSpeciesChange(null)
              onHomeworldChange(null)
            }}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-secondary-foreground font-medium transition-colors"
            aria-label="Clear all filters"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
