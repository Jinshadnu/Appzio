import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowRight, Search, Sparkles, Smartphone, 
  Globe, Monitor, Cpu, Layout, ShieldCheck 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { CTASection } from '../components/home/CTASection';
import { getAssetUrl } from '../utils/asset';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const Portfolio: React.FC = () => {
  const { projects } = useWebsiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    document.title = 'Selected Portfolio & Case Studies — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'Websites',
    'Mobile Applications',
    'Custom Software',
    'Desktop Applications',
    'UI/UX Design',
  ];

  const filtered = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="bg-[#F8F9FD]">
      
      {/* ── Portfolio Page Hero Banner ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0c0d14]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${getAssetUrl('/hero-team-hd3.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d14]/85 via-[#0c0d14]/75 to-[#0c0d14]" />
        
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#5221B5]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 text-center px-5 sm:px-8 pt-36 pb-20 max-w-4xl mx-auto space-y-6">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-300 tracking-widest uppercase font-mono backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Engineered with Precision
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]"
          >
            Curated Case Studies.&nbsp;
            <span className="bg-gradient-to-r from-[#16B9E8] via-[#7435D5] to-[#2365E8] bg-clip-text text-transparent">
              Measurable Results.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Explore our track record of production-grade digital software, web portals, and mobile applications engineered for clients across Kerala, UAE, Europe, and the Americas.
          </motion.p>
        </div>
      </section>

      {/* ── Controls: Category Pills & Search Bar ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 -mt-7 relative z-20 mb-12">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] text-white shadow-md shadow-[#5221B5]/20'
                      : 'bg-[#F8F9FD] border border-slate-200/80 text-slate-600 hover:text-[#191923] hover:border-[#5221B5]/30 hover:bg-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, client, tech..."
              className="w-full bg-[#F8F9FD] border border-slate-200/90 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] focus:bg-white transition-all shadow-2xs font-medium"
            />
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => {
            const techs = Array.isArray(project.technologies) ? project.technologies : [];
            const imageUrl = project.thumbnail || project.cover_image || '/hero-team-hd.jpg';

            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.1, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/80 hover:border-[#5221B5]/40 shadow-sm hover:shadow-2xl hover:shadow-[#5221B5]/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Preview / Showcase Image Area */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={getAssetUrl(imageUrl)}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

                  {/* Badges on Top */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-md">
                      <span className="text-cyan-400">{getCategoryIcon(project.category)}</span>
                      <span>{project.category}</span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      ● LIVE
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
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

                {/* Content Area */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold font-display text-[#191923] group-hover:text-[#5221B5] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="w-9 h-9 rounded-full bg-[#F8F9FD] text-[#191923] border border-slate-200/80 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2365E8] group-hover:to-[#5221B5] group-hover:text-white group-hover:border-transparent group-hover:shadow-md transition-all duration-300 shrink-0"
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Tech stack badges & View Details */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1">
                      {techs.slice(0, 3).map((tech, ti) => (
                        <span
                          key={ti}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F8F9FD] text-[#5221B5] border border-slate-200/80 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {techs.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-500">
                          +{techs.length - 3}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#191923] group-hover:text-[#5221B5] transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-lg mx-auto">
            <p className="text-base font-bold text-[#191923]">No projects matched your search.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching another keyword or clearing the filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-5 px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] to-[#5221B5] hover:opacity-90 shadow-md transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
};
