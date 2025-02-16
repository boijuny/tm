import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileSetup: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'artist' | 'producer' | null>(null);
  const [bio, setBio] = useState('');
  const [portfolio, setPortfolio] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPortfolio(prev => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userType) return;

    setLoading(true);
    try {
      const portfolioUrls = await Promise.all(
        portfolio.map(async (file) => {
          const storageRef = ref(storage, `portfolio/${user.uid}/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );

      await updateDoc(doc(db, 'users', user.uid), {
        userType,
        bio,
        portfolio: portfolioUrls,
        updatedAt: new Date().toISOString(),
      });

      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
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
        <h1 className="text-3xl font-bold mb-8">Configuration du profil</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
                Artiste
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
                Beatmaker
              </button>
            </div>
          </div>

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

          <div>
            <label className="block text-lg mb-2">
              Portfolio
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                multiple
                className="hidden"
                id="portfolio-upload"
              />
              <label
                htmlFor="portfolio-upload"
                className="block w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
              >
                Ajouter des fichiers audio
              </label>
              {portfolio.length > 0 && (
                <div className="mt-4 space-y-2">
                  {portfolio.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-surface rounded-lg"
                    >
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setPortfolio(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!userType || loading}
            className="btn-primary w-full"
          >
            {loading ? 'Enregistrement...' : 'Enregistrer le profil'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup; 