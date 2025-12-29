import { NextResponse } from "next/server";
import { getContentAsync, initializeContent } from "@/lib/content";
import { getContentWithFallback } from "@/lib/content-provider";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Initialize content first
    await initializeContent();
    
    // Get content from provider directly
    const providerResult = await getContentWithFallback();
    
    // Get content from cache
    const cachedContent = await getContentAsync();
    
    // Extract a sample field to compare
    const sampleData = {
      provider: {
        source: providerResult.source,
        timestamp: providerResult.timestamp,
        heroHeading: providerResult.content.hero.heading,
        heroTagline: providerResult.content.hero.tagline,
      },
      cached: {
        heroHeading: cachedContent.hero.heading,
        heroTagline: cachedContent.hero.tagline,
      },
      match: 
        providerResult.content.hero.heading === cachedContent.hero.heading &&
        providerResult.content.hero.tagline === cachedContent.hero.tagline,
    };
    
    return NextResponse.json({
      success: true,
      data: sampleData,
      message: sampleData.match 
        ? "Content matches between provider and cache" 
        : "⚠️ Content mismatch detected!",
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

