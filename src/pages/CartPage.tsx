import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ProductVisual } from '../components/ProductVisual.tsx';
import { checkoutConfig } from '../config/checkoutConfig.ts';
import { Plus, Minus, X, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    platformFee,
    grandTotal,
    navigateTo,
    openWhatsAppOrder,
  } = useApp();

  const freeThreshold = checkoutConfig.freeDeliveryThreshold;
  const neededForFree = Math.max(0, freeThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-[#7A6B62] max-w-sm mx-auto font-sans">
          Explore our collection of everyday kitchenware, storage systems and household essentials.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer shadow-md hover:-translate-y-0.5"
          >
            DISCOVER PRODUCTS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      {/* Title */}
      <div className="flex items-baseline justify-between border-b border-[#E8DFD6] pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[#1F1916]">
          Your Shopping Cart
        </h1>
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs uppercase tracking-widest text-[#7A6B62] hover:text-[#BA4A2C] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free delivery prompt */}
      {neededForFree > 0 ? (
        <div className="p-4 bg-white rounded-xl border border-[#EFE8E1] text-xs text-[#1F1916] shadow-2xs font-sans">
          Add <strong className="font-mono text-[#BA4A2C]">₹{neededForFree}</strong> more to qualify for{' '}
          <strong>FREE LOCAL DELIVERY IN BHUJ</strong> (Threshold ₹{freeThreshold}).
        </div>
      ) : (
        <div className="p-4 bg-[#EFEFEA] rounded-xl border border-[#D0D4C8] text-xs text-[#3F523B] shadow-2xs font-sans">
          <strong>FREE LOCAL DELIVERY UNLOCKED</strong> for your Bhuj address.
        </div>
      )}

      {/* Grid: Items Left, Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Items list */}
        <div className="lg:col-span-8 divide-y divide-[#E8DFD6]">
          {cart.map((item) => {
            const { product, quantity, selectedVariant } = item;
            const unitPrice = selectedVariant
              ? product.variants?.find((v) => v.name === selectedVariant)?.price ?? product.price
              : product.price;

            return (
              <div
                key={`${product.id}-${selectedVariant || 'def'}`}
                className="py-6 flex items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div
                    onClick={() => navigateTo('product-detail', { productId: product.id })}
                    className="w-20 h-24 sm:w-24 sm:h-28 bg-white rounded-xl border border-[#EFE8E1] shrink-0 p-2 cursor-pointer shadow-2xs"
                  >
                    <ProductVisual product={product} size="sm" className="w-full h-full bg-transparent border-0" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#BA4A2C] font-sans">
                      {product.brand}
                    </div>
                    <h3
                      onClick={() => navigateTo('product-detail', { productId: product.id })}
                      className="text-sm sm:text-base font-serif font-medium text-[#1F1916] hover:text-[#BA4A2C] cursor-pointer line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </h3>
                    {selectedVariant && (
                      <div className="text-xs text-[#8A7B72] font-sans">Size: {selectedVariant}</div>
                    )}
                    <div className="text-xs font-mono text-[#1F1916] tabular-nums font-semibold">
                      ₹{unitPrice}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-8">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#D9CFC4] bg-white rounded-full px-1 shadow-2xs">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="p-1.5 text-[#7A6B62] hover:text-[#BA4A2C] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-[#1F1916] tabular-nums font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="p-1.5 text-[#7A6B62] hover:text-[#BA4A2C] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Total */}
                  <div className="text-right font-bold text-sm sm:text-base text-[#1F1916] tabular-nums font-serif min-w-[65px]">
                    ₹{unitPrice * quantity}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-[#8A7B72] hover:text-[#BA4A2C] cursor-pointer p-1"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EFE8E1] p-8 space-y-6 sticky top-24 shadow-sm font-sans">
          <div className="text-xs font-bold uppercase tracking-widest text-[#BA4A2C] pb-4 border-b border-[#E8DFD6]">
            ORDER SUMMARY
          </div>

          <div className="space-y-3 text-xs text-[#7A6B62]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-[#1F1916] font-semibold">₹{cartSubtotal}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#BA4A2C]">
                <span>Savings</span>
                <span className="font-mono font-semibold">-₹{cartDiscount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery (Bhuj)</span>
              <span className="font-mono text-[#1F1916] font-semibold">
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="font-mono text-[#1F1916] font-semibold">
                {platformFee === 0 ? '₹0' : `₹${platformFee}`}
              </span>
            </div>

            <div className="pt-4 border-t border-[#E8DFD6] flex justify-between text-base font-bold text-[#1F1916] font-serif">
              <span>Total</span>
              <span className="font-mono text-lg text-[#BA4A2C]">₹{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full py-4 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Quick WhatsApp Order Option */}
          <div className="space-y-2 pt-1">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#E8DFD6]" />
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#A89D95] tracking-widest font-sans">
                OR QUICK ORDER
              </span>
              <div className="flex-grow border-t border-[#E8DFD6]" />
            </div>

            <button
              type="button"
              onClick={() =>
                openWhatsAppOrder({
                  type: 'cart',
                  cartItems: cart,
                  grandTotal,
                  deliveryFee,
                })
              }
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-[#25D366]/20 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Order Entire Bag via WhatsApp</span>
            </button>

            <p className="text-center text-[10.5px] text-[#7A6F68] font-sans pt-1">
              Direct checkout with Bhuj store team · Pre-filled cart &amp; address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
