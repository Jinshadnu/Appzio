import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { CTASection } from '../components/home/CTASection';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useWebsiteData();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const local = blogs.find((b) => b.slug === slug || b.id.toString() === slug);
        if (local) {
          setPost(local);
          document.title = `${local.title} — APPZIO Insights`;
        } else {
          const remote = await api.getBlogBySlug(slug);
          setPost(remote);
          document.title = `${remote.title} — APPZIO Insights`;
        }
      } catch (err) {
        console.error('Failed to load blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, blogs]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center text-center bg-[#F8F9FD]">
        <div className="space-y-4">
          <div className="w-12 h-12 border-3 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-brand-text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 pb-20 max-w-xl mx-auto px-4 text-center space-y-6 bg-[#F8F9FD]">
        <h1 className="text-3xl font-bold font-display text-brand-text">Article Not Found</h1>
        <p className="text-sm text-brand-text-muted">The requested article could not be found or has been unpublished.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-gradient shadow-glow-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 bg-[#F8F9FD]">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-text-muted hover:text-brand-purple transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Insights & Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-card">
        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-text tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-brand-text-muted font-medium pt-2 border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5 text-brand-text font-semibold">
              <User className="w-3.5 h-3.5 text-brand-purple" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-blue" />
              {post.read_time}
            </span>
            {post.created_at && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-violet" />
                  {post.created_at.split(' ')[0]}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden aspect-[21/9] border border-slate-200 shadow-md">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Markdown/Content Body */}
        <div className="max-w-none py-6 space-y-6 text-brand-text text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
          {post.content}
        </div>

        {/* Tags & Share */}
        {post.tags && (
          <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand-purple" />
              <div className="flex flex-wrap gap-1.5">
                {post.tags.split(',').map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-purple-50 text-brand-purple border border-purple-100">
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <CTASection />
      </div>
    </div>
  );
};
