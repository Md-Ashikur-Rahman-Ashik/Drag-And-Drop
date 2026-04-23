"use client";

import { Puck } from "@measured/puck";
import { puckConfig } from "../lib/puck-config";
import "@measured/puck/dist/index.css";
import { useState } from "react";

interface BuilderPageProps {
  searchParams: Promise<{ siteId?: string; pageId?: string }>
}

export default function BuilderPage({ searchParams }: BuilderPageProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handlePublish = async (data: Record<string, unknown>) => {
    setSaving(true)
    setSaved(false)

    try {
      const params = await searchParams
      const pageId = params.pageId

      if (pageId) {
        await fetch(`/api/pages/${pageId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: data })
        })
      } else {
        const params = await searchParams
        await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteId: params.siteId,
            title: "Home",
            slug: "home",
            content: data
          })
        })
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error("Failed to save:", err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="h-screen relative">
      {
        saved && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Page saved successfully
          </div>
        )
      }
      <Puck
        config={puckConfig}
        data={{ content: [], root: {} }}
        onPublish={handlePublish}
      />
    </div>
  );
}
