"use client";

import { Suspense, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { isValidEmail } from "@/lib/utils/validators";
import { CheckCircle, Eye, EyeOff } from "lucide-react";

function LoginContent() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user was redirected after email verification
    if (searchParams.get("verified") === "true") {
      setSuccessMessage("Email verified successfully! You can now log in.");
    }
  }, [searchParams]);

  const darkMode = mounted && resolvedTheme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
    } catch (err: any) {
      const errorMessage =
        err?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${
        darkMode ? "bg-[var(--color-dark-bg)]" : "bg-gray-50"
      }`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl transition-all ${
            darkMode
              ? "bg-[var(--color-brand)]/10"
              : "bg-[var(--color-brand)]/20"
          }`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl transition-all ${
            darkMode
              ? "bg-[var(--color-brand-accent)]/15"
              : "bg-[var(--color-brand-accent)]/25"
          }`}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div
          className={`p-8 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/90 border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="font-clash text-3xl font-bold text-[var(--color-brand)]">
                AE
              </span>
            </Link>
            <h1
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-[var(--color-brand)]"
              }`}
            >
              Welcome Back
            </h1>
            <p
              className={`text-base ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sign in to continue your preparation
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div
              className={`p-3 rounded-lg mb-4 flex items-center gap-2 ${
                darkMode
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <CheckCircle
                className={`w-5 h-5 shrink-0 ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              />
              <p
                className={`text-sm ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                {successMessage}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className={`p-3 rounded-lg mb-4 ${
                darkMode
                  ? "bg-red-500/10 border border-red-500/20"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]"
                }`}
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className={`text-sm font-medium ${
                    darkMode
                      ? "text-[var(--color-brand-light)] hover:text-[var(--color-brand)]"
                      : "text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
              />
              <label
                htmlFor="remember"
                className={`ml-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[var(--color-brand)] text-white font-semibold rounded-lg shadow-lg hover:bg-[var(--color-brand-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Don't have an account?{" "}
            </span>
            <Link
              href="/register"
              className={`text-sm font-semibold ${
                darkMode
                  ? "text-[var(--color-brand-light)] hover:text-[var(--color-brand)]"
                  : "text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
              }`}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[var(--color-dark-bg)]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-brand)] border-t-transparent"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
