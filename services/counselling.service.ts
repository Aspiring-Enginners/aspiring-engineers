import apiClient from "@/lib/api-client";
import { logger } from "@/lib/logger";
import {
  CounsellingPackage,
  CounsellingPackagesResponse,
  Counsellor,
  CounsellorsResponse,
  CounsellingInquiryPayload,
  AdmissionGuidancePayload,
  ExamType,
} from "@/types/counselling";

export interface GetPackagesParams {
  examType?: ExamType;
  isFeatured?: boolean;
}

export interface GetCounsellorsParams {
  examType?: ExamType;
  isFeatured?: boolean;
}

export const counsellingService = {
  /**
   * Get all active counselling packages
   * GET /counselling/packages?isActive=true
   */
  getPackages: async (
    params?: GetPackagesParams,
  ): Promise<CounsellingPackage[]> => {
    try {
      logger.log("[counsellingService] GET /counselling/packages", params);
      const response = await apiClient.get<
        CounsellingPackagesResponse | CounsellingPackage[]
      >("/counselling/packages", {
        params: {
          ...params,
          isActive: true,
          sort: "displayOrder",
        },
      });
      logger.log("[counsellingService] Response:", response.data);

      // Handle both { success, data } and direct array responses
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data.data || [];
    } catch (error) {
      logger.error("[counsellingService] Failed to fetch packages:", error);
      throw error;
    }
  },

  /**
   * Get packages for a specific exam type
   */
  getPackagesByExam: async (
    examType: ExamType,
  ): Promise<CounsellingPackage[]> => {
    return counsellingService.getPackages({ examType });
  },

  /**
   * Get a single package by slug
   * GET /counselling/packages/slug/:slug
   */
  getPackageBySlug: async (slug: string): Promise<CounsellingPackage> => {
    try {
      logger.log(`[counsellingService] GET /counselling/packages/slug/${slug}`);
      const response = await apiClient.get<{
        success: boolean;
        data: CounsellingPackage;
      }>(`/counselling/packages/slug/${slug}`);
      logger.log("[counsellingService] Response:", response.data);
      return (
        response.data.data || (response.data as unknown as CounsellingPackage)
      );
    } catch (error) {
      logger.error("[counsellingService] Failed to fetch package:", error);
      throw error;
    }
  },

  /**
   * Get all active counsellors
   * GET /counselling/counsellors?isActive=true
   */
  getCounsellors: async (
    params?: GetCounsellorsParams,
  ): Promise<Counsellor[]> => {
    try {
      logger.log("[counsellingService] GET /counselling/counsellors", params);
      const response = await apiClient.get<CounsellorsResponse | Counsellor[]>(
        "/counselling/counsellors",
        {
          params: {
            ...params,
            isActive: true,
            sort: "displayOrder",
          },
        },
      );
      logger.log("[counsellingService] Response:", response.data);

      // Handle both { success, data } and direct array responses
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data.data || [];
    } catch (error) {
      logger.error("[counsellingService] Failed to fetch counsellors:", error);
      throw error;
    }
  },

  /**
   * Get counsellors for a specific exam type
   */
  getCounsellorsByExam: async (examType: ExamType): Promise<Counsellor[]> => {
    return counsellingService.getCounsellors({ examType });
  },

  /**
   * Get featured counsellors
   */
  getFeaturedCounsellors: async (): Promise<Counsellor[]> => {
    return counsellingService.getCounsellors({ isFeatured: true });
  },

  /**
   * Submit a counselling inquiry (from admission guidance form)
   * POST /counselling/inquiries
   */
  submitInquiry: async (
    payload: CounsellingInquiryPayload,
  ): Promise<{ ticketNumber: string }> => {
    try {
      logger.log("[counsellingService] POST /counselling/inquiries", payload);
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: { ticketNumber: string };
      }>("/counselling/inquiries", payload);
      logger.log("[counsellingService] Response:", response.data);
      return response.data.data;
    } catch (error) {
      logger.error("[counsellingService] Failed to submit inquiry:", error);
      throw error;
    }
  },

  /**
   * Submit admission guidance request
   * POST /admission-guidance
   */
  submitAdmissionGuidance: async (
    payload: AdmissionGuidancePayload,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      logger.log("[counsellingService] POST /admission-guidance", payload);
      const response = await apiClient.post<{
        success: boolean;
        message: string;
      }>("/admission-guidance", payload);
      logger.log("[counsellingService] Response:", response.data);
      return response.data;
    } catch (error) {
      logger.error(
        "[counsellingService] Failed to submit admission guidance:",
        error,
      );
      throw error;
    }
  },

  /**
   * Get current user's enrollments
   * GET /counselling/enrollments/my
   */
  getMyEnrollments: async (): Promise<any[]> => {
    try {
      logger.log("[counsellingService] GET /counselling/enrollments/my");
      const response = await apiClient.get<{
        success: boolean;
        data: any[];
      }>("/counselling/enrollments/my");
      logger.log("[counsellingService] Response:", response.data);
      return response.data.data || response.data;
    } catch (error) {
      logger.error("[counsellingService] Failed to fetch enrollments:", error);
      throw error;
    }
  },

  /**
   * Book a session
   * POST /counselling/sessions
   */
  bookSession: async (payload: {
    enrollmentId: string;
    preferredDate: string;
    preferredTimeSlot: string;
    agenda: string;
    meetingPreference: string;
  }): Promise<any> => {
    try {
      logger.log("[counsellingService] POST /counselling/sessions", payload);
      const response = await apiClient.post<{
        success: boolean;
        data: any;
      }>("/counselling/sessions", payload);
      logger.log("[counsellingService] Response:", response.data);
      return response.data.data || response.data;
    } catch (error) {
      logger.error("[counsellingService] Failed to book session:", error);
      throw error;
    }
  },

  /**
   * Get user's sessions
   * GET /counselling/sessions/my
   */
  getMySessions: async (params?: {
    status?: string;
    upcoming?: boolean;
  }): Promise<any[]> => {
    try {
      logger.log("[counsellingService] GET /counselling/sessions/my", params);
      const response = await apiClient.get<{
        success: boolean;
        data: any[];
      }>("/counselling/sessions/my", { params });
      logger.log("[counsellingService] Response:", response.data);
      return response.data.data || response.data;
    } catch (error) {
      logger.error("[counsellingService] Failed to fetch sessions:", error);
      throw error;
    }
  },
};

export default counsellingService;
