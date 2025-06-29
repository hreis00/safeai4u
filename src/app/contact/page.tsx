import { Metadata } from "next";
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

// Animation Components
import { FloatingCard, FadeInUp } from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contact Us - SAFE AI [4U]",
  description:
    "Get in touch with our team for AI consultations and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Contact Us"
        title="Let's Shape the Future of AI Together"
        description="Ready to explore responsible AI solutions? We're here to help you navigate the possibilities and implement ethical AI that drives real impact."
      />

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <FloatingCard delay={0.1}>
            <Card className="p-8">
              <CardHeader className="px-0">
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Tell us about your project and how we can help you implement
                  responsible AI solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      placeholder="Your company name (optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthcare">
                          Healthcare AI Solutions
                        </SelectItem>
                        <SelectItem value="education">
                          AI Education & Training
                        </SelectItem>
                        <SelectItem value="ethics">
                          AI Ethics Consulting
                        </SelectItem>
                        <SelectItem value="partnership">
                          Partnership Opportunity
                        </SelectItem>
                        <SelectItem value="research">
                          Research Collaboration
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, goals, and how we can help..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We typically respond within 24 hours. For urgent inquiries,
                    please call us directly.
                  </p>
                </form>
              </CardContent>
            </Card>
          </FloatingCard>

          {/* Contact Information */}
          <FloatingCard delay={0.2}>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📧 Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium">General Inquiries</div>
                    <div className="text-muted-foreground">
                      info@safe-ai-4u.eu
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Partnership Opportunities</div>
                    <div className="text-muted-foreground">
                      partnerships@safe-ai-4u.eu
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Technical Support</div>
                    <div className="text-muted-foreground">
                      support@safe-ai-4u.eu
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🏢 Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-muted-foreground">
                        9:00 - 18:00 CET
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-muted-foreground">
                        10:00 - 14:00 CET
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🌍 Global Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    While based in Portugal, we serve clients worldwide through
                    remote consultations and digital solutions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="font-medium">Headquarters</div>
                      <div className="text-muted-foreground">
                        Portugal, European Union
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Service Areas</div>
                      <div className="text-muted-foreground">
                        Global (Remote & On-site)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔐 Privacy & Ethics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    All communications are treated with strict confidentiality.
                    We adhere to GDPR and international privacy standards.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="mailto:ethics@safe-ai-4u.eu">
                      Contact Ethics Team
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Response Times */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold">What to Expect</h2>
              <p className="text-muted-foreground">
                Our commitment to responsive, professional communication
              </p>
            </div>
          </FadeInUp>

          <div className="grid gap-6 md:grid-cols-2">
            <FloatingCard delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    ⚡ Quick Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Initial response within 24 hours</li>
                    <li>• Detailed proposal within 48-72 hours</li>
                    <li>• Emergency support available</li>
                    <li>• Multilingual support (EN, PT, ES)</li>
                  </ul>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💼 Professional Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Free initial consultation</li>
                    <li>• Transparent pricing and timelines</li>
                    <li>• Regular milestone check-ins</li>
                    <li>• Ongoing support and maintenance</li>
                  </ul>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </div>
      </section>
    </div>
  );
}
