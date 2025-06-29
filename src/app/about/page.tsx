import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Animation Components
import {
  FadeInUp,
  StaggerContainer,
  FloatingCard,
} from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "About Us - SAFE AI [4U]",
  description:
    "Learn about our mission to provide safe, responsible AI solutions for everyone.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="About SAFE AI [4U]"
        title="Our Mission"
        description="To create a future where artificial intelligence serves humanity responsibly, ethically, and equitably across healthcare, education, and society."
      />

      {/* Company Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  Founded on the principle that AI should enhance human
                  potential while maintaining the highest ethical standards.
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
                      To be the leading force in responsible AI development,
                      creating solutions that not only advance technology but
                      also promote social good, equity, and human welfare across
                      all sectors of society.
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
                        • <strong>Responsibility:</strong> Every AI solution we
                        create prioritizes human welfare
                      </li>
                      <li>
                        • <strong>Transparency:</strong> Open communication
                        about our methods and decisions
                      </li>
                      <li>
                        • <strong>Innovation:</strong> Pushing boundaries while
                        maintaining ethical standards
                      </li>
                      <li>
                        • <strong>Education:</strong> Empowering others to use
                        AI responsibly
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
                      research and ethical technology development. PhD in
                      Computer Science with specialization in responsible AI
                      systems.
                    </p>
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
                <h2 className="text-3xl font-bold">Strategic Partnerships</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Collaborating with leading organizations to drive responsible
                  AI adoption
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2">
              <FloatingCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>Research Collaborations</CardTitle>
                    <CardDescription>
                      Academic and research institution partnerships
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        • Joint research projects with leading universities
                      </li>
                      <li>• AI safety and ethics research initiatives</li>
                      <li>• Open-source contributions to AI community</li>
                      <li>• Peer-reviewed publication collaborations</li>
                    </ul>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Alliances</CardTitle>
                    <CardDescription>
                      Strategic partnerships with leading organizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Healthcare technology integration</li>
                      <li>• Space agency medical support programs</li>
                      <li>• Corporate AI ethics consulting</li>
                      <li>• Educational institution partnerships</li>
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
