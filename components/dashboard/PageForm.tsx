"use client";

import { useState, FormEvent } from "react";

interface PageSection {
  key: string;
  title: string | null;
  content: string;
  contentType: "MARKDOWN" | "HTML" | "TEXT";
  order: number;
  metadata: string;
}

interface PageFormProps {
  page?: {
    slug: string;
    title: string;
    description: string | null;
    status: "DRAFT" | "PUBLISHED";
    sections: PageSection[];
  };
  onSuccess: (slug?: string) => void;
  onCancel: () => void;
}

/**
 * Page Form Component
 * 
 * Handles creating and editing pages with sections.
 * Supports adding/removing/reordering sections.
 */
export default function PageForm({ page, onSuccess, onCancel }: PageFormProps) {
  const isEditing = !!page;

  const [slug, setSlug] = useState(page?.slug || "");
  const [title, setTitle] = useState(page?.title || "");
  const [description, setDescription] = useState(page?.description || "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    page?.status || "DRAFT"
  );
  const [sections, setSections] = useState<PageSection[]>(
    page?.sections || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/cms/pages/${page.slug}`
        : "/api/cms/pages";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          title,
          description,
          status,
          sections,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save page");
      }

      const data = await res.json();
      onSuccess(data.page?.slug || slug);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        key: `section-${sections.length + 1}`,
        title: "",
        content: "",
        contentType: "MARKDOWN",
        order: sections.length,
        metadata: "{}",
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, updates: Partial<PageSection>) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], ...updates };
    setSections(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Page Details</h2>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug (URL path)
          </label>
          <input
            type="text"
            id="slug"
            required
            disabled={isEditing}
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
            placeholder="about-us"
          />
          <p className="mt-1 text-sm text-gray-500">
            URL path: /{slug || "..."}
          </p>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="About Us"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Page description"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Sections</h2>
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            + Add Section
          </button>
        </div>

        {sections.length === 0 ? (
          <p className="text-gray-500 text-sm">No sections yet. Click "Add Section" to create one.</p>
        ) : (
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Section {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key (identifier)
                    </label>
                    <input
                      type="text"
                      required
                      value={section.key}
                      onChange={(e) => updateSection(index, { key: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="hero-title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content Type
                    </label>
                    <select
                      value={section.contentType}
                      onChange={(e) => updateSection(index, { contentType: e.target.value as any })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="MARKDOWN">Markdown</option>
                      <option value="HTML">HTML</option>
                      <option value="TEXT">Plain Text</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (optional)
                  </label>
                  <input
                    type="text"
                    value={section.title || ""}
                    onChange={(e) => updateSection(index, { title: e.target.value || null })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Section title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={section.content}
                    onChange={(e) => updateSection(index, { content: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono text-sm"
                    placeholder={
                      section.contentType === "MARKDOWN"
                        ? "Markdown content..."
                        : section.contentType === "HTML"
                        ? "HTML content..."
                        : "Plain text content..."
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditing ? "Update Page" : "Create Page"}
        </button>
      </div>
    </form>
  );
}

