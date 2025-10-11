import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/ui/faq";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { InstructorSection } from "@/components/InstructorSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FadeInUp } from "@/components/animations";
import {
  serviceCategories,
  whatToExpectTopics,
  whatToExpectMeta,
  instructor,
  youtubeVideos,
  servicesCTA,
} from "@/lib/content/services-page-data";
import { socialLinks } from "@/lib/content/social-links-data";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("services");

export default function ServicesPage() {
  // Transform service categories for FAQ-style component
  const serviceFAQs = serviceCategories.map(category => ({
    question: category.title,
    answer: category.description || "",
  }));

  // Transform "What to Expect" topics for ServiceShowcase
  const whatToExpectItems = whatToExpectTopics.map(topic => ({
    icon: topic.icon,
    title: topic.title,
    description: topic.description,
  }));

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="PROFESSIONAL SERVICES"
        title="SERVICES"
        description="From AI development to expert consultancy and comprehensive training programs, we provide the expertise and support you need to succeed with artificial intelligence."
        primaryButton={{
          text: "View Our Offerings",
          href: "#categories",
        }}
        secondaryButton={{
          text: "Schedule a Consult",
          href: "/contact",
        }}
      />

      {/* Service Categories - Expandable FAQ Style */}
      <section
        id="categories"
        className="container mx-auto px-4 py-16 bg-section-muted"
      >
        <FAQ
          title="Our Service Offerings"
          description="Explore our comprehensive range of AI services. Click on each service to learn more about what we offer."
          faqs={serviceFAQs}
        />
      </section>

      {/* What to Expect Section */}
      <ServiceShowcase
        title={whatToExpectMeta.title}
        description="Master the essential techniques and architectures for processing and analyzing biosignals with deep learning"
        items={whatToExpectItems}
        columns={3}
        background="default"
      />

      {/* Workshop Outcome */}
      <section className="container mx-auto px-4 py-8">
        <FadeInUp>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              By the end of the workshop
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {whatToExpectMeta.closing}
            </p>
          </div>
        </FadeInUp>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-section-muted">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeInUp>
            <h2 className="text-4xl font-bold">{servicesCTA.title}</h2>
            <p className="text-2xl text-primary font-semibold">
              {servicesCTA.subtitle}
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link href={servicesCTA.buttonHref}>
                  {servicesCTA.buttonText}
                </Link>
              </Button>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <Button key={index} variant="outline" size="icon" asChild>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                    >
                      {link.icon}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <p className="text-lg text-muted-foreground">
              {servicesCTA.additionalText}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Instructor Section */}
      <InstructorSection instructor={instructor} background="default" />

      {/* Media Section - Placeholder for future image carousel */}
      {/* <MediaCarousel images={mediaImages} /> */}

      {/* YouTube Videos Section */}
      <div className="mb-16">
        <YouTubeSection
          title="LEARN MORE"
          videos={youtubeVideos}
          background="muted"
        />
      </div>
    </div>
  );
}
