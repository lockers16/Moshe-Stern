import React from 'react';
import { Sparkles, Phone, Mail, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#112b4e] text-white relative overflow-hidden border-t-4 border-[#ea0011]">
      {/* Decorative diagonal stripe in footer */}
      <div className="diagonal-stripe-red opacity-15" />
      <div className="diagonal-stripe-navy opacity-30" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-12 pb-8 relative z-10 space-y-10 text-right">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <span className="font-bold text-2xl tracking-tight text-white font-['Assistant']">
                  {siteConfig.siteName}
                </span>
                <div className="text-xs text-[#d6e3f8] font-medium">
                  {siteConfig.authorName} • {siteConfig.tagline}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#d6e3f8] leading-relaxed max-w-md">
              הופכים רגעים מיוחדים לזיכרונות שנשארים לכל החיים. כתיבת נאומים אישיים, הנחיית טקסי חופה, בר ובת מצווה, כנסים ואירועים ציבוריים.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#ea0011] hover:bg-[#c9000e] text-white px-5 py-2 rounded-lg text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                פרטי קשר
              </button>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white p-2 rounded-lg text-xs transition-colors flex items-center justify-center cursor-pointer"
                title="וואטסאפ"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/20 pb-2">
              ניווט מהיר
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#d6e3f8]">
              <div>
                <div className="font-bold text-white mb-1">הנחיית טקסים:</div>
                <ul className="space-y-1.5 pr-1">
                  <li>
                    <button onClick={() => onNavigate('hosting-home')} className="hover:text-[#ea0011] transition-colors cursor-pointer">
                      • דף הבית להנחיות
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('hosting-gallery')} className="hover:text-[#ea0011] transition-colors cursor-pointer">
                      • גלריית אירועים
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('hosting-reviews')} className="hover:text-[#ea0011] transition-colors cursor-pointer">
                      • ביקורות להנחיות
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-white mb-1">כתיבת נאומים:</div>
                <ul className="space-y-1.5 pr-1">
                  <li>
                    <button onClick={() => onNavigate('speeches-home')} className="hover:text-[#ea0011] transition-colors cursor-pointer">
                      • דף הבית לנאומים
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('speeches-full')} className="hover:text-[#ea0011] transition-colors cursor-pointer">
                      • דוגמאות לנאומים
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('speeches-reviews')} className="hover:text-[#ea0011] transition-colors cursor-pointer">
                      • ביקורות לנאומים
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#d6e3f8] border-t border-white/10">
              <button onClick={() => onNavigate('home')} className="hover:text-[#ea0011] font-semibold cursor-pointer">
                דף הבית הראשי
              </button>
              <span>•</span>
              <button onClick={() => onNavigate('about')} className="hover:text-[#ea0011] font-semibold cursor-pointer">
                אודות משה
              </button>
              <span>•</span>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#ea0011] font-semibold cursor-pointer">
                פרטי קשר
              </button>
            </div>
          </div>

          {/* Column 3: Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/20 pb-2">
              יצירת קשר ישירה
            </h4>
            <div className="space-y-2.5 text-xs text-[#d6e3f8]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ea0011]" />
                <a href={`tel:${siteConfig.contactPhone.replace(/[^0-9]/g, '')}`} className="hover:text-[#ea0011] transition-colors" dir="ltr">{siteConfig.contactPhone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ea0011]" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-[#ea0011] transition-colors" dir="ltr">{siteConfig.contactEmail}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d6e3f8]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {siteConfig.authorName} – {siteConfig.tagline}. כל הזכויות שמורות.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              <span>דיוק, רגש וחיבור אנושי</span>
              <Heart className="w-3 h-3 text-[#ea0011] fill-current" />
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-[#ea0011] text-white transition-colors cursor-pointer"
              title="חזרה לראש העמוד"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
