import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HostingHome } from './components/HostingHome';
import { SpeechesHome } from './components/SpeechesHome';
import { PhotoGallery } from './components/PhotoGallery';
import { SpeechesSection } from './components/SpeechesSection';
import { ReviewsPage } from './components/ReviewsPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import siteConfig from './data/siteConfig.json';
import { tabToUrlMap, getInitialTabFromLocation } from './navigation';

interface AppProps {
  initialTab?: string;
}

export function App({ initialTab }: AppProps) {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return initialTab || getInitialTabFromLocation();
  });
  const [initialGalleryEventId, setInitialGalleryEventId] = useState<string | null>(null);

  useEffect(() => {
    // Ensure the initial history entry has the current tab state
    if (!window.history.state || !window.history.state.tab) {
      window.history.replaceState({ tab: activeTab }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.tab === 'string') {
        setActiveTab(event.state.tab);
        setInitialGalleryEventId(null);
      } else {
        const tab = getInitialTabFromLocation();
        setActiveTab(tab);
        setInitialGalleryEventId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab]);

  const handleNavigate = (tabId: string, eventId?: string) => {
    if (eventId) {
      setInitialGalleryEventId(eventId);
    } else {
      setInitialGalleryEventId(null);
    }

    setActiveTab(tabId);
    const targetUrl = tabToUrlMap[tabId] || '/';
    
    // Update browser URL if changed
    if (window.location.pathname !== targetUrl && !window.location.pathname.endsWith(targetUrl)) {
      window.history.pushState({ tab: tabId }, '', targetUrl);
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#112b4e] font-['Assistant',sans-serif] selection:bg-[#ea0011] selection:text-white" dir="rtl">
      
      {/* Top Header Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab)}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-grow">
        {/* 1. Main Portal Home (Hero + About) */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            <Hero onNavigate={(tab) => handleNavigate(tab)} />
            <AboutSection onNavigateToContact={() => handleNavigate('contact')} />
          </div>
        )}

        {/* 2. About Section */}
        {activeTab === 'about' && (
          <AboutSection onNavigateToContact={() => handleNavigate('contact')} />
        )}

        {/* 3. Hosting Section: Home (with 3 gallery taste items) */}
        {activeTab === 'hosting-home' && (
          <HostingHome onNavigate={handleNavigate} />
        )}

        {/* 4. Hosting Section: Full Photo Gallery */}
        {(activeTab === 'hosting-gallery' || activeTab === 'gallery') && (
          <PhotoGallery initialEventId={initialGalleryEventId} />
        )}

        {/* 5. Hosting Section: Reviews & Testimonials */}
        {activeTab === 'hosting-reviews' && (
          <ReviewsPage type="hosting" />
        )}

        {/* 6. Speeches Section: Home (with 3 speeches taste items) */}
        {activeTab === 'speeches-home' && (
          <SpeechesHome onNavigate={(tab) => handleNavigate(tab)} />
        )}

        {/* 7. Speeches Section: Full Speeches List */}
        {(activeTab === 'speeches-full' || activeTab === 'speeches') && (
          <SpeechesSection />
        )}

        {/* 8. Speeches Section: Reviews & Testimonials */}
        {activeTab === 'speeches-reviews' && (
          <ReviewsPage type="speeches" />
        )}

        {/* Fallback general reviews if requested */}
        {activeTab === 'reviews' && (
          <ReviewsPage type="all" />
        )}

        {/* 9. Contact Tab */}
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
      <Footer onNavigate={(tab) => handleNavigate(tab)} />

    </div>
  );
}

export default App;
