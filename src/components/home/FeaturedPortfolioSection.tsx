import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, ArrowRight, Sparkles, Layers, 
  CheckCircle2, Compass, ShieldCheck, ChevronRight, X 
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Project } from '../../types';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const FeaturedPortfolioSection: React.FC = () => {
  const { projects } = useWebsiteData();

  // Retrieve the 5 specific client projects
  const tephra = projects.find(p => p.slug === 'tephra-ae') || projects[0];
  const ghafBooks = projects.find(p => p.slug === 'ghaf-books-media') || projects[1];
  const primeTime = projects.find(p => p.slug === 'prime-time-typing') || projects[2];
  const mikhaelGold = projects.find(p => p.slug === 'mikhael-gold-diamonds') || projects[3];
  const carepoint = projects.find(p => p.slug === 'carepoint-auto-hub') || projects[4];

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden bg-white text-slate-900 scroll-mt-16">
      {/* Background radial gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#16BDEB]/10 blur-[160px]" />
        <div className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#2364D8]/10 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>SELECTED CLIENT PORTFOLIO</span>
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
              Explore a collection of digital experiences and business solutions developed for businesses across different industries.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2364D8] hover:text-[#16BDEB] transition-colors group"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── Asymmetric Project Grid (1 Large, 2 Medium, 2 Complementary) ── */}
        <div className="space-y-10">
          
          {/* 1. LARGE FEATURED PROJECT: TEPHRA */}
          {tephra && (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-[#2364D8]/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Visual Preview */}
                <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={getAssetUrl(tephra.thumbnail || tephra.cover_image || '/assets/projects/tephra-preview.png')}
                    alt={tephra.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Floating Badge on Image */}
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-md backdrop-blur-md text-xs font-mono font-bold text-[#2364D8]">
                    FEATURED CORPORATE SHOWCASE
                  </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                        {tephra.category}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        Engineering / MEP
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Dubai, UAE
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-display">
                      {tephra.title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      {tephra.short_description}
                    </p>

                    <div className="space-y-2 mb-8">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                        Delivered Capabilities:
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                        <span>High-precision MEP contracting services presentation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                        <span>Swiss Neo-Grotesque typography &amp; structured data</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100">
                    {tephra.live_url && (
                      <a
                        href={tephra.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-transform duration-200 hover:scale-105"
                        style={{
                          background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                        }}
                      >
                        <span>View Live Website</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <Link
                      to={`/portfolio/${tephra.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-700 hover:text-[#2364D8] bg-slate-50 hover:bg-blue-50/60 border border-slate-200 transition-colors"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. TWO MEDIUM PROJECT PRESENTATIONS: GHAF BOOKS & PRIME TIME TYPING */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 02: Ghaf Books & Media */}
            {ghafBooks && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#2364D8]/50 transition-all duration-500 overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(ghafBooks.thumbnail || ghafBooks.cover_image || '/assets/projects/ghafbooks-preview.png')}
                      alt={ghafBooks.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md text-xs font-mono font-bold text-[#2364D8]">
                      E-COMMERCE &bull; PUBLISHING
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                        {ghafBooks.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Publishing / Books
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                      {ghafBooks.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {ghafBooks.short_description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 flex flex-wrap items-center gap-3">
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

            {/* Project 03: Prime Time Typing Services */}
            {primeTime && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#2364D8]/50 transition-all duration-500 overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(primeTime.thumbnail || primeTime.cover_image || '/assets/projects/primetime-preview.png')}
                      alt={primeTime.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md text-xs font-mono font-bold text-[#2364D8]">
                      UAE BUSINESS &bull; DOCUMENT CLEARING
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                        {primeTime.category}
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
                  </div>
                </div>

                <div className="p-8 pt-0 flex flex-wrap items-center gap-3">
                  {primeTime.live_url && (
                    <a
                      href={primeTime.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#2364D8] hover:bg-[#16BDEB] transition-colors shadow-md shadow-blue-500/20"
                    >
                      <span>View Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    to={`/portfolio/${primeTime.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 hover:text-[#2364D8] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* 3. TWO COMPLEMENTARY PROJECT PRESENTATIONS: MIKHAEL GOLD & CAREPOINT AUTO HUB */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project 04: Mikhael Gold & Diamonds */}
            {mikhaelGold && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400/50 transition-all duration-500 overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(mikhaelGold.thumbnail || mikhaelGold.cover_image || '/assets/projects/mikhaelgold-preview.png')}
                      alt={mikhaelGold.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md text-xs font-mono font-bold text-amber-700">
                      LUXURY &bull; JEWELLERY
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        {mikhaelGold.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Jewellery / Retail
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                      {mikhaelGold.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {mikhaelGold.short_description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 flex flex-wrap items-center gap-3">
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

            {/* Project 05: Carepoint Auto Hub */}
            {carepoint && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/90 hover:border-red-400/50 transition-all duration-500 overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(carepoint.thumbnail || carepoint.cover_image || '/assets/projects/carepoint-preview.png')}
                      alt={carepoint.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md text-xs font-mono font-bold text-red-600">
                      AUTOMOTIVE &bull; DETAILING
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                        {carepoint.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Automotive
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-display">
                      {carepoint.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {carepoint.short_description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0 flex flex-wrap items-center gap-3">
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
      </div>
    </section>
  );
};

export default FeaturedPortfolioSection;
