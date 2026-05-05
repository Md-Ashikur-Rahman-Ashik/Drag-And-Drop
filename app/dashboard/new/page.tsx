"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TemplatePicker from "../../components/TemplatePicker";
import { Template } from "../../lib/templates";

type Step = "name" | "template";

export default function NewSitePage() {
  const [step, setStep] = useState<Step>("name");
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

  const handleNameSubmit = async () => {
    if (!name || !slug) return;
    setError("");

    const { data } = await supabase
      .from("sites")
      .select("id")
      .eq("slug", slug)
      .single();

    if (data) {
      setError("This URL is already taken. Try a different name.");
      return;
    }

    setStep("template");
  };

  const handleTemplateSelect = async (template: Template) => {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: site, error: siteError } = await supabase
      .from("sites")
      .insert({ name, slug, user_id: user.id })
      .select()
      .single();

    if (siteError) {
      setError(siteError.message);
      setLoading(false);
      return;
    }

    if (template.id !== "blank") {
      await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: site.id,
          title: "Home",
          slug: "home",
          content: template.data,
          order_index: 0,
        }),
      });
    }

    router.push(`/builder?siteId=${site.id}`);
  };

  if (step === "name") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm border-2 p-6 rounded-lg">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 hover:text-gray-600 text-xs transition-colors mb-8"
          >
            <span>←</span>
            <span>Back to dashboard</span>
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center text-[10px] font-bold">
              1
            </div>
            <div className="flex-1 h-0.5 bg-gray-500" />
            <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold">
              2
            </div>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Name your site
          </h1>
          <p className="text-sm text-gray-800 mb-7">
            You can always change this later.
          </p>

          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-[11px] font-medium text-gray-800 uppercase tracking-wider mb-1.5">
                Site name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="My Portfolio"
                autoFocus
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-3.5 py-2.5 rounded-lg outline-none placeholder-gray-600 focus:border-brand-400 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-800 uppercase tracking-wider mb-1.5">
                URL
              </label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 focus-within:border-brand-400 focus-within:bg-white transition-colors">
                <span className="text-gray-300 text-sm mr-1">/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="my-portfolio"
                  className="flex-1 bg-transparent text-gray-900 text-sm outline-none placeholder-gray-600"
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
            onClick={handleNameSubmit}
            disabled={!name || !slug}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => setStep("name")}
          className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-[10px] font-bold">
            1
          </div>
          <div className="flex-1 w-16 h-0.5 bg-brand-600" />
          <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            2
          </div>
        </div>
        <span className="text-xs text-gray-400">
          Creating <span className="text-gray-700 font-medium">{name}</span>
        </span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Creating your site...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <TemplatePicker
            title={`Choose a template for ${name}`}
            onSelect={handleTemplateSelect}
          />
        </div>
      )}
    </div>
  );
}
