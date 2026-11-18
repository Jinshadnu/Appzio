import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, 
  Globe2, Phone, MessageCircle, ExternalLink, Cpu,
  Monitor, Smartphone, CreditCard, Box, ShoppingCart
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { HeroCarousel } from './HeroCarousel';
import { getAssetUrl } from '../../utils/asset';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const HeroSection: React.FC = () => {
  const { settings } = useWebsiteData();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const capabilities = [
    { name: 'Websites', index: 0, icon: Monitor },
    { name: 'Mobile App', index: 1, icon: Smartphone },
    { name: 'Billing Software', index: 2, icon: CreditCard },
    { name: 'Desktop App', index: 3, icon: Cpu },
    { name: 'ERP Software', index: 4, icon: Box },
    { name: 'E-Commerce', index: 5, icon: ShoppingCart },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-32 sm:pt-36 lg:pt-24 pb-16 lg:py-0 border-b border-slate-800/80"
    >
      {/* ── Realistic Ultra-HD Team Collaboration Background with Cinematic Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_top] lg:bg-[right_center] bg-no-repeat scale-100 opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('${getAssetUrl('/assets/hero/hero-banner-team-hd.jpg')}')`,
          }}
        />

        {/* Sophisticated Multi-Layered Directional Overlay for 100% Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950" />

        {/* Ambient 3D Neon Radial Light Spheres */}
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#16BDEB]/15 blur-[170px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[650px] h-[650px] rounded-full bg-[#2364D8]/20 blur-[180px]" />
        <div className="absolute top-[40%] right-[30%] w-[450px] h-[450px] rounded-full bg-[#6326C5]/15 blur-[160px]" />

        {/* Subtle Cyber Grid Matrix lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #16BDEB 1px, transparent 1px), linear-gradient(to bottom, #16BDEB 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT SIDE – HEADLINE, TAGLINE & INTERACTIVE CAPABILITIES */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            
            {/* Tagline / Subtitle matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-sm group hover:border-[#16BDEB]/40 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-emerald-300">
                Let&apos;s build something great together
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-display drop-shadow-md"
            >
              Digital Solutions for{' '}
              <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #38BDF8 40%, #60A5FA 100%)',
                }}
              >
                Businesses Worldwide
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6 max-w-xl drop-shadow-sm"
            >
              We help businesses around the world transform ideas into powerful digital experiences. From modern websites and mobile applications to custom software, e-commerce platforms and business automation, we deliver innovative, scalable and result-driven solutions that drive growth.
            </motion.p>

            {/* Interactive Capability Pills (Synced in Real-Time with 3D Carousel) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              {capabilities.map((cap) => {
                const isActive = activeSlideIndex === cap.index;
                const Icon = cap.icon;

                return (
                  <button
                    key={cap.name}
                    onClick={() => setActiveSlideIndex(cap.index)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-500/20 text-[#16BDEB] border border-[#16BDEB]/60 shadow-md shadow-[#16BDEB]/20 scale-105'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cap.name}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Action Buttons: Primary "About Us", "Explore Our Work" & "WhatsApp Now" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9"
            >
              <button
                onClick={() => scrollTo('about')}
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                <span>About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('portfolio')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Our Work</span>
              </button>

              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 backdrop-blur-md transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Key Trust Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 w-full"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                <span className="text-xs text-slate-300 font-semibold">Websites &amp; Apps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs text-slate-300 font-semibold">ERP &amp; Billing Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-semibold">UAE &amp; Global Delivery</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE – AUTO-SCROLLABLE 3D HD IMAGE SHOWCASE WITH PERSPECTIVE TILT */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="lg:col-span-6 xl:col-span-6 w-full"
          >
            <HeroCarousel
              activeIndex={activeSlideIndex}
              onSlideChange={(idx) => setActiveSlideIndex(idx)}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
