import { prisma } from "./prisma";

/**
 * CMS Content Helper
 * 
 * Utility functions to fetch content from CMS for public website.
 * Uses PageSection model to store flexible content sections.
 */

export interface CMSContent {
  [key: string]: string | null;
}

/**
 * Get all sections for a specific page/section identifier
 * Returns a map of key -> content for easy lookup
 * @param pageSlug - Page slug (e.g., "home")
 * @param locale - Language code (e.g., "en", "ar", "ru"). Defaults to "en"
 */
export async function getCMSSections(
  pageSlug: string,
  locale: string = "en"
): Promise<CMSContent> {
  try {
    const page = await prisma.page.findUnique({
      where: {
        slug: pageSlug,
        status: "PUBLISHED",
      },
      include: {
        sections: {
          where: {
            locale: locale,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!page) {
      return {};
    }

    // If no sections found for locale, try to fallback to default locale (en)
    if (page.sections.length === 0 && locale !== "en") {
      const fallbackPage = await prisma.page.findUnique({
        where: {
          slug: pageSlug,
          status: "PUBLISHED",
        },
        include: {
          sections: {
            where: {
              locale: "en",
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      if (fallbackPage) {
        const contentMap: CMSContent = {};
        fallbackPage.sections.forEach((section) => {
          contentMap[section.key] = section.content;
        });
        return contentMap;
      }
    }

    // Convert sections array to key-value map
    const contentMap: CMSContent = {};
    page.sections.forEach((section) => {
      contentMap[section.key] = section.content;
    });

    return contentMap;
  } catch (error) {
    console.error(`Error fetching CMS content for ${pageSlug} (${locale}):`, error);
    return {};
  }
}

/**
 * Get a single section content by page slug and section key
 * @param pageSlug - Page slug (e.g., "home")
 * @param sectionKey - Section key (e.g., "hero-heading")
 * @param locale - Language code (e.g., "en", "ar", "ru"). Defaults to "en"
 */
export async function getCMSSection(
  pageSlug: string,
  sectionKey: string,
  locale: string = "en"
): Promise<string | null> {
  try {
    const page = await prisma.page.findUnique({
      where: {
        slug: pageSlug,
        status: "PUBLISHED",
      },
      include: {
        sections: {
          where: {
            key: sectionKey,
            locale: locale,
          },
        },
      },
    });

    // Fallback to English if locale not found
    if (!page?.sections[0] && locale !== "en") {
      const fallbackPage = await prisma.page.findUnique({
        where: {
          slug: pageSlug,
          status: "PUBLISHED",
        },
        include: {
          sections: {
            where: {
              key: sectionKey,
              locale: "en",
            },
          },
        },
      });

      return fallbackPage?.sections[0]?.content || null;
    }

    return page?.sections[0]?.content || null;
  } catch (error) {
    console.error(
      `Error fetching CMS section ${sectionKey} for ${pageSlug} (${locale}):`,
      error
    );
    return null;
  }
}

/**
 * Get site-wide settings
 */
export async function getCMSSetting(key: string): Promise<string | null> {
  try {
    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    });

    return setting?.value || null;
  } catch (error) {
    console.error(`Error fetching CMS setting ${key}:`, error);
    return null;
  }
}

/**
 * Helper to get content with fallback
 */
export function getContentWithFallback(
  cmsContent: string | null,
  fallback: string
): string {
  return cmsContent || fallback;
}

/**
 * Parse JSON content (for arrays like services, features, etc.)
 * Returns parsed object/array or fallback
 */
export function parseJSONContent<T>(
  cmsContent: string | null,
  fallback: T
): T {
  if (!cmsContent) return fallback;
  
  try {
    return JSON.parse(cmsContent) as T;
  } catch (error) {
    console.error("Error parsing JSON content:", error);
    return fallback;
  }
}

/**
 * Get image URL from CMS or use fallback
 */
export function getImageURL(
  cmsContent: string | null,
  fallback: string
): string {
  // If CMS content exists and looks like a URL/path, use it
  if (cmsContent && (cmsContent.startsWith("/") || cmsContent.startsWith("http"))) {
    return cmsContent;
  }
  return fallback;
}

