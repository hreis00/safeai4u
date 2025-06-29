import { Card, CardContent } from "@/components/ui/card";

// Animation Components
import {
  FadeInUp,
  StaggerContainer,
  FloatingCard,
  AnimatedCounter,
} from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { Testimonials } from "@/components/ui/testimonials";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Responsible AI Solutions"
        title="SAFE AI [4U]"
        description="Empowering healthcare, education, and ethical technology with responsible AI solutions that prioritize safety, innovation, and social consciousness."
        primaryButton={{
          text: "Explore Our Services",
          href: "/services",
        }}
        secondaryButton={{
          text: "Get in Touch",
          href: "/contact",
        }}
      />

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <StaggerContainer>
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Trusted Globally</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Our AI solutions are making a real impact across industries and
                communities worldwide
              </p>
            </div>
          </FadeInUp>

          <div className="grid gap-8 md:grid-cols-4">
            <FloatingCard delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={50} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Healthcare Institutions
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.2}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={10000} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Students Trained
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.3}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={200} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Communities Reached
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={95} suffix="%" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Satisfaction Rate
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </StaggerContainer>
      </section>

      {/* Services Overview */}
      <ServiceShowcase
        title="Our Three Pillars"
        description="Comprehensive AI solutions designed to transform industries and empower minds with responsible innovation"
        background="default"
        columns={3}
        items={[
          {
            icon: "❤️",
            title: "SAI [4Health]",
            description: "Revolutionary Healthcare AI",
            content:
              "Cutting-edge AI solutions transforming healthcare delivery, enhancing diagnostics, and enabling personalized treatment plans that save lives and improve outcomes.",
            features: [
              "AI-powered medical imaging analysis",
              "Personalized treatment recommendations",
              "Clinical decision support systems",
            ],
            buttonText: "Explore Healthcare AI",
            buttonHref: "/services/health",
          },
          {
            icon: "🧠",
            title: "SAI [4Mind]",
            description: "Empowering Through Education",
            content:
              "Comprehensive educational AI programs and interactive workshops designed to equip individuals and organizations with the skills needed for the AI-powered future.",
            features: [
              "Interactive AI learning platforms",
              "Professional certification programs",
              "Hands-on workshops and training",
            ],
            buttonText: "Discover AI Education",
            buttonHref: "/services/mind",
          },
          {
            icon: "🛡️",
            title: "SAI [4Trust]",
            description: "Responsible AI for All",
            content:
              "Ethical AI implementation that harmonizes innovation with social consciousness, ensuring technology serves humanity responsibly and creates a more inclusive world.",
            features: [
              "AI ethics and governance frameworks",
              "Bias detection and mitigation tools",
              "Responsible AI certification programs",
            ],
            buttonText: "Learn About Ethics",
            buttonHref: "/services/trust",
          },
        ]}
      />

      {/* Featured Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <Testimonials
          title="What Our Partners Say"
          description="Trusted by leading organizations across healthcare, education, and technology"
          testimonials={[
            {
              quote:
                "Safe AI 4U's healthcare solutions have revolutionized our diagnostic capabilities. The accuracy improvements and patient outcomes speak for themselves.",
              author: "Dr. Sarah Chen",
              role: "Chief Medical Officer",
              organization: "MedTech Solutions",
              initials: "SC",
            },
            {
              quote:
                "The educational programs from Safe AI 4U have transformed our curriculum. Students are now equipped with practical, industry-relevant AI skills.",
              author: "Prof. James Mitchell",
              role: "Director of AI Studies",
              organization: "Tech University",
              initials: "JM",
            },
            {
              quote:
                "Safe AI 4U sets the gold standard for responsible AI development. Their ethics framework should be adopted industry-wide.",
              author: "Dr. Rebecca Chen",
              role: "AI Ethics Researcher",
              organization: "Stanford",
              initials: "RC",
            },
          ]}
        />
      </section>

      {/* Why Choose Us */}
      <ServiceShowcase
        title="Why Choose Safe AI 4U?"
        description="We combine cutting-edge technology with unwavering commitment to safety, ethics, and social responsibility"
        items={[
          {
            title: "Safety First",
            description:
              "Every solution undergoes rigorous safety testing and validation",
          },
          {
            title: "Expert Team",
            description:
              "Leading researchers and practitioners in AI, ethics, and domain expertise",
          },
          {
            title: "Human-Centered",
            description:
              "Technology designed to augment human capabilities, not replace them",
          },
          {
            title: "Proven Results",
            description:
              "Track record of successful implementations across industries",
          },
        ]}
        columns={2}
      />

      {/* CTA Section */}
      <CallToAction
        title="Ready to Transform with Responsible AI?"
        description="Join the thousands of organizations and individuals who trust Safe AI 4U to guide their AI journey with safety, ethics, and innovation"
        primaryButton={{
          text: "Start Your AI Journey",
          href: "/contact",
          variant: "default",
        }}
        secondaryButton={{
          text: "Explore All Services",
          href: "/services",
          variant: "outline",
        }}
      />
    </div>
  );
}
