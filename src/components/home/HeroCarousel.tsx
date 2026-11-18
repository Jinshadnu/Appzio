import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Layers } from 'lucide-react';
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
    title: 'High-Performance 3D Web Architectures',
    subtitle: 'Custom web platforms engineered with modern TypeScript, Swiss precision typography, and sub-second loading.',
    image: '/assets/hero/hero-3d-web.jpg',
    fallbackImage: '/assets/hero/hero-slide-web.jpg',
    accentColor: '#16BDEB',
    badge: '3D Web Development'
  },
  {
    id: 'slide-mobile-app',
    slideNumber: '02',
    category: 'MOBILE APP',
    title: 'Native & Flutter Mobile Applications',
    subtitle: 'Fluid cross-platform iOS & Android engineering featuring 60fps animations and offline-first reactive state.',
    image: '/assets/hero/hero-3d-mobile.jpg',
    fallbackImage: '/assets/hero/hero-slide-mobile.jpg',
    accentColor: '#2364D8',
    badge: '3D Mobile Systems'
  },
  {
    id: 'slide-billing-software',
    slideNumber: '03',
    category: 'BILLING SOFTWARE',
    title: 'Fintech Billing & POS Solutions',
    subtitle: 'Point-of-Sale (POS), automated tax invoicing, subscription billing, and real-time revenue analytics dashboards.',
    image: '/assets/hero/hero-3d-billing.jpg',
    fallbackImage: '/assets/hero/hero-slide-billing.jpg',
    accentColor: '#16BDEB',
    badge: 'Financial & POS Software'
  },
  {
    id: 'slide-desktop-application',
    slideNumber: '04',
    category: 'DESKTOP APPLICATION',
    title: 'High-Concurrency Desktop Software',
    subtitle: 'Cross-platform macOS and Windows enterprise tools, offline-first data managers, and multi-panel workflow systems.',
    image: '/assets/hero/hero-slide-desktop.jpg',
    fallbackImage: '/assets/hero/hero-slide-erp.jpg',
    accentColor: '#252B9B',
    badge: 'Enterprise Desktop Tools'
  },
  {
    id: 'slide-erp-software',
    slideNumber: '05',
    category: 'ERP SOFTWARE',
    title: 'Enterprise Resource Planning (ERP)',
    subtitle: 'Unified enterprise workflows, supply chain tracking, multi-branch inventory management, and business intelligence.',
    image: '/assets/hero/hero-slide-erp.jpg',
    fallbackImage: '/assets/projects/primetime-preview.png',
    accentColor: '#2364D8',
    badge: 'Cloud ERP Architecture'
  },
  {
    id: 'slide-ecommerce',
    slideNumber: '06',
    category: 'E-COMMERCE WEBSITE & APP',
    title: 'Interactive 3D E-Commerce Storefronts',
    subtitle: 'Full-featured online stores, bookstore catalogs, integrated mobile apps, and secure checkout gateways.',
    image: '/assets/hero/hero-slide-ecommerce.jpg',
    fallbackImage: '/assets/projects/ghafbooks-preview.png',
    accentColor: '#16BDEB',
    badge: 'Digital Commerce & Apps'
  }
];

interface HeroCarouselProps {
  activeIndex?: number;
  onSlideChange?: (index: number) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ activeIndex, onSlideChange }) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = activeIndex !== undefined ? activeIndex : internalIndex;

  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // 3D Tilt & Parallax Physics with Framer Motion
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), { stiffness: 220, damping: 25 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const AUTOPLAY_INTERVAL = 4500;
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = heroSlides[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    const next = (currentIndex + 1) % heroSlides.length;
    setInternalIndex(next);
    onSlideChange?.(next);
    setProgress(0);
  }, [currentIndex, onSlideChange]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    const next = (currentIndex - 1 + heroSlides.length) % heroSlides.length;
    setInternalIndex(next);
    onSlideChange?.(next);
    setProgress(0);
  }, [currentIndex, onSlideChange]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setInternalIndex(index);
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

  // 3D depth slide transitions with rotational depth
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '8%' : '-8%',
      rotateY: dir > 0 ? 8 : -8,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        rotateY: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? '8%' : '-8%',
      rotateY: dir < 0 ? 8 : -8,
      opacity: 0,
      scale: 1.04,
      transition: {
        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.6 },
      },
    }),
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── 3D Floating Motion Card ── */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-[2.25rem] p-3 sm:p-3.5 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-blue-950/80 backdrop-blur-2xl border border-white/20 shadow-2xl transition-shadow duration-500"
      >
        {/* Ambient 3D Neon Backlight Glow */}
        <div
          className="absolute -inset-1 rounded-[2.5rem] opacity-75 blur-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${currentSlide.accentColor}40, transparent 70%), radial-gradient(circle at 20% 80%, #2364D830, transparent 65%)`,
          }}
        />

        {/* Specular Glare Reflection on Tilt */}
        <motion.div
          className="absolute inset-0 rounded-[2.25rem] opacity-20 pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.8), transparent 60%)`,
          }}
        />

        {/* ── Inner Interactive 3D Canvas ── */}
        <div
          className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/11] xl:aspect-[16/10] w-full rounded-[1.85rem] overflow-hidden bg-slate-950 shadow-inner"
          style={{ transform: 'translateZ(25px)' }}
        >
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
              {/* Ultra-HD 3D Render Image with Cinematic Lighting & Ken-Burns Zoom */}
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.06 }}
                  transition={{ duration: 7, ease: 'linear' }}
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

                {/* Multilayered 3D Depth Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/30" />

                {/* Top 3D Floating Category Pill */}
                <div
                  className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between pointer-events-none z-10"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-xl">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse shadow-sm"
                      style={{ backgroundColor: currentSlide.accentColor, boxShadow: `0 0 8px ${currentSlide.accentColor}` }}
                    />
                    <span className="text-[11px] tracking-wider uppercase text-white font-bold">
                      {currentSlide.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-mono text-slate-300 shadow-xl">
                    <span className="font-bold text-[#16BDEB]">{currentSlide.slideNumber}</span>
                    <span className="text-slate-500">/</span>
                    <span>06</span>
                  </div>
                </div>

                {/* Bottom 3D Glass Information Card */}
                <div
                  className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 pointer-events-none z-10"
                  style={{ transform: 'translateZ(55px)' }}
                >
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl text-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16BDEB] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#16BDEB]" />
                        <span>{currentSlide.badge}</span>
                      </span>
                      {isHovered && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30 font-semibold">
                          Autoplay Paused
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-display leading-snug drop-shadow-sm">
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

          {/* ── Left / Right Manual Navigation Buttons ── */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white border border-white/25 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
            style={{ transform: 'translateZ(65px)' }}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 text-slate-200 group-hover:text-[#16BDEB] transition-colors" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white border border-white/25 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
            style={{ transform: 'translateZ(65px)' }}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-[#16BDEB] transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* ── Bottom Interactive 3D Pagination Bar with Progress Indicators ── */}
      <div className="mt-4 flex items-center justify-between px-2">
        {/* Pagination Pills with Live Gradient Progress Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                  isActive ? 'w-10 sm:w-12 bg-white/25' : 'w-3.5 sm:w-4 bg-white/10 hover:bg-white/25'
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
