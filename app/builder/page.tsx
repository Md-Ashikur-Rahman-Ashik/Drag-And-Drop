"use client";

import { Puck, Data } from "@measured/puck";
import { puckConfig } from "../lib/puck-config";
import "@measured/puck/dist/index.css";
import "./puck-overrides.css"
import { useState, useEffect } from "react";
import Link from "next/link";

interface BuilderPageProps {
  searchParams: Promise<{ siteId?: string; pageId?: string }>;
}

const emptyData: Data = {
  content: [],
  root: {},
};

export default function BuilderPage({ searchParams }: BuilderPageProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pageData, setPageData] = useState<Data>(emptyData);
  const [pageId, setPageId] = useState<string | null>(null);
  const [siteId, setSiteId] = useState<string | null>(null);
  const [siteName, setSiteName] = useState("Untitled Site");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const params = await searchParams;
      setSiteId(params.siteId || null);

      if (params.pageId) {
        setPageId(params.pageId);

        const response = await fetch(`/api/pages/${params.pageId}`);
        if (response.ok) {
          const page = await response.json();
          if (page.content && page.content.content) {
            setPageData(page.content as Data);
          }
        }
      } else if (params.siteId) {
        const response = await fetch(
          `/api/pages?siteId=${params.siteId}?&slug=home`,
        );

        if (response.ok) {
          const pages = await response.json();
          if (pages.length > 0) {
            const page = pages[0];
            setPageId(page.id);

            if (page.content && page.content.content) {
              setPageData(page.content as Data);
            }
          }
        }
      }

      setLoading(false);
    };

    loadPage();
  }, []);

  const handlePublish = async (data: Data) => {
    setSaving(true);
    setSaved(false);

    try {
      if (pageId) {
        await fetch(`/api/pages/${pageId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: data }),
        });
      } else {
        const response = await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteId,
            title: "Home",
            slug: "home",
            content: data,
          }),
        });

        const newPage = await response.json();
        setPageId(newPage.id);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative">
      {saved && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Page saved successfully
        </div>
      )}
      <Puck config={puckConfig} data={pageData} onPublish={handlePublish} />
    </div>
  );
}
