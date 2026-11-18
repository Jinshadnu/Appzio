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
      color: 'text-[#16BDEB]',
    },
    {
      title: 'User-Centred Design',
      description: 'Obsessive attention to typography, frictionless information hierarchy, and intuitive user experiences.',
      icon: Users,
      color: 'text-[#2364D8]',
    },
    {
      title: 'Business-Focused Development',
      description: 'We prioritize outcomes that drive inquiries, conversions, and measurable business growth for our partners.',
      icon: TrendingUp,
      color: 'text-[#6326C5]',
    },
    {
      title: 'Scalable Solutions',
      description: 'Architectures engineered to handle traffic spikes, regional data localization, and expanding catalogs smoothly.',
      icon: Layers,
      color: 'text-[#16BDEB]',
    },
    {
      title: 'Reliable Support',
      description: 'Direct engineer availability, continuous monitoring, and proactive maintenance for complete peace of mind.',
      icon: LifeBuoy,
      color: 'text-[#2364D8]',
    }
  ];

  return (
    <div className="bg-[#17191F] text-white min-h-screen pt-32 pb-24">
      {/* ── Page Hero Header ── */}
      <section className="relative overflow-hidden mb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
              <span>WHO WE ARE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Technology Meets{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                }}
              >
                Business Thinking.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Appzio is a digital solutions brand focused on helping businesses establish, improve and scale their digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Editorial Composition & Presence ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#1F222B]">
              <img
                src={getAssetUrl('/hero-team-hd2.jpg')}
                alt="Appzio Development Team"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17191F] via-[#17191F]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#1F222B]/95 backdrop-blur-xl border border-white/10 text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-[#16BDEB] uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Headquartered in Kerala, India</span>
                </div>
                <h4 className="text-base font-bold font-display text-white">
                  Executing Projects Across UAE, Saudi Arabia, Qatar &amp; Worldwide
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-white font-display">
              Built on Craftsmanship &amp; Engineering Rigor
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              We combine thoughtful design, modern development practices and business-oriented technology to create websites, applications and software solutions that solve real-world problems.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Whether architecting a corporate portal for UAE MEP contractors, an e-commerce platform for literary publishers, or bespoke enterprise management dashboards, our philosophy is anchored in long-term reliability and zero unnecessary complexity.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-mono text-[#16BDEB] font-bold uppercase mb-1">Target Markets</div>
                <div className="text-sm font-semibold text-white">UAE, Saudi Arabia, Qatar, India &amp; Worldwide</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-mono text-[#2364D8] font-bold uppercase mb-1">Engagement Model</div>
                <div className="text-sm font-semibold text-white">Direct Engineer Collaboration &amp; 100% IP Handover</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5 Core Pillars ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-[#16BDEB] uppercase font-bold tracking-wider mb-2">
            GUIDING PRINCIPLES
          </div>
          <h2 className="text-3xl font-bold font-display text-white">
            The Five Pillars of Every Appzio Solution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-3xl bg-[#1F222B]/85 border border-white/10 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6">
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick CTA Box */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-[#1F222B] to-[#242733] border border-white/15 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono text-[#16BDEB] font-bold uppercase">Ready to partner?</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3 font-display">
                Let’s Discuss Your Next Initiative
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Connect directly with our engineering team for technical feasibility and delivery timeline planning.
              </p>
            </div>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)' }}
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
