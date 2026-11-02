import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const CTASection: React.FC = () => {
  const { settings } = useWebsiteData();
  const phoneClean = (settings.contact_whatsapp || settings.contact_phone || '+919526026636').replace(/[^0-9]/g, '');

  return (
    <section className="py-24 relative overflow-hidden bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-dark-card via-brand-dark to-brand-dark-card border border-white/10 p-8 sm:p-14 lg:p-20 text-center shadow-2xl overflow-hidden">
          
          {/* Logo Matching Ambient Glows */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-brand-gradient opacity-25 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-cyan tracking-wider uppercase font-mono shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span>START YOUR DIGITAL PROJECT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              Let's Build Something <span className="text-gradient">Great Together.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-2xl mx-auto">
              {settings.cta_description ||
                'Whether you need a high-converting website, cross-platform mobile application, or custom software, let’s turn your vision into a powerful digital solution.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow hover:shadow-glow-cyan transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start A Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20would%20like%20to%20discuss%20a%20new%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-blue transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <p className="text-xs text-brand-text-secondary pt-4 font-mono">
              Kerala, India • Quick Response Within 24 Hours • Strict NDA Protection
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
