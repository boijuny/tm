import React, { useEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

// Global audio manager to handle multiple players
const audioManager = {
  currentlyPlaying: null as string | null,
  listeners: new Set<(playingId: string | null) => void>(),

  setPlaying(id: string | null) {
    this.currentlyPlaying = id;
    this.notifyListeners();
  },

  subscribe(listener: (playingId: string | null) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentlyPlaying));
  }
};

interface TrackInfo {
  title: string;
  artwork_url: string | null;
  duration: number;
  user: {
    username: string;
    avatar_url: string;
  };
  playback_count: number;
  likes_count: number;
  genre: string;
  description: string;
}

interface AudioPlayerProps {
  url: string;
  title: string;
  onPlay?: () => void;
  onPause?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  url, 
  title,
  onPlay, 
  onPause 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const iframeId = `sc-widget-${Math.random().toString(36).substr(2, 9)}`;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let widget: any;
    let progressInterval: number;

    // Subscribe to audio manager
    const unsubscribe = audioManager.subscribe((playingId) => {
      if (playingId !== iframeId && isPlaying) {
        const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
        if (iframe) {
          // @ts-ignore - SC is loaded from the script
          const widget = SC.Widget(iframe);
          widget.pause();
          setIsPlaying(false);
          onPause?.();
        }
      }
    });

    // Load the SoundCloud Widget API
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
      if (iframe) {
        // @ts-ignore - SC is loaded from the script
        widget = SC.Widget(iframe);
        
        widget.bind(SC.Widget.Events.READY, () => {
          setIsLoading(false);
          // Get track information
          widget.getCurrentSound((sound: TrackInfo) => {
            setTrackInfo(sound);
          });
        });

        widget.bind(SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
          audioManager.setPlaying(iframeId);
          onPlay?.();

          // Start progress tracking
          progressInterval = setInterval(() => {
            widget.getPosition((position: number) => {
              setCurrentPosition(position);
            });
          }, 50); // Update every 50ms for smooth progress
        });

        widget.bind(SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
          if (audioManager.currentlyPlaying === iframeId) {
            audioManager.setPlaying(null);
          }
          onPause?.();
          // Clear progress tracking
          if (progressInterval) {
            clearInterval(progressInterval);
          }
        });

        widget.bind(SC.Widget.Events.FINISH, () => {
          setIsPlaying(false);
          if (audioManager.currentlyPlaying === iframeId) {
            audioManager.setPlaying(null);
          }
          onPause?.();
          // Clear progress tracking
          if (progressInterval) {
            clearInterval(progressInterval);
          }
        });

        widget.bind(SC.Widget.Events.ERROR, () => {
          setError('Error loading track');
          if (progressInterval) {
            clearInterval(progressInterval);
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
      unsubscribe();
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [url]);

  const togglePlayPause = () => {
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe) {
      // @ts-ignore - SC is loaded from the script
      const widget = SC.Widget(iframe);
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackInfo) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const position = percentage * trackInfo.duration;
    
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    if (iframe) {
      // @ts-ignore - SC is loaded from the script
      const widget = SC.Widget(iframe);
      widget.seekTo(position);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
      <div className="flex items-start gap-4">
        {/* Artwork with Play Button */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-purple-500/20">
          {trackInfo?.artwork_url && (
            <img 
              src={trackInfo.artwork_url.replace('-large', '-t500x500')} 
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <motion.button
            onClick={togglePlayPause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            ) : isPlaying ? (
              <PauseIcon className="w-8 h-8 text-white" />
            ) : (
              <PlayIcon className="w-8 h-8 text-white" />
            )}
          </motion.button>
        </div>

        {/* Track Info and Stats */}
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h3 className="text-white font-medium text-base truncate">{title}</h3>
            {trackInfo?.genre && (
              <p className="text-white/40 text-sm">{trackInfo.genre}</p>
            )}
          </div>

          {/* Track Stats */}
          {trackInfo && (
            <div className="flex gap-4 text-xs text-white/40">
              <span>♥ {trackInfo.likes_count.toLocaleString()}</span>
              <span>▶ {trackInfo.playback_count.toLocaleString()}</span>
              <span>{formatTime(currentPosition)} / {formatTime(trackInfo.duration)}</span>
            </div>
          )}

          {/* Progress Bar */}
          {trackInfo && (
            <div 
              className="h-1 bg-white/5 rounded-full overflow-hidden cursor-pointer group/progress"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-purple-500/50 group-hover/progress:bg-purple-500/70 transition-colors"
                style={{ width: `${(currentPosition / trackInfo.duration) * 100}%` }}
              />
            </div>
          )}

          {/* Author Info */}
          {trackInfo?.user && (
            <div className="flex items-center gap-2">
              <img 
                src={trackInfo.user.avatar_url} 
                alt={trackInfo.user.username}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-xs text-white/60 truncate">
                {trackInfo.user.username}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {trackInfo?.description && (
        <div className="mt-4 p-3 rounded-lg bg-white/5">
          <p className="text-sm text-white/60 line-clamp-2">{trackInfo.description}</p>
        </div>
      )}

      {/* Hidden SoundCloud iFrame */}
      <div className="hidden">
        <iframe
          id={iframeId}
          title={title}
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23FF5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
        />
      </div>

      {error && (
        <div className="mt-2 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer; 