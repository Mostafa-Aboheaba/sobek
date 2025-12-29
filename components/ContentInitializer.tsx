/**
 * Server component that initializes content before rendering children
 * This ensures content cache is ready when client components access it
 */
import { initializeContent } from "@/lib/content";

export default async function ContentInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize content on server side before rendering
  // This ensures content is loaded before client components access it
  await initializeContent().catch((error) => {
    console.error("[ContentInitializer] Failed to initialize content:", error);
    // Continue rendering with fallback content
  });

  return <>{children}</>;
}

