import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  Inbox,
  FileText,
  Clock,
  ArrowRight,
  PlusCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { DashboardStats } from '../types';
import { api } from '../services/api';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Executive Overview
          </h1>
          <p className="text-xs text-brand-text-secondary mt-1">
            Real-time telemetry, portfolio status, and incoming client requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadStats}
            className="p-2.5 rounded-xl bg-brand-dark-card border border-white/10 text-white hover:bg-white/5 transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-gradient shadow-glow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-brand-dark-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-brand-cyan">
            <span className="text-xs font-mono">PROJECTS</span>
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {stats?.total_projects ?? '—'}
          </div>
          <div className="text-[11px] text-brand-text-secondary">
            {stats?.published_projects ?? 0} Published
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-brand-dark-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-brand-blue">
            <span className="text-xs font-mono">SERVICES</span>
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {stats?.total_services ?? '—'}
          </div>
          <div className="text-[11px] text-emerald-400">All Active</div>
        </div>

        <div className="p-5 rounded-2xl bg-brand-dark-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono">NEW INQUIRIES</span>
            <Inbox className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-amber-300">
            {stats?.new_enquiries ?? '—'}
          </div>
          <div className="text-[11px] text-brand-text-secondary">Require follow-up</div>
        </div>

        <div className="p-5 rounded-2xl bg-brand-dark-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-brand-purple">
            <span className="text-xs font-mono">TOTAL LEADS</span>
            <Inbox className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {stats?.total_enquiries ?? '—'}
          </div>
          <div className="text-[11px] text-brand-text-secondary">Lifetime Enquiries</div>
        </div>

        <div className="p-5 rounded-2xl bg-brand-dark-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-sky-400">
            <span className="text-xs font-mono">BLOG POSTS</span>
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {stats?.published_blogs ?? '—'}
          </div>
          <div className="text-[11px] text-brand-text-secondary">Published Articles</div>
        </div>

        <div className="p-5 rounded-2xl bg-brand-dark-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-mono">TESTIMONIALS</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {stats?.total_testimonials ?? '—'}
          </div>
          <div className="text-[11px] text-brand-text-secondary">Client Reviews</div>
        </div>
      </div>

      {/* Recent Client Enquiries Table */}
      <div className="rounded-3xl bg-brand-dark-card border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-white">
              Recent Project Enquiries
            </h2>
            <p className="text-xs text-brand-text-secondary mt-0.5">
              Latest client submissions directly from the website form.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-mono text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>Manage All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-secondary font-mono">
                <th className="pb-3 font-medium">CLIENT / SENDER</th>
                <th className="pb-3 font-medium">SERVICE REQUESTED</th>
                <th className="pb-3 font-medium">BUDGET</th>
                <th className="pb-3 font-medium">STATUS</th>
                <th className="pb-3 font-medium">DATE</th>
                <th className="pb-3 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stats?.recent_enquiries && stats.recent_enquiries.length > 0 ? (
                stats.recent_enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="font-bold text-white">{enq.full_name}</div>
                      <div className="text-brand-text-secondary text-[11px]">{enq.email}</div>
                    </td>
                    <td className="py-4 text-brand-cyan font-medium">
                      {enq.service_required || 'General'}
                    </td>
                    <td className="py-4 text-brand-text-secondary font-mono">
                      {enq.estimated_budget || 'N/A'}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${
                          enq.status === 'New'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : enq.status === 'Contacted'
                            ? 'bg-brand-blue/10 text-brand-cyan border border-brand-blue/20'
                            : enq.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-white/5 text-brand-text-secondary'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-4 text-brand-text-secondary font-mono">
                      {enq.created_at ? enq.created_at.split(' ')[0] : 'Today'}
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 font-medium text-[11px] transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-brand-text-secondary">
                    No inquiries received yet. Submit a test inquiry on the Contact page!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Administrative Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/projects"
          className="p-5 rounded-2xl bg-brand-dark-card border border-white/5 hover:border-brand-blue/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
              Portfolio Projects
            </div>
            <div className="text-xs text-brand-text-secondary mt-1">
              Add case studies, upload screenshots
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-brand-text-secondary group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/admin/settings"
          className="p-5 rounded-2xl bg-brand-dark-card border border-white/5 hover:border-brand-blue/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
              Homepage Content
            </div>
            <div className="text-xs text-brand-text-secondary mt-1">
              Update Hero, Tagline, Phone, Email
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-brand-text-secondary group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/admin/enquiries"
          className="p-5 rounded-2xl bg-brand-dark-card border border-white/5 hover:border-brand-blue/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
              Export Inquiries
            </div>
            <div className="text-xs text-brand-text-secondary mt-1">
              Download CSV report for CRM sync
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-brand-text-secondary group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
};

