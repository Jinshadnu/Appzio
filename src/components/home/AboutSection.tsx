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
      color: 'text-[#16BDEB]'
    },
    {
      title: 'User-Centred Design',
      description: 'Obsessive attention to typography, frictionless information hierarchy, and intuitive user experiences.',
      icon: Users,
      color: 'text-[#2364D8]'
    },
    {
      title: 'Business-Focused Development',
      description: 'We prioritize outcomes that drive inquiries, conversions, and measurable business growth for our partners.',
      icon: TrendingUp,
      color: 'text-[#6326C5]'
    },
    {
      title: 'Scalable Solutions',
      description: 'Architectures engineered to handle traffic spikes, regional data localization, and expanding catalogs smoothly.',
      icon: Layers,
      color: 'text-[#16BDEB]'
    },
    {
      title: 'Reliable Support',
      description: 'Direct engineer availability, continuous monitoring, and proactive maintenance for complete peace of mind.',
      icon: LifeBuoy,
      color: 'text-[#2364D8]'
    }
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden bg-[#17191F] text-white scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#16BDEB]/10 blur-[150px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#6326C5]/15 blur-[160px]" />
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
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#1F222B]">
              <img
                src={getAssetUrl('/hero-team-hd2.jpg')}
                alt="Appzio Digital Engineering Team"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17191F] via-[#17191F]/40 to-transparent" />

              {/* Editorial Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#1F222B]/95 backdrop-blur-xl border border-white/15 text-white shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#16BDEB] uppercase tracking-wider">
                    APPZIO DIGITAL LABS
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#16BDEB]" />
                    <span>Kerala, India &bull; UAE</span>
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white font-display">
                  Transforming Ideas Into Living Digital Experiences
                </h4>
                <p className="text-xs text-slate-400 mt-1">
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4 self-start"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
              <span>ABOUT APPZIO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 font-display"
            >
              Technology Meets{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
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
              className="space-y-4 text-base text-slate-300 leading-relaxed mb-8"
            >
              <p>
                {settings.about_description ||
                  'Appzio is a digital solutions brand focused on helping businesses establish, improve and scale their digital presence.'}
              </p>
              <p className="text-slate-400 text-sm">
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
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${pillar.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5 font-display">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
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
