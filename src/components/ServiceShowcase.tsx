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
import Link from "next/link";

export interface ShowcaseItem {
  badge?: string;
  title: string;
  description: string;
  content?: string;
  features?: string[];
  buttonText?: string;
  buttonHref?: string;
  icon?: string;
  metric?: {
    label: string;
    value: number;
    suffix?: string;
  };
}

export interface ServiceShowcaseProps {
  title: string;
  description: string;
  items: ShowcaseItem[];
  columns?: 2 | 3;
  background?: "default" | "muted";
}

export function ServiceShowcase({
  title,
  description,
  items,
  columns = 3,
  background = "muted",
}: ServiceShowcaseProps) {
  const gridClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  const sectionClass = background === "muted" ? "bg-muted/50" : "";

  return (
    <section className={`container mx-auto px-4 py-16 ${sectionClass}`}>
      <div className="max-w-6xl mx-auto">
        <FadeInUp className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        </FadeInUp>

        <StaggerContainer className={`grid gap-8 ${gridClass}`}>
          {items.map((item, index) => (
            <StaggerItem key={index}>
              <FloatingCard>
                <Card className={columns === 2 ? "" : "h-full"}>
                  <CardHeader>
                    {item.badge && (
                      <Badge variant="outline" className="w-fit mb-2">
                        {item.badge}
                      </Badge>
                    )}
                    <CardTitle className="flex items-center gap-2">
                      {item.icon && (
                        <span className="text-xl">{item.icon}</span>
                      )}
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {item.content && (
                      <p className="text-sm text-muted-foreground">
                        {item.content}
                      </p>
                    )}
                    {item.features && (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>• {feature}</li>
                        ))}
                      </ul>
                    )}
                    {item.metric && (
                      <div className="text-xs text-muted-foreground">
                        {item.metric.label}: {item.metric.value}
                        {item.metric.suffix}
                      </div>
                    )}
                    {item.buttonText && item.buttonHref && (
                      <Button
                        variant="outline"
                        className={columns === 2 ? "w-full" : "w-full"}
                        asChild
                      >
                        <Link href={item.buttonHref}>{item.buttonText}</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </FloatingCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
