import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User } from '../../../types';
import { ProfileCard } from './ProfileCard';

// Mock data for testing
const mockProfiles: User[] = [
  {
    id: '1',
    displayName: 'John Doe',
    userType: 'artist',
    bio: 'Singer-songwriter with a passion for indie folk and electronic fusion. Looking to collaborate with producers who can bring a fresh perspective to my acoustic compositions.',
    photoURL: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    media: [
      {
        id: '1',
        title: 'Autumn Leaves',
        url: '/media/autumn-leaves.mp3',
        type: 'audio',
        duration: 180
      }
    ],
    genres: ['Indie Folk', 'Electronic', 'Acoustic'],
    location: 'Paris, France',
    likes: [],
    passes: []
  },
  {
    id: '2',
    displayName: 'Sarah Smith',
    userType: 'beatmaker',
    bio: 'Electronic music producer specializing in lo-fi beats and ambient soundscapes. Always looking for vocalists and instrumentalists to collaborate with.',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    media: [
      {
        id: '2',
        title: 'Midnight Dreams',
        url: '/media/midnight-dreams.mp3',
        type: 'audio',
        duration: 210
      }
    ],
    genres: ['Lo-Fi', 'Ambient', 'Electronic'],
    location: 'London, UK',
    likes: [],
    passes: []
  }
];

export const DiscoveryContainer: React.FC = () => {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProfiles = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfiles(mockProfiles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    // TODO: Implement API call to record the swipe
    console.log(`Swiped ${direction} on profile:`, profiles[currentIndex]);
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // No more profiles to show
      setProfiles([]); // Clear the stack
      // TODO: Implement refresh or "no more profiles" state
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4" />
          <p className="text-lg font-medium">Finding potential matches...</p>
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="text-center text-white p-8 rounded-2xl backdrop-blur-lg bg-white/10">
          <h2 className="text-2xl font-bold mb-4">No More Profiles</h2>
          <p className="mb-6">We've run out of potential matches for now.</p>
          <button
            onClick={() => {
              setProfiles(mockProfiles);
              setCurrentIndex(0);
            }}
            className="px-6 py-3 rounded-full bg-white text-purple-600 font-medium hover:bg-opacity-90 transition-colors"
          >
            Refresh Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnimatePresence>
          {profiles.slice(currentIndex).map((profile, index) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSwipe={handleSwipe}
            />
          )).reverse()}
        </AnimatePresence>
      </div>
    </div>
  );
}; 