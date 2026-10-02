import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ProductVisual } from './ProductVisual.tsx';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Check,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    isInCart,
    cart,
    navigateTo,
    toggleWishlist,
    isInWishlist,
    openWhatsAppOrder,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantName, setSelectedVariantName] = useState<string | undefined>(undefined);
  const [zoom, setZoom] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Sync state whenever quickViewProduct changes
  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setSelectedVariantName(
        quickViewProduct.variants && quickViewProduct.variants.length > 0
          ? quickViewProduct.variants[0].name
          : undefined
      );
      setZoom(false);
    }
  }, [quickViewProduct]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!quickViewProduct) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuickView();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const alreadyInCart = isInCart(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);

  // Active pricing based on variant selection
  const activeVariant = product.variants?.find((v) => v.name === selectedVariantName);
  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentMrp = activeVariant ? activeVariant.mrp : product.mrp;
  const savings = currentMrp > currentPrice ? currentMrp - currentPrice : 0;
  const discountPercent = currentMrp > currentPrice
    ? Math.round((savings / currentMrp) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariantName);
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateTo('product-detail', { productId: product.id });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
    >
      {/* Dimmed backdrop with warm blur */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DFD6] flex flex-col z-10 my-auto text-[#1F1916]"
      >
        {/* Sticky Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close quick view"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#BA4A2C] text-[#1F1916] hover:text-white border border-[#E8DFD6] flex items-center justify-center shadow-xs transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E8DFD6]">
          
          {/* LEFT: Product Visual Display */}
          <div className="p-6 sm:p-8 flex flex-col justify-between bg-white md:rounded-l-2xl">
            <div className="space-y-4">
              {/* Category & Status Line */}
              <div className="flex items-center justify-between text-xs text-[#7A6F68] font-sans">
                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase tracking-wider text-[#BA4A2C]">
                    {product.brand}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tracking-wide">{product.category}</span>
                </div>
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 bg-[#BA4A2C] text-white text-[10px] font-sans font-bold tracking-wider uppercase rounded-md shadow-2xs">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Visual Box */}
              <div className="relative aspect-square w-full rounded-xl bg-[#FAF7F2] border border-[#EFE8E1] p-4 flex items-center justify-center overflow-hidden group">
                <ProductVisual
                  product={product}
                  size="lg"
                  zoom={zoom}
                  className="w-full h-full object-contain"
                />

                {/* Subtle Interactive Zoom Toggle */}
                <button
                  onClick={() => setZoom(!zoom)}
                  className="absolute bottom-3 right-3 text-[10px] uppercase font-sans font-semibold tracking-wider text-[#1F1916] bg-white/90 backdrop-blur-xs border border-[#E8DFD6] rounded-md px-2.5 py-1 hover:bg-[#1F1916] hover:text-white transition-colors shadow-2xs cursor-pointer"
                >
                  {zoom ? 'Reset View' : 'Zoom Visual'}
                </button>

                {product.isPopularInBhuj && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#536248] text-white text-[10.5px] font-sans font-semibold tracking-wider uppercase rounded-md shadow-2xs">
                    <Sparkles className="w-3 h-3 text-[#E2B96F]" />
                    <span>Popular in Bhuj</span>
                  </div>
                )}
              </div>

              {/* Essential Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#7A6F68] pt-1">
                {product.material && (
                  <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#EFE8E1]">
                    <span className="text-[10px] uppercase tracking-wider block text-[#9E8E85]">
                      Material
                    </span>
                    <span className="font-semibold text-[#1F1916]">{product.material}</span>
                  </div>
                )}
                {product.capacity && (
                  <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#EFE8E1]">
                    <span className="text-[10px] uppercase tracking-wider block text-[#9E8E85]">
                      Capacity
                    </span>
                    <span className="font-semibold text-[#1F1916]">{product.capacity}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Full Page Link at bottom of left column */}
            <div className="pt-4 border-t border-[#EFE8E1] mt-4">
              <button
                onClick={handleViewFullDetails}
                className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#EFE8E1] border border-[#DFD3C7] rounded-lg text-xs font-sans font-semibold text-[#1F1916] hover:text-[#BA4A2C] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Open Full Product Specification Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand & Title */}
              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
                  {product.brand} · AUTHENTIC GUARANTEE
                </div>
                <h2
                  id="quick-view-title"
                  className="text-2xl sm:text-3xl font-serif font-normal text-[#1F1916] tracking-tight leading-snug mt-1"
                >
                  {product.name}
                </h2>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 text-xs text-[#7A6F68] font-sans mt-2">
                  <div className="flex items-center text-[#BA4A2C]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#BA4A2C] stroke-[#BA4A2C]'
                            : 'fill-none stroke-[#BA4A2C]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#1F1916]">{product.rating.toFixed(1)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.reviewCount} store reviews</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#536248] font-medium">Verified Bhuj Stock</span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="p-4 bg-white rounded-xl border border-[#E8DFD6] space-y-1 shadow-2xs">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-bold text-[#1F1916] tabular-nums">
                    ₹{currentPrice}
                  </span>
                  {currentMrp > currentPrice && (
                    <span className="text-sm font-sans text-[#9E8E85] line-through tabular-nums">
                      MRP ₹{currentMrp}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#BA4A2C] bg-[#F7EBE8] px-2 py-0.5 rounded">
                      Save ₹{savings}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#7A6F68] font-sans">
                  Inclusive of all taxes · Cash on Delivery or UPI on doorstep in Bhuj.
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-xs font-sans">
                {product.inStock ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#536248] animate-pulse" />
                    <span className="text-[#536248] font-semibold">
                      In Stock · Ready for local dispatch in Bhuj within 2 hours
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#BA4A2C]" />
                    <span className="text-[#BA4A2C] font-semibold">Currently Sold Out</span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#5D534D] font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Features bullets */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1F1916]">
                    Key Highlights:
                  </div>
                  <ul className="space-y-1 text-xs text-[#6E635D] font-sans">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#536248] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variants Selector (if applicable) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#1F1916]">
                    Select Size / Variant:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantName(v.name)}
                        className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedVariantName === v.name
                            ? 'bg-[#1F1916] text-white border-[#1F1916] shadow-2xs'
                            : 'bg-white text-[#1F1916] border-[#D9CFC4] hover:border-[#BA4A2C]'
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="ml-1.5 opacity-80 font-mono text-[11px]">₹{v.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity + Add To Cart + Wishlist */}
            <div className="space-y-3 pt-4 border-t border-[#E8DFD6]">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#DFD3C7] bg-white rounded-lg px-2 py-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                    className="p-1.5 text-[#7A6F68] hover:text-[#BA4A2C] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-sans font-bold text-[#1F1916] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="p-1.5 text-[#7A6F68] hover:text-[#BA4A2C] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    inWishlist
                      ? 'bg-[#BA4A2C] text-white border-[#BA4A2C]'
                      : 'bg-white text-[#1F1916] border-[#DFD3C7] hover:border-[#BA4A2C] hover:text-[#BA4A2C]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white stroke-white' : 'stroke-current'}`} />
                </button>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-4 rounded-lg font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                    product.inStock
                      ? 'bg-[#BA4A2C] hover:bg-[#A33D22] text-white hover:scale-[1.01]'
                      : 'bg-[#E5DFD8] text-[#8C7E75] cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {product.inStock
                      ? alreadyInCart
                        ? `Add More · ₹${currentPrice * quantity}`
                        : `Add to Cart · ₹${currentPrice * quantity}`
                      : 'Sold Out'}
                  </span>
                </button>
              </div>

              {/* WhatsApp Quick Order Action */}
              <button
                type="button"
                onClick={() => {
                  closeQuickView();
                  openWhatsAppOrder({
                    type: 'product',
                    product,
                    quantity,
                    variant: selectedVariantName,
                  });
                }}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
                <span>Order via WhatsApp · ₹{currentPrice * quantity}</span>
              </button>

              {/* In Cart Feedback Bar & Quick Cart Link */}
              {alreadyInCart && cartItem && (
                <div className="flex items-center justify-between text-xs bg-[#536248]/10 border border-[#536248]/30 rounded-lg p-2.5 text-[#536248] font-sans">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Already in your cart ({cartItem.quantity} unit{cartItem.quantity > 1 ? 's' : ''})</span>
                  </div>
                  <button
                    onClick={() => {
                      closeQuickView();
                      navigateTo('cart');
                    }}
                    className="font-bold underline uppercase tracking-wider text-[11px] hover:text-[#1F1916] cursor-pointer"
                  >
                    View Cart &rarr;
                  </button>
                </div>
              )}

              {/* Bhuj Local Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10.5px] text-[#7A6F68] font-sans text-center">
                <div className="flex flex-col items-center gap-1 p-2 bg-white/70 rounded-lg border border-[#EFE8E1]">
                  <Truck className="w-3.5 h-3.5 text-[#BA4A2C]" />
                  <span>Free Bhuj Delivery &gt;₹499</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/70 rounded-lg border border-[#EFE8E1]">
                  <RotateCcw className="w-3.5 h-3.5 text-[#BA4A2C]" />
                  <span>3-Day Store Exchange</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/70 rounded-lg border border-[#EFE8E1]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BA4A2C]" />
                  <span>100% Genuine Brands</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
