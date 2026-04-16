"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle,
  Users,
  FileText,
  Target,
  Award,
  BookOpen,
  Send,
  Phone,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { counsellingService } from "@/services/counselling.service";
import { logger } from "@/lib/logger";

const guidanceServices = [
  {
    title: "College Selection Strategy",
    description:
      "Get personalized recommendations based on your rank, category, preferences, and career goals.",
    icon: Target,
  },
  {
    title: "Cutoff Analysis",
    description:
      "Detailed analysis of previous years' cutoffs to help you set realistic expectations.",
    icon: Award,
  },
  {
    title: "Branch Selection",
    description:
      "Expert advice on choosing the right engineering/medical branch for your career aspirations.",
    icon: BookOpen,
  },
  {
    title: "Document Preparation",
    description:
      "Complete checklist and guidance for all required documents during counselling.",
    icon: FileText,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Fill the Form",
    description: "Share your details and exam scores with us",
  },
  {
    step: "02",
    title: "Get a Call",
    description: "Our expert counsellor will contact you within 24 hours",
  },
  {
    step: "03",
    title: "Discuss Options",
    description: "Review college options based on your rank and preferences",
  },
  {
    step: "04",
    title: "Get Guidance",
    description:
      "Receive step-by-step assistance throughout the admission process",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    rank: "JEE Main AIR 5,432",
    college: "NIT Trichy - CSE",
    quote:
      "The counselling team helped me understand the choice filling process. I got CSE at NIT Trichy with their guidance!",
  },
  {
    name: "Priya Patel",
    rank: "NEET Score 650",
    college: "GMC Mumbai",
    quote:
      "I was confused between multiple medical colleges. Their expert advice helped me make the right decision.",
  },
  {
    name: "Amit Das",
    rank: "WBJEE Rank 1,200",
    college: "Jadavpur University - EE",
    quote:
      "Thanks to their WBJEE counselling, I secured a seat in my dream college. Highly recommended!",
  },
];

const examOptions = [
  { value: "", label: "Select Exam" },
  { value: "jee-main", label: "JEE Main" },
  { value: "jee-advanced", label: "JEE Advanced" },
  { value: "neet-ug", label: "NEET UG" },
  { value: "wbjee", label: "WBJEE" },
  { value: "other-state-exam", label: "Other State Exam" },
];

const categoryOptions = [
  { value: "", label: "Select Category" },
  { value: "general", label: "General" },
  { value: "obc-ncl", label: "OBC-NCL" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "ews", label: "EWS" },
  { value: "pwd", label: "PwD" },
];

export default function AdmissionGuidancePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    exam: "",
    rankScore: "",
    category: "",
    class12Status: "appearing",
    tenthPercentage: "",
    twelfthPercentageExpected: "",
    homeState: "",
    collegeChoice: "",
    additionalMessage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await counsellingService.submitAdmissionGuidance({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        exam: formData.exam as
          | "jee-main"
          | "jee-advanced"
          | "neet-ug"
          | "wbjee"
          | "other-state-exam",
        rankScore: formData.rankScore || undefined,
        category: formData.category as
          | "general"
          | "obc-ncl"
          | "sc"
          | "st"
          | "ews"
          | "pwd",
        homeState: formData.homeState,
        class12Status: formData.class12Status as "appearing" | "passed",
        tenthPercentage: formData.tenthPercentage,
        twelfthPercentageExpected:
          formData.twelfthPercentageExpected || undefined,
        collegeChoice: formData.collegeChoice,
        additionalMessage: formData.additionalMessage || undefined,
      });

      setSubmitted(true);

      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          exam: "",
          rankScore: "",
          category: "",
          class12Status: "appearing",
          tenthPercentage: "",
          twelfthPercentageExpected: "",
          homeState: "",
          collegeChoice: "",
          additionalMessage: "",
        });
        setSubmitted(false);
      }, 5000);
    } catch (error: any) {
      logger.error("Failed to submit admission guidance:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit form. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />

      {/* Compact Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3">
          <CheckCircle className="w-4 h-4" />
          Free Consultation Available
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-linear-to-r from-[var(--color-brand)] to-[var(--color-brand-light)] bg-clip-text text-transparent">
            Expert Admission Guidance
          </span>
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Get personalized guidance for college admissions. Our expert
          counsellors help you navigate the complex admission process and secure
          your dream seat.
        </p>
      </div>

      {/* Main Content Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-[var(--color-brand)] to-[var(--color-brand-light)] bg-clip-text text-transparent">
                Why Choose Our Guidance?
              </h2>

              <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                Navigating the admission process can be overwhelming. With
                multiple counselling rounds, complex choice filling, and tight
                deadlines, students often miss out on better opportunities. Our
                expert team ensures you make informed decisions at every step.
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {guidanceServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center mb-2">
                      <service.icon className="w-4 h-4 text-[var(--color-brand)]" />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-brand)]">
                    1,000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Students Guided
                  </div>
                </div>
                <div className="text-center border-x border-gray-200 dark:border-white/10">
                  <div className="text-2xl font-bold text-[var(--color-brand)]">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-brand)]">
                    100+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Partner Colleges
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand)] flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Need immediate help? Call us now
                  </p>
                  <a
                    href="tel:+919002912888"
                    className="text-lg font-bold text-[var(--color-brand)] hover:underline"
                  >
                    +91 9002912888
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="sticky top-24 p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[var(--color-brand)] to-[var(--color-brand-accent)] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Get Free Guidance
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fill the form & we'll contact you
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Request Submitted!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our counsellor will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                          placeholder="Enter your phone no"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="exam"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Exam *
                        </label>
                        <select
                          id="exam"
                          name="exam"
                          required
                          value={formData.exam}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                        >
                          {examOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="rankScore"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Rank / Score (Optional)
                        </label>
                        <input
                          type="text"
                          id="rankScore"
                          name="rankScore"
                          value={formData.rankScore}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                          placeholder="e.g., 5000 or 650"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                        >
                          {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="homeState"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Home State *
                        </label>
                        <input
                          type="text"
                          id="homeState"
                          name="homeState"
                          required
                          value={formData.homeState}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                          placeholder="e.g., West Bengal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Class 12th Status *
                      </label>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="class12Status"
                            value="appearing"
                            checked={formData.class12Status === "appearing"}
                            onChange={handleChange}
                            className="form-radio text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">
                            Appearing
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="class12Status"
                            value="passed"
                            checked={formData.class12Status === "passed"}
                            onChange={handleChange}
                            className="form-radio text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">
                            Passed
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="tenthPercentage"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          10th Percentage *
                        </label>
                        <input
                          type="text"
                          id="tenthPercentage"
                          name="tenthPercentage"
                          required
                          value={formData.tenthPercentage}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                          placeholder="e.g., 85%"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="twelfthPercentageExpected"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          12th Percentage{" "}
                          {formData.class12Status === "appearing"
                            ? "(Expected)"
                            : "*"}
                        </label>
                        <input
                          type="text"
                          id="twelfthPercentageExpected"
                          name="twelfthPercentageExpected"
                          required={formData.class12Status === "passed"}
                          value={formData.twelfthPercentageExpected}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                          placeholder="e.g., 80%"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="collegeChoice"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Preferred College / Institute{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="collegeChoice"
                        name="collegeChoice"
                        required
                        value={formData.collegeChoice}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                        placeholder="e.g., IIT Bombay, AIIMS Delhi"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="additionalMessage"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Additional Message (Optional)
                      </label>
                      <textarea
                        id="additionalMessage"
                        name="additionalMessage"
                        value={formData.additionalMessage}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent resize-none"
                        placeholder="Any specific queries or preferences?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-brand)] text-white rounded-lg font-semibold hover:bg-[var(--color-brand-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Free Guidance
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      By submitting, you agree to receive calls/messages from
                      our team.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-linear-to-r from-[var(--color-brand)] to-[var(--color-brand-light)] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Simple 4-step process to get personalized admission guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processSteps.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 text-center">
                  <div className="text-3xl font-bold text-[var(--color-brand)]/20 mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[var(--color-brand)]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-linear-to-r from-[var(--color-brand)] to-[var(--color-brand-light)] bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Hear from students who secured their dream colleges with our
              guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[var(--color-brand)]">
                    {testimonial.rank}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.college}
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
          <div className="p-6 md:p-8 rounded-2xl bg-linear-to-br from-[var(--color-brand)] to-[var(--color-brand-accent)] text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Explore Colleges
            </h2>
            <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Browse our comprehensive database of engineering and medical
              colleges with cutoff trends, placements, and detailed information.
            </p>
            <Link
              href="/counselling/college-list"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-[var(--color-brand)] hover:bg-gray-100 transition-colors"
            >
              View College List
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
