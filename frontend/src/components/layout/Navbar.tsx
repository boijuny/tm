import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon, 
  ChevronLeftIcon,
  EllipsisHorizontalIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/discover', icon: UserGroupIcon, label: 'Discover' },
    { path: '/profile-setup', icon: UserIcon, label: 'Profile' },
  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) > 50) {
      setIsCollapsed(currentScrollY > 100 && currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  return (
    <motion.nav
      className="fixed left-0 top-0 bottom-0 bg-background-950/80 backdrop-blur-lg border-r border-white/5 z-50 shadow-glass-lg"
      animate={{
        width: isCollapsed ? '72px' : '256px',
      }}
      transition={shouldReduceMotion ? { duration: 0.1 } : spring}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section with Toggle */}
        <motion.div 
          className="relative border-b border-white/5 bg-white/[0.02]"
          animate={{
            padding: isCollapsed ? '16px 12px' : '20px 24px',
          }}
        >
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="block text-2xl font-bold gradient-text whitespace-nowrap"
            >
              {isCollapsed ? 'MM' : 'MusicMatch'}
            </Link>

            {/* Toggle Button - New Position */}
            <motion.button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg glass-panel-sm hover:bg-white/10
                         transition-all duration-300 ml-2"
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={spring}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon className="w-4 h-4 text-white/60" />
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto scrollbar-none">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 group
                ${isActive(path)
                  ? 'glass-panel gradient-border text-white shadow-neon-sm'
                  : 'text-white/60 hover:bg-white/5 hover:text-white hover:shadow-neon-sm'
                }`}
            >
              <Icon className={`w-5 h-5 min-w-[20px] transition-transform duration-300 ${!isCollapsed && 'group-hover:scale-110'}`} />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    className="font-medium ml-3 whitespace-nowrap"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-white/5 bg-white/[0.02]"
          animate={{
            padding: isCollapsed ? '12px' : '16px',
          }}
        >
          {user ? (
            <div className="relative">
              {/* User Profile Card */}
              <motion.div 
                className="glass-panel-sm rounded-xl transition-all duration-300 hover:shadow-neon-sm overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center p-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-purple-500 
                                  flex items-center justify-center shadow-neon-sm">
                      <span className="text-white font-medium text-lg">
                        {user.displayName?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full 
                                  border-2 border-background-900 shadow-neon-sm" />
                  </div>
                  
                  {/* User Info */}
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.div
                        className="flex-1 min-w-0 ml-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <p className="text-sm font-medium text-white truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-white/40 truncate">
                          Online
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Menu Toggle Button */}
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <EllipsisHorizontalIcon className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </motion.div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute ${isCollapsed ? 'left-full ml-2 bottom-0' : 'right-0 bottom-full mb-2'} 
                               w-48 glass-panel-sm rounded-xl overflow-hidden shadow-neon-sm
                               border border-white/10 py-1 z-50`}
                  >
                    <Link
                      to="/profile-setup"
                      className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/10
                               transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Cog6ToothIcon className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-white/10
                               transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-3 py-2 rounded-lg glass-panel-sm hover:shadow-neon-sm
                         transition-all duration-300"
            >
              <UserIcon className="w-5 h-5" />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    className="font-medium ml-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 