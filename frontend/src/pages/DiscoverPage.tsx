import React from 'react';
import ProfileSwiper from '../components/features/profile/ProfileSwiper';

const DiscoverPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Discover Musicians</h1>
          <p className="text-gray-600">Find your next musical collaboration</p>
        </header>
        
        <ProfileSwiper />
      </div>
    </div>
  );
};

export default DiscoverPage; 