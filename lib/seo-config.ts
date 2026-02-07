/**
 * SEO Optimization Configuration
 * Best practices for maximizing organic traffic and monetization
 */

export const seoConfig = {
  // Default metadata for all pages
  defaultMetadata: {
    applicationName: "ScrollVerse Commerce",
    authors: [{ name: "ScrollVerse Team" }],
    generator: "Next.js",
    keywords: [
      "e-commerce",
      "online shopping",
      "Next.js commerce",
      "headless commerce",
      "Shopify storefront",
    ],
    referrer: "origin-when-cross-origin",
    creator: "ScrollVerse",
    publisher: "ScrollVerse",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  },

  // Open Graph defaults for social sharing (increases conversion)
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ScrollVerse Commerce",
  },

  // Twitter Card defaults for social sharing
  twitter: {
    card: "summary_large_image",
    creator: "@scrollverse",
  },

  // Robots configuration for SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification codes for search engines
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Structured data for rich snippets (increases CTR)
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ScrollVerse Commerce",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
};

/**
 * Generate optimized product structured data for SEO
 * This increases visibility in search results and maximizes monetization
 */
export function generateProductStructuredData(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      url: product.url,
    },
  };
}

/**
 * Generate breadcrumb structured data for improved navigation
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default seoConfig;
