import React from 'react';
import { Target, Layers, Sparkles, LifeBuoy, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      title: 'Tailored Solutions for Your Business',
      desc: 'We never force generic templates. Every architecture is custom-engineered to fit your specific operational workflows, user journeys, and revenue goals.',
    },
    {
      title: 'Modern & Scalable Technology',
      desc: 'We use reliable, industry-leading technologies—Flutter, Kotlin, React, and PHP 8+—to deliver blazing speed, clean modularity, and zero technical debt.',
    },
    {
      title: 'Experienced Senior Engineers',
      desc: 'You work directly with senior architects and developers with 10+ years of domain experience, ensuring architectural integrity and fast iterations.',
    },
    {
      title: 'Long-Term Partnership & SLA Support',
      desc: 'We stand behind our code with continuous technical maintenance, OS compatibility patches, server optimization, and proactive feature enhancements.',
    },
  ];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with Key Badges (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-brand-dark-card border border-white/10 p-8 shadow-2xl overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-gradient opacity-20 rounded-full blur-2xl" />

              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>THE APPZIO ADVANTAGE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Why Global Businesses Choose APPZIO.
                </h3>

                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  We bridge the gap between creative visual artistry and rigorous full-stack engineering, giving startups and enterprises the competitive edge in crowded digital markets.
                </p>

                {/* Metrics Highlight Card */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-3xl font-extrabold font-display text-gradient">100%</div>
                    <div className="text-xs text-brand-text-secondary mt-1">Direct IP Ownership</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-3xl font-extrabold font-display text-white">99%</div>
                    <div className="text-xs text-brand-text-secondary mt-1">Client Retention</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow-sm transition-all"
                  >
                    <span>Request A Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-xs font-semibold text-brand-cyan tracking-wider uppercase font-mono">
              ENGINEERING RIGOR
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Why Choose <span className="text-gradient">Us?</span>
            </h2>

            <p className="text-base text-brand-text-secondary leading-relaxed">
              We empower startups, SMEs, and international brands with digital products engineered for real business growth.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((pt, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-brand-dark-card border border-white/5 hover:border-brand-blue/30 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-cyan flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-gradient group-hover:text-white transition-all">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {pt.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
