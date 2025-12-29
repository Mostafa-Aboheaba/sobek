/**
 * Content Schema for Sobek Shipping Agency Website
 * 
 * This file contains all editable content extracted from components.
 * This structure is designed to be easily editable by non-technical users
 * and can be replaced with a CMS in the future.
 */

// ============================================================================
// THEME SETTINGS
// ============================================================================

export interface ThemeSettings {
  fonts: {
    primary: {
      name: string;
      googleFont: string;
      variable: string;
      weights: string[];
    };
    secondary: {
      name: string;
      googleFont: string;
      variable: string;
      weights: string[];
    };
  };
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      DEFAULT: string;
      dark: string;
      light: string;
    };
    accent: {
      DEFAULT: string;
      dark: string;
      light: string;
    };
    neutral: {
      DEFAULT: string;
      light: string;
      lighter: string;
      dark: string;
    };
    background: {
      DEFAULT: string;
      dark: string;
    };
    beige: string;
  };
  logos: {
    sobek: {
      light: string;
      dark: string;
    };
    rightLine: {
      light: string;
      dark: string;
    };
  };
}

// ============================================================================
// SITE METADATA
// ============================================================================

export interface SiteMetadata {
  title: string;
  description: string;
  favicon: {
    ico: string;
    png16: string;
    png32: string;
    apple: string;
  };
}

// ============================================================================
// NAVIGATION
// ============================================================================

export interface NavigationItem {
  name: string;
  path: string;
}

// ============================================================================
// HERO SECTION
// ============================================================================

export interface HeroSection {
  id: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  heading: string;
  tagline: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    action?: "scroll" | "link";
  };
  secondaryButton: {
    text: string;
    href: string;
    action?: "scroll" | "link";
  };
}

// ============================================================================
// REPEATABLE SECTIONS
// ============================================================================

export interface Section {
  id: string;
  label?: string;
  heading: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export interface Feature {
  icon?: string; // SVG path or icon identifier
  title: string;
  description: string;
}

export interface Industry {
  name: string;
}

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export interface ContactInfo {
  location: {
    address: string[];
    city: string;
    country: string;
  };
  phone: string;
  email: string;
  social: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

// ============================================================================
// FORM SETTINGS
// ============================================================================

export interface FormSettings {
  helpOptions: string[];
  tracking: {
    placeholder: {
      booking: string;
      contact: string;
    };
  };
}

// ============================================================================
// MAIN CONTENT OBJECT
// ============================================================================

export interface SiteContent {
  theme: ThemeSettings;
  metadata: SiteMetadata;
  navigation: NavigationItem[];
  hero: HeroSection;
  about: Section;
  whyChoose: {
    section: Section;
    features: Feature[];
  };
  services: {
    section: Section;
    services: Service[];
  };
  industries: {
    section: Section;
    industries: Industry[];
  };
  findCargo: Section;
  getInTouch: {
    section: Section;
    form: FormSettings;
  };
  footer: {
    navigation: NavigationItem[];
    contact: ContactInfo;
  };
}

// ============================================================================
// CONTENT DATA
// ============================================================================

export const content: SiteContent = {
  theme: {
    fonts: {
      primary: {
        name: "Poppins",
        googleFont: "Poppins",
        variable: "--font-poppins",
        weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      },
      secondary: {
        name: "Manjari",
        googleFont: "Manjari",
        variable: "--font-manjari",
        weights: ["400"],
      },
    },
    colors: {
      primary: {
        50: "#E8ECF5",
        100: "#D1D9EB",
        200: "#A3B3D7",
        300: "#758DC3",
        400: "#4767AF",
        500: "#2A478B",
        600: "#22396F",
        700: "#192B53",
        800: "#111D37",
        900: "#012C4E",
        DEFAULT: "#2A478B",
        dark: "#1E3566",
        light: "#3D5FA3",
      },
      accent: {
        DEFAULT: "#A6823A",
        dark: "#8A6B2F",
        light: "#C49D4F",
      },
      neutral: {
        DEFAULT: "#212121",
        light: "#757575",
        lighter: "#BDBDBD",
        dark: "#424242",
      },
      background: {
        DEFAULT: "#FAF7F0",
        dark: "#F5F2EB",
      },
      beige: "#F5F2EB",
    },
    logos: {
      sobek: {
        light: "/logo/sobek-white.png",
        dark: "/logo/sobek.png",
      },
      rightLine: {
        light: "/logo/right-white.png",
        dark: "/logo/right.png",
      },
    },
  },
  metadata: {
    title: "Sobek Shipping Agency - Exclusive Agent of Right Line",
    description: "Fast, reliable sea freight solutions. Sobek Shipping Agency is the exclusive agent of Right Line - Russian Shipping Line, providing global maritime and logistics services.",
    favicon: {
      ico: "/favicon.ico",
      png16: "/favicon-16x16.png",
      png32: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
  },
  navigation: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ],
  hero: {
    id: "home",
    backgroundImage: "/images/hero-ship-sea.png",
    backgroundImageAlt: "Cargo ship sailing on the sea",
    heading: "Right Line Sails,\nSobek Delivers",
    tagline: "Fast reliable sea freight solution",
    description: "We provide reliable, efficient, and cost-effective global maritime and logistics solutions, services that ensure smooth vessel operations and seamless cargo movement across international waters, of deep sea to Russian Ports.",
    primaryButton: {
      text: "Get Quote",
      href: "#contact-form",
      action: "scroll",
    },
    secondaryButton: {
      text: "View Our Services",
      href: "#services",
      action: "scroll",
    },
  },
  about: {
    id: "about",
    label: "About Sobek",
    heading: "Sobek Shipping Agency, The Exclusive Agent of Right Line – Russian Shipping Line, Your Trusted Partner in Global Maritime Logistics.",
    description: "At Sobek, we offer more than just shipping services, we build bridges of trust and efficiency across global markets. We are your dependable logistics partner, connecting you to the world through precise, secure, and fast shipping lines, with a special focus on major Russian ports.",
    image: {
      src: "/images/right-line-containers.png",
      alt: "Right Line shipping containers",
    },
  },
  whyChoose: {
    section: {
      id: "why-choose",
      label: "Why Choose Sobek Shipping Agency?",
      heading: "We are the only authorized agent for Right Line, ensuring clients receive genuine, direct shipping services with no intermediaries.",
    },
    features: [
      {
        title: "Real-time Tracking",
        description: "Know exactly where your cargo is. Anytime, Anywhere.",
      },
      {
        title: "Fast & Reliable",
        description: "Direct Egypt - Russia service in just 5 - 7 days.",
      },
      {
        title: "Quality & Safety",
        description: "A Brand new 2025 fleet ready to sail.",
      },
      {
        title: "24/7 customer support",
        description: "Round the clock assistance for all inquiries.",
      },
    ],
  },
  services: {
    section: {
      id: "services",
      label: "Our Services",
      heading: "As the sole representative of Right Line in the region, we manage all shipping line operations with precision and professionalism.",
    },
    services: [
      {
        number: "1",
        title: "Cargo Booking & Space Management",
        description: "Fast, accurate booking processes and guaranteed space allocation on Right Line vessels.",
      },
      {
        number: "2",
        title: "Port & Vessel Operations",
        description: "Comprehensive port agency support, including berthing arrangements, stevedoring coordination, and documentation handling.",
      },
      {
        number: "3",
        title: "Container Services",
        description: "Full support for dry, reefer, and special containers, including tracking, storage, and maintenance coordination.",
      },
      {
        number: "4",
        title: "Customs Documentation & Support",
        description: "Expert assistance in customs, regulatory compliance, and required shipping documentation.",
      },
      {
        number: "5",
        title: "Freight Forwarding Support",
        description: "Integrated logistics solutions, combining sea transport with inland delivery options.",
      },
      {
        number: "6",
        title: "Captain Receipt",
        description: "We rely on our dedicated Captain Receipt Delivery Service to ensure all documents and letters reach their destinations securely and without delay.",
      },
    ],
  },
  industries: {
    section: {
      id: "industries",
      label: "Industries We Serve",
      heading: "Powering Industries of All Kinds",
      image: {
        src: "/images/industries-container.png",
        alt: "Shipping containers for various industries",
      },
    },
    industries: [
      { name: "Agriculture & Food Products" },
      { name: "Construction Materials" },
      { name: "Machinery & Equipment" },
      { name: "Automotive" },
      { name: "Consumer Goods" },
      { name: "Chemicals (non-hazardous)/hazardous" },
      { name: "Retail & FMCG" },
    ],
  },
  findCargo: {
    id: "tracking",
    label: "Find Your Cargo",
    heading: "Drop your Booking number and contact method. We'll track it and send you the latest update.",
    image: {
      src: "/images/tracking-container-truck.png",
      alt: "Shipping container on truck",
    },
  },
  getInTouch: {
    section: {
      id: "contact",
      label: "Get In Touch",
      heading: "Got questions? Just fill out the form and one of our specialists will give you a quick call to help with anything you need.",
      image: {
        src: "/images/footer-bg.png",
        alt: "Cargo ship",
      },
    },
    form: {
      helpOptions: ["Cargo Booking", "Customs Documentation", "Port & Vessel Operations", "Others"],
      tracking: {
        placeholder: {
          booking: "ex: RDEDK/ALYNVS1125001234",
          contact: "+201233445566 / user@mail.com",
        },
      },
    },
  },
  footer: {
    navigation: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Contact", path: "/contact" },
    ],
    contact: {
      location: {
        address: [
          "36 Bani Al-Abbas Street",
          "Bab sharq, Apartment 1, Ground Floor",
          "Al-Azareeta, Bab Sharq District",
        ],
        city: "Alexandria",
        country: "Egypt",
      },
      phone: "+20 101 607 8688",
      email: "info@sobek-egy.com",
      social: {
        linkedin: "https://www.linkedin.com/company/sobek-agency/",
        instagram: "https://www.instagram.com/sobek_agency?igsh=MWQweTRkNXNpMjh3dQ==",
        facebook: "https://www.facebook.com/share/17kwUY7fqR/",
      },
    },
  },
};

// ============================================================================
// CONTENT ACCESS UTILITY
// ============================================================================

import { getContentWithFallback, logContentSource } from "./content-provider";

// Content cache for synchronous access (used by client components)
// Initialize immediately with local content as fallback
// This ensures components always have content available, even during SSR
let contentCache: SiteContent = content;
let contentCacheInitialized = true; // Start as initialized with local content
let contentCacheTimestamp = 0;
let contentCacheVersion = 0; // Version number to track cache updates

/**
 * Clear content cache (useful for development/testing)
 */
export function clearContentCache(): void {
  contentCache = content; // Reset to local content, not null
  contentCacheInitialized = false;
  contentCacheTimestamp = 0;
  contentCacheVersion++; // Increment version to invalidate
  if (process.env.NODE_ENV === "development") {
    console.log("[Content] Cache cleared, version:", contentCacheVersion);
  }
}

/**
 * Get current cache version (useful for debugging)
 */
export function getCacheVersion(): number {
  return contentCacheVersion;
}

/**
 * Initialize content cache (call this in server components or API routes)
 * This ensures content is loaded before client components access it
 * In development, always re-fetch to get latest content
 */
export async function initializeContent(): Promise<void> {
  // In development, always re-fetch to get latest content from CMS
  const isDevelopment = process.env.NODE_ENV === "development";
  const cacheMaxAge = isDevelopment ? 0 : 5 * 60 * 1000; // 0 in dev, 5 min in prod
  const now = Date.now();
  
  // In development, always clear cache and fetch fresh content
  // In production, check if cache is still valid
  if (isDevelopment) {
    // Clear cache in development to ensure fresh content on every request
    contentCache = content; // Reset to local as fallback
    contentCacheInitialized = false;
    contentCacheTimestamp = 0;
  } else if (contentCacheInitialized && (now - contentCacheTimestamp < cacheMaxAge)) {
    return; // Use cache in production
  }

  try {
    // Log content source for debugging
    if (isDevelopment) {
      logContentSource();
      console.log("[Content] 🔄 Fetching fresh content from CMS...");
    }

    const result = await getContentWithFallback();
    contentCache = result.content;
    contentCacheInitialized = true;
    contentCacheTimestamp = now;
    contentCacheVersion++; // Increment version on update

    if (isDevelopment) {
      console.log(
        `[Content] ✅ Fetched from ${result.source} at ${new Date(result.timestamp).toISOString()}, cache version: ${contentCacheVersion}`
      );
    }
  } catch (error) {
    console.error("[Content] Failed to initialize content:", error);
    // Fallback to local content
    contentCache = content;
    contentCacheInitialized = true;
    contentCacheTimestamp = now;
  }
}

/**
 * Get cached content (synchronous, for client components)
 * Note: Call initializeContent() first in server components to update with CMS content
 * Cache is always initialized with local content, so this never returns undefined
 * 
 * IMPORTANT: In Next.js, client components get their own module instance.
 * The server-side cache update doesn't affect client-side module cache.
 * To ensure fresh content, the page component must be a server component
 * that calls initializeContent() before rendering client components.
 */
function getCachedContent(): SiteContent {
  // In development, log cache version for debugging
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    // Client-side: log that we're using cached content
    // The cache should have been updated by the server component
    if (contentCacheVersion > 0) {
      console.log(`[Content] Client using cache version: ${contentCacheVersion}`);
    }
  }
  
  // Cache is always initialized (starts with local content)
  // initializeContent() updates it with CMS content when available
  return contentCache;
}

/**
 * Central function to access content
 * 
 * For server components: Use getContentAsync() instead
 * For client components: Use this synchronous version (requires initialization)
 * 
 * @returns SiteContent (synchronous)
 */
export const getContent = (): SiteContent => {
  return getCachedContent();
};

/**
 * Async version of getContent() for server components
 * This is the preferred method for server-side rendering
 * 
 * @returns Promise<SiteContent>
 */
export const getContentAsync = async (): Promise<SiteContent> => {
  const result = await getContentWithFallback();
  return result.content;
};

/**
 * Get theme settings
 */
export const getTheme = (): ThemeSettings => {
  return getCachedContent().theme;
};

/**
 * Async version of getTheme()
 */
export const getThemeAsync = async (): Promise<ThemeSettings> => {
  const siteContent = await getContentAsync();
  return siteContent.theme;
};

/**
 * Get site metadata
 */
export const getMetadata = (): SiteMetadata => {
  return getCachedContent().metadata;
};

/**
 * Async version of getMetadata()
 */
export const getMetadataAsync = async (): Promise<SiteMetadata> => {
  const siteContent = await getContentAsync();
  return siteContent.metadata;
};

/**
 * Get navigation items
 */
export const getNavigation = (): NavigationItem[] => {
  return getCachedContent().navigation;
};

/**
 * Async version of getNavigation()
 */
export const getNavigationAsync = async (): Promise<NavigationItem[]> => {
  const siteContent = await getContentAsync();
  return siteContent.navigation;
};

/**
 * Get hero section content
 */
export const getHero = (): HeroSection => {
  return getCachedContent().hero;
};

/**
 * Async version of getHero()
 */
export const getHeroAsync = async (): Promise<HeroSection> => {
  const siteContent = await getContentAsync();
  return siteContent.hero;
};

/**
 * Get about section content
 */
export const getAbout = (): Section => {
  return getCachedContent().about;
};

/**
 * Async version of getAbout()
 */
export const getAboutAsync = async (): Promise<Section> => {
  const siteContent = await getContentAsync();
  return siteContent.about;
};

/**
 * Get why choose section content
 */
export const getWhyChoose = () => {
  return getCachedContent().whyChoose;
};

/**
 * Async version of getWhyChoose()
 */
export const getWhyChooseAsync = async () => {
  const siteContent = await getContentAsync();
  return siteContent.whyChoose;
};

/**
 * Get services section content
 */
export const getServices = () => {
  return getCachedContent().services;
};

/**
 * Async version of getServices()
 */
export const getServicesAsync = async () => {
  const siteContent = await getContentAsync();
  return siteContent.services;
};

/**
 * Get industries section content
 */
export const getIndustries = () => {
  return getCachedContent().industries;
};

/**
 * Async version of getIndustries()
 */
export const getIndustriesAsync = async () => {
  const siteContent = await getContentAsync();
  return siteContent.industries;
};

/**
 * Get find cargo section content
 */
export const getFindCargo = (): Section => {
  return getCachedContent().findCargo;
};

/**
 * Async version of getFindCargo()
 */
export const getFindCargoAsync = async (): Promise<Section> => {
  const siteContent = await getContentAsync();
  return siteContent.findCargo;
};

/**
 * Get get in touch section content
 */
export const getGetInTouch = () => {
  return getCachedContent().getInTouch;
};

/**
 * Async version of getGetInTouch()
 */
export const getGetInTouchAsync = async () => {
  const siteContent = await getContentAsync();
  return siteContent.getInTouch;
};

/**
 * Get footer content
 */
export const getFooter = () => {
  return getCachedContent().footer;
};

/**
 * Async version of getFooter()
 */
export const getFooterAsync = async () => {
  const siteContent = await getContentAsync();
  return siteContent.footer;
};

