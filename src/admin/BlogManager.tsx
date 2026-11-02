import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, ExternalLink } from 'lucide-react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const BlogManager: React.FC = () => {
  const { refreshData } = useWebsiteData();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await api.getBlogs(true);
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openCreate = () => {
    setEditing({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Mobile Engineering',
      author: 'APPZIO Team',
      read_time: '5 min read',
      cover_image: '',
      tags: '',
      seo_title: '',
      seo_description: '',
      is_published: 1,
    });
    setIsModalOpen(true);
  };

  const openEdit = (b: BlogPost) => {
    setEditing(b);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.deleteBlog(id);
      await loadBlogs();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.title || !editing.content) return;

    try {
      if (editing.id) {
        await api.updateBlog(editing.id, editing);
      } else {
        await api.createBlog(editing);
      }
      setIsModalOpen(false);
      setEditing(null);
      await loadBlogs();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to save article');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Insights & Blog Manager</h1>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Publish engineering articles, technical insights, and company updates.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-glow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="rounded-3xl bg-brand-dark-card border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-secondary font-mono bg-white/[0.01]">
                <th className="p-4 font-medium">TITLE & SLUG</th>
                <th className="p-4 font-medium">CATEGORY</th>
                <th className="p-4 font-medium">AUTHOR</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{b.title}</div>
                    <div className="text-brand-text-secondary text-[11px] font-mono">
                      /{b.slug}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-brand-cyan">
                      {b.category}
                    </span>
                  </td>
                  <td className="p-4 text-brand-text-secondary">
                    {b.author}
                  </td>
                  <td className="p-4">
                    {b.is_published ? (
                      <span className="text-emerald-400 font-mono text-[11px]">Published</span>
                    ) : (
                      <span className="text-brand-text-secondary font-mono text-[11px]">Draft</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 text-brand-text-secondary hover:text-white inline-block"
                      title="View Article"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => openEdit(b)}
                      className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-cyan hover:bg-brand-blue/20"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-dark-card border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-lg font-bold font-display text-white">
                {editing.id ? 'Edit Article' : 'Draft New Article'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-text-secondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ''}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    value={editing.slug || ''}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    placeholder="e.g. why-flutter-dominates-2026"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Category</label>
                  <input
                    type="text"
                    value={editing.category || ''}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    placeholder="Mobile Engineering"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Author</label>
                  <input
                    type="text"
                    value={editing.author || ''}
                    onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editing.read_time || ''}
                    onChange={(e) => setEditing({ ...editing, read_time: e.target.value })}
                    placeholder="5 min read"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Excerpt / Brief Summary</label>
                <textarea
                  rows={2}
                  value={editing.excerpt || ''}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Article Content (Markdown supported) *</label>
                <textarea
                  rows={8}
                  required
                  value={editing.content || ''}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={editing.cover_image || ''}
                    onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={editing.tags || ''}
                    onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
                    placeholder="Flutter, Mobile, Dart"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.is_published)}
                    onChange={(e) => setEditing({ ...editing, is_published: e.target.checked ? 1 : 0 })}
                  />
                  <span>Published & Visible on Blog</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-brand-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-glow-sm"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

