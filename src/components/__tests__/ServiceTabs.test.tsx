import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ServiceTabs } from "../ServiceTabs";

interface Tab {
  value: string;
  label: string;
  cards: Array<{
    icon: string;
    title: string;
    description: string;
    content: string;
    progress: { label: string; value: number };
    badges: string[];
  }>;
}

interface ServiceTabsInteractiveProps {
  tabs: Tab[];
  defaultTab?: string | null;
}

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
}

// Mock the ServiceTabsInteractive component
jest.mock("../ServiceTabsInteractive", () => ({
  ServiceTabsInteractive: ({
    tabs,
    defaultTab,
  }: ServiceTabsInteractiveProps) => (
    <div data-testid="service-tabs-interactive">
      <div data-testid="tabs-count">{tabs.length}</div>
      <div data-testid="default-tab">{defaultTab || "none"}</div>
      {tabs.map(tab => (
        <div key={tab.value} data-testid={`tab-${tab.value}`}>
          {tab.label}
        </div>
      ))}
    </div>
  ),
}));

// Mock the FadeInUp animation component
jest.mock("../animations/FadeInUp", () => ({
  FadeInUp: ({ children, className }: AnimationProps) => (
    <div className={className} data-testid="fade-in-up">
      {children}
    </div>
  ),
}));

describe("ServiceTabs", () => {
  const mockTabs = [
    {
      value: "consulting",
      label: "AI Consulting",
      cards: [
        {
          icon: "🎯",
          title: "Strategic Planning",
          description: "AI strategy development",
          content: "Comprehensive AI strategy planning",
          progress: { label: "Strategy Completion", value: 85 },
          badges: ["Strategy", "Planning"],
        },
      ],
    },
    {
      value: "development",
      label: "AI Development",
      cards: [
        {
          icon: "⚙️",
          title: "Custom Solutions",
          description: "Tailored AI development",
          content: "Custom AI solution development",
          progress: { label: "Development Progress", value: 70 },
          badges: ["Development", "Custom"],
        },
      ],
    },
    {
      value: "education",
      label: "AI Education",
      cards: [
        {
          icon: "📚",
          title: "Training Programs",
          description: "Professional AI training",
          content: "Comprehensive AI education programs",
          progress: { label: "Training Completion", value: 90 },
          badges: ["Education", "Training"],
        },
      ],
    },
  ];

  describe("Component Rendering", () => {
    it("should render with title and description", () => {
      render(
        <ServiceTabs
          title="Our AI Services"
          description="Comprehensive AI solutions for your business"
          tabs={mockTabs}
        />
      );

      expect(screen.getByText("Our AI Services")).toBeInTheDocument();
      expect(
        screen.getByText("Comprehensive AI solutions for your business")
      ).toBeInTheDocument();
    });

    it("should render ServiceTabsInteractive with correct props", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      expect(
        screen.getByTestId("service-tabs-interactive")
      ).toBeInTheDocument();
      expect(screen.getByTestId("tabs-count")).toHaveTextContent("3");
      expect(screen.getByTestId("default-tab")).toHaveTextContent("none");
    });

    it("should pass defaultTab to ServiceTabsInteractive when provided", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
          defaultTab="development"
        />
      );

      expect(screen.getByTestId("default-tab")).toHaveTextContent(
        "development"
      );
    });

    it("should render all tabs", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      expect(screen.getByTestId("tab-consulting")).toHaveTextContent(
        "AI Consulting"
      );
      expect(screen.getByTestId("tab-development")).toHaveTextContent(
        "AI Development"
      );
      expect(screen.getByTestId("tab-education")).toHaveTextContent(
        "AI Education"
      );
    });
  });

  describe("Layout and Structure", () => {
    it("should have proper container structure", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      // Check for section element
      const section = screen.getByRole("region", { hidden: true });
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass("container", "mx-auto", "px-4", "py-16");
    });

    it("should have proper content wrapper", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      const wrapper = screen.getByTestId("fade-in-up");
      expect(wrapper).toHaveClass("max-w-6xl", "mx-auto");
    });

    it("should have proper spacing and layout classes", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      const titleSection = screen.getByText("Test Title").closest("div");
      expect(titleSection).toHaveClass("text-center", "space-y-6", "mb-12");
    });
  });

  describe("Content Display", () => {
    it("should display title with proper styling", () => {
      render(
        <ServiceTabs
          title="Custom AI Services"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      const title = screen.getByText("Custom AI Services");
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass("text-3xl", "font-bold");
    });

    it("should display description with proper styling", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Custom description for AI services"
          tabs={mockTabs}
        />
      );

      const description = screen.getByText(
        "Custom description for AI services"
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass(
        "max-w-2xl",
        "mx-auto",
        "text-muted-foreground"
      );
    });
  });

  describe("Props Handling", () => {
    it("should handle empty tabs array", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={[]}
        />
      );

      expect(screen.getByTestId("tabs-count")).toHaveTextContent("0");
    });

    it("should handle single tab", () => {
      const singleTab = [mockTabs[0]];

      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={singleTab}
        />
      );

      expect(screen.getByTestId("tabs-count")).toHaveTextContent("1");
      expect(screen.getByTestId("tab-consulting")).toHaveTextContent(
        "AI Consulting"
      );
    });

    it("should handle undefined defaultTab", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
          defaultTab={undefined}
        />
      );

      expect(screen.getByTestId("default-tab")).toHaveTextContent("none");
    });

    it("should handle undefined defaultTab", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
          defaultTab={undefined}
        />
      );

      expect(screen.getByTestId("default-tab")).toHaveTextContent("none");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(
        <ServiceTabs
          title="Accessible AI Services"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Accessible AI Services");
    });

    it("should have proper semantic structure", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      // Check for proper section structure
      const section = screen.getByRole("region", { hidden: true });
      expect(section).toBeInTheDocument();
    });
  });

  describe("Animation Integration", () => {
    it("should render FadeInUp animation wrapper", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      const fadeInUpElements = screen.getAllByTestId("fade-in-up");
      expect(fadeInUpElements).toHaveLength(2); // One for title section, one for interactive component
    });

    it("should pass proper className to FadeInUp", () => {
      render(
        <ServiceTabs
          title="Test Title"
          description="Test Description"
          tabs={mockTabs}
        />
      );

      const titleFadeInUp = screen
        .getByText("Test Title")
        .closest('[data-testid="fade-in-up"]');
      expect(titleFadeInUp).toHaveClass("text-center", "space-y-6", "mb-12");
    });
  });
});
