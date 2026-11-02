import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WebsiteDataProvider } from './context/WebsiteDataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetails } from './pages/ProjectDetails';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { AccessibilityStatement } from './pages/AccessibilityStatement';
import { NotFound } from './pages/NotFound';

// Admin CMS Pages
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { Dashboard } from './admin/Dashboard';
import { ProjectsManager } from './admin/ProjectsManager';
import { ServicesManager } from './admin/ServicesManager';
import { EnquiriesManager } from './admin/EnquiriesManager';
import { TestimonialsManager } from './admin/TestimonialsManager';
import { BlogManager } from './admin/BlogManager';
import { SettingsManager } from './admin/SettingsManager';
import { AdminProfile } from './admin/AdminProfile';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FD] text-[#191923] selection:bg-[#5221B5] selection:text-white">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatement />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin CMS Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="enquiries" element={<EnquiriesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFloatingButton />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <WebsiteDataProvider>
        <Router>
          <AppContent />
        </Router>
      </WebsiteDataProvider>
    </AuthProvider>
  );
};

export default App;

