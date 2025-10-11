import { Card, CardContent } from "@/components/ui/card";
import {
  generatePageMetadata,
  generateReviewStructuredData,
  generateFAQStructuredData,
} from "@/lib/seo";

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

export const metadata = generatePageMetadata("home");

export default function Home() {
  const reviewStructuredData = generateReviewStructuredData();
  const faqStructuredData = generateFAQStructuredData();

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      {/* Hero Section */}
      <Hero
        badgeText="RESPONSIBLE A.I. 4 ALL • Shaping the Future of Technology"
        title="Pioneers in Responsible AI Solutions"
        description="We are pioneers in developing responsible AI solutions that are shaping the future of technology. Embracing responsible AI practices, we ensure that our solutions are not only powerful but also safe, unbiased, and inclusive for healthcare, education, and society."
        primaryButton={{
          text: "Explore Our AI Solutions",
          href: "/services",
        }}
        secondaryButton={{
          text: "Join Our Mission",
          href: "/contact",
        }}
      />

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <StaggerContainer>
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold">
                Leading the Way in Responsible AI Development
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                With cutting-edge expertise, we harness the power of artificial
                intelligence to create innovative and ethical solutions that
                positively impact healthcare, education, and society across
                Portugal and throughout Europe
              </p>
            </div>
          </FadeInUp>

          <div className="grid gap-8 md:grid-cols-4">
            <FloatingCard delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={15} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Years of AI Research
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.2}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={500} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professionals Trained*
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.3}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={25} suffix="+" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Active Projects
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedCounter value={100} suffix="%" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ethical AI Commitment
                  </p>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>

          <FadeInUp delay={0.5}>
            <div className="text-center mt-8">
              <p className="text-xs text-muted-foreground">
                *Projected based on current training programs and workshops
              </p>
            </div>
          </FadeInUp>
        </StaggerContainer>
      </section>

      {/* Services Overview */}
      <ServiceShowcase
        title="Our Core AI Solutions"
        description="From healthcare innovation to educational empowerment and ethical AI development, we create solutions that serve humanity with conscience and responsibility"
        background="default"
        columns={3}
        items={[
          {
            icon: "❤️",
            title: "SAI [4Health]",
            description: "Solutions for Healthcare",
            content:
              "With our cutting-edge services, we open the door to a new era of medical possibilities. From enhancing diagnostics to personalized treatment plans, our AI solutions revolutionize healthcare delivery, optimize healthcare processes, and unlock medical insights that were once hidden.",
            features: [
              "Enhanced diagnostic accuracy",
              "Personalized treatment plans",
              "Healthcare delivery optimization",
            ],
            buttonText: "Explore Healthcare Solutions",
            buttonHref: "/services",
          },
          {
            icon: "🧠",
            title: "SAI [4Mind]",
            description: "Empowering Minds",
            content:
              "Unveil the wonders of AI with us! Our engaging teaching services will equip you with the skills and knowledge to conquer the boundless possibilities of Artificial Intelligence. Let's embark on this thrilling journey together and pave the way for a smarter future.",
            features: [
              "AI skills and knowledge development",
              "Professional training workshops",
              "Educational AI mastery programs",
            ],
            buttonText: "Join the AI Journey",
            buttonHref: "/workshops",
          },
          {
            icon: "🛡️",
            title: "SAI [4Trust]",
            description: "Responsible AI for All",
            content:
              "Step into the world of Responsible AI! Join us to explore the ethical side of technology and make a positive impact. Let's shape a better future together, harmonizing innovation with social consciousness. Embrace the power of AI with a conscience.",
            features: [
              "Ethical AI development",
              "Social consciousness integration",
              "Responsible AI frameworks",
            ],
            buttonText: "Discover Responsible AI",
            buttonHref: "/services",
          },
        ]}
      />

      {/* Featured Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <Testimonials
          title="Building Trust Through Collaboration"
          description="Working with partners across healthcare, education, and technology to advance responsible AI development"
          testimonials={[
            {
              quote:
                "The approach to responsible AI development at SAFE AI [4U] aligns perfectly with our commitment to ethical healthcare innovation. Their research-driven methodology ensures patient safety remains paramount.",
              author: "Dr. Maria Santos",
              role: "Healthcare AI Researcher",
              organization: "Medical Research Institute",
              initials: "MS",
            },
            {
              quote:
                "SAFE AI [4U]'s educational workshops have provided our team with essential knowledge about implementing AI ethically. The practical frameworks are invaluable for our development process.",
              author: "Alex Thompson",
              role: "Technology Director",
              organization: "Innovation Lab",
              initials: "AT",
            },
            {
              quote:
                "Working with SAFE AI [4U] has reinforced our belief that AI development must prioritize human welfare. Their 'AI with conscience' philosophy resonates with our organizational values.",
              author: "Dr. Elena Rodriguez",
              role: "Ethics Committee Chair",
              organization: "Research Foundation",
              initials: "ER",
            },
          ]}
        />
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            Testimonials represent collaborative relationships and shared values
            in responsible AI development
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeInUp>
            <blockquote className="text-2xl md:text-3xl font-medium text-primary italic">
              &ldquo;We should stop playing with AI and use it with
              conscience.&rdquo;
            </blockquote>
            <div className="text-muted-foreground mt-4">
              <p className="font-medium">David Belo</p>
              <p className="text-sm">Founder & CEO, SAFE AI [4U]</p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Why Choose Us */}
      <ServiceShowcase
        title="Why Choose SAFE AI [4U]?"
        description="Leading the transformation towards a more responsible and sustainable AI future, making a difference in the world through cutting-edge technology with conscience"
        items={[
          {
            title: "Pioneers in Responsible AI",
            description:
              "15+ years of AI research experience dedicated to developing responsible AI solutions that are safe, unbiased, and inclusive, ensuring technology serves humanity with conscience and responsibility",
          },
          {
            title: "Cutting-Edge Expertise",
            description:
              "We harness the power of artificial intelligence to create innovative and ethical solutions that positively impact healthcare, education, and society while maintaining the highest standards of responsible development",
          },
          {
            title: "Healthcare Innovation Focus",
            description:
              "Specialized in opening new medical possibilities through enhanced diagnostics, personalized treatment plans, and healthcare delivery optimization that unlocks previously hidden medical insights",
          },
          {
            title: "Educational Excellence",
            description:
              "Our engaging teaching services equip professionals with the skills and knowledge to conquer AI possibilities, embarking on a thrilling journey together to pave the way for a smarter future",
          },
        ]}
        columns={2}
      />

      {/* CTA Section */}
      <CallToAction
        title="Join Us in This Journey of Transformation"
        description="Ready to shape a better future together? Let's harmonize innovation with social consciousness and create AI solutions that serve humanity with conscience and responsibility."
        primaryButton={{
          text: "Start Your AI Journey",
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
