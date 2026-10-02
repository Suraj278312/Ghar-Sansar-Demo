import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, cartTotalCount, setIsSearchOpen, user, wishlist } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#1A1615] text-[#F5EFEB] text-[11px] tracking-wider uppercase py-2 px-4 text-center select-none border-b border-[#2C2522]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#A89C94] text-[10px] font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA4A2C]" />
            <span>STATION ROAD · BHUJ, GUJARAT</span>
          </div>
          <div className="mx-auto flex items-center gap-2 font-sans">
            <span className="font-semibold text-white tracking-widest text-[10px] sm:text-xs">
              LOCAL STORE &amp; DOORSTEP DELIVERY ACROSS BHUJ
            </span>
            <span className="text-[#8C7E75]">·</span>
            <span className="text-[#D8CCC4] normal-case tracking-normal text-[11px] hidden xs:inline">
              Complimentary local doorstep delivery on orders above ₹499
            </span>
          </div>
          <div className="hidden sm:block">
            <button
              onClick={() => navigateTo('delivery-info')}
              className="text-[#D8CCC4] hover:text-[#BA4A2C] transition-colors text-[10px] font-medium uppercase tracking-wider cursor-pointer"
            >
              Delivery Info &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? 'py-3.5 border-b border-[#E8DFD8] shadow-xs' : 'py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* LEFT: Brand Wordmark and descriptor */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -ml-1 text-[#1A1615] hover:text-[#BA4A2C] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            >
              <span className="block text-2xl sm:text-3.5xl font-serif font-medium tracking-[0.02em] text-[#1F1916] group-hover:text-[#BA4A2C] transition-colors leading-none">
                Ghar Sansar
              </span>
              <span className="block text-[9.5px] font-sans uppercase tracking-[0.24em] text-[#BA4A2C] mt-1 font-bold">
                Household &amp; Plastic Store · Bhuj
              </span>
            </button>
          </div>

          {/* CENTER: Navigation text links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer relative py-1.5 ${
                    isActive ? 'text-[#BA4A2C]' : 'text-[#7A6F68] hover:text-[#1A1615]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BA4A2C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Search, Account, Cart */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#1A1615]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#BA4A2C] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Search store"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs text-[#7A6F68]">Search...</span>
            </button>

            <button
              onClick={() => navigateTo(user ? 'account' : 'login')}
              className="p-1.5 hover:text-[#BA4A2C] transition-colors cursor-pointer flex items-center gap-1.5"
              title={user ? 'My Account' : 'Sign In'}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-medium">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            <button
              onClick={() => navigateTo('cart')}
              className="relative p-2 bg-[#1A1615] text-white hover:bg-[#BA4A2C] rounded-full transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#BA4A2C] text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8DFD8] bg-[#FAF7F2] px-6 py-6 space-y-4 animate-in fade-in duration-150">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    navigateTo(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-base font-serif font-bold tracking-tight uppercase py-1 ${
                    currentPage === link.page ? 'text-[#BA4A2C]' : 'text-[#7A6F68]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8DFD8] space-y-2 text-xs uppercase tracking-wider text-[#7A6F68]">
              <button
                onClick={() => {
                  navigateTo(user ? 'account' : 'login');
                  setMobileMenuOpen(false);
                }}
                className="block text-[#1A1615] font-semibold"
              >
                {user ? 'My Account' : 'Sign In / Register'}
              </button>
              <button
                onClick={() => {
                  navigateTo('delivery-info');
                  setMobileMenuOpen(false);
                }}
                className="block"
              >
                Bhuj Delivery Info
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
