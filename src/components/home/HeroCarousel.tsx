import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Layers } from 'lucide-react';
import { getAssetUrl } from '../../utils/asset';

export interface HeroSlide {
  id: string;
  slideNumber: string;
  category: string;
  title: string;
  tagline: string;
  image: string;
  fallbackImage: string;
  accentColor: string;
  badge: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-websites',
    slideNumber: '01',
    category: 'WEBSITES & WEB APPS',
    title: 'High-Performance 3D Web Architectures',
    tagline: 'Next.js 14 • TypeScript • Sub-second Edge CDN',
    image: '/assets/hero/hero-3d-web.jpg',
    fallbackImage: '/assets/hero/hero-slide-web.jpg',
    accentColor: '#16BDEB',
    badge: 'Web Architecture'
  },
  {
    id: 'slide-mobile-app',
    slideNumber: '02',
    category: 'MOBILE APPLICATIONS',
    title: 'Native iOS & Android Applications',
    tagline: 'Flutter & Swift • 60 FPS • Biometric Auth',
    image: '/assets/hero/hero-3d-mobile.jpg',
    fallbackImage: '/assets/hero/hero-slide-mobile.jpg',
    accentColor: '#2364D8',
    badge: 'Mobile Systems'
  },
  {
    id: 'slide-billing-software',
    slideNumber: '03',
    category: 'BILLING & INVOICING',
    title: 'Fintech Billing & POS Solutions',
    tagline: 'VAT / GST Invoicing • Multi-Branch Sync',
    image: '/assets/hero/hero-3d-billing.jpg',
    fallbackImage: '/assets/hero/hero-slide-billing.jpg',
    accentColor: '#16BDEB',
    badge: 'Financial Systems'
  },
  {
    id: 'slide-desktop-application',
    slideNumber: '04',
    category: 'DESKTOP APPLICATIONS',
    title: 'Enterprise Desktop Software',
    tagline: 'Cross-Platform macOS & Windows • High Concurrency',
    image: '/assets/hero/hero-slide-desktop.jpg',
    fallbackImage: '/assets/hero/hero-slide-erp.jpg',
    accentColor: '#252B9B',
    badge: 'Desktop Tools'
  },
  {
    id: 'slide-erp-software',
    slideNumber: '05',
    category: 'ERP & OPERATIONS',
    title: 'Enterprise Resource Planning (ERP)',
    tagline: 'Automated Supply Chain • Live Business Telemetry',
    image: '/assets/hero/hero-slide-erp.jpg',
    fallbackImage: '/assets/projects/primetime-preview.png',
    accentColor: '#2364D8',
    badge: 'Enterprise ERP'
  },
  {
    id: 'slide-ecommerce',
    slideNumber: '06',
    category: 'E-COMMERCE & COMMERCE APPS',
    title: 'Modern E-Commerce Storefronts',
    tagline: 'Interactive 3D Catalogs • Secure Checkout Gateways',
    image: '/assets/hero/hero-slide-ecommerce.jpg',
    fallbackImage: '/assets/projects/ghafbooks-preview.png',
    accentColor: '#16BDEB',
    badge: 'Digital Commerce'
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

  // 3D Tilt & Parallax Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 25 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);

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

  // Sync internal index if parent changes it
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
      x: dir > 0 ? '6%' : '-6%',
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? '6%' : '-6%',
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
      className="relative w-full select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── 3D Floating Motion Frame ── */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-[2rem] p-2.5 sm:p-3 bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-shadow duration-500 group"
      >
        {/* Ambient Backlight Glow */}
        <div
          className="absolute -inset-1 rounded-[2.25rem] opacity-60 blur-2xl pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${currentSlide.accentColor}35, transparent 70%), radial-gradient(circle at 20% 80%, #2364D825, transparent 65%)`,
          }}
        />

        {/* Specular Glare Reflection on Tilt */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] opacity-15 pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.8), transparent 60%)`,
          }}
        />

        {/* ── Inner Viewport Canvas (Clean, Unobstructed Image Presentation) ── */}
        <div
          className="relative aspect-[16/10.5] sm:aspect-[16/10] w-full rounded-[1.5rem] overflow-hidden bg-slate-950 shadow-inner"
          style={{ transform: 'translateZ(20px)' }}
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
              {/* Ultra-HD 3D Render Image with Subtle Ken-Burns Scaling */}
              <div className="relative w-full h-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.04 }}
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

                {/* Subtle Cinematic Vignette (Preserves Image Clarity) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                {/* Top Discrete Category Pill */}
                <div
                  className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentSlide.accentColor }}
                    />
                    <span className="text-[11px] tracking-wider uppercase font-semibold text-slate-200">
                      {currentSlide.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-mono text-slate-300 shadow-lg">
                    <span className="font-bold text-[#16BDEB]">{currentSlide.slideNumber}</span>
                    <span className="text-slate-500">/</span>
                    <span>06</span>
                  </div>
                </div>

                {/* Bottom Minimalist Floating Caption (Leaves Visual 90% Unobstructed) */}
                <div
                  className="absolute bottom-3 left-3 right-3 pointer-events-none z-10"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="px-4 py-2.5 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-between gap-3 text-white">
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-white font-display truncate">
                        {currentSlide.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        {currentSlide.tagline}
                      </div>
                    </div>
                    <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-[10px] font-mono text-sky-300 uppercase tracking-wider font-semibold shrink-0">
                      <span>{currentSlide.badge}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Left / Right Minimal Hover Navigation Arrows ── */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/75 hover:bg-slate-900 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
            style={{ transform: 'translateZ(50px)' }}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 text-slate-200 hover:text-[#16BDEB] transition-colors" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/75 hover:bg-slate-900 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
            style={{ transform: 'translateZ(50px)' }}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 text-slate-200 hover:text-[#16BDEB] transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* ── Bottom Interactive Progress Bar & Slide Thumb Indicators ── */}
      <div className="mt-4 flex items-center justify-between px-2">
        {/* Progress Bars */}
        <div className="flex items-center gap-2">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                  isActive ? 'w-10 bg-white/25' : 'w-4 bg-white/10 hover:bg-white/25'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
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

        {/* Slide Counter & Play/Pause State */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsManualPaused(!isManualPaused)}
            className="p-1 px-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1.5 font-mono"
            aria-label={isManualPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isManualPaused ? (
              <>
                <Play className="w-2.5 h-2.5 text-[#16BDEB]" />
                <span className="text-[10px] text-slate-300 font-semibold">Resume</span>
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
