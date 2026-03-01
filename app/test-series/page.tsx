"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import apiClient from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { Package, PackagesResponse } from "@/types";
import Navbar from "@/components/layout/Navbar";
import {
  BookOpen,
  Clock,
  FileText,
  Star,
  Users,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

const EXAM_FILTERS = ["All", "JEE", "NEET", "WBJEE", "COMEDK"];

export default function TestSeriesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
    const fetchPackages = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();
        params.append("type", "test-series");
        params.append("status", "active");
        params.append("page", currentPage.toString());
        params.append("limit", "12");

        if (selectedExam !== "All") {
          params.append("examType", selectedExam);
        }

        if (searchQuery) {
          params.append("search", searchQuery);
        }

        const response = await apiClient.get<PackagesResponse>(
          `/packages?${params.toString()}`,
        );

        if (response.data.success) {
          setPackages(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
        }
      } catch (err: any) {
        setError("Failed to load test series. Please try again.");
        logger.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedExam, searchQuery, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Test Series
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Comprehensive test series for JEE, NEET, and other competitive
            exams. Practice with real exam patterns and detailed analysis.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search test series..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-colors ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#2596be]"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#2596be]"
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2596be] text-white font-semibold rounded-xl hover:bg-[#1e7ca0] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Exam filter tabs */}
          <div className="flex flex-wrap gap-2">
            {EXAM_FILTERS.map((exam) => (
              <button
                key={exam}
                onClick={() => {
                  setSelectedExam(exam);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedExam === exam
                    ? "bg-[#2596be] text-white"
                    : darkMode
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

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

        {/* Empty State */}
        {!loading && !error && packages.length === 0 && (
          <div
            className={`p-12 rounded-xl text-center ${
              darkMode ? "bg-white/5" : "bg-white"
            }`}
          >
            <BookOpen
              className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`}
            />
            <h3
              className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              No test series found
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}

        {/* Package Grid */}
        {!loading && !error && packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <TestSeriesCard key={pkg._id} package={pkg} darkMode={darkMode} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#2596be]/10"
              } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#2596be] text-white"
                    : darkMode
                      ? "text-gray-400 hover:bg-white/10"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#2596be]/10"
              } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper to format exam types (e.g., "JEE_MAIN" -> "JEE Main")
function formatExamType(exam: string): string {
  if (!exam) return "";

  // Handle specific known cases
  const knownCases: Record<string, string> = {
    JEE_MAIN: "JEE Main",
    JEE_ADVANCED: "JEE Advanced",
    NEET: "NEET",
    WBJEE: "WBJEE",
    BITSAT: "BITSAT",
    COMEDK: "COMEDK",
  };

  if (knownCases[exam.toUpperCase()]) {
    return knownCases[exam.toUpperCase()];
  }

  // Generic fallback: replace underscores and title case
  return exam
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Test Series Card Component
function TestSeriesCard({
  package: pkg,
  darkMode,
}: {
  package: Package;
  darkMode: boolean;
}) {
  const discountPercent = pkg.discountPrice
    ? Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100)
    : 0;

  const imageUrl = pkg.banner || pkg.thumbnail;

  return (
    <div
      className={`group rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
        darkMode
          ? "bg-white/5 border-white/10 hover:border-[#2596be]/50"
          : "bg-white border-gray-200 hover:border-[#2596be]"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              darkMode
                ? "bg-gradient-to-br from-[#2596be]/20 to-[#4EA8DE]/20"
                : "bg-gradient-to-br from-[#2596be]/10 to-[#4EA8DE]/10"
            }`}
          >
            <BookOpen
              className={`w-16 h-16 ${darkMode ? "text-[#2596be]" : "text-[#2596be]/60"}`}
            />
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            {discountPercent}% OFF
          </div>
        )}

        {/* Exam Type Badges */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {pkg.examTypes.slice(0, 3).map((exam, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold rounded-md shadow-sm"
            >
              {formatExamType(exam)}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className={`text-lg font-bold mb-2 line-clamp-2 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {pkg.title}
        </h3>

        <p
          className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {pkg.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div
            className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}
          >
            <FileText className="w-4 h-4" />
            <span>{pkg.totalTests} Tests</span>
          </div>
          <div
            className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}
          >
            <Clock className="w-4 h-4" />
            <span>{pkg.validityDays}d</span>
          </div>
          <div
            className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}
          >
            <Users className="w-4 h-4" />
            <span>{pkg.enrollments ?? pkg.metadata?.totalStudents ?? 0}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="mb-4 space-y-1">
          {pkg.features.slice(0, 3).map((feature, idx) => (
            <li
              key={idx}
              className={`text-xs flex items-start gap-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              <span className="text-[#2596be] mt-0.5">✓</span>
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200/20">
          <div>
            {pkg.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  ₹{pkg.discountPrice.toLocaleString()}
                </span>
                <span
                  className={`text-sm line-through ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  ₹{pkg.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span
                className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                ₹{pkg.price.toLocaleString()}
              </span>
            )}
          </div>

          <Link
            href={`/test-series/${pkg._id}`}
            className="flex items-center gap-1 px-4 py-2 bg-[#2596be] text-white text-sm font-semibold rounded-lg hover:bg-[#1e7ca0] transition-colors"
          >
            View <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
