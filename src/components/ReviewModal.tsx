import React from 'react';
import { X, Quote } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewModalProps {
  review: ReviewItem | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#18457c]/20 relative text-right space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="סגור חלון"
          className="absolute top-4 left-4 p-2 rounded-full text-[#577291] hover:text-[#112b4e] hover:bg-[#eef4fa] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header info: Rating Stars & Subject */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 pl-8">
          {/* Rating Stars - Only if rating > 0 */}
          {review.rating && review.rating > 0 ? (
            <div className="flex text-[#ea0011] text-lg tracking-wide">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          ) : (
            <div />
          )}

          {/* Subject Badge - Only if subject exists */}
          {review.subject && review.subject.trim() !== '' && (
            <span className="text-xs font-bold text-[#18457c] bg-[#eef3f8] px-3 py-1 rounded-md border border-[#18457c]/10">
              {review.subject}
            </span>
          )}
        </div>

        {/* Quote Icon & Full Content */}
        <div className="space-y-3">
          <Quote className="w-8 h-8 text-[#ea0011]/30 -mb-2" />
          <p className="text-base sm:text-lg text-[#112b4e] leading-relaxed font-serif whitespace-pre-line">
            ״{review.content}״
          </p>
        </div>

        {/* Author Details Footer */}
        <div className="flex items-center gap-3.5 pt-4 border-t border-[#18457c]/10">
          {review.avatarUrl ? (
            <img
              src={review.avatarUrl}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#18457c]/20 shadow-xs shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#18457c]/10 text-[#18457c] font-bold flex items-center justify-center text-base shrink-0">
              {review.name.slice(0, 1)}
            </div>
          )}

          <div>
            <div className="text-base font-bold text-[#112b4e]">
              {review.name}
            </div>
            <div className="text-xs sm:text-sm text-[#577291]">
              {review.date && review.date.trim() !== ''
                ? `${review.role} • ${review.date}`
                : review.role}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
