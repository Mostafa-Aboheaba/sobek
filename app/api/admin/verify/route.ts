import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/verify
 * Body: { secret: string }
 * Returns: { valid: boolean } (valid only if secret matches ADMIN_SECRET)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;
    const expected = process.env.ADMIN_SECRET;

    if (!expected) {
      return NextResponse.json(
        { valid: false, error: "Admin not configured" },
        { status: 503 }
      );
    }

    const valid =
      typeof secret === "string" &&
      secret.length > 0 &&
      secret === expected;

    return NextResponse.json({ valid });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
