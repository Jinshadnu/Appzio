import React from 'react';

export const TrustStrip: React.FC = () => {
  const technologies = [
    { name: 'Flutter', category: 'Mobile UI', color: '#02569B' },
    { name: 'Dart', category: 'Language', color: '#0175C2' },
    { name: 'Kotlin', category: 'Android Native', color: '#7F52FF' },
    { name: 'Java', category: 'Enterprise Backend', color: '#ED8B00' },
    { name: 'React', category: 'Web Frontend', color: '#0EA5E9' },
    { name: 'PHP', category: 'Modern Web Backend', color: '#5221B5' },
    { name: 'MySQL', category: 'Relational DB', color: '#00758F' },
    { name: 'Firebase', category: 'Cloud Infrastructure', color: '#F5820D' },
    { name: 'REST APIs', category: 'Microservices', color: '#2365E8' },
    { name: 'Node.js', category: 'Runtime Engine', color: '#16A34A' },
  ];

  return (
    <section id="expertise" className="py-12 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-mono text-slate-500 font-bold">
            Core Engineering & Technology Stack
          </p>
        </div>

        {/* Marquee / Grid of clean technology badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#F8F9FD] hover:bg-white border border-slate-200/70 hover:border-brand-purple/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm"
            >
              <div
                className="w-2.5 h-2.5 rounded-full mb-2 transition-transform group-hover:scale-125"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide group-hover:text-brand-purple transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 text-center leading-tight">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
