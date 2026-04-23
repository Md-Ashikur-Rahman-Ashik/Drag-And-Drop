import { puckConfig } from "@/app/lib/puck-config";
import { createSupabaseServer } from "@/app/lib/supabase-server";
import { Render } from "@measured/puck";
import "@measured/puck/dist/index.css";
import { notFound } from "next/navigation";

interface RendererProps {
  params: Promise<{
    siteSlug: string;
    pageSlug: string;
  }>;
}

export default async function PageRenderer({ params }: RendererProps) {
  const { siteSlug, pageSlug } = await params;
  const supabase = await createSupabaseServer();

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id, name")
    .eq("slug", siteSlug)
    .single();

  if (siteError || !site) {
    notFound();
  }

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("*")
    .eq("site_id", site.id)
    .eq("slug", pageSlug)
    .single();

  if (pageError || !page) {
    notFound();
  }

  return (
    <div>
      <Render config={puckConfig} data={page.content} />
    </div>
  );
}
