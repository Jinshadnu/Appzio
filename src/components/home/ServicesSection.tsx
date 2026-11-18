import React, { useState, useEffect } from 'react';
import { 
  Globe, Smartphone, Cpu, ArrowRight, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Database, Zap, X, 
  MessageSquare, Palette, Workflow, Wrench, Code2, 
  Monitor, Check, ExternalLink, Lock, BarChart3, 
  TrendingUp, Server, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { Link } from 'react-router-dom';

const easeOut: Easing = 'easeOut';

// Service category data definition
export interface ServiceCategory {
  id: string;
  divisionNumber: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  services: string[];
  ctaText: string;
  contactServiceOption: string;
  image: string;
  imageAlt: string;
  accent: {
    primary: string;
    secondary: string;
    gradient: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
    borderHover: string;
  };
  metrics: { label: string; value: string }[];
  technologies: string[];
  capabilitiesSummary: { title: string; desc: string }[];
  relevantProjects: { name: string; category: string; link: string }[];
}

export const primaryServices: ServiceCategory[] = [
  {
    id: 'digital-presence',
    divisionNumber: '01',
    label: 'DIGITAL PRESENCE',
    badge: 'Web & Digital Branding',
    title: 'Build Your Digital Presence.',
    description: 'Create a powerful online presence with modern, responsive and professionally designed digital experiences that represent your brand and connect with your customers.',
    services: [
      'Corporate Website Development',
      'Business Website Development',
      'E-commerce Website Development',
      'Portfolio Websites',
      'Landing Page Development',
      'Website Redesign',
      'Website Maintenance',
    ],
    ctaText: 'Explore Website Solutions',
    contactServiceOption: 'Website Development',
    image: `${import.meta.env.BASE_URL}assets/services/services-digital-presence.jpg`,
    imageAlt: 'Appzio Modern Web Development Showcase',
    accent: {
      primary: '#16BDEB',
      secondary: '#2364D8',
      gradient: 'from-[#16BDEB] to-[#2364D8]',
      badgeBg: 'bg-cyan-50 border-cyan-200/80',
      badgeText: 'text-[#0284C7]',
      glow: 'hover:shadow-[0_20px_50px_rgba(22,189,235,0.15)]',
      borderHover: 'hover:border-[#16BDEB]/60',
    },
    metrics: [
      { label: 'Core Web Vitals', value: '99+ Score' },
      { label: 'SEO Architecture', value: '100% Schema' },
      { label: 'Avg Page Load', value: '< 0.8s' },
    ],
    technologies: ['Next.js 14', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel Edge', 'WordPress / Headless'],
    capabilitiesSummary: [
      { title: 'Brand First Design', desc: 'Custom tailored Swiss Neo-Grotesque typography, responsive grid hierarchy, and custom branded aesthetics.' },
      { title: 'Performance Engineering', desc: 'Sub-second serverless rendering, edge caching, WebP/AVIF media pipelines, and zero layout shift.' },
      { title: 'Commercial Conversion', desc: 'Clear call-to-action pathways, lead capture forms, dynamic WhatsApp integration, and analytics telemetry.' },
    ],
    relevantProjects: [
      { name: 'TEPHRA Electro Mechanical', category: 'Corporate Engineering Portal • Dubai, UAE', link: 'https://tephra.ae' },
      { name: 'Ghaf Books & Media', category: 'E-Commerce & Literary Bookstore', link: 'https://ghafbooks.com' },
      { name: 'Prime Time Typing Services', category: 'Government & Corporate Portal • Abu Dhabi', link: 'https://primetimeuae.com' },
    ],
  },
  {
    id: 'digital-products',
    divisionNumber: '02',
    label: 'DIGITAL PRODUCTS',
    badge: 'Mobile & Multi-Platform',
    title: 'Powerful Applications. Seamless Experiences.',
    description: 'Transform your ideas into reliable and scalable applications designed to simplify everyday activities and deliver exceptional user experiences.',
    services: [
      'Android Application Development',
      'iOS Application Development',
      'Flutter Application Development',
      'Desktop Application Development',
      'Web Application Development',
      'Custom Application Development',
      'API Integration',
    ],
    ctaText: 'Explore Application Solutions',
    contactServiceOption: 'Mobile Application',
    image: `${import.meta.env.BASE_URL}assets/services/services-digital-products.jpg`,
    imageAlt: 'Appzio Mobile and Multi-Platform Application Development',
    accent: {
      primary: '#2364D8',
      secondary: '#252B9B',
      gradient: 'from-[#2364D8] to-[#252B9B]',
      badgeBg: 'bg-blue-50 border-blue-200/80',
      badgeText: 'text-[#2364D8]',
      glow: 'hover:shadow-[0_20px_50px_rgba(35,100,216,0.18)]',
      borderHover: 'hover:border-[#2364D8]/60',
    },
    metrics: [
      { label: 'Render Physics', value: '60 FPS Smooth' },
      { label: 'Code Sharing', value: 'Up to 90%' },
      { label: 'Cloud Sync', value: 'Offline First' },
    ],
    technologies: ['Flutter / Dart', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Electron', 'REST & GraphQL', 'Firebase'],
    capabilitiesSummary: [
      { title: 'Cross-Platform Velocity', desc: 'Single codebase powering production iOS, Android, and Desktop without compromising native fidelity.' },
      { title: 'Intuitive Micro-Interactions', desc: 'Butter-smooth gestures, tactile haptic feedback, real-time push notifications, and biometric sign-in.' },
      { title: 'Enterprise App Store Publishing', desc: 'End-to-end Apple App Store and Google Play Store review navigation, compliance, and automated CI/CD.' },
    ],
    relevantProjects: [
      { name: 'Mikhael Gold & Diamonds', category: 'Luxury Jewellery & Daily Gold Rate App', link: 'https://mikhaelgold.com' },
      { name: 'Carepoint Auto Hub', category: 'Automotive Service & Ceramic Booking Platform', link: 'https://carepointautohub.com' },
      { name: 'AetherPay In-Store Terminal', category: 'Fintech Multi-Platform POS App', link: '/portfolio' },
    ],
  },
  {
    id: 'business-automation',
    divisionNumber: '03',
    label: 'BUSINESS AUTOMATION',
    badge: 'Custom Enterprise Software',
    title: 'Smarter Software. Better Business Operations.',
    description: 'Streamline business processes and improve productivity with custom-built software solutions designed around your operational requirements.',
    services: [
      'ERP Software Development',
      'Billing Software',
      'POS Systems',
      'Inventory Management',
      'Business Management Applications',
      'Custom Business Software',
      'Workflow Automation',
    ],
    ctaText: 'Explore Business Solutions',
    contactServiceOption: 'ERP / Billing Software',
    image: `${import.meta.env.BASE_URL}assets/services/services-business-automation.jpg`,
    imageAlt: 'Appzio ERP, Invoicing and Business Automation Software',
    accent: {
      primary: '#252B9B',
      secondary: '#6326C5',
      gradient: 'from-[#252B9B] via-[#2364D8] to-[#16BDEB]',
      badgeBg: 'bg-indigo-50 border-indigo-200/80',
      badgeText: 'text-[#252B9B]',
      glow: 'hover:shadow-[0_20px_50px_rgba(37,43,155,0.18)]',
      borderHover: 'hover:border-[#252B9B]/60',
    },
    metrics: [
      { label: 'Operational Uptime', value: '99.98% SLA' },
      { label: 'Multi-Branch Sync', value: 'Real-Time' },
      { label: 'Tax Compliance', value: 'VAT & GST Ready' },
    ],
    technologies: ['PostgreSQL', 'Python / Django', 'Node.js', 'React Enterprise', 'Redis', 'Docker', 'AWS / Azure'],
    capabilitiesSummary: [
      { title: 'Modular Architecture', desc: 'Deploy only what you need: Inventory, Invoicing, Payroll, CRM, and Supply Chain that scale together seamlessly.' },
      { title: 'Automated Financial Telemetry', desc: 'Automated VAT/GST compliant invoice generation, credit ledgers, expense reconciliations, and instant PDF/WhatsApp receipts.' },
      { title: 'Granular Role-Based Access', desc: 'Bank-grade role security, audit log tracking, multi-branch data isolation, and automated daily cloud snapshots.' },
    ],
    relevantProjects: [
      { name: 'Apex ERP Solutions', category: 'Enterprise Manufacturing & Multi-Warehouse ERP', link: '/portfolio' },
      { name: 'Krona Point-of-Sale', category: 'Retail & Multi-Location Cloud POS Network', link: '/portfolio' },
      { name: 'Prime Time Immigration Desk', category: 'Automated Document & VIP Processing Workflow', link: 'https://primetimeuae.com' },
    ],
  },
];

export interface AdditionalService {
  id: string;
  number: string;
  name: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  highlights: string[];
}

export const additionalServices: AdditionalService[] = [
  {
    id: 'ui-ux-design',
    number: '01',
    name: 'UI/UX Design',
    description: 'Professional interface design, user journey mapping, design systems, and intuitive user experiences.',
    icon: Palette,
    badge: 'Figma & Design Systems',
    highlights: ['Wireframing & Prototyping', 'User Research & Personas', 'Design System Architecture', 'WCAG Accessibility Standards'],
  },
  {
    id: 'api-integration',
    number: '02',
    name: 'API & System Integration',
    description: 'Connect applications, services and existing business systems with bank-grade security and reliability.',
    icon: Workflow,
    badge: 'REST, GraphQL & Webhooks',
    highlights: ['Payment Gateways (Stripe, Razorpay)', 'WhatsApp Business Cloud API', 'Third-Party ERP Connectors', 'Real-Time Webhook Processing'],
  },
  {
    id: 'website-maintenance',
    number: '03',
    name: 'Website Maintenance',
    description: 'Continuous improvements, performance tuning, security updates, and dedicated technical support.',
    icon: ShieldCheck,
    badge: 'Continuous 24/7 SLA',
    highlights: ['Security Hardening & Backups', 'Core Web Vitals Tuning', 'Framework & Dependency Audits', 'Emergency Bug Resolution'],
  },
  {
    id: 'custom-software',
    number: '04',
    name: 'Custom Software Development',
    description: 'Tailored software solutions designed around specific business requirements and unique operations.',
    icon: Code2,
    badge: 'Bespoke Logic & Microservices',
    highlights: ['Domain-Specific Architecture', 'Scalable Relational DBs', 'Custom Automated Workflows', 'Full IP Code Ownership'],
  },
];

export const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedAdditional, setSelectedAdditional] = useState<AdditionalService | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCategory(null);
        setSelectedAdditional(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToContact = (serviceOptionName?: string) => {
    setSelectedCategory(null);
    setSelectedAdditional(null);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (serviceOptionName) {
        setTimeout(() => {
          const select = document.querySelector('select[name="service_required"]') as HTMLSelectElement;
          if (select) {
            const options = Array.from(select.options).map((o) => o.value);
            const match = options.find(
              (o) =>
                o.toLowerCase().includes(serviceOptionName.toLowerCase()) ||
                serviceOptionName.toLowerCase().includes(o.toLowerCase())
            );
            if (match) {
              select.value = match;
              select.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        }, 400);
      }
    }
  };

  return (
    <section id="services" className="py-28 lg:py-36 relative overflow-hidden bg-[#F8F9FD] text-slate-900 scroll-mt-16 border-b border-slate-200/80">
      
      {/* Background ambient lighting accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full bg-[#16BDEB]/10 blur-[160px]" />
        <div className="absolute bottom-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-[#2364D8]/10 blur-[170px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#6326C5]/5 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── 03. SECTION INTRODUCTION ── */}
        <div className="max-w-4xl mx-auto text-center mb-20 lg:mb-24">
          
          {/* Label with Appzio Logo Glyphs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-6 shadow-sm"
          >
            {/* Small decorative visual element inspired by the Appzio logo */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16BDEB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-tr from-[#16BDEB] to-[#2364D8]"></span>
            </span>
            <span>WHAT WE DO</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">DISCIPLINED ENGINEERING</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] font-display mb-6"
          >
            Digital Solutions Designed{' '}
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 45%, #6326C5 100%)',
              }}
            >
              to Move Your Business Forward.
            </span>
          </motion.h2>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto"
          >
            From building your digital presence to developing powerful software and intelligent business systems, we provide everything you need to grow in a connected world.
          </motion.p>
        </div>

        {/* ── 04. ASYMMETRIC BENTO GRID (3 PRIMARY SERVICE CATEGORIES) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">

          {/* ════════════════════════════════════════════════════════════════
              CATEGORY 01: DIGITAL PRESENCE (7 Columns Desktop)
             ════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:col-span-7 group rounded-3xl bg-white border border-slate-200/90 hover:border-[#16BDEB]/60 p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#16BDEB]/8 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-xs font-mono font-bold text-[#0284C7]">
                    01
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#0284C7] uppercase">
                    CATEGORY 01 &bull; DIGITAL PRESENCE
                  </span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-50 text-[#0284C7] border border-cyan-200/80">
                  Web &amp; Digital Branding
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-display tracking-tight group-hover:text-[#2364D8] transition-colors">
                Build Your Digital Presence.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Create a powerful online presence with modern, responsive and professionally designed digital experiences that represent your brand and connect with your customers.
              </p>

              {/* Visual Presentation: Safari Browser Window Mockup */}
              <div className="mb-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                {/* Safari Browser Chrome Header */}
                <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400">
                    <Lock className="w-3 h-3 text-[#16BDEB]" />
                    <span>appzio.com/showcase/digital-presence</span>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider hidden sm:block">
                    LIVE PREVIEW
                  </div>
                </div>

                {/* Preview Image with Layered UI Overlays */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                  <img
                    src={primaryServices[0].image}
                    alt={primaryServices[0].imageAlt}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Metric Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-medium flex items-center gap-2 shadow-lg">
                      <Zap className="w-3.5 h-3.5 text-[#16BDEB]" />
                      <span>99+ Core Web Vitals</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-medium flex items-center gap-2 shadow-lg hidden sm:flex">
                      <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Responsive 4K &bull; Mobile</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Capabilities Pills */}
              <div className="mb-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Scope of Solutions Included:
                </div>
                <div className="flex flex-wrap gap-2">
                  {primaryServices[0].services.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 hover:bg-cyan-50 hover:border-cyan-200 hover:text-[#0284C7] transition-colors"
                    >
                      <Check className="w-3 h-3 text-[#16BDEB]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Action */}
            <div className="pt-6 border-t border-slate-100 relative z-10">
              <button
                onClick={() => setSelectedCategory(primaryServices[0])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50/70 border border-cyan-200 text-[#0284C7] font-bold text-sm hover:from-[#16BDEB] hover:to-[#2364D8] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-cyan-500/20 group/btn"
              >
                <span>Explore Website Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════════
              CATEGORY 02: DIGITAL PRODUCTS (5 Columns Desktop)
             ════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: easeOut }}
            className="lg:col-span-5 group rounded-3xl bg-white border border-slate-200/90 hover:border-[#2364D8]/60 p-8 sm:p-10 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2364D8]/8 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-xs font-mono font-bold text-[#2364D8]">
                    02
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
                    CATEGORY 02 &bull; DIGITAL PRODUCTS
                  </span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                  Mobile &amp; Cloud Apps
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-display tracking-tight group-hover:text-[#2364D8] transition-colors">
                Powerful Applications. Seamless Experiences.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Transform your ideas into reliable and scalable applications designed to simplify everyday activities and deliver exceptional user experiences.
              </p>

              {/* Visual Presentation: Mobile & Multi-Platform Mockup */}
              <div className="mb-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                {/* Mobile Preview Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={primaryServices[1].image}
                    alt={primaryServices[1].imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Tags */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-medium flex items-center gap-2 shadow-lg">
                      <Smartphone className="w-3.5 h-3.5 text-[#2364D8]" />
                      <span>iOS &bull; Android &bull; Flutter</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-medium flex items-center gap-2 shadow-lg">
                      <Zap className="w-3.5 h-3.5 text-blue-400" />
                      <span>60 FPS Fluid</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Capabilities Pills */}
              <div className="mb-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Scope of Solutions Included:
                </div>
                <div className="flex flex-wrap gap-2">
                  {primaryServices[1].services.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-[#2364D8] transition-colors"
                    >
                      <Check className="w-3 h-3 text-[#2364D8]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Action */}
            <div className="pt-6 border-t border-slate-100 relative z-10">
              <button
                onClick={() => setSelectedCategory(primaryServices[1])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200 text-[#2364D8] font-bold text-sm hover:from-[#2364D8] hover:to-[#252B9B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/20 group/btn"
              >
                <span>Explore Application Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════════
              CATEGORY 03: BUSINESS AUTOMATION (Full 12 Columns Desktop)
             ════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: easeOut }}
            className="lg:col-span-12 group rounded-3xl bg-white border border-slate-200/90 hover:border-[#252B9B]/60 p-8 sm:p-12 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#252B9B]/10 rounded-full blur-[140px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#16BDEB]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Information & Capabilities (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Header Badge Row */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-xs font-mono font-bold text-[#252B9B]">
                      03
                    </span>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#252B9B] uppercase">
                      CATEGORY 03 &bull; BUSINESS AUTOMATION
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-[#252B9B] border border-indigo-200/80">
                      ERP &amp; Enterprise Software
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 font-display tracking-tight group-hover:text-[#252B9B] transition-colors">
                    Smarter Software. Better Business Operations.
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed mb-6">
                    Streamline business processes and improve productivity with custom-built software solutions designed around your operational requirements.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-[#252B9B] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Real-Time Business Telemetry</div>
                        <div className="text-[11px] text-slate-500">Live sales dashboards &amp; financial reports</div>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#252B9B] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">VAT &amp; GST Invoicing Engine</div>
                        <div className="text-[11px] text-slate-500">Compliant billing &amp; instant digital receipts</div>
                      </div>
                    </div>
                  </div>

                  {/* Scope of Included Services */}
                  <div className="mb-6">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Scope of Solutions Included:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {primaryServices[2].services.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-[#252B9B] transition-colors"
                        >
                          <Check className="w-3 h-3 text-[#252B9B]" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedCategory(primaryServices[2])}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-200 text-[#252B9B] font-bold text-sm hover:from-[#252B9B] hover:via-[#2364D8] hover:to-[#16BDEB] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-indigo-500/25 group/btn"
                  >
                    <span>Explore Business Solutions</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Dashboard Mockup (6 Cols) */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                  
                  {/* Dashboard Window Header Bar */}
                  <div className="px-4 py-3 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                      <span className="text-xs font-mono font-semibold text-slate-300 ml-2">Appzio Enterprise ERP Portal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        SYNCED
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Graphic Canvas */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={primaryServices[2].image}
                      alt={primaryServices[2].imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Live Metric Badges Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                      <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                        <Server className="w-3.5 h-3.5 text-[#16BDEB]" />
                        <span>Multi-Branch Inventory Sync</span>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Bank-Grade RBAC Security</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ── 05. ADDITIONAL SERVICES ("More Than Just Development") ── */}
        <div className="mt-8 pt-16 border-t border-slate-200/90">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-2">
                COMPREHENSIVE DIGITAL CAPABILITIES
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                More Than Just Development.
              </h3>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Complementary technical disciplines designed to keep your software performing at its highest standard throughout its entire lifecycle.
            </p>
          </div>

          {/* 4-Column Grid of Secondary Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: easeOut }}
                  onClick={() => setSelectedAdditional(service)}
                  className="group rounded-2xl bg-white border border-slate-200/80 hover:border-[#2364D8]/50 p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Icon and Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2364D8] group-hover:scale-110 group-hover:bg-[#2364D8] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#2364D8] transition-colors">
                        {service.number}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-2 font-display group-hover:text-[#2364D8] transition-colors">
                      {service.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2364D8] group-hover:text-[#16BDEB] transition-colors">
                    <span>Explore Discipline</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ── 08. SERVICE DETAIL MODAL (PRIMARY CATEGORIES) ── */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
            
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedCategory(null)} 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
                  CATEGORY {selectedCategory.divisionNumber} &bull; {selectedCategory.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-display">
                {selectedCategory.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {selectedCategory.description}
              </p>

              {/* Performance Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                {selectedCategory.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-xs font-mono text-slate-500 uppercase">{metric.label}</div>
                    <div className="text-base sm:text-lg font-extrabold text-slate-900">{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Scope of What We Deliver */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Scope of Solutions Delivered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCategory.services.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Approach Pillars */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Our Engineering Approach:
                </h4>
                <div className="space-y-3">
                  {selectedCategory.capabilitiesSummary.map((pillar) => (
                    <div key={pillar.title} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                      <div className="text-sm font-bold text-slate-900 mb-1">{pillar.title}</div>
                      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Live Client Projects */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Relevant Client Projects:
                </h4>
                <div className="space-y-2">
                  {selectedCategory.relevantProjects.map((project) => (
                    <div
                      key={project.name}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">{project.name}</div>
                        <div className="text-xs text-slate-500">{project.category}</div>
                      </div>
                      {project.link.startsWith('http') ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#2364D8] hover:border-blue-300 transition-colors"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          to={project.link}
                          onClick={() => setSelectedCategory(null)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#2364D8] hover:border-blue-300 transition-colors"
                        >
                          <span>Case Study</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Core Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Conversion CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() => scrollToContact(selectedCategory.contactServiceOption)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-white shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  style={{
                    background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start a Project in {selectedCategory.label}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 09. ADDITIONAL SERVICE DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedAdditional && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
            
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedAdditional(null)} 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="relative w-full max-w-xl bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto z-10"
            >
              <button
                onClick={() => setSelectedAdditional(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
                  DISCIPLINE {selectedAdditional.number} &bull; {selectedAdditional.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-display">
                {selectedAdditional.name}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {selectedAdditional.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Key Disciplines &amp; Capabilities:
                </h4>
                <div className="space-y-2">
                  {selectedAdditional.highlights.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2364D8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() => scrollToContact(selectedAdditional.name)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white shadow-lg shadow-blue-500/20"
                  style={{
                    background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire for {selectedAdditional.name}</span>
                </button>
                <button
                  onClick={() => setSelectedAdditional(null)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ServicesSection;
