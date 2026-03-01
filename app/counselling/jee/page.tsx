"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  FileCheck,
  Users,
  ArrowRight,
  CheckCircle,
  Calendar,
  Clock,
  BookOpen,
  Target,
  HelpCircle,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Layers,
  Star,
  BadgeCheck,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { counsellingService } from "@/services/counselling.service";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";
import type { CounsellingPackage, Counsellor } from "@/types/counselling";
import { getExamTheme } from "@/lib/theme/examThemes";

// JEE Main accent — sourced from central theme config, not hardcoded
const { accentColor: AC, accentColorEnd: ACE } = getExamTheme("jee-main");
/** Tailwind-incompatible dynamic colors: use as inline style values only */
const accentBg10 = `${AC}1A`; // ~10 % opacity tint
const accentBg15 = `${AC}26`; // ~15 % opacity tint

const counsellingRounds = [
  {
    title: "JoSAA Counselling",
    description:
      "Joint Seat Allocation Authority handles admissions to IITs, NITs, IIITs, and GFTIs based on JEE Main and Advanced ranks.",
    icon: GraduationCap,
    details: [
      "6 rounds of seat allocation",
      "Choice filling for 100+ institutes",
      "Seat acceptance & reporting",
      "Internal sliding options",
    ],
    timeline: "June - October",
  },
  {
    title: "CSAB Special Round",
    description:
      "Central Seat Allocation Board conducts special rounds for NITs, IIITs, and GFTIs after JoSAA counselling.",
    icon: Building2,
    details: [
      "2 special rounds",
      "Vacant seat allocation",
      "Supernumerary seats for girls",
      "NIT+ system participation",
    ],
    timeline: "October - November",
  },
  {
    title: "State Counselling",
    description:
      "Individual state counselling processes for state engineering colleges and private institutions.",
    icon: FileCheck,
    details: [
      "State quota seats",
      "Private college admissions",
      "Management quota guidance",
      "Spot round assistance",
    ],
    timeline: "Varies by state",
  },
];

const services = [
  {
    title: "Choice Filling Strategy",
    description:
      "Get expert assistance in creating the optimal preference list based on your rank, category, and career goals.",
    icon: Layers,
  },
  {
    title: "College Prediction",
    description:
      "Predictive admission insights derived from analysis of five years of historical admission data.",
    icon: TrendingUp,
  },
  {
    title: "Branch Selection Guidance",
    description:
      "Understand placement trends, curriculum, and career prospects to choose the right engineering branch.",
    icon: Target,
  },
  {
    title: "Document Verification",
    description:
      "Complete guidance on required documents, verification process, and seat confirmation procedures.",
    icon: FileCheck,
  },
  {
    title: "Rank Analysis",
    description:
      "Detailed analysis of your JEE rank with category-wise cutoff comparison for realistic expectations.",
    icon: Award,
  },
  {
    title: "Personal Mentorship",
    description:
      "One-on-one sessions with IIT/NIT alumni to resolve all your doubts and concerns about the process.",
    icon: Users,
  },
];

const timeline = [
  { phase: "JEE Main Result", date: "April" },
  { phase: "JEE Advanced Result", date: "June" },
  { phase: "JoSAA Registration", date: "June" },
  { phase: "Choice Filling", date: "June - July" },
  { phase: "Mock Rounds", date: "July" },
  { phase: "Seat Allocation Rounds", date: "July - October" },
  { phase: "CSAB Special Rounds", date: "October - November" },
];

const faqs = [
  {
    question: "When should I start preparing for JEE counselling?",
    answer:
      "Start researching colleges and branches even before results. Once results are out, you'll have limited time for choice filling. Understanding the process early gives you an advantage.",
  },
  {
    question: "How many choices should I fill in JoSAA?",
    answer:
      "Fill as many choices as possible - there's no penalty for more options. We recommend filling 50-100+ choices covering various colleges and branches based on your rank range.",
  },
  {
    question: "What if I don't get any seat in JoSAA?",
    answer:
      "Don't worry! You can participate in CSAB special rounds, state counselling, or explore private engineering colleges. Our counsellors will guide you through alternative options.",
  },
  {
    question: "Can I upgrade my seat after the first round?",
    answer:
      "Yes! JoSAA has multiple rounds and you can upgrade to a better choice if seats become available. Keep your higher preferences above your allotted seat for automatic upgradation.",
  },
  {
    question: "What documents are required for JEE counselling?",
    answer:
      "Key documents include JEE scorecard, Class 10 & 12 marksheets, category certificate (if applicable), domicile certificate, Aadhaar, photographs, and medical fitness certificate.",
  },
];

const collegeCategories = [
  { name: "IITs", count: "23", description: "Indian Institutes of Technology" },
  {
    name: "NITs",
    count: "31",
    description: "National Institutes of Technology",
  },
  {
    name: "IIITs",
    count: "26",
    description: "Indian Institutes of Information Technology",
  },
  {
    name: "GFTIs",
    count: "33",
    description: "Government Funded Technical Institutes",
  },
];

export default function JEECounsellingPage() {
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
        const data = await counsellingService.getPackagesByExam("jee");
        setPackages(data);
      } catch (error: any) {
        logger.error("Failed to fetch packages:", error);
        // Don't throw - just set empty array to avoid redirect
        setPackages([]);
      } finally {
        setLoadingPackages(false);
      }
    };

    const fetchCounsellors = async () => {
      try {
        const data = await counsellingService.getCounsellorsByExam("jee");
        setCounsellors(data);
      } catch (error: any) {
        logger.error("Failed to fetch counsellors:", error);
        // Don't throw - just set empty array to avoid redirect
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

      {/* Compact Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-3"
          style={{ backgroundColor: accentBg10, color: AC }}
        >
          <GraduationCap className="w-4 h-4" />
          JoSAA | CSAB | State Counselling
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
            }}
          >
            JEE Counselling Guidance
          </span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
          Complete guidance for JoSAA, CSAB, and State counselling. Secure your
          seat in IITs, NITs, IIITs, and top engineering colleges with expert
          assistance.
        </p>
        <Link
          href="#pricing"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-colors text-sm hover:opacity-90"
          style={{ backgroundColor: AC }}
        >
          View Pricing Plans
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* College Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Colleges Through JEE Counselling
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Access 100+ premier engineering institutes across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collegeCategories.map((category, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold mb-1" style={{ color: AC }}>
                  {category.count}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {category.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counselling Rounds */}
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
              Understand the different counselling authorities and their
              processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counsellingRounds.map((round, idx) => (
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
                    <round.icon className="w-7 h-7 text-white" />
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: accentBg10, color: AC }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {round.timeline}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {round.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {round.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {round.details.map((detail, i) => (
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

      {/* Our Services */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Our JEE Counselling Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive support at every step of your admission journey
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

      {/* Pricing Section */}
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
              Select the perfect package for your JEE counselling needs
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
                          className="px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {pkg.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    {pkg.discountPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ₹{pkg.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ₹{pkg.price.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                          {Math.round(
                            ((pkg.price - pkg.discountPrice) / pkg.price) * 100,
                          )}
                          % OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    )}
                    {pkg.duration && (
                      <p className="text-sm text-gray-500 mt-1">
                        {pkg.duration}
                      </p>
                    )}
                  </div>

                  {/* Highlights */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: accentBg10, color: AC }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-gray-400 dark:text-gray-500"
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
                        // Redirect to test-portal-client counselling page with SSO
                        const testPortalUrl =
                          process.env.NEXT_PUBLIC_TEST_PORTAL_URL || "";
                        if (!testPortalUrl) {
                          logger.error(
                            "NEXT_PUBLIC_TEST_PORTAL_URL is not configured",
                          );
                          return;
                        }
                        // Import tokenManager dynamically
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
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                        pkg.isFeatured
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
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
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                        pkg.isFeatured
                          ? "text-white hover:opacity-90"
                          : "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
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

      {/* Expert Counsellors Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              Meet Our JEE Expert Counsellors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              IIT/NIT alumni with years of counselling experience
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
                  className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 hover:shadow-xl transition-all"
                >
                  {/* Counsellor Image & Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden"
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
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {counsellor.name}
                        <BadgeCheck className="w-5 h-5" style={{ color: AC }} />
                      </h3>
                      <p className="text-sm font-medium" style={{ color: AC }}>
                        {counsellor.title}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {counsellor.bio}
                  </p>

                  {/* Stats - Handle both direct API props and legacy stats object */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(counsellor.studentsGuided ||
                      counsellor.stats?.studentsHelped) && (
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 text-center">
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
                        <div className="text-xs text-gray-500">
                          Students Helped
                        </div>
                      </div>
                    )}
                    {(counsellor.experience ||
                      counsellor.stats?.experience) && (
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 text-center">
                        <div
                          className="text-lg font-bold"
                          style={{ color: AC }}
                        >
                          {counsellor.experience ||
                            counsellor.stats?.experience ||
                            0}
                          +
                        </div>
                        <div className="text-xs text-gray-500">Years Exp.</div>
                      </div>
                    )}
                  </div>

                  {/* Languages - Added */}
                  {counsellor.languages && counsellor.languages.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Speaks
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {counsellor.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specializations */}
                  {counsellor.specializations &&
                    counsellor.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {counsellor.specializations
                          .slice(0, 3)
                          .map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{ backgroundColor: accentBg10, color: AC }}
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

      {/* Timeline Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${AC}, ${ACE})`,
              }}
            >
              JEE Counselling Timeline 2026
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
              Common queries about JEE counselling answered
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

      {/* CTA Section */}
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
              Start Your JEE Counselling Journey
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Don&apos;t miss out on your dream IIT/NIT seat. Get expert
              guidance from our experienced counsellors who have helped 1,000+
              students.
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
