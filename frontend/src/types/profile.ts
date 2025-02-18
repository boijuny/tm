export interface Track {
  id: string;
  title: string;
  url: string;
  waveform?: string;
  story?: string;
  mood: string[];
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
}

export interface Achievement {
  title: string;
  date: string;
  description: string;
}

export interface CreativeUniverse {
  colorPalette: string[];
  moodImages: string[];
  influences: string[];
}

export interface Platform {
  type: 'spotify' | 'soundcloud' | 'youtube';
  url: string;
  username: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  role: string[];
  description: string;
  genres: string[];
  influences: string[];
  signature?: string;
  universe?: CreativeUniverse;
  tracks: Track[];
  videos: Video[];
  achievements: Achievement[];
  platforms: Platform[];
} 