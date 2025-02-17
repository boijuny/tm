import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface AudioPlayerProps {
  url: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, title }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load the SoundCloud Widget API
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const togglePlayPause = () => {
    if (iframeRef.current) {
      const widget = SC.Widget(iframeRef.current);
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 text-indigo-600" />
          ) : (
            <PlayIcon className="w-6 h-6 text-indigo-600" />
          )}
        </button>
      </div>
      <iframe
        ref={iframeRef}
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
      ></iframe>
    </div>
  );
};

export default AudioPlayer; 