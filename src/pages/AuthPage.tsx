import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { ArrowRight } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, navigateTo, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const [emailOrPhone, setEmailOrPhone] = useState('ketan.bhuj@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const displayName = emailOrPhone.includes('@')
        ? emailOrPhone.split('@')[0]
        : 'Ketan Patel';
      login(displayName, emailOrPhone, '+91 98251 98765');
    } else {
      login(name || 'Customer', emailOrPhone, phone || '+91 98250 11223');
    }
    navigateTo('account');
  };

  const handleGuestContinue = () => {
    login('Guest Shopper', 'guest@gharsansarbhuj.com', '+91 98250 00000');
    navigateTo('shop');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 sm:py-28 space-y-10 select-none bg-[#FAF7F2]">
      {/* Brand Header */}
      <div className="space-y-3 text-center">
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#BA4A2C]">
          GHAR SANSAR · BHUJ
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[#1F1916]">
          {mode === 'login' ? 'Sign In to Your Account' : 'Create an Account'}
        </h1>
        <p className="text-xs text-[#7A6F68] font-sans">
          {mode === 'login'
            ? 'Access your orders, saved addresses and curated wishlist.'
            : 'Register for expedited same-day Bhuj doorstep delivery.'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans bg-white p-7 rounded-2xl border border-[#E8DFD6] shadow-xs">
        {mode === 'register' && (
          <>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ketan Patel"
                className="w-full p-3 bg-[#FAF7F2] border border-[#E8DFD6] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98250 XXXXX"
                className="w-full p-3 bg-[#FAF7F2] border border-[#E8DFD6] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7A6F68] mb-1.5">
            Email or Phone
          </label>
          <input
            type="text"
            required
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#E8DFD6] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6F68]">
              Password
            </label>
            {mode === 'login' && (
              <button
                type="button"
                onClick={() => showToast('Password reset instructions sent to your email/phone')}
                className="text-[10px] uppercase tracking-wider text-[#7A6F68] hover:text-[#BA4A2C]"
              >
                Forgot?
              </button>
            )}
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#E8DFD6] rounded-lg text-[#1F1916] focus:border-[#BA4A2C] focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#BA4A2C] hover:bg-[#A33F24] text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-lg shadow-sm"
        >
          <span>{mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Guest Option */}
      <div className="pt-4 border-t border-[#E8DFD6] space-y-4 text-center text-xs font-sans">
        <button
          onClick={handleGuestContinue}
          className="text-xs uppercase tracking-wider text-[#7A6F68] hover:text-[#BA4A2C] underline cursor-pointer"
        >
          Continue as Guest
        </button>

        <div className="text-[#7A6F68] pt-2">
          {mode === 'login' ? (
            <div>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="font-bold text-[#BA4A2C] uppercase tracking-wider hover:underline"
              >
                Register
              </button>
            </div>
          ) : (
            <div>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-[#BA4A2C] uppercase tracking-wider hover:underline"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
