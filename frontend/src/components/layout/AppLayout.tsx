import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Update mobile viewport height
  useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="relative min-h-[var(--app-height)] bg-background-950 overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient blob */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full mix-blend-normal filter blur-3xl opacity-10
                     bg-gradient-to-r from-primary-500/30 via-secondary-500/30 to-purple-500/30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: '25%',
            top: '25%',
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* Secondary gradient blob */}
        <motion.div
          className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full mix-blend-normal filter blur-3xl opacity-10
                     bg-gradient-to-r from-secondary-500/30 via-purple-500/30 to-primary-500/30"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            right: '25%',
          }}
        />

        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />
      </div>

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Subtle vignette overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 bg-gradient-radial from-transparent via-transparent to-background-950/40" />
    </div>
  );
};

export default AppLayout; 