"use client";

import { Puck, Data } from "@measured/puck";
import { puckConfig } from "../lib/puck-config";
import "@measured/puck/dist/index.css";
import "./puck-overrides.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const emptyData: Data = {
  content: [],
  root: {},
};

export default function BuilderPage() {
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pageData, setPageData] = useState<Data>(emptyData);
  const [pageId, setPageId] = useState<string | null>(null);
  const [siteId, setSiteId] = useState<string | null>(null);
  const [siteName, setSiteName] = useState("Untitled Site");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      const paramSiteId = searchParams.get("siteId");
      const paramPageId = searchParams.get("pageId");

      console.log("Params — siteId:", paramSiteId, "pageId:", paramPageId);

      setSiteId(paramSiteId);

      if (paramSiteId) {
        const siteRes = await fetch(`/api/sites/${paramSiteId}`);
        if (siteRes.ok) {
          const site = await siteRes.json();
          setSiteName(site.name);
        }
      }

      if (paramPageId) {
        setPageId(paramPageId);
        const response = await fetch(`/api/pages/${paramPageId}`);
        if (response.ok) {
          const page = await response.json();
          if (page.content?.content) {
            setPageData(page.content as Data);
          }
        }
      } else if (paramSiteId) {
        const response = await fetch(
          `/api/pages?siteId=${paramSiteId}&slug=home`,
        );
        if (response.ok) {
          const pages = await response.json();
          if (pages.length > 0) {
            const page = pages[0];
            setPageId(page.id);
            if (page.content?.content) {
              setPageData(page.content as Data);
            }
          }
        }
      }

      setLoading(false);
    };

    loadPage();
  }, [searchParams]);

  const handlePublish = async (data: Data) => {
    console.log("Publishing — siteId:", siteId, "pageId:", pageId);
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
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-6 h-6 border border-gray-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-xs">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      {saved && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-50 border border-green-100 text-green-600 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
          Saved successfully
        </div>
      )}
      <Puck
        config={puckConfig}
        data={pageData}
        onPublish={handlePublish}
        overrides={{
          header: ({ actions }) => (
            <div className="h-11 bg-white border-b border-gray-100 flex items-center justify-between px-3">
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center hover:bg-brand-700 transition-colors"
                >
                  <div className="w-3 h-3 bg-white rounded-sm" />
                </Link>
                <div className="w-px h-4 bg-gray-100" />
                <span className="text-gray-900 text-sm font-medium">
                  {siteName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="text-green-600 text-xs bg-green-50 border border-green-100 px-2.5 py-1 rounded-md">
                    Saved
                  </span>
                )}
                {actions}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}
