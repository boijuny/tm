import React, { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface VideoPlayerProps {
  url: string;
  title: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, thumbnail }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video object-cover"
          poster={thumbnail}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
        >
          {isPlaying ? (
            <PauseIcon className="w-12 h-12 text-white" />
          ) : (
            <PlayIcon className="w-12 h-12 text-white" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer; 