import React from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, Cpu, 
  Users, TrendingUp, ShieldCheck, MapPin, 
  Target, Eye
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const AboutSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '50+', label: 'Digital Projects Delivered', sublabel: 'Websites, Apps & ERP Systems' },
    { value: '99.8%', label: 'Uptime & Reliability', sublabel: 'High-availability infrastructure' },
    { value: '2+', label: 'Global Operational Hubs', sublabel: 'Kerala, India & UAE' },
    { value: '100%', label: 'Direct Engineering Support', sublabel: 'No outsourced middlemen' },
  ];

  const corePillars = [
    {
      title: 'Modern Architecture',
      desc: 'Built with resilient, production-tested stacks: React, Next.js, Flutter, and scalable microservices.',
      icon: Cpu,
      accent: '#2563EB',
    },
    {
      title: 'User-Centric Design',
      desc: 'Obsessive attention to typography, frictionless UX, and intuitive digital interfaces.',
      icon: Users,
      accent: '#20BCE5',
    },
    {
      title: 'Business-Driven Engineering',
      desc: 'We prioritize outcomes that drive inquiries, conversions, and measurable business growth.',
      icon: TrendingUp,
      accent: '#1D4ED8',
    },
    {
      title: 'Long-Term Reliability',
      desc: 'Proactive maintenance, continuous monitoring, and scalable architectures that grow with you.',
      icon: ShieldCheck,
      accent: '#0284C7',
    },
  ];

  return (
    <section
      id="about"
      className="py-28 lg:py-36 relative overflow-hidden bg-[#FAFBFE] text-[#111827] scroll-mt-16 border-b border-[#E2E8F0]"
    >
      {/* ── Background Subtle Ambient Accents ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-48 w-[580px] h-[580px] rounded-full bg-[#20BCE5]/5 blur-[170px]" />
        <div className="absolute bottom-1/4 -right-48 w-[580px] h-[580px] rounded-full bg-[#2563EB]/5 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Section Intro Label & Heading ── */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>ABOUT APPZIO &bull; DIGITAL SOLUTIONS &amp; SOFTWARE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] mb-6 font-display"
          >
            Technology Meets{' '}
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
              }}
            >
              Business Thinking.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-[#52627A] font-normal leading-relaxed"
          >
            {settings.about_description ||
              'Appzio is a digital solutions brand focused on helping businesses establish, improve and scale their digital presence. We combine thoughtful design, modern development practices and business-oriented technology to create websites, applications and software solutions that solve real-world problems.'}
          </motion.p>
        </div>

        {/* ── Main Split-Layout Composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20">
          
          {/* Left Column: Premium Team / Office Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-blue-50 via-white to-slate-100 border border-[#E2E8F0] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden group">
              
              {/* Image Viewport */}
              <div className="relative h-[420px] sm:h-[480px] lg:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={getAssetUrl('/hero-team-hd2.jpg')}
                  alt="Appzio Digital Engineering Team"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Subtle Vignette Gradient Wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Top Corner Floating Pill */}
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#2563EB] uppercase">
                    CROSS-BORDER DELIVERY
                  </span>
                </div>

                {/* Bottom Editorial Card */}
                <div className="absolute bottom-4 left-4 right-4 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 text-[#111827] shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                      APPZIO DIGITAL LABS
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#52627A] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Kerala, India &bull; UAE</span>
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#111827] font-display mb-1">
                    Engineering Digital Excellence for Global Brands
                  </h4>
                  <p className="text-xs text-[#52627A] leading-relaxed">
                    Bridging technical precision with strategic design thinking for forward-looking enterprises in GCC, India, and international markets.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission, Vision, and Core Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Mission & Vision Cards (Pure White Surfaces) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Target className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2 font-display">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-[#52627A] leading-relaxed">
                  To empower ambitious businesses worldwide with high-performance digital platforms, reliable custom software, and intuitive interfaces that accelerate commercial growth.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18, ease: easeOut }}
                className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#20BCE5]/40 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Eye className="w-5 h-5 text-[#20BCE5]" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2 font-display">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-[#52627A] leading-relaxed">
                  To be recognized as a premier cross-border software engineering partner celebrated for craftsmanship, dependable delivery, and enduring business value.
                </p>
              </motion.div>
            </div>

            {/* Core Values / Engineering Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24, ease: easeOut }}
              className="space-y-3"
            >
              {corePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] hover:border-slate-300 transition-all duration-300 flex items-start gap-4 shadow-xs"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border"
                      style={{
                        backgroundColor: `${pillar.accent}10`,
                        borderColor: `${pillar.accent}25`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: pillar.accent }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827] mb-0.5 font-display flex items-center gap-2">
                        <span>{pillar.title}</span>
                      </h4>
                      <p className="text-xs text-[#52627A] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Action Shortcut */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
              className="pt-2 flex items-center gap-4"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  background: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                }}
              >
                <span>Partner With Appzio</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#111827] hover:text-[#2563EB] bg-white hover:bg-slate-50 border border-[#E2E8F0] shadow-xs transition-all duration-300"
              >
                <span>Explore Services</span>
              </button>
            </motion.div>

          </div>
        </div>

        {/* ── Elegant Company Statistics Grid (Pure White Surfaces) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-[#E2E8F0]"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-blue-200 transition-all duration-300"
            >
              <div 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 font-display bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                }}
              >
                {stat.value}
              </div>
              <h4 className="text-sm font-bold text-[#111827] mb-1 font-display">
                {stat.label}
              </h4>
              <p className="text-xs text-[#52627A]">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;