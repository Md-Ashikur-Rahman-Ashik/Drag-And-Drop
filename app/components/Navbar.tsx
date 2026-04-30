"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  siteName?: string;
  onPreview?: () => void;
  onPublish?: () => void;
  publishing?: boolean;
  published?: boolean;
}

export default function Navbar({
  siteName = "Untitle Site",
  onPreview,
  onPublish,
  publishing = false,
  published = false,
}: NavbarProps) {
  const [name, setName] = useState(siteName);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-11 bg-black border-b border-[#1a1a1a] flex items-center justify-between px-3 shrink-0">
      <div className="flex items-center gap-3">
        <Link
          href={"/dashboard"}
          className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
        >
          <div className="w-3 h-3 bg-black rounded-sm" />
        </Link>
        <div className="w-px h-4 bg-[#1a1a1a]" />

        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
            className="bg-[#111] text-white text-sm px-2 py-1 rounded border border-[#444] outline-none w-48"
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
          >
            {name}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <div className="bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-1 felx items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#333] rounded-full" />
          <span className="text-[#666] text-xs">Home</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {published && (
          <span className="text-[#3b6d11] text-xs bg-[#173404] border border-[#27500a] px-2.5 py-1 rounded-md">
            Saved
          </span>
        )}
        <button
          onClick={onPreview}
          className="text-[#666] hover:text-white text-xs px-3 rounded-md border border-[#1a1a1a] hover:border-[#333] transition-all"
        >
          Preview
        </button>
        <button
          onClick={onPublish}
          disabled={publishing}
          className="bg-white hover:bg-gray-100 disabled:opacity-50 text-black text-xs font-medium px-4 py-1.5 rounded-md transition-colors"
        >
          {publishing ? "Saving..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
