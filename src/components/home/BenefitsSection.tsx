import React from 'react';
import { Award, Users, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, Easing } from 'framer-motion';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      number: '01',
      title: 'Vast Experience',
      icon: Award,
      description: 'Years of dedicated software engineering delivering production-grade web systems, native applications, and enterprise databases across diverse international industries.',
      gradient: 'from-[#2365E8] to-[#5221B5]',
    },
    {
      number: '02',
      title: 'Professional Team',
      icon: Users,
      description: 'Senior full-stack developers, UI/UX architects, and DevOps specialists collaborating under rigorous agile sprint methodologies and daily transparent reporting.',
      gradient: 'from-[#5221B5] to-[#7435D5]',
    },
    {
      number: '03',
      title: 'High Finish',
      icon: Sparkles,
      description: 'Obsessive attention to detail — from sub-second page performance and smooth 60fps micro-interactions to pristine design systems and zero-debt architecture.',
      gradient: 'from-[#7435D5] to-[#16B9E8]',
    },
    {
      number: '04',
      title: 'Sustainable & Accountable',
      icon: ShieldCheck,
      description: '100% intellectual property ownership, strict NDA adherence, comprehensive OpenAPI documentation, and guaranteed post-launch SLA technical maintenance.',
      gradient: 'from-[#16B9E8] to-[#2365E8]',
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-[#F8F9FD] relative overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#5221B5]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header (Matching Reference H2: Our Benefits) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-mono font-bold text-[#5221B5] tracking-widest uppercase shadow-xs">
              WHY PARTNER WITH US
            </span>
          </motion.div>

          <motion.h2 
            {...fadeUp(0.08)} 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#191923]"
          >
            Our&nbsp;
            <span className="bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] bg-clip-text text-transparent">
              Benefits.
            </span>
          </motion.h2>

          <motion.p 
            {...fadeUp(0.14)} 
            className="text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Four core institutional pillars that set our development studio apart and guarantee high-return digital execution.
          </motion.p>
        </div>

        {/* 4-Benefit Grid (Matching Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: easeOut }}
                className="group relative rounded-3xl bg-white border border-slate-200/80 p-8 hover:border-[#5221B5]/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#5221B5]/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${b.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="space-y-6">
                  {/* Top Bar: Icon & Monospace Number */}
                  <div className="flex items-center justify-between">
                    <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${b.gradient} flex items-center justify-center text-white shadow-md shadow-[#5221B5]/20 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-300 group-hover:text-[#5221B5] transition-colors">
                      {b.number}
                    </span>
                  </div>

                  {/* Benefit Title (Vast Experience / Professional Team / High Finish / Sustainable & Accountable) */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-[#191923] group-hover:text-[#5221B5] transition-colors leading-snug">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="uppercase font-semibold tracking-wider">APPZIO STANDARD</span>
                  <span className="text-emerald-500 font-bold">VERIFIED ✓</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

