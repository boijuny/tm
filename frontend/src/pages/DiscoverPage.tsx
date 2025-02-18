import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import ProfileCard from '../components/features/profile/ProfileCard';
import { sampleProfiles } from '../data/sampleProfiles';

// Enhanced sample profile with creative universe data
const enhancedProfiles = sampleProfiles.map(profile => ({
  ...profile,
  signature: `${profile.name.toLowerCase()}.wav`,
  role: profile.instruments.map(instrument => 
    instrument === 'Production' ? 'Producer' : 
    instrument === 'Composition' ? 'Composer' : 
    `${instrument}ist`
  ),
  influences: profile.instruments.map(instrument => 
    instrument === 'Guitar' ? 'John Mayer' :
    instrument === 'Piano' ? 'Bill Evans' :
    instrument === 'Production' ? 'Quincy Jones' :
    'Miles Davis'
  ),
  universe: {
    colorPalette: [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEEAD'
    ],
    moodImages: [
      profile.photos[0],
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60'
    ],
    influences: ['John Coltrane', 'Miles Davis', 'Herbie Hancock']
  },
  achievements: [
    {
      title: 'Released Debut EP',
      date: '2023',
      description: 'First solo project exploring jazz fusion elements'
    },
    {
      title: 'Collaboration with Local Artists',
      date: '2022',
      description: 'Featured on multiple tracks in the local scene'
    }
  ],
  platforms: [
    {
      type: 'spotify' as const,
      url: 'https://open.spotify.com/artist/example',
      username: profile.name
    },
    {
      type: 'soundcloud' as const,
      url: 'https://soundcloud.com/mairo37099/larousse-feat-nes-wallace',
      username: 'mairo37099'
    },
    {
      type: 'youtube' as const,
      url: 'https://www.youtube.com/watch?v=Tiz5kHVqIfE',
      username: profile.name
    }
  ]
}));

const DiscoverPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());

  const activeProfile = enhancedProfiles[currentIndex];
  const isCurrentProfileLiked = likedProfiles.has(activeProfile.id);

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    const scrollDown = e.deltaY > 0;
    setDirection(scrollDown ? 1 : -1);
    
    if (scrollDown && currentIndex < enhancedProfiles.length - 1) {
      setIsScrolling(true);
      handlePass();
    } else if (!scrollDown && currentIndex > 0) {
      setIsScrolling(true);
      handlePrevious();
    }
    
    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, [currentIndex, isScrolling]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(current => current - 1);
    }
  };

  const handlePass = () => {
    if (isScrolling) return;
    
    if (currentIndex < enhancedProfiles.length - 1) {
      setDirection(1);
      setIsScrolling(true);
      setCurrentIndex(current => current + 1);
      setTimeout(() => {
        setIsScrolling(false);
      }, 900);
    }
  };

  const handleResonance = () => {
    if (isScrolling) return;
    
    const profileId = activeProfile.id;
    setLikedProfiles(prev => {
      const newLiked = new Set(prev);
      newLiked.add(profileId);
      return newLiked;
    });
    
    console.log('Resonating with', activeProfile.name);
    if (currentIndex < enhancedProfiles.length - 1) {
      setDirection(1);
      setIsScrolling(true);
      setCurrentIndex(current => current + 1);
      setTimeout(() => {
        setIsScrolling(false);
      }, 900);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[var(--app-height)] flex flex-col overflow-hidden
                 bg-gradient-to-b from-background-950 to-background-900"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary-500/5 via-transparent to-transparent" />
      
      {/* Main content container with proper spacing */}
      <div className="relative flex-1 flex items-center justify-center
                    pl-[72px] md:pl-[256px] pr-[72px] md:pr-[100px]">
        {/* Profile Cards Container with fixed dimensions */}
        <div className="relative w-full max-w-[1200px] mx-auto aspect-[16/9]">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ y: direction >= 0 ? "100%" : "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: direction >= 0 ? "-100%" : "100%" }}
              transition={{ 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ProfileCard 
                profile={activeProfile}
                onResonance={handleResonance}
                onSwipe={(direction) => direction === 'right' ? handleResonance() : handlePass()}
                isLiked={isCurrentProfileLiked}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Bar - Right Side */}
        <div className="fixed top-1/2 -translate-y-1/2 z-50
                      right-4 sm:right-6 md:right-8 
                      transition-all duration-300">
          <motion.div 
            className="glass-panel-sm rounded-2xl p-2 sm:p-2.5 flex flex-col gap-2 sm:gap-3"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Pass Button */}
            <motion.button
              onClick={handlePass}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
            </motion.button>

            {/* Like Button */}
            <motion.button
              onClick={handleResonance}
              className={`p-2 sm:p-2.5 rounded-xl ${isCurrentProfileLiked ? 'bg-primary/20' : 'bg-white/5'} hover:bg-white/10 transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCurrentProfileLiked ? (
                <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              ) : (
                <HeartIconOutline className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;