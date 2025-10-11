import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ServiceTabsInteractive } from '../ServiceTabsInteractive';

// Mock animation components
jest.mock('../animations/FadeInUp', () => ({
  FadeInUp: ({ children, delay }: any) => (
    <div data-testid="fade-in-up" data-delay={delay}>
      {children}
    </div>
  ),
}));

jest.mock('../animations/StaggerContainer', () => ({
  StaggerContainer: ({ children, className }: any) => (
    <div data-testid="stagger-container" className={className}>
      {children}
    </div>
  ),
  StaggerItem: ({ children }: any) => (
    <div data-testid="stagger-item">
      {children}
    </div>
  ),
}));

jest.mock('../animations/InteractiveElements', () => ({
  FloatingCard: ({ children }: any) => (
    <div data-testid="floating-card">
      {children}
    </div>
  ),
}));

jest.mock('../animations/AnimatedProgress', () => ({
  AnimatedProgress: ({ value, className, delay }: any) => (
    <div 
      data-testid="animated-progress" 
      className={className}
      data-value={value}
      data-delay={delay}
    >
      Progress: {value}%
    </div>
  ),
}));

jest.mock('../animations/AnimatedCounter', () => ({
  AnimatedCounter: ({ value, suffix }: any) => (
    <span data-testid="animated-counter" data-value={value} data-suffix={suffix}>
      {value}{suffix}
    </span>
  ),
}));

describe('ServiceTabsInteractive', () => {
  const user = userEvent.setup();

  const mockTabs = [
    {
      value: 'consulting',
      label: 'AI Consulting',
      cards: [
        {
          icon: '🎯',
          title: 'Strategic Planning',
          description: 'AI strategy development',
          content: 'Comprehensive AI strategy planning and implementation guidance.',
          progress: { label: 'Strategy Completion', value: 85 },
          badges: ['Strategy', 'Planning', 'Implementation'],
        },
        {
          icon: '📊',
          title: 'Market Analysis',
          description: 'AI market research',
          content: 'Detailed analysis of AI market trends and opportunities.',
          progress: { label: 'Analysis Progress', value: 70 },
          badges: ['Research', 'Analysis'],
        },
      ],
    },
    {
      value: 'development',
      label: 'AI Development',
      cards: [
        {
          icon: '⚙️',
          title: 'Custom Solutions',
          description: 'Tailored AI development',
          content: 'Custom AI solution development for specific business needs.',
          progress: { label: 'Development Progress', value: 60 },
          badges: ['Development', 'Custom', 'Solutions'],
        },
      ],
    },
    {
      value: 'education',
      label: 'AI Education',
      cards: [
        {
          icon: '📚',
          title: 'Training Programs',
          description: 'Professional AI training',
          content: 'Comprehensive AI education programs for professionals.',
          progress: { label: 'Training Completion', value: 90 },
          badges: ['Education', 'Training', 'Certification'],
        },
        {
          icon: '🎓',
          title: 'Workshops',
          description: 'Hands-on AI workshops',
          content: 'Interactive workshops for practical AI learning.',
          progress: { label: 'Workshop Progress', value: 75 },
          badges: ['Workshops', 'Hands-on'],
        },
      ],
    },
  ];

  describe('Component Rendering', () => {
    it('should render tabs list with all tab labels', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      expect(screen.getByText('AI Consulting')).toBeInTheDocument();
      expect(screen.getByText('AI Development')).toBeInTheDocument();
      expect(screen.getByText('AI Education')).toBeInTheDocument();
    });

    it('should render tabs list with proper grid layout', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const tabsList = screen.getByRole('tablist');
      expect(tabsList).toHaveClass('grid', 'w-full', 'grid-cols-3');
    });

    it('should render all tab content areas', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      // Check that all tab content areas are rendered
      expect(screen.getByRole('tabpanel', { name: 'AI Consulting' })).toBeInTheDocument();
      expect(screen.getByRole('tabpanel', { name: 'AI Development' })).toBeInTheDocument();
      expect(screen.getByRole('tabpanel', { name: 'AI Education' })).toBeInTheDocument();
    });

    it('should render cards for each tab', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      // Check for card titles
      expect(screen.getByText('Strategic Planning')).toBeInTheDocument();
      expect(screen.getByText('Market Analysis')).toBeInTheDocument();
      expect(screen.getByText('Custom Solutions')).toBeInTheDocument();
      expect(screen.getByText('Training Programs')).toBeInTheDocument();
      expect(screen.getByText('Workshops')).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('should set first tab as default when no defaultTab provided', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const firstTab = screen.getByRole('tab', { name: 'AI Consulting' });
      expect(firstTab).toHaveAttribute('data-state', 'active');
    });

    it('should set specified defaultTab as active', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} defaultTab="development" />);

      const developmentTab = screen.getByRole('tab', { name: 'AI Development' });
      expect(developmentTab).toHaveAttribute('data-state', 'active');
    });

    it('should switch tabs when clicked', async () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      // Initially, consulting tab should be active
      expect(screen.getByRole('tab', { name: 'AI Consulting' })).toHaveAttribute('data-state', 'active');

      // Click on development tab
      const developmentTab = screen.getByRole('tab', { name: 'AI Development' });
      await user.click(developmentTab);

      // Development tab should now be active
      expect(developmentTab).toHaveAttribute('data-state', 'active');
      expect(screen.getByRole('tab', { name: 'AI Consulting' })).toHaveAttribute('data-state', 'inactive');
    });

    it('should show correct content for active tab', async () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      // Initially should show consulting content
      expect(screen.getByText('Strategic Planning')).toBeInTheDocument();
      expect(screen.getByText('Market Analysis')).toBeInTheDocument();

      // Switch to development tab
      const developmentTab = screen.getByRole('tab', { name: 'AI Development' });
      await user.click(developmentTab);

      // Should show development content
      expect(screen.getByText('Custom Solutions')).toBeInTheDocument();
      // Consulting content should not be visible
      expect(screen.queryByText('Strategic Planning')).not.toBeInTheDocument();
    });
  });

  describe('Card Content Display', () => {
    it('should display card icons', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      expect(screen.getByText('🎯')).toBeInTheDocument();
      expect(screen.getByText('📊')).toBeInTheDocument();
      expect(screen.getByText('⚙️')).toBeInTheDocument();
    });

    it('should display card titles and descriptions', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      expect(screen.getByText('Strategic Planning')).toBeInTheDocument();
      expect(screen.getByText('AI strategy development')).toBeInTheDocument();
      expect(screen.getByText('Market Analysis')).toBeInTheDocument();
      expect(screen.getByText('AI market research')).toBeInTheDocument();
    });

    it('should display card content text', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      expect(screen.getByText('Comprehensive AI strategy planning and implementation guidance.')).toBeInTheDocument();
      expect(screen.getByText('Detailed analysis of AI market trends and opportunities.')).toBeInTheDocument();
    });

    it('should display progress information', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      expect(screen.getByText('Strategy Completion')).toBeInTheDocument();
      expect(screen.getByText('Analysis Progress')).toBeInTheDocument();
    });

    it('should display badges', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      expect(screen.getByText('Strategy')).toBeInTheDocument();
      expect(screen.getByText('Planning')).toBeInTheDocument();
      expect(screen.getByText('Implementation')).toBeInTheDocument();
      expect(screen.getByText('Research')).toBeInTheDocument();
      expect(screen.getByText('Analysis')).toBeInTheDocument();
    });
  });

  describe('Animation Components Integration', () => {
    it('should render FadeInUp with correct delay', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const fadeInUp = screen.getByTestId('fade-in-up');
      expect(fadeInUp).toHaveAttribute('data-delay', '0.2');
    });

    it('should render StaggerContainer with correct classes', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const staggerContainer = screen.getByTestId('stagger-container');
      expect(staggerContainer).toHaveClass('grid', 'gap-8', 'md:grid-cols-2');
    });

    it('should render StaggerItem for each card', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const staggerItems = screen.getAllByTestId('stagger-item');
      // Should have 5 total cards across all tabs
      expect(staggerItems).toHaveLength(5);
    });

    it('should render FloatingCard for each card', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const floatingCards = screen.getAllByTestId('floating-card');
      expect(floatingCards).toHaveLength(5);
    });

    it('should render AnimatedProgress with correct values', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const progressBars = screen.getAllByTestId('animated-progress');
      expect(progressBars).toHaveLength(5);

      // Check specific progress values
      const progress85 = progressBars.find(bar => bar.getAttribute('data-value') === '85');
      const progress70 = progressBars.find(bar => bar.getAttribute('data-value') === '70');
      const progress60 = progressBars.find(bar => bar.getAttribute('data-value') === '60');

      expect(progress85).toBeInTheDocument();
      expect(progress70).toBeInTheDocument();
      expect(progress60).toBeInTheDocument();
    });

    it('should render AnimatedCounter with correct values and suffixes', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const counters = screen.getAllByTestId('animated-counter');
      expect(counters).toHaveLength(5);

      // Check specific counter values
      const counter85 = counters.find(counter => counter.getAttribute('data-value') === '85');
      const counter70 = counters.find(counter => counter.getAttribute('data-value') === '70');

      expect(counter85).toBeInTheDocument();
      expect(counter85).toHaveAttribute('data-suffix', '%');
      expect(counter70).toBeInTheDocument();
      expect(counter70).toHaveAttribute('data-suffix', '%');
    });
  });

  describe('Progress Display', () => {
    it('should display progress labels and values', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      // Check for progress labels
      expect(screen.getByText('Strategy Completion')).toBeInTheDocument();
      expect(screen.getByText('Analysis Progress')).toBeInTheDocument();

      // Check for progress values with percentage
      expect(screen.getByText('85%')).toBeInTheDocument();
      expect(screen.getByText('70%')).toBeInTheDocument();
    });

    it('should render progress bars with correct delays', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const progressBars = screen.getAllByTestId('animated-progress');
      
      // First card should have delay 0, second card delay 0.2
      const firstProgress = progressBars[0];
      const secondProgress = progressBars[1];

      expect(firstProgress).toHaveAttribute('data-delay', '0');
      expect(secondProgress).toHaveAttribute('data-delay', '0.2');
    });
  });

  describe('Badge Display', () => {
    it('should render badges with correct styling', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const badges = screen.getAllByText(/Strategy|Planning|Implementation|Research|Analysis|Development|Custom|Solutions|Education|Training|Certification|Workshops|Hands-on/);
      expect(badges.length).toBeGreaterThan(0);

      // Check that badges have proper styling
      badges.forEach(badge => {
        expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-md', 'border', 'px-2.5', 'py-0.5', 'text-xs', 'font-semibold', 'transition-colors', 'focus:outline-none', 'focus:ring-2', 'focus:ring-ring', 'focus:ring-offset-2', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground');
      });
    });

    it('should handle cards with no badges', () => {
      const tabsWithNoBadges = [
        {
          value: 'test',
          label: 'Test Tab',
          cards: [
            {
              icon: '🧪',
              title: 'Test Card',
              description: 'Test description',
              content: 'Test content',
              progress: { label: 'Test Progress', value: 50 },
              badges: [], // Empty badges array
            },
          ],
        },
      ];

      render(<ServiceTabsInteractive tabs={tabsWithNoBadges} />);

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      // Should not render any badge-related elements
      expect(screen.queryByText('Test Progress')).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('should have proper responsive grid classes', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const staggerContainer = screen.getByTestId('stagger-container');
      expect(staggerContainer).toHaveClass('grid', 'gap-8', 'md:grid-cols-2');
    });

    it('should have proper tab content spacing', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const tabContent = screen.getByRole('tabpanel', { name: 'AI Consulting' });
      expect(tabContent).toHaveClass('space-y-6', 'mt-8');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tabs array', () => {
      render(<ServiceTabsInteractive tabs={[]} />);

      // Should not crash and should render empty tabs list
      const tabsList = screen.getByRole('tablist');
      expect(tabsList).toBeInTheDocument();
      expect(tabsList.children).toHaveLength(0);
    });

    it('should handle tabs with empty cards array', () => {
      const tabsWithEmptyCards = [
        {
          value: 'empty',
          label: 'Empty Tab',
          cards: [],
        },
      ];

      render(<ServiceTabsInteractive tabs={tabsWithEmptyCards} />);

      expect(screen.getByText('Empty Tab')).toBeInTheDocument();
      const tabContent = screen.getByRole('tabpanel', { name: 'Empty Tab' });
      expect(tabContent).toBeInTheDocument();
    });

    it('should handle invalid defaultTab gracefully', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} defaultTab="invalid-tab" />);

      // Should default to first tab
      const firstTab = screen.getByRole('tab', { name: 'AI Consulting' });
      expect(firstTab).toHaveAttribute('data-state', 'active');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for tabs', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const tabsList = screen.getByRole('tablist');
      expect(tabsList).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);

      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('data-state');
      });
    });

    it('should have proper tabpanel associations', () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const tabpanels = screen.getAllByRole('tabpanel');
      expect(tabpanels).toHaveLength(3);

      tabpanels.forEach(panel => {
        expect(panel).toHaveAttribute('data-state');
      });
    });

    it('should support keyboard navigation', async () => {
      render(<ServiceTabsInteractive tabs={mockTabs} />);

      const firstTab = screen.getByRole('tab', { name: 'AI Consulting' });
      const secondTab = screen.getByRole('tab', { name: 'AI Development' });

      // Focus first tab
      firstTab.focus();
      expect(document.activeElement).toBe(firstTab);

      // Use arrow key to navigate (this would be handled by the underlying Tabs component)
      await user.keyboard('{ArrowRight}');
      // The actual keyboard navigation behavior depends on the Radix UI Tabs implementation
    });
  });
});
