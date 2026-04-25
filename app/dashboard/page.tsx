import SignOutButton from "../components/SignOutButton";
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
    return <p className="text-red-500 p-8">Failed to load sites.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          <span className="text-sm font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs">{user?.email}</span>
          <SignOutButton />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h1 className="text-xl font-semibold mb-0.5">My Sites</h1>
            <p className="text-sm">
              {sites.length} site{sites.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {sites.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-xl p-16 text-center bg-white">
            <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl">+</span>
            </div>
            <p className="text-sm font-medium mb-1">No sites yet</p>
            <p className="text-xs mb-6">
              Create your first site to get started
            </p>
            <Link
              href="/dashboard/new"
              className="bg-brand-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Create site
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sites.map((site) => (
              <Link key={site.id} href={`/builder?siteId=${site.id}`}>
                <div className="group bg-white border border-gray-200 hover:border-brand-300 hover:shadow-sm rounded-xl p-5 transition-all duration-150 cursor-pointer">
                  <p className="text-sm font-medium mb-1">{site.name}</p>
                  <p className="text-xs">/{site.slug}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-brand-600 text-xs font-medium">
                      Open builder →
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <Link href="/dashboard/new">
              <div className="bg-white border border-dashed hover:border-brand-300 rounded-xl p-5 transition-all duration-150 cursor-pointer flex flex-col items-center justify-center min-h-[130px] gap-2">
                <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">+</span>
                </div>
                <p className="text-xs">New site</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
