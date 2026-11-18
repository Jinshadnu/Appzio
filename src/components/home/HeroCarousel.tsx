import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../../utils/asset';

export interface HeroSlide {
  id: string;
  slideNumber: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
  accentColor: string;
  badge: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-web',
    slideNumber: '01',
    category: 'WEBSITE DEVELOPMENT',
    title: 'High-Performance Modern Web Platforms',
    subtitle: 'Custom architectures engineered for speed, Swiss precision layouts, and high search visibility.',
    image: '/assets/hero/hero-slide-web.png',
    fallbackImage: '/assets/projects/tephra-preview.png',
    accentColor: '#16BDEB',
    badge: 'Enterprise Web Solutions'
  },
  {
    id: 'slide-mobile',
    slideNumber: '02',
    category: 'MOBILE APPLICATION DEVELOPMENT',
    title: 'Cross-Platform iOS & Android Systems',
    subtitle: 'Butter-smooth Flutter and native engineering with 60fps animations and offline capabilities.',
    image: '/assets/hero/hero-slide-mobile.png',
    fallbackImage: '/hero-team-hd.jpg',
    accentColor: '#2364D8',
    badge: 'Mobile Engineering'
  },
  {
    id: 'slide-erp',
    slideNumber: '03',
    category: 'CUSTOM SOFTWARE & ERP',
    title: 'Intelligent Business Dashboards & Automation',
    subtitle: 'Bespoke enterprise dashboards, automated invoicing, real-time analytics and POS solutions.',
    image: '/assets/hero/hero-slide-erp.png',
    fallbackImage: '/assets/projects/primetime-preview.png',
    accentColor: '#6326C5',
    badge: 'Enterprise Software'
  },
  {
    id: 'slide-ecommerce',
    slideNumber: '04',
    category: 'E-COMMERCE DEVELOPMENT',
    title: 'Conversion-Focused Online Storefronts',
    subtitle: 'Full-featured digital commerce, bookstore catalogs, and streamlined payment workflows.',
    image: '/assets/hero/hero-slide-ecommerce.png',
    fallbackImage: '/assets/projects/ghafbooks-preview.png',
    accentColor: '#16BDEB',
    badge: 'Digital Commerce'
  },
  {
    id: 'slide-innovation',
    slideNumber: '05',
    category: 'DIGITAL INNOVATION',
    title: 'Futuristic Cloud & AI-Driven Transformation',
    subtitle: 'Transforming ambitious business ideas into living, scalable digital products that move your business forward.',
    image: '/assets/hero/hero-slide-innovation.png',
    fallbackImage: '/hero-team-hd3.jpg',
    accentColor: '#2364D8',
    badge: 'Digital Transformation'
  }
];

interface HeroCarouselProps {
  onSlideChange?: (index: number) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_INTERVAL = 5000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = heroSlides[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => {
      const next = (prev + 1) % heroSlides.length;
      onSlideChange?.(next);
      return next;
    });
    setProgress(0);
  }, [onSlideChange]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => {
      const next = (prev - 1 + heroSlides.length) % heroSlides.length;
      onSlideChange?.(next);
      return next;
    });
    setProgress(0);
  }, [onSlideChange]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    onSlideChange?.(index);
    setProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay and Progress Bar
  useEffect(() => {
    const shouldPlay = !isHovered && !isManualPaused;

    if (shouldPlay) {
      const intervalMs = 50;
      const step = (intervalMs / AUTOPLAY_INTERVAL) * 100;

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + step;
        });
      }, intervalMs);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isHovered, isManualPaused, handleNext]);

  // Swipe handling
  const handleDragEnd = (_e: any, { offset, velocity }: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold || offset.x < -80) {
      handleNext();
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 80) {
      handlePrev();
    }
  };

  // Variants for smooth cinematic layered transition
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '6%' : '-6%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 30 },
        opacity: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? '6%' : '-6%',
      opacity: 0,
      scale: 1.02,
      transition: {
        opacity: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.65 },
      },
    }),
  };

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Outer Decorative Frame with Subtle Radial Ambient Lighting ── */}
      <div
        className="relative rounded-[2rem] p-2 sm:p-2.5 bg-gradient-to-br from-white/15 via-white/5 to-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-700"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px -10px ${currentSlide.accentColor}33`,
        }}
      >
        {/* ── Inner Interactive Canvas Container ── */}
        <div className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/11] xl:aspect-[16/10] w-full rounded-[1.75rem] overflow-hidden bg-[#17191F]">
          
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              {/* Ultra-HD Visual with Ken Burns Zoom Effect */}
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 7, ease: 'linear' }}
                  src={getAssetUrl(currentSlide.image)}
                  onError={(e) => {
                    // Smooth fallback if custom generation is still syncing
                    const target = e.currentTarget;
                    if (target.src !== getAssetUrl(currentSlide.fallbackImage)) {
                      target.src = getAssetUrl(currentSlide.fallbackImage);
                    }
                  }}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Multilayered Gradient Overlays for High-Contrast Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121419] via-[#121419]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121419]/60 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />

                {/* Top Subtle Tech Grid Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121419]/80 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-white shadow-lg">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentSlide.accentColor }}
                    />
                    <span className="text-[11px] tracking-wider uppercase text-slate-300">
                      {currentSlide.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121419]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300">
                    <span className="font-bold text-white">{currentSlide.slideNumber}</span>
                    <span className="text-white/40">/</span>
                    <span>05</span>
                  </div>
                </div>

                {/* Bottom Content Metadata Overlay */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-none z-10">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#17191F]/90 backdrop-blur-xl border border-white/10 shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider"
                        style={{ color: currentSlide.accentColor }}
                      >
                        {currentSlide.badge}
                      </span>
                      {isHovered && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          Autoplay Paused
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-display leading-snug">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Left / Right Manual Navigation Arrows ── */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#121419]/70 hover:bg-[#121419]/95 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#121419]/70 hover:bg-[#121419]/95 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ── Bottom Interactive Pagination Bar & Progress Indicators ── */}
      <div className="mt-5 flex items-center justify-between px-2">
        {/* Pagination Pills with Live Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                  isActive ? 'w-12 sm:w-14 bg-white/20' : 'w-4 sm:w-5 bg-white/10 hover:bg-white/25'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(120deg, #16BDEB, #2364D8, #6326C5)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Slide Counter & Play/Pause State */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsManualPaused(!isManualPaused)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5 font-mono"
            aria-label={isManualPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isManualPaused ? (
              <>
                <Play className="w-3 h-3 text-[#16BDEB]" />
                <span className="hidden sm:inline text-[11px]">Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-slate-400" />
                <span className="hidden sm:inline text-[11px]">Pause</span>
              </>
            )}
          </button>

          <div className="text-xs font-mono text-slate-400">
            <span className="text-white font-bold">{currentSlide.slideNumber}</span>
            <span className="mx-1 text-white/30">/</span>
            <span>05</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
