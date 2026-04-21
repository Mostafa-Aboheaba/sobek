import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import CompanyPort from "@/models/CompanyPort";
import { COMPANY_PORTS } from "@/lib/ports";

const requireAdmin = (request: NextRequest): boolean => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-admin-secret") === secret;
};

export async function GET() {
  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { error: "Database unavailable", ports: [] },
      { status: 503 }
    );
  }

  try {
    let ports = await CompanyPort.find().sort({ displayOrder: 1, code: 1 }).lean();
    if (ports.length === 0 && COMPANY_PORTS.length > 0) {
      await CompanyPort.insertMany(
        COMPANY_PORTS.map((p, i) => ({ name: p.name, code: p.code, displayOrder: i }))
      );
      ports = await CompanyPort.find().sort({ displayOrder: 1, code: 1 }).lean();
    }
    const serialized = ports.map((p) => ({
      _id: (p as { _id: unknown })._id,
      name: (p as { name: string }).name,
      code: (p as { code: string }).code,
      displayOrder: (p as { displayOrder?: number }).displayOrder ?? 0,
    }));
    return NextResponse.json({ ports: serialized });
  } catch (error: unknown) {
    console.error("Error fetching ports:", error);
    return NextResponse.json(
      { error: "Failed to fetch ports", ports: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json();
    const { name, code, displayOrder } = body;

    if (!name || !code) {
      return NextResponse.json(
        { error: "Missing required fields: name, code" },
        { status: 400 }
      );
    }

    const port = await CompanyPort.create({
      name: String(name).trim(),
      code: String(code).trim().toUpperCase(),
      displayOrder: displayOrder != null ? Number(displayOrder) : undefined,
    });

    return NextResponse.json(port, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating port:", error);
    return NextResponse.json(
      { error: "Failed to create port" },
      { status: 500 }
    );
  }
}
