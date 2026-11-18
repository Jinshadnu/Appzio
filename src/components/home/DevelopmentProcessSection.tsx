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
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
      border: 'hover:border-[#16BDEB]/50',
    },
    {
      step: '02',
      name: 'Design',
      tagline: 'Craft & Prototype',
      description: 'We create professional user interfaces, intuitive interactions, and cohesive brand design systems tailored for your audience.',
      icon: PenTool,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
      border: 'hover:border-[#2364D8]/50',
    },
    {
      step: '03',
      name: 'Develop',
      tagline: 'Engineer & Integrate',
      description: 'We build reliable, responsive, and scalable digital solutions utilizing clean code, secure APIs, and high-performance databases.',
      icon: Code2,
      color: 'text-[#252B9B]',
      iconBg: 'bg-indigo-50 border-indigo-200/80',
      border: 'hover:border-[#252B9B]/50',
    },
    {
      step: '04',
      name: 'Deliver',
      tagline: 'Deploy & Support',
      description: 'Comprehensive cross-device testing, production deployment, search optimization, and continuous technical maintenance support.',
      icon: Rocket,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
      border: 'hover:border-[#2364D8]/50',
    },
  ];

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-white text-slate-900 scroll-mt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#2364D8]/5 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
            <span>STRUCTURED METHODOLOGY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-display"
          >
            From Concept{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
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
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            A transparent four-stage development lifecycle ensuring your digital product is delivered on time, strictly to specification, and built to scale effortlessly.
          </motion.p>
        </div>

        {/* ── Desktop Horizontal Timeline & Mobile Vertical Timeline ── */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[60px] right-[60px] h-[2px] bg-gradient-to-r from-[#16BDEB]/30 via-[#2364D8]/30 to-[#252B9B]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              return (
                <motion.div
                  key={st.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: easeOut }}
                  className={`group relative rounded-3xl bg-[#F8F9FD] border border-slate-200/90 ${st.border} hover:bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
                >
                  <div>
                    {/* Stage Header: Step number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${st.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${st.color}`} />
                      </div>
                      <span className="text-3xl font-extrabold font-mono text-slate-300 group-hover:text-[#2364D8] transition-colors">
                        {st.step}
                      </span>
                    </div>

                    {/* Stage Titles */}
                    <h3 className="text-xl font-bold text-slate-900 mb-1 font-display">
                      {st.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#2364D8] mb-3">
                      {st.tagline}
                    </div>

                    {/* Stage Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {st.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#2364D8] transition-colors">
                    <span>STAGE {st.step}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
