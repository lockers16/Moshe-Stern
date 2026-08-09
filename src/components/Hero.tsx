import React from 'react';
import { Images, BookOpen, MessageSquare, Mail } from 'lucide-react';

interface HeroProps {
  onNavigate: (tabId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
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
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 border border-[#18457c]/15 text-[#18457c] text-xs md:text-sm font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ea0011]" />
              <span>כתוב • משה שטרן</span>
            </div>

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

            {/* The 4 requested buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 max-w-xl">
              
              {/* 1. גלריית תמונות מטקסים */}
              <button
                onClick={() => onNavigate('gallery')}
                className="bg-white hover:bg-[#f1f5fa] text-[#18457c] border-2 border-[#18457c]/25 hover:border-[#18457c] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md"
              >
                <Images className="w-5 h-5 text-[#ea0011]" />
                <span>גלריית תמונות מטקסים</span>
              </button>

              {/* 2. דוגמאות לנאומים */}
              <button
                onClick={() => onNavigate('speeches')}
                className="bg-white hover:bg-[#f1f5fa] text-[#18457c] border-2 border-[#18457c]/25 hover:border-[#18457c] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md"
              >
                <BookOpen className="w-5 h-5 text-[#ea0011]" />
                <span>דוגמאות לנאומים</span>
              </button>

              {/* 3. תגובות וביקורות */}
              <button
                onClick={() => onNavigate('reviews')}
                className="bg-white hover:bg-[#f1f5fa] text-[#18457c] border-2 border-[#18457c]/25 hover:border-[#18457c] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md"
              >
                <MessageSquare className="w-5 h-5 text-[#ea0011]" />
                <span>תגובות וביקורות</span>
              </button>

              {/* 4. יצירת קשר - כחול */}
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#18457c] hover:bg-[#123662] text-white px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-[#ffdad5]" />
                <span>יצירת קשר</span>
              </button>

            </div>

          </div>

          {/* Left Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative borders and subtle glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#ea0011]/15 via-transparent to-[#18457c]/20 rounded-3xl filter blur-sm -z-10" />
              
              {/* Main Visual Box */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1NOmF-tGbAVynd4Xz4H_zGoAxnQCFljZ7Dj2zoniGimvZEV4t-lm7Pjp1a0ZiN-MWlKekFKTDCD5-tCeoUoX53E3tvLJZouOYb2qNkNmIikrJ2NjoYodj2k5KtDn5x7V48agMM2DPnOXq7QehLh8TxWz2y9amtyg6x6Cf_xEwRESV-XVHAdp2GY_tHqxpJTBI4RNbfGAaDot9cci6SFQ-zThfJEy2XWeQGaPmSTNnltPjXaJGsDr19A"
                  alt="משה שטרן מנחה אירוע"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                
                {/* Subtle Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/70 via-transparent to-transparent opacity-60" />
                
                {/* Name Tag at Bottom Corner */}
                <div className="absolute bottom-3.5 right-4 z-10">
                  <span className="px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20 shadow-md">
                    כתוב • משה שטרן
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
