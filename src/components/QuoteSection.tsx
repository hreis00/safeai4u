import { FadeInUp } from "@/components/animations";

export interface QuoteSectionProps {
  quote: string;
  author: string;
  role: string;
  organization?: string;
}

/**
 * QuoteSection Component
 *
 * Reusable component for displaying quotes with attribution.
 * Maintains consistent styling for all quotes across the site.
 *
 * @example
 * ```tsx
 * <QuoteSection
 *   quote="We should stop playing with AI and use it with conscience."
 *   author="David Belo"
 *   role="Founder & CEO"
 *   organization="SAFE AI [4U]"
 * />
 * ```
 */
export function QuoteSection({
  quote,
  author,
  role,
  organization,
}: QuoteSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <FadeInUp>
          <blockquote className="text-2xl md:text-3xl font-medium text-primary italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="text-muted-foreground mt-4">
            <p className="font-medium">{author}</p>
            <p className="text-sm">
              {role}
              {organization && `, ${organization}`}
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
