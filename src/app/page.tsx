import {
  generatePageMetadata,
  generateReviewStructuredData,
  generateFAQStructuredData,
} from "@/lib/seo";

// Components
import { Hero } from "@/components/Hero";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { ContentSection } from "@/components/ContentSection";
import { QuoteSection } from "@/components/QuoteSection";
import { CTASection } from "@/components/CTASection";

// Data
import {
  healthcareProjects,
  healthcareProjectsMetadata,
} from "@/lib/content/healthcare-projects";
import { services, servicesMetadata } from "@/lib/content/services-data";
import { founderQuote } from "@/lib/content/quotes-data";
import { questionsCTA } from "@/lib/content/social-links-data";

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

      {/* Services Overview */}
      <ServiceShowcase
        title={servicesMetadata.sectionTitle}
        description={servicesMetadata.sectionDescription}
        background={servicesMetadata.background}
        columns={servicesMetadata.columns}
        items={services}
      />

      {/* Mission Statement Section */}
      <ContentSection
        badge="RESPONSIBLE A.I. 4 ALL"
        title="Shaping the Future of Technology"
      >
        <p>
          We are pioneers in developing responsible AI solutions that are{" "}
          <strong>shaping the future of technology.</strong>
        </p>
        <p>
          With our cutting-edge expertise, we harness the power of artificial
          intelligence to create innovative and ethical solutions that
          positively impact various industries.
        </p>
        <p>
          <strong>Embracing responsible AI practices</strong>, we ensure that
          our solutions are not only powerful but also safe, unbiased, and
          inclusive.
        </p>
        <p>
          <strong>Join us in this journey of transformation</strong> as we lead
          the way towards a more responsible and sustainable AI future, making a
          difference in the world through cutting-edge technology.
        </p>
      </ContentSection>

      {/* Healthcare Projects Section */}
      <ServiceShowcase
        title="Innovative Healthcare AI Projects"
        description={healthcareProjectsMetadata.sectionDescription}
        background="default"
        columns={3}
        items={healthcareProjects}
      />

      {/* Workshops Teaser Section */}
      <ContentSection
        badge="WORKSHOPS - EMPOWERING MINDS"
        title="Gateway to Acquiring Profound AI Knowledge & Insights"
        buttons={[
          { text: "Explore Workshop Programs", href: "/workshops" },
          {
            text: "Contact Us",
            href: "/contact?subject=workshop",
            variant: "outline",
          },
        ]}
      >
        <p>
          From the realms of <strong>Artificial Intelligence</strong> and{" "}
          <strong>cutting-edge technology</strong> to the{" "}
          <strong>intricacies of ethical business</strong> practices, our
          workshops serve as a{" "}
          <strong>gateway to acquiring profound knowledge and insights</strong>.
        </p>
        <p>
          Each session is carefully curated to{" "}
          <strong>inspire, educate, and fuel your drive</strong> for personal
          and professional growth. Do not miss the opportunity to{" "}
          <strong>expand your expertise</strong>, engage with{" "}
          <strong>industry experts</strong>, and become a part of{" "}
          <strong>a community devoted to continuous improvement</strong>.
        </p>
        <p className="text-xl font-medium text-primary text-center">
          Your next voyage of discovery awaits.
        </p>
      </ContentSection>

      {/* Philosophy Section */}
      <QuoteSection
        quote={founderQuote.quote}
        author={founderQuote.author}
        role={founderQuote.role}
        organization={founderQuote.organization}
      />

      {/* Questions CTA Section */}
      <CTASection {...questionsCTA} />
    </div>
  );
}
