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
          badgeText="Our AI Solutions • Healthcare, Education & Ethics"
          title="SAI [4Health] • SAI [4Mind] • SAI [4Trust]"
          description="Comprehensive AI solutions spanning healthcare innovation, educational empowerment, and responsible AI development. From cutting-edge medical possibilities to AI education programs and ethical technology frameworks that serve humanity with conscience."
          primaryButton={{
            text: "Explore Our Solutions",
            href: "#services",
          }}
          secondaryButton={{
            text: "Start Your Journey",
            href: "/contact",
          }}
        />
      </div>

      {/* Services Overview */}
      <ServiceShowcase
        title="Our Core Services"
        description="From healthcare innovation to educational empowerment and responsible AI development, we create solutions that harmonize cutting-edge technology with social consciousness and ethical principles."
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
        title="Ready to Transform Your Future with AI?"
        description="Join us in this journey of transformation as we lead the way towards a more responsible and sustainable AI future, making a difference in the world through cutting-edge technology with conscience."
        primaryButton={{
          text: "Start Your AI Journey",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Explore Our Projects",
          href: "/projects",
        }}
      />
    </div>
  );
}
