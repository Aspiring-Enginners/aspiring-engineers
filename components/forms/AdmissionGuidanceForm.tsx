"use client";

import { useState } from "react";
import { GraduationCap, CheckCircle, Send } from "lucide-react";
import { counsellingService } from "@/services/counselling.service";
import { logger } from "@/lib/logger";

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

interface AdmissionGuidanceFormProps {
  prefilledCollege?: string;
}

export default function AdmissionGuidanceForm({
  prefilledCollege,
}: AdmissionGuidanceFormProps) {
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
    collegeChoice: prefilledCollege || "",
    additionalMessage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await counsellingService.submitAdmissionGuidance({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        exam: formData.exam as any,
        rankScore: formData.rankScore || undefined,
        category: formData.category as any,
        homeState: formData.homeState,
        class12Status: formData.class12Status as any,
        tenthPercentage: formData.tenthPercentage,
        twelfthPercentageExpected:
          formData.twelfthPercentageExpected || undefined,
        collegeChoice: formData.collegeChoice,
        additionalMessage: formData.additionalMessage || undefined,
      });

      setSubmitted(true);

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
          collegeChoice: prefilledCollege || "",
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
    <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-accent)] flex items-center justify-center">
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
                placeholder="Enter your phone no"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Exam *
              </label>
              <select
                name="exam"
                required
                value={formData.exam}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
              >
                {examOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rank / Score
              </label>
              <input
                type="text"
                name="rankScore"
                value={formData.rankScore}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Home State *
              </label>
              <input
                type="text"
                name="homeState"
                required
                value={formData.homeState}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
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
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
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
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Passed
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                10th Percentage *
              </label>
              <input
                type="text"
                name="tenthPercentage"
                required
                value={formData.tenthPercentage}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
                placeholder="e.g., 85%"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                12th Percentage{" "}
                {formData.class12Status === "appearing" ? "(Expected)" : "*"}
              </label>
              <input
                type="text"
                name="twelfthPercentageExpected"
                required={formData.class12Status === "passed"}
                value={formData.twelfthPercentageExpected}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:bg-white text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors"
                placeholder="e.g., 80%"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred College / Institute *
            </label>
            <input
              type="text"
              name="collegeChoice"
              required
              readOnly={!!prefilledCollege}
              value={formData.collegeChoice}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-colors ${prefilledCollege ? "opacity-80 cursor-not-allowed" : "focus:bg-white"}`}
              placeholder="e.g., IIT Bombay, AIIMS Delhi"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-accent)] text-white rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get Free Admission Guidance
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
