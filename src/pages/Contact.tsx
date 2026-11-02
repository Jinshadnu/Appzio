import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const Contact: React.FC = () => {
  const { settings } = useWebsiteData();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service_required: preselectedService || 'Website Development',
    estimated_budget: '$5,000 – $15,000',
    project_timeline: '1 – 2 Months',
    project_description: '',
    website_hp: '', // Anti-spam honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = 'Contact & Project Inquiries — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.project_description.trim()) {
      setErrorMessage('Please complete all required fields (Full Name, Email, and Project Description).');
      return;
    }

    try {
      setSubmitting(true);
      await api.submitEnquiry(formData);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again or chat with us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const phoneClean = (settings.contact_whatsapp || settings.contact_phone || '+919526026636').replace(/[^0-9]/g, '');

  return (
    <div className="pt-32 pb-20 bg-[#F8F9FD]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple tracking-wider uppercase font-mono mb-4">
          LET'S COLLABORATE
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-brand-text tracking-tight leading-tight max-w-3xl mx-auto">
          Have an Idea? Let's Build <span className="text-gradient">Something Impactful.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-text-muted max-w-2xl mx-auto">
          Share your project details with our senior team. We will analyze your specifications, evaluate the technical architecture, and get back to you with a milestone breakdown within 24 hours.
        </p>
      </section>

      {/* Main Grid: Form + Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-card relative overflow-hidden">
              
              {submitted ? (
                <div className="text-center py-16 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-brand-text">Project Enquiry Received</h3>
                  <p className="text-sm text-brand-text-muted max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-brand-text font-semibold">{formData.full_name}</span>. Our lead architects have received your enquiry and will review your requirements. Expect an email or WhatsApp follow-up within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          full_name: '',
                          email: '',
                          phone: '',
                          company_name: '',
                          service_required: 'Website Development',
                          estimated_budget: '$5,000 – $15,000',
                          project_timeline: '1 – 2 Months',
                          project_description: '',
                          website_hp: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-brand-purple bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-xs font-mono text-brand-purple uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Project Request Form</span>
                    </span>
                    <span className="text-[11px] text-brand-text-muted">* Required fields</span>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot field hidden from users */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Miller"
                        className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9526026636"
                        className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2">
                        Company or Brand Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="e.g. Acme Innovations"
                        className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Required */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-2">
                      Primary Service Required *
                    </label>
                    <select
                      name="service_required"
                      value={formData.service_required}
                      onChange={handleChange}
                      className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors cursor-pointer"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile Application Development">Mobile Application Development (iOS & Android)</option>
                      <option value="Desktop Application Development">Desktop Application Development</option>
                      <option value="Custom Software Development">Custom Software Development / ERP / CRM</option>
                      <option value="UI/UX Design">UI/UX Design & Prototyping</option>
                      <option value="API Development & Integration">API Development & Integration</option>
                      <option value="Website Maintenance & Support">Website Maintenance & Support</option>
                      <option value="Full-Cycle Partnership">Full-Cycle Digital Transformation</option>
                    </select>
                  </div>

                  {/* Row 4: Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2">
                        Estimated Budget (USD)
                      </label>
                      <select
                        name="estimated_budget"
                        value={formData.estimated_budget}
                        onChange={handleChange}
                        className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors cursor-pointer"
                      >
                        <option value="< $5,000">Less than $5,000</option>
                        <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                        <option value="$15,000 – $30,000">$15,000 – $30,000</option>
                        <option value="$30,000+">$30,000+ (Enterprise)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-text mb-2">
                        Target Timeline
                      </label>
                      <select
                        name="project_timeline"
                        value={formData.project_timeline}
                        onChange={handleChange}
                        className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors cursor-pointer"
                      >
                        <option value="Urgent (< 1 Month)">Urgent (&lt; 1 Month)</option>
                        <option value="1 – 2 Months">1 – 2 Months</option>
                        <option value="2 – 4 Months">2 – 4 Months</option>
                        <option value="Ongoing Long-Term">Ongoing Long-Term Partnership</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-text mb-2">
                      Project Description & Requirements *
                    </label>
                    <textarea
                      name="project_description"
                      value={formData.project_description}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Please tell us about your project vision, target users, desired features, or reference websites..."
                      className="w-full bg-[#F8F9FD] border border-slate-200 rounded-xl px-4 py-3 text-sm text-brand-text placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-8 rounded-full text-sm font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow hover:shadow-glow-cyan transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                    >
                      {submitting ? (
                        <span>Encrypting & Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Proposal Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6 text-[11px] text-brand-text-muted pt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" /> 100% Privacy & NDA
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-blue" /> 24h Guaranteed Reply
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Contact Details & Direct Connect (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50/50 border border-emerald-200 p-8 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-text">Need an Instant Consultation?</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">
                Connect directly with our technical lead on WhatsApp for rapid scoping questions, emergency maintenance, or real-time inquiries.
              </p>
              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md transition-all hover:scale-105"
              >
                <span>Chat on WhatsApp</span>
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Contact Details Card */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 space-y-6 shadow-card">
              <h3 className="text-lg font-bold font-display text-brand-text pb-3 border-b border-slate-100">
                Direct Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-purple flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-brand-text-muted">Official Inquiries Email</span>
                    <a href={`mailto:${settings.contact_email}`} className="block text-brand-text font-semibold hover:text-brand-purple transition-colors">
                      {settings.contact_email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-brand-text-muted">Phone / Direct Line</span>
                    <a href={`tel:${settings.contact_phone}`} className="block text-brand-text font-semibold hover:text-brand-blue transition-colors">
                      {settings.contact_phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-brand-violet flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-brand-text-muted">Regional Presence</span>
                    <p className="text-brand-text font-medium text-xs leading-relaxed mt-0.5">
                      {settings.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* International Hours */}
            <div className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-2 text-xs text-brand-text-muted shadow-card">
              <div className="flex justify-between font-medium">
                <span>Working Hours:</span>
                <span className="text-brand-text font-mono font-semibold">Mon – Sat: 09:00 – 19:00 (GMT+4 / GST)</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Emergency Support:</span>
                <span className="text-emerald-600 font-mono font-semibold">24/7 SLA Backed</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
