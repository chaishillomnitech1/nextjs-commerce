/**
 * Locking and concurrency control utilities for commerce operations
 * Implements optimistic locking with retry logic to handle concurrent modifications
 */

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 100,
  maxDelay: 2000,
  backoffMultiplier: 2,
};

/**
 * Implements exponential backoff with jitter for retry operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {},
): Promise<T> {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error | undefined;
  let delay = finalConfig.initialDelay;

  for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on last attempt
      if (attempt === finalConfig.maxRetries) {
        break;
      }

      // Add jitter to prevent thundering herd
      const jitter = Math.random() * 0.3 * delay;
      const actualDelay = Math.min(delay + jitter, finalConfig.maxDelay);

      await new Promise((resolve) => setTimeout(resolve, actualDelay));

      // Exponential backoff
      delay = Math.min(
        delay * finalConfig.backoffMultiplier,
        finalConfig.maxDelay,
      );
    }
  }

  throw lastError || new Error("Operation failed after retries");
}

/**
 * Circuit breaker state
 */
interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: "CLOSED" | "OPEN" | "HALF_OPEN";
}

const circuitBreakers = new Map<string, CircuitBreakerState>();

const CIRCUIT_BREAKER_CONFIG = {
  failureThreshold: 5,
  timeout: 60000, // 60 seconds
  halfOpenTimeout: 30000, // 30 seconds
};

/**
 * Circuit breaker pattern implementation for external API calls
 * Prevents cascading failures by failing fast when service is down
 */
export async function withCircuitBreaker<T>(
  key: string,
  operation: () => Promise<T>,
): Promise<T> {
  let breaker = circuitBreakers.get(key);

  if (!breaker) {
    breaker = {
      failures: 0,
      lastFailureTime: 0,
      state: "CLOSED",
    };
    circuitBreakers.set(key, breaker);
  }

  const now = Date.now();

  // Check if circuit should transition from OPEN to HALF_OPEN
  if (
    breaker.state === "OPEN" &&
    now - breaker.lastFailureTime > CIRCUIT_BREAKER_CONFIG.timeout
  ) {
    breaker.state = "HALF_OPEN";
  }

  // Fail fast if circuit is open
  if (breaker.state === "OPEN") {
    throw new Error(`Circuit breaker is OPEN for: ${key}`);
  }

  try {
    const result = await operation();

    // Success - reset circuit breaker
    if (breaker.state === "HALF_OPEN") {
      breaker.state = "CLOSED";
      breaker.failures = 0;
    }

    return result;
  } catch (error) {
    breaker.failures++;
    breaker.lastFailureTime = now;

    // Trip circuit breaker if threshold exceeded
    if (breaker.failures >= CIRCUIT_BREAKER_CONFIG.failureThreshold) {
      breaker.state = "OPEN";
    }

    throw error;
  }
}

/**
 * Rate limiter using token bucket algorithm
 */
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly capacity: number;
  private readonly refillRate: number; // tokens per second

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = timePassed * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  async acquire(tokens: number = 1): Promise<boolean> {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }

    return false;
  }

  async waitForToken(
    tokens: number = 1,
    maxWait: number = 5000,
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWait) {
      if (await this.acquire(tokens)) {
        return;
      }

      // Wait before trying again
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    throw new Error("Rate limit exceeded - timeout waiting for token");
  }
}

// Global rate limiters for different operation types
const rateLimiters = new Map<string, RateLimiter>();

/**
 * Apply rate limiting to an operation
 */
export async function withRateLimit<T>(
  key: string,
  operation: () => Promise<T>,
  options: { capacity?: number; refillRate?: number } = {},
): Promise<T> {
  const { capacity = 10, refillRate = 2 } = options;

  let limiter = rateLimiters.get(key);
  if (!limiter) {
    limiter = new RateLimiter(capacity, refillRate);
    rateLimiters.set(key, limiter);
  }

  await limiter.waitForToken();
  return operation();
}

/**
 * Combine retry logic with circuit breaker and rate limiting
 * This is the main function to use for resilient cart operations
 */
export async function withResilience<T>(
  operationKey: string,
  operation: () => Promise<T>,
  options: {
    retry?: Partial<RetryConfig>;
    useCircuitBreaker?: boolean;
    useRateLimit?: boolean;
    rateLimitConfig?: { capacity?: number; refillRate?: number };
  } = {},
): Promise<T> {
  const {
    retry = {},
    useCircuitBreaker = true,
    useRateLimit = false,
    rateLimitConfig = {},
  } = options;

  let wrappedOperation = operation;

  // Apply rate limiting if enabled
  if (useRateLimit) {
    const originalOp = wrappedOperation;
    wrappedOperation = () =>
      withRateLimit(operationKey, originalOp, rateLimitConfig);
  }

  // Apply circuit breaker if enabled
  if (useCircuitBreaker) {
    const originalOp = wrappedOperation;
    wrappedOperation = () => withCircuitBreaker(operationKey, originalOp);
  }

  // Apply retry logic
  return withRetry(wrappedOperation, retry);
}
