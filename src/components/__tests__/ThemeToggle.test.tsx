import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeToggle } from '../ThemeToggle';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock window.matchMedia
const mockMatchMedia = jest.fn();

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Reset localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    // Reset document classes
    document.documentElement.className = '';
  });

  it('should render with light theme by default', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    render(<ThemeToggle />);
    
    expect(screen.getByLabelText(/switch to dark/i)).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });

  it('should toggle theme when clicked', async () => {
    const user = userEvent.setup();
    
    mockLocalStorage.getItem.mockReturnValue('light');
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    render(<ThemeToggle />);
    
    const toggleButton = screen.getByLabelText(/switch to dark/i);
    await user.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  it('should have proper accessibility attributes', () => {
    mockLocalStorage.getItem.mockReturnValue('light');
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', expect.stringMatching(/switch to (dark|light)/i));
  });
});
