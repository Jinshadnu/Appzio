import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[85vh] pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-[#F8F9FD]">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-mono text-brand-purple uppercase font-semibold">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>ERROR 404 • ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-extrabold font-display text-gradient tracking-tight">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold font-display text-brand-text">
          Digital Coordinates Lost in Orbit
        </h2>

        <p className="text-base text-brand-text-muted leading-relaxed">
          The requested page or case study has either been moved, updated, or does not exist on this server.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-gradient hover:bg-brand-gradient-hover shadow-glow-sm transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-brand-text bg-white hover:border-brand-purple border border-slate-200/90 shadow-sm transition-all"
          >
            <span>Explore Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
