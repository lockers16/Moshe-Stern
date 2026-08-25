import React, { useState, useMemo } from 'react';
import { Sparkles, Images, MessageSquare, ArrowLeft, Calendar, MapPin, ShieldCheck, HeartHandshake, Mic2, Star, Quote, FileText, Image as ImageIcon, X, ChevronRight, ChevronLeft } from 'lucide-react';
import galleryData from '../data/gallery.json';
import reviewsHostingData from '../data/reviewsHosting.json';
import featuredItems from '../data/featuredItems.json';
import { GalleryEventItem, ReviewItem } from '../types';
import { ReviewModal } from './ReviewModal';
import FormattedText from './FormattedText';

interface HostingHomeProps {
  onNavigate: (tabId: string, eventId?: string) => void;
}

export const HostingHome: React.FC<HostingHomeProps> = ({ onNavigate }) => {
  const events: GalleryEventItem[] = galleryData;
  const reviews: ReviewItem[] = reviewsHostingData;
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEventItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openEventModal = (item: GalleryEventItem) => {
    setSelectedEvent(item);
    setCurrentImageIndex(0);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent || selectedEvent.images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent || selectedEvent.images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
  };

  // Load items according to featuredItems.hostingGallery in order: [right, center, left]
  // If invalid or duplicates or missing, gracefully complete from available events (unique)
  const previewEvents = useMemo(() => {
    const { right, center, left } = featuredItems.hostingGallery || {};
    const requestedIds = [right, center, left].filter(Boolean);
    const map = new Map(events.map((e) => [e.id, e]));
    const list: GalleryEventItem[] = [];

    // Add valid and unique requested IDs in order
    requestedIds.forEach((id) => {
      const item = map.get(id);
      if (item && !list.some((existing) => existing.id === item.id)) {
        list.push(item);
      }
    });

    // Fill up to 3 items with remaining unselected events from the start of events list
    if (list.length < 3) {
      for (const e of events) {
        if (!list.some((existing) => existing.id === e.id)) {
          list.push(e);
          if (list.length === 3) break;
        }
      }
    }

    return list;
  }, [events]);

  // Load reviews according to featuredItems.hostingReviews in order: [right, center, left]
  const previewReviews = useMemo(() => {
    const { right, center, left } = featuredItems.hostingReviews || {};
    const requestedIds = [right, center, left].filter(Boolean);
    const map = new Map(reviews.map((r) => [r.id, r]));
    const list: ReviewItem[] = [];

    requestedIds.forEach((id) => {
      const item = map.get(id);
      if (item && !list.some((existing) => existing.id === item.id)) {
        list.push(item);
      }
    });

    // Fill up to 3 reviews with remaining unselected reviews
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
                <span>הנחיית טקסים ואירועים</span>
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
                  <span>המלצות וביקורות להנחיות</span>
                </button>
              </div>
            </div>

            {/* Left: Featured Visual Showcase (Preserving User's chosen image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#18457c]/20 bg-[#18457c] aspect-[4/3] group">
                <img
                  src="/hosting-home1.jpg"
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


      {/* 2. Gallery Taste (טעימה מהגלריה - 3 פריטים מותאמים אישית) */}
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
            רגעים נבחרים מתוך מגוון האירועים שהונחו על ידי משה שטרן
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

        {/* 3 Preview Cards (centered flex/grid) */}
        <div className="flex flex-wrap justify-center gap-6">
          {previewEvents.map((item) => {
            const coverImage = item.images?.[0] || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80';
            const photoCount = item.images?.length || 1;

            return (
              <div
                key={item.id}
                onClick={() => openEventModal(item)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#18457c]/15 cursor-pointer flex flex-col justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px]"
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
                      <span>{photoCount === 1 ? 'תמונה אחת' : `${photoCount} תמונות`}</span>
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
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-[#18457c]/15 shadow-md hover:shadow-2xl hover:border-[#18457c]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between text-right relative overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px]"
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
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md border bg-[#eef3f8] text-[#18457c] border-[#18457c]/10">
                      {rev.subject}
                    </span>
                  )}
                </div>

                {/* Content: 3-line clamp with Quote icon */}
                <div className="space-y-2 flex-1">
                  <Quote className="w-6 h-6 text-[#18457c]/20 -mb-1" />
                  <p className="text-sm sm:text-base text-[#112b4e] leading-relaxed font-serif line-clamp-3">
                    ״<FormattedText text={rev.content} />״
                  </p>
                  <span className="text-xs font-bold text-[#ea0011] inline-block pt-1 group-hover:underline">
                    קראו עוד...
                  </span>
                </div>

                {/* Author Info Footer */}
                {(rev.name?.trim() || rev.role?.trim() || rev.date?.trim() || rev.avatarUrl || hasAttachment) && (
                  <div className="flex items-center justify-between gap-3.5 pt-4 mt-4 border-t border-[#18457c]/10">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {rev.avatarUrl ? (
                        <img
                          src={rev.avatarUrl}
                          alt={rev.name || 'ממליץ'}
                          className="w-11 h-11 rounded-full object-cover border border-[#18457c]/20 shadow-xs shrink-0"
                        />
                      ) : rev.name && rev.name.trim() !== '' ? (
                        <div className="w-11 h-11 rounded-full bg-[#18457c]/10 text-[#18457c] font-bold flex items-center justify-center text-sm shrink-0">
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
        type="hosting"
      />

      {/* Event Lightbox Modal (stays on the same page) */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0c1f36]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeEventModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 max-h-[95vh] flex flex-col relative text-right"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            
            {/* Top Bar with Event Title & Location/Date on RIGHT and Close Button on LEFT */}
            <div className="px-5 py-4 border-b border-[#18457c]/15 bg-[#f8fafc] flex items-center justify-between">
              
              {/* Right Side: Title, Location & Optional Date */}
              <div className="text-right space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#112b4e]">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#577291]">
                  {selectedEvent.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ea0011]" />
                      {selectedEvent.location}
                    </span>
                  )}
                  {selectedEvent.location && selectedEvent.date && <span>•</span>}
                  {selectedEvent.date && <span>{selectedEvent.date}</span>}
                </div>
              </div>

              {/* Left Side: Close Button */}
              <button
                onClick={closeEventModal}
                className="p-2 rounded-full hover:bg-gray-200 text-[#112b4e] transition-colors cursor-pointer"
                aria-label="סגור גלריה"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Stage */}
            <div className="relative bg-[#0d223c] flex items-center justify-center min-h-[320px] sm:min-h-[420px] max-h-[55vh] overflow-hidden select-none">
              <img
                src={selectedEvent.images[currentImageIndex] || selectedEvent.images[0]}
                alt={`${selectedEvent.title} - תמונה ${currentImageIndex + 1}`}
                className="max-h-[55vh] w-auto max-w-full object-contain transition-all duration-300"
              />

              {/* Navigation Arrows */}
              {selectedEvent.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="תמונה קודמת"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="תמונה הבאה"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Photo Counter Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
                תמונה {currentImageIndex + 1} מתוך {selectedEvent.images.length}
              </div>
            </div>

            {/* Thumbnail Strip (if multiple photos) */}
            {selectedEvent.images.length > 1 && (
              <div className="px-4 py-3 bg-[#f1f5fa] border-t border-[#18457c]/10 flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar">
                {selectedEvent.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      currentImageIndex === idx
                        ? 'border-[#ea0011] scale-105 shadow-md ring-2 ring-[#ea0011]/30'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`תמונה ממוזערת ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Event Description - ONLY show if present and non-empty */}
            {selectedEvent.description && selectedEvent.description.trim() !== '' && (
              <div className="p-5 sm:p-6 overflow-y-auto space-y-2 text-right">
                <h4 className="text-xs font-bold text-[#577291] uppercase tracking-wider">
                  על האירוע:
                </h4>
                <p className="text-sm sm:text-base text-[#2d4869] leading-relaxed whitespace-pre-line">
                  <FormattedText text={selectedEvent.description} />
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
