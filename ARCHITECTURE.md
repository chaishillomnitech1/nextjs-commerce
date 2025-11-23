# Architecture Documentation: Scaling and Economy Locking

## Overview

This document describes the architecture patterns implemented for scaling and concurrency control in the Next.js Commerce application, specifically focusing on the "economy locking" mechanisms that ensure data consistency and prevent race conditions in commerce operations.

## Architecture Principles

### 1. **Scalability**

The application is designed to scale horizontally across multiple instances while maintaining data consistency through proper locking mechanisms.

### 2. **Resilience**

All critical operations implement retry logic, circuit breakers, and rate limiting to handle failures gracefully and prevent cascading failures.

### 3. **Consistency**

Cart and checkout operations use optimistic concurrency control to prevent data conflicts in concurrent scenarios.

## Core Components

### Resilience Layer (`lib/locking.ts`)

The resilience layer provides three key patterns for robust operation execution:

#### 1. Retry with Exponential Backoff

```typescript
await withRetry(
  async () => {
    // Your operation here
  },
  {
    maxRetries: 3,
    initialDelay: 100,
    maxDelay: 2000,
    backoffMultiplier: 2,
  },
);
```

**Features:**

- Exponential backoff between retries
- Jitter to prevent thundering herd problem
- Configurable retry parameters
- Automatic error propagation after max retries

**Use Cases:**

- Transient network failures
- Temporary service unavailability
- Database connection timeouts

#### 2. Circuit Breaker Pattern

```typescript
await withCircuitBreaker("shopify-api", async () => {
  // External API call
});
```

**States:**

- **CLOSED**: Normal operation, requests pass through
- **OPEN**: Service is down, fail fast without calling
- **HALF_OPEN**: Testing if service recovered

**Configuration:**

- Failure threshold: 5 failures trigger OPEN state
- Timeout: 60 seconds before attempting recovery
- Half-open timeout: 30 seconds for testing recovery

**Use Cases:**

- External API integrations (Shopify)
- Database queries
- Third-party service calls

#### 3. Rate Limiting (Token Bucket Algorithm)

```typescript
await withRateLimit(
  "cart-operations",
  async () => {
    // Rate-limited operation
  },
  {
    capacity: 10,
    refillRate: 2, // tokens per second
  },
);
```

**Features:**

- Token bucket algorithm for smooth rate limiting
- Per-operation-type rate limiters
- Configurable capacity and refill rate
- Automatic waiting with timeout

**Use Cases:**

- Preventing API abuse
- Protecting downstream services
- Managing concurrent cart modifications

### Middleware Layer (`middleware.ts`)

Implements global rate limiting at the request level:

#### API Rate Limits

- **General API routes**: 100 requests per minute per IP
- **Cart operations**: 50 requests per minute per IP

#### Response Headers

All rate-limited responses include:

```
X-RateLimit-Limit: Maximum requests allowed
X-RateLimit-Remaining: Remaining requests in current window
X-RateLimit-Reset: Timestamp when limit resets
```

#### Rate Limit Exceeded (429 Response)

```json
{
  "error": "Too many requests",
  "message": "Please slow down and try again later"
}
```

**Headers:**

```
Retry-After: 60
X-RateLimit-Limit: [limit]
X-RateLimit-Remaining: 0
X-RateLimit-Reset: [timestamp]
```

### Cart Operations (`components/cart/actions.ts`)

All cart operations are wrapped with resilience mechanisms:

#### Add to Cart

```typescript
await withResilience(
  "cart-add-item",
  async () => {
    await addToCart([{ merchandiseId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  },
  {
    retry: { maxRetries: 3, initialDelay: 100 },
    useCircuitBreaker: true,
    useRateLimit: true,
    rateLimitConfig: { capacity: 20, refillRate: 5 },
  },
);
```

#### Remove from Cart

Similar resilience wrapper with error handling and retry logic.

#### Update Cart Quantity

Handles both increment/decrement and removal (when quantity = 0).

## Scaling Patterns

### Horizontal Scaling

The application supports horizontal scaling through:

1. **Stateless Server Actions**: All cart operations are stateless and can run on any instance
2. **Cookie-based Cart ID**: Cart state is tracked via cookies, enabling requests to be handled by any server
3. **Tag-based Cache Invalidation**: Uses Next.js cache tags for coordinated cache updates

### Caching Strategy

- **Cart data**: Cached with revalidation on mutations
- **Product data**: Long-lived cache with on-demand revalidation
- **Collections**: Cached with periodic revalidation

### Database Connection Pooling

- Uses Shopify's GraphQL API with built-in connection management
- Implements circuit breaker to prevent overwhelming the API
- Rate limiting prevents excessive concurrent requests

## Concurrency Control

### Optimistic Locking Pattern

Cart operations implement optimistic concurrency control:

1. **Read**: Fetch current cart state
2. **Modify**: Apply changes locally
3. **Write**: Submit changes with retry on conflict
4. **Retry**: If conflict detected, refetch and retry

### Race Condition Prevention

Multiple mechanisms prevent race conditions:

1. **Retry Logic**: Handles transient conflicts
2. **Rate Limiting**: Prevents excessive concurrent modifications
3. **Sequential Processing**: Rate limiter queues operations when capacity exceeded
4. **Error Handling**: Proper error messages for concurrent modification failures

## Monitoring and Observability

### Recommended Metrics

1. **Rate Limit Metrics**

   - Requests rate-limited per minute
   - Rate limit capacity utilization
   - 429 response rate

2. **Circuit Breaker Metrics**

   - Circuit breaker state transitions
   - Failure rates per circuit
   - Time spent in OPEN state

3. **Retry Metrics**

   - Retry attempts per operation
   - Success rate after retries
   - Average retry latency

4. **Cart Operation Metrics**
   - Cart modification success rate
   - Average operation latency
   - Concurrent operation conflicts

### Logging

All errors are logged with context:

```typescript
console.error("Error adding item to cart:", e);
```

For production, integrate with monitoring services like:

- Sentry for error tracking
- Datadog for performance monitoring
- CloudWatch for infrastructure metrics

## Deployment Considerations

### Environment Variables

No new environment variables required. The system works with existing Shopify configuration.

### Infrastructure Requirements

**Minimum:**

- Node.js 22+
- 512MB RAM per instance
- 1 CPU core

**Recommended for Production:**

- Node.js 22+
- 2GB RAM per instance
- 2 CPU cores
- Load balancer with health checks
- CDN for static assets

### Scaling Guidelines

**Vertical Scaling:**

- Increase CPU/RAM for single instance
- Useful up to 4 CPU cores

**Horizontal Scaling:**

- Add more instances behind load balancer
- Recommended for high traffic (>1000 req/min)
- No shared state between instances

**Rate Limit Tuning:**

- Adjust `capacity` based on backend capacity
- Monitor 429 rates and adjust if needed
- Consider per-user limits for authenticated users

## Security Considerations

### Rate Limiting Security

- Prevents DDoS attacks
- Protects against brute force attempts
- Limits resource exhaustion

### Circuit Breaker Security

- Prevents service degradation
- Fail-fast reduces attack surface
- Protects downstream services

### Error Handling

- Generic error messages to users
- Detailed logging for debugging
- No sensitive data in error responses

## Testing Strategy

### Unit Tests

Test each resilience component:

- Retry logic with controlled failures
- Circuit breaker state transitions
- Rate limiter token bucket behavior

### Integration Tests

Test cart operations:

- Concurrent cart modifications
- Retry on transient failures
- Rate limit enforcement

### Load Tests

Recommended scenarios:

- Sustained load: 100 req/s for 10 minutes
- Spike test: Burst to 500 req/s
- Stress test: Find breaking point

## Future Enhancements

### Short-term (1-3 months)

1. **Redis-based Rate Limiting**: Replace in-memory rate limiter with Redis for multi-instance support
2. **Distributed Circuit Breaker**: Share circuit breaker state across instances
3. **Enhanced Monitoring**: Add detailed metrics and alerting
4. **Performance Optimization**: Analyze and optimize slow operations

### Medium-term (3-6 months)

1. **Database Caching Layer**: Add Redis cache for frequently accessed data
2. **Queue-based Cart Operations**: Use message queue for high-traffic scenarios
3. **Advanced Conflict Resolution**: Implement CRDT for automatic conflict resolution
4. **Geographic Distribution**: Multi-region deployment with data synchronization

### Long-term (6-12 months)

1. **Event Sourcing**: Implement event sourcing for cart operations
2. **CQRS Pattern**: Separate read and write models for better scaling
3. **Real-time Updates**: WebSocket-based cart synchronization
4. **AI-based Rate Limiting**: Adaptive rate limiting based on traffic patterns

## References

- [Token Bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket)
- [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Optimistic Concurrency Control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control)
- [Exponential Backoff](https://en.wikipedia.org/wiki/Exponential_backoff)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)

## Support

For questions or issues with the architecture:

1. Review this documentation
2. Check the code comments in `lib/locking.ts`
3. Review test cases for usage examples
4. Consult team lead or architect
