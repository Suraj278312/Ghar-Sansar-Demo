import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext.tsx';
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck, MapPin, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomePageHero: React.FC = () => {
  const { navigateTo } = useApp();

  // Refs for GSAP animation orchestration
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const footerMetaRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create GSAP context for safe cleanup in React 19
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state setup to prevent flash of unstyled content
      gsap.set([
        eyebrowRef.current,
        headlineLine1Ref.current,
        headlineLine2Ref.current,
        headlineLine3Ref.current,
        subtextRef.current,
        ctaGroupRef.current,
        footerMetaRef.current,
        scrollCueRef.current,
      ], { opacity: 0, y: 35 });

      gsap.set(imageContainerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
      });

      // Staggered Slow-Reveal Sequence
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
      })
      .to(
        [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      .to(
        subtextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        '-=0.6'
      )
      .to(
        imageContainerRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power2.out',
        },
        '-=0.8'
      )
      .to(
        ctaGroupRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.9'
      )
      .to(
        [footerMetaRef.current, scrollCueRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        '-=0.6'
      );

      // Subtle scroll parallax on hero image container
      if (imageContainerRef.current && heroRef.current) {
        gsap.to(imageContainerRef.current, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between border-b border-[#EAE3DA] px-4 sm:px-8 pt-8 lg:pt-12 pb-8 select-none bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F4EFEA]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        {/* Left Column: Italian High-Fashion Typography & Narrative */}
        <div className="lg:col-span-6 space-y-8 max-w-xl">
          {/* Eyebrow badge */}
          <div ref={eyebrowRef} className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#EFE8E1] border border-[#DFD3C7] rounded-full text-[11px] font-medium text-[#7A4B3A] tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#BA4A2C]" />
              Household &amp; Living Essentials · Bhuj
            </span>
            <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#8A7B72] font-semibold">
              BHUJ, GUJARAT
            </span>
          </div>

          {/* Masked Headline with Cormorant Garamond */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-serif font-normal tracking-[-0.02em] text-[#1F1916] leading-[1.02]">
              <span ref={headlineLine1Ref} className="block font-medium">
                Everything
              </span>
              <span ref={headlineLine2Ref} className="block font-serif italic font-normal text-[#BA4A2C] text-5xl sm:text-7xl lg:text-[5.2rem] -my-1 sm:-my-2">
                Your Home
              </span>
              <span ref={headlineLine3Ref} className="block font-medium">
                Deserves.
              </span>
            </h1>
          </div>

          {/* Editorial Supporting Prose */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-[#6E5E55] leading-relaxed max-w-lg font-sans font-normal"
          >
            Thoughtfully curated household, stainless thermoware, and everyday kitchen essentials —
            celebrating timeless durability with complimentary local doorstep delivery across Bhuj.
          </p>

          {/* Staggered CTAs */}
          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer flex items-center gap-2.5 group shadow-[0_10px_25px_-5px_rgba(186,74,44,0.38)] hover:shadow-[0_16px_32px_-5px_rgba(186,74,44,0.48)] hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              onClick={() => navigateTo('categories')}
              className="px-8 py-4 bg-white/80 hover:bg-white text-[#1F1916] border border-[#DFD5CB] text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer hover:border-[#BA4A2C] hover:text-[#BA4A2C] shadow-xs hover:shadow-sm hover:-translate-y-0.5"
            >
              All Categories
            </button>
          </div>

          {/* Footnote Metadata */}
          <div
            ref={footerMetaRef}
            className="pt-6 border-t border-[#E8DFD6] flex flex-wrap items-center gap-6 text-[11px] tracking-wider uppercase text-[#7A6B62] font-sans font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BA4A2C] animate-pulse" />
              <span className="font-semibold text-[#1F1916]">Bhuj Doorstep Delivery (370XXX)</span>
            </div>
            <span className="text-[#D0C4BA]">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#536248]" />
              <span>Original Milton &amp; Boss</span>
            </div>
            <span className="text-[#D0C4BA]">·</span>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#BA4A2C]" />
              <span>COD / UPI at Doorstep</span>
            </div>
          </div>
        </div>

        {/* Right Column: Framing with Floating Tags */}
        <div
          ref={imageContainerRef}
          className="lg:col-span-6 w-full"
        >
          <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] bg-[#EDE6DE] rounded-[2rem] overflow-hidden select-none border border-[#E4DAD0] shadow-[0_25px_60px_-15px_rgba(45,28,18,0.16)] group">
            {/* Editorial Lifestyle Demo Image */}
            <img
              src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1400&q=85"
              alt="Ghar Sansar Curated Domestic Still Life - Thermosteel, Casseroles and Home Storage in Bhuj"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Gradient Vignette to Maintain Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/85 via-[#1F1916]/20 to-transparent pointer-events-none" />

            {/* Store Archive Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-md border border-[#E5DAD0] text-[10.5px] uppercase font-sans tracking-widest text-[#1F1916] rounded-full shadow-md flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#BA4A2C] animate-pulse-glow" />
              <span className="font-semibold">Open Daily · Station Road, Bhuj</span>
            </div>

            {/* Interactive Product Callout Tag 1 */}
            <div
              onClick={() => navigateTo('product-detail', { productId: 'milton-thermosteel-flip-1000' })}
              className="absolute top-1/3 left-6 sm:left-10 px-4 py-2.5 bg-[#1F1916]/90 backdrop-blur-md border border-white/20 text-white rounded-2xl cursor-pointer hover:bg-[#1F1916] transition-all hover:scale-105 shadow-xl hover:border-[#BA4A2C]"
            >
              <div className="text-[9px] tracking-widest uppercase text-[#D4A373] font-semibold">GENUINE MILTON</div>
              <div className="text-xs font-serif font-bold tracking-tight">Thermosteel Flask 1000ml</div>
              <div className="text-[11px] font-sans font-semibold text-[#FAF7F2] mt-0.5">
                ₹995 <span className="line-through text-white/50 text-[10px] ml-1">₹1,250</span>
              </div>
            </div>

            {/* Interactive Product Callout Tag 2 */}
            <div
              onClick={() => navigateTo('product-detail', { productId: 'milton-galaxia-casserole-2500' })}
              className="absolute bottom-28 right-6 sm:right-10 px-4 py-2.5 bg-[#1F1916]/90 backdrop-blur-md border border-white/20 text-white rounded-2xl cursor-pointer hover:bg-[#1F1916] transition-all hover:scale-105 shadow-xl hover:border-[#BA4A2C]"
            >
              <div className="text-[9px] tracking-widest uppercase text-[#D4A373] font-semibold">DINING HOT POT</div>
              <div className="text-xs font-serif font-bold tracking-tight">Galaxia Casserole 2500ml</div>
              <div className="text-[11px] font-sans font-semibold text-[#FAF7F2] mt-0.5">
                ₹895 <span className="line-through text-white/50 text-[10px] ml-1">₹1,150</span>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white pointer-events-none">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-medium">
                  HOUSEHOLD CATALOG 2026
                </div>
                <div className="text-base sm:text-lg font-serif font-normal tracking-tight text-white">
                  Everyday Comfort &amp; Quality · Bhuj, Gujarat
                </div>
                <div className="text-[11px] text-[#D8CCC4] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#BA4A2C]" />
                  <span>Jubilee Ground, Station Road · Bhuj, Gujarat</span>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[10px] tracking-widest text-[#D4A373] uppercase block font-semibold">
                  DOORSTEP DELIVERY
                </span>
                <span className="text-xs font-sans font-bold text-white uppercase block">
                  FAST LOCAL DISPATCH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#8A7B72] font-sans"
      >
        <div className="flex items-center gap-2 text-[#BA4A2C] font-semibold">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>Explore Collections · Scroll Down</span>
        </div>
        <div className="hidden sm:block text-[#8A7B72]">
          BHUJ, GUJARAT · AUTHENTIC HOUSEHOLD ESSENTIALS
        </div>
      </div>
    </section>
  );
};

