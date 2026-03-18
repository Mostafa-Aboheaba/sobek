import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/cms/public/pages/[slug]
 * Public API endpoint to fetch published pages
 * 
 * This endpoint is accessible without authentication and is used
 * by the public website to fetch page content dynamically.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const page = await prisma.page.findUnique({
      where: {
        slug: params.slug,
        status: "PUBLISHED", // Only return published pages
      },
      include: {
        sections: {
          where: {
            // Only include sections if needed - you can filter further if required
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    // Return page data (no sensitive info)
    return NextResponse.json({
      slug: page.slug,
      title: page.title,
      description: page.description,
      sections: page.sections,
      publishedAt: page.publishedAt,
    });
  } catch (error) {
    console.error("Error fetching public page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

