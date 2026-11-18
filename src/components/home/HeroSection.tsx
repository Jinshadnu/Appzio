import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Globe2, Compass } from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { HeroCarousel } from './HeroCarousel';

const easeOut: Easing = 'easeOut';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#17191F] text-white pt-28 sm:pt-32 pb-20 lg:py-0"
    >
      {/* ── Abstract Technological Background Glow & Mesh ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Brand Color Gradients */}
        <div className="absolute -top-[20%] -left-[10%] w-[650px] h-[650px] rounded-full bg-[#16BDEB]/15 blur-[160px]" />
        <div className="absolute top-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#6326C5]/20 blur-[170px]" />
        <div className="absolute -bottom-[20%] left-[30%] w-[550px] h-[550px] rounded-full bg-[#2364D8]/15 blur-[160px]" />

        {/* Subtle Tech Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#17191F]/50 to-[#17191F]" />
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
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6 shadow-sm group hover:border-[#16BDEB]/30 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-slate-200">
                Available for New Projects &bull; UAE &amp; Global Delivery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-display"
            >
              Digital Solutions.{' '}
              <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
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
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-9 max-w-xl"
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
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white shadow-xl shadow-[#2364D8]/25 hover:shadow-[#16BDEB]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                }}
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a Project</span>
              </button>
            </motion.div>

            {/* Key Trust Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-6 border-t border-white/10 w-full"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Bespoke Architecture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">UAE &amp; GCC Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6326C5] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">24/7 SLA Engineering</span>
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
