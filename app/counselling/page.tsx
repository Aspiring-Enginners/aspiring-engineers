"use client";

import { useState } from "react";
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
  Star,
  MessageCircleQuestion,
} from "lucide-react";
import CounsellingEnquiryModal from "@/components/forms/CounsellingEnquiryModal";

const counsellingTypes = [
  {
    id: "jee",
    title: "JEE Counselling",
    subtitle: "IITs, NITs, IIITs & GFTIs",
    description:
      "Complete guidance for JoSAA, CSAB, and state counselling processes. Get expert advice on college and branch selection.",
    icon: GraduationCap,
    href: "/counselling/jee",
    features: [
      "JoSAA Choice Filling",
      "CSAB Special Round",
      "State Quota Counselling",
      "Branch Prediction",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "neet",
    title: "NEET Counselling",
    subtitle: "MBBS, BDS & AYUSH",
    description:
      "Navigate MCC counselling, state quotas, and deemed universities. Secure your seat in top medical colleges.",
    icon: Building2,
    href: "/counselling/neet",
    features: [
      "MCC AIQ Counselling",
      "State Medical Counselling",
      "Deemed Universities",
      "College Comparison",
    ],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "wbjee",
    title: "WBJEE Counselling",
    subtitle: "West Bengal Engineering",
    description:
      "Expert guidance for WBJEE seat allotment, college preferences, and document verification process.",
    icon: FileCheck,
    href: "/counselling/wbjee",
    features: [
      "WBJEEB Choice Filling",
      "College Preference List",
      "Seat Allotment Guidance",
      "Document Verification",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

const stats = [
  { value: "1000+", label: "Students Counselled" },
  { value: "100+", label: "Partner Colleges" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const whyChooseUs = [
  {
    title: "Expert Counsellors",
    description:
      "Our team comprises IIT/NIT alumni and experienced education consultants with 10+ years of counselling experience.",
  },
  {
    title: "Data-Driven Insights",
    description:
      "We use historical cutoff data and AI-powered predictions to provide accurate college recommendations.",
  },
  {
    title: "End-to-End Support",
    description:
      "From choice filling to document verification and seat confirmation, we guide you through every step.",
  },
  {
    title: "Personalized Approach",
    description:
      "Every student is unique. We consider your rank, preferences, and career goals for tailored guidance.",
  },
];

export default function CounsellingPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Compact Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3">
          <CheckCircle className="w-4 h-4" />
          Trusted by 1000+ Students
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-linear-to-r from-(--color-brand) to-(--color-brand-light) bg-clip-text text-transparent">
            Expert College Counselling
          </span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
          Navigate the complex admission process with confidence. Our expert
          counsellors help you secure seats in top engineering and medical
          colleges.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold bg-(--color-brand) text-white hover:bg-(--color-brand-hover) transition-colors text-sm"
        >
          Book Free Consultation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Counselling Types Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-linear-to-r from-(--color-brand) to-(--color-brand-light) bg-clip-text text-transparent">
              Choose Your Counselling Path
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select the exam-specific counselling service that matches your
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counsellingTypes.map((type) => (
              <Link
                key={type.id}
                href={type.href}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 hover:shadow-2xl hover:shadow-(--color-brand)/20 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-linear-to-r ${type.color}`} />

                <div className="p-5">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${type.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <type.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-(--color-brand) transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-sm text-(--color-brand) font-medium mb-2">
                    {type.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 mb-4">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-(--color-brand) font-semibold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-linear-to-br from-(--color-brand)/10 via-white to-(--color-brand-accent)/10 dark:from-white/5 dark:via-white/0 dark:to-white/5 p-6 sm:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-white/10 px-3 py-1.5 text-sm font-medium text-(--color-brand) mb-3">
                    <MessageCircleQuestion className="w-4 h-4" />
                    Need something else?
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Don't see your counselling listed?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Tell us which counselling you need and our team will help
                    you with the right guidance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-brand) px-6 py-3 font-semibold text-white transition-colors hover:bg-(--color-brand-hover)"
                >
                  Enquire Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-(--color-brand) to-(--color-brand-light) bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-linear-to-r from-(--color-brand) to-(--color-brand-light) bg-clip-text text-transparent">
              Why Choose Our Counselling?
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We've helped thousands of students make informed decisions about
              their future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-(--color-brand)/10 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-(--color-brand)" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
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
          <div className="p-6 md:p-8 rounded-2xl bg-linear-to-br from-(--color-brand) to-(--color-brand-accent) text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Secure Your Dream College?
            </h2>
            <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Don't leave your future to chance. Get expert guidance from our
              experienced counsellors and make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-(--color-brand) hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5" />
                Book Free Consultation
              </Link>
              <Link
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                Call Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CounsellingEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />

      <Footer />
    </>
  );
}
