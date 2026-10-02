export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  mrp: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Milton' | 'Boss' | 'Ghar Sansar Utility' | 'Cello' | 'Nayasa';
  category: 
    | 'Kitchen & Dining'
    | 'Water Bottles'
    | 'Storage & Containers'
    | 'Cleaning Supplies'
    | 'Home Utility'
    | 'Plastic Products'
    | 'Bathroom Essentials'
    | 'Lunch Boxes'
    | 'Thermoware'
    | 'Daily Essentials';
  subcategory: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isPopularInBhuj?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  imageUrl?: string;
  visualType: string;
  primaryColor: string;
  variants?: ProductVariant[];
  specifications: ProductSpecification[];
  dimensions?: string;
  material: string;
  capacity?: string;
  careInstructions?: string[];
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  houseNumber: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered';

export interface OrderTimelineItem {
  status: OrderStatus;
  time: string;
  done: boolean;
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  address: DeliveryAddress;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  platformFee: number;
  grandTotal: number;
  paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking';
  status: OrderStatus;
  estimatedDelivery: string;
  timeline: OrderTimelineItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  savedAddresses: DeliveryAddress[];
}
