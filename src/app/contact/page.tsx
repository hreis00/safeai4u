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
import { generatePageMetadata } from "@/lib/seo";

// Animation Components
import { FloatingCard, FadeInUp } from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";

export const metadata = generatePageMetadata("contact");

export default function ContactPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="AI Consulting Contact • Portugal & Europe"
        title="Contact Our AI Consulting Experts"
        description="Ready to implement responsible AI solutions? Contact our expert AI consulting team for healthcare AI projects, AI training programs, and strategic AI implementation services across Portugal and Europe."
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
                        <SelectItem value="ai-consulting">
                          AI Strategy & Consulting
                        </SelectItem>
                        <SelectItem value="healthcare-ai">
                          SAI [4Health] - Healthcare AI Solutions
                        </SelectItem>
                        <SelectItem value="ai-education">
                          SAI [4Mind] - AI Education & Training
                        </SelectItem>
                        <SelectItem value="responsible-ai">
                          SAI [4Trust] - Responsible AI Implementation
                        </SelectItem>
                        <SelectItem value="custom-development">
                          Custom AI Development
                        </SelectItem>
                        <SelectItem value="workshops">
                          Corporate Workshops & Training
                        </SelectItem>
                        <SelectItem value="partnership">
                          Business Partnership
                        </SelectItem>
                        <SelectItem value="research">
                          Research Collaboration
                        </SelectItem>
                        <SelectItem value="speaking">
                          Speaking Engagement
                        </SelectItem>
                        <SelectItem value="other">Other Inquiry</SelectItem>
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

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p className="text-center">
                      <strong>Response Time:</strong> We respond to all
                      inquiries within 24 hours during business days. Complex
                      project discussions may require 48-72 hours for detailed
                      proposals.
                    </p>

                    <div className="border-t pt-3 space-y-2">
                      <p className="text-xs">
                        <strong>Privacy Notice:</strong> Your information is
                        protected under GDPR and our strict privacy policy. We
                        never share personal data with third parties and use it
                        solely for responding to your inquiry.
                      </p>
                      <p className="text-xs">
                        By submitting this form, you consent to us contacting
                        you about your inquiry using the information provided.
                        You can unsubscribe at any time.
                      </p>
                    </div>
                  </div>
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
                      <a
                        href="mailto:info@safe-ai-4u.eu"
                        className="hover:text-primary transition-colors"
                      >
                        info@safe-ai-4u.eu
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Business Development</div>
                    <div className="text-muted-foreground">
                      <a
                        href="mailto:business@safe-ai-4u.eu"
                        className="hover:text-primary transition-colors"
                      >
                        business@safe-ai-4u.eu
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">AI Consulting</div>
                    <div className="text-muted-foreground">
                      <a
                        href="mailto:consulting@safe-ai-4u.eu"
                        className="hover:text-primary transition-colors"
                      >
                        consulting@safe-ai-4u.eu
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Education & Training</div>
                    <div className="text-muted-foreground">
                      <a
                        href="mailto:education@safe-ai-4u.eu"
                        className="hover:text-primary transition-colors"
                      >
                        education@safe-ai-4u.eu
                      </a>
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
                        9:00 - 18:00 WET/WEST
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-muted-foreground">
                        By appointment only
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                    <div className="mt-3 pt-2 border-t text-xs text-muted-foreground">
                      Portugal Time Zone (UTC+0/+1)
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
                    Based in Portugal, we serve clients across Europe, North
                    America, and globally through remote consultations and
                    digital AI solutions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="font-medium">Headquarters</div>
                      <div className="text-muted-foreground">
                        Portugal, European Union
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Primary Service Areas</div>
                      <div className="text-muted-foreground">
                        EU, UK, North America
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Delivery Methods</div>
                      <div className="text-muted-foreground">
                        Remote consultations, on-site workshops, hybrid projects
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔐 Privacy & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    All communications are treated with strict confidentiality
                    under NDA when required. We comply with GDPR, international
                    privacy standards, and ethical AI guidelines.
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <p>• ISO 27001 information security practices</p>
                    <p>• GDPR compliant data processing</p>
                    <p>• Ethical AI development standards</p>
                    <p>• Confidentiality agreements available</p>
                  </div>
                  <Button className="w-full" asChild>
                    <a href="mailto:privacy@safe-ai-4u.eu">
                      Privacy & Compliance Inquiries
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
                    <li>• Initial response within 24 hours (business days)</li>
                    <li>• Detailed proposals within 3-5 business days</li>
                    <li>• Free 30-minute consultation call</li>
                    <li>
                      • Multilingual support (English, Portuguese, Spanish)
                    </li>
                    <li>• Priority support for existing clients</li>
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
                    <li>• Complimentary initial consultation (30 min)</li>
                    <li>• Transparent pricing with no hidden fees</li>
                    <li>• Clear project timelines and milestones</li>
                    <li>• Post-project support and maintenance options</li>
                    <li>
                      • Flexible engagement models (project, retainer, hourly)
                    </li>
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
