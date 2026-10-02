import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { products } from '../data/products.ts';
import { ProductVisual } from './ProductVisual.tsx';
import { Search, X, ArrowRight, Eye } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, openQuickView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const popularSearches = [
    'Milton Thermosteel',
    'Boss Storage Box',
    'Casserole Hot Pot',
    'Spin Mop',
    'Lunch Box',
    'Heavy Bucket',
    'Airtight Containers',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const matchingProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    navigateTo('product-detail', { productId });
  };

  const handleQuickViewProduct = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setIsSearchOpen(false);
    setSearchTerm('');
    openQuickView(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DFD6] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#E8DFD6] bg-white">
          <Search className="w-5 h-5 text-[#BA4A2C] mr-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Milton, Boss, water bottles, storage, tiffins..."
            className="w-full text-base sm:text-lg font-sans font-medium text-[#1F1916] placeholder:text-[#A89D95] focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1.5 text-[#7A6F68] hover:text-[#1F1916] mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-widest font-sans font-semibold text-[#7A6F68] hover:text-[#BA4A2C] ml-2 cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-sans">
          {!searchTerm.trim() ? (
            <div className="space-y-8">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#BA4A2C] mb-4">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-3.5 py-1.5 text-xs text-[#1F1916] bg-white border border-[#E8DFD6] rounded-full hover:border-[#BA4A2C] hover:text-[#BA4A2C] transition-colors cursor-pointer shadow-2xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#BA4A2C] mb-4">
                  Explore Departments
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'Water Bottles',
                    'Kitchen & Dining',
                    'Storage & Containers',
                    'Cleaning Supplies',
                    'Plastic Products',
                    'Thermoware',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('shop', { category: cat });
                      }}
                      className="text-left p-3.5 bg-white border border-[#E8DFD6] hover:border-[#BA4A2C] rounded-xl text-xs font-semibold text-[#1F1916] flex items-center justify-between transition-colors shadow-2xs cursor-pointer group"
                    >
                      <span>{cat}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7A6F68] group-hover:text-[#BA4A2C] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-[#7A6F68] uppercase tracking-wider font-medium">
                {matchingProducts.length} Results for "{searchTerm}"
              </div>

              {matchingProducts.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#7A6F68]">
                  No products found matching your search. Try searching "Milton" or "Storage".
                </div>
              ) : (
                <div className="divide-y divide-[#E8DFD6] bg-white rounded-xl border border-[#E8DFD6] overflow-hidden">
                  {matchingProducts.slice(0, 8).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="py-3 px-4 flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 shrink-0 bg-[#FAF7F2] rounded-lg border border-[#E8DFD6] p-1">
                          <ProductVisual product={product} size="sm" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider font-semibold text-[#BA4A2C]">
                            {product.brand} · {product.category}
                          </div>
                          <div className="text-sm font-serif font-medium text-[#1F1916] line-clamp-1 group-hover:text-[#BA4A2C] transition-colors">
                            {product.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-serif font-bold text-[#1F1916] tabular-nums">
                          ₹{product.price}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleQuickViewProduct(e, product)}
                          className="px-2.5 py-1 bg-[#FAF7F2] hover:bg-[#BA4A2C] text-[#1F1916] hover:text-white border border-[#DFD3C7] rounded-md text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-3 h-3 text-[#BA4A2C] group-hover:text-white" />
                          <span className="hidden sm:inline">Quick View</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
