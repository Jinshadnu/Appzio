import React, { useEffect } from 'react';
import { ServicesSection } from '../components/home/ServicesSection';

export const Services: React.FC = () => {
  useEffect(() => {
    document.title = 'Digital Solutions & Services — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8F9FD] min-h-screen pt-16">
      <ServicesSection />
    </div>
  );
};

export default Services;
