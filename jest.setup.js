import "@testing-library/jest-dom";

// Mock Next.js environment
Object.defineProperty(global, "Request", {
  value: global.Request || class Request {},
  writable: true,
});

Object.defineProperty(global, "Response", {
  value: global.Response || class Response {},
  writable: true,
});

// Mock RequestCookies
global.RequestCookies = class RequestCookies {
  constructor() {
    this.cookies = new Map();
  }

  get(name) {
    return this.cookies.get(name);
  }

  set(name, value) {
    this.cookies.set(name, value);
  }
};

// Mock NextRequest
global.NextRequest = class NextRequest {
  constructor(url, init = {}) {
    this.url = url;
    this.method = init.method || "GET";
    this.headers = new Map();
    this.body = init.body;
    this.cookies = new global.RequestCookies();

    // Mock headers
    if (init.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        this.headers.set(key, value);
      });
    }
  }

  get(key) {
    return this.headers.get(key);
  }

  set(key, value) {
    this.headers.set(key, value);
  }

  async json() {
    if (this.body) {
      return JSON.parse(this.body);
    }
    return {};
  }

  async formData() {
    const formData = new FormData();
    if (this.body) {
      const params = new URLSearchParams(this.body);
      for (const [key, value] of params) {
        formData.append(key, value);
      }
    }
    return formData;
  }
};

// Mock NextResponse
global.NextResponse = {
  json: (data, init = {}) => ({
    json: () => Promise.resolve(data),
    status: init.status || 200,
    headers: new Map(),
  }),
  error: (message, init = {}) => ({
    json: () => Promise.resolve({ error: message }),
    status: init.status || 500,
    headers: new Map(),
  }),
};

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

// Mock Framer Motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    span: ({ children, className, ...props }) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
    button: ({ children, className, ...props }) => (
      <button className={className} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock Radix UI components
jest.mock("@radix-ui/react-progress", () => ({
  Root: ({ children, value, ...props }) => (
    <div data-testid="progress-root" data-value={value} {...props}>
      {children}
    </div>
  ),
  Indicator: ({ children, ...props }) => (
    <div data-testid="progress-indicator" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("@radix-ui/react-tabs", () => {
  const React = require("react");
  return {
    Root: ({ children, value, onValueChange, defaultValue, ...props }) => {
      const [currentValue, setCurrentValue] = React.useState(
        value || defaultValue
      );

      const handleValueChange = newValue => {
        setCurrentValue(newValue);
        onValueChange?.(newValue);
      };

      return (
        <div
          data-testid="tabs-root"
          data-value={currentValue}
          data-on-value-change={handleValueChange}
          {...props}
        >
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              currentValue,
              onValueChange: handleValueChange,
            })
          )}
        </div>
      );
    },
    List: ({ children, ...props }) => (
      <div data-testid="tabs-list" role="tablist" {...props}>
        {children}
      </div>
    ),
    Trigger: ({ children, value, currentValue, onValueChange, ...props }) => {
      const isActive = currentValue === value;
      return (
        <button
          data-testid="tabs-trigger"
          data-value={value}
          data-state={isActive ? "active" : "inactive"}
          role="tab"
          onClick={() => onValueChange?.(value)}
          {...props}
        >
          {children}
        </button>
      );
    },
    Content: ({ children, value, currentValue, ...props }) => {
      const isActive = currentValue === value;
      return (
        <div
          data-testid="tabs-content"
          data-value={value}
          data-state={isActive ? "active" : "inactive"}
          role="tabpanel"
          {...props}
        >
          {isActive ? children : null}
        </div>
      );
    },
  };
});

jest.mock("@radix-ui/react-select", () => ({
  Root: ({ children, value, onValueChange, ...props }) => (
    <div
      data-testid="select-root"
      data-value={value}
      data-on-value-change={onValueChange}
      {...props}
    >
      {children}
    </div>
  ),
  Trigger: ({ children, ...props }) => (
    <button data-testid="select-trigger" {...props}>
      {children}
    </button>
  ),
  Value: ({ children, ...props }) => (
    <span data-testid="select-value" {...props}>
      {children}
    </span>
  ),
  Content: ({ children, ...props }) => (
    <div data-testid="select-content" {...props}>
      {children}
    </div>
  ),
  Item: ({ children, value, ...props }) => (
    <div data-testid="select-item" data-value={value} {...props}>
      {children}
    </div>
  ),
  Icon: ({ children, ...props }) => (
    <span data-testid="select-icon" {...props}>
      {children}
    </span>
  ),
  Portal: ({ children }) => children,
  Viewport: ({ children, ...props }) => (
    <div data-testid="select-viewport" {...props}>
      {children}
    </div>
  ),
  ScrollUpButton: ({ children, ...props }) => (
    <button data-testid="select-scroll-up" {...props}>
      {children}
    </button>
  ),
  ScrollDownButton: ({ children, ...props }) => (
    <button data-testid="select-scroll-down" {...props}>
      {children}
    </button>
  ),
  ItemIndicator: ({ children, ...props }) => (
    <span data-testid="select-item-indicator" {...props}>
      {children}
    </span>
  ),
  ItemText: ({ children, ...props }) => (
    <span data-testid="select-item-text" {...props}>
      {children}
    </span>
  ),
  Label: ({ children, ...props }) => (
    <label data-testid="select-label" {...props}>
      {children}
    </label>
  ),
  Group: ({ children, ...props }) => (
    <div data-testid="select-group" {...props}>
      {children}
    </div>
  ),
  Separator: ({ children, ...props }) => (
    <div data-testid="select-separator" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("@radix-ui/react-checkbox", () => ({
  Root: ({ children, checked, onCheckedChange, ...props }) => (
    <button
      data-testid="checkbox-root"
      data-checked={checked}
      data-on-checked-change={onCheckedChange}
      {...props}
    >
      {children}
    </button>
  ),
  Indicator: ({ children, ...props }) => (
    <span data-testid="checkbox-indicator" {...props}>
      {children}
    </span>
  ),
}));

jest.mock("@radix-ui/react-label", () => ({
  Root: ({ children, ...props }) => (
    <label data-testid="label-root" {...props}>
      {children}
    </label>
  ),
}));

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
  CheckIcon: () => <span data-testid="check-icon">✓</span>,
  ChevronDownIcon: () => <span data-testid="chevron-down-icon">▼</span>,
  ChevronUpIcon: () => <span data-testid="chevron-up-icon">▲</span>,
  AlertTriangle: () => <span data-testid="alert-triangle-icon">⚠</span>,
  RefreshCw: () => <span data-testid="refresh-icon">↻</span>,
  Home: () => <span data-testid="home-icon">🏠</span>,
}));

// Mock React Hook Form
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(fn => fn),
    formState: { errors: {} },
    control: {},
    watch: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    reset: jest.fn(),
    getFieldState: jest.fn(() => ({
      error: undefined,
      isDirty: false,
      isTouched: false,
      invalid: false,
    })),
  }),
  Controller: ({ render }) =>
    render({ field: { onChange: jest.fn(), value: "" } }),
  FormProvider: ({ children }) => children,
  useFormContext: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(fn => fn),
    formState: { errors: {} },
    control: {},
    getFieldState: jest.fn(() => ({
      error: undefined,
      isDirty: false,
      isTouched: false,
      invalid: false,
    })),
  }),
  useFormState: () => ({ errors: {} }),
}));

// Mock fetch - individual tests will set up their own mocks
// Don't set a global mock here to avoid conflicts with test-specific mocks

// Mock AbortController - individual tests will set up their own mocks
// Don't set a global mock here to avoid conflicts with test-specific mocks

// Mock window.location for ErrorBoundary tests
// jsdom provides a working location object, so we don't need to mock it
// If specific tests need location mocking, they can do it individually

// Mock class-variance-authority
jest.mock("class-variance-authority", () => ({
  cva: jest.fn(() =>
    jest.fn(props => {
      // Return a mock className based on props
      const classes = ["inline-flex", "items-center", "justify-center"];
      if (props?.variant === "default")
        classes.push("bg-primary", "text-primary-foreground");
      if (props?.size === "default") classes.push("h-9", "px-4", "py-2");
      if (props?.className) classes.push(props.className);
      return classes.join(" ");
    })
  ),
}));

// Mock @radix-ui/react-slot
jest.mock("@radix-ui/react-slot", () => ({
  Slot: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

// Mock Button component
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, variant, size, asChild, ...props }) => {
    const classes = ["inline-flex", "items-center", "justify-center"];
    if (variant === "default")
      classes.push("bg-primary", "text-primary-foreground");
    if (size === "default") classes.push("h-9", "px-4", "py-2");
    if (className) classes.push(className);

    const Component = asChild ? "div" : "button";
    return (
      <Component className={classes.join(" ")} {...props}>
        {children}
      </Component>
    );
  },
  buttonVariants: jest.fn(() => "mock-button-classes"),
}));

// Mock React hooks for stable function references
const mockCallbacks = new Map();
const mockMemos = new Map();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useCallback: jest.fn((fn, deps) => {
    const key = JSON.stringify(deps || []);
    if (!mockCallbacks.has(key)) {
      mockCallbacks.set(key, fn);
    }
    return mockCallbacks.get(key);
  }),
  useMemo: jest.fn((fn, deps) => {
    const key = JSON.stringify(deps || []);
    if (!mockMemos.has(key)) {
      mockMemos.set(key, fn());
    }
    return mockMemos.get(key);
  }),
}));
