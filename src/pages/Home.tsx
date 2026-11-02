import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { RecentProjectsCarousel } from '../components/home/RecentProjectsCarousel';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'APPZIO — Recreating Dream Digital Products That Last | Kerala, India';
    
    // Check if there's a hash in the URL on load and scroll to it
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative">
      {/* 1. HERO SECTION (Recreating Dream Digital Products That Last) */}
      <HeroSection />

      {/* 2. ABOUT US (Two-column layout, large supporting photo & company ethos) */}
      <AboutSection />

      {/* 3. OUR BENEFITS (4-Benefit Grid: Vast Experience, Professional Team, High Finish, Sustainable & Accountable) */}
      <BenefitsSection />

      {/* 4. OUR SERVICES (Visual dark background, service cards, More Info buttons) */}
      <ServicesSection />

      {/* 5. RECENT PROJECTS (Interactive horizontal image carousel with Next/Prev and counter) */}
      <RecentProjectsCarousel />

      {/* 6. TESTIMONIALS (Customer quotes, names, smooth carousel controls) */}
      <TestimonialsSection />

      {/* 7. CONTACT US (Two-column layout: details on left, First/Last name/Email/Phone/Address form on right) */}
      <ContactSection />
    </div>
  );
};
