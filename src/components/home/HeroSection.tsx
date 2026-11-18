import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Globe, Shield, Terminal, ArrowDown } from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const HeroSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#17191F] text-white pt-28 pb-20">
      {/* ── Abstract Technological Background & Glow Gradients ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Brand Color Orbs */}
        <div className="absolute -top-[20%] -left-[10%] w-[650px] h-[650px] rounded-full bg-[#16BDEB]/15 blur-[150px]" />
        <div className="absolute top-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#6326C5]/20 blur-[170px]" />
        <div className="absolute -bottom-[20%] left-[30%] w-[550px] h-[550px] rounded-full bg-[#2364D8]/15 blur-[160px]" />

        {/* Subtle Tech Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Elegant Radial Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#17191F]/60 to-[#17191F]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline / Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#16BDEB] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">
                APPZIO &bull; DIGITAL SOLUTIONS &amp; SOFTWARE ENGINEERING
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold tracking-tight leading-[1.08] text-white mb-6 font-display"
            >
              Digital Solutions That{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                }}
              >
                Move Your Business Forward.
              </span>
            </motion.h1>

            {/* Supporting Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl"
            >
              {settings.hero_subheading ||
                'We design and develop modern websites, mobile applications and custom software that transform business ideas into meaningful digital experiences.'}
            </motion.p>

            {/* CTAs: Explore Our Work & Let's Discuss Your Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
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
                <span>Let’s Discuss Your Project</span>
              </button>
            </motion.div>

            {/* Credibility Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">UAE &amp; GCC Focused</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Production-Grade Architecture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6326C5] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">Reliable Support</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract Technology Showcase Card & Interactive Visual */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              {/* Outer Glow Frame */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-[#1F222B]/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
                {/* Decorative top header / window dots */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-[#16BDEB]" />
                    <span>appzio.engine.v2</span>
                  </div>
                </div>

                {/* Core Architecture Capabilities */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-[#16BDEB]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#16BDEB]">
                        Division 01 &bull; Web
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Fast &bull; Modern</span>
                    </div>
                    <h3 className="text-base font-bold text-white">High-Impact Corporate &amp; E-commerce Portals</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Engineered for high search visibility, Swiss-standard layouts and instant load times.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-[#2364D8]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2364D8]">
                        Division 02 &bull; Mobile &amp; Apps
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Flutter &bull; Native</span>
                    </div>
                    <h3 className="text-base font-bold text-white">Cross-Platform Android &amp; iOS Applications</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Single-codebase resilience with fluid 60fps animations and offline sync.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-[#6326C5]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6326C5]">
                        Division 03 &bull; Automation
                      </span>
                      <span className="text-xs text-slate-400 font-mono">ERP &bull; POS &bull; APIs</span>
                    </div>
                    <h3 className="text-base font-bold text-white">Custom Business Automation &amp; Billing Systems</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Operational software that replaces manual bottlenecks with robust workflows.
                    </p>
                  </div>
                </div>

                {/* Floating Metric Card */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-white font-display">100%</div>
                    <div className="text-xs text-slate-400">Tailored Engineering</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-2xl font-extrabold text-[#16BDEB] font-display">UAE &bull; GCC</div>
                    <div className="text-xs text-slate-400">Regional Experience</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <div className="text-2xl font-extrabold text-[#6326C5] font-display">24/7</div>
                    <div className="text-xs text-slate-400">Reliable Support</div>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Corner Glow */}
              <div
                className="absolute -bottom-6 -right-6 -z-10 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ background: 'linear-gradient(120deg, #16BDEB, #6326C5)' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
        <button
          onClick={() => scrollTo('services')}
          className="text-xs tracking-wider uppercase text-slate-400 hover:text-white flex flex-col items-center gap-1.5 focus:outline-none"
          aria-label="Scroll to services"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#16BDEB]" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
