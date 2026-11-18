import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Service, Testimonial, FAQ, BlogPost, WebsiteSettings } from '../types';
import { api } from '../services/api';

export interface ServiceDivision {
  id: string;
  division_number: string;
  title: string;
  tagline: string;
  description: string;
  icon_name: string;
  badge: string;
  services: string[];
}

export const serviceDivisions: ServiceDivision[] = [
  {
    id: 'digital-presence',
    division_number: '01',
    title: 'Digital Presence',
    tagline: 'High-Impact Websites & Web Experiences',
    description: 'We engineer high-converting digital storefronts, corporate portals, and brand websites designed with modern architecture, lightning performance, and seamless user experiences.',
    icon_name: 'Globe',
    badge: 'Web & Digital Branding',
    services: [
      'Corporate Website Development',
      'Business Website Development',
      'Portfolio Websites',
      'Landing Pages',
      'E-commerce Websites',
      'Website Redesign',
      'Website Maintenance'
    ]
  },
  {
    id: 'digital-products',
    division_number: '02',
    title: 'Digital Products',
    tagline: 'Mobile & Multi-Platform Software',
    description: 'From initial user journey architecture to production app store publishing, we build native and cross-platform applications engineered for butter-smooth engagement and reliability.',
    icon_name: 'Smartphone',
    badge: 'Mobile & Cloud Applications',
    services: [
      'Android Application Development',
      'iOS Application Development',
      'Flutter Application Development',
      'Desktop Application Development',
      'Web Application Development',
      'API Integration'
    ]
  },
  {
    id: 'business-automation',
    division_number: '03',
    title: 'Business Automation',
    tagline: 'Enterprise Software & Operational Tools',
    description: 'Custom-built enterprise software, billing engines, inventory portals, and automated workflows designed to eliminate operational bottlenecks and scale business productivity.',
    icon_name: 'Cpu',
    badge: 'Custom Enterprise Software',
    services: [
      'ERP Software',
      'Billing Software',
      'POS Applications',
      'Inventory Management',
      'Business Management Software',
      'Custom Workflow Automation'
    ]
  }
];

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
  tagline: 'Digital Solutions That Move Your Business Forward.',
  tagline_alt: 'Transforming Ideas Into Meaningful Digital Experiences.',
  meta_description: 'APPZIO designs and develops modern websites, mobile applications and custom software that transform business ideas into meaningful digital experiences for clients across UAE, Saudi Arabia, India and worldwide.',
  contact_email: 'appzio@gmail.com',
  contact_phone: '+91 9526026636',
  contact_whatsapp: '+91 9526026636',
  address: 'Kerala, India',
  social_linkedin: 'https://linkedin.com/company/appzio',
  social_github: 'https://github.com/appzio',
  social_instagram: 'https://instagram.com/appziodigital',
  copyright_text: `© ${new Date().getFullYear()} APPZIO. All Rights Reserved. Built to Move Your Business Forward.`,
  hero_label: 'PREMIUM DIGITAL SOLUTIONS & SOFTWARE ENGINEERING',
  hero_heading: 'Digital Solutions That Move Your Business Forward.',
  hero_subheading: 'We design and develop modern websites, mobile applications and custom software that transform business ideas into meaningful digital experiences.',
  about_heading: 'Technology Meets Business Thinking.',
  about_description: 'Appzio is a digital solutions brand focused on helping businesses establish, improve and scale their digital presence. We combine thoughtful design, modern development practices and business-oriented technology to create websites, applications and software solutions that solve real-world problems.',
  cta_heading: 'Let’s Build Something Meaningful.',
  cta_description: 'Have a project in mind? Tell us what you’re planning, and let’s explore how we can turn your idea into a practical digital solution.'
};

const defaultServices: Service[] = [
  {
    id: 1,
    title: 'Corporate & Business Websites',
    slug: 'corporate-business-websites',
    short_description: 'Bespoke corporate websites engineered with clean typography, fast performance, and high brand authority.',
    full_description: 'We develop high-converting corporate portals and business websites that communicate company capabilities with Swiss precision and flawless responsive layouts.',
    icon_name: 'Globe',
    features: ['High-Performance Corporate Architecture', 'Local & International SEO Schemas', 'Responsive Layout for All Breakpoints', 'Interactive Service Directories'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Corporate SEO'],
    is_active: 1,
    display_order: 1
  },
  {
    id: 2,
    title: 'E-commerce & Bookstore Platforms',
    slug: 'ecommerce-platforms',
    short_description: 'Full-featured online stores, literary publication platforms, and frictionless shopping cart experiences.',
    full_description: 'Turn catalog visitors into loyal buyers with fast search, rich media galleries, instant checkout workflows, and secure payment gateway integrations.',
    icon_name: 'ShoppingBag',
    features: ['Instant Dynamic Product Search', 'Dual Light & Dark Mode Displays', 'Seamless Payment Gateway Integration', 'Inventory & Order Tracking'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe / Razorpay', 'REST APIs'],
    is_active: 1,
    display_order: 2
  },
  {
    id: 3,
    title: 'Mobile Application Development',
    slug: 'mobile-application-development',
    short_description: 'Cross-platform Android and iOS applications built with Flutter, Dart, and native precision.',
    full_description: 'From wireframes to Play Store and App Store deployment, we create fast, fluid mobile applications with offline-first caching and real-time syncing.',
    icon_name: 'Smartphone',
    features: ['Single-codebase Flutter Engineering', 'Offline-First Local Storage', 'Secure Token Authentication', 'Butter-smooth 60fps UI Animations'],
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Java', 'Firebase', 'REST APIs'],
    is_active: 1,
    display_order: 3
  },
  {
    id: 4,
    title: 'Desktop Software Development',
    slug: 'desktop-software-development',
    short_description: 'Robust desktop applications for Windows, macOS, and Linux built for intensive daily workflows.',
    full_description: 'Engineered for high data throughput, peripheral connectivity, offline operation, and automated background updates for commercial environments.',
    icon_name: 'Monitor',
    features: ['Cross-platform Windows & macOS Support', 'Direct Hardware & POS Peripheral Access', 'High-Speed SQLite/Local Database', 'Auto-updating Release Pipeline'],
    technologies: ['Flutter Desktop', 'Electron', 'Node.js', 'SQLite', 'C++'],
    is_active: 1,
    display_order: 4
  },
  {
    id: 5,
    title: 'ERP & Business Automation',
    slug: 'erp-business-automation',
    short_description: 'Tailored billing systems, POS software, inventory dashboards, and custom operational workflow tools.',
    full_description: 'Replace fragmented spreadsheets with automated, secure, role-based business management software configured specifically to your operational rules.',
    icon_name: 'Cpu',
    features: ['Automated Invoicing & GST/VAT Billing', 'Real-Time Inventory & Stock Alerts', 'Role-Based Team Permissions', 'Automated Daily Sales Audits'],
    technologies: ['PHP', 'Node.js', 'MySQL', 'PostgreSQL', 'Docker'],
    is_active: 1,
    display_order: 5
  },
  {
    id: 6,
    title: 'Website Redesign & Maintenance',
    slug: 'website-redesign-maintenance',
    short_description: 'Transform outdated digital systems into modern, high-performing websites with SLA-backed support.',
    full_description: 'We audit, re-architect, and optimize legacy websites to modern web standards, ensuring continuous uptime, security patches, and Core Web Vitals excellence.',
    icon_name: 'ShieldCheck',
    features: ['Full UI/UX Modernization', 'Performance & Core Web Vitals Audits', 'Ongoing Security Patches & Backups', 'Zero-Downtime Migration Support'],
    technologies: ['React', 'Vite', 'Git', 'CI/CD', 'Linux Hosting'],
    is_active: 1,
    display_order: 6
  }
];

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'TEPHRA Electro Mechanical Contracting',
    slug: 'tephra-ae',
    category: 'Corporate Website Development',
    client: 'TEPHRA Electro Mechanical Contracting L.L.C (Dubai, UAE)',
    tagline: 'High-precision corporate website presenting UAE MEP contracting capabilities.',
    short_description: 'A professional corporate website presenting engineering services, company information and business capabilities.',
    overview: 'Tephra Electro Mechanical Contracting L.L.C is an established UAE MEP contracting powerhouse executing commercial, industrial, and residential mechanical, electrical, and plumbing engineering projects across Dubai and the Emirates. Appzio developed a modern, Swiss-inspired digital corporate presence reflecting engineering discipline, technical capability, and corporate trust.',
    objectives: 'Build an authoritative digital corporate presence for UAE commercial tenders; provide clear access to electromechanical contracting services and company credentials; optimize for UAE engineering and facility management searches.',
    challenges: 'Structuring complex multi-discipline MEP technical capabilities into an accessible layout; maintaining sub-second loading speeds on mobile devices; establishing an elevated corporate visual tone.',
    solutions: 'Developed a custom lightweight architecture with Swiss Neo-Grotesque typography, semantic JSON-LD structured data for UAE local business SEO, structured service matrices, and rapid WhatsApp procurement routing.',
    key_features: [
      'High-Performance Engineering Service Matrix (Mechanical, Electrical, Plumbing, Lighting)',
      'UAE Corporate Schema & Local SEO Structured Data for Dubai Contracting',
      'Swiss Neo-Grotesque Minimalist Typography & Clean Spacing',
      'Direct WhatsApp Procurement & Project Consultation Triggers',
      'Interactive Office Geo-Location & Contact Clearing'
    ],
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Corporate SEO', 'Responsive UI'],
    thumbnail: '/assets/projects/tephra-preview.png',
    cover_image: '/assets/projects/tephra-full.png',
    gallery_images: [
      '/assets/projects/tephra-preview.png',
      '/assets/projects/tephra-full.png'
    ],
    live_url: 'https://tephra.ae/',
    is_featured: 1,
    is_published: 1,
    display_order: 1
  },
  {
    id: 2,
    title: 'Ghaf Books & Media',
    slug: 'ghaf-books-media',
    category: 'E-commerce Website Development',
    client: 'Ghaf Books & Media LLP',
    tagline: 'Premier online bookstore & literary publication house with dynamic digital catalog.',
    short_description: 'An online bookstore and publishing platform designed to present books and provide customers with a professional digital shopping experience.',
    overview: 'Ghaf Books & Media is a distinctive publication house focused on literary fiction, South Asian classics, Malayalam literature, and Arab-Indian Ocean cultural history. Appzio engineered an editorial e-commerce platform blending rich typography with instantaneous search, catalog filters, and streamlined purchasing.',
    objectives: 'Deliver an inviting literary browsing experience that honors the written word; enable customers to purchase both physical hardcovers/paperbacks and instant digital eBooks; integrate secure payment processing.',
    challenges: 'Balancing detailed cover artwork and multi-language book metadata with fast load times; providing comfortable light and dark reading themes; ensuring a frictionless mobile shopping cart.',
    solutions: 'Engineered a modern Next.js commerce frontend with dynamic category filters, optimized image delivery, dual light/editorial dark reading modes, and express checkout flows.',
    key_features: [
      'Dynamic Literary Catalog Search & Multi-Criteria Filtering',
      'Dual Reading Themes (Warm Sand Light & Editorial Charcoal Dark)',
      'Multi-Format Book Purchase (Hardcover, Paperback, and Instant eBook)',
      'Integrated Secure Payment Gateway with Fast Checkout Flow',
      'Author Spotlight & Literary Editorial Publishing Sections'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Payment Gateway', 'E-commerce UI'],
    thumbnail: '/assets/projects/ghafbooks-preview.png',
    cover_image: '/assets/projects/ghafbooks-full.png',
    gallery_images: [
      '/assets/projects/ghafbooks-preview.png',
      '/assets/projects/ghafbooks-full.png'
    ],
    live_url: 'https://ghafbooksandmedia.com/',
    is_featured: 1,
    is_published: 1,
    display_order: 2
  },
  {
    id: 3,
    title: 'Prime Time Typing Services',
    slug: 'prime-time-typing',
    category: 'Business Website Development',
    client: 'Prime Time Typing Services (Abu Dhabi, UAE)',
    tagline: 'Comprehensive government document clearing & corporate typing portal in Abu Dhabi.',
    short_description: 'A professional UAE business website designed to present typing, documentation and business services.',
    overview: 'Prime Time Typing Services is an authorized UAE document processing and government clearance center located in Madinat Zayed, Abu Dhabi. They provide expedited processing for Tasheel, MOHRE Labour Permits, ICP Residency Visas, Emirates ID, Tamm, and MOFA attestations. Appzio designed an intuitive business portal that organizes complex clearance procedures and converts visits into customer consultations.',
    objectives: 'Present over 30+ official UAE government clearance services in a clear, accessible structure; provide direct WhatsApp consultation access; rank strongly for high-intent document typing searches in Abu Dhabi.',
    challenges: 'Presenting multi-layered administrative processes without confusing customers; catering to both English and Arabic speakers; prioritizing mobile telephone and WhatsApp outreach.',
    solutions: 'Structured services by issuing authority (Tasheel, MOHRE, ICP, Tamm), created step-by-step document requirement checklists, integrated instant WhatsApp routing, and embedded local Abu Dhabi business metadata.',
    key_features: [
      'Structured Government Service Directory (Tasheel, MOHRE, ICP, Tamm, MOFA)',
      'Bilingual Architecture (English & Arabic) for UAE Residents & Corporates',
      'One-Tap WhatsApp Consultation & Express Document Evaluation',
      'Comprehensive Document Checklist & Eligibility Breakdown',
      'Fast Mobile-First Interface with Zero Clutter'
    ],
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Schema.org', 'Responsive UI'],
    thumbnail: '/assets/projects/primetime-preview.png',
    cover_image: '/assets/projects/primetime-full.png',
    gallery_images: [
      '/assets/projects/primetime-preview.png',
      '/assets/projects/primetime-full.png'
    ],
    live_url: 'https://primetimetypingservice.com/',
    is_featured: 1,
    is_published: 1,
    display_order: 3
  },
  {
    id: 4,
    title: 'Mikhael Gold & Diamonds',
    slug: 'mikhael-gold-diamonds',
    category: 'Luxury Website Development',
    client: 'Mikhael Gold & Diamonds (Kerala, India)',
    tagline: 'Royal handcrafted Kerala jewellery & certified diamond bridal showcase.',
    short_description: 'A premium jewellery website concept featuring an elegant visual presentation and luxury-inspired design.',
    overview: 'Mikhael Gold & Diamonds showcases handcrafted BIS-hallmarked 22K gold jewellery, Kasu Mala, Palakka Mala, temple jhumkas, and certified diamonds. Appzio developed a luxury digital showcase featuring royal heritage aesthetic, Cormorant Garamond serif typography, and tactile visual storytelling.',
    objectives: 'Translate the timeless luxury and artisan heritage of South Indian bridal jewellery to a premium digital environment; highlight hallmark purity and diamond certification; enable private showroom booking.',
    challenges: 'Displaying high-resolution gold textures and intricate diamond craft smoothly across devices; conveying luxury prestige without visual clutter.',
    solutions: 'Crafted an editorial layout with royal burgundy and gold accents, fluid image zoom previews, transparent purity certification guides, and bridal appointment inquiry flows.',
    key_features: [
      'Editorial Showcase of Bridal Sets, Kasu Mala, and Certified Diamonds',
      'Cormorant Garamond Classical Serif Typography & Warm Royal Palette',
      'BIS 916 Hallmark Certification & Diamond Grade Informational Modules',
      'Interactive Jewellery Lookbook with High-Fidelity Previews',
      'Direct Private Bridal Consultation Booking Flow'
    ],
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Luxury UI', 'Responsive Design'],
    thumbnail: '/assets/projects/mikhaelgold-preview.png',
    cover_image: '/assets/projects/mikhaelgold-full.png',
    gallery_images: [
      '/assets/projects/mikhaelgold-preview.png',
      '/assets/projects/mikhaelgold-full.png'
    ],
    live_url: 'https://jinshadnu.github.io/mikhael-gold/',
    is_featured: 1,
    is_published: 1,
    display_order: 4
  },
  {
    id: 5,
    title: 'Carepoint Auto Hub',
    slug: 'carepoint-auto-hub',
    category: 'Business Website Development',
    client: 'Carepoint Auto Hub (Kerala, India)',
    tagline: 'High-performance automotive detailing & car care digital service platform.',
    short_description: 'A professional automotive website designed to showcase services and establish a strong digital business presence.',
    overview: 'Carepoint Auto Hub is a modern automotive service and detailing facility located in Vadakkekad, Kerala, offering premium snow foam car washes, 3D wheel alignment, ceramic detailing, paint correction, and accessories. Appzio built an energetic, high-contrast digital service portal designed to maximize walk-in service bookings.',
    objectives: 'Distinguish professional multi-step detailing packages from basic washes; showcase service bays and equipment; provide instant mobile booking and directions.',
    challenges: 'Designing for busy car owners on mobile devices who need immediate information on packages, pricing, and location.',
    solutions: 'Engineered an action-oriented mobile layout with high-contrast service cards, package comparison tables, direct WhatsApp booking shortcuts, and integrated Google Maps navigation.',
    key_features: [
      'Automotive Detailing & Maintenance Service Catalog',
      'Clear Package Breakdown (Foam Wash, 3D Alignment, Ceramic Detailing)',
      '1-Tap Direct WhatsApp Service Booking & Inquiries',
      'Customer Testimonials & Before/After Detailing Highlights',
      'Fast Mobile-Optimized Performance for On-The-Go Drivers'
    ],
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Lucide React', 'Mobile UX'],
    thumbnail: '/assets/projects/carepoint-preview.png',
    cover_image: '/assets/projects/carepoint-full.png',
    gallery_images: [
      '/assets/projects/carepoint-preview.png',
      '/assets/projects/carepoint-full.png'
    ],
    live_url: 'https://jinshadnu.github.io/Carepoint-Auto-Hub/',
    is_featured: 1,
    is_published: 1,
    display_order: 5
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    client_name: 'Fahad Al-Mazrouei',
    client_title: 'Executive Director',
    company: 'TEPHRA MEP Contracting (Dubai, UAE)',
    review: 'Appzio delivered a corporate web presence that perfectly aligns with our engineering caliber. The Swiss-inspired minimalism, fast loading speeds, and clear technical service matrices have significantly boosted our credibility during international contractor pre-qualifications in Dubai.',
    rating: 5,
    is_published: 1,
    display_order: 1
  },
  {
    id: 2,
    client_name: 'Dr. Abdul Rahman Ghaf',
    client_title: 'Founder & Publisher',
    company: 'Ghaf Books & Media LLP',
    review: 'Working with Appzio on our literary bookstore was an exceptional experience. They understood the subtleties of editorial design, typographic hierarchy, and seamless reader shopping experiences. The platform performs flawlessly across all devices.',
    rating: 5,
    is_published: 1,
    display_order: 2
  },
  {
    id: 3,
    client_name: 'Mohammed Mansoor',
    client_title: 'Managing Director',
    company: 'Prime Time Typing Services (Abu Dhabi, UAE)',
    review: 'Organizing more than 30 official UAE government service categories into a clean, intuitive website was a major challenge. Appzio executed this with outstanding clarity and integrated WhatsApp consultation routing that brought in immediate daily client inquiries.',
    rating: 5,
    is_published: 1,
    display_order: 3
  },
  {
    id: 4,
    client_name: 'Suhail Mikhael',
    client_title: 'Director',
    company: 'Mikhael Gold & Diamonds (Kerala, India)',
    review: 'Appzio brought royal craftsmanship into our digital presentation. The typography, smooth animations, and gold showcase look stunning on both mobile and desktop screens. Truly a premier digital solutions team.',
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const [settingsRes, projectsRes, servicesRes, testimonialsRes] = await Promise.allSettled([
        api.getSettings(),
        api.getProjects(),
        api.getServices(),
        api.getTestimonials()
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value && Object.keys(settingsRes.value).length > 0) {
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
    } catch {
      // In static deployment or offline, fallback to built-in verified default datasets
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
export default WebsiteDataContext;
