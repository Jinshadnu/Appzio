import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, Lock, ExternalLink, Globe2 } from 'lucide-react';
import { getAssetUrl } from '../../utils/asset';

export interface HeroSlide {
  id: string;
  slideNumber: string;
  category: string;
  title: string;
  tagline: string;
  url: string;
  image: string;
  fallbackImage: string;
  accentColor: string;
  badge: string;
  liveUrl?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-tephra',
    slideNumber: '01',
    category: 'CORPORATE WEBSITE DEVELOPMENT',
    title: 'TEPHRA Electro Mechanical Contracting',
    tagline: 'Dubai, UAE • High-Precision MEP Contracting Corporate Portal',
    url: 'tephra.ae',
    image: '/assets/projects/tephra-preview.png',
    fallbackImage: '/assets/projects/tephra-full.png',
    accentColor: '#16BDEB',
    badge: 'Live Corporate Site',
    liveUrl: 'https://tephra.ae',
  },
  {
    id: 'slide-ghafbooks',
    slideNumber: '02',
    category: 'E-COMMERCE & COMMERCE APPS',
    title: 'Ghaf Books & Media Storefront',
    tagline: 'Kerala & Gulf • Literary Bookstore & Integrated Checkout',
    url: 'ghafbooks.com',
    image: '/assets/projects/ghafbooks-preview.png',
    fallbackImage: '/assets/projects/ghafbooks-full.png',
    accentColor: '#2364D8',
    badge: 'Live E-Commerce',
    liveUrl: 'https://ghafbooks.com',
  },
  {
    id: 'slide-mikhaelgold',
    slideNumber: '03',
    category: 'LUXURY RETAIL & MOBILE PORTAL',
    title: 'Mikhael Gold & Diamonds Mobile Portal',
    tagline: 'Kerala, India • Daily Gold Rate Ticker & Luxury Catalog',
    url: 'mikhaelgold.com',
    image: '/assets/projects/mikhaelgold-preview.png',
    fallbackImage: '/assets/projects/mikhaelgold-full.png',
    accentColor: '#EAB308',
    badge: 'Mobile & Web Portal',
    liveUrl: 'https://mikhaelgold.com',
  },
  {
    id: 'slide-apex-erp',
    slideNumber: '04',
    category: 'ENTERPRISE ERP & OPERATIONS',
    title: 'Apex Multi-Warehouse ERP Solutions',
    tagline: 'Enterprise Manufacturing • Real-Time Inventory Telemetry',
    url: 'apex-erp.appzio.internal',
    image: '/assets/projects/apex-cover.png',
    fallbackImage: '/assets/projects/apex-thumb.png',
    accentColor: '#252B9B',
    badge: 'Cloud ERP Software',
  },
  {
    id: 'slide-aetherpay',
    slideNumber: '05',
    category: 'FINTECH BILLING & POS SYSTEMS',
    title: 'AetherPay In-Store Terminal & Billing',
    tagline: 'VAT / GST Invoicing • Multi-Branch POS Synchronization',
    url: 'aetherpay.appzio.com',
    image: '/assets/projects/aetherpay-cover.png',
    fallbackImage: '/assets/projects/aetherpay-thumb.png',
    accentColor: '#16BDEB',
    badge: 'Fintech Billing Engine',
  },
  {
    id: 'slide-primetime',
    slideNumber: '06',
    category: 'GOVERNMENT & PUBLIC SERVICES',
    title: 'Prime Time Typing Services Portal',
    tagline: 'Abu Dhabi, UAE • Immigration, Visa & VIP Desk Workflow',
    url: 'primetimeuae.com',
    image: '/assets/projects/primetime-preview.png',
    fallbackImage: '/assets/projects/primetime-full.png',
    accentColor: '#0EA5E9',
    badge: 'Gov & Corporate Portal',
    liveUrl: 'https://primetimeuae.com',
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 25 });
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
      x: dir > 0 ? '5%' : '-5%',
      opacity: 0,
      scale: 0.97,
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
        className="relative rounded-[2rem] p-2.5 sm:p-3 bg-slate-900/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-shadow duration-500 group"
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

        {/* ── Safari Browser Window Canvas with Real Project Previews ── */}
        <div
          className="relative aspect-[16/10.5] sm:aspect-[16/10] w-full rounded-[1.5rem] overflow-hidden bg-slate-950 shadow-inner flex flex-col"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* macOS Safari Browser Header */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between z-20 shrink-0">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>

            {/* Address Bar Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 shadow-inner">
              <Lock className="w-3 h-3 text-[#16BDEB]" />
              <span className="font-medium text-white">{currentSlide.url}</span>
            </div>

            {/* Category / Counter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider hidden sm:inline">
                {currentSlide.slideNumber} / 06
              </span>
              {currentSlide.liveUrl && (
                <a
                  href={currentSlide.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  aria-label="View live website"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Browser Content Area: Real Realistic Project Screenshots */}
          <div className="relative flex-1 overflow-hidden bg-slate-950">
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
                <div className="relative w-full h-full overflow-hidden">
                  {/* High-Resolution Real Project Screenshot */}
                  <motion.img
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.03 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    src={getAssetUrl(currentSlide.image)}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== getAssetUrl(currentSlide.fallbackImage)) {
                        target.src = getAssetUrl(currentSlide.fallbackImage);
                      }
                    }}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />

                  {/* Subtle Gradient for Bottom Label Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Minimalist Project Label */}
                  <div
                    className="absolute bottom-3 left-3 right-3 pointer-events-none z-10"
                    style={{ transform: 'translateZ(35px)' }}
                  >
                    <div className="px-4 py-2.5 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-xl flex items-center justify-between gap-3 text-white">
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-white font-display truncate">
                          {currentSlide.title}
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono truncate">
                          {currentSlide.tagline}
                        </div>
                      </div>
                      <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-semibold shrink-0">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-white/20 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
              style={{ transform: 'translateZ(50px)' }}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 text-slate-200 hover:text-[#16BDEB] transition-colors" />
            </button>
          </div>
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
