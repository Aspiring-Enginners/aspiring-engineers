"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  FileCheck,
  Users,
  ArrowRight,
  CheckCircle,
  Calendar,
  BookOpen,
  Target,
  HelpCircle,
  Award,
  TrendingUp,
  Layers,
  Sparkles,
  Loader2,
  Check,
  X,
  MapPin,
  Settings,
  BadgeCheck,
  Star,
  Landmark,
} from "lucide-react";
import { counsellingService } from "@/services/counselling.service";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";
import type { CounsellingPackage, Counsellor } from "@/types/counselling";
import { getExamTheme } from "@/lib/theme/examThemes";

const { accentColor: AC, accentColorEnd: ACE } = getExamTheme("wbjee");
const accentBg10 = `${AC}1A`;
const accentBg5 = `${AC}0D`;

const counsellingPhases = [
  {
    title: "General Round",
    description:
      "Main counselling rounds conducted by WBJEEB for all candidates based on WBJEE rank.",
    icon: GraduationCap,
    details: [
      "Online choice filling",
      "Multiple rounds of allocation",
      "Seat freezing options",
      "Real-time seat availability",
    ],
    timeline: "July - August",
  },
  {
    title: "Mop-Up Round",
    description:
      "Centralized round for upgrading seats and filling vacancies after general rounds.",
    icon: Settings,
    details: [
      "Fresh choice filling",
      "Vacant seat allocation",
      "One-time opportunity",
      "Category conversion rules",
    ],
    timeline: "September",
  },
  {
    title: "Decentralized Counselling",
    description:
      "Final round conducted at individual college level for remaining vacant seats.",
    icon: MapPin,
    details: [
      "College-level admission",
      "Direct reporting",
      "On-spot verification",
      "Immediate confirmation",
    ],
    timeline: "September - October",
  },
];

const services = [
  {
    title: "Choice Filling Strategy",
    description:
      "Expert guidance on creating the optimal preference list based on your GMR/PMR rank.",
    icon: Layers,
  },
  {
    title: "College Prediction",
    description:
      "Predictive admission insights derived from analysis of five years of historical admission data.",
    icon: TrendingUp,
  },
  {
    title: "Branch Selection",
    description:
      "Understand the scope of different engineering branches and their placements in West Bengal.",
    icon: Target,
  },
  {
    title: "Document Verification",
    description:
      "Complete checklist and verification support for domicile, TFW, and category certificates.",
    icon: FileCheck,
  },
  {
    title: "College Comparison",
    description:
      "Detailed comparison of ROI, placements, and campus life of top Government vs Private colleges.",
    icon: Award,
  },
  {
    title: "Personal Mentorship",
    description:
      "One-on-one sessions with Jadavpur/IIEST alumni to guide your decision-making process.",
    icon: Users,
  },
];

const timeline = [
  { phase: "WBJEE Result Declaration", date: "June" },
  { phase: "Counselling Registration", date: "July" },
  { phase: "Choice Filling Begins", date: "July" },
  { phase: "Round 1 Seat Allotment", date: "July" },
  { phase: "Round 2 Seat Allotment", date: "August" },
  { phase: "Mop-Up Round Registration", date: "August" },
  { phase: "Mop-Up Seat Allotment", date: "September" },
  { phase: "Decentralized Counselling", date: "September - October" },
];

const faqs = [
  {
    question: "What is the eligibility for WBJEE counselling?",
    answer:
      "Candidates must have a valid WBJEE rank. For Govt. colleges and Domicile quotas, West Bengal domicile is mandatory. Non-domicile students can apply for General Category seats in Pvt. colleges.",
  },
  {
    question: "Is Domicile Certificate mandatory?",
    answer:
      "Yes, for claiming Home State Quota seats in Government colleges and TFW seats, a valid Domicile Certificate (Performa A1/A2/B) is strictly required.",
  },
  {
    question: "Can I get Jadavpur University with my rank?",
    answer:
      "Jadavpur University is the most sought-after institute. Cutoffs vary by branch and category. Generally, a rank under 500-1000 is needed for top branches like CSE/IT/ECE for General Category.",
  },
  {
    question: "What is TFW Scheme?",
    answer:
      "Tuition Fee Waiver (TFW) scheme allows students with family income less than ₹2.5 Lakhs/year to get 100% tuition fee waiver. Selection is based on merit (WBJEE rank).",
  },
  {
    question: "How many choices should I fill?",
    answer:
      "There is no limit. We recommend filling maximum choices in correct order of preference. Our mentors help you create a risk-free choice list.",
  },
];

const wbjeeStats = [
  {
    name: "Jadavpur Univ.",
    count: "#1",
    description: "Top Ranked State Govt. University with 100% Placements",
    icon: Building2,
  },
  {
    name: "Govt. Colleges",
    count: "10+",
    description: "Including IIEST Shibpur, KGEC, JGEC & Others",
    icon: Landmark,
  },
  {
    name: "TFW Seats",
    count: "5%",
    description: "Dedicated Tuition Fee Waiver Seats in Every Institute",
    icon: Award,
  },
  {
    name: "Private Colleges",
    count: "80+",
    description: "IEM, Heritage, Techno India & Many More",
    icon: BookOpen,
  },
];

export default function WBJEECounsellingPage() {
  const { isAuthenticated } = useAuth();
  const [packages, setPackages] = useState<CounsellingPackage[]>([]);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingCounsellors, setLoadingCounsellors] = useState(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

  // Helper function to check if user has active enrollment for a package
  const hasEnrollmentForPackage = (packageSlug: string): boolean => {
    return enrollments.some(
      (enrollment) =>
        enrollment.packageSnapshot?.slug === packageSlug &&
        enrollment.status === "active",
    );
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await counsellingService.getPackagesByExam("wbjee");
        setPackages(data);
      } catch (error: any) {
        logger.error("Failed to fetch packages:", error);
        setPackages([]);
      } finally {
        setLoadingPackages(false);
      }
    };

    const fetchCounsellors = async () => {
      try {
        const data = await counsellingService.getCounsellorsByExam("wbjee");
        setCounsellors(data);
      } catch (error: any) {
        logger.error("Failed to fetch counsellors:", error);
        setCounsellors([]);
      } finally {
        setLoadingCounsellors(false);
      }
    };

    const fetchEnrollments = async () => {
      if (!isAuthenticated) return;

      setLoadingEnrollments(true);
      try {
        const data = await counsellingService.getMyEnrollments();
        setEnrollments(data);
      } catch (error: any) {
        logger.error("Failed to fetch enrollments:", error);
        setEnrollments([]);
      } finally {
        setLoadingEnrollments(false);
      }
    };

    fetchPackages();
    fetchCounsellors();
    fetchEnrollments();
  }, [isAuthenticated]);

  return (
    <>
      <Navbar />

      {/* Compact Hero Header - Matches JEE Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-3"
          style={{ backgroundColor: accentBg10, color: AC }}
        >
          <GraduationCap className="w-4 h-4" />
          WBJEEB | Jadavpur | Decentralized
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
            }}
          >
            WBJEE Counselling Guidance
          </span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
          Complete guidance for West Bengal Joint Entrance Examination
          counselling. Secure your seat in Jadavpur University, Calcutta
          University, and top Govt. Engineering Colleges.
        </p>
        <Link
          href="#pricing"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-colors text-sm"
          style={{ backgroundColor: AC }}
        >
          View Pricing Plans
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats/Institutes - Matches JEE "College Categories" Style */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              West Bengal Engineering Ecosystem
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Access the best engineering institutes in the state
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wbjeeStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold mb-1" style={{ color: AC }}>
                  {stat.count}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counselling Phases - Matches JEE "Counselling Rounds" Style */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Counselling Process Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Understand the WBJEEB counselling phases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counsellingPhases.map((phase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 hover:shadow-xl transition-all"
              >
                {/* Icon & Timeline Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${AC}, ${ACE})`,
                    }}
                  >
                    <phase.icon className="w-7 h-7 text-white" />
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: accentBg10, color: AC }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {phase.timeline}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {phase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {phase.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {phase.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services - Matches JEE Services Style */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Our WBJEE Counselling Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive support from GMR Rank to Final Admission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: accentBg10 }}
                >
                  <service.icon className="w-6 h-6" style={{ color: AC }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Blue Theme */}
      <section
        id="pricing"
        className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Choose Your Counselling Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Select the perfect package for your WBJEE counselling needs
            </p>
          </div>

          {loadingPackages ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: AC }} />
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No packages available at the moment. Please check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="relative p-6 rounded-2xl border bg-white dark:bg-gray-900 hover:shadow-xl transition-all"
                  style={
                    pkg.isFeatured
                      ? { borderColor: AC, boxShadow: `0 0 0 2px ${AC}33` }
                      : {}
                  }
                >
                  {/* Featured Badge */}
                  {pkg.isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div
                        className="px-4 py-1 rounded-full text-white text-sm font-semibold flex items-center gap-1"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Package Badges */}
                  {pkg.badges && pkg.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 min-h-[40px] leading-relaxed">
                    {pkg.shortDescription || pkg.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    {pkg.discountPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-3xl font-bold"
                          style={{ color: AC }}
                        >
                          ₹{pkg.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-500 line-through decoration-red-500/50">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-xs">
                          {Math.round(
                            ((pkg.price - pkg.discountPrice) / pkg.price) * 100,
                          )}
                          % OFF
                        </span>
                      </div>
                    ) : (
                      <span
                        className="text-3xl font-bold"
                        style={{ color: AC }}
                      >
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    )}

                    {/* Session & Duration Info */}
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {pkg.maxSessions && (
                        <div className="flex items-center gap-2 font-medium">
                          <Users className="w-4 h-4" style={{ color: AC }} />
                          <span>
                            {pkg.maxSessions} Live Session
                            {pkg.maxSessions > 1 ? "s" : ""}
                            {pkg.sessionDuration &&
                              ` (${pkg.sessionDuration} mins each)`}
                          </span>
                        </div>
                      )}
                      {pkg.duration && (
                        <div className="flex items-center gap-2 font-medium">
                          <Calendar className="w-4 h-4" style={{ color: AC }} />
                          <span>Duration: {pkg.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: accentBg10,
                            borderColor: `${AC}33`,
                            color: AC,
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        {feature.included ? (
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        ) : (
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center shrink-0">
                            <X className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <span
                          className={`text-sm leading-tight ${
                            feature.included
                              ? "text-gray-900 dark:text-gray-100 font-medium"
                              : "text-gray-500 dark:text-gray-500"
                          }`}
                        >
                          {feature.title || feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {hasEnrollmentForPackage(pkg.slug) ? (
                    <button
                      onClick={() => {
                        const testPortalUrl =
                          process.env.NEXT_PUBLIC_TEST_PORTAL_URL || "";
                        if (!testPortalUrl) {
                          logger.error(
                            "NEXT_PUBLIC_TEST_PORTAL_URL is not configured",
                          );
                          return;
                        }
                        import("@/lib/utils/tokenManager").then(
                          ({ tokenManager }) => {
                            const token = tokenManager.getAuthToken();
                            const refreshToken = tokenManager.getRefreshToken();
                            const ssoUrl = `${testPortalUrl}/auth/sso?token=${encodeURIComponent(
                              token || "",
                            )}&refreshToken=${encodeURIComponent(
                              refreshToken || "",
                            )}&redirect=/counselling/enrollments`;
                            window.location.href = ssoUrl;
                          },
                        );
                      }}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors shadow-sm ${
                        pkg.isFeatured
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Go to Counselling
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={
                        isAuthenticated
                          ? `/checkout?package=${pkg.slug}&type=counselling_package`
                          : `/login?redirect=/checkout?package=${pkg.slug}&type=counselling_package`
                      }
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                        pkg.isFeatured
                          ? "text-white hover:opacity-90"
                          : "bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20"
                      }`}
                      style={
                        pkg.isFeatured
                          ? {
                              backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
                            }
                          : {}
                      }
                    >
                      {isAuthenticated ? "Buy Now" : "Login to Buy"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Expert Counsellors Section - Blue Theme */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Meet Our WBJEE Expert Counsellors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Alumni from Jadavpur, Kalyani & Top Govt Colleges
            </p>
          </div>

          {loadingCounsellors ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: AC }} />
            </div>
          ) : counsellors.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              Counsellors information coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {counsellors.slice(0, 6).map((counsellor) => (
                <div
                  key={counsellor._id}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 hover:shadow-xl transition-all h-full flex flex-col"
                >
                  {/* Counsellor Image & Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-white text-xl font-bold overflow-hidden shadow-md ring-2 ring-white dark:ring-gray-800"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${AC}, ${ACE})`,
                      }}
                    >
                      {counsellor.image ? (
                        <img
                          src={counsellor.image}
                          alt={counsellor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        counsellor.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {counsellor.name}
                        {counsellor.isFeatured && (
                          <BadgeCheck
                            className="w-5 h-5"
                            style={{ color: AC }}
                          />
                        )}
                      </h3>
                      <p className="text-sm font-bold" style={{ color: AC }}>
                        {counsellor.title}
                      </p>
                      {counsellor.stats?.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {counsellor.stats.rating} (
                            {counsellor.stats.totalReviews || 0} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {counsellor.shortBio || counsellor.bio}
                    </p>
                  </div>

                  {/* Qualifications - Added based on API Response */}
                  {counsellor.qualifications &&
                    counsellor.qualifications.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Qualifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {counsellor.qualifications
                            .slice(0, 2)
                            .map((qual, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                              >
                                <GraduationCap
                                  className="w-3 h-3"
                                  style={{ color: AC }}
                                />
                                {qual}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Stats - Handle both direct API props and legacy stats object */}
                  <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                    {(counsellor.studentsGuided ||
                      counsellor.stats?.studentsHelped) && (
                      <div
                        className="p-2.5 rounded-lg text-center"
                        style={{
                          backgroundColor: accentBg5,
                          borderColor: `${AC}1A`,
                        }}
                      >
                        <div
                          className="text-lg font-bold"
                          style={{ color: AC }}
                        >
                          {(
                            counsellor.studentsGuided ||
                            counsellor.stats?.studentsHelped ||
                            0
                          ).toLocaleString()}
                          +
                        </div>
                        <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                          Students
                        </div>
                      </div>
                    )}
                    {(counsellor.experience ||
                      counsellor.stats?.experience) && (
                      <div
                        className="p-2.5 rounded-lg text-center"
                        style={{
                          backgroundColor: accentBg5,
                          borderColor: `${AC}1A`,
                        }}
                      >
                        <div
                          className="text-lg font-bold"
                          style={{ color: AC }}
                        >
                          {counsellor.experience ||
                            counsellor.stats?.experience ||
                            0}
                          +
                        </div>
                        <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
                          Years Exp.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Languages - Added based on API Response */}
                  {counsellor.languages && counsellor.languages.length > 0 && (
                    <div className="mb-4 border-t border-gray-100 dark:border-gray-800 pt-3">
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-medium mr-2">
                        Speaks:
                      </span>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {counsellor.languages.join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Specializations */}
                  {counsellor.specializations &&
                    counsellor.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {counsellor.specializations
                          .slice(0, 3)
                          .map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold border border-gray-200 dark:border-gray-700"
                            >
                              {spec}
                            </span>
                          ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section - Blue Theme */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              WBJEE Counselling Timeline 2026
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Important dates and phases to remember
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${AC}, ${ACE})`,
              }}
            />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex items-center gap-4 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 transform -translate-x-1/2 z-10"
                    style={{ backgroundColor: AC }}
                  />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 inline-block">
                      <div
                        className="text-sm font-semibold mb-1"
                        style={{ color: AC }}
                      >
                        {item.date}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.phase}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Common queries about WBJEE counselling answered
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: accentBg10 }}
                  >
                    <HelpCircle className="w-4 h-4" style={{ color: AC }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Blue Theme */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="p-8 md:p-12 rounded-3xl text-white"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${AC}, ${ACE})`,
            }}
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Start Your WBJEE Counselling Journey
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Don't miss out on Jadavpur University or other top Govt. colleges.
              Get expert guidance from current students and alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white hover:bg-gray-100 transition-colors"
                style={{ color: AC }}
              >
                <Star className="w-5 h-5" />
                View Pricing Plans
              </Link>
              <Link
                href="/counselling/admission-guidance"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                <Users className="w-5 h-5" />
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
