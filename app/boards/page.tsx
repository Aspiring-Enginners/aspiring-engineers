"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  FileText,
  ChevronRight,
  BookOpen,
  Award,
  Compass,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CLASSES = [
  {
    id: "10",
    title: "Class 10",
    description: "Board exam preparation resources for Class 10 students",
    icon: BookOpen,
    color: "var(--color-brand)",
    links: [
      { label: "Previous Year Papers", href: "/boards/10/pyq", count: "50+" },
      {
        label: "Sample Papers",
        href: "/boards/10/sample-papers",
        count: "25+",
      },
    ],
  },
  {
    id: "12",
    title: "Class 12",
    description: "Board exam preparation resources for Class 12 students",
    icon: Award,
    color: "#8B5CF6",
    links: [
      { label: "Previous Year Papers", href: "/boards/12/pyq", count: "80+" },
      {
        label: "Sample Papers",
        href: "/boards/12/sample-papers",
        count: "40+",
      },
    ],
  },
];

const CAREER_OPTIONS_10 = [
  {
    id: "science",
    title: "Career Options after 10th",
    description: "Explore subject streams and future pathways",
    icon: GraduationCap,
    color: "#10B981",
    href: "/careers/Intermediate",
  },
  {
    id: "commerce",
    title: "Career Options after 12th",
    description: "Courses and careers aligned with your goals",
    icon: Briefcase,
    color: "#3B82F6",
    href: "/careers/Matriculation",
  },
];

const BOARDS_INFO = [
  { name: "CBSE", description: "Central Board of Secondary Education" },
  {
    name: "ICSE/ISC",
    description: "Indian Certificate of Secondary Education",
  },
  {
    name: "WBCHSE",
    description: "West Bengal Council of Higher Secondary Education",
  },
  { name: "State Boards", description: "Various State Board Papers" },
];

export default function BoardsPage() {
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

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand) 0%, transparent 50%, #8B5CF630 100%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 text-sm mb-8"
          >
            <Link
              href="/"
              className={`hover:underline ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Home
            </Link>
            <ChevronRight
              className={`w-4 h-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
            />
            <span className="text-[var(--color-brand)] font-medium">Boards</span>
          </motion.nav>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand)]/20 mb-4">
              <GraduationCap className="w-4 h-4 text-[var(--color-brand)]" />
              <span className="text-sm font-medium text-[var(--color-brand)]">
                Board Exam Resources
              </span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Board Exam Preparation
            </h1>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Access previous year papers and sample papers for CBSE, ICSE, and
              other board exams. Comprehensive resources for Class 10 and Class
              12.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Class Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {CLASSES.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden border ${
                  darkMode
                    ? "bg-gray-900/50 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Header */}
                <div
                  className="p-6 pb-4"
                  style={{
                    background: `linear-gradient(135deg, ${classItem.color}20, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${classItem.color}20` }}
                    >
                      <classItem.icon
                        className="w-7 h-7"
                        style={{ color: classItem.color }}
                      />
                    </div>
                    <div>
                      <h2
                        className={`text-2xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {classItem.title}
                      </h2>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {classItem.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="p-6 pt-2 space-y-3">
                  {classItem.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        darkMode
                          ? "border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText
                          className="w-5 h-5"
                          style={{ color: classItem.color }}
                        />
                        <span
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            darkMode
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {link.count}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 ${
                            darkMode ? "text-gray-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Options after 10th */}
      <section className="py-12 border-t" style={{ borderColor: "rgba(107, 114, 128, 0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {CAREER_OPTIONS_10.map((career, index) => (
              <Link key={career.id} href={career.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-lg cursor-pointer h-full ${
                    darkMode
                      ? "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Header */}
                  <div
                    className="p-6 pb-4"
                    style={{
                      background: `linear-gradient(135deg, ${career.color}20, transparent)`,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${career.color}20` }}
                      >
                        <career.icon
                          className="w-7 h-7"
                          style={{ color: career.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <h2
                          className={`text-2xl font-bold mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                          style={{ color: career.color }}
                        >
                          {career.title}
                        </h2>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {career.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Text */}
                  <div className="p-6 flex items-center justify-between border-t" style={{ borderColor: "rgba(107, 114, 128, 0.2)" }}>
                    <span
                      className="text-sm font-semibold transition-all flex items-center gap-2"
                      style={{ color: career.color }}
                    >
                      Explore All Options
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Boards Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Supported Boards
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {BOARDS_INFO.map((board, index) => (
                <motion.div
                  key={board.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-xl border text-center ${
                    darkMode
                      ? "bg-gray-900/50 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3
                    className={`font-semibold mb-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {board.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    {board.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
