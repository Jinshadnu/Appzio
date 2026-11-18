import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
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
    id: 'slide-websites',
    slideNumber: '01',
    category: 'WEBSITES',
    title: 'High-Performance Modern Websites',
    subtitle: 'Custom architectures engineered for speed, Swiss precision typography, and top search visibility.',
    image: '/assets/hero/hero-slide-web.jpg',
    fallbackImage: '/assets/projects/tephra-preview.png',
    accentColor: '#16BDEB',
    badge: 'Corporate & Web Platforms'
  },
  {
    id: 'slide-mobile-app',
    slideNumber: '02',
    category: 'MOBILE APP',
    title: 'iOS & Android Mobile Applications',
    subtitle: 'Cross-platform Flutter and native engineering with 60fps animations and offline capabilities.',
    image: '/assets/hero/hero-slide-mobile.jpg',
    fallbackImage: '/hero-team-hd.jpg',
    accentColor: '#2364D8',
    badge: 'Mobile Applications'
  },
  {
    id: 'slide-billing-software',
    slideNumber: '03',
    category: 'BILLING SOFTWARE',
    title: 'Intelligent Billing & Invoicing Systems',
    subtitle: 'Point-of-Sale (POS), automated tax invoicing, subscription billing, and real-time revenue analytics.',
    image: '/assets/hero/hero-slide-billing.jpg',
    fallbackImage: '/assets/projects/primetime-preview.png',
    accentColor: '#16BDEB',
    badge: 'Financial & POS Systems'
  },
  {
    id: 'slide-desktop-application',
    slideNumber: '04',
    category: 'DESKTOP APPLICATION',
    title: 'High-Performance Desktop Software',
    subtitle: 'Cross-platform macOS and Windows software, offline-first data managers, and multi-panel tools.',
    image: '/assets/hero/hero-slide-desktop.jpg',
    fallbackImage: '/assets/hero/hero-slide-erp.jpg',
    accentColor: '#252B9B',
    badge: 'Desktop Applications'
  },
  {
    id: 'slide-erp-software',
    slideNumber: '05',
    category: 'ERP SOFTWARE',
    title: 'Enterprise Resource Planning (ERP)',
    subtitle: 'Unified enterprise workflows, supply chain tracking, inventory management, and business intelligence.',
    image: '/assets/hero/hero-slide-erp.jpg',
    fallbackImage: '/assets/projects/primetime-preview.png',
    accentColor: '#2364D8',
    badge: 'Enterprise ERP Solutions'
  },
  {
    id: 'slide-ecommerce',
    slideNumber: '06',
    category: 'E-COMMERCE WEBSITE & APP',
    title: 'E-Commerce Storefronts & Shopping Apps',
    subtitle: 'Full-featured online stores, book catalogs, integrated mobile apps, and secure checkout gateways.',
    image: '/assets/hero/hero-slide-ecommerce.jpg',
    fallbackImage: '/assets/projects/ghafbooks-preview.png',
    accentColor: '#16BDEB',
    badge: 'Digital Commerce & Apps'
  }
];

interface HeroCarouselProps {
  onSlideChange?: (index: number) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_INTERVAL = 4500;
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
      {/* ── Outer Frosted Glass Frame with Ambient Brand Glow ── */}
      <div
        className="relative rounded-[2rem] p-2.5 sm:p-3 bg-slate-900/80 backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-700"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 35px -5px rgba(22, 189, 235, 0.25)',
        }}
      >
        {/* ── Inner Interactive Canvas Container ── */}
        <div className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/11] xl:aspect-[16/10] w-full rounded-[1.65rem] overflow-hidden bg-slate-950">
          
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
              {/* Ultra-HD Visual with Subtle Zoom */}
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 6, ease: 'linear' }}
                  src={getAssetUrl(currentSlide.image)}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== getAssetUrl(currentSlide.fallbackImage)) {
                      target.src = getAssetUrl(currentSlide.fallbackImage);
                    }
                  }}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Multilayered Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/30" />

                {/* Top Subtle Tech Category Pill */}
                <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-md">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentSlide.accentColor }}
                    />
                    <span className="text-[11px] tracking-wider uppercase text-white font-bold">
                      {currentSlide.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono text-slate-300 shadow-md">
                    <span className="font-bold text-[#16BDEB]">{currentSlide.slideNumber}</span>
                    <span className="text-slate-500">/</span>
                    <span>06</span>
                  </div>
                </div>

                {/* Bottom Content Metadata Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 pointer-events-none z-10">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/15 shadow-xl text-white">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider text-[#16BDEB]"
                      >
                        {currentSlide.badge}
                      </span>
                      {isHovered && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30 font-semibold">
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
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 text-slate-200 group-hover:text-[#16BDEB] transition-colors" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#16BDEB] transition-colors" />
          </button>
        </div>
      </div>

      {/* ── Bottom Interactive Pagination Bar & Progress Indicators ── */}
      <div className="mt-4 flex items-center justify-between px-2">
        {/* Pagination Pills with Live Progress Bar (6 slides) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                  isActive ? 'w-10 sm:w-12 bg-white/20' : 'w-3.5 sm:w-4 bg-white/10 hover:bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(120deg, #16BDEB, #2364D8, #60A5FA)',
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
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-slate-300 transition-colors text-xs flex items-center gap-1.5 font-mono"
            aria-label={isManualPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isManualPaused ? (
              <>
                <Play className="w-3 h-3 text-[#16BDEB]" />
                <span className="hidden sm:inline text-[11px] font-bold text-white">Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-slate-400" />
                <span className="hidden sm:inline text-[11px]">Pause</span>
              </>
            )}
          </button>

          <div className="text-xs font-mono text-slate-400">
            <span className="text-[#16BDEB] font-bold">{currentSlide.slideNumber}</span>
            <span className="mx-1 text-slate-600">/</span>
            <span>06</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
