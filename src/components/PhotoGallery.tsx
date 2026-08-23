import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Calendar, Sparkles, Images, ZoomIn, Layers } from 'lucide-react';
import galleryData from '../data/gallery.json';
import { GalleryEventItem } from '../types';
import FormattedText from './FormattedText';

interface PhotoGalleryProps {
  initialEventId?: string | null;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ initialEventId }) => {
  const events: GalleryEventItem[] = galleryData;
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [selectedEvent, setSelectedEvent] = useState<GalleryEventItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically open initial event if passed
  useEffect(() => {
    if (initialEventId) {
      const found = events.find(e => e.id === initialEventId);
      if (found) {
        setSelectedEvent(found);
        setCurrentImageIndex(0);
      }
    }
  }, [initialEventId, events]);

  // Extract all distinct categories from JSON + default preset categories
  const categoriesList = useMemo(() => {
    const defaultCategories = ['הכל', 'טקסים לעיריית ירושלים', 'הנחיית מופעים', 'טקסי זיכרון'];
    const dynamicSet = new Set<string>();

    events.forEach(evt => {
      if (evt.categories) {
        evt.categories.split(',').forEach(c => {
          const trimmed = c.trim();
          if (trimmed) dynamicSet.add(trimmed);
        });
      }
    });

    const combined = Array.from(new Set([...defaultCategories, ...Array.from(dynamicSet)]));
    return combined;
  }, [events]);

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'הכל') return events;
    return events.filter(evt => {
      if (!evt.categories) return false;
      const cats = evt.categories.split(',').map(c => c.trim());
      return cats.includes(selectedCategory);
    });
  }, [events, selectedCategory]);

  const openEventGallery = (event: GalleryEventItem, initialIndex = 0) => {
    setSelectedEvent(event);
    setCurrentImageIndex(initialIndex);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = useCallback(() => {
    if (!selectedEvent || !selectedEvent.images.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
  }, [selectedEvent]);

  const handlePrevImage = useCallback(() => {
    if (!selectedEvent || !selectedEvent.images.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
  }, [selectedEvent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedEvent) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') handleNextImage();
      if (e.key === 'ArrowRight') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent, handleNextImage, handlePrevImage]);

  return (
    <section className="py-12 md:py-16 bg-[#f5f8fc] relative overflow-hidden" id="gallery-page">
      {/* Decorative diagonal stripes in blue & red */}
      <div className="diagonal-stripe-navy opacity-15" />
      <div className="diagonal-stripe-red opacity-20" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ea0011]" />
            <span>תיעוד רגעים וטקסים</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#112b4e] tracking-tight">
            גלריית אירועים
          </h1>
          <p className="text-base md:text-lg text-[#2d4869] leading-relaxed">
            מבט אל הרגעים המרגשים, המילים המדויקות והאווירה המיוחדת מטקסים ואירועים שהנחה משה שטרן. לחצו על כל אירוע כדי לפתוח את אלבום התמונות המלא.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          <span className="text-xs font-bold text-[#577291] ml-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#ea0011]" />
            סינון לפי קטגוריה:
          </span>
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#18457c] text-white shadow-md shadow-[#18457c]/20 scale-105'
                    : 'bg-white text-[#2d4869] border border-[#18457c]/15 hover:bg-[#eef4fa] hover:border-[#18457c]/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredEvents.map((item) => {
            const photoCount = item.images?.length || 1;
            const coverImage = item.images?.[0] || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80';
            
            return (
              <div
                key={item.id}
                onClick={() => openEventGallery(item, 0)}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-[#18457c]/15 cursor-pointer flex flex-col"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18457c]">
                  <img
                    src={coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112b4e]/85 via-[#112b4e]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                  {/* Photo count indicator */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-3 py-1 bg-[#18457c]/90 text-white backdrop-blur-md text-xs font-bold rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <Images className="w-3.5 h-3.5 text-[#ffdad5]" />
                      <span>{photoCount === 1 ? 'תמונה אחת' : `${photoCount} תמונות`}</span>
                    </span>
                  </div>

                  {/* Hover action button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 rounded-xl bg-white/95 text-[#18457c] text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-4 h-4 text-[#ea0011]" />
                      <span>לפתיחת אלבום האירוע</span>
                    </span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-right">
                  <div className="space-y-2">
                    {/* Location & Date */}
                    <div className="flex items-center gap-2 text-xs text-[#577291] font-semibold flex-wrap">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#ea0011]" />
                          {item.location}
                        </span>
                      )}
                      {item.location && item.date && <span>•</span>}
                      {item.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#18457c]" />
                          {item.date}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#112b4e] leading-snug group-hover:text-[#18457c] transition-colors">
                      {item.title}
                    </h3>

                    {item.description && item.description.trim() !== '' && (
                      <p className="text-xs text-[#425d7e] leading-relaxed line-clamp-2">
                        <FormattedText text={item.description} />
                      </p>
                    )}
                  </div>

                  {/* Categories badges */}
                  {item.categories && (
                    <div className="pt-2 border-t border-[#18457c]/10 flex flex-wrap gap-1.5">
                      {item.categories.split(',').map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-[#eef4fc] text-[#18457c] text-[11px] font-semibold rounded-md"
                        >
                          {cat.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#18457c]/10 text-[#577291]">
            לא נמצאו אירועים בקטגוריה זו.
          </div>
        )}

      </div>

      {/* Inner Event Gallery Lightbox Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0c1f36]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeGallery}
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
                onClick={closeGallery}
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

    </section>
  );
};
