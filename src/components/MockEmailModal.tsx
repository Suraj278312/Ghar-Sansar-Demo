import React, { useEffect } from 'react';
import { MockEmailNotification } from '../utils/mockEmailService.ts';
import { X, Mail, CheckCircle2, Clock, MapPin, Phone, ShieldCheck, ChevronRight, Inbox, Package } from 'lucide-react';

interface MockEmailModalProps {
  email: MockEmailNotification | null;
  allEmailsForOrder: MockEmailNotification[];
  onSelectEmail: (email: MockEmailNotification) => void;
  onClose: () => void;
}

export const MockEmailModal: React.FC<MockEmailModalProps> = ({
  email,
  allEmailsForOrder,
  onSelectEmail,
  onClose,
}) => {
  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (!email) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, onClose]);

  if (!email) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Placed':
        return 'bg-[#7A6F68] text-white';
      case 'Confirmed':
        return 'bg-[#3B6978] text-white';
      case 'Packed':
        return 'bg-[#C49746] text-white';
      case 'Out for Delivery':
        return 'bg-[#BA4A2C] text-white';
      case 'Delivered':
        return 'bg-[#536248] text-white';
      default:
        return 'bg-[#1F1916] text-white';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mock-email-subject"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Main Email Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#DFD3C7] flex flex-col z-10 my-auto text-[#1F1916] font-sans"
      >
        {/* Email Client Header Bar */}
        <div className="px-5 py-3.5 bg-[#FAF7F2] border-b border-[#E8DFD6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#BA4A2C] text-white flex items-center justify-center shadow-2xs">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#BA4A2C]">
                SIMULATED EMAIL CLIENT · INBOX
              </div>
              <div className="text-xs font-semibold text-[#1F1916] flex items-center gap-1.5">
                <span>Ghar Sansar Order Dispatch</span>
                <span className="text-[10px] text-[#7A6F68] bg-[#EFE8E1] px-1.5 py-0.2 rounded font-mono">
                  {allEmailsForOrder.length} notification{allEmailsForOrder.length > 1 ? 's' : ''} in thread
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close email view"
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EFE8E1] text-[#7A6F68] hover:text-[#1F1916] border border-[#E8DFD6] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thread History Tabs (If multiple updates exist for this order) */}
        {allEmailsForOrder.length > 1 && (
          <div className="px-5 py-2.5 bg-[#F6F1EB] border-b border-[#E8DFD6] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#7A6F68] shrink-0">
              Updates in Thread:
            </span>
            <div className="flex items-center gap-1.5">
              {allEmailsForOrder.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectEmail(item)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    item.id === email.id
                      ? 'bg-[#1F1916] text-white shadow-2xs'
                      : 'bg-white text-[#7A6F68] hover:text-[#1F1916] border border-[#DFD3C7]'
                  }`}
                >
                  <span className="mr-1 font-semibold">{item.status}</span>
                  <span className="opacity-70 text-[10px] font-mono">({item.sentAt.split(', ')[1] || item.sentAt})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Envelope Metadata Area */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFD6] space-y-3">
          <h2
            id="mock-email-subject"
            className="text-lg sm:text-xl font-serif font-bold text-[#1F1916] leading-snug"
          >
            {email.subject}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#7A6F68]">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[#9E8E85] w-12 shrink-0 uppercase text-[10px] tracking-wider">
                From:
              </span>
              <span className="text-[#1F1916] font-medium font-mono">{email.sender}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[#9E8E85] w-12 shrink-0 uppercase text-[10px] tracking-wider">
                To:
              </span>
              <span className="text-[#1F1916] font-medium font-mono">
                {email.recipientName} &lt;{email.recipientEmail}&gt;
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[#9E8E85] w-12 shrink-0 uppercase text-[10px] tracking-wider">
                Date:
              </span>
              <span className="text-[#1F1916] font-mono">{email.sentAt}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[#9E8E85] w-12 shrink-0 uppercase text-[10px] tracking-wider">
                Order ID:
              </span>
              <span className="font-bold text-[#BA4A2C] font-mono">{email.orderId}</span>
            </div>
          </div>
        </div>

        {/* Email Body: Authentic E-commerce Template */}
        <div className="p-6 sm:p-8 bg-[#FAF7F2] space-y-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#E8DFD6] p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Brand Logo Header */}
            <div className="flex items-center justify-between border-b border-[#E8DFD6] pb-5">
              <div>
                <span className="font-serif text-2xl text-[#1F1916] font-bold block">
                  Ghar Sansar
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#BA4A2C]">
                  Household &amp; Daily Essentials · Bhuj
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(email.status)}`}>
                {email.status}
              </span>
            </div>

            {/* Greeting & Headline */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif text-[#1F1916]">
                {email.headline}
              </h3>
              <p className="text-xs uppercase font-semibold tracking-wider text-[#7A6F68]">
                {email.subheadline}
              </p>
              <p className="text-sm text-[#5D534D] leading-relaxed pt-1">
                {email.message}
              </p>
            </div>

            {/* Timeline Progress Snapshot */}
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#EFE8E1] space-y-2">
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-[#BA4A2C] flex items-center justify-between">
                <span>DELIVERY STATUS: {email.status}</span>
                <span className="font-mono text-[#7A6F68]">{email.sentAt}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#536248] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Arrival: {email.eta}</span>
              </div>
            </div>

            {/* Items Summary Table */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1F1916] border-b border-[#E8DFD6] pb-1.5">
                Order Items ({email.items.length})
              </div>
              <div className="divide-y divide-[#EFE8E1]">
                {email.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-serif text-sm font-semibold text-[#1F1916] block">
                        {item.name}
                      </span>
                      <span className="text-[#7A6F68] text-[11px]">
                        Qty: {item.quantity} {item.variant ? `· ${item.variant}` : ''}
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-[#1F1916]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-2 border-t border-[#E8DFD6] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#7A6F68]">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{email.subtotal}</span>
                </div>
                {email.discount > 0 && (
                  <div className="flex justify-between text-[#BA4A2C]">
                    <span>Store Discount</span>
                    <span className="font-mono">-₹{email.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7A6F68]">
                  <span>Delivery Fee (Bhuj Doorstep)</span>
                  <span className="font-mono text-[#536248] font-bold">
                    {email.deliveryFee === 0 ? 'FREE' : `₹${email.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1F1916] pt-1 border-t border-[#EFE8E1]">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-[#BA4A2C]">₹{email.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Address & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E8DFD6] text-xs">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A6F68] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#BA4A2C]" />
                  <span>Delivery Address</span>
                </div>
                <div className="text-[#1F1916] font-medium leading-relaxed">
                  {email.shippingAddress}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A6F68] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#BA4A2C]" />
                  <span>Payment Settlement</span>
                </div>
                <div className="text-[#1F1916] font-medium">
                  {email.paymentMethod}
                </div>
                <div className="text-[11px] text-[#536248] font-semibold pt-0.5">
                  ✓ Verified Store Dispatch
                </div>
              </div>
            </div>

            {/* Store Help Desk Signature */}
            <div className="pt-4 border-t border-[#E8DFD6] text-center space-y-1.5 text-xs text-[#7A6F68]">
              <p className="font-serif text-sm text-[#1F1916]">
                Questions about your delivery? We are right here in Bhuj!
              </p>
              <p className="font-mono text-[11px]">
                Phone: +91 98251 98765 · WhatsApp Support Active
              </p>
              <p className="text-[10.5px]">
                Ghar Sansar Store, Near Jubilee Ground, Station Road, Bhuj, Kutch, Gujarat 370001
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 bg-white border-t border-[#E8DFD6] flex items-center justify-between">
          <span className="text-[11px] text-[#7A6F68]">
            This is a mock notification generated to simulate real-time e-commerce order milestones.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1F1916] hover:bg-[#BA4A2C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Close Email
          </button>
        </div>
      </div>
    </div>
  );
};
