"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api-client";
import { logger } from "@/lib/logger";
import {
  Loader2,
  LogOut,
  Coins,
  Gift,
  Users,
  Copy,
  Check,
} from "lucide-react";

interface ReferralSummary {
  referralCode: string | null;
  pointsBalance: number;
  lifetimePointsEarned: number;
  totalPointsRedeemed: number;
  successfulReferralsCount: number;
  pendingReferrals: number;
  rewardedReferrals: number;
  referredByUserId: string | null;
}

interface ReferralEvent {
  _id: string;
  referredUser: {
    userId: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
    examTargets?: string[];
    targetYear?: number;
  };
  status: "pending" | "rewarded" | "disqualified";
  referralCodeUsed: string;
  firstSuccessfulPaymentId: string | null;
  qualifiedAt: string | null;
  rewardedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ReferralTransaction {
  _id: string;
  userId: string;
  type:
    | "referrer_bonus"
    | "referred_bonus"
    | "redemption_debit"
    | "admin_adjustment";
  points: number;
  balanceAfter: number;
  idempotencyKey: string;
  referenceType?: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export default function ProfileDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [referralSummary, setReferralSummary] =
    useState<ReferralSummary | null>(null);
  const [referralEvents, setReferralEvents] = useState<ReferralEvent[]>([]);
  const [referralTransactions, setReferralTransactions] = useState<
    ReferralTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const extractPayload = <T,>(data: unknown, fallback: T): T => {
      if (Array.isArray(data)) {
        return data as T;
      }
      if (data && typeof data === "object" && "data" in data) {
        return ((data as { data?: T }).data ?? fallback) as T;
      }
      return (data as T) ?? fallback;
    };

    const fetchReferralData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch summary and ensure referral code exists.
        try {
          const summaryResponse = await apiClient.get("/referrals/me/summary");
          let summaryData = extractPayload<ReferralSummary | null>(
            summaryResponse.data,
            null,
          );

          if (!summaryData?.referralCode) {
            logger.log(
              "[ProfileDashboard] Referral code missing, generating new code",
            );
            await apiClient.post("/referrals/me/generate-code");

            const refreshedSummaryResponse = await apiClient.get(
              "/referrals/me/summary",
            );
            summaryData = extractPayload<ReferralSummary | null>(
              refreshedSummaryResponse.data,
              null,
            );
          }

          setReferralSummary(summaryData);
        } catch (err) {
          logger.error("[ProfileDashboard] Failed to fetch referral summary:", err);
        }

        const [eventsResponse, transactionsResponse] = await Promise.all([
          apiClient.get("/referrals/me/events"),
          apiClient.get("/referrals/me/transactions"),
        ]);

        setReferralEvents(
          extractPayload<ReferralEvent[]>(eventsResponse.data, []),
        );
        setReferralTransactions(
          extractPayload<ReferralTransaction[]>(transactionsResponse.data, []),
        );

        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch referral data";
        logger.error("[ProfileDashboard] Error:", errorMessage);
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchReferralData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const handleCopyReferralCode = async () => {
    const code = referralSummary?.referralCode;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      logger.error("[ProfileDashboard] Failed to copy referral code:", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-bg-900 to-bg-800">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                Welcome, {user?.name?.split(" ")[0] || "User"}! 👋
              </h1>
              <p className="text-text-secondary">
                Refer friends and track your rewards
              </p>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-lg border border-bg-700 bg-bg-800/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Referral Code</p>
                <p className="text-2xl font-bold text-text-primary">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    referralSummary?.referralCode || "-"
                  )}
                </p>
                {!loading && referralSummary?.referralCode ? (
                  <button
                    onClick={handleCopyReferralCode}
                    className="mt-2 inline-flex items-center gap-1 rounded-md border border-bg-700 px-2 py-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Copy referral code"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                ) : null}
              </div>
              <Gift className="text-brand opacity-0.5" size={32} />
            </div>
          </div>

          <div className="p-6 rounded-lg border border-bg-700 bg-bg-800/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Points Balance</p>
                <p className="text-2xl font-bold text-text-primary">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    referralSummary?.pointsBalance || 0
                  )}
                </p>
              </div>
              <Coins className="text-brand opacity-0.5" size={32} />
            </div>
          </div>

          <div className="p-6 rounded-lg border border-bg-700 bg-bg-800/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Successful Referrals</p>
                <p className="text-2xl font-bold text-text-primary">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    referralSummary?.successfulReferralsCount || 0
                  )}
                </p>
              </div>
              <Users className="text-brand opacity-0.5" size={32} />
            </div>
          </div>

          <div className="p-6 rounded-lg border border-bg-700 bg-bg-800/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Pending Referrals</p>
                <p className="text-2xl font-bold text-text-primary">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    referralSummary?.pendingReferrals || 0
                  )}
                </p>
              </div>
              <Users className="text-brand opacity-0.5" size={32} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary mb-2">Refer & Earn</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-brand" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-lg border border-bg-700 bg-bg-800/50">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-brand" />
                  <h3 className="text-lg font-semibold text-text-primary">
                    Referral Events
                  </h3>
                </div>

                {referralEvents.length === 0 ? (
                  <p className="text-sm text-text-secondary">No referral events yet.</p>
                ) : (
                  <div className="space-y-3 max-h-88 overflow-y-auto pr-1">
                    {referralEvents.map((event) => (
                      <div
                        key={event._id}
                        className="rounded-md border border-bg-700 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-text-primary">
                              {event.referredUser?.name || "Unknown User"}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {event.referredUser?.email || "No email"}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.status === "rewarded"
                                ? "bg-green-500/20 text-green-500"
                                : event.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-2">
                          Added on {new Date(event.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-5 rounded-lg border border-bg-700 bg-bg-800/50">
                <div className="flex items-center gap-2 mb-4">
                  <Coins size={18} className="text-brand" />
                  <h3 className="text-lg font-semibold text-text-primary">
                    Points Transactions
                  </h3>
                </div>

                {referralTransactions.length === 0 ? (
                  <p className="text-sm text-text-secondary">
                    No points transactions yet.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-88 overflow-y-auto pr-1">
                    {referralTransactions.map((transaction) => (
                      <div
                        key={transaction._id}
                        className="rounded-md border border-bg-700 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-text-primary">
                              {transaction.type.replaceAll("_", " ")}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-sm font-semibold ${
                                transaction.points >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {transaction.points >= 0 ? "+" : ""}
                              {transaction.points}
                            </p>
                            <p className="text-xs text-text-secondary">
                              Bal: {transaction.balanceAfter}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
