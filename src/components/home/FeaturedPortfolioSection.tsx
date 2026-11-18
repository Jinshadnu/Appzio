import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, ArrowRight, Sparkles, Layers, 
  CheckCircle2, Compass, ShieldCheck, ChevronRight, X,
  Globe2, Lock, Smartphone, Laptop, Zap, Check, Eye,
  Building2, ShoppingBag, Award, Database, ArrowUpRight
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

  // Enterprise ERP fallback from projects or built-in authentic software record
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
      className="py-28 lg:py-36 relative overflow-hidden bg-[#070B14] text-white scroll-mt-16 border-b border-white/10"
    >
      {/* ── Background Ambient Lighting Accents ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
        <div className="absolute bottom-1/4 -left-48 w-[600px] h-[600px] rounded-full bg-[#2364D8]/12 blur-[170px]" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
              <span>SELECTED CLIENT WORK &bull; PROVEN IMPACT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display"
            >
              Selected Work.{' '}
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #38BDF8 40%, #60A5FA 100%)',
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
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
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
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] shadow-sm group"
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
                  ? 'bg-gradient-to-r from-[#16BDEB] to-[#2364D8] text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
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
            className="relative rounded-[2rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/20 via-white/10 to-slate-900/80 backdrop-blur-2xl border border-white/25 shadow-[0_25px_65px_-12px_rgba(0,0,0,0.8)] overflow-hidden mb-12 group"
          >
            <div className="rounded-[1.6rem] bg-[#0A1020] p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual: Realistic macOS Safari Browser Chrome with Real Screenshot */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl overflow-hidden bg-slate-950 border border-white/15 shadow-2xl transition-transform duration-700 group-hover:scale-[1.015]">
                    
                    {/* Safari Chrome Header */}
                    <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 max-w-[240px] truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span>tephra.ae</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#16BDEB]">Dubai, UAE</span>
                    </div>

                    {/* Screenshot Frame (Aspect Ratio 16:10) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
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
                    <span className="text-xs font-mono font-bold text-[#16BDEB] uppercase tracking-wider">
                      FLAGSHIP CORPORATE PORTAL
                    </span>
                    <span className="text-slate-500">&bull;</span>
                    <span className="text-xs text-slate-400 font-medium">Dubai, UAE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-display">
                    {tephra.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
                    {tephra.short_description ||
                      'A bespoke corporate engineering portal engineered with Swiss Neo-Grotesque minimalism, sub-second edge loading, and structured JSON-LD SEO schemas for Dubai MEP commercial contracting.'}
                  </p>

                  {/* Highlights Matrix */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16BDEB] shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">UAE Tenders Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16BDEB] shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">Sub-second Speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16BDEB] shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">100% SEO Schema</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16BDEB] shrink-0" />
                      <span className="text-xs text-slate-300 font-medium">Direct WhatsApp</span>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tephra.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
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
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
                        style={{
                          background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                        }}
                      >
                        <span>Visit Live Website</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProjectModal(tephra)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all"
                    >
                      <span>Case Details</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ── Modern Responsive Project Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: easeOut }}
              className="group relative rounded-[2rem] p-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#16BDEB]/50 transition-all duration-400 backdrop-blur-xl flex flex-col justify-between shadow-lg hover:shadow-[0_20px_50px_rgba(22,189,235,0.12)] hover:-translate-y-2"
            >
              <div>
                {/* Device Chrome / Screenshot Frame */}
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/10 mb-5 relative group-hover:border-white/20 transition-colors">
                  {/* Top Miniature Browser Bar */}
                  <div className="px-3 py-2 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                      {project.slug}.appzio
                    </span>
                    <span className="text-[10px] font-mono text-[#16BDEB]">
                      {project.category.split(' ')[0]}
                    </span>
                  </div>

                  {/* Screenshot Viewport (Aspect Ratio 16:10) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={getAssetUrl(project.thumbnail || project.cover_image || '')}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Category & Client Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#16BDEB] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.client && (
                    <span className="text-[11px] text-slate-400 truncate max-w-[130px]">
                      {project.client.split('(')[0]}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-[#16BDEB] transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-5 line-clamp-3">
                  {project.short_description || project.tagline}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-slate-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16BDEB] hover:text-white transition-colors"
                  >
                    <span>View Live Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16BDEB] hover:text-white transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedProjectModal(project)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Case Study Overview Modal ── */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="relative w-full max-w-3xl rounded-[2rem] bg-[#0A1020] border border-white/20 p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-[#16BDEB] uppercase tracking-wider block mb-1">
                  {selectedProjectModal.category} &bull; {selectedProjectModal.client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {selectedProjectModal.title}
                </h3>
              </div>

              {/* Screenshot Preview */}
              <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/15 mb-6">
                <img
                  src={getAssetUrl(selectedProjectModal.cover_image || selectedProjectModal.thumbnail || '')}
                  alt={selectedProjectModal.title}
                  className="w-full h-auto max-h-[340px] object-cover object-top"
                />
              </div>

              {/* Overview */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                {selectedProjectModal.overview || selectedProjectModal.short_description}
              </p>

              {/* Key Features */}
              {selectedProjectModal.key_features && selectedProjectModal.key_features.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2.5">
                    Engineering Deliverables
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProjectModal.key_features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#16BDEB] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectModal.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-sky-300 border border-blue-400/25"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {selectedProjectModal.live_url ? (
                  <a
                    href={selectedProjectModal.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
                    style={{
                      background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                    }}
                  >
                    <span>Launch Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={() => setSelectedProjectModal(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
                    style={{
                      background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                    }}
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
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