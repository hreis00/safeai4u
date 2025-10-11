import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

// Mock console methods to avoid noise in tests
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("/api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset Math.random to avoid flaky tests
    jest.spyOn(Math, "random").mockReturnValue(0.1); // Always return 0.1 (less than 0.2)
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Successful Form Submission", () => {
    it("should handle valid contact form submission", async () => {
      const validFormData = {
        name: "John Doe",
        email: "john@example.com",
        company: "Test Company",
        phone: "+1234567890",
        service: "ai-consulting",
        budget: "10k-25k",
        timeline: "3-months",
        message: "I need help with AI implementation for my business.",
        newsletter: true,
        consultation: true,
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(validFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        success: true,
        message: "Thank you for your inquiry. We'll respond within 24 hours.",
        id: expect.stringMatching(/^inquiry-\d+$/),
      });
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "Contact form submission:",
        validFormData
      );
    });

    it("should handle minimal valid form data", async () => {
      const minimalFormData = {
        name: "Jane Smith",
        email: "jane@example.com",
        service: "ai-development",
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(minimalFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain("Thank you for your inquiry");
    });

    it("should set default values for optional boolean fields", async () => {
      const formDataWithoutBooleans = {
        name: "Test User",
        email: "test@example.com",
        service: "education-training",
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(formDataWithoutBooleans),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe("Validation Errors", () => {
    it("should return 400 for missing required fields", async () => {
      const invalidFormData = {
        name: "John",
        // Missing email, service, and message
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(invalidFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "email",
            message: "Invalid email address",
          }),
          expect.objectContaining({
            field: "service",
            message: "Please select a service",
          }),
          expect.objectContaining({
            field: "message",
            message: "Please provide more details about your project",
          }),
        ])
      );
    });

    it("should return 400 for invalid email format", async () => {
      const invalidFormData = {
        name: "John Doe",
        email: "invalid-email",
        service: "ai-consulting",
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(invalidFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "email",
            message: "Invalid email address",
          }),
        ])
      );
    });

    it("should return 400 for name too short", async () => {
      const invalidFormData = {
        name: "A", // Too short
        email: "john@example.com",
        service: "ai-consulting",
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(invalidFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "name",
            message: "Name must be at least 2 characters",
          }),
        ])
      );
    });

    it("should return 400 for message too short", async () => {
      const invalidFormData = {
        name: "John Doe",
        email: "john@example.com",
        service: "ai-consulting",
        message: "Short", // Too short
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(invalidFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "message",
            message: "Please provide more details about your project",
          }),
        ])
      );
    });

    it("should return 400 for empty service selection", async () => {
      const invalidFormData = {
        name: "John Doe",
        email: "john@example.com",
        service: "", // Empty service
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(invalidFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Validation failed");
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "service",
            message: "Please select a service",
          }),
        ])
      );
    });
  });

  describe("Error Handling", () => {
    it("should return 500 for random server errors (testing mode)", async () => {
      // Mock Math.random to return value >= 0.2 to trigger error
      jest.spyOn(Math, "random").mockReturnValue(0.5);

      const validFormData = {
        name: "John Doe",
        email: "john@example.com",
        service: "ai-consulting",
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(validFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error occurred");
    });

    it("should return 500 for malformed JSON", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: "invalid json",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
      expect(mockConsoleError).toHaveBeenCalled();
    });

    it("should return 500 for unexpected errors", async () => {
      // Mock request.json to throw an error
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: "{}",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Mock the json method to throw an error
      jest
        .spyOn(request, "json")
        .mockRejectedValueOnce(new Error("Unexpected error"));

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe("Internal server error");
      expect(mockConsoleError).toHaveBeenCalled();
    });
  });

  describe("Request Processing", () => {
    it("should simulate processing delay", async () => {
      const validFormData = {
        name: "John Doe",
        email: "john@example.com",
        service: "ai-consulting",
        message: "This is a detailed project description with enough content.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(validFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const startTime = Date.now();
      const response = await POST(request);
      const endTime = Date.now();

      expect(response.status).toBe(200);
      // Should have at least 1000ms delay (simulated processing)
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
    });

    it("should generate unique inquiry IDs", async () => {
      const validFormData = {
        name: "John Doe",
        email: "john@example.com",
        service: "ai-consulting",
        message: "This is a detailed project description with enough content.",
      };

      const request1 = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(validFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const request2 = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify(validFormData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response1 = await POST(request1);
      const response2 = await POST(request2);

      const data1 = await response1.json();
      const data2 = await response2.json();

      expect(data1.id).not.toBe(data2.id);
      expect(data1.id).toMatch(/^inquiry-\d+$/);
      expect(data2.id).toMatch(/^inquiry-\d+$/);
    });
  });

  describe("Service Options Validation", () => {
    const validBaseData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a detailed project description with enough content.",
    };

    it("should accept ai-consulting service", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validBaseData, service: "ai-consulting" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });

    it("should accept ai-development service", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validBaseData, service: "ai-development" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });

    it("should accept education-training service", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({
          ...validBaseData,
          service: "education-training",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });

    it("should accept multiple services option", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validBaseData, service: "multiple" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });

    it("should accept not-sure service option", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validBaseData, service: "not-sure" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
    });
  });
});
