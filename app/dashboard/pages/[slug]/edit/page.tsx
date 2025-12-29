"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageForm from "@/components/dashboard/PageForm";

interface PageData {
  slug: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED";
  sections: Array<{
    key: string;
    title: string | null;
    content: string;
    contentType: "MARKDOWN" | "HTML" | "TEXT";
    order: number;
    metadata: string;
  }>;
}

/**
 * Edit Page
 * 
 * Form to edit an existing page and its sections.
 */
export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/cms/pages/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch page");
      const data = await res.json();
      setPage(data.page);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/dashboard/pages");
  };

  const handleCancel = () => {
    router.push("/dashboard/pages");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading page...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || "Page not found"}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Page</h1>
      <PageForm page={page} onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}

