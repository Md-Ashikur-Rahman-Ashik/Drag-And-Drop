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
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm border-2 rounded-lg p-6">
        <div className="w-8 h-8 bg-brand-600 rounded-lg border-2 flex items-center justify-center mb-8">
          <div className="w-3.5 h-3.5 bg-white rounded-sm" />
        </div>

        <h1 className="text-xl font-semibold mb-1">
          {isSignUp ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-sm mb-7">
          {isSignUp ? "Start building today." : "Sign in to continue."}
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="you@example.com"
              className="w-full bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-lg outline-none focus:border-brand-500 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-lg outline-none focus:border-brand-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full border-1 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-sm font-medium py-2.5 rounded-lg transition-colors mb-5"
        >
          {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
        </button>

        <p className="text-center text-xs">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-brand-600 hover:text-brand-700 transition-colors font-medium"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
