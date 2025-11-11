# Star Wars Character Application

A responsive web application for exploring Star Wars characters using the Star Wars API (SWAPI).

## Features

### Core Features
- **Character Listing**: Browse Star Wars characters with pagination
- **Character Details Modal**: Click any character to view detailed information including:
  - Physical attributes (height, mass, birth year)
  - Species and films appearance
  - Homeworld information (terrain, climate, population)
  - Date added to the database

- **Responsive Design**: Seamless experience on mobile, tablet, and desktop
- **Error Handling**: Graceful error states and loading indicators
- **Species-Based Colors**: Character cards feature distinct accent colors based on species

### Bonus Features Implemented
- **Search**: Real-time search by character name (partial matching)
- **Advanced Filtering**: Filter by species and homeworld with combined search support
- **Mock Authentication**: Secure login system with mocked JWT tokens and refresh logic
- **Auto Token Refresh**: Tokens automatically refresh before expiration
- **Integration Testing**: Test suite for modal functionality and user interactions

## Technology Stack

- **Frontend**: Next.js 16+ with React 19+
- **Styling**: Tailwind CSS v4
- **API**: Star Wars API (SWAPI)
- **Authentication**: Mock JWT with token refresh
- **Testing**: Jest & React Testing Library
- **Language**: TypeScript

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with global metadata
│   ├── page.tsx            # Main home page with character grid
│   └── globals.css         # Global styles and theme configuration
├── components/
│   ├── character-grid.tsx  # Grid layout for characters
│   ├── character-card.tsx  # Individual character card with species colors
│   ├── character-modal.tsx # Detailed character modal
│   ├── search-bar.tsx      # Search input component
│   ├── filter-panel.tsx    # Species and homeworld filters
│   ├── auth-gate.tsx       # Authentication wrapper
│   ├── login-form.tsx      # Login form component
│   ├── user-menu.tsx       # User profile and logout menu
│   ├── header.tsx          # Application header
│   ├── loading-spinner.tsx # Loading state indicator
│   └── error-message.tsx   # Error display component
├── hooks/
│   └── use-auth.ts         # Custom auth hook with token management
├── lib/
│   └── auth.ts             # Authentication utilities
├── types/
│   └── character.ts        # TypeScript interfaces
├── __tests__/
│   └── character-modal.test.tsx # Integration tests
└── jest.config.js          # Jest configuration
\`\`\`

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run the development server
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

### Demo Credentials

For the mock authentication system, use:
- **Username**: `demo`
- **Password**: `password123`

## How to Use

1. **Login**: Enter demo credentials to access the app
2. **Browse**: View paginated list of Star Wars characters
3. **Search**: Type a character name to search in real-time
4. **Filter**: Use dropdown filters to filter by species or homeworld
5. **Combine**: Use search and filters together for precise results
6. **View Details**: Click any character card to open the detailed modal
7. **Logout**: Use the user menu in the top right to logout

## Key Features Explained

### Search & Filter
- **Search**: Searches across all current characters for partial name matches
- **Species Filter**: Filter characters by their species
- **Homeworld Filter**: Filter characters by their homeworld
- **Combined Filtering**: Search and filters work together seamlessly
- **Reset Button**: Quickly clear all filters

### Authentication
- **Mock JWT Tokens**: Simulated token generation with expiration
- **Auto Refresh**: Tokens automatically refresh 2 minutes before expiration
- **Persistent Session**: Auth state persists across page refreshes via localStorage
- **Graceful Token Expiry**: Users are logged out if token refresh fails

### Character Details
- **Dynamic Homeworld Data**: Fetches real homeworld information from SWAPI
- **Date Formatting**: Character creation dates formatted as dd-MM-yyyy
- **Film Count**: Shows number of films each character appears in
- **Species-Based Colors**: Cards use distinct colors based on species

## Design Choices

### Color System
- Star Wars inspired dark theme with deep space aesthetic
- Species-based accent colors on character cards:
  - Human: Blue gradient
  - Wookiee: Amber gradient
  - Droid: Gray gradient
  - And more...

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Flexible grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Optimized touch targets for mobile users

### Performance
- Efficient state management with React hooks
- Memoized filtered results to prevent unnecessary recalculations
- Lazy loading of homeworld data on modal open

### Error Handling
- API failure gracefully caught with user-friendly messages
- Loading states prevent UI jank
- Pagination disabled when filters are active

## Testing

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
\`\`\`

### Test Coverage

- Character modal rendering and details display
- Modal open/close functionality
- Homeworld data fetching
- User interactions with modal

## Trade-offs & Future Improvements

### Trade-offs Made
1. **Mock Authentication**: Used mocked auth instead of real backend for simplicity
2. **Client-Side Filtering**: Filters work on current page only (not paginated API results)
3. **Random Images**: Character images use random placeholder service (no official artwork)

### Future Improvements
1. **Advanced Search**: Full-text search across all pages
2. **Persistent Filters**: Save user preferences in localStorage
3. **Character Comparison**: Compare multiple characters side-by-side
4. **Film Details**: Add modal to view film information
5. **Favorites**: Star/bookmark favorite characters
6. **Dark Mode Toggle**: Add manual theme switching
7. **Export Data**: CSV export of filtered results
8. **Backend Integration**: Real authentication with refresh token rotation
9. **Advanced Analytics**: Track user behavior and popular characters
10. **Mobile App**: React Native version for iOS/Android

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - feel free to use this project as a reference for your own applications.

## API Reference

This application uses the [Star Wars API (SWAPI)](https://swapi.dev/):
- **Endpoint**: `https://swapi.dev/api/people/`
- **Pagination**: 10 results per page
- **Endpoints Used**:
  - `GET /api/people/?page={page}` - List characters
  - `GET /api/planets/{id}/` - Get planet details

---

**Created as a coding assignment demonstration** - Showcases React best practices, component architecture, state management, API integration, and modern web development patterns.
