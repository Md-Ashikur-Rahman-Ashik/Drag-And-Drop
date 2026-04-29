import { createSupabaseServer } from "@/app/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const supabase = await createSupabaseServer();
  const { id } = await params;
  const body = await request.json();
  const { content } = body;

  const { data, error } = await supabase
    .from("pages")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { error } = await supabase.from("pages").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
