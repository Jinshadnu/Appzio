import React, { useState, useEffect } from 'react';
import { 
  Globe, Smartphone, Code2, Database, ShoppingCart, 
  Workflow, ArrowRight, CheckCircle2, Sparkles, X, 
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ElementType;
  accentColor: string;
  tags: string[];
  deliverables: string[];
  architecture: string[];
  businessValue: string;
  contactOption: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Development',
    shortDescription: 'Modern, responsive, and performance-tuned web experiences engineered to represent your brand authority, capture qualified leads, and engage global customers.',
    fullDescription: 'From high-impact corporate portals and business brand websites to high-converting landing pages, we build bespoke digital experiences using modern frameworks like Next.js and React. Every site is engineered with sub-second edge loading, Swiss-inspired typography, and comprehensive SEO schemas.',
    icon: Globe,
    accentColor: '#2563EB',
    tags: ['Corporate Websites', 'Next.js & React', 'Sub-second Edge CDN', 'Technical SEO'],
    deliverables: [
      'Bespoke Corporate & Enterprise Web Portals',
      'High-Conversion Product & Service Landing Pages',
      'Interactive Portfolios & Directory Showcases',
      'Multi-Language Localization (English, Arabic, etc.)',
      'Headless CMS & Content Management Systems'
    ],
    architecture: ['Next.js 14', 'React 19', 'Tailwind CSS', 'TypeScript', 'Vercel / Cloudflare Edge'],
    businessValue: '99+ Core Web Vitals score, zero layout shift, structured JSON-LD SEO for search dominance, and seamless lead conversion pathways.',
    contactOption: 'Website Development'
  },
  {
    id: 'mobile-app-development',
    number: '02',
    title: 'Mobile Application Development',
    shortDescription: 'High-fidelity Android, iOS, and cross-platform mobile applications engineered for fluid 60fps performance, offline-first reliability, and intuitive user engagement.',
    fullDescription: 'We transform complex user journeys into sleek, tactile mobile applications for iOS and Android. Using Flutter and native mobile tooling, we deliver fluid micro-interactions, bank-grade authentication, push notification pipelines, and robust backend synchronization.',
    icon: Smartphone,
    accentColor: '#20BCE5',
    tags: ['Flutter & Dart', 'iOS & Android', 'Offline-First Sync', 'Store Deployment'],
    deliverables: [
      'Cross-Platform Android & iOS Production Apps',
      'Customer Portals & Booking Applications',
      'Secure Payment & In-App Purchase Workflows',
      'Real-Time Chat & Push Notification Engines',
      'App Store & Google Play Store Compliance & Publishing'
    ],
    architecture: ['Flutter / Dart', 'Swift (iOS)', 'Kotlin (Android)', 'Firebase', 'REST & GraphQL'],
    businessValue: 'Single-codebase delivery saves up to 40% development investment while maintaining native rendering performance and store compliance.',
    contactOption: 'Mobile Application'
  },
  {
    id: 'custom-software-development',
    number: '03',
    title: 'Custom Software Development',
    shortDescription: 'Tailored software architectures and desktop applications built to solve unique operational challenges, automate internal workflows, and scale with your enterprise.',
    fullDescription: 'Off-the-shelf software often forces businesses to compromise. We engineer bespoke software systems, internal management consoles, and cross-platform desktop applications (Windows & macOS) crafted around your precise operational logic and regulatory needs.',
    icon: Code2,
    accentColor: '#1D4ED8',
    tags: ['Custom Workflows', 'Desktop Software', 'Scalable APIs', 'Full IP Ownership'],
    deliverables: [
      'Custom Internal Business Management Systems',
      'High-Performance Desktop Applications (Windows/macOS)',
      'Enterprise API Microservices & Data Bridges',
      'Role-Based Administrative Control Dashboards',
      'Complete Source Code & Intellectual Property Ownership'
    ],
    architecture: ['Node.js', 'Python / Django', 'PostgreSQL', 'Flutter Desktop', 'Docker', 'Redis'],
    businessValue: '100% intellectual property ownership, zero recurring seat license fees, and complete adaptation to your company’s unique workflow rules.',
    contactOption: 'Custom Software'
  },
  {
    id: 'erp-billing-systems',
    number: '04',
    title: 'ERP & Billing Systems',
    shortDescription: 'Integrated business management platforms, VAT/GST compliant invoicing engines, and point-of-sale systems that streamline multi-branch operations.',
    fullDescription: 'Replace fragmented spreadsheets with automated, dependable enterprise resource planning. Our ERP and Billing suites manage inventory, point-of-sale terminals, automated invoice generation, supplier purchase orders, and real-time financial reporting.',
    icon: Database,
    accentColor: '#F97316',
    tags: ['GST & VAT Invoicing', 'POS Terminal Software', 'Inventory Management', 'Multi-Branch Sync'],
    deliverables: [
      'Custom ERP Software Suites for Retail & Manufacturing',
      'Cloud & Desktop POS Invoicing Terminals',
      'Real-Time Multi-Warehouse Inventory Tracking',
      'Automated VAT / GST Invoices with PDF & WhatsApp Dispatch',
      'Multi-Branch Consolidated Financial Reporting'
    ],
    architecture: ['PostgreSQL', 'Node.js', 'PHP / Laravel', 'Thermal & Barcode SDKs', 'Cloud DB'],
    businessValue: 'Elimination of manual bookkeeping errors, real-time multi-branch stock visibility, and 100% tax compliance across UAE and India.',
    contactOption: 'ERP / Billing Software'
  },
  {
    id: 'ecommerce-development',
    number: '05',
    title: 'E-commerce Development',
    shortDescription: 'High-converting digital storefronts, bookstore platforms, and multi-vendor catalogs with seamless payment gateways and frictionless checkout experiences.',
    fullDescription: 'Turn digital window-shoppers into repeat buyers. We build modern, lightning-fast e-commerce platforms with instant search, rich catalog filtering, abandoned-cart recovery, localized currencies, and secure payment integrations with Stripe, Razorpay, and regional gateways.',
    icon: ShoppingCart,
    accentColor: '#0284C7',
    tags: ['Custom Storefronts', 'Payment Gateways', 'Cart & Checkout Flow', 'Order Tracking'],
    deliverables: [
      'Custom Headless & Integrated Online Stores',
      'Bookstore & Multi-Format Media Platforms',
      'Secure Multi-Currency Payment Gateway Setup',
      'Real-Time Stock & Automated Order Dispatch',
      'Mobile-Optimized Express Checkout Funnels'
    ],
    architecture: ['Next.js Commerce', 'React', 'Stripe / Razorpay', 'Node.js', 'PostgreSQL / MongoDB'],
    businessValue: 'Frictionless checkout reduces cart abandonment rates while sub-second product filtering maximizes customer engagement and order volume.',
    contactOption: 'E-commerce Development'
  },
  {
    id: 'business-automation',
    number: '06',
    title: 'Business Automation',
    shortDescription: 'Intelligent workflow automation, third-party system bridges, and automated communication pipelines that eliminate repetitive manual tasks.',
    fullDescription: 'Accelerate productivity by connecting your disconnected software systems. We build automated data pipelines, automated WhatsApp customer updates, CRM sync bridges, and transaction audit bots that run 24/7 without human intervention.',
    icon: Workflow,
    accentColor: '#6326C5',
    tags: ['Workflow Automation', 'WhatsApp Cloud API', 'System Integration', 'Real-Time Webhooks'],
    deliverables: [
      'WhatsApp Cloud API Automated Notifications & Bot Flows',
      'Third-Party CRM, Payment, & Shipping API Connectors',
      'Automated Lead Routing & Instant Email Acknowledgments',
      'Automated Document & Invoice Generation Pipelines',
      'Executive KPI & Analytics Data Telemetry'
    ],
    architecture: ['Webhooks', 'REST / GraphQL', 'Python Celery', 'Docker', 'Serverless Functions'],
    businessValue: 'Saves hundreds of manual employee hours monthly, eliminates copy-paste data errors, and ensures zero delayed customer responses.',
    contactOption: 'Business Automation'
  },
];

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { settings } = useWebsiteData();

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToContact = (serviceOptionName?: string) => {
    setSelectedService(null);
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
    <section
      id="services"
      className="py-28 lg:py-36 relative overflow-hidden bg-[#FAFBFE] text-[#111827] scroll-mt-16 border-b border-[#E2E8F0]"
    >
      {/* ── Background Subtle Ambient Accents ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-[#20BCE5]/5 blur-[170px]" />
        <div className="absolute bottom-1/3 -left-48 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[170px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#6326C5]/3 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── Section Introduction ── */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2563EB] uppercase mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>WHAT WE DO &bull; OUR CORE SERVICES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] mb-6 font-display"
          >
            Digital Solutions Designed to{' '}
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
              }}
            >
              Move Your Business Forward.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-[#52627A] font-normal leading-relaxed max-w-2xl mx-auto"
          >
            From building your digital presence to developing powerful software and intelligent business systems, we provide everything you need to grow in a connected world.
          </motion.p>
        </div>

        {/* ── 6-Card Responsive Services Grid (Pure White Surfaces) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: easeOut }}
                className="group relative rounded-3xl p-7 sm:p-8 bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between h-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(37,99,235,0.12)] hover:-translate-y-1.5 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                {/* Top Row: Service Number & Professional Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-xs"
                      style={{
                        backgroundColor: `${service.accentColor}10`,
                        borderColor: `${service.accentColor}25`,
                      }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: service.accentColor }} />
                    </div>

                    <span className="text-xs font-mono font-bold tracking-widest text-slate-400 group-hover:text-[#2563EB] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3 font-display group-hover:text-[#2563EB] transition-colors">
                    {service.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-sm text-[#52627A] font-normal leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[#52627A] group-hover:border-blue-200 group-hover:text-[#2563EB] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Elegant Learn More Interaction */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600">
                    Explore Details &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Section CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm max-w-xl mx-auto">
            <span className="text-xs sm:text-sm text-[#52627A] text-center sm:text-left">
              Need a bespoke software solution or have a custom project specification?
            </span>
            <button
              onClick={() => scrollToContact()}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all"
              style={{
                background: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
              }}
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* ── High-End Interactive Details Modal (Pure White Canvas) ── */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] p-6 sm:p-10 text-[#111827] shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs"
                  style={{
                    backgroundColor: `${selectedService.accentColor}12`,
                    borderColor: `${selectedService.accentColor}30`,
                  }}
                >
                  {React.createElement(selectedService.icon, {
                    className: 'w-7 h-7',
                    style: { color: selectedService.accentColor },
                  })}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">
                      SERVICE {selectedService.number}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-display">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Detailed Overview */}
              <p className="text-sm sm:text-base text-[#52627A] leading-relaxed mb-6 font-normal">
                {selectedService.fullDescription}
              </p>

              {/* Deliverables Checklist */}
              <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-[#E2E8F0]">
                <h4 className="text-xs font-mono font-bold text-[#111827] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Key Deliverables &amp; Capabilities</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm text-[#52627A]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Architecture & Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Core Technologies &amp; Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.architecture.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-[#2563EB] border border-blue-200/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commercial Value */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 mb-8">
                <span className="text-xs font-bold text-emerald-800 block mb-1">
                  Business Impact Guarantee:
                </span>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {selectedService.businessValue}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => scrollToContact(selectedService.contactOption)}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  style={{
                    background: 'linear-gradient(120deg, #20BCE5 0%, #2563EB 60%, #1D4ED8 100%)',
                  }}
                >
                  <span>Inquire for {selectedService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20am%20interested%20in%20${encodeURIComponent(
                    selectedService.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;