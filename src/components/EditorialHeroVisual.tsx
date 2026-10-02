import React, { useState } from 'react';

export const EditorialHeroVisual: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[660px] bg-[#F4F4F4] overflow-hidden select-none border border-[#E5E5E5] group"
    >
      {/* Studio Lighting Background Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-[#F0F0F0] to-[#E6E6E6]" />

      {/* Subtle Studio Architectural Light Falloff */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/[0.03] rounded-full blur-2xl pointer-events-none" />

      {/* SVG High-Impact Product Lifestyle Still Life */}
      <svg
        viewBox="0 0 650 750"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
          isHovered ? 'scale-[1.02]' : 'scale-100'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Architectural Plinth Gradient */}
          <linearGradient id="plinthTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E2E2" />
          </linearGradient>
          <linearGradient id="plinthSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4D4D4" />
            <stop offset="100%" stopColor="#BEBEBE" />
          </linearGradient>

          {/* Flask Brushed Steel Gradients */}
          <linearGradient id="flaskBodySteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5E5E5E" />
            <stop offset="12%" stopColor="#9C9C9C" />
            <stop offset="28%" stopColor="#FFFFFF" />
            <stop offset="48%" stopColor="#D4D4D4" />
            <stop offset="68%" stopColor="#EFEFEF" />
            <stop offset="88%" stopColor="#A8A8A8" />
            <stop offset="100%" stopColor="#4A4A4A" />
          </linearGradient>

          <linearGradient id="flaskCapSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#171717" />
            <stop offset="35%" stopColor="#383838" />
            <stop offset="70%" stopColor="#1F1F1F" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </linearGradient>

          {/* Casserole Stoneware Matte */}
          <linearGradient id="casseroleMatte" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="40%" stopColor="#1E1E1E" />
            <stop offset="100%" stopColor="#101010" />
          </linearGradient>

          {/* Oiled Ash Wood */}
          <linearGradient id="ashWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6D6D6" />
            <stop offset="50%" stopColor="#BFBFBF" />
            <stop offset="100%" stopColor="#9E9E9E" />
          </linearGradient>

          {/* Soft Realistic Contact Shadows */}
          <radialGradient id="softGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Studio Back Wall Hairstyle Lines */}
        <line x1="0" y1="520" x2="650" y2="520" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="480" y1="0" x2="480" y2="750" stroke="#EBEBEB" strokeWidth="1" />

        {/* Monolithic Display Plinth */}
        <polygon points="40,540 580,540 510,630 0,630" fill="url(#plinthTop)" stroke="#E0E0E0" strokeWidth="1" />
        <polygon points="0,630 510,630 510,665 0,665" fill="url(#plinthSide)" />

        {/* Shadows for Objects on Plinth */}
        <ellipse cx="235" cy="565" rx="85" ry="16" fill="url(#softGroundShadow)" />
        <ellipse cx="400" cy="560" rx="110" ry="18" fill="url(#softGroundShadow)" />
        <ellipse cx="120" cy="570" rx="70" ry="14" fill="url(#softGroundShadow)" />

        {/* OBJECT 3 (Background Left): Boss Heavy Modular Organizer Block */}
        <g transform="translate(60, 390)">
          {/* Main Block Top */}
          <polygon points="0,75 110,35 155,55 45,95" fill="#333333" />
          {/* Front Face */}
          <polygon points="0,75 45,95 45,175 0,155" fill="#1C1C1C" />
          {/* Side Face */}
          <polygon points="45,95 155,55 155,135 45,175" fill="#262626" />
          {/* Drawer Handle Grooves */}
          <line x1="55" y1="120" x2="140" y2="90" stroke="#404040" strokeWidth="2" />
          <line x1="55" y1="145" x2="140" y2="115" stroke="#404040" strokeWidth="2" />
          <text x="60" y="80" fill="#737373" fontSize="7" fontWeight="700" letterSpacing="2">
            BOSS · PP-MODULAR
          </text>
        </g>

        {/* OBJECT 2 (Center Right): Milton Galaxia Stoneware & Steel Casserole */}
        <g transform="translate(320, 330)">
          {/* Dish Base Body */}
          <path d="M20 120 Q20 220 95 220 Q170 220 170 120 Z" fill="url(#casseroleMatte)" stroke="#222222" strokeWidth="1" />
          {/* Brushed Stainless Rim */}
          <ellipse cx="95" cy="120" rx="76" ry="22" fill="#E5E5E5" stroke="#8C8C8C" strokeWidth="1" />
          <ellipse cx="95" cy="120" rx="71" ry="19" fill="#171717" />
          {/* Sculpted Lid */}
          <path d="M28 116 Q95 72 162 116" fill="url(#casseroleMatte)" />
          {/* Oiled Turned Wood Knob */}
          <rect x="87" y="74" width="16" height="14" rx="2" fill="url(#ashWood)" stroke="#737373" strokeWidth="0.5" />
          <ellipse cx="95" cy="74" rx="8" ry="3" fill="#D4D4D4" />
          {/* Side Handles */}
          <rect x="6" y="130" width="16" height="10" rx="2" fill="#0A0A0A" />
          <rect x="168" y="130" width="16" height="10" rx="2" fill="#0A0A0A" />
          <text x="95" y="180" textAnchor="middle" fill="#525252" fontSize="7.5" fontWeight="700" letterSpacing="2">
            MILTON GALAXIA
          </text>
          <text x="95" y="192" textAnchor="middle" fill="#404040" fontSize="6" fontWeight="500" letterSpacing="1">
            2500ML HOT POT
          </text>
        </g>

        {/* OBJECT 1 (Foreground Center): Milton Thermosteel Double-Wall Vacuum Flask */}
        <g transform="translate(195, 140)">
          {/* Bottle Shadow Reflection on Steel */}
          <ellipse cx="50" cy="425" rx="46" ry="8" fill="#000000" opacity="0.22" />

          {/* Main Flask Cylinder */}
          <rect x="18" y="90" width="64" height="332" rx="4" fill="url(#flaskBodySteel)" />
          
          {/* Vertical Mirror Reflection Lines */}
          <rect x="28" y="92" width="7" height="326" fill="#FFFFFF" opacity="0.75" />
          <rect x="38" y="92" width="2" height="326" fill="#FFFFFF" opacity="0.4" />
          <rect x="62" y="92" width="3" height="326" fill="#FFFFFF" opacity="0.3" />

          {/* Tapered Flask Shoulder */}
          <polygon points="28,90 72,90 66,48 34,48" fill="url(#flaskBodySteel)" />
          <ellipse cx="50" cy="48" rx="16" ry="4" fill="#D4D4D4" />

          {/* Cap Thread Ring */}
          <rect x="32" y="42" width="36" height="7" rx="1" fill="#737373" />

          {/* Architectural Minimalist Cap */}
          <rect x="30" y="16" width="40" height="28" rx="2" fill="url(#flaskCapSteel)" />
          <line x1="30" y1="30" x2="70" y2="30" stroke="#404040" strokeWidth="1" />
          <rect x="42" y="12" width="16" height="5" rx="1" fill="#0A0A0A" />

          {/* Technical Brand & Capacity Stamping */}
          <text x="50" y="240" textAnchor="middle" fill="#1C1C1C" fontSize="8.5" fontWeight="800" letterSpacing="3">
            MILTON
          </text>
          <text x="50" y="254" textAnchor="middle" fill="#404040" fontSize="6" fontWeight="700" letterSpacing="2">
            THERMOSTEEL
          </text>
          <text x="50" y="266" textAnchor="middle" fill="#737373" fontSize="5.5" fontWeight="500" letterSpacing="1">
            24H VACUUM INSULATION
          </text>
          <line x1="35" y1="274" x2="65" y2="274" stroke="#737373" strokeWidth="0.5" />
          <text x="50" y="284" textAnchor="middle" fill="#525252" fontSize="5" fontWeight="600" letterSpacing="1">
            SUS 304 · 1000 ML
          </text>
        </g>

        {/* Foreground Object 4: Fine Glass Oil Dispenser / Jar */}
        <g transform="translate(130, 390)">
          <rect x="15" y="70" width="38" height="110" rx="3" fill="#FFFFFF" fillOpacity="0.45" stroke="#D4D4D4" strokeWidth="1" />
          <rect x="22" y="55" width="24" height="16" rx="2" fill="#262626" />
          <path d="M30 55 L30 38 L34 38 L34 55 Z" fill="#737373" />
          <rect x="20" y="90" width="28" height="60" rx="1" fill="#E5E5E5" fillOpacity="0.5" />
        </g>

        {/* Editorial Corner Typography Annotations */}
        <g transform="translate(36, 695)">
          <text x="0" y="0" fill="#0A0A0A" fontSize="9.5" fontWeight="800" letterSpacing="1.5">
            EXHIBIT // DOMESTIC STILL LIFE 01
          </text>
          <text x="0" y="14" fill="#737373" fontSize="7.5" fontWeight="500">
            Vacuum Insulated Stainless Steel &amp; Heavy Polymers · Bhuj, Gujarat
          </text>
        </g>

        <g transform="translate(614, 695)" textAnchor="end">
          <text x="0" y="0" fill="#737373" fontSize="7.5" fontWeight="600" letterSpacing="1">
            INVENTORY ACTIVE
          </text>
          <text x="0" y="14" fill="#0A0A0A" fontSize="9" fontWeight="800" letterSpacing="1.5">
            GHAR SANSAR RETAIL
          </text>
        </g>
      </svg>

      {/* Floating Pill Badge: Authentic Retail Label */}
      <div className="absolute top-6 left-6 px-3 py-1.5 bg-white/90 backdrop-blur-xs border border-[#E5E5E5] text-[10px] uppercase font-mono tracking-widest text-[#0A0A0A]">
        SERIES 2026 // STILL LIFE
      </div>

      <div className="absolute bottom-6 right-6 hidden sm:block text-right">
        <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase block">
          CURATED ESSENTIALS
        </span>
        <span className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
          BHUJ · STORE ARCHIVE
        </span>
      </div>
    </div>
  );
};
