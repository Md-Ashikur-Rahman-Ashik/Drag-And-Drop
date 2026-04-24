"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewSitePage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    );
  };

  const handleCreate = async () => {
    if (!name || !slug) return;
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: site, error } = await supabase
      .from("sites")
      .insert({ name, slug, user_id: user.id })
      .select()
      .single();

    if (error) {
      setError(
        error.code === "23505"
          ? "This URL is already taken. Try a different name."
          : error.message,
      );
      setLoading(false);
      return;
    }

    router.push(`/builder?siteId=${site.id}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to dashboard</span>
        </Link>

        <h1 className="text-xl font-semibold text-gray-900 mb-1">New site</h1>
        <p className="text-sm text-gray-400 mb-7">
          Give your site a name to get started.
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              Site name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="My Portfolio"
              autoFocus
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-3.5 py-2.5 rounded-lg outline-none placeholder-gray-300 focus:border-brand-500 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">
              URL
            </label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 focus-within:border-brand-500 focus-within:bg-white transition-colors">
              <span className="text-gray-300 text-sm mr-1">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-portfolio"
                className="flex-1 bg-transparent text-gray-900 text-sm outline-none placeholder-gray-300"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleCreate}
          disabled={loading || !name || !slug}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          {loading ? "Creating..." : "Create site →"}
        </button>
      </div>
    </div>
  );
}
