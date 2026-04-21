import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import VesselSchedule from "@/models/VesselSchedule";
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
    return NextResponse.json({ error: "Invalid schedule ID" }, { status: 400 });
  }

  try {
    const schedule = await VesselSchedule.findById(id).lean();
    if (!schedule) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
    }
    return NextResponse.json(schedule);
  } catch (error: unknown) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
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
    return NextResponse.json({ error: "Invalid schedule ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { vesselName, pol, polCode, pod, podCode, eta, etd } = body;

    const update: Record<string, unknown> = {};
    if (vesselName != null) update.vesselName = String(vesselName).trim();
    if (pol != null) update.pol = String(pol).trim();
    if (polCode != null) update.polCode = String(polCode).trim().toUpperCase();
    if (pod != null) update.pod = String(pod).trim();
    if (podCode != null) update.podCode = String(podCode).trim().toUpperCase();
    if (eta != null) update.eta = new Date(eta);
    if (etd != null) update.etd = new Date(etd);

    const schedule = await VesselSchedule.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    ).lean();

    if (!schedule) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
    }
    return NextResponse.json(schedule);
  } catch (error: unknown) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
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
    return NextResponse.json({ error: "Invalid schedule ID" }, { status: 400 });
  }

  try {
    const schedule = await VesselSchedule.findByIdAndDelete(id);
    if (!schedule) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Schedule deleted" });
  } catch (error: unknown) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
