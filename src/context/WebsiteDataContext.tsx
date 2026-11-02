import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Service, Testimonial, FAQ, BlogPost, WebsiteSettings } from '../types';
import { api } from '../services/api';

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
  copyright_text: `© ${new Date().getFullYear()} APPZIO. All Rights Reserved. Crafted for digital excellence.`,
  hero_label: 'DIGITAL SOLUTIONS • CREATIVE DEVELOPMENT • TECHNOLOGY',
  hero_heading: 'Building Digital Experiences That Move Businesses Forward.',
  hero_subheading: 'We design and develop powerful websites, mobile applications, and desktop software that help businesses transform ideas into impactful digital products.',
  about_heading: 'Technology Meets Creativity.',
  about_description: 'APPZIO is a digital development brand focused on creating innovative, scalable, and user-friendly digital solutions. We combine technical expertise with thoughtful design to turn business ideas into practical digital products.',
  cta_heading: 'Have an Idea? Let’s Build Something Great.',
  cta_description: 'Whether you need a website, mobile application, or custom software, let’s turn your vision into a powerful digital solution.'
};

const WebsiteDataContext = createContext<WebsiteDataContextType>({
  settings: defaultSettings,
  projects: [],
  services: [],
  testimonials: [],
  faqs: [],
  blogs: [],
  loading: true,
  refreshData: async () => {},
});

export const WebsiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
      if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value)) {
        setProjects(projectsRes.value);
      }
      if (servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value)) {
        setServices(servicesRes.value);
      }
      if (testimonialsRes.status === 'fulfilled' && Array.isArray(testimonialsRes.value)) {
        setTestimonials(testimonialsRes.value);
      }
      if (faqsRes.status === 'fulfilled' && Array.isArray(faqsRes.value)) {
        setFaqs(faqsRes.value);
      }
      if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value)) {
        setBlogs(blogsRes.value);
      }
    } catch (err) {
      console.error('Failed to load initial website data:', err);
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

