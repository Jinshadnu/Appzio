import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Smartphone, Cpu, ArrowRight, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Zap 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { serviceDivisions } from '../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const Services: React.FC = () => {
  useEffect(() => {
    document.title = 'Services & Solutions — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  const getDivisionIcon = (name: string) => {
    switch (name) {
      case 'Globe': return Globe;
      case 'Smartphone': return Smartphone;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  return (
    <div className="bg-[#17191F] text-white min-h-screen pt-32 pb-24">
      {/* ── Page Hero Header ── */}
      <section className="relative overflow-hidden mb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
              <span>CORE SERVICE DIVISIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Everything Your Business{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                }}
              >
                Needs to Go Digital.
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              From corporate portals and high-converting e-commerce to cross-platform mobile apps and custom enterprise automation, explore our three specialized service divisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3 Main Service Divisions Breakdown ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 space-y-12">
        {serviceDivisions.map((division) => {
          const Icon = getDivisionIcon(division.icon_name);

          return (
            <div
              key={division.id}
              className="rounded-3xl bg-[#1F222B]/90 border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Division Info (6 cols) */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#16BDEB]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-slate-400 block uppercase">
                        DIVISION {division.division_number}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#16BDEB]/15 text-[#16BDEB] border border-[#16BDEB]/30 inline-block mt-0.5">
                        {division.badge}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-extrabold text-white font-display">
                    {division.title}
                  </h2>
                  <div className="text-base font-semibold text-slate-300">
                    {division.tagline}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {division.description}
                  </p>

                  <div className="pt-4">
                    <Link
                      to="/#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg"
                      style={{
                        background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                      }}
                    >
                      <span>Inquire for {division.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Sub-services Grid (6 cols) */}
                <div className="lg:col-span-6">
                  <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Available Solutions in Division {division.division_number}:
                    </div>
                    <div className="space-y-3">
                      {division.services.map((item) => (
                        <div
                          key={item}
                          className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3 text-sm text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Services;
