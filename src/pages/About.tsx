import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Globe2, ShieldCheck, HeartHandshake,
  Layers, Award, CheckCircle2, Users, Rocket, Star,
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { CTASection } from '../components/home/CTASection';

const easeOut: Easing = 'easeOut';
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: easeOut },
});

export const About: React.FC = () => {
  const { settings } = useWebsiteData();

  useEffect(() => {
    document.title = 'About Us — APPZIO Digital Agency';
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Award,
      color: 'from-[#2365E8] to-[#5221B5]',
      title: 'Craftsmanship Over Volume',
      desc: 'We purposefully take on a curated number of projects, allowing senior engineers to invest obsessive attention into every architectural decision.',
    },
    {
      icon: ShieldCheck,
      color: 'from-[#5221B5] to-[#7435D5]',
      title: 'Radical Transparency',
      desc: 'No black-box engineering. You get direct access to git repositories, milestone roadmaps, staging environments, and daily async updates.',
    },
    {
      icon: HeartHandshake,
      color: 'from-[#7435D5] to-[#16B9E8]',
      title: 'Client Partnership',
      desc: 'We are an extension of your founding team. Your business objectives, user acquisition, and financial ROI drive every line of code we ship.',
    },
    {
      icon: Layers,
      color: 'from-[#16B9E8] to-[#2365E8]',
      title: 'End-to-End Ownership',
      desc: 'From Figma prototypes and schema design to store releases and automated CI/CD deployments — we handle the complete product lifecycle.',
    },
  ];

  const stats = [
    { icon: Rocket,  value: '50+',    label: 'Projects Delivered' },
    { icon: Users,   value: '40+',    label: 'Happy Clients' },
    { icon: Globe2,  value: '4+',     label: 'Countries Served' },
    { icon: Star,    value: '4.9★',   label: 'Average Rating' },
  ];

  const codeLines = [
    { color: 'text-emerald-500',  text: '✓  Zero technical debt philosophy' },
    { color: 'text-[#5221B5]',    text: '✓  Comprehensive unit & widget tests' },
    { color: 'text-[#2365E8]',    text: '✓  Responsive 320 px → 4K displays' },
    { color: 'text-[#7435D5]',    text: '✓  Documented REST APIs (OpenAPI)' },
    { color: 'text-[#16B9E8]',    text: '✓  CI/CD pipelines & staging envs' },
    { color: 'text-rose-500',     text: '✓  NDA-signed, 100% IP to client' },
  ];

  return (
    <div className="bg-[#F8F9FD]">

      {/* ════════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0c0d14]">
        {/* Background image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/hero-team-hd.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d14]/80 via-[#0c0d14]/60 to-[#0c0d14]" />

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#5221B5]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 text-center px-5 sm:px-8 pt-36 pb-24 max-w-4xl mx-auto">
          <motion.div {...fadeUp(0)} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/80 tracking-widest uppercase font-mono backdrop-blur-sm">
              Our Story &amp; Ethos
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1] mb-6"
          >
            Website &amp; App<br />
            Development in<br />
            <span className="bg-gradient-to-r from-[#16B9E8] via-[#7435D5] to-[#2365E8] bg-clip-text text-transparent">
              Kerala, India.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {settings.about_description ||
              'APPZIO is a digital development brand focused on creating innovative, scalable, and user-friendly digital solutions. We combine technical expertise with thoughtful design to turn business ideas into practical digital products.'}
          </motion.p>

          <motion.div {...fadeUp(0.25)} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-lg shadow-[#5221B5]/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Partner With Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white border border-white/25 hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS ROW
      ════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center py-10 px-6 gap-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2365E8] to-[#7435D5] flex items-center justify-center shadow-md shadow-[#5221B5]/20">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-extrabold font-display bg-gradient-to-r from-[#2365E8] to-[#7435D5] bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          NARRATIVE  (story + code standard)
      ════════════════════════════════════════ */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Story */}
          <motion.div {...fadeUp(0)} className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-bold text-[#5221B5] tracking-widest uppercase font-mono">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#191923] leading-tight">
              Bridging Vision and<br />Technical Precision
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              Founded by seasoned full-stack engineers and UI architects, APPZIO was created to eliminate the friction that plagues traditional outsourcing. Too many businesses were receiving sluggish hybrid apps, unmaintainable code, or designs that failed to convert real customers.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              We took a radically different path: combining modern high-velocity technologies — Flutter, Kotlin, React, and PHP 8+ — with rigorous architectural principles, delivering software that runs smoothly across devices and regions.
            </p>

            {/* Inline metrics */}
            <div className="flex items-center gap-8 pt-4 border-t border-slate-100">
              <div>
                <div className="text-3xl font-extrabold font-display bg-gradient-to-r from-[#2365E8] to-[#7435D5] bg-clip-text text-transparent">100%</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Direct Code Ownership</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <div className="text-3xl font-extrabold font-display text-[#191923]">Global</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Kerala, India &amp; Worldwide</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <div className="text-3xl font-extrabold font-display bg-gradient-to-r from-[#7435D5] to-[#16B9E8] bg-clip-text text-transparent">3+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">Years in Market</div>
              </div>
            </div>
          </motion.div>

          {/* Code Standard card */}
          <motion.div {...fadeUp(0.12)}>
            <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
              <div className="h-2 w-full bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5]" />
              <div className="bg-white p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2365E8] to-[#7435D5] flex items-center justify-center text-white shadow-md">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#191923]">The APPZIO Code Standard</h3>
                    <p className="text-xs text-slate-400">Strict Linting · CI Testing · Zero-Debt Policy</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0c0d14] p-5 space-y-2.5 font-mono text-[13px]">
                  {codeLines.map((line) => (
                    <p key={line.text} className={line.color}>{line.text}</p>
                  ))}
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                  Every project is reviewed against our internal code quality rubric before delivery. We don't ship code we wouldn't be proud to put our name on.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CORE VALUES
      ════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-bold text-[#5221B5] tracking-widest uppercase font-mono mb-5">
              Our Engineering Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#191923] leading-tight">
              Four Pillars That Drive Everything We Build
            </h2>
            <p className="text-base text-slate-500 mt-4 leading-relaxed">
              These aren't marketing bullet points — they are the operating principles ingrained into every team member and every project we deliver.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="group p-7 rounded-3xl bg-[#F8F9FD] border border-slate-100 hover:border-[#5221B5]/25 hover:bg-white hover:shadow-xl transition-all duration-350 space-y-4"
                >
                  <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold font-display text-[#191923]">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GLOBAL DELIVERY BANNER
      ════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          {...fadeUp(0)}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0d14] via-[#1a1035] to-[#0c1628] p-10 sm:p-14"
        >
          {/* Glow orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#5221B5]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-[#2365E8]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2 text-[#16B9E8] text-xs font-mono font-bold tracking-widest uppercase">
                <Globe2 className="w-4 h-4" />
                <span>Worldwide Engagement</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white leading-tight">
                Working with clients across borders and time zones.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you're an ambitious startup in London, an enterprise operator in Riyadh, a growing business in Kerala, or a health-tech platform in Munich — our streamlined communication keeps you completely aligned.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['🇮🇳 Kerala, India', '🇬🇧 UK', '🌍 Europe', '🌐 Global'].map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold backdrop-blur-sm"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-lg shadow-[#5221B5]/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          WHY CHOOSE US  (checklist)
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5221B5]/8 border border-[#5221B5]/20 text-xs font-bold text-[#5221B5] tracking-widest uppercase font-mono mb-5">
              Why Choose APPZIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#191923] leading-tight">
              What makes us different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { title: 'Senior-Only Engineering Team', desc: 'Every project is led by a senior engineer — no juniors doing client-facing development unsupervised.' },
              { title: 'Fixed-Price & Milestone Billing', desc: 'No surprise invoices. We agree on scope, quote a fixed price, and bill per approved milestone.' },
              { title: 'Real-Time Progress Visibility', desc: 'Access your private staging URL and Trello board from day one — see every commit and design update live.' },
              { title: 'Post-Launch Support Included', desc: 'Every engagement includes a 30-day free support window after go-live, plus affordable retainer options.' },
              { title: 'Design-First Development', desc: 'We prototype in Figma before writing a single line of code, ensuring UX alignment before build investment.' },
              { title: 'No Vendor Lock-In', desc: 'You own everything — code, designs, databases, domain. We hand over complete documentation and credentials.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-[#F8F9FD] border border-slate-100 hover:border-[#5221B5]/25 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2365E8] to-[#7435D5] flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#191923] mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
