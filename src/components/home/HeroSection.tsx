import React from 'react';
import { 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, 
  Globe2, Phone, MessageCircle, ExternalLink 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
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
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-32 sm:pt-36 lg:pt-20 pb-16 lg:py-0 border-b border-slate-800/80"
    >
      {/* ── Full-Width Realistic Ultra-HD Team Collaboration Background Image ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background Image: Realistic Professional Digital Agency Team */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_top] lg:bg-[right_center] bg-no-repeat scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${getAssetUrl('/assets/hero/hero-banner-team-hd.jpg')}')`,
          }}
        />

        {/* Sophisticated Multi-Layered Directional Overlay for 100% Typography Contrast */}
        {/* Left-to-right gradient: dark on left for text, transparent on right to reveal the team */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 sm:via-slate-950/70 to-slate-950/25 lg:to-transparent" />
        
        {/* Top & bottom subtle vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90" />

        {/* Brand Blue Ambient Glow */}
        <div className="absolute -top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#16BDEB]/15 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[25%] w-[450px] h-[450px] rounded-full bg-[#2364D8]/15 blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT SIDE – HEADLINE, TAGLINE & CALL TO ACTIONS */}
          <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline / Subtitle matching reference */}
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
                Let&apos;s build something great together
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-display drop-shadow-md"
            >
              Website Development in{' '}
              <br className="hidden sm:inline" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #38BDF8 40%, #60A5FA 100%)',
                }}
              >
                UAE &amp; India
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
              className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl drop-shadow-sm"
            >
              We are into website development and digital solutions in UAE and India. We create modern websites, powerful digital strategies, and result-driven software solutions to help businesses grow online.
            </motion.p>

            {/* Action Buttons: Primary "About Us" / "Explore Our Work" & "Contact Us" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button
                onClick={() => scrollTo('about')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                <span>About Us</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('portfolio')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Our Work</span>
              </button>

              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 backdrop-blur-md transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Now</span>
              </a>
            </motion.div>

            {/* Key Trust Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-6 border-t border-white/15 w-full max-w-2xl"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-200 font-semibold">Corporate Websites</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-200 font-semibold">E-Commerce &amp; Apps</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-200 font-semibold">UAE &amp; India Delivery</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE – FLOATING GLASS BADGE / TEAM SHOWCASE */}
          <div className="lg:col-span-4 xl:col-span-5 flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
              className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-2xl max-w-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[#16BDEB]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#16BDEB] uppercase tracking-wider">
                    APPZIO DIGITAL LABS
                  </div>
                  <div className="text-xs text-slate-300">
                    Kerala, India &bull; Active UAE Delivery
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Professional software engineering team building modern web architectures, mobile apps, and business software for forward-thinking enterprises.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400 font-semibold">● 100% In-House Team</span>
                <span>Direct Engineer Access</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
