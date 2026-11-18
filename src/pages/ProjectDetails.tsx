import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, CheckCircle2, ShieldCheck, 
  Sparkles, Layers, ArrowRight, Code2, Globe, Building2 
} from 'lucide-react';
import { Project } from '../types';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { projects } = useWebsiteData();
  const [project, setProject] = useState<Project | null>(null);

  // Dedicated verified case study details for the 5 client projects
  const verifiedCaseStudies: Record<string, {
    industry: string;
    business_requirements: string;
    design_approach: string;
    development_approach: string;
  }> = {
    'tephra-ae': {
      industry: 'Engineering / MEP Contracting',
      business_requirements: 'Present complex commercial, industrial, and residential electromechanical contracting capabilities across Dubai and the UAE. Establish immediate technical authority during corporate contractor pre-qualification tenders and facilitate direct commercial procurement inquiries.',
      design_approach: 'Swiss Neo-Grotesque typographic hierarchy with stark contrast, purposeful whitespace, and a disciplined layout reflecting mechanical precision. Eliminates superfluous decorative elements in favor of clean technical matrices and clear corporate credibility markers.',
      development_approach: 'Engineered with ultra-lightweight semantic architecture delivering sub-second page loads across GCC mobile networks. Implemented JSON-LD structured schemas for UAE local engineering SEO and configured instant WhatsApp routing for commercial tenders.'
    },
    'ghaf-books-media': {
      industry: 'Publishing / Literary Books',
      business_requirements: 'Showcase world-class literary fiction, South Asian classics, Malayalam literature, and Arab-Indian Ocean heritage. Provide customers with an immersive literary shopping experience, supporting both physical editions and instant eBook delivery with secure online payment integration.',
      design_approach: 'Warm literary editorial aesthetics featuring dual light and dark reading themes. Typography is carefully calibrated for long-form literary readability, with prominent book cover display surfaces and zero visual friction in catalog navigation.',
      development_approach: 'Modern Next.js commerce frontend with dynamic client-side filtering, image preloading, responsive cart state management, and secure Razorpay payment gateway integration for frictionless transactions.'
    },
    'prime-time-typing': {
      industry: 'Typing Services / Document Clearing',
      business_requirements: 'Organize over 30+ specialized UAE government service categories (Tasheel, MOHRE Labour Permits, ICP Residency Visas, Emirates ID, Tamm, MOFA) into a clear directory for residents and corporate businesses in Abu Dhabi, driving direct inquiries via telephone and WhatsApp.',
      design_approach: 'Clean administrative directory architecture with high contrast, legible typography, step-by-step document requirement checklists, and persistent one-tap WhatsApp consultation shortcuts.',
      development_approach: 'Single-page React architecture optimized for rapid mobile search filtration. Features localized Abu Dhabi business metadata, structured service accordions, and lightweight bundle optimization.'
    },
    'mikhael-gold-diamonds': {
      industry: 'Jewellery / Luxury Retail',
      business_requirements: 'Translate the timeless heritage of handcrafted BIS-hallmarked 22K gold jewellery, Kasu Mala, Palakka Mala, and certified diamonds into a prestigious digital lookbook that drives private bridal showroom appointments.',
      design_approach: 'Editorial luxury layout featuring classical Cormorant Garamond serif typography, a regal warm burgundy palette, and high-fidelity jewellery showcases with fluid micro-interactions.',
      development_approach: 'React with Framer Motion transitions, responsive image scaling for intricate gold filigree and diamond facets, and seamless bridal appointment booking flows.'
    },
    'carepoint-auto-hub': {
      industry: 'Automotive / Car Care',
      business_requirements: 'Present professional automobile detailing, snow foam washing, 3D wheel alignment, and ceramic coating packages for motorists in Kerala, facilitating instant drive-in appointments and package comparison.',
      design_approach: 'Energetic modern automotive aesthetic with high-contrast service cards, package comparison tables, and prominent one-tap mobile booking shortcuts.',
      development_approach: 'Mobile-first responsive React architecture designed for high-speed touch devices, featuring integrated Google Maps routing and WhatsApp booking triggers.'
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    const found = projects.find((p) => p.slug === slug || p.id.toString() === slug);
    if (found) {
      setProject(found);
      document.title = `${found.title} — Case Study | APPZIO`;
    }
  }, [slug, projects]);

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-xl mx-auto px-6 text-center space-y-6 bg-white text-slate-900">
        <h1 className="text-3xl font-bold font-display">Case Study Not Found</h1>
        <p className="text-sm text-slate-600">The requested client project could not be found or has been moved.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
          style={{ background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </Link>
      </div>
    );
  }

  // Next Project Navigation Calculation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const caseStudyMeta = verifiedCaseStudies[project.slug] || {
    industry: project.category || 'Digital Engineering',
    business_requirements: project.objectives || 'Deliver a high-impact digital experience tailored to business goals.',
    design_approach: 'User-centered, modern design hierarchy crafted with attention to brand positioning and frictionless usability.',
    development_approach: 'Modern component-driven web architecture ensuring rapid loading speeds, security, and scalability.'
  };

  const keyFeatures = Array.isArray(project.key_features) && project.key_features.length > 0
    ? project.key_features
    : [
        'Responsive layout across all device viewports',
        'Optimized loading performance and Core Web Vitals',
        'Semantic SEO schema architecture',
        'Direct customer engagement and conversion triggers'
      ];

  const techs = Array.isArray(project.technologies) ? project.technologies : [];

  return (
    <div className="pt-32 pb-24 bg-white text-slate-900 min-h-screen">
      {/* ── Top Breadcrumb Bar ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-[#2364D8] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Selected Works</span>
        </Link>
      </div>

      {/* ── Project Header & Meta ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-[#2364D8] border border-blue-200/80">
              {project.category}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {caseStudyMeta.industry}
            </span>
            {project.client && (
              <span className="text-xs font-mono text-slate-500">
                {project.client}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight font-display">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            {project.short_description}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <a
              href="#requirements"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <span>Explore Architecture Specifications</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Authentic Project Showcase Hero Preview ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl shadow-blue-900/5">
          <img
            src={getAssetUrl(project.thumbnail || project.cover_image || '/assets/projects/tephra-preview.png')}
            alt={`${project.title} Preview`}
            className="w-full h-auto object-cover object-top max-h-[750px]"
          />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md text-xs font-mono font-bold text-[#2364D8]">
            AUTHENTIC PRODUCTION PREVIEW
          </div>
        </div>
      </section>

      {/* ── Case Study In-Depth Specification Breakdown ── */}
      <section id="requirements" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Specification Body (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Project Overview */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#F8F9FD] border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2364D8] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>01. Project Overview</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Executive Overview &amp; Context
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {project.overview || project.short_description}
              </p>
            </div>

            {/* 2. Business Requirements */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#F8F9FD] border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2364D8] uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>02. Business Requirements</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Strategic Business Objectives
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {caseStudyMeta.business_requirements}
              </p>
            </div>

            {/* 3. Design Approach */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#F8F9FD] border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#252B9B] uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>03. Design Approach</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                UI/UX Philosophy &amp; Visual Identity
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {caseStudyMeta.design_approach}
              </p>
            </div>

            {/* 4. Development Approach */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#F8F9FD] border border-slate-200/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0284C7] uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>04. Development Approach</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Engineering Architecture &amp; Delivery
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {caseStudyMeta.development_approach}
              </p>
            </div>

            {/* 5. Key Features */}
            <div className="p-8 sm:p-9 rounded-3xl bg-[#F8F9FD] border border-slate-200/90 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>05. Delivered Capabilities</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Key Features Delivered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3 text-sm text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Secondary Full-Page Screenshot */}
            {project.cover_image && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Full-Length Page Capture
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Desktop 1440px Viewport</span>
                </div>
                <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
                  <img
                    src={getAssetUrl(project.cover_image)}
                    alt={`${project.title} Full View`}
                    className="w-full h-auto object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Specifications (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Metadata Box */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-blue-900/5 space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 font-display pb-4 border-b border-slate-100">
                Project Matrix
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Client / Brand</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{project.client || 'Client Confidential'}</div>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Industry</div>
                  <div className="font-semibold text-[#2364D8] mt-0.5">{caseStudyMeta.industry}</div>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-500 uppercase">Category</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{project.category}</div>
                </div>

                {project.live_url && (
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase">Live Production URL</div>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#2364D8] hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      <span>{project.live_url.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Verified Technologies */}
              <div className="pt-6 border-t border-slate-100">
                <div className="text-xs font-mono text-slate-500 uppercase mb-3">
                  Verified Technical Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-50 border border-slate-200 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation Prompt */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="text-xs text-slate-500 leading-relaxed">
                  Need a similar high-performance digital solution for your business?
                </div>
                <Link
                  to="/#contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25"
                  style={{
                    background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                  }}
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Next Project Navigation (Item 10) ── */}
      {nextProject && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 border-t border-slate-200">
          <div className="rounded-3xl bg-[#F8F9FD] border border-slate-200/90 hover:border-[#2364D8]/40 p-8 sm:p-12 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-2">
                Up Next in Selected Works
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display group-hover:text-[#2364D8] transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {nextProject.category} &bull; {nextProject.short_description}
              </p>
            </div>

            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold text-slate-800 hover:text-[#2364D8] bg-white border border-slate-200 hover:border-blue-300 shadow-sm transition-all shrink-0 self-start sm:self-center"
            >
              <span>View Next Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
