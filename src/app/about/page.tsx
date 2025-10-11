import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generatePageMetadata, generatePersonStructuredData } from "@/lib/seo";

// Animation Components
import {
  FadeInUp,
  StaggerContainer,
  FloatingCard,
} from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";
import { CallToAction } from "@/components/CallToAction";

export const metadata = generatePageMetadata("about");

export default function AboutPage() {
  const personStructuredData = generatePersonStructuredData();

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      {/* Hero Section */}
      <Hero
        badgeText="Leading AI Consulting Firm • Portugal"
        title="Expert AI Research & Responsible AI Development"
        description="Founded by AI expert David Belo with 15+ years of AI research experience. Our mission: delivering responsible AI consulting services and healthcare AI solutions that serve organizations ethically across Portugal and Europe."
      />

      {/* Company Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  SAFE AI [4U] was founded on the conviction that artificial
                  intelligence must serve humanity with conscience and
                  responsibility. Our journey began with a simple yet powerful
                  realization: the world needs AI solutions that prioritize
                  human welfare, ethical implementation, and societal benefit
                  over pure technological advancement.
                </p>
                <blockquote className="text-xl italic font-medium text-primary border-l-4 border-primary pl-6 mx-auto max-w-2xl">
                  &ldquo;We should stop playing with AI and use it with
                  conscience.&rdquo;
                </blockquote>
                <p className="text-muted-foreground">
                  This philosophy drives everything we do, from our research and
                  development to our consulting services and educational
                  programs. We believe that responsible AI implementation is not
                  just an option—it&apos;s an imperative for creating a better
                  future for all.
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎯 Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To create a future where artificial intelligence serves as
                      a force for good, enhancing human capabilities while
                      preserving human dignity and values. We envision AI
                      systems that are transparent, fair, and beneficial across
                      healthcare, education, and society—always developed and
                      deployed with conscience and responsibility.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🌟 Our Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2">
                      <li>
                        • <strong>Conscience:</strong> Every AI solution we
                        create is developed with moral awareness and human
                        welfare as the primary consideration
                      </li>
                      <li>
                        • <strong>Responsibility:</strong> We take full
                        accountability for the impact and implications of our AI
                        systems
                      </li>
                      <li>
                        • <strong>Transparency:</strong> Open, honest
                        communication about our methods, limitations, and
                        decision-making processes
                      </li>
                      <li>
                        • <strong>Human-Centricity:</strong> AI should augment
                        and empower humans, never replace or diminish human
                        value
                      </li>
                      <li>
                        • <strong>Education:</strong> Sharing knowledge and
                        empowering others to implement AI responsibly and
                        ethically
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Leadership */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Leadership</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Meet the visionaries driving our mission to create responsible
                AI solutions
              </p>
            </div>
          </FadeInUp>

          <FloatingCard delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <Card className="text-center p-8">
                <CardContent className="space-y-6">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage
                      src="https://safe-ai-4u.eu/wp-content/uploads/2023/10/Untitled-7-1-768x768.png"
                      alt="David Belo"
                    />
                    <AvatarFallback className="text-2xl">DB</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">David Belo</h3>
                    <p className="text-muted-foreground mb-4">Founder & CEO</p>
                    <blockquote className="text-lg italic mb-6">
                      &ldquo;We should stop playing with AI and use it with
                      conscience.&rdquo;
                    </blockquote>
                    <p className="text-muted-foreground">
                      Visionary leader with over 15 years of experience in AI
                      research, ethical technology development, and responsible
                      AI implementation. David holds a PhD in Computer Science
                      with specialization in artificial intelligence systems and
                      has dedicated his career to ensuring AI serves humanity
                      with conscience and responsibility.
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>Expertise:</strong> AI Ethics, Machine Learning,
                        Healthcare AI, Educational Technology
                      </p>
                      <p>
                        <strong>Focus Areas:</strong> Responsible AI
                        Development, AI Safety, Human-Centered Design
                      </p>
                      <p>
                        <strong>Mission:</strong> Bridging the gap between
                        cutting-edge AI technology and ethical implementation
                        across healthcare, education, and society
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <a
                      href="https://www.linkedin.com/in/djdasilva/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect on LinkedIn
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Our Approach */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Our Approach</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  How we ensure every AI solution we create is safe,
                  responsible, and beneficial
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-3">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🔬 Research-Driven
                    </CardTitle>
                    <CardDescription>
                      Evidence-based development methodology
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Every solution is built on rigorous research,
                      peer-reviewed methodologies, and continuous validation to
                      ensure effectiveness and safety.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      👥 Human-Centered
                    </CardTitle>
                    <CardDescription>
                      People-first design philosophy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our AI solutions are designed to augment human
                      capabilities, not replace them, ensuring technology serves
                      people&apos;s needs.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🔐 Ethics-First
                    </CardTitle>
                    <CardDescription>
                      Responsible AI implementation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive ethical frameworks and bias detection ensure
                      our AI solutions are fair, transparent, and beneficial for
                      all.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Partnerships */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">
                  Collaboration & Community
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Building connections and contributing to the responsible AI
                  ecosystem through research, education, and ethical practice
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Research & Development</CardTitle>
                    <CardDescription>
                      Contributing to responsible AI research and development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • Ongoing research in AI ethics and safety frameworks
                      </li>
                      <li>
                        • Development of responsible AI implementation
                        methodologies
                      </li>
                      <li>
                        • Contributing to open-source AI safety initiatives
                      </li>
                      <li>
                        • Participating in AI ethics and governance discussions
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Network</CardTitle>
                    <CardDescription>
                      Engaging with the broader AI and technology community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • Active participation in AI ethics and safety
                        conferences
                      </li>
                      <li>
                        • Collaboration with healthcare technology innovators
                      </li>
                      <li>
                        • Engagement with educational technology communities
                      </li>
                      <li>• Professional consulting and advisory services</li>
                    </ul>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Join Our Mission"
        description="Whether you're looking to implement AI solutions, learn about responsible AI, or partner with us, we'd love to hear from you."
        primaryButton={{
          text: "Get in Touch",
          href: "/contact",
          variant: "default",
        }}
        secondaryButton={{
          text: "Explore Services",
          href: "/services",
          variant: "outline",
        }}
      />
    </div>
  );
}
