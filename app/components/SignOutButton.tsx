"use client";

import { createSupabaseBrowser } from "../lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="hover:text-gray-600 text-xs border border-gray-200 px-3 py-1.5 rounded-md transition-colors"
    >
      Sign out
    </button>
  );
}
