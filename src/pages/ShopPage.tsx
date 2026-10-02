import React, { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext.tsx';
import { products } from '../data/products.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ShopPage: React.FC = () => {
  const { selectedCategory, selectedBrand } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategory || 'all');
  const [brandFilter, setBrandFilter] = useState<string>(selectedBrand || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    'popular' | 'newest' | 'price-low' | 'price-high'
  >('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract categories & brands
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), []);
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), []);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q);
          if (!match) return false;
        }

        if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
        if (brandFilter !== 'all' && p.brand !== brandFilter) return false;
        if (p.price > maxPrice) return false;
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
  }, [searchTerm, categoryFilter, brandFilter, maxPrice, inStockOnly, sortBy]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.reveal-shop-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
        }
      );

      // Product cards entry
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.04,
            ease: 'power3.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [categoryFilter, brandFilter, sortBy, inStockOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setBrandFilter('all');
    setMaxPrice(2000);
    setInStockOnly(false);
    setSortBy('popular');
  };

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    brandFilter !== 'all' ||
    maxPrice < 2000 ||
    inStockOnly ||
    searchTerm.trim() !== '';

  const renderFilterSidebar = () => (
    <div className="space-y-8 text-xs select-none bg-white p-5 rounded-2xl border border-[#EFE8E1] shadow-2xs">
      {/* Category */}
      <div className="space-y-3">
        <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#BA4A2C]">
          Categories
        </div>
        <div className="space-y-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`block w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#FAF7F2] text-[#BA4A2C] font-bold shadow-2xs'
                : 'text-[#7A6B62] hover:text-[#1F1916] hover:bg-[#FDFBF7]'
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`block w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF7F2] text-[#BA4A2C] font-bold shadow-2xs'
                    : 'text-[#7A6B62] hover:text-[#1F1916] hover:bg-[#FDFBF7]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-3 pt-6 border-t border-[#E8DFD6]">
        <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#BA4A2C]">
          Verified Brands
        </div>
        <div className="space-y-1">
          <button
            onClick={() => setBrandFilter('all')}
            className={`block w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              brandFilter === 'all'
                ? 'bg-[#FAF7F2] text-[#BA4A2C] font-bold shadow-2xs'
                : 'text-[#7A6B62] hover:text-[#1F1916] hover:bg-[#FDFBF7]'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setBrandFilter(b)}
              className={`block w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                brandFilter === b
                  ? 'bg-[#FAF7F2] text-[#BA4A2C] font-bold shadow-2xs'
                  : 'text-[#7A6B62] hover:text-[#1F1916] hover:bg-[#FDFBF7]'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3 pt-6 border-t border-[#E8DFD6]">
        <div className="flex items-baseline justify-between text-[11px] font-sans font-bold uppercase tracking-widest text-[#1F1916]">
          <span>Maximum Price</span>
          <span className="font-bold text-[#BA4A2C]">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min="150"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#BA4A2C] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#8A7B72] font-mono">
          <span>₹150</span>
          <span>₹2,000</span>
        </div>
      </div>

      {/* Availability */}
      <div className="pt-6 border-t border-[#E8DFD6]">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#1F1916]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-[#BA4A2C] w-4 h-4 rounded cursor-pointer"
          />
          <span className="font-medium">In-Stock Only</span>
        </label>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 rounded-full border border-[#D9CFC4] text-[11px] uppercase tracking-wider text-[#1F1916] font-semibold hover:border-[#BA4A2C] hover:text-[#BA4A2C] transition-colors cursor-pointer bg-white shadow-2xs"
        >
          Reset Filters
        </button>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      {/* Top Header: SHOP ALL */}
      <div className="reveal-shop-header space-y-2 border-b border-[#E8DFD6] pb-8">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          COMPLETE CATALOG · ALL ESSENTIALS
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          The Complete <span className="font-serif italic font-light text-[#BA4A2C]">Collection</span>
        </h1>
        <p className="text-sm text-[#7A6B62] max-w-xl font-sans">
          Complete inventory of kitchenware, insulated thermosteel, storage systems, and plastic
          utility products available for direct doorstep delivery in Bhuj.
        </p>
      </div>

      {/* Search, Filter Toggle, Sort Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8DFD6] text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#8A7B72] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-8 py-2 bg-white rounded-full border border-[#D9CFC4] focus:border-[#BA4A2C] text-xs text-[#1F1916] placeholder:text-[#9E8E85] focus:outline-hidden shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-[#8A7B72] hover:text-[#BA4A2C]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter & Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-4 py-2 border border-[#D9CFC4] bg-white rounded-full text-[#1F1916] text-xs font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <span className="text-[#7A6B62] hidden sm:inline font-sans">
            Showing <strong className="text-[#1F1916] font-semibold">{filteredProducts.length}</strong> items
          </span>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-white border border-[#D9CFC4] rounded-full px-3 py-1.5 shadow-2xs">
            <span className="text-[#8A7B72] uppercase tracking-wider text-[10px] font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-[#1F1916] focus:outline-hidden cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Desktop Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left Desktop Sidebar */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-3 pr-4 sticky top-24">
          {renderFilterSidebar()}
        </aside>

        {/* Product Grid (4 columns on desktop) */}
        <main className="md:col-span-9 lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="text-base font-semibold text-[#0A0A0A]">No products found</p>
              <p className="text-xs text-[#737373]">
                Try adjusting your search query or reset active filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#0A0A0A] text-white text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end">
          <div className="w-full bg-white max-h-[80vh] overflow-y-auto p-6 space-y-6 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
              <span className="font-bold uppercase tracking-wider text-sm">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[#0A0A0A]" />
              </button>
            </div>
            {renderFilterSidebar()}
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-[#0A0A0A] text-white text-xs uppercase tracking-widest font-semibold"
            >
              Show {filteredProducts.length} Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
