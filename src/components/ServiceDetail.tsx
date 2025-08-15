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
import { ServiceDetail as ServiceDetailType } from "@/lib/services-data";
import Link from "next/link";

interface ServiceDetailProps {
  service: ServiceDetailType;
  className?: string;
}

export function ServiceDetail({ service, className = "" }: ServiceDetailProps) {
  return (
    <section
      id={service.id}
      className={`container mx-auto px-4 py-16 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Service Header */}
        <FadeInUp className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold">{service.title}</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {service.fullDescription}
          </p>
        </FadeInUp>

        {/* Features Grid */}
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {service.features.map((feature, index) => (
            <StaggerItem key={index}>
              <FloatingCard>
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Benefits and Details */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Benefits */}
          <FadeInUp delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📈</span>
                  Key Benefits
                </CardTitle>
                <CardDescription>
                  Value delivered through our {service.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-sm">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeInUp>

          {/* Target Audience & Deliverables */}
          <FadeInUp delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎯</span>
                  Who We Serve
                </CardTitle>
                <CardDescription>
                  Organizations that benefit from our expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Target Audience
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.targetAudience.map((audience, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {audience}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Key Deliverables
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {service.deliverables
                      .slice(0, 4)
                      .map((deliverable, index) => (
                        <li key={index}>• {deliverable}</li>
                      ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </FadeInUp>
        </div>

        {/* Methodology */}
        <FadeInUp delay={0.6}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚙️</span>
                Our Methodology
              </CardTitle>
              <CardDescription>
                Proven approach to delivering successful outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {service.methodology.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={0.8} className="text-center">
          <Button size="lg" asChild>
            <Link href="/contact">Get Started with {service.title}</Link>
          </Button>
        </FadeInUp>
      </div>
    </section>
  );
}
