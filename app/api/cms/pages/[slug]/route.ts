import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

/**
 * GET /api/cms/pages/[slug]
 * Get a single page by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (![UserRole.ADMIN, UserRole.EDITOR].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
      include: {
        sections: {
          orderBy: {
            order: "asc",
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/pages/[slug]
 * Update a page
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (![UserRole.ADMIN, UserRole.EDITOR].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, status, sections } = body;

    // Check if page exists
    const existing = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Update page
    const updateData: any = {
      userId: session.user.id,
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) {
      updateData.status = status;
      updateData.publishedAt =
        status === "PUBLISHED" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt;
    }

    const page = await prisma.page.update({
      where: { slug: params.slug },
      data: updateData,
      include: {
        sections: true,
      },
    });

    // Update sections if provided
    if (sections) {
      // Delete existing sections
      await prisma.pageSection.deleteMany({
        where: { pageId: page.id },
      });

      // Create new sections
      await prisma.pageSection.createMany({
        data: sections.map((section: any) => ({
          pageId: page.id,
          key: section.key,
          title: section.title,
          content: section.content || "",
          contentType: section.contentType || "MARKDOWN",
          order: section.order || 0,
          metadata: section.metadata || "{}",
          userId: session.user.id,
        })),
      });

      // Fetch updated page with sections
      const updatedPage = await prisma.page.findUnique({
        where: { id: page.id },
        include: {
          sections: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      return NextResponse.json({ page: updatedPage });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cms/pages/[slug]
 * Delete a page (and all its sections)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN can delete pages
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Delete page (sections will be cascade deleted)
    await prisma.page.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

