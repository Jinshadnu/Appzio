import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useWebsiteData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackTestimonials = [
    {
      id: 1,
      client_name: 'Fahad Al-Mazrouei',
      client_title: 'Executive Director',
      company: 'TEPHRA Electro Mechanical Contracting (Dubai, UAE)',
      review: 'Appzio delivered a corporate web presence that perfectly aligns with our engineering caliber. The Swiss-inspired minimalism, fast loading speeds, and clear technical service matrices have significantly boosted our credibility during international contractor pre-qualifications in Dubai.',
      rating: 5,
    },
    {
      id: 2,
      client_name: 'Dr. Abdul Rahman Ghaf',
      client_title: 'Founder & Publisher',
      company: 'Ghaf Books & Media LLP',
      review: 'Working with Appzio on our literary bookstore was an exceptional experience. They understood the subtleties of editorial design, typographic hierarchy, and seamless reader shopping experiences. The platform performs flawlessly across all devices.',
      rating: 5,
    },
    {
      id: 3,
      client_name: 'Mohammed Mansoor',
      client_title: 'Managing Director',
      company: 'Prime Time Typing Services (Abu Dhabi, UAE)',
      review: 'Organizing more than 30 official UAE government service categories into a clean, intuitive website was a major challenge. Appzio executed this with outstanding clarity and integrated WhatsApp consultation routing that brought in immediate daily client inquiries.',
      rating: 5,
    },
    {
      id: 4,
      client_name: 'Suhail Mikhael',
      client_title: 'Director',
      company: 'Mikhael Gold & Diamonds (Kerala, India)',
      review: 'Appzio brought royal craftsmanship into our digital presentation. The typography, smooth animations, and gold showcase look stunning on both mobile and desktop screens. Truly a premier digital solutions team.',
      rating: 5,
    }
  ];

  const list = (testimonials && testimonials.length > 0) ? testimonials : fallbackTestimonials;
  const count = list.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  };

  const current = list[currentIndex];

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden bg-[#121419] text-white scroll-mt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2364D8]/10 blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold tracking-widest text-[#16BDEB] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16BDEB]" />
            <span>CLIENT PERSPECTIVES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 font-display"
          >
            Endorsed by Businesses{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
              }}
            >
              Across UAE &amp; Worldwide.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Real feedback from business owners and directors who trusted Appzio to design and engineer their mission-critical digital systems.
          </motion.p>
        </div>

        {/* Testimonial Presentation Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="relative rounded-3xl bg-[#1F222B]/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Top Row: Quote Icon & Stars */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#16BDEB]">
                <Quote className="w-6 h-6 rotate-180" />
              </div>

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-medium leading-relaxed mb-10 italic"
              >
                &ldquo;{current.review}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            {/* Author Meta & Carousel Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-bold text-lg font-display shadow-md p-3"
                  style={{
                    background: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #6326C5 100%)',
                  }}
                >
                  {current.client_name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold font-display text-white">
                    {current.client_name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {current.client_title ? `${current.client_title} • ` : ''}
                    <span className="text-[#16BDEB] font-medium">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-mono text-slate-400 mr-2">
                  0{currentIndex + 1} / 0{count}
                </span>

                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
