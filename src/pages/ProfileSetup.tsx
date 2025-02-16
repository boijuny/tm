import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { motion } from 'framer-motion';

const ProfileSetup: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [userType, setUserType] = useState<'artist' | 'producer' | null>(null);
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(user?.photoURL || '');
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePhotoPreview(previewUrl);
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAudioFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeAudioFile = (index: number) => {
    setAudioFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userType) return;

    setLoading(true);
    setError(null);

    try {
      let photoURL = user.photoURL;

      // Upload profile photo if changed
      if (profilePhoto) {
        const photoRef = ref(storage, `profile-photos/${user.uid}/${profilePhoto.name}`);
        await uploadBytes(photoRef, profilePhoto);
        photoURL = await getDownloadURL(photoRef);
      }

      // Upload audio files
      const mediaUrls = await Promise.all(
        audioFiles.map(async (file) => {
          const audioRef = ref(storage, `audio/${user.uid}/${file.name}`);
          await uploadBytes(audioRef, file);
          const url = await getDownloadURL(audioRef);
          return {
            type: 'audio',
            url,
            title: file.name.replace(/\.[^/.]+$/, '') // Remove file extension
          };
        })
      );

      // Update user profile in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        displayName,
        userType,
        bio,
        photoURL,
        media: mediaUrls,
        updatedAt: new Date().toISOString(),
      });

      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setError('Une erreur est survenue lors de la mise à jour du profil.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Vous devez être connecté pour configurer votre profil.</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Configuration du profil</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          )}

          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden bg-surface border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => profilePhotoInputRef.current?.click()}
            >
              {profilePhotoPreview ? (
                <img 
                  src={profilePhotoPreview} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface text-text-secondary">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              )}
            </div>
            <input
              ref={profilePhotoInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
            <p className="text-sm text-text-secondary">
              Cliquez pour changer la photo de profil
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-lg mb-2">
              Nom d'artiste
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input w-full"
              placeholder="Votre nom d'artiste"
              required
            />
          </div>

          {/* User Type Selection */}
          <div>
            <label className="block text-lg mb-4">Je suis un :</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('artist')}
                className={`p-4 rounded-lg border-2 ${
                  userType === 'artist'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-600'
                }`}
              >
                🎤 Artiste
              </button>
              <button
                type="button"
                onClick={() => setUserType('producer')}
                className={`p-4 rounded-lg border-2 ${
                  userType === 'producer'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-600'
                }`}
              >
                🎹 Beatmaker
              </button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-lg mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input w-full h-32"
              placeholder="Parlez-nous de vous et de votre style musical..."
            />
          </div>

          {/* Audio Files */}
          <div>
            <label className="block text-lg mb-2">
              Extraits audio
            </label>
            <div className="space-y-2">
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-center hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span>Ajouter des fichiers audio</span>
                </div>
              </button>
              {audioFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {audioFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-surface rounded-lg"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAudioFile(index)}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!userType || loading}
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                <span>Enregistrement...</span>
              </div>
            ) : (
              'Enregistrer le profil'
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup; 