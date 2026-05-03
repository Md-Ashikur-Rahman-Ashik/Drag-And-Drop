import { createSupabaseServer } from "@/app/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const siteId = searchParams
    .get("siteId")
    ?.trim()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const slug = searchParams.get("slug")?.trim();

  if (!siteId) {
    return NextResponse.json({ error: "siteId required" }, { status: 400 });
  }

  let query = supabase
    .from("pages")
    .select("*")
    .eq("site_id", siteId)
    .order("order_index", { ascending: true });

  if (slug) {
    query = query.eq("slug", slug);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("API user:", user?.id);

  const body = await request.json();
  const { siteId, title, slug, content, order_index } = body;
  console.log("Upserting page:", { siteId, title, slug });

  if (!siteId || !title || !slug) {
    return NextResponse.json(
      { error: "siteId, title and slug are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("pages")
    .upsert(
      {
        site_id: siteId,
        title,
        slug,
        content,
        order_index: order_index ?? 0,
      },
      { onConflict: "site_id,slug" },
    )
    .select()
    .single();

  console.log("Upsert result:", { data, error });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
