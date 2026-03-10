"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useCompanyPorts } from "@/lib/useCompanyPorts";
import { formatPortDisplay } from "@/lib/ports";

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

const formatDate = (d: string | Date): string => {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ScheduleSearchCard = () => {
  const { ports } = useCompanyPorts();
  const [activeTab, setActiveTab] = useState<"tracking" | "schedules">("schedules");
  const [fromPort, setFromPort] = useState("");
  const [toPort, setToPort] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [vesselName, setVesselName] = useState("");
  const [schedules, setSchedules] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwapPorts = useCallback(() => {
    setFromPort(toPort);
    setToPort(fromPort);
  }, [fromPort, toPort]);

  const handleSearch = useCallback(async () => {
    setError(null);
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (fromPort.trim()) params.set("pol", fromPort.trim());
      if (toPort.trim()) params.set("pod", toPort.trim());
      if (vesselName.trim()) params.set("vesselName", vesselName.trim());
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);
      const res = await fetch(`/api/schedules?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setSchedules([]);
        setError(data.error || "Failed to load schedules");
        return;
      }
      setSchedules(data.schedules || []);
    } catch (e) {
      setSchedules([]);
      setError("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  }, [fromPort, toPort, vesselName, dateFrom, dateTo]);

  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch]
  );

  return (
    <section
      className="w-full max-w-[1440px] mx-auto mb-8 md:mb-12"
      aria-label="Tracking and schedules"
    >
      {/* Card container - Maersk/MSC style */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("tracking")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
              activeTab === "tracking"
                ? "text-[var(--color-primary-500)] border-b-2 border-[var(--color-primary-500)] bg-gray-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/30"
            }`}
            aria-pressed={activeTab === "tracking"}
            aria-label="Tracking tab"
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Tracking</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schedules")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
              activeTab === "schedules"
                ? "text-[var(--color-primary-500)] border-b-2 border-[var(--color-primary-500)] bg-gray-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/30"
            }`}
            aria-pressed={activeTab === "schedules"}
            aria-label="Schedules tab"
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Schedules</span>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "tracking" && (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">
                Track your shipment with your booking number and contact details.
              </p>
              <Link
                href="/reservation/"
                className="inline-flex items-center gap-2 bg-[var(--color-primary-500)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--color-accent)] transition-colors"
                aria-label="Go to reservation and tracking page"
              >
                Go to Reservation &amp; Tracking
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

          {activeTab === "schedules" && (
            <>
              {/* From / To / Date - MSC style */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="tracking-label">From (Port)</span>
                    <select
                      value={fromPort}
                      onChange={(e) => setFromPort(e.target.value)}
                      onKeyDown={handleKeyDownSearch}
                      className="tracking-input"
                      aria-label="Origin port"
                    >
                      <option value="">Select origin port</option>
                      {ports.map((port) => (
                        <option key={port.code} value={port.code}>
                          {port.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="tracking-label">To (Port)</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSwapPorts}
                        className="shrink-0 self-center p-2 rounded-full bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                        aria-label="Swap origin and destination ports"
                      >
                        {/* Vertical arrows: small screens */}
                        <svg className="w-5 h-5 block md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        {/* Horizontal arrows: large screens */}
                        <svg className="w-5 h-5 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </button>
                      <select
                        value={toPort}
                        onChange={(e) => setToPort(e.target.value)}
                        onKeyDown={handleKeyDownSearch}
                        className="tracking-input flex-1"
                        aria-label="Destination port"
                      >
                        <option value="">Select destination port</option>
                        {ports.map((port) => (
                          <option key={port.code} value={port.code}>
                            {port.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="block">
                    <span className="tracking-label">Vessel name (optional)</span>
                    <input
                      type="text"
                      value={vesselName}
                      onChange={(e) => setVesselName(e.target.value)}
                      onKeyDown={handleKeyDownSearch}
                      placeholder="e.g. S. KUZNETSOV"
                      className="tracking-input"
                      aria-label="Vessel name filter"
                    />
                  </label>
                  <label className="block">
                    <span className="tracking-label">Date from (optional)</span>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="tracking-input"
                      aria-label="Departure date from"
                    />
                  </label>
                  <label className="block">
                    <span className="tracking-label">Date to (optional)</span>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="tracking-input"
                      aria-label="Departure date to"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="tracking-button flex items-center justify-center gap-2 w-full sm:w-auto min-w-[140px] hover:bg-[var(--color-accent)]"
                  aria-label="Search schedules"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                  ) : (
                    <>
                      <span>Search</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Results table - Google Sheet inspiration */}
              {searched && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                  {error && (
                    <p className="p-4 text-red-600 bg-red-50 rounded-t-xl" role="alert">
                      {error}
                    </p>
                  )}
                  {!error && schedules.length === 0 && !loading && (
                    <p className="p-6 text-gray-500 text-center">
                      No sailings match your filters. Try different ports or dates.
                    </p>
                  )}
                  {!error && schedules.length > 0 && (
                    <table className="w-full text-left text-sm" role="grid" aria-label="Schedule results">
                      <thead>
                        <tr className="bg-[var(--color-primary-900)] text-white">
                          <th className="px-4 py-3 font-semibold">Vessel Name</th>
                          <th className="px-4 py-3 font-semibold">POL (Origin)</th>
                          <th className="px-4 py-3 font-semibold">POD (Destination)</th>
                          <th className="px-4 py-3 font-semibold">ETA</th>
                          <th className="px-4 py-3 font-semibold">ETD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules.map((row) => (
                          <tr
                            key={row._id}
                            className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 font-medium text-[var(--color-primary-900)]">
                              {row.vesselName}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {formatPortDisplay(row.pol, row.polCode)}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {formatPortDisplay(row.pod, row.podCode)}
                            </td>
                            <td className="px-4 py-3 text-gray-700">{formatDate(row.eta)}</td>
                            <td className="px-4 py-3 text-gray-700">{formatDate(row.etd)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSearchCard;
