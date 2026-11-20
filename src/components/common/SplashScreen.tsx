import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPLASH_STORAGE_KEY = 'appzio_splash_viewed';

interface SplashScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (forceShow) return true;
    try {
      return !sessionStorage.getItem(SPLASH_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    // Smooth progress ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 15) + 10);
      });
    }, 110);

    // Auto complete after 1.8 seconds
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
      } catch {
        // Ignore storage errors in private modes
      }
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1850);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isVisible, onComplete]);

  const handleSkip = () => {
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
    } catch {}
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="appzio-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070B14] text-white select-none overflow-hidden"
          role="dialog"
          aria-label="Appzio Intro"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#16BDEB]/20 via-[#2364D8]/20 to-[#6326C5]/20 blur-[110px] animate-pulse" />
            <div className="absolute -top-32 right-1/4 w-80 h-80 rounded-full bg-[#16BDEB]/15 blur-[90px]" />
            <div className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-[#6326C5]/15 blur-[90px]" />
          </div>

          {/* Center Brand Identity Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Animated Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#16BDEB] via-[#2364D8] to-[#6326C5] blur-xl opacity-50 animate-pulse" />

              {/* Vector Logo Container */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-4 bg-slate-900/80 border border-white/15 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="splash-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#16BDEB" />
                      <stop offset="50%" stopColor="#2364D8" />
                      <stop offset="100%" stopColor="#5221B5" />
                    </linearGradient>
                    <linearGradient id="splash-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7435D5" />
                      <stop offset="50%" stopColor="#5221B5" />
                      <stop offset="100%" stopColor="#2364D8" />
                    </linearGradient>
                    <linearGradient id="splash-accent" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2364D8" />
                      <stop offset="100%" stopColor="#16BDEB" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(8, 6)">
                    <path d="M22 6 L38 22 L26 34 L10 18 Z" fill="url(#splash-grad-2)" opacity="0.85" />
                    <path d="M6 38 L22 6 L34 18 L18 50 Z" fill="url(#splash-grad-1)" />
                    <path d="M18 50 L34 18 L46 30 L30 62 Z" fill="url(#splash-grad-2)" />
                    <polygon points="22,22 30,14 38,22 30,30" fill="url(#splash-accent)" />
                    <circle cx="30" cy="22" r="2.8" fill="#FFFFFF" />
                  </g>
                </svg>
              </div>
            </motion.div>

            {/* Brand Title with Letter Spacing */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.35em] text-white font-display uppercase pl-2">
                APPZIO
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-slate-300 font-mono mb-8"
            >
              Digital Solutions & Software Development
            </motion.p>

            {/* Precision Micro Progress Bar */}
            <div className="w-48 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-[#16BDEB] via-[#2364D8] to-[#6326C5]"
              />
            </div>
          </div>

          {/* Skip Button for Convenience */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 text-xs font-mono tracking-widest text-slate-500 hover:text-white transition-colors duration-200 uppercase px-4 py-1.5 rounded-full border border-white/5 hover:border-white/20"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
