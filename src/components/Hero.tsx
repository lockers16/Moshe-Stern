import React, { useState, useEffect } from 'react';
import { Images, BookOpen, MessageSquare, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import heroSlidesData from '../data/heroSlides.json';

interface HeroProps {
  onNavigate: (tabId: string) => void;
}

interface HeroSlide {
  id?: string;
  image: string;
  alt?: string;
  caption?: string;
}

interface HeroConfig {
  intervalSeconds?: number;
  slides?: HeroSlide[];
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const rawData = heroSlidesData as HeroConfig | HeroSlide[];
  
  const slides: HeroSlide[] = Array.isArray(rawData)
    ? rawData
    : rawData.slides || [];

  const intervalSeconds = !Array.isArray(rawData) && typeof rawData.intervalSeconds === 'number'
    ? rawData.intervalSeconds
    : 5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically cycle through slides, and reset the timer whenever the slide index changes (including manual clicks)
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, Math.max(intervalSeconds, 1) * 1000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused, currentIndex, intervalSeconds]);

  const currentSlide = slides[currentIndex] || slides[0] || {
    image: '/hosting-president-house.jpg',
    alt: 'משה שטרן בהנחיית אירוע בבית הנשיא',
    caption: 'משה שטרן בהנחיית אירוע בבית הנשיא',
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#18457c]/10 bg-gradient-to-b from-[#f5f8fc] to-[#eff4fb]">
      {/* Rich diagonal decorative background lines in blue & red */}
      <div className="diagonal-stripe-navy opacity-20" />
      <div className="diagonal-stripe-red opacity-25" />
      <div className="diagonal-accent-pattern absolute inset-0 opacity-40 pointer-events-none" />

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#cbe0fb]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#ffdcd8]/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Right Column: Hero Text & 4 Navigation Buttons */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#112b4e] leading-[1.15] tracking-tight">
              מילים שנוגעות.<br />
              <span className="text-[#ea0011] relative inline-block">
                רגעים שנשארים.
                <svg className="absolute -bottom-2 right-0 w-full h-2.5 text-[#ea0011]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[#2d4869] leading-relaxed max-w-2xl font-normal">
              שלום, שמי משה שטרן. אני כותב נאומים ומנחה טקסים עם ניסיון עשיר בליווי חופות, בר ובת מצווה, כנסים, אירועים עסקיים וטקסים ממלכתיים. המטרה שלי היא לזקק את הסיפור שלכם לטקסט מנוסח לעילא ומוגש בדיוק, ברגש ובחן.
            </p>

            {/* The core navigation buttons leading to the main sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 max-w-xl">
              
              {/* 1. הנחיית טקסים */}
              <button
                onClick={() => onNavigate('hosting-home')}
                className="bg-white hover:bg-[#f1f5fa] text-[#18457c] border-2 border-[#18457c]/25 hover:border-[#18457c] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#18457c]/10 group-hover:bg-[#18457c] group-hover:text-white text-[#18457c] flex items-center justify-center transition-colors">
                  <Images className="w-4 h-4 text-[#ea0011] group-hover:text-white" />
                </div>
                <span>הנחיית טקסים</span>
              </button>

              {/* 2. כתיבת תוכן ונאומים */}
              <button
                onClick={() => onNavigate('speeches-home')}
                className="bg-white hover:bg-[#fff5f5] text-[#ea0011] border-2 border-[#ea0011]/25 hover:border-[#ea0011] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#ea0011]/10 group-hover:bg-[#ea0011] group-hover:text-white text-[#ea0011] flex items-center justify-center transition-colors">
                  <BookOpen className="w-4 h-4 text-[#ea0011] group-hover:text-white" />
                </div>
                <span>כתיבת תוכן ונאומים</span>
              </button>

              {/* 3. אודות */}
              <button
                onClick={() => onNavigate('about')}
                className="bg-white hover:bg-[#f1f5fa] text-[#112b4e] border-2 border-[#18457c]/20 hover:border-[#18457c] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#18457c]" />
                <span>אודות</span>
              </button>

              {/* 4. יצירת קשר */}
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#18457c] hover:bg-[#123662] text-white px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#ffdad5]" />
                <span>דברו איתי</span>
              </button>

            </div>

          </div>

          {/* Left Column: Hero Visual Showcase / Slideshow */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative borders and subtle glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#ea0011]/15 via-transparent to-[#18457c]/20 rounded-3xl filter blur-sm -z-10" />
              
              {/* Main Visual Box */}
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.image + currentIndex}
                    src={currentSlide.image}
                    alt={currentSlide.alt || "משה שטרן בהנחיית אירוע"}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 0.95, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
                
                {/* Subtle Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Caption Tag at Bottom Corner */}
                {currentSlide.caption && (
                  <div className="absolute bottom-3.5 right-4 z-10 pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentSlide.caption + currentIndex}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20 shadow-md"
                      >
                        {currentSlide.caption}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Indicator dots beneath the carousel - only shown if more than 1 slide exists */}
              {slides.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-3">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`עבור לתמונה ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx
                          ? 'w-6 bg-[#18457c]'
                          : 'w-2 bg-[#18457c]/30 hover:bg-[#18457c]/60'
                      }`}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
