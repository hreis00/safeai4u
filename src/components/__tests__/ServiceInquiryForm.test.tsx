import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ServiceInquiryForm } from "../ServiceInquiryForm";
import { submitForm } from "@/lib/api-client";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("@/lib/api-client");
jest.mock("react-hot-toast");

const mockSubmitForm = submitForm as jest.MockedFunction<typeof submitForm>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe("ServiceInquiryForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockToast.success = jest.fn();
    mockToast.error = jest.fn();
  });

  describe("Form Rendering", () => {
    it("should render all form fields correctly", () => {
      render(<ServiceInquiryForm />);

      // Check form title and description
      expect(
        screen.getByText("Get Started with SAFE AI [4U]")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Tell us about your project/)
      ).toBeInTheDocument();

      // Check required fields
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/service of interest/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/project description/i)).toBeInTheDocument();

      // Check optional fields
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/estimated budget/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/desired timeline/i)).toBeInTheDocument();

      // Check checkboxes
      expect(
        screen.getByLabelText(/schedule a free consultation/i)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/subscribe to our newsletter/i)
      ).toBeInTheDocument();

      // Check submit button
      expect(
        screen.getByRole("button", { name: /submit inquiry/i })
      ).toBeInTheDocument();
    });

    it("should render with default service when provided", () => {
      render(<ServiceInquiryForm defaultService="ai-consulting" />);

      const serviceSelect = screen.getByLabelText(/service of interest/i);
      expect(serviceSelect).toBeInTheDocument();
    });

    it("should have proper accessibility attributes", () => {
      render(<ServiceInquiryForm />);

      // Check form accessibility
      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();

      // Check required field indicators
      const requiredFields = screen.getAllByText("*");
      expect(requiredFields.length).toBeGreaterThan(0);

      // Check field labels are properly associated
      const nameInput = screen.getByLabelText(/full name/i);
      expect(nameInput).toHaveAttribute("type", "text");

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute("type", "email");
    });
  });

  describe("Form Validation", () => {
    it("should show validation errors for empty required fields", async () => {
      render(<ServiceInquiryForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/name must be at least 2 characters/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
        expect(
          screen.getByText(/please select a service/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/please provide more details about your project/i)
        ).toBeInTheDocument();
      });
    });

    it("should validate email format", async () => {
      render(<ServiceInquiryForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, "invalid-email");

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it("should validate minimum name length", async () => {
      render(<ServiceInquiryForm />);

      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, "A");

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/name must be at least 2 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("should validate minimum message length", async () => {
      render(<ServiceInquiryForm />);

      const messageInput = screen.getByLabelText(/project description/i);
      await user.type(messageInput, "Short");

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please provide more details about your project/i)
        ).toBeInTheDocument();
      });
    });

    it("should clear validation errors when user corrects input", async () => {
      render(<ServiceInquiryForm />);

      // Submit with invalid data
      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/name must be at least 2 characters/i)
        ).toBeInTheDocument();
      });

      // Fix the name field
      const nameInput = screen.getByLabelText(/full name/i);
      await user.clear(nameInput);
      await user.type(nameInput, "John Doe");

      // Validation error should clear
      await waitFor(() => {
        expect(
          screen.queryByText(/name must be at least 2 characters/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Submission", () => {
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

    it("should submit form with valid data successfully", async () => {
      mockSubmitForm.mockResolvedValueOnce({
        data: { message: "Thank you! We'll respond within 24 hours." },
        status: 200,
        statusText: "OK",
        headers: new Headers(),
      });

      render(<ServiceInquiryForm />);

      // Fill form with valid data
      await user.type(screen.getByLabelText(/full name/i), validFormData.name);
      await user.type(
        screen.getByLabelText(/email address/i),
        validFormData.email
      );
      await user.type(screen.getByLabelText(/company/i), validFormData.company);
      await user.type(
        screen.getByLabelText(/phone number/i),
        validFormData.phone
      );

      // Select service
      const serviceSelect = screen.getByLabelText(/service of interest/i);
      await user.click(serviceSelect);
      await user.click(screen.getByText("AI Consulting & Strategy"));

      // Select budget
      const budgetSelect = screen.getByLabelText(/estimated budget/i);
      await user.click(budgetSelect);
      await user.click(screen.getByText("€10,000 - €25,000"));

      // Select timeline
      const timelineSelect = screen.getByLabelText(/desired timeline/i);
      await user.click(timelineSelect);
      await user.click(screen.getByText("Within 3 months"));

      await user.type(
        screen.getByLabelText(/project description/i),
        validFormData.message
      );

      // Check checkboxes
      await user.click(screen.getByLabelText(/schedule a free consultation/i));
      await user.click(screen.getByLabelText(/subscribe to our newsletter/i));

      // Submit form
      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmitForm).toHaveBeenCalledWith(
          "/api/contact",
          expect.objectContaining({
            name: validFormData.name,
            email: validFormData.email,
            company: validFormData.company,
            phone: validFormData.phone,
            service: validFormData.service,
            budget: validFormData.budget,
            timeline: validFormData.timeline,
            message: validFormData.message,
            newsletter: true,
            consultation: true,
          })
        );
      });

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          "Thank you! We'll respond within 24 hours."
        );
      });
    });

    it("should show success message after successful submission", async () => {
      mockSubmitForm.mockResolvedValueOnce({
        data: { message: "Thank you! We'll respond within 24 hours." },
        status: 200,
        statusText: "OK",
        headers: new Headers(),
      });

      render(<ServiceInquiryForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/full name/i), validFormData.name);
      await user.type(
        screen.getByLabelText(/email address/i),
        validFormData.email
      );
      await user.type(
        screen.getByLabelText(/project description/i),
        validFormData.message
      );

      const serviceSelect = screen.getByLabelText(/service of interest/i);
      await user.click(serviceSelect);
      await user.click(screen.getByText("AI Consulting & Strategy"));

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Thank You for Your Inquiry!")
        ).toBeInTheDocument();
        expect(
          screen.getByText(/We've received your service inquiry/)
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /submit another inquiry/i })
        ).toBeInTheDocument();
      });
    });

    it("should handle submission errors gracefully", async () => {
      const error = new Error("Network error");
      mockSubmitForm.mockRejectedValueOnce(error);

      render(<ServiceInquiryForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/full name/i), validFormData.name);
      await user.type(
        screen.getByLabelText(/email address/i),
        validFormData.email
      );
      await user.type(
        screen.getByLabelText(/project description/i),
        validFormData.message
      );

      const serviceSelect = screen.getByLabelText(/service of interest/i);
      await user.click(serviceSelect);
      await user.click(screen.getByText("AI Consulting & Strategy"));

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          "An unexpected error occurred. Please try again."
        );
      });
    });

    it("should disable submit button during submission", async () => {
      // Mock a delayed response
      mockSubmitForm.mockImplementationOnce(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  data: { message: "Success" },
                  status: 200,
                  statusText: "OK",
                  headers: new Headers(),
                }),
              100
            )
          )
      );

      render(<ServiceInquiryForm />);

      // Fill form
      await user.type(screen.getByLabelText(/full name/i), validFormData.name);
      await user.type(
        screen.getByLabelText(/email address/i),
        validFormData.email
      );
      await user.type(
        screen.getByLabelText(/project description/i),
        validFormData.message
      );

      const serviceSelect = screen.getByLabelText(/service of interest/i);
      await user.click(serviceSelect);
      await user.click(screen.getByText("AI Consulting & Strategy"));

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      // Button should be disabled and show loading state
      expect(submitButton).toBeDisabled();
      expect(screen.getByText("Submitting...")).toBeInTheDocument();
    });

    it('should allow resubmitting after clicking "Submit Another Inquiry"', async () => {
      mockSubmitForm.mockResolvedValueOnce({
        data: { message: "Thank you! We'll respond within 24 hours." },
        status: 200,
        statusText: "OK",
        headers: new Headers(),
      });

      render(<ServiceInquiryForm />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/full name/i), validFormData.name);
      await user.type(
        screen.getByLabelText(/email address/i),
        validFormData.email
      );
      await user.type(
        screen.getByLabelText(/project description/i),
        validFormData.message
      );

      const serviceSelect = screen.getByLabelText(/service of interest/i);
      await user.click(serviceSelect);
      await user.click(screen.getByText("AI Consulting & Strategy"));

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Thank You for Your Inquiry!")
        ).toBeInTheDocument();
      });

      // Click "Submit Another Inquiry"
      const resubmitButton = screen.getByRole("button", {
        name: /submit another inquiry/i,
      });
      await user.click(resubmitButton);

      // Form should be reset and ready for new submission
      expect(
        screen.getByText("Get Started with SAFE AI [4U]")
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/full name/i)).toHaveValue("");
    });
  });

  describe("Form Interactions", () => {
    it("should handle checkbox interactions correctly", async () => {
      render(<ServiceInquiryForm />);

      const consultationCheckbox = screen.getByLabelText(
        /schedule a free consultation/i
      );
      const newsletterCheckbox = screen.getByLabelText(
        /subscribe to our newsletter/i
      );

      // Initially unchecked
      expect(consultationCheckbox).not.toBeChecked();
      expect(newsletterCheckbox).not.toBeChecked();

      // Check both checkboxes
      await user.click(consultationCheckbox);
      await user.click(newsletterCheckbox);

      expect(consultationCheckbox).toBeChecked();
      expect(newsletterCheckbox).toBeChecked();

      // Uncheck one
      await user.click(consultationCheckbox);
      expect(consultationCheckbox).not.toBeChecked();
      expect(newsletterCheckbox).toBeChecked();
    });

    it("should handle select dropdown interactions", async () => {
      render(<ServiceInquiryForm />);

      // Test service selection
      const serviceSelect = screen.getByLabelText(/service of interest/i);
      await user.click(serviceSelect);

      expect(screen.getByText("AI Consulting & Strategy")).toBeInTheDocument();
      expect(
        screen.getByText("AI Development & Implementation")
      ).toBeInTheDocument();
      expect(screen.getByText("AI Education & Training")).toBeInTheDocument();

      await user.click(screen.getByText("AI Development & Implementation"));

      // Test budget selection
      const budgetSelect = screen.getByLabelText(/estimated budget/i);
      await user.click(budgetSelect);

      expect(screen.getByText("Under €10,000")).toBeInTheDocument();
      expect(screen.getByText("Over €100,000")).toBeInTheDocument();

      await user.click(screen.getByText("€25,000 - €50,000"));
    });
  });

  describe("Privacy and Legal", () => {
    it("should display privacy notice", () => {
      render(<ServiceInquiryForm />);

      expect(
        screen.getByText(
          /By submitting this form, you agree to our privacy policy/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We will never share your information/)
      ).toBeInTheDocument();
    });
  });
});
