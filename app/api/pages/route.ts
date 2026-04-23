import { createSupabaseServer } from "@/app/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = await createSupabaseServer()
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get("siteId")

    if (!siteId) {
        return NextResponse.json({ error: "siteId required" }, { status: 400 })
    }

    const { data, error } = await supabase.from("pages").select("*").eq("site_id", siteId).order("created_at", { ascending: true })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

export async function POST(request: NextResponse) {
    const supabase = await createSupabaseServer()
    const body = await request.json()
    const { siteId, title, slug, content } = body

    if (!siteId || !title || !slug) {
        return NextResponse.json(
            { error: "siteId, title and slug are required" },
            { status: 400 }
        )
    }

    const { data, error } = await supabase.from("pages").insert({ site_id: siteId, title, slug, content }).select().single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}