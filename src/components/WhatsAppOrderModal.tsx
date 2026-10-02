import React, { useState, useEffect, useRef } from 'react';
import { Product, CartItem, DeliveryAddress } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import {
  STORE_DISPLAY_PHONE,
  STORE_WHATSAPP_NUMBER,
  generateProductWhatsAppMessage,
  generateCartWhatsAppMessage,
  generateSupportWhatsAppMessage,
  buildWhatsAppLink,
} from '../utils/whatsappOrderService.ts';
import { X, Copy, Check, ExternalLink, MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

export interface WhatsAppOrderData {
  type: 'product' | 'cart' | 'support';
  product?: Product;
  quantity?: number;
  variant?: string;
  cartItems?: CartItem[];
  grandTotal?: number;
  deliveryFee?: number;
  supportTopic?: string;
}

interface WhatsAppOrderModalProps {
  data: WhatsAppOrderData | null;
  onClose: () => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({ data, onClose }) => {
  const { user, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Address and customer inputs for live message formatting
  const defaultAddr = user?.savedAddresses[0];
  const [customerName, setCustomerName] = useState(user?.name || 'Ketan Patel');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 98251 98765');
  const [houseNumber, setHouseNumber] = useState(defaultAddr?.houseNumber || '14, Shanti Niketan Society');
  const [streetArea, setStreetArea] = useState(defaultAddr?.streetArea || 'Mundra Road, Near Jubilee Ground');
  const [pinCode, setPinCode] = useState(defaultAddr?.pinCode || '370001');

  // Lock body scroll and prevent Lenis / window scroll leak
  useEffect(() => {
    if (!data) return;

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Prevent background touch scrolling on mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      const scrollable = scrollContainerRef.current;
      if (!scrollable) return;

      const target = e.target as Node;
      if (!scrollable.contains(target)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [data, onClose]);

  if (!data) return null;

  // Build active address object
  const currentAddress: DeliveryAddress = {
    fullName: customerName,
    phoneNumber: customerPhone,
    houseNumber,
    streetArea,
    city: 'Bhuj',
    state: 'Gujarat',
    pinCode,
  };

  // Generate live pre-formatted message
  let messageText = '';
  if (data.type === 'product' && data.product) {
    messageText = generateProductWhatsAppMessage(
      data.product,
      data.quantity || 1,
      data.variant,
      currentAddress,
      customerName
    );
  } else if (data.type === 'cart' && data.cartItems) {
    messageText = generateCartWhatsAppMessage(
      data.cartItems,
      data.grandTotal || 0,
      data.deliveryFee || 0,
      currentAddress,
      customerName
    );
  } else {
    messageText = generateSupportWhatsAppMessage(data.supportTopic);
  }

  const whatsappUrl = buildWhatsAppLink(messageText, STORE_WHATSAPP_NUMBER);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      showToast('Order message copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Please copy the message manually.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-hidden animate-fadeIn select-none"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        data-lenis-prevent="true"
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Main Modal Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        style={{ overscrollBehavior: 'contain' }}
        className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#DFD3C7] flex flex-col z-10 overflow-hidden text-[#1F1916] font-sans"
      >
        {/* Fixed Header */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#25D366] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs shrink-0">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white stroke-none" />
            </div>
            <div>
              <div className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90">
                OFFICIAL STORE HOTLINE · BHUJ
              </div>
              <h2 id="whatsapp-modal-title" className="text-sm sm:text-base font-bold text-white leading-tight">
                Order via WhatsApp · Ghar Sansar
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Store Active Hours Strip */}
        <div className="px-5 py-2 sm:px-6 bg-[#FAF7F2] border-b border-[#E8DFD6] flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs text-[#7A6F68] shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-[#1F1916] font-semibold">Store Desk Online</span>
            <span>· Station Road, Bhuj</span>
          </div>
          <div className="flex items-center gap-1 text-[10.5px] font-mono text-[#536248]">
            <Clock className="w-3 h-3" />
            <span>Replies in ~5 mins (9 AM – 9 PM)</span>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
          className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5"
        >
          {/* Quick Delivery Details Section */}
          <div className="bg-[#FAF7F2] rounded-xl p-3.5 sm:p-4 border border-[#E8DFD6] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#BA4A2C] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delivery Details in Bhuj (Pre-filled)</span>
              </span>
              <span className="text-[10px] text-[#7A6F68]">Edit to update</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div>
                <label className="text-[10px] uppercase font-semibold text-[#7A6F68] block mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-[#DFD3C7] focus:border-[#25D366] focus:outline-hidden font-medium text-xs text-[#1F1916]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-[#7A6F68] block mb-1">
                  WhatsApp Contact Phone
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-[#DFD3C7] focus:border-[#25D366] focus:outline-hidden font-mono text-xs text-[#1F1916]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] uppercase font-semibold text-[#7A6F68] block mb-1">
                  House / Society &amp; Street Area in Bhuj
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder="House / Flat No."
                    className="p-2 bg-white rounded-lg border border-[#DFD3C7] focus:border-[#25D366] focus:outline-hidden font-medium text-xs text-[#1F1916]"
                  />
                  <input
                    type="text"
                    value={streetArea}
                    onChange={(e) => setStreetArea(e.target.value)}
                    placeholder="Street / Society Area"
                    className="p-2 bg-white rounded-lg border border-[#DFD3C7] focus:border-[#25D366] focus:outline-hidden font-medium text-xs text-[#1F1916] sm:col-span-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Message Preview Bubble */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-[#1F1916] text-[10.5px] sm:text-[11px]">
                Formatted WhatsApp Message Preview:
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] text-[#25D366] hover:text-[#1EBE5D] font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>

            <div
              data-lenis-prevent="true"
              style={{
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
              }}
              className="bg-[#E7F0E9] border border-[#C5DEC9] rounded-xl p-3 sm:p-4 text-[11px] sm:text-xs font-mono text-[#1F1916] whitespace-pre-wrap leading-relaxed shadow-inner max-h-48 sm:max-h-56 overflow-y-auto"
            >
              {messageText}
            </div>
          </div>
        </div>

        {/* Fixed Action Footer */}
        <div className="p-3.5 sm:px-6 sm:py-4 bg-white border-t border-[#E8DFD6] space-y-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 sm:py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-none" />
            <span>Launch WhatsApp &amp; Send Order</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#7A6F68] pt-0.5">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Direct Store Line</span>
            </div>
            <div className="font-mono font-semibold text-[#1F1916]">
              Hotline: {STORE_DISPLAY_PHONE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
