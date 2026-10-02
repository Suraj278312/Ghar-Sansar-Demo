import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { OrderStatus } from '../types.ts';
import {
  triggerMockOrderEmail,
  getMockEmailsForOrder,
  MockEmailNotification,
} from '../utils/mockEmailService.ts';
import { MockEmailModal } from '../components/MockEmailModal.tsx';
import {
  Search,
  Check,
  Mail,
  Send,
  Play,
  Square,
  Clock,
  ArrowRight,
  Inbox,
  Edit2,
  CheckCircle2,
  Bell,
  Sparkles,
  Package,
  Truck,
  MapPin,
  X,
} from 'lucide-react';

const ORDER_STAGES: { status: OrderStatus; label: string; icon: string; description: string }[] = [
  {
    status: 'Placed',
    label: '1. Placed',
    icon: '📝',
    description: 'Order placed by customer & awaiting store verification',
  },
  {
    status: 'Confirmed',
    label: '2. Confirmed',
    icon: '✓',
    description: 'Verified by inventory desk in Bhuj store',
  },
  {
    status: 'Packed',
    label: '3. Packed',
    icon: '📦',
    description: 'Quality-checked and bubble-wrapped in cartons',
  },
  {
    status: 'Out for Delivery',
    label: '4. Out for Delivery',
    icon: '🚚',
    description: 'On local delivery vehicle in Bhuj',
  },
  {
    status: 'Delivered',
    label: '5. Delivered',
    icon: '🏠',
    description: 'Handed over at customer doorstep',
  },
];

export const OrderTrackingPage: React.FC = () => {
  const { orders, selectedOrderId, getOrderById, updateOrderStatus, showToast, user } = useApp();

  const [inputVal, setInputVal] = useState(selectedOrderId || orders[0]?.id || 'GS-2026-09281');
  const [activeOrderId, setActiveOrderId] = useState(selectedOrderId || orders[0]?.id || 'GS-2026-09281');

  // Custom recipient email for simulation testing
  const [recipientEmail, setRecipientEmail] = useState(
    user?.email || 'ketan.bhuj@example.com'
  );
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Email viewing modal state
  const [selectedEmail, setSelectedEmail] = useState<MockEmailNotification | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailsList, setEmailsList] = useState<MockEmailNotification[]>([]);

  // Real-time floating incoming email toast
  const [incomingEmailToast, setIncomingEmailToast] = useState<MockEmailNotification | null>(null);

  // Auto-play simulation state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeOrder = getOrderById(activeOrderId) || orders[0];

  // Refresh emails when active order changes
  useEffect(() => {
    if (activeOrder) {
      const storedEmails = getMockEmailsForOrder(activeOrder.id);
      
      // If no mock emails exist yet for this order, initialize one for the initial status
      if (storedEmails.length === 0) {
        const initialEmail = triggerMockOrderEmail(activeOrder, activeOrder.status, recipientEmail);
        setEmailsList([initialEmail]);
      } else {
        setEmailsList(storedEmails);
      }
    }
  }, [activeOrder?.id, recipientEmail]);

  // Clean up auto-play timer on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === inputVal.trim().toLowerCase());
    if (found) {
      setActiveOrderId(found.id);
      showToast(`Loaded order ${found.id}`);
    } else {
      showToast('Order ID not found in database.');
    }
  };

  // Trigger status update and mock email dispatch
  const handleTriggerStatus = (newStatus: OrderStatus) => {
    if (!activeOrder) return;

    const result = updateOrderStatus(activeOrder.id, newStatus, recipientEmail);
    if (result) {
      // Update local emails list
      setEmailsList(getMockEmailsForOrder(activeOrder.id));

      // Trigger incoming email toast
      setIncomingEmailToast(result.email);

      // Auto dismiss toast after 6 seconds
      setTimeout(() => {
        setIncomingEmailToast((prev) => (prev?.id === result.email.id ? null : prev));
      }, 6000);
    }
  };

  // Advance to next status in sequence
  const handleAdvanceNextStage = () => {
    if (!activeOrder) return;
    const stages: OrderStatus[] = ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
    const currentIndex = stages.indexOf(activeOrder.status);

    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      handleTriggerStatus(nextStatus);
    } else {
      showToast('Order is already at the final milestone (Delivered).');
    }
  };

  // Auto-play the order progression
  const handleToggleAutoPlay = () => {
    if (isAutoPlaying) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      setIsAutoPlaying(false);
      showToast('Auto simulation paused');
      return;
    }

    if (!activeOrder) return;

    const stages: OrderStatus[] = ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
    let currentIndex = stages.indexOf(activeOrder.status);

    if (currentIndex >= stages.length - 1) {
      // Reset to Placed first if already delivered
      handleTriggerStatus('Placed');
      currentIndex = 0;
    }

    setIsAutoPlaying(true);
    showToast('Starting automated delivery cycle simulation...');

    let nextIndex = currentIndex + 1;

    const stepInterval = () => {
      if (nextIndex < stages.length) {
        const nextStatus = stages[nextIndex];
        handleTriggerStatus(nextStatus);
        nextIndex++;
        autoPlayTimerRef.current = setTimeout(stepInterval, 2600);
      } else {
        setIsAutoPlaying(false);
        showToast('All order milestones completed and mock emails dispatched!');
      }
    };

    autoPlayTimerRef.current = setTimeout(stepInterval, 1800);
  };

  const handleOpenEmailModal = (emailToView?: MockEmailNotification) => {
    const list = getMockEmailsForOrder(activeOrder?.id || '');
    setEmailsList(list);
    setSelectedEmail(emailToView || list[0] || null);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10 select-none bg-[#FAF7F2]">
      
      {/* Real-time Incoming Email Notification Floating Toast */}
      {incomingEmailToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md w-full bg-[#1F1916] text-white p-4 rounded-xl shadow-2xl border border-[#DFD3C7] animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#BA4A2C] text-white flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA4A2C]">
                  NEW ORDER EMAIL RECEIVED
                </span>
                <button
                  onClick={() => setIncomingEmailToast(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-serif font-bold text-white line-clamp-1 mt-0.5">
                {incomingEmailToast.subject}
              </p>
              <p className="text-[11px] text-[#A89D95] line-clamp-1 mt-0.5 font-mono">
                To: {incomingEmailToast.recipientEmail}
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => {
                    handleOpenEmailModal(incomingEmailToast);
                    setIncomingEmailToast(null);
                  }}
                  className="px-3 py-1 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-[11px] font-sans font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Read Simulated Email &rarr;
                </button>
                <button
                  onClick={() => setIncomingEmailToast(null)}
                  className="text-[11px] text-white/70 hover:text-white px-2 py-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Header */}
      <div className="space-y-4 border-b border-[#E8DFD6] pb-8">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          LOGISTICS &amp; REAL-TIME TIMELINE
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#1F1916]">
          Track Your Order
        </h1>
        <p className="text-xs text-[#7A6F68] font-sans">
          Enter your order reference number to follow the dispatch status across Bhuj or simulate email notifications.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md pt-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. GS-2026-09281"
            className="w-full p-3 bg-white border border-[#E8DFD6] rounded-lg text-xs font-mono text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#BA4A2C] text-white text-xs font-sans font-semibold tracking-widest uppercase hover:bg-[#A33F24] cursor-pointer shrink-0 rounded-lg transition-colors"
          >
            Track
          </button>
        </form>

        {/* Quick Order Switcher pills */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2 pt-2 text-xs font-sans">
            <span className="text-[#7A6F68] text-[11px]">Your Orders:</span>
            <div className="flex flex-wrap gap-1.5">
              {orders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => {
                    setActiveOrderId(ord.id);
                    setInputVal(ord.id);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                    ord.id === activeOrder?.id
                      ? 'bg-[#1F1916] text-white border-[#1F1916]'
                      : 'bg-white text-[#7A6F68] border-[#E8DFD6] hover:border-[#BA4A2C]'
                  }`}
                >
                  {ord.id} ({ord.status})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeOrder && (
        <div className="space-y-10">
          
          {/* ============================================================ */}
          {/* MOCK EMAIL NOTIFICATION SIMULATOR CONTROL PANEL */}
          {/* ============================================================ */}
          <div className="p-6 bg-white border-2 border-[#BA4A2C]/25 rounded-2xl space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFD6] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#BA4A2C] animate-pulse" />
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#BA4A2C]">
                    MOCK EMAIL NOTIFICATION SYSTEM
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1F1916]">
                  Simulate Order Status Updates &amp; Customer Emails
                </h3>
                <p className="text-xs text-[#7A6F68] font-sans">
                  Click any stage or step through the milestones to trigger simulated real-time e-commerce emails.
                </p>
              </div>

              {/* View Inbox Shortcut */}
              <button
                onClick={() => handleOpenEmailModal()}
                className="self-start sm:self-auto px-4 py-2 bg-[#FAF7F2] hover:bg-[#1F1916] text-[#1F1916] hover:text-white border border-[#DFD3C7] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-2xs cursor-pointer shrink-0"
              >
                <Inbox className="w-4 h-4 text-[#BA4A2C]" />
                <span>Simulated Inbox ({emailsList.length})</span>
              </button>
            </div>

            {/* Recipient Target Email */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE8E1] text-xs font-sans">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7A6F68]" />
                <span className="text-[#7A6F68]">Sending mock notifications to:</span>
                {isEditingEmail ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="px-2.5 py-1 bg-white border border-[#BA4A2C] rounded text-xs font-mono text-[#1F1916] focus:outline-hidden"
                    />
                    <button
                      onClick={() => setIsEditingEmail(false)}
                      className="px-2.5 py-1 bg-[#BA4A2C] text-white rounded text-[11px] font-semibold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span className="font-mono font-bold text-[#1F1916]">
                    {recipientEmail}
                  </span>
                )}
              </div>

              {!isEditingEmail && (
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="text-[11px] text-[#BA4A2C] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Change Recipient Email</span>
                </button>
              )}
            </div>

            {/* Interactive Status Stage Steppers */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F1916]">
                Trigger Milestone Email:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {ORDER_STAGES.map((stage) => {
                  const isActive = activeOrder.status === stage.status;
                  const stagesList: OrderStatus[] = ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
                  const isPassed = stagesList.indexOf(activeOrder.status) >= stagesList.indexOf(stage.status);

                  return (
                    <button
                      key={stage.status}
                      onClick={() => handleTriggerStatus(stage.status)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isActive
                          ? 'bg-[#1F1916] text-white border-[#1F1916] shadow-md ring-2 ring-[#BA4A2C]/50'
                          : isPassed
                          ? 'bg-white text-[#1F1916] border-[#DFD3C7] hover:border-[#BA4A2C]'
                          : 'bg-[#FAF7F2] text-[#7A6F68] border-[#E8DFD6] hover:border-[#BA4A2C]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{stage.icon}</span>
                        {isActive && (
                          <span className="text-[9px] uppercase font-bold bg-[#BA4A2C] text-white px-1.5 py-0.2 rounded font-sans">
                            Current
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs font-sans tracking-tight">
                          {stage.label.split('. ')[1]}
                        </div>
                        <div className="text-[10px] opacity-75 line-clamp-1 mt-0.5">
                          {stage.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Automation Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleAdvanceNextStage}
                className="px-4 py-2.5 bg-[#BA4A2C] hover:bg-[#A33D22] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Advance to Next Status &rarr;</span>
              </button>

              <button
                onClick={handleToggleAutoPlay}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 border transition-all cursor-pointer ${
                  isAutoPlaying
                    ? 'bg-[#1F1916] text-white border-[#1F1916] animate-pulse'
                    : 'bg-white hover:bg-[#FAF7F2] text-[#1F1916] border-[#DFD3C7]'
                }`}
              >
                {isAutoPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 text-[#BA4A2C]" />
                    <span>Pause Automated Simulation</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#BA4A2C]" />
                    <span>Run Full Delivery Cycle (Auto)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* ORDER OVERVIEW BAR */}
          {/* ============================================================ */}
          <div className="p-6 bg-white border border-[#E8DFD6] rounded-2xl flex flex-wrap items-baseline justify-between gap-6 text-xs font-mono shadow-2xs">
            <div>
              <span className="text-[#7A6F68] block text-[10px] uppercase font-sans">ORDER REFERENCE</span>
              <strong className="text-base text-[#1F1916]">{activeOrder.id}</strong>
            </div>
            <div>
              <span className="text-[#7A6F68] block text-[10px] uppercase font-sans">ESTIMATED ARRIVAL</span>
              <strong className="text-sm text-[#1F1916]">{activeOrder.estimatedDelivery}</strong>
            </div>
            <div>
              <span className="text-[#7A6F68] block text-[10px] uppercase font-sans">CURRENT STATUS</span>
              <strong className="text-sm text-[#BA4A2C] uppercase">{activeOrder.status}</strong>
            </div>
            <div>
              <span className="text-[#7A6F68] block text-[10px] uppercase font-sans">TOTAL AMOUNT</span>
              <strong className="text-sm text-[#1F1916]">₹{activeOrder.grandTotal}</strong>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TIMELINE PROGRESSION WITH EMAIL LINKS */}
          {/* ============================================================ */}
          <div className="space-y-8 pl-4 sm:pl-6 border-l-2 border-[#BA4A2C] ml-2">
            {activeOrder.timeline.map((step, idx) => {
              const matchingEmail = emailsList.find(
                (e) => e.status.toLowerCase() === step.status.toLowerCase()
              );

              return (
                <div key={idx} className="relative space-y-1 font-sans">
                  {/* Marker */}
                  <div
                    className={`absolute -left-[23px] sm:-left-[31px] top-0.5 w-3.5 h-3.5 rounded-full transition-colors ${
                      step.done ? 'bg-[#BA4A2C]' : 'bg-white border-2 border-[#DFD3C7]'
                    }`}
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-sm sm:text-base font-serif font-semibold tracking-tight ${
                          step.done ? 'text-[#1F1916]' : 'text-[#7A6F68]'
                        }`}
                      >
                        {step.status}
                      </span>
                      <span className="text-xs font-mono text-[#7A6F68]">{step.time}</span>
                    </div>

                    {/* View Associated Email Button */}
                    {step.done && (
                      <button
                        onClick={() => {
                          if (matchingEmail) {
                            handleOpenEmailModal(matchingEmail);
                          } else {
                            // Generate mock email on demand if not yet generated
                            const email = triggerMockOrderEmail(activeOrder, step.status, recipientEmail);
                            handleOpenEmailModal(email);
                          }
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-[#BA4A2C] text-[#7A6F68] hover:text-white border border-[#E8DFD6] rounded-md text-[10.5px] font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title={`View mock email for ${step.status}`}
                      >
                        <Mail className="w-3 h-3 text-[#BA4A2C] group-hover:text-white" />
                        <span>View Email Notification</span>
                      </button>
                    )}
                  </div>

                  {step.note && (
                    <p className="text-xs text-[#7A6F68] leading-relaxed max-w-lg">{step.note}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* DESTINATION & ITEMS RECAP */}
          {/* ============================================================ */}
          <div className="border-t border-[#E8DFD6] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-[#7A6F68] font-sans">
            <div className="space-y-1.5 bg-white p-5 rounded-xl border border-[#E8DFD6]">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#BA4A2C] mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#BA4A2C]" />
                <span>DISPATCH DESTINATION</span>
              </div>
              <div className="text-[#1F1916] font-medium text-sm">
                {activeOrder.address.fullName} ({activeOrder.address.phoneNumber})
              </div>
              <div className="leading-relaxed">
                {activeOrder.address.houseNumber}, {activeOrder.address.streetArea},<br />
                {activeOrder.address.city}, Gujarat - {activeOrder.address.pinCode}
              </div>
            </div>

            <div className="space-y-1.5 bg-white p-5 rounded-xl border border-[#E8DFD6]">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#BA4A2C] mb-2 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-[#BA4A2C]" />
                <span>PACKAGE CONTENTS ({activeOrder.items.length} items)</span>
              </div>
              <div className="divide-y divide-[#EFE8E1]">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="py-1.5 flex justify-between items-center text-xs">
                    <span className="text-[#1F1916] font-medium line-clamp-1">
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span className="font-mono text-[#1F1916]">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mock Email Full-Screen Viewer Modal */}
      {isEmailModalOpen && (
        <MockEmailModal
          email={selectedEmail}
          allEmailsForOrder={emailsList}
          onSelectEmail={(e) => setSelectedEmail(e)}
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}
    </div>
  );
};
