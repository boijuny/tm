# Music Collaboration Platform

A modern web platform that connects artists and beatmakers through an intuitive, Tinder-like discovery experience. Built with React, FastAPI, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 13+
- Poetry (Python dependency management)

### Backend Setup

1. Install Python dependencies:
```bash
cd backend
poetry install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and other configurations
```

3. Initialize the database:
```bash
poetry run alembic upgrade head
```

4. Start the backend server:
```bash
poetry run uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API URL and other configurations
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎯 Features

### Discovery Experience
- Desktop-optimized discovery interface
- Keyboard shortcuts for quick interactions
- Smooth animations and transitions
- Rich media preview with audio player
- Profile cards with detailed information

### Audio Features
- Waveform visualization
- Continuous playback while browsing
- Multiple track preview
- Volume normalization

### User Profiles
- Comprehensive artist profiles
- Genre tagging system
- Audio clip uploads
- Social media integration

## 🎹 Keyboard Shortcuts

- `J` - Next profile
- `K` - Previous profile
- `L` - Like profile
- `P` - Pass profile
- `S` - Super like
- `Space` - Toggle audio playback
- `D` - Toggle profile details
- `↑` - Volume up
- `↓` - Volume down

## 🛠 Development

### Project Structure
```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Basic UI components
│   │   │   ├── layout/       # Layout components
│   │   │   └── features/     # Feature-specific components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── types/           # TypeScript definitions
│   │   └── contexts/        # React contexts
│   └── ...
├── backend/
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── core/            # Core functionality
│   │   ├── db/              # Database models
│   │   └── services/        # Business logic
│   └── ...
```

### Code Style

#### Frontend
- ESLint for linting
- Prettier for formatting
- TypeScript in strict mode
- Follow React best practices

#### Backend
- Black for formatting
- Ruff for linting
- MyPy for type checking
- Follow FastAPI best practices

### Git Workflow

1. Create feature branch from `develop`:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit using conventional commits:
```bash
git commit -m "feat(scope): description"
```

3. Push changes and create pull request to `develop`

## 📝 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
poetry run pytest
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret key
- `CORS_ORIGINS` - Allowed CORS origins

#### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_WEBSOCKET_URL` - WebSocket URL
- `VITE_FIREBASE_CONFIG` - Firebase configuration (if used)

## 📚 Additional Resources

- [Product Requirements Document](./prd.txt)
- [API Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Infrastructure Guidelines](./.cursor/rules/infrastructure.mdc)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 