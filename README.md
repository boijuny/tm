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
├── infrastructure/             # Infrastructure as Code
├── docker/                    # Docker configurations
└── docs/                      # Documentation

```

## Development Setup

### Prerequisites
- Node.js 16+
- Python 3.9+
- Docker
- AWS CLI

### Frontend Development
```bash
cd src/frontend
npm install
npm run dev
```

### Backend Development
```bash
cd src/backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
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
