"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { counsellingService } from "@/services/counselling.service";
import { logger } from "@/lib/logger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Calendar,
  Clock,
  Video,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

interface Enrollment {
  _id: string;
  packageSnapshot: {
    name: string;
    examType: string;
    maxSessions: number;
    sessionDuration: number;
  };
  sessionsRemaining: number;
  expiresAt: string;
}

const timeSlots = [
  "09:00-09:30",
  "09:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
  "16:30-17:00",
  "17:00-17:30",
  "17:30-18:00",
  "18:00-18:30",
  "18:30-19:00",
];

const meetingPlatforms = [
  { value: "google_meet", label: "Google Meet" },
  { value: "zoom", label: "Zoom" },
  { value: "microsoft_teams", label: "Microsoft Teams" },
];

export default function BookSessionPage() {
  const params = useParams();
  const router = useRouter();
  const enrollmentId = params.enrollmentId as string;

  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("");
  const [agenda, setAgenda] = useState("");
  const [meetingPreference, setMeetingPreference] = useState("google_meet");

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push(
            `/login?redirect=/counselling/book-session/${enrollmentId}`,
          );
          return;
        }

        const enrollments = await counsellingService.getMyEnrollments();
        const foundEnrollment = enrollments.find(
          (e: any) => e._id === enrollmentId,
        );

        if (!foundEnrollment) {
          setError("Enrollment not found");
          return;
        }

        if (foundEnrollment.status !== "active") {
          setError("This enrollment is not active");
          return;
        }

        if (foundEnrollment.sessionsRemaining <= 0) {
          setError("No sessions remaining in this package");
          return;
        }

        setEnrollment(foundEnrollment);
      } catch (error: any) {
        logger.error("Failed to fetch enrollment:", error);
        if (error.message?.includes("Authentication")) {
          router.push(
            `/login?redirect=/counselling/book-session/${enrollmentId}`,
          );
        } else {
          setError(error.message || "Failed to load enrollment details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [enrollmentId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!preferredDate || !preferredTimeSlot || !agenda.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await counsellingService.bookSession({
        enrollmentId,
        preferredDate,
        preferredTimeSlot,
        agenda: agenda.trim(),
        meetingPreference,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/profile/my-enrollments");
      }, 2000);
    } catch (error: any) {
      logger.error("Failed to book session:", error);
      setError(error.message || "Failed to book session. Please try again.");
      setSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    if (!enrollment) return "";
    const expiryDate = new Date(enrollment.expiresAt);
    return expiryDate.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2596be] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading enrollment details...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !enrollment) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Unable to Book Session
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => router.push("/profile/my-enrollments")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#2596be] text-white hover:bg-[#2596be]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Enrollments
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Session Booked Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your counselling session request has been submitted. Our team will
              contact you shortly with the meeting link.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Redirecting to your enrollments...
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push("/profile/my-enrollments")}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2596be] mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Enrollments
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Book Counselling Session
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Schedule your session with our expert counsellor
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6"
              >
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      min={getMinDate()}
                      max={getMaxDate()}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2596be] focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Sessions must be booked at least 1 day in advance
                  </p>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Time Slot *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTimeSlot(slot)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          preferredTimeSlot === slot
                            ? "bg-[#2596be] text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meeting Platform */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meeting Platform *
                  </label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      required
                      value={meetingPreference}
                      onChange={(e) => setMeetingPreference(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2596be] focus:border-transparent appearance-none"
                    >
                      {meetingPlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Agenda */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Agenda *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                    placeholder="What would you like to discuss? (e.g., College selection, branch guidance, JoSAA counselling process)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2596be] focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Be specific about your questions to help us prepare better
                  </p>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-[#2596be] text-white font-semibold rounded-lg hover:bg-[#2596be]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking Session...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Book Session
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Package Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Package Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                      Package Name
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {enrollment?.packageSnapshot.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                      Exam Type
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white uppercase">
                      {enrollment?.packageSnapshot.examType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                      Session Duration
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {enrollment?.packageSnapshot.sessionDuration} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                      Sessions Remaining
                    </p>
                    <p className="font-semibold text-[#2596be]">
                      {enrollment?.sessionsRemaining} /{" "}
                      {enrollment?.packageSnapshot.maxSessions}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Our team will confirm your session within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
