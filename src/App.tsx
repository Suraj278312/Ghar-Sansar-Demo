import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { MobileNav } from './components/MobileNav.tsx';
import { Footer } from './components/Footer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { QuickViewModal } from './components/QuickViewModal.tsx';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal.tsx';
import { Toast } from './components/Toast.tsx';

gsap.registerPlugin(ScrollTrigger);

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductDetailPage } from './pages/ProductDetailPage.tsx';
import { CategoriesPage } from './pages/CategoriesPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { AuthPage } from './pages/AuthPage.tsx';
import { AccountPage } from './pages/AccountPage.tsx';
import { OrderTrackingPage } from './pages/OrderTrackingPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { DeliveryInfoPage } from './pages/DeliveryInfoPage.tsx';
import { FAQPage } from './pages/FAQPage.tsx';
import { PolicyPage } from './pages/PolicyPage.tsx';

const AppContent: React.FC = () => {
  const {
    currentPage,
    whatsAppOrderData,
    closeWhatsAppOrder,
    quickViewProduct,
    isSearchOpen,
  } = useApp();
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger & Ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Update ScrollTrigger on Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP's central ticker for unified frame rendering
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis and lock body scroll whenever any modal is open
  useEffect(() => {
    const isAnyModalOpen = Boolean(whatsAppOrderData || quickViewProduct || isSearchOpen);
    if (lenisRef.current) {
      if (isAnyModalOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [whatsAppOrderData, quickViewProduct, isSearchOpen]);

  // Main Layout ScrollTrigger Engine: reveal section headings, product grids & image containers
  useEffect(() => {
    // Reset scroll to top on page navigation
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Refresh ScrollTrigger calculations after new page DOM mounts
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    const ctx = gsap.context(() => {
      if (!mainRef.current) return;

      // 1. Section Headings: Subtle fade up and translate
      const headings = mainRef.current.querySelectorAll<HTMLElement>(
        '.reveal-heading, section > div > h2, h2.uppercase, .section-heading'
      );

      headings.forEach((heading) => {
        // Prevent duplicate binds if page already handles it internally
        if (heading.dataset.layoutAnimated) return;
        heading.dataset.layoutAnimated = 'true';

        gsap.fromTo(
          heading,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // 2. Product Grid Containers: Staggered entry with subtle lift
      const productGrids = mainRef.current.querySelectorAll<HTMLElement>(
        '.reveal-product-grid, main .grid'
      );

      productGrids.forEach((grid) => {
        if (grid.dataset.layoutAnimated) return;
        grid.dataset.layoutAnimated = 'true';

        const cards = grid.children;
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 86%',
                once: true,
              },
            }
          );
        }
      });

      // 3. Image Containers: Subtle scale-down and entrance
      const imageContainers = mainRef.current.querySelectorAll<HTMLElement>(
        '.reveal-category-card, .reveal-store-image, .reveal-about-photo, .group\\/img'
      );

      imageContainers.forEach((container) => {
        if (container.dataset.layoutAnimated) return;
        container.dataset.layoutAnimated = 'true';

        const img = container.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      });
    }, mainRef);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [currentPage]);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'login':
        return <AuthPage initialMode="login" />;
      case 'register':
        return <AuthPage initialMode="register" />;
      case 'account':
        return <AccountPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'delivery-info':
        return <DeliveryInfoPage />;
      case 'faq':
        return <FAQPage />;
      case 'privacy':
        return <PolicyPage type="privacy" />;
      case 'terms':
        return <PolicyPage type="terms" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      {/* Sticky Header with subtle scroll collapse */}
      <Navbar />

      {/* Main Dynamic View */}
      <main ref={mainRef} className="flex-1">
        {renderActivePage()}
      </main>

      {/* Large Black & White Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav />

      {/* Search Overlay, Quick View Modal, WhatsApp Order & Toast Notification */}
      <SearchModal />
      <QuickViewModal />
      <WhatsAppOrderModal data={whatsAppOrderData} onClose={closeWhatsAppOrder} />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
