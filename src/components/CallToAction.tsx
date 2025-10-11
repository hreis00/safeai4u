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
import type { BaseComponentProps, ButtonAction } from '@/lib/types';

export interface CallToActionProps extends BaseComponentProps {
  title: string;
  description: string;
  primaryButton: ButtonAction;
  secondaryButton?: ButtonAction;
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
            {primaryButton.href ? (
              <Button
                size="lg"
                variant={primaryButton.variant || "default"}
                asChild
              >
                <Link href={primaryButton.href}>{primaryButton.text}</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant={primaryButton.variant || "default"}
                onClick={primaryButton.onClick}
              >
                {primaryButton.text}
              </Button>
            )}
            {secondaryButton && (
              secondaryButton.href ? (
                <Button
                  size="lg"
                  variant={secondaryButton.variant || "outline"}
                  asChild
                >
                  <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant={secondaryButton.variant || "outline"}
                  onClick={secondaryButton.onClick}
                >
                  {secondaryButton.text}
                </Button>
              )
            )}
          </CardContent>
        </Card>
      </FadeInUp>
    </section>
  );
}
