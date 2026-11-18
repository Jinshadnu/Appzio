import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, 
  Lock, MessageCircle, ArrowRight 
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './common/SocialIcons';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

export const Footer: React.FC = () => {
  const { settings } = useWebsiteData();
  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  const quickNav = [
    { name: 'Home', path: '/#hero' },
    { name: 'Services', path: '/#services' },
    { name: 'Our Work', path: '/#portfolio' },
    { name: 'About Appzio', path: '/#about' },
    { name: 'Development Process', path: '/#process' },
    { name: 'Technology Stack', path: '/#technology' },
    { name: 'Contact Us', path: '/#contact' },
  ];

  const services = [
    { name: 'Corporate Websites', path: '/#services' },
    { name: 'E-commerce & Books Platforms', path: '/#services' },
    { name: 'Mobile Application (Flutter / iOS)', path: '/#services' },
    { name: 'Desktop Application Software', path: '/#services' },
    { name: 'ERP & Billing Systems', path: '/#services' },
    { name: 'Custom Workflow Automation', path: '/#services' },
  ];

  const featuredWork = [
    { name: 'TEPHRA (MEP Contracting, UAE)', path: '/portfolio/tephra-ae' },
    { name: 'Ghaf Books & Media (E-commerce)', path: '/portfolio/ghaf-books-media' },
    { name: 'Prime Time Typing (Abu Dhabi)', path: '/portfolio/prime-time-typing' },
    { name: 'Mikhael Gold & Diamonds (Luxury)', path: '/portfolio/mikhael-gold-diamonds' },
    { name: 'Carepoint Auto Hub (Automotive)', path: '/portfolio/carepoint-auto-hub' },
  ];

  return (
    <footer className="relative bg-[#0F1115] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#2364D8]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Strategic Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block" aria-label="APPZIO">
              <img
                src={getAssetUrl('/logo-horizontal-white.png')}
                alt="APPZIO"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              APPZIO is an international digital solutions &amp; software engineering agency based in Kerala, India. We engineer modern websites, cross-platform applications, and custom enterprise software that move businesses forward across UAE, GCC, and worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#16BDEB]">
              <MapPin className="w-4 h-4 text-[#2364D8] shrink-0" />
              <span>Kerala, India &bull; Active UAE &amp; Worldwide Delivery</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.social_linkedin || 'https://linkedin.com/company/appzio'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.social_github || 'https://github.com/appzio'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.social_instagram || 'https://instagram.com/appziodigital'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickNav.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm text-slate-400 hover:text-[#16BDEB] transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Service Capabilities
            </h4>
            <ul className="space-y-2.5">
              {services.map((svc) => (
                <li key={svc.name}>
                  <a
                    href={svc.path}
                    className="text-sm text-slate-400 hover:text-[#2364D8] transition-colors inline-block"
                  >
                    {svc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Featured Portfolio & Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Selected Work
            </h4>
            <ul className="space-y-2.5">
              {featuredWork.map((proj) => (
                <li key={proj.name}>
                  <Link
                    to={proj.path}
                    className="text-sm text-slate-400 hover:text-[#6326C5] transition-colors flex items-center justify-between group"
                  >
                    <span>{proj.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={`mailto:${settings.contact_email || 'appzio@gmail.com'}`}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#16BDEB]" />
                <span>{settings.contact_email || 'appzio@gmail.com'}</span>
              </a>
              <a
                href={`tel:${phoneClean}`}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#2364D8]" />
                <span>{phoneDisplay}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} APPZIO. All Rights Reserved. Built for international digital excellence.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/accessibility-statement" className="hover:text-slate-300 transition-colors">
              Accessibility
            </Link>
            <Link to="/admin/login" className="hover:text-slate-400 text-slate-600 transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
