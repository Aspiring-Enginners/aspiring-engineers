/**
 * Centralized logger utility.
 *
 * - Development: all levels log normally to the console.
 * - Production : only `error` is emitted; `log`, `warn`, and `debug` are no-ops.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.error("Something broke:", err);
 */

const isDev = process.env.NODE_ENV === "development";

const normalizeLogArg = (value: unknown): unknown => {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  if (
    value &&
    typeof value === "object" &&
    "isAxiosError" in value &&
    (value as { isAxiosError?: boolean }).isAxiosError
  ) {
    const axiosError = value as {
      message?: string;
      name?: string;
      stack?: string;
      code?: string;
      response?: {
        status?: number;
        data?: unknown;
      };
      config?: {
        url?: string;
        method?: string;
      };
    };

    return {
      name: axiosError.name,
      message: axiosError.message,
      code: axiosError.code,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      url: axiosError.config?.url,
      method: axiosError.config?.method,
      stack: axiosError.stack,
    };
  }

  return value;
};

/* eslint-disable no-console */
export const logger = {
  /**
   * Informational log — suppressed in production.
   * Never pass PII (emails, tokens, user-identifiers) as arguments.
   */
  log: (...args: unknown[]): void => {
    if (isDev) console.log(...args);
  },

  /**
   * Warning log — suppressed in production.
   */
  warn: (...args: unknown[]): void => {
    if (isDev) console.warn(...args);
  },

  /**
   * Debug log — suppressed in production.
   */
  debug: (...args: unknown[]): void => {
    if (isDev) console.debug(...args);
  },

  /**
   * Error log — always emitted, even in production.
   * Do NOT include PII (emails, tokens, user-identifiers) in messages or objects.
   */
  error: (...args: unknown[]): void => {
    console.error(...args.map(normalizeLogArg));
  },
} as const;
/* eslint-enable no-console */
