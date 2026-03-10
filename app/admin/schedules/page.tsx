"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { COMPANY_PORTS, formatPortDisplay } from "@/lib/ports";

const ADMIN_SECRET_KEY = "sobek_admin_secret";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes inactivity

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
  const [showSecret, setShowSecret] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; failed: number; skipped: number } | null>(null);
  const sessionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const resetSessionTimer = useCallback(() => {
    if (!secret) return;
    if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    sessionTimeoutRef.current = setTimeout(() => {
      setSecret("");
      if (typeof window !== "undefined") window.sessionStorage.removeItem(ADMIN_SECRET_KEY);
      sessionTimeoutRef.current = null;
    }, SESSION_TIMEOUT_MS);
  }, [secret, setSecret]);

  useEffect(() => {
    if (!secret) return;
    resetSessionTimer();
    const handleActivity = () => resetSessionTimer();
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    return () => {
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    };
  }, [secret, resetSessionTimer]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="secret"]');
    const value = input?.value?.trim();
    if (value) setSecret(value);
  };

  const handleLogout = () => {
    if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    sessionTimeoutRef.current = null;
    setSecret("");
    setSchedules([]);
    setFormData(defaultForm);
    setEditingId(null);
    setError(null);
    setImportResult(null);
  };

  const handleExportCsv = useCallback(() => {
    if (schedules.length === 0) return;
    const escape = (v: string) => (v.includes(",") || v.includes('"') ? `"${String(v).replace(/"/g, '""')}"` : v);
    const toIso = (d: string | Date) => {
      const date = typeof d === "string" ? new Date(d) : d;
      return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
    };
    const header = "Vessel Name,POL,POL Code,POD,POD Code,ETA,ETD";
    const rows = schedules.map((s) =>
      [escape(s.vesselName), escape(s.pol), escape(s.polCode), escape(s.pod), escape(s.podCode), toIso(s.eta), toIso(s.etd)].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schedules-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [schedules]);

  const parseCsvRow = (line: string): string[] => {
    const out: string[] = [];
    let i = 0;
    while (i < line.length) {
      if (line[i] === '"') {
        let end = i + 1;
        while (end < line.length) {
          if (line[end] === '"' && line[end + 1] !== '"') break;
          if (line[end] === '"' && line[end + 1] === '"') end += 1;
          end += 1;
        }
        out.push(line.slice(i + 1, end).replace(/""/g, '"'));
        i = line[end] === "," ? end + 1 : end;
      } else {
        const comma = line.indexOf(",", i);
        const end = comma === -1 ? line.length : comma;
        out.push(line.slice(i, end).trim());
        i = comma === -1 ? line.length : comma + 1;
      }
    }
    return out;
  };

  const handleImportCsv = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !secret) return;
      e.target.value = "";
      setImporting(true);
      setError(null);
      setImportResult(null);
      let success = 0;
      let failed = 0;
      let skipped = 0;
      try {
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length < 2) {
          setError("CSV must have a header row and at least one data row.");
          setImporting(false);
          return;
        }
        const res = await fetch("/api/schedules");
        const data = await res.json();
        const existingList: ScheduleRow[] = res.ok && data.schedules ? data.schedules : [];
        const toKey = (v: string, p: string, d: string, eta: string, etd: string) =>
          `${String(v).trim().toUpperCase()}|${p}|${d}|${eta}|${etd}`;
        const existingKeys = new Set(
          existingList.map((s) => {
            const etaStr = typeof s.eta === "string" ? s.eta.slice(0, 10) : new Date(s.eta).toISOString().slice(0, 10);
            const etdStr = typeof s.etd === "string" ? s.etd.slice(0, 10) : new Date(s.etd).toISOString().slice(0, 10);
            return toKey(s.vesselName, s.polCode, s.podCode, etaStr, etdStr);
          })
        );
        const cols = parseCsvRow(lines[0]);
        const vesselIdx = cols.findIndex((c) => /vessel|name/i.test(c));
        const polIdx = cols.findIndex((c) => /^pol$/i.test(c) || (c.toLowerCase().includes("pol") && !c.toLowerCase().includes("code")));
        const polCodeIdx = cols.findIndex((c) => /pol\s*code|polcode/i.test(c));
        const podIdx = cols.findIndex((c) => /^pod$/i.test(c) || (c.toLowerCase().includes("pod") && !c.toLowerCase().includes("code")));
        const podCodeIdx = cols.findIndex((c) => /pod\s*code|podcode/i.test(c));
        const etaIdx = cols.findIndex((c) => /eta/i.test(c));
        const etdIdx = cols.findIndex((c) => /etd/i.test(c));
        if (vesselIdx === -1 || polIdx === -1 || polCodeIdx === -1 || podIdx === -1 || podCodeIdx === -1 || etaIdx === -1 || etdIdx === -1) {
          setError("CSV must have columns: Vessel Name, POL, POL Code, POD, POD Code, ETA, ETD.");
          setImporting(false);
          return;
        }
        const importedKeysThisRun = new Set<string>();
        for (let i = 1; i < lines.length; i++) {
          const cells = parseCsvRow(lines[i]);
          const vesselName = (cells[vesselIdx] ?? "").trim();
          const pol = (cells[polIdx] ?? "").trim();
          const polCode = (cells[polCodeIdx] ?? "").trim().toUpperCase();
          const pod = (cells[podIdx] ?? "").trim();
          const podCode = (cells[podCodeIdx] ?? "").trim().toUpperCase();
          let eta = (cells[etaIdx] ?? "").trim();
          let etd = (cells[etdIdx] ?? "").trim();
          if (!vesselName || !pol || !polCode || !pod || !podCode || !eta || !etd) {
            failed += 1;
            continue;
          }
          const parseDate = (d: string): string => {
            const dmY = d.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
            if (dmY) return `${dmY[3]}-${dmY[2].padStart(2, "0")}-${dmY[1].padStart(2, "0")}`;
            if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
            return d;
          };
          eta = parseDate(eta);
          etd = parseDate(etd);
          const rowKey = toKey(vesselName, polCode, podCode, eta, etd);
          if (existingKeys.has(rowKey) || importedKeysThisRun.has(rowKey)) {
            skipped += 1;
            continue;
          }
          try {
            const postRes = await fetch("/api/schedules", {
              method: "POST",
              headers: getHeaders(secret),
              body: JSON.stringify({ vesselName, pol, polCode, pod, podCode, eta, etd }),
            });
            if (postRes.ok) {
              success += 1;
              existingKeys.add(rowKey);
              importedKeysThisRun.add(rowKey);
            } else {
              failed += 1;
            }
          } catch {
            failed += 1;
          }
        }
        setImportResult({ success, failed, skipped });
        if (success > 0) await fetchSchedules();
      } catch {
        setError("Failed to read or parse CSV.");
      } finally {
        setImporting(false);
      }
    },
    [secret, fetchSchedules]
  );

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
        const res = await fetch(`/api/schedules/${editingId}/`, {
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
      const res = await fetch(`/api/schedules/${String(id)}/`, {
        method: "DELETE",
        headers: getHeaders(secret),
      });
      if (!res.ok) {
        let message = "Delete failed";
        try {
          const data = await res.json();
          if (data?.error) message = data.error;
        } catch {
          const text = await res.text();
          if (text) message = text.slice(0, 100);
        }
        setError(message);
        setSubmitting(false);
        setDeleteConfirm(null);
        return;
      }
      setDeleteConfirm(null);
      await fetchSchedules();
    } catch (e) {
      setError("Request failed. Check the console for details.");
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
            <button type="submit" className="tracking-button w-full">
              Unlock
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-500">
            <Link href="/admin/" className="text-[var(--color-primary-500)] hover:underline">
              ← Back to Admin
            </Link>
            {" · "}
            <Link href="/schedule/" className="text-[var(--color-primary-500)] hover:underline">
              Ship Schedule
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
        <p className="text-sm text-gray-500 mb-4">
          Session expires after 30 minutes of inactivity. You will need to re-enter the secret.
        </p>

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
              <select
                value={formData.polCode}
                onChange={(e) => {
                  const code = e.target.value;
                  const port = COMPANY_PORTS.find((p) => p.code === code);
                  if (port) setFormData((p) => ({ ...p, pol: port.name, polCode: port.code }));
                  else setFormData((p) => ({ ...p, polCode: code }));
                }}
                className="tracking-input"
                required
                aria-label="Port of loading"
              >
                <option value="">Select port...</option>
                {COMPANY_PORTS.map((port) => (
                  <option key={port.code} value={port.code}>
                    {port.name}
                  </option>
                ))}
                {formData.polCode && !COMPANY_PORTS.some((p) => p.code === formData.polCode) && (
                  <option value={formData.polCode}>{formData.pol || formData.polCode}</option>
                )}
              </select>
            </label>
            <label className="block">
              <span className="tracking-label">POL code</span>
              <input
                type="text"
                value={formData.polCode}
                onChange={(e) => {
                  const code = e.target.value.toUpperCase();
                  const port = COMPANY_PORTS.find((p) => p.code === code);
                  setFormData((p) => ({
                    ...p,
                    polCode: code,
                    ...(port ? { pol: port.name } : {}),
                  }));
                }}
                placeholder="e.g. EGDEK"
                className="tracking-input uppercase"
                required
                aria-label="POL code"
              />
            </label>
            <label className="block">
              <span className="tracking-label">POD (Port of discharge)</span>
              <select
                value={formData.podCode}
                onChange={(e) => {
                  const code = e.target.value;
                  const port = COMPANY_PORTS.find((p) => p.code === code);
                  if (port) setFormData((p) => ({ ...p, pod: port.name, podCode: port.code }));
                  else setFormData((p) => ({ ...p, podCode: code }));
                }}
                className="tracking-input"
                required
                aria-label="Port of discharge"
              >
                <option value="">Select port...</option>
                {COMPANY_PORTS.map((port) => (
                  <option key={port.code} value={port.code}>
                    {port.name}
                  </option>
                ))}
                {formData.podCode && !COMPANY_PORTS.some((p) => p.code === formData.podCode) && (
                  <option value={formData.podCode}>{formData.pod || formData.podCode}</option>
                )}
              </select>
            </label>
            <label className="block">
              <span className="tracking-label">POD code</span>
              <input
                type="text"
                value={formData.podCode}
                onChange={(e) => {
                  const code = e.target.value.toUpperCase();
                  const port = COMPANY_PORTS.find((p) => p.code === code);
                  setFormData((p) => ({
                    ...p,
                    podCode: code,
                    ...(port ? { pod: port.name } : {}),
                  }));
                }}
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
                className="tracking-button bg-[var(--color-primary-500)] hover:bg-[var(--color-accent)] text-white transition-colors"
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
          <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-[var(--color-primary-900)]">
              All schedules
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={loading || schedules.length === 0}
                className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                aria-label="Export as CSV"
              >
                Export CSV
              </button>
              <label className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCsv}
                  disabled={loading || importing}
                  className="sr-only"
                  aria-label="Import from CSV"
                />
                {importing ? "Importing…" : "Import CSV"}
              </label>
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
          </div>
          {importResult !== null && (
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-700">
              Import complete: {importResult.success} added, {importResult.failed} failed
              {importResult.skipped > 0 ? `, ${importResult.skipped} skipped (same sailing: same vessel, route & dates)` : ""}.
            </div>
          )}
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
                      <td className="px-4 py-3">{formatPortDisplay(row.pol, row.polCode)}</td>
                      <td className="px-4 py-3">{formatPortDisplay(row.pod, row.podCode)}</td>
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
          <Link href="/admin/" className="text-[var(--color-primary-500)] hover:underline">
            ← Back to Admin
          </Link>
          {" · "}
          <Link href="/schedule/" className="text-[var(--color-primary-500)] hover:underline">
            Ship Schedule (public)
          </Link>
        </p>
      </div>
    </main>
  );
}
