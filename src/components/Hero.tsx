"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation Components
import { FadeInUp, PulsingBadge } from "@/components/animations";

interface HeroProps {
  badgeText: string;
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
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
      <section className="container mx-auto px-4 py-16 relative z-10">
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
            <FadeInUp delay={0.4}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                {primaryButton && (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" asChild>
                      <Link href={primaryButton.href}>
                        {primaryButton.text}
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {secondaryButton && (
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" asChild>
                      <Link href={secondaryButton.href}>
                        {secondaryButton.text}
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </FadeInUp>
          )}
        </div>
      </section>
    </FadeInUp>
  );
}
