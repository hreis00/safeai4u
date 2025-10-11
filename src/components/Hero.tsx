import { Badge } from "@/components/ui/badge";

// Animation Components (these remain client-side)
import { FadeInUp, PulsingBadge } from "@/components/animations";
import { HeroAnimations } from "./HeroAnimations";
import type { BaseComponentProps, ButtonAction } from "@/lib/types";

interface HeroProps extends BaseComponentProps {
  badgeText: string;
  title: string;
  description: string;
  primaryButton?: ButtonAction;
  secondaryButton?: ButtonAction;
}

export function Hero({
  badgeText,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  return (
    <FadeInUp>
      <section
        role="region"
        className="container mx-auto px-4 py-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeInUp delay={0.1}>
            <PulsingBadge>
              <Badge variant="secondary" className="text-sm">
                {badgeText}
              </Badge>
            </PulsingBadge>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {title}
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-xl text-muted-foreground">{description}</p>
          </FadeInUp>

          {(primaryButton || secondaryButton) && (
            <HeroAnimations
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
            />
          )}
        </div>
      </section>
    </FadeInUp>
  );
}
