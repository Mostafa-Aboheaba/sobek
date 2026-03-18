import { handlers } from "@/lib/auth";

/**
 * NextAuth v5 API Route Handler
 * 
 * Handles all authentication requests:
 * - POST /api/auth/signin
 * - POST /api/auth/signout
 * - GET /api/auth/session
 * - POST /api/auth/callback/credentials
 */
export const { GET, POST } = handlers;

