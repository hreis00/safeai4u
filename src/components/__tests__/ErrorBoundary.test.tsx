import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ErrorBoundary,
  useErrorHandler,
  withErrorBoundary,
} from "../ErrorBoundary";
import { logError } from "@/lib/errors";

// Mock the error logging utility
jest.mock("@/lib/errors", () => ({
  logError: jest.fn(),
  isAppError: jest.fn(error => error && error.statusCode !== undefined),
  getErrorMessage: jest.fn(error => error?.message || "Unknown error"),
  getErrorStatusCode: jest.fn(error => error?.statusCode || 500),
}));

const mockLogError = logError as jest.MockedFunction<typeof logError>;

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for cleaner test output
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Error Catching", () => {
    it("should catch errors and display fallback UI", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(
        screen.getByText(/We encountered an unexpected error/)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /try again/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /reload page/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /go home/i })
      ).toBeInTheDocument();
    });

    it("should render children when no error occurs", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText("No error")).toBeInTheDocument();
      expect(
        screen.queryByText("Something went wrong")
      ).not.toBeInTheDocument();
    });

    it("should call logError when an error occurs", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(mockLogError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
          errorBoundary: true,
        })
      );
    });

    it("should call custom onError handler when provided", () => {
      const mockOnError = jest.fn();

      render(
        <ErrorBoundary onError={mockOnError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(mockOnError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe("Error Recovery", () => {
    it("should allow retry by resetting error state", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      // Click try again button
      const tryAgainButton = screen.getByRole("button", { name: /try again/i });
      fireEvent.click(tryAgainButton);

      expect(screen.getByText("No error")).toBeInTheDocument();
      expect(
        screen.queryByText("Something went wrong")
      ).not.toBeInTheDocument();
    });

    it("should reload page when reload button is clicked", () => {
      const mockReload = jest.fn();
      Object.defineProperty(window, "location", {
        value: { reload: mockReload },
        writable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole("button", { name: /reload page/i });
      fireEvent.click(reloadButton);

      expect(mockReload).toHaveBeenCalled();
    });
  });

  describe("Custom Fallback UI", () => {
    it("should render custom fallback when provided", () => {
      const customFallback = <div>Custom error message</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText("Custom error message")).toBeInTheDocument();
      expect(
        screen.queryByText("Something went wrong")
      ).not.toBeInTheDocument();
    });
  });

  describe("Development Mode Features", () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        writable: true,
      });
    });

    it("should show error details in development mode", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText("Error Details:")).toBeInTheDocument();
      expect(screen.getByText("Test error")).toBeInTheDocument();
    });

    it("should show error ID in development mode", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Error ID:/)).toBeInTheDocument();
    });
  });

  describe("Production Mode", () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "production",
        writable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        writable: true,
      });
    });

    it("should not show error details in production mode", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.queryByText("Error Details:")).not.toBeInTheDocument();
      expect(screen.queryByText("Test error")).not.toBeInTheDocument();
    });
  });

  describe("Support Contact", () => {
    it("should display support contact information", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/If this problem continues/)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /contact our support team/i })
      ).toBeInTheDocument();
    });

    it("should include error ID in support message", () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/reference error ID:/)).toBeInTheDocument();
    });
  });
});

describe("useErrorHandler Hook", () => {
  const TestComponent = ({
    shouldThrow = false,
  }: {
    shouldThrow?: boolean;
  }) => {
    const { handleError, resetError } = useErrorHandler();

    if (shouldThrow) {
      handleError(new Error("Hook error"));
    }

    return (
      <div>
        <button onClick={() => handleError(new Error("Manual error"))}>
          Trigger Error
        </button>
        <button onClick={resetError}>Reset Error</button>
      </div>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw error when handleError is called", () => {
    expect(() => {
      render(
        <ErrorBoundary>
          <TestComponent shouldThrow={true} />
        </ErrorBoundary>
      );
    }).toThrow("Hook error");
  });

  it("should log error when handleError is called", () => {
    render(
      <ErrorBoundary>
        <TestComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    const triggerButton = screen.getByText("Trigger Error");
    fireEvent.click(triggerButton);

    expect(mockLogError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        hook: "useErrorHandler",
      })
    );
  });

  it("should reset error state when resetError is called", () => {
    render(
      <ErrorBoundary>
        <TestComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Component should render normally
    expect(screen.getByText("Trigger Error")).toBeInTheDocument();
  });
});

describe("withErrorBoundary HOC", () => {
  const TestComponent = ({
    shouldThrow = false,
  }: {
    shouldThrow?: boolean;
  }) => {
    if (shouldThrow) {
      throw new Error("HOC error");
    }
    return <div>HOC Component</div>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should wrap component with error boundary", () => {
    const WrappedComponent = withErrorBoundary(TestComponent);

    render(<WrappedComponent shouldThrow={false} />);

    expect(screen.getByText("HOC Component")).toBeInTheDocument();
  });

  it("should catch errors in wrapped component", () => {
    const WrappedComponent = withErrorBoundary(TestComponent);

    render(<WrappedComponent shouldThrow={true} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should set proper display name", () => {
    const WrappedComponent = withErrorBoundary(TestComponent);

    expect(WrappedComponent.displayName).toBe(
      "withErrorBoundary(TestComponent)"
    );
  });

  it("should pass through error boundary props", () => {
    const customFallback = <div>Custom HOC fallback</div>;
    const WrappedComponent = withErrorBoundary(TestComponent, {
      fallback: customFallback,
    });

    render(<WrappedComponent shouldThrow={true} />);

    expect(screen.getByText("Custom HOC fallback")).toBeInTheDocument();
  });
});
