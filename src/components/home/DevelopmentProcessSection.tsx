import React from 'react';
import { Search, PenTool, Code2, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import { motion, Easing } from 'framer-motion';

const easeOut: Easing = 'easeOut';

export const DevelopmentProcessSection: React.FC = () => {
  const stages = [
    {
      step: '01',
      name: 'Discover',
      tagline: 'Understand & Strategize',
      description: 'We analyze your business model, requirements, competitive landscape, and key objectives to establish an unshakeable digital roadmap.',
      icon: Search,
      color: 'text-[#16BDEB]',
      border: 'hover:border-[#16BDEB]/50',
    },
    {
      step: '02',
      name: 'Design',
      tagline: 'Craft & Prototype',
      description: 'We create professional user interfaces, intuitive interactions, and cohesive brand design systems tailored for your audience.',
      icon: PenTool,
      color: 'text-[#2364D8]',
      border: 'hover:border-[#2364D8]/50',
    },
    {
      step: '03',
      name: 'Develop',
      tagline: 'Engineer & Integrate',
      description: 'We build reliable, responsive, and scalable digital solutions utilizing clean code, secure APIs, and high-performance databases.',
      icon: Code2,
      color: 'text-[#6326C5]',
      border: 'hover:border-[#6326C5]/50',
    },
    {
      step: '04',
      name: 'Deliver',
      tagline: 'Deploy & Support',
      description: 'Comprehensive cross-device testing, production deployment, search optimization, and continuous technical maintenance support.',
      icon: Rocket,
      color: 'text-[#16BDEB]',
      border: 'hover:border-[#16BDEB]/50',
    },
  ];

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-[#121419] text-white scroll-mt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#2364D8]/10 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
            <span>STRUCTURED METHODOLOGY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display"
          >
            From Concept{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
              }}
            >
              to Reality.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            A transparent four-stage development lifecycle ensuring your digital product is delivered on time, strictly to specification, and built to scale effortlessly.
          </motion.p>
        </div>

        {/* ── Desktop Horizontal Timeline & Mobile Vertical Timeline ── */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-[#16BDEB]/30 via-[#2364D8]/30 to-[#6326C5]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.12, ease: easeOut }}
                  className={`group rounded-3xl bg-[#1F222B]/85 backdrop-blur-xl border border-white/10 ${stage.border} p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
                >
                  <div>
                    {/* Step Icon & Number Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
                        <Icon className={`w-7 h-7 ${stage.color}`} />
                      </div>
                      <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-white/40 transition-colors">
                        {stage.step}
                      </span>
                    </div>

                    {/* Step Heading */}
                    <h3 className="text-xl font-bold text-white mb-1 font-display">
                      {stage.name}
                    </h3>
                    <div className="text-xs font-semibold text-slate-400 mb-4 font-mono">
                      {stage.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16BDEB]" />
                    <span>Stage {stage.step} of 04</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcessSection;
