import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Globe, Smartphone, Monitor, Cpu, Layout, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const ServicesManager: React.FC = () => {
  const { refreshData } = useWebsiteData();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');
  const [techsInput, setTechsInput] = useState('');

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await api.getServices(true);
      setServices(data);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      icon_name: 'Cpu',
      is_active: 1,
      display_order: 0,
    });
    setFeaturesInput('');
    setTechsInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setFeaturesInput(Array.isArray(s.features) ? s.features.join('\n') : '');
    setTechsInput(Array.isArray(s.technologies) ? s.technologies.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.deleteService(id);
      await loadServices();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete service');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    try {
      const payload: Partial<Service> = {
        ...editingService,
        features: featuresInput.split('\n').map((f) => f.trim()).filter(Boolean),
        technologies: techsInput.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (editingService.id) {
        await api.updateService(editingService.id, payload);
      } else {
        await api.createService(payload);
      }

      setIsModalOpen(false);
      setEditingService(null);
      await loadServices();
      await refreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to save service');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Service Management</h1>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Configure agency digital capabilities, icons, and specifications.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-glow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="rounded-3xl bg-brand-dark-card border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-secondary font-mono bg-white/[0.01]">
                <th className="p-4 font-medium">ORDER</th>
                <th className="p-4 font-medium">ICON</th>
                <th className="p-4 font-medium">TITLE & SLUG</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-brand-text-secondary">{s.display_order}</td>
                  <td className="p-4 font-mono text-brand-cyan">{s.icon_name}</td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{s.title}</div>
                    <div className="text-brand-text-secondary text-[11px] truncate max-w-md">
                      {s.short_description}
                    </div>
                  </td>
                  <td className="p-4">
                    {s.is_active ? (
                      <span className="text-emerald-400 font-mono text-[11px]">Active</span>
                    ) : (
                      <span className="text-brand-text-secondary font-mono text-[11px]">Disabled</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(s)}
                      className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-cyan hover:bg-brand-blue/20"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
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
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-dark-card border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold font-display text-white">
                {editingService.id ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-text-secondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white mb-1">Icon Representation</label>
                  <select
                    value={editingService.icon_name || 'Cpu'}
                    onChange={(e) => setEditingService({ ...editingService, icon_name: e.target.value })}
                    className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="Monitor">Monitor (Desktop)</option>
                    <option value="Cpu">Cpu (Custom Software)</option>
                    <option value="Layout">Layout (UI/UX)</option>
                    <option value="ShieldCheck">ShieldCheck (Maintenance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.short_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Full Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingService.full_description || ''}
                  onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })}
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Features (One per line)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Feature 1&#10;Feature 2"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={techsInput}
                  onChange={(e) => setTechsInput(e.target.value)}
                  placeholder="React, TypeScript, PHP"
                  className="w-full bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editingService.is_active)}
                    onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked ? 1 : 0 })}
                  />
                  <span>Active & Visible</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-text-secondary">Display Order:</span>
                  <input
                    type="number"
                    value={editingService.display_order ?? 0}
                    onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) || 0 })}
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

