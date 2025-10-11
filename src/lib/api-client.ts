/**
 * API client with comprehensive error handling
 * Following the development methodology for robust error handling
 */

import { APIError, NetworkError, AuthError, NotFoundError, RateLimitError, logError } from './errors';
import type { ErrorContext, HttpStatus } from './types';

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  context?: ErrorContext;
}

interface APIResponse<T = unknown> {
  data: T;
  status: HttpStatus;
  statusText: string;
  headers: Headers;
}

/**
 * Enhanced fetch wrapper with error handling, retries, and timeout
 */
export async function apiRequest<T = unknown>(
  url: string,
  config: RequestConfig = {}
): Promise<APIResponse<T>> {
  const {
    timeout = 10000,
    retries = 3,
    retryDelay = 1000,
    ...fetchConfig
  } = config;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchConfig,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchConfig.headers,
        },
      });

      clearTimeout(timeoutId);

      // Handle different response status codes
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        switch (response.status) {
          case 401:
            throw new AuthError(
              errorData.message || 'Authentication required',
              { url, status: response.status, attempt }
            );
          case 403:
            throw new AuthError(
              errorData.message || 'Access denied',
              { url, status: response.status, attempt }
            );
          case 404:
            throw new NotFoundError(
              errorData.message || 'Resource not found',
              { url, status: response.status, attempt }
            );
          case 429:
            const retryAfter = response.headers.get('Retry-After');
            throw new RateLimitError(
              errorData.message || 'Rate limit exceeded',
              retryAfter ? parseInt(retryAfter) : undefined,
              { url, status: response.status, attempt }
            );
          default:
            throw new APIError(
              errorData.message || `Request failed with status ${response.status}`,
              response.status,
              url,
              fetchConfig.method || 'GET',
              { ...errorData, attempt }
            );
        }
      }

      const data = await response.json().catch(() => null) as T;

      return {
        data,
        status: response.status as HttpStatus,
        statusText: response.statusText,
        headers: response.headers,
      };

    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (
        error instanceof AuthError ||
        error instanceof NotFoundError ||
        (error instanceof APIError && error.statusCode >= 400 && error.statusCode < 500)
      ) {
        break;
      }

      // Don't retry on last attempt
      if (attempt === retries) {
        break;
      }

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  // Handle network errors
  if (lastError?.name === 'AbortError') {
    throw new NetworkError(
      `Request timeout after ${timeout}ms`,
      lastError,
      { url, timeout, attempts: retries + 1 }
    );
  }

  if (lastError?.name === 'TypeError' && lastError.message.includes('fetch')) {
    throw new NetworkError(
      'Network error - please check your connection',
      lastError,
      { url, attempts: retries + 1 }
    );
  }

  // Re-throw the last error
  throw lastError;
}

/**
 * GET request helper
 */
export async function apiGet<T = unknown>(
  url: string,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  return apiRequest<T>(url, { ...config, method: 'GET' });
}

/**
 * POST request helper
 */
export async function apiPost<T = unknown>(
  url: string,
  data: unknown,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  return apiRequest<T>(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T = unknown>(
  url: string,
  data: unknown,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  return apiRequest<T>(url, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = unknown>(
  url: string,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  return apiRequest<T>(url, { ...config, method: 'DELETE' });
}

/**
 * Safe API call wrapper that handles errors gracefully
 */
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallback?: T,
  context?: Record<string, unknown>
): Promise<T | undefined> {
  try {
    return await apiCall();
  } catch (error) {
    logError(error, context);
    return fallback;
  }
}

/**
 * Form submission helper with error handling
 */
export async function submitForm<T = unknown>(
  url: string,
  formData: Record<string, unknown>,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<APIResponse<T>> {
  try {
    return await apiPost<T>(url, formData, config);
  } catch (error) {
    logError(error, {
      formData,
      url,
      action: 'form_submission'
    });
    throw error;
  }
}
