import { createSupabaseServer } from "../../../lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { pages } = body;

  if (!pages || !Array.isArray(pages)) {
    return NextResponse.json(
      { error: "pages array required" },
      { status: 400 },
    );
  }

  const updates = await Promise.all(
    pages.map(({ id, order_index }: { id: string; order_index: number }) =>
      supabase.from("pages").update({ order_index }).eq("id", id),
    ),
  );

  const hasError = updates.some(({ error }) => error);
  if (hasError) {
    return NextResponse.json(
      { error: "Failed to update page order" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
