import React, { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  url: string;
  title: string;
  thumbnail?: string;
  onPlay?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  url, 
  title,
  onPlay 
}) => {
  const [showEmbed, setShowEmbed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      let id: string | null = null;
      
      if (urlObj.hostname.includes('youtube.com')) {
        id = urlObj.searchParams.get('v');
      } else if (urlObj.hostname === 'youtu.be') {
        id = urlObj.pathname.slice(1);
      }

      if (!id) {
        throw new Error('Invalid YouTube URL');
      }

      return id;
    } catch (e) {
      setError('Invalid YouTube URL');
      return null;
    }
  };

  const videoId = getYouTubeId(url);

  const handlePlay = () => {
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }
    setShowEmbed(true);
    onPlay?.();
  };

  // Get high quality YouTube thumbnail
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (!videoId) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-background-900 flex items-center justify-center">
        <p className="text-white/60">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden group">
      {!showEmbed ? (
        <>
          <img
            src={getYouTubeThumbnail(videoId)}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={handlePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full bg-red-500/80 hover:bg-red-600/80 flex items-center justify-center transition-colors"
              >
                <PlayIcon className="w-8 h-8 text-white" />
              </motion.button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium truncate">{title}</h3>
          </div>
        </>
      ) : (
        <iframe
          className="w-full h-full absolute inset-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {error && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-red-500/80">
          <p className="text-white text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 