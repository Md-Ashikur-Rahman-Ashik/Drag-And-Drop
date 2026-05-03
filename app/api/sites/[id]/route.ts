import { createSupabaseServer } from "@/app/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const supabase = await createSupabaseServer();
  const { id } = await params;
  const body = await request.json();
  const { name, slug } = body;

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Name and slug are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("sites")
    .update({ name, slug })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      {
        error:
          error.code === "23505" ? "This URL is already taken." : error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const supabase = await createSupabaseServer();
  const { id } = await params;

  const { error } = await supabase.from("sites").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
