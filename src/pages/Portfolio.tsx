import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, ArrowRight, Search, Sparkles, 
  Layers, CheckCircle2, ShieldCheck, Filter 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

const easeOut: Easing = 'easeOut';

export const Portfolio: React.FC = () => {
  const { projects } = useWebsiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    document.title = 'Selected Work & Case Studies — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'Websites',
    'E-commerce',
    'Mobile Applications',
    'Software Solutions',
    'Desktop Applications',
  ];

  const matchesCategoryFilter = (projectCat: string, filterCat: string) => {
    if (filterCat === 'All') return true;
    const p = projectCat.toLowerCase();
    const f = filterCat.toLowerCase();
    if (f === 'websites') return p.includes('website') && !p.includes('e-commerce');
    if (f === 'e-commerce') return p.includes('e-commerce') || p.includes('commerce') || p.includes('store');
    if (f === 'mobile applications') return p.includes('mobile') || p.includes('ios') || p.includes('android') || p.includes('flutter');
    if (f === 'desktop applications') return p.includes('desktop') || p.includes('windows') || p.includes('macos');
    if (f === 'software solutions') return p.includes('software') || p.includes('erp') || p.includes('billing') || p.includes('pos') || p.includes('saas') || p.includes('web app');
    return p.includes(f) || f.includes(p);
  };

  const filtered = projects.filter((p) => {
    const matchesCategory = matchesCategoryFilter(p.category, selectedCategory);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-slate-900 min-h-screen pt-32 pb-24">
      {/* ── Page Hero Header ── */}
      <section className="relative overflow-hidden mb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>SELECTED CLIENT PORTFOLIO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              Selected Work.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                Built to Make an Impact.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Explore a collection of digital experiences and business solutions developed for businesses across different industries in the UAE, GCC, and worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ── Controls: Search & Category Filters ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#2364D8] text-white shadow-md font-bold'
                    : 'bg-slate-50 text-slate-700 hover:text-[#2364D8] hover:bg-blue-50/60 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2364D8] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: easeOut }}
              className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#2364D8]/40 transition-all duration-300 overflow-hidden shadow-md hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={getAssetUrl(project.thumbnail || project.cover_image || '/assets/projects/tephra-preview.png')}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md text-xs font-mono font-bold text-[#2364D8]">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="text-xs font-mono text-slate-500 mb-2">
                    {project.client || 'Client Project'}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {project.short_description}
                  </p>

                  {/* Verified Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 pt-0 flex flex-wrap items-center gap-3 border-t border-slate-100 mt-4">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-md transition-transform duration-200 hover:scale-105"
                    style={{
                      background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                    }}
                  >
                    <span>View Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-[#2364D8] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
