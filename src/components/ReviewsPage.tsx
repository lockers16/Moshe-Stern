import React, { useState } from 'react';
import { Star, MessageSquare, Quote } from 'lucide-react';
import reviewsHostingData from '../data/reviewsHosting.json';
import reviewsSpeechesData from '../data/reviewsSpeeches.json';
import { ReviewItem } from '../types';
import { ReviewModal } from './ReviewModal';

interface ReviewsPageProps {
  type?: 'hosting' | 'speeches' | 'all';
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ type = 'all' }) => {
  const reviews: ReviewItem[] =
    type === 'hosting'
      ? reviewsHostingData
      : type === 'speeches'
      ? reviewsSpeechesData
      : [...reviewsHostingData, ...reviewsSpeechesData];

  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const pageTitle =
    type === 'hosting'
      ? 'תגובות וביקורות – הנחיית טקסים'
      : type === 'speeches'
      ? 'תגובות וביקורות – כתיבת נאומים'
      : 'תגובות וביקורות';

  const pageSubtitle =
    type === 'hosting'
      ? 'המלצות וביקורות של לקוחות, עיריות ומארגני אירועים שהונחו על ידי משה שטרן'
      : type === 'speeches'
      ? 'המלצות וביקורות של נואמים, בעלי שמחה וארגונים שנכתבו עבורם נאומים וטקסטים אישיים'
      : 'המלצות וביקורות של לקוחות ושותפים שעבדו עם משה שטרן';

  const accentColor = type === 'speeches' ? '#ea0011' : '#18457c';

  return (
    <section className="py-12 md:py-16 bg-[#f5f8fc] relative overflow-hidden" id="reviews-page">
      {/* Decorative diagonal stripes */}
      <div className="diagonal-stripe-navy opacity-15" />
      <div className="diagonal-stripe-red opacity-20" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-[#ea0011]" />
            <span>מילים מהלב של לקוחות ושותפים</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#112b4e] tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-base md:text-lg text-[#2d4869] leading-relaxed">
            {pageSubtitle}. לחצו על כל ביקורת לפתיחת התוכן המלא.
          </p>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => {
            const hasRating = typeof review.rating === 'number' && review.rating > 0;
            const hasSubject = review.subject && review.subject.trim() !== '';
            const hasDate = review.date && review.date.trim() !== '';

            return (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-[#18457c]/15 shadow-md hover:shadow-2xl hover:border-[#18457c]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between text-right relative overflow-hidden"
              >
                {/* Top bar: Stars & Subject */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  {hasRating ? (
                    <div className="flex items-center text-[#ea0011]">
                      {Array.from({ length: review.rating! }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ea0011] text-[#ea0011]" />
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}

                  {hasSubject && (
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                        type === 'speeches'
                          ? 'bg-[#fff5f5] text-[#ea0011] border-[#ea0011]/20'
                          : 'bg-[#eef3f8] text-[#18457c] border-[#18457c]/10'
                      }`}
                    >
                      {review.subject}
                    </span>
                  )}
                </div>

                {/* Content: 3-line clamp with Quote icon */}
                <div className="space-y-2 flex-1">
                  <Quote className="w-6 h-6 text-[#18457c]/20 -mb-1" />
                  <p className="text-sm sm:text-base text-[#112b4e] leading-relaxed font-serif line-clamp-3">
                    ״{review.content}״
                  </p>
                  <span className="text-xs font-bold text-[#ea0011] inline-block pt-1 group-hover:underline">
                    קראו עוד...
                  </span>
                </div>

                {/* Author Info Footer */}
                <div className="flex items-center gap-3.5 pt-4 mt-4 border-t border-[#18457c]/10">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#18457c]/20 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#18457c]/10 text-[#18457c] font-bold flex items-center justify-center text-sm shrink-0">
                      {review.name.slice(0, 1)}
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-bold text-[#112b4e]">
                      {review.name}
                    </div>
                    <div className="text-xs text-[#577291]">
                      {review.role}
                      {hasDate && ` • ${review.date}`}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Full Review Modal */}
      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
};

