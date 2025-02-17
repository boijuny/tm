import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              isActive('/') ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/discover"
            className={`flex flex-col items-center p-2 ${
              isActive('/discover') ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserGroupIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Discover</span>
          </Link>

          <Link
            to="/profile-setup"
            className={`flex flex-col items-center p-2 ${
              isActive('/profile-setup') ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 