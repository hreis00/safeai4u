/**
 * Custom error types and error handling utilities
 * Following the development methodology for robust error handling
 */

import type { ErrorContext } from './types';

// Base error class for all custom errors
export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly statusCode: number;
  public readonly context?: ErrorContext;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: ErrorContext
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation errors for form and data validation
export class ValidationError extends AppError {
  public readonly field: string;

  constructor(message: string, field: string, context?: Record<string, unknown>) {
    super(message, 400, true, context);
    this.field = field;
  }
}

// API errors for external service calls
export class APIError extends AppError {
  public readonly endpoint?: string;
  public readonly method?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    endpoint?: string,
    method?: string,
    context?: Record<string, unknown>
  ) {
    super(message, statusCode, true, context);
    this.endpoint = endpoint;
    this.method = method;
  }
}

// Network errors for connectivity issues
export class NetworkError extends AppError {
  public readonly originalError?: Error;

  constructor(message: string, originalError?: Error, context?: Record<string, unknown>) {
    super(message, 503, true, context);
    this.originalError = originalError;
  }
}

// Authentication and authorization errors
export class AuthError extends AppError {
  constructor(message: string = "Authentication failed", context?: Record<string, unknown>) {
    super(message, 401, true, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Access denied", context?: Record<string, unknown>) {
    super(message, 403, true, context);
  }
}

// Not found errors
export class NotFoundError extends AppError {
  constructor(resource: string, context?: Record<string, unknown>) {
    super(`${resource} not found`, 404, true, context);
  }
}

// Rate limiting errors
export class RateLimitError extends AppError {
  public readonly retryAfter?: number;

  constructor(message: string = "Rate limit exceeded", retryAfter?: number, context?: Record<string, unknown>) {
    super(message, 429, true, context);
    this.retryAfter = retryAfter;
  }
}

// Configuration errors
export class ConfigurationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 500, false, context);
  }
}

// Error type guard functions
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
}

export function getErrorStatusCode(error: unknown): number {
  if (isAppError(error)) {
    return error.statusCode;
  }

  return 500;
}

export function getErrorContext(error: unknown): Record<string, unknown> | undefined {
  if (isAppError(error)) {
    return error.context;
  }

  return undefined;
}

// Error logging utility
export function logError(error: unknown, context?: ErrorContext): void {
  const errorContext = {
    message: getErrorMessage(error),
    statusCode: getErrorStatusCode(error),
    context: getErrorContext(error),
    additionalContext: context,
    timestamp: new Date().toISOString(),
    stack: error instanceof Error ? error.stack : undefined,
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', errorContext);
  }

  // In production, you would typically send to a logging service
  // Example: sendToLoggingService(errorContext);
}

// Safe async wrapper for error handling
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback?: T,
  context?: ErrorContext
): Promise<T | undefined> {
  try {
    return await asyncFn();
  } catch (error) {
    logError(error, context);
    return fallback;
  }
}

// Error boundary error type
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Form validation error helper
export function createValidationError(field: string, message: string): ValidationError {
  return new ValidationError(message, field, { field, message });
}

// API error helper
export function createAPIError(
  message: string,
  statusCode: number,
  endpoint?: string,
  method?: string
): APIError {
  return new APIError(message, statusCode, endpoint, method);
}
