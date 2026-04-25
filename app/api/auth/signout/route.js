import { createSupabaseServer } from "../../../lib/supabase-server"
import { NextResponse } from "next/server"

export async function POST() {
  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return NextResponse.redirect(new URL("/login", siteUrl))
}