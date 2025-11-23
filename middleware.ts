import { NextRequest, NextResponse } from "next/server";

/**
 * Simple in-memory rate limiter using sliding window
 * For production, consider using Redis or a dedicated rate limiting service
 */
class RateLimiterMiddleware {
  private requests: Map<string, number[]>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.requests = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Cleanup old entries periodically
    setInterval(() => this.cleanup(), windowMs);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter(
        (ts) => now - ts < this.windowMs,
      );
      if (validTimestamps.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validTimestamps);
      }
    }
  }

  private getClientKey(request: NextRequest): string {
    // Use IP address as the key, fallback to a default
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    return forwardedFor?.split(",")[0] || realIp || "unknown";
  }

  isRateLimited(request: NextRequest): boolean {
    const key = this.getClientKey(request);
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];

    // Remove timestamps outside the window
    const validTimestamps = timestamps.filter((ts) => now - ts < this.windowMs);

    // Check if rate limit is exceeded
    if (validTimestamps.length >= this.maxRequests) {
      return true;
    }

    // Add current timestamp
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);

    return false;
  }

  getRemainingRequests(request: NextRequest): number {
    const key = this.getClientKey(request);
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const validTimestamps = timestamps.filter((ts) => now - ts < this.windowMs);
    return Math.max(0, this.maxRequests - validTimestamps.length);
  }

  getResetTime(): number {
    return Date.now() + this.windowMs;
  }
}

// Initialize rate limiters for different routes
// NOTE: For production multi-instance deployments, replace this in-memory implementation
// with a distributed solution like Redis or Upstash Rate Limit.
// See ARCHITECTURE.md for scaling recommendations.
const apiRateLimiter = new RateLimiterMiddleware(60000, 100); // 100 requests per minute
const cartRateLimiter = new RateLimiterMiddleware(60000, 50); // 50 cart operations per minute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply stricter rate limiting to cart operations
  if (pathname.startsWith("/api/cart") || pathname.includes("cart")) {
    if (cartRateLimiter.isRateLimited(request)) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Please slow down and try again later",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": "50",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(cartRateLimiter.getResetTime()),
          },
        },
      );
    }

    // Add rate limit headers to response
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", "50");
    response.headers.set(
      "X-RateLimit-Remaining",
      String(cartRateLimiter.getRemainingRequests(request)),
    );
    response.headers.set(
      "X-RateLimit-Reset",
      String(cartRateLimiter.getResetTime()),
    );
    return response;
  }

  // Apply general rate limiting to API routes
  if (pathname.startsWith("/api/")) {
    if (apiRateLimiter.isRateLimited(request)) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Please slow down and try again later",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(apiRateLimiter.getResetTime()),
          },
        },
      );
    }

    // Add rate limit headers to response
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", "100");
    response.headers.set(
      "X-RateLimit-Remaining",
      String(apiRateLimiter.getRemainingRequests(request)),
    );
    response.headers.set(
      "X-RateLimit-Reset",
      String(apiRateLimiter.getResetTime()),
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
