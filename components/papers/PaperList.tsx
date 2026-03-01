"use client";

import React, { useEffect, useState } from "react";
import { getPapers, Paper } from "@/services/papers";
import { logger } from "@/lib/logger";
import {
  ExternalLink,
  FileText,
  Youtube,
  Calendar,
  Download,
  PlayCircle,
  BookOpen,
  Sparkles,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PaperListProps {
  category: "jee-main" | "jee-advanced" | "wbjee" | "neet";
  accentColor?: string;
}

const categoryColors = {
  "jee-main": "#2596be",
  "jee-advanced": "#9333ea",
  wbjee: "#059669",
  neet: "#dc2626",
};

export default function PaperList({ category, accentColor }: PaperListProps) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const color = accentColor || categoryColors[category];

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
    const fetchPapers = async () => {
      try {
        const data = await getPapers({ category });
        setPapers(data);
      } catch (error) {
        logger.error("Failed to load papers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`h-[380px] rounded-2xl animate-pulse ${
              darkMode ? "bg-gray-800/50" : "bg-gray-200/50"
            }`}
          />
        ))}
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center py-20 rounded-3xl border-2 border-dashed ${
          darkMode
            ? "bg-gray-900/50 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${color}15` }}
        >
          <BookOpen style={{ color }} className="w-10 h-10" />
        </div>
        <h3
          className={`text-xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          No Papers Available Yet
        </h3>
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
          We&apos;re working on adding papers for this category. Check back
          soon!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {papers.map((paper, index) => (
        <motion.div
          key={paper._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onMouseEnter={() => setHoveredId(paper._id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
            darkMode
              ? "bg-gray-900/80 border border-gray-800"
              : "bg-white border border-gray-100"
          } ${
            hoveredId === paper._id
              ? "shadow-2xl -translate-y-2"
              : "shadow-lg hover:shadow-xl"
          }`}
          style={{
            boxShadow:
              hoveredId === paper._id
                ? `0 25px 50px -12px ${color}25`
                : undefined,
          }}
        >
          {/* Top Accent Line */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
            style={{
              background:
                hoveredId === paper._id
                  ? `linear-gradient(90deg, ${color}, ${color}80)`
                  : "transparent",
            }}
          />

          {/* Thumbnail */}
          <div className="relative h-52 w-full overflow-hidden">
            {paper.thumbnailUrl ? (
              <>
                <Image
                  src={paper.thumbnailUrl}
                  alt={paper.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, ${
                      darkMode ? "rgba(17,24,39,0.9)" : "rgba(255,255,255,0.3)"
                    } 0%, transparent 50%)`,
                  }}
                />
              </>
            ) : (
              <div
                className={`flex flex-col items-center justify-center h-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <FileText style={{ color }} className="w-8 h-8" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {paper.year} Paper
                </span>
              </div>
            )}

            {/* Year Badge */}
            <div
              className="absolute top-4 right-4 px-4 py-2 rounded-xl backdrop-blur-md font-bold text-white text-sm shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {paper.year}
              </div>
            </div>

            {/* Featured Badge (for latest papers) */}
            {paper.year >= 2024 && (
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg backdrop-blur-md text-xs font-bold flex items-center gap-1.5"
                style={{
                  background: darkMode
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(255,255,255,0.9)",
                  color: color,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Latest
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3
              className={`text-lg font-bold mb-3 line-clamp-2 transition-colors ${
                darkMode ? "text-white" : "text-gray-900"
              } ${hoveredId === paper._id ? "" : ""}`}
              style={{
                color: hoveredId === paper._id ? color : undefined,
              }}
            >
              {paper.title}
            </h3>

            {/* Paper Type Badge */}
            {paper.type && (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium mb-4 ${
                  darkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Clock className="w-3 h-3" />
                {paper.type}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {paper.paperDriveLink && (
                <Link
                  href={paper.paperDriveLink}
                  target="_blank"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Paper
                </Link>
              )}

              {paper.solutionDriveLink && (
                <Link
                  href={paper.solutionDriveLink}
                  target="_blank"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Solution
                </Link>
              )}
            </div>

            {/* Video Solution - Full Width */}
            {paper.videoSolutionLink && (
              <Link
                href={paper.videoSolutionLink}
                target="_blank"
                className={`mt-3 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-400 hover:from-red-500/20 hover:to-orange-500/20"
                    : "bg-gradient-to-r from-red-50 to-orange-50 text-red-600 hover:from-red-100 hover:to-orange-100"
                }`}
              >
                <PlayCircle className="w-5 h-5" />
                Watch Video Solution
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
