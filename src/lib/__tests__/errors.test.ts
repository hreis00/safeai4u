import {
  AppError,
  ValidationError,
  APIError,
  NetworkError,
  AuthError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  ConfigurationError,
  isAppError,
  isValidationError,
  isAPIError,
  isNetworkError,
  isAuthError,
  isNotFoundError,
  getErrorMessage,
  getErrorStatusCode,
  getErrorContext,
  logError,
  safeAsync,
  createValidationError,
  createAPIError,
} from "../errors";

// Mock console methods
const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("Custom Error Classes", () => {
  describe("AppError", () => {
    it("should create AppError with default values", () => {
      const error = new AppError("Test error");

      expect(error.message).toBe("Test error");
      expect(error.name).toBe("AppError");
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error.context).toBeUndefined();
      expect(error.stack).toBeDefined();
    });

    it("should create AppError with custom values", () => {
      const context = { userId: "123", action: "test" };
      const error = new AppError("Custom error", 400, false, context);

      expect(error.message).toBe("Custom error");
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(false);
      expect(error.context).toEqual(context);
    });
  });

  describe("ValidationError", () => {
    it("should create ValidationError with field information", () => {
      const context = { form: "contact" };
      const error = new ValidationError("Invalid email", "email", context);

      expect(error.message).toBe("Invalid email");
      expect(error.field).toBe("email");
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(true);
      expect(error.context).toEqual(context);
    });

    it("should create ValidationError without context", () => {
      const error = new ValidationError("Required field", "name");

      expect(error.message).toBe("Required field");
      expect(error.field).toBe("name");
      expect(error.statusCode).toBe(400);
    });
  });

  describe("APIError", () => {
    it("should create APIError with endpoint and method", () => {
      const context = { attempt: 1 };
      const error = new APIError(
        "API failed",
        500,
        "/api/test",
        "POST",
        context
      );

      expect(error.message).toBe("API failed");
      expect(error.statusCode).toBe(500);
      expect(error.endpoint).toBe("/api/test");
      expect(error.method).toBe("POST");
      expect(error.context).toEqual(context);
    });

    it("should create APIError with default values", () => {
      const error = new APIError("API error");

      expect(error.message).toBe("API error");
      expect(error.statusCode).toBe(500);
      expect(error.endpoint).toBeUndefined();
      expect(error.method).toBeUndefined();
    });
  });

  describe("NetworkError", () => {
    it("should create NetworkError with original error", () => {
      const originalError = new Error("Connection failed");
      const context = { url: "/api/test" };
      const error = new NetworkError("Network error", originalError, context);

      expect(error.message).toBe("Network error");
      expect(error.statusCode).toBe(503);
      expect(error.originalError).toBe(originalError);
      expect(error.context).toEqual(context);
    });

    it("should create NetworkError without original error", () => {
      const error = new NetworkError("Network timeout");

      expect(error.message).toBe("Network timeout");
      expect(error.statusCode).toBe(503);
      expect(error.originalError).toBeUndefined();
    });
  });

  describe("AuthError", () => {
    it("should create AuthError with default message", () => {
      const error = new AuthError();

      expect(error.message).toBe("Authentication failed");
      expect(error.statusCode).toBe(401);
      expect(error.isOperational).toBe(true);
    });

    it("should create AuthError with custom message", () => {
      const context = { token: "invalid" };
      const error = new AuthError("Invalid token", context);

      expect(error.message).toBe("Invalid token");
      expect(error.statusCode).toBe(401);
      expect(error.context).toEqual(context);
    });
  });

  describe("AuthorizationError", () => {
    it("should create AuthorizationError with default message", () => {
      const error = new AuthorizationError();

      expect(error.message).toBe("Access denied");
      expect(error.statusCode).toBe(403);
      expect(error.isOperational).toBe(true);
    });

    it("should create AuthorizationError with custom message", () => {
      const context = { resource: "admin" };
      const error = new AuthorizationError("Insufficient permissions", context);

      expect(error.message).toBe("Insufficient permissions");
      expect(error.statusCode).toBe(403);
      expect(error.context).toEqual(context);
    });
  });

  describe("NotFoundError", () => {
    it("should create NotFoundError with resource name", () => {
      const context = { id: 123 };
      const error = new NotFoundError("User", context);

      expect(error.message).toBe("User not found");
      expect(error.statusCode).toBe(404);
      expect(error.context).toEqual(context);
    });
  });

  describe("RateLimitError", () => {
    it("should create RateLimitError with retry after", () => {
      const context = { endpoint: "/api/test" };
      const error = new RateLimitError("Too many requests", 60, context);

      expect(error.message).toBe("Too many requests");
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBe(60);
      expect(error.context).toEqual(context);
    });

    it("should create RateLimitError without retry after", () => {
      const error = new RateLimitError();

      expect(error.message).toBe("Rate limit exceeded");
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBeUndefined();
    });
  });

  describe("ConfigurationError", () => {
    it("should create ConfigurationError", () => {
      const context = { config: "database" };
      const error = new ConfigurationError("Database not configured", context);

      expect(error.message).toBe("Database not configured");
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(false);
      expect(error.context).toEqual(context);
    });
  });
});

describe("Error Type Guards", () => {
  it("should identify AppError instances", () => {
    const appError = new AppError("Test");
    const validationError = new ValidationError("Test", "field");
    const regularError = new Error("Test");

    expect(isAppError(appError)).toBe(true);
    expect(isAppError(validationError)).toBe(true);
    expect(isAppError(regularError)).toBe(false);
    expect(isAppError(null)).toBe(false);
    expect(isAppError(undefined)).toBe(false);
  });

  it("should identify ValidationError instances", () => {
    const validationError = new ValidationError("Test", "field");
    const appError = new AppError("Test");
    const regularError = new Error("Test");

    expect(isValidationError(validationError)).toBe(true);
    expect(isValidationError(appError)).toBe(false);
    expect(isValidationError(regularError)).toBe(false);
  });

  it("should identify APIError instances", () => {
    const apiError = new APIError("Test");
    const appError = new AppError("Test");
    const regularError = new Error("Test");

    expect(isAPIError(apiError)).toBe(true);
    expect(isAPIError(appError)).toBe(false);
    expect(isAPIError(regularError)).toBe(false);
  });

  it("should identify NetworkError instances", () => {
    const networkError = new NetworkError("Test");
    const appError = new AppError("Test");
    const regularError = new Error("Test");

    expect(isNetworkError(networkError)).toBe(true);
    expect(isNetworkError(appError)).toBe(false);
    expect(isNetworkError(regularError)).toBe(false);
  });

  it("should identify AuthError instances", () => {
    const authError = new AuthError("Test");
    const appError = new AppError("Test");
    const regularError = new Error("Test");

    expect(isAuthError(authError)).toBe(true);
    expect(isAuthError(appError)).toBe(false);
    expect(isAuthError(regularError)).toBe(false);
  });

  it("should identify NotFoundError instances", () => {
    const notFoundError = new NotFoundError("Resource");
    const appError = new AppError("Test");
    const regularError = new Error("Test");

    expect(isNotFoundError(notFoundError)).toBe(true);
    expect(isNotFoundError(appError)).toBe(false);
    expect(isNotFoundError(regularError)).toBe(false);
  });
});

describe("Error Utility Functions", () => {
  describe("getErrorMessage", () => {
    it("should return message from AppError", () => {
      const appError = new AppError("App error message");
      expect(getErrorMessage(appError)).toBe("App error message");
    });

    it("should return message from regular Error", () => {
      const regularError = new Error("Regular error message");
      expect(getErrorMessage(regularError)).toBe("Regular error message");
    });

    it("should return string as-is", () => {
      expect(getErrorMessage("String error")).toBe("String error");
    });

    it("should return default message for unknown types", () => {
      expect(getErrorMessage(null)).toBe("An unexpected error occurred");
      expect(getErrorMessage(undefined)).toBe("An unexpected error occurred");
      expect(getErrorMessage(123)).toBe("An unexpected error occurred");
      expect(getErrorMessage({})).toBe("An unexpected error occurred");
    });
  });

  describe("getErrorStatusCode", () => {
    it("should return status code from AppError", () => {
      const appError = new AppError("Test", 400);
      expect(getErrorStatusCode(appError)).toBe(400);
    });

    it("should return default status code for non-AppError", () => {
      const regularError = new Error("Test");
      expect(getErrorStatusCode(regularError)).toBe(500);
    });

    it("should return default status code for unknown types", () => {
      expect(getErrorStatusCode(null)).toBe(500);
      expect(getErrorStatusCode(undefined)).toBe(500);
      expect(getErrorStatusCode("string")).toBe(500);
    });
  });

  describe("getErrorContext", () => {
    it("should return context from AppError", () => {
      const context = { userId: "123" };
      const appError = new AppError("Test", 500, true, context);
      expect(getErrorContext(appError)).toEqual(context);
    });

    it("should return undefined for non-AppError", () => {
      const regularError = new Error("Test");
      expect(getErrorContext(regularError)).toBeUndefined();
    });

    it("should return undefined for unknown types", () => {
      expect(getErrorContext(null)).toBeUndefined();
      expect(getErrorContext(undefined)).toBeUndefined();
    });
  });

  describe("logError", () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        writable: true,
      });
    });

    it("should log error in development mode", () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });

      const error = new AppError("Test error", 400, true, { userId: "123" });
      const additionalContext = { component: "TestComponent" };

      logError(error, additionalContext);

      expect(mockConsoleError).toHaveBeenCalledWith("Error occurred:", {
        message: "Test error",
        statusCode: 400,
        context: { userId: "123" },
        additionalContext: { component: "TestComponent" },
        timestamp: expect.any(String),
        stack: expect.any(String),
      });
    });

    it("should not log to console in production mode", () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "production",
        writable: true,
      });

      const error = new AppError("Test error");
      logError(error);

      expect(mockConsoleError).not.toHaveBeenCalled();
    });

    it("should handle regular Error objects", () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });

      const error = new Error("Regular error");
      logError(error);

      expect(mockConsoleError).toHaveBeenCalledWith("Error occurred:", {
        message: "Regular error",
        statusCode: 500,
        context: undefined,
        additionalContext: undefined,
        timestamp: expect.any(String),
        stack: expect.any(String),
      });
    });

    it("should handle non-Error objects", () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });

      logError("String error");

      expect(mockConsoleError).toHaveBeenCalledWith("Error occurred:", {
        message: "String error",
        statusCode: 500,
        context: undefined,
        additionalContext: undefined,
        timestamp: expect.any(String),
        stack: undefined,
      });
    });
  });

  describe("safeAsync", () => {
    it("should return result on successful async operation", async () => {
      const asyncFn = jest.fn().mockResolvedValue("success");

      const result = await safeAsync(asyncFn);

      expect(result).toBe("success");
      expect(asyncFn).toHaveBeenCalled();
    });

    it("should return fallback on failed async operation", async () => {
      const asyncFn = jest.fn().mockRejectedValue(new Error("Async error"));

      const result = await safeAsync(asyncFn, "fallback");

      expect(result).toBe("fallback");
      expect(asyncFn).toHaveBeenCalled();
    });

    it("should return undefined when no fallback provided", async () => {
      const asyncFn = jest.fn().mockRejectedValue(new Error("Async error"));

      const result = await safeAsync(asyncFn);

      expect(result).toBeUndefined();
    });

    it("should pass context to logError", async () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });
      const asyncFn = jest.fn().mockRejectedValue(new Error("Async error"));
      const context = { operation: "test" };

      await safeAsync(asyncFn, "fallback", context);

      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error occurred:",
        expect.objectContaining({
          additionalContext: context,
        })
      );
    });
  });

  describe("Error Creation Helpers", () => {
    it("should create ValidationError with createValidationError", () => {
      const error = createValidationError("email", "Invalid email format");

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.field).toBe("email");
      expect(error.message).toBe("Invalid email format");
      expect(error.statusCode).toBe(400);
    });

    it("should create APIError with createAPIError", () => {
      const error = createAPIError("API failed", 500, "/api/test", "POST");

      expect(error).toBeInstanceOf(APIError);
      expect(error.message).toBe("API failed");
      expect(error.statusCode).toBe(500);
      expect(error.endpoint).toBe("/api/test");
      expect(error.method).toBe("POST");
    });
  });
});
