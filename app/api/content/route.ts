import { NextResponse } from "next/server";
import { getContentAsync, initializeContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Always initialize fresh content in development
    await initializeContent();
    
    // Get the latest content
    const content = await getContentAsync();
    
    return NextResponse.json({
      success: true,
      content,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

