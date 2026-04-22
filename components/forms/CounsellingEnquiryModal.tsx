"use client";

import { useState } from "react";
import { CheckCircle, Send, Users, X } from "lucide-react";
import { counsellingService } from "@/services/counselling.service";
import { logger } from "@/lib/logger";

interface CounsellingEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const counsellingOptions = [
  { value: "", label: "Select counselling type" },
  { value: "jee-main", label: "JEE Counselling" },
  { value: "jee-advanced", label: "JEE Advanced Counselling" },
  { value: "neet-ug", label: "NEET Counselling" },
  { value: "wbjee", label: "WBJEE Counselling" },
  { value: "other-state-exam", label: "Other Counselling" },
];

export default function CounsellingEnquiryModal({
  isOpen,
  onClose,
}: CounsellingEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    exam: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await counsellingService.submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        exam: formData.exam,
        message: formData.message || undefined,
        source: "counselling-page-other-cta",
      });

      setTicketNumber(response.ticketNumber);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setTicketNumber("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          exam: "",
          message: "",
        });
        onClose();
      }, 2500);
    } catch (error: any) {
      logger.error("Failed to submit counselling enquiry:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit enquiry. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-white dark:bg-gray-950 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close counselling enquiry modal"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-(--color-brand)/10 px-3 py-1.5 text-sm font-medium text-(--color-brand) mb-4">
              <Users className="h-4 w-4" />
              Counselling Enquiry
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tell us which counselling you need
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Share your details and our team will reach out with the right
              counselling guidance.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Enquiry Submitted
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {ticketNumber
                  ? `Your ticket number is ${ticketNumber}. Our team will contact you soon.`
                  : "Our team will contact you soon."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 outline-hidden transition-colors focus:bg-white focus:ring-2 focus:ring-(--color-brand) dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 outline-hidden transition-colors focus:bg-white focus:ring-2 focus:ring-(--color-brand) dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="Enter your phone no"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 outline-hidden transition-colors focus:bg-white focus:ring-2 focus:ring-(--color-brand) dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Counselling Type *
                  </label>
                  <select
                    name="exam"
                    required
                    value={formData.exam}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 outline-hidden transition-colors focus:bg-white focus:ring-2 focus:ring-(--color-brand) dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    {counsellingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  What do you need help with?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-hidden transition-colors focus:bg-white focus:ring-2 focus:ring-(--color-brand) dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Share your exam, rank, state, or any specific counselling questions"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--color-brand) px-6 py-3 font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
