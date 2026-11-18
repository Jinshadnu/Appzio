import React from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, Cpu, 
  Users, TrendingUp, Layers, LifeBuoy, MapPin 
} from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { getAssetUrl } from '../../utils/asset';

const easeOut: Easing = 'easeOut';

export const AboutSection: React.FC = () => {
  const { settings } = useWebsiteData();

  const corePillars = [
    {
      title: 'Modern Technology',
      description: 'Built with resilient, production-tested stacks like React, Next.js, Flutter, and scalable API microservices.',
      icon: Cpu,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
    },
    {
      title: 'User-Centred Design',
      description: 'Obsessive attention to typography, frictionless information hierarchy, and intuitive user experiences.',
      icon: Users,
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
    },
    {
      title: 'Business-Focused Development',
      description: 'We prioritize outcomes that drive inquiries, conversions, and measurable business growth for our partners.',
      icon: TrendingUp,
      color: 'text-[#252B9B]',
      iconBg: 'bg-indigo-50 border-indigo-200/80',
    },
    {
      title: 'Scalable Solutions',
      description: 'Architectures engineered to handle traffic spikes, regional data localization, and expanding catalogs smoothly.',
      icon: Layers,
      color: 'text-[#2364D8]',
      iconBg: 'bg-blue-50 border-blue-200/80',
    },
    {
      title: 'Reliable Support',
      description: 'Direct engineer availability, continuous monitoring, and proactive maintenance for complete peace of mind.',
      icon: LifeBuoy,
      color: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 border-sky-200/80',
    }
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden bg-[#F8F9FD] text-slate-900 scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#16BDEB]/10 blur-[150px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#2364D8]/10 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with Team/Office Presence */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
              <img
                src={getAssetUrl('/hero-team-hd2.jpg')}
                alt="Appzio Digital Engineering Team"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Editorial Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#2364D8] uppercase tracking-wider">
                    APPZIO DIGITAL LABS
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#2364D8]" />
                    <span>Kerala, India &bull; UAE</span>
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  Transforming Ideas Into Living Digital Experiences
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Bridging technical mastery with design thinking for forward-looking brands across GCC and international markets.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy & Core Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4 self-start"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
              <span>ABOUT APPZIO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 font-display"
            >
              Technology Meets{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
                }}
              >
                Business Thinking.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
              className="space-y-4 text-base text-slate-600 leading-relaxed mb-8"
            >
              <p>
                {settings.about_description ||
                  'Appzio is a digital solutions brand focused on helping businesses establish, improve and scale their digital presence.'}
              </p>
              <p className="text-slate-500 text-sm">
                We combine thoughtful design, modern development practices and business-oriented technology to create websites, applications and software solutions that solve real-world problems.
              </p>
            </motion.div>

            {/* 5 Highlighted Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
              className="space-y-3.5"
            >
              {corePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2364D8]/40 hover:shadow-md transition-all flex items-start gap-3.5"
                  >
                    <div className={`w-9 h-9 rounded-xl ${pillar.iconBg} border flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${pillar.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5 font-display">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
