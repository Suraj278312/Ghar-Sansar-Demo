/**
 * Ghar Sansar Store & Checkout Configuration
 * Allows store admins and developers to adjust fees and delivery zones 
 * without modifying core checkout logic.
 */
export interface CheckoutConfig {
  platformFeeEnabled: boolean;
  platformFee: number;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  allowedCities: string[];
  allowedPinCodePrefixes: string[];
  validBhujPinCodes: {
    pinCode: string;
    area: string;
  }[];
}

export const checkoutConfig: CheckoutConfig = {
  // Configurable platform fee (as requested: disabled / ₹0 for demo, dynamically added when enabled)
  platformFeeEnabled: false,
  platformFee: 0,
  
  // Free delivery threshold in ₹
  freeDeliveryThreshold: 499,
  standardDeliveryFee: 40,
  
  // Delivery coverage rules: Currently Bhuj only
  allowedCities: ['bhuj'],
  
  // Bhuj PIN codes in Gujarat always begin with '370'
  allowedPinCodePrefixes: ['370'],
  
  // Primary postal codes across Bhuj town and contiguous suburbs
  validBhujPinCodes: [
    { pinCode: '370001', area: 'Bhuj Main / Darbar Gadh / Station Road' },
    { pinCode: '370020', area: 'Madhapar / Bhuj Extension' },
    { pinCode: '370030', area: 'Mirzapar / Bhuj Rural North' },
    { pinCode: '370040', area: 'Khavda Road / Bhuj Suburbs' },
    { pinCode: '370105', area: 'Sukhpar / Bhuj West' },
    { pinCode: '370110', area: 'Kukma / Bhuj Industrial Belt' },
  ],
};

/**
 * Validates whether an address is within the current Bhuj delivery zone.
 */
export function validateBhujDelivery(city: string, pinCode: string): {
  isDeliverable: boolean;
  message: string;
} {
  const cleanCity = city.trim().toLowerCase();
  const cleanPin = pinCode.trim();

  // Validate PIN code format
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      isDeliverable: false,
      message: 'Please enter a valid 6-digit Indian PIN code.',
    };
  }

  // Check if PIN code starts with 370 (Bhuj postal region)
  const isBhujPin = checkoutConfig.allowedPinCodePrefixes.some((prefix) =>
    cleanPin.startsWith(prefix)
  );

  // Check city name
  const isBhujCity = cleanCity === 'bhuj' || cleanCity.includes('bhuj');

  if (isBhujPin && isBhujCity) {
    const knownArea = checkoutConfig.validBhujPinCodes.find(
      (p) => p.pinCode === cleanPin
    );
    return {
      isDeliverable: true,
      message: knownArea
        ? `Delivering to ${knownArea.area}, Bhuj`
        : 'Delivering across Bhuj (24-48 hrs)',
    };
  }

  return {
    isDeliverable: false,
    message: "Ghar Sansar currently delivers only within Bhuj. We're expanding soon!",
  };
}
