import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext.tsx';
import { categoriesList } from '../data/products.ts';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categoryImages: Record<string, string> = {
  'Kitchen & Dining': 'https://images.unsplash.com/photo-1584990347449-399d254f16a5?auto=format&fit=crop&w=800&q=80',
  'Water Bottles': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  'Storage & Containers': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
  'Cleaning Supplies': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  'Home Utility': 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
  'Plastic Products': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  'Bathroom Essentials': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'Lunch Boxes': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
  'Thermoware': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
  'Daily Essentials': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
};

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.reveal-cat-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        }
      );

      // Staggered Category Cards
      const cards = gsap.utils.toArray<HTMLElement>('.reveal-cat-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Subtly scale images on entry
        const imgs = gsap.utils.toArray<HTMLElement>('.reveal-cat-img');
        imgs.forEach((img) => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="reveal-cat-header space-y-2 border-b border-[#E8DFD6] pb-8">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          STORE DEPARTMENTS · CURATED COLLECTIONS
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          Curated <span className="font-serif italic font-light text-[#BA4A2C]">Departments</span>
        </h1>
        <p className="text-sm text-[#7A6B62] max-w-xl font-sans">
          Browse our curated departments for kitchen, insulated thermoware, home storage, cleaning
          supplies, and heavy plastic utility products in Bhuj.
        </p>
      </div>

      {/* Editorial Category Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesList.map((cat) => {
          const imgUrl = categoryImages[cat.name] || 'https://images.unsplash.com/photo-1584990347449-399d254f16a5?auto=format&fit=crop&w=800&q=80';

          return (
            <div
              key={cat.name}
              onClick={() => navigateTo('shop', { category: cat.name })}
              className="reveal-cat-card luxury-card group cursor-pointer select-none p-4 bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/3] bg-[#F5EFEB] rounded-xl border border-[#EFE8E1] overflow-hidden">
                <img
                  src={imgUrl}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="reveal-cat-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1916]/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#1F1916] shadow-sm group-hover:bg-[#BA4A2C] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#1F1916]/80 backdrop-blur-xs rounded-md text-[10.5px] font-sans font-medium text-[#FAF7F2] tracking-wider uppercase">
                  {cat.itemCount} Items
                </div>
              </div>

              <div className="pt-4 space-y-1">
                <h3 className="text-lg font-serif font-medium text-[#1F1916] group-hover:text-[#BA4A2C] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#7A6B62] leading-relaxed font-sans line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
