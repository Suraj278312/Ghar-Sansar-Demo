import React from 'react';

interface PolicyPageProps {
  type: 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-12 select-none bg-[#FAF7F2]">
      <div className="space-y-4 border-b border-[#E8DFD6] pb-8">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          LEGAL &amp; POLICIES
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-[#7A6F68] font-mono">UPDATED: OCTOBER 2026 · GHAR SANSAR BHUJ</p>
      </div>

      <div className="space-y-8 text-sm text-[#7A6F68] font-sans leading-relaxed">
        {type === 'privacy' ? (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#1F1916]">
                1. Data Collection
              </h2>
              <p>
                We collect your name, phone number, and physical street address in Bhuj solely to
                coordinate packaging and dispatch of your order from our store to your door.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#1F1916]">
                2. Information Usage
              </h2>
              <p>
                Your phone number is utilized only for delivery rider dispatch, OTP verification, and
                order updates. We do not sell or monetize personal customer records.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#1F1916]">
                3. Contact
              </h2>
              <p>
                For data inquiries, contact our store desk at contact@gharsansarbhuj.com or visit us in
                person on Station Road, Bhuj.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#1F1916]">
                1. Delivery Territory
              </h2>
              <p>
                Online delivery services are currently active exclusively within Bhuj, Gujarat (PIN
                codes starting with 370).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#1F1916]">
                2. Pricing &amp; Settlement
              </h2>
              <p>
                All prices are in Indian Rupees (INR) and include applicable taxes. Cash on delivery
                settlements must be provided in cash or through valid UPI transfer upon arrival.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-serif font-semibold text-[#1F1916]">
                3. Direct Store Exchanges
              </h2>
              <p>
                Faulty or damaged merchandise may be brought to our physical store in Bhuj within 3
                days of delivery for direct one-to-one exchange.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
