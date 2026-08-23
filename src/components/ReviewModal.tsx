import React, { useState } from 'react';
import { X, Quote, FileText, Image as ImageIcon, ExternalLink, ZoomIn } from 'lucide-react';
import { ReviewItem } from '../types';
import FormattedText from './FormattedText';

interface ReviewModalProps {
  review: ReviewItem | null;
  onClose: () => void;
  type?: 'hosting' | 'speeches' | 'all';
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  review,
  onClose,
  type = 'hosting',
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  if (!review) return null;

  // Extract attachment details (string or object)
  let attachmentUrl = '';
  let attachmentType: 'pdf' | 'image' = 'image';

  if (typeof review.attachment === 'string' && review.attachment.trim() !== '') {
    attachmentUrl = review.attachment.trim();
    if (attachmentUrl.toLowerCase().endsWith('.pdf')) {
      attachmentType = 'pdf';
    } else {
      attachmentType = 'image';
    }
  } else if (typeof review.attachment === 'object' && review.attachment && review.attachment.url) {
    attachmentUrl = review.attachment.url;
    attachmentType =
      review.attachment.type ||
      (attachmentUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image');
  }

  const hasAttachment = Boolean(attachmentUrl);
  const isPdf = attachmentType === 'pdf';

  const isSpeeches = type === 'speeches';
  const themeButtonClass = isSpeeches
    ? 'bg-[#ea0011] hover:bg-[#c9000e] text-white shadow-md shadow-[#ea0011]/25'
    : 'bg-[#18457c] hover:bg-[#123662] text-white shadow-md shadow-[#18457c]/25';

  const handleAttachmentClick = () => {
    if (attachmentType === 'pdf') {
      window.open(attachmentUrl, '_blank', 'noopener,noreferrer');
    } else {
      setImageModalOpen(true);
    }
  };

  return (
    <>
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

            {/* Subject Badge */}
            {review.subject && review.subject.trim() !== '' && (
              <span className={`text-xs font-bold px-3 py-1 rounded-md border ${
                isSpeeches
                  ? 'bg-[#fff5f5] text-[#ea0011] border-[#ea0011]/20'
                  : 'bg-[#eef3f8] text-[#18457c] border-[#18457c]/10'
              }`}>
                {review.subject}
              </span>
            )}
          </div>

          {/* Quote Icon & Full Content */}
          <div className="space-y-3">
            <Quote className={`w-8 h-8 opacity-30 -mb-2 ${isSpeeches ? 'text-[#ea0011]' : 'text-[#18457c]'}`} />
            <p className="text-base sm:text-lg text-[#112b4e] leading-relaxed font-serif whitespace-pre-line">
              ״<FormattedText text={review.content} />״
            </p>
          </div>

          {/* Optional Attachment Button - Centered */}
          {hasAttachment && (
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleAttachmentClick}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md ${themeButtonClass}`}
              >
                {attachmentType === 'pdf' ? (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>לקריאת ההמלצה המלאה</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span>לקריאת ההמלצה המלאה</span>
                    <ZoomIn className="w-3.5 h-3.5 opacity-80" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Author Details Footer */}
          {(review.name?.trim() || review.role?.trim() || review.date?.trim() || review.avatarUrl) && (
            <div className="flex items-center gap-3.5 pt-4 border-t border-[#18457c]/10">
              {review.avatarUrl ? (
                <img
                  src={review.avatarUrl}
                  alt={review.name || 'ממליץ'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#18457c]/20 shadow-xs shrink-0"
                />
              ) : review.name && review.name.trim() !== '' ? (
                <div className="w-12 h-12 rounded-full bg-[#18457c]/10 text-[#18457c] font-bold flex items-center justify-center text-base shrink-0">
                  {review.name.slice(0, 1)}
                </div>
              ) : null}

              <div className="min-w-0">
                {review.name && review.name.trim() !== '' && (
                  <div className="text-base font-bold text-[#112b4e] truncate">
                    {review.name}
                  </div>
                )}
                
                {(review.role?.trim() || review.date?.trim()) && (
                  <div className={`text-xs sm:text-sm text-[#577291] truncate ${!review.name?.trim() ? 'font-bold text-[#112b4e] text-sm' : ''}`}>
                    {review.role && review.role.trim() !== '' && review.date && review.date.trim() !== ''
                      ? `${review.role} • ${review.date}`
                      : review.role || review.date}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Image Overlay Modal (covers previous modal elegantly) */}
      {imageModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setImageModalOpen(false)}
          dir="rtl"
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 relative flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-[#f8fafc] border-b border-gray-200 flex items-center justify-between">
              <div className="text-sm font-bold text-[#112b4e] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#ea0011]" />
                <span>
                  {review.name && review.name.trim() !== ''
                    ? `המלצה מלאה – ${review.name}`
                    : 'המלצה מלאה'}
                </span>
              </div>
              <button
                onClick={() => setImageModalOpen(false)}
                aria-label="סגור תמונה"
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-gray-100 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={attachmentUrl}
                alt={review.name ? `המלצה מאת ${review.name}` : 'המלצה מלאה'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
