"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import PageForm from "@/components/dashboard/PageForm";

/**
 * Create New Page
 * 
 * Form to create a new page with sections.
 */
export default function NewPagePage() {
  const router = useRouter();

  const handleSuccess = (slug: string) => {
    router.push(`/dashboard/pages/${slug}/edit`);
  };

  const handleCancel = () => {
    router.push("/dashboard/pages");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Page</h1>
      <PageForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}

