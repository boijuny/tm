// User related types
export interface User {
  id: string;
  name: string;
  artistType: 'Artist' | 'Beatmaker' | 'Both';
  genres: string[];
  bio: string;
  location: string;
  audioClips: AudioClip[];
  imageUrl: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  passes: string[];
  matches: string[];
  socialLinks?: SocialLinks;
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
export interface AudioClip {
  url: string;
  title: string;
  duration: number;
}

export interface SocialLinks {
  spotify?: string;
  soundcloud?: string;
  instagram?: string;
  youtube?: string;
}

export interface Profile {
  id: string;
  name: string;
  artistType: 'Artist' | 'Beatmaker' | 'Both';
  genres: string[];
  bio: string;
  location: string;
  audioClips: AudioClip[];
  imageUrl: string;
}

export interface Media {
  id: string;
  title: string;
  url: string;
  type: 'audio' | 'video';
  duration?: number;
  thumbnailUrl?: string;
}

export interface Match {
  id: string;
  users: string[];
  createdAt: string;
  lastMessageAt: string | null;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
} 