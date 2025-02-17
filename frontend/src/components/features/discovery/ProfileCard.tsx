import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioPlayer } from '../../ui/AudioPlayer';
import { useKeyboardShortcuts } from '../../../hooks/useKeyboardShortcuts';

interface Profile {
  id: string;
  name: string;
  artistType: 'Artist' | 'Beatmaker' | 'Both';
  genres: string[];
  bio: string;
  location: string;
  audioClips: {
    url: string;
    title: string;
    duration: number;
  }[];
  imageUrl: string;
}

interface ProfileCardProps {
  profile: Profile;
  onLike: (id: string) => void;
  onPass: (id: string) => void;
  onSuperLike: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  onPass,
  onSuperLike,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = useCallback(() => {
    onLike(profile.id);
  }, [profile.id, onLike]);

  const handlePass = useCallback(() => {
    onPass(profile.id);
  }, [profile.id, onPass]);

  const handleSuperLike = useCallback(() => {
    onSuperLike(profile.id);
  }, [profile.id, onSuperLike]);

  const toggleDetails = useCallback(() => {
    setIsDetailsOpen(prev => !prev);
  }, []);

  const toggleAudio = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const nextClip = useCallback(() => {
    setCurrentClipIndex(prev => 
      prev < profile.audioClips.length - 1 ? prev + 1 : prev
    );
  }, [profile.audioClips.length]);

  const previousClip = useCallback(() => {
    setCurrentClipIndex(prev => prev > 0 ? prev - 1 : prev);
  }, []);

  useKeyboardShortcuts({
    onLike: handleLike,
    onPass: handlePass,
    onSuperLike: handleSuperLike,
    onToggleDetails: toggleDetails,
    onToggleAudio: toggleAudio,
    onNextProfile: nextClip,
    onPreviousProfile: previousClip,
  });

  const currentClip = profile.audioClips[currentClipIndex];

  return (
    <motion.div
      className="relative w-full max-w-[420px] mx-auto overflow-hidden h-[640px]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Main Card */}
      <div className="relative h-full backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
        
        {/* Content Container */}
        <div className="relative h-full flex flex-col">
          {/* Image Section - Takes up 60% of the height */}
          <div className="relative h-[60%] overflow-hidden">
            <motion.img
              src={profile.imageUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
              layoutId={`profile-image-${profile.id}`}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/30" />
            
            {/* Profile Info Overlay */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-2">
                <motion.h2 
                  className="text-3xl font-bold text-white"
                  layoutId={`profile-name-${profile.id}`}
                >
                  {profile.name}
                </motion.h2>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-purple-500/30 backdrop-blur-md rounded-full border border-purple-500/20">
                    {profile.artistType}
                  </span>
                  <span className="text-white/80 text-sm">
                    {profile.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section - Takes up 40% of the height */}
          <div className="relative h-[40%] p-5 flex flex-col">
            {/* Genres - Fixed height */}
            <div className="h-12 overflow-x-auto flex items-center gap-2 no-scrollbar">
              {profile.genres.map(genre => (
                <motion.span 
                  key={genre}
                  className="flex-none px-3 py-1 text-sm text-white bg-white/10 rounded-full backdrop-blur-sm border border-white/10
                            hover:bg-white/20 transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {genre}
                </motion.span>
              ))}
            </div>

            {/* Bio - Flexible height */}
            <div className="flex-1 mt-3 overflow-hidden">
              <AnimatePresence>
                <motion.div
                  initial={false}
                  animate={{ height: isDetailsOpen ? 'auto' : '3.6em' }}
                  className="relative"
                >
                  <p className="text-white/80 text-sm leading-relaxed">{profile.bio}</p>
                  {!isDetailsOpen && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
                  )}
                </motion.div>
              </AnimatePresence>
              
              <motion.button
                onClick={toggleDetails}
                className="text-white/60 hover:text-white/80 text-xs mt-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isDetailsOpen ? 'Show less' : 'Read more'}
              </motion.button>
            </div>

            {/* Audio Player - Fixed height */}
            <div className="h-20 mt-3">
              <AudioPlayer
                url={currentClip.url}
                title={currentClip.title}
                duration={currentClip.duration}
                isPlaying={isPlaying}
                onPlayPause={toggleAudio}
              />
            </div>
          </div>

          {/* Action Buttons - Absolutely positioned at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 text-red-500 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20
                        hover:bg-white/20 transition-colors"
              onClick={handlePass}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 text-purple-500 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20
                        hover:bg-white/20 transition-colors"
              onClick={handleSuperLike}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 text-green-500 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20
                        hover:bg-white/20 transition-colors"
              onClick={handleLike}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 