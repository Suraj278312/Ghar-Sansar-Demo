import React, { useState } from 'react';
import { Product } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { ProductVisual } from './ProductVisual.tsx';
import { Heart, Plus, Check, Sparkles, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickAdd = true }) => {
  const { navigateTo, addToCart, isInCart, toggleWishlist, isInWishlist, openQuickView } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const alreadyInCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="luxury-card group relative flex flex-col cursor-pointer select-none bg-white rounded-2xl border border-[#EFE8E1] hover:border-[#DFD3C7] p-3 sm:p-3.5 transition-all duration-300"
    >
      {/* 1. Large Image Slot with Warm Italian Styling */}
      <div
        onClick={() => navigateTo('product-detail', { productId: product.id })}
        className="relative w-full rounded-xl overflow-hidden bg-[#FAF7F2] aspect-square flex items-center justify-center border border-[#EFE8E1]"
      >
        <ProductVisual product={product} size="md" className="transition-transform duration-500 ease-out group-hover:scale-105" />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-[#BA4A2C] text-white text-[9.5px] font-sans font-bold tracking-wider uppercase rounded-md shadow-xs">
            -{discountPercent}%
          </div>
        )}

        {/* Floating Actions on Top Right (Wishlist & Mobile Quick View) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              inWishlist
                ? 'bg-[#BA4A2C] text-white opacity-100 shadow-md scale-105'
                : isHovered
                ? 'bg-white/95 text-[#1F1916] opacity-95 hover:opacity-100 shadow-sm hover:scale-110 hover:text-[#BA4A2C]'
                : 'opacity-0 md:opacity-0 max-md:opacity-80 max-md:bg-white/90 text-[#1F1916]'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white stroke-white' : 'stroke-current'}`} />
          </button>

          {/* Quick View Button for touch/mobile devices */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="md:hidden w-8 h-8 rounded-full bg-white/90 text-[#1F1916] hover:bg-[#BA4A2C] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            aria-label={`Quick view ${product.name}`}
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Quick View Pill on Desktop Hover */}
        <div
          className={`hidden md:flex absolute inset-0 items-center justify-center pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="pointer-events-auto px-3.5 py-1.5 bg-white/95 hover:bg-[#1F1916] text-[#1F1916] hover:text-white border border-[#E8DFD6] hover:border-[#1F1916] text-[11px] font-sans font-semibold tracking-wider uppercase rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5 transition-all transform hover:scale-105 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#BA4A2C]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Quick Add Bar (Slide-up animated bar at bottom of image) */}
        {showQuickAdd && (
          <div
            className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-all duration-300 ease-out ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openQuickView(product);
                }}
                className="py-1.5 px-2 bg-white/95 hover:bg-[#1F1916] text-[#1F1916] hover:text-white text-[10.5px] font-sans font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                title="Quick View details"
              >
                <Eye className="w-3.5 h-3.5 text-[#BA4A2C]" />
                <span className="hidden xl:inline">Details</span>
              </button>

              {alreadyInCart ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('cart');
                  }}
                  className="flex-1 py-1.5 bg-[#536248] text-white text-[10.5px] font-sans font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1 shadow-md transition-colors hover:bg-[#43503a] cursor-pointer"
                >
                  <Check className="w-3 h-3" />
                  <span>In Cart · View</span>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  disabled={!product.inStock}
                  className={`flex-1 py-1.5 text-[10.5px] font-sans font-semibold tracking-wider uppercase rounded-lg flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer ${
                    product.inStock
                      ? 'bg-[#BA4A2C] hover:bg-[#A33D22] text-white hover:scale-[1.01]'
                      : 'bg-[#E5DFD8] text-[#8C7E75] cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>{product.inStock ? 'Quick Add' : 'Sold Out'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Typographic Metadata */}
      <div
        onClick={() => navigateTo('product-detail', { productId: product.id })}
        className="pt-3 pb-1 space-y-1 flex-1 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between text-[10px] tracking-[0.22em] text-[#BA4A2C] uppercase font-sans font-bold">
            <span>{product.brand}</span>
            {product.capacity && (
              <span className="text-[#8A7B72] font-normal tracking-normal lowercase">{product.capacity}</span>
            )}
          </div>

          <h3 className="text-sm sm:text-[15px] font-serif font-medium text-[#1F1916] line-clamp-1 leading-snug group-hover:text-[#BA4A2C] transition-colors mt-0.5">
            {product.name}
          </h3>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-serif font-bold text-[#1F1916] tabular-nums">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-[#9E8E85] line-through tabular-nums">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {product.isPopularInBhuj ? (
            <span className="hidden xs:inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#536248] font-semibold bg-[#EFECE6] px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 text-[#C49746]" />
              Popular
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openQuickView(product);
              }}
              className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#BA4A2C] hover:underline"
            >
              Quick View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
