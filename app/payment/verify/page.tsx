"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import paymentService from "@/services/payment.service";
import { logger } from "@/lib/logger";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

function PaymentVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "verifying" | "success" | "failed" | "error"
  >("verifying");
  const [message, setMessage] = useState("Verifying your payment...");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("order_id");

      if (!orderId) {
        setStatus("error");
        setMessage("Invalid payment session");
        setTimeout(() => router.push("/test-series"), 3000);
        return;
      }

      try {
        const result = await paymentService.verifyPayment({ orderId });

        // Check if verification was successful
        if (result.success && result.data) {
          // Check if access was granted OR payment status is SUCCESS
          const isSuccessful =
            result.data.accessGranted ||
            result.data.paymentStatus === "SUCCESS" ||
            result.data.orderStatus === "PAID";

          if (isSuccessful) {
            setStatus("success");
            setProductName(result.data.productName || "your package");
            setMessage(
              `Payment successful! You now have access to ${result.data.productName || "your package"}`,
            );
            setTimeout(() => router.push("/profile/my-packages"), 3000);
          } else {
            setStatus("failed");
            setMessage(
              result.data.errorMessage ||
                "Payment verification pending. Please check your purchases.",
            );
            setTimeout(() => router.push("/profile/my-packages"), 3000);
          }
        } else {
          logger.error("Verification failed:", result);
          setStatus("failed");
          setMessage(result.message || "Payment failed. Please try again.");
          setTimeout(() => router.push("/test-series"), 3000);
        }
      } catch (error: any) {
        logger.error("Verification error:", error);
        setStatus("error");
        setMessage(
          "Failed to verify payment. Please check your purchases or contact support.",
        );
        setTimeout(() => router.push("/profile/my-packages"), 3000);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#071219] px-4">
      <div className="max-w-md w-full bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-8 text-center">
        {/* Status Icon */}
        <div className="mb-6">
          {status === "verifying" && (
            <Loader2 className="w-16 h-16 mx-auto text-[#2596be] animate-spin" />
          )}
          {status === "success" && (
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          )}
          {status === "failed" && (
            <XCircle className="w-16 h-16 mx-auto text-red-500" />
          )}
          {status === "error" && (
            <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500" />
          )}
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {status === "verifying" && "Verifying Payment"}
          {status === "success" && "Payment Successful!"}
          {status === "failed" && "Payment Failed"}
          {status === "error" && "Verification Error"}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

        {/* Auto-redirect notice */}
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {status === "success" && "Redirecting to your packages..."}
          {(status === "failed" || status === "error") && "Redirecting back..."}
          {status === "verifying" && "Please wait..."}
        </p>
      </div>
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#071219]">
          <Loader2 className="w-12 h-12 animate-spin text-[#2596be]" />
        </div>
      }
    >
      <PaymentVerifyContent />
    </Suspense>
  );
}
