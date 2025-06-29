import { FadeInUp } from "@/components/animations/FadeInUp";

export interface QuoteHighlightProps {
  quote: string;
  author: string;
  role?: string;
  organization?: string;
  className?: string;
}

export function QuoteHighlight({
  quote,
  author,
  role,
  organization,
  className = "",
}: QuoteHighlightProps) {
  return (
    <section
      className={`container mx-auto px-4 py-16 bg-muted/50 ${className}`}
    >
      <FadeInUp className="max-w-4xl mx-auto text-center space-y-6">
        <blockquote className="text-2xl font-semibold italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="space-y-2">
          <p className="font-medium">{author}</p>
          {(role || organization) && (
            <p className="text-sm text-muted-foreground">
              {role}
              {role && organization && ", "}
              {organization}
            </p>
          )}
        </div>
      </FadeInUp>
    </section>
  );
}
