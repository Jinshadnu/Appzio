import React from 'react';
import { Award, Users, Code, Headset } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '50+',
      label: 'Projects Delivered',
      sub: 'Web, Mobile & Desktop',
      color: 'text-brand-purple',
      bg: 'bg-purple-50 text-brand-purple border-purple-100',
    },
    {
      icon: Users,
      value: '99%',
      label: 'Client Satisfaction',
      sub: 'Kerala, India & Worldwide',
      color: 'text-brand-blue',
      bg: 'bg-blue-50 text-brand-blue border-blue-100',
    },
    {
      icon: Code,
      value: '100%',
      label: 'Intellectual Property',
      sub: 'Direct Code Ownership',
      color: 'text-brand-violet',
      bg: 'bg-violet-50 text-brand-violet border-violet-100',
    },
    {
      icon: Headset,
      value: '24/7',
      label: 'Technical Support',
      sub: 'Dedicated Engineering SLAs',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80 relative shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${s.bg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-3xl sm:text-4xl font-extrabold font-display ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
