"use client";

import { Puck, Data } from "@measured/puck";
import { puckConfig } from "../lib/puck-config";
import "@measured/puck/dist/index.css";
import "./puck-overrides.css";
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

      if (params.siteId) {
        const siteRes = await fetch(`/api/sites/${params.siteId}`);
        if (siteRes.ok) {
          const site = await siteRes.json();
          setSiteName(site.name);
        }
      }

      if (params.pageId) {
        setPageId(params.pageId);

        const response = await fetch(`/api/pages/${params.pageId}`);
        if (response.ok) {
          const page = await response.json();
          if (page.content?.content) {
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

            if (page.content?.content) {
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
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-6 h-6 border border-[#333] border-t-white rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[#555] text-xs">Loading Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      {saved && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#173404] border border-[#27500a] text-[#3b6d11] px-4 py-2 rounded-full text-xs font-medium">
          Saved successfully
        </div>
      )}
      <Puck
        config={puckConfig}
        data={pageData}
        onPublish={handlePublish}
        overrides={{
          header: ({ actions }) => (
            <div className="h-11 bg-black border-b border-[#1a1a1a] flex items-center justify-between px-3">
              <div className="flex items-center gap-3">
                <Link
                  href={"/dashboard"}
                  className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <div className="w-3 h-3 bg-black rounded-sm" />
                </Link>

                <div className="w-px h-4 bg-[#1a1a1a]" />
                <span className="text-white text-sm font-medium">
                  {siteName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {saved && <span className="text-[#3b6d11] text-xs">Saved</span>}
                {actions}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}
