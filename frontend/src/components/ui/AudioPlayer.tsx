import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';

export interface AudioPlayerProps {
  url: string;
  title: string;
  duration: number;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  title,
  duration,
  isPlaying,
  onPlayPause,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4B5563',
        progressColor: '#8B5CF6',
        cursorColor: '#8B5CF6',
        barWidth: 2,
        barHeight: 48,
        cursorWidth: 1,
        height: 48,
        barGap: 3,
      });

      wavesurfer.current.load(url);

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [url]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium truncate">{title}</span>
        <span className="text-gray-400 text-sm">{formatTime(duration)}</span>
      </div>

      <div ref={waveformRef} className="w-full" />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full text-white"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}; 