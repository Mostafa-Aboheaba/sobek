"use client";

import { useEffect, useState, FormEvent } from "react";
import { UserRole } from "@prisma/client";

interface ThemeSettings {
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    accentDark: string;
    neutralDark: string;
    neutralLight: string;
    beige: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  typography: {
    headingFontSize: string;
    bodyFontSize: string;
  };
}

/**
 * Theme Editor Page
 * 
 * Allows admins to customize the entire design system:
 * - Color schemes
 * - Fonts
 * - Typography settings
 * - And more
 */
export default function ThemeEditorPage() {
  const [theme, setTheme] = useState<ThemeSettings>({
    colors: {
      primary: "#2A478B",
      primaryDark: "#012C4E",
      accent: "#A6823A",
      accentDark: "#8A6B2F",
      neutralDark: "#212121",
      neutralLight: "#757575",
      beige: "#FAF7F0",
    },
    fonts: {
      primary: "Poppins",
      secondary: "Manjari",
    },
    typography: {
      headingFontSize: "32px",
      bodyFontSize: "16px",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const res = await fetch("/api/cms/settings");
      if (res.ok) {
        const data = await res.json();
        const settings = data.settings || [];

        // Load theme settings
        const themeSetting = settings.find((s: any) => s.key === "theme");
        if (themeSetting) {
          setTheme(JSON.parse(themeSetting.value));
        }
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/cms/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "theme",
          value: JSON.stringify(theme),
          type: "json",
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        // Apply theme immediately
        applyTheme();
      }
    } catch (error) {
      console.error("Error saving theme:", error);
    } finally {
      setSaving(false);
    }
  };

  const applyTheme = () => {
    // Inject CSS variables dynamically
    const root = document.documentElement;
    root.style.setProperty("--color-primary-500", theme.colors.primary);
    root.style.setProperty("--color-primary-900", theme.colors.primaryDark);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-accent-dark", theme.colors.accentDark);
    root.style.setProperty("--color-neutral-dark", theme.colors.neutralDark);
    root.style.setProperty("--color-neutral-light", theme.colors.neutralLight);
    root.style.setProperty("--color-beige", theme.colors.beige);
  };

  const updateColor = (category: keyof ThemeSettings["colors"], color: string) => {
    setTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [category]: color,
      },
    }));
  };

  const updateFont = (category: keyof ThemeSettings["fonts"], font: string) => {
    setTheme((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [category]: font,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading theme settings...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Theme & Design System</h1>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          Theme saved successfully! Changes are applied immediately.
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Colors Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Color Palette</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.colors.primary}
                  onChange={(e) => updateColor("primary", e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.primary}
                  onChange={(e) => updateColor("primary", e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="#2A478B"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Dark
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.colors.primaryDark}
                  onChange={(e) => updateColor("primaryDark", e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.primaryDark}
                  onChange={(e) => updateColor("primaryDark", e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.colors.accent}
                  onChange={(e) => updateColor("accent", e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.accent}
                  onChange={(e) => updateColor("accent", e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Dark
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.colors.accentDark}
                  onChange={(e) => updateColor("accentDark", e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.accentDark}
                  onChange={(e) => updateColor("accentDark", e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neutral Dark
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.colors.neutralDark}
                  onChange={(e) => updateColor("neutralDark", e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.neutralDark}
                  onChange={(e) => updateColor("neutralDark", e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beige Background
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.colors.beige}
                  onChange={(e) => updateColor("beige", e.target.value)}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.colors.beige}
                  onChange={(e) => updateColor("beige", e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fonts Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Typography</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Font
              </label>
              <select
                value={theme.fonts.primary}
                onChange={(e) => updateFont("primary", e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Inter">Inter</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Lato">Lato</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Font
              </label>
              <select
                value={theme.fonts.secondary}
                onChange={(e) => updateFont("secondary", e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="Manjari">Manjari</option>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Inter">Inter</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h2>
          <div className="p-6 rounded-lg" style={{ backgroundColor: theme.colors.beige }}>
            <p
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.primaryDark, fontFamily: theme.fonts.primary }}
            >
              Sample Heading
            </p>
            <p
              className="mb-2"
              style={{ color: theme.colors.accent, fontFamily: theme.fonts.primary }}
            >
              Accent Text Color
            </p>
            <p style={{ color: theme.colors.neutralDark, fontFamily: theme.fonts.primary }}>
              Body text with primary font. This is how your content will look.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={applyTheme}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Preview Changes
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Theme"}
          </button>
        </div>
      </form>
    </div>
  );
}

