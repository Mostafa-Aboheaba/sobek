import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Default theme values (fallback)
 */
const DEFAULT_THEME = {
  colors: {
    primary: "#2A478B",
    primaryDark: "#012C4E",
    accent: "#A6823A",
    accentDark: "#8A6B2F",
    neutralDark: "#212121",
    neutralLight: "#757575",
    beige: "#FAF7F0",
  },
  fonts: {
    primary: "Poppins",
    secondary: "Manjari",
  },
};

/**
 * GET /api/cms/public/theme
 * Public API endpoint to fetch theme/design system settings
 * 
 * Used by the website to apply custom colors, fonts, etc.
 * Always returns a valid theme (default if database unavailable)
 */
export async function GET() {
  try {
    const themeSetting = await prisma.siteSettings.findUnique({
      where: { key: "theme" },
    });

    if (!themeSetting) {
      // Return default theme if no custom theme set
      return NextResponse.json({ theme: DEFAULT_THEME });
    }

    // Try to parse theme, fallback to default on error
    try {
      const theme = JSON.parse(themeSetting.value);
      return NextResponse.json({ theme });
    } catch (parseError) {
      console.error("Error parsing theme JSON:", parseError);
      return NextResponse.json({ theme: DEFAULT_THEME });
    }
  } catch (error: any) {
    // If database is unavailable, return default theme instead of error
    // This ensures the site still works even if CMS is down
    console.error("Error fetching theme from database:", error?.message || error);
    return NextResponse.json({ theme: DEFAULT_THEME });
  }
}

