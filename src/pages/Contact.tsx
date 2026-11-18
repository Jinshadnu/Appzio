import React, { useEffect } from 'react';
import { ContactSection } from '../components/home/ContactSection';

export const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact & Project Inquiries — APPZIO';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#17191F] text-white min-h-screen pt-20">
      <ContactSection />
    </div>
  );
};

export default Contact;
