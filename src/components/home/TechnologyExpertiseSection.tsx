import React, { useState } from 'react';
import { 
  Code, Smartphone, Server, Database, Wrench, 
  Sparkles, CheckCircle2, ShieldCheck, Terminal, Cpu 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';

const easeOut: Easing = 'easeOut';

export const TechnologyExpertiseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const techCategories = [
    {
      id: 'frontend',
      label: 'Frontend',
      icon: Code,
      color: '#0284C7',
      skills: [
        { name: 'React', level: 'Production Core', desc: 'SPA & interactive web architectures' },
        { name: 'JavaScript (ES6+)', level: 'Core Language', desc: 'Modern asynchronous client programming' },
        { name: 'HTML5', level: 'Semantic Standard', desc: 'Accessible, SEO-structured web markup' },
        { name: 'CSS3 / Tailwind', level: 'Design Systems', desc: 'Responsive, fluid utility-first styling' },
      ],
    },
    {
      id: 'mobile',
      label: 'Mobile',
      icon: Smartphone,
      color: '#2364D8',
      skills: [
        { name: 'Flutter', level: 'Cross-Platform Core', desc: 'High-performance Android & iOS codebases' },
        { name: 'Dart', level: 'Programming Core', desc: 'Type-safe reactive mobile applications' },
        { name: 'Kotlin', level: 'Native Android', desc: 'Direct OS integration & background services' },
        { name: 'Java', level: 'Native Android / Enterprise', desc: 'Reliable SDK and legacy system support' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      icon: Server,
      color: '#252B9B',
      skills: [
        { name: 'PHP', level: 'Enterprise Core', desc: 'Secure server-side logic and RESTful endpoints' },
        { name: 'Node.js', level: 'Event-Driven', desc: 'Fast, non-blocking asynchronous microservices' },
        { name: 'REST APIs', level: 'Integration Standard', desc: 'Secure stateless tokenized interfaces' },
      ],
    },
    {
      id: 'database',
      label: 'Database',
      icon: Database,
      color: '#0284C7',
      skills: [
        { name: 'MySQL', level: 'Relational Standard', desc: 'High-concurrency transactional storage' },
        { name: 'Firebase', level: 'Cloud Realtime', desc: 'Instant authentication, push & Firestore' },
        { name: 'PostgreSQL', level: 'Relational Advanced', desc: 'Complex relational schemas and JSON query' },
        { name: 'SQLite', level: 'Embedded / Local', desc: 'Offline mobile & desktop persistent caching' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & DevOps',
      icon: Wrench,
      color: '#2364D8',
      skills: [
        { name: 'Git & GitHub', level: 'Version Control', desc: 'Collaborative branching, PRs, and CI/CD pipelines' },
        { name: 'Figma', level: 'UI/UX Design Systems', desc: 'High-fidelity wireframes and interactive prototypes' },
        { name: 'Android Studio', level: 'Mobile IDE', desc: 'Native device debugging and performance profiling' },
        { name: 'VS Code', level: 'Primary Workspace', desc: 'Modular TypeScript and full-stack development' },
      ],
    },
  ];

  const filteredCategories =
    activeTab === 'all'
      ? techCategories
      : techCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="technology" className="py-28 relative overflow-hidden bg-[#F8F9FD] text-slate-900 scroll-mt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2364D8]/10 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
            <span>VERIFIED TECHNICAL STACK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-display"
          >
            Built With Modern,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
              }}
            >
              Enterprise-Grade Tech.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Our core engineering stack is selected for speed, long-term maintainability, platform security, and seamless scalability across devices.
          </motion.p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'all'
                ? 'bg-[#2364D8] text-white shadow-md shadow-blue-500/25'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            All Disciplines
          </button>
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === cat.id
                  ? 'bg-[#2364D8] text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: easeOut }}
                className="group rounded-3xl bg-white border border-slate-200/90 p-8 shadow-sm hover:shadow-xl hover:border-[#2364D8]/40 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-slate-100">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#2364D8] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {cat.label}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      {cat.skills.length} core technologies
                    </span>
                  </div>
                </div>

                {/* Skills Stack List */}
                <div className="space-y-3.5">
                  {cat.skills.map((sk) => (
                    <div
                      key={sk.name}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-900 font-display">
                          {sk.name}
                        </span>
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue-50 text-[#2364D8] border border-blue-200/80">
                          {sk.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {sk.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyExpertiseSection;
