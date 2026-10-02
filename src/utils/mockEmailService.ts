import { Order, OrderStatus } from '../types.ts';

export interface MockEmailNotification {
  id: string;
  orderId: string;
  recipientEmail: string;
  recipientName: string;
  sender: string;
  subject: string;
  previewText: string;
  status: OrderStatus;
  sentAt: string;
  headline: string;
  subheadline: string;
  message: string;
  eta: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }[];
  shippingAddress: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
}

const STORAGE_KEY = 'gharsansar_mock_emails';

// Human-readable formatted time
function formatCurrentTime(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return `Today, ${now.toLocaleTimeString('en-US', options)}`;
}

// Status-specific content generator
function getStatusDetails(status: OrderStatus, order: Order) {
  switch (status) {
    case 'Placed':
      return {
        subject: `Order Confirmed: We've received your Ghar Sansar order #${order.id}`,
        previewText: `Thank you for your order #${order.id}. Our Bhuj store team has received your request.`,
        headline: 'Thank You for Your Order!',
        subheadline: 'Your order has been placed successfully with Ghar Sansar Bhuj.',
        message:
          'We have received your order at our main retail store near Jubilee Ground, Bhuj. Our inventory team is reviewing the domestic essentials you selected and checking stock for immediate packing.',
      };
    case 'Confirmed':
      return {
        subject: `Order Verified: #${order.id} is confirmed by Ghar Sansar Bhuj`,
        previewText: `Items verified in stock at Bhuj warehouse for order #${order.id}.`,
        headline: 'Your Order is Confirmed & Reserved',
        subheadline: 'All merchandise has been verified against our physical store inventory.',
        message:
          'Good news! Every product in your order has been verified as 100% authentic and reserved for you. An authorized packing specialist has been assigned to prepare your carton.',
      };
    case 'Packed':
      return {
        subject: `Packed & Quality Checked: Order #${order.id} is ready for dispatch`,
        previewText: `Your package for #${order.id} has been carefully boxed and sealed.`,
        headline: 'Your Items are Securely Packed',
        subheadline: 'Packaged with protective wrap and sealed for safe transit.',
        message:
          'Your domestic essentials have passed inspection and are safely packed with shock-absorbing protective wrap. The parcel has been labeled and moved to our dispatch staging area for courier collection.',
      };
    case 'Out for Delivery':
      return {
        subject: `Out for Delivery: Your order #${order.id} is on the way in Bhuj!`,
        previewText: `Our local rider is on the way to ${order.address.streetArea}, Bhuj.`,
        headline: 'Our Delivery Partner is on the Way!',
        subheadline: 'Expected doorstep arrival within 1 to 3 hours.',
        message:
          `Your package is currently in transit with our dedicated Bhuj delivery partner heading towards ${order.address.streetArea}. If paying by Cash on Delivery or UPI, please have cash or your UPI app ready upon arrival.`,
      };
    case 'Delivered':
      return {
        subject: `Delivered: Your order #${order.id} has arrived at your doorstep!`,
        previewText: `Order #${order.id} was handed over successfully in Bhuj.`,
        headline: 'Package Delivered Successfully',
        subheadline: 'Delivered to your address in Bhuj, Gujarat.',
        message:
          'Your package has been successfully delivered and handed over. We hope you enjoy your new household essentials from Ghar Sansar. If you need any assistance or 3-day exchange, our store is here to help!',
      };
  }
}

/**
 * Trigger a mock email notification for an order status change.
 * Stores the email in localStorage and returns the formatted email payload.
 */
export function triggerMockOrderEmail(
  order: Order,
  newStatus: OrderStatus,
  customRecipientEmail?: string
): MockEmailNotification {
  const details = getStatusDetails(newStatus, order);
  const emailId = `EMAIL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const recipientEmail =
    customRecipientEmail ||
    (order.address.fullName.toLowerCase().replace(/\s+/g, '.') + '@example.com');

  const emailNotification: MockEmailNotification = {
    id: emailId,
    orderId: order.id,
    recipientEmail,
    recipientName: order.address.fullName,
    sender: 'Ghar Sansar Bhuj <orders@gharsansarbhuj.com>',
    subject: details.subject,
    previewText: details.previewText,
    status: newStatus,
    sentAt: formatCurrentTime(),
    headline: details.headline,
    subheadline: details.subheadline,
    message: details.message,
    eta: order.estimatedDelivery,
    items: order.items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      variant: item.selectedVariant,
    })),
    shippingAddress: `${order.address.houseNumber}, ${order.address.streetArea}${
      order.address.landmark ? ', ' + order.address.landmark : ''
    }, ${order.address.city}, Gujarat - ${order.address.pinCode}`,
    paymentMethod:
      order.paymentMethod === 'cod'
        ? 'Cash on Delivery (COD) / UPI at Doorstep'
        : order.paymentMethod.toUpperCase(),
    subtotal: order.subtotal,
    discount: order.discount,
    deliveryFee: order.deliveryFee,
    totalAmount: order.grandTotal,
  };

  saveMockEmail(emailNotification);
  return emailNotification;
}

/**
 * Save an email notification to localStorage
 */
export function saveMockEmail(email: MockEmailNotification): void {
  try {
    const existing = getAllMockEmails();
    const updated = [email, ...existing];
    // Keep last 40 emails
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 40)));
  } catch (err) {
    console.error('Failed to save mock email to localStorage', err);
  }
}

/**
 * Retrieve all stored mock emails
 */
export function getAllMockEmails(): MockEmailNotification[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load mock emails', err);
    return [];
  }
}

/**
 * Retrieve mock emails for a specific order
 */
export function getMockEmailsForOrder(orderId: string): MockEmailNotification[] {
  const all = getAllMockEmails();
  return all.filter((e) => e.orderId.toLowerCase() === orderId.toLowerCase());
}

/**
 * Clear mock emails
 */
export function clearMockEmails(orderId?: string): void {
  try {
    if (orderId) {
      const all = getAllMockEmails();
      const filtered = all.filter((e) => e.orderId.toLowerCase() !== orderId.toLowerCase());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to clear mock emails', err);
  }
}
