import {
  apiRequest,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  safeApiCall,
  submitForm,
} from '../api-client';
import {
  APIError,
  NetworkError,
  AuthError,
  NotFoundError,
  RateLimitError,
  logError,
} from '../errors';

// Mock the error utilities
jest.mock('../errors', () => ({
  ...jest.requireActual('../errors'),
  logError: jest.fn(),
}));

const mockLogError = logError as jest.MockedFunction<typeof logError>;

// Mock fetch globally with default implementation to prevent hanging
const mockFetch = jest.fn().mockRejectedValue(new Error('Fetch not mocked'));
global.fetch = mockFetch;

// Mock AbortController
const mockAbortController = {
  abort: jest.fn(),
  signal: {
    aborted: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  },
};
global.AbortController = jest.fn(() => mockAbortController) as any;

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    mockFetch.mockReset();
    global.fetch = mockFetch;
  });

  describe('apiRequest', () => {
    it('should make successful GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await apiRequest('/api/test');

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
      expect(result).toEqual({
        data: { data: 'test' },
        status: 200,
        statusText: 'OK',
        headers: mockResponse.headers,
      });
    });

    it('should make POST request with data', async () => {
      const mockResponse = {
        ok: true,
        status: 201,
        statusText: 'Created',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ id: 1 }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const testData = { name: 'test' };
      const result = await apiRequest('/api/test', {
        method: 'POST',
        body: JSON.stringify(testData),
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
      expect(result.data).toEqual({ id: 1 });
    });

    it('should handle timeout', async () => {
      // Mock fetch to reject with AbortError (simulating timeout)
      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';
      mockFetch.mockClear();
      mockFetch.mockRejectedValueOnce(abortError);

      await expect(apiRequest('/api/test', { timeout: 50 })).rejects.toThrow(NetworkError);
    });

    it('should retry on network errors', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      // First call fails, second succeeds
      mockFetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockResponse);

      const result = await apiRequest('/api/test', { retries: 1, retryDelay: 10 });

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ data: 'success' });
    });

    it('should not retry on client errors (4xx)', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ error: 'Bad request' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiRequest('/api/test')).rejects.toThrow(APIError);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle 401 authentication error', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ error: 'Unauthorized' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiRequest('/api/test')).rejects.toThrow(AuthError);
    });

    it('should handle 403 authorization error', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ error: 'Forbidden' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiRequest('/api/test')).rejects.toThrow(AuthError);
    });

    it('should handle 404 not found error', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ error: 'Not found' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiRequest('/api/test')).rejects.toThrow(NotFoundError);
    });

    it('should handle 429 rate limit error', async () => {
      const mockResponse = {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers([['Retry-After', '60']]),
        json: jest.fn().mockResolvedValue({ error: 'Rate limited' }),
      };
      mockFetch.mockClear();
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiRequest('/api/test')).rejects.toThrow(RateLimitError);
    });

    it('should handle network errors', async () => {
      mockFetch.mockClear();
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(apiRequest('/api/test')).rejects.toThrow(NetworkError);
    });

    it('should handle abort errors', async () => {
      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';
      mockFetch.mockClear();
      mockFetch.mockRejectedValueOnce(abortError);

      await expect(apiRequest('/api/test')).rejects.toThrow(NetworkError);
    });
  });

  describe('HTTP Method Helpers', () => {
    it('should make GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockClear();
      mockFetch.mockResolvedValue(mockResponse);

      await apiGet('/api/test');

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
    });

    it('should make POST request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockClear();
      mockFetch.mockResolvedValue(mockResponse);

      const testData = { name: 'test' };
      await apiPost('/api/test', testData);

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
    });

    it('should make PUT request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockClear();
      mockFetch.mockResolvedValue(mockResponse);

      const testData = { name: 'test' };
      await apiPut('/api/test', testData);

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'PUT',
        body: JSON.stringify(testData),
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
    });

    it('should make DELETE request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockClear();
      mockFetch.mockResolvedValue(mockResponse);

      await apiDelete('/api/test');

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
    });
  });

  describe('safeApiCall', () => {
    it('should return result on successful API call', async () => {
      const mockApiCall = jest.fn().mockResolvedValue('success');

      const result = await safeApiCall(mockApiCall);

      expect(result).toBe('success');
      expect(mockLogError).not.toHaveBeenCalled();
    });

    it('should return fallback on failed API call', async () => {
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API error'));

      const result = await safeApiCall(mockApiCall, 'fallback');

      expect(result).toBe('fallback');
      expect(mockLogError).toHaveBeenCalledWith(
        expect.any(Error),
        undefined
      );
    });

    it('should return undefined when no fallback provided', async () => {
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API error'));

      const result = await safeApiCall(mockApiCall);

      expect(result).toBeUndefined();
      expect(mockLogError).toHaveBeenCalled();
    });

    it('should pass context to logError', async () => {
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API error'));
      const context = { component: 'TestComponent' };

      await safeApiCall(mockApiCall, 'fallback', context);

      expect(mockLogError).toHaveBeenCalledWith(
        expect.any(Error),
        context
      );
    });
  });

  describe('submitForm', () => {
    it('should submit form data successfully', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ success: true }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const formData = { name: 'John', email: 'john@example.com' };
      const result = await submitForm('/api/contact', formData);

      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(Object),
      });
      expect(result.data).toEqual({ success: true });
    });

    it('should log error on form submission failure', async () => {
      const error = new Error('Form submission failed');
      // Clear any previous mocks and set up the rejection
      mockFetch.mockClear();
      mockFetch.mockRejectedValueOnce(error);

      const formData = { name: 'John', email: 'john@example.com' };

      await expect(submitForm('/api/contact', formData)).rejects.toThrow();

      expect(mockLogError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          formData,
          url: '/api/contact',
          action: 'form_submission',
        })
      );
    });
  });

  describe('Request Configuration', () => {
    it('should use custom timeout', async () => {
      // Mock fetch to reject with AbortError (simulating timeout)
      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';
      mockFetch.mockClear();
      mockFetch.mockRejectedValueOnce(abortError);

      await expect(apiRequest('/api/test', { timeout: 50 })).rejects.toThrow(NetworkError);
    });

    it('should use custom retry count', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(apiRequest('/api/test', { retries: 2 })).rejects.toThrow();
      expect(mockFetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should use custom retry delay', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      mockFetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(mockResponse);

      await apiRequest('/api/test', { retries: 1, retryDelay: 100 });

      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should pass through custom headers', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await apiRequest('/api/test', {
        headers: { 'Authorization': 'Bearer token' },
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
        },
        signal: expect.any(Object),
      });
    });
  });
});
