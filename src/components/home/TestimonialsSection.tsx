import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { useWebsiteData } from '../../context/WebsiteDataContext';

const easeOut: Easing = 'easeOut';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useWebsiteData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackTestimonials: {
    id: number;
    client_name: string;
    client_title: string;
    company: string;
    review: string;
    rating: number;
    avatar_url?: string;
  }[] = [
    {
      id: 1,
      client_name: 'Alexander Wright',
      client_title: 'Chief Technology Officer',
      company: 'Aether Financial Technologies (London, UK)',
      review: 'Working with APPZIO was a game-changer for our fintech product launch. Their technical mastery of Flutter and backend architecture ensured our app delivered bank-grade reliability with an exceptionally refined, modern interface.',
      rating: 5,
    },
    {
      id: 2,
      client_name: 'Rashid Al-Maktoum',
      client_title: 'Managing Director',
      company: 'Novus Freight Logistics (Dubai & Saudi Arabia)',
      review: 'APPZIO engineered our regional logistics portal from the ground up. Their team has rare dual-competence: deep architectural knowledge coupled with an intuitive eye for premium UX. Our dispatch times plummeted by 40% in the first quarter.',
      rating: 5,
    },
    {
      id: 3,
      client_name: 'Elena Rossi',
      client_title: 'Principal Architect & Partner',
      company: 'Krona Architectural Studio (Milan, Italy)',
      review: 'We approached APPZIO with an uncompromising aesthetic vision for our architectural portfolio. They translated our concepts into a silky-smooth, responsive digital reality. Our international client inquiries surged immediately.',
      rating: 5,
    },
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
    <section id="testimonials" className="py-28 bg-[#F8F9FD] relative overflow-hidden scroll-mt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#5221B5]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading (Matching Reference H2: Testimonials) */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-mono font-bold text-[#5221B5] tracking-widest uppercase shadow-xs">
            CLIENT ENDORSEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#191923]">
            Testimonials.
          </h2>
          <p className="text-base text-slate-600">
            Hear directly from clients and technology partners who build their products with APPZIO.
          </p>
        </div>

        {/* Testimonial Feature Card */}
        <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-14 shadow-xl hover:border-[#5221B5]/40 transition-all duration-300 overflow-hidden">
          {/* Subtle Top Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2365E8] via-[#5221B5] to-[#7435D5]" />

          <Quote className="absolute top-8 right-8 w-24 h-24 text-purple-100/70 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-xs font-mono font-bold text-slate-400">5.0 / 5.0 Rating</span>
            </div>

            {/* Testimonial Quote with Animated Transitions */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id || currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="text-lg sm:text-2xl text-[#191923] font-normal leading-relaxed min-h-[100px]"
              >
                "{current.review}"
              </motion.blockquote>
            </AnimatePresence>

            {/* Author Meta & Carousel Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                {current.avatar_url ? (
                  <img
                    src={current.avatar_url}
                    alt={current.client_name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2365E8] to-[#5221B5] flex items-center justify-center text-white font-bold text-lg font-display shadow-md shadow-[#5221B5]/20">
                    {current.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold font-display text-[#191923]">
                    {current.client_name}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-[#5221B5]">
                    {current.client_title ? `${current.client_title} • ` : ''}{current.company}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-[#F8F9FD] border border-slate-200 flex items-center justify-center text-[#191923] hover:bg-gradient-to-r hover:from-[#2365E8] hover:to-[#5221B5] hover:text-white hover:border-transparent transition-all cursor-pointer shadow-xs"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1.5 px-2">
                  {list.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentIndex(dotIdx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        dotIdx === currentIndex ? 'w-6 bg-[#5221B5]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to testimonial ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-[#F8F9FD] border border-slate-200 flex items-center justify-center text-[#191923] hover:bg-gradient-to-r hover:from-[#2365E8] hover:to-[#5221B5] hover:text-white hover:border-transparent transition-all cursor-pointer shadow-xs"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
