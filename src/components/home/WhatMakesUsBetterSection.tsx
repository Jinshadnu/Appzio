import React from 'react';
import { ShieldCheck, Rocket, RefreshCw, Cpu, Zap } from 'lucide-react';

export const WhatMakesUsBetterSection: React.FC = () => {
  const cards = [
    {
      icon: Cpu,
      title: 'High-Performance Architecture',
      desc: 'We build with modern frameworks—Flutter, React, and PHP 8+—engineered for blazing speed, enterprise security, and effortless scalability.',
      color: 'from-brand-blue to-brand-cyan',
    },
    {
      icon: Rocket,
      title: 'Result-Oriented Delivery',
      desc: 'We don’t just write code; we craft intuitive user journeys that maximize conversion rates, client retention, and market authority.',
      color: 'from-brand-purple to-brand-violet',
    },
    {
      icon: RefreshCw,
      title: 'Agile Milestone Sprints',
      desc: 'Clear project roadmaps, daily async progress, and staging environments. You review working software at every stage with zero surprises.',
      color: 'from-brand-blue to-brand-purple',
    },
    {
      icon: ShieldCheck,
      title: '100% Direct Code Ownership',
      desc: 'You receive all source code, IP rights, and complete technical documentation with no hidden royalties or recurring vendor lock-in.',
      color: 'from-brand-violet to-brand-purple',
    },
  ];

  return (
    <section className="py-20 bg-[#F4F6FB] relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-bold text-brand-purple tracking-wider uppercase font-mono shadow-sm">
            WHY CLIENTS TRUST APPZIO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            What Makes Us <span className="text-gradient">Better</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Combining the technical precision of seasoned software engineers with the creative polish of a global digital agency.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="group relative rounded-3xl bg-white border border-slate-200/80 p-8 hover:border-brand-purple/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-card hover:shadow-card-hover"
              >
                <div className="space-y-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${c.color} flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-brand-purple transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-mono text-brand-purple uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Zap className="w-3.5 h-3.5 text-brand-blue" />
                  <span>APPZIO Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
