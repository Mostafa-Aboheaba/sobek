"use client";

import { useEffect } from "react";

/**
 * Theme Injector Component
 * 
 * Fetches theme settings from CMS and injects CSS variables
 * to apply custom colors, fonts, etc. throughout the site.
 * 
 * Fails silently if API is unavailable - site continues with default styles.
 */
export default function ThemeInjector() {
  useEffect(() => {
    const applyTheme = async () => {
      try {
        const res = await fetch("/api/cms/public/theme");
        if (!res.ok) {
          // Silently fail - use default CSS variables from globals.css
          return;
        }

        const data = await res.json();
        const theme = data?.theme;

        if (!theme) {
          return;
        }

        const root = document.documentElement;

        // Apply color variables
        if (theme.colors) {
          if (theme.colors.primary) {
            root.style.setProperty("--color-primary-500", theme.colors.primary);
          }
          if (theme.colors.primaryDark) {
            root.style.setProperty("--color-primary-900", theme.colors.primaryDark);
          }
          if (theme.colors.accent) {
            root.style.setProperty("--color-accent", theme.colors.accent);
          }
          if (theme.colors.accentDark || theme.colors.accent) {
            root.style.setProperty(
              "--color-accent-dark",
              theme.colors.accentDark || theme.colors.accent
            );
          }
          if (theme.colors.neutralDark) {
            root.style.setProperty("--color-neutral-dark", theme.colors.neutralDark);
          }
          if (theme.colors.neutralLight) {
            root.style.setProperty("--color-neutral-light", theme.colors.neutralLight);
          }
          if (theme.colors.beige) {
            root.style.setProperty("--color-beige", theme.colors.beige);
          }
        }

        // Apply font variables
        if (theme.fonts) {
          if (theme.fonts.primary) {
            root.style.setProperty("--font-primary", theme.fonts.primary);
          }
          if (theme.fonts.secondary) {
            root.style.setProperty("--font-secondary", theme.fonts.secondary);
          }
        }
      } catch (error) {
        // Silently fail - site continues with default styles
        // Only log in development
        if (process.env.NODE_ENV === "development") {
          console.debug("Theme API unavailable, using default styles:", error);
        }
      }
    };

    applyTheme();
  }, []);

  return null; // This component doesn't render anything
}

