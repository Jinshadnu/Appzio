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
    <section id="testimonials" className="py-28 relative overflow-hidden bg-[#F8F9FD] text-slate-900 scroll-mt-16">
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono font-bold tracking-widest text-[#2364D8] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2364D8]" />
            <span>CLIENT PERSPECTIVES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-display"
          >
            Endorsed by Businesses{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(120deg, #16BDEB 0%, #2364D8 50%, #252B9B 100%)',
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
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Read what corporate executives, enterprise leaders, and startup founders say about partnering with Appzio.
          </motion.p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 lg:p-14 shadow-xl shadow-blue-900/5 overflow-hidden">
            {/* Ambient Watermark Quote Icon */}
            <Quote className="absolute -top-4 -right-4 w-40 h-40 text-blue-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="relative z-10 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (current.rating || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-mono font-bold text-[#2364D8]">
                      5.0 VERIFIED CLIENT ENDORSEMENT
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-8">
                    &ldquo;{current.review}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-display">
                      {current.client_name}
                    </h4>
                    <p className="text-sm text-[#2364D8] font-medium">
                      {current.client_title}
                    </p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {current.company}
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-[#2364D8] transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      0{currentIndex + 1} / 0{count}
                    </div>
                    <button
                      onClick={handleNext}
                      className="p-3 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 text-slate-700 hover:text-[#2364D8] transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
