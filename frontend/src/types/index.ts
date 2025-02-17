// User related types
export interface User {
  id: string;
  displayName: string;
  photoURL?: string;
  userType?: UserType;
  bio?: string;
  media: MediaItem[];
  genres?: string[];
  location?: string;
  socialLinks?: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
  likes: string[]; // Array of user IDs
  passes: string[]; // Array of user IDs
}

export type UserType = 'artist' | 'beatmaker';

// Authentication types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Media types
export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'audio' | 'video';
  duration?: number;
  thumbnailUrl?: string;
}

// Profile types
export interface Profile extends User {
  media: MediaItem[];
  matches: string[]; // Array of user IDs
  likes: string[]; // Array of user IDs
  passes: string[]; // Array of user IDs
}

export interface Media {
  id: string;
  title: string;
  url: string;
  type: 'audio' | 'video';
  duration?: number;
  thumbnailUrl?: string;
}

export interface Profile {
  id: string;
  displayName: string;
  photoURL?: string;
  userType: 'Artiste' | 'Beatmaker';
  bio: string;
  media?: Media[];
  genres?: string[];
  location?: string;
  socialLinks?: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
  };
} 