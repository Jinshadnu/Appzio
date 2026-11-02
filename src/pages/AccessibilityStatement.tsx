import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const AccessibilityStatement: React.FC = () => {
  const { settings } = useWebsiteData();

  useEffect(() => {
    document.title = 'Accessibility Statement — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 pb-20 bg-[#F8F9FD] min-h-screen">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-[#5221B5] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Content Card */}
        <div className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#5221B5] tracking-widest uppercase">
              COMPLIANCE &amp; ACCESSIBILITY
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#191923]">
              Accessibility Statement
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
            <p>
              At <strong>APPZIO</strong>, we are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards (WCAG 2.1 Level AA).
            </p>

            <h3 className="text-lg font-bold font-display text-[#191923] pt-2">
              Measures to Support Accessibility
            </h3>
            <ul className="space-y-2.5">
              {[
                'Include accessibility throughout our internal software design guidelines.',
                'Ensure sufficient color contrast ratios across dark and light components.',
                'Provide descriptive text alternatives (alt attributes) for visual assets.',
                'Support full keyboard navigation and logical tab indexing.',
                'Regularly review code for semantic HTML structure and ARIA landmark roles.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold font-display text-[#191923] pt-2">
              Feedback &amp; Assistance
            </h3>
            <p>
              We welcome your feedback on the accessibility of the APPZIO website and digital solutions. If you encounter any accessibility barriers or need assistance, please contact our support team in Kerala, India:
            </p>

            <div className="p-5 rounded-2xl bg-[#F8F9FD] border border-slate-200 space-y-2 text-sm font-medium text-[#191923]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5221B5]" />
                <a href={`mailto:${settings.contact_email}`} className="hover:underline">
                  {settings.contact_email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2365E8]" />
                <a href={`tel:${settings.contact_phone}`} className="hover:underline">
                  {settings.contact_phone}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

