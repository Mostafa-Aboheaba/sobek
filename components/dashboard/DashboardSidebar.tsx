"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@prisma/client";

interface DashboardSidebarProps {
  userRole: UserRole;
}

/**
 * Dashboard Sidebar Navigation
 * 
 * Provides navigation links for all CMS sections.
 * Role-based visibility can be added here if needed.
 */
export default function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      href: "/dashboard/homepage-sections",
      label: "Homepage Sections",
      icon: "🏠",
    },
    {
      href: "/dashboard/pages",
      label: "Pages",
      icon: "📄",
    },
    {
      href: "/dashboard/assets",
      label: "Assets",
      icon: "🖼️",
    },
    {
      href: "/dashboard/theme",
      label: "Theme & Design",
      icon: "🎨",
      adminOnly: true,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: "⚙️",
      adminOnly: true,
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || userRole === UserRole.ADMIN
  );

  return (
    <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

