"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useCompanyPorts } from "@/lib/useCompanyPorts";
import { verifyAdminSecret } from "@/lib/adminAuth";

const ADMIN_SECRET_KEY = "sobek_admin_secret";

type PortRow = { _id: string; name: string; code: string; displayOrder?: number };

const getHeaders = (secret: string) => ({
  "Content-Type": "application/json",
  "x-admin-secret": secret,
});

export default function AdminPortsPage() {
  const { ports, loading, refetch } = useCompanyPorts();
  const [secret, setSecretState] = useState("");
  const [verifying, setVerifying] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", code: "", displayOrder: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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
    } else {
      setUnlockError("Invalid secret. Please try again.");
    }
  };

  const handleLogout = () => {
    setSecret("");
    setFormData({ name: "", code: "", displayOrder: "" });
    setEditingId(null);
    setError(null);
    setDeleteConfirm(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) return;
    setSubmitting(true);
    setError(null);
    try {
      const body = {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        displayOrder: formData.displayOrder ? Number(formData.displayOrder) : undefined,
      };
      if (!body.name || !body.code) {
        setError("Name and code are required.");
        setSubmitting(false);
        return;
      }
      if (editingId) {
        const res = await fetch(`/api/ports/${editingId}/`, {
          method: "PUT",
          headers: getHeaders(secret),
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Update failed");
          setSubmitting(false);
          return;
        }
        setEditingId(null);
        setFormData({ name: "", code: "", displayOrder: "" });
        await refetch();
      } else {
        const res = await fetch("/api/ports/", {
          method: "POST",
          headers: getHeaders(secret),
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Create failed");
          setSubmitting(false);
          return;
        }
        setFormData({ name: "", code: "", displayOrder: "" });
        await refetch();
      }
    } catch {
      setError("Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (row: PortRow) => {
    setEditingId(row._id);
    setFormData({
      name: row.name,
      code: row.code,
      displayOrder: row.displayOrder != null ? String(row.displayOrder) : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", code: "", displayOrder: "" });
  };

  const handleDelete = async (id: string) => {
    if (!secret) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/ports/${id}/`, {
        method: "DELETE",
        headers: getHeaders(secret),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Delete failed");
        setSubmitting(false);
        setDeleteConfirm(null);
        return;
      }
      setDeleteConfirm(null);
      await refetch();
    } catch {
      setError("Request failed");
    } finally {
      setSubmitting(false);
    }
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

  if (!secret) {
    return (
      <main className="min-h-screen bg-[var(--color-beige)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-xl font-semibold text-[var(--color-primary-900)] mb-2">
            Company Ports Admin
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Enter your admin secret to manage company ports (POL/POD).
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
            <Link href="/admin/" className="text-[var(--color-primary-500)] hover:underline">
              ← Back to Admin
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const portList = ports as PortRow[];

  return (
    <main className="min-h-screen bg-[var(--color-beige)]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-primary-900)]">
              Company Ports
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage ports used in schedules and reservation forms. Used as POL/POD options.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
            aria-label="Re-enter admin secret"
          >
            Re-enter secret
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200" role="alert">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary-900)] mb-4">
            {editingId ? "Edit port" : "Add port"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="tracking-label">Port name</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. El Dekheila (EGDEK)"
                className="tracking-input"
                required
                aria-label="Port name"
              />
            </label>
            <label className="block">
              <span className="tracking-label">Code</span>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="e.g. EGDEK"
                className="tracking-input uppercase"
                required
                aria-label="Port code"
              />
            </label>
            <label className="block">
              <span className="tracking-label">Display order (optional)</span>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData((p) => ({ ...p, displayOrder: e.target.value }))}
                placeholder="0"
                className="tracking-input"
                aria-label="Display order"
              />
            </label>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="tracking-button bg-[var(--color-primary-500)] hover:!bg-[var(--color-accent)] text-white transition-colors"
              >
                {submitting ? "Saving…" : editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-[50px] text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-primary-900)]">
              All ports
            </h2>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={loading}
              className="text-sm text-[var(--color-primary-500)] hover:underline disabled:opacity-50"
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>
          <div className="overflow-x-auto">
            {loading && portList.length === 0 ? (
              <p className="p-8 text-center text-gray-500">Loading…</p>
            ) : portList.length === 0 ? (
              <p className="p-8 text-center text-gray-500">
                No ports yet. Add one above. First load may seed from default list.
              </p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[var(--color-primary-900)] text-white">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Code</th>
                    <th className="px-4 py-3 font-semibold w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portList.map((row) => (
                    <tr key={row._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{row.name}</td>
                      <td className="px-4 py-3 font-medium">{row.code}</td>
                      <td className="px-4 py-3">
                        {deleteConfirm === row._id ? (
                          <span className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleDelete(row._id)}
                              disabled={submitting}
                              className="text-red-600 text-sm font-medium hover:underline"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(null)}
                              className="text-gray-600 text-sm hover:underline"
                            >
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <span className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(row)}
                              className="text-[var(--color-primary-500)] text-sm font-medium hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(row._id)}
                              className="text-red-600 text-sm font-medium hover:underline"
                            >
                              Delete
                            </button>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          <Link href="/admin/" className="text-[var(--color-primary-500)] hover:underline">
            ← Back to Admin
          </Link>
        </p>
      </div>
    </main>
  );
}
