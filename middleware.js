import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export async function middleware(request){
    const response = NextResponse.next()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        
    )
}