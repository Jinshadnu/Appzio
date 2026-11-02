import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowUpRight, Smartphone, Globe, Monitor, Cpu, 
  Layout, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const PortfolioSection: React.FC = () => {
  const { projects } = useWebsiteData();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Websites',
    'Mobile Applications',
    'Custom Software',
    'Desktop Applications',
    'UI/UX Design',
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Mobile Applications': return <Smartphone className="w-3.5 h-3.5" />;
      case 'Desktop Applications': return <Monitor className="w-3.5 h-3.5" />;
      case 'Websites': return <Globe className="w-3.5 h-3.5" />;
      case 'UI/UX Design': return <Layout className="w-3.5 h-3.5" />;
      default: return <Cpu className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return projects.length;
    return projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
  };

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden bg-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#5221B5]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#2365E8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-bold text-[#5221B5] tracking-widest uppercase font-mono shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Featured Case Studies
              </span>
            </motion.div>

            <motion.h2 
              {...fadeUp(0.08)} 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#191923] leading-tight"
            >
              Selected Work.&nbsp;
              <span className="bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] bg-clip-text text-transparent">
                Proven Impact.
              </span>
            </motion.h2>

            <motion.p 
              {...fadeUp(0.14)} 
              className="text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              Explore our curated portfolio of production software, mobile applications, and enterprise digital solutions engineered for ambitious clients worldwide.
            </motion.p>
          </div>

          <motion.div {...fadeUp(0.18)}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F8F9FD] border border-slate-200/90 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#191923] hover:border-[#5221B5]/40 hover:text-[#5221B5] hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 group shrink-0"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Category Filter Pills */}
        <motion.div {...fadeUp(0.22)} className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] text-white shadow-md shadow-[#5221B5]/20'
                    : 'bg-[#F8F9FD] border border-slate-200/80 text-slate-600 hover:text-[#191923] hover:border-[#5221B5]/30 hover:bg-white'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => {
            const techs = Array.isArray(project.technologies) ? project.technologies : [];
            const imageUrl = project.thumbnail || project.cover_image || '/hero-team-hd.jpg';

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/80 hover:border-[#5221B5]/40 shadow-sm hover:shadow-2xl hover:shadow-[#5221B5]/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Preview / Showcase Image Area */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  {/* Background Project Image with smooth scale */}
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md">
                      <span className="text-cyan-400">{getCategoryIcon(project.category)}</span>
                      <span>{project.category}</span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      ● LIVE PRODUCTION
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      <span>{project.tagline || 'Custom Architecture'}</span>
                    </div>
                    {project.client && (
                      <p className="text-xs text-white/80 line-clamp-1 font-medium">
                        {project.client}
                      </p>
                    )}
                  </div>
                </div>

                {/* Content Footer Area */}
                <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#191923] group-hover:text-[#5221B5] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="w-11 h-11 rounded-full bg-[#F8F9FD] text-[#191923] border border-slate-200/80 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2365E8] group-hover:to-[#5221B5] group-hover:text-white group-hover:border-transparent group-hover:shadow-md transition-all duration-300 shrink-0"
                        aria-label={`View case study for ${project.title}`}
                      >
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Tech stack badges & Case Study CTA */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {techs.slice(0, 4).map((tech, ti) => (
                        <span
                          key={ti}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F8F9FD] text-[#5221B5] border border-slate-200/80 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {techs.length > 4 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 text-slate-500">
                          +{techs.length - 4}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#191923] group-hover:text-[#5221B5] transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#F8F9FD] rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm">No projects found in this category yet.</p>
          </div>
        )}

        {/* Bottom Proof Strip */}
        <motion.div 
          {...fadeUp(0.25)}
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#F8F9FD] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5221B5] border border-purple-100 flex items-center justify-center shrink-0 hidden sm:flex">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold font-display text-[#191923]">
                Strict Confidentiality &amp; NDA Protection on All Client Works
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Some enterprise deployments and proprietary trading tools are under non-disclosure agreements and presented in private consultations.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-md shadow-[#5221B5]/25 transition-all"
          >
            Request Private Portfolio
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
