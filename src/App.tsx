import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { SpeechesSection } from './components/SpeechesSection';
import { ReviewsPage } from './components/ReviewsPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import siteConfig from './data/siteConfig.json';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#112b4e] font-['Assistant',sans-serif] selection:bg-[#ea0011] selection:text-white" dir="rtl">
      
      {/* Top Header Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onScrollToReviews={() => handleNavigate('reviews')}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-grow">
        {/* Home Tab: Clean Layout with Hero (4 buttons) and "הקטע השני" (About) only */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            <Hero onNavigate={handleNavigate} />
            <AboutSection onNavigateToContact={() => handleNavigate('contact')} />
          </div>
        )}

        {/* Gallery Tab: Photo albums & filters */}
        {activeTab === 'gallery' && (
          <PhotoGallery />
        )}

        {/* Speeches Tab: Continuous David font speeches list */}
        {activeTab === 'speeches' && (
          <SpeechesSection />
        )}

        {/* Reviews Tab: 3-column reviews page with modal */}
        {activeTab === 'reviews' && (
          <ReviewsPage />
        )}

        {/* About Tab: Full Moshe Stern introduction */}
        {activeTab === 'about' && (
          <AboutSection onNavigateToContact={() => handleNavigate('contact')} />
        )}

        {/* Contact Tab: Phone, WhatsApp, and form */}
        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Floating WhatsApp button */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`פנייה בוואטסאפ ל${siteConfig.authorName}`}
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
          title="וואטסאפ מהיר עם משה"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default App;
