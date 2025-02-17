import { useState, useCallback, useEffect } from 'react';
import { Profile } from '../types';
import { api } from '../services/api';

interface UseProfilesOptions {
  userType?: string;
  genre?: string;
  limit?: number;
}

// Mock data for development
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John Doe',
    artistType: 'Artist',
    bio: 'Singer-songwriter with a passion for indie folk and electronic fusion.',
    location: 'Paris, France',
    genres: ['Indie Folk', 'Electronic', 'Acoustic'],
    audioClips: [
      {
        url: 'https://example.com/song1.mp3',
        title: 'Autumn Leaves',
        duration: 180
      },
      {
        url: 'https://example.com/song2.mp3',
        title: 'Winter Dreams',
        duration: 210
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    artistType: 'Beatmaker',
    bio: 'Electronic music producer specializing in lo-fi beats and ambient soundscapes.',
    location: 'London, UK',
    genres: ['Lo-Fi', 'Ambient', 'Electronic'],
    audioClips: [
      {
        url: 'https://example.com/beat1.mp3',
        title: 'Midnight Groove',
        duration: 160
      },
      {
        url: 'https://example.com/beat2.mp3',
        title: 'Urban Flow',
        duration: 190
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  }
];

export function useProfiles(options: UseProfilesOptions = {}) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getProfiles(options);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setProfiles(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  }, [options]);

  const currentProfile = profiles[currentIndex];

  const handleLike = useCallback(async () => {
    if (!currentProfile) return;

    try {
      const response = await api.likeProfile(currentProfile.id);
      if (response.data?.match) {
        // Handle match!
        console.log('It\'s a match!');
      }
      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like profile');
    }
  }, [currentProfile]);

  const handlePass = useCallback(async () => {
    if (!currentProfile) return;

    try {
      await api.passProfile(currentProfile.id);
      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to pass profile');
    }
  }, [currentProfile]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfiles(mockProfiles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profiles');
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return {
    profiles,
    currentProfile,
    loading,
    error,
    loadProfiles,
    handleLike,
    handlePass,
    hasMore: currentIndex < profiles.length,
  };
} 