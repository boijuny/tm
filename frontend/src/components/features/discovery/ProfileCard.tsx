import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { User, UserType } from '../../../types';

interface ProfileCardProps {
  profile: User;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandBio, setExpandBio] = useState(false);

  // Card drag motion values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  
  // Background gradient based on drag
  const background = useTransform(
    x,
    [-200, 0, 200],
    [
      'linear-gradient(to right, rgb(239, 68, 68), rgb(153, 27, 27))',
      'linear-gradient(to right, rgb(99, 102, 241), rgb(67, 56, 202))',
      'linear-gradient(to right, rgb(34, 197, 94), rgb(21, 128, 61))'
    ]
  );

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  const getUserTypeLabel = (type: UserType | undefined) => {
    if (!type) return 'Unknown';
    return type === 'artist' ? 'Artiste' : 'Beatmaker';
  };

  return (
    <motion.div
      className="absolute w-full max-w-sm"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/4] bg-gradient-to-br from-indigo-500 to-purple-600"
        style={{ background }}
      >
        {/* Profile Image */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {profile.photoURL && (
          <img
            src={profile.photoURL}
            alt={profile.displayName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium"
            >
              {getUserTypeLabel(profile.userType)}
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {profile.displayName}
              </h2>
              <motion.p
                className={`text-white/90 text-sm ${expandBio ? '' : 'line-clamp-2'}`}
                onClick={() => setExpandBio(!expandBio)}
              >
                {profile.bio}
              </motion.p>
            </div>

            {/* Audio Preview */}
            {profile.media?.length > 0 && (
              <div className="space-y-2">
                {profile.media.map((media) => (
                  <motion.button
                    key={media.id}
                    className={`w-full px-4 py-2 rounded-lg flex items-center space-x-3 backdrop-blur-md transition-colors ${
                      isPlaying
                        ? 'bg-white/30 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <motion.div
                      animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ repeat: isPlaying ? Infinity : 0, duration: 1 }}
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </motion.div>
                    <span className="flex-1 text-left truncate">{media.title}</span>
                    {media.duration && (
                      <span className="text-sm opacity-75">
                        {Math.floor(media.duration / 60)}:{String(Math.floor(media.duration % 60)).padStart(2, '0')}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Genres */}
            {profile.genres && profile.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90 backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Swipe Indicators */}
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-between px-8 pointer-events-none"
          style={{ opacity: useTransform(x, [-100, 0, 100], [1, 0, 1]) }}
        >
          <motion.div
            className="p-4 rounded-full bg-red-500/80 backdrop-blur-md"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>
          <motion.div
            className="p-4 rounded-full bg-green-500/80 backdrop-blur-md"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 