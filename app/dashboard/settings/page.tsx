"use client";

import { useEffect, useState, FormEvent } from "react";
import { UserRole } from "@prisma/client";

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
}

/**
 * Settings Page
 * 
 * Manage site-wide settings (admin only).
 */
export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/cms/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      setSettings(data.settings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string, value: string, type: string) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/cms/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, value, type }),
      });

      if (!res.ok) throw new Error("Failed to save setting");

      setSuccess("Setting saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateLocalSetting = (key: string, value: string) => {
    setSettings(
      settings.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  // Common settings that might be useful
  const defaultSettings = [
    { key: "site-title", label: "Site Title", type: "string" },
    { key: "site-description", label: "Site Description", type: "string" },
    { key: "contact-email", label: "Contact Email", type: "string" },
    { key: "contact-phone", label: "Contact Phone", type: "string" },
  ];

  // Merge existing settings with defaults
  const allSettings = defaultSettings.map((def) => {
    const existing = settings.find((s) => s.key === def.key);
    return existing || { id: "", key: def.key, value: "", type: def.type };
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Site Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {allSettings.map((setting) => (
          <div key={setting.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {defaultSettings.find((d) => d.key === setting.key)?.label}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={setting.value}
                onChange={(e) => updateLocalSetting(setting.key, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <button
                onClick={() => handleSave(setting.key, setting.value, setting.type)}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        ))}

        {settings.length === 0 && (
          <p className="text-gray-500 text-sm">
            No custom settings yet. Settings will be created when you save them.
          </p>
        )}
      </div>
    </div>
  );
}

