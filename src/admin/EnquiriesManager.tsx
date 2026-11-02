import React, { useState, useEffect } from 'react';
import { Download, Search, Trash2, Eye, Mail, Phone, Calendar, Clock, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { Enquiry } from '../types';
import { api } from '../services/api';

export const EnquiriesManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await api.getEnquiries({
        status: selectedStatus === 'All' ? undefined : selectedStatus,
        search: search.trim() ? search.trim() : undefined,
      });
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadEnquiries();
  };

  const openDetails = (enq: Enquiry) => {
    setActiveEnquiry(enq);
    setInternalNotes(enq.internal_notes || '');
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!activeEnquiry) return;
    try {
      setUpdatingStatus(true);
      await api.updateEnquiryStatus(activeEnquiry.id, {
        status: newStatus,
        internal_notes: internalNotes,
      });
      setActiveEnquiry({ ...activeEnquiry, status: newStatus, internal_notes: internalNotes });
      await loadEnquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeEnquiry) return;
    try {
      setUpdatingStatus(true);
      await api.updateEnquiryStatus(activeEnquiry.id, {
        status: activeEnquiry.status,
        internal_notes: internalNotes,
      });
      setActiveEnquiry({ ...activeEnquiry, internal_notes: internalNotes });
      await loadEnquiries();
      alert('Internal notes updated.');
    } catch (err: any) {
      alert(err.message || 'Failed to update notes');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await api.deleteEnquiry(id);
      if (activeEnquiry?.id === id) {
        setIsDetailModalOpen(false);
        setActiveEnquiry(null);
      }
      await loadEnquiries();
    } catch (err: any) {
      alert(err.message || 'Failed to delete enquiry');
    }
  };

  const handleExportCsv = () => {
    const token = localStorage.getItem('appzio_admin_token') || '';
    window.open(`/api/enquiries/export?token=${token}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Client Inquiries</h1>
          <p className="text-xs text-brand-text-secondary mt-0.5">
            Review incoming project briefs, manage follow-up states, and add internal notes.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-brand-cyan" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedStatus === status
                  ? 'bg-brand-gradient text-white shadow-glow-sm'
                  : 'bg-brand-dark-card border border-white/10 text-brand-text-secondary hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-brand-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="w-full bg-brand-dark-card border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-brand-text-secondary focus:outline-none focus:border-brand-blue"
          />
        </form>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-3xl bg-brand-dark-card border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-secondary font-mono bg-white/[0.01]">
                <th className="p-4 font-medium">DATE</th>
                <th className="p-4 font-medium">SENDER</th>
                <th className="p-4 font-medium">COMPANY</th>
                <th className="p-4 font-medium">SERVICE</th>
                <th className="p-4 font-medium">BUDGET</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-brand-text-secondary font-mono whitespace-nowrap">
                    {enq.created_at ? enq.created_at.split(' ')[0] : 'Today'}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{enq.full_name}</div>
                    <div className="text-brand-text-secondary text-[11px]">{enq.email}</div>
                  </td>
                  <td className="p-4 text-brand-text-secondary">
                    {enq.company_name || '—'}
                  </td>
                  <td className="p-4 text-brand-cyan font-medium">
                    {enq.service_required}
                  </td>
                  <td className="p-4 font-mono text-white/80">
                    {enq.estimated_budget}
                  </td>
                  <td className="p-4">
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
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openDetails(enq)}
                      className="px-2.5 py-1 rounded-lg bg-brand-blue/10 text-brand-cyan hover:bg-brand-blue/20 text-xs font-semibold"
                    >
                      View Brief
                    </button>
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {enquiries.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-brand-text-secondary">
                    No enquiries found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Notes Modal */}
      {isDetailModalOpen && activeEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-dark-card border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">
                  ENQUIRY ID #{activeEnquiry.id}
                </span>
                <h2 className="text-xl font-bold font-display text-white">
                  {activeEnquiry.full_name}
                </h2>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-lg text-brand-text-secondary hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Client Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-brand-dark border border-white/5 text-xs">
              <div>
                <span className="text-brand-text-secondary">Email</span>
                <a href={`mailto:${activeEnquiry.email}`} className="block text-white font-medium truncate mt-0.5 hover:text-brand-cyan">
                  {activeEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-brand-text-secondary">Phone</span>
                <div className="text-white font-medium mt-0.5">{activeEnquiry.phone || 'N/A'}</div>
              </div>
              <div>
                <span className="text-brand-text-secondary">Budget</span>
                <div className="text-brand-cyan font-mono font-medium mt-0.5">{activeEnquiry.estimated_budget}</div>
              </div>
              <div>
                <span className="text-brand-text-secondary">Timeline</span>
                <div className="text-white font-mono mt-0.5">{activeEnquiry.project_timeline}</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-brand-text-secondary uppercase">Project Description:</span>
              <div className="p-4 rounded-2xl bg-brand-dark border border-white/5 text-sm text-white leading-relaxed whitespace-pre-line">
                {activeEnquiry.project_description}
              </div>
            </div>

            {/* Status Management */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-brand-text-secondary uppercase">Change Enquiry Status:</span>
              <div className="flex flex-wrap gap-2">
                {['New', 'Contacted', 'In Progress', 'Completed', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    disabled={updatingStatus}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      activeEnquiry.status === st
                        ? 'bg-brand-gradient text-white shadow-glow-sm'
                        : 'bg-brand-dark border border-white/10 text-brand-text-secondary hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-brand-text-secondary uppercase">Internal Agency Notes:</span>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add private notes, quotes, or follow-up details here..."
                className="w-full bg-brand-dark border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(activeEnquiry.id)}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Delete this enquiry
                </button>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={updatingStatus}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-blue hover:bg-brand-blue/80"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

