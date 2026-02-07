/**
 * Conversion Rate Optimization (CRO) Utilities
 * Maximize monetization through data-driven optimizations
 */

/**
 * Track conversion events for monetization analytics
 */
export function trackConversion(event: {
  type: "view_item" | "add_to_cart" | "begin_checkout" | "purchase";
  value?: number;
  currency?: string;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  metadata?: Record<string, unknown>;
}) {
  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Conversion Event]", event.type, event);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    // Google Analytics 4 example
    if ("gtag" in window) {
      (window as any).gtag("event", event.type, {
        value: event.value,
        currency: event.currency || "USD",
        items: event.items,
        ...event.metadata,
      });
    }

    // Custom analytics endpoint
    fetch("/api/analytics/conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...event,
        timestamp: Date.now(),
        page: window.location.pathname,
        referrer: document.referrer,
      }),
      keepalive: true,
    }).catch(console.error);
  }
}

/**
 * A/B Testing variant selector
 * Maximize conversion rates through experimentation
 */
export function getABTestVariant(
  testId: string,
  variants: string[] = ["A", "B"],
): string {
  if (typeof window === "undefined") {
    return variants[0]; // Default for SSR
  }

  // Check for existing variant in localStorage
  const storageKey = `ab_test_${testId}`;
  const stored = localStorage.getItem(storageKey);

  if (stored && variants.includes(stored)) {
    return stored;
  }

  // Assign new variant randomly
  const variant = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(storageKey, variant);

  // Track variant assignment
  trackConversion({
    type: "view_item",
    metadata: {
      ab_test: testId,
      variant,
    },
  });

  return variant;
}

/**
 * Performance monitoring for conversion optimization
 * Slow pages = lower conversions
 */
export function trackPagePerformance() {
  if (
    typeof window === "undefined" ||
    typeof window.performance === "undefined"
  ) {
    return;
  }

  // Wait for page to fully load
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      // Track if page is slow (impacts conversion)
      if (pageLoadTime > 3000) {
        // Page took more than 3 seconds
        console.warn("Slow page load detected:", pageLoadTime, "ms");
      }

      // Send performance data
      trackConversion({
        type: "view_item",
        metadata: {
          performance: {
            pageLoadTime,
            connectTime,
            renderTime,
          },
        },
      });
    }, 0);
  });
}

/**
 * Cart abandonment tracking for recovery campaigns
 * Critical for maximizing revenue
 */
export function trackCartAbandonment(cart: {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
}) {
  if (typeof window === "undefined") return;

  // Store cart data for potential recovery
  localStorage.setItem(
    "abandoned_cart",
    JSON.stringify({
      cart,
      timestamp: Date.now(),
      page: window.location.pathname,
    }),
  );

  // Track abandonment event
  trackConversion({
    type: "add_to_cart",
    value: cart.total,
    items: cart.items,
    metadata: {
      abandoned: true,
    },
  });
}

/**
 * Exit intent detection for conversion optimization
 */
export function detectExitIntent(callback: () => void) {
  if (typeof window === "undefined") return;

  let hasTriggered = false;

  const handleMouseLeave = (e: MouseEvent) => {
    // Detect if mouse is leaving from top of page (navigation bar area)
    if (!hasTriggered && e.clientY <= 0) {
      hasTriggered = true;
      callback();
    }
  };

  document.addEventListener("mouseleave", handleMouseLeave);

  // Cleanup
  return () => {
    document.removeEventListener("mouseleave", handleMouseLeave);
  };
}

export default {
  trackConversion,
  getABTestVariant,
  trackPagePerformance,
  trackCartAbandonment,
  detectExitIntent,
};
