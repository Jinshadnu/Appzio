export interface Project {
  id: number;
  title: string;
  slug: string;
  category: 'Websites' | 'Mobile Applications' | 'Desktop Applications' | 'UI/UX Design' | 'Custom Software' | string;
  client?: string;
  tagline?: string;
  short_description: string;
  overview?: string;
  objectives?: string;
  challenges?: string;
  solutions?: string;
  key_features?: string[];
  technologies: string[];
  thumbnail?: string;
  cover_image?: string;
  gallery_images?: string[];
  live_url?: string;
  play_store_url?: string;
  app_store_url?: string;
  is_featured: boolean | number;
  is_published: boolean | number;
  display_order: number;
  created_at?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  icon_name: string;
  features?: string[];
  technologies?: string[];
  is_active: boolean | number;
  display_order: number;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_title?: string;
  company: string;
  review: string;
  rating: number;
  avatar_url?: string;
  is_published: boolean | number;
  display_order: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  display_order: number;
  is_active: boolean | number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  cover_image?: string;
  tags?: string;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean | number;
  created_at: string;
}

export interface Enquiry {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  service_required?: string;
  estimated_budget?: string;
  project_timeline?: string;
  project_description: string;
  attachment_url?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Rejected' | string;
  internal_notes?: string;
  created_at: string;
}

export interface WebsiteSettings {
  company_name: string;
  tagline: string;
  tagline_alt: string;
  meta_description: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  address: string;
  social_linkedin: string;
  social_github: string;
  social_instagram: string;
  copyright_text: string;
  hero_label: string;
  hero_heading: string;
  hero_subheading: string;
  about_heading: string;
  about_description: string;
  cta_heading: string;
  cta_description: string;
  [key: string]: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  total_projects: number;
  published_projects: number;
  total_services: number;
  total_enquiries: number;
  new_enquiries: number;
  published_blogs: number;
  total_testimonials: number;
  recent_enquiries: Array<{
    id: number;
    full_name: string;
    email: string;
    service_required: string;
    estimated_budget: string;
    status: string;
    created_at: string;
  }>;
}

