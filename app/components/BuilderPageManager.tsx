"use client";

import { useState } from "react";
import { Page } from "../lib/types";

interface BuilderPageManagerProps {
  siteId: string;
  pages: Page[];
  currentPageId: string | null;
  onPageSelect: (page: Page) => void;
  onPageCreate: (page: Page) => void;
  onPageDelete: (pageId: string) => void;
}

export default function BuilderPageManager({
  siteId,
  pages,
  currentPageId,
  onPageSelect,
  onPageCreate,
  onPageDelete,
}: BuilderPageManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    setError("");

    const slug = newTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          title: newTitle.trim(),
          slug,
          content: { content: [], root: {} },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create page");
        return;
      }

      onPageCreate(data);
      setNewTitle("");
      setIsAdding(false);
    } catch {
      setError("Failed to create page");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pages.length === 1) return;

    try {
      await fetch(`/api/pages/${pageId}`, {
        method: "DELETE",
      });
      onPageDelete(pageId);
    } catch {
      console.error("Failed to delete page");
    }
  };

  return (
    <div className="p-3 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          Pages
        </span>
        <button
          onClick={() => setIsAdding(true)}
          className="text-gray-300 hover:text-gray-600 transition-colors text-base leading-none"
        >
          +
        </button>
      </div>

      <ul className="space-y-0.5">
        {pages.map((page) => (
          <li
            key={page.id}
            onClick={() => onPageSelect(page)}
            className={`
              flex items-center justify-between px-2.5 py-1.5 rounded-md
              cursor-pointer text-xs group transition-colors
              ${
                currentPageId === page.id
                  ? "bg-brand-50 text-brand-600 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  currentPageId === page.id ? "bg-brand-600" : "bg-gray-300"
                }`}
              />
              <span className="truncate">{page.title}</span>
            </div>
            {pages.length > 1 && (
              <button
                onClick={(e) => handleDelete(page.id, e)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all text-xs shrink-0 ml-1"
              >
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>

      {isAdding && (
        <div className="mt-2 space-y-1.5">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") {
                setIsAdding(false);
                setNewTitle("");
              }
            }}
            placeholder="Page name"
            autoFocus
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs px-2.5 py-1.5 rounded-md outline-none focus:border-brand-400 placeholder-gray-300"
          />
          {error && <p className="text-red-500 text-[10px]">{error}</p>}
          <div className="flex gap-1.5">
            <button
              onClick={handleCreate}
              disabled={creating || !newTitle.trim()}
              className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-xs py-1.5 rounded-md transition-colors font-medium"
            >
              {creating ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewTitle("");
                setError("");
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs py-1.5 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
