import React from 'react';
import { 
  Sparkles, CheckCircle2, Layers, ShieldCheck, 
  Smartphone, Cpu, MessageSquare, LifeBuoy, ArrowRight 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';

const easeOut: Easing = 'easeOut';

export const WhyAppzioSection: React.FC = () => {
  const reasons = [
    {
      title: 'Tailored Digital Solutions',
      description: 'We do not rely on generic off-the-shelf templates. Every architecture is engineered around your specific operational workflows and brand positioning.',
      icon: Cpu,
      color: 'text-[#16BDEB]',
      border: 'hover:border-[#16BDEB]/40',
    },
    {
      title: 'Modern Design Standards',
      description: 'International agency aesthetics featuring Swiss typography, deliberate white space, purposeful contrast, and smooth 60fps micro-animations.',
      icon: Sparkles,
      color: 'text-[#2364D8]',
      border: 'hover:border-[#2364D8]/40',
    },
    {
      title: 'Business-Focused Approach',
      description: 'We measure success by commercial utility — driving customer inquiries, catalog conversions, and operational speed for your enterprise.',
      icon: CheckCircle2,
      color: 'text-[#6326C5]',
      border: 'hover:border-[#6326C5]/40',
    },
    {
      title: 'Responsive Development',
      description: 'Flawlessly tested across mobile, tablet, laptop, and ultra-wide displays. Zero horizontal scrolling, zero overlapping elements, and touch-optimized UX.',
      icon: Smartphone,
      color: 'text-[#16BDEB]',
      border: 'hover:border-[#16BDEB]/40',
    },
    {
      title: 'Scalable Architecture',
      description: 'Built with modular components, normalized databases, and clean code that easily accommodates future service lines and traffic growth.',
      icon: Layers,
      color: 'text-[#2364D8]',
      border: 'hover:border-[#2364D8]/40',
    },
    {
      title: 'Transparent Communication',
      description: 'Direct engineer collaboration, clear milestones, realistic delivery schedules, and proactive updates without opaque bureaucratic layers.',
      icon: MessageSquare,
      color: 'text-[#6326C5]',
      border: 'hover:border-[#6326C5]/40',
    },
    {
      title: 'Ongoing Technical Support',
      description: 'Continuous monitoring, database backups, security patches, and SLA-backed maintenance to ensure uninterrupted peace of mind.',
      icon: LifeBuoy,
      color: 'text-[#16BDEB]',
      border: 'hover:border-[#16BDEB]/40',
    },
  ];

  return (
    <section id="why-appzio" className="py-28 relative overflow-hidden bg-[#121419] text-white scroll-mt-16">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
            <span>PARTNERSHIP VALUES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display"
          >
            Why Businesses{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
              }}
            >
              Choose Appzio.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            We combine high engineering standards with practical business thinking. Here is what defines our partnerships with clients in the UAE, Saudi Arabia, India, and worldwide.
          </motion.p>
        </div>

        {/* 7 Highlight Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.slice(0, 6).map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: easeOut }}
                className={`group rounded-3xl bg-[#1F222B]/80 backdrop-blur-xl border border-white/10 ${item.border} p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* 7th Reason: Full-width or Accent Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.48, ease: easeOut }}
            className="group md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-r from-[#1F222B] via-[#242733] to-[#1F222B] border border-white/10 hover:border-[#16BDEB]/40 p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl"
          >
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-7 h-7 text-[#16BDEB]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 font-display">
                  {reasons[6].title}
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {reasons[6].description}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all shrink-0 self-start sm:self-center"
            >
              <span>Speak With Our Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyAppzioSection;
