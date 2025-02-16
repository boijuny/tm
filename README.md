# Music Collaboration Platform

A Tinder-like iOS app for connecting musicians and producers.

## Project Structure

```
.
├── ios/                        # iOS Application
│   ├── App/                   # Main app target
│   │   ├── Sources/          # Swift source files
│   │   │   ├── Features/     # Feature modules
│   │   │   │   ├── Auth/     # Authentication
│   │   │   │   ├── Profile/  # User profiles
│   │   │   │   ├── Discover/ # Swipe interface
│   │   │   │   ├── Chat/     # Messaging
│   │   │   │   └── Audio/    # Audio playback
│   │   │   ├── Core/         # Core components
│   │   │   │   ├── UI/       # Reusable UI components
│   │   │   │   ├── Network/  # Networking layer
│   │   │   │   ├── Storage/  # Local storage
│   │   │   │   └── Utils/    # Utilities
│   │   │   └── Resources/    # Assets and configs
│   │   ├── Tests/           # Swift tests
│   │   └── UITests/         # UI tests
│   └── Packages/            # Swift packages
│
├── backend/                  # FastAPI backend application
│   ├── api/                # API routes and controllers
│   ├── models/             # Database models
│   ├── services/           # Business logic
│   │   ├── auth/          # Authentication service
│   │   ├── media/         # Media processing
│   │   ├── messaging/     # Real-time messaging
│   │   └── discover/      # Match finding logic
│   ├── db/                # Database migrations and config
│   └── utils/             # Utility functions
│
├── tests/                  # Backend test suites
│   └── backend/
│       ├── unit/         # Unit tests
│       ├── integration/  # Integration tests
│       └── e2e/         # End-to-end tests
│
└── docs/                  # Documentation
```

## Prerequisites

### System Requirements
- Xcode 14+
- iOS 15.0+ deployment target
- Python 3.9+
- PostgreSQL 13+
- Redis 6+
- CocoaPods

### iOS Development Setup
1. Install Xcode from the Mac App Store
2. Install CocoaPods:
```bash
sudo gem install cocoapods
```

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

### iOS Development
```bash
# Install dependencies
cd ios
pod install

# Open workspace in Xcode
open MusicCollab.xcworkspace

# Build and run from Xcode
```

### Backend Development
```bash
# Create and activate virtual environment
cd backend
python -m venv venv
source venv/bin/activate

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
# iOS tests (from Xcode)
Command + U

# Backend tests
cd backend
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

- [iOS Documentation](./docs/ios.md)
- [Backend Documentation](./docs/backend.md)
- [API Documentation](./docs/api.md)
- [Infrastructure Setup](./docs/infrastructure.md)

## Team

- iOS Development Team
- Backend Team
- DevOps Team
