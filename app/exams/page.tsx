"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Link from "next/link";
import { logger } from "@/lib/logger";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Atom,
  Stethoscope,
  Building2,
  ArrowRight,
  BookOpen,
  FileText,
  Users,
} from "lucide-react";
import { getPapers, Paper } from "@/services/papers";

interface ExamCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bgGradient: string;
  features: string[];
  category: "jee-main" | "jee-advanced" | "neet" | "wbjee";
}

const examCategories: ExamCategory[] = [
  {
    id: "jee-main",
    title: "JEE Main",
    subtitle: "Joint Entrance Examination",
    description:
      "Gateway to NITs, IIITs and other top engineering colleges. Comprehensive preparation with PYQs and mock tests.",
    icon: Atom,
    href: "/exams/jee",
    color: "#2596be",
    bgGradient: "from-[#2596be]/20 to-[#60DFFF]/10",
    features: ["Physics", "Chemistry", "Mathematics"],
    category: "jee-main",
  },
  {
    id: "jee-advanced",
    title: "JEE Advanced",
    subtitle: "For IIT Aspirants",
    description:
      "Crack the toughest engineering entrance exam. Advanced level problems with detailed solutions.",
    icon: GraduationCap,
    href: "/exams/jee/advanced/pyq/with-solutions",
    color: "#9333ea",
    bgGradient: "from-purple-500/20 to-violet-500/10",
    features: ["Physics", "Chemistry", "Mathematics"],
    category: "jee-advanced",
  },
  {
    id: "neet",
    title: "NEET",
    subtitle: "National Eligibility cum Entrance Test",
    description:
      "India's largest medical entrance exam. Complete preparation for MBBS and BDS admissions.",
    icon: Stethoscope,
    href: "/exams/neet/pyq/with-solutions",
    color: "#dc2626",
    bgGradient: "from-red-500/20 to-rose-500/10",
    features: ["Physics", "Chemistry", "Biology"],
    category: "neet",
  },
  {
    id: "wbjee",
    title: "WBJEE",
    subtitle: "West Bengal Joint Entrance Examination",
    description:
      "State-level engineering entrance for West Bengal colleges. Focused preparation resources.",
    icon: Building2,
    href: "/exams/wbjee/pyq/with-solutions",
    color: "#059669",
    bgGradient: "from-emerald-500/20 to-green-500/10",
    features: ["Physics", "Chemistry", "Mathematics"],
    category: "wbjee",
  },
];

export default function ExamsPage() {
  const [paperCounts, setPaperCounts] = useState<Record<string, number>>({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const update = () => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchAllPapers = async () => {
      try {
        const categories = ["jee-main", "jee-advanced", "neet", "wbjee"];
        const counts: Record<string, number> = {};

        for (const category of categories) {
          const papers = await getPapers({ category });
          counts[category] = papers.length;
        }

        setPaperCounts(counts);
      } catch (error) {
        logger.error("Failed to fetch paper counts", error);
      }
    };

    fetchAllPapers();
  }, []);

  return (
    <>
      <Navbar />

      <PageHero
        title="Exam Preparation"
        subtitle="All Exams"
        description="Comprehensive preparation resources for India's top competitive exams. Access PYQs, mock tests, and expert guidance."
        badge="Choose Your Exam"
        showCTA={false}
      />

      {/* Exam Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {examCategories.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={exam.href} className="block group">
                  <div
                    className={`relative rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                      darkMode
                        ? "bg-gray-900/80 border-gray-800 hover:border-gray-700"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    style={{
                      boxShadow: `0 0 0 0 ${exam.color}00`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 25px 50px -12px ${exam.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 0 ${exam.color}00`;
                    }}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${exam.bgGradient} opacity-50`}
                    />

                    {/* Content */}
                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${exam.color}15` }}
                        >
                          <exam.icon
                            style={{ color: exam.color }}
                            className="w-8 h-8"
                          />
                        </div>

                        {paperCounts[exam.category] > 0 && (
                          <div
                            className="px-4 py-2 rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: exam.color }}
                          >
                            {paperCounts[exam.category]} Papers
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <div className="mb-4">
                        <h3
                          className={`text-2xl font-bold mb-1 group-hover:text-[${exam.color}] transition-colors ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                          style={{
                            color: undefined,
                          }}
                        >
                          <span
                            className="group-hover:opacity-100"
                            style={{
                              color: exam.color,
                            }}
                          >
                            {exam.title}
                          </span>
                        </h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {exam.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p
                        className={`mb-6 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {exam.description}
                      </p>

                      {/* Subjects */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exam.features.map((feature) => (
                          <span
                            key={feature}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              darkMode
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div
                        className="flex items-center gap-2 font-semibold transition-colors"
                        style={{ color: exam.color }}
                      >
                        <span>Explore Resources</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900/50" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose{" "}
              <span className="text-[#2596be]">Aspiring Engineers?</span>
            </h2>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Everything you need to crack your dream exam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Previous Year Questions",
                description:
                  "Extensive collection of PYQs with detailed step-by-step solutions and video explanations.",
              },
              {
                icon: FileText,
                title: "Mock Test Series",
                description:
                  "AI-powered test series designed as per latest exam patterns with detailed performance analysis.",
              },
              {
                icon: Users,
                title: "Expert Guidance",
                description:
                  "Get mentored by top educators and IIT/AIIMS alumni. Live doubt-solving sessions available.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-8 rounded-2xl border ${
                  darkMode
                    ? "bg-gray-900/80 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-[#2596be]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#2596be]" />
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
