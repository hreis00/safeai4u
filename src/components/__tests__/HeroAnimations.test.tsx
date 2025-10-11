import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { HeroAnimations } from '../HeroAnimations';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, ...props }: any) => (
      <div 
        data-testid="motion-div"
        data-while-hover={JSON.stringify(whileHover)}
        data-while-tap={JSON.stringify(whileTap)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

// Mock FadeInUp animation component
jest.mock('../animations/FadeInUp', () => ({
  FadeInUp: ({ children, delay }: any) => (
    <div data-testid="fade-in-up" data-delay={delay}>
      {children}
    </div>
  ),
}));

describe('HeroAnimations', () => {
  const user = userEvent.setup();

  describe('Component Rendering', () => {
    it('should render with no buttons', () => {
      render(<HeroAnimations />);

      expect(screen.getByTestId('fade-in-up')).toBeInTheDocument();
      expect(screen.getByTestId('fade-in-up')).toHaveAttribute('data-delay', '0.4');
      
      const buttonContainer = screen.getByTestId('fade-in-up').querySelector('.flex.flex-col.gap-4.sm\\:flex-row.sm\\:justify-center');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer?.children).toHaveLength(0);
    });

    it('should render with primary button only', () => {
      const primaryButton = {
        text: 'Get Started',
        href: '/contact',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '/contact');
    });

    it('should render with secondary button only', () => {
      const secondaryButton = {
        text: 'Learn More',
        href: '/about',
      };

      render(<HeroAnimations secondaryButton={secondaryButton} />);

      expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Learn More' })).toHaveAttribute('href', '/about');
    });

    it('should render with both buttons', () => {
      const primaryButton = {
        text: 'Get Started',
        href: '/contact',
      };
      const secondaryButton = {
        text: 'Learn More',
        href: '/about',
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument();
    });
  });

  describe('Button Types and Styling', () => {
    it('should render primary button with correct styling', () => {
      const primaryButton = {
        text: 'Primary Button',
        href: '/primary',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const primaryLink = screen.getByRole('link', { name: 'Primary Button' });
      expect(primaryLink).toHaveClass('inline-flex', 'items-center', 'justify-center', 'whitespace-nowrap', 'rounded-md', 'text-sm', 'font-medium', 'ring-offset-background', 'transition-colors', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50', 'bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'h-11', 'px-8');
    });

    it('should render secondary button with correct styling', () => {
      const secondaryButton = {
        text: 'Secondary Button',
        href: '/secondary',
      };

      render(<HeroAnimations secondaryButton={secondaryButton} />);

      const secondaryLink = screen.getByRole('link', { name: 'Secondary Button' });
      expect(secondaryLink).toHaveClass('inline-flex', 'items-center', 'justify-center', 'whitespace-nowrap', 'rounded-md', 'text-sm', 'font-medium', 'ring-offset-background', 'transition-colors', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50', 'border', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground', 'h-11', 'px-8');
    });
  });

  describe('Button Actions', () => {
    it('should handle primary button with href', () => {
      const primaryButton = {
        text: 'Navigate',
        href: '/services',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const link = screen.getByRole('link', { name: 'Navigate' });
      expect(link).toHaveAttribute('href', '/services');
    });

    it('should handle primary button with onClick', () => {
      const mockOnClick = jest.fn();
      const primaryButton = {
        text: 'Click Me',
        onClick: mockOnClick,
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should handle secondary button with href', () => {
      const secondaryButton = {
        text: 'Learn More',
        href: '/about',
      };

      render(<HeroAnimations secondaryButton={secondaryButton} />);

      const link = screen.getByRole('link', { name: 'Learn More' });
      expect(link).toHaveAttribute('href', '/about');
    });

    it('should handle secondary button with onClick', () => {
      const mockOnClick = jest.fn();
      const secondaryButton = {
        text: 'Contact Us',
        onClick: mockOnClick,
      };

      render(<HeroAnimations secondaryButton={secondaryButton} />);

      const button = screen.getByRole('button', { name: 'Contact Us' });
      expect(button).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Animation Integration', () => {
    it('should render FadeInUp with correct delay', () => {
      render(<HeroAnimations />);

      const fadeInUp = screen.getByTestId('fade-in-up');
      expect(fadeInUp).toHaveAttribute('data-delay', '0.4');
    });

    it('should render motion.div elements for buttons', () => {
      const primaryButton = {
        text: 'Primary',
        href: '/primary',
      };
      const secondaryButton = {
        text: 'Secondary',
        href: '/secondary',
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs).toHaveLength(2);
    });

    it('should have correct hover animations', () => {
      const primaryButton = {
        text: 'Primary',
        href: '/primary',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const motionDiv = screen.getByTestId('motion-div');
      const whileHover = JSON.parse(motionDiv.getAttribute('data-while-hover') || '{}');
      
      expect(whileHover).toEqual({
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 },
      });
    });

    it('should have correct tap animations', () => {
      const primaryButton = {
        text: 'Primary',
        href: '/primary',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const motionDiv = screen.getByTestId('motion-div');
      const whileTap = JSON.parse(motionDiv.getAttribute('data-while-tap') || '{}');
      
      expect(whileTap).toEqual({ scale: 0.95 });
    });
  });

  describe('Layout and Responsive Design', () => {
    it('should have proper flex layout classes', () => {
      render(<HeroAnimations />);

      const buttonContainer = screen.getByTestId('fade-in-up').querySelector('.flex.flex-col.gap-4.sm\\:flex-row.sm\\:justify-center');
      expect(buttonContainer).toHaveClass('flex', 'flex-col', 'gap-4', 'sm:flex-row', 'sm:justify-center');
    });

    it('should render buttons in correct order', () => {
      const primaryButton = {
        text: 'Primary',
        href: '/primary',
      };
      const secondaryButton = {
        text: 'Secondary',
        href: '/secondary',
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      const buttonContainer = screen.getByTestId('fade-in-up').querySelector('.flex.flex-col.gap-4.sm\\:flex-row.sm\\:justify-center');
      const buttons = buttonContainer?.children;
      
      expect(buttons).toHaveLength(2);
      expect(buttons?.[0]).toContainElement(screen.getByRole('link', { name: 'Primary' }));
      expect(buttons?.[1]).toContainElement(screen.getByRole('link', { name: 'Secondary' }));
    });
  });

  describe('User Interactions', () => {
    it('should handle button clicks with user-event', async () => {
      const mockOnClick = jest.fn();
      const primaryButton = {
        text: 'Click Me',
        onClick: mockOnClick,
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const button = screen.getByRole('button', { name: 'Click Me' });
      await user.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple button clicks', async () => {
      const mockPrimaryClick = jest.fn();
      const mockSecondaryClick = jest.fn();
      
      const primaryButton = {
        text: 'Primary',
        onClick: mockPrimaryClick,
      };
      const secondaryButton = {
        text: 'Secondary',
        onClick: mockSecondaryClick,
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      const primaryBtn = screen.getByRole('button', { name: 'Primary' });
      const secondaryBtn = screen.getByRole('button', { name: 'Secondary' });

      await user.click(primaryBtn);
      await user.click(secondaryBtn);
      await user.click(primaryBtn);
      
      expect(mockPrimaryClick).toHaveBeenCalledTimes(2);
      expect(mockSecondaryClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty button text', () => {
      const primaryButton = {
        text: '',
        href: '/empty',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/empty');
      expect(link).toHaveTextContent('');
    });

    it('should handle undefined button props', () => {
      render(<HeroAnimations primaryButton={undefined} secondaryButton={undefined} />);

      const buttonContainer = screen.getByTestId('fade-in-up').querySelector('.flex.flex-col.gap-4.sm\\:flex-row.sm\\:justify-center');
      expect(buttonContainer?.children).toHaveLength(0);
    });

    it('should handle buttons with both href and onClick', () => {
      const mockOnClick = jest.fn();
      const primaryButton = {
        text: 'Both Actions',
        href: '/href',
        onClick: mockOnClick,
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      // Should prioritize href over onClick
      const link = screen.getByRole('link', { name: 'Both Actions' });
      expect(link).toHaveAttribute('href', '/href');
      expect(screen.queryByRole('button', { name: 'Both Actions' })).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles', () => {
      const primaryButton = {
        text: 'Primary Action',
        onClick: jest.fn(),
      };
      const secondaryButton = {
        text: 'Secondary Action',
        onClick: jest.fn(),
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      expect(screen.getByRole('button', { name: 'Primary Action' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Secondary Action' })).toBeInTheDocument();
    });

    it('should have proper link roles', () => {
      const primaryButton = {
        text: 'Primary Link',
        href: '/primary',
      };
      const secondaryButton = {
        text: 'Secondary Link',
        href: '/secondary',
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      expect(screen.getByRole('link', { name: 'Primary Link' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Secondary Link' })).toBeInTheDocument();
    });

    it('should have proper focus management', () => {
      const primaryButton = {
        text: 'Focusable Button',
        onClick: jest.fn(),
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const button = screen.getByRole('button', { name: 'Focusable Button' });
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2');
    });
  });

  describe('Button Size and Styling', () => {
    it('should have large button size', () => {
      const primaryButton = {
        text: 'Large Button',
        href: '/large',
      };

      render(<HeroAnimations primaryButton={primaryButton} />);

      const link = screen.getByRole('link', { name: 'Large Button' });
      expect(link).toHaveClass('h-11', 'px-8');
    });

    it('should have proper button variants', () => {
      const primaryButton = {
        text: 'Primary',
        href: '/primary',
      };
      const secondaryButton = {
        text: 'Secondary',
        href: '/secondary',
      };

      render(<HeroAnimations primaryButton={primaryButton} secondaryButton={secondaryButton} />);

      const primaryLink = screen.getByRole('link', { name: 'Primary' });
      const secondaryLink = screen.getByRole('link', { name: 'Secondary' });

      expect(primaryLink).toHaveClass('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90');
      expect(secondaryLink).toHaveClass('border', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground');
    });
  });
});
