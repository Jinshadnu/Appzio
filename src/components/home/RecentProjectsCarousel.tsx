import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, 
  Sparkles, ExternalLink, X, Smartphone, Globe, Monitor, Cpu, Layout 
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Project } from '../../types';

const easeOut: Easing = 'easeOut';

export const RecentProjectsCarousel: React.FC = () => {
  const { projects } = useWebsiteData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // If projects are loaded
  const count = projects.length || 1;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  // Keyboard navigation when hovered
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [count]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextProject();
    if (isRightSwipe) prevProject();
  };

  const currentProject = projects[currentIndex] || {
    id: 1,
    title: 'AetherPay — Next-Gen Fintech Mobile & Web Platform',
    category: 'Mobile Applications',
    client: 'Aether Financial Technologies (UAE & UK)',
    short_description: 'Multi-currency digital wallet & instant borderless transfer solution',
    technologies: ['Flutter', 'Firebase', 'REST APIs'],
    thumbnail: '/assets/projects/aetherpay-thumb.png',
    cover_image: '/assets/projects/aetherpay-cover.png',
    slug: 'aetherpay-fintech-platform'
  };

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <section id="projects" className="py-28 relative overflow-hidden bg-white scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#5221B5]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#2365E8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Bar with Counter & Navigation (Matching Reference Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-mono font-bold text-[#5221B5] tracking-widest uppercase shadow-xs">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#191923]">
              Recent&nbsp;
              <span className="bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] bg-clip-text text-transparent">
                Projects.
              </span>
            </h2>
          </div>

          {/* Carousel Controls & Counter (Exact Reference Requirement) */}
          <div className="flex items-center gap-6">
            <div className="text-sm font-mono font-bold text-slate-400">
              <span className="text-2xl font-extrabold font-display bg-gradient-to-r from-[#2365E8] to-[#7435D5] bg-clip-text text-transparent">
                {formatNumber(currentIndex + 1)}
              </span>
              <span className="mx-1 text-slate-300">/</span>
              <span>{formatNumber(count)}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-[#5221B5] hover:text-[#5221B5] shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-[#5221B5] hover:text-[#5221B5] shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/portfolio"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F8F9FD] border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#191923] hover:text-[#5221B5] hover:border-[#5221B5]/40 transition-all shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Interactive Horizontal Project Showcase Carousel ── */}
        <div 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-2xl min-h-[500px] lg:min-h-[580px] flex items-end select-none group"
        >
          {/* Main Background Image with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id || currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat cursor-pointer"
              style={{
                backgroundImage: `url('${currentProject.cover_image || currentProject.thumbnail || '/assets/projects/aetherpay-thumb.png'}')`,
              }}
              onClick={() => setActiveModalProject(currentProject as Project)}
            />
          </AnimatePresence>

          {/* Deep gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 pointer-events-none" />

          {/* Top Floating Badges */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentProject.category}</span>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
              PROJECT {formatNumber(currentIndex + 1)}
            </span>
          </div>

          {/* Bottom Project Details Bar */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 space-y-4">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentProject.client || 'Client Confidential'}</span>
              </div>

              <h3 
                onClick={() => setActiveModalProject(currentProject as Project)}
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white hover:text-cyan-300 transition-colors cursor-pointer drop-shadow-md leading-tight"
              >
                {currentProject.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl line-clamp-2">
                {currentProject.short_description}
              </p>
            </div>

            {/* Tech Badges & Interactive Buttons */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {Array.isArray(currentProject.technologies) && currentProject.technologies.map((t, ti) => (
                  <span
                    key={ti}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModalProject(currentProject as Project)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <span>Quick View</span>
                </button>

                <Link
                  to={`/portfolio/${currentProject.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-lg shadow-[#5221B5]/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip (Matching Reference Interaction) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {projects.map((proj, pIdx) => {
            const isSelected = pIdx === currentIndex;
            return (
              <button
                key={proj.id || pIdx}
                onClick={() => setCurrentIndex(pIdx)}
                className={`relative rounded-2xl overflow-hidden aspect-[16/10] border-2 transition-all cursor-pointer group text-left ${
                  isSelected
                    ? 'border-[#5221B5] shadow-lg shadow-[#5221B5]/20 scale-102'
                    : 'border-slate-200/80 hover:border-slate-300 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={proj.thumbnail || proj.cover_image || '/assets/projects/aetherpay-thumb.png'}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded bg-black/60">
                  {formatNumber(pIdx + 1)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F8F9FD] border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#191923]"
          >
            <span>View All Selected Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* ── Quick Modal Preview (Reference: Click-to-view project functionality) ── */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-[#0c0d14] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-900 shrink-0">
                <img
                  src={activeModalProject.cover_image || activeModalProject.thumbnail || '/assets/projects/aetherpay-thumb.png'}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-black/40 to-transparent" />
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    {activeModalProject.category}
                  </span>
                  {activeModalProject.client && (
                    <span className="text-xs font-mono text-slate-400">
                      Client: {activeModalProject.client}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-display text-white">
                  {activeModalProject.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalProject.short_description}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"
                  >
                    Close
                  </button>

                  <Link
                    to={`/portfolio/${activeModalProject.slug}`}
                    onClick={() => setActiveModalProject(null)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] to-[#5221B5] shadow-md hover:scale-105 transition-all"
                  >
                    <span>Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
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

