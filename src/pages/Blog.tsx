import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { CTASection } from '../components/home/CTASection';

export const Blog: React.FC = () => {
  const { blogs } = useWebsiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    document.title = 'Insights & Technology Blog — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="pt-32 pb-16 bg-[#F8F9FD]">
      {/* Blog Header */}
      <section className="relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple tracking-wider uppercase font-mono">
            ENGINEERING & DESIGN PERSPECTIVES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-brand-text tracking-tight leading-tight">
            Insights, Architecture & <span className="text-gradient">Innovation.</span>
          </h1>
          <p className="text-lg text-brand-text-muted leading-relaxed">
            In-depth perspectives on mobile development, Flutter engineering, high-throughput backend architecture, and modern product design.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-200/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-gradient text-white font-semibold shadow-glow-sm'
                  : 'bg-white border border-slate-200/80 text-brand-text-muted hover:text-brand-text hover:border-brand-purple/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post, idx) => (
            <article
              key={post.id || idx}
              className="group rounded-3xl bg-white border border-slate-200/80 hover:border-brand-purple/40 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {post.cover_image && (
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/95 backdrop-blur-md text-brand-purple border border-purple-100 shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-brand-text-muted font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-purple" />
                      {post.read_time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-brand-blue" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-display text-brand-text group-hover:text-brand-purple transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-text-muted line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-blue transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {post.tags && (
                    <span className="text-[11px] font-mono text-brand-text-muted truncate max-w-[120px] bg-slate-100 px-2 py-0.5 rounded">
                      {post.tags.split(',')[0]}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};
