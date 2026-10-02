import React from 'react';
import { checkoutConfig } from '../config/checkoutConfig.ts';

export const DeliveryInfoPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16 select-none bg-[#FAF7F2]">
      <div className="space-y-4 border-b border-[#E8DFD6] pb-10">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          LOGISTICS &amp; FULFILLMENT
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          Delivery Information
        </h1>
        <p className="text-sm text-[#7A6B62] max-w-xl font-sans">
          Everything regarding local doorstep fulfillment across Bhuj town, postal zones, and schedules.
        </p>
      </div>

      <div className="space-y-12 text-xs text-[#7A6B62] font-sans">
        {/* Geographic Scope */}
        <div className="space-y-3">
          <div className="text-lg font-serif font-normal text-[#1F1916]">
            Current Coverage: Bhuj Only
          </div>
          <p className="leading-relaxed max-w-2xl">
            Ghar Sansar operates its dedicated delivery fleet within the municipal limits of Bhuj,
            Gujarat, including Darbar Gadh, Station Road, Jubilee Ground, Madhapar, Mirzapar, Sukhpar
            and industrial belts.
          </p>
        </div>

        {/* PIN Codes */}
        <div className="space-y-4 pt-6 border-t border-[#E8DFD6]">
          <div className="text-lg font-serif font-normal text-[#1F1916]">
            Supported Bhuj PIN Codes
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checkoutConfig.validBhujPinCodes.map((item) => (
              <div key={item.pinCode} className="p-4 bg-white rounded-xl border border-[#EFE8E1] flex justify-between items-baseline font-mono shadow-2xs">
                <span className="font-bold text-[#BA4A2C]">{item.pinCode}</span>
                <span className="text-[#7A6B62] font-sans text-right">{item.area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-4 pt-6 border-t border-[#E8DFD6]">
          <div className="text-lg font-serif font-normal text-[#1F1916]">
            Timing &amp; Schedules
          </div>
          <div className="divide-y divide-[#E8DFD6] bg-white rounded-2xl border border-[#EFE8E1] p-5 shadow-2xs">
            <div className="py-3 flex justify-between">
              <span className="font-medium text-[#1F1916]">Same-Day Delivery</span>
              <span>Orders placed before 3:00 PM (Delivered between 5:00 PM – 8:30 PM)</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-medium text-[#1F1916]">Next-Day Delivery</span>
              <span>Orders placed after 3:00 PM (Delivered between 10:00 AM – 2:00 PM)</span>
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="space-y-3 pt-6 border-t border-[#E5E5E5]">
          <div className="text-sm font-bold uppercase tracking-tight text-[#0A0A0A]">
            Delivery Fees
          </div>
          <p className="leading-relaxed">
            Local delivery is <strong>FREE</strong> for all orders over ₹499 in Bhuj. Orders below
            ₹499 carry a flat ₹40 local courier fee.
          </p>
        </div>

        {/* Expansion */}
        <div className="p-6 bg-[#F7F7F7] border border-[#E5E5E5] space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
            Future Expansion
          </div>
          <p className="leading-relaxed">
            Deliveries to Anjar, Mundra, and Gandhidham will launch in subsequent phases. If you
            reside outside Bhuj, please visit our physical store on Station Road.
          </p>
        </div>
      </div>
    </div>
  );
};
