import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Globe2, Compass } from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { HeroCarousel } from './HeroCarousel';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-white text-slate-900 pt-28 sm:pt-32 pb-20 lg:py-0 border-b border-slate-100"
    >
      {/* ── Realistic Ultra-HD Architectural Background Layered with White & Logo Blue Wash ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Realistic Architectural Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-[0.14] mix-blend-multiply"
          style={{
            backgroundImage: `url('${getAssetUrl('/assets/hero/hero-bg-realistic-hd.jpg')}')`,
          }}
        />

        {/* Ambient Logo Blue & Cyan Gradients */}
        <div className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-[#16BDEB]/10 blur-[150px]" />
        <div className="absolute top-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#2364D8]/10 blur-[160px]" />
        <div className="absolute -bottom-[20%] left-[30%] w-[550px] h-[550px] rounded-full bg-[#252B9B]/6 blur-[150px]" />

        {/* White Vignette Gradient for High Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white" />

        {/* Subtle Tech Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2364D8 1px, transparent 1px), linear-gradient(to bottom, #2364D8 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-16">
        {/* ── Split-Screen Layout (Left: Content, Right: Image Carousel) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT SIDE – CONTENT */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            
            {/* Small Professional Availability Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 backdrop-blur-md mb-6 shadow-xs group hover:border-[#2364D8]/40 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16BDEB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2364D8]" />
              </span>
              <span className="text-xs font-bold tracking-wider text-[#2364D8]">
                Available for New Projects &bull; UAE &amp; Global Delivery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold tracking-tight leading-[1.08] text-slate-900 mb-6 font-display"
            >
              Digital Solutions.{' '}
              <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                Limitless Possibilities.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-9 max-w-xl"
            >
              We transform ideas into powerful digital experiences through modern websites, mobile applications and intelligent business software.
            </motion.p>

            {/* Action Buttons: Primary "Explore Our Work" & Secondary "Start a Project" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button
                onClick={() => scrollTo('portfolio')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/90 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a Project</span>
              </button>
            </motion.div>

            {/* Key Trust Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-6 border-t border-slate-200/80 w-full"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">Bespoke Architecture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">UAE &amp; GCC Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#252B9B] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">24/7 SLA Engineering</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE – PREMIUM HD IMAGE CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, x: 25, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: easeOut }}
            className="lg:col-span-6 xl:col-span-6 w-full"
          >
            <HeroCarousel />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
