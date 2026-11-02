import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, 
  MessageCircle, Globe, Sparkles, Clock, ShieldCheck 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { api } from '../../services/api';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: easeOut },
});

export const ContactSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    additional_information: '',
    website_hp: '', // Honeypot anti-spam
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (!formData.first_name.trim()) {
      setErrorMessage('Please enter your first name.');
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

    try {
      setSubmitting(true);
      const payload = {
        full_name: `${formData.first_name.trim()} ${formData.last_name.trim()}`.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        project_description: formData.additional_information.trim() || formData.address.trim() || 'Website inquiry through Contact Us section.',
        website_hp: formData.website_hp,
      };

      await api.submitEnquiry(payload);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-28 bg-white relative overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#5221B5]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2365E8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header (Matching Reference H2: Contact Us) */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-mono font-bold text-[#5221B5] tracking-widest uppercase">
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2 
            {...fadeUp(0.08)} 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#191923]"
          >
            Contact&nbsp;
            <span className="bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] bg-clip-text text-transparent">
              Us.
            </span>
          </motion.h2>

          <motion.p 
            {...fadeUp(0.14)} 
            className="text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Let's discuss how APPZIO can help engineer your next digital solution. Reach out and our team will get back to you within 24 hours.
          </motion.p>
        </div>

        {/* 2-Column Contact Layout (Matching Reference Structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Business Details & Location */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display text-[#191923]">
                Start a Conversation
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether you have a concrete product specification or just an early concept, we are here to provide clear technical direction and transparent execution timelines.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-5 pt-2">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#5221B5] flex items-center justify-center shrink-0 border border-purple-100 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Business Location
                  </h4>
                  <p className="text-base font-bold text-[#191923] mt-0.5">
                    {settings.address || 'Kerala, India'}
                  </p>
                  <p className="text-xs text-slate-500">Worldwide Client Delivery</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2365E8] flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Direct Phone &amp; WhatsApp
                  </h4>
                  <a
                    href={`tel:${phoneClean}`}
                    className="text-base font-bold text-[#191923] hover:text-[#5221B5] transition-colors block mt-0.5"
                  >
                    {phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${phoneClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 font-semibold hover:underline"
                  >
                    Chat directly on WhatsApp →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7435D5] flex items-center justify-center shrink-0 border border-purple-100 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="text-base font-bold text-[#191923] hover:text-[#5221B5] transition-colors block mt-0.5"
                  >
                    {settings.contact_email}
                  </a>
                  <p className="text-xs text-slate-500">Response within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Links (Matching Reference: Follow Us on Socials) */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Follow Us on Socials
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={settings.social_linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#F8F9FD] text-slate-700 hover:text-[#5221B5] hover:bg-purple-50 border border-slate-200 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={settings.social_github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#F8F9FD] text-slate-700 hover:text-[#5221B5] hover:bg-purple-50 border border-slate-200 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={settings.social_instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#F8F9FD] text-slate-700 hover:text-[#5221B5] hover:bg-purple-50 border border-slate-200 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (Matching Exact Reference Fields) */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-[#F8F9FD] border border-slate-200/80 p-8 sm:p-10 shadow-sm relative overflow-hidden">
              
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#191923]">
                    Thanks for submitting!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#191923]">{formData.first_name}</span>. We have received your details and will get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        address: '',
                        additional_information: '',
                        website_hp: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] to-[#5221B5] shadow-md transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot field for anti-spam */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* First Name & Last Name (Matching Reference) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="w-full bg-white border border-slate-200/90 rounded-xl px-4 py-3 text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full bg-white border border-slate-200/90 rounded-xl px-4 py-3 text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone (Matching Reference) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full bg-white border border-slate-200/90 rounded-xl px-4 py-3 text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9526026636"
                        className="w-full bg-white border border-slate-200/90 rounded-xl px-4 py-3 text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Address (Matching Reference Field) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      Address / Location
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="w-full bg-white border border-slate-200/90 rounded-xl px-4 py-3 text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] transition-colors"
                    />
                  </div>

                  {/* Additional Information / Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      Additional Information / Project Details
                    </label>
                    <textarea
                      name="additional_information"
                      rows={4}
                      value={formData.additional_information}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals, required platforms, timeline, or any specific questions..."
                      className="w-full bg-white border border-slate-200/90 rounded-xl p-4 text-sm text-[#191923] placeholder-slate-400 focus:outline-none focus:border-[#5221B5] transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button (Matching Reference: Submit) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-lg shadow-[#5221B5]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

