import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Globe, Smartphone, Monitor, Receipt, LayoutDashboard, 
  ShoppingCart, Bike, ArrowRight, CheckCircle2, Sparkles, 
  Layers, ShieldCheck, Cpu, Code2, Server, MessageSquare, 
  PhoneCall, ChevronRight, Zap
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

interface DetailedService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  gradient: string;
  deliverables: string[];
  techStack: string[];
  businessImpact: string;
  idealFor: string;
  contactOption: string;
}

const detailedServices: DetailedService[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Development',
    tagline: 'Modern, High-Speed Web Experiences Engineered for Brand Authority & Conversion',
    category: 'Digital Presence',
    description: 'We design and develop bespoke corporate websites, business portals, and high-converting landing pages. Built with modern edge frameworks, every website delivers sub-second page loads, pixel-perfect responsiveness across mobile and desktop, and rigorous technical SEO architecture.',
    icon: Globe,
    accentColor: '#2563EB',
    gradient: 'from-[#16BDEB] via-[#2364D8] to-[#252B9B]',
    deliverables: [
      'Bespoke Corporate & Enterprise Brand Websites',
      'High-Conversion Product & Campaign Landing Pages',
      'Multi-Language Localization (English, Arabic, Regional)',
      'Fast Headless CMS & Self-Serve Admin Consoles',
      'Core Web Vitals 95+ Score & Schema.org Rich Snippets',
      'Automated Lead Capture & CRM Webhook Integrations'
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Cloudflare Edge', 'WordPress API'],
    businessImpact: 'Establishes verified international credibility, minimizes bounce rate below 25%, and turns passive visitors into qualified commercial leads.',
    idealFor: 'Enterprises, corporate firms, high-growth startups, and established regional brands looking to dominate their market.',
    contactOption: 'Website Development'
  },
  {
    id: 'mobile-app-development',
    number: '02',
    title: 'Mobile Application Development',
    tagline: 'Fluid Native & Cross-Platform iOS and Android Apps with Bank-Grade Reliability',
    category: 'Digital Products',
    description: 'Transform your digital service into an indispensable daily mobile app. We craft tactile, high-performance mobile applications using Flutter and native SDKs, featuring smooth 60fps micro-animations, offline-first data caching, biometric security, and dependable push notification pipelines.',
    icon: Smartphone,
    accentColor: '#0284C7',
    gradient: 'from-[#0284C7] via-[#2563EB] to-[#4F46E5]',
    deliverables: [
      'Cross-Platform iOS & Android Apps from a Unified Codebase',
      'Offline-First Local Storage & Background Synchronization',
      'Biometric Login (FaceID / Fingerprint) & Tokenized Auth',
      'Real-Time In-App Chat, Messaging & Firebase Push Alerts',
      'Apple App Store & Google Play Store Review Compliance'
    ],
    techStack: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase', 'REST / GraphQL', 'WebSockets'],
    businessImpact: 'Reduces development and maintenance cost by up to 40% while maintaining native rendering speed and 99.9% crash-free sessions.',
    idealFor: 'Consumer services, B2B field sales teams, customer loyalty programs, and subscription-based digital platforms.',
    contactOption: 'Mobile Application'
  },
  {
    id: 'desktop-application-development',
    number: '03',
    title: 'Desktop Application Development',
    tagline: 'Heavy-Duty, Offline-Ready Desktop Software for Windows & macOS Workstations',
    category: 'Enterprise Software',
    description: 'For mission-critical business processes that require deep operating system access, high computational throughput, and zero reliance on cloud latency, we engineer robust desktop applications with complete local database integrity and physical hardware integration.',
    icon: Monitor,
    accentColor: '#4F46E5',
    gradient: 'from-[#4F46E5] via-[#2563EB] to-[#1D4ED8]',
    deliverables: [
      'Native Windows (.exe / .msi) & macOS (.dmg) Applications',
      'Hardware Peripheral Drivers (Thermal Printers, Barcode/RFID, Cash Drawers)',
      'High-Speed Local Database Engines (SQLite / Embedded PostgreSQL)',
      'Offline-Capable Operations with Auto Cloud Sync on Reconnect',
      'Background System Services & Automated Data Telemetry'
    ],
    techStack: ['Electron', 'Flutter Desktop', '.NET / C#', 'Python', 'SQLite', 'Node.js Core'],
    businessImpact: 'Zero latency operations, bulletproof continuity even during complete internet outages, and 100% intellectual property ownership.',
    idealFor: 'Warehouses, industrial distribution hubs, specialized manufacturing plants, and medical clinic operations.',
    contactOption: 'Desktop Application'
  },
  {
    id: 'billing-pos-software',
    number: '04',
    title: 'Billing & POS Software',
    tagline: 'Fast, Tax-Compliant Point of Sale & Invoicing Systems for Retail & Hospitality',
    category: 'Business Operations',
    description: 'Empower your checkout counters and accounting teams with streamlined, foolproof POS and Billing software. Fully compliant with UAE FTA / Saudi ZATCA VAT standards and Indian GST regulations, complete with instant thermal receipt generation and multi-branch stock reconciliation.',
    icon: Receipt,
    accentColor: '#EA580C',
    gradient: 'from-[#EA580C] via-[#F97316] to-[#D97706]',
    deliverables: [
      'Touch-Optimized Retail, Supermarket & Restaurant POS Terminals',
      'Automated VAT / GST Invoices with QR Code Verification',
      'Real-Time Multi-Branch Inventory Tracking & Low-Stock Alerts',
      'Fast Barcode Scanning & Instant Thermal Receipt Printing',
      'End-of-Day Cash Drawer Reconciliation & Audit Reports',
      'Direct WhatsApp & Email PDF Invoice Dispatch to Customers'
    ],
    techStack: ['React', 'Electron', 'Node.js', 'PostgreSQL / MySQL', 'ESC/POS Protocol', 'ZATCA / GST API'],
    businessImpact: 'Eliminates checkout queues, prevents manual cashier errors, guarantees 100% tax compliance, and offers real-time margin visibility.',
    idealFor: 'Supermarkets, boutique retail stores, restaurant chains, wholesale suppliers, and multi-branch franchise outlets.',
    contactOption: 'ERP / Billing Software'
  },
  {
    id: 'web-application-development',
    number: '05',
    title: 'Web Application Development',
    tagline: 'Scalable Cloud Platforms, Enterprise ERPs & Real-Time Management Consoles',
    category: 'Cloud Engineering',
    description: 'We develop complex cloud software architectures that streamline business operations. From customer self-service portals and internal ERP platforms to data visualization dashboards, our web applications are designed with modular microservices and enterprise-grade security.',
    icon: LayoutDashboard,
    accentColor: '#2563EB',
    gradient: 'from-[#2563EB] via-[#1D4ED8] to-[#1E40AF]',
    deliverables: [
      'Custom SaaS Products & Multi-Tenant Cloud Architecture',
      'Role-Based Operational Consoles (RBAC) & Audit Logging',
      'Interactive Analytical Dashboards & Real-Time KPI Visualizations',
      'High-Throughput RESTful & GraphQL Microservice APIs',
      'Automated Workflow Triggers, Email & Webhook Pipelines',
      'Database Sharding, Redundancy & Automated Daily Backups'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PHP / Laravel', 'PostgreSQL', 'Docker', 'Redis'],
    businessImpact: 'Consolidates scattered spreadsheets into one single source of truth, automating hundreds of hours of manual coordination each month.',
    idealFor: 'Startups building proprietary SaaS, logistics coordinators, educational institutions, and corporate operations.',
    contactOption: 'Custom Software'
  },
  {
    id: 'ecommerce-development',
    number: '06',
    title: 'E-commerce Development',
    tagline: 'High-Converting Digital Storefronts Engineered for Frictionless Checkout',
    category: 'Digital Commerce',
    description: 'Transform online visitors into loyal repeat customers with an e-commerce platform built for speed and sales. We develop custom online stores and omnichannel retail platforms featuring lightning-fast product filtering, multi-currency support, automated inventory sync, and regional payment gateway integrations.',
    icon: ShoppingCart,
    accentColor: '#059669',
    gradient: 'from-[#059669] via-[#10B981] to-[#047857]',
    deliverables: [
      'Custom Fast Storefronts with Sub-Second Product Search',
      'Multi-Currency & Multi-Language Checkout Workflows',
      'Seamless Payment Gateway Setup (Stripe, Razorpay, Telr, Apple Pay)',
      'Automated Abandoned Cart Follow-Up & WhatsApp Notifications',
      'Real-Time Warehouse Stock Sync & Courier Shipping Webhooks',
      'Customer Accounts, Order Tracking & Automated Invoices'
    ],
    techStack: ['Next.js Commerce', 'React', 'Shopify / WooCommerce API', 'Stripe / Razorpay', 'Node.js', 'PostgreSQL'],
    businessImpact: 'Cuts cart abandonment by up to 35%, handles traffic spikes during festive promotions effortlessly, and maximizes customer lifetime value.',
    idealFor: 'Fashion brands, direct-to-consumer labels, specialty bookstores, electronics retailers, and wholesale B2B merchants.',
    contactOption: 'E-commerce Development'
  },
  {
    id: 'delivery-applications',
    number: '07',
    title: 'Delivery Applications',
    tagline: 'End-to-End On-Demand Delivery & Fleet Dispatch Suites with Live GPS Tracking',
    category: 'Logistics Tech',
    description: 'Power your on-demand delivery business with a synchronized 3-app ecosystem: Customer App, Driver Dispatch App, and Merchant/Dispatcher Admin Console. Features real-time GPS fleet tracking, intelligent route optimization, automated order allocation, and instant status updates.',
    icon: Bike,
    accentColor: '#9333EA',
    gradient: 'from-[#9333EA] via-[#7C3AED] to-[#6366F1]',
    deliverables: [
      'Customer Ordering App with Real-Time Live Order Tracking',
      'Driver Fleet App with Turn-by-Turn GPS Navigation & Earnings Dashboard',
      'Merchant & Dispatcher Web Console with Automated Order Allocation',
      'Real-Time Geolocation Telemetry with Interactive Map View',
      'Digital Proof-of-Delivery (Signature Capture & Photo Verification)',
      'Automated SMS & WhatsApp Status Notifications at Every Stage'
    ],
    techStack: ['Flutter', 'Google Maps API', 'Mapbox', 'Node.js WebSockets', 'Redis', 'PostgreSQL / PostGIS'],
    businessImpact: 'Minimizes delivery turnaround times by 28%, prevents misplaced parcels, and provides customers with complete peace of mind through live tracking.',
    idealFor: 'Restaurant delivery networks, courier and parcel logistics companies, grocery delivery startups, and field dispatch services.',
    contactOption: 'Mobile Application'
  }
];

export const Services: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(detailedServices[0].id);
  const { settings } = useWebsiteData();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Comprehensive Digital Solutions & Services — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  const handleDiscussService = (serviceOptionName: string) => {
    navigate('/contact');
    setTimeout(() => {
      const select = document.querySelector('select[name="service_required"]') as HTMLSelectElement;
      if (select) {
        const options = Array.from(select.options).map((o) => o.value);
        const match = options.find(
          (o) =>
            o.toLowerCase().includes(serviceOptionName.toLowerCase()) ||
            serviceOptionName.toLowerCase().includes(o.toLowerCase())
        );
        if (match) select.value = match;
      }
    }, 150);
  };

  return (
    <div className="bg-[#FAFBFE] text-slate-900 min-h-screen pt-28 pb-24 selection:bg-[#2364D8] selection:text-white">
      {/* ── Page Hero Header ── */}
      <section className="relative overflow-hidden pt-6 pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>CORE TECHNICAL DISCIPLINES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-display">
              End-to-End{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                Digital Engineering
              </span>{' '}
              for Growing Enterprises.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              From bespoke corporate web portals and high-performance mobile apps to heavy-duty offline desktop software, retail POS, and delivery dispatch platforms — we engineer solutions that generate measurable business growth.
            </p>
          </div>

          {/* Quick Jump Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-8">
            {detailedServices.map((svc) => (
              <a
                key={svc.id}
                href={`#${svc.id}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#2364D8] hover:text-[#2364D8] hover:bg-blue-50/50 transition-all flex items-center gap-1.5"
              >
                <span className="text-[10px] font-mono text-[#2364D8] font-bold">{svc.number}</span>
                <span>{svc.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 Comprehensive Service Showcases ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
        {detailedServices.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 1;

          return (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 sm:p-10 lg:p-12">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${service.accentColor}, #252B9B)`
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#2364D8]">
                          SERVICE {service.number}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {service.category}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDiscussService(service.contactOption)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2364D8] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
                    >
                      <span>Discuss {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtitle & Deep Description */}
                <div className="py-6 space-y-3">
                  <p className="text-base sm:text-lg font-semibold text-slate-800">
                    {service.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Grid: Deliverables & Tech Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  {/* Left Column: Key Deliverables (7 cols) */}
                  <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/60">
                    <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Technical Deliverables</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2364D8] mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Stack & Business Impact (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    {/* Tech Stack */}
                    <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60">
                      <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700 mb-3 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#2364D8]" />
                        <span>Core Technologies</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-800 border border-slate-200/80 shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Business Value Metric */}
                    <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-200/60">
                      <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#2364D8] mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#2364D8]" />
                        <span>Measurable Business Impact</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {service.businessImpact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Callout */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Ideal For:</span>
                    <span>{service.idealFor}</span>
                  </div>
                  <button
                    onClick={() => handleDiscussService(service.contactOption)}
                    className="inline-flex items-center gap-1.5 text-[#2364D8] hover:text-[#1D4ED8] font-bold self-start sm:self-auto group"
                  >
                    <span>Request Technical Specification</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ── Consultation Banner ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E293B] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#16BDEB]/20 via-[#2364D8]/20 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
              CUSTOM ARCHITECTURE CONSULTATION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-display">
              Have a Project with Unique Requirements?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every business workflow is unique. Share your functional requirements with our engineering team, and we will deliver a transparent scope, technical stack proposal, and phased delivery roadmap.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#16BDEB] via-[#2364D8] to-[#6326C5] text-white text-xs sm:text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Schedule Technical Discussion
              </Link>

              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20Appzio%20team,%20I%20would%20like%20to%20discuss%20a%20software%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
