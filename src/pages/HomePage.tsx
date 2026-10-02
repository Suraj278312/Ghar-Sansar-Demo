import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext.tsx';
import { products } from '../data/products.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { HomePageHero } from '../components/HomePageHero.tsx';
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const popularRailRef = useRef<HTMLDivElement>(null);

  // Curated collections
  const everydayEssentials = products.slice(0, 8);
  const miltonCollection = products.filter((p) => p.brand === 'Milton').slice(0, 6);
  const bossCollection = products.filter((p) => p.brand === 'Boss').slice(0, 6);
  const popularProducts = products.filter((p) => p.isPopularInBhuj || p.isBestSeller).slice(0, 8);

  const scrollRail = (direction: 'left' | 'right') => {
    if (popularRailRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      popularRailRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. All Section Heading Headers
      const headings = gsap.utils.toArray<HTMLElement>('.reveal-heading');
      headings.forEach((heading) => {
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
              once: true,
            },
          }
        );
      });

      // 2. Category Blocks & Image Scale on Entry
      const categoryCards = gsap.utils.toArray<HTMLElement>('.reveal-category-card');
      if (categoryCards.length > 0) {
        gsap.fromTo(
          categoryCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoryCards[0],
              start: 'top 85%',
              once: true,
            },
          }
        );

        const categoryImages = gsap.utils.toArray<HTMLElement>('.reveal-category-img');
        categoryImages.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 92%',
                once: true,
              },
            }
          );
        });
      }

      // 3. Product Grids
      const productGrids = gsap.utils.toArray<HTMLElement>('.reveal-product-grid');
      productGrids.forEach((grid) => {
        const cards = grid.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // 4. Section 05: Storefront Image & Narrative Story
      const storeImageWrap = containerRef.current?.querySelector('.reveal-store-image');
      const storeImg = storeImageWrap?.querySelector('img');
      const storeStory = containerRef.current?.querySelector('.reveal-store-story');

      if (storeImageWrap) {
        gsap.fromTo(
          storeImageWrap,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storeImageWrap,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (storeImg) {
        gsap.fromTo(
          storeImg,
          { scale: 1.18, filter: 'contrast(1.08)' },
          {
            scale: 1,
            filter: 'contrast(1.03)',
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: storeImageWrap,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (storeStory) {
        gsap.fromTo(
          storeStory,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storeStory,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 5. Why Ghar Sansar Editorial Pillars
      const pillars = gsap.utils.toArray<HTMLElement>('.reveal-pillar');
      if (pillars.length > 0) {
        gsap.fromTo(
          pillars,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillars[0],
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 6. Popular Horizontal Rail
      const popularRail = containerRef.current?.querySelector('.reveal-popular-rail');
      if (popularRail) {
        gsap.fromTo(
          popularRail,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: popularRail,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 7. Delivery Region Card
      const deliveryCard = containerRef.current?.querySelector('.reveal-delivery-card');
      if (deliveryCard) {
        gsap.fromTo(
          deliveryCard,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: deliveryCard,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 8. Final CTA
      const finalCta = containerRef.current?.querySelector('.reveal-final-cta');
      if (finalCta) {
        gsap.fromTo(
          finalCta,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: finalCta,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const editorialCategories = [
    {
      name: 'Kitchen & Dining',
      items: '18 Items',
      image: 'https://images.unsplash.com/photo-1584990347449-399d254f16a5?auto=format&fit=crop&w=800&q=80',
      sample: products[11], // Masala Dabba
      desc: 'Heavy gauge steel, dining casseroles & dispensers',
    },
    {
      name: 'Storage',
      items: '16 Items',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      sample: products[17], // Modular Drawers
      desc: 'Modular drawers, grain drums & pantry organizers',
    },
    {
      name: 'Water Bottles',
      items: '15 Items',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      sample: products[0], // Milton Thermosteel
      desc: 'Vacuum insulated steel, copper & fridge flasks',
    },
    {
      name: 'Lunch Boxes',
      items: '10 Items',
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
      sample: products[8], // Futron Electric
      desc: 'Electric heated & insulated stainless steel tiffins',
    },
    {
      name: 'Thermoware',
      items: '9 Items',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
      sample: products[5], // Galaxia Hot Pot
      desc: 'Insulated roti hot pots & family water campers',
    },
    {
      name: 'Cleaning',
      items: '12 Items',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      sample: products[21], // Spin Mop
      desc: '360 spin mops, pedal dustbins & microfiber brooms',
    },
    {
      name: 'Bathroom',
      items: '11 Items',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      sample: products[26], // Bathroom Ensemble
      desc: 'Unbreakable bucket sets, bath stools & caddies',
    },
    {
      name: 'Home Utility',
      items: '14 Items',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
      sample: products[31], // Gas Cylinder Trolley
      desc: 'Cast iron trolleys, drying stands & daily tools',
    },
  ];

  return (
    <div ref={containerRef} className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24 bg-[#FAF7F2]">
      {/* ==================================================
          HIGH-IMPACT EDITORIAL HERO SECTION (80–90vh)
          ================================================== */}
      <HomePageHero />

      {/* ==================================================
          LUXURY MARQUEE TICKER (ENGLISH)
          ================================================== */}
      <div className="w-full bg-[#1F1916] text-[#FAF7F2] py-3.5 overflow-hidden border-y border-[#362D28] shadow-inner select-none -mt-8 sm:-mt-12">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs font-serif tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="text-[#C49746]">✦</span> GHAR SANSAR · BHUJ
          </span>
          <span className="flex items-center gap-2 text-[#D8CCC4]">
            <span className="text-[#BA4A2C]">✦</span> MILTON ORIGINAL THERMOSTEEL &amp; VACUUM FLASKS
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#C49746]">✦</span> LOCAL DOORSTEP DELIVERY IN BHUJ (PIN 370XXX)
          </span>
          <span className="flex items-center gap-2 text-[#D8CCC4]">
            <span className="text-[#BA4A2C]">✦</span> BOSS DURABLE HOUSEWARE &amp; MODULAR STORAGE
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#C49746]">✦</span> CASH OR UPI ON DELIVERY (COD)
          </span>
          <span className="flex items-center gap-2 text-[#D8CCC4]">
            <span className="text-[#BA4A2C]">✦</span> FREE LOCAL DELIVERY ON ORDERS OVER ₹499
          </span>
          {/* Duplicate loop */}
          <span className="flex items-center gap-2">
            <span className="text-[#C49746]">✦</span> GHAR SANSAR · BHUJ
          </span>
          <span className="flex items-center gap-2 text-[#D8CCC4]">
            <span className="text-[#BA4A2C]">✦</span> MILTON ORIGINAL THERMOSTEEL &amp; VACUUM FLASKS
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#C49746]">✦</span> LOCAL DOORSTEP DELIVERY IN BHUJ (PIN 370XXX)
          </span>
          <span className="flex items-center gap-2 text-[#D8CCC4]">
            <span className="text-[#BA4A2C]">✦</span> BOSS DURABLE HOUSEWARE &amp; MODULAR STORAGE
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#C49746]">✦</span> CASH OR UPI ON DELIVERY (COD)
          </span>
          <span className="flex items-center gap-2 text-[#D8CCC4]">
            <span className="text-[#BA4A2C]">✦</span> FREE LOCAL DELIVERY ON ORDERS OVER ₹499
          </span>
        </div>
      </div>

      {/* ==================================================
          SECTION 01 — CATEGORIES
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="reveal-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#E8DFD6]">
          <div>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
              FEATURED DEPARTMENTS · BROWSE BY CATEGORY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#1F1916] mt-1">
              Shop By <span className="font-serif italic text-[#BA4A2C]">Category</span>
            </h2>
            <p className="text-sm text-[#7A6B62] mt-1 font-sans">
              Curated everyday essentials organized for the thoughtful modern household.
            </p>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="px-6 py-2.5 rounded-full border border-[#D9CFC4] hover:border-[#BA4A2C] text-[#1F1916] hover:text-[#BA4A2C] bg-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-xs hover:shadow-sm hover:-translate-y-0.5"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Large Visual Category Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorialCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigateTo('shop', { category: cat.name })}
              className="reveal-category-card luxury-card group cursor-pointer select-none p-3.5 flex flex-col bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7]"
            >
              {/* Large Image Block */}
              <div className="relative w-full aspect-[4/3] rounded-xl bg-[#F5EFEB] overflow-hidden group/img border border-[#EFE8E1]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="reveal-category-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/50 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#1F1916] shadow-sm group-hover:bg-[#BA4A2C] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-[#1F1916]/80 backdrop-blur-xs rounded-md text-[10px] font-sans font-medium text-[#FAF7F2] tracking-wider uppercase">
                  {cat.items}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="pt-3 pb-1 space-y-1">
                <h3 className="text-base font-serif font-medium tracking-tight text-[#1F1916] group-hover:text-[#BA4A2C] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#8A7B72] line-clamp-1 font-sans">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 02 — FEATURED PRODUCTS (EVERYDAY ESSENTIALS)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="reveal-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#E8DFD6]">
          <div>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
              EVERYDAY ESSENTIALS · BEST PICKS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#1F1916] mt-1">
              Everyday <span className="font-serif italic text-[#BA4A2C]">Essentials</span>
            </h2>
            <p className="text-sm text-[#7A6B62] mt-1 font-sans">
              Durable, practical domestic products built for enduring everyday Indian household use.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 rounded-full border border-[#D9CFC4] hover:border-[#BA4A2C] text-[#1F1916] hover:text-[#BA4A2C] bg-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-xs hover:shadow-sm hover:-translate-y-0.5"
          >
            <span>Complete Catalog (70+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Spacious 4-Column Product Grid */}
        <div className="reveal-product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
          {everydayEssentials.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 03 — MILTON SHOWCASE
          ================================================== */}
      <section className="border-y border-[#EAE2D8] py-20 sm:py-24 bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#F5EFEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Header */}
          <div className="reveal-heading flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0D5C9]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
                OFFICIAL BRAND PARTNER · PREMIUM QUALITY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1F1916]">
                Milton <span className="font-serif italic font-light text-[#BA4A2C]">Collection</span>
              </h2>
              <p className="text-base text-[#7A6B62] pt-1 max-w-xl font-sans">
                Designed for warmth and daily elegance. Stainless steel thermoware, vacuum-insulated flasks &amp; hot pots.
              </p>
            </div>

            <button
              onClick={() => navigateTo('shop', { brand: 'Milton' })}
              className="px-8 py-3.5 bg-[#BA4A2C] text-white text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-[#A33D22] transition-all duration-300 cursor-pointer self-start md:self-auto shadow-[0_8px_20px_-4px_rgba(186,74,44,0.35)] hover:-translate-y-0.5"
            >
              Explore Milton &rarr;
            </button>
          </div>

          {/* Wide Horizontal Grid */}
          <div className="reveal-product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {miltonCollection.map((product) => (
              <ProductCard key={product.id} product={product} showQuickAdd={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 04 — BOSS SHOWCASE (Storage & Utility)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="reveal-heading flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8DFD6]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#536248]">
                VIRGIN POLYMERS &amp; HOME ORGANIZATION
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1F1916]">
                Boss <span className="font-serif italic font-light text-[#536248]">Household</span>
              </h2>
              <p className="text-base text-[#7A6B62] pt-1 max-w-xl font-sans">
                Heavy-duty virgin plastic utility, modular drawer chests, bathroom ensembles &amp; floor care essentials.
              </p>
            </div>

            <button
              onClick={() => navigateTo('shop', { brand: 'Boss' })}
              className="px-8 py-3.5 bg-[#536248] text-white text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-[#43503a] transition-all duration-300 cursor-pointer self-start md:self-auto shadow-[0_8px_20px_-4px_rgba(83,98,72,0.35)] hover:-translate-y-0.5"
            >
              Explore Boss &rarr;
            </button>
          </div>

          {/* Wide Horizontal Grid */}
          <div className="reveal-product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {bossCollection.map((product) => (
              <ProductCard key={product.id} product={product} showQuickAdd={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 05 — LOCAL STORE STORY
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Image on Left */}
          <div className="reveal-store-image lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E4DAD0] shadow-[0_25px_50px_-12px_rgba(45,28,18,0.18)] group">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Ghar Sansar Storefront and Domestic Retail Archive, Station Road, Bhuj"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/85 via-[#1F1916]/30 to-transparent pointer-events-none" />
            <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs text-[10px] font-sans font-bold uppercase tracking-widest text-[#1F1916] rounded-full border border-[#E8DFD6] shadow-sm">
              HERITAGE STORE · BHUJ
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <div className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-white">
                Ghar Sansar Retail Archive
              </div>
              <div className="text-xs text-[#D8CCC4] font-sans">
                Station Road, Near Jubilee Ground · Bhuj, Gujarat
              </div>
              <p className="text-[11.5px] text-[#FAF7F2]/80 pt-1 leading-relaxed max-w-md font-sans">
                Serving generations of local families with reliable kitchenware, airtight containers, durable buckets, and daily utility.
              </p>
            </div>
          </div>

          {/* Text on Right */}
          <div className="reveal-store-story lg:col-span-6 space-y-6 max-w-lg">
            <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#BA4A2C] font-sans">
              OUR STORY · SERVING BHUJ FOR GENERATIONS
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#1F1916] leading-tight">
              From Our Store <br />
              <span className="font-serif italic font-light text-[#BA4A2C]">To Your Home.</span>
            </h2>

            <p className="text-base text-[#6E5E55] leading-relaxed font-sans">
              Ghar Sansar brings the authenticity of local market shopping online — making essential domestic products easier to discover, verify, and receive across Bhuj.
            </p>

            <p className="text-sm text-[#7A6B62] leading-relaxed font-sans">
              Instead of navigating congested market streets for a single storage box or a vacuum thermos flask, you can choose from our genuine store inventory and enjoy swift doorstep delivery in 24 to 48 hours.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="px-7 py-3.5 rounded-full bg-[#1F1916] hover:bg-[#BA4A2C] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 06 — WHY GHAR SANSAR (Elevated 4 Pillars)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="reveal-heading mb-12 pb-6 border-b border-[#E8DFD6]">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
            OUR CORE PROMISE · TRUSTED SERVICE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#1F1916] mt-1">
            Why Choose <span className="font-serif italic text-[#BA4A2C]">Ghar Sansar</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="reveal-pillar luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-3">
            <span className="text-xs font-serif font-bold text-[#BA4A2C] tracking-widest uppercase">
              01. Local Bhuj Delivery
            </span>
            <h3 className="text-lg font-serif font-medium text-[#1F1916]">
              Fast Local Dispatch
            </h3>
            <p className="text-xs text-[#7A6B62] leading-relaxed font-sans">
              Dispatched directly from our Station Road retail store. Swift local doorstep delivery across Bhuj pin codes.
            </p>
          </div>

          <div className="reveal-pillar luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-3">
            <span className="text-xs font-serif font-bold text-[#BA4A2C] tracking-widest uppercase">
              02. Verified Brands
            </span>
            <h3 className="text-lg font-serif font-medium text-[#1F1916]">
              100% Genuine Products
            </h3>
            <p className="text-xs text-[#7A6B62] leading-relaxed font-sans">
              100% original Milton thermoware, Boss heavy plastics, and food-grade stainless steel items.
            </p>
          </div>

          <div className="reveal-pillar luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-3">
            <span className="text-xs font-serif font-bold text-[#BA4A2C] tracking-widest uppercase">
              03. Effortless Ordering
            </span>
            <h3 className="text-lg font-serif font-medium text-[#1F1916]">
              Clean &amp; Simple Shopping
            </h3>
            <p className="text-xs text-[#7A6B62] leading-relaxed font-sans">
              Clean, ad-free storefront without clutter. Instant PIN code check and straightforward 2-step checkout.
            </p>
          </div>

          <div className="reveal-pillar luxury-card p-6 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] space-y-3">
            <span className="text-xs font-serif font-bold text-[#BA4A2C] tracking-widest uppercase">
              04. Cash on Delivery
            </span>
            <h3 className="text-lg font-serif font-medium text-[#1F1916]">
              Cash &amp; UPI at Doorstep
            </h3>
            <p className="text-xs text-[#7A6B62] leading-relaxed font-sans">
              Pay upon doorstep arrival using cash or direct UPI QR scan (Google Pay, PhonePe, Paytm).
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 07 — BEST SELLERS (WHAT'S POPULAR)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="reveal-heading flex items-end justify-between mb-8 pb-6 border-b border-[#E8DFD6]">
          <div>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
              COMMUNITY FAVORITES · POPULAR CHOICES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#1F1916] mt-1">
              What's Popular in <span className="font-serif italic text-[#BA4A2C]">Bhuj</span>
            </h2>
            <p className="text-sm text-[#7A6B62] mt-1 font-sans">
              Frequently ordered domestic items by families across Bhuj and suburbs.
            </p>
          </div>

          {/* Desktop Left/Right Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => scrollRail('left')}
              className="p-3 rounded-full border border-[#D9CFC4] bg-white hover:border-[#BA4A2C] hover:text-[#BA4A2C] text-[#1F1916] transition-all shadow-xs hover:shadow-sm cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollRail('right')}
              className="p-3 rounded-full border border-[#D9CFC4] bg-white hover:border-[#BA4A2C] hover:text-[#BA4A2C] text-[#1F1916] transition-all shadow-xs hover:shadow-sm cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Rail Container */}
        <div
          ref={popularRailRef}
          className="reveal-popular-rail flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] sm:min-w-[280px] max-w-[280px] snap-start shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 08 — DELIVERY (Coverage Card)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="reveal-delivery-card p-8 sm:p-14 bg-gradient-to-r from-[#F5EFEB] to-[#FAF7F2] rounded-3xl border border-[#E8DFD6] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-[#BA4A2C]">
              LOCAL DOORSTEP DELIVERY
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal tracking-tight text-[#1F1916]">
              Built Around <span className="font-serif italic text-[#BA4A2C]">Bhuj &amp; Neighboring Towns.</span>
            </h2>
            <p className="text-sm text-[#7A6B62] leading-relaxed max-w-xl font-sans">
              Starting local — delivering your everyday essentials across Bhuj town and contiguous
              suburbs including Madhapar, Mirzapar, Sukhpar, and Station Road.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4 font-sans border-t md:border-t-0 md:border-l border-[#DFD3C7] pt-6 md:pt-0 md:pl-8">
            <div>
              <div className="text-[#8A7B72] uppercase tracking-wider text-[10px] font-bold">
                ACTIVE DELIVERY ZONE
              </div>
              <div className="font-bold text-base text-[#1F1916] mt-0.5 font-serif">
                Bhuj, Gujarat (PIN 370XXX)
              </div>
            </div>
            <div>
              <div className="text-[#8A7B72] uppercase tracking-wider text-[10px] font-bold">
                EXPANSION PLANNED
              </div>
              <div className="font-medium text-[#7A6B62] text-xs mt-0.5">
                Mundra · Anjar · Gandhidham
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 09 — FINAL CTA (Make Home a Little Warmer)
          ================================================== */}
      <section className="reveal-final-cta max-w-7xl mx-auto px-4 sm:px-8 text-center py-12 sm:py-20 border-t border-[#E8DFD6]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#1F1916] leading-tight">
            Make Home <br />
            <span className="font-serif italic font-light text-[#BA4A2C]">A Little Warmer.</span>
          </h2>
          <p className="text-base text-[#7A6B62] font-sans">
            Discover dependable objects for everyday domestic living. Order online for swift local doorstep delivery in Bhuj.
          </p>
          <div className="pt-3">
            <button
              onClick={() => navigateTo('shop')}
              className="px-10 py-4 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer shadow-[0_10px_25px_-5px_rgba(186,74,44,0.4)] hover:shadow-[0_16px_32px_-5px_rgba(186,74,44,0.5)] hover:-translate-y-0.5"
            >
              Shop Ghar Sansar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
