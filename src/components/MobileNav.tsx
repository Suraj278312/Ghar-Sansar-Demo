import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Home, Compass, Search, ShoppingBag, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentPage, navigateTo, cartTotalCount, setIsSearchOpen, user } = useApp();

  const navItems = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Shop', page: 'shop', icon: Compass },
    { label: 'Search', action: () => setIsSearchOpen(true), icon: Search },
    {
      label: 'Bag',
      page: 'cart',
      icon: ShoppingBag,
      badge: cartTotalCount > 0 ? cartTotalCount : undefined,
    },
    {
      label: 'Account',
      page: user ? 'account' : 'login',
      icon: User,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8DFD6] py-2 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.page && currentPage === item.page;

          return (
            <button
              key={idx}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (item.page) {
                  navigateTo(item.page);
                }
              }}
              className={`flex flex-col items-center justify-center py-0.5 px-2 text-[10px] tracking-wider uppercase font-sans font-medium transition-colors cursor-pointer ${
                isActive ? 'text-[#BA4A2C] font-bold' : 'text-[#7A6F68] hover:text-[#1F1916]'
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold bg-[#BA4A2C] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
