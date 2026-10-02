import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.tsx';
import { EditorialHeroVisual } from './EditorialHeroVisual.tsx';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();

  // Animation variants for sophisticated staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const, // Smooth settling curve
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.25,
      },
    },
  };

  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between border-b border-[#E5E5E5] px-4 sm:px-8 pt-8 lg:pt-14 pb-8 select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        {/* Left Column: Staggered Minimal Bold Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8 max-w-xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#0A0A0A]" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#737373]">
              GHAR SANSAR · BHUJ, GUJARAT
            </span>
          </motion.div>

          {/* Masked High-Impact Headline */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-[#0A0A0A] leading-[0.98] uppercase">
              <span className="block">EVERYTHING</span>
              <span className="block">YOUR HOME</span>
              <span className="block">NEEDS.</span>
            </h1>
          </motion.div>

          {/* Editorial Supporting Prose */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#737373] leading-relaxed max-w-lg font-normal"
          >
            Thoughtfully selected household, kitchen, storage and everyday essentials — now
            available online across Bhuj.
          </motion.p>

          {/* Staggered CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 group shadow-xs hover:shadow-md"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              onClick={() => navigateTo('categories')}
              className="px-7 py-4 bg-transparent hover:bg-[#F7F7F7] text-[#0A0A0A] border border-[#E5E5E5] text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
            >
              EXPLORE CATEGORIES
            </button>
          </motion.div>

          {/* Footnote Specifications */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-[#E5E5E5] flex flex-wrap items-center gap-6 text-[11px] tracking-wider uppercase text-[#737373] font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>BHUJ DELIVERY (370XXX)</span>
            </div>
            <span className="text-[#D4D4D4]">/</span>
            <div>SAME-DAY STORE DISPATCH</div>
            <span className="text-[#D4D4D4]">/</span>
            <div>ORIGINAL MILTON &amp; BOSS</div>
          </motion.div>
        </motion.div>

        {/* Right Column: High-Quality Product-Focused Lifestyle Still Life */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 w-full"
        >
          <EditorialHeroVisual />
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="max-w-7xl mx-auto w-full pt-6 flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#737373]"
      >
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3 h-3 animate-bounce" />
          <span>SCROLL TO EXPLORE ARCHIVE</span>
        </div>
        <div className="hidden sm:block">
          CURATED DOMESTIC OBJECTS // ISSUE 2026
        </div>
      </motion.div>
    </section>
  );
};
