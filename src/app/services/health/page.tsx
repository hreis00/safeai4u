import { Metadata } from "next";
import { Testimonials } from "@/components/ui/testimonials";
import { FAQ } from "@/components/ui/faq";

// Components
import { Hero } from "@/components/Hero";
import { ServiceTabs } from "@/components/ServiceTabs";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "SAI [4Health] - Healthcare AI Solutions",
  description:
    "Cutting-edge AI solutions for healthcare, enhancing diagnostics and personalized treatment plans.",
};

export default function HealthPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Healthcare Innovation"
        title="SAI [4Health]"
        description="Revolutionizing healthcare delivery with cutting-edge AI solutions that enhance diagnostics, optimize treatment plans, and improve patient outcomes."
        primaryButton={{
          text: "Get Started",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Projects",
          href: "/projects",
        }}
      />

      {/* Key Features */}
      <ServiceTabs
        title="Transforming Healthcare with AI"
        description="Our AI solutions address critical healthcare challenges with innovative technology that prioritizes patient safety and clinical excellence."
        defaultTab="diagnostics"
        tabs={[
          {
            value: "diagnostics",
            label: "Enhanced Diagnostics",
            cards: [
              {
                icon: "🔬",
                title: "Advanced Analysis",
                description:
                  "AI-powered diagnostic tools that enhance clinical decision-making",
                content:
                  "Our machine learning models analyze complex medical data to provide insights that support healthcare professionals in making more accurate diagnoses.",
                progress: {
                  label: "Accuracy Improvement",
                  value: 85,
                },
                badges: [],
              },
              {
                icon: "⚡",
                title: "Real-time Processing",
                description:
                  "Instant analysis for time-critical medical decisions",
                content:
                  "Process and analyze medical imaging, lab results, and patient data in real-time to support urgent care scenarios.",
                progress: {
                  label: "Processing Speed",
                  value: 95,
                },
                badges: [],
              },
            ],
          },
          {
            value: "personalized",
            label: "Personalized Treatment",
            cards: [
              {
                icon: "🎯",
                title: "Tailored Solutions",
                description:
                  "Personalized treatment plans based on individual patient profiles",
                content:
                  "Leverage patient history, genetic data, and lifestyle factors to create customized treatment recommendations.",
                progress: {
                  label: "Treatment Effectiveness",
                  value: 92,
                },
                badges: [],
              },
              {
                icon: "📊",
                title: "Predictive Analytics",
                description:
                  "Anticipate health risks and optimize preventive care",
                content:
                  "Use predictive models to identify potential health issues before they become critical, enabling proactive intervention.",
                progress: {
                  label: "Risk Prediction Accuracy",
                  value: 88,
                },
                badges: [],
              },
            ],
          },
          {
            value: "privacy",
            label: "Privacy & Security",
            cards: [
              {
                icon: "🔒",
                title: "Data Protection",
                description:
                  "Enterprise-grade security for sensitive medical data",
                content:
                  "Advanced encryption and privacy-preserving techniques ensure patient data remains secure while enabling powerful AI analysis.",
                progress: {
                  label: "Security Compliance",
                  value: 100,
                },
                badges: [],
              },
              {
                icon: "🛡️",
                title: "Regulatory Compliance",
                description:
                  "Full compliance with healthcare regulations and standards",
                content:
                  "Our solutions meet HIPAA, GDPR, and other regulatory requirements to ensure ethical and legal AI deployment in healthcare.",
                progress: {
                  label: "Regulatory Adherence",
                  value: 100,
                },
                badges: [],
              },
            ],
          },
        ]}
      />

      {/* Featured Projects */}
      <ServiceShowcase
        title="Featured Healthcare Projects"
        description="Real-world applications of our AI solutions transforming healthcare delivery"
        background="muted"
        columns={2}
        items={[
          {
            badge: "Data Infrastructure",
            title: "METATRON",
            description:
              "Interconnected data and machine learning master-infrastructure",
            content:
              "An advanced infrastructure that increases ML model capabilities using graph networks, connecting multiple data sources while guaranteeing patient privacy.",
            buttonText: "Learn More",
            buttonHref: "/projects#metatron",
          },
          {
            badge: "Space Medicine",
            title: "SPACE MEDICINE",
            description: "Healthcare solutions for microgravity environments",
            content:
              "Specialized tools to aid healthcare research and development of procedures for the unique challenges of microgravity settings.",
            buttonText: "Learn More",
            buttonHref: "/projects#space-medicine",
          },
        ]}
      />

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <Testimonials
          title="Healthcare Professionals Trust Our Solutions"
          description="Hear from medical professionals using our AI tools to improve patient care"
          testimonials={[
            {
              quote:
                "The diagnostic accuracy improvement has been remarkable. Our team can make more informed decisions faster than ever before.",
              author: "Dr. Sarah Chen",
              role: "Chief Medical Officer",
              organization: "Metropolitan General Hospital",
              initials: "SC",
            },
            {
              quote:
                "SAFE AI [4U]'s solutions have transformed our approach to personalized medicine. Patient outcomes have significantly improved.",
              author: "Dr. Michael Rodriguez",
              role: "Director of Oncology",
              organization: "Cancer Treatment Center",
              initials: "MR",
            },
            {
              quote:
                "The privacy-preserving AI analysis gives us confidence that patient data remains secure while we get powerful insights.",
              author: "Dr. Emily Watson",
              role: "Head of Digital Health",
              organization: "Regional Medical Network",
              initials: "EW",
            },
          ]}
        />
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <FAQ
          title="Healthcare AI Questions & Answers"
          description="Common questions about implementing AI in healthcare settings"
          faqs={[
            {
              question: "How does your AI ensure patient data privacy?",
              answer:
                "We use advanced encryption, federated learning, and privacy-preserving techniques that comply with HIPAA, GDPR, and other healthcare regulations. Patient data never leaves your secure environment while still enabling powerful AI analysis.",
            },
            {
              question: "What kind of accuracy improvements can we expect?",
              answer:
                "Clinical studies show our diagnostic AI tools typically improve accuracy by 15-25% compared to traditional methods. However, results vary by use case, and we work with each organization to establish baseline metrics and track improvements.",
            },
            {
              question: "How long does implementation typically take?",
              answer:
                "Implementation timelines vary based on complexity, but most healthcare organizations see initial results within 4-8 weeks. We provide comprehensive training and support throughout the entire process.",
            },
            {
              question: "Do you integrate with existing healthcare systems?",
              answer:
                "Yes, our solutions are designed to integrate seamlessly with existing EMR systems, PACS, laboratory information systems, and other healthcare infrastructure. We support HL7, FHIR, and other standard protocols.",
            },
            {
              question:
                "What support do you provide for regulatory compliance?",
              answer:
                "We provide comprehensive documentation, audit trails, and compliance reporting to support FDA, CE marking, and other regulatory submissions. Our team includes healthcare regulation experts who guide you through the process.",
            },
          ]}
        />
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Transform Healthcare with AI?"
        description="Join healthcare organizations worldwide who trust our AI solutions to improve patient outcomes and operational efficiency."
        primaryButton={{ text: "Schedule Consultation", href: "/contact" }}
        secondaryButton={{ text: "Explore Training", href: "/workshops" }}
      />
    </div>
  );
}
