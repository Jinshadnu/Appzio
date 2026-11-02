import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, X } from 'lucide-react';
import { Testimonial } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const TestimonialsManager: React.FC = () => {
  const { refreshData } = useWebsiteData();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await api.getTestimonials(true);
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openCreate = () => {
    setEditing({
      client_name: '',
      client_title: '',
      company: '',
      review: '',
      rating: 5,
      avatar_url: '',
      is_published: 1,
      display_order: 0,
    });
    setIsModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      await loadTestimonials();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.client_name || !editing.review) return;

    try {
      if (editing.id) {
        await api.updateTestimonial(editing.id, editing);
      } else {
        await api.createTestimonial(editing);
      }
      setIsModalOpen(false);
      setEditing(null);
      await loadTestimonials();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to save');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Testimonials Management</h1>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Client quotes, ratings, and social proof displayed on the homepage.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-glow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="rounded-3xl bg-brand-dark-card border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-secondary font-mono bg-white/[0.01]">
                <th className="p-4 font-medium">ORDER</th>
                <th className="p-4 font-medium">CLIENT & COMPANY</th>
                <th className="p-4 font-medium">REVIEW EXCERPT</th>
                <th className="p-4 font-medium">RATING</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-brand-text-secondary">{t.display_order}</td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{t.client_name}</div>
                    <div className="text-brand-cyan text-[11px]">{t.company}</div>
                  </td>
                  <td className="p-4 text-brand-text-secondary max-w-sm truncate">
                    "{t.review}"
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-mono text-white text-xs">{t.rating} / 5</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {t.is_published ? (
                      <span className="text-emerald-400 font-mono text-[11px]">Published</span>
                    ) : (
                      <span className="text-brand-text-secondary font-mono text-[11px]">Draft</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-cyan hover:bg-brand-blue/20"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
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
          <div className="bg-brand-dark-card border border-white/10 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-lg font-bold font-display text-white">
                {editing.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-text-secondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editing.client_name || ''}
                    onChange={(e) => setEditing({ ...editing, client_name: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Job Title</label>
                  <input
                    type="text"
                    value={editing.client_title || ''}
                    onChange={(e) => setEditing({ ...editing, client_title: e.target.value })}
                    placeholder="e.g. CTO / Founder"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editing.company || ''}
                    onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Rating (1 to 5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editing.rating ?? 5}
                    onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Client Review Text *</label>
                <textarea
                  rows={4}
                  required
                  value={editing.review || ''}
                  onChange={(e) => setEditing({ ...editing, review: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Avatar Image URL (Optional)</label>
                <input
                  type="url"
                  value={editing.avatar_url || ''}
                  onChange={(e) => setEditing({ ...editing, avatar_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.is_published)}
                    onChange={(e) => setEditing({ ...editing, is_published: e.target.checked ? 1 : 0 })}
                  />
                  <span>Published on Homepage</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-text-secondary">Display Order:</span>
                  <input
                    type="number"
                    value={editing.display_order ?? 0}
                    onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })}
                    className="w-16 bg-brand-dark border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                  />
                </div>
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

