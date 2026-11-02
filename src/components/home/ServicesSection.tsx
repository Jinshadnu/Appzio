import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Smartphone, Monitor, Cpu, Layout, ShieldCheck, 
  ArrowRight, CheckCircle2, Sparkles, X, MessageCircle, Info 
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Service } from '../../types';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const ServicesSection: React.FC = () => {
  const { services, settings } = useWebsiteData();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return Globe;
      case 'Smartphone': return Smartphone;
      case 'Monitor': return Monitor;
      case 'Cpu': return Cpu;
      case 'Layout': return Layout;
      case 'ShieldCheck': return ShieldCheck;
      default: return Cpu;
    }
  };

  const serviceImages: Record<string, string> = {
    'Website Development': '/assets/projects/krona-thumb.png',
    'Mobile Application Development': '/assets/projects/aetherpay-thumb.png',
    'Desktop Application Development': '/assets/projects/lumina-thumb.png',
    'Custom Software Development': '/assets/projects/novus-thumb.png',
    'UI/UX Design': '/assets/projects/apex-thumb.png',
    'Maintenance & Support': '/assets/projects/pulsefit-thumb.png',
  };

  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[#0c0d14] text-white scroll-mt-20">
      {/* ── Large Visual Background with Dark Texture (Matching Reference Requirement) ── */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/hero-team-hd3.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d14] via-[#0c0d14]/90 to-[#0c0d14]" />

      {/* Subtle brand radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#5221B5]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2365E8]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header (Matching Reference H2: Our Services) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-cyan-300 tracking-widest uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              FULL-CYCLE CAPABILITIES
            </span>
          </motion.div>

          <motion.h2 
            {...fadeUp(0.08)} 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight"
          >
            Our&nbsp;
            <span className="bg-gradient-to-r from-[#16B9E8] via-[#7435D5] to-[#2365E8] bg-clip-text text-transparent">
              Services.
            </span>
          </motion.h2>

          <motion.p 
            {...fadeUp(0.14)} 
            className="text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Engineered for performance, durability, and business growth. From custom web portals to cross-platform mobile apps and enterprise software.
          </motion.p>
        </div>

        {/* Services Cards Grid with Image Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon_name);
            const features = Array.isArray(service.features) ? service.features : [];
            const technologies = Array.isArray(service.technologies) ? service.technologies : [];
            const cardImg = serviceImages[service.title] || '/assets/projects/krona-thumb.png';

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: easeOut }}
                className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-[#5221B5]/60 backdrop-blur-md overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-[#5221B5]/20 transition-all duration-500"
              >
                {/* Visual Image Header with Zoom on Hover */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={cardImg}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/50 to-transparent" />

                  {/* Icon Badge Overlay */}
                  <div className="absolute bottom-4 left-5 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2365E8] to-[#5221B5] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Service Number */}
                  <span className="absolute top-4 right-5 text-xs font-mono font-bold text-white/50 group-hover:text-cyan-300 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {service.short_description}
                    </p>

                    {/* Features list */}
                    {features.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {features.slice(0, 2).map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action: "More Info" Button (Reference Requirement) */}
                  <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-gradient-to-r hover:from-[#2365E8] hover:to-[#5221B5] border border-white/15 hover:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <span>More Info</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="text-xs text-slate-400 hover:text-cyan-300 transition-colors font-mono"
                    >
                      Inquire →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            <span>Explore Complete Technical Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* ── More Info Modal (for instant interactive details) ── */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#11121d] border border-white/15 rounded-3xl p-7 sm:p-9 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                  SERVICE SPECIFICATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  {selectedService.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedService.full_description || selectedService.short_description}
              </p>

              {/* Deliverables */}
              {Array.isArray(selectedService.features) && selectedService.features.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Core Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.features.map((feat, fi) => (
                      <div key={fi} className="flex items-start gap-2 text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              {Array.isArray(selectedService.technologies) && selectedService.technologies.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Frameworks &amp; Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((t, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Location: <span className="text-white">Kerala, India</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    to={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-md transition-all"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
