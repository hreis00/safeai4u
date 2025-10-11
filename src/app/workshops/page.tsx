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
import { generatePageMetadata, generateCourseStructuredData } from "@/lib/seo";

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

export const metadata = generatePageMetadata("workshops");

export default function WorkshopsPage() {
  const courseStructuredData = generateCourseStructuredData();

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData),
        }}
      />
      {/* Hero Section */}
      <Hero
        badgeText="Professional AI Training Programs • Europe"
        title="Expert AI Education & Responsible AI Training Workshops"
        description="Transform your AI expertise through professional AI training programs, hands-on workshops, and comprehensive AI education designed for healthcare professionals, technology teams, and business leaders across Europe."
        primaryButton={{
          text: "Register for AI Training",
          href: "/contact?subject=workshop",
        }}
        secondaryButton={{
          text: "Browse AI Programs",
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
                          <li>
                            • AI fundamentals: ML, Deep Learning, NLP basics
                          </li>
                          <li>• Healthcare AI applications and case studies</li>
                          <li>
                            • Python programming for AI (scikit-learn, pandas)
                          </li>
                          <li>
                            • Responsible AI frameworks and bias detection
                          </li>
                          <li>• Hands-on project: Build your first AI model</li>
                          <li>
                            • Industry applications in healthcare and education
                          </li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">
                            16 Hours (2 Days)
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Format</div>
                          <div className="text-muted-foreground">
                            In-Person/Online
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Group Size</div>
                          <div className="text-muted-foreground">
                            12-16 people
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Prerequisites</div>
                          <div className="text-muted-foreground">
                            Basic programming
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">€450</div>
                        <div className="text-sm text-muted-foreground line-through">
                          €550
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Early Bird
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Includes materials, certificate, and 30-day email
                        support
                      </div>
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
                          <li>
                            • Advanced ML: Neural Networks, Ensemble Methods
                          </li>
                          <li>
                            • Model deployment with Docker and cloud platforms
                          </li>
                          <li>
                            • Performance optimization and model monitoring
                          </li>
                          <li>• MLOps pipelines with CI/CD integration</li>
                          <li>
                            • Healthcare AI project: End-to-end development
                          </li>
                          <li>
                            • API development and model serving strategies
                          </li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">
                            24 Hours (3 Days)
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Format</div>
                          <div className="text-muted-foreground">
                            In-Person Only
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Group Size</div>
                          <div className="text-muted-foreground">
                            8-12 people
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Prerequisites</div>
                          <div className="text-muted-foreground">
                            Python + ML basics
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">€750</div>
                        <div className="text-sm text-muted-foreground line-through">
                          €900
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Includes 3-month mentorship and project portfolio review
                      </div>
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
                          <li>• EU AI Act compliance and implementation</li>
                          <li>
                            • Bias auditing tools and mitigation frameworks
                          </li>
                          <li>
                            • AI governance structures and risk assessment
                          </li>
                          <li>• Healthcare AI ethics and patient privacy</li>
                          <li>
                            • Strategic AI leadership and change management
                          </li>
                          <li>
                            • Building responsible AI culture in organizations
                          </li>
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">
                            16 Hours (2 Days)
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Format</div>
                          <div className="text-muted-foreground">
                            Executive Retreat
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Group Size</div>
                          <div className="text-muted-foreground">
                            6-10 executives
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Prerequisites</div>
                          <div className="text-muted-foreground">
                            Leadership role
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">€1,200</div>
                        <Badge variant="outline" className="text-xs">
                          Executive Level
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Includes executive certificate and 6-month advisory
                        access
                      </div>
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
                  Specialized AI training programs designed for healthcare
                  organizations, technology companies, and academic institutions
                  across Portugal and Europe
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Corporate Training</CardTitle>
                    <CardDescription>
                      Tailored AI training programs for healthcare
                      organizations, tech companies, and educational
                      institutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          Healthcare Organizations
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Medical AI implementation and ethics</li>
                          <li>• Patient data privacy and AI compliance</li>
                          <li>• Clinical decision support systems</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          Technology Companies
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Responsible AI development practices</li>
                          <li>• EU AI Act compliance strategies</li>
                          <li>• Bias detection and mitigation</li>
                        </ul>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground mb-3">
                        Starting from €2,500 per day (up to 20 participants)
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact?service=corporate-training">
                          Request Proposal
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Partnerships</CardTitle>
                    <CardDescription>
                      Collaborations with Portuguese and European universities
                      in AI education and research
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          Current Partnerships
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• University of Porto - AI Ethics curriculum</li>
                          <li>• NOVA University - Healthcare AI research</li>
                          <li>• IST Lisbon - Responsible AI frameworks</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          Partnership Opportunities
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Guest lectures on responsible AI</li>
                          <li>• Joint research projects in healthcare AI</li>
                          <li>• Student thesis supervision and mentorship</li>
                          <li>• Faculty development in AI ethics</li>
                        </ul>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground mb-3">
                        Special academic rates available for educational
                        institutions
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact?service=academic-partnership">
                          Explore Partnership
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

      {/* Success Stories */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Success Stories</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Professionals from healthcare, academia, and technology
                  sectors share how our responsible AI training has impacted
                  their organizations
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>DR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Dr. Ricardo Santos</div>
                        <div className="text-sm text-muted-foreground">
                          Medical Director, Hospital São João
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm italic">
                      &ldquo;SAFE AI [4U]&apos;s healthcare-focused AI training
                      helped our team understand how to implement responsible AI
                      solutions in clinical settings while maintaining patient
                      privacy and safety.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        AI Foundations
                      </Badge>
                      <span>•</span>
                      <span>Healthcare Sector</span>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>CP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Prof. Carla Pereira</div>
                        <div className="text-sm text-muted-foreground">
                          Computer Science, University of Porto
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm italic">
                      &ldquo;The Applied AI Development workshop provided our
                      research team with practical skills to implement ethical
                      AI solutions. The focus on responsible development aligns
                      perfectly with our academic values.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Applied AI
                      </Badge>
                      <span>•</span>
                      <span>Academic Partnership</span>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Miguel Sousa</div>
                        <div className="text-sm text-muted-foreground">
                          CTO, TechHealth Solutions
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-sm italic">
                      &ldquo;David Belo&apos;s Ethics & Leadership workshop
                      transformed how we approach AI governance. The practical
                      frameworks for EU AI Act compliance were invaluable for
                      our healthcare AI products.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Ethics & Leadership
                      </Badge>
                      <span>•</span>
                      <span>HealthTech Industry</span>
                    </div>
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
