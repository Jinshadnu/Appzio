import React, { useState } from 'react';
import { 
  Globe, Smartphone, Cpu, ArrowRight, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Database, Zap, X, MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { serviceDivisions, ServiceDivision } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const ServicesSection: React.FC = () => {
  const [activeModalDivision, setActiveModalDivision] = useState<ServiceDivision | null>(null);

  const getDivisionIcon = (name: string) => {
    switch (name) {
      case 'Globe': return Globe;
      case 'Smartphone': return Smartphone;
      case 'Cpu': return Cpu;
      default: return Layers;
    }
  };

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'digital-presence':
        return {
          badgeBg: 'bg-[#16BDEB]/10 text-[#16BDEB] border-[#16BDEB]/30',
          gradientText: 'from-[#16BDEB] to-[#2364D8]',
          glow: 'group-hover:border-[#16BDEB]/50 group-hover:shadow-[#16BDEB]/10',
          indicator: 'bg-[#16BDEB]',
          iconColor: 'text-[#16BDEB]',
        };
      case 'digital-products':
        return {
          badgeBg: 'bg-[#2364D8]/10 text-[#2364D8] border-[#2364D8]/30',
          gradientText: 'from-[#2364D8] to-[#6326C5]',
          glow: 'group-hover:border-[#2364D8]/50 group-hover:shadow-[#2364D8]/10',
          indicator: 'bg-[#2364D8]',
          iconColor: 'text-[#2364D8]',
        };
      case 'business-automation':
        return {
          badgeBg: 'bg-[#6326C5]/10 text-[#6326C5] border-[#6326C5]/30',
          gradientText: 'from-[#6326C5] to-[#16BDEB]',
          glow: 'group-hover:border-[#6326C5]/50 group-hover:shadow-[#6326C5]/10',
          indicator: 'bg-[#6326C5]',
          iconColor: 'text-[#6326C5]',
        };
      default:
        return {
          badgeBg: 'bg-white/10 text-white border-white/20',
          gradientText: 'from-white to-slate-400',
          glow: 'group-hover:border-white/30',
          indicator: 'bg-white',
          iconColor: 'text-white',
        };
    }
  };

  const scrollToContact = (serviceName?: string) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (serviceName) {
        setTimeout(() => {
          const select = document.querySelector('select[name="service_required"]') as HTMLSelectElement;
          if (select) {
            select.value = serviceName;
          }
        }, 400);
      }
    }
    setActiveModalDivision(null);
  };

  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[#17191F] text-white scroll-mt-16">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#16BDEB]/10 blur-[140px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#6326C5]/15 blur-[160px]" />
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
            <span>CORE SERVICE DIVISIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-display"
          >
            Everything Your Business{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
              }}
            >
              Needs to Go Digital.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            We organize our capabilities into three disciplined divisions. Each division combines strategic architecture, modern engineering, and ongoing support tailored to your business scale.
          </motion.p>
        </div>

        {/* 3 Main Service Divisions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceDivisions.map((division, idx) => {
            const Icon = getDivisionIcon(division.icon_name);
            const styling = getAccentColor(division.id);

            return (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: easeOut }}
                className={`group relative rounded-3xl bg-[#1F222B]/85 backdrop-blur-xl border border-white/10 ${styling.glow} p-8 sm:p-9 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5`}
              >
                <div>
                  {/* Division Header Row */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <Icon className={`w-6 h-6 ${styling.iconColor}`} />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold tracking-widest text-slate-400 block uppercase">
                          DIVISION {division.division_number}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styling.badgeBg} inline-block mt-0.5`}>
                          {division.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">
                    {division.title}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300 mb-4">
                    {division.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-8">
                    {division.description}
                  </p>

                  {/* Service Capabilities List */}
                  <div className="mb-8">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
                      INCLUDED SERVICES
                    </div>
                    <ul className="space-y-2.5">
                      {division.services.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300 group-hover:text-white transition-colors">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${styling.iconColor}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA: Explore Services */}
                <div className="pt-6 border-t border-white/10">
                  <button
                    onClick={() => setActiveModalDivision(division)}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all duration-200 group-hover:scale-[1.01]"
                  >
                    <span>Explore Division Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog for Division Deep Dive */}
      <AnimatePresence>
        {activeModalDivision && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#1F222B] border border-white/15 rounded-3xl p-6 sm:p-9 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalDivision(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase">
                DIVISION {activeModalDivision.division_number} &bull; {activeModalDivision.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">
                {activeModalDivision.title}
              </h3>
              <p className="text-base text-slate-300 mb-6">
                {activeModalDivision.tagline}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                {activeModalDivision.description}
              </p>

              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Scope of Services Delivered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalDivision.services.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-2.5 text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#16BDEB] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/10">
                <button
                  onClick={() => scrollToContact(activeModalDivision.title)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white shadow-lg"
                  style={{
                    background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire for {activeModalDivision.title}</span>
                </button>
                <button
                  onClick={() => setActiveModalDivision(null)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
