import React, { useState, useMemo } from 'react';
import { Sparkles, BookOpen, MessageSquare, ArrowLeft, PenTool, Star, Quote, FileText, Image as ImageIcon } from 'lucide-react';
import speechesData from '../data/speeches.json';
import reviewsSpeechesData from '../data/reviewsSpeeches.json';
import featuredItems from '../data/featuredItems.json';
import { SpeechItem, ReviewItem } from '../types';
import { ReviewModal } from './ReviewModal';
import FormattedText from './FormattedText';

interface SpeechesHomeProps {
  onNavigate: (tabId: string) => void;
}

export const SpeechesHome: React.FC<SpeechesHomeProps> = ({ onNavigate }) => {
  const speeches: SpeechItem[] = speechesData;
  const reviews: ReviewItem[] = reviewsSpeechesData;
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  // Load items according to featuredItems.speechesExamples in order: [right, center, left]
  const previewSpeeches = useMemo(() => {
    const { right, center, left } = featuredItems.speechesExamples || {};
    const requestedIds = [right, center, left].filter(Boolean);
    const map = new Map(speeches.map((s) => [s.id, s]));
    const list: SpeechItem[] = [];

    requestedIds.forEach((id) => {
      const item = map.get(id);
      if (item && !list.some((existing) => existing.id === item.id)) {
        list.push(item);
      }
    });

    if (list.length < 3) {
      for (const s of speeches) {
        if (!list.some((existing) => existing.id === s.id)) {
          list.push(s);
          if (list.length === 3) break;
        }
      }
    }

    return list;
  }, [speeches]);

  // Load reviews according to featuredItems.speechesReviews in order: [right, center, left]
  const previewReviews = useMemo(() => {
    const { right, center, left } = featuredItems.speechesReviews || {};
    const requestedIds = [right, center, left].filter(Boolean);
    const map = new Map(reviews.map((r) => [r.id, r]));
    const list: ReviewItem[] = [];

    requestedIds.forEach((id) => {
      const item = map.get(id);
      if (item && !list.some((existing) => existing.id === item.id)) {
        list.push(item);
      }
    });

    if (list.length < 3) {
      for (const r of reviews) {
        if (!list.some((existing) => existing.id === r.id)) {
          list.push(r);
          if (list.length === 3) break;
        }
      }
    }

    return list;
  }, [reviews]);

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
                <span>כתיבת תוכן ונאומים • משה שטרן</span>
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
                  <span>לכל דוגמאות הכתיבה</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('speeches-reviews')}
                  className="bg-white hover:bg-[#fff5f5] text-[#ea0011] border-2 border-[#ea0011]/25 hover:border-[#ea0011] px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-5 h-5 text-[#ea0011]" />
                  <span>המלצות וביקורות על תוכן ונאומים</span>
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


      {/* 2. Speeches Taste (טעימה מדוגמאות הנאומים - פריטים מותאמים אישית) */}
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
              דוגמאות מתוך קטגוריות שונות שנכתבו בהתאמה אישית מלאה
            </p>
          </div>

          <button
            onClick={() => onNavigate('speeches-full')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#ea0011] hover:text-[#c9000e] transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#ea0011]/25 shadow-xs self-start sm:self-auto"
          >
            <span>לדוגמאות לנאומים</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Cards (centered flex/grid) */}
        <div className="flex flex-wrap justify-center gap-6">
          {previewSpeeches.map((speech) => (
            <div
              key={speech.id}
              onClick={() => onNavigate('speeches-full')}
              className="group bg-white rounded-2xl p-6 border border-[#ea0011]/15 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px]"
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


      {/* 3. Core Advantages of Moshe as Speechwriter */}
      <section className="bg-white py-12 border-y border-[#ea0011]/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-8 text-right">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              איך נבנה הנאום המנצח שלכם?
            </h2>
            <p className="text-sm sm:text-base text-[#425d7e]">
              תהליך כתיבה אישי, מובנה וקשוב שמבטיח שתרגישו בטוחים על הבמה
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ea0011] text-white flex items-center justify-center shadow-md">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#112b4e]">שיחת תחקיר והקשבה מעמיקה</h3>
              <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                מבינים את הרקע, את הקהל, את הסיפורים הקטנים ואת המסר שחשוב לכם להעביר ברגע המיוחד.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#18457c] text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6 text-[#ffdad5]" />
              </div>
              <h3 className="text-lg font-bold text-[#112b4e]">ניסוח מדויק ומותאם אישית</h3>
              <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                כתיבה קולחת בגובה העיניים, שילוב עדין של הומור ורגש, ומבנה רטורי שמחזיק את הקהל מרותק.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffafa] border border-[#ea0011]/15 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ea0011] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#112b4e]">הדרכה לעמידה מול קהל</h3>
              <p className="text-xs sm:text-sm text-[#425d7e] leading-relaxed">
                הנחיות קריאה מעשיות, סימוני הדגשה ואינטונציה, והכנה מנטלית כדי שתעלו לבמה בביטחון מלא.
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
              <span>המלצות לקוחות</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e]">
              מה מספרים מי שנעזרו בשירותי הכתיבה של משה?
            </h2>
          </div>

          <button
            onClick={() => onNavigate('speeches-reviews')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#ea0011] hover:text-[#c9000e] transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#ea0011]/25 shadow-xs self-start sm:self-auto"
          >
            <span>לכל ההמלצות והביקורות</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {previewReviews.map((rev) => {
            const hasRating = typeof rev.rating === 'number' && rev.rating > 0;
            const hasSubject = rev.subject && rev.subject.trim() !== '';
            const hasDate = rev.date && rev.date.trim() !== '';
            
            let attachmentUrl = '';
            let isPdf = false;
            if (typeof rev.attachment === 'string' && rev.attachment.trim() !== '') {
              attachmentUrl = rev.attachment.trim();
              isPdf = attachmentUrl.toLowerCase().endsWith('.pdf');
            } else if (typeof rev.attachment === 'object' && rev.attachment && rev.attachment.url) {
              attachmentUrl = rev.attachment.url;
              isPdf = rev.attachment.type === 'pdf' || attachmentUrl.toLowerCase().endsWith('.pdf');
            }
            const hasAttachment = Boolean(attachmentUrl);
            const isImg = hasAttachment && !isPdf;

            return (
              <div
                key={rev.id}
                onClick={() => setSelectedReview(rev)}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-[#ea0011]/15 shadow-md hover:shadow-2xl hover:border-[#ea0011]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between text-right relative overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px]"
              >
                {/* Top bar: Stars & Subject */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {hasRating ? (
                    <div className="flex items-center text-[#ea0011]">
                      {Array.from({ length: rev.rating! }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ea0011] text-[#ea0011]" />
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}

                  {hasSubject && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md border bg-[#fff5f5] text-[#ea0011] border-[#ea0011]/20">
                      {rev.subject}
                    </span>
                  )}
                </div>

                {/* Content: 3-line clamp with Quote icon */}
                <div className="space-y-2 flex-1">
                  <Quote className="w-6 h-6 text-[#ea0011]/20 -mb-1" />
                  <p className="text-sm sm:text-base text-[#112b4e] leading-relaxed font-serif line-clamp-3">
                    ״<FormattedText text={rev.content} />״
                  </p>
                  <span className="text-xs font-bold text-[#ea0011] inline-block pt-1 group-hover:underline">
                    קראו עוד...
                  </span>
                </div>

                {/* Author Info Footer */}
                {(rev.name?.trim() || rev.role?.trim() || rev.date?.trim() || rev.avatarUrl || hasAttachment) && (
                  <div className="flex items-center justify-between gap-3.5 pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {rev.avatarUrl ? (
                        <img
                          src={rev.avatarUrl}
                          alt={rev.name || 'ממליץ'}
                          className="w-11 h-11 rounded-full object-cover border border-[#ea0011]/20 shadow-xs shrink-0"
                        />
                      ) : rev.name && rev.name.trim() !== '' ? (
                        <div className="w-11 h-11 rounded-full bg-[#ea0011]/10 text-[#ea0011] font-bold flex items-center justify-center text-sm shrink-0">
                          {rev.name.slice(0, 1)}
                        </div>
                      ) : null}

                      <div className="min-w-0">
                        {rev.name && rev.name.trim() !== '' && (
                          <div className="text-sm font-bold text-[#112b4e] truncate">
                            {rev.name}
                          </div>
                        )}
                        {(rev.role?.trim() || rev.date?.trim()) && (
                          <div className={`text-xs text-[#577291] truncate ${!rev.name?.trim() ? 'font-bold text-[#112b4e]' : ''}`}>
                            {rev.role && rev.role.trim() !== '' && hasDate
                              ? `${rev.role} • ${rev.date}`
                              : rev.role || rev.date}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Attachment Icon Indicator */}
                    {isPdf && (
                      <div
                        className="flex items-center gap-1 text-[11px] font-bold text-[#ea0011] bg-[#ea0011]/10 px-2.5 py-1 rounded-lg border border-[#ea0011]/20 shrink-0"
                        title="מצורף קובץ PDF מלא"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </div>
                    )}
                    {isImg && (
                      <div
                        className="flex items-center gap-1 text-[11px] font-bold text-[#18457c] bg-[#18457c]/10 px-2.5 py-1 rounded-lg border border-[#18457c]/20 shrink-0"
                        title="מצורפת תמונת המלצה"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>תמונה</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. Bottom Call to Action */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-[#ea0011] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden text-right flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold">יש לכם אירוע בפתח וצריכים נאום מרגש?</h3>
            <p className="text-sm sm:text-base text-[#ffdad5] leading-relaxed">
              צרו קשר עם משה שטרן לשיחת התייעצות קצרה שבה נתחיל להפוך את המחשבות שלכם למילים.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 z-10">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#112b4e] hover:bg-[#0c1f36] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer"
            >
              שיחת התייעצות ופרטי קשר
            </button>
            <button
              onClick={() => onNavigate('hosting-home')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer"
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
        type="speeches"
      />

    </div>
  );
};
