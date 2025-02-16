# iOS Development Guide

## Architecture

The iOS app follows the MVVM (Model-View-ViewModel) architecture with SwiftUI and Combine framework.

### Project Structure

```
ios/
├── App/
│   ├── Sources/
│   │   ├── Features/      # Feature modules
│   │   │   ├── Auth/      # Authentication
│   │   │   ├── Profile/   # User profiles
│   │   │   ├── Discover/  # Swipe interface
│   │   │   ├── Chat/      # Messaging
│   │   │   └── Audio/     # Audio playback
│   │   ├── Core/          # Core components
│   │   │   ├── UI/        # Reusable UI components
│   │   │   ├── Network/   # Networking layer
│   │   │   ├── Storage/   # Local storage
│   │   │   └── Utils/     # Utilities
│   │   └── Resources/     # Assets and configs
│   ├── Tests/            # Swift tests
│   └── UITests/          # UI tests
└── Packages/             # Swift packages
```

## Tech Stack

- **UI Framework**: SwiftUI
- **State Management**: Combine
- **Networking**: URLSession with async/await
- **Local Storage**: CoreData
- **Audio**: AVFoundation
- **Dependencies**: Swift Package Manager / CocoaPods
- **Testing**: XCTest

## Core Features Implementation

### Authentication
- Sign in with Apple
- Email authentication
- Secure token storage using Keychain

### Profile Management
- Image picker and cropping
- Audio file upload
- Profile editing

### Discover Interface
- Swipe gesture handling
- Card stack implementation
- Profile preview
- Audio player integration

### Messaging
- Real-time chat using WebSocket
- Push notifications
- Audio message support
- Message persistence

### Audio Features
- Audio file playback
- Waveform visualization
- Basic audio processing
- Upload/download management

## Development Guidelines

### Code Style
- Follow Apple's Swift API Design Guidelines
- Use SwiftLint for code style enforcement
- Implement proper error handling
- Document public interfaces

### UI/UX Guidelines
- Follow iOS Human Interface Guidelines
- Support Dark Mode
- Implement proper loading states
- Handle offline mode gracefully

### Testing
- Write unit tests for business logic
- UI tests for critical paths
- Mock network responses
- Test offline behavior

### Performance
- Implement proper memory management
- Optimize image loading and caching
- Handle background tasks efficiently
- Monitor network usage

## Common Tasks

### Adding a New Feature
1. Create feature directory in `Features/`
2. Implement MVVM structure
3. Add to main navigation
4. Write tests
5. Document API

### Handling Audio
1. Request microphone permissions
2. Implement AVFoundation setup
3. Handle background audio
4. Manage audio session

### API Integration
1. Add endpoint to API client
2. Implement request/response models
3. Add error handling
4. Write integration tests

## Deployment

### App Store
1. Version bump
2. Update changelog
3. Run test suite
4. Create archive
5. Submit to App Store Connect

### TestFlight
1. Configure build settings
2. Add test users
3. Upload build
4. Distribute to testers 