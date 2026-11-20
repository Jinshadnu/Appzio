import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, ArrowRight, Cpu, 
  Users, TrendingUp, Layers, LifeBuoy, MapPin, 
  ShieldCheck, Globe2, Code2, Terminal, Target,
  Eye, Zap, MessageSquare, Wrench
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

const easeOut: Easing = 'easeOut';

export const About: React.FC = () => {
  const { settings } = useWebsiteData();

  useEffect(() => {
    document.title = 'About Appzio — We Believe Every Great Idea Deserves Powerful Technology';
    window.scrollTo(0, 0);
  }, []);

  const whatMakesUsDifferent = [
    {
      title: 'Direct Technical Collaboration',
      description: 'You communicate directly with senior software architects and UI/UX designers, not non-technical sales middlemen.',
      icon: Terminal,
      color: 'text-[#2364D8]'
    },
    {
      title: '100% Code & IP Ownership',
      description: 'You own every line of code, design asset, and cloud infrastructure credential upon project handover with zero lock-in.',
      icon: ShieldCheck,
      color: 'text-emerald-600'
    },
    {
      title: 'Modern, High-Speed Tech Stacks',
      description: 'Engineered using modern stacks (React, Next.js, Flutter, Node.js, PostgreSQL) avoiding bloated, outdated templates.',
      icon: Cpu,
      color: 'text-[#0284C7]'
    },
    {
      title: 'Conversion-Focused UX',
      description: 'Every layout, typography scale, and CTA path is engineered to establish immediate authority and convert qualified leads.',
      icon: Target,
      color: 'text-[#252B9B]'
    },
    {
      title: 'Multi-Region Expertise',
      description: 'Deep understanding of UAE, GCC (VAT, bilingual Arabic/English, local hosting) and Indian compliance frameworks.',
      icon: Globe2,
      color: 'text-[#6326C5]'
    },
    {
      title: 'Long-Term Support & Reliability',
      description: 'Continuous monitoring, zero-downtime updates, and direct SLA-backed engineer availability for your peace of mind.',
      icon: LifeBuoy,
      color: 'text-amber-600'
    }
  ];

  const developmentSteps = [
    { step: '01', title: 'Discovery & Requirements', desc: 'Deep dive into your business model, customer journeys, technical needs, and timeline targets.' },
    { step: '02', title: 'Architecture & UI/UX Design', desc: 'Bespoke wireframes, interactive Figma prototypes, and robust database schema planning.' },
    { step: '03', title: 'Agile Frontend & Backend Build', desc: 'Clean, type-safe development using React, Flutter, and scalable microservices with weekly staging demos.' },
    { step: '04', title: 'Rigorous Quality Assurance', desc: 'Cross-browser testing, mobile responsive verification, security audits, and load benchmark testing.' },
    { step: '05', title: 'Deployment & Launch', desc: 'Zero-downtime DNS provisioning, SSL encryption, CDN setup, search engine indexing, and database migration.' },
    { step: '06', title: 'Ongoing Support & Optimization', desc: 'Post-launch monitoring, performance tuning, and technical advisory to support business growth.' }
  ];

  return (
    <div className="bg-[#FAFBFE] text-slate-900 min-h-screen pt-28 pb-24 selection:bg-[#2364D8] selection:text-white">
      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden pt-6 pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>ABOUT APPZIO</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-display">
              We Believe Every Great Idea Deserves{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                Powerful Technology.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Appzio is a modern digital engineering and software development brand focused on helping startups, regional leaders, and corporate enterprises across UAE, GCC, India, and worldwide build scalable digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who We Are Editorial Split ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white relative">
              <img
                src={getAssetUrl('/hero-team-hd2.jpg')}
                alt="Appzio Engineering Team"
                className="w-full h-[460px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-900 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2364D8] uppercase mb-1 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Headquartered in Kerala, India</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold font-display text-slate-900">
                  Executing Projects Across UAE, Saudi Arabia, Qatar &amp; Global Markets
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold tracking-wider text-[#2364D8] uppercase">
              WHO WE ARE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
              Technology Architecture Meets Business Thinking.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We bridge the gap between creative visual design, robust systems architecture, and commercial business objectives. Whether engineering a high-converting corporate presence for UAE MEP contractors, an e-commerce platform for literary publishers, or mission-critical billing suites, we build software designed for long-term reliability.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              We don't use generic AI-generated templates or push bloated platforms. Every line of frontend code and backend API is carefully designed for speed, security, and measurable conversion.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-mono text-[#2364D8] font-bold uppercase mb-1">Target Markets</div>
                <div className="text-sm font-semibold text-slate-900">UAE, Saudi Arabia, Qatar, India &amp; Worldwide</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-xs font-mono text-[#252B9B] font-bold uppercase mb-1">Engagement Model</div>
                <div className="text-sm font-semibold text-slate-900">Direct Engineer Collaboration &amp; 100% IP Handover</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Mission & Vision Cards ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2364D8] mb-6 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#2364D8]">OUR MISSION</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4 font-display">
              Empowering Businesses with Reliable, Scalable Software
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To deliver resilient, production-grade digital software and web experiences that eliminate operational friction, elevate customer trust, and generate measurable commercial returns for our partners worldwide.
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-[#0284C7] mb-6 shadow-xs">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0284C7]">OUR VISION</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-4 font-display">
              The Preferred Technology Partner for Growing Enterprises
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To be recognized as a world-class technology partner celebrated for engineering rigor, transparent client relationships, and dependable digital craftsmanship across the Middle East, India, and global markets.
            </p>
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different (6 Points) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 border-t border-slate-200/80">
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold tracking-wider text-[#2364D8] uppercase mb-3">
            COMPETITIVE ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
            What Makes Partnering with Appzio Different.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            We operate with complete engineering transparency, zero hidden lock-ins, and direct access to the developers writing your code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatMakesUsDifferent.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-[#2364D8]/40 hover:shadow-xl transition-all duration-300 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-5">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Our 6-Step Development Approach ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 border-t border-slate-200/80">
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono font-bold tracking-wider text-[#2364D8] uppercase mb-3">
            DEVELOPMENT LIFECYCLE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
            Our 6-Step Engineering Framework
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From initial business exploration through production deployment and SLA support, our structured methodology ensures predictable timelines and zero surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developmentSteps.map((step, sIdx) => (
            <div
              key={sIdx}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow relative"
            >
              <div className="text-2xl font-extrabold font-mono text-[#2364D8] mb-3">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom Project Callout ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E293B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
              COMMENCE YOUR PROJECT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Ready to Build Something Meaningful?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tell us about your project objectives. Our engineering leads will provide a clear scope assessment, architecture recommendation, and phased milestones.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#16BDEB] via-[#2364D8] to-[#6326C5] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
