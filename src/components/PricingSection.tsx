import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeInUp } from "@/components/animations/FadeInUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { FloatingCard } from "@/components/animations/InteractiveElements";
import { ServicePricing } from "@/lib/pricing-data";
import Link from "next/link";

interface PricingSectionProps {
  servicePricing: ServicePricing;
  className?: string;
}

export function PricingSection({
  servicePricing,
  className = "",
}: PricingSectionProps) {
  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeInUp className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold">
            {servicePricing.service_name} Pricing
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Flexible engagement models designed to meet your specific needs and
            budget. All projects include our commitment to responsible AI
            practices.
          </p>
        </FadeInUp>

        {/* Pricing Tiers */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {servicePricing.tiers.map((tier, index) => (
            <StaggerItem key={index}>
              <FloatingCard>
                <Card
                  className={`h-full relative ${tier.popular ? "border-primary shadow-lg" : ""}`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        {tier.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {tier.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-3">
                        What&apos;s Included:
                      </h4>
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-green-500 mt-0.5">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <div>
                      <h4 className="font-semibold mb-3">Ideal For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tier.ideal_for.map((audience, audienceIndex) => (
                          <Badge
                            key={audienceIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/contact">{tier.cta_text}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FloatingCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Engagement Process */}
        <FadeInUp delay={0.4}>
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔄</span>
                Our Engagement Process
              </CardTitle>
              <CardDescription>
                A proven methodology ensuring successful project delivery and
                client satisfaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {servicePricing.engagement_process.map((step, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {step.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">
                      {step.description}
                    </p>
                    <div className="ml-11">
                      <h5 className="text-xs font-semibold mb-1">
                        Deliverables:
                      </h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {step.deliverables.map(
                          (deliverable, deliverableIndex) => (
                            <li key={deliverableIndex}>• {deliverable}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Free Consultation */}
        <FadeInUp delay={0.6}>
          <Card className="bg-section-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💬</span>
                Start with a Free Consultation
              </CardTitle>
              <CardDescription>
                {servicePricing.consultation_info.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">
                    Duration: {servicePricing.consultation_info.duration}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    No commitment required - just an opportunity to discuss your
                    needs and explore how we can help.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What&apos;s Included:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {servicePricing.consultation_info.includes.map(
                      (item, index) => (
                        <li key={index}>• {item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule Free Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn About Our Approach</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    </section>
  );
}
