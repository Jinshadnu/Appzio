import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, ArrowRight, Cpu, 
  Users, TrendingUp, Layers, LifeBuoy, MapPin, 
  ShieldCheck, Globe2, Code2, Terminal 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

const easeOut: Easing = 'easeOut';

export const About: React.FC = () => {
  const { settings } = useWebsiteData();

  useEffect(() => {
    document.title = 'About Appzio — Technology Meets Business Thinking';
    window.scrollTo(0, 0);
  }, []);

  const corePillars = [
    {
      title: 'Modern Technology',
      description: 'Built with resilient, production-tested stacks like React, Next.js, Flutter, and scalable API microservices.',
      icon: Cpu,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
    },
    {
      title: 'User-Centred Design',
      description: 'Obsessive attention to typography, frictionless information hierarchy, and intuitive user experiences.',
      icon: Users,
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
    },
    {
      title: 'Business-Focused Development',
      description: 'We prioritize outcomes that drive inquiries, conversions, and measurable business growth for our partners.',
      icon: TrendingUp,
      color: 'text-[#252B9B]',
      iconBg: 'bg-indigo-50 border-indigo-200/80',
    },
    {
      title: 'Scalable Solutions',
      description: 'Architectures engineered to handle traffic spikes, regional data localization, and expanding catalogs smoothly.',
      icon: Layers,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
    },
    {
      title: 'Reliable Support',
      description: 'Direct engineer availability, continuous monitoring, and proactive maintenance for complete peace of mind.',
      icon: LifeBuoy,
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
    }
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen pt-32 pb-24">
      {/* ── Page Hero Header ── */}
      <section className="relative overflow-hidden mb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>WHO WE ARE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              Technology Meets{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                Business Thinking.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Appzio is a digital solutions brand focused on helping businesses establish, improve and scale their digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Editorial Composition & Presence ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              <img
                src={getAssetUrl('/hero-team-hd2.jpg')}
                alt="Appzio Development Team"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-900 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2364D8] uppercase mb-1 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Headquartered in Kerala, India</span>
                </div>
                <h4 className="text-base font-bold font-display text-slate-900">
                  Executing Projects Across UAE, Saudi Arabia, Qatar &amp; Worldwide
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Built on Craftsmanship &amp; Engineering Rigor
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We combine thoughtful design, modern development practices and business-oriented technology to create websites, applications and software solutions that solve real-world problems.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Whether architecting a corporate portal for UAE MEP contractors, an e-commerce platform for literary publishers, or bespoke enterprise management dashboards, our philosophy is anchored in long-term reliability and zero unnecessary complexity.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-slate-200">
                <div className="text-xs font-mono text-[#2364D8] font-bold uppercase mb-1">Target Markets</div>
                <div className="text-sm font-semibold text-slate-900">UAE, Saudi Arabia, Qatar, India &amp; Worldwide</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-slate-200">
                <div className="text-xs font-mono text-[#252B9B] font-bold uppercase mb-1">Engagement Model</div>
                <div className="text-sm font-semibold text-slate-900">Direct Engineer Collaboration &amp; 100% IP Handover</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5 Core Pillars ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-[#2364D8] uppercase font-bold tracking-wider mb-2">
            GUIDING PRINCIPLES
          </div>
          <h2 className="text-3xl font-bold font-display text-slate-900">
            The Five Pillars of Every Appzio Solution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-3xl bg-[#F8F9FD] border border-slate-200/90 hover:bg-white hover:border-[#2364D8]/40 hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} border flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick CTA Box */}
          <div className="p-7 rounded-3xl bg-blue-50/70 border border-blue-200/80 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono text-[#2364D8] font-bold uppercase">Ready to partner?</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 font-display">
                Let’s Discuss Your Next Initiative
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Connect directly with our engineering team for technical feasibility and delivery timeline planning.
              </p>
            </div>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg shadow-blue-500/25"
              style={{ background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)' }}
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
