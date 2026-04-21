"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { verifyAdminSecret } from "@/lib/adminAuth";

const ADMIN_SECRET_KEY = "sobek_admin_secret";

export default function AdminDashboardPage() {
  const [secret, setSecretState] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const setSecret = useCallback((s: string) => {
    setSecretState(s);
    if (typeof window !== "undefined") {
      if (s) window.sessionStorage.setItem(ADMIN_SECRET_KEY, s);
      else window.sessionStorage.removeItem(ADMIN_SECRET_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem(ADMIN_SECRET_KEY);
    if (!stored) {
      setVerifying(false);
      return;
    }
    let cancelled = false;
    verifyAdminSecret(stored).then((valid) => {
      if (cancelled) return;
      setVerifying(false);
      if (valid) {
        setSecretState(stored);
        setVerified(true);
      } else {
        window.sessionStorage.removeItem(ADMIN_SECRET_KEY);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [setSecret]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError(null);
    const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="secret"]');
    const value = input?.value?.trim();
    if (!value) return;
    setVerifying(true);
    const valid = await verifyAdminSecret(value);
    setVerifying(false);
    if (valid) {
      setSecret(value);
      setVerified(true);
    } else {
      setUnlockError("Invalid secret. Please try again.");
    }
  };

  const handleLogout = () => {
    setSecret("");
    setVerified(false);
  };

  if (verifying) {
    return (
      <main className="min-h-screen bg-[var(--color-beige)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-gray-600">Checking access…</p>
        </div>
      </main>
    );
  }

  if (!verified) {
    return (
      <main className="min-h-screen bg-[var(--color-beige)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-xl font-semibold text-[var(--color-primary-900)] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Enter your admin secret to continue.
          </p>
          <form onSubmit={handleUnlock} className="space-y-4">
            <label className="block">
              <span className="tracking-label">Admin secret</span>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  name="secret"
                  autoComplete="current-password"
                  placeholder="Enter secret"
                  className="tracking-input pr-12"
                  aria-label="Admin secret"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded"
                  aria-label={showSecret ? "Hide secret" : "Show secret"}
                  tabIndex={0}
                >
                  {showSecret ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </label>
            {unlockError && (
              <p className="text-red-600 text-sm" role="alert">
                {unlockError}
              </p>
            )}
            <button type="submit" className="tracking-button w-full" disabled={verifying}>
              Unlock
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-500">
            <Link href="/" className="text-[var(--color-primary-500)] hover:underline">
              ← Back to website
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-beige)]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-[var(--color-primary-900)] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-sm mb-8">
          Choose a section to manage.
        </p>
        <div className="space-y-4">
          <Link
            href="/admin/ports/"
            className="block bg-white rounded-2xl shadow border border-gray-100 p-6 hover:border-[var(--color-primary-500)] hover:shadow-md transition-all group"
            aria-label="Manage company ports"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-900)] text-white group-hover:bg-[var(--color-primary-500)] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span>
                <span className="font-semibold text-[var(--color-primary-900)] block">Company Ports</span>
                <span className="text-sm text-gray-500">Manage POL/POD options for schedules and reservation forms.</span>
              </span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary-500)] ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <Link
            href="/admin/schedules/"
            className="block bg-white rounded-2xl shadow border border-gray-100 p-6 hover:border-[var(--color-primary-500)] hover:shadow-md transition-all group"
            aria-label="Manage vessel schedules"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-900)] text-white group-hover:bg-[var(--color-primary-500)] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <span>
                <span className="font-semibold text-[var(--color-primary-900)] block">Vessel Schedules</span>
                <span className="text-sm text-gray-500">Create, edit, import and export sailings (POL, POD, ETA, ETD).</span>
              </span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary-500)] ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          <Link href="/" className="text-[var(--color-primary-500)] hover:underline">
            ← Back to website
          </Link>
          {" · "}
          <button
            type="button"
            onClick={handleLogout}
            className="text-[var(--color-primary-500)] hover:underline"
          >
            Re-enter secret
          </button>
        </p>
      </div>
    </main>
  );
}
