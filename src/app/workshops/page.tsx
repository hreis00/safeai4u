import { Hero } from "@/components/Hero";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { InstructorSection } from "@/components/InstructorSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { WorkshopContactForm } from "@/components/WorkshopContactForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import {
  workshopOfferings,
  workshopsHero,
  contactFormMeta,
} from "@/lib/content/workshops-page-data";
import {
  whatToExpectTopics,
  whatToExpectMeta,
  instructor,
  youtubeVideos,
} from "@/lib/content/services-page-data";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("workshops");

export default function WorkshopsPage() {
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
        badgeText={workshopsHero.badgeText}
        title={workshopsHero.title}
        description={workshopsHero.description}
        primaryButton={workshopsHero.primaryButton}
        secondaryButton={workshopsHero.secondaryButton}
      />

      {/* Workshop Offerings */}
      <section
        id="workshops"
        className="container mx-auto px-4 py-16 bg-section-muted"
      >
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Workshop Offerings</h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Hands-on training programs designed to empower healthcare
                  professionals, researchers, and AI practitioners with
                  practical skills in biosignal processing and responsible AI
                  implementation.
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-6 md:grid-cols-2">
              {workshopOfferings.map((workshop, index) => (
                <FadeInUp key={workshop.id} delay={0.1 + index * 0.1}>
                  <Card
                    className={
                      workshop.featured ? "border-2 border-primary" : ""
                    }
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {workshop.status === "available" ? (
                          <Badge variant="default">Available</Badge>
                        ) : (
                          <Badge variant="secondary">Coming Soon</Badge>
                        )}
                        {workshop.featured && (
                          <Badge variant="outline">Featured</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">
                        {workshop.title}
                      </CardTitle>
                      {workshop.subtitle && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {workshop.subtitle}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {workshop.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {workshop.description}
                        </p>
                      )}

                      {workshop.price && (
                        <div className="flex items-baseline gap-2">
                          <div className="text-2xl font-bold">
                            {workshop.price},00 {workshop.currency}
                          </div>
                        </div>
                      )}

                      {workshop.dates && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Next dates:</span>
                          <span className="text-primary font-semibold">
                            {workshop.dates}
                          </span>
                        </div>
                      )}

                      <div className="flex gap-3">
                        {workshop.status === "available" && workshop.link && (
                          <Button asChild className="flex-1">
                            <Link href={workshop.link}>Add to cart</Link>
                          </Button>
                        )}
                        {workshop.status === "unavailable" && workshop.link && (
                          <Button variant="outline" asChild className="flex-1">
                            <Link href={workshop.link}>Read more</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </FadeInUp>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold">{contactFormMeta.title}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {contactFormMeta.description}
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="bg-section-muted rounded-lg p-8">
                <WorkshopContactForm />
              </div>
            </FadeInUp>
          </StaggerContainer>
        </div>
      </section>

      {/* What to Expect Section */}
      <ServiceShowcase
        title={whatToExpectMeta.title}
        description="Master the essential techniques and architectures for processing and analyzing biosignals with deep learning"
        items={whatToExpectItems}
        columns={3}
        background="muted"
      />

      {/* Workshop Outcome */}
      <section className="container mx-auto px-4 py-8">
        <FadeInUp>
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              By the end of our workshops
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {whatToExpectMeta.closing}
            </p>
          </div>
        </FadeInUp>
      </section>

      {/* Instructor Section */}
      <InstructorSection instructor={instructor} background="default" />

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
