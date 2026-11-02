import React, { useState } from 'react';
import { Smartphone, Layout, Server, Database, Wrench } from 'lucide-react';

export const TechnologiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'frontend' | 'backend' | 'database' | 'tools'>('all');

  const categories = [
    {
      id: 'mobile',
      label: 'Mobile',
      icon: Smartphone,
      techs: [
        { name: 'Flutter', desc: 'Cross-platform reactive mobile framework', badge: 'Expert' },
        { name: 'Dart', desc: 'Object-oriented language optimized for client apps', badge: 'Core' },
        { name: 'Kotlin', desc: 'Modern expressive Android native language', badge: 'Native' },
        { name: 'Java', desc: 'Battle-tested enterprise Android runtime', badge: 'Enterprise' },
      ],
    },
    {
      id: 'frontend',
      label: 'Frontend',
      icon: Layout,
      techs: [
        { name: 'React.js', desc: 'Component-driven interactive UI architecture', badge: 'Primary' },
        { name: 'TypeScript', desc: 'Type-safe scalable JavaScript codebase', badge: 'Standard' },
        { name: 'JavaScript', desc: 'Modern ECMAScript asynchronous patterns', badge: 'Core' },
        { name: 'HTML5 & CSS3', desc: 'Semantic, accessible, responsive foundations', badge: 'Standard' },
        { name: 'Tailwind CSS', desc: 'Utility-first high-speed responsive styling', badge: 'UI Engine' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      icon: Server,
      techs: [
        { name: 'PHP 8+', desc: 'High-performance typed server backend & APIs', badge: 'Backend' },
        { name: 'Node.js', desc: 'Asynchronous event-driven microservices', badge: 'Runtime' },
        { name: 'REST APIs', desc: 'Stateless, documented RESTful JSON contracts', badge: 'Protocol' },
        { name: 'WebSockets', desc: 'Real-time bidirectional event streaming', badge: 'Live Data' },
      ],
    },
    {
      id: 'database',
      label: 'Database & Cloud',
      icon: Database,
      techs: [
        { name: 'MySQL', desc: 'Relational ACID-compliant high-scale database', badge: 'Relational' },
        { name: 'Firebase', desc: 'Cloud Firestore, Auth, and Push Notifications', badge: 'Cloud' },
        { name: 'SQLite', desc: 'Ultra-fast local database for offline mobile/desktop', badge: 'Embedded' },
        { name: 'PostgreSQL', desc: 'Advanced object-relational database engine', badge: 'Enterprise' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & IDEs',
      icon: Wrench,
      techs: [
        { name: 'GitHub', desc: 'Version control, automated CI/CD workflows', badge: 'DevOps' },
        { name: 'Android Studio', desc: 'Official IDE for Android APK & AAB builds', badge: 'IDE' },
        { name: 'VS Code', desc: 'Agile cross-platform code editing environment', badge: 'Editor' },
        { name: 'Figma', desc: 'Collaborative UI/UX wireframing & prototyping', badge: 'Design' },
        { name: 'Cursor & Windsurf', desc: 'AI-assisted deep code engineering tools', badge: 'AI Tooling' },
      ],
    },
  ];

  const displayedCategories = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-semibold text-brand-blue tracking-wider uppercase font-mono">
            TECHNICAL REPERTOIRE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-brand-text">
            Powered by <span className="text-gradient">Modern Technologies.</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-text-muted leading-relaxed">
            We deliberately select battle-proven, future-proof development technologies that prioritize speed, security, and effortless maintainability.
          </p>
        </div>

        {/* Category Tab Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-brand-gradient text-white font-semibold shadow-glow-sm'
                : 'bg-slate-100 border border-slate-200/80 text-brand-text-muted hover:text-brand-text hover:bg-slate-200/60'
            }`}
          >
            All Tech Stack
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-brand-gradient text-white font-semibold shadow-glow-sm'
                  : 'bg-slate-100 border border-slate-200/80 text-brand-text-muted hover:text-brand-text hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categorized Tech Cards */}
        <div className="space-y-12">
          {displayedCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-brand-text tracking-wide">
                    {cat.label}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.techs.map((t) => (
                    <div
                      key={t.name}
                      className="p-5 rounded-2xl bg-[#F8F9FD] border border-slate-200/80 hover:border-brand-purple/40 hover:bg-white shadow-sm hover:shadow-card transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-brand-text group-hover:text-brand-purple transition-colors">
                          {t.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-brand-purple border border-purple-100 font-semibold shadow-2xs">
                          {t.badge}
                        </span>
                      </div>
                      <p className="text-xs text-brand-text-muted leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
