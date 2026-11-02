import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Lock, MessageCircle } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

export const Footer: React.FC = () => {
  const { settings } = useWebsiteData();
  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  const exploreLinks = [
    { name: 'Home', path: '/#hero' },
    { name: 'About Us', path: '/#about' },
    { name: 'Our Benefits', path: '/#benefits' },
    { name: 'Services', path: '/#services' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <footer className="relative bg-[#0c0d14] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[#5221B5]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Footer Columns (Matching Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <img src={getAssetUrl('/logo-horizontal-white.png')} alt="APPZIO" className="h-10 w-auto" />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              APPZIO is a software development and digital engineering brand based in Kerala, India. We architect high-performance websites, mobile applications, and enterprise digital solutions for international businesses.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <MapPin className="w-4 h-4 text-[#2365E8]" />
              <span>Kerala, India • Worldwide Client Delivery</span>
            </div>

            <div className="pt-1">
              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Navigation Links (Matching Reference: Explore) (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info & Socials (Matching Reference) (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                Contact Us
              </h3>
              
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">{settings.address || 'Kerala, India'}</span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5221B5] shrink-0" />
                  <a href={`tel:${phoneClean}`} className="hover:text-white transition-colors text-slate-300">
                    {phoneDisplay}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#2365E8] shrink-0" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-white transition-colors text-slate-300">
                    {settings.contact_email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links (Matching Reference: Follow Us on Socials) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Follow Us on Socials
              </h4>
              <div className="flex items-center gap-2.5">
                {settings.social_linkedin && (
                  <a
                    href={settings.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[#5221B5] transition-all"
                  >
                    LinkedIn
                  </a>
                )}
                {settings.social_github && (
                  <a
                    href={settings.social_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[#5221B5] transition-all"
                  >
                    GitHub
                  </a>
                )}
                {settings.social_instagram && (
                  <a
                    href={settings.social_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[#5221B5] transition-all"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Links (Matching Reference) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} by APPZIO. All Rights Reserved. Crafted for digital excellence.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/accessibility-statement" className="hover:text-white transition-colors">
              Accessibility Statement
            </Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/admin/login" className="hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono">
              <Lock className="w-3 h-3" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
