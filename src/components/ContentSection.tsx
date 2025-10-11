import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import type { ReactNode } from "react";

export interface ContentSectionButton {
  text: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export interface ContentSectionProps {
  badge?: string;
  title: string;
  children: ReactNode;
  buttons?: ContentSectionButton[];
  background?: "default" | "muted";
  maxWidth?: "2xl" | "4xl" | "6xl";
}

/**
 * ContentSection Component
 *
 * Reusable component for text-heavy content sections with consistent styling.
 * Includes badge, title, content, and optional CTA buttons.
 *
 * @example
 * ```tsx
 * <ContentSection
 *   badge="SECTION BADGE"
 *   title="Section Title"
 *   buttons={[
 *     { text: "Primary Action", href: "/action" },
 *     { text: "Secondary Action", href: "/other", variant: "outline" }
 *   ]}
 * >
 *   <p>Section content goes here...</p>
 * </ContentSection>
 * ```
 */
export function ContentSection({
  badge,
  title,
  children,
  buttons,
  background = "muted",
  maxWidth = "4xl",
}: ContentSectionProps) {
  const sectionClass = background === "muted" ? "bg-section-muted" : "";
  const maxWidthClass = `max-w-${maxWidth}`;

  return (
    <section className={`container mx-auto px-4 py-16 ${sectionClass}`}>
      <div className={`${maxWidthClass} mx-auto`}>
        <StaggerContainer>
          <FadeInUp>
            <div className="text-center space-y-6">
              {badge && (
                <Badge variant="secondary" className="text-sm">
                  {badge}
                </Badge>
              )}
              <h2 className="text-3xl font-bold">{title}</h2>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed mt-8">
              {children}
            </div>
          </FadeInUp>

          {buttons && buttons.length > 0 && (
            <FadeInUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant={button.variant || "default"}
                    asChild
                  >
                    <Link href={button.href}>{button.text}</Link>
                  </Button>
                ))}
              </div>
            </FadeInUp>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
