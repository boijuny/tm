import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/Button';
import { AppLayout } from '../../layout/AppLayout';
import { UserType } from '../../../types';

export const ProfileSetup: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [userType, setUserType] = useState<UserType>();
  const [bio, setBio] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Implement actual profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Profile updated:', {
        displayName,
        userType,
        bio,
        genres,
        audioFile
      });
      
      navigate('/discover');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value.trim();
    if (genre && !genres.includes(genre)) {
      setGenres([...genres, genre]);
      e.target.value = '';
    }
  };

  const removeGenre = (genreToRemove: string) => {
    setGenres(genres.filter(genre => genre !== genreToRemove));
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="glass-card">
          <h1 className="text-3xl font-bold mb-8 gradient-text text-center">
            Complete Your Profile
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-white/80 mb-2">
                Artist Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input w-full bg-white/5 text-white"
                required
              />
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('artist')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    userType === 'artist'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="block text-lg font-medium text-white mb-1">Artist</span>
                  <span className="text-sm text-white/60">I make vocals, melodies, or lyrics</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('beatmaker')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    userType === 'beatmaker'
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="block text-lg font-medium text-white mb-1">Beatmaker</span>
                  <span className="text-sm text-white/60">I produce beats and instrumentals</span>
                </button>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input w-full bg-white/5 text-white h-32"
                placeholder="Tell us about yourself and your music..."
              />
            </div>

            {/* Genres */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Genres</label>
              <input
                type="text"
                placeholder="Type a genre and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleGenreChange(e as any);
                  }
                }}
                className="input w-full bg-white/5 text-white mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full bg-white/10 text-white flex items-center space-x-1"
                  >
                    <span>{genre}</span>
                    <button
                      type="button"
                      onClick={() => removeGenre(genre)}
                      className="ml-2 text-white/60 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Audio Upload */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Upload a Sample Track
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-lg hover:border-white/20 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white/40"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-white/60">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white/40">MP3, WAV up to 10MB</p>
                </div>
              </div>
              {audioFile && (
                <p className="mt-2 text-sm text-white/60">
                  Selected file: {audioFile.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              disabled={!userType || loading}
              className="w-full"
            >
              Complete Profile
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}; 