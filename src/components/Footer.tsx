import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ArrowUpRight, Sparkles, MapPin, Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openWhatsAppOrder } = useApp();

  return (
    <footer className="bg-[#1C1715] text-[#FAF7F2] pt-20 pb-24 md:pb-16 text-xs select-none border-t border-[#2E2522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Main Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Left */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <span className="text-3xl font-serif font-normal tracking-tight text-white block">
                Ghar Sansar
              </span>
              <span className="text-[10.5px] uppercase font-sans font-semibold tracking-[0.25em] text-[#BA4A2C] block">
                HOUSEHOLD &amp; PLASTIC STORE · BHUJ, GUJARAT
              </span>
            </div>

            <p className="text-sm text-[#B3A69D] max-w-sm leading-relaxed pt-1 font-sans">
              Thoughtfully curated everyday essentials for living, cooking, organizing, and cleaning.
              Serving generations of families across Bhuj, Gujarat with complimentary local delivery.
            </p>

            <div className="pt-2 text-xs text-[#998B82] space-y-2 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#BA4A2C]" />
                <span>Station Road, Near Jubilee Ground · Bhuj 370001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#536248]" />
                <span>Store Helpline: +91 98251 98765</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  openWhatsAppOrder({
                    type: 'support',
                    supportTopic: 'general inquiries and doorstep orders in Bhuj',
                  })
                }
                className="flex items-center gap-2 text-[#25D366] hover:text-white transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] stroke-none" />
                <span className="font-semibold">WhatsApp Order &amp; Support Desk (+91 98251 98765)</span>
              </button>
            </div>
          </div>

          {/* Links Right */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Shop */}
            <div className="space-y-3 font-sans">
              <div className="text-[11px] uppercase tracking-widest font-bold text-white font-serif">
                Collections
              </div>
              <ul className="space-y-2.5 text-[#B3A69D]">
                <li>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    All Essentials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Water Bottles' })}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Bottles &amp; Thermosteel
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Thermoware' })}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Thermoware &amp; Casseroles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Storage' })}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Storage &amp; Containers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('shop', { category: 'Home Utility' })}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Cleaning &amp; Home Utility
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Index */}
            <div className="space-y-3 font-sans">
              <div className="text-[11px] uppercase tracking-widest font-bold text-white font-serif">
                Explore
              </div>
              <ul className="space-y-2.5 text-[#B3A69D]">
                <li>
                  <button
                    onClick={() => navigateTo('categories')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    All Categories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    About Our Store
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('order-tracking')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Track Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('account')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    My Account
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Care */}
            <div className="space-y-3 font-sans">
              <div className="text-[11px] uppercase tracking-widest font-bold text-white font-serif">
                Customer Care
              </div>
              <ul className="space-y-2.5 text-[#B3A69D]">
                <li>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Contact Store
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('delivery-info')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Bhuj Delivery Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('faq')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('privacy')}
                    className="hover:text-[#BA4A2C] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Rule & Copyright */}
        <div className="pt-10 border-t border-[#2E2522] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#8C7D74] text-[11px] font-sans">
          <div>
            &copy; 2026 GHAR SANSAR · HOUSEHOLD &amp; PLASTIC STORE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>BHUJ, GUJARAT (370XXX)</span>
            <span>·</span>
            <span>100% GENUINE MILTON &amp; BOSS PRODUCTS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
