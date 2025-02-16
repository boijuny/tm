import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MediaItem {
  type: 'audio' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}

interface Profile {
  id: string;
  displayName: string;
  photoURL: string;
  userType: 'artist' | 'producer';
  bio?: string;
  media: MediaItem[];
}

// Données de test avec des extraits réels
const mockProfiles: Profile[] = [
  {
    id: '1',
    displayName: 'DJ Khaled',
    photoURL: 'https://picsum.photos/400/600',
    userType: 'producer',
    bio: 'Producteur de hits 🎵 - Another One!',
    media: [
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/weeI1G46q0o',
        title: 'God Did',
        thumbnail: 'https://img.youtube.com/vi/weeI1G46q0o/maxresdefault.jpg'
      },
      {
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        title: 'Beat Demo #1'
      }
    ]
  },
  {
    id: '2',
    displayName: 'Sarah Beat',
    photoURL: 'https://picsum.photos/400/601',
    userType: 'producer',
    bio: 'Beatmaker - Trap & Hip-Hop 🎧',
    media: [
      {
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        title: 'Trap Beat 2023'
      },
      {
        type: 'audio',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        title: 'Hip-Hop Instrumental'
      }
    ]
  },
  {
    id: '3',
    displayName: 'MC Flow',
    photoURL: 'https://picsum.photos/400/602',
    userType: 'artist',
    bio: 'Rappeur - Je cherche des prods qui claquent 🎤',
    media: [
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        title: 'Dernier Clip',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
      }
    ]
  }
];

const MediaPlayer: React.FC<{ item: MediaItem }> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  // Réinitialiser l'état lors du changement de média
  React.useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [item.url]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const percent = (current / duration) * 100;
      setProgress(percent);
      setCurrentTime(current);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      const time = (percent / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(percent);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  if (item.type === 'video') {
    return (
      <div className="relative aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          src={`${item.url}?autoplay=0`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="bg-surface/50 backdrop-blur-md rounded-lg p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-primary/80 text-white transition-colors"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white mb-1">{item.title}</h4>
          <div className="text-xs text-white/60">
            {isPlaying ? "En lecture" : "En pause"}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div 
          ref={progressBarRef}
          onClick={handleProgressBarClick}
          className="h-2 bg-gray-600/30 rounded-full overflow-hidden cursor-pointer group"
        >
          <div 
            className="h-full bg-primary rounded-full transition-all duration-100 relative group-hover:bg-primary/80"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-white/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={item.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
};

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    const swipe = info.offset.x;
    
    if (Math.abs(swipe) > swipeThreshold) {
      const direction = swipe > 0 ? 'right' : 'left';
      handleSwipe(direction);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setDirection(direction);
    setCurrentMediaIndex(0); // Réinitialiser l'index des médias pour le prochain profil
    
    if (direction === 'right') {
      console.log('Match potential avec:', mockProfiles[currentIndex].displayName);
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 300);
  };

  const handleMediaNavigation = (direction: 'prev' | 'next') => {
    const profile = mockProfiles[currentIndex];
    const totalMedia = profile.media.length + 1; // +1 pour la photo de profil

    if (direction === 'prev') {
      setCurrentMediaIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else {
      setCurrentMediaIndex(prev => (prev < totalMedia - 1 ? prev + 1 : prev));
    }
  };

  if (currentIndex >= mockProfiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background p-4">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
          >
            <h2 className="text-2xl font-bold mb-4">
              Plus de profils disponibles
            </h2>
            <p className="text-text-secondary mb-6">
              Revenez plus tard pour découvrir de nouveaux profils !
            </p>
            <Link
              to="/login"
              className="btn-primary inline-block"
            >
              Se connecter pour voir plus
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentProfile = mockProfiles[currentIndex];
  const allMedia = [
    { type: 'photo', url: currentProfile.photoURL, title: 'Photo de profil' },
    ...currentProfile.media
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold gradient-text">Music Tinder</h1>
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Se connecter
          </Link>
        </div>

        <div className="swipe-card-container mb-6">
          <AnimatePresence>
            <motion.div
              key={currentProfile.id}
              className="swipe-card glass-card overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={direction ? { x: direction === 'left' ? -1000 : 1000 } : {}}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full h-full">
                {/* Navigation des médias */}
                <div className="absolute inset-x-0 top-4 z-10 flex justify-center space-x-2">
                  {allMedia.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentMediaIndex
                          ? 'w-6 bg-white'
                          : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Boutons de navigation */}
                <button
                  onClick={() => handleMediaNavigation('prev')}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/90 hover:bg-black/60 transition-all ${
                    currentMediaIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleMediaNavigation('next')}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/90 hover:bg-black/60 transition-all ${
                    currentMediaIndex === allMedia.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Contenu du média actuel */}
                <div className="w-full h-full">
                  {currentMediaIndex === 0 ? (
                    <img
                      src={currentProfile.photoURL}
                      alt={currentProfile.displayName}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/90 rounded-xl p-4 flex items-center justify-center">
                      <MediaPlayer item={currentProfile.media[currentMediaIndex - 1]} />
                    </div>
                  )}
                </div>

                {/* Informations du profil */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-xl">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentProfile.displayName}
                  </h3>
                  <p className="text-white/90">
                    {currentProfile.userType === 'artist' ? '🎤 Artiste' : '🎹 Beatmaker'}
                  </p>
                  {currentProfile.bio && (
                    <p className="text-white/80 mt-2">{currentProfile.bio}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 text-2xl"
          >
            ✕
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 text-2xl"
          >
            ♥
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home; 