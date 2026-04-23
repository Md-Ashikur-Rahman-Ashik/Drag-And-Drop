import { createSupabaseServer } from "../lib/supabase-server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: sites, error } = await supabase
    .from("sites")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-400 p-8">Failed to load sites.</p>;
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-[#1a1a1a] px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-black rounded-sm" />
          </div>
          <span className="text-white text-sm font-medium">Builder</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#555] text-xs">{user?.email}</span>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="text-[#555] hover:text-white text-xs transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">My Sites</h1>
            <p className="text-sm text-[#555]">
              {sites.length} site{sites.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/builder/new"
            className="bg-white text-black text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            New Site
          </Link>
        </div>

        {sites.length === 0 ? (
          <div className="border border-dashed border-[#222] rounded-xl p-16 text-center">
            <div className="w-10 h-10 bg-[#0a0a0a] border border-[#222] rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-[#444] text-lg">+</span>
            </div>
            <p className="text-white text-sm font-medium mb-1">No sites yet</p>
            <p className="text-[#555] text-xs mb-6">
              Create your first site to get started
            </p>
            <Link
              href="/dashboard/new"
              className="bg-white text-black text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Site
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sites.map((site) => (
              <Link key={site.id} href={`/builder?siteId=${site.id}`}>
                <div className="group bg-[#0a0a0a] border border[#1a1a1a] hover:border-[#333] rounded-xl p-5 transition-all duration-150 cursor-pointer">
                  <div className="w-8 h-8 bg-[#111] border border-[#222] rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-[#666] text-xs font-medium">
                      {site.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium mb-1 group-hover:text-white">
                    {site.name}
                  </p>
                  <p className="text-[#444] text-xs">/{site.slug}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
