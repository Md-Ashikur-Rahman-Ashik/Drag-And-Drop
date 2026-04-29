"use client";

import { Puck, Data } from "@measured/puck";
import { puckConfig } from "../lib/puck-config";
import "@measured/puck/dist/index.css";
import "./puck-overrides.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BuilderPageManager from "../components/BuilderPageManager";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: Data;
}

const emptyData: Data = { content: [], root: {} };

export default function BuilderPage() {
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pageData, setPageData] = useState<Data>(emptyData);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [siteId, setSiteId] = useState<string | null>(null);
  const [siteName, setSiteName] = useState("Untitled Site");
  const [loading, setLoading] = useState(true);
  const currentDataRef = useRef<Data>(emptyData);

  useEffect(() => {
    const loadBuilder = async () => {
      const paramSiteId = searchParams.get("siteId");
      if (!paramSiteId) {
        setLoading(false);
        return;
      }

      setSiteId(paramSiteId);

      const siteRes = await fetch(`/api/sites/${paramSiteId}`);
      if (siteRes.ok) {
        const site = await siteRes.json();
        setSiteName(site.name);
      }

      const pagesRes = await fetch(`/api/pages?siteId=${paramSiteId}`);
      if (pagesRes.ok) {
        const pagesData = await pagesRes.json();

        if (pagesData.length > 0) {
          setPages(pagesData);
          // Load the first page by default
          const firstPage = pagesData[0];
          setCurrentPage(firstPage);
          if (firstPage.content?.content) {
            setPageData(firstPage.content);
            currentDataRef.current = firstPage.content;
          }
        }
      }

      setLoading(false);
    };

    loadBuilder();
  }, [searchParams]);

  const savePage = useCallback(async (pageId: string, data: Data) => {
    setSaving(true);
    try {
      await fetch(`/api/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  }, []);

  const handlePublish = async (data: Data) => {
    currentDataRef.current = data;
    if (!currentPage) {
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
      setCurrentPage(newPage);
      setPages([newPage]);
    } else {
      await savePage(currentPage.id, data);
    }
  };

  const handlePageSelect = async (page: Page) => {
    if (currentPage && currentDataRef.current) {
      await savePage(currentPage.id, currentDataRef.current);
    }

    setCurrentPage(page);
    const response = await fetch(`/api/pages/${page.id}`);
    if (response.ok) {
      const pageDetail = await response.json();
      const newData = pageDetail.content?.content
        ? pageDetail.content
        : emptyData;
      setPageData(newData);
      currentDataRef.current = newData;
    }
  };

  const handlePageCreate = (newPage: Page) => {
    setPages((prev) => [...prev, newPage]);
    handlePageSelect(newPage);
  };

  const handlePageDelete = (pageId: string) => {
    const remaining = pages.filter((p) => p.id !== pageId);
    setPages(remaining);
    if (currentPage?.id === pageId && remaining.length > 0) {
      handlePageSelect(remaining[0]);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-6 h-6 border border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
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
        onChange={(data) => {
          currentDataRef.current = data;
        }}
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
                {currentPage && (
                  <>
                    <div className="w-px h-4 bg-gray-100" />
                    <span className="text-gray-400 text-xs">
                      {currentPage.title}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {currentPage && (
                  <a
                    href={`/sites/${siteId ? "" : ""}`}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-600 text-xs px-3 py-1.5 rounded-md border border-gray-200 hover:border-gray-300 transition-all"
                  >
                    Preview ↗
                  </a>
                )}
                {saved && <span className="text-green-600 text-xs">Saved</span>}
                {saving && (
                  <span className="text-gray-400 text-xs">Saving...</span>
                )}
                {actions}
              </div>
            </div>
          ),
          actionBar: ({ children }) => (
            <div className="flex items-center gap-2">{children}</div>
          ),
        }}
      />
    </div>
  );
}
