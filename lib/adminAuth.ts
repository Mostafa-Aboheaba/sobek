/**
 * Verifies the admin secret against the server.
 * Returns true only if the server confirms the secret matches ADMIN_SECRET.
 */
export async function verifyAdminSecret(secret: string): Promise<boolean> {
  if (!secret || typeof secret !== "string") return false;
  try {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: secret.trim() }),
    });
    const data = await res.json();
    return data?.valid === true;
  } catch {
    return false;
  }
}
