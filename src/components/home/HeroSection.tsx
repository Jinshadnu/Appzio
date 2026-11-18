import React from 'react';
import { 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, 
  MessageCircle
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { HeroCarousel } from './HeroCarousel';
import { getAssetUrl } from '../../utils/asset';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const HeroSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#070B14] text-white pt-28 sm:pt-32 lg:pt-24 pb-16 lg:py-0 border-b border-slate-800/80"
    >
      {/* ── Realistic Professional Background Image with Transparent Overlay ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Full-Fidelity Realistic HD Background Image (Visible & Natural) */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:bg-[center_25%] bg-no-repeat scale-[1.02] transition-transform duration-1000"
          style={{
            backgroundImage: `url('${getAssetUrl('/assets/hero/hero-banner-team-hd.jpg')}')`,
          }}
        />

        {/* Elegant Transparent Directional Tint: realistic photo remains clearly visible while headline and 3D card pop with crisp contrast */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(7, 11, 20, 0.86) 0%, rgba(10, 17, 34, 0.72) 48%, rgba(7, 11, 20, 0.68) 100%)',
          }}
        />

        {/* Vertical Top/Bottom Transparent Fade for seamless Navbar and Section blending */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 11, 20, 0.5) 0%, transparent 18%, transparent 78%, rgba(7, 11, 20, 0.96) 100%)',
          }}
        />

        {/* Soft Ambient Cyan & Sapphire Atmospheric Lighting */}
        <div className="absolute top-[12%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#16BDEB]/15 blur-[160px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] rounded-full bg-[#2364D8]/20 blur-[170px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT SIDE – HEADLINE, TAGLINE & INTERACTIVE CAPABILITIES */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            
            {/* Live Availability Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-emerald-300">
                Available for New Projects &bull; Worldwide &amp; UAE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-display drop-shadow-md"
            >
              Digital Solutions for{' '}
              <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent inline-block"
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

            {/* Action Buttons: Primary "Explore Our Work" & Secondary "Start a Project" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: easeOut }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9"
            >
              <button
                onClick={() => scrollTo('portfolio')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a Project</span>
              </button>

              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 backdrop-blur-md transition-all duration-300"
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
            <HeroCarousel />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
