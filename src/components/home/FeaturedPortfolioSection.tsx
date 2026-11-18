import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, ArrowRight, Sparkles, 
  CheckCircle2, X, Lock, Check,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Project } from '../../types';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const FeaturedPortfolioSection: React.FC = () => {
  const { projects } = useWebsiteData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);

  // Retrieve authentic projects
  const tephra = projects.find(p => p.slug === 'tephra-ae') || projects[0];
  const ghafBooks = projects.find(p => p.slug === 'ghaf-books-media') || projects[1];
  const primeTime = projects.find(p => p.slug === 'prime-time-typing') || projects[2];
  const mikhaelGold = projects.find(p => p.slug === 'mikhael-gold-diamonds') || projects[3];
  const carepoint = projects.find(p => p.slug === 'carepoint-auto-hub') || projects[4];

  // Enterprise ERP authentic software record
  const apexProject: Project = projects.find(p => p.slug === 'apex-erp') || {
    id: 99,
    title: 'Apex Multi-Branch ERP & Invoicing Network',
    slug: 'apex-erp',
    category: 'ERP & Invoicing Software',
    client: 'Commercial Retail & Wholesale Network',
    tagline: 'Multi-branch cloud ERP, point-of-sale, and VAT/GST automated invoicing.',
    short_description: 'An enterprise cloud ERP and point-of-sale software network engineered for multi-branch retail inventory, automated tax invoicing and sales telemetry.',
    overview: 'Engineered for high-volume commercial enterprises with distributed branches, Apex ERP automates stock reconciliation across warehouses, synchronizes real-time barcode POS terminals, and generates VAT/GST compliant receipts with instant cloud backups.',
    objectives: 'Replace fragmented spreadsheets with automated, role-based business management software.',
    challenges: 'Ensuring offline POS operation during connectivity dips and sub-second multi-branch database synchronization.',
    solutions: 'Built with PostgreSQL, Redis cache layer, resilient background workers, and barcode peripheral APIs.',
    key_features: [
      'Multi-Warehouse Real-Time Inventory & Stock Alerts',
      'Automated VAT / GST Compliant Invoicing Engine',
      'POS Touch & Barcode Scanner Integration',
      'Role-Based Staff Access & Consolidated Financial Audits'
    ],
    technologies: ['PostgreSQL', 'Node.js', 'PHP / Laravel', 'Docker', 'Redis'],
    thumbnail: '/assets/projects/apex-thumb.png',
    cover_image: '/assets/projects/apex-cover.png',
    gallery_images: ['/assets/projects/apex-thumb.png', '/assets/projects/apex-cover.png'],
    live_url: '',
    is_featured: 1,
    is_published: 1,
    display_order: 6
  };

  const showcaseProjects: Project[] = [
    tephra,
    ghafBooks,
    primeTime,
    mikhaelGold,
    carepoint,
    apexProject
  ].filter(Boolean);

  const categories = [
    'All',
    'Corporate & Web',
    'E-Commerce & Retail',
    'Government & Services',
    'Luxury & Automotive',
    'ERP & Software'
  ];

  const matchesCategory = (project: Project, cat: string) => {
    if (cat === 'All') return true;
    const catLower = project.category.toLowerCase();
    const titleLower = project.title.toLowerCase();

    if (cat === 'Corporate & Web') {
      return catLower.includes('corporate') || catLower.includes('web') || titleLower.includes('tephra');
    }
    if (cat === 'E-Commerce & Retail') {
      return catLower.includes('e-commerce') || titleLower.includes('ghaf');
    }
    if (cat === 'Government & Services') {
      return catLower.includes('business') && titleLower.includes('prime');
    }
    if (cat === 'Luxury & Automotive') {
      return catLower.includes('luxury') || titleLower.includes('mikhael') || titleLower.includes('carepoint');
    }
    if (cat === 'ERP & Software') {
      return catLower.includes('erp') || catLower.includes('software') || titleLower.includes('apex');
    }
    return true;
  };

  const filteredProjects = showcaseProjects.filter(p => matchesCategory(p, activeCategory));

  return (
    <section
      id="portfolio"
      className="py-28 lg:py-36 relative overflow-hidden bg-[#F5F8FD] text-[#111827] scroll-mt-16 border-b border-[#E2E8F0]"
    >
      {/* ── Background Subtle Ambient Accents ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-[#20BCE5]/5 blur-[170px]" />
        <div className="absolute bottom-1/4 -left-48 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase mb-4 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>SELECTED CLIENT WORK &bull; PROVEN IMPACT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] mb-4 font-display"
            >
              Selected Work.{' '}
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                }}
              >
                Built to Make an Impact.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
              className="text-base sm:text-lg text-[#52627A] font-normal leading-relaxed"
            >
              Explore our portfolio of high-performance websites, bespoke applications, and enterprise software built for prominent brands across the UAE, GCC, and India.
            </motion.p>
          </div>

          {/* Action Link to Full Portfolio Page */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#2563EB] hover:text-white bg-white hover:bg-[#2563EB] border border-[#E2E8F0] hover:border-[#2563EB] shadow-xs transition-all duration-300 group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#20BCE5] to-[#2563EB] text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white text-[#52627A] hover:text-[#111827] hover:bg-slate-50 border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Flagship Project Spotlight (TEPHRA - Dubai, UAE) ── */}
        {activeCategory === 'All' && tephra && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="relative rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-blue-50 via-white to-slate-100/80 border border-[#E2E8F0] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden mb-12 group"
          >
            <div className="rounded-2xl bg-[#FFFFFF] p-6 sm:p-8 lg:p-10 border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual: Realistic macOS Safari Browser Chrome with Real Screenshot */}
                <div className="lg:col-span-7">
                  <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md transition-transform duration-700 group-hover:scale-[1.015]">
                    
                    {/* Safari Chrome Header */}
                    <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <div className="px-4 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-mono text-slate-500 flex items-center gap-1.5 max-w-[240px] truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                        <span>tephra.ae</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#2563EB] font-bold">Dubai, UAE</span>
                    </div>

                    {/* Screenshot Frame (Aspect Ratio 16:10) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                      <img
                        src={getAssetUrl(tephra.thumbnail || '/assets/projects/tephra-preview.png')}
                        alt={tephra.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                      FLAGSHIP CORPORATE PORTAL
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs text-slate-500 font-medium">Dubai, UAE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-3 font-display">
                    {tephra.title}
                  </h3>

                  <p className="text-sm text-[#52627A] font-normal leading-relaxed mb-6">
                    {tephra.short_description ||
                      'A bespoke corporate engineering portal engineered with Swiss Neo-Grotesque minimalism, sub-second edge loading, and structured JSON-LD SEO schemas for Dubai MEP commercial contracting.'}
                  </p>

                  {/* Highlights Matrix */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span className="text-xs text-[#52627A] font-medium">UAE Tenders Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span className="text-xs text-[#52627A] font-medium">Sub-second Speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span className="text-xs text-[#52627A] font-medium">100% SEO Schema</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span className="text-xs text-[#52627A] font-medium">Direct WhatsApp</span>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tephra.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[#52627A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {tephra.live_url && (
                      <a
                        href={tephra.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all"
                        style={{
                          background: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                        }}
                      >
                        <span>Visit Live Website</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProjectModal(tephra)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-[#111827] hover:text-[#2563EB] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
                    >
                      <span>Case Details</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ── Modern Responsive Project Cards Grid (Pure White Surfaces) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: easeOut }}
              className="group relative rounded-3xl p-6 bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(37,99,235,0.12)] hover:-translate-y-1.5"
            >
              <div>
                {/* Device Chrome / Screenshot Frame */}
                <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 mb-5 relative group-hover:border-blue-200 transition-colors">
                  {/* Top Miniature Browser Bar */}
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                      {project.slug}.appzio
                    </span>
                    <span className="text-[10px] font-mono text-[#2563EB] font-bold">
                      {project.category.split(' ')[0]}
                    </span>
                  </div>

                  {/* Screenshot Viewport (Aspect Ratio 16:10) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                    <img
                      src={getAssetUrl(project.thumbnail || project.cover_image || '')}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Category & Client Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.client && (
                    <span className="text-[11px] text-slate-400 truncate max-w-[130px]">
                      {project.client.split('(')[0]}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-[#111827] mb-2 font-display group-hover:text-[#2563EB] transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#52627A] font-normal leading-relaxed mb-5 line-clamp-3">
                  {project.short_description || project.tagline}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 text-[#52627A]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-50 text-slate-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    <span>View Live Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedProjectModal(project)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-[#111827] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Case Study Overview Modal (Pure White Canvas) ── */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectModal(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] p-6 sm:p-8 text-[#111827] shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                  {selectedProjectModal.category} &bull; {selectedProjectModal.client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-display">
                  {selectedProjectModal.title}
                </h3>
              </div>

              {/* Screenshot Preview */}
              <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 mb-6">
                <img
                  src={getAssetUrl(selectedProjectModal.cover_image || selectedProjectModal.thumbnail || '')}
                  alt={selectedProjectModal.title}
                  className="w-full h-auto max-h-[340px] object-cover object-top"
                />
              </div>

              {/* Overview */}
              <p className="text-sm text-[#52627A] leading-relaxed mb-6 font-normal">
                {selectedProjectModal.overview || selectedProjectModal.short_description}
              </p>

              {/* Key Features */}
              {selectedProjectModal.key_features && selectedProjectModal.key_features.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                  <h4 className="text-xs font-mono font-bold text-[#111827] uppercase tracking-wider mb-2.5">
                    Engineering Deliverables
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProjectModal.key_features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#52627A]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectModal.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-mono bg-blue-50 text-[#2563EB] border border-blue-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {selectedProjectModal.live_url ? (
                  <a
                    href={selectedProjectModal.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all"
                    style={{
                      background: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                    }}
                  >
                    <span>Launch Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={() => setSelectedProjectModal(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all"
                    style={{
                      background: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                    }}
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 border border-slate-200 transition-colors"
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

export default FeaturedPortfolioSection;