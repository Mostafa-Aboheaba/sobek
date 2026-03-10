"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const ADMIN_SECRET_KEY = "sobek_admin_secret";

type ScheduleRow = {
  _id: string;
  vesselName: string;
  pol: string;
  polCode: string;
  pod: string;
  podCode: string;
  eta: string;
  etd: string;
};

const defaultForm = {
  vesselName: "",
  pol: "",
  polCode: "",
  pod: "",
  podCode: "",
  eta: "",
  etd: "",
};

const toDateInput = (d: string | Date): string => {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const formatDate = (d: string | Date): string => {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getHeaders = (secret: string) => ({
  "Content-Type": "application/json",
  "x-admin-secret": secret,
});

export default function AdminSchedulesPage() {
  const [secret, setSecretState] = useState("");
  const [schedules, setSchedules] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultForm);
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
    if (stored) setSecretState(stored);
  }, [setSecret]);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/schedules");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load schedules");
        setSchedules([]);
        return;
      }
      setSchedules(data.schedules || []);
    } catch (e) {
      setError("Failed to load schedules");
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (secret) fetchSchedules();
  }, [secret, fetchSchedules]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="secret"]');
    const value = input?.value?.trim();
    if (value) setSecret(value);
  };

  const handleLogout = () => {
    setSecret("");
    setSchedules([]);
    setFormData(defaultForm);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) return;
    setSubmitting(true);
    setError(null);
    try {
      const body = {
        vesselName: formData.vesselName.trim(),
        pol: formData.pol.trim(),
        polCode: formData.polCode.trim().toUpperCase(),
        pod: formData.pod.trim(),
        podCode: formData.podCode.trim().toUpperCase(),
        eta: formData.eta || undefined,
        etd: formData.etd || undefined,
      };
      if (!body.vesselName || !body.pol || !body.polCode || !body.pod || !body.podCode || body.eta == null || body.etd == null) {
        setError("All fields are required.");
        setSubmitting(false);
        return;
      }
      if (editingId) {
        const res = await fetch(`/api/schedules/${editingId}`, {
          method: "PUT",
          headers: getHeaders(secret),
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Update failed");
          setSubmitting(false);
          return;
        }
        setEditingId(null);
        setFormData(defaultForm);
        await fetchSchedules();
      } else {
        const res = await fetch("/api/schedules", {
          method: "POST",
          headers: getHeaders(secret),
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Create failed");
          setSubmitting(false);
          return;
        }
        setFormData(defaultForm);
        await fetchSchedules();
      }
    } catch (e) {
      setError("Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (row: ScheduleRow) => {
    setEditingId(row._id);
    setFormData({
      vesselName: row.vesselName,
      pol: row.pol,
      polCode: row.polCode,
      pod: row.pod,
      podCode: row.podCode,
      eta: toDateInput(row.eta),
      etd: toDateInput(row.etd),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(defaultForm);
  };

  const handleDelete = async (id: string) => {
    if (!secret) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/schedules/${id}`, {
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
      await fetchSchedules();
    } catch (e) {
      setError("Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!secret) {
    return (
      <main className="min-h-screen bg-[var(--color-beige)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-xl font-semibold text-[var(--color-primary-900)] mb-2">
            Schedules Admin
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Enter your admin secret to manage vessel schedules.
          </p>
          <form onSubmit={handleUnlock} className="space-y-4">
            <label className="block">
              <span className="tracking-label">Admin secret</span>
              <input
                type="password"
                name="secret"
                autoComplete="current-password"
                placeholder="Enter secret"
                className="tracking-input"
                aria-label="Admin secret"
              />
            </label>
            <button type="submit" className="tracking-button w-full">
              Unlock
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-500">
            <Link href="/schedule/" className="text-[var(--color-primary-500)] hover:underline">
              ← Back to Ship Schedule
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-beige)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-primary-900)]">
              Schedules Admin
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Create, edit, and delete vessel schedules. Public schedule page:{" "}
              <Link href="/schedule/" className="text-[var(--color-primary-500)] hover:underline">
                /schedule
              </Link>
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
          <div
            className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Add / Edit form */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary-900)] mb-4">
            {editingId ? "Edit schedule" : "Add schedule"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block">
              <span className="tracking-label">Vessel name</span>
              <input
                type="text"
                value={formData.vesselName}
                onChange={(e) => setFormData((p) => ({ ...p, vesselName: e.target.value }))}
                placeholder="e.g. S. KUZNETSOV"
                className="tracking-input"
                required
                aria-label="Vessel name"
              />
            </label>
            <label className="block">
              <span className="tracking-label">POL (Port of loading)</span>
              <input
                type="text"
                value={formData.pol}
                onChange={(e) => setFormData((p) => ({ ...p, pol: e.target.value }))}
                placeholder="e.g. El Dekheila (EGDEK)"
                className="tracking-input"
                required
                aria-label="Port of loading"
              />
            </label>
            <label className="block">
              <span className="tracking-label">POL code</span>
              <input
                type="text"
                value={formData.polCode}
                onChange={(e) => setFormData((p) => ({ ...p, polCode: e.target.value }))}
                placeholder="e.g. EGDEK"
                className="tracking-input uppercase"
                required
                aria-label="POL code"
              />
            </label>
            <label className="block">
              <span className="tracking-label">POD (Port of discharge)</span>
              <input
                type="text"
                value={formData.pod}
                onChange={(e) => setFormData((p) => ({ ...p, pod: e.target.value }))}
                placeholder="e.g. Novorossiysk (RUNVS)"
                className="tracking-input"
                required
                aria-label="Port of discharge"
              />
            </label>
            <label className="block">
              <span className="tracking-label">POD code</span>
              <input
                type="text"
                value={formData.podCode}
                onChange={(e) => setFormData((p) => ({ ...p, podCode: e.target.value }))}
                placeholder="e.g. RUNVS"
                className="tracking-input uppercase"
                required
                aria-label="POD code"
              />
            </label>
            <label className="block">
              <span className="tracking-label">ETA (date)</span>
              <input
                type="date"
                value={formData.eta}
                onChange={(e) => setFormData((p) => ({ ...p, eta: e.target.value }))}
                className="tracking-input"
                required
                aria-label="ETA date"
              />
            </label>
            <label className="block">
              <span className="tracking-label">ETD (date)</span>
              <input
                type="date"
                value={formData.etd}
                onChange={(e) => setFormData((p) => ({ ...p, etd: e.target.value }))}
                className="tracking-input"
                required
                aria-label="ETD date"
              />
            </label>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="tracking-button"
                aria-label={editingId ? "Update schedule" : "Create schedule"}
              >
                {submitting ? "Saving…" : editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-[50px] text-gray-700 hover:bg-gray-50"
                  aria-label="Cancel edit"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-primary-900)]">
              All schedules
            </h2>
            <button
              type="button"
              onClick={fetchSchedules}
              disabled={loading}
              className="text-sm text-[var(--color-primary-500)] hover:underline disabled:opacity-50"
              aria-label="Refresh list"
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>
          <div className="overflow-x-auto">
            {loading && schedules.length === 0 ? (
              <p className="p-8 text-center text-gray-500">Loading…</p>
            ) : schedules.length === 0 ? (
              <p className="p-8 text-center text-gray-500">
                No schedules yet. Add one above or run the seed script.
              </p>
            ) : (
              <table className="w-full text-left text-sm" role="grid" aria-label="Schedules list">
                <thead>
                  <tr className="bg-[var(--color-primary-900)] text-white">
                    <th className="px-4 py-3 font-semibold">Vessel</th>
                    <th className="px-4 py-3 font-semibold">POL</th>
                    <th className="px-4 py-3 font-semibold">POD</th>
                    <th className="px-4 py-3 font-semibold">ETA</th>
                    <th className="px-4 py-3 font-semibold">ETD</th>
                    <th className="px-4 py-3 font-semibold w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((row) => (
                    <tr
                      key={row._id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">{row.vesselName}</td>
                      <td className="px-4 py-3">{row.pol} ({row.polCode})</td>
                      <td className="px-4 py-3">{row.pod} ({row.podCode})</td>
                      <td className="px-4 py-3">{formatDate(row.eta)}</td>
                      <td className="px-4 py-3">{formatDate(row.etd)}</td>
                      <td className="px-4 py-3">
                        {deleteConfirm === row._id ? (
                          <span className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleDelete(row._id)}
                              disabled={submitting}
                              className="text-red-600 text-sm font-medium hover:underline"
                              aria-label="Confirm delete"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(null)}
                              className="text-gray-600 text-sm hover:underline"
                              aria-label="Cancel delete"
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
                              aria-label="Edit schedule"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(row._id)}
                              className="text-red-600 text-sm font-medium hover:underline"
                              aria-label="Delete schedule"
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
          <Link href="/schedule/" className="text-[var(--color-primary-500)] hover:underline">
            ← Back to Ship Schedule (public)
          </Link>
        </p>
      </div>
    </main>
  );
}
