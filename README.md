# Music Collaboration Platform

A Tinder-like platform for connecting musicians and producers.

## Project Structure

```
.
├── src/
│   ├── frontend/                 # Next.js frontend application
│   │   ├── components/          # Reusable UI components
│   │   │   ├── atoms/          # Basic building blocks (buttons, inputs)
│   │   │   ├── molecules/      # Composite components (forms, cards)
│   │   │   ├── organisms/      # Complex components (navigation, audio player)
│   │   │   └── templates/      # Page layouts and templates
│   │   ├── pages/              # Next.js pages and routing
│   │   ├── styles/             # Global styles and theme
│   │   │   ├── tokens/         # Design tokens (colors, typography)
│   │   │   ├── mixins/         # SCSS mixins and functions
│   │   │   ├── layouts/        # Layout styles
│   │   │   └── themes/         # Theme configurations
│   │   ├── features/           # Feature-specific components
│   │   │   ├── auth/           # Authentication features
│   │   │   ├── profile/        # Profile management
│   │   │   ├── discover/       # Swipe and match interface
│   │   │   ├── messaging/      # Chat functionality
│   │   │   └── audio/          # Audio playback and upload
│   │   ├── store/              # State management
│   │   └── utils/              # Utility functions
│   │
│   └── backend/                 # FastAPI backend application
│       ├── api/                # API routes and controllers
│       ├── models/             # Database models
│       ├── services/           # Business logic
│       │   ├── auth/           # Authentication service
│       │   ├── media/          # Media processing
│       │   ├── messaging/      # Real-time messaging
│       │   └── discover/       # Match finding logic
│       ├── db/                 # Database migrations and config
│       └── utils/              # Utility functions
│
├── tests/                       # Test suites
│   ├── frontend/
│   │   ├── unit/              # Unit tests
│   │   ├── integration/       # Integration tests
│   │   └── e2e/              # End-to-end tests
│   └── backend/
│       ├── unit/              # Unit tests
│       ├── integration/       # Integration tests
│       └── e2e/              # End-to-end tests
│
├── infrastructure/             # Infrastructure configuration
└── docs/                      # Documentation

```

## Prerequisites

### System Requirements
- Node.js 16+
- Python 3.9+
- PostgreSQL 13+
- Redis 6+

### Database Setup
1. Install PostgreSQL
2. Create a database:
```sql
CREATE DATABASE music_collab;
```

### Cache Setup
1. Install Redis
2. Verify Redis is running:
```bash
redis-cli ping
```

## Development Setup

### Frontend Development
```bash
# Install dependencies
cd src/frontend
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your local settings

# Start development server
npm run dev
```

### Backend Development
```bash
# Create and activate virtual environment
cd src/backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your local settings

# Run database migrations
alembic upgrade head

# Start development server
uvicorn main:app --reload
```

### Running Tests
```bash
# Frontend tests
cd src/frontend
npm run test

# Backend tests
cd src/backend
pytest
```

## Git Workflow

1. Create a new branch from `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Commit using conventional commits:
   ```bash
   git commit -m "feat(scope): description"
   ```

4. Push and create a PR:
   ```bash
   git push origin feature/your-feature-name
   ```

## Documentation

- [Frontend Documentation](./docs/frontend.md)
- [Backend Documentation](./docs/backend.md)
- [API Documentation](./docs/api.md)
- [Infrastructure Setup](./docs/infrastructure.md)

## Team

- Frontend Team
- Backend Team
- DevOps Team
