import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, ArrowRight, Sparkles, Layers, 
  CheckCircle2, Compass, ShieldCheck, ChevronRight, X,
  Globe2, Lock, Smartphone, Laptop, Zap, Check, Eye
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Project } from '../../types';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const FeaturedPortfolioSection: React.FC = () => {
  const { projects } = useWebsiteData();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Retrieve the 5 specific client projects
  const tephra = projects.find(p => p.slug === 'tephra-ae') || projects[0];
  const ghafBooks = projects.find(p => p.slug === 'ghaf-books-media') || projects[1];
  const primeTime = projects.find(p => p.slug === 'prime-time-typing') || projects[2];
  const mikhaelGold = projects.find(p => p.slug === 'mikhael-gold-diamonds') || projects[3];
  const carepoint = projects.find(p => p.slug === 'carepoint-auto-hub') || projects[4];

  const categories = [
    'All',
    'Corporate & Engineering',
    'E-Commerce & Retail',
    'Government & Services',
    'Luxury & Automotive'
  ];

  // Helper to determine if a project matches active filter
  const isVisible = (categoryType: string) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Corporate & Engineering') return categoryType === 'corporate';
    if (activeCategory === 'E-Commerce & Retail') return categoryType === 'ecommerce';
    if (activeCategory === 'Government & Services') return categoryType === 'government';
    if (activeCategory === 'Luxury & Automotive') return categoryType === 'luxury' || categoryType === 'automotive';
    return true;
  };

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden bg-[#F8F9FD] text-slate-900 scroll-mt-16 border-b border-slate-200/70">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-[#2364D8]/10 blur-[170px]" />
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>SELECTED CLIENT WORK &bull; PROVEN IMPACT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-display"
            >
              Selected Work.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
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
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
            >
              Explore a curated collection of live web architectures, enterprise platforms, and digital solutions engineered for prominent businesses in UAE, GCC, and India.
            </motion.p>
          </div>

          {/* Top Actions & Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#2364D8] hover:text-white bg-blue-50 hover:bg-[#2364D8] border border-blue-200 transition-all duration-300 shadow-xs group"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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
                  ? 'bg-[#2364D8] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Asymmetric Showcase Grid ── */}
        <div className="space-y-12">
          
          {/* ══════════════════════════════════════════════════════════
              01. FLAGSHIP CORPORATE SHOWCASE: TEPHRA (Dubai, UAE)
              ══════════════════════════════════════════════════════════ */}
          {tephra && isVisible('corporate') && (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="group relative rounded-[2rem] bg-white border border-slate-200/90 hover:border-[#2364D8]/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual: Realistic macOS Safari Browser Mockup */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl transition-transform duration-700 group-hover:scale-[1.015]">
                    {/* Safari Window Header Bar */}
                    <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                      {/* Traffic Light Window Dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#EF4444]/90" />
                        <span className="w-3 h-3 rounded-full bg-[#F59E0B]/90" />
                        <span className="w-3 h-3 rounded-full bg-[#10B981]/90" />
                      </div>

                      {/* URL Pill Bar */}
                      <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span className="text-slate-300">https://tephra.ae</span>
                        <span className="text-slate-500 hidden sm:inline">&bull; Verified SSL</span>
                      </div>

                      {/* Placeholder Icon */}
                      <div className="w-4 h-4 rounded-full bg-slate-800" />
                    </div>

                    {/* Screenshot Canvas with Zoom Hover */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={getAssetUrl(tephra.thumbnail || tephra.cover_image || '/assets/projects/tephra-preview.png')}
                        alt={tephra.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Floating Badge on Screen */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-[#16BDEB] flex items-center gap-1.5 shadow-lg">
                        <Sparkles className="w-3 h-3 text-[#16BDEB]" />
                        <span>Corporate Flagship Showcase</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    {/* Category & Region Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                        Corporate Website Development
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        Engineering / MEP
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-[#2364D8]" />
                        <span>Dubai, UAE</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-display">
                      {tephra.title}
                    </h3>

                    {/* Strategic Summary */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      A modern corporate web presence engineered for a major Dubai electro-mechanical contracting firm, built to establish immediate credibility during international contractor pre-qualification tenders.
                    </p>

                    {/* Performance & Value Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                        <Zap className="w-4 h-4 text-[#2364D8] shrink-0" />
                        <span>99+ Core Web Vitals Speed</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Tender Pre-Qualification Ready</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                        <Smartphone className="w-4 h-4 text-[#16BDEB] shrink-0" />
                        <span>100% GCC Mobile Tested</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                        <Check className="w-4 h-4 text-[#2364D8] shrink-0" />
                        <span>Structured JSON-LD SEO</span>
                      </div>
                    </div>

                    {/* Verified Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-8">
                      {['React', 'TypeScript', 'Tailwind CSS', 'JSON-LD Schema', 'WhatsApp Routing'].map(tech => (
                        <span key={tech} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-100">
                    {tephra.live_url && (
                      <a
                        href={tephra.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-transform duration-200 hover:scale-105"
                        style={{
                          background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                        }}
                      >
                        <span>View Live Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <Link
                      to={`/portfolio/${tephra.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-slate-700 hover:text-[#2364D8] bg-slate-50 hover:bg-blue-50/60 border border-slate-200 transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════
              02 & 03. TWO BALANCED CARDS: GHAF BOOKS & PRIME TIME
              ══════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Project 02: Ghaf Books & Media (E-Commerce) */}
            {ghafBooks && isVisible('ecommerce') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
                className="group rounded-[2rem] bg-white border border-slate-200/90 hover:border-[#2364D8]/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  {/* Browser Mockup */}
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md mb-6">
                    <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      </div>
                      <div className="px-3 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-slate-400">
                        ghafbooks.com &bull; Online Bookstore
                      </div>
                      <div className="w-2.5 h-2.5" />
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={getAssetUrl(ghafBooks.thumbnail || ghafBooks.cover_image || '/assets/projects/ghafbooks-preview.png')}
                        alt={ghafBooks.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#16BDEB]">
                        E-COMMERCE &bull; PUBLISHING
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                      E-Commerce Development
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Publishing &bull; Literary Books
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                    {ghafBooks.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {ghafBooks.short_description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#2364D8]" />
                      <span>Instant Cart &amp; Razorpay</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#2364D8]" />
                      <span>Dual Reading Themes</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  {ghafBooks.live_url && (
                    <a
                      href={ghafBooks.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#2364D8] hover:bg-[#16BDEB] transition-colors shadow-md shadow-blue-500/20"
                    >
                      <span>View Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/portfolio/${ghafBooks.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-[#2364D8] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Project 03: Prime Time Typing Services (Abu Dhabi, UAE) */}
            {primeTime && isVisible('government') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
                className="group rounded-[2rem] bg-white border border-slate-200/90 hover:border-[#2364D8]/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  {/* Browser Mockup */}
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md mb-6">
                    <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      </div>
                      <div className="px-3 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-slate-400">
                        primetimeuae.com &bull; Abu Dhabi
                      </div>
                      <div className="w-2.5 h-2.5" />
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={getAssetUrl(primeTime.thumbnail || primeTime.cover_image || '/assets/projects/primetime-preview.png')}
                        alt={primeTime.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-sky-400">
                        UAE GOV &bull; CLEARING
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200">
                      Business Web Platform
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Abu Dhabi, UAE
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                    {primeTime.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {primeTime.short_description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>30+ UAE Services Directory</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>Instant WhatsApp Routing</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  {primeTime.live_url && (
                    <a
                      href={primeTime.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0284C7] hover:bg-[#2364D8] transition-colors shadow-md shadow-sky-500/20"
                    >
                      <span>View Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/portfolio/${primeTime.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-[#0284C7] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

          </div>

          {/* ══════════════════════════════════════════════════════════
              04 & 05. TWO COMPLEMENTARY CARDS: MIKHAEL GOLD & CAREPOINT
              ══════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Project 04: Mikhael Gold & Diamonds (Luxury) */}
            {mikhaelGold && isVisible('luxury') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
                className="group rounded-[2rem] bg-white border border-slate-200/90 hover:border-amber-400/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  {/* Browser Mockup */}
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md mb-6">
                    <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      </div>
                      <div className="px-3 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-amber-300">
                        mikhaelgold.com &bull; Luxury Jewellery
                      </div>
                      <div className="w-2.5 h-2.5" />
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={getAssetUrl(mikhaelGold.thumbnail || mikhaelGold.cover_image || '/assets/projects/mikhaelgold-preview.png')}
                        alt={mikhaelGold.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-amber-300">
                        LUXURY &bull; JEWELLERY
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      Luxury Web Showcase
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Jewellery &bull; Kerala, India
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                    {mikhaelGold.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {mikhaelGold.short_description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-600" />
                      <span>Cormorant Garamond Typography</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-600" />
                      <span>Private Bridal Appointments</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  {mikhaelGold.live_url && (
                    <a
                      href={mikhaelGold.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                    >
                      <span>View Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/portfolio/${mikhaelGold.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Project 05: Carepoint Auto Hub (Automotive) */}
            {carepoint && isVisible('automotive') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
                className="group rounded-[2rem] bg-white border border-slate-200/90 hover:border-red-400/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl flex flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  {/* Browser Mockup */}
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md mb-6">
                    <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      </div>
                      <div className="px-3 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-red-400">
                        carepoint.in &bull; Automotive Care
                      </div>
                      <div className="w-2.5 h-2.5" />
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={getAssetUrl(carepoint.thumbnail || carepoint.cover_image || '/assets/projects/carepoint-preview.png')}
                        alt={carepoint.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-red-400">
                        AUTOMOTIVE &bull; DETAILING
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                      Automotive Web Portal
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Car Detailing &bull; Kerala
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                    {carepoint.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {carepoint.short_description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-red-500" />
                      <span>Ceramic Coating Packages</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-red-500" />
                      <span>One-Tap Drive-In Booking</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  {carepoint.live_url && (
                    <a
                      href={carepoint.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-md shadow-red-500/20"
                    >
                      <span>View Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/portfolio/${carepoint.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* ── Bottom Call To Action Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          className="mt-16 p-8 sm:p-10 rounded-[2rem] bg-gradient-to-r from-blue-900 via-[#1F2B6C] to-[#0A1128] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16BDEB]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono font-bold text-[#16BDEB] uppercase tracking-wider block mb-2">
              Ready to elevate your digital presence?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight mb-2">
              Let&apos;s Build Your Next High-Impact Digital Solution.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              From corporate portals and e-commerce architectures to custom mobile and enterprise software, we deliver measurable commercial results.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
              }}
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
            >
              <span>Explore All 5 Projects</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedPortfolioSection;
