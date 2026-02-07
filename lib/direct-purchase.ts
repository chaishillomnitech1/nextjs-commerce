/**
 * Direct Purchase Flow - "Business Direct From Page"
 * Quantum-level conversion optimization for instant purchases
 *
 * Makes it EXTREMELY easy for visitors to buy immediately from any page
 */

/**
 * Floating Action Button (FAB) Configuration
 * Always-visible buy button that follows the user
 */
export const floatingBuyButton = {
  enabled: true,
  position: "bottom-right" as const,
  text: "🛒 Buy Now",
  style: {
    backgroundColor: "#000",
    color: "#fff",
    pulse: true, // Attention-grabbing animation
    shadow: "large",
  },
  behavior: {
    hideOnCart: true, // Don't show when already in cart
    showAfterScroll: 300, // Show after scrolling 300px
    clickAction: "quick-checkout", // Skip cart, go straight to checkout
  },
};

/**
 * Smart Product Recommendations
 * Show the right product at the right time
 */
export function getSmartRecommendations(context: {
  currentPage: string;
  userHistory?: string[];
  cartItems?: string[];
  timeOfDay?: number;
}) {
  const {
    currentPage,
    userHistory = [],
    timeOfDay = new Date().getHours(),
  } = context;

  // Time-based recommendations
  const timeBasedSuggestions =
    timeOfDay >= 6 && timeOfDay < 12
      ? ["Morning Essentials", "Breakfast Picks"]
      : timeOfDay >= 12 && timeOfDay < 17
        ? ["Afternoon Favorites", "Productivity Boosters"]
        : ["Evening Specials", "Relaxation Collection"];

  return {
    primary: {
      title: "✨ Recommended for You",
      products: ["best-seller-1", "best-seller-2", "best-seller-3"],
      reason:
        userHistory.length > 0
          ? "Based on your browsing history"
          : "Our most popular items",
    },

    secondary: {
      title: timeBasedSuggestions[0],
      products: ["time-based-1", "time-based-2"],
      reason: "Perfect for right now",
    },

    upsell: {
      title: "🎁 Complete Your Order",
      products: ["addon-1", "addon-2"],
      discount: 15,
      message: "Add these items and save 15%",
    },
  };
}

/**
 * One-Click Buy Configuration
 * Amazon-style instant purchase
 */
export const oneClickBuy = {
  enabled: true,
  requirements: {
    savedPayment: true, // Must have saved payment method
    savedAddress: true, // Must have saved shipping address
    emailConfirmation: true, // Send instant confirmation
  },

  button: {
    text: "⚡ Buy Now - One Click",
    color: "#FF9900", // High-contrast, attention-grabbing
    size: "large",
    position: "primary", // Most prominent position
  },

  confirmation: {
    type: "toast", // Non-intrusive confirmation
    message: "✅ Order placed! Check your email for details",
    duration: 5000,
    action: {
      text: "View Order",
      link: "/account/orders",
    },
  },

  // Reduce buyer remorse
  reminder: {
    enabled: true,
    message: "💡 Remember: Free returns within 30 days",
    showFor: 3000,
  },
};

/**
 * Progressive Disclosure Checkout
 * Show only what's needed, when it's needed
 */
export const progressiveCheckout = {
  steps: [
    {
      id: "info",
      title: "Contact",
      fields: ["email"],
      autofill: true,
      estimated: "10 seconds",
    },
    {
      id: "shipping",
      title: "Delivery",
      fields: ["address"],
      autofill: true,
      estimated: "20 seconds",
    },
    {
      id: "payment",
      title: "Payment",
      fields: ["card"],
      autofill: true,
      estimated: "15 seconds",
    },
  ],

  optimization: {
    addressAutocomplete: true,
    cardScanning: true, // Mobile camera card scan
    applePay: true,
    googlePay: true,
    savedMethods: true,
    guestCheckout: true, // Don't force account creation
  },

  progressBar: {
    show: true,
    style: "minimal",
    encouragement: [
      "🚀 Almost there!",
      "✨ One more step!",
      "🎉 Ready to complete!",
    ],
  },
};

/**
 * Micro-Conversions Tracking
 * Track every step toward purchase
 */
export function trackMicroConversion(event: {
  type:
    | "page_view"
    | "product_view"
    | "add_to_cart_hover"
    | "image_zoom"
    | "review_read"
    | "size_selected"
    | "color_selected"
    | "quantity_changed"
    | "add_to_cart_click"
    | "checkout_started"
    | "payment_info_entered"
    | "purchase_completed";
  metadata?: Record<string, unknown>;
}) {
  // Each micro-conversion brings user closer to purchase
  const conversionScore = {
    page_view: 1,
    product_view: 5,
    add_to_cart_hover: 10,
    image_zoom: 15,
    review_read: 20,
    size_selected: 30,
    color_selected: 30,
    quantity_changed: 40,
    add_to_cart_click: 60,
    checkout_started: 80,
    payment_info_entered: 90,
    purchase_completed: 100,
  };

  const score = conversionScore[event.type] || 0;

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Micro-Conversion] ${event.type} - Score: ${score}%`,
      event.metadata,
    );
  }

  // Send to analytics
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    fetch("/api/analytics/micro-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: event.type,
        score,
        timestamp: Date.now(),
        page: window.location.pathname,
        ...event.metadata,
      }),
      keepalive: true,
    }).catch(console.error);
  }

  return score;
}

/**
 * Instant Gratification Elements
 * Provide immediate value to visitors
 */
export const instantGratification = {
  // Show delivery estimate immediately
  deliveryEstimate: {
    enabled: true,
    message: (zipCode?: string) =>
      zipCode
        ? `📦 Delivers to ${zipCode}: Tomorrow by 10 AM`
        : "📦 Enter ZIP for delivery estimate",
    prominence: "high",
  },

  // Show savings in real-time
  savingsCalculator: {
    enabled: true,
    display: "sticky", // Always visible
    format: (original: number, current: number) =>
      `💰 You save $${(original - current).toFixed(2)}!`,
  },

  // Show stock status
  stockIndicator: {
    enabled: true,
    levels: {
      high: "✅ In Stock - Ships Today",
      medium: "⚡ Low Stock - Order Soon",
      low: "🔥 Only 3 Left!",
      out: "📅 Back in Stock: [DATE]",
    },
  },

  // Instant rewards
  rewardsPreview: {
    enabled: true,
    message: (amount: number) =>
      `⭐ Earn ${Math.floor(amount)} points with this purchase`,
    redeemable: "Next order",
  },
};

/**
 * Friction Reducer
 * Remove barriers to purchase
 */
export const frictionReduction = {
  // Auto-apply best discount
  autoDiscount: true,

  // Pre-fill everything possible
  autofill: {
    email: true,
    address: true,
    paymentMethod: true,
    shippingPreferences: true,
  },

  // Reduce form fields to absolute minimum
  minimumFields: true,

  // Allow guest checkout
  guestCheckout: true,

  // Skip unnecessary confirmations
  skipConfirmations: ["newsletter", "sms_marketing"],

  // Instant validation (don't wait for submit)
  instantValidation: true,

  // Smart defaults
  defaults: {
    shipping: "fastest",
    quantity: 1,
    color: "most-popular",
    size: "recommended",
  },
};

/**
 * Mobile-First Purchase Optimization
 * Most traffic is mobile - optimize for it
 */
export const mobileOptimization = {
  // Large tap targets (minimum 44x44px)
  tapTargets: {
    minSize: 44,
    spacing: 8,
  },

  // Thumb-friendly layout
  layout: "bottom-navigation", // Easy to reach

  // Sticky buy button
  stickyBuyButton: {
    enabled: true,
    position: "bottom",
    alwaysVisible: true,
  },

  // Quick view modal
  quickView: {
    enabled: true,
    swipeable: true,
    features: ["images", "variants", "add-to-cart"],
  },

  // Native features
  native: {
    applePay: true,
    googlePay: true,
    autofill: true,
    biometricAuth: true,
  },

  // Reduce scroll distance
  compactLayout: true,

  // Image optimization
  images: {
    lazy: true,
    format: "webp",
    quality: 85,
    pinchZoom: true,
  },
};

export default {
  floatingBuyButton,
  getSmartRecommendations,
  oneClickBuy,
  progressiveCheckout,
  trackMicroConversion,
  instantGratification,
  frictionReduction,
  mobileOptimization,
};
