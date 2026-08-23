import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquareQuote, Mail, Mic2, BookOpen, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSpeechesSection = activeTab.startsWith('speeches');
  const isHostingSection = activeTab.startsWith('hosting') || activeTab === 'gallery';

  const sectionKey = isSpeechesSection ? 'speeches' : isHostingSection ? 'hosting' : 'portal';

  // Section-based theme styling:
  // 1. Speeches: Classic Red (#ea0011) with Dark Navy buttons/accents
  // 2. Hosting: Rich Blue (#18457c) with Red buttons/accents
  // 3. Main Portal: Vibrant Blue (#1e5ea8) with Red buttons/accents
  const headerBgClass = isSpeechesSection
    ? 'bg-[#ea0011] border-b border-[#c9000e]'
    : isHostingSection
    ? 'bg-[#18457c] border-b border-[#143c6d]'
    : 'bg-[#1e5ea8] border-b border-[#1b5496]';

  const contactButtonClass = isSpeechesSection
    ? activeTab === 'contact'
      ? 'bg-white text-[#ea0011]'
      : 'bg-[#112b4e] hover:bg-[#0c1f36] text-white shadow-md'
    : activeTab === 'contact'
    ? 'bg-white text-[#18457c]'
    : 'bg-[#ea0011] hover:bg-[#c9000e] text-white shadow-md';

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${headerBgClass} ${isScrolled ? 'shadow-xl' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Rightmost: Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-right focus:outline-none group text-white cursor-pointer select-none"
          title="חזרה לדף הבית הראשי"
        >
          {/* Logo square emblem */}
          <Logo size="md" className="group-hover:scale-105 transition-transform duration-200" />

          <div>
            <div className="font-black text-xl md:text-2xl tracking-tight text-white flex items-center gap-1.5 font-['Assistant'] leading-tight">
              <span>כתוב</span>
              <span className="text-white/80 font-normal text-sm md:text-base hidden sm:inline">|</span>
              <span className="text-white/90 text-sm md:text-base hidden sm:inline font-semibold">משה שטרן</span>
            </div>
            <div className="text-[10px] sm:text-xs text-white/90 font-medium tracking-wide">
              נאומים, תוכן והנחייה
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-semibold">
          
          {/* 1. דף הבית (Main Home) */}
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-white/20 text-white font-bold shadow-xs'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            דף הבית
          </button>

          {/* 2. אודות משה */}
          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-white/20 text-white font-bold shadow-xs'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            אודות משה
          </button>

          {/* Animated Section Content - Subtle & smooth */}
          <AnimatePresence mode="wait">
            {isHostingSection && (
              <motion.div
                key="hosting-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex items-center gap-1 xl:gap-1.5"
              >
                {/* Distinctive Section Button (הנחיית טקסים) */}
                <button
                  onClick={() => handleNavClick('hosting-home')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                    activeTab === 'hosting-home'
                      ? 'bg-[#ea0011] text-white border-white/30 shadow-md'
                      : 'bg-white/15 text-white hover:bg-white/25 border-white/20'
                  }`}
                >
                  <Mic2 className="w-3.5 h-3.5" />
                  <span>הנחיית טקסים ואירועים</span>
                </button>

                {/* גלריית אירועים */}
                <button
                  onClick={() => handleNavClick('hosting-gallery')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'hosting-gallery'
                      ? 'bg-white/20 text-white font-bold shadow-xs underline decoration-white decoration-2 underline-offset-4'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  גלריית אירועים
                </button>

                {/* המלצות וביקורות להנחיות */}
                <button
                  onClick={() => handleNavClick('hosting-reviews')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === 'hosting-reviews'
                      ? 'bg-white/20 text-white font-bold shadow-xs underline decoration-white decoration-2 underline-offset-4'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#ffdad5]" />
                  <span>המלצות וביקורות</span>
                </button>

                {/* Switch link to Speeches */}
                <button
                  onClick={() => handleNavClick('speeches-home')}
                  className="text-xs text-white/80 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-md transition-all cursor-pointer mr-1"
                  title="מעבר לאזור כתיבת תוכן ונאומים"
                >
                  לכתיבת תוכן ונאומים ←
                </button>
              </motion.div>
            )}

            {isSpeechesSection && (
              <motion.div
                key="speeches-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex items-center gap-1 xl:gap-1.5"
              >
                {/* Distinctive Section Button (כתיבת תוכן ונאומים) */}
                <button
                  onClick={() => handleNavClick('speeches-home')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-sm ${
                    activeTab === 'speeches-home'
                      ? 'bg-[#112b4e] text-white border-white/30 shadow-md'
                      : 'bg-white/15 text-white hover:bg-white/25 border-white/20'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>כתיבת תוכן ונאומים</span>
                </button>

                {/* דוגמאות לנאומים */}
                <button
                  onClick={() => handleNavClick('speeches-full')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'speeches-full'
                      ? 'bg-white/20 text-white font-bold shadow-xs underline decoration-white decoration-2 underline-offset-4'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  דוגמאות לנאומים
                </button>

                {/* המלצות וביקורות לנאומים */}
                <button
                  onClick={() => handleNavClick('speeches-reviews')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === 'speeches-reviews'
                      ? 'bg-white/20 text-white font-bold shadow-xs underline decoration-white decoration-2 underline-offset-4'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-white/90" />
                  <span>המלצות וביקורות</span>
                </button>

                {/* Switch link to Hosting */}
                <button
                  onClick={() => handleNavClick('hosting-home')}
                  className="text-xs text-white/80 hover:text-white hover:bg-white/10 px-2.5 py-1 rounded-md transition-all cursor-pointer mr-1"
                  title="מעבר לאזור הנחיית טקסים"
                >
                  להנחיית טקסים ←
                </button>
              </motion.div>
            )}

            {!isHostingSection && !isSpeechesSection && (
              <motion.div
                key="portal-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex items-center gap-1 xl:gap-1.5"
              >
                {/* Button: הנחיית טקסים */}
                <button
                  onClick={() => handleNavClick('hosting-home')}
                  className="px-3.5 py-1.5 rounded-lg font-bold bg-[#18457c] hover:bg-[#123662] text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm border border-white/20 hover:scale-105"
                >
                  <Mic2 className="w-3.5 h-3.5 text-[#ea0011]" />
                  <span>הנחיית טקסים ואירועים</span>
                </button>

                {/* Button: כתיבת תוכן ונאומים */}
                <button
                  onClick={() => handleNavClick('speeches-home')}
                  className="px-3.5 py-1.5 rounded-lg font-bold bg-[#ea0011] hover:bg-[#c9000e] text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm border border-white/20 hover:scale-105"
                >
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                  <span>כתיבת תוכן ונאומים</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </nav>

        {/* Header Left Actions: Contact Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Contact Button */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${contactButtonClass}`}
          >
            <Mail className="w-4 h-4" />
            <span>יצירת קשר</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="פתח תפריט ניווט"
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/30 backdrop-blur-md border-t border-white/15 px-4 py-4 space-y-2 shadow-2xl text-right animate-in slide-in-from-top-2 duration-200">
          
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/15">
            <button
              onClick={() => handleNavClick('home')}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center ${
                activeTab === 'home' ? 'bg-white text-[#112b4e]' : 'bg-white/15 text-white'
              }`}
            >
              דף הבית
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center ${
                activeTab === 'about' ? 'bg-white text-[#112b4e]' : 'bg-white/15 text-white'
              }`}
            >
              אודות משה
            </button>
          </div>

          {/* Section 1: הנחיית טקסים */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-white/70 px-2 pb-1">הנחיית טקסים ואירועים</div>
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('hosting-home')}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'hosting-home' ? 'bg-white/25 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>דף הבית להנחיות</span>
                <Mic2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavClick('hosting-gallery')}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'hosting-gallery' ? 'bg-white/25 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>גלריית אירועים</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavClick('hosting-reviews')}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'hosting-reviews' ? 'bg-white/25 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>המלצות וביקורות להנחיות</span>
                <MessageSquareQuote className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section 2: כתיבת תוכן ונאומים */}
          <div className="pt-2 border-t border-white/15">
            <div className="text-[11px] font-bold text-white/70 px-2 pb-1">כתיבת תוכן ונאומים</div>
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('speeches-home')}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'speeches-home' ? 'bg-white/25 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>דף הבית לנאומים</span>
                <BookOpen className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavClick('speeches-full')}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'speeches-full' ? 'bg-white/25 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>דוגמאות לנאומים</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavClick('speeches-reviews')}
                className={`w-full text-right px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  activeTab === 'speeches-reviews' ? 'bg-white/25 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>המלצות וביקורות לנאומים</span>
                <MessageSquareQuote className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-white/15">
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 ${contactButtonClass}`}
            >
              <Mail className="w-4 h-4" />
              <span>יצירת קשר עם משה</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
