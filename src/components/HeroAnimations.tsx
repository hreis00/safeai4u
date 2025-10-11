"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/animations/FadeInUp";
import type { ButtonAction } from "@/lib/types";

interface HeroAnimationsProps {
  primaryButton?: ButtonAction;
  secondaryButton?: ButtonAction;
}

export function HeroAnimations({
  primaryButton,
  secondaryButton,
}: HeroAnimationsProps) {
  return (
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
            {primaryButton.href ? (
              <Button size="lg" asChild>
                <Link href={primaryButton.href}>{primaryButton.text}</Link>
              </Button>
            ) : (
              <Button size="lg" onClick={primaryButton.onClick}>
                {primaryButton.text}
              </Button>
            )}
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
            {secondaryButton.href ? (
              <Button size="lg" variant="outline" asChild>
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.text}
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </FadeInUp>
  );
}
