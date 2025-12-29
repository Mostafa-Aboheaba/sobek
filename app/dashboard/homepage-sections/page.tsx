"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Homepage Sections Management Page
 * 
 * Shows all editable sections on the homepage and provides
 * instructions for editing them via the CMS.
 */
export default function HomepageSectionsPage() {
  const [pageExists, setPageExists] = useState(false);

  useEffect(() => {
    // Check if homepage page exists
    fetch("/api/cms/pages/home")
      .then((res) => setPageExists(res.ok))
      .catch(() => setPageExists(false));
  }, []);

  const sections = [
    {
      key: "hero-heading",
      label: "Hero Heading",
      description: "Main heading in the hero section (supports HTML, e.g., <br />)",
      example: "Right Line Sails,<br />Sobek Delivers",
      location: "Hero Section - Top of homepage",
    },
    {
      key: "hero-tagline",
      label: "Hero Tagline",
      description: "Subheading below the main hero heading",
      example: "Fast reliable sea freight solution",
      location: "Hero Section",
    },
    {
      key: "hero-paragraph",
      label: "Hero Paragraph",
      description: "Description text in the hero section",
      example: "We provide reliable, efficient, and cost-effective...",
      location: "Hero Section",
    },
    {
      key: "about-sobek-title",
      label: "About Sobek Title",
      description: "Heading for the About Sobek section",
      location: "About Sobek Section",
    },
    {
      key: "about-sobek-text",
      label: "About Sobek Text",
      description: "Main content text for About Sobek section",
      location: "About Sobek Section",
    },
    {
      key: "services-heading",
      label: "Services Heading",
      description: "Main heading for the services section",
      location: "Our Services Section",
    },
    {
      key: "about-right-line-title",
      label: "About Right Line Title",
      description: "Heading for the About Right Line section",
      location: "About Right Line Section",
    },
    {
      key: "about-right-line-text",
      label: "About Right Line Text",
      description: "Main content text for About Right Line section",
      location: "About Right Line Section",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homepage Sections</h1>
          <p className="text-gray-600 mt-2">
            Manage editable content sections on your homepage
          </p>
        </div>
        {!pageExists && (
          <Link
            href="/dashboard/pages/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Homepage Content
          </Link>
        )}
      </div>

      {!pageExists ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Homepage Content Not Created Yet
          </h2>
          <p className="text-blue-800 mb-4">
            To make homepage sections editable, you need to create a page with slug <code className="bg-blue-100 px-2 py-1 rounded">home</code> in the CMS.
          </p>
          <div className="bg-white rounded p-4 text-sm">
            <p className="font-semibold mb-2">Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Click "Create Homepage Content" button above</li>
              <li>Set the slug to: <code className="bg-gray-100 px-1 rounded">home</code></li>
              <li>Set status to: <strong>Published</strong></li>
              <li>Add sections with the keys listed below</li>
              <li>Save and publish the page</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800">
            ✓ Homepage content page exists.{" "}
            <Link
              href="/dashboard/pages/home/edit"
              className="text-green-900 underline font-medium"
            >
              Edit homepage content →
            </Link>
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Available Homepage Sections
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            These sections can be edited through the CMS. Add them as sections in your "home" page.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {sections.map((section) => (
            <div key={section.key} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.label}
                    </h3>
                    <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {section.key}
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {section.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    📍 Location: {section.location}
                  </p>
                  {section.example && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                      <p className="text-xs text-gray-500 mb-1">Example:</p>
                      <code className="text-gray-700">{section.example}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How to Edit Homepage Content
        </h2>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold mb-1">1. Create/Edit Homepage Page</p>
            <p>
              Go to{" "}
              <Link
                href="/dashboard/pages"
                className="text-blue-600 hover:underline"
              >
                Pages
              </Link>{" "}
              and create a page with slug <code className="bg-gray-100 px-1 rounded">home</code> (or edit existing one).
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">2. Add Sections</p>
            <p>
              Add sections using the keys listed above. For example, add a section with key <code className="bg-gray-100 px-1 rounded">hero-heading</code> to edit the hero heading.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">3. Publish</p>
            <p>
              Make sure the page status is set to <strong>Published</strong> for changes to appear on the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

