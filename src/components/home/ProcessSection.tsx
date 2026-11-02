import React from 'react';
import { Search, Compass, Palette, Code, CheckSquare, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discovery',
      desc: 'Understand business goals, user personas, operational constraints, and technology requirements through in-depth collaborative sessions.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Planning',
      desc: 'Define feature backlogs, system architecture, API schemas, and an agile roadmap with milestones and transparent release gates.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Design',
      desc: 'Create modern UI/UX wireframes, design systems in Figma, and interactive high-fidelity prototypes tested for optimal user flow.',
      icon: Palette,
    },
    {
      step: '04',
      title: 'Development',
      desc: 'Build secure, scalable, and reliable applications using modern frameworks, continuous integration, and clean code principles.',
      icon: Code,
    },
    {
      step: '05',
      title: 'Testing',
      desc: 'Conduct rigorous functional testing, cross-browser validation, mobile device matrices, security audits, and load testing.',
      icon: CheckSquare,
    },
    {
      step: '06',
      title: 'Launch & Support',
      desc: 'Deploy the product to live infrastructure, publish to App Stores, and provide ongoing SLA-backed maintenance and optimization.',
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 bg-[#F4F6FB] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-radial pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple tracking-wider uppercase font-mono">
            STRUCTURED METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-brand-text">
            From Idea to <span className="text-gradient">Reality.</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-text-muted leading-relaxed">
            Our disciplined 6-stage engineering lifecycle guarantees on-time delivery, total budget transparency, and flawless execution from concept to release.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative rounded-3xl bg-white border border-slate-200/80 p-8 hover:border-brand-purple/40 transition-all duration-300 group hover:-translate-y-1 shadow-card hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-brand-purple group-hover:bg-brand-gradient group-hover:text-white group-hover:border-transparent transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-display font-extrabold text-slate-200 group-hover:text-brand-purple/40 transition-colors font-mono">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-brand-text mb-2 group-hover:text-brand-purple transition-colors">
                  {st.title}
                </h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
