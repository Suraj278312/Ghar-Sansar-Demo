import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { DeliveryAddress } from '../types.ts';
import { validateBhujDelivery } from '../config/checkoutConfig.ts';
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    platformFee,
    grandTotal,
    user,
    placeOrder,
    navigateTo,
    selectedOrderId,
    getOrderById,
  } = useApp();

  const defaultAddr = user?.savedAddresses[0];
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: defaultAddr?.fullName || user?.name || '',
    phoneNumber: defaultAddr?.phoneNumber || user?.phone || '',
    houseNumber: defaultAddr?.houseNumber || '',
    streetArea: defaultAddr?.streetArea || '',
    landmark: defaultAddr?.landmark || '',
    city: defaultAddr?.city || 'Bhuj',
    state: defaultAddr?.state || 'Gujarat',
    pinCode: defaultAddr?.pinCode || '370001',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('cod');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPlaced, setIsPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.fullName.trim() || !address.phoneNumber.trim() || !address.houseNumber.trim() || !address.streetArea.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    // Bhuj delivery verification
    const check = validateBhujDelivery(address.city, address.pinCode);
    if (!check.isDeliverable) {
      setErrorMsg(check.message);
      return;
    }

    setErrorMsg(null);
    const newOrder = placeOrder(address, paymentMethod);
    setOrderId(newOrder.id);
    setIsPlaced(true);
  };

  const confirmedOrder = orderId
    ? getOrderById(orderId)
    : selectedOrderId
    ? getOrderById(selectedOrderId)
    : null;

  // Post-purchase Confirmation View
  if (isPlaced && confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 sm:py-28 text-center space-y-8">
        <div className="w-16 h-16 bg-[#536248] text-white mx-auto rounded-full flex items-center justify-center shadow-md">
          <Check className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
            ORDER CONFIRMED
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
            Order #{confirmedOrder.id}
          </h1>
          <p className="text-sm text-[#7A6B62] max-w-md mx-auto font-sans">
            Your order has been received at our store in Bhuj and is being prepared for dispatch.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#EFE8E1] p-6 text-left text-xs space-y-4 font-mono shadow-2xs">
          <div className="flex justify-between pb-3 border-b border-[#E8DFD6]">
            <span className="text-[#8A7B72]">Estimated Delivery:</span>
            <strong className="text-[#1F1916]">{confirmedOrder.estimatedDelivery}</strong>
          </div>
          <div>
            <span className="text-[#8A7B72] block mb-1">Delivering to:</span>
            <div className="text-[#1F1916] font-medium">
              {confirmedOrder.address.fullName} ({confirmedOrder.address.phoneNumber})<br />
              {confirmedOrder.address.houseNumber}, {confirmedOrder.address.streetArea}<br />
              {confirmedOrder.address.city}, Gujarat - {confirmedOrder.address.pinCode}
            </div>
          </div>
          <div className="flex justify-between pt-3 border-t border-[#E8DFD6] font-bold text-sm">
            <span>Amount Due ({confirmedOrder.paymentMethod.toUpperCase()}):</span>
            <span className="text-[#BA4A2C]">₹{confirmedOrder.grandTotal}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('order-tracking', { orderId: confirmedOrder.id })}
            className="px-8 py-3.5 bg-[#BA4A2C] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#A33D22] transition-colors rounded-full cursor-pointer shadow-md"
          >
            Track Order
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 border border-[#D9CFC4] text-[#1F1916] text-xs font-semibold tracking-widest uppercase hover:border-[#BA4A2C] hover:text-[#BA4A2C] transition-colors rounded-full cursor-pointer bg-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !isPlaced) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-normal tracking-tight text-[#1F1916]">Your Cart is Empty</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      {/* Title */}
      <div className="border-b border-[#E8DFD6] pb-6 flex items-baseline justify-between">
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[#1F1916]">
          Checkout &amp; Delivery
        </h1>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs uppercase tracking-widest text-[#7A6B62] hover:text-[#BA4A2C] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT: Delivery Details Form */}
        <div className="lg:col-span-7 space-y-10">
          {errorMsg && (
            <div className="p-4 bg-[#F7EBE8] border border-[#E8CFC9] text-xs text-[#BA4A2C] rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Address Fields */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#BA4A2C] pb-2 border-b border-[#E8DFD6] font-sans">
              1. Delivery Address (Bhuj Delivery Zone)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="Ketan Patel"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={address.phoneNumber}
                  onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                  placeholder="+91 98250 XXXXX"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Flat / House / Building *
                </label>
                <input
                  type="text"
                  required
                  value={address.houseNumber}
                  onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })}
                  placeholder="Plot 14, Shanti Niketan Society"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Street / Area / Road *
                </label>
                <input
                  type="text"
                  required
                  value={address.streetArea}
                  onChange={(e) => setAddress({ ...address, streetArea: e.target.value })}
                  placeholder="Station Road / Near Jubilee Ground"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={address.landmark || ''}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  placeholder="Opp. Temple"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={address.pinCode}
                  onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                  placeholder="370001"
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D9CFC4] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6B62] mb-1">
                  State
                </label>
                <input
                  type="text"
                  readOnly
                  value={address.state}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD6] rounded-lg text-[#7A6B62] cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD6]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#BA4A2C] font-sans">
                2. Payment Method
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#7A6B62]">
                DOORSTEP CASH &amp; UPI
              </span>
            </div>

            <div className="space-y-2 text-xs font-sans">
              {[
                { id: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay in cash or direct UPI QR code upon arrival at your door in Bhuj.' },
                { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', desc: 'Instant QR code scan at doorstep or checkout.' },
                { id: 'card', label: 'Debit / Credit Card', desc: 'Visa, MasterCard, RuPay (simulated in demo mode).' },
                { id: 'netbanking', label: 'Net Banking', desc: 'Direct Indian net banking transfer.' },
              ].map((m) => (
                <label
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === m.id ? 'border-[#BA4A2C] bg-white shadow-2xs' : 'border-[#EFE8E1] bg-white/70 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id as any)}
                    className="mt-0.5 accent-[#BA4A2C]"
                  />
                  <div>
                    <div className="font-semibold text-[#1F1916]">{m.label}</div>
                    <div className="text-[11px] text-[#7A6B62] mt-0.5">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EFE8E1] p-8 space-y-6 sticky top-24 shadow-sm font-sans">
          <div className="text-xs font-bold uppercase tracking-widest text-[#BA4A2C] pb-4 border-b border-[#E8DFD6]">
            ORDER SUMMARY ({cart.length} ITEMS)
          </div>

          {/* Items Preview */}
          <div className="divide-y divide-[#E8DFD6] max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="py-2.5 flex justify-between text-xs">
                <div>
                  <div className="font-medium text-[#1F1916] line-clamp-1">{item.product.name}</div>
                  <div className="text-[#8A7B72] text-[11px]">Qty: {item.quantity}</div>
                </div>
                <span className="font-mono text-[#1F1916] shrink-0 font-medium">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2.5 pt-4 border-t border-[#E8DFD6] text-xs text-[#7A6B62]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-[#1F1916]">₹{cartSubtotal}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#BA4A2C]">
                <span>Savings</span>
                <span className="font-mono font-semibold">-₹{cartDiscount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery (Bhuj)</span>
              <span className="font-mono text-[#1F1916]">
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="font-mono text-[#1F1916]">
                {platformFee === 0 ? '₹0' : `₹${platformFee}`}
              </span>
            </div>

            <div className="pt-4 border-t border-[#E8DFD6] flex justify-between text-base font-bold text-[#1F1916] font-serif">
              <span>Total Due</span>
              <span className="font-mono text-lg text-[#BA4A2C]">₹{grandTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
          >
            <span>Place Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
