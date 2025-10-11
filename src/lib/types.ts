/**
 * Centralized type definitions and utilities
 * Following TypeScript best practices and development methodology
 */

import type { ReactNode } from 'react';

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties optional
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extract the value type from an object
 */
export type ValueOf<T> = T[keyof T];

/**
 * Create a union of all possible values in an object
 */
export type ObjectValues<T> = T[keyof T];

// ============================================================================
// COMPONENT TYPES
// ============================================================================

/**
 * Base props for all components
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props for components that can be animated
 */
export interface AnimatedComponentProps extends BaseComponentProps {
  delay?: number;
  duration?: number;
}

/**
 * Props for interactive components
 */
export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
}

// ============================================================================
// BUTTON TYPES
// ============================================================================

export interface ButtonAction {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

// ============================================================================
// FORM TYPES
// ============================================================================

/**
 * Base form field configuration
 */
export interface FormFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Form validation result
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// ============================================================================
// API TYPES
// ============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
    version?: string;
  };
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

/**
 * Animation configuration for Framer Motion
 */
export interface AnimationConfig {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  variants?: Record<string, Record<string, unknown>>;
}

/**
 * Stagger animation configuration
 */
export interface StaggerConfig {
  delayChildren?: number;
  staggerChildren?: number;
}

// ============================================================================
// CONTENT TYPES
// ============================================================================

/**
 * Base content item structure
 */
export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

/**
 * SEO metadata for content
 */
export interface ContentSEO {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * Error context for logging
 */
export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
  [key: string]: unknown;
}

/**
 * Error severity levels
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Type guard to check if a value is a number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Type guard to check if a value is a boolean
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

/**
 * Type guard to check if a value is an object
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Type guard to check if a value is an array
 */
export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Common status types
 */
export const STATUS_TYPES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type StatusType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

/**
 * Common size types
 */
export const SIZE_TYPES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
} as const;

export type SizeType = typeof SIZE_TYPES[keyof typeof SIZE_TYPES];
