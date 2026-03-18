import { auth } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

/**
 * Dashboard Layout
 * 
 * Protected layout that wraps all dashboard pages.
 * 
 * Architecture Decision:
 * - Middleware handles route protection and redirects to /dashboard/login
 * - If session exists, render authenticated layout with sidebar/header
 * - If no session, render children (which will be login page due to middleware)
 * 
 * Force dynamic rendering since auth() uses headers() internally
 */
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get session using NextAuth v5 auth() function
  // auth() returns null if not authenticated, or session object if authenticated
  const session = await auth();

  // If no session, render children (login page) without layout
  // Middleware ensures only login is accessible without auth
  if (!session?.user) {
    return <>{children}</>;
  }

  // Authenticated layout with sidebar and header
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />
      <div className="flex">
        <DashboardSidebar userRole={session.user.role} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

