"use server";

import { TAGS } from "lib/constants";
import { withResilience } from "lib/locking";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    // Use resilient operation with retry logic and circuit breaker
    await withResilience(
      "cart-add-item",
      async () => {
        await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
        revalidateTag(TAGS.cart);
      },
      {
        retry: { maxRetries: 3, initialDelay: 100 },
        useCircuitBreaker: true,
        useRateLimit: true,
        rateLimitConfig: { capacity: 20, refillRate: 5 },
      },
    );
  } catch (e) {
    console.error("Error adding item to cart:", {
      error: e,
      merchandiseId: selectedVariantId,
      operation: "addItem",
    });
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    // Use resilient operation with retry logic
    await withResilience(
      "cart-remove-item",
      async () => {
        const cart = await getCart();

        if (!cart) {
          throw new Error("Error fetching cart");
        }

        const lineItem = cart.lines.find(
          (line) => line.merchandise.id === merchandiseId,
        );

        if (lineItem && lineItem.id) {
          await removeFromCart([lineItem.id]);
          revalidateTag(TAGS.cart);
        } else {
          throw new Error("Item not found in cart");
        }
      },
      {
        retry: { maxRetries: 3, initialDelay: 100 },
        useCircuitBreaker: true,
        useRateLimit: true,
        rateLimitConfig: { capacity: 20, refillRate: 5 },
      },
    );
  } catch (e) {
    console.error("Error removing item from cart:", {
      error: e,
      merchandiseId,
      operation: "removeItem",
    });
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const { merchandiseId, quantity } = payload;

  try {
    // Use resilient operation with retry logic for update operations
    await withResilience(
      "cart-update-quantity",
      async () => {
        const cart = await getCart();

        if (!cart) {
          throw new Error("Error fetching cart");
        }

        const lineItem = cart.lines.find(
          (line) => line.merchandise.id === merchandiseId,
        );

        if (lineItem && lineItem.id) {
          if (quantity === 0) {
            await removeFromCart([lineItem.id]);
          } else {
            await updateCart([
              {
                id: lineItem.id,
                merchandiseId,
                quantity,
              },
            ]);
          }
        } else if (quantity > 0) {
          // If the item doesn't exist in the cart and quantity > 0, add it
          await addToCart([{ merchandiseId, quantity }]);
        }

        revalidateTag(TAGS.cart);
      },
      {
        retry: { maxRetries: 3, initialDelay: 100 },
        useCircuitBreaker: true,
        useRateLimit: true,
        rateLimitConfig: { capacity: 20, refillRate: 5 },
      },
    );
  } catch (e) {
    console.error("Error updating item quantity:", {
      error: e,
      merchandiseId,
      quantity,
      operation: "updateItemQuantity",
    });
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}
