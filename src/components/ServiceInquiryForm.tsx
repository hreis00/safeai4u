"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { BaseComponentProps, FormValidationResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FadeInUp } from "@/components/animations/FadeInUp";
import toast from "react-hot-toast";
import { APIError, logError } from "@/lib/errors";
import { submitForm } from "@/lib/api-client";

// Zod validation schema
const serviceInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your project"),
  newsletter: z.boolean(),
  consultation: z.boolean(),
});

type ServiceInquiryFormData = z.infer<typeof serviceInquirySchema>;

interface ServiceInquiryFormProps extends BaseComponentProps {
  defaultService?: string;
  onSubmit?: (data: ServiceInquiryFormData) => Promise<void>;
  onValidationChange?: (result: FormValidationResult) => void;
}

export function ServiceInquiryForm({
  className = "",
  defaultService,
}: ServiceInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ServiceInquiryFormData>({
    resolver: zodResolver(serviceInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: defaultService || "",
      budget: "",
      timeline: "",
      message: "",
      newsletter: false,
      consultation: false,
    },
  });

  const onSubmit = async (data: ServiceInquiryFormData) => {
    setIsSubmitting(true);

    try {
      // Submit form to API endpoint
      const response = await submitForm('/api/contact', data);
      
      console.log("Form submitted successfully:", response.data);
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Type-safe access to response data
      const responseData = response.data as { message?: string };
      toast.success(responseData.message || "Thank you! We'll respond within 24 hours.");
    } catch (error) {
      logError(error, { 
        formData: data, 
        component: 'ServiceInquiryForm',
        action: 'form_submission'
      });
      
      setIsSubmitting(false);
      
      // Show user-friendly error message
      if (error instanceof APIError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (submitted) {
    return (
      <FadeInUp className={className}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <CardTitle>Thank You for Your Inquiry!</CardTitle>
            <CardDescription>
              We&apos;ve received your service inquiry and will respond within
              24 hours. If you requested a consultation, we&apos;ll send you a
              calendar link to schedule your free session.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      </FadeInUp>
    );
  }

  return (
    <FadeInUp className={className}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Get Started with SAFE AI [4U]</CardTitle>
          <CardDescription>
            Tell us about your project and we&apos;ll provide a customized
            proposal within 48 hours. All consultations are free and
            confidential.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service Selection */}
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service of Interest *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ai-consulting">
                          AI Consulting & Strategy
                        </SelectItem>
                        <SelectItem value="ai-development">
                          AI Development & Implementation
                        </SelectItem>
                        <SelectItem value="education-training">
                          AI Education & Training
                        </SelectItem>
                        <SelectItem value="multiple">Multiple Services</SelectItem>
                        <SelectItem value="not-sure">
                          Not Sure - Need Guidance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Project Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Budget</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-10k">Under €10,000</SelectItem>
                          <SelectItem value="10k-25k">€10,000 - €25,000</SelectItem>
                          <SelectItem value="25k-50k">€25,000 - €50,000</SelectItem>
                          <SelectItem value="50k-100k">€50,000 - €100,000</SelectItem>
                          <SelectItem value="over-100k">Over €100,000</SelectItem>
                          <SelectItem value="flexible">
                            Flexible/To be determined
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Timeline</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asap">As soon as possible</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="3-months">Within 3 months</SelectItem>
                          <SelectItem value="6-months">Within 6 months</SelectItem>
                          <SelectItem value="flexible">Flexible timeline</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Description */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your project, goals, challenges, and any specific requirements..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkboxes */}
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="consultation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I would like to schedule a free consultation call
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Subscribe to our newsletter for AI insights and updates
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>

              {/* Privacy Notice */}
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our privacy policy. We will
                never share your information and will only use it to respond to
                your inquiry and provide relevant updates if requested.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </FadeInUp>
  );
}
