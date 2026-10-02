import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { products } from '../data/products.ts';
import { ProductVisual } from '../components/ProductVisual.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import { validateBhujDelivery } from '../config/checkoutConfig.ts';
import {
  Heart,
  Plus,
  Minus,
  Check,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    isInCart,
    toggleWishlist,
    isInWishlist,
    openWhatsAppOrder,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);

  // Delivery checker
  const [pinInput, setPinInput] = useState('370001');
  const [pinResult, setPinResult] = useState<{
    checked: boolean;
    isDeliverable: boolean;
    message: string;
  }>({
    checked: true,
    isDeliverable: true,
    message: 'Delivery available in Bhuj within 24 to 48 hours',
  });

  const handleCheckPin = () => {
    const res = validateBhujDelivery('Bhuj', pinInput);
    setPinResult({
      checked: true,
      isDeliverable: res.isDeliverable,
      message: res.message,
    });
  };

  const currentPrice = selectedVariant
    ? product.variants?.find((v) => v.name === selectedVariant)?.price ?? product.price
    : product.price;

  const currentMrp = selectedVariant
    ? product.variants?.find((v) => v.name === selectedVariant)?.mrp ?? product.mrp
    : product.mrp;

  const alreadyInCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-24 bg-[#FAF7F2]">
      {/* Breadcrumb */}
      <nav className="text-[11px] uppercase tracking-widest text-[#8A7B72] space-x-2 font-sans">
        <button onClick={() => navigateTo('home')} className="hover:text-[#BA4A2C] transition-colors">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-[#BA4A2C] transition-colors">
          Shop Collection
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', { category: product.category })}
          className="hover:text-[#BA4A2C] transition-colors"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#1F1916] font-semibold">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Large Editorial Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            className="w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] bg-white rounded-3xl flex items-center justify-center border border-[#EFE8E1] shadow-sm relative cursor-crosshair overflow-hidden"
          >
            <ProductVisual product={product} size="lg" zoom={zoom} />
            <span className="absolute bottom-5 right-5 text-[10.5px] uppercase font-sans tracking-widest text-[#1F1916] bg-white/95 backdrop-blur-xs border border-[#E8DFD6] rounded-full px-3 py-1 shadow-sm pointer-events-none">
              Hover to zoom
            </span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            {['Front View', 'Detail View', 'Package'].map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveThumb(idx)}
                className={`relative w-22 h-22 bg-white rounded-xl border overflow-hidden cursor-pointer transition-all ${
                  activeThumb === idx
                    ? 'border-[#BA4A2C] ring-2 ring-[#BA4A2C]/30 shadow-md scale-102'
                    : 'border-[#EFE8E1] hover:border-[#BA4A2C] opacity-80 hover:opacity-100'
                }`}
              >
                <ProductVisual product={product} size="sm" className="w-full h-full" />
                <span className="absolute bottom-0 inset-x-0 bg-[#1F1916]/85 text-[8.5px] font-sans uppercase text-white text-center py-0.5 tracking-wider truncate px-1">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Purchase & Details Column */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          <div className="space-y-3 pb-6 border-b border-[#E8DFD6]">
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#BA4A2C]">
              {product.brand} · {product.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[#1F1916] leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-3xl sm:text-4xl font-bold text-[#1F1916] tabular-nums font-serif">
                ₹{currentPrice}
              </span>
              {currentMrp > currentPrice && (
                <span className="text-sm text-[#8A7B72] line-through tabular-nums">
                  MRP ₹{currentMrp}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-semibold uppercase tracking-wider text-[#BA4A2C] bg-[#F7EBE8] px-2 py-0.5 rounded">
                  -{product.discount}% OFF
                </span>
              )}
            </div>

            <div className="text-xs text-[#536248] flex items-center gap-1.5 font-medium pt-1">
              {product.inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#536248] animate-pulse" />
                  <span>In Stock · Fast Doorstep Delivery in Bhuj in 24–48 hours</span>
                </>
              ) : (
                <span className="text-[#8C7E75]">Temporarily Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description Prose */}
          <div className="text-sm text-[#6E5E55] leading-relaxed font-sans">
            {product.description}
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1F1916]">
                Select Size / Capacity:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.name)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border cursor-pointer transition-all ${
                      selectedVariant === v.name
                        ? 'bg-[#1F1916] text-white border-[#1F1916] shadow-sm'
                        : 'bg-white text-[#1F1916] border-[#D9CFC4] hover:border-[#BA4A2C]'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="ml-2 opacity-80 font-mono text-[11px]">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#D9CFC4] bg-white rounded-full px-2 py-1 shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#7A6B62] hover:text-[#BA4A2C] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#1F1916] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#7A6B62] hover:text-[#BA4A2C] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  inWishlist
                    ? 'border-[#BA4A2C] bg-[#BA4A2C] text-white shadow-md'
                    : 'border-[#D9CFC4] bg-white text-[#1F1916] hover:border-[#BA4A2C] hover:text-[#BA4A2C]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white stroke-white' : ''}`} />
              </button>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {alreadyInCart ? (
                <button
                  onClick={() => navigateTo('cart')}
                  className="w-full py-4 bg-[#536248] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#43503a] transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>View in Cart &rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => addToCart(product, quantity, selectedVariant)}
                  disabled={!product.inStock}
                  className={`w-full py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_-5px_rgba(186,74,44,0.4)] ${
                    product.inStock
                      ? 'bg-[#BA4A2C] hover:bg-[#A33D22] text-white hover:-translate-y-0.5'
                      : 'bg-[#E5DFD8] text-[#8C7E75] cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Add to Cart</span>
                </button>
              )}

              <button
                onClick={() => {
                  addToCart(product, quantity, selectedVariant);
                  navigateTo('checkout');
                }}
                disabled={!product.inStock}
                className="w-full py-4 bg-white border border-[#1F1916] text-[#1F1916] hover:bg-[#1F1916] hover:text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer shadow-2xs hover:shadow-sm"
              >
                Buy Now
              </button>

              {/* WhatsApp Quick Order Button */}
              <button
                type="button"
                onClick={() =>
                  openWhatsAppOrder({
                    type: 'product',
                    product,
                    quantity,
                    variant: selectedVariant,
                  })
                }
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#25D366]/20 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Order via WhatsApp · Direct Store Hotline</span>
              </button>
            </div>
          </div>

          {/* Delivery to Bhuj Section */}
          <div className="pt-6 border-t border-[#E8DFD6] space-y-3">
            <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#BA4A2C] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Check Delivery in Bhuj</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN code (e.g. 370001)"
                className="w-full px-4 py-2.5 text-xs bg-white rounded-full border border-[#D9CFC4] focus:border-[#BA4A2C] focus:outline-hidden font-mono shadow-2xs"
              />
              <button
                onClick={handleCheckPin}
                className="px-6 py-2.5 bg-[#1F1916] text-white text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#BA4A2C] transition-colors cursor-pointer shrink-0"
              >
                Check PIN
              </button>
            </div>

            {pinResult.checked && (
              <div
                className={`text-xs p-3 rounded-xl border ${
                  pinResult.isDeliverable
                    ? 'bg-[#EFEFEA] border-[#D0D4C8] text-[#3F523B]'
                    : 'bg-[#F7EBE8] border-[#E8CFC9] text-[#BA4A2C]'
                }`}
              >
                {pinResult.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Specifications & Editorial Notes */}
      <div className="border-t border-[#E8DFD6] pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 text-xs text-[#7A6B62]">
        <div className="md:col-span-4 space-y-2">
          <div className="text-xl font-serif font-normal text-[#1F1916]">
            Specifications &amp; Details
          </div>
          <p className="leading-relaxed font-sans">
            Detailed material specifications, capacities, and daily usage care for this item.
          </p>
        </div>

        <div className="md:col-span-8 divide-y divide-[#E8DFD6] bg-white p-6 rounded-2xl border border-[#EFE8E1] shadow-2xs font-sans">
          <div className="py-2.5 flex justify-between">
            <span className="text-[#1F1916] font-medium">Brand</span>
            <span>{product.brand}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-[#1F1916] font-medium">Category</span>
            <span>{product.category}</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-[#1F1916] font-medium">Primary Material</span>
            <span>{product.material}</span>
          </div>
          {product.capacity && (
            <div className="py-2.5 flex justify-between">
              <span className="text-[#1F1916] font-medium">Capacity</span>
              <span>{product.capacity}</span>
            </div>
          )}
          {product.specifications.map((s, i) => (
            <div key={i} className="py-2.5 flex justify-between">
              <span className="text-[#1F1916] font-medium">{s.label}</span>
              <span>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E8DFD6] pt-16 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-[#1F1916]">
            More Recommended in <span className="font-serif italic font-light text-[#BA4A2C]">{product.category}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-7">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
