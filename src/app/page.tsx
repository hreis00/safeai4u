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
        badgeText="Responsible AI Consulting • Healthcare & Education"
        title="Expert AI Consulting Services for Ethical Implementation"
        description="Transform your organization with responsible AI solutions. Professional AI consulting, custom development, and comprehensive training programs for healthcare, education, and enterprise applications across Europe."
        primaryButton={{
          text: "Explore AI Consulting Services",
          href: "/services",
        }}
        secondaryButton={{
          text: "Schedule AI Consultation",
          href: "/contact",
        }}
      />

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <StaggerContainer>
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold">
                Proven Results in Responsible AI Implementation
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Our expertise in responsible AI consulting and healthcare AI
                solutions drives measurable impact across organizations
                implementing ethical AI practices in Portugal and throughout
                Europe
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
        title="Comprehensive AI Consulting Services for Responsible Implementation"
        description="Expert AI consulting, healthcare AI solutions, and professional AI education programs designed for ethical AI implementation across healthcare, education, and enterprise sectors"
        background="default"
        columns={3}
        items={[
          {
            icon: "❤️",
            title: "SAI [4Health]",
            description: "Healthcare AI Consulting & Development",
            content:
              "Specialized healthcare AI consulting services that enhance diagnostic accuracy, support clinical decision-making, and improve patient outcomes through responsible AI implementation with strict ethical standards and data privacy compliance.",
            features: [
              "Healthcare AI strategy consulting",
              "Medical AI system development",
              "Clinical AI implementation support",
            ],
            buttonText: "Explore Healthcare AI Services",
            buttonHref: "/services",
          },
          {
            icon: "🧠",
            title: "SAI [4Mind]",
            description: "Professional AI Education & Training",
            content:
              "Comprehensive AI education programs and professional training workshops designed to build responsible AI expertise. Our AI certification programs empower professionals with ethical AI development skills and practical implementation knowledge.",
            features: [
              "Professional AI training workshops",
              "Responsible AI certification programs",
              "Custom AI education curriculum",
            ],
            buttonText: "Discover AI Training Programs",
            buttonHref: "/workshops",
          },
          {
            icon: "🛡️",
            title: "SAI [4Trust]",
            description: "AI Ethics & Governance Consulting",
            content:
              "Expert AI governance consulting that builds organizational trust through ethical AI frameworks, compliance strategies, and responsible AI development practices ensuring AI implementations serve business objectives while maintaining ethical standards.",
            features: [
              "AI ethics consulting services",
              "Responsible AI governance frameworks",
              "AI compliance and risk management",
            ],
            buttonText: "Learn About AI Ethics Consulting",
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

      {/* Why Choose Us */}
      <ServiceShowcase
        title="Why Choose Our AI Consulting Services?"
        description="Leading AI consulting firm in Portugal combining deep AI research expertise with proven responsible AI implementation methodologies for healthcare and enterprise applications"
        items={[
          {
            title: "Expert AI Research Background",
            description:
              "15+ years of AI research experience in responsible AI development, healthcare AI applications, and ethical AI implementation ensuring scientifically sound consulting services",
          },
          {
            title: "Responsible AI Development Focus",
            description:
              "Every AI consulting project guided by ethical AI principles and responsible development practices, ensuring AI implementations serve organizational goals while maintaining human-centered values",
          },
          {
            title: "Healthcare AI Specialization",
            description:
              "Specialized expertise in healthcare AI consulting, medical AI system development, and clinical AI implementation with deep understanding of healthcare industry requirements",
          },
          {
            title: "Comprehensive AI Education",
            description:
              "Professional AI training programs and workshops that build organizational AI capabilities through hands-on education in responsible AI practices and implementation strategies",
          },
        ]}
        columns={2}
      />

      {/* CTA Section */}
      <CallToAction
        title="Ready for Professional AI Consulting Services?"
        description="Partner with Portugal's leading AI consulting firm for responsible AI implementation. Expert AI development, healthcare AI solutions, and comprehensive AI training programs designed for your organization's success."
        primaryButton={{
          text: "Schedule AI Consultation",
          href: "/contact",
          variant: "default",
        }}
        secondaryButton={{
          text: "Explore AI Services",
          href: "/services",
          variant: "outline",
        }}
      />
    </div>
  );
}
