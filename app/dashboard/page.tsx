import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

/**
 * Dashboard Home Page
 * 
 * Shows overview statistics and quick actions.
 */
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return null; // Will be redirected by layout
  }

  // Get statistics with error handling
  let totalPages = 0;
  let publishedPages = 0;
  let draftPages = 0;

  try {
    [totalPages, publishedPages, draftPages] = await Promise.all([
      prisma.page.count(),
      prisma.page.count({ where: { status: "PUBLISHED" } }),
      prisma.page.count({ where: { status: "DRAFT" } }),
    ]);
  } catch (error: any) {
    // Database not initialized or connection error
    console.error("Database error:", error);
    
    // Check if it's a database file missing error
    if (error.code === "P1001" || error.message?.includes("database")) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">
            Database Not Initialized
          </h2>
          <p className="text-yellow-800 mb-4">
            Please initialize the database before using the CMS dashboard.
          </p>
          <div className="bg-white rounded p-4 text-sm font-mono">
            <p className="mb-2">Run these commands in your terminal:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>npm run db:generate</li>
              <li>npm run db:push</li>
              <li>npm run db:seed</li>
            </ol>
          </div>
          <p className="text-sm text-yellow-700 mt-4">
            See <code className="bg-yellow-100 px-1 rounded">CMS_SETUP.md</code> for detailed instructions.
          </p>
        </div>
      );
    }
    
    // Other errors - show generic error
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-900 mb-2">Database Error</h2>
        <p className="text-red-800">{error.message || "An error occurred while connecting to the database."}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Pages</p>
              <p className="text-2xl font-semibold text-gray-900">{totalPages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-semibold text-gray-900">{publishedPages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">{draftPages}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/pages/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Page
          </Link>
          <Link
            href="/dashboard/pages"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            View All Pages
          </Link>
        </div>
      </div>
    </div>
  );
}

