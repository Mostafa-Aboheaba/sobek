/**
 * Content Provider Abstraction Layer
 * 
 * This module provides an abstraction for content sources, allowing
 * seamless switching between local content and CMS-backed content.
 * 
 * Migration Strategy:
 * - Phase 2: Local content (current) + CMS placeholder
 * - Phase 3: CMS integration
 * - Phase 4: Production deployment
 */

import type { SiteContent } from "./content";

// ============================================================================
// CONTENT SOURCE TYPES
// ============================================================================

export type ContentSource = "local" | "cms";

export interface ContentProvider {
  /**
   * Get all site content
   * @returns Promise that resolves to SiteContent
   */
  getContent(): Promise<SiteContent>;
  
  /**
   * Get content source identifier
   */
  getSource(): ContentSource;
  
  /**
   * Check if provider is available
   */
  isAvailable(): Promise<boolean>;
}

// ============================================================================
// CONTENT PROVIDER RESULT
// ============================================================================

export interface ContentProviderResult {
  content: SiteContent;
  source: ContentSource;
  timestamp: number;
  cached?: boolean;
}

// ============================================================================
// LOCAL CONTENT PROVIDER
// ============================================================================

/**
 * Local content provider - reads from content.ts
 * This is the fallback and default provider
 */
class LocalContentProvider implements ContentProvider {
  private content: SiteContent | null = null;

  getSource(): ContentSource {
    return "local";
  }

  async isAvailable(): Promise<boolean> {
    // Local content is always available
    return true;
  }

  async getContent(): Promise<SiteContent> {
    // Lazy load to avoid circular dependencies
    if (!this.content) {
      const { content: localContent } = await import("./content");
      this.content = localContent;
    }
    return this.content;
  }
}

// ============================================================================
// CMS CONTENT PROVIDER
// ============================================================================

/**
 * CMS content provider - fetches from CMS API
 * This is a placeholder that will be implemented in Phase 3
 */
class CmsContentProvider implements ContentProvider {
  private apiUrl: string;
  private cache: {
    content: SiteContent | null;
    timestamp: number;
    ttl: number; // Time to live in milliseconds
  } = {
    content: null,
    timestamp: 0,
    ttl: 5 * 60 * 1000, // 5 minutes default cache
  };

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || process.env.NEXT_PUBLIC_CMS_API_URL || "";
    
    // In development, reduce cache TTL to 0 (no cache) for immediate updates
    if (process.env.NODE_ENV === "development") {
      this.cache.ttl = 0; // No cache in development
    }
    
    if (!this.apiUrl) {
      console.warn(
        "[ContentProvider] CMS API URL not configured. Falling back to local content."
      );
    }
  }

  getSource(): ContentSource {
    return "cms";
  }

  async isAvailable(): Promise<boolean> {
    if (!this.apiUrl) {
      return false;
    }

    try {
      // Directus health check endpoint
      const healthUrl = `${this.apiUrl}/server/health`;
      const response = await fetch(healthUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Don't cache health checks
        cache: "no-store",
      });

      return response.ok;
    } catch (error) {
      console.warn("[ContentProvider] Directus health check failed:", error);
      return false;
    }
  }

  async getContent(): Promise<SiteContent> {
    if (!this.apiUrl) {
      throw new Error("CMS API URL not configured");
    }

    // In development, always fetch fresh content (skip cache)
    // In production, check cache first
    const isDevelopment = process.env.NODE_ENV === "development";
    const now = Date.now();
    
    if (!isDevelopment) {
      if (
        this.cache.content &&
        now - this.cache.timestamp < this.cache.ttl
      ) {
        console.log("[ContentProvider] Returning cached CMS content");
        return this.cache.content;
      }
    } else {
      // In development, clear cache to force fresh fetch
      this.cache.content = null;
      this.cache.timestamp = 0;
      console.log("[ContentProvider] 🔄 Development mode: Clearing cache and fetching fresh content");
    }

    try {
      // Fetch from Directus API
      // Directus singleton endpoint: /items/{collection}
      // Add timestamp query param in development to bypass any HTTP caching
      // Use both timestamp and random number to ensure unique URL on every request
      const timestamp = isDevelopment ? `&_t=${Date.now()}_${Math.random().toString(36).substring(7)}` : '';
      const contentUrl = `${this.apiUrl}/items/site_content?fields=content,status${timestamp}`;
      
      if (isDevelopment) {
        console.log("[ContentProvider] 📡 Fetching from:", contentUrl);
      }
      
      const response = await fetch(contentUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // In development, disable caching for immediate updates
        // In production, use Next.js fetch cache for ISR
        ...(process.env.NODE_ENV === "development"
          ? { cache: "no-store" } // No cache in development
          : {
              next: {
                revalidate: 300, // Revalidate every 5 minutes in production
              },
            }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        console.error("[ContentProvider] Directus API error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          url: contentUrl,
        });
        
        throw new Error(
          `Directus API returned ${response.status}: ${response.statusText}. ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();

      // Log the response for debugging
      if (process.env.NODE_ENV === "development") {
        console.log("[ContentProvider] Directus API response:", {
          hasData: !!data.data,
          dataType: Array.isArray(data.data) ? "array" : typeof data.data,
          dataKeys: data.data ? Object.keys(data.data) : [],
        });
      }

      // Directus returns: { data: [{ content: {...}, status: "published" }] }
      // Or for singleton: { data: { content: {...}, status: "published" } }
      const directusItem = Array.isArray(data.data) ? data.data[0] : data.data;

      if (!directusItem) {
        console.error("[ContentProvider] No content item found in Directus response:", data);
        throw new Error("No content found in Directus. Make sure content is published and permissions are set.");
      }
      
      if (process.env.NODE_ENV === "development") {
        console.log("[ContentProvider] Found content item:", {
          hasContent: !!directusItem.content,
          status: directusItem.status,
          contentKeys: directusItem.content ? Object.keys(directusItem.content) : [],
        });
      }

      // Check if content is published
      if (directusItem.status !== "published") {
        console.warn(
          "[ContentProvider] Content status is not 'published', using anyway"
        );
      }

      // Extract and validate content
      const content = this.transformDirectusResponse(directusItem.content);

      // Update cache
      this.cache.content = content;
      this.cache.timestamp = now;

      console.log("[ContentProvider] Successfully fetched content from Directus");
      return content;
    } catch (error) {
      console.error("[ContentProvider] Failed to fetch from Directus:", error);
      
      // If we have stale cache, return it
      if (this.cache.content) {
        console.warn("[ContentProvider] Returning stale cache due to CMS error");
        return this.cache.content;
      }

      throw error;
    }
  }

  /**
   * Transform Directus API response to SiteContent format
   * Directus stores the entire SiteContent object in the 'content' JSON field
   */
  private transformDirectusResponse(data: any): SiteContent {
    // Basic validation
    if (!data || typeof data !== "object") {
      throw new Error("Invalid Directus response format: content field is missing or invalid");
    }

    // Validate required top-level fields
    const requiredFields = [
      "theme",
      "metadata",
      "navigation",
      "hero",
      "about",
      "whyChoose",
      "services",
      "industries",
      "findCargo",
      "getInTouch",
      "footer",
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(
          `Invalid SiteContent structure: missing required field '${field}'`
        );
      }
    }

    // Return validated content
    return data as SiteContent;
  }
}

// ============================================================================
// CONTENT PROVIDER FACTORY
// ============================================================================

/**
 * Get the active content provider based on environment configuration
 */
export function getContentProvider(): ContentProvider {
  const source = (process.env.NEXT_PUBLIC_CONTENT_SOURCE || "local") as ContentSource;

  switch (source) {
    case "cms":
      return new CmsContentProvider();
    case "local":
    default:
      return new LocalContentProvider();
  }
}

// ============================================================================
// CONTENT PROVIDER WITH FALLBACK
// ============================================================================

/**
 * Get content with automatic fallback to local content if CMS fails
 */
export async function getContentWithFallback(): Promise<ContentProviderResult> {
  const provider = getContentProvider();
  const source = provider.getSource();

  try {
    // Check if provider is available
    const isAvailable = await provider.isAvailable();
    
    if (!isAvailable && source === "cms") {
      console.warn(
        "[ContentProvider] CMS not available, falling back to local content"
      );
      // Fallback to local
      const localProvider = new LocalContentProvider();
      const content = await localProvider.getContent();
      return {
        content,
        source: "local",
        timestamp: Date.now(),
      };
    }

    // Get content from active provider
    const content = await provider.getContent();
    
    return {
      content,
      source,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[ContentProvider] Error fetching content:", error);
    
    // Always fallback to local on error
    if (source === "cms") {
      console.warn(
        "[ContentProvider] CMS error, falling back to local content"
      );
      const localProvider = new LocalContentProvider();
      const content = await localProvider.getContent();
      return {
        content,
        source: "local",
        timestamp: Date.now(),
      };
    }

    // If local fails, rethrow (should never happen)
    throw error;
  }
}

// ============================================================================
// LOGGING UTILITIES
// ============================================================================

/**
 * Log current content source (for debugging)
 */
export function logContentSource(): void {
  const source = process.env.NEXT_PUBLIC_CONTENT_SOURCE || "local";
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "not configured";
  
  console.log("[ContentProvider] Configuration:", {
    source,
    cmsUrl: source === "cms" ? cmsUrl : "N/A",
    nodeEnv: process.env.NODE_ENV,
  });
}

