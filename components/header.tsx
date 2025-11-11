export default function Header() {
  return (
    <header className="bg-card border-b border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Star Wars</h1>
            <p className="text-muted-foreground mt-2">Explore characters from across the galaxy</p>
          </div>
          <div className="text-5xl">🌟</div>
        </div>
      </div>
    </header>
  )
}
