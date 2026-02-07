/**
 * Advanced Visitor Conversion & Engagement System
 * "Lead visitors to do business direct from page" - Ultimate CRO toolkit
 *
 * Features:
 * - Smart CTAs (Call-to-Actions)
 * - Urgency & Scarcity triggers
 * - Social proof elements
 * - One-click purchase optimization
 * - Personalization engine
 */

import type { Product } from "./shopify/types";

/**
 * Smart CTA Generator
 * Creates compelling, action-oriented messaging based on user behavior
 */
export function generateSmartCTA(context: {
  pageType: "home" | "product" | "collection" | "search" | "cart";
  userBehavior?: {
    timeOnPage?: number;
    scrollDepth?: number;
    previousVisits?: number;
    cartValue?: number;
  };
  product?: Product;
}): {
  primary: string;
  secondary: string;
  urgency: string;
  incentive?: string;
} {
  const { pageType, userBehavior, product } = context;

  // Product page - direct conversion focus
  if (pageType === "product" && product) {
    const inStock = product.availableForSale;
    const hasDiscount =
      parseFloat(product.priceRange.minVariantPrice.amount) <
      parseFloat(product.compareAtPriceRange?.minVariantPrice.amount || "0");

    return {
      primary: inStock
        ? "🛒 Add to Cart - Buy Now"
        : "🔔 Notify Me When Available",
      secondary: inStock ? "💳 Express Checkout" : "⭐ Add to Wishlist",
      urgency: inStock
        ? hasDiscount
          ? "⚡ Limited Time Offer - Save Now!"
          : "🔥 Only a few left in stock!"
        : "⏰ Back in stock soon - Join waitlist",
      incentive: hasDiscount
        ? "💰 Special Discount Applied"
        : "✨ Free Shipping Over $50",
    };
  }

  // Cart page - reduce abandonment
  if (pageType === "cart") {
    const value = userBehavior?.cartValue || 0;
    return {
      primary: "🚀 Proceed to Checkout",
      secondary: "🔐 Secure Payment Guaranteed",
      urgency:
        value > 50
          ? "✅ You qualify for FREE shipping!"
          : `💸 Add $${(50 - value).toFixed(2)} more for FREE shipping`,
      incentive: "🎁 Limited time: Get 10% off your first order",
    };
  }

  // Collection/Search - guide to products
  if (pageType === "collection" || pageType === "search") {
    return {
      primary: "👀 Discover Best Sellers",
      secondary: "✨ Shop New Arrivals",
      urgency: "🔥 Trending Now - Don't Miss Out!",
      incentive: "💎 Exclusive deals inside",
    };
  }

  // Home page - first impression
  return {
    primary: "🌟 Shop Now",
    secondary: "🎯 Browse Collections",
    urgency: "⚡ New Arrivals Just Dropped!",
    incentive: "🎁 Welcome Offer: 15% Off First Order",
  };
}

/**
 * Urgency & Scarcity Engine
 * Creates FOMO (Fear of Missing Out) to drive immediate action
 */
export function createUrgencyTrigger(product?: Product): {
  type: "scarcity" | "urgency" | "social-proof" | "limited-time";
  message: string;
  severity: "low" | "medium" | "high";
  icon: string;
} {
  if (!product) {
    return {
      type: "limited-time",
      message: "Limited time offers available",
      severity: "low",
      icon: "⏰",
    };
  }

  // Simulate scarcity (in real app, get from inventory)
  const stockLevel = Math.random() * 100;

  if (stockLevel < 10) {
    return {
      type: "scarcity",
      message: `⚠️ Only ${Math.floor(stockLevel)} left in stock - Order now!`,
      severity: "high",
      icon: "🔥",
    };
  }

  if (stockLevel < 30) {
    return {
      type: "scarcity",
      message: "Low stock - Limited quantities available",
      severity: "medium",
      icon: "⚡",
    };
  }

  // Time-based urgency
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 6) {
    return {
      type: "urgency",
      message: "🌙 Order tonight for next-day delivery!",
      severity: "medium",
      icon: "🚀",
    };
  }

  return {
    type: "social-proof",
    message: "⭐ 500+ customers purchased this week",
    severity: "low",
    icon: "👥",
  };
}

/**
 * Social Proof Generator
 * Builds trust and credibility to increase conversions
 */
export function generateSocialProof(): Array<{
  type: "review" | "purchase" | "visitor" | "trust-badge";
  message: string;
  value?: number | string;
}> {
  return [
    {
      type: "review",
      message: "⭐⭐⭐⭐⭐ Rated 4.8/5 by 10,000+ customers",
      value: 4.8,
    },
    {
      type: "purchase",
      message: "🛍️ 50+ people bought this in the last 24 hours",
      value: 50,
    },
    {
      type: "visitor",
      message: "👀 200+ people viewing this right now",
      value: 200,
    },
    {
      type: "trust-badge",
      message: "🔒 Secure Checkout | 30-Day Returns | Free Shipping",
    },
  ];
}

/**
 * One-Click Purchase Optimizer
 * Reduces friction in the buying process
 */
export function optimizePurchaseFlow(product: Product) {
  return {
    // Quick buy button configuration
    quickBuy: {
      enabled: true,
      text: "⚡ Quick Buy",
      tooltip: "Skip cart - Buy now with one click",
    },

    // Express checkout options
    expressCheckout: {
      applePay: true,
      googlePay: true,
      shopPay: true,
    },

    // Pre-fill cart for instant checkout
    cartPreset: {
      productId: product.id,
      variantId: product.variants[0]?.id,
      quantity: 1,
    },

    // Recommended: Show related products for upsell
    showRelated: true,

    // Auto-apply best discount
    autoDiscount: true,
  };
}

/**
 * Personalization Engine
 * Customize experience based on visitor data
 */
export function personalizeExperience(visitor: {
  isReturning?: boolean;
  location?: string;
  previousPurchases?: number;
  browsingHistory?: string[];
  referralSource?: string;
}) {
  const { isReturning, previousPurchases = 0, referralSource } = visitor;

  return {
    // Greeting message
    greeting: isReturning
      ? previousPurchases > 0
        ? "👋 Welcome back! Check out what's new"
        : "👋 Welcome back! Complete your first order today"
      : "🌟 New here? Enjoy 15% off your first purchase",

    // Recommended collections
    collections: isReturning
      ? ["Your Favorites", "Based on Your History", "New Arrivals"]
      : ["Best Sellers", "Staff Picks", "Customer Favorites"],

    // Special offers
    offers:
      previousPurchases === 0
        ? [
            { type: "first-purchase", discount: 15, code: "WELCOME15" },
            { type: "free-shipping", minimum: 50 },
          ]
        : previousPurchases > 3
          ? [
              { type: "vip", discount: 20, code: "VIP20" },
              { type: "early-access", enabled: true },
            ]
          : [
              { type: "loyalty", points: previousPurchases * 100 },
              { type: "free-shipping", minimum: 50 },
            ],

    // Priority support
    prioritySupport: previousPurchases > 5,

    // Referral tracking
    referralBonus:
      referralSource?.includes("instagram") ||
      referralSource?.includes("facebook")
        ? { enabled: true, bonus: 10, code: "SOCIAL10" }
        : null,
  };
}

/**
 * Landing Page Optimizer
 * Maximize conversion from search/ads
 */
export function optimizeLandingPage(params: {
  source: "google" | "facebook" | "instagram" | "email" | "organic" | "direct";
  campaign?: string;
  keyword?: string;
}) {
  const { source, campaign, keyword } = params;

  return {
    // Hero section
    hero: {
      headline:
        source === "google" && keyword
          ? `🎯 Found what you're looking for: ${keyword}`
          : source === "email"
            ? "📧 Your Exclusive Offer Awaits!"
            : source === "instagram" || source === "facebook"
              ? "📱 Welcome from Social! Here's your special deal"
              : "🌟 Welcome to ScrollVerse Commerce",

      cta: source === "email" ? "Claim Your Offer" : "Shop Now",
      urgency: campaign?.includes("sale") ? "🔥 Sale Ends Soon!" : "",
    },

    // Trust signals
    trustSignals: [
      "✅ Free Shipping on Orders $50+",
      "🔒 Secure Checkout Guaranteed",
      "↩️ 30-Day Easy Returns",
      "⭐ 4.8/5 Rating - 10,000+ Reviews",
    ],

    // Exit intent popup config
    exitIntent: {
      enabled: true,
      delay: 3000, // Show after 3 seconds of exit movement
      offer:
        source === "google" || source === "organic"
          ? "🎁 Wait! Get 10% off your first order"
          : "💎 Special offer just for you!",
    },

    // Sticky bar for conversion
    stickyBar: {
      enabled: true,
      message:
        source === "email"
          ? "📧 Your code: EMAIL10 for 10% off!"
          : "🎉 Limited Time: Free Shipping on All Orders!",
    },
  };
}

/**
 * Real-time engagement triggers
 * Keep visitors engaged and guide them to purchase
 */
export function getEngagementTriggers(pageTime: number, scrollDepth: number) {
  const triggers = [];

  // After 10 seconds, show helpful hint
  if (pageTime > 10) {
    triggers.push({
      type: "hint",
      message: "💡 Tip: Add items to cart for free shipping on orders $50+",
      action: "Show hint popup",
    });
  }

  // After 30 seconds, offer assistance
  if (pageTime > 30) {
    triggers.push({
      type: "assistance",
      message: "👋 Need help finding something? Chat with us!",
      action: "Open live chat",
    });
  }

  // If scrolled 50%, show quick-add bar
  if (scrollDepth > 50) {
    triggers.push({
      type: "quick-action",
      message: "⚡ Quick Add: Tap to add to cart",
      action: "Show sticky add-to-cart bar",
    });
  }

  // After 60 seconds, show limited offer
  if (pageTime > 60) {
    triggers.push({
      type: "offer",
      message: "🎁 Still browsing? Here's 10% off to help you decide!",
      action: "Show discount code popup",
    });
  }

  return triggers;
}

export default {
  generateSmartCTA,
  createUrgencyTrigger,
  generateSocialProof,
  optimizePurchaseFlow,
  personalizeExperience,
  optimizeLandingPage,
  getEngagementTriggers,
};
