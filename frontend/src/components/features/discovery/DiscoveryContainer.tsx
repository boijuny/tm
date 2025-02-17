import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileCard } from './ProfileCard';
import { useProfiles } from '../../../hooks/useProfiles';

type SwipeDirection = 'left' | 'right' | 'up' | null;

export const DiscoveryContainer: React.FC = () => {
  const { profiles, loading, error } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<SwipeDirection>(null);

  const handleLike = useCallback((id: string) => {
    setDirection('right');
    setCurrentIndex(prev => prev + 1);
  }, []);

  const handlePass = useCallback((id: string) => {
    setDirection('left');
    setCurrentIndex(prev => prev + 1);
  }, []);

  const handleSuperLike = useCallback((id: string) => {
    setDirection('up');
    setCurrentIndex(prev => prev + 1);
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        </div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        </div>
        <div className="glass-card text-center max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-red-500 mb-4"
          >
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-400">We're having trouble loading profiles. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        </div>
        <div className="glass-card text-center max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-purple-500 mb-4"
          >
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">No More Profiles</h3>
          <p className="text-gray-400">Check back later for new potential matches!</p>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return null;
  }

  const variants = {
    enter: (direction: 'left' | 'right' | 'up') => ({
      x: direction === 'right' ? 1000 : direction === 'left' ? -1000 : 0,
      y: direction === 'up' ? -1000 : 0,
      opacity: 0,
      scale: 0.8,
      rotateZ: direction === 'right' ? 10 : direction === 'left' ? -10 : 0
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: (direction: 'left' | 'right' | 'up') => ({
      x: direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0,
      y: direction === 'up' ? -1000 : 100,
      opacity: 0,
      scale: 0.8,
      rotateZ: direction === 'right' ? 10 : direction === 'left' ? -10 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Profile card container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentProfile.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full max-w-4xl"
          >
            <ProfileCard
              profile={currentProfile}
              onLike={handleLike}
              onPass={handlePass}
              onSuperLike={handleSuperLike}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}; 