import apiClient from "@/lib/api-client";
import { logger } from "@/lib/logger";

/**
 * Team Member type returned from the API
 */
export interface TeamMember {
  _id: string;
  name: string;
  title: string;
  image: string;
  expertise: string[];
  displayOrder: number;
  isActive: boolean;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface GetTeamMembersParams {
  isActive?: boolean;
  sort?: string;
}

/**
 * Team Service
 *
 * Handles fetching team members for the public landing page.
 * Only public/read endpoints are needed for the main website.
 */
export const teamService = {
  /**
   * Get all active team members for display on the landing page
   * GET /team-members?isActive=true&sort=displayOrder
   * @returns TeamMember[] - Array of active team members sorted by displayOrder
   */
  getTeamMembers: async (
    params: GetTeamMembersParams = { isActive: true, sort: "displayOrder" },
  ): Promise<TeamMember[]> => {
    try {
      logger.log("[teamService] GET /team-members", params);
      const response = await apiClient.get<TeamMember[]>("/team-members", {
        params,
      });
      logger.log("[teamService] Response:", response.data);
      // API returns array directly
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      logger.error("[teamService] Failed to fetch team members:", error);
      throw error;
    }
  },

  /**
   * Get all active team members (convenience method for landing page)
   * @returns TeamMember[] - Array of active team members
   */
  getActiveTeamMembers: async (): Promise<TeamMember[]> => {
    return teamService.getTeamMembers({
      isActive: true,
      sort: "displayOrder",
    });
  },
};

export default teamService;
