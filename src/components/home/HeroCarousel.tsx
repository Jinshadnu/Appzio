import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { getAssetUrl } from '../../utils/asset';

export interface HeroSlide {
  id: string;
  slideNumber: string;
  category: string;
  title: string;
  tagline: string;
  image: string;
  accentColor: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-websites',
    slideNumber: '01',
    category: 'WEBSITE DEVELOPMENT',
    title: 'Website Development',
    tagline: 'We Build Websites That Build Your Business',
    image: '/assets/hero/hero-poster-web.jpg',
    accentColor: '#2364D8',
  },
  {
    id: 'slide-mobile-app',
    slideNumber: '02',
    category: 'MOBILE APPLICATIONS',
    title: 'Mobile Applications',
    tagline: 'Smart Apps for Better Experience',
    image: '/assets/hero/hero-poster-mobile.jpg',
    accentColor: '#16BDEB',
  },
  {
    id: 'slide-billing-pos',
    slideNumber: '03',
    category: 'BILLING & POS SOFTWARE',
    title: 'Billing Software & POS Systems',
    tagline: 'Smart Billing &bull; Better Business',
    image: '/assets/hero/hero-poster-billing.jpg',
    accentColor: '#EA580C',
  },
  {
    id: 'slide-erp-software',
    slideNumber: '04',
    category: 'ERP SOFTWARE SOLUTIONS',
    title: 'ERP Software Development',
    tagline: 'Streamlined Operations &bull; Smart Decisions',
    image: '/assets/hero/hero-poster-erp.jpg',
    accentColor: '#2563EB',
  },
  {
    id: 'slide-ecommerce',
    slideNumber: '05',
    category: 'E-COMMERCE STOREFRONTS',
    title: 'E-Commerce Storefronts',
    tagline: 'Smart Online Stores &bull; Higher Sales',
    image: '/assets/hero/hero-poster-ecommerce.jpg',
    accentColor: '#D97706',
  },
  {
    id: 'slide-desktop-apps',
    slideNumber: '06',
    category: 'DESKTOP APPLICATIONS',
    title: 'Desktop Software for PC & Mac',
    tagline: 'High Performance &bull; Offline Architecture',
    image: '/assets/hero/hero-poster-desktop.jpg',
    accentColor: '#0284C7',
  },
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

  // 3D Tilt & Parallax Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 25 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['15%', '85%']);

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

  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== internalIndex) {
      setInternalIndex(activeIndex);
      setProgress(0);
    }
  }, [activeIndex]);

  // Autoplay timer with progress bar
  useEffect(() => {
    if (isHovered || isManualPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTOPLAY_INTERVAL) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isHovered, isManualPaused, handleNext]);

  // Slide Animation Variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '5%' : '-5%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? '5%' : '-5%',
      opacity: 0,
      scale: 1.02,
      transition: {
        opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      },
    }),
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[430px] lg:max-w-[450px] mx-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── 3D Floating Motion Poster Container (Clean Edge-to-Edge Frame) ── */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-[1.75rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/20 via-white/10 to-slate-900/60 backdrop-blur-2xl border border-white/25 shadow-[0_25px_65px_-12px_rgba(0,0,0,0.7)] transition-shadow duration-500 group"
      >
        {/* Dynamic Backlight Glow matching slide's accent */}
        <div
          className="absolute -inset-1 rounded-[2rem] opacity-65 blur-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${currentSlide.accentColor}35, transparent 70%), radial-gradient(circle at 20% 80%, #2364D825, transparent 65%)`,
          }}
        />

        {/* Specular Glare Reflection on Tilt */}
        <motion.div
          className="absolute inset-0 rounded-[1.75rem] opacity-15 pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.8), transparent 60%)`,
          }}
        />

        {/* ── Inner Poster Viewport (Aspect Ratio 3:4 for 100% Full-Bleed Poster Fitting) ── */}
        <div
          className="relative aspect-[3/4] w-full rounded-[1.35rem] overflow-hidden bg-white shadow-inner"
          style={{ transform: 'translateZ(15px)' }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="relative w-full h-full overflow-hidden bg-white">
                {/* 3D Commercial Product Poster Image (100% Flush, No Cropping, No Black Bars) */}
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.02 }}
                  transition={{ duration: 6, ease: 'linear' }}
                  src={getAssetUrl(currentSlide.image)}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Hover Navigation Arrows (Discrete, Semi-Transparent, Clean) ── */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-90"
            style={{ transform: 'translateZ(30px)' }}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-90"
            style={{ transform: 'translateZ(30px)' }}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>

      {/* ── Bottom Interactive Controls & Clean Progress Bar (Outside Image) ── */}
      <div className="mt-3.5 flex items-center justify-between px-2">
        {/* Progress Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                  isActive ? 'w-9 sm:w-10 bg-white/35' : 'w-3.5 sm:w-4 bg-white/10 hover:bg-white/25'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(120deg, #16BDEB, #2364D8)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Counter & Play/Pause State */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsManualPaused(!isManualPaused)}
            className="p-1 px-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5 font-mono"
            aria-label={isManualPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isManualPaused ? (
              <>
                <Play className="w-2.5 h-2.5 text-[#16BDEB]" />
                <span className="text-[10px] font-semibold text-white">Resume</span>
              </>
            ) : (
              <>
                <Pause className="w-2.5 h-2.5 text-slate-400" />
                <span className="text-[10px]">Autoplay</span>
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
