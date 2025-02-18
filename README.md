# MusicMatch - Artist Discovery Platform

A modern platform for connecting artists through their creative universe, built with React, TypeScript, and FastAPI.

## 🚀 Quick Start

### Prerequisites

```bash
# Required versions
Node.js >= 18.0.0
Python >= 3.9
PostgreSQL >= 13.0
Redis >= 6.0
Poetry >= 1.4.0
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/musicmatch.git
cd musicmatch
```

2. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local  # Configure your environment variables
npm run dev
```

3. **Backend Setup**
```bash
cd backend
poetry install
cp .env.example .env  # Configure your environment variables
poetry run uvicorn app.main:app --reload
```

4. **Database Setup**
```bash
# Start PostgreSQL service
createdb musiccollab
poetry run alembic upgrade head
```

## 🏗️ Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── features/     # Feature-specific components
│   │   │   ├── profile/  # Profile-related components
│   │   │   ├── auth/     # Authentication components
│   │   │   └── home/     # Home page components
│   │   ├── layout/       # Layout components
│   │   │   ├── Navbar/
│   │   │   └── AppLayout/
│   │   └── ui/           # Shared UI components
│   │       ├── VideoPlayer/
│   │       └── AudioPlayer/
│   ├── pages/            # Route components
│   ├── contexts/         # React contexts
│   └── types/           # TypeScript definitions
```

### Key Components

#### DiscoverPage
- Profile card navigation system
- Right-side action bar
- Media integration (YouTube, SoundCloud)
- Smooth transitions and animations

#### ProfileCard
- Comprehensive artist information display
- Media grid with video/audio previews
- Platform connections
- Achievement showcase

#### Media Players
- VideoPlayer: YouTube integration with thumbnail preview
- AudioPlayer: SoundCloud integration with waveform visualization

## 🎨 UI System

### Glass Effect Components
```typescript
// Available glass panel variants
glass-panel      // Large components
glass-panel-sm   // Small controls
glass-panel-lg   // Full sections

// Usage example
<div className="glass-panel rounded-2xl p-6">
  {/* Content */}
</div>
```

### Animation System
```typescript
// Profile transition timing
duration: 800ms
easing: [0.22, 1, 0.36, 1]

// Interactive animations
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
```

## 📋 Current Status

### Completed Features
- ✅ Basic profile card system
- ✅ YouTube video integration
- ✅ Action bar with like/pass functionality
- ✅ Glass effect UI system
- ✅ Responsive layout structure
- ✅ Basic animation system

### In Progress
- 🔄 SoundCloud integration
- 🔄 Profile card content optimization
- 🔄 Media player improvements
- 🔄 Performance optimization

### To-Do
- ⏳ Authentication system
- ⏳ Profile creation flow
- ⏳ Backend API integration
- ⏳ Real-time features
- ⏳ Testing implementation
- ⏳ Error handling improvements
- ⏳ Accessibility enhancements

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev         # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run test       # Run tests

# Backend
poetry run uvicorn app.main:app --reload  # Start API server
poetry run pytest                         # Run tests
poetry run alembic revision -m "message"  # Create migration
poetry run alembic upgrade head           # Apply migrations
```

### Development Guidelines

1. **Branch Strategy**
```bash
main       # Production-ready code
develop    # Integration branch
feature/*  # New features
```

2. **Commit Convention**
```bash
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style updates
refactor: Code refactoring
perf: Performance improvements
test: Test updates
```

3. **Code Style**
- Use TypeScript for all new components
- Follow TailwindCSS class ordering
- Implement proper error boundaries
- Add JSDoc comments for complex logic

## 📚 Documentation

### Key Files
- `frontend/src/pages/DiscoverPage.tsx` - Main discovery interface
- `frontend/src/components/features/profile/ProfileCard.tsx` - Profile card component
- `frontend/src/components/ui/VideoPlayer.tsx` - YouTube video integration
- `frontend/src/components/ui/AudioPlayer.tsx` - Audio player component

### Environment Variables
```bash
# Frontend (.env.local)
VITE_API_URL=http://localhost:8000
VITE_MEDIA_URL=http://localhost:8000/media

# Backend (.env)
DATABASE_URL=postgresql://postgres@localhost/musiccollab
REDIS_URL=redis://localhost:6379
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 