import { auth } from "./auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

/**
 * Authentication Utilities
 * 
 * Helper functions for protecting routes and checking user permissions
 * in Server Components and API routes.
 */

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
}

/**
 * Get the current session user
 * Use in Server Components or API routes
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require authentication - redirects to login if not authenticated
 * Use in Server Components
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/dashboard/login");
  }
  
  return user;
}

/**
 * Require specific role - redirects to login if not authenticated or wrong role
 * Use in Server Components
 */
export async function requireRole(role: UserRole | UserRole[]): Promise<SessionUser> {
  const user = await requireAuth();
  const requiredRoles = Array.isArray(role) ? role : [role];
  
  if (!requiredRoles.includes(user.role)) {
    redirect("/dashboard?error=unauthorized");
  }
  
  return user;
}

/**
 * Check if user has required role
 * Use in Server Components or API routes
 */
export async function hasRole(role: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  
  const requiredRoles = Array.isArray(role) ? role : [role];
  return requiredRoles.includes(user.role);
}

/**
 * Require admin role
 * Use in Server Components
 */
export async function requireAdmin(): Promise<SessionUser> {
  return requireRole(UserRole.ADMIN);
}

