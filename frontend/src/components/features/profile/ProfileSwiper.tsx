import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ProfileCard from './ProfileCard';

// Sample profiles data
const sampleProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    description: "Jazz guitarist and composer with a passion for fusion. Looking to collaborate on innovative projects that blend traditional jazz with modern elements. Graduate from Berklee College of Music.",
    location: "Boston, MA",
    genres: ["Jazz", "Fusion", "Contemporary"],
    instruments: ["Guitar", "Piano", "Composition"],
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't1',
        title: 'Guitar Cover - Wonderwall',
        url: 'https://soundcloud.com/acousticguitar/wonderwall-acoustic-cover',
      },
      {
        id: 't2',
        title: 'Original Piano Composition',
        url: 'https://soundcloud.com/piano-tracks/original-composition',
      }
    ],
    videos: [
      {
        id: 'v1',
        title: 'Live Jazz Performance',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '2',
    name: 'Mike',
    age: 28,
    description: "Electronic music producer specializing in house and techno. Studio owner with 8 years of production experience. Seeking vocalists and instrumentalists for electronic fusion projects.",
    location: "Berlin, Germany",
    genres: ["House", "Techno", "Electronic"],
    instruments: ["Synthesizer", "Drum Machine", "Production"],
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't3',
        title: 'Electronic Dance Mix 2024',
        url: 'https://soundcloud.com/edm-tracks/electronic-dance-mix-2024',
      },
      {
        id: 't4',
        title: 'Deep House Original',
        url: 'https://soundcloud.com/house-music/deep-house-vibes',
      }
    ],
    videos: [
      {
        id: 'v2',
        title: 'Studio Production Session',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdaa7543d5d4?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '3',
    name: 'Emma',
    age: 26,
    description: "First violin in the city symphony orchestra. Classical training with a modern twist. Interested in crossover projects and experimental classical fusion.",
    location: "Vienna, Austria",
    genres: ["Classical", "Contemporary Classical", "Chamber Music"],
    instruments: ["Violin", "Viola", "Chamber Ensemble"],
    photos: ['https://images.unsplash.com/photo-1619472351888-f844a0b33f5b?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't5',
        title: 'Classical Violin Solo',
        url: 'https://soundcloud.com/classical-music/violin-concerto',
      },
      {
        id: 't6',
        title: 'Chamber Music Ensemble',
        url: 'https://soundcloud.com/chamber-music/quartet-performance',
      }
    ],
    videos: [
      {
        id: 'v3',
        title: 'Orchestra Performance',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '4',
    name: 'Alex',
    age: 30,
    description: "Lead guitarist and songwriter for indie rock band 'Midnight Echoes'. Looking for collaborators for acoustic sessions and potential side projects.",
    location: "Portland, OR",
    genres: ["Indie Rock", "Alternative", "Folk Rock"],
    instruments: ["Electric Guitar", "Acoustic Guitar", "Vocals"],
    photos: ['https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't7',
        title: 'Rock Band - Original Song',
        url: 'https://soundcloud.com/rock-music/original-rock-song',
      },
      {
        id: 't8',
        title: 'Acoustic Session',
        url: 'https://soundcloud.com/acoustic-sessions/unplugged',
      }
    ],
    videos: [
      {
        id: 'v4',
        title: 'Live Concert Performance',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '5',
    name: 'Sophia',
    age: 25,
    description: "Jazz saxophonist with a background in classical music. Regular performer at top jazz clubs. Interested in forming a jazz quartet or joining existing ensembles.",
    location: "New Orleans, LA",
    genres: ["Jazz", "Blues", "Bebop"],
    instruments: ["Saxophone", "Clarinet", "Flute"],
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't9',
        title: 'Jazz Saxophone Solo',
        url: 'https://soundcloud.com/jazz-music/saxophone-improvisation',
      },
      {
        id: 't10',
        title: 'Jazz Quartet Performance',
        url: 'https://soundcloud.com/jazz-ensemble/quartet-live',
      }
    ],
    videos: [
      {
        id: 'v5',
        title: 'Jazz Club Performance',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '6',
    name: 'David',
    age: 29,
    description: "Hip-hop producer and beatmaker with a studio in Brooklyn. Worked with upcoming artists and looking to expand network. Open to all styles of hip-hop collaboration.",
    location: "Brooklyn, NY",
    genres: ["Hip Hop", "Rap", "R&B"],
    instruments: ["MPC", "Turntables", "Production"],
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't11',
        title: 'Hip Hop Production',
        url: 'https://soundcloud.com/hip-hop/original-beat',
      },
      {
        id: 't12',
        title: 'Rap Freestyle',
        url: 'https://soundcloud.com/rap-music/freestyle-session',
      }
    ],
    videos: [
      {
        id: 'v6',
        title: 'Studio Recording Session',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '7',
    name: 'Luna',
    age: 27,
    description: "Singer-songwriter with folk roots and indie sensibilities. Released two EPs and currently working on first full-length album. Looking for session musicians and collaborators.",
    location: "Nashville, TN",
    genres: ["Folk", "Indie Folk", "Americana"],
    instruments: ["Acoustic Guitar", "Vocals", "Banjo"],
    photos: ['https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't13',
        title: 'Indie Folk Original',
        url: 'https://soundcloud.com/indie-folk/original-song',
      },
      {
        id: 't14',
        title: 'Acoustic Guitar Session',
        url: 'https://soundcloud.com/acoustic/guitar-vocals',
      }
    ],
    videos: [
      {
        id: 'v7',
        title: 'Coffee Shop Performance',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60',
      }
    ],
  },
  {
    id: '8',
    name: 'Marcus',
    age: 31,
    description: "DJ and electronic music producer specializing in house and techno. Resident DJ at Club Nexus. Looking to collaborate with vocalists and other producers.",
    location: "London, UK",
    genres: ["House", "Techno", "EDM"],
    instruments: ["DJ Equipment", "Synthesizer", "Production"],
    photos: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=60'],
    tracks: [
      {
        id: 't15',
        title: 'DJ Mix - House Session',
        url: 'https://soundcloud.com/dj-sets/house-mix',
      },
      {
        id: 't16',
        title: 'Techno Production',
        url: 'https://soundcloud.com/techno/original-track',
      }
    ],
    videos: [
      {
        id: 'v8',
        title: 'Club Performance',
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&auto=format&fit=crop&q=60',
      }
    ],
  }
];

const ProfileSwiper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    const swipeDirection = info.offset.x > 0 ? 'right' : 'left';
    
    if (Math.abs(info.offset.x) > swipeThreshold) {
      setDirection(swipeDirection);
      handleSwipe(swipeDirection);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    // Handle the match or reject action
    if (direction === 'right') {
      console.log('Matched with:', sampleProfiles[currentIndex].name);
      // TODO: Implement match logic
    } else {
      console.log('Rejected:', sampleProfiles[currentIndex].name);
      // TODO: Implement reject logic
    }

    // Move to next profile after animation
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleProfiles.length);
      setDirection(null);
    }, 200);
  };

  const getSwipeAnimation = () => {
    if (!direction) return {};
    const xOffset = direction === 'left' ? -200 : 200;
    return {
      x: xOffset,
      opacity: 0,
      rotate: direction === 'left' ? -20 : 20,
    };
  };

  return (
    <div className="relative h-screen w-full max-w-md mx-auto overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
      {/* Swipeable Card Container */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              ...getSwipeAnimation(),
            }}
            exit={{ 
              scale: 0.95, 
              opacity: 0,
              ...getSwipeAnimation(),
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full px-4"
          >
            <div className="relative">
              {/* Match/Reject Overlays */}
              <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-200 ${direction === 'right' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-green-500/80 text-white text-4xl font-bold p-4 rounded-xl rotate-12">
                  MATCH!
                </div>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-200 ${direction === 'left' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-red-500/80 text-white text-4xl font-bold p-4 rounded-xl -rotate-12">
                  PASS
                </div>
              </div>

              <ProfileCard profile={sampleProfiles[currentIndex]} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Section */}
      <div className="w-full px-4 pb-8 pt-4 bg-gradient-to-t from-gray-100 to-transparent">
        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg text-red-500 border-2 border-red-500 hover:bg-red-50 transition-colors"
          >
            <XMarkIcon className="w-8 h-8" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg text-green-500 border-2 border-green-500 hover:bg-green-50 transition-colors"
          >
            <HeartIcon className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Swipe instruction overlay */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-sm bg-white/80 px-4 py-2 rounded-full shadow-sm"
          >
            Swipe right to match, left to pass
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSwiper; 