import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useWebsiteData();

  const isHome = location.pathname === '/';
  const isDarkHeroState = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', target: '#hero', route: '/' },
    { label: 'About Us', target: '#about', route: '/about' },
    { label: 'Our Benefits', target: '#benefits', route: '/#benefits' },
    { label: 'Services', target: '#services', route: '/services' },
    { label: 'Projects', target: '#projects', route: '/portfolio' },
    { label: 'Testimonials', target: '#testimonials', route: '/#testimonials' },
    { label: 'Contact', target: '#contact', route: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navLinks[0]) => {
    if (isHome && item.target.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(item.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        
        {/* Top Info Strip */}
        <div
          className={`text-[11px] font-medium transition-all duration-300 hidden md:block ${
            isScrolled
              ? 'h-0 opacity-0 overflow-hidden py-0 border-b-0'
              : isDarkHeroState
              ? 'bg-[#0d0d14]/75 backdrop-blur-md border-b border-white/10 text-slate-300 py-2 opacity-100'
              : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-600 py-2 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className={`flex items-center gap-1.5 font-semibold ${isDarkHeroState ? 'text-cyan-300' : 'text-[#5221B5]'}`}>
                <MapPin className="w-3.5 h-3.5 text-[#2365E8]" />
                <span>Kerala, India • Worldwide Client Delivery</span>
              </span>
              <a
                href={`mailto:${settings.contact_email}`}
                className={`transition-colors flex items-center gap-1.5 ${
                  isDarkHeroState ? 'hover:text-white text-slate-300' : 'hover:text-[#5221B5] text-slate-600'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-[#2365E8]" />
                <span>{settings.contact_email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${phoneClean}`}
                className={`transition-colors flex items-center gap-1.5 font-medium ${
                  isDarkHeroState ? 'hover:text-white text-slate-200' : 'hover:text-[#5221B5] text-slate-700'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#5221B5]" />
                <span>{phoneDisplay}</span>
              </a>
              <span className={isDarkHeroState ? 'text-white/20' : 'text-slate-300'}>|</span>
              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20have%20a%20project%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-1 text-emerald-400 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-lg shadow-purple-950/5'
              : isDarkHeroState
              ? 'bg-[#0d0d14]/40 backdrop-blur-sm py-4 border-b border-white/10'
              : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-100 shadow-xs'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              {/* Left: APPZIO Logo */}
              <Link to="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
                <img
                  src={isDarkHeroState ? '/logo-horizontal-white.png' : '/logo-horizontal.png'}
                  alt="APPZIO Logo"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Center: Clean Navigation Menu (Matching Reference) */}
              <nav
                className={`hidden lg:flex items-center space-x-1 px-4 py-1.5 rounded-full border transition-colors ${
                  isDarkHeroState
                    ? 'bg-white/10 backdrop-blur-md border-white/15'
                    : 'bg-slate-50/90 border-slate-200/80 shadow-inner'
                }`}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={isHome ? link.target : link.route}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isDarkHeroState
                        ? 'text-white/85 hover:text-white hover:bg-white/15'
                        : 'text-slate-700 hover:text-[#5221B5] hover:bg-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Right: "Call Now" CTA Button (Exact Reference Requirement) */}
              <div className="hidden sm:flex items-center gap-3">
                <a
                  href={`tel:${phoneClean}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] hover:opacity-90 shadow-md shadow-[#5221B5]/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Mobile Hamburger Button */}
              <div className="flex lg:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2.5 rounded-xl border focus:outline-none shadow-sm transition-colors ${
                    isDarkHeroState
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white border-l border-slate-200 p-6 flex flex-col justify-between transform transition-transform duration-300 shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <img src="/logo-horizontal.png" alt="APPZIO" className="h-8 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={isHome ? link.target : link.route}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-800 hover:bg-purple-50 hover:text-[#5221B5] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <a
              href={`tel:${phoneClean}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5] shadow-md shadow-[#5221B5]/30"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now ({phoneDisplay})</span>
            </a>

            <div className="text-center text-[11px] text-slate-400 font-mono">
              Kerala, India • appzio@gmail.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
