"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
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
        </p>
      </div>
    </main>
  );
}
