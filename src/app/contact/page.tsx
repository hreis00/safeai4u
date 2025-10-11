import { Hero } from "@/components/Hero";
import { WorkshopContactForm } from "@/components/WorkshopContactForm";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import {
  contactInfo,
  contactHero,
  formSection,
  closingQuote,
} from "@/lib/content/contact-page-data";
import { socialLinks } from "@/lib/content/social-links-data";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("contact");

export default function ContactPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText={contactHero.badgeText}
        title={contactHero.title}
        description={contactHero.description}
      />

      {/* Main Contact Section - Two Column Layout */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column: Contact Information */}
              <FadeInUp delay={0.1}>
                <Card className="h-full">
                  <CardContent className="p-8 space-y-8">
                    <div>
                      <h2 className="text-xl font-bold mb-2">
                        MAIN POINT OF CONTACT
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Get in touch with us directly through any of these
                        channels
                      </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="text-2xl">{info.icon}</div>
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              {info.title}
                            </p>
                            {info.link ? (
                              <Link
                                href={info.link}
                                className="text-base font-medium hover:text-primary transition-colors block"
                              >
                                {info.value}
                              </Link>
                            ) : (
                              <p className="text-base font-medium">
                                {info.value}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-3 pt-6 border-t">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        FOLLOW US
                      </p>
                      <div className="flex gap-4">
                        {socialLinks.map((link, index) => (
                          <Link
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.ariaLabel}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <span className="text-xl">{link.icon}</span>
                            <span className="text-sm font-medium">
                              {link.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInUp>

              {/* Right Column: Contact Form */}
              <FadeInUp delay={0.2}>
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-2">
                          {formSection.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {formSection.description}
                        </p>
                      </div>
                      <WorkshopContactForm />
                    </div>
                  </CardContent>
                </Card>
              </FadeInUp>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Closing Quote Section */}
      <div className="mb-16">
        <section className="container mx-auto px-4 py-16 bg-section-muted">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <div className="text-center space-y-4">
                <div className="text-5xl">{closingQuote.icon}</div>
                <blockquote className="text-3xl font-medium text-primary italic">
                  &ldquo;{closingQuote.text}&rdquo;
                </blockquote>
              </div>
            </FadeInUp>
          </div>
        </section>
      </div>
    </div>
  );
}
