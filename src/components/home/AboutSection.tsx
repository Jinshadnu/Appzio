import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Award } from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: easeOut },
});

export const AboutSection: React.FC = () => {
  const { settings } = useWebsiteData();

  return (
    <section id="about" className="py-28 relative overflow-hidden bg-white scroll-mt-20">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#5221B5]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2365E8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading Tag */}
        <motion.div {...fadeUp(0)} className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-mono font-bold text-[#5221B5] tracking-widest uppercase">
            ABOUT US
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#191923]">
            Dedicated to Crafting&nbsp;
            <span className="bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] bg-clip-text text-transparent">
              Digital Excellence.
            </span>
          </h2>
        </motion.div>

        {/* Two-Column Layout (Matching Reference Website) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Supporting Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 group">
              <img
                src="/hero-team-hd2.jpg"
                alt="APPZIO Digital Agency Team"
                className="w-full h-[450px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-[#191923] shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#5221B5] uppercase tracking-wider">
                    APPZIO DEVELOPMENT TEAM
                  </div>
                  <div className="text-sm font-bold text-[#191923] mt-0.5">
                    Kerala, India • Global Client Delivery
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5221B5] flex items-center justify-center font-bold font-mono text-sm">
                  100%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Company Story & Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#7435D5] uppercase">
                WHO WE ARE &amp; WHAT WE DO
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#191923] leading-snug">
                Turning ambitious business concepts into resilient, scalable digital engines.
              </h3>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {settings.about_description ||
                'APPZIO is a digital development brand focused on creating innovative, scalable, and user-friendly digital solutions. We combine technical expertise with thoughtful design to turn business ideas into practical digital products.'}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Based in Kerala, India, our seasoned full-stack engineers and UI architects craft custom web applications, cross-platform mobile apps, and robust enterprise solutions. We believe in direct communication, zero technical debt, and 100% client intellectual property ownership.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                'Enterprise-grade code audits & security',
                'Transparent agile sprint roadmaps',
                '100% client code & IP ownership',
                'Post-launch warranty & SLA support',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-md shadow-[#5221B5]/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#191923] hover:text-[#5221B5] transition-colors"
              >
                Get In Touch →
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
