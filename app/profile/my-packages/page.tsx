"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";
import paymentService from "@/services/payment.service";
import { PurchasedPackage } from "@/types";
import Navbar from "@/components/layout/Navbar";
import {
  Package,
  Calendar,
  CreditCard,
  Play,
  Loader2,
  ChevronLeft,
} from "lucide-react";

export default function MyPackagesPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [packages, setPackages] = useState<PurchasedPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setDarkMode(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/profile/my-packages");
      return;
    }

    const fetchPurchasedPackages = async () => {
      try {
        const data = await paymentService.getPurchasedContent();
        setPackages(data.purchases || []);
        setTotalSpent(data.totalSpent || 0);
      } catch (error) {
        logger.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedPackages();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-[#071219]" : "bg-gray-50"}`}
      >
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-[#2596be]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#071219]" : "bg-gray-50"}`}>
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-40 left-10 w-96 h-96 rounded-full blur-3xl transition-all ${
            darkMode ? "bg-[#2596be]/5" : "bg-[#2596be]/10"
          }`}
        />
        <div
          className={`absolute bottom-40 right-10 w-[500px] h-[500px] rounded-full blur-3xl transition-all ${
            darkMode ? "bg-[#4EA8DE]/5" : "bg-[#4EA8DE]/10"
          }`}
        />
      </div>

      <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/test-series"
          className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Test Series
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            My Packages
          </h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            View and manage your purchased test series packages
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            className={`rounded-xl border p-6 ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-[#2596be]" />
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Total Packages
                </p>
                <p
                  className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {packages.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border p-6 ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-10 h-10 text-green-500" />
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Total Spent
                </p>
                <p
                  className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.paymentId}
                className={`rounded-xl border p-6 hover:shadow-lg transition-shadow ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {pkg.productName}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Amount Paid
                    </span>
                    <span
                      className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      ₹{pkg.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Purchased
                    </span>
                    <span className={darkMode ? "text-white" : "text-gray-900"}>
                      {new Date(pkg.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Valid Until
                    </span>
                    <span className={darkMode ? "text-white" : "text-gray-900"}>
                      {new Date(pkg.validUntil).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Days Remaining
                    </span>
                    <span
                      className={`font-semibold ${
                        pkg.daysRemaining > 30
                          ? "text-green-500"
                          : pkg.daysRemaining > 7
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {pkg.daysRemaining}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Status
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pkg.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/test-series/${pkg.productId}`}
                    className="flex-1 py-2 px-4 bg-[#2596be] text-white text-center rounded-lg hover:bg-[#1e7ca0] transition-colors text-sm font-semibold"
                  >
                    View Package
                  </Link>
                  <button
                    onClick={() => {
                      // Navigate to test portal with SSO - similar to package detail page
                      const token = localStorage.getItem("authToken");
                      const refreshToken = localStorage.getItem("refreshToken");
                      const testPortalUrl =
                        process.env.NEXT_PUBLIC_TEST_PORTAL_URL || "";

                      if (testPortalUrl && token) {
                        const ssoUrl = `${testPortalUrl}/auth/sso?token=${encodeURIComponent(
                          token,
                        )}&refreshToken=${encodeURIComponent(
                          refreshToken || "",
                        )}&packageId=${encodeURIComponent(pkg.productId)}`;
                        window.location.href = ssoUrl;
                      }
                    }}
                    className="flex-1 py-2 px-4 bg-green-500 text-white text-center rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold flex items-center justify-center gap-1"
                  >
                    <Play className="w-4 h-4" />
                    Start Tests
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-16 rounded-xl border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3
              className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              No Packages Yet
            </h3>
            <p
              className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              You haven't purchased any test series packages yet.
            </p>
            <Link
              href="/test-series"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2596be] text-white rounded-lg hover:bg-[#1e7ca0] transition-colors font-semibold"
            >
              Browse Packages
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
