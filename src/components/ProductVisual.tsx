import React from 'react';
import { Product } from '../types.ts';

interface ProductVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'rail';
  className?: string;
  zoom?: boolean;
}

// Curated high-resolution demo photography mapping for authentic Indian household retail catalog
const visualTypeFallbackImages: Record<string, string> = {
  'thermosteel-silver': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  'steel-matte': 'https://images.unsplash.com/photo-1570831739421-2efb6976664e?auto=format&fit=crop&w=800&q=80',
  'copper-bottle': 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
  'casserole-steel': 'https://images.unsplash.com/photo-1584990347449-399d254f16a5?auto=format&fit=crop&w=800&q=80',
  'casserole-classic': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
  'casserole-set': 'https://images.unsplash.com/photo-1584990347449-399d254f16a5?auto=format&fit=crop&w=800&q=80',
  'bucket-blue': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'bucket-pastel': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'spin-mop': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  'pedal-dustbin': 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
  'swing-bin': 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
  'drawer-storage': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
  'masala-dabba': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
  'bath-stool': 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
  'electric-tiffin': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
  'lunch-bag-set': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  'bento-box': 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
  'oil-pourer': 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80',
  'cutting-board': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  'strainer': 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=800&q=80',
  'storage-box': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  'drying-stand': 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
  'cylinder-trolley': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  'laundry-basket': 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
  'bath-mat': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
};

const categoryFallbackImages: Record<string, string> = {
  'Kitchen & Dining': 'https://images.unsplash.com/photo-1584990347449-399d254f16a5?auto=format&fit=crop&w=800&q=80',
  'Water Bottles': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  'Storage & Containers': 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
  'Cleaning Supplies': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  'Home Utility': 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
  'Plastic Products': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  'Bathroom Essentials': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'Lunch Boxes': 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
  'Thermoware': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
  'Daily Essentials': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
};

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  size = 'md',
  className = '',
  zoom = false,
}) => {
  const { visualType, brand, name, imageUrl, category } = product;
  const [imageError, setImageError] = React.useState(false);

  // Pick specific product imageUrl or matching high quality demo image
  const activeImage =
    imageUrl ||
    (visualType && visualTypeFallbackImages[visualType]) ||
    (category && categoryFallbackImages[category]);

  // Sizing definitions with generous editorial ratios
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-full aspect-[4/5]',
    lg: 'w-full aspect-[1/1] sm:aspect-[4/5]',
    rail: 'w-full aspect-[4/5]',
  };

  // Pure monochrome & architectural editorial vector rendering
  // Rendered with subtle lighting, neutral slate/monochrome reflections, clean brushed finishes
  const renderProductGraphic = () => {
    switch (visualType) {
      case 'thermosteel-silver':
      case 'steel-matte':
        return (
          <svg viewBox="0 0 200 250" className="w-full h-full select-none" fill="none">
            <defs>
              <linearGradient id={`monoSteel-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A8A8A" />
                <stop offset="25%" stopColor="#ECECEC" />
                <stop offset="50%" stopColor="#D4D4D4" />
                <stop offset="85%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#737373" />
              </linearGradient>
              <linearGradient id={`monoCap-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#171717" />
                <stop offset="50%" stopColor="#404040" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
            </defs>
            {/* Ground shadow */}
            <ellipse cx="100" cy="235" rx="38" ry="6" fill="#000" opacity="0.07" />
            {/* Bottle Cylinder */}
            <rect x="74" y="75" width="52" height="152" rx="4" fill={`url(#monoSteel-${product.id})`} />
            {/* Neck */}
            <path d="M82 75 L82 52 L118 52 L118 75 Z" fill={`url(#monoSteel-${product.id})`} />
            {/* Screw Cap */}
            <rect x="79" y="36" width="42" height="18" rx="2" fill={`url(#monoCap-${product.id})`} />
            {/* Subtle Sheen Line */}
            <rect x="84" y="78" width="5" height="146" fill="#FFFFFF" opacity="0.45" />
            {/* Subtle Brand Typography */}
            <text x="100" y="150" textAnchor="middle" fill="#262626" fontSize="7.5" fontWeight="700" letterSpacing="2">
              {brand.toUpperCase()}
            </text>
            <text x="100" y="160" textAnchor="middle" fill="#737373" fontSize="5.5" fontWeight="500" letterSpacing="1">
              VACUUM STEEL
            </text>
          </svg>
        );

      case 'copper-bottle':
        return (
          <svg viewBox="0 0 200 250" className="w-full h-full select-none" fill="none">
            <defs>
              <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2E241E" />
                <stop offset="30%" stopColor="#785E4F" />
                <stop offset="60%" stopColor="#A88B79" />
                <stop offset="90%" stopColor="#4A3B32" />
                <stop offset="100%" stopColor="#261E19" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="235" rx="36" ry="6" fill="#000" opacity="0.08" />
            <rect x="76" y="72" width="48" height="155" rx="3" fill="url(#bronzeGrad)" />
            <path d="M84 72 L84 52 L116 52 L116 72 Z" fill="url(#bronzeGrad)" />
            <rect x="81" y="38" width="38" height="16" rx="2" fill="#1C1613" />
            <rect x="86" y="75" width="4" height="148" fill="#FFFFFF" opacity="0.3" />
            <text x="100" y="152" textAnchor="middle" fill="#1C1613" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
              MILTON
            </text>
            <text x="100" y="162" textAnchor="middle" fill="#3D3028" fontSize="5" fontWeight="600" letterSpacing="1">
              PURE COPPER
            </text>
          </svg>
        );

      case 'casserole-steel':
      case 'casserole-classic':
      case 'casserole-set':
        return (
          <svg viewBox="0 0 220 220" className="w-full h-full select-none" fill="none">
            <defs>
              <linearGradient id={`casseroleGrad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#525252" />
                <stop offset="35%" stopColor="#F5F5F5" />
                <stop offset="65%" stopColor="#D4D4D4" />
                <stop offset="100%" stopColor="#404040" />
              </linearGradient>
            </defs>
            <ellipse cx="110" cy="190" rx="68" ry="9" fill="#000" opacity="0.08" />
            {/* Body */}
            <path d="M46 115 Q46 180 110 180 Q174 180 174 115 Z" fill={`url(#casseroleGrad-${product.id})`} />
            {/* Handles */}
            <rect x="30" y="125" width="18" height="12" rx="2" fill="#171717" />
            <rect x="172" y="125" width="18" height="12" rx="2" fill="#171717" />
            {/* Rim */}
            <ellipse cx="110" cy="115" rx="64" ry="18" fill="#E5E5E5" stroke="#A3A3A3" strokeWidth="1" />
            {/* Lid */}
            <path d="M52 113 Q110 74 168 113" fill={`url(#casseroleGrad-${product.id})`} />
            {/* Knob */}
            <ellipse cx="110" cy="78" rx="12" ry="6" fill="#0A0A0A" />
            <rect x="107" y="80" width="6" height="8" fill="#262626" />
            <text x="110" y="152" textAnchor="middle" fill="#262626" fontSize="8" fontWeight="700" letterSpacing="1.5">
              {brand.toUpperCase()}
            </text>
          </svg>
        );

      case 'bucket-blue':
      case 'bucket-pastel':
        return (
          <svg viewBox="0 0 200 220" className="w-full h-full select-none" fill="none">
            <defs>
              <linearGradient id="bucketMono" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#262626" />
                <stop offset="40%" stopColor="#525252" />
                <stop offset="80%" stopColor="#171717" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="196" rx="46" ry="8" fill="#000" opacity="0.08" />
            <path d="M50 70 L65 190 Q100 198 135 190 L150 70 Z" fill="url(#bucketMono)" />
            <ellipse cx="100" cy="70" rx="50" ry="12" fill="#404040" stroke="#737373" strokeWidth="1" />
            <path d="M46 76 Q100 16 154 76" stroke="#A3A3A3" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="88" y="24" width="24" height="7" rx="2" fill="#0A0A0A" />
            <text x="100" y="138" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700" letterSpacing="1.5">
              BOSS
            </text>
            <text x="100" y="148" textAnchor="middle" fill="#A3A3A3" fontSize="5.5" fontWeight="500">
              HEAVY UTILITY
            </text>
          </svg>
        );

      case 'spin-mop':
        return (
          <svg viewBox="0 0 220 220" className="w-full h-full select-none" fill="none">
            <ellipse cx="110" cy="190" rx="72" ry="10" fill="#000" opacity="0.08" />
            <rect x="44" y="110" width="132" height="70" rx="6" fill="#171717" />
            <rect x="48" y="114" width="60" height="62" rx="4" fill="#262626" />
            {/* Stainless wringer */}
            <circle cx="140" cy="142" r="22" fill="#E5E5E5" stroke="#737373" strokeWidth="1" />
            <circle cx="140" cy="142" r="13" fill="#D4D4D4" stroke="#525252" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M72 110 Q110 65 148 110" stroke="#404040" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Handle */}
            <line x1="140" y1="142" x2="182" y2="40" stroke="#737373" strokeWidth="4" strokeLinecap="round" />
            <text x="78" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700" letterSpacing="1">BOSS</text>
          </svg>
        );

      case 'pedal-dustbin':
      case 'swing-bin':
        return (
          <svg viewBox="0 0 200 220" className="w-full h-full select-none" fill="none">
            <ellipse cx="100" cy="198" rx="42" ry="7" fill="#000" opacity="0.07" />
            <rect x="66" y="70" width="68" height="122" rx="4" fill="#262626" />
            <ellipse cx="100" cy="70" rx="34" ry="8" fill="#171717" />
            <path d="M64 68 Q100 60 136 68" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
            <rect x="88" y="190" width="24" height="5" rx="1" fill="#737373" />
            <text x="100" y="132" textAnchor="middle" fill="#737373" fontSize="7" fontWeight="600" letterSpacing="1">BOSS</text>
          </svg>
        );

      case 'drawer-storage':
        return (
          <svg viewBox="0 0 200 220" className="w-full h-full select-none" fill="none">
            <ellipse cx="100" cy="206" rx="48" ry="6" fill="#000" opacity="0.08" />
            <rect x="58" y="36" width="84" height="162" rx="4" fill="#171717" />
            <rect x="63" y="42" width="74" height="34" rx="2" fill="#F5F5F5" />
            <rect x="92" y="55" width="16" height="4" rx="1" fill="#737373" />
            <rect x="63" y="80" width="74" height="34" rx="2" fill="#E5E5E5" />
            <rect x="92" y="93" width="16" height="4" rx="1" fill="#737373" />
            <rect x="63" y="118" width="74" height="34" rx="2" fill="#D4D4D4" />
            <rect x="92" y="131" width="16" height="4" rx="1" fill="#737373" />
            <rect x="63" y="156" width="74" height="34" rx="2" fill="#A3A3A3" />
            <rect x="92" y="169" width="16" height="4" rx="1" fill="#404040" />
          </svg>
        );

      case 'masala-dabba':
        return (
          <svg viewBox="0 0 220 220" className="w-full h-full select-none" fill="none">
            <ellipse cx="110" cy="180" rx="72" ry="12" fill="#000" opacity="0.08" />
            <ellipse cx="110" cy="120" rx="70" ry="34" fill="#F5F5F5" stroke="#A3A3A3" strokeWidth="1" />
            <path d="M40 120 L40 142 Q110 180 180 142 L180 120 Z" fill="#D4D4D4" />
            <ellipse cx="110" cy="120" rx="16" ry="8" fill="#525252" opacity="0.3" stroke="#737373" />
            <ellipse cx="82" cy="110" rx="13" ry="7" fill="#525252" opacity="0.3" stroke="#737373" />
            <ellipse cx="138" cy="110" rx="13" ry="7" fill="#525252" opacity="0.3" stroke="#737373" />
            <ellipse cx="82" cy="130" rx="13" ry="7" fill="#525252" opacity="0.3" stroke="#737373" />
            <ellipse cx="138" cy="130" rx="13" ry="7" fill="#525252" opacity="0.3" stroke="#737373" />
            <text x="110" y="162" textAnchor="middle" fill="#262626" fontSize="7" fontWeight="600" letterSpacing="1">
              GHAR SANSAR
            </text>
          </svg>
        );

      case 'bath-stool':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none" fill="none">
            <ellipse cx="100" cy="178" rx="48" ry="6" fill="#000" opacity="0.08" />
            <path d="M62 90 L55 170 L65 170 L72 90 Z" fill="#262626" />
            <path d="M138 90 L145 170 L135 170 L128 90 Z" fill="#262626" />
            <ellipse cx="100" cy="85" rx="46" ry="14" fill="#404040" />
            <circle cx="92" cy="85" r="2.5" fill="#FFFFFF" opacity="0.4" />
            <circle cx="100" cy="85" r="2.5" fill="#FFFFFF" opacity="0.4" />
            <circle cx="108" cy="85" r="2.5" fill="#FFFFFF" opacity="0.4" />
            <text x="100" y="130" textAnchor="middle" fill="#A3A3A3" fontSize="7" fontWeight="700">BOSS</text>
          </svg>
        );

      case 'electric-tiffin':
      case 'lunch-bag-set':
      case 'bento-box':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none" fill="none">
            <ellipse cx="100" cy="178" rx="50" ry="8" fill="#000" opacity="0.08" />
            <rect x="56" y="65" width="88" height="106" rx="8" fill="#171717" />
            <path d="M78 65 Q100 35 122 65" stroke="#0A0A0A" strokeWidth="4" fill="none" strokeLinecap="round" />
            <line x1="56" y1="90" x2="144" y2="90" stroke="#404040" strokeWidth="1.5" strokeDasharray="3 2" />
            <rect x="66" y="105" width="68" height="52" rx="4" fill="#262626" />
            <text x="100" y="134" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" letterSpacing="1">
              {brand.toUpperCase()}
            </text>
            <text x="100" y="144" textAnchor="middle" fill="#737373" fontSize="5.5">
              INSULATED
            </text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none" fill="none">
            <ellipse cx="100" cy="174" rx="44" ry="7" fill="#000" opacity="0.06" />
            <rect x="65" y="60" width="70" height="105" rx="4" fill="#262626" />
            <rect x="61" y="52" width="78" height="12" rx="2" fill="#171717" />
            <text x="100" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="700" letterSpacing="1">
              {brand.toUpperCase()}
            </text>
            <text x="100" y="125" textAnchor="middle" fill="#737373" fontSize="5">
              ESSENTIAL
            </text>
          </svg>
        );
    }
  };

  const hasImage = Boolean(activeImage && !imageError);

  return (
    <div
      className={`relative flex items-center justify-center bg-[#F7F7F7] overflow-hidden group select-none ${
        hasImage ? 'p-0' : 'p-6'
      } ${sizeClasses[size]} ${className}`}
    >
      {/* Editorial image display */}
      <div
        className={`w-full h-full flex items-center justify-center transition-transform duration-700 ease-out ${
          zoom ? 'scale-110' : 'group-hover:scale-104'
        }`}
      >
        {hasImage ? (
          <img
            src={activeImage}
            alt={name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover filter contrast-[1.02]"
          />
        ) : (
          renderProductGraphic()
        )}
      </div>

      {/* Discreet Out of Stock notice */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex items-center justify-center">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#737373]">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
};
