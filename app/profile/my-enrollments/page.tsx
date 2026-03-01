"use client";

import { useEffect, useState } from "react";
import { counsellingService } from "@/services/counselling.service";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { logger } from "@/lib/logger";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Video,
  Loader2,
} from "lucide-react";

interface CounsellingEnrollment {
  _id: string;
  packageSnapshot: {
    name: string;
    examType: string;
    maxSessions: number;
    sessionDuration?: number;
    validityDays?: number;
  };
  status: "active" | "expired" | "cancelled" | "refunded";
  sessionsUsed: number;
  sessionsRemaining: number;
  enrolledAt: string;
  expiresAt: string;
  assignedCounsellor?: {
    name: string;
    title: string;
    image: string;
  };
}

export default function MyEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<CounsellingEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login?redirect=/profile/my-enrollments");
          return;
        }

        const data = await counsellingService.getMyEnrollments();
        setEnrollments(data);
      } catch (error: any) {
        logger.error("Failed to fetch enrollments:", error);

        // Handle authentication errors
        if (error.response?.status === 401) {
          router.push("/login?redirect=/profile/my-enrollments");
          return;
        }

        setError(error.message || "Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [router]);

  const getStatusBadge = (status: string) => {
    const badges = {
      active: {
        icon: CheckCircle,
        text: "Active",
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      },
      expired: {
        icon: XCircle,
        text: "Expired",
        className:
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
      },
      cancelled: {
        icon: AlertCircle,
        text: "Cancelled",
        className:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      },
      refunded: {
        icon: AlertCircle,
        text: "Refunded",
        className:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      },
    };

    const badge = badges[status as keyof typeof badges] || badges.active;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${badge.className}`}
      >
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const days = Math.ceil(
      (new Date(expiryDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return days;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2596be] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading your enrollments...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Counselling Packages
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Manage your purchased counselling sessions
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {enrollments.length === 0 && !error && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Counselling Packages Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't purchased any counselling packages yet.
              </p>
              <Link
                href="/counselling"
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-[#2596be] text-white hover:bg-[#2596be]/90 transition-colors"
              >
                Browse Packages
              </Link>
            </div>
          )}

          {/* Enrollments Grid */}
          {enrollments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => {
                const daysRemaining = getDaysUntilExpiry(enrollment.expiresAt);
                const isNearExpiry = daysRemaining <= 7 && daysRemaining > 0;
                const isActive = enrollment.status === "active";

                return (
                  <div
                    key={enrollment._id}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#2596be] to-[#4EA8DE] p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-bold text-lg mb-1">
                            {enrollment.packageSnapshot.name}
                          </h3>
                          <p className="text-white/80 text-sm uppercase tracking-wide">
                            {enrollment.packageSnapshot.examType}
                          </p>
                        </div>
                        {getStatusBadge(enrollment.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Sessions Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Sessions Used
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {enrollment.sessionsUsed} /{" "}
                            {enrollment.packageSnapshot.maxSessions}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#2596be] h-2 rounded-full transition-all"
                            style={{
                              width: `${(enrollment.sessionsUsed / enrollment.packageSnapshot.maxSessions) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Enrolled: {formatDate(enrollment.enrolledAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>
                            {enrollment.packageSnapshot.sessionDuration || 30}{" "}
                            min sessions
                          </span>
                        </div>
                        {isActive && (
                          <div
                            className={`flex items-center gap-2 text-sm ${isNearExpiry ? "text-orange-600 dark:text-orange-400" : "text-gray-600 dark:text-gray-400"}`}
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>
                              {daysRemaining > 0
                                ? `Expires in ${daysRemaining} days`
                                : "Expired"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Counsellor */}
                      {enrollment.assignedCounsellor && (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                            Your Counsellor
                          </p>
                          <div className="flex items-center gap-3">
                            <img
                              src={enrollment.assignedCounsellor.image}
                              alt={enrollment.assignedCounsellor.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                {enrollment.assignedCounsellor.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {enrollment.assignedCounsellor.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {isActive && enrollment.sessionsRemaining > 0 && (
                        <Link
                          href={`/counselling/book-session/${enrollment._id}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-[#2596be] text-white hover:bg-[#2596be]/90 transition-colors"
                        >
                          <Video className="w-4 h-4" />
                          Book Session
                        </Link>
                      )}
                      {isActive && enrollment.sessionsRemaining === 0 && (
                        <div className="text-center py-2 text-sm text-gray-500 dark:text-gray-500">
                          All sessions used
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
