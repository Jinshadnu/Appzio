import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Service, Testimonial, FAQ, BlogPost, WebsiteSettings } from '../types';
import { api } from '../services/api';
import { getAssetUrl } from '../utils/asset';

interface WebsiteDataContextType {
  settings: WebsiteSettings;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  blogs: BlogPost[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const defaultSettings: WebsiteSettings = {
  company_name: 'APPZIO',
  tagline: 'Transforming Ideas Into Digital Experiences.',
  tagline_alt: 'Building Powerful Digital Experiences.',
  meta_description: 'APPZIO is a premium digital agency & software development company building websites, mobile applications, and custom digital software for global clients.',
  contact_email: 'appzio@gmail.com',
  contact_phone: '+91 9526026636',
  contact_whatsapp: '+91 9526026636',
  address: 'Kerala, India',
  social_linkedin: 'https://linkedin.com/company/appzio',
  social_github: 'https://github.com/appzio',
  social_instagram: 'https://instagram.com/appziodigital',
  copyright_text: `© ${new Date().getFullYear()} by APPZIO. All Rights Reserved. Crafted for digital excellence.`,
  hero_label: 'APPZIO DIGITAL ENGINEERING',
  hero_heading: 'Recreating Dream Digital Products That Last',
  hero_subheading: 'We design and develop powerful websites, mobile applications, and desktop software that help businesses transform ideas into impactful digital products.',
  about_heading: 'Technology Meets Creativity.',
  about_description: 'APPZIO is a digital development brand focused on creating innovative, scalable, and user-friendly digital solutions. We combine technical expertise with thoughtful design to turn business ideas into practical digital products.',
  cta_heading: 'Have an Idea? Let’s Build Something Great.',
  cta_description: 'Whether you need a website, mobile application, or custom software, let’s turn your vision into a powerful digital solution.'
};

const defaultServices: Service[] = [
  {
    id: 1,
    title: 'Website Development',
    slug: 'website-development',
    short_description: 'Modern, responsive, SEO-friendly websites tailored to your business goals and built with cutting-edge web technologies.',
    full_description: 'We create high-converting, lightning-fast digital storefronts, corporate portals, and SaaS web applications designed with modern architecture and seamless UX.',
    icon_name: 'Globe',
    features: ['Custom Next.js & React Architectures', 'Ultra-fast Core Web Vitals Optimization', 'Enterprise Headless CMS Integration', 'Full Mobile & Tablet Responsiveness'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'Node.js', 'Next.js'],
    is_active: 1,
    display_order: 1
  },
  {
    id: 2,
    title: 'Mobile Application Development',
    slug: 'mobile-application-development',
    short_description: 'Powerful native and cross-platform Android and iOS applications built with Flutter and Kotlin for maximum engagement.',
    full_description: 'From initial concept and user journey mapping to App Store and Google Play publishing, we build resilient mobile apps with butter-smooth animations and offline capabilities.',
    icon_name: 'Smartphone',
    features: ['Cross-Platform Flutter & Native Kotlin', 'Secure Authentication & Biometrics', 'Real-time WebSocket & Push Notifications', 'Offline-First Local Storage'],
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Java', 'Firebase', 'REST APIs'],
    is_active: 1,
    display_order: 2
  },
  {
    id: 3,
    title: 'Desktop Application Development',
    slug: 'desktop-application-development',
    short_description: 'Reliable cross-platform desktop software and business management applications tailored for heavy workflows.',
    full_description: 'Engineered for high performance, hardware connectivity, and robust offline stability across macOS, Windows, and Linux environments.',
    icon_name: 'Monitor',
    features: ['Cross-platform macOS, Windows & Linux', 'Local hardware & peripheral integration', 'High-throughput data processing', 'Automated background updater'],
    technologies: ['Flutter Desktop', 'Electron', 'Node.js', 'SQLite', 'C++'],
    is_active: 1,
    display_order: 3
  },
  {
    id: 4,
    title: 'Custom Software Development',
    slug: 'custom-software-development',
    short_description: 'Tailored digital solutions, enterprise dashboards, CRM systems, and automated workflows designed around your business.',
    full_description: 'We solve bespoke operational bottlenecks by engineering tailored digital products with modular architecture, strict data security, and scalable infrastructure.',
    icon_name: 'Cpu',
    features: ['Scalable Microservices Architecture', 'Custom ERP & CRM Portals', 'Automated Business Workflows', 'Role-based Access Control (RBAC)'],
    technologies: ['PHP', 'Node.js', 'MySQL', 'PostgreSQL', 'Docker', 'Redis'],
    is_active: 1,
    display_order: 4
  },
  {
    id: 5,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    short_description: 'Beautiful, intuitive, user-focused digital experiences that captivate users and elevate brand perception.',
    full_description: 'We craft high-fidelity Figma prototypes, interactive design systems, and user-centric wireframes that balance aesthetics with frictionless usability.',
    icon_name: 'Layout',
    features: ['Comprehensive Figma Design Systems', 'Interactive Prototypes & Wireframing', 'User Journey & Empathy Mapping', 'Design-to-Code Precision Handoff'],
    technologies: ['Figma', 'Adobe XD', 'Protopie', 'Design Systems'],
    is_active: 1,
    display_order: 5
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    slug: 'maintenance-and-support',
    short_description: 'Continuous improvements, performance optimization, security auditing, bug fixing, and SLA-backed technical support.',
    full_description: 'Ensure your digital platforms operate with 99.9% uptime, zero security vulnerabilities, and uninterrupted performance with our dedicated engineering care.',
    icon_name: 'ShieldCheck',
    features: ['24/7 Server & API Health Monitoring', 'Security Patches & Vulnerability Audits', 'Database Optimization & Backups', 'Version Upgrades & Speed Enhancements'],
    technologies: ['CI/CD', 'Git', 'Linux Server', 'Monitoring Tools'],
    is_active: 1,
    display_order: 6
  }
];

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'AetherPay — Next-Gen Fintech Mobile & Web Platform',
    slug: 'aetherpay-fintech-platform',
    category: 'Mobile Applications',
    client: 'Aether Financial Technologies (UAE & UK)',
    tagline: 'Multi-currency digital wallet & instant borderless transfer solution',
    short_description: 'A high-security, multi-currency mobile fintech application supporting cross-border remittances, biometric payments, and real-time expense tracking across GCC and Europe.',
    technologies: ['Flutter', 'Dart', 'PHP', 'MySQL', 'Firebase', 'REST APIs'],
    thumbnail: '/assets/projects/aetherpay-thumb.png',
    cover_image: '/assets/projects/aetherpay-cover.png',
    is_featured: 1,
    is_published: 1,
    display_order: 1
  },
  {
    id: 2,
    title: 'Novus Omnichannel Logistics ERP',
    slug: 'novus-logistics-erp',
    category: 'Custom Software',
    client: 'Novus Global Freight Lines (Saudi Arabia & Qatar)',
    tagline: 'Enterprise freight forwarding & fleet dispatch tracking system',
    short_description: 'An enterprise freight automation dashboard and dispatcher system handling container tracking, automated customs documentation, and predictive fleet route optimization.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'MySQL'],
    thumbnail: '/assets/projects/novus-thumb.png',
    cover_image: '/assets/projects/novus-cover.png',
    is_featured: 1,
    is_published: 1,
    display_order: 2
  },
  {
    id: 3,
    title: 'Lumina Dental & Medical Clinic Management Suite',
    slug: 'lumina-medical-suite',
    category: 'Desktop Applications',
    client: 'Lumina Health Group (Europe & UAE)',
    tagline: 'High-performance desktop clinical management & imaging station',
    short_description: 'A dedicated desktop application for healthcare practitioners featuring local DICOM imaging rendering, appointment scheduling, and automated prescription management.',
    technologies: ['Flutter Desktop', 'Dart', 'SQLite', 'REST APIs'],
    thumbnail: '/assets/projects/lumina-thumb.png',
    cover_image: '/assets/projects/lumina-cover.png',
    is_featured: 1,
    is_published: 1,
    display_order: 3
  },
  {
    id: 4,
    title: 'Krona Luxury Architectural Studio Web Experience',
    slug: 'krona-architectural-web',
    category: 'Websites',
    client: 'Krona Architects (Milan & London)',
    tagline: 'Award-winning digital portfolio showcasing premium architecture',
    short_description: 'An editorial, high-aesthetic web experience built with smooth page transitions, interactive 3D spatial renders, and responsive typography that elevated client inquiries by 240%.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'Framer Motion'],
    thumbnail: '/assets/projects/krona-thumb.png',
    cover_image: '/assets/projects/krona-cover.png',
    is_featured: 1,
    is_published: 1,
    display_order: 4
  },
  {
    id: 5,
    title: 'PulseFit Mobile Workout Companion & AI Coach',
    slug: 'pulsefit-ai-workout-app',
    category: 'Mobile Applications',
    client: 'PulseFit Inc. (India & USA)',
    tagline: 'Interactive workout tracker & AI personal fitness guidance',
    short_description: 'A modern mobile application featuring personalized workout plans, Bluetooth wearable heart-rate telemetry, video coaching, and community challenge boards.',
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Firebase', 'REST APIs'],
    thumbnail: '/assets/projects/pulsefit-thumb.png',
    cover_image: '/assets/projects/pulsefit-cover.png',
    is_featured: 1,
    is_published: 1,
    display_order: 5
  },
  {
    id: 6,
    title: 'Apex SaaS Analytics & Infrastructure Monitoring',
    slug: 'apex-saas-analytics-suite',
    category: 'UI/UX Design',
    client: 'Apex Cloud Systems (Singapore & Germany)',
    tagline: 'Comprehensive enterprise design system & UI/UX architecture',
    short_description: 'End-to-end UX research, wireframing, high-fidelity UI design, and complete component design library for a multi-tenant cloud monitoring dashboard.',
    technologies: ['Figma', 'UI/UX Design', 'Tailwind CSS', 'React'],
    thumbnail: '/assets/projects/apex-thumb.png',
    cover_image: '/assets/projects/apex-cover.png',
    is_featured: 1,
    is_published: 1,
    display_order: 6
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    client_name: 'Alexander Wright',
    client_title: 'Chief Technology Officer',
    company: 'Aether Financial Technologies (London, UK)',
    review: 'Working with APPZIO was a game-changer for our fintech product launch. Their technical mastery of Flutter and backend architecture ensured our app delivered bank-grade reliability with an exceptionally refined, modern interface.',
    rating: 5,
    is_published: 1,
    display_order: 1
  },
  {
    id: 2,
    client_name: 'Rashid Al-Maktoum',
    client_title: 'Managing Director',
    company: 'Novus Freight Logistics (Dubai & Saudi Arabia)',
    review: 'APPZIO engineered our regional logistics portal from the ground up. Their team has rare dual-competence: deep architectural knowledge coupled with an intuitive eye for premium UX. Our dispatch times plummeted by 40% in the first quarter.',
    rating: 5,
    is_published: 1,
    display_order: 2
  },
  {
    id: 3,
    client_name: 'Elena Rossi',
    client_title: 'Principal Architect & Partner',
    company: 'Krona Architectural Studio (Milan, Italy)',
    review: 'We approached APPZIO with an uncompromising aesthetic vision for our architectural portfolio. They translated our concepts into a silky-smooth, responsive digital reality. Our international client inquiries surged immediately.',
    rating: 5,
    is_published: 1,
    display_order: 3
  },
  {
    id: 4,
    client_name: 'Dr. Julian Weber',
    client_title: 'Head of Medical Operations',
    company: 'Lumina Health Group (Munich, Germany)',
    review: 'Building desktop software for healthcare requires absolute precision and zero margin for error. APPZIO delivered an offline-first desktop suite that our clinical staff enjoys using every single day. Their ongoing support is unmatched.',
    rating: 5,
    is_published: 1,
    display_order: 4
  }
];

const WebsiteDataContext = createContext<WebsiteDataContextType>({
  settings: defaultSettings,
  projects: defaultProjects,
  services: defaultServices,
  testimonials: defaultTestimonials,
  faqs: [],
  blogs: [],
  loading: false,
  refreshData: async () => {},
});

export const WebsiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const [settingsRes, projectsRes, servicesRes, testimonialsRes, faqsRes, blogsRes] = await Promise.allSettled([
        api.getSettings(),
        api.getProjects(),
        api.getServices(),
        api.getTestimonials(),
        api.getFAQs(),
        api.getBlogs()
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value) {
        setSettings(prev => ({ ...prev, ...settingsRes.value }));
      }
      if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value) && projectsRes.value.length > 0) {
        setProjects(projectsRes.value);
      }
      if (servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value) && servicesRes.value.length > 0) {
        setServices(servicesRes.value);
      }
      if (testimonialsRes.status === 'fulfilled' && Array.isArray(testimonialsRes.value) && testimonialsRes.value.length > 0) {
        setTestimonials(testimonialsRes.value);
      }
      if (faqsRes.status === 'fulfilled' && Array.isArray(faqsRes.value)) {
        setFaqs(faqsRes.value);
      }
      if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value)) {
        setBlogs(blogsRes.value);
      }
    } catch (err) {
      console.warn('Backend API offline or unreachable, using local fallbacks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <WebsiteDataContext.Provider
      value={{
        settings,
        projects,
        services,
        testimonials,
        faqs,
        blogs,
        loading,
        refreshData: fetchData,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
};

export const useWebsiteData = () => useContext(WebsiteDataContext);
