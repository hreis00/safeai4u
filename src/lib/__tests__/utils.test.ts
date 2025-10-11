import '@testing-library/jest-dom';
import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-4 py-2', 'bg-blue-500', 'text-white');
    expect(result).toBe('px-4 py-2 bg-blue-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    );

    expect(result).toBe('base-class active-class');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'valid-class');
    expect(result).toBe('base-class valid-class');
  });

  it('should merge conflicting Tailwind classes correctly', () => {
    // Tailwind-merge should resolve conflicts by keeping the last one
    const result = cn('px-4', 'px-8', 'py-2');
    expect(result).toBe('px-8 py-2');
  });

  it('should handle objects with boolean values', () => {
    const result = cn({
      'px-4': true,
      'py-2': false,
      'bg-blue-500': true,
    });
    expect(result).toBe('px-4 bg-blue-500');
  });

  it('should return empty string for no input', () => {
    expect(cn()).toBe('');
  });
});
