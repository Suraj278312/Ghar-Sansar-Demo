import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext.tsx';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(
        '.reveal-about-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        }
      );

      // 2. Store Feature Photo & Image Scale
      const photoWrap = containerRef.current?.querySelector('.reveal-about-photo');
      const photoImg = photoWrap?.querySelector('img');

      if (photoWrap) {
        gsap.fromTo(
          photoWrap,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photoWrap,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (photoImg) {
        gsap.fromTo(
          photoImg,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: photoWrap,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Principles 3-Columns Staggered
      const principles = gsap.utils.toArray<HTMLElement>('.reveal-principle');
      if (principles.length > 0) {
        gsap.fromTo(
          principles,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: principles[0],
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 4. Physical Store Card
      const storeCard = containerRef.current?.querySelector('.reveal-store-card');
      if (storeCard) {
        gsap.fromTo(
          storeCard,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storeCard,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16 select-none bg-[#FAF7F2]">
      {/* Editorial Title */}
      <div className="reveal-about-header space-y-4 border-b border-[#E8DFD6] pb-10">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          BHUJ, GUJARAT · HERITAGE HOUSEHOLD STORE
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight text-[#1F1916] leading-tight">
          Your Local Store, <br />
          <span className="font-serif italic font-light text-[#BA4A2C]">Now Online.</span>
        </h1>
        <p className="text-base text-[#7A6B62] leading-relaxed max-w-xl font-sans">
          Ghar Sansar is a trusted local household, kitchenware, storage, and plastic products store serving
          families in Bhuj with care and authenticity.
        </p>
      </div>

      {/* Store Feature Photograph */}
      <div className="reveal-about-photo relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-[#E4DAD0] bg-[#F5EFEB] shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85"
          alt="Ghar Sansar Physical Store at Station Road, Bhuj, Gujarat"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/75 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-6 text-white text-xs font-sans uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#BA4A2C]" />
          <span>Ghar Sansar Retail Archive · Near Jubilee Ground, Bhuj</span>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="space-y-10 text-sm text-[#7A6B62] leading-relaxed font-sans">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#1F1916]">
            Everyday Essentials Built for Daily Life
          </h2>
          <p>
            For Indian households, domestic utility products are not decorative afterthoughts; they
            are the quiet backbone of everyday living. From heavy stainless steel roti hot pots that
            preserve warmth to vacuum insulated flasks for workdays, durable airtight grain
            containers, and high-density plastic buckets that endure hard water and desert heat —
            practical utility matters.
          </p>
          <p>
            At Ghar Sansar, our physical store near Jubilee Ground in Bhuj has always focused on
            stocking trusted national manufacturers: genuine Milton thermoware and vacuum steel,
            durable Boss plastic storage and cleaning utilities, and tested kitchenware.
          </p>
        </div>

        {/* 3 Columns Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E8DFD6]">
          <div className="reveal-principle luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-2">
            <span className="font-serif font-bold text-xs text-[#BA4A2C] tracking-widest uppercase">01. Verified Brands</span>
            <div className="text-sm font-serif font-medium text-[#1F1916]">
              Original Branded Stock
            </div>
            <p className="text-xs text-[#7A6B62] leading-relaxed">
              Authorized retail partner stocking 100% verified Milton and Boss catalog products.
            </p>
          </div>

          <div className="reveal-principle luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-2">
            <span className="font-serif font-bold text-xs text-[#BA4A2C] tracking-widest uppercase">02. Fast Dispatch</span>
            <div className="text-sm font-serif font-medium text-[#1F1916]">
              Direct Local Dispatch
            </div>
            <p className="text-xs text-[#7A6B62] leading-relaxed">
              Fulfillments originate straight from local Bhuj store inventory for same-day delivery.
            </p>
          </div>

          <div className="reveal-principle luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-2">
            <span className="font-serif font-bold text-xs text-[#BA4A2C] tracking-widest uppercase">03. Store Care</span>
            <div className="text-sm font-serif font-medium text-[#1F1916]">
              In-Person Store Support
            </div>
            <p className="text-xs text-[#7A6B62] leading-relaxed">
              Friendly assistance over WhatsApp, phone, or in person at our physical shop.
            </p>
          </div>
        </div>

        {/* Storefront Note */}
        <div className="reveal-store-card p-8 sm:p-10 bg-white rounded-3xl border border-[#E8DFD6] space-y-4 shadow-sm">
          <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#BA4A2C]">
            VISIT OUR PHYSICAL STORE IN BHUJ
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#1F1916]">
            Station Road, Near Jubilee Ground
          </h3>
          <p className="text-xs leading-relaxed text-[#7A6B62]">
            You are always welcome to explore our full physical inventory in person at Station Road,
            near Jubilee Ground, Bhuj. Open Monday through Saturday, 9:30 AM to 9:00 PM.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-full bg-[#1F1916] hover:bg-[#BA4A2C] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <span>View Store Address &amp; Directions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
