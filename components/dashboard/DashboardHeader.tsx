"use client";

import { signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";

interface DashboardHeaderProps {
  user: {
    email: string;
    name?: string | null;
    role: UserRole;
  };
}

/**
 * Dashboard Header
 * 
 * Displays user information and logout button.
 */
export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/dashboard/login" });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage your website content
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

