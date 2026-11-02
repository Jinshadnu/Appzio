import { Project, Service, Testimonial, FAQ, BlogPost, Enquiry, WebsiteSettings, AdminUser, DashboardStats } from '../types';

const API_BASE = '/api';

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('appzio_admin_token');
  }

  public setToken(token: string) {
    localStorage.setItem('appzio_admin_token', token);
  }

  public clearToken() {
    localStorage.removeItem('appzio_admin_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      const json = await res.json();
      if (!res.ok || json.success === false) {
        throw new Error(json.message || `API Error: ${res.statusText}`);
      }

      return json.data;
    } catch (err: any) {
      console.warn(`API call failed for ${endpoint}:`, err.message);
      throw err;
    }
  }

  // Settings
  async getSettings(): Promise<WebsiteSettings> {
    return this.request<WebsiteSettings>('/settings');
  }

  async updateSettings(settings: Partial<WebsiteSettings>): Promise<void> {
    return this.request<void>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Projects
  async getProjects(params?: { category?: string; featured?: number; all?: boolean }): Promise<Project[]> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.featured !== undefined) query.set('featured', params.featured.toString());
    if (params?.all) query.set('all', 'true');
    return this.request<Project[]>(`/projects?${query.toString()}`);
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    return this.request<Project>(`/projects/${slug}`);
  }

  async createProject(project: Partial<Project>): Promise<{ id: number; slug: string }> {
    return this.request<{ id: number; slug: string }>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: number, project: Partial<Project>): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: number): Promise<void> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Services
  async getServices(all?: boolean): Promise<Service[]> {
    return this.request<Service[]>(`/services${all ? '?all=true' : ''}`);
  }

  async createService(service: Partial<Service>): Promise<{ id: number }> {
    return this.request<{ id: number }>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id: number, service: Partial<Service>): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  }

  async deleteService(id: number): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials(all?: boolean): Promise<Testimonial[]> {
    return this.request<Testimonial[]>(`/testimonials${all ? '?all=true' : ''}`);
  }

  async createTestimonial(testimonial: Partial<Testimonial>): Promise<{ id: number }> {
    return this.request<{ id: number }>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    });
  }

  async updateTestimonial(id: number, testimonial: Partial<Testimonial>): Promise<void> {
    return this.request<void>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial),
    });
  }

  async deleteTestimonial(id: number): Promise<void> {
    return this.request<void>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    return this.request<FAQ[]>('/faqs');
  }

  async createFAQ(faq: Partial<FAQ>): Promise<{ id: number }> {
    return this.request<{ id: number }>('/faqs', {
      method: 'POST',
      body: JSON.stringify(faq),
    });
  }

  async updateFAQ(id: number, faq: Partial<FAQ>): Promise<void> {
    return this.request<void>(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(faq),
    });
  }

  async deleteFAQ(id: number): Promise<void> {
    return this.request<void>(`/faqs/${id}`, {
      method: 'DELETE',
    });
  }

  // Blogs
  async getBlogs(all?: boolean): Promise<BlogPost[]> {
    return this.request<BlogPost[]>(`/blogs${all ? '?all=true' : ''}`);
  }

  async getBlogBySlug(slug: string): Promise<BlogPost> {
    return this.request<BlogPost>(`/blogs/${slug}`);
  }

  async createBlog(blog: Partial<BlogPost>): Promise<{ id: number; slug: string }> {
    return this.request<{ id: number; slug: string }>('/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    });
  }

  async updateBlog(id: number, blog: Partial<BlogPost>): Promise<void> {
    return this.request<void>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    });
  }

  async deleteBlog(id: number): Promise<void> {
    return this.request<void>(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  // Enquiries
  async submitEnquiry(enquiry: {
    full_name: string;
    email: string;
    phone?: string;
    company_name?: string;
    service_required?: string;
    estimated_budget?: string;
    project_timeline?: string;
    project_description: string;
    attachment_url?: string;
    website_hp?: string;
  }): Promise<{ id: number }> {
    return this.request<{ id: number }>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiry),
    });
  }

  async getEnquiries(params?: { status?: string; search?: string }): Promise<Enquiry[]> {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    return this.request<Enquiry[]>(`/enquiries?${query.toString()}`);
  }

  async updateEnquiryStatus(id: number, data: { status: string; internal_notes?: string }): Promise<void> {
    return this.request<void>(`/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEnquiry(id: number): Promise<void> {
    return this.request<void>(`/enquiries/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/dashboard/stats');
  }

  // Auth
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: AdminUser }> {
    const data = await this.request<{ token: string; user: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(data.token);
    return data;
  }

  async getMe(): Promise<AdminUser> {
    return this.request<AdminUser>('/auth/me');
  }

  async updateProfile(data: { name: string; email: string; current_password?: string; new_password?: string }): Promise<void> {
    return this.request<void>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // File Upload
  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const token = this.getToken();

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'File upload failed');
    }

    return json.data;
  }
}

export const api = new ApiService();

