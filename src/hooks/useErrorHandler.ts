/**
 * Custom hook for error handling in components
 * Following the development methodology for robust error handling
 */

import { useCallback } from "react";
import toast from "react-hot-toast";
import { logError, getErrorMessage, isAppError } from "@/lib/errors";
import type { ErrorContext } from "@/lib/types";

interface UseErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  context?: ErrorContext;
}

/**
 * Hook for handling errors in components with toast notifications and logging
 */
export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const {
    showToast = true,
    logError: shouldLog = true,
    context = {},
  } = options;

  const handleError = useCallback(
    (error: unknown, additionalContext?: ErrorContext) => {
      const errorContext = { ...context, ...additionalContext };

      // Log error if enabled
      if (shouldLog) {
        logError(error, errorContext);
      }

      // Show toast notification if enabled
      if (showToast) {
        const message = getErrorMessage(error);
        const title = isAppError(error) ? "Error" : "Something went wrong";
        toast.error(`${title}: ${message}`);
      }
    },
    [showToast, shouldLog, context]
  );

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      fallback?: T,
      additionalContext?: ErrorContext
    ): Promise<T | undefined> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, additionalContext);
        return fallback;
      }
    },
    [handleError]
  );

  return {
    handleError,
    handleAsyncError,
  };
}

/**
 * Hook for form-specific error handling
 */
export function useFormErrorHandler() {
  const { handleError } = useErrorHandler({
    context: { component: "form" },
    showToast: true,
  });

  const handleFormError = useCallback(
    (error: unknown, formData?: Record<string, unknown>) => {
      handleError(error, { formData });
    },
    [handleError]
  );

  return {
    handleFormError,
  };
}

/**
 * Hook for API-specific error handling
 */
export function useAPIErrorHandler() {
  const { handleError } = useErrorHandler({
    context: { component: "api" },
    showToast: true,
  });

  const handleAPIError = useCallback(
    (
      error: unknown,
      endpoint?: string,
      method?: string,
      requestData?: Record<string, unknown>
    ) => {
      handleError(error, { endpoint, method, requestData });
    },
    [handleError]
  );

  return {
    handleAPIError,
  };
}
