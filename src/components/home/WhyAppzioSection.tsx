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
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
      border: 'hover:border-[#16BDEB]/40',
    },
    {
      title: 'Modern Design Standards',
      description: 'International agency aesthetics featuring Swiss typography, deliberate white space, purposeful contrast, and smooth 60fps micro-animations.',
      icon: Sparkles,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
      border: 'hover:border-[#2364D8]/40',
    },
    {
      title: 'Business-Focused Approach',
      description: 'We measure success by commercial utility — driving customer inquiries, catalog conversions, and operational speed for your enterprise.',
      icon: CheckCircle2,
      color: 'text-[#252B9B]',
      iconBg: 'bg-indigo-50 border-indigo-200/80',
      border: 'hover:border-[#252B9B]/40',
    },
    {
      title: 'Responsive Development',
      description: 'Flawlessly tested across mobile, tablet, laptop, and ultra-wide displays. Zero horizontal scrolling, zero overlapping elements, and touch-optimized UX.',
      icon: Smartphone,
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
      border: 'hover:border-[#16BDEB]/40',
    },
    {
      title: 'Scalable Architecture',
      description: 'Built with modular components, normalized databases, and clean code that easily accommodates future service lines and traffic growth.',
      icon: Layers,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
      border: 'hover:border-[#2364D8]/40',
    },
    {
      title: 'Transparent Communication',
      description: 'Direct engineer collaboration, clear milestones, realistic delivery schedules, and proactive updates without opaque bureaucratic layers.',
      icon: MessageSquare,
      color: 'text-[#252B9B]',
      iconBg: 'bg-indigo-50 border-indigo-200/80',
      border: 'hover:border-[#252B9B]/40',
    },
    {
      title: 'Ongoing Technical Support',
      description: 'Continuous monitoring, database backups, security patches, and SLA-backed maintenance to ensure uninterrupted peace of mind.',
      icon: LifeBuoy,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
      border: 'hover:border-[#2364D8]/40',
    },
  ];

  return (
    <section id="why-appzio" className="py-28 relative overflow-hidden bg-white text-slate-900 scroll-mt-16">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] rounded-full bg-[#2364D8]/5 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
            <span>PARTNERSHIP VALUES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-display"
          >
            Why Businesses{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
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
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            We don’t just write code; we partner with forward-looking businesses to create digital assets that elevate their reputation and accelerate commercial growth.
          </motion.p>
        </div>

        {/* 7 Distinct Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: easeOut }}
                className={`group rounded-3xl bg-[#F8F9FD] border border-slate-200/90 ${item.border} hover:bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#2364D8] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAppzioSection;
