"use client";

import { createSupabaseBrowser } from "@/app/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link
          href={"/dashboard"}
          className="flex items-center gap-1.5 text-xs transition-colors mb-8"
        >
          <span>{"<-"}</span>
          <span>Back to dashboard</span>
        </Link>

        <h1 className="text-2xl font-semibold mb-1">New Site</h1>
        <p className="text-sm mb-8">
          Give your site a name to get started.
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-[10px] font-medium uppercase tracking-widest mb-1.5">
              Site name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="My Portfolio"
              className="w-full bg-[#0a0a0a] border border-[#222] text-white text-sm px-3.5 py-2.5 rounded-lg outline-none focus:border-[#444] transition-colors"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium uppercase tracking-widest mb-1.5">
              URL
            </label>
            <div className="flex items-center bg-[#0a0a0a] border border-[#222] rounded-lg px-3.5 py-2.5 focus-within:border-[#444] transition-colors">
              <span className="text-[#444] text-sm mr-1">/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="my-portfolio"
                className="flex-1 bg-transparent text-white text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-950/50 border border-red-950/50 px-3.5 py-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleCreate}
          disabled={loading || !name || !slug}
          className="w-full hover:bg-gray-100 disabled:opacity-40 text-black text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          {loading ? "Creating..." : "Create site"}
        </button>
      </div>
    </div>
  );
}
