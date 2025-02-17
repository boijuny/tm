import { useState, useCallback } from 'react';
import { Profile } from '../types';
import { api } from '../services/api';

interface UseProfilesOptions {
  userType?: string;
  genre?: string;
  limit?: number;
}

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