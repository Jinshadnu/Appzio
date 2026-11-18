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
      color: '#16BDEB',
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
      color: '#6326C5',
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
      color: '#16BDEB',
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
    <section id="technology" className="py-28 relative overflow-hidden bg-[#17191F] text-white scroll-mt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#16BDEB]/10 blur-[170px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#6326C5]/15 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
            <span>VERIFIED TECHNICAL STACK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display"
          >
            Engineering With{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
              }}
            >
              Proven Technologies.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            We choose reliable, maintainable, and modern tools that offer long-term stability and high performance for your digital products.
          </motion.p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            All Disciplines
          </button>
          {techCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Categories & Skills Display */}
        <div className="space-y-10">
          {filteredCategories.map((cat, idx) => {
            const CategoryIcon = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: easeOut }}
                className="rounded-3xl bg-[#1F222B]/75 backdrop-blur-xl border border-white/10 p-7 sm:p-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      {cat.label} Engineering
                    </h3>
                    <p className="text-xs text-slate-400">
                      Production-tested technologies genuinely mastered and supported by Appzio
                    </p>
                  </div>
                </div>

                {/* Grid of Technologies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-white font-display group-hover:text-[#16BDEB] transition-colors">
                          {skill.name}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#16BDEB]" />
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-400 block mb-1">
                        {skill.level}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {skill.desc}
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
