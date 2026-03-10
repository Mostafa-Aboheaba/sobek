import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CompanyPort from "@/models/CompanyPort";
import mongoose from "mongoose";

const requireAdmin = (request: NextRequest): boolean => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-admin-secret") === secret;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 }
    );
  }

  const { id } = await params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid port ID" }, { status: 400 });
  }

  try {
    const port = await CompanyPort.findById(id).lean();
    if (!port) {
      return NextResponse.json({ error: "Port not found" }, { status: 404 });
    }
    return NextResponse.json(port);
  } catch (error: unknown) {
    console.error("Error fetching port:", error);
    return NextResponse.json(
      { error: "Failed to fetch port" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 }
    );
  }

  const { id } = await params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid port ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, code, displayOrder } = body;

    const update: Record<string, unknown> = {};
    if (name != null) update.name = String(name).trim();
    if (code != null) update.code = String(code).trim().toUpperCase();
    if (displayOrder != null) update.displayOrder = Number(displayOrder);

    const port = await CompanyPort.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    ).lean();

    if (!port) {
      return NextResponse.json({ error: "Port not found" }, { status: 404 });
    }
    return NextResponse.json(port);
  } catch (error: unknown) {
    console.error("Error updating port:", error);
    return NextResponse.json(
      { error: "Failed to update port" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 }
    );
  }

  const { id } = await params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid port ID" }, { status: 400 });
  }

  try {
    const port = await CompanyPort.findByIdAndDelete(id);
    if (!port) {
      return NextResponse.json({ error: "Port not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Port deleted" });
  } catch (error: unknown) {
    console.error("Error deleting port:", error);
    return NextResponse.json(
      { error: "Failed to delete port" },
      { status: 500 }
    );
  }
}
