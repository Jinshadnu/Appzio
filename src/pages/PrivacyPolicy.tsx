import React, { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const PrivacyPolicy: React.FC = () => {
  const { settings } = useWebsiteData();

  useEffect(() => {
    document.title = 'Privacy Policy — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-card">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple uppercase font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LEGAL COMPLIANCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-text">Privacy Policy</h1>
        <p className="text-xs font-mono text-brand-text-muted">Effective Date: November 2026</p>

        <div className="space-y-6 text-sm sm:text-base text-brand-text-muted leading-relaxed pt-4 border-t border-slate-100">
          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">1. Introduction</h2>
            <p>
              APPZIO ("we", "our", or "us") respects your privacy and is committed to safeguarding personal data in accordance with international standards, including GDPR and UAE Data Protection laws. This policy outlines how we collect, use, and protect information when you visit our website or engage our software development services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">2. Information We Collect</h2>
            <p>
              We collect information you explicitly submit through our contact and project inquiry forms, including your full name, email address, phone number, company name, estimated budget, and project technical specifications. We also collect non-identifiable browser telemetry to optimize site performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">3. Non-Disclosure & Code Ownership</h2>
            <p>
              We adhere to strict confidentiality. All proprietary source code, wireframes, business workflows, and API architectures created during a client engagement are 100% owned by the client upon milestone payment settlement. We sign binding Mutual Non-Disclosure Agreements (NDAs) prior to project inception.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">4. Data Security</h2>
            <p>
              We implement industry-standard encryption, SSL/TLS protocols, rate-limiting, and restricted-access storage to protect your data against unauthorized interception or breach.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">5. Contact Information</h2>
            <p>
              For inquiries regarding our data practices or to request deletion of your records, contact our Data Protection Officer at: <span className="text-brand-purple font-mono font-medium">{settings.contact_email}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
