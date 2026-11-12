import React, { useState, useEffect } from 'react';
import { UserCheck, Award, Mic2, Feather, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import aboutSlidesData from '../data/aboutSlides.json';

interface AboutSectionProps {
  onNavigateToContact?: () => void;
}

interface AboutSlide {
  id?: string;
  image: string;
  alt?: string;
  caption?: string;
}

interface AboutConfig {
  intervalSeconds?: number;
  slides?: AboutSlide[];
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  // Carousel logic for Section 2 (Slideshow)
  const rawAboutData = aboutSlidesData as AboutConfig | AboutSlide[];
  const aboutSlides: AboutSlide[] = Array.isArray(rawAboutData)
    ? rawAboutData
    : rawAboutData.slides || [];

  const intervalSeconds = !Array.isArray(rawAboutData) && typeof rawAboutData.intervalSeconds === 'number'
    ? rawAboutData.intervalSeconds
    : 5;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  // Automatically cycle through slides in Section 2, and reset timer on manual indicator click
  useEffect(() => {
    if (aboutSlides.length <= 1 || isSlidePaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % aboutSlides.length);
    }, Math.max(intervalSeconds, 1) * 1000);

    return () => clearInterval(timer);
  }, [aboutSlides.length, isSlidePaused, currentSlideIndex, intervalSeconds]);

  const currentAboutSlide = aboutSlides[currentSlideIndex] || aboutSlides[0] || {
    image: '/hosting-president-house.jpg',
    alt: 'משה שטרן בהנחיית אירוע',
    caption: 'הנחיית טקסים ואירועים ממלכתיים',
  };

  return (
    <div className="w-full bg-[#f5f8fc]" id="about-page">
      
      {/* ========================================================
          קטע 1 (רוחב מסך מלא): תמונה מימין, טקסט משמאל
          ======================================================== */}
      <section className="w-full relative overflow-hidden py-14 md:py-20 border-b border-[#18457c]/10 bg-gradient-to-b from-[#eef4fa] to-[#f5f8fc]">
        {/* פסי רקע אלכסוניים עדינים */}
        <div className="diagonal-stripe-navy opacity-20 pointer-events-none" />
        <div className="diagonal-stripe-red opacity-15 pointer-events-none" />
        <div className="diagonal-accent-pattern absolute inset-0 opacity-30 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* מימין: תמונה ראשית */}
            <div className="lg:col-span-5 relative order-1">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBokIZguB-_vuWf9-_8H3UTE18OgX3y7we-KnePnj_xCPrSQw6lmEWnRk3sqz6yU28LtKpwSHrK2u_169MzvniX0bIQKQ_96gytSikCqvl4Y25x8W8tggkKmw2wRKCtkHSu4K6GjSj9gi585nE8np1InyPIYRyfzK4Stme3p27yOxhVtIAkor2NyY1LWm6pgrFU9FN2ts7EFFXKgTWDU1KWZufLgmFUF_ORGB3xQ0QsGkCe6qh9B1sTFg"
                    alt="משה שטרן - כותב נאומים ומנחה טקסים"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 right-4 z-10 pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20 shadow-md">
                      משה שטרן
                    </span>
                  </div>
                </div>

                {/* תגית ביטחון וניסיון */}
                <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-3 sm:-left-3 bg-white p-3 rounded-xl shadow-lg border border-[#18457c]/15 text-xs font-bold text-[#112b4e] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#ea0011]" />
                  <span>מעל עשור של כתיבה והנחיית טקסים</span>
                </div>
              </div>
            </div>

            {/* משמאל: תוכן טקסט */}
            <div className="lg:col-span-7 space-y-5 order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 border border-[#18457c]/20 text-[#18457c] text-xs md:text-sm font-bold shadow-xs">
                <UserCheck className="w-4 h-4 text-[#ea0011]" />
                <span>הסיפור מאחורי המילים</span>
              </div>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed">
                המוזמנים הניחו את כוסות המשקה והתיישבו בכיסאותיהם. הם מצפים בכיליון עיניים לתחילת האירוע. אלה הרגעים של הקשב ותשומת הלב המרבית.
              </p>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed">
                המנחה שיעלה מיד ויתייצב מאחורי הפודיום והמיקרופון הוא הפנים של האירוע, הוא הרושם הראשון שלו, והרבה יותר. כמפיקת הטקס או מארגן האירוע אתם רוצים שהוא ייראה ויישמע מצוין: רהוט, נעים, ברור ומדויק. <span className="font-bold text-[#112b4e]">לשם כך הגעתם לכאן.</span>
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          קטע 2 (רוחב מסך מלא): תמונה משמאל (גלגלת תמונות מתוך aboutSlides.json), טקסט מימין
          ======================================================== */}
      <section className="w-full relative overflow-hidden py-14 md:py-20 border-b border-[#18457c]/10 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* מימין: תוכן טקסט */}
            <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 border border-[#18457c]/20 text-[#18457c] text-xs md:text-sm font-bold shadow-xs">
                <Mic2 className="w-4 h-4 text-[#ea0011]" />
                <span>על הבמה ובאירועים</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#112b4e] tracking-tight leading-[1.2]">
                נוכחות מקצועית, שקט נפשי למארגנים וקשר בלתי אמצעי עם הקהל
              </h2>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed">
                אם הפקדתם את כתיבת הנאום עבור הדובר המרכזי בידי כותב, תרצו שיעשה זאת מי שיש לו בכך ניסיון עשיר, יכולת ניסוח מעולה והבנה קולעת של המעמד ושל אופן העברת המסרים במעמדים כאלה. <span className="font-bold text-[#112b4e]">לשם כך אולי נחתתם כאן.</span>           
              </p>

            </div>

            {/* משמאל: גלגלת תמונות מתחלפת (קרוסלה מתוך aboutSlides.json) */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Visual Box עם תחלופה */}
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group select-none"
                  onMouseEnter={() => setIsSlidePaused(true)}
                  onMouseLeave={() => setIsSlidePaused(false)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentAboutSlide.image + currentSlideIndex}
                      src={currentAboutSlide.image}
                      alt={currentAboutSlide.alt || "משה שטרן בהנחיית אירוע"}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 0.95, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Caption tag */}
                  {currentAboutSlide.caption && (
                    <div className="absolute bottom-3.5 right-4 z-10 pointer-events-none">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentAboutSlide.caption + currentSlideIndex}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.3 }}
                          className="inline-block px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20 shadow-md"
                        >
                          {currentAboutSlide.caption}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* נקודות חיווי מתחת לקרוסלה (מוצגות רק אם יש יותר מתמונה אחת) */}
                {aboutSlides.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-3">
                    {aboutSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        aria-label={`עבור לתמונה ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          currentSlideIndex === idx
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


      {/* ========================================================
          קטע 3 (רוחב מסך מלא): תמונה מימין, טקסט משמאל
          ======================================================== */}
      <section className="w-full relative overflow-hidden py-14 md:py-20 border-b border-[#18457c]/10 bg-gradient-to-b from-[#f5f8fc] to-[#eff4fa]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* מימין: תמונה */}
            <div className="lg:col-span-5 relative order-1">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group">
                  <img
                    src="/hosting-president-house.jpg"
                    alt="כתיבת נאומים ותוכן ממלכתי"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 right-4 z-10 pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20 shadow-md">
                      כתיבה למעמדים ממלכתיים ואישיים
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* משמאל: תוכן טקסט */}
            <div className="lg:col-span-7 space-y-5 order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea0011]/10 border border-[#ea0011]/20 text-[#ea0011] text-xs md:text-sm font-bold shadow-xs">
                <Feather className="w-4 h-4 text-[#ea0011]" />
                <span>אומנות הכתיבה והתוכן</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#112b4e] tracking-tight leading-[1.2]">
                כך או כך, הגעתם למקום הנכון. נעים מאוד, שמי משה שטרן ואני עומד מאחורי "כָּתוּב – נאומים, תוכן והנחיה".
              </h2>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed">
                בין אם אתם מתעניינים בהנחיה מקצועית ומיומנת ובין אם אתם מחפשים כתיבת נאום או ברכה, כנראה מצאתם. אני עוסק בשני אלה כבר למעלה מעשור: <span className="font-bold text-[#112b4e]">בכתיבת תוכן, ברכות ונאומים</span> לשורה של אישית בכירים בישראל, מיושבי ראש כנסת ועד לנשיא המדינה; <span className="font-bold text-[#112b4e]">ובהנחיית אירועים וטקסים</span> מגוונים מאוד, בהם במעמד צמרת המדינה, מכניסה והשקות עד מעמדי זיכרון והנצחה.              
                </p>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed">
                לאורך השנים זכיתי לכתוב מאות נאומים עבור נשיא המדינה, שרים, יושבי ראש הכנסת ובכירים נוספים, לצד נאומים מרגשים לחופות, בר מצוות ואירועים אישיים. בכל פרויקט אני מתאים את סגנון הכתיבה לאישיות הדובר, כך שהנאום יישמע טבעי, רהוט, אותנטי ובלתי נשכח.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          קטע 4 (רוחב מסך מלא): תמונה משמאל, טקסט מימין
          ======================================================== */}
      <section className="w-full relative overflow-hidden py-14 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* מימין: תוכן טקסט */}
            <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 border border-[#18457c]/20 text-[#18457c] text-xs md:text-sm font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-[#ea0011]" />
                <span>ערכים ומחויבות מקצועית</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#112b4e] tracking-tight leading-[1.2]">
                דיוק, הקשבה סבלנית ומחויבות מוחלטת להצלחת האירוע
              </h2>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed">
                העבודה המשותפת מתחילה בשיחת היכרות מעמיקה, שבה אני מקשיב לצרכים, לדגשים ולגוון שחשוב לכם להעביר.
              </p>

              <p className="text-base text-[#2d4869] leading-relaxed">
                עמידה קפדנית בלוחות זמנים, שירות בגובה העיניים, סבלנות לכל תיקון או שינוי ודיוק בכל פרט קטן – הם עקרונות הברזל שמלווים אותי בכל פרויקט, כדי שתוכלו להגיע לרגע הגדול בביטחון וברוגע מלא.
              </p>
            </div>

            {/* משמאל: תמונה */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group">
                  <img
                    src="/hosting/communities4-25/ARNO4243-3.jpg"
                    alt="ליווי מקצועי ומחויבות לאירוע"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 right-4 z-10 pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20 shadow-md">
                      מקצועיות, רגישות ודיוק
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
