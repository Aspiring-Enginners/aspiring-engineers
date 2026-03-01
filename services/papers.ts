import { logger } from "@/lib/logger";

export interface Paper {
  _id: string;
  category:
    | "jee-main"
    | "jee-advanced"
    | "wbjee"
    | "neet"
    | "boards-10"
    | "boards-12"
    | "sample-10"
    | "sample-12";
  year: number;
  title: string;
  type: string;
  subject?: string; // For boards: Physics, Chemistry, Mathematics, Biology, English, etc.
  board?: string; // CBSE, ICSE, WBCHSE, etc.
  thumbnailUrl?: string;
  paperDriveLink: string;
  solutionDriveLink?: string;
  videoSolutionLink?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PapersResponse {
  data: Paper[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Helper to build query string
const buildQueryString = (params: Record<string, any>) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      query.append(key, String(params[key]));
    }
  });
  return query.toString();
};

export const getPapers = async (params?: {
  category?: string;
  type?: string;
  board?: string;
  subject?: string;
  year?: number;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<Paper[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      logger.warn("NEXT_PUBLIC_API_URL is not defined");
      return [];
    }

    const queryString = params ? `?${buildQueryString(params)}` : "";
    const res = await fetch(`${apiUrl}/papers${queryString}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // Fallback for development if API is not fully ready or returns 404
      logger.warn(`API call failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const response = await res.json();
    // Support both direct array response or paginated { data: [] }
    return Array.isArray(response) ? response : response.data || [];
  } catch (error) {
    logger.error("Error fetching papers:", error);
    return [];
  }
};

// Get boards PYQ papers
export const getBoardsPyq = async (
  classLevel: "10" | "12",
  board?: string,
  subject?: string,
): Promise<Paper[]> => {
  const category = classLevel === "10" ? "boards-10" : "boards-12";
  return getPapers({ category, board, subject });
};

// Get sample papers
export const getSamplePapers = async (
  classLevel: "10" | "12",
  board?: string,
  subject?: string,
): Promise<Paper[]> => {
  const category = classLevel === "10" ? "sample-10" : "sample-12";
  return getPapers({ category, board, subject });
};

export const getPapersStats = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return null;

    const res = await fetch(`${apiUrl}/papers/stats`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    logger.error("Error fetching stats:", error);
    return null;
  }
};

// Compatibility export for existing code if it uses default export (checked: it doesn't seem to, but good to have)
export default {
  getPapers,
  getBoardsPyq,
  getSamplePapers,
  getPapersStats,
};
