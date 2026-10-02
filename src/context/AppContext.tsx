import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, DeliveryAddress, Order, UserProfile, OrderStatus } from '../types.ts';
import { products } from '../data/products.ts';
import { checkoutConfig } from '../config/checkoutConfig.ts';
import { triggerMockOrderEmail, MockEmailNotification } from '../utils/mockEmailService.ts';
import { WhatsAppOrderData } from '../components/WhatsAppOrderModal.tsx';

interface NavigationParams {
  productId?: string;
  category?: string;
  brand?: string;
  orderId?: string;
}

interface AppContextType {
  // Navigation
  currentPage: string;
  selectedProductId: string | null;
  selectedCategory: string | null;
  selectedBrand: string | null;
  selectedOrderId: string | null;
  navigateTo: (page: string, params?: NavigationParams) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, deltaOrValue: number, isAbsolute?: boolean) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  platformFee: number;
  grandTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  user: UserProfile | null;
  login: (name: string, email: string, phone: string) => void;
  logout: () => void;
  saveAddress: (address: DeliveryAddress) => void;

  // Orders
  orders: Order[];
  placeOrder: (
    address: DeliveryAddress,
    paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking'
  ) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    customRecipientEmail?: string
  ) => { order: Order; email: MockEmailNotification } | undefined;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // WhatsApp Order & Support Hotline
  whatsAppOrderData: WhatsAppOrderData | null;
  openWhatsAppOrder: (data: WhatsAppOrderData) => void;
  closeWhatsAppOrder: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial realistic demo order for Bhuj store experience
const initialDemoOrders: Order[] = [
  {
    id: 'GS-2026-09281',
    date: 'Yesterday, 04:15 PM',
    items: [
      {
        product: products[0], // Milton Thermosteel Flip Lid 1000ml
        quantity: 1,
        selectedVariant: '1000 ml',
      },
      {
        product: products[16], // Boss Heavy Duty Wonder Bucket 20L
        quantity: 1,
      },
    ],
    address: {
      fullName: 'Bhavin Shah',
      phoneNumber: '+91 98250 12345',
      houseNumber: 'Plot 42, Gayatri Nagar',
      streetArea: 'Near Jubilee Ground, Station Road',
      landmark: 'Behind Swaminarayan Temple',
      city: 'Bhuj',
      state: 'Gujarat',
      pinCode: '370001',
    },
    subtotal: 1315,
    discount: 315,
    deliveryFee: 0,
    platformFee: 0,
    grandTotal: 1315,
    paymentMethod: 'cod',
    status: 'Out for Delivery',
    estimatedDelivery: 'Today by 6:00 PM',
    timeline: [
      { status: 'Placed', time: 'Yesterday, 04:15 PM', done: true, note: 'Order received at Ghar Sansar Bhuj store' },
      { status: 'Confirmed', time: 'Yesterday, 04:45 PM', done: true, note: 'Inventory verified from warehouse' },
      { status: 'Packed', time: 'Today, 09:30 AM', done: true, note: 'Carefully packed with protective bubble wrap' },
      { status: 'Out for Delivery', time: 'Today, 01:15 PM', done: true, note: 'Local delivery partner is on the way' },
      { status: 'Delivered', time: 'Expected by 6:00 PM', done: false, note: 'Safe doorstep delivery' },
    ],
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // WhatsApp Order state
  const [whatsAppOrderData, setWhatsAppOrderData] = useState<WhatsAppOrderData | null>(null);

  const openWhatsAppOrder = (data: WhatsAppOrderData) => {
    setWhatsAppOrderData(data);
  };

  const closeWhatsAppOrder = () => {
    setWhatsAppOrderData(null);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gharsansar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gharsansar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gharsansar_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gharsansar_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('gharsansar_user');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Ketan Patel',
            email: 'ketan.bhuj@example.com',
            phone: '+91 98251 98765',
            savedAddresses: [
              {
                fullName: 'Ketan Patel',
                phoneNumber: '+91 98251 98765',
                houseNumber: '14, Shanti Niketan Society',
                streetArea: 'Mundra Road, Near Jubilee Ground',
                landmark: 'Opp. Commerce College',
                city: 'Bhuj',
                state: 'Gujarat',
                pinCode: '370001',
              },
            ],
          };
    } catch {
      return null;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gharsansar_orders');
      return saved ? JSON.parse(saved) : initialDemoOrders;
    } catch {
      return initialDemoOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gharsansar_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Navigation helper
  const navigateTo = (page: string, params?: NavigationParams) => {
    setCurrentPage(page);
    if (params) {
      if (params.productId !== undefined) setSelectedProductId(params.productId);
      if (params.category !== undefined) setSelectedCategory(params.category);
      if (params.brand !== undefined) setSelectedBrand(params.brand);
      if (params.orderId !== undefined) setSelectedOrderId(params.orderId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant: variant }];
      }
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, deltaOrValue: number, isAbsolute = false) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = isAbsolute ? deltaOrValue : item.quantity + deltaOrValue;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.product.id === productId);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // User actions
  const login = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      name,
      email,
      phone,
      savedAddresses: [
        {
          fullName: name,
          phoneNumber: phone,
          houseNumber: 'Flat 302, Nilkanth Residency',
          streetArea: 'Hospital Road',
          landmark: 'Near Bus Station',
          city: 'Bhuj',
          state: 'Gujarat',
          pinCode: '370001',
        },
      ],
    };
    setUser(newUser);
    localStorage.setItem('gharsansar_user', JSON.stringify(newUser));
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gharsansar_user');
    showToast('Signed out successfully');
  };

  const saveAddress = (address: DeliveryAddress) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      savedAddresses: [address, ...user.savedAddresses.filter((a) => a.houseNumber !== address.houseNumber)],
    };
    setUser(updatedUser);
    localStorage.setItem('gharsansar_user', JSON.stringify(updatedUser));
    showToast('Delivery address updated');
  };

  // Dynamic cart calculations strictly obeying architectural rules
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    const unitPrice = item.selectedVariant
      ? item.product.variants?.find((v) => v.name === item.selectedVariant)?.price ?? item.product.price
      : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const totalMrp = cart.reduce((acc, item) => {
    const unitMrp = item.selectedVariant
      ? item.product.variants?.find((v) => v.name === item.selectedVariant)?.mrp ?? item.product.mrp
      : item.product.mrp;
    return acc + unitMrp * item.quantity;
  }, 0);

  const cartDiscount = Math.max(0, totalMrp - cartSubtotal);

  // Delivery fee logic
  const deliveryFee =
    cartSubtotal >= checkoutConfig.freeDeliveryThreshold || cartSubtotal === 0
      ? 0
      : checkoutConfig.standardDeliveryFee;

  // Platform fee from configuration (default ₹0)
  const platformFee = checkoutConfig.platformFeeEnabled ? checkoutConfig.platformFee : 0;

  // Final Total dynamically computed: Subtotal + Delivery Fee + Platform Fee
  const grandTotal = cartSubtotal + deliveryFee + platformFee;

  // Place order handler
  const placeOrder = (
    address: DeliveryAddress,
    paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking'
  ): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `GS-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      date: 'Just now',
      items: [...cart],
      address,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee,
      platformFee,
      grandTotal,
      paymentMethod,
      status: 'Placed',
      estimatedDelivery: 'Tomorrow by 5:00 PM',
      timeline: [
        {
          status: 'Placed',
          time: 'Just now',
          done: true,
          note: 'Order placed on Ghar Sansar Bhuj Store',
        },
        {
          status: 'Confirmed',
          time: 'Pending confirmation',
          done: false,
          note: 'Store manager verifying stock in Bhuj',
        },
        {
          status: 'Packed',
          time: 'Upcoming',
          done: false,
          note: 'Quality checked and securely boxed',
        },
        {
          status: 'Out for Delivery',
          time: 'Upcoming',
          done: false,
          note: 'Dispatched with local Bhuj delivery partner',
        },
        {
          status: 'Delivered',
          time: 'Tomorrow evening',
          done: false,
          note: 'Delivered to your doorstep',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    triggerMockOrderEmail(newOrder, 'Placed', user?.email);
    clearCart();
    setSelectedOrderId(orderId);
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  const updateOrderStatus = (
    orderId: string,
    newStatus: OrderStatus,
    customRecipientEmail?: string
  ): { order: Order; email: MockEmailNotification } | undefined => {
    const stages: OrderStatus[] = ['Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
    const targetStageIndex = stages.indexOf(newStatus);
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;

    let updatedOrder: Order | undefined;

    setOrders((prev) => {
      const target = prev.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
      if (!target) return prev;

      const updatedTimeline = target.timeline.map((step) => {
        const stepIndex = stages.indexOf(step.status);
        if (stepIndex <= targetStageIndex) {
          return {
            ...step,
            done: true,
            time:
              step.status === newStatus
                ? timeStr
                : step.time.includes('Pending') || step.time.includes('Upcoming')
                ? 'Earlier today'
                : step.time,
          };
        } else {
          return {
            ...step,
            done: false,
          };
        }
      });

      updatedOrder = {
        ...target,
        status: newStatus,
        timeline: updatedTimeline,
      };

      return prev.map((ord) => (ord.id.toLowerCase() === orderId.toLowerCase() ? updatedOrder! : ord));
    });

    const targetOrder = updatedOrder || orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
    if (targetOrder) {
      const email = triggerMockOrderEmail(targetOrder, newStatus, customRecipientEmail || user?.email);
      showToast(`Mock email dispatched: "${newStatus}" update sent to ${email.recipientEmail}`);
      return { order: targetOrder, email };
    }

    return undefined;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedProductId,
        selectedCategory,
        selectedBrand,
        selectedOrderId,
        navigateTo,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        platformFee,
        grandTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        user,
        login,
        logout,
        saveAddress,

        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,

        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,

        toastMessage,
        showToast,

        quickViewProduct,
        openQuickView,
        closeQuickView,

        whatsAppOrderData,
        openWhatsAppOrder,
        closeWhatsAppOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
