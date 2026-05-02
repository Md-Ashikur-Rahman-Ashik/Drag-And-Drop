"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

interface SeoPanelProps {
  pageId: string;
  initialTitle?: string;
  initialDescription?: string;
  initialImage?: string;
  pageTitle: string;
  onSave: (data: {
    seo_title: string;
    seo_description: string;
    seo_image: string;
  }) => void;
  onClose?: () => void;
}

export default function SeoPanel({
  pageId,
  initialTitle = "",
  initialDescription = "",
  initialImage = "",
  pageTitle,
  onSave,
  onClose,
}: SeoPanelProps) {
  const [seoTitle, setSeoTitle] = useState(initialTitle);
  const [seoDescription, setSeoDescription] = useState(initialDescription);
  const [seoImage, setSeoImage] = useState(initialImage);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      await fetch(`/api/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seo_title: seoTitle,
          seo_description: seoDescription,
          seo_image: seoImage,
        }),
      });

      onSave({
        seo_title: seoTitle,
        seo_description: seoDescription,
        seo_image: seoImage,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save SEO settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const titleLength = seoTitle.length;
  const descriptionLength = seoDescription.length;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">SEO Settings</h3>
          <p className="text-xs text-gray-400 mt-0.5">{pageTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-md"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
            Search Preview
          </p>
          <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
            <p className="text-blue-600 text-sm font-medium truncate">
              {seoTitle || pageTitle || "Page Title"}
            </p>
            <p className="text-green-700 text-xs mt-0.5 truncate">
              yoursite.com/{pageTitle.toLowerCase()}
            </p>
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">
              {seoDescription ||
                "Add a description to help search engines understand this page."}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Meta Title
            </label>
            <span
              className={`text-[10px] ${
                titleLength > 60
                  ? "text-red-400"
                  : titleLength > 50
                    ? "text-yellow-500"
                    : "text-gray-300"
              }`}
            >
              {titleLength}/60
            </span>
          </div>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder={pageTitle || "Page title for search engines"}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-3 py-2 rounded-lg outline-none focus:border-brand-400 transition-colors placeholder-gray-300"
          />
          <p className="text-[10px] text-gray-300 mt-1">
            Recommended: 50–60 characters
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Meta Description
            </label>
            <span
              className={`text-[10px] ${
                descriptionLength > 160
                  ? "text-red-400"
                  : descriptionLength > 140
                    ? "text-yellow-500"
                    : "text-gray-300"
              }`}
            >
              {descriptionLength}/160
            </span>
          </div>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Describe this page for search engines..."
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-3 py-2 rounded-lg outline-none focus:border-brand-400 transition-colors placeholder-gray-300 resize-none"
          />
          <p className="text-[10px] text-gray-300 mt-1">
            Recommended: 120–160 characters
          </p>
        </div>

        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">
            Social Share Image
          </label>
          <ImageUploader value={seoImage} onChange={setSeoImage} />
          <p className="text-[10px] text-gray-300 mt-1">
            Recommended: 1200×630px. Shown when shared on social media.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wider mb-2">
            SEO Tips
          </p>
          <ul className="space-y-1">
            {[
              "Include your main keyword in the title",
              "Write descriptions that encourage clicks",
              "Each page should have a unique title",
              "Keep titles under 60 characters",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-blue-400 text-xs mt-0.5">•</span>
                <span className="text-blue-600 text-xs">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
