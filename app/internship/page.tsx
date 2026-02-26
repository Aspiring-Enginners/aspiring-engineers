"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Laptop,
  Smartphone,
  Brain,
  Cloud,
  Database,
  Container,
} from "lucide-react";
import Link from "next/link";

const internships = [
  {
    name: "Web Development",
    icon: Laptop,
    description:
      "Master modern web technologies like React, Next.js, and Node.js. Build scalable applications.",
  },
  {
    name: "App Development",
    icon: Smartphone,
    description:
      "Create stunning mobile experiences for iOS and Android using React Native and Flutter.",
  },
  {
    name: "Machine Learning",
    icon: Brain,
    description:
      "Dive into AI, neural networks, and predictive modeling with Python and TensorFlow.",
  },
  {
    name: "Data Science",
    icon: Database,
    description:
      "Analyze complex data sets to drive decision making using statistical methods and tools.",
  },
  {
    name: "Cloud Computing",
    icon: Cloud,
    description:
      "Learn to deploy and manage scalable infrastructure on AWS, Azure, and Google Cloud.",
  },
  {
    name: "DevOps",
    icon: Container,
    description:
      "Streamline development and operations using tools like Docker, Kubernetes, and CI/CD pipelines.",
  },
];

import InternshipApplicationModal from "@/components/internship/InternshipApplicationModal";

export default function InternshipPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<string | null>(
    null,
  );

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
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* BACKGROUND BRAND GRADIENT */}
          <div
            className="
              absolute inset-0 pointer-events-none
              bg-linear-to-br from-[#2596be]/5 to-[#4EA8DE]/10
              blur-3xl opacity-60
            "
          ></div>

          <div className="relative max-w-7xl mx-auto text-center mb-16">
            <h1
              className={`
                text-5xl md:text-6xl font-extrabold mb-6 tracking-tight pb-2
                bg-clip-text text-transparent bg-gradient-to-r from-[#2596be] to-[#4EA8DE]
              `}
            >
              Industry Ready Internships
            </h1>

            <p
              className={`
                text-xl max-w-3xl mx-auto leading-relaxed
                ${darkMode ? "text-gray-400" : "text-gray-600"}
              `}
            >
              Bridge the gap between academic learning and industry
              requirements. Get hands-on experience by working on real-world
              projects.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {internships.map((internship, index) => {
              const Icon = internship.icon;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedInternship(internship.name)}
                  className={`
                    p-8 rounded-2xl backdrop-blur-2xl border 
                    cursor-pointer shadow-lg transition-all duration-300 group
                    hover:-translate-y-1
                    ${
                      darkMode
                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                        : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-xl"
                    }
                  `}
                >
                  {/* ICON BLOCK */}
                  <div
                    className="
                    w-16 h-16 mb-6 rounded-2xl 
                    bg-linear-to-br from-[#2596be] to-[#4EA8DE]
                    flex items-center justify-center shadow-lg
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                  "
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`
                      text-2xl font-bold mb-3 tracking-tight
                      ${darkMode ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {internship.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className={`
                      mb-6 leading-relaxed
                      ${darkMode ? "text-gray-400" : "text-gray-600"}
                    `}
                  >
                    {internship.description}
                  </p>

                  <div
                    className={`
                    font-semibold text-sm flex items-center gap-2
                     text-[#2596be] group-hover:translate-x-1 transition-transform
                  `}
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />

      {/* Application Modal */}
      <InternshipApplicationModal
        isOpen={!!selectedInternship}
        onClose={() => setSelectedInternship(null)}
        selectedInternship={selectedInternship || ""}
      />
    </>
  );
}
