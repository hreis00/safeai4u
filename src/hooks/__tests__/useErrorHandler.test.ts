import { renderHook, act } from '@testing-library/react';
import { useErrorHandler, useFormErrorHandler, useAPIErrorHandler } from '../useErrorHandler';
import { logError, getErrorMessage, isAppError } from '@/lib/errors';
import toast from 'react-hot-toast';

// Mock dependencies
jest.mock('@/lib/errors', () => ({
  logError: jest.fn(),
  getErrorMessage: jest.fn(),
  isAppError: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

const mockLogError = logError as jest.MockedFunction<typeof logError>;
const mockGetErrorMessage = getErrorMessage as jest.MockedFunction<typeof getErrorMessage>;
const mockIsAppError = isAppError as jest.MockedFunction<typeof isAppError>;
const mockToastError = toast.error as jest.MockedFunction<typeof toast.error>;

describe('useErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetErrorMessage.mockReturnValue('Test error message');
    mockIsAppError.mockReturnValue(false);
  });

  describe('Basic Error Handling', () => {
    it('should handle errors with default options', () => {
      const { result } = renderHook(() => useErrorHandler());
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(mockLogError).toHaveBeenCalledWith(testError, {});
      expect(mockGetErrorMessage).toHaveBeenCalledWith(testError);
      expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Test error message');
    });

    it('should handle errors with custom context', () => {
      const { result } = renderHook(() => useErrorHandler({
        context: { component: 'TestComponent', action: 'test' }
      }));
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError, { userId: '123' });
      });

      expect(mockLogError).toHaveBeenCalledWith(testError, {
        component: 'TestComponent',
        action: 'test',
        userId: '123',
      });
    });

    it('should handle AppError with custom title', () => {
      mockIsAppError.mockReturnValue(true);
      const { result } = renderHook(() => useErrorHandler());
      const testError = new Error('App error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(mockToastError).toHaveBeenCalledWith('Error: Test error message');
    });

    it('should handle regular Error with default title', () => {
      mockIsAppError.mockReturnValue(false);
      const { result } = renderHook(() => useErrorHandler());
      const testError = new Error('Regular error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Test error message');
    });
  });

  describe('Options Configuration', () => {
    it('should not show toast when showToast is false', () => {
      const { result } = renderHook(() => useErrorHandler({ showToast: false }));
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(mockLogError).toHaveBeenCalledWith(testError, {});
      expect(mockToastError).not.toHaveBeenCalled();
    });

    it('should not log error when logError is false', () => {
      const { result } = renderHook(() => useErrorHandler({ logError: false }));
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Test error message');
    });

    it('should use custom context from options', () => {
      const customContext = { component: 'CustomComponent', feature: 'test' };
      const { result } = renderHook(() => useErrorHandler({ context: customContext }));
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError);
      });

      expect(mockLogError).toHaveBeenCalledWith(testError, customContext);
    });

    it('should merge additional context with options context', () => {
      const optionsContext = { component: 'TestComponent' };
      const additionalContext = { action: 'submit', userId: '123' };
      const { result } = renderHook(() => useErrorHandler({ context: optionsContext }));
      const testError = new Error('Test error');

      act(() => {
        result.current.handleError(testError, additionalContext);
      });

      expect(mockLogError).toHaveBeenCalledWith(testError, {
        component: 'TestComponent',
        action: 'submit',
        userId: '123',
      });
    });
  });

  describe('Async Error Handling', () => {
    it('should handle successful async operations', async () => {
      const { result } = renderHook(() => useErrorHandler());
      const asyncFn = jest.fn().mockResolvedValue('success');

      let asyncResult;
      await act(async () => {
        asyncResult = await result.current.handleAsyncError(asyncFn);
      });

      expect(asyncResult).toBe('success');
      expect(asyncFn).toHaveBeenCalled();
      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockToastError).not.toHaveBeenCalled();
    });

    it('should handle failed async operations with fallback', async () => {
      const { result } = renderHook(() => useErrorHandler());
      const asyncFn = jest.fn().mockRejectedValue(new Error('Async error'));

      let asyncResult;
      await act(async () => {
        asyncResult = await result.current.handleAsyncError(asyncFn, 'fallback');
      });

      expect(asyncResult).toBe('fallback');
      expect(mockLogError).toHaveBeenCalledWith(expect.any(Error), {});
      expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Test error message');
    });

    it('should handle failed async operations without fallback', async () => {
      const { result } = renderHook(() => useErrorHandler());
      const asyncFn = jest.fn().mockRejectedValue(new Error('Async error'));

      let asyncResult;
      await act(async () => {
        asyncResult = await result.current.handleAsyncError(asyncFn);
      });

      expect(asyncResult).toBeUndefined();
      expect(mockLogError).toHaveBeenCalledWith(expect.any(Error), {});
      expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Test error message');
    });

    it('should pass additional context to async error handling', async () => {
      const { result } = renderHook(() => useErrorHandler());
      const asyncFn = jest.fn().mockRejectedValue(new Error('Async error'));
      const additionalContext = { operation: 'fetchData', endpoint: '/api/test' };

      await act(async () => {
        await result.current.handleAsyncError(asyncFn, 'fallback', additionalContext);
      });

      expect(mockLogError).toHaveBeenCalledWith(expect.any(Error), additionalContext);
    });
  });

  describe('Hook Stability', () => {
    it('should maintain stable function references', () => {
      const { result, rerender } = renderHook(() => useErrorHandler());

      const firstHandleError = result.current.handleError;
      const firstHandleAsyncError = result.current.handleAsyncError;

      rerender();

      expect(result.current.handleError).toBe(firstHandleError);
      expect(result.current.handleAsyncError).toBe(firstHandleAsyncError);
    });

    it('should update function references when dependencies change', () => {
      const { result, rerender } = renderHook(
        ({ context }) => useErrorHandler({ context }),
        { initialProps: { context: { component: 'Component1' } } }
      );

      const firstHandleError = result.current.handleError;

      rerender({ context: { component: 'Component2' } });

      expect(result.current.handleError).not.toBe(firstHandleError);
    });
  });
});

describe('useFormErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetErrorMessage.mockReturnValue('Form error message');
    mockIsAppError.mockReturnValue(false);
  });

  it('should handle form errors with form context', () => {
    const { result } = renderHook(() => useFormErrorHandler());
    const testError = new Error('Form validation error');

    act(() => {
      result.current.handleFormError(testError);
    });

    expect(mockLogError).toHaveBeenCalledWith(testError, { component: 'form' });
    expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Form error message');
  });

  it('should handle form errors with form data', () => {
    const { result } = renderHook(() => useFormErrorHandler());
    const testError = new Error('Form submission error');
    const formData = { name: 'John', email: 'john@example.com' };

    act(() => {
      result.current.handleFormError(testError, formData);
    });

    expect(mockLogError).toHaveBeenCalledWith(testError, {
      component: 'form',
      formData,
    });
  });

  it('should maintain stable function reference', () => {
    const { result, rerender } = renderHook(() => useFormErrorHandler());

    const firstHandleFormError = result.current.handleFormError;

    rerender();

    expect(result.current.handleFormError).toBe(firstHandleFormError);
  });
});

describe('useAPIErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetErrorMessage.mockReturnValue('API error message');
    mockIsAppError.mockReturnValue(false);
  });

  it('should handle API errors with API context', () => {
    const { result } = renderHook(() => useAPIErrorHandler());
    const testError = new Error('API request failed');

    act(() => {
      result.current.handleAPIError(testError);
    });

    expect(mockLogError).toHaveBeenCalledWith(testError, { component: 'api' });
    expect(mockToastError).toHaveBeenCalledWith('Something went wrong: API error message');
  });

  it('should handle API errors with endpoint and method', () => {
    const { result } = renderHook(() => useAPIErrorHandler());
    const testError = new Error('API request failed');
    const endpoint = '/api/users';
    const method = 'POST';
    const requestData = { name: 'John' };

    act(() => {
      result.current.handleAPIError(testError, endpoint, method, requestData);
    });

    expect(mockLogError).toHaveBeenCalledWith(testError, {
      component: 'api',
      endpoint,
      method,
      requestData,
    });
  });

  it('should handle API errors with only endpoint', () => {
    const { result } = renderHook(() => useAPIErrorHandler());
    const testError = new Error('API request failed');
    const endpoint = '/api/users';

    act(() => {
      result.current.handleAPIError(testError, endpoint);
    });

    expect(mockLogError).toHaveBeenCalledWith(testError, {
      component: 'api',
      endpoint,
      method: undefined,
      requestData: undefined,
    });
  });

  it('should maintain stable function reference', () => {
    const { result, rerender } = renderHook(() => useAPIErrorHandler());

    const firstHandleAPIError = result.current.handleAPIError;

    rerender();

    expect(result.current.handleAPIError).toBe(firstHandleAPIError);
  });
});

describe('Error Message Handling', () => {
  it('should handle different error types', () => {
    const { result } = renderHook(() => useErrorHandler());

    // Test with Error object
    const errorObj = new Error('Error object');
    mockGetErrorMessage.mockReturnValueOnce('Error object message');

    act(() => {
      result.current.handleError(errorObj);
    });

    expect(mockGetErrorMessage).toHaveBeenCalledWith(errorObj);
    expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Error object message');

    // Test with string error
    const stringError = 'String error';
    mockGetErrorMessage.mockReturnValueOnce('String error message');

    act(() => {
      result.current.handleError(stringError);
    });

    expect(mockGetErrorMessage).toHaveBeenCalledWith(stringError);
    expect(mockToastError).toHaveBeenCalledWith('Something went wrong: String error message');

    // Test with unknown error type
    const unknownError = { message: 'Unknown error type' };
    mockGetErrorMessage.mockReturnValueOnce('Unknown error message');

    act(() => {
      result.current.handleError(unknownError);
    });

    expect(mockGetErrorMessage).toHaveBeenCalledWith(unknownError);
    expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Unknown error message');
  });
});

describe('Integration with Error Types', () => {
  it('should work with AppError types', () => {
    const { result } = renderHook(() => useErrorHandler());
    const appError = new Error('App error');
    (appError as any).statusCode = 400;
    (appError as any).isOperational = true;

    mockIsAppError.mockReturnValue(true);
    mockGetErrorMessage.mockReturnValue('App error message');

    act(() => {
      result.current.handleError(appError);
    });

    expect(mockIsAppError).toHaveBeenCalledWith(appError);
    expect(mockToastError).toHaveBeenCalledWith('Error: App error message');
  });

  it('should work with regular Error types', () => {
    const { result } = renderHook(() => useErrorHandler());
    const regularError = new Error('Regular error');

    mockIsAppError.mockReturnValue(false);
    mockGetErrorMessage.mockReturnValue('Regular error message');

    act(() => {
      result.current.handleError(regularError);
    });

    expect(mockIsAppError).toHaveBeenCalledWith(regularError);
    expect(mockToastError).toHaveBeenCalledWith('Something went wrong: Regular error message');
  });
});
