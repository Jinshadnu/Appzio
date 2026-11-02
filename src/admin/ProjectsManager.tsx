import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  X,
  Search,
} from 'lucide-react';
import { Project } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const ProjectsManager: React.FC = () => {
  const { refreshData } = useWebsiteData();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form temporary fields
  const [techsInput, setTechsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects({ all: true });
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: 'Websites',
      client: '',
      tagline: '',
      short_description: '',
      overview: '',
      objectives: '',
      challenges: '',
      solutions: '',
      technologies: [],
      key_features: [],
      live_url: '',
      play_store_url: '',
      app_store_url: '',
      is_featured: 0,
      is_published: 1,
      display_order: 0,
    });
    setTechsInput('');
    setFeaturesInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTechsInput(Array.isArray(p.technologies) ? p.technologies.join(', ') : '');
    setFeaturesInput(Array.isArray(p.key_features) ? p.key_features.join('\n') : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      await loadProjects();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    try {
      const payload: Partial<Project> = {
        ...editingProject,
        technologies: techsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        key_features: featuresInput
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
      };

      if (editingProject.id) {
        await api.updateProject(editingProject.id, payload);
      } else {
        await api.createProject(payload);
      }

      setIsModalOpen(false);
      setEditingProject(null);
      await loadProjects();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to save project');
    }
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Project Management</h1>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Create, edit, feature, and publish agency case studies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-brand-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter projects..."
              className="bg-brand-dark-card border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-brand-text-secondary focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-glow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-brand-dark-card border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-secondary font-mono bg-white/[0.01]">
                <th className="p-4 font-medium">ORDER</th>
                <th className="p-4 font-medium">TITLE & CLIENT</th>
                <th className="p-4 font-medium">CATEGORY</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium">FEATURED</th>
                <th className="p-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-brand-text-secondary">{p.display_order}</td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{p.title}</div>
                    <div className="text-brand-text-secondary text-[11px]">
                      {p.client || 'Client Confidential'} • <span className="font-mono text-brand-cyan">/{p.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 text-white font-mono text-[10px]">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4">
                    {p.is_published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                        <Eye className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-brand-text-secondary font-mono text-[11px]">
                        <EyeOff className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {p.is_featured ? (
                      <span className="inline-flex items-center gap-1 text-amber-300 font-mono text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" /> Featured
                      </span>
                    ) : (
                      <span className="text-brand-text-secondary text-[11px]">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <a
                      href={`/portfolio/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 text-brand-text-secondary hover:text-white inline-block"
                      title="Preview Case Study"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-cyan hover:bg-brand-blue/20"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-brand-text-secondary">
                    No projects found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-dark-card border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold font-display text-white">
                {editingProject.id ? 'Edit Case Study' : 'Create New Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-brand-text-secondary hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Slug (URL Path)</label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="e.g. aetherpay-fintech"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Category *</label>
                  <select
                    value={editingProject.category || 'Websites'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Websites">Websites</option>
                    <option value="Mobile Applications">Mobile Applications</option>
                    <option value="Desktop Applications">Desktop Applications</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Client / Company</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    placeholder="e.g. Novus Freight"
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingProject.display_order ?? 0}
                    onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProject.tagline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  placeholder="e.g. Multi-currency digital wallet & transfer app"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Full Project Overview</label>
                <textarea
                  rows={3}
                  value={editingProject.overview || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Challenges</label>
                  <textarea
                    rows={2}
                    value={editingProject.challenges || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, challenges: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Solutions</label>
                  <textarea
                    rows={2}
                    value={editingProject.solutions || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solutions: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={techsInput}
                  onChange={(e) => setTechsInput(e.target.value)}
                  placeholder="Flutter, Dart, PHP, MySQL, Firebase"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Biometric authentication&#10;Real-time FX streaming&#10;Instant QR code payments"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Live URL</label>
                  <input
                    type="url"
                    value={editingProject.live_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Play Store URL</label>
                  <input
                    type="url"
                    value={editingProject.play_store_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, play_store_url: e.target.value })}
                    placeholder="https://play.google.com/..."
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">App Store URL</label>
                  <input
                    type="url"
                    value={editingProject.app_store_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, app_store_url: e.target.value })}
                    placeholder="https://apps.apple.com/..."
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.is_published)}
                    onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked ? 1 : 0 })}
                    className="rounded bg-brand-dark border-white/10 text-brand-blue"
                  />
                  <span>Published to Public Site</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.is_featured)}
                    onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked ? 1 : 0 })}
                    className="rounded bg-brand-dark border-white/10 text-brand-purple"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-brand-text-secondary hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow-sm"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

