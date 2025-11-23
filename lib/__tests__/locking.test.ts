/**
 * Tests for locking and resilience utilities
 * These tests demonstrate the functionality of retry, circuit breaker, and rate limiting
 */

import {
  withCircuitBreaker,
  withRateLimit,
  withResilience,
  withRetry,
} from "../locking";

describe("Locking and Resilience Utilities", () => {
  describe("withRetry", () => {
    it("should succeed on first attempt if operation succeeds", async () => {
      const operation = jest.fn().mockResolvedValue("success");

      const result = await withRetry(operation);

      expect(result).toBe("success");
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it("should retry on failure and eventually succeed", async () => {
      const operation = jest
        .fn()
        .mockRejectedValueOnce(new Error("fail 1"))
        .mockRejectedValueOnce(new Error("fail 2"))
        .mockResolvedValue("success");

      const result = await withRetry(operation, {
        maxRetries: 3,
        initialDelay: 10,
      });

      expect(result).toBe("success");
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it("should throw error after max retries", async () => {
      const operation = jest
        .fn()
        .mockRejectedValue(new Error("persistent failure"));

      await expect(
        withRetry(operation, { maxRetries: 2, initialDelay: 10 }),
      ).rejects.toThrow("persistent failure");

      expect(operation).toHaveBeenCalledTimes(3); // initial + 2 retries
    });
  });

  describe("withCircuitBreaker", () => {
    beforeEach(() => {
      // Clear circuit breakers between tests
      jest.clearAllMocks();
    });

    it("should allow operation when circuit is closed", async () => {
      const operation = jest.fn().mockResolvedValue("success");

      const result = await withCircuitBreaker("test-circuit", operation);

      expect(result).toBe("success");
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it("should open circuit after failure threshold", async () => {
      const operation = jest.fn().mockRejectedValue(new Error("service down"));

      // Cause enough failures to trip the circuit
      for (let i = 0; i < 5; i++) {
        try {
          await withCircuitBreaker("failing-circuit", operation);
        } catch (e) {
          // Expected to fail
        }
      }

      // Next call should fail fast due to open circuit
      await expect(
        withCircuitBreaker("failing-circuit", operation),
      ).rejects.toThrow("Circuit breaker is OPEN");
    });
  });

  describe("withRateLimit", () => {
    it("should allow operations within rate limit", async () => {
      const operation = jest.fn().mockResolvedValue("success");

      const result1 = await withRateLimit("test-rate-limit", operation, {
        capacity: 2,
        refillRate: 1,
      });
      const result2 = await withRateLimit("test-rate-limit", operation, {
        capacity: 2,
        refillRate: 1,
      });

      expect(result1).toBe("success");
      expect(result2).toBe("success");
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it("should throttle operations exceeding rate limit", async () => {
      const operation = jest.fn().mockResolvedValue("success");

      // Use up the capacity
      await withRateLimit("throttle-test", operation, {
        capacity: 1,
        refillRate: 0.1,
      });

      // This should wait for token to become available
      const startTime = Date.now();
      await withRateLimit("throttle-test", operation, {
        capacity: 1,
        refillRate: 0.1,
      });
      const duration = Date.now() - startTime;

      expect(duration).toBeGreaterThanOrEqual(40); // Should have waited
      expect(operation).toHaveBeenCalledTimes(2);
    }, 10000);
  });

  describe("withResilience", () => {
    it("should combine all resilience features", async () => {
      const operation = jest
        .fn()
        .mockRejectedValueOnce(new Error("transient failure"))
        .mockResolvedValue("success");

      const result = await withResilience("combined-test", operation, {
        retry: { maxRetries: 2, initialDelay: 10 },
        useCircuitBreaker: true,
        useRateLimit: true,
        rateLimitConfig: { capacity: 10, refillRate: 5 },
      });

      expect(result).toBe("success");
      expect(operation).toHaveBeenCalledTimes(2); // Fail once, then succeed
    });

    it("should handle persistent failures gracefully", async () => {
      const operation = jest
        .fn()
        .mockRejectedValue(new Error("persistent error"));

      await expect(
        withResilience("persistent-fail-test", operation, {
          retry: { maxRetries: 1, initialDelay: 10 },
          useCircuitBreaker: false,
        }),
      ).rejects.toThrow("persistent error");

      expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });
  });
});
