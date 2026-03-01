"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import paymentService from "@/services/payment.service";
import { initializeCashfree } from "@/lib/cashfree";
import { logger } from "@/lib/logger";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const packageSlug = searchParams.get("package"); // For counselling packages
  const packageType = searchParams.get("type") || "test_package"; // Default to test package
  const { isAuthenticated, user } = useAuth();

  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/checkout?packageId=${packageId}`);
    }
  }, [isAuthenticated, router, packageId]);

  // Redirect if no packageId or packageSlug
  useEffect(() => {
    if (!packageId && !packageSlug) {
      router.push("/test-series");
    }
  }, [packageId, packageSlug, router]);

  // Fetch package details
  useEffect(() => {
    if ((packageId || packageSlug) && isAuthenticated) {
      fetchPackageDetails();
    }
  }, [packageId, packageSlug, isAuthenticated]);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      let endpoint = "";

      if (packageType === "counselling_package" && packageSlug) {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/counselling/packages/slug/${packageSlug}`;
      } else if (packageId) {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/packages/id/${packageId}`;
      }

      if (!endpoint) {
        setError("Invalid package information");
        return;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.success || data.data || data._id) {
        setPackageData(data.data || data);
      } else {
        setError("Failed to load package details");
      }
    } catch (err) {
      logger.error("Error fetching package:", err);
      setError("Failed to load package details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    // Check if we have either packageId or packageSlug AND user AND packageData
    if ((!packageId && !packageSlug) || !user || !packageData) return;

    setIsProcessing(true);
    setError("");

    try {
      // Step 1: Create Cashfree order
      const orderResponse = await paymentService.createOrder({
        amount: packageData.discountPrice || packageData.price,
        packageId: packageData._id,
        packageType: packageType as "test_package" | "counselling_package",
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || "+911234567890",
        returnUrl: `${window.location.origin}/payment/verify?order_id={order_id}`,
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      // Step 2: Initialize Cashfree SDK
      const cashfree = await initializeCashfree();

      // Step 3: Open Cashfree checkout
      // Using _self (full page redirect) to ensure returnUrl works
      const checkoutOptions = {
        paymentSessionId: orderResponse.data.paymentSessionId,
        redirectTarget: "_self" as const,
      };

      // Open Cashfree checkout
      // User will be redirected to returnUrl after payment completion
      cashfree.checkout(checkoutOptions);

      // Reset processing state
      // Verification will happen on the verify page (returnUrl)
      setIsProcessing(false);
    } catch (err: any) {
      logger.error("Payment error:", err);
      const errorMessage =
        err.message || "Failed to initiate payment. Please try again.";

      // Check if it's a duplicate purchase error
      if (errorMessage.toLowerCase().includes("already purchased")) {
        setError(errorMessage);

        // Redirect to enrollments page after 3 seconds
        setTimeout(() => {
          if (packageType === "counselling_package") {
            window.location.href = `${process.env.NEXT_PUBLIC_TEST_PORTAL_URL}/counselling/enrollments`;
          } else {
            window.location.href = `${process.env.NEXT_PUBLIC_TEST_PORTAL_URL}/packages`;
          }
        }, 3000);
      } else {
        setError(errorMessage);
      }

      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#071219]">
        <Loader2 className="h-12 w-12 animate-spin text-[#2596be]" />
      </div>
    );
  }

  if (error && !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#071219] px-4">
        <div className="max-w-md w-full bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/test-series")}
            className="px-6 py-3 bg-[#2596be] text-white rounded-lg hover:bg-[#1e7ca0] transition-colors"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const finalPrice = packageData?.discountPrice || packageData?.price || 0;
  const savings = packageData?.discountPrice
    ? packageData.price - packageData.discountPrice
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#071219] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                User Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Name</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Email
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </span>
                </div>
                {user?.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Phone
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Package Details
              </h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {packageData?.examTypes?.map((exam: string) => (
                      <span
                        key={exam}
                        className="px-2 py-1 bg-[#2596be]/10 text-[#2596be] text-xs font-medium rounded-full"
                      >
                        {exam.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                    {packageData?.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {packageData?.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{packageData?.totalTests} Tests</span>
                    <span>•</span>
                    <span>Valid for {packageData?.validityDays} days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your payment information is secure and encrypted. We use
                  Cashfree for safe and secure payments.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Original Price</span>
                    <span>₹{packageData?.price}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{savings}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 dark:border-white/10 pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total Amount</span>
                      <span>₹{finalPrice}</span>
                    </div>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg p-3 text-sm text-green-700 dark:text-green-300">
                    You save ₹{savings}!
                  </div>
                )}

                {error && (
                  <div
                    className={`rounded-lg p-4 text-sm ${
                      error.toLowerCase().includes("already purchased")
                        ? "bg-blue-50 dark:bg-blue-500/10 border-2 border-blue-200 dark:border-blue-500/20"
                        : "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {error.toLowerCase().includes("already purchased") ? (
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <div className="flex-1">
                        <p
                          className={
                            error.toLowerCase().includes("already purchased")
                              ? "text-blue-700 dark:text-blue-300 font-medium"
                              : "text-red-700 dark:text-red-300 font-medium"
                          }
                        >
                          {error}
                        </p>
                        {error.toLowerCase().includes("already purchased") && (
                          <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                            Redirecting you to your enrollments...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-[#2596be] text-white font-semibold rounded-lg hover:bg-[#1e7ca0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${finalPrice}`
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  By completing this purchase, you agree to our Terms of Service
                  and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#071219]">
          <Loader2 className="h-12 w-12 animate-spin text-[#2596be]" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
