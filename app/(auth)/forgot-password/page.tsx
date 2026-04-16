"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { isValidEmail } from "@/lib/utils/validators";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import authService from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const darkMode = mounted && resolvedTheme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await authService.requestPasswordReset(email);
      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      const errorMessage =
        err?.message || "Failed to send reset link. Please try again.";
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
              Forgot Password?
            </h1>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              {success
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"}
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                darkMode
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-green-50 border-green-200 text-green-700"
              }`}
              role="alert"
              aria-live="polite"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Reset link sent!</p>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-green-300" : "text-green-600"
                  }`}
                >
                  We've sent a password reset link to your email. Please check
                  your inbox and follow the instructions.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                darkMode
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all ${
                      darkMode
                        ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="your.email@example.com"
                    required
                    autoComplete="email"
                    autoFocus
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                </div>
                {error && (
                  <p id="email-error" className="sr-only">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
                } text-white shadow-lg shadow-[var(--color-brand)]/25`}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2
                      className="w-5 h-5 animate-spin"
                      aria-hidden="true"
                    />
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                darkMode
                  ? "text-gray-400 hover:text-[var(--color-brand)]"
                  : "text-gray-600 hover:text-[var(--color-brand)]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Login
            </Link>
          </div>

          {/* Additional Help */}
          {success && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
              <p
                className={`text-sm text-center ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Didn't receive the email?{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-[var(--color-brand)] hover:underline font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          )}

          {/* Help Text */}
          {!success && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
              <p
                className={`text-xs text-center ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-[var(--color-brand)] hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
