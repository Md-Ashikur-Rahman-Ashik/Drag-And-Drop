"use client";

import { useState } from "react";

interface Site {
  id: string;
  name: string;
  slug: string;
}

interface SiteSettingsModalProps {
  site: Site;
  onClose: () => void;
  onUpdate: (updated: Site) => void;
  onDelete: (siteId: string) => void;
}

export default function SiteSettingsModal({
  site,
  onClose,
  onUpdate,
  onDelete,
}: SiteSettingsModalProps) {
  const [name, setName] = useState(site.name);
  const [slug, setSlug] = useState(site.slug);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    );
  };

  const handleSave = async () => {
    if (!name || !slug) return;
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/sites/${site.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save");
        return;
      }

      onUpdate(data);
      onClose();
    } catch {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmText !== site.name) return;
    setDeleting(true);

    try {
      const response = await fetch(`/api/sites/${site.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Failed to delete site");
        setDeleting(false);
        return;
      }

      onDelete(site.id);
      onClose();
    } catch {
      setError("Failed to delete site");
      setDeleting(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Site Settings
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{site.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xs font-medium text-gray-700 mb-3">General</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  Site Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-3.5 py-2.5 rounded-lg outline-none focus:border-brand-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                  URL
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 focus-within:border-brand-400 transition-colors">
                  <span className="text-gray-300 text-sm mr-1">/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 bg-transparent text-gray-900 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {error && !showDeleteConfirm && (
              <p className="text-red-500 text-xs mt-2 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={saving || !name || !slug}
              className="rounded font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1.5 mt-4"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>

          <div className="border border-red-100 rounded-xl p-4 bg-red-50">
            <h3 className="text-xs font-medium text-red-600 uppercase tracking-wider mb-1">
              Danger Zone
            </h3>
            <p className="text-xs text-red-400 mb-3">
              Permanently delete this site and all its pages. This action cannot
              be undone.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-500 hover:text-red-700 text-xs font-medium border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors bg-white"
              >
                Delete this site
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-red-500 font-medium">
                  Type <span className="font-bold">{site.name}</span> to confirm
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={site.name}
                  autoFocus
                  className="w-full bg-white border border-red-200 text-gray-900 text-sm px-3 py-2 rounded-lg outline-none focus:border-red-400 transition-colors placeholder-red-200"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting || deleteConfirmText !== site.name}
                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    {deleting ? "Deleting..." : "Yes, delete forever"}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText("");
                    }}
                    className="flex-1 bg-white text-gray-600 text-xs font-medium py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
