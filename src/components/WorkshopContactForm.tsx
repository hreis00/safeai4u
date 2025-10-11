"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { submitForm } from "@/lib/api-client";
import { interestOptions } from "@/lib/content/workshops-page-data";

// Zod validation schema
const workshopContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Please provide more details"),
  interests: z.array(z.string()).optional(),
});

type WorkshopContactFormData = z.infer<typeof workshopContactSchema>;

export function WorkshopContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const form = useForm<WorkshopContactFormData>({
    resolver: zodResolver(workshopContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      interests: [],
    },
  });

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const newInterests = checked
      ? [...selectedInterests, interestId]
      : selectedInterests.filter(id => id !== interestId);

    setSelectedInterests(newInterests);
    form.setValue("interests", newInterests);
  };

  const onSubmit = async (data: WorkshopContactFormData) => {
    setIsSubmitting(true);

    try {
      // Submit form to API endpoint
      const response = await submitForm("/api/contact", {
        ...data,
        interests: selectedInterests,
        formType: "workshop-inquiry",
      });

      console.log("Form submitted successfully:", response.data);

      setIsSubmitting(false);
      setSubmitted(true);

      // Type-safe access to response data
      const responseData = response.data as { message?: string };
      toast.success(
        responseData.message || "Thank you! We'll respond within 24 hours."
      );

      form.reset();
      setSelectedInterests([]);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      toast.error("Failed to send message. Please try again.");
    }
  };

  if (submitted) {
    return (
      <FadeInUp>
        <div className="text-center space-y-4 py-12">
          <div className="text-6xl">✓</div>
          <h3 className="text-2xl font-semibold text-primary">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground">
            Thank you for your interest. We&apos;ll get back to you within 24
            hours.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Send Another Message
          </Button>
        </div>
      </FadeInUp>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Your Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your Message <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your interests and what you'd like to learn..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interest Checkboxes */}
        <div className="space-y-4">
          <FormLabel>Please tell us your interests!</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interestOptions.map(interest => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox
                  id={interest.id}
                  checked={selectedInterests.includes(interest.id)}
                  onCheckedChange={checked =>
                    handleInterestChange(interest.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={interest.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {interest.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
