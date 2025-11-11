"use client"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CharacterModal from "@/components/character-modal"
import type { Character } from "@/types/character"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock fetch
global.fetch = jest.fn()

const mockCharacter: Character = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
  species: ["Human"],
  vehicles: [],
  starships: [],
  created: "2014-12-20T21:17:06.891000Z",
  edited: "2014-12-20T21:17:06.891000Z",
  url: "https://swapi.dev/api/people/1/",
}

describe("CharacterModal", () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it("renders character details correctly", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: "Tatooine",
        terrain: "desert",
        climate: "arid",
        population: "200000",
        diameter: "10465",
      }),
    })

    render(<CharacterModal character={mockCharacter} onClose={() => {}} />)

    // Check if character name is displayed
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()

    // Check if character details are displayed
    expect(screen.getByText("172 cm")).toBeInTheDocument()
    expect(screen.getByText("77 kg")).toBeInTheDocument()
    expect(screen.getByText("19BBY")).toBeInTheDocument()

    // Check if film count is displayed
    expect(screen.getByText("2 film(s)")).toBeInTheDocument()
  })

  it("closes modal when clicking the close button", async () => {
    const onClose = jest.fn()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: "Tatooine",
        terrain: "desert",
        climate: "arid",
        population: "200000",
        diameter: "10465",
      }),
    })

    render(<CharacterModal character={mockCharacter} onClose={onClose} />)

    const closeButton = screen.getByText("✕")
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalled()
  })

  it("closes modal when clicking outside", async () => {
    const onClose = jest.fn()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: "Tatooine",
        terrain: "desert",
        climate: "arid",
        population: "200000",
        diameter: "10465",
      }),
    })

    const { container } = render(<CharacterModal character={mockCharacter} onClose={onClose} />)

    const backdrop = container.querySelector(".fixed")
    if (backdrop) {
      backdrop.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    }

    expect(onClose).toHaveBeenCalled()
  })

  it("fetches and displays homeworld data", async () => {
    const mockHomeworld = {
      name: "Tatooine",
      terrain: "desert",
      climate: "arid",
      population: "200000",
      diameter: "10465",
    }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockHomeworld,
    })

    render(<CharacterModal character={mockCharacter} onClose={() => {}} />)

    // Wait for homeworld data to be fetched and displayed
    expect(await screen.findByText("Tatooine")).toBeInTheDocument()
    expect(screen.getByText("desert")).toBeInTheDocument()
    expect(screen.getByText("arid")).toBeInTheDocument()
  })
})
