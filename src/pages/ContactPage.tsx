import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { openWhatsAppOrder } = useApp();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', note: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16 select-none bg-[#FAF7F2]">
      {/* Title */}
      <div className="space-y-4 border-b border-[#E8DFD6] pb-10">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          BHUJ, GUJARAT, INDIA
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          Contact Our Store
        </h1>
        <p className="text-sm text-[#7A6B62] max-w-xl font-sans">
          Visit our physical store in Bhuj or reach our customer desk for inquiries regarding product
          models, bulk festival requirements, or local deliveries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Store Coordinates */}
        <div className="md:col-span-5 space-y-8 text-xs text-[#7A6B62] font-sans">
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#BA4A2C]">
              STORE ADDRESS
            </div>
            <p className="leading-relaxed text-[#1F1916]">
              Ghar Sansar Household &amp; Plastics<br />
              Near Jubilee Ground, Station Road<br />
              Bhuj, Kutch, Gujarat 370001
            </p>
            <div className="pt-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#BA4A2C] pt-1 inline-flex items-center gap-1">
                <span>Near Jubilee Ground, Bhuj</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-[#E8DFD6]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#BA4A2C]">
              TELEPHONE &amp; WHATSAPP
            </div>
            <div className="text-[#1F1916] font-mono text-sm">+91 98251 98765</div>
            <p className="text-[11px]">Direct store desk assistance in Bhuj</p>
            <button
              type="button"
              onClick={() =>
                openWhatsAppOrder({
                  type: 'support',
                  supportTopic: 'product models and store queries',
                })
              }
              className="mt-1 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
              <span>Chat on WhatsApp Hotline</span>
            </button>
          </div>

          <div className="space-y-2 pt-6 border-t border-[#E8DFD6]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#BA4A2C]">
              OPENING HOURS
            </div>
            <div className="text-[#1F1916] leading-relaxed">
              Monday – Saturday: 9:30 AM – 9:00 PM<br />
              Sunday: 10:00 AM – 2:00 PM
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-[#E8DFD6]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#BA4A2C]">
              EMAIL DESK
            </div>
            <div className="text-[#1F1916] font-mono">contact@gharsansarbhuj.com</div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-[#EFE8E1] p-8 sm:p-10 space-y-6 shadow-sm font-sans">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-[#BA4A2C]">
              SEND AN INQUIRY
            </div>
            <p className="text-xs text-[#7A6B62]">
              Leave a note and our Bhuj store representative will contact you via phone or WhatsApp.
            </p>
          </div>

          {sent ? (
            <div className="py-8 space-y-2 text-xs">
              <div className="font-bold text-[#1F1916] uppercase tracking-wider font-serif text-base">
                Message Received
              </div>
              <p className="text-[#7A6B62] leading-relaxed">
                Thank you, {form.name || 'valued customer'}. We have received your inquiry and will
                get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ketan Patel"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98250 XXXXX"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Message / Product Inquiry
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Inquire about item sizes, colors, bulk orders..."
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer shadow-md hover:-translate-y-0.5"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
