import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
        badgeText="Pioneers in Responsible AI • Portugal"
        title="Shaping the Future of Technology with Conscience"
        description="Founded by AI expert David Belo, we are pioneers in developing responsible AI solutions that shape the future of technology. Our mission: creating innovative and ethical AI solutions that positively impact healthcare, education, and society across Portugal and Europe."
      />

      {/* Company Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  We are pioneers in developing responsible AI solutions that
                  are shaping the future of technology. With our cutting-edge
                  expertise, we harness the power of artificial intelligence to
                  create innovative and ethical solutions that positively impact
                  various industries. Embracing responsible AI practices, we
                  ensure that our solutions are not only powerful but also safe,
                  unbiased, and inclusive.
                </p>
                <blockquote className="text-xl italic font-medium text-primary border-l-4 border-primary pl-6 mx-auto max-w-2xl">
                  &ldquo;We should stop playing with AI and use it with
                  conscience.&rdquo;
                </blockquote>
                <p className="text-muted-foreground">
                  This philosophy drives everything we do as we lead the way
                  towards a more responsible and sustainable AI future, making a
                  difference in the world through cutting-edge technology. We
                  believe that responsible AI implementation is not just an
                  option—it&apos;s an imperative for creating a better future
                  for all.
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
                  <Avatar className="mx-auto h-24 w-24">
                    <AvatarImage
                      src="https://safe-ai-4u.eu/wp-content/uploads/2023/10/Untitled-7-1-768x768.png"
                      alt="David Belo - AI Research Expert and SAFE AI [4U] Founder"
                      priority={true}
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
        title="Join Us in This Journey of Transformation"
        description="Ready to shape a better future together? Let's harmonize innovation with social consciousness and create AI solutions that serve humanity with conscience and responsibility."
        primaryButton={{
          text: "Shape the Future",
          href: "/contact",
          variant: "default",
        }}
        secondaryButton={{
          text: "Explore Our Solutions",
          href: "/services",
          variant: "outline",
        }}
      />
    </div>
  );
}
