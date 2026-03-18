import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

/**
 * GET /api/cms/pages
 * List all pages (with optional filters)
 * 
 * Query params:
 * - status: filter by status (draft|published)
 * - includeSections: include page sections in response
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN and EDITOR can access
    if (![UserRole.ADMIN, UserRole.EDITOR].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const includeSections = searchParams.get("includeSections") === "true";

    const where: any = {};
    if (status === "draft" || status === "published") {
      where.status = status.toUpperCase();
    }

    const pages = await prisma.page.findMany({
      where,
      include: {
        sections: includeSections,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/pages
 * Create a new page
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN and EDITOR can create pages
    if (![UserRole.ADMIN, UserRole.EDITOR].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { slug, title, description, status, sections } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.page.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Page with this slug already exists" },
        { status: 400 }
      );
    }

    // Create page with sections if provided
    const page = await prisma.page.create({
      data: {
        slug,
        title,
        description,
        status: status || "DRAFT",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        userId: session.user.id,
        sections: sections
          ? {
              create: sections.map((section: any) => ({
                key: section.key,
                title: section.title,
                content: section.content || "",
                contentType: section.contentType || "MARKDOWN",
                order: section.order || 0,
                metadata: section.metadata || "{}",
                userId: session.user.id,
              })),
            }
          : undefined,
      },
      include: {
        sections: true,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating page:", error);
    
    // Handle unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Page with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

