import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, MusicalNoteIcon, VideoCameraIcon, UserIcon } from '@heroicons/react/24/solid';
import AudioPlayer from '../../ui/AudioPlayer';
import VideoPlayer from '../../ui/VideoPlayer';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    description: string;
    location: string;
    genres: string[];
    instruments: string[];
    photos: string[];
    tracks: Array<{
      id: string;
      title: string;
      url: string;
      waveform?: string;
    }>;
    videos: Array<{
      id: string;
      title: string;
      url: string;
      thumbnail?: string;
    }>;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(curr => curr + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(curr => curr - 1);
    }
  };

  const pageIcons = [
    { icon: UserIcon, label: 'Profile' },
    { icon: MusicalNoteIcon, label: 'Music' },
    { icon: VideoCameraIcon, label: 'Videos' },
  ];

  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Fixed height container for content */}
      <div className="h-[600px] flex flex-col">
        {/* Persistent header with name and location */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
            <span className="text-white/90 text-sm">{profile.location}</span>
          </div>
        </div>

        {/* Top navigation tabs - fixed below header */}
        <div className="flex justify-around p-2 bg-gray-50 border-b sticky top-0 z-10">
          {pageIcons.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`relative flex flex-col items-center p-2 rounded-lg transition-colors ${
                currentPage === index ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
              {currentPage === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentPage === 0 && (
                <motion.div 
                  className="p-4"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full h-64 object-cover rounded-lg"
                    layoutId={`photo-${profile.id}`}
                  />
                  <motion.div 
                    className="mt-4 space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-gray-600">{profile.description}</p>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.genres.map((genre, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Instruments</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.instruments.map((instrument, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {instrument}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {currentPage === 1 && (
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Music Tracks</h3>
                  {profile.tracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AudioPlayer
                        url={track.url}
                        title={track.title}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {currentPage === 2 && (
                <div className="p-4 space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Video Extracts</h3>
                  {profile.videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <VideoPlayer
                        url={video.url}
                        title={video.title}
                        thumbnail={video.thumbnail}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <motion.button
          onClick={prevPage}
          disabled={currentPage === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${
            currentPage === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </motion.button>
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                currentPage === i ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={currentPage === i ? { scale: [1, 1.2, 1] } : {}}
            />
          ))}
        </div>
        <motion.button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${
            currentPage === totalPages - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileCard; 