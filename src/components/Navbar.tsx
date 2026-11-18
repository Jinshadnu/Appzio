import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { getAssetUrl } from '../utils/asset';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useWebsiteData();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', target: '#hero', route: '/' },
    { label: 'Services', target: '#services', route: '/services' },
    { label: 'Our Work', target: '#portfolio', route: '/portfolio' },
    { label: 'About', target: '#about', route: '/about' },
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
    } else if (!isHome && item.target.startsWith('#')) {
      e.preventDefault();
      navigate(`/${item.target}`);
      setMobileMenuOpen(false);
    }
  };

  const phoneDisplay = settings.contact_phone || '+91 9526026636';
  const phoneClean = phoneDisplay.replace(/[^0-9]/g, '');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Subtle Top Info Bar */}
        <div
          className={`text-xs transition-all duration-300 hidden md:block ${
            isScrolled
              ? 'h-0 opacity-0 overflow-hidden py-0 border-b-0'
              : 'bg-[#121419]/90 backdrop-blur-md border-b border-white/5 text-slate-400 py-2 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-6 text-[12px]">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#16BDEB]" />
                <span>Kerala, India &bull; Serving UAE, Saudi Arabia, Qatar & Global Clients</span>
              </span>
              <a
                href={`mailto:${settings.contact_email || 'appzio@gmail.com'}`}
                className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-400"
              >
                <Mail className="w-3.5 h-3.5 text-[#2364D8]" />
                <span>{settings.contact_email || 'appzio@gmail.com'}</span>
              </a>
            </div>

            <div className="flex items-center gap-5 text-[12px]">
              <a
                href={`tel:${phoneClean}`}
                className="hover:text-white transition-colors flex items-center gap-1.5 font-medium text-slate-300"
              >
                <Phone className="w-3.5 h-3.5 text-[#16BDEB]" />
                <span>{phoneDisplay}</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href={`https://wa.me/${phoneClean}?text=Hello%20APPZIO,%20I%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-semibold text-emerald-400"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Instant</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-[#17191F]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3.5'
              : 'bg-[#17191F]/70 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none shrink-0"
              aria-label="APPZIO Homepage"
            >
              <img
                src={getAssetUrl('/logo-horizontal-white.png')}
                alt="APPZIO"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/[0.04] border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
              {navLinks.map((item) => {
                const isActive =
                  location.pathname === item.route ||
                  (isHome && location.hash === item.target);

                return (
                  <a
                    key={item.label}
                    href={item.target}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#16BDEB]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action: CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#contact');
                  }
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 overflow-hidden shadow-lg shadow-[#2364D8]/20 hover:shadow-[#16BDEB]/30 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                }}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[65px] bg-[#17191F]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 py-0 px-6 pointer-events-none'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.target}
                onClick={(e) => handleNavClick(e, item)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (isHome) {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#contact');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-white text-center shadow-lg"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                }}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#16BDEB]" />
                  <span>Kerala, India &bull; UAE</span>
                </span>
                <a
                  href={`tel:${phoneClean}`}
                  className="font-semibold text-slate-200 flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#16BDEB]" />
                  <span>{phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
