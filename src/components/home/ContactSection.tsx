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
          id: Date.now(),
          ...formData,
          created_at: new Date().toISOString()
        });
        localStorage.setItem('appzio_enquiries', JSON.stringify(stored));
        setSubmitted(true);
      } catch (localErr) {
        setErrorMessage(err.message || 'Failed to submit inquiry. Please contact us directly via WhatsApp or email.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-white text-slate-900 scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2364D8]/10 blur-[180px]" />
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
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
                <span>START A CONVERSATION</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 font-display"
              >
                Let’s Build{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
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
                className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-10"
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
                  className="p-4 rounded-2xl bg-[#F8F9FD] border border-slate-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">Instant Messaging</div>
                      <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        WhatsApp Consultation
                      </div>
                      <div className="text-xs text-slate-600">{phoneDisplay}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Direct */}
                <a
                  href={`mailto:${settings.contact_email || 'appzio@gmail.com'}`}
                  className="p-4 rounded-2xl bg-[#F8F9FD] border border-slate-200/80 hover:border-[#2364D8]/50 hover:bg-blue-50/40 transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-[#2364D8] group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono">Business Inquiries</div>
                      <div className="text-base font-bold text-slate-900 group-hover:text-[#2364D8] transition-colors">
                        {settings.contact_email || 'appzio@gmail.com'}
                      </div>
                      <div className="text-xs text-slate-500">Response within 24 business hours</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#2364D8] group-hover:translate-x-1 transition-all" />
                </a>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-slate-200/80 flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2364D8] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-mono">Operations Base</div>
                    <div className="text-base font-bold text-slate-900">
                      Kerala, India
                    </div>
                    <div className="text-xs text-slate-500">
                      Delivering to clients across UAE, Saudi Arabia, Qatar &amp; Worldwide
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours & Assurance */}
              <div className="flex items-center gap-6 text-xs text-slate-600 font-mono pt-4 border-t border-slate-200/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2364D8]" />
                  <span>Mon &ndash; Sat &bull; 9:00 AM &ndash; 7:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NDA Protection Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Specification Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-2xl shadow-blue-900/5">
              {submitted ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">
                    Thank You, {formData.full_name}!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                    Your inquiry regarding <strong className="text-slate-900">{formData.service_required}</strong> has been received. Our solutions architect will review your specification and get back to you within 24 business hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20just%20submitted%20a%20project%20inquiry%20for%20${encodeURIComponent(formData.service_required)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Ping Us on WhatsApp for Instant Attention</span>
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
                      className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
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
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                      Project Specification Form
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Complete the brief below to receive an architectural scope and preliminary estimate.
                    </p>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Full Name <span className="text-[#2364D8]">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Email Address <span className="text-[#2364D8]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone/WhatsApp & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone / WhatsApp <span className="text-[#2364D8]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567 / +91 ..."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="e.g. Acme Enterprises LLC"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Required Service & Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Required Service <span className="text-[#2364D8]">*</span>
                      </label>
                      <select
                        name="service_required"
                        value={formData.service_required}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        name="estimated_budget"
                        value={formData.estimated_budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Summary & Requirements */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Details &amp; Target Timeline <span className="text-[#2364D8]">*</span>
                    </label>
                    <textarea
                      name="project_details"
                      rows={4}
                      value={formData.project_details}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals, key features, target launch date, and any reference websites..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2364D8] focus:ring-2 focus:ring-[#2364D8]/20 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-8 rounded-full font-bold text-white text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    style={{
                      background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                    }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Specification...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Specification</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    We treat all communications with absolute commercial confidentiality. Non-Disclosure Agreements (NDAs) are routinely executed upon request.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
