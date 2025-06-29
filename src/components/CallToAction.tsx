import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeInUp } from "@/components/animations/FadeInUp";
import Link from "next/link";

export interface CTAButton {
  text: string;
  href: string;
  variant?: "default" | "outline";
}

export interface CallToActionProps {
  title: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  className?: string;
}

export function CallToAction({
  title,
  description,
  primaryButton,
  secondaryButton,
  className = "",
}: CallToActionProps) {
  return (
    <section className={`container mx-auto px-4 py-16 ${className}`}>
      <FadeInUp>
        <Card className="max-w-4xl mx-auto text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant={primaryButton.variant || "default"}
              asChild
            >
              <Link href={primaryButton.href}>{primaryButton.text}</Link>
            </Button>
            {secondaryButton && (
              <Button
                size="lg"
                variant={secondaryButton.variant || "outline"}
                asChild
              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </FadeInUp>
    </section>
  );
}
