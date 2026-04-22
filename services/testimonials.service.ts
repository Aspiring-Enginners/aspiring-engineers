import apiClient from "@/lib/api-client";
import { logger } from "@/lib/logger";

export interface PublicTestimonial {
  id: string;
  studentName: string;
  quote: string;
  achievementLine: string;
  institutionLine: string;
  rating: number;
  avatarUrl?: string | null;
}

interface TestimonialsPublicResponse {
  success: boolean;
  message: string;
  data: PublicTestimonial[];
}

export const testimonialsService = {
  getApprovedTestimonials: async (limit = 20): Promise<PublicTestimonial[]> => {
    try {
      logger.log("[testimonialsService] GET /testimonials", { limit });
      const response = await apiClient.get<TestimonialsPublicResponse>(
        "/testimonials",
        {
          params: { limit },
        },
      );

      if (!response.data?.success || !Array.isArray(response.data.data)) {
        return [];
      }

      return response.data.data;
    } catch (error) {
      // Testimonials are non-critical content on the page.
      logger.error("[testimonialsService] Failed to fetch testimonials:", error);
      return [];
    }
  },
};

export default testimonialsService;