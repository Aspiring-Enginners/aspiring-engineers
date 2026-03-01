"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import ContentCard from "@/components/ui/ContentCard";
import {
  BookOpen,
  Target,
  Users,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react";
import { getPapers, Paper } from "@/services/papers";
import Link from "next/link";
import { getExamTheme } from "@/lib/theme/examThemes";

const jeeFeatures = [
  {
    title: "Previous Year Questions",
    description:
      "Comprehensive collection of JEE Mains and Advanced PYQs with detailed solutions",
    icon: BookOpen,
    href: "/exams/jee/mains/pyq/with-solutions",
    badge: "2015-2024",
  },
  {
    title: "Test Series",
    description:
      "Full-length mock tests designed as per latest JEE pattern with AI-powered analysis",
    icon: Target,
    href: "/test-series",
    metadata: [
      { label: "Tests", value: "50+" },
      { label: "Questions", value: "3750+" },
    ],
  },
  {
    title: "Expert Guidance",
    description:
      "Live doubt-solving sessions and personalized mentorship from IIT alumni",
    icon: Users,
    href: "/contact",
    metadata: [{ label: "Success Rate", value: "95%" }],
  },
];

const theme = getExamTheme("jee-main");
const { accentColor, accentColorEnd } = theme;

export default function JEEPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await getPapers({ category: "jee-main" });
        // Get latest 4 papers sorted by year
        const sortedPapers = data.sort((a, b) => b.year - a.year).slice(0, 4);
        setPapers(sortedPapers);
      } catch (error) {
        console.error("Failed to load papers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return (
    <>
      <Navbar />

      <PageHero
        title="Joint Entrance Examination"
        subtitle="JEE"
        description="Comprehensive preparation platform for JEE Mains and Advanced with PYQs, test series, and expert guidance"
        badge="Most Popular"
        showCTA
        ctaText="Start Free Trial"
        ctaLink="/exams/jee/mains/pyq/with-solutions"
      />

      {/* Main Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorEnd})`,
              }}
            >
              Everything You Need for JEE
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Complete preparation resources trusted by thousands of students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jeeFeatures.map((feature, idx) => (
              <ContentCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Resources Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorEnd})`,
              }}
            >
              Start Practicing Now
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Access latest question papers and mock tests
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl animate-pulse bg-gray-200 dark:bg-gray-800"
                />
              ))}
            </div>
          ) : papers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {papers.map((paper) => (
                <div
                  key={paper._id}
                  className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Year Badge */}
                  <div
                    className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1.5"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {paper.year}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${accentColor}1A` }}
                    >
                      <FileText
                        className="w-6 h-6"
                        style={{ color: accentColor }}
                      />
                    </div>

                    <h3
                      className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 transition-colors"
                      style={{
                        // hover color applied via CSS custom property — fallback to current color
                      }}
                    >
                      {paper.title}
                    </h3>

                    {paper.type && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {paper.type}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-auto">
                      {paper.paperDriveLink && (
                        <Link
                          href={paper.paperDriveLink}
                          target="_blank"
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                          style={{
                            backgroundColor: `${accentColor}1A`,
                            color: accentColor,
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Paper
                        </Link>
                      )}
                      {paper.solutionDriveLink && (
                        <Link
                          href={paper.solutionDriveLink}
                          target="_blank"
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Solution
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No papers available yet. Check back soon!</p>
            </div>
          )}

          {/* View All Link */}
          {papers.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/exams/jee/mains/pyq/with-solutions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                View All Papers
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
