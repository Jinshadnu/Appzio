import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Smartphone, Monitor, Cpu, Layout, ShieldCheck, 
  ArrowRight, CheckCircle2, Sparkles, MessageCircle, 
  Terminal, Layers, Clock, Shield, Check
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { CTASection } from '../components/home/CTASection';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const Services: React.FC = () => {
  const { services } = useWebsiteData();

  useEffect(() => {
    document.title = 'Services & Solutions — APPZIO Digital Agency';
    window.scrollTo(0, 0);
  }, []);

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

  const serviceCategories: Record<string, string> = {
    'Website Development': 'WEB PLATFORMS & PORTALS',
    'Mobile Application Development': 'CROSS-PLATFORM & NATIVE APPS',
    'Desktop Application Development': 'ENTERPRISE DESKTOP SUITES',
    'Custom Software Development': 'CLOUD ARCHITECTURE & SAAS',
    'UI/UX Design': 'USER RESEARCH & DESIGN SYSTEMS',
    'Maintenance & Support': 'DEVOPS, SLA & RELIABILITY',
  };

  return (
    <div className="bg-[#F8F9FD]">
      
      {/* ── Services Page Hero Banner ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0c0d14]">
        {/* Background glow and subtle mesh */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-team-hd2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d14]/85 via-[#0c0d14]/75 to-[#0c0d14]" />
        
        {/* Ambient radial glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#5221B5]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 text-center px-5 sm:px-8 pt-36 pb-20 max-w-4xl mx-auto space-y-6">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300 tracking-widest uppercase font-mono backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Full-Lifecycle Engineering Capabilities
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]"
          >
            Engineering Precision for&nbsp;
            <span className="bg-gradient-to-r from-[#16B9E8] via-[#7435D5] to-[#2365E8] bg-clip-text text-transparent">
              Every Digital Touchpoint.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            We turn technical complexity into streamlined, secure, and user-friendly digital products. From high-converting web experiences to cross-platform mobile apps and tailored enterprise software.
          </motion.p>
        </div>
      </section>

      {/* ── Services Deep Dive List ── */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {services.map((srv, idx) => {
          const Icon = getIcon(srv.icon_name);
          const features = Array.isArray(srv.features) ? srv.features : [];
          const techs = Array.isArray(srv.technologies) ? srv.technologies : [];
          const isEven = idx % 2 === 0;
          const categoryTag = serviceCategories[srv.title] || 'DIGITAL SOLUTIONS';

          return (
            <motion.div
              key={srv.id || idx}
              id={srv.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
              className="scroll-mt-32 rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-sm hover:shadow-xl hover:shadow-[#5221B5]/8 hover:border-[#5221B5]/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5]" />

              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Left/Right Text column (7 cols) */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  {/* Service Badge & Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2365E8] to-[#5221B5] text-white flex items-center justify-center shadow-md shadow-[#5221B5]/20 shrink-0">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#7435D5] uppercase tracking-wider font-bold">
                          {categoryTag}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-mono text-slate-400 font-bold">
                          SERVICE 0{idx + 1}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#191923]">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <p className="text-base text-slate-600 leading-relaxed">
                    {srv.full_description || srv.short_description}
                  </p>

                  {/* Feature bullet list */}
                  {features.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                        Core Architecture &amp; Deliverables
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {features.map((feat, fi) => (
                          <div key={fi} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#191923] font-medium bg-[#F8F9FD] p-3 rounded-xl border border-slate-100">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack */}
                  {techs.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                        Frameworks &amp; Languages
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((t, ti) => (
                          <span
                            key={ti}
                            className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-50 text-[#5221B5] border border-purple-100 font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/contact?service=${encodeURIComponent(srv.title)}`}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-md shadow-[#5221B5]/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Inquire About {srv.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href="https://wa.me/919526026636"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Discussion</span>
                    </a>
                  </div>
                </div>

                {/* Visual Architecture Card (5 cols) */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="rounded-3xl bg-[#0c0d14] p-7 text-white space-y-5 border border-slate-800 shadow-xl relative overflow-hidden">
                    {/* Top card bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                          TECHNICAL PROFILE
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                        PRODUCTION GRADE
                      </span>
                    </div>

                    <div className="space-y-3.5 text-xs text-slate-300">
                      <div className="flex justify-between items-center py-2 border-b border-slate-800">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" /> Typical Delivery
                        </span>
                        <span className="text-white font-mono font-semibold">2 – 8 Sprints (Agile)</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-800">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-slate-500" /> Intellectual Property
                        </span>
                        <span className="text-white font-mono font-semibold">100% Client Code Ownership</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-800">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-slate-500" /> Post-Launch SLA
                        </span>
                        <span className="text-white font-mono font-semibold">30 Days Included Support</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Code Audit &amp; CI/CD
                        </span>
                        <span className="text-emerald-400 font-mono font-semibold">Automated &amp; Tested</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                      <span>LOCATION: Kerala, India</span>
                      <span className="text-cyan-300">GLOBAL DELIVERY</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </section>

      <CTASection />
    </div>
  );
};
