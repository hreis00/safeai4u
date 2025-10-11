import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FadeInUp, StaggerContainer } from "@/components/animations";

export interface SocialLink {
  name: string;
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

export interface CTASectionProps {
  title: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  socialLinks?: SocialLink[];
  background?: "default" | "muted";
}

/**
 * CTASection Component
 *
 * Reusable component for call-to-action sections with optional social links.
 * Perfect for contact prompts and engagement sections.
 *
 * @example
 * ```tsx
 * <CTASection
 *   title="QUESTIONS?"
 *   primaryButton={{ text: "Contact us", href: "/contact" }}
 *   socialLinks={[
 *     { name: "LinkedIn", href: "...", ariaLabel: "LinkedIn", icon: <LinkedInIcon /> }
 *   ]}
 * />
 * ```
 */
export function CTASection({
  title,
  primaryButton,
  socialLinks,
  background = "muted",
}: CTASectionProps) {
  const sectionClass = background === "muted" ? "bg-section-muted" : "";

  return (
    <section className={`container mx-auto px-4 py-16 mb-16 ${sectionClass}`}>
      <div className="max-w-4xl mx-auto text-center">
        <StaggerContainer>
          <FadeInUp>
            <h2 className="text-4xl font-bold mb-8">{title}</h2>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryButton && (
                <Button size="lg" asChild>
                  <Link href={primaryButton.href}>{primaryButton.text}</Link>
                </Button>
              )}

              {socialLinks && socialLinks.length > 0 && (
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <Button key={index} variant="outline" size="icon" asChild>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.ariaLabel}
                      >
                        {link.icon}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </FadeInUp>
        </StaggerContainer>
      </div>
    </section>
  );
}
