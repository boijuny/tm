import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  MusicalNoteIcon, 
  VideoCameraIcon, 
  HeartIcon,
  LinkIcon
} from '@heroicons/react/24/solid';
import AudioPlayer from '../../ui/AudioPlayer';
import VideoPlayer from '../../ui/VideoPlayer';
import { Profile } from '../../../types/profile';

interface ProfileCardProps {
  profile: Profile;
  onSwipe?: (direction: 'left' | 'right') => void;
  onResonance?: () => void;
  isLiked?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe, onResonance, isLiked }) => {
  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            {profile.signature && (
              <p className="text-3xl font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {profile.signature}
              </p>
            )}
            <p className="text-white/60 mt-1">{profile.location} • {profile.age}</p>
          </div>
          <div className="text-right">
            <div className="flex flex-wrap gap-2 justify-end">
              {profile.role.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="text-white/60 mt-2">{profile.genres.join(' • ')}</p>
          </div>
        </div>
        {isLiked && (
          <div className="mt-4 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
              <HeartIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Resonated</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left Column - Media Content */}
        <div className="col-span-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Media</h3>
            
            {/* Videos */}
            <div className="space-y-4">
              {profile.videos.slice(0, 2).map((video) => (
                <VideoPlayer
                  key={video.id}
                  url={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              ))}
            </div>

            {/* Audio Tracks */}
            <div className="space-y-4">
              {profile.tracks.slice(0, 2).map((track) => (
                <AudioPlayer
                  key={track.id}
                  url={track.url}
                  title={track.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - About & Info */}
        <div className="col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About</h3>
            <p className="text-white/80 leading-relaxed text-sm">{profile.description}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white/80">Connect</h3>
            <div className="flex flex-wrap gap-2">
              {profile.platforms?.map((platform) => (
                <a
                  key={platform.url}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  {platform.type === 'spotify' ? (
                    <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  ) : platform.type === 'soundcloud' ? (
                    <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.045-.1-.085-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.057.045.093.104.093.057 0 .091-.036.104-.093l.21-1.308-.21-1.332c-.01-.057-.047-.094-.104-.094m1.83-1.09c-.054-.007-.105.036-.105.093l-.21 2.338.21 2.263c0 .056.051.097.106.097.054 0 .105-.04.105-.097l.242-2.263-.242-2.338c0-.057-.051-.1-.106-.093m.932.002c-.062 0-.097.037-.097.093l-.184 2.336.184 2.264c0 .056.035.097.097.097s.097-.04.097-.097l.207-2.264-.207-2.336c0-.056-.035-.093-.097-.093m1.873-.423c-.064 0-.103.037-.103.093l-.168 2.76.168 2.264c0 .056.039.097.103.097s.103-.04.103-.097l.19-2.264-.19-2.76c0-.056-.039-.093-.103-.093m.964-.057c-.068 0-.11.037-.11.093l-.153 2.82.153 2.264c0 .056.042.097.11.097.07 0 .11-.04.11-.097l.172-2.264-.172-2.82c0-.056-.04-.093-.11-.093m1.899-.424c-.069 0-.11.037-.11.093l-.137 3.244.137 2.264c0 .056.041.097.11.097.07 0 .11-.04.11-.097l.155-2.264-.155-3.244c0-.056-.041-.093-.11-.093m.981.086c-.073 0-.116.037-.116.093l-.121 3.158.121 2.264c0 .056.043.097.116.097.072 0 .116-.04.116-.097l.137-2.264-.137-3.158c0-.056-.044-.093-.116-.093m1.899-.867c-.075 0-.119.037-.119.093l-.103 4.022.103 2.264c0 .056.044.097.119.097s.119-.04.119-.097l.116-2.264-.116-4.022c0-.056-.045-.093-.119-.093m.981.086c-.077 0-.121.037-.121.093l-.088 3.936.088 2.264c0 .056.044.097.121.097s.121-.04.121-.097l.099-2.264-.099-3.936c0-.056-.044-.093-.121-.093m1.864-.779c-.081 0-.128.037-.128.093l-.072 4.715.072 2.264c0 .056.047.097.128.097s.127-.04.127-.097l.082-2.264-.082-4.715c0-.056-.046-.093-.127-.093m1.899.078c-.084 0-.131.037-.131.093L15 13.383l.056 2.264c0 .056.047.097.131.097s.131-.04.131-.097l.063-2.264-.063-4.637c0-.056-.047-.093-.131-.093m.963-.78c-.085 0-.132.037-.132.093l-.054 5.417.054 2.264c0 .056.047.097.132.097.088 0 .133-.04.133-.097l.061-2.264-.061-5.417c0-.056-.045-.093-.133-.093m1.935.01c-.089 0-.136.037-.136.093l-.039 5.407.039 2.264c0 .056.047.097.136.097.088 0 .135-.04.135-.097l.044-2.264-.044-5.407c0-.056-.047-.093-.135-.093m1.932-.937c-.093 0-.14.037-.14.093l-.023 6.344.023 2.264c0 .056.047.097.14.097.092 0 .139-.04.139-.097l.026-2.264-.026-6.344c0-.056-.047-.093-.139-.093m.961.937c-.095 0-.142.037-.142.093l-.007 5.407.007 2.264c0 .056.047.097.142.097s.142-.04.142-.097l.007-2.264-.007-5.407c0-.056-.047-.093-.142-.093m1.969-.515c-.095 0-.145.037-.145.093v5.922l.007 2.264c0 .056.05.097.145.097s.144-.04.144-.097l.008-2.264-.008-5.922c0-.056-.049-.093-.144-.093m.967.516c-.098 0-.147.037-.147.093v5.406l.007 2.264c0 .056.049.097.147.097.097 0 .146-.04.146-.097l.008-2.264-.008-5.406c0-.056-.049-.093-.146-.093m1.928-.917c-.1 0-.15.037-.15.093v6.323l.008 2.264c0 .056.05.097.15.097.099 0 .149-.04.149-.097l.008-2.264-.008-6.323c0-.056-.05-.093-.149-.093m1.968.093c-.103 0-.154.037-.154.093v6.23l.008 2.264c0 .056.051.097.154.097.102 0 .153-.04.153-.097l.009-2.264-.009-6.23c0-.056-.051-.093-.153-.093m1.903.152c-.104 0-.156.037-.156.093v6.078l.009 2.264c0 .056.052.097.156.097.104 0 .156-.04.156-.097l.009-2.264-.009-6.078c0-.056-.052-.093-.156-.093m1.93-.518c-.107 0-.159.037-.159.093v6.596l.009 2.264c0 .056.052.097.159.097.107 0 .16-.04.16-.097l.008-2.264-.008-6.596c0-.056-.053-.093-.16-.093"/>
                    </svg>
                  ) : platform.type === 'youtube' ? (
                    <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ) : (
                    <LinkIcon className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    {platform.username}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {profile.achievements[0] && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/80">Latest Achievement</h3>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-white/80 font-medium text-sm">{profile.achievements[0].title}</p>
                <p className="text-white/60 text-xs mt-1">{profile.achievements[0].date}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard; 