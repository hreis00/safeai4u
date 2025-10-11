import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '../Hero';

// Mock animation components
jest.mock('../animations', () => ({
  FadeInUp: ({ children, delay }: any) => (
    <div data-testid="fade-in-up" data-delay={delay}>
      {children}
    </div>
  ),
  PulsingBadge: ({ children }: any) => (
    <div data-testid="pulsing-badge">
      {children}
    </div>
  ),
}));

// Mock HeroAnimations component
jest.mock('../HeroAnimations', () => ({
  HeroAnimations: ({ primaryButton, secondaryButton }: any) => (
    <div data-testid="hero-animations">
      <div data-testid="primary-button">{primaryButton?.text || 'none'}</div>
      <div data-testid="secondary-button">{secondaryButton?.text || 'none'}</div>
    </div>
  ),
}));

describe('Hero', () => {
  const defaultProps = {
    badgeText: 'New Feature',
    title: 'Welcome to SAFE AI [4U]',
    description: 'Responsible AI solutions for healthcare and education',
  };

  describe('Component Rendering', () => {
    it('should render with required props', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.getByText('New Feature')).toBeInTheDocument();
      expect(screen.getByText('Welcome to SAFE AI [4U]')).toBeInTheDocument();
      expect(screen.getByText('Responsible AI solutions for healthcare and education')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(<Hero {...defaultProps} className="custom-class" />);

      const section = screen.getByRole('region', { hidden: true });
      expect(section).toHaveClass('custom-class');
    });

    it('should render with proper section structure', () => {
      render(<Hero {...defaultProps} />);

      const section = screen.getByRole('region', { hidden: true });
      expect(section).toHaveClass('container', 'mx-auto', 'px-4', 'py-16', 'relative', 'z-10');
    });

    it('should render with proper content wrapper', () => {
      render(<Hero {...defaultProps} />);

      const contentWrapper = screen.getByText('Welcome to SAFE AI [4U]').closest('div');
      expect(contentWrapper).toHaveClass('max-w-4xl', 'mx-auto', 'text-center', 'space-y-6');
    });
  });

  describe('Content Display', () => {
    it('should display badge with correct styling', () => {
      render(<Hero {...defaultProps} />);

      const badge = screen.getByText('New Feature');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('text-sm');
    });

    it('should display title with correct styling', () => {
      render(<Hero {...defaultProps} />);

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Welcome to SAFE AI [4U]');
      expect(title).toHaveClass('text-4xl', 'font-bold', 'tracking-tight', 'sm:text-6xl');
    });

    it('should display description with correct styling', () => {
      render(<Hero {...defaultProps} />);

      const description = screen.getByText('Responsible AI solutions for healthcare and education');
      expect(description).toHaveClass('text-xl', 'text-muted-foreground');
    });
  });

  describe('Animation Integration', () => {
    it('should render FadeInUp animations with correct delays', () => {
      render(<Hero {...defaultProps} />);

      const fadeInUpElements = screen.getAllByTestId('fade-in-up');
      expect(fadeInUpElements).toHaveLength(4); // Main wrapper + badge + title + description

      // Check delays
      const badgeFadeIn = fadeInUpElements.find(el => el.getAttribute('data-delay') === '0.1');
      const titleFadeIn = fadeInUpElements.find(el => el.getAttribute('data-delay') === '0.2');
      const descriptionFadeIn = fadeInUpElements.find(el => el.getAttribute('data-delay') === '0.3');

      expect(badgeFadeIn).toBeInTheDocument();
      expect(titleFadeIn).toBeInTheDocument();
      expect(descriptionFadeIn).toBeInTheDocument();
    });

    it('should render PulsingBadge animation', () => {
      render(<Hero {...defaultProps} />);

      const pulsingBadge = screen.getByTestId('pulsing-badge');
      expect(pulsingBadge).toBeInTheDocument();
      expect(pulsingBadge).toContainElement(screen.getByText('New Feature'));
    });
  });

  describe('Button Integration', () => {
    it('should render HeroAnimations when primaryButton is provided', () => {
      const primaryButton = {
        text: 'Get Started',
        href: '/contact',
      };

      render(<Hero {...defaultProps} primaryButton={primaryButton} />);

      expect(screen.getByTestId('hero-animations')).toBeInTheDocument();
      expect(screen.getByTestId('primary-button')).toHaveTextContent('Get Started');
      expect(screen.getByTestId('secondary-button')).toHaveTextContent('none');
    });

    it('should render HeroAnimations when secondaryButton is provided', () => {
      const secondaryButton = {
        text: 'Learn More',
        href: '/about',
      };

      render(<Hero {...defaultProps} secondaryButton={secondaryButton} />);

      expect(screen.getByTestId('hero-animations')).toBeInTheDocument();
      expect(screen.getByTestId('primary-button')).toHaveTextContent('none');
      expect(screen.getByTestId('secondary-button')).toHaveTextContent('Learn More');
    });

    it('should render HeroAnimations when both buttons are provided', () => {
      const primaryButton = {
        text: 'Get Started',
        href: '/contact',
      };
      const secondaryButton = {
        text: 'Learn More',
        href: '/about',
      };

      render(<Hero {...defaultProps} primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      expect(screen.getByTestId('hero-animations')).toBeInTheDocument();
      expect(screen.getByTestId('primary-button')).toHaveTextContent('Get Started');
      expect(screen.getByTestId('secondary-button')).toHaveTextContent('Learn More');
    });

    it('should not render HeroAnimations when no buttons are provided', () => {
      render(<Hero {...defaultProps} />);

      expect(screen.queryByTestId('hero-animations')).not.toBeInTheDocument();
    });

    it('should not render HeroAnimations when buttons are undefined', () => {
      render(<Hero {...defaultProps} primaryButton={undefined} secondaryButton={undefined} />);

      expect(screen.queryByTestId('hero-animations')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<Hero {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Welcome to SAFE AI [4U]');
    });

    it('should have proper semantic structure', () => {
      render(<Hero {...defaultProps} />);

      const section = screen.getByRole('region', { hidden: true });
      expect(section).toBeInTheDocument();
    });

    it('should have proper text hierarchy', () => {
      render(<Hero {...defaultProps} />);

      // Badge should be visually distinct
      const badge = screen.getByText('New Feature');
      expect(badge).toBeInTheDocument();

      // Title should be the main heading
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();

      // Description should be supporting text
      const description = screen.getByText('Responsible AI solutions for healthcare and education');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing', () => {
      render(<Hero {...defaultProps} />);

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('text-4xl', 'sm:text-6xl');
    });

    it('should have proper spacing classes', () => {
      render(<Hero {...defaultProps} />);

      const contentWrapper = screen.getByText('Welcome to SAFE AI [4U]').closest('div');
      expect(contentWrapper).toHaveClass('space-y-6');
    });
  });

  describe('Props Validation', () => {
    it('should handle empty strings', () => {
      render(<Hero badgeText="" title="" description="" />);

      expect(screen.getByText('')).toBeInTheDocument();
    });

    it('should handle long text content', () => {
      const longTitle = 'This is a very long title that should still be displayed correctly in the hero section';
      const longDescription = 'This is a very long description that should still be displayed correctly in the hero section and should wrap properly on different screen sizes';

      render(<Hero {...defaultProps} title={longTitle} description={longDescription} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('should handle special characters in text', () => {
      const specialText = 'AI & Machine Learning: "Responsible" Development (2024)';

      render(<Hero {...defaultProps} title={specialText} />);

      expect(screen.getByText(specialText)).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have proper container structure', () => {
      render(<Hero {...defaultProps} />);

      const section = screen.getByRole('region', { hidden: true });
      expect(section).toHaveClass('container', 'mx-auto', 'px-4', 'py-16', 'relative', 'z-10');

      const contentWrapper = section.querySelector('.max-w-4xl.mx-auto.text-center.space-y-6');
      expect(contentWrapper).toBeInTheDocument();
    });

    it('should have proper z-index for layering', () => {
      render(<Hero {...defaultProps} />);

      const section = screen.getByRole('region', { hidden: true });
      expect(section).toHaveClass('relative', 'z-10');
    });
  });
});
