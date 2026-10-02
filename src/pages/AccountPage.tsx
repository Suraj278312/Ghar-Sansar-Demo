import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { products } from '../data/products.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { ProductVisual } from '../components/ProductVisual.tsx';
import { LogOut, ArrowRight } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, logout, orders, wishlist, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight text-[#0A0A0A]">Sign in to your account</h2>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-3 bg-[#0A0A0A] text-white text-xs font-semibold tracking-widest uppercase"
        >
          Sign In
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12 bg-[#FAF7F2]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#E8DFD6] pb-6">
        <div>
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
            CUSTOMER ACCOUNT
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[#1F1916] mt-1">
            {user.name}
          </h1>
          <p className="text-xs text-[#7A6F68] font-sans mt-0.5">
            {user.email} · {user.phone}
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigateTo('home');
          }}
          className="text-xs uppercase tracking-widest font-semibold text-[#7A6F68] hover:text-[#BA4A2C] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer font-sans"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-[#E8DFD6] text-xs font-bold uppercase tracking-widest font-sans">
        {[
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'addresses', label: `Saved Addresses (${user.savedAddresses.length})` },
          { id: 'wishlist', label: `Wishlist (${wishlist.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 cursor-pointer relative ${
              activeTab === tab.id ? 'text-[#1F1916]' : 'text-[#7A6F68] hover:text-[#1F1916]'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BA4A2C]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#7A6F68] font-sans">
                No previous orders found.
              </div>
            ) : (
              <div className="divide-y divide-[#E8DFD6]">
                {orders.map((order) => (
                  <div key={order.id} className="py-8 space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-4 text-xs font-mono">
                      <div>
                        <span className="text-[#7A6F68]">ORDER: </span>
                        <strong className="text-[#1F1916]">{order.id}</strong>
                        <span className="text-[#7A6F68] mx-3">/</span>
                        <span className="text-[#7A6F68]">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-wider font-bold text-[#BA4A2C]">
                          [{order.status}]
                        </span>
                        <button
                          onClick={() => navigateTo('order-tracking', { orderId: order.id })}
                          className="px-3.5 py-1.5 border border-[#1F1916] text-[11px] font-sans font-semibold uppercase tracking-wider hover:bg-[#EFE8E1] cursor-pointer"
                        >
                          Track Status &rarr;
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-[#EFE8E1]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-md p-1 shrink-0 border border-[#E8DFD6]">
                              <ProductVisual product={item.product} size="sm" className="bg-transparent border-0" />
                            </div>
                            <div>
                              <div className="font-serif text-sm font-semibold text-[#1F1916]">{item.product.name}</div>
                              <div className="text-[#7A6F68] text-[11px] font-sans">
                                Qty: {item.quantity} {item.selectedVariant ? `· ${item.selectedVariant}` : ''}
                              </div>
                            </div>
                          </div>
                          <span className="font-mono text-[#1F1916] font-semibold">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-baseline text-xs font-sans">
                      <span className="text-[#7A6F68]">Delivered to {order.address.streetArea}, Bhuj</span>
                      <div className="font-mono text-sm font-bold text-[#1F1916]">
                        Total: ₹{order.grandTotal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans">
            {user.savedAddresses.map((addr, idx) => (
              <div key={idx} className="p-6 border border-[#E8DFD6] bg-white rounded-xl space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#BA4A2C]">
                  PRIMARY BHUJ ADDRESS
                </div>
                <div className="font-serif text-base font-semibold text-[#1F1916]">{addr.fullName}</div>
                <div className="text-[#7A6F68] leading-relaxed">
                  {addr.houseNumber}, {addr.streetArea}<br />
                  {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, Gujarat - {addr.pinCode}
                </div>
                <div className="text-[#7A6F68] pt-2 font-mono">{addr.phoneNumber}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#7A6F68] font-sans">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
