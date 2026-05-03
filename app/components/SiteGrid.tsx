"use client";

import { useState } from "react";
import Link from "next/link";
import SiteSettingsModal from "./SiteSettingsModal";
import { useRouter } from "next/navigation";

interface Site {
  id: string;
  name: string;
  slug: string;
}

interface SiteGridProps {
  initialSites: Site[];
}

export default function SiteGrid({ initialSites }: SiteGridProps) {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const router = useRouter();

  const handleUpdate = (updated: Site) => {
    setSites((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    router.refresh();
  };

  const handleDelete = (siteId: string) => {
    setSites((prev) => prev.filter((s) => s.id !== siteId));
    router.refresh();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sites.map((site) => (
          <div key={site.id} className="relative group">
            <Link href={`/builder?siteId=${site.id}`}>
              <div className="bg-white border border-gray-200 hover:border-brand-300 hover:shadow-sm rounded-xl p-5 transition-all duration-150 cursor-pointer">
                <div className="w-8 h-8 bg-brand-50 rounded-lg border-2 mb-4 flex items-center justify-center">
                  <span className="text-brand-600 text-xs font-semibold">
                    {site.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {site.name}
                </p>
                <p className="text-xs">/{site.slug}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-brand-600 text-xs font-medium">
                    Open builder →
                  </span>
                </div>
              </div>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedSite(site);
              }}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-md text-gray-400 hover:text-gray-600 text-xs"
            >
              ⚙
            </button>
          </div>
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

      {selectedSite && (
        <SiteSettingsModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
