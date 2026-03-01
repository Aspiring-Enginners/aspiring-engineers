import apiClient, { handleApiError } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import {
  CashfreeOrderRequest,
  CashfreeOrderResponse,
  CashfreeVerifyRequest,
  CashfreeVerifyResponse,
  PurchasedContentResponse,
} from "@/types";

/**
 * Payment Service
 *
 * Handles all payment-related API calls with Cashfree integration
 */

export const paymentService = {
  /**
   * Create a Cashfree payment order
   * POST /payments/cashfree-sdk/create-order
   * Requires authentication
   */
  createOrder: async (
    data: CashfreeOrderRequest,
  ): Promise<CashfreeOrderResponse> => {
    try {
      const response = await apiClient.post<CashfreeOrderResponse>(
        "/payments/cashfree-sdk/create-order",
        data,
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Verify a Cashfree payment
   * POST /payments/cashfree-sdk/verify
   * Requires authentication
   */
  verifyPayment: async (
    data: CashfreeVerifyRequest,
  ): Promise<CashfreeVerifyResponse> => {
    try {
      const response = await apiClient.post<CashfreeVerifyResponse>(
        "/payments/cashfree-sdk/verify",
        data,
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Get all purchased content for the authenticated user
   * GET /payments/purchased/content
   * Requires authentication
   */
  getPurchasedContent: async (): Promise<PurchasedContentResponse> => {
    try {
      const response = await apiClient.get<PurchasedContentResponse>(
        "/payments/purchased/content",
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  /**
   * Check if user has access to a specific package
   * GET /payments/access/package/:productId
   * Requires authentication
   */
  checkAccess: async (productId: string): Promise<boolean> => {
    try {
      const response = await apiClient.get<{
        success: boolean;
        hasAccess: boolean;
      }>(`/payments/access/package/${productId}`);
      return response.data.hasAccess ?? response.data.success;
    } catch (error) {
      // If error (e.g., 401 unauthorized), user doesn't have access
      logger.error("Access check error:", error);
      return false;
    }
  },
};

export default paymentService;
