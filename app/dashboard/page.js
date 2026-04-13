import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DashboardPage() {
  const { data: sites, error } = await supabase
    .from("sites")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-500 p-8">Failed to load sites.</p>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Sites</h1>
          <p className="text-gray-500 mt-1">
            {sites.length} site{sites.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/builder"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          New Site
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => (
          <Link key={site.id} href={`/builder?site=${site.id}`}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-sm transition-all duration-150 cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {site.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">{site.name}</h3>
              <p className="text-gray-400 text-sm mt-1">/{site.slug}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
