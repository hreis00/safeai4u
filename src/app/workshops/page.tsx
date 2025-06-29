import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

// Animation Components
import {
  FadeInUp,
  StaggerContainer,
  FloatingCard,
} from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";
import { QuoteHighlight } from "@/components/QuoteHighlight";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "Workshops - SAFE AI [4U]",
  description:
    "Empowering minds through AI workshops and educational programs.",
};

export default function WorkshopsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Workshops & Training"
        title="Empowering Minds"
        description="Transform your understanding of AI through hands-on workshops, expert-led training, and comprehensive educational programs designed for all skill levels."
        primaryButton={{
          text: "Register Now",
          href: "/contact?subject=workshop",
        }}
        secondaryButton={{
          text: "Browse Programs",
          href: "#programs",
        }}
      />

      {/* Featured Quote */}
      <QuoteHighlight
        quote="We should stop playing with AI and use it with conscience."
        author="David Belo"
        role="Founder & CEO"
        organization="SAFE AI [4U]"
      />

      {/* Workshop Programs */}
      <section id="programs" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Workshop Programs</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  From beginners to advanced practitioners, our workshops
                  provide comprehensive AI education tailored to your learning
                  goals.
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-3">
              <FloatingCard delay={0.1}>
                {/* Foundations Workshop */}
                <Card id="foundations" className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Beginner</Badge>
                      <Badge variant="secondary">Most Popular</Badge>
                    </div>
                    <CardTitle className="text-xl">AI Foundations</CardTitle>
                    <CardDescription>
                      Perfect starting point for AI newcomers and professionals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          What You&apos;ll Learn:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Fundamentals of AI and Machine Learning</li>
                          <li>• Practical applications across industries</li>
                          <li>• Hands-on coding with Python</li>
                          <li>• Ethics and responsible AI principles</li>
                          <li>• Real-world case studies and projects</li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">2 Days</div>
                        </div>
                        <div>
                          <div className="font-medium">Format</div>
                          <div className="text-muted-foreground">Hybrid</div>
                        </div>
                        <div>
                          <div className="font-medium">Group Size</div>
                          <div className="text-muted-foreground">Max 20</div>
                        </div>
                        <div>
                          <div className="font-medium">Certificate</div>
                          <div className="text-muted-foreground">Included</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-2xl font-bold">€299</div>
                      <Button className="w-full" asChild>
                        <Link href="/contact?workshop=foundations">
                          Register Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* Applied AI Workshop */}
              <FloatingCard delay={0.2}>
                <Card id="applied" className="relative border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Intermediate</Badge>
                      <Badge>Recommended</Badge>
                    </div>
                    <CardTitle className="text-xl">
                      Applied AI Development
                    </CardTitle>
                    <CardDescription>
                      Build production-ready AI applications and solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          What You&apos;ll Learn:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Advanced machine learning algorithms</li>
                          <li>• Model deployment and scaling strategies</li>
                          <li>• Performance optimization techniques</li>
                          <li>• MLOps and production workflows</li>
                          <li>• Portfolio project development</li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">3 Days</div>
                        </div>
                        <div>
                          <div className="font-medium">Format</div>
                          <div className="text-muted-foreground">In-Person</div>
                        </div>
                        <div>
                          <div className="font-medium">Group Size</div>
                          <div className="text-muted-foreground">Max 15</div>
                        </div>
                        <div>
                          <div className="font-medium">Mentorship</div>
                          <div className="text-muted-foreground">3 Months</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-2xl font-bold">€499</div>
                      <Button className="w-full" asChild>
                        <Link href="/contact?workshop=applied">
                          Register Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              {/* Ethics & Leadership Workshop */}
              <FloatingCard delay={0.3}>
                <Card id="ethics" className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Advanced</Badge>
                      <Badge variant="outline">Executive</Badge>
                    </div>
                    <CardTitle className="text-xl">
                      AI Ethics & Leadership
                    </CardTitle>
                    <CardDescription>
                      Lead responsible AI initiatives in your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          What You&apos;ll Learn:
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Ethical AI frameworks and principles</li>
                          <li>• Bias detection and mitigation strategies</li>
                          <li>• AI governance and risk management</li>
                          <li>• Regulatory compliance and standards</li>
                          <li>• Leadership in AI transformation</li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">2 Days</div>
                        </div>
                        <div>
                          <div className="font-medium">Format</div>
                          <div className="text-muted-foreground">Executive</div>
                        </div>
                        <div>
                          <div className="font-medium">Group Size</div>
                          <div className="text-muted-foreground">Max 12</div>
                        </div>
                        <div>
                          <div className="font-medium">Certification</div>
                          <div className="text-muted-foreground">Advanced</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-2xl font-bold">€799</div>
                      <Button className="w-full" asChild>
                        <Link href="/contact?workshop=ethics">
                          Register Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Custom Training */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">
                  Custom Training Solutions
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Tailored training programs designed specifically for your
                  organization&apos;s needs
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Corporate Training</CardTitle>
                    <CardDescription>
                      On-site training programs for teams and organizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Customized curriculum based on your industry</li>
                      <li>• Expert trainers with real-world experience</li>
                      <li>• Flexible scheduling and delivery formats</li>
                      <li>• Post-training support and mentorship</li>
                      <li>• Progress tracking and assessment</li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact?service=corporate-training">
                        Get Quote
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Partnerships</CardTitle>
                    <CardDescription>
                      University and educational institution collaborations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Curriculum development and integration</li>
                      <li>• Guest lectures and workshops</li>
                      <li>• Research collaboration opportunities</li>
                      <li>• Student internship programs</li>
                      <li>• Faculty development workshops</li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact?service=academic-partnership">
                        Partner with Us
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Success Stories</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Hear from participants who have transformed their careers
                  through our workshops
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-3">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Maria Rodriguez</div>
                        <div className="text-sm text-muted-foreground">
                          Healthcare Manager
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm italic">
                      &ldquo;The AI Foundations workshop opened my eyes to the
                      possibilities of AI in healthcare. Now I&apos;m leading
                      our digital transformation initiative.&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">João Silva</div>
                        <div className="text-sm text-muted-foreground">
                          Software Developer
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm italic">
                      &ldquo;The Applied AI workshop gave me the practical
                      skills I needed to transition into machine learning
                      engineering.&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>AL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Ana Lopes</div>
                        <div className="text-sm text-muted-foreground">CTO</div>
                      </div>
                    </div>
                    <blockquote className="text-sm italic">
                      &ldquo;The Ethics & Leadership workshop helped me
                      establish responsible AI practices across our entire
                      organization.&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Start Your AI Journey?"
        description="Join hundreds of professionals who have transformed their careers through our comprehensive AI education programs."
        primaryButton={{
          text: "Register for Workshop",
          href: "/contact?subject=workshop-inquiry",
          variant: "default",
        }}
        secondaryButton={{
          text: "Learn More",
          href: "/services/mind",
          variant: "outline",
        }}
      />
    </div>
  );
}
