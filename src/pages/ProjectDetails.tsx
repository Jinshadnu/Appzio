import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Smartphone, CheckCircle, ShieldCheck, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { CTASection } from '../components/home/CTASection';
import { getAssetUrl } from '../utils/asset';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useWebsiteData();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // Find in cached projects first or fetch from API
        const local = projects.find((p) => p.slug === slug || p.id.toString() === slug);
        if (local) {
          setProject(local);
          document.title = `${local.title} — APPZIO Case Study`;
        } else {
          const remote = await api.getProjectBySlug(slug);
          setProject(remote);
          document.title = `${remote.title} — APPZIO Case Study`;
        }
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, projects]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center text-center bg-[#F8F9FD]">
        <div className="space-y-4">
          <div className="w-12 h-12 border-3 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-brand-text-muted">Loading case study specifications...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-xl mx-auto px-4 text-center space-y-6 bg-[#F8F9FD]">
        <h1 className="text-3xl font-bold font-display text-brand-text">Project Not Found</h1>
        <p className="text-sm text-brand-text-muted">The requested project could not be found or has been moved.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-gradient shadow-glow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const keyFeatures = Array.isArray(project.key_features) ? project.key_features : [];
  const techs = Array.isArray(project.technologies) ? project.technologies : [];
  const related = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2);

  return (
    <div className="pt-32 pb-16 bg-[#F8F9FD]">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-text-muted hover:text-brand-purple transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Selected Works</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
              {project.category}
            </span>
            {project.client && (
              <span className="text-xs font-mono text-brand-text-muted">
                Client: <span className="text-brand-text font-semibold">{project.client}</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-brand-text tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-lg sm:text-xl text-brand-purple font-semibold">
              {project.tagline}
            </p>
          )}

          {/* Action Links (Live URL, App Store, Play Store) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow-sm transition-all hover:scale-105"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.play_store_url && (
              <a
                href={project.play_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-brand-text bg-white hover:border-brand-purple border border-slate-200/90 shadow-sm transition-all"
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Google Play Store</span>
              </a>
            )}
            {project.app_store_url && (
              <a
                href={project.app_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-brand-text bg-white hover:border-brand-purple border border-slate-200/90 shadow-sm transition-all"
              >
                <Smartphone className="w-4 h-4 text-sky-600" />
                <span>Apple App Store</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Hero Showcase Display Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl bg-slate-900 border border-slate-200/80 shadow-2xl overflow-hidden aspect-[21/9] min-h-[380px] max-h-[560px] flex items-end">
          <img
            src={getAssetUrl(project.cover_image || project.thumbnail || '/hero-team-hd.jpg')}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Overlay Spec details on bottom */}
          <div className="relative z-10 w-full p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-cyan-300 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                PRODUCTION ARCHITECTURE
              </span>
              <p className="text-white text-base sm:text-lg font-medium drop-shadow-sm leading-relaxed">
                {project.short_description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {techs.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Narrative Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            {project.overview && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-brand-text">Project Overview</h2>
                <div className="text-base text-brand-text-muted leading-relaxed whitespace-pre-line">
                  {project.overview}
                </div>
              </div>
            )}

            {/* Objectives */}
            {project.objectives && (
              <div className="space-y-4 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-card">
                <div className="flex items-center gap-2 text-brand-purple text-xs font-mono uppercase font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Strategic Goals</span>
                </div>
                <h3 className="text-xl font-bold font-display text-brand-text">Project Objectives</h3>
                <div className="text-sm sm:text-base text-brand-text-muted leading-relaxed whitespace-pre-line">
                  {project.objectives}
                </div>
              </div>
            )}

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.challenges && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-3">
                  <span className="text-xs font-mono text-rose-600 font-semibold uppercase tracking-wider">The Bottleneck</span>
                  <h4 className="text-lg font-bold font-display text-brand-text">Challenges Faced</h4>
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.solutions && (
                <div className="p-6 rounded-3xl bg-white border border-brand-purple/40 shadow-card space-y-3">
                  <span className="text-xs font-mono text-brand-purple font-semibold uppercase tracking-wider">Engineered Resolution</span>
                  <h4 className="text-lg font-bold font-display text-brand-text">Our Architecture Solution</h4>
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features */}
            {keyFeatures.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display text-brand-text">Key Capabilities & Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                      <span className="text-sm text-brand-text font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Metadata Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-6 sticky top-28 shadow-card">
              <h3 className="text-lg font-bold font-display text-brand-text pb-3 border-b border-slate-100">
                Project Summary
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-brand-text-muted">Client / Organization</span>
                  <div className="text-sm font-semibold text-brand-text mt-0.5">
                    {project.client || 'International Client'}
                  </div>
                </div>

                <div>
                  <span className="text-brand-text-muted">Category</span>
                  <div className="text-sm font-semibold text-brand-purple mt-0.5">
                    {project.category}
                  </div>
                </div>

                <div>
                  <span className="text-brand-text-muted">Deployment Status</span>
                  <div className="text-sm font-semibold text-emerald-600 mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Production Verified</span>
                  </div>
                </div>

                <div>
                  <span className="text-brand-text-muted">Technologies</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {techs.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-purple-50 text-brand-purple border border-purple-100 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-center text-xs font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow-sm transition-all hover:scale-105"
                >
                  <Layers className="w-4 h-4" />
                  <span>Build a Similar Product</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 pt-16 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display text-brand-text">Related Case Studies</h2>
            <Link to="/portfolio" className="text-xs font-mono font-semibold text-brand-purple hover:underline">
              View All Works →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rp) => (
              <div key={rp.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-brand-purple font-semibold">{rp.category}</span>
                  <h3 className="text-xl font-bold font-display text-brand-text mt-1">{rp.title}</h3>
                  <p className="text-xs text-brand-text-muted mt-2 line-clamp-2">{rp.short_description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to={`/portfolio/${rp.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-blue transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
};
