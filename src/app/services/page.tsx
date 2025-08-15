import { Hero } from "@/components/Hero";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { ServiceTabs } from "@/components/ServiceTabs";
import { PricingSection } from "@/components/PricingSection";
import { ServiceInquiryForm } from "@/components/ServiceInquiryForm";
import { CallToAction } from "@/components/CallToAction";
import { allServices } from "@/lib/services-data";
import { allServicePricing } from "@/lib/pricing-data";
import { generatePageMetadata, generateServiceStructuredData } from "@/lib/seo";

export const metadata = generatePageMetadata("services");

export default function ServicesPage() {
  const serviceStructuredData = generateServiceStructuredData();

  // Transform services data for ServiceShowcase component
  const showcaseItems = allServices.map(service => ({
    title: service.title,
    description: service.shortDescription,
    content: service.fullDescription,
    features: service.features.slice(0, 3).map(f => f.title), // Show top 3 features
    buttonText: "Learn More",
    buttonHref: `#${service.id}`,
    icon: service.features[0]?.icon || "🤖",
  }));

  // Transform services data for ServiceTabs component
  const serviceTabs = allServices.map(service => ({
    value: service.id,
    label: service.title.split(" ")[0] + " " + service.title.split(" ")[1], // e.g., "AI Consulting"
    cards: [
      {
        icon: "🎯",
        title: "Key Features",
        description: "Core capabilities and offerings",
        content: service.features.map(f => f.title).join(", "),
        progress: {
          label: "Implementation Success Rate",
          value: 95,
        },
        badges: service.targetAudience.slice(0, 2),
      },
      {
        icon: "📈",
        title: "Benefits & Outcomes",
        description: "Value delivered to our clients",
        content: service.benefits.map(b => b.title).join(", "),
        progress: {
          label: "Client Satisfaction",
          value: 98,
        },
        badges: service.deliverables.slice(0, 2),
      },
    ],
  }));

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-muted/20 to-background">
        <Hero
          badgeText="Expert AI Consulting Services • Portugal & Europe"
          title="Professional AI Consulting, Development & Training Services"
          description="Comprehensive AI consulting services including strategic planning, custom AI development, and professional training programs. Specialized in healthcare AI, responsible AI implementation, and AI governance for organizations across Europe."
          primaryButton={{
            text: "Schedule AI Consultation",
            href: "/contact",
          }}
          secondaryButton={{
            text: "View AI Projects",
            href: "/projects",
          }}
        />
      </div>

      {/* Services Overview */}
      <ServiceShowcase
        title="Our Core Services"
        description="Comprehensive AI solutions designed to transform your organization while maintaining the highest standards of ethical AI development and deployment."
        items={showcaseItems}
        columns={3}
        background="muted"
      />

      {/* Detailed Service Information */}
      <ServiceTabs
        title="Detailed Service Information"
        description="Explore our services in depth to understand how we can help your organization succeed with responsible AI implementation."
        tabs={serviceTabs}
        defaultTab="ai-consulting"
      />

      {/* Pricing Sections */}
      {allServicePricing.map((servicePricing, index) => (
        <PricingSection
          key={servicePricing.service_id}
          servicePricing={servicePricing}
          className={index % 2 === 1 ? "bg-muted/30" : ""}
        />
      ))}

      {/* Service Inquiry Form */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Tell us about your project and we&apos;ll provide a customized
            proposal. All consultations are free and confidential.
          </p>
        </div>
        <ServiceInquiryForm />
      </section>

      {/* Call to Action */}
      <CallToAction
        title="Questions About Our Services?"
        description="Schedule a free consultation to discuss your specific needs and learn how we can help you succeed with responsible AI."
        primaryButton={{
          text: "Schedule Free Consultation",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Our Projects",
          href: "/projects",
        }}
      />
    </div>
  );
}
