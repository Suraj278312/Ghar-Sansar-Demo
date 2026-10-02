import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you deliver only within Bhuj?',
      a: 'Yes, our online delivery service is currently restricted to Bhuj town and immediate suburbs (PIN codes starting with 370). We plan to expand to other Kutch cities in future phases.',
    },
    {
      q: 'Are all Milton and Boss products 100% original?',
      a: 'Yes. Ghar Sansar is an authorized retailer sourcing directly from official brand distributors. All products feature authentic manufacturer specifications and warranties.',
    },
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'When our delivery personnel arrives at your doorstep in Bhuj, you can pay using exact cash or scan the rider’s UPI QR code using any UPI application (Google Pay, PhonePe, Paytm).',
    },
    {
      q: 'What is the return/exchange policy?',
      a: 'We offer a 3-day local exchange policy for manufacturing defects or size mismatches. Simply contact our store phone/WhatsApp or visit our shop near Jubilee Ground, Bhuj.',
    },
    {
      q: 'What is the free delivery threshold?',
      a: 'Orders of ₹499 and above receive FREE local delivery in Bhuj. Orders below ₹499 incur a nominal ₹40 local courier fee.',
    },
    {
      q: 'Can I place bulk orders for functions or corporate gifting in Kutch?',
      a: 'Yes. We cater to wholesale quantities of casseroles, storage containers, buckets, and water bottles for social events, weddings, and institutional needs. Contact our store desk for bulk quotes.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16 select-none bg-[#FAF7F2]">
      <div className="space-y-4 border-b border-[#E8DFD6] pb-10">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          HELP &amp; INQUIRIES
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#7A6F68] font-sans">
          Clear answers about ordering, products, and doorstep delivery across Bhuj.
        </p>
      </div>

      <div className="divide-y divide-[#E8DFD6]">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-6">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-baseline justify-between text-left gap-4 font-serif text-lg text-[#1F1916] hover:text-[#BA4A2C] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-[#BA4A2C] shrink-0 font-sans text-xs">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {isOpen && (
                <p className="mt-3 text-sm text-[#7A6F68] font-sans leading-relaxed max-w-xl">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
