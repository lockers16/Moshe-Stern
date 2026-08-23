import React, { useState, useRef } from 'react';
import { BookOpen, FileText, Image as ImageIcon, ExternalLink, ZoomIn, X } from 'lucide-react';
import speechesData from '../data/speeches.json';
import { SpeechItem } from '../types';
import FormattedText from './FormattedText';

export const SpeechesSection: React.FC = () => {
  const speeches: SpeechItem[] = speechesData;
  const [selectedSpeechId, setSelectedSpeechId] = useState<string>(
    speeches.length > 0 ? speeches[0].id : ''
  );
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const speechDisplayRef = useRef<HTMLDivElement>(null);

  const selectedSpeech = speeches.find(s => s.id === selectedSpeechId) || speeches[0];

  // Extract attachment details (string or object)
  let attachmentUrl = '';
  let attachmentType: 'pdf' | 'image' = 'image';

  if (selectedSpeech?.attachment) {
    if (typeof selectedSpeech.attachment === 'string' && selectedSpeech.attachment.trim() !== '') {
      attachmentUrl = selectedSpeech.attachment.trim();
      attachmentType = attachmentUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image';
    } else if (typeof selectedSpeech.attachment === 'object' && selectedSpeech.attachment.url) {
      attachmentUrl = selectedSpeech.attachment.url;
      attachmentType =
        selectedSpeech.attachment.type ||
        (attachmentUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image');
    }
  }

  const hasAttachment = Boolean(attachmentUrl);

  const handleAttachmentClick = () => {
    if (attachmentType === 'pdf') {
      window.open(attachmentUrl, '_blank', 'noopener,noreferrer');
    } else {
      setImageModalOpen(true);
    }
  };

  const handleSelectSpeech = (id: string) => {
    setSelectedSpeechId(id);
    // Smoothly scroll to the speech display so user sees the top of the speech
    setTimeout(() => {
      if (speechDisplayRef.current) {
        const yOffset = -90; // offset for top sticky navbar
        const element = speechDisplayRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section className="py-12 md:py-16 bg-[#f5f8fc] relative overflow-hidden" id="speeches-page">
      {/* Decorative diagonal stripes */}
      <div className="diagonal-stripe-navy opacity-15" />
      <div className="diagonal-stripe-red opacity-20" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#ea0011]" />
            <span>ספריית טקסטים ודוגמאות</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#112b4e] tracking-tight">
            דוגמאות לנאומים
          </h1>
          <p className="text-base md:text-lg text-[#2d4869] leading-relaxed">
            דוגמאות מנאומים וטקסטים שנכתבו בהתאמה אישית מלאה. כל נאום מעוצב בקצב הנכון, בשפה מדויקת וברגישות גבוהה.
          </p>
        </div>

        {/* Layout: Right Sidebar (Speeches List) + Left Area (Single Continuous Speech in David Font) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Sidebar: Speeches List (lg:col-span-4) - strictly no box underneath */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#112b4e] uppercase tracking-wider px-1">
              רשימת הנאומים:
            </h3>

            <div className="space-y-3">
              {speeches.map((speech) => {
                const isSelected = selectedSpeech && selectedSpeech.id === speech.id;
                return (
                  <button
                    key={speech.id}
                    onClick={() => handleSelectSpeech(speech.id)}
                    className={`w-full text-right p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#18457c] text-white border-[#ea0011] shadow-lg shadow-[#18457c]/25 scale-[1.01]'
                        : 'bg-white text-[#112b4e] border-[#18457c]/15 hover:border-[#18457c]/40 hover:bg-[#eef4fa]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                        isSelected ? 'bg-[#ea0011] text-white' : 'bg-[#ea0011]/10 text-[#ea0011]'
                      }`}>
                        {speech.category}
                      </span>
                    </div>

                    <h4 className="text-base font-bold leading-snug">
                      {speech.title}
                    </h4>

                    {speech.subject && (
                      <p className={`text-xs mt-1.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#577291]'}`}>
                        {speech.subject}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left/Main Area: Speech Display (lg:col-span-8) */}
          <div
            ref={speechDisplayRef}
            className="lg:col-span-8 bg-white rounded-2xl border border-[#18457c]/15 shadow-xl overflow-hidden flex flex-col text-right scroll-mt-24"
          >
            
            {selectedSpeech ? (
              <>
                {/* Header Info: Category with red bg + Subject on the left */}
                <div className="bg-[#f0f5fa] border-b border-[#18457c]/10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-[#ea0011] text-white text-xs font-bold shadow-sm">
                      {selectedSpeech.category}
                    </span>
                    {selectedSpeech.subject && (
                      <span className="text-xs sm:text-sm text-[#2d4869] font-medium">
                        <span className="font-bold text-[#18457c]">נושא הנאום: </span>
                        {selectedSpeech.subject}
                      </span>
                    )}
                  </div>

                  {/* Attachment Button on top header if present */}
                  {hasAttachment && (
                    <button
                      type="button"
                      onClick={handleAttachmentClick}
                      className="px-4 py-1.5 rounded-lg bg-[#ea0011] hover:bg-[#c9000e] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      {attachmentType === 'pdf' ? (
                        <>
                          <FileText className="w-3.5 h-3.5" />
                          <span>לקריאת הנאום המלא</span>
                          <ExternalLink className="w-3 h-3 opacity-80" />
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>לקריאת הנאום המלא</span>
                          <ZoomIn className="w-3 h-3 opacity-80" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Speech Title & Optional Author's Note */}
                <div className="p-6 sm:p-8 border-b border-[#18457c]/10 bg-white space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112b4e] leading-snug">
                    {selectedSpeech.title}
                  </h2>

                  {/* Author's Note - Only displayed if present and non-empty */}
                  {selectedSpeech.authorNote && selectedSpeech.authorNote.trim() !== '' && (
                    <div className="p-4 bg-[#f5f8fc] rounded-xl border-r-4 border-[#18457c] text-xs sm:text-sm text-[#2d4869] leading-relaxed">
                      <span className="font-bold text-[#18457c]">הערת הכותב: </span>
                      <span><FormattedText text={selectedSpeech.authorNote} /></span>
                    </div>
                  )}
                </div>

                {/* Speech Full Content in Single Part with David Font and Reduced Font Size */}
                <div className="p-6 sm:p-8 lg:p-10 bg-[#fcfdfe] space-y-6">
                  <div className="font-david text-base sm:text-lg text-[#112b4e] leading-relaxed sm:leading-loose whitespace-pre-line select-none">
                    <FormattedText text={selectedSpeech.content} />
                  </div>

                  {/* Prominent bottom button for reading full speech if attachment exists */}
                  {hasAttachment && (
                    <div className="pt-6 border-t border-[#18457c]/10 flex justify-center">
                      <button
                        type="button"
                        onClick={handleAttachmentClick}
                        className="px-6 py-3 rounded-xl bg-[#ea0011] hover:bg-[#c9000e] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        {attachmentType === 'pdf' ? (
                          <>
                            <FileText className="w-5 h-5" />
                            <span>לקריאת הנאום המלא</span>
                            <ExternalLink className="w-4 h-4 opacity-80" />
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-5 h-5" />
                            <span>לקריאת הנאום המלא</span>
                            <ZoomIn className="w-4 h-4 opacity-80" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-[#577291]">
                לא נבחר נאום להצגה.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Image Overlay Modal */}
      {imageModalOpen && hasAttachment && (
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
                  {selectedSpeech ? `נאום מלא – ${selectedSpeech.title}` : 'נאום מלא'}
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
                alt={selectedSpeech ? selectedSpeech.title : 'נאום מלא'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

