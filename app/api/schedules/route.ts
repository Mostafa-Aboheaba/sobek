import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import VesselSchedule from "@/models/VesselSchedule";

const requireAdmin = (request: NextRequest): boolean => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-admin-secret") === secret;
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { error: "Database unavailable", schedules: [] },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const pol = searchParams.get("pol")?.trim();
    const pod = searchParams.get("pod")?.trim();
    const vesselName = searchParams.get("vesselName")?.trim();
    const dateFrom = searchParams.get("dateFrom")?.trim();
    const dateTo = searchParams.get("dateTo")?.trim();

    const andConditions: object[] = [];

    if (pol) {
      const polRegex = { $regex: pol, $options: "i" };
      andConditions.push({ $or: [{ polCode: polRegex }, { pol: polRegex }] });
    }
    if (pod) {
      const podRegex = { $regex: pod, $options: "i" };
      andConditions.push({ $or: [{ podCode: podRegex }, { pod: podRegex }] });
    }
    if (vesselName) {
      andConditions.push({
        vesselName: { $regex: vesselName, $options: "i" },
      });
    }
    const etdRange: { $gte?: Date; $lte?: Date } = {};
    if (dateFrom) {
      const d = new Date(dateFrom);
      if (!isNaN(d.getTime())) etdRange.$gte = d;
    }
    if (dateTo) {
      const d = new Date(dateTo);
      if (!isNaN(d.getTime())) etdRange.$lte = d;
    }
    if (Object.keys(etdRange).length > 0) {
      andConditions.push({ etd: etdRange });
    }

    const filter = andConditions.length > 0 ? { $and: andConditions } : {};

    const schedules = await VesselSchedule.find(filter)
      .sort({ etd: 1 })
      .limit(200)
      .lean();

    const serialized = schedules.map((s) => ({
      _id: (s as { _id: unknown })._id,
      vesselName: (s as { vesselName: string }).vesselName,
      pol: (s as { pol: string }).pol,
      polCode: (s as { polCode: string }).polCode,
      pod: (s as { pod: string }).pod,
      podCode: (s as { podCode: string }).podCode,
      eta: (s as { eta: Date }).eta,
      etd: (s as { etd: Date }).etd,
    }));

    return NextResponse.json({ schedules: serialized });
  } catch (error: unknown) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedules", schedules: [] },
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
    const { vesselName, pol, polCode, pod, podCode, eta, etd } = body;

    if (!vesselName || !pol || !polCode || !pod || !podCode || !eta || !etd) {
      return NextResponse.json(
        { error: "Missing required fields: vesselName, pol, polCode, pod, podCode, eta, etd" },
        { status: 400 }
      );
    }

    const schedule = await VesselSchedule.create({
      vesselName: String(vesselName).trim(),
      pol: String(pol).trim(),
      polCode: String(polCode).trim().toUpperCase(),
      pod: String(pod).trim(),
      podCode: String(podCode).trim().toUpperCase(),
      eta: new Date(eta),
      etd: new Date(etd),
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}
