import { supabase } from "../../../lib/supabase";
import { Render } from "@measured/puck";
import { puckConfig } from "../../../lib/puck-config";
import "@measured/puck/dist/index.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface RendererProps {
  params: Promise<{
    siteSlug: string;
    pageSlug: string;
  }>;
}

async function getPageData(siteSlug: string, pageSlug: string) {
  const { data: site } = await supabase
    .from("sites")
    .select("id, name, slug")
    .eq("slug", siteSlug)
    .single();

  if (!site) return null;

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("site_id", site.id)
    .eq("slug", pageSlug)
    .single();

  if (!page) return null;

  return { site, page };
}

export async function generateMetadata({
  params,
}: RendererProps): Promise<Metadata> {
  const { siteSlug, pageSlug } = await params;
  const result = await getPageData(siteSlug, pageSlug);

  if (!result) {
    return { title: "Page not found" };
  }

  const { site, page } = result;

  const title = page.seo_title || `${page.title} — ${site.name}`;
  const description =
    page.seo_description || `${page.title} page on ${site.name}`;
  const image = page.seo_image || null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
      type: "website",
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function PageRenderer({ params }: RendererProps) {
  const { siteSlug, pageSlug } = await params;
  const result = await getPageData(siteSlug, pageSlug);

  if (!result) notFound();

  const { page } = result;

  return (
    <div>
      <Render config={puckConfig} data={page.content} />
    </div>
  );
}
