"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { PackageDetail, PackageDetailResponse } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { tokenManager } from "@/lib/utils/tokenManager";
import paymentService from "@/services/payment.service";
import Navbar from "@/components/layout/Navbar";
import {
  BookOpen,
  Clock,
  FileText,
  Star,
  Users,
  ChevronLeft,
  Check,
  Calendar,
  GraduationCap,
  Play,
  Award,
  Timer,
  Target,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.packageId as string;
  const { isAuthenticated, user } = useAuth();

  const [packageData, setPackageData] = useState<PackageDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Payment state
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(false);

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
    const fetchPackage = async () => {
      if (!packageId) return;

      setLoading(true);
      setError("");

      try {
        const response = await apiClient.get<PackageDetailResponse>(
          `/packages/id/${packageId}`,
        );

        if (response.data.success) {
          setPackageData(response.data.data);

          // Check access if user is authenticated
          if (isAuthenticated) {
            setCheckingAccess(true);
            const access = await paymentService.checkAccess(
              response.data.data._id,
            );
            setHasAccess(access);
            setCheckingAccess(false);
          }
        }
      } catch (err: any) {
        setError("Failed to load package details. Please try again.");
        logger.error("Error fetching package:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId, isAuthenticated]);

  // Re-check access when user returns to the page (e.g., after payment)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (
        document.visibilityState === "visible" &&
        isAuthenticated &&
        packageData
      ) {
        setCheckingAccess(true);
        const access = await paymentService.checkAccess(packageData._id);
        setHasAccess(access);
        setCheckingAccess(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isAuthenticated, packageData]);

  const discountPercent = packageData?.discountPrice
    ? Math.round(
        ((packageData.price - packageData.discountPrice) / packageData.price) *
          100,
      )
    : 0;

  const handlePurchase = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/test-series/${packageId}`);
      return;
    }

    if (!packageData || !user) {
      setPurchaseError("Unable to process purchase. Please try again.");
      return;
    }

    setPurchasing(true);
    setPurchaseError("");
    setPurchaseSuccess(false);

    try {
      // Step 1: Create Cashfree order with customer details
      const orderResponse = await paymentService.createOrder({
        amount: packageData.discountPrice || packageData.price,
        packageId: packageData._id,
        packageType: "test_package",
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        returnUrl: `${window.location.origin}/payment/verify?order_id={order_id}`,
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      // Step 2: Initialize Cashfree SDK
      const { initializeCashfree } = await import("@/lib/cashfree");
      const cashfree = await initializeCashfree();

      // Step 3: Open Cashfree checkout
      // Using _self (full page redirect) to ensure returnUrl works
      const checkoutOptions = {
        paymentSessionId: orderResponse.data.paymentSessionId,
        redirectTarget: "_self" as const,
      };

      // Open Cashfree checkout modal
      // User will be redirected to returnUrl after payment completion
      cashfree.checkout(checkoutOptions);

      // Reset processing state
      // Verification will happen on the verify page (returnUrl)
      setPurchasing(false);
    } catch (err: any) {
      logger.error("Payment error:", err);
      setPurchaseError(err.message || "Payment failed. Please try again.");
      setPurchasing(false);
    }
  };

  const getFallbackBanner = () => {
    const exams = packageData?.examTypes || [];
    if (exams.length === 0) return "/banners/jee.png";
    const exam = exams[0].toLowerCase();
    if (exam.includes("neet")) return "/banners/neet.png";
    if (exam.includes("wbjee")) return "/banners/wbjee.png";
    if (exam.includes("board")) return "/banners/boards.png";
    return "/banners/jee.png";
  };

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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2596be] border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={`p-6 rounded-xl text-center ${
              darkMode
                ? "bg-red-500/10 border border-red-500/20"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p className={`${darkMode ? "text-red-400" : "text-red-600"}`}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#2596be] text-white rounded-lg hover:bg-[#1e7ca0] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Package Content */}
        {!loading && !error && packageData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div
                className={`flex flex-col rounded-2xl border overflow-hidden ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Banner / Thumbnail */}
                <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-white/10">
                  <Image
                    src={
                      packageData.banner ||
                      packageData.thumbnail ||
                      getFallbackBanner()
                    }
                    alt={packageData.title || "Test Series Banner"}
                    fill
                    unoptimized
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Content Area below banner */}
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {packageData.examTypes.map((exam, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#2596be]/10 text-[#2596be] text-sm font-medium rounded-full"
                      >
                        {exam
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                    {packageData.status === "active" && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-medium rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <h1
                    className={`text-3xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {packageData.title}
                  </h1>

                  <p
                    className={`text-base leading-relaxed ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {packageData.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-dashed border-gray-200/20">
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {packageData.totalTests}
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Tests
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {packageData.totalQuestions.toLocaleString()}
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Questions
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {packageData.validityDays}
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Days Validity
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {(
                          packageData.enrollments ??
                          packageData.metadata?.totalStudents ??
                          0
                        ).toLocaleString()}
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Students
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div
                className={`p-6 rounded-2xl border ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  What's Included
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {packageData.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subjects */}
              <div
                className={`p-6 rounded-2xl border ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Subjects Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {packageData.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        darkMode
                          ? "bg-white/10 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tests List */}
              {packageData.tests && packageData.tests.length > 0 && (
                <div
                  className={`p-6 rounded-2xl border ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Tests Included ({packageData.tests.length})
                  </h2>
                  <div className="space-y-3">
                    {packageData.tests.map((test, idx) => (
                      <div
                        key={test._id}
                        className={`p-4 rounded-xl border flex items-center justify-between ${
                          darkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              darkMode ? "bg-[#2596be]/20" : "bg-[#2596be]/10"
                            }`}
                          >
                            <span className="text-[#2596be] font-semibold">
                              {idx + 1}
                            </span>
                          </div>
                          <div>
                            <h3
                              className={`font-medium ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {test.title}
                            </h3>
                            <div
                              className={`flex items-center gap-3 text-sm ${
                                darkMode ? "text-gray-500" : "text-gray-500"
                              }`}
                            >
                              <span className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {test.duration} mins
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                {test.totalMarks} marks
                              </span>
                              <span className="capitalize">{test.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div
                className={`sticky top-24 p-6 rounded-2xl border ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Price */}
                <div className="mb-6">
                  {packageData.discountPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-3xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹{packageData.discountPrice.toLocaleString()}
                      </span>
                      <span
                        className={`text-lg line-through ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        ₹{packageData.price.toLocaleString()}
                      </span>
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ₹{packageData.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                  {hasAccess || purchaseSuccess ? (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-green-500 font-medium">
                          {purchaseSuccess
                            ? "Purchase Successful!"
                            : "You have access!"}
                        </p>
                        <p
                          className={`text-sm mt-1 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Start taking tests from this series.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          // Get tokens for SSO
                          const token = tokenManager.getAuthToken();
                          const refreshToken = tokenManager.getRefreshToken();
                          const testPortalUrl =
                            process.env.NEXT_PUBLIC_TEST_PORTAL_URL || "";
                          if (!testPortalUrl) {
                            logger.error(
                              "NEXT_PUBLIC_TEST_PORTAL_URL is not configured",
                            );
                            return;
                          }
                          // Redirect to test portal with SSO params
                          const ssoUrl = `${testPortalUrl}/auth/sso?token=${encodeURIComponent(
                            token || "",
                          )}&refreshToken=${encodeURIComponent(
                            refreshToken || "",
                          )}&packageId=${encodeURIComponent(
                            packageData?._id || "",
                          )}`;
                          window.location.href = ssoUrl;
                        }}
                        className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        Start Tests
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handlePurchase}
                        disabled={purchasing || checkingAccess}
                        className="w-full py-3 px-4 bg-[#2596be] text-white font-semibold rounded-xl shadow-lg hover:bg-[#1e7ca0] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {purchasing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : checkingAccess ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Checking access...
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5" />
                            {isAuthenticated ? "Buy Now" : "Login to Buy"}
                          </>
                        )}
                      </button>

                      {purchaseError && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <p className="text-red-500 text-sm">
                            {purchaseError}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Additional Info */}
                <div className="space-y-4 pt-6 border-t border-dashed border-gray-200/20">
                  {packageData.metadata?.rating && (
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Rating
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {packageData.metadata.rating}
                        </span>
                      </div>
                    </div>
                  )}

                  {packageData.metadata?.difficulty && (
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Difficulty
                      </span>
                      <span
                        className={`font-medium capitalize ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {packageData.metadata.difficulty.toLowerCase()}
                      </span>
                    </div>
                  )}

                  {packageData.metadata?.language && (
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Language
                      </span>
                      <span
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {packageData.metadata.language}
                      </span>
                    </div>
                  )}

                  {packageData.metadata?.targetYear && (
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Target Year
                      </span>
                      <span
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {packageData.metadata.targetYear}
                      </span>
                    </div>
                  )}
                </div>

                {/* Instructors */}
                {packageData.metadata?.instructors &&
                  packageData.metadata.instructors.length > 0 && (
                    <div className="pt-6 mt-6 border-t border-dashed border-gray-200/20">
                      <h3
                        className={`text-sm font-medium mb-3 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Instructors
                      </h3>
                      <div className="space-y-2">
                        {packageData.metadata.instructors.map(
                          (instructor, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <GraduationCap
                                className={`w-4 h-4 ${
                                  darkMode ? "text-gray-500" : "text-gray-400"
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {instructor}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
