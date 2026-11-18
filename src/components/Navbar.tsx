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
  // Transparent navbar when at the top of the homepage over the hero banner
  const isTransparent = isHome && !isScrolled;

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
    { label: 'About Us', target: '#about', route: '/about' },
    { label: 'Our Services', target: '#services', route: '/services' },
    { label: 'Our Work', target: '#portfolio', route: '/portfolio' },
    { label: 'Contact Us', target: '#contact', route: '/contact' },
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent py-4 sm:py-5'
            : 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-200/30 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo: White logo over transparent hero; Dark logo when scrolled or on subpages */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="APPZIO Homepage"
          >
            <img
              src={getAssetUrl(isTransparent ? '/logo-horizontal-white.png' : '/logo-horizontal.png')}
              alt="APPZIO"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center space-x-1 lg:space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isTransparent
                ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-sm'
                : 'bg-slate-50/90 border border-slate-200/80 shadow-inner'
            }`}
          >
            {navLinks.map((item) => {
              const isActive =
                location.pathname === item.route ||
                (isHome && location.hash === item.target);

              return (
                <a
                  key={item.label}
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    isTransparent
                      ? isActive
                        ? 'text-white bg-white/20 shadow-xs font-bold'
                        : 'text-slate-100 hover:text-white hover:bg-white/15'
                      : isActive
                      ? 'text-[#2364D8] bg-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-[#2364D8] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                        isTransparent ? 'bg-[#16BDEB]' : 'bg-[#2364D8]'
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: CTA Button & WhatsApp/Phone Shortcut */}
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
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
              }}
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl border transition-colors focus:outline-none ${
              isTransparent
                ? 'bg-white/15 border-white/25 text-white hover:bg-white/25 backdrop-blur-md'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[70px] bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 py-0 px-6 pointer-events-none'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.target}
                onClick={(e) => handleNavClick(e, item)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
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
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-white text-center shadow-lg shadow-blue-500/25"
                style={{
                  background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
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
                  className="font-bold text-white flex items-center gap-1 hover:text-[#16BDEB]"
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
