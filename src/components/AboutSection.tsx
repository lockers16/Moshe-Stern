import React from 'react';
import { UserCheck, Award, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  onNavigateToContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateToContact }) => {
  return (
    <section className="py-12 md:py-20 bg-[#f5f8fc] relative overflow-hidden" id="about-section">
      {/* Decorative diagonal stripes in blue & red */}
      <div className="diagonal-stripe-navy opacity-15" />
      <div className="diagonal-stripe-red opacity-20" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-16 relative z-10 text-right">
        
        {/* Meet Moshe Stern Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual on the Left (Desktop) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#18457c]/20 bg-[#18457c]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBokIZguB-_vuWf9-_8H3UTE18OgX3y7we-KnePnj_xCPrSQw6lmEWnRk3sqz6yU28LtKpwSHrK2u_169MzvniX0bIQKQ_96gytSikCqvl4Y25x8W8tggkKmw2wRKCtkHSu4K6GjSj9gi585nE8np1InyPIYRyfzK4Stme3p27yOxhVtIAkor2NyY1LWm6pgrFU9FN2ts7EFFXKgTWDU1KWZufLgmFUF_ORGB3xQ0QsGkCe6qh9B1sTFg"
                alt="משה שטרן - מנחה וכותב נאומים"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18457c] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-6 left-6 text-white">
                <span className="text-xs font-bold text-[#ffdad5] uppercase tracking-wider block">
                  משה שטרן
                </span>
                <div className="text-lg font-bold">כותב נאומים ומנחה טקסים</div>
              </div>
            </div>

            <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-4 sm:-left-4 bg-white p-3.5 rounded-xl shadow-lg border border-[#18457c]/15 text-xs font-bold text-[#112b4e] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ea0011]" />
              <span>מעל עשור של כתיבה והנחיית טקסים</span>
            </div>
          </div>

          {/* Text on the Right */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold shadow-sm">
              <UserCheck className="w-3.5 h-3.5 text-[#ea0011]" />
              <span>הסיפור מאחורי המילים</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-[#112b4e] tracking-tight">
              ״לכל אדם יש סיפור. התפקיד שלי הוא להפוך אותו למילים נוגעות״
            </h2>

            <p className="text-base md:text-lg text-[#2d4869] leading-relaxed">
              שמי משה שטרן. לאורך השנים ליוויתי משפחות, זוגות, ארגונים ומוסדות ברגעים המשמעותיים ביותר שלהם.
            </p>

            <p className="text-base text-[#2d4869] leading-relaxed">
              הגישה שלי משלבת הקשבה מלאה, רגישות ודיוק בפרטים. אני מאמין שאין צורך בקלישאות או מילים מנופחות – העוצמה של נאום או טקס נובעת מפשטות, כנות, דיוק בזמנים וחיבור אותנטי עם הקהל.
            </p>

            {onNavigateToContact && (
              <div className="pt-3">
                <button
                  onClick={onNavigateToContact}
                  className="bg-[#18457c] hover:bg-[#123662] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-[#ea0011]" />
                  <span>מעבר ליצירת קשר</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
