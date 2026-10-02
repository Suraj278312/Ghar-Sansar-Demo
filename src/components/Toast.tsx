import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-16 md:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#0A0A0A] text-white text-xs font-medium tracking-wide shadow-xl border border-[#262626] animate-in fade-in slide-in-from-bottom-2 duration-200">
      <Check className="w-3.5 h-3.5 text-white shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};
