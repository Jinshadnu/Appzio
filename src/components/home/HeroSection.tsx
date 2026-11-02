import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ArrowDown, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const HeroSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">

      {/* ── Full-Width Background Image with Subtle Film Grain / Scale ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('${getAssetUrl('/hero-team-hd.jpg')}')` }}
      />

      {/* ── Dark Overlay Gradient matching Reference ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-[#0a0a0f]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-transparent to-[#0a0a0f]" />

      {/* ── Subtle Brand Radial Glow ── */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#5221B5]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-[#2365E8]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-24">
        <div className="max-w-3xl">

          {/* Company Kicker (Matching reference layout) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase shadow-lg shadow-black/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>APPZIO DIGITAL ENGINEERING</span>
          </motion.div>

          {/* Main Headline (Recreating Dream Digital Products That Last) */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-display leading-[1.08] tracking-tight text-white mb-6 drop-shadow-md"
          >
            Recreating Dream<br />
            Digital Products&nbsp;
            <span className="bg-gradient-to-r from-[#16B9E8] via-[#7435D5] to-[#2365E8] bg-clip-text text-transparent">
              That Last.
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
            className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-10 max-w-2xl font-normal drop-shadow"
          >
            {settings.hero_subheading ||
              'We design and engineer powerful websites, cross-platform mobile applications, and custom enterprise software in Kerala, India and worldwide. Modern engineering built to move businesses forward.'}
          </motion.p>

          {/* Action Buttons: Primary "Call Now" CTA & Secondary "Our Services" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: easeOut }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <a
              href={`tel:${phoneClean}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-lg shadow-[#5221B5]/35 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest text-white border border-white/25 hover:border-white/50 hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span>Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Recent Projects ↓</span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
            className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-white font-medium">Kerala, India</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7435D5] shrink-0" />
              <span>100% Client Code Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-emerald-400 font-medium">Available for New Projects</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group focus:outline-none cursor-pointer"
          aria-label="Scroll down to About Us"
        >
          <span className="text-[11px] uppercase tracking-widest font-mono group-hover:text-cyan-300 transition-colors">
            Explore More
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
