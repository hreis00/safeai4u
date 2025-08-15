"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FadeInUp } from "@/components/animations/FadeInUp";

interface ServiceInquiryFormProps {
  className?: string;
  defaultService?: string;
}

export function ServiceInquiryForm({
  className = "",
  defaultService,
}: ServiceInquiryFormProps) {
  const [formData, setFormData] = useState({
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={e => handleInputChange("company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="service">Service of Interest *</Label>
              <Select
                value={formData.service}
                onValueChange={value => handleInputChange("service", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
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
            </div>

            {/* Project Details */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget</Label>
                <Select
                  value={formData.budget}
                  onValueChange={value => handleInputChange("budget", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Desired Timeline</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={value => handleInputChange("timeline", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="flexible">Flexible timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="message">Project Description *</Label>
              <Textarea
                id="message"
                placeholder="Please describe your project, goals, challenges, and any specific requirements..."
                value={formData.message}
                onChange={e => handleInputChange("message", e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consultation"
                  checked={formData.consultation}
                  onCheckedChange={checked =>
                    handleInputChange("consultation", checked as boolean)
                  }
                />
                <Label htmlFor="consultation" className="text-sm">
                  I would like to schedule a free consultation call
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={checked =>
                    handleInputChange("newsletter", checked as boolean)
                  }
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for AI insights and updates
                </Label>
              </div>
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
        </CardContent>
      </Card>
    </FadeInUp>
  );
}
