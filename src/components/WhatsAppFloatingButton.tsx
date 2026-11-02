import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useWebsiteData();
  const phoneClean = (settings.contact_whatsapp || settings.contact_phone || '+919526026636').replace(/[^0-9]/g, '');

  return (
    <a
      href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20would%20like%20to%20discuss%20a%20new%20software%20project.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Chat with APPZIO on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold tracking-wide pr-1">
        Chat on WhatsApp
      </span>
    </a>
  );
};

