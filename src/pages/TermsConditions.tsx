import React, { useEffect } from 'react';
import { Scale } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const TermsConditions: React.FC = () => {
  const { settings } = useWebsiteData();

  useEffect(() => {
    document.title = 'Terms & Conditions — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-card">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple uppercase font-mono">
          <Scale className="w-3.5 h-3.5" />
          <span>TERMS OF SERVICE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-brand-text">Terms & Conditions</h1>
        <p className="text-xs font-mono text-brand-text-muted">Effective Date: November 2026</p>

        <div className="space-y-6 text-sm sm:text-base text-brand-text-muted leading-relaxed pt-4 border-t border-slate-100">
          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">1. Scope of Services</h2>
            <p>
              APPZIO provides custom software engineering, website development, mobile application programming, desktop software implementation, and UI/UX consulting services. Detailed project specifications, deliverables, and timelines are codified in individual Statements of Work (SOW).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">2. Intellectual Property & Transfer</h2>
            <p>
              Upon final settlement of invoice milestones, APPZIO transfers all worldwide copyrights, source code, design assets, and intellectual property rights directly to the client with zero royalty claims or recurring license fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">3. Warranty & Bug-Fix Period</h2>
            <p>
              Every production delivery includes a minimum 30 to 90-day complimentary post-launch warranty period to rectify any bugs or inconsistencies with the agreed technical specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold font-display text-brand-text">4. Jurisdiction</h2>
            <p>
              Agreements are governed by international commercial arbitration laws or the laws of the jurisdiction agreed upon in the master client contract.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
