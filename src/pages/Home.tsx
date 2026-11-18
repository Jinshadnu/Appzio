import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FeaturedPortfolioSection } from '../components/home/FeaturedPortfolioSection';
import { AboutSection } from '../components/home/AboutSection';
import { DevelopmentProcessSection } from '../components/home/DevelopmentProcessSection';
import { TechnologyExpertiseSection } from '../components/home/TechnologyExpertiseSection';
import { WhyAppzioSection } from '../components/home/WhyAppzioSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'APPZIO — Digital Solutions That Move Your Business Forward | Kerala & UAE';
    
    // Smooth scroll if URL hash is present
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative bg-[#17191F] text-white">
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. Services (3 Main Divisions: Digital Presence, Digital Products, Business Automation) */}
      <ServicesSection />

      {/* 03. Featured Portfolio (Asymmetric Grid: 1 Large, 2 Medium, 2 Complementary with authentic screenshots) */}
      <FeaturedPortfolioSection />

      {/* 04. About Appzio (Technology Meets Business Thinking) */}
      <AboutSection />

      {/* 05. Development Process (From Concept to Reality: Discover, Design, Develop, Deliver) */}
      <DevelopmentProcessSection />

      {/* 06. Technology Expertise (Frontend, Mobile, Backend, Database, Tools) */}
      <TechnologyExpertiseSection />

      {/* 07. Why Appzio? (7 Core Partnership Values) */}
      <WhyAppzioSection />

      {/* 08. Client Testimonials & Endorsements */}
      <TestimonialsSection />

      {/* 09. Contact Section (Specification Form & Direct WhatsApp/Email Channels) */}
      <ContactSection />
    </div>
  );
};

export default Home;
