import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Sliders, Globe, MessageSquare, Sparkles } from 'lucide-react';
import { WebsiteSettings } from '../types';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const SettingsManager: React.FC = () => {
  const { settings, refreshData } = useWebsiteData();
  const [formData, setFormData] = useState<WebsiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await api.updateSettings(formData);
      await refreshData();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update website settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Website & Homepage Content</h1>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Dynamically update branding, hero banners, contact info, and social links without editing code.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes applied live to public website!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Brand & Contact Identity */}
        <div className="rounded-3xl bg-brand-dark-card border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-brand-cyan">
            <Globe className="w-4 h-4" />
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-white">
              Brand & Contact Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Primary Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Inquiry Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Phone Number</label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">WhatsApp Number</label>
              <input
                type="text"
                name="contact_whatsapp"
                value={formData.contact_whatsapp || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Address / Global Regional Hubs</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">LinkedIn Profile URL</label>
              <input
                type="url"
                name="social_linkedin"
                value={formData.social_linkedin || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">GitHub URL</label>
              <input
                type="url"
                name="social_github"
                value={formData.social_github || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">Instagram URL</label>
              <input
                type="url"
                name="social_instagram"
                value={formData.social_instagram || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Footer Copyright Text</label>
            <input
              type="text"
              name="copyright_text"
              value={formData.copyright_text || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Section 2: Homepage Hero Section Management */}
        <div className="rounded-3xl bg-brand-dark-card border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-brand-purple">
            <Sparkles className="w-4 h-4" />
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-white">
              Homepage Hero Section
            </h2>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Hero Top Eyebrow Label</label>
            <input
              type="text"
              name="hero_label"
              value={formData.hero_label || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Hero Main Heading</label>
            <input
              type="text"
              name="hero_heading"
              value={formData.hero_heading || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">Hero Supporting Description</label>
            <textarea
              rows={3}
              name="hero_subheading"
              value={formData.hero_subheading || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Section 3: About & CTA Copy */}
        <div className="rounded-3xl bg-brand-dark-card border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-emerald-400">
            <Sliders className="w-4 h-4" />
            <h2 className="text-sm font-bold font-display uppercase tracking-wider text-white">
              About & Closing CTA Content
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">About Section Heading</label>
              <input
                type="text"
                name="about_heading"
                value={formData.about_heading || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1.5">CTA Section Heading</label>
              <input
                type="text"
                name="cta_heading"
                value={formData.cta_heading || ''}
                onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">About Section Paragraph</label>
            <textarea
              rows={3}
              name="about_description"
              value={formData.about_description || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1.5">CTA Section Paragraph</label>
            <textarea
              rows={2}
              name="cta_description"
              value={formData.cta_description || ''}
              onChange={handleChange}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow hover:shadow-glow-cyan transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Synchronizing with Database...' : 'Save All Settings & Publish Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

