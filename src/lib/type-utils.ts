/**
 * TypeScript utility functions and type helpers
 * Following the development methodology for robust type safety
 */

// Import only what we actually use

// ============================================================================
// TYPE UTILITIES
// ============================================================================

/**
 * Create a type that makes all properties optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Create a type that makes all properties required except specified ones
 */
export type RequiredExcept<T, K extends keyof T> = Required<T> &
  Partial<Pick<T, K>>;

/**
 * Extract the return type of a function
 */
export type ReturnType<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: unknown[]
) => infer R
  ? R
  : never;

/**
 * Extract the parameter types of a function
 */
export type Parameters<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never;

/**
 * Create a union type from an array of string literals
 */
export type StringLiteralUnion<T extends string> = T | (string & {});

/**
 * Create a type that represents a non-empty array
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Create a type that represents a tuple with at least one element
 */
export type AtLeastOne<T> = [T, ...T[]];

// ============================================================================
// COMPONENT TYPE UTILITIES
// ============================================================================

/**
 * Extract props from a React component
 */
export type ComponentProps<T extends React.ComponentType<unknown>> =
  React.ComponentProps<T>;

/**
 * Extract props from a React component, excluding children
 */
export type ComponentPropsWithoutChildren<
  T extends React.ComponentType<unknown>,
> = Omit<ComponentProps<T>, "children">;

/**
 * Create a type for component props with default values
 */
export type PropsWithDefaults<T, D extends Partial<T>> = Omit<T, keyof D> &
  Required<Pick<T, keyof D & keyof T>>;

// ============================================================================
// FORM TYPE UTILITIES
// ============================================================================

/**
 * Create a type for form field errors
 */
export type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Create a type for form field values
 */
export type FormValues<T> = {
  [K in keyof T]: T[K] extends string | number | boolean | null | undefined
    ? T[K]
    : never;
};

/**
 * Create a type for form field validation rules
 */
export type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: T[K]) => string | null;
  };
};

// ============================================================================
// API TYPE UTILITIES
// ============================================================================

/**
 * Create a type for API request parameters
 */
export type ApiRequestParams<T = Record<string, unknown>> = {
  [K in keyof T]: T[K] extends string | number | boolean | null | undefined
    ? T[K]
    : never;
};

/**
 * Create a type for API response data
 */
export type ApiResponseData<T> = T extends { data: infer D } ? D : T;

/**
 * Create a type for API error responses
 */
export type ApiErrorResponse = {
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
};

// ============================================================================
// ANIMATION TYPE UTILITIES
// ============================================================================

/**
 * Create a type for animation variants
 */
export type AnimationVariants = Record<string, Record<string, unknown>>;

/**
 * Create a type for animation configuration
 */
export type AnimationConfig<T extends string = string> = {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  variants?: Record<T, Record<string, unknown>>;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Type guard to check if a value is not null or undefined
 */
export const isNotNullish = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Type guard to check if a value is a function
 */
export const isFunction = (
  value: unknown
): value is (...args: unknown[]) => unknown => {
  return typeof value === "function";
};

/**
 * Type guard to check if a value is a promise
 */
export const isPromise = <T>(value: unknown): value is Promise<T> => {
  return value instanceof Promise;
};

/**
 * Type guard to check if a value is a date
 */
export const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
};

/**
 * Type guard to check if a value is a valid email
 */
export const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Type guard to check if a value is a valid URL
 */
export const isUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Type guard to check if a value is a valid phone number
 */
export const isPhoneNumber = (value: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""));
};

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Common HTTP status codes
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

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

/**
 * Common content types
 */
export const CONTENT_TYPES = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
  URL_ENCODED: "application/x-www-form-urlencoded",
  TEXT: "text/plain",
  HTML: "text/html",
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
