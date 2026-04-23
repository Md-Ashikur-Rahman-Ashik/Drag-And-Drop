"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "../lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mb-8">
          <div className="w-3.5 h-3.5 bg-black rounded-sm" />
        </div>

        <h1 className="text-white text-2xl font-semibold mb-1">
          {isSignUp ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-[#666] text-sm mb-8">
          {isSignUp ? "Start building today" : "Sign in to continue"}
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-[10px] font-medium text-[#555] uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="you@example.com"
              className="w-full bg-[#0a0a0a] border border-[#222] text-white text-sm px-3.5 py-2.5 rounded-lg outline-none placeholder-[#444] focus:border-[#444] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium text-[#555] uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="••••••••"
              className="w-full bg-[#0a0a0a] border border-[#222] text-white text-sm px-3.5 py-2.5 rounded-lg outline-none placeholder-[#444] focus:border-[#444] transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-950/50 border border-red-950/50 px-3.5 py-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 disabled:opacity-40 text-black text-sm font-medium py-2.5 rounded-lg transition-colors mb-4"
        >
          {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
        </button>

        <p className="text-xs text-[#555] flex justify-center gap-2">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
