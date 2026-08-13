import React, { useState } from 'react';
import { Sparkles, Images, MessageSquare, ArrowLeft, Calendar, MapPin, CheckCircle2, ShieldCheck, HeartHandshake, Mic2, Star, Quote } from 'lucide-react';
import galleryData from '../data/gallery.json';
import reviewsHostingData from '../data/reviewsHosting.json';
import { GalleryEventItem, ReviewItem } from '../types';
import { ReviewModal } from './ReviewModal';

interface HostingHomeProps {
  onNavigate: (tabId: string) => void;
}

export const HostingHome: React.FC<HostingHomeProps> = ({ onNavigate }) => {
  const events: GalleryEventItem[] = galleryData;
  // Exactly 3 items for the gallery taste
  const previewEvents = events.slice(0, 3);

  const reviews: ReviewItem[] = reviewsHostingData;
  const previewReviews = reviews.slice(0, 3);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  return (
    <div className="bg-[#f5f8fc] space-y-16 pb-20">
      
      {/* 1. Hero Section for Ceremonies & Hosting */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[#18457c]/10 bg-gradient-to-b from-[#eef4fa] to-[#f5f8fc]">
        <div className="diagonal-stripe-navy opacity-20" />
        <div className="diagonal-stripe-red opacity-15" />

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Right: Text & Action */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 border border-[#18457c]/20 text-[#18457c] text-xs md:text-sm font-bold shadow-sm">
                <Mic2 className="w-4 h-4 text-[#ea0011]" />
                <span>הנחיית טקסים ואירועים • משה שטרן</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#112b4e] leading-[1.2] tracking-tight">
                הנחיה ממלכתית, מרגשת ומדויקת<br />
                <span className="text-[#18457c]">לכל סוגי הטקסים והאירועים</span>
              </h1>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed max-w-2xl">
                עם ניסיון של מעל עשור בהנחיית טקסים ממלכתיים, אירועי עיריות ומוסדות, חופות מרגשות, כנסי חברות וטקסי זיכרון – משה שטרן מביא עמו נוכחות בימתית מרשימה, עברית רהוטה ועמידה מדויקת בלוחות הזמנים.
              </p>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('hosting-gallery')}
                  className="bg-[#18457c] hover:bg-[#123662] text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <Images className="w-5 h-5 text-[#ffdad5]" />
                  <span>לגלריית האירועים המלאה</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('hosting-reviews')}
                  className="bg-white hover:bg-[#f1f5fa] text-[#18457c] border-2 border-[#18457c]/25 hover:border-[#18457c] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-5 h-5 text-[#ea0011]" />
                  <span>תגובות וביקורות להנחיות</span>
                </button>
              </div>
            </div>

            {/* Left: Featured Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1NOmF-tGbAVynd4Xz4H_zGoAxnQCFljZ7Dj2zoniGimvZEV4t-lm7Pjp1a0ZiN-MWlKekFKTDCD5-tCeoUoX53E3tvLJZouOYb2qNkNmIikrJ2NjoYodj2k5KtDn5x7V48agMM2DPnOXq7QehLh8TxWz2y9amtyg6x6Cf_xEwRESV-XVHAdp2GY_tHqxpJTBI4RNbfGAaDot9cci6SFQ-zThfJEy2XWeQGaPmSTNnltPjXaJGsDr19A"
                  alt="משה שטרן מנחה אירוע"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 z-10 text-white">
                  <span className="px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-lg border border-white/20">
                    הנחיית טקסים מקצועית
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. Gallery Taste (טעימה מהגלריה - בדיוק 3 פריטים) */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#ea0011]" />
              <span>טעימה מהשטח</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              טעימה מגלריית האירועים והטקסים
            </h2>
            <p className="text-sm sm:text-base text-[#425d7e]">
              3 רגעים נבחרים מתוך מגוון האירועים שהונחו על ידי משה שטרן
            </p>
          </div>

          <button
            onClick={() => onNavigate('hosting-gallery')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#18457c] hover:text-[#ea0011] transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#18457c]/20 shadow-xs self-start sm:self-auto"
          >
            <span>לכל האלבומים בגלריה המלאה</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewEvents.map((item) => {
            const coverImage = item.images?.[0] || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80';
            const photoCount = item.images?.length || 1;

            return (
              <div
                key={item.id}
                onClick={() => onNavigate('hosting-gallery')}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#18457c]/15 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18457c]">
                  <img
                    src={coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-full border border-white/20 flex items-center gap-1">
                      <Images className="w-3 h-3 text-[#ffdad5]" />
                      <span>{photoCount} תמונות</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#577291] font-semibold mb-1.5">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#ea0011]" />
                          {item.location}
                        </span>
                      )}
                      {item.location && item.date && <span>•</span>}
                      {item.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#18457c]" />
                          {item.date}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#112b4e] group-hover:text-[#18457c] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#18457c]/10 flex items-center justify-between text-xs font-bold text-[#18457c]">
                    <span>לצפייה באלבום המלא</span>
                    <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. Core Advantages of Moshe as Host */}
      <section className="bg-white py-12 border-y border-[#18457c]/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              למה לבחור במשה שטרן להנחיית האירוע שלכם?
            </h2>
            <p className="text-sm sm:text-base text-[#425d7e]">
              מקצועיות, רגישות וניסיון שמבטיחים אירוע שזורם ללא תקלות
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#f5f8fc] border border-[#18457c]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#18457c] text-white flex items-center justify-center shadow-md">
                <Mic2 className="w-6 h-6 text-[#ffdad5]" />
              </div>
              <h3 className="text-lg font-bold text-[#112b4e]">נוכחות בימתית ועברית רהוטה</h3>
              <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                הגשה מכובדת, קול נעים וממלכתי, והקפדה על עברית תקנית ועשירה המתאימה בדיוק לאופי המעמד.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f5f8fc] border border-[#18457c]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ea0011] text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#112b4e]">שליטה בלוח הזמנים וגמישות</h3>
              <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                ניהול רגוע של לוח הזמנים, תיאום מלא עם ההפקה וצוותי הבמה, ומענה מהיר וחלק לכל בלת״ם בשטח.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f5f8fc] border border-[#18457c]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#18457c] text-white flex items-center justify-center shadow-md">
                <HeartHandshake className="w-6 h-6 text-[#ea0011]" />
              </div>
              <h3 className="text-lg font-bold text-[#112b4e]">התאמה אישית וחיבור לקהל</h3>
              <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                הקשבה מלאה לחזון שלכם, שילוב רגש והומור במינון המדויק, ויצירת חיבור חם עם הקהל באולם.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Taste of Hosting Reviews */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5 text-[#ea0011]" />
              <span>המלצות לקוחות</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              מה אומרים על הנחיית הטקסים?
            </h2>
          </div>

          <button
            onClick={() => onNavigate('hosting-reviews')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#18457c] hover:text-[#ea0011] transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#18457c]/20 shadow-xs self-start sm:self-auto"
          >
            <span>לכל הביקורות וההמלצות</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewReviews.map((rev) => (
            <div
              key={rev.id}
              onClick={() => setSelectedReview(rev)}
              className="bg-white p-6 rounded-2xl border border-[#18457c]/15 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {typeof rev.rating === 'number' && rev.rating > 0 ? (
                    <div className="flex items-center text-[#ea0011]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ea0011] text-[#ea0011]" />
                      ))}
                    </div>
                  ) : <div />}
                  {rev.subject && (
                    <span className="text-[11px] font-bold text-[#18457c] bg-[#eef3f8] px-2 py-0.5 rounded">
                      {rev.subject}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#2d4869] leading-relaxed line-clamp-3 font-serif">
                  ״{rev.content}״
                </p>
                <span className="text-xs font-bold text-[#ea0011]">קראו עוד...</span>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#18457c]/10">
                {rev.avatarUrl ? (
                  <img src={rev.avatarUrl} alt={rev.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#18457c]/10 text-[#18457c] font-bold flex items-center justify-center text-sm">
                    {rev.name.slice(0, 1)}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-[#112b4e]">{rev.name}</div>
                  <div className="text-[11px] text-[#577291]">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 5. Bottom Call to Action */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-[#18457c] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden text-right flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold">מתכננים טקס או אירוע מיוחד?</h3>
            <p className="text-sm sm:text-base text-[#d6e3f8] leading-relaxed">
              צרו קשר ישיר עם משה שטרן לתיאום פגישת היכרות והבטחת התאריך לאירוע שלכם.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 z-10">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#ea0011] hover:bg-[#c9000e] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer"
            >
              פרטי קשר ושיחה מהירה
            </button>
            <button
              onClick={() => onNavigate('speeches-home')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer"
            >
              מעבר לכתיבת נאומים
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />

    </div>
  );
};
