import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Sparkles, MessageSquareQuote, Mail } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onScrollToReviews: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onScrollToReviews
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'דף הבית' },
    { id: 'gallery', label: 'גלריית אירועים' },
    { id: 'speeches', label: 'דוגמאות לנאומים' },
    { id: 'reviews', label: 'תגובות וביקורות' },
    { id: 'about', label: 'אודות משה' },
    { id: 'contact', label: 'פרטי קשר' },
  ];

  const handleNavClick = (item: { id: string; label: string }) => {
    setActiveTab(item.id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#18457c] shadow-lg shadow-[#18457c]/20 border-b border-[#245999]'
          : 'bg-[#18457c] border-b border-[#143c6d]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo - כתוב | משה שטרן */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-right focus:outline-none group text-white cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#ea0011] flex items-center justify-center text-white shadow-md shadow-[#ea0011]/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-2xl md:text-3xl tracking-tight text-white flex items-center gap-2 font-['Assistant'] leading-tight">
              <span>כתוב</span>
            </div>
            <div className="text-xs text-[#d6e3f8] font-semibold tracking-wide">
              משה שטרן
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 rounded-lg cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white font-bold bg-[#245999]'
                    : 'text-white/85 hover:text-white hover:bg-[#204f88]'
                }`}
              >
                {item.id === 'reviews' && <MessageSquareQuote className="w-3.5 h-3.5 text-[#ffdad5]" />}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#ea0011] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="tel:0547890123"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#d6e3f8] hover:text-white px-3 py-2 rounded-lg bg-[#204f88] hover:bg-[#245999] transition-colors border border-white/10"
            title="חיוג ישיר"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#ffdad5]" />
            <span dir="ltr">054-789-0123</span>
          </a>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-white text-[#18457c]'
                : 'bg-[#ea0011] hover:bg-[#c9000e] text-white shadow-sm hover:shadow-md'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>פרטי קשר</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="פתח תפריט"
            className="lg:hidden p-2 text-white hover:text-[#ffdad5] rounded-lg hover:bg-[#204f88] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18457c] border-t border-[#245999] px-4 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full text-right px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#245999] text-white font-bold border-r-4 border-[#ea0011]'
                    : 'text-white/90 hover:bg-[#204f88] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.id === 'reviews' && <MessageSquareQuote className="w-4 h-4 text-[#ffdad5]" />}
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-[#245999] flex flex-col gap-2">
            <a
              href="tel:0547890123"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#204f88] text-white font-medium text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#ffdad5]" />
              <span>חיוג ישיר: 054-789-0123</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
