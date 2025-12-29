import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * GET /api/cms/assets
 * List all assets
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (![UserRole.ADMIN, UserRole.EDITOR].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const assets = await prisma.asset.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ assets });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/assets
 * Upload new assets
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (![UserRole.ADMIN, UserRole.EDITOR].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedAssets = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue; // Skip non-images for now
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filepath = join(uploadDir, filename);

      // Save file
      await writeFile(filepath, buffer);

      // Get image dimensions if it's an image
      let width: number | null = null;
      let height: number | null = null;

      if (file.type.startsWith("image/")) {
        // For now, we'll set dimensions to null
        // You can use a library like 'sharp' or 'image-size' to get dimensions
        // const size = sizeOf(buffer);
        // width = size.width;
        // height = size.height;
      }

      // Create database record
      const asset = await prisma.asset.create({
        data: {
          filename,
          originalName: file.name,
          path: `/uploads/${filename}`,
          mimeType: file.type,
          size: buffer.length,
          width,
          height,
          userId: session.user.id,
        },
      });

      uploadedAssets.push(asset);
    }

    return NextResponse.json({ assets: uploadedAssets }, { status: 201 });
  } catch (error: any) {
    console.error("Error uploading assets:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

