/**
 * Web Vitals Reporting
 * Track Core Web Vitals for performance optimization and conversion rate improvement
 *
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FID (First Input Delay) - Interactivity
 * - FCP (First Contentful Paint) - Loading
 * - LCP (Largest Contentful Paint) - Loading
 * - TTFB (Time to First Byte) - Server response
 * - INP (Interaction to Next Paint) - Responsiveness
 */

type Metric = {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  entries: PerformanceEntry[];
};

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Send to analytics in production
  // This maximizes monetization by tracking performance metrics
  // that directly correlate with conversion rates
  if (process.env.NODE_ENV === "production") {
    // Example: Send to Google Analytics, Vercel Analytics, or custom endpoint
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      page: window.location.pathname,
    });

    // Use sendBeacon for reliability (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/vitals", body);
    } else {
      // Fallback to fetch
      fetch("/api/analytics/vitals", {
        body,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(console.error);
    }
  }
}

// Export for use in _app or layout
export default reportWebVitals;
