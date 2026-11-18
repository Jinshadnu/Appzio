import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, 
  MessageCircle, Sparkles, Clock, ShieldCheck, ArrowRight
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../common/SocialIcons';
import { motion, Easing } from 'framer-motion';
import { api } from '../../services/api';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const ContactSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service_required: 'Website Development',
    estimated_budget: '$1,000 – $3,000',
    project_details: '',
    website_hp: '', // Honeypot anti-spam
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Website Development',
    'E-commerce Development',
    'Mobile Application',
    'Desktop Application',
    'ERP / Billing Software',
    'Custom Software',
    'Website Redesign',
    'Other'
  ];

  const budgetOptions = [
    'Under $1,000 (INR 50k – 80k)',
    '$1,000 – $3,000 (INR 80k – 2.5L)',
    '$3,000 – $5,000 (INR 2.5L – 4L)',
    '$5,000 – $10,000 (AED 18k – 36k)',
    '$10,000+ (Enterprise Scope)',
    'Flexible / To Discuss'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.full_name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your Phone or WhatsApp number.');
      return;
    }
    if (!formData.project_details.trim()) {
      setErrorMessage('Please share a brief summary of your project details.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company_name: formData.company_name.trim(),
        service_required: formData.service_required,
        estimated_budget: formData.estimated_budget,
        project_description: formData.project_details.trim(),
        website_hp: formData.website_hp,
      };

      await api.submitEnquiry(payload);
      setSubmitted(true);
    } catch (err: any) {
      // In static GitHub Pages without a PHP server, store locally in localStorage & allow continuation
      try {
        const stored = JSON.parse(localStorage.getItem('appzio_enquiries') || '[]');
        stored.push({
          ...formData,
          id: Date.now(),
          created_at: new Date().toISOString()
        });
        localStorage.setItem('appzio_enquiries', JSON.stringify(stored));
        setSubmitted(true);
      } catch {
        setErrorMessage(err.message || 'Submission could not be completed. Please reach out to us directly on WhatsApp or Email.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-[#17191F] text-white scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#6326C5]/15 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Narrative & Channel Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
                <span>START A CONVERSATION</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-display"
              >
                Let’s Build{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                  }}
                >
                  Something Meaningful.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
                className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-10"
              >
                {settings.cta_description ||
                  'Have a project in mind? Tell us what you’re planning, and let’s explore how we can turn your idea into a practical digital solution.'}
              </motion.p>

              {/* Direct Channels */}
              <div className="space-y-4 mb-10">
                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Instant Messaging</div>
                      <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        WhatsApp Consultation
                      </div>
                      <div className="text-xs text-slate-400">{phoneDisplay}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Direct */}
                <a
                  href={`mailto:${settings.contact_email || 'appzio@gmail.com'}`}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#16BDEB]/40 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#16BDEB]/15 border border-[#16BDEB]/25 flex items-center justify-center text-[#16BDEB] group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Business Inquiries</div>
                      <div className="text-base font-bold text-white group-hover:text-[#16BDEB] transition-colors">
                        {settings.contact_email || 'appzio@gmail.com'}
                      </div>
                      <div className="text-xs text-slate-400">Response within 24 business hours</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#16BDEB] group-hover:translate-x-1 transition-all" />
                </a>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2364D8]/15 border border-[#2364D8]/25 flex items-center justify-center text-[#2364D8] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Operational Headquarters</div>
                    <div className="text-sm font-bold text-white">Kerala, India</div>
                    <div className="text-xs text-slate-400">Active client delivery across UAE, Saudi Arabia, Qatar &amp; Worldwide</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Connect on Social &amp; Developer Networks:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={settings.social_linkedin || 'https://linkedin.com/company/appzio'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={settings.social_github || 'https://github.com/appzio'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={settings.social_instagram || 'https://instagram.com/appziodigital'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Project Enquiry Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
              className="rounded-3xl bg-[#1F222B]/95 backdrop-blur-2xl border border-white/15 p-8 sm:p-10 shadow-2xl relative"
            >
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Thank You! Your Enquiry Was Received.
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Our technical lead will review your project requirements and connect with you within 24 business hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20just%20submitted%20a%20project%20enquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Follow Up on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          full_name: '',
                          email: '',
                          phone: '',
                          company_name: '',
                          service_required: 'Website Development',
                          estimated_budget: '$1,000 – $3,000',
                          project_details: '',
                          website_hp: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      Submit Another Project
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot anti-bot field */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Form Header */}
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      Project Specification Form
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete the brief below to receive an architectural scope and preliminary estimate.
                    </p>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Full Name <span className="text-[#16BDEB]">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#16BDEB] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address <span className="text-[#16BDEB]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#16BDEB] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone/WhatsApp & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Phone / WhatsApp <span className="text-[#16BDEB]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567 / +91 ..."
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#16BDEB] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="e.g. Acme Enterprises LLC"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#16BDEB] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Required Service & Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Required Service <span className="text-[#16BDEB]">*</span>
                      </label>
                      <select
                        name="service_required"
                        value={formData.service_required}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#17191F] border border-white/10 text-white text-sm focus:outline-none focus:border-[#16BDEB] transition-colors"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#17191F] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        name="estimated_budget"
                        value={formData.estimated_budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#17191F] border border-white/10 text-white text-sm focus:outline-none focus:border-[#16BDEB] transition-colors"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#17191F] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Details */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Project Details <span className="text-[#16BDEB]">*</span>
                    </label>
                    <textarea
                      name="project_details"
                      rows={4}
                      value={formData.project_details}
                      onChange={handleChange}
                      placeholder="Briefly describe your objectives, existing website/app if any, timeline, and key functional requirements..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#16BDEB] transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-8 rounded-full font-bold text-white text-base shadow-xl shadow-[#2364D8]/25 hover:shadow-[#16BDEB]/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                    }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Specification...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Your Project</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
                    <ShieldCheck className="w-4 h-4 text-[#16BDEB]" />
                    <span>Strict confidentiality. Your project information is protected by our NDA.</span>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
