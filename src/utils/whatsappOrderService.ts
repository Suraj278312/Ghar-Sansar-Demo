import { Product, CartItem, DeliveryAddress } from '../types.ts';

export const STORE_WHATSAPP_NUMBER = '919825198765';
export const STORE_DISPLAY_PHONE = '+91 98251 98765';

/**
 * Format a human-readable delivery address string for WhatsApp
 */
export function formatAddressForWhatsApp(address?: DeliveryAddress): string {
  if (!address || !address.streetArea) {
    return 'Doorstep Delivery in Bhuj (Address to be confirmed on chat)';
  }
  const parts = [
    address.houseNumber,
    address.streetArea,
    address.landmark ? `Near ${address.landmark}` : '',
    address.city || 'Bhuj',
    address.pinCode ? `PIN: ${address.pinCode}` : '',
  ].filter(Boolean);

  return parts.join(', ');
}

/**
 * Generate a pre-formatted WhatsApp order message for a single product
 */
export function generateProductWhatsAppMessage(
  product: Product,
  quantity = 1,
  variant?: string,
  address?: DeliveryAddress,
  customerName?: string
): string {
  const activeVariant = product.variants?.find((v) => v.name === variant);
  const unitPrice = activeVariant ? activeVariant.price : product.price;
  const totalPrice = unitPrice * quantity;
  const clientName = customerName || address?.fullName || 'Customer';
  const clientPhone = address?.phoneNumber || 'Will share on chat';
  const addressText = formatAddressForWhatsApp(address);

  return `*🛍️ NEW ORDER INQUIRY - GHAR SANSAR BHUJ*
━━━━━━━━━━━━━━━━━━━━
*Customer:* ${clientName}
*Phone:* ${clientPhone}

*📦 Item Details:*
• *Product:* ${product.name}
• *Brand:* ${product.brand}
${variant ? `• *Size/Variant:* ${variant}\n` : ''}• *Quantity:* ${quantity}
• *Price:* ₹${totalPrice} (₹${unitPrice} each)

*📍 Delivery Address (Bhuj):*
${addressText}

*Payment Mode:* Cash on Delivery (COD) / UPI on Doorstep

Please confirm availability and dispatch time. Thank you!`;
}

/**
 * Generate a pre-formatted WhatsApp order message for an entire cart
 */
export function generateCartWhatsAppMessage(
  cart: CartItem[],
  grandTotal: number,
  deliveryFee: number,
  address?: DeliveryAddress,
  customerName?: string
): string {
  const clientName = customerName || address?.fullName || 'Customer';
  const clientPhone = address?.phoneNumber || 'Will share on chat';
  const addressText = formatAddressForWhatsApp(address);

  const itemsList = cart
    .map((item, idx) => {
      const activeVariant = item.product.variants?.find((v) => v.name === item.selectedVariant);
      const price = activeVariant ? activeVariant.price : item.product.price;
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      return `${idx + 1}. *${item.product.name}*${variantStr}\n   Qty: ${item.quantity} · ₹${price * item.quantity}`;
    })
    .join('\n\n');

  return `*🛍️ NEW MULTI-ITEM ORDER - GHAR SANSAR BHUJ*
━━━━━━━━━━━━━━━━━━━━
*Customer:* ${clientName}
*Phone:* ${clientPhone}
*Total Items:* ${cart.length} item(s)

*📦 Order Summary:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
*💰 Total Amount:* ₹${grandTotal} ${deliveryFee === 0 ? '(Free Delivery in Bhuj)' : `(Includes ₹${deliveryFee} delivery)`}

*📍 Delivery Address (Bhuj):*
${addressText}

*Payment Preference:* Cash on Delivery (COD) / UPI on Arrival

Please confirm this order and let me know when it will be dispatched from your Bhuj store. Thank you!`;
}

/**
 * Generate a general support inquiry message
 */
export function generateSupportWhatsAppMessage(topic?: string): string {
  return `*🙏 Namaste Ghar Sansar Bhuj!*
I have an inquiry regarding ${topic || 'products and doorstep delivery in Bhuj'}.
Could you please assist me? Thank you!`;
}

/**
 * Construct the official wa.me link with encoded message
 */
export function buildWhatsAppLink(message: string, phone = STORE_WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
