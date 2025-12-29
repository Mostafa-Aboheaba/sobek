"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Asset {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  title?: string | null;
  category?: string | null;
  createdAt: string;
}

/**
 * Asset Manager Page
 * 
 * Upload and manage images, files, and media assets.
 * Assets can be used throughout the website.
 */
export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch("/api/cms/assets");
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
      }
    } catch (err) {
      console.error("Error fetching assets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/cms/assets", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      // Refresh assets list
      fetchAssets();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const res = await fetch(`/api/cms/assets/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchAssets();
      }
    } catch (err) {
      console.error("Error deleting asset:", err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading assets...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Manager</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage images, files, and media assets
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer inline-block"
          >
            {uploading ? "Uploading..." : "Upload Assets"}
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {assets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No assets uploaded yet.</p>
          <label
            htmlFor="file-upload"
            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Upload your first asset →
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              {asset.mimeType.startsWith("image/") ? (
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={asset.path}
                    alt={asset.alt || asset.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">📄</span>
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate" title={asset.originalName}>
                  {asset.originalName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(asset.size)}
                  {asset.width && asset.height && (
                    <> • {asset.width}×{asset.height}</>
                  )}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(asset.path)}
                    className="flex-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    title="Copy URL"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

