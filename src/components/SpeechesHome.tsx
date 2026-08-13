import React, { useState } from 'react';
import { Sparkles, BookOpen, MessageSquare, ArrowLeft, PenTool, Star, Quote, Volume2 } from 'lucide-react';
import speechesData from '../data/speeches.json';
import reviewsSpeechesData from '../data/reviewsSpeeches.json';
import { SpeechItem, ReviewItem } from '../types';
import { ReviewModal } from './ReviewModal';

interface SpeechesHomeProps {
  onNavigate: (tabId: string) => void;
}

export const SpeechesHome: React.FC<SpeechesHomeProps> = ({ onNavigate }) => {
  const speeches: SpeechItem[] = speechesData;
  // Exactly 3 items for the speeches taste
  const previewSpeeches = speeches.slice(0, 3);

  const reviews: ReviewItem[] = reviewsSpeechesData;
  const previewReviews = reviews.slice(0, 3);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  return (
    <div className="bg-[#f5f8fc] space-y-16 pb-20">
      
      {/* 1. Hero Section for Speeches & Writing */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[#ea0011]/15 bg-gradient-to-b from-[#fff5f5] via-[#fdf8f8] to-[#f5f8fc]">
        <div className="diagonal-stripe-red opacity-20" />
        <div className="diagonal-stripe-navy opacity-10" />

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Right: Text & Action */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea0011]/10 border border-[#ea0011]/20 text-[#ea0011] text-xs md:text-sm font-bold shadow-sm">
                <PenTool className="w-4 h-4 text-[#ea0011]" />
                <span>כתיבת נאומים וטקסטים • משה שטרן</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#112b4e] leading-[1.2] tracking-tight">
                מילים שמזקקות את הרגש.<br />
                <span className="text-[#ea0011]">נאומים שנכנסים ישר ללב.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#2d4869] leading-relaxed max-w-2xl">
                רוצים לברך בחופה, לשאת דרשת בר מצווה מעצימה, להודות לתורמים בערב גאלה או להיפרד מאדם יקר? משה שטרן מקשיב לסיפור שלכם והופך אותו לנאום מבריק, אותנטי ומותאם אישית לקול הייחודי שלכם.
              </p>

              {/* Navigation Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('speeches-full')}
                  className="bg-[#ea0011] hover:bg-[#c9000e] text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-white" />
                  <span>לכל דוגמאות הנאומים</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('speeches-reviews')}
                  className="bg-white hover:bg-[#fff5f5] text-[#ea0011] border-2 border-[#ea0011]/25 hover:border-[#ea0011] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-5 h-5 text-[#ea0011]" />
                  <span>תגובות וביקורות לנאומים</span>
                </button>
              </div>
            </div>

            {/* Left: Featured Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#ea0011]/20 bg-white p-6 sm:p-8 space-y-4 text-right">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded bg-[#ea0011]/10 text-[#ea0011]">
                    מלאכת הכתיבה
                  </span>
                  <Quote className="w-7 h-7 text-[#ea0011]/25" />
                </div>

                <h3 className="text-lg font-bold text-[#112b4e]">
                  ״הנאום הטוב ביותר הוא זה שנשמע בדיוק כמוכם – רק הגרסה המנוסחת והמרגשת ביותר שלכם״
                </h3>

                <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                  הכתיבה נעשית מתוך שותפות מלאה, בקצב הדיבור הנוח לכם, תוך הדרכה מעשית על אינטונציה, נשימות ועמידה מול קהל.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. Speeches Taste (טעימה מדוגמאות הנאומים - בדיוק 3 פריטים) */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea0011]/10 text-[#ea0011] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#ea0011]" />
              <span>טעימה מהטקסטים</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              טעימה מדוגמאות הנאומים שנכתבו
            </h2>
            <p className="text-sm sm:text-base text-[#425d7e]">
              3 דוגמאות מתוך קטגוריות שונות שנכתבו בהתאמה אישית מלאה
            </p>
          </div>

          <button
            onClick={() => onNavigate('speeches-full')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#ea0011] hover:text-[#c9000e] transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#ea0011]/25 shadow-xs self-start sm:self-auto"
          >
            <span>לספריית הנאומים המלאה</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewSpeeches.map((speech) => (
            <div
              key={speech.id}
              onClick={() => onNavigate('speeches-full')}
              className="group bg-white rounded-2xl p-6 border border-[#ea0011]/15 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#ea0011]/10 text-[#ea0011]">
                    {speech.category}
                  </span>
                  {speech.subject && (
                    <span className="text-[11px] font-semibold text-[#577291] truncate max-w-[150px]">
                      {speech.subject}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#112b4e] group-hover:text-[#ea0011] transition-colors leading-snug">
                  {speech.title}
                </h3>

                {/* Excerpt in David Font */}
                <p className="text-xs sm:text-sm text-[#2d4869] leading-relaxed font-david line-clamp-4 bg-[#fff9f9] p-3 rounded-lg border border-[#ea0011]/10">
                  {speech.content.slice(0, 180)}...
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#ea0011]">
                <span>לקריאת הנאום המלא</span>
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. The 4 Steps Process of Speech Writing */}
      <section className="bg-white py-12 border-y border-[#ea0011]/15">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              איך עובד תהליך כתיבת הנאום?
            </h2>
            <p className="text-sm sm:text-base text-[#425d7e]">
              ארבעה שלבים פשוטים, נעימים ומובנים שמביאים לתוצאה מושלמת
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-2 text-right">
              <div className="w-10 h-10 rounded-lg bg-[#ea0011] text-white font-bold flex items-center justify-center text-sm shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-[#112b4e]">שיחת היכרות והקשבה</h3>
              <p className="text-xs text-[#425d7e] leading-relaxed">
                משוחחים בנחת, אוספים סיפורים, אנקדוטות ורגשות, ומגדירים יחד את אופי הנאום.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-2 text-right">
              <div className="w-10 h-10 rounded-lg bg-[#ea0011] text-white font-bold flex items-center justify-center text-sm shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-[#112b4e]">כתיבה וניסוח מקצועי</h3>
              <p className="text-xs text-[#425d7e] leading-relaxed">
                משה מזקק את המילים למבנה מרתק, קצבי, מרגש ומדויק ללא שום קלישאות.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-2 text-right">
              <div className="w-10 h-10 rounded-lg bg-[#ea0011] text-white font-bold flex items-center justify-center text-sm shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-[#112b4e]">דיוק ומשוב משותף</h3>
              <p className="text-xs text-[#425d7e] leading-relaxed">
                עוברים יחד על הטיוטה, מתקנים ומחדדים עד שכל משפט יושב בטבעיות על הלשון.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-2 text-right">
              <div className="w-10 h-10 rounded-lg bg-[#ea0011] text-white font-bold flex items-center justify-center text-sm shadow-md">
                4
              </div>
              <h3 className="text-base font-bold text-[#112b4e]">אימון עמידה מול קהל</h3>
              <p className="text-xs text-[#425d7e] leading-relaxed">
                הדרכה על קצב דיבור, נשימות ודגשים קוליים, כדי שתעלו לבמה בביטחון מוחלט.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 4. Taste of Speeches Reviews */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea0011]/10 text-[#ea0011] text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5 text-[#ea0011]" />
              <span>המלצות כותבים ונואמים</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              מה אומרים על כתיבת הנאומים?
            </h2>
          </div>

          <button
            onClick={() => onNavigate('speeches-reviews')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#ea0011] hover:text-[#c9000e] transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#ea0011]/25 shadow-xs self-start sm:self-auto"
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
              className="bg-white p-6 rounded-2xl border border-[#ea0011]/15 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
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
                    <span className="text-[11px] font-bold text-[#ea0011] bg-[#fff5f5] px-2 py-0.5 rounded">
                      {rev.subject}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#2d4869] leading-relaxed line-clamp-3 font-serif">
                  ״{rev.content}״
                </p>
                <span className="text-xs font-bold text-[#ea0011]">קראו עוד...</span>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                {rev.avatarUrl ? (
                  <img src={rev.avatarUrl} alt={rev.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#ea0011]/10 text-[#ea0011] font-bold flex items-center justify-center text-sm">
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
        <div className="rounded-3xl bg-[#ea0011] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden text-right flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold">צריכים נאום או ברכה מנצחת?</h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              צרו קשר ישיר עם משה שטרן לכתיבת טקסט ייחודי שיהפוך את המעמד שלכם לבלתי נשכח.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 z-10">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#18457c] hover:bg-[#112b4e] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer"
            >
              פרטי קשר ושיחה מהירה
            </button>
            <button
              onClick={() => onNavigate('hosting-home')}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer"
            >
              מעבר להנחיית טקסים
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
