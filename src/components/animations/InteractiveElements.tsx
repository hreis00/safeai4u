"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
}

export function FloatingCard({ children, className = "" }: FloatingCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulsingBadgeProps {
  children: ReactNode;
  className?: string;
}

export function PulsingBadge({ children, className = "" }: PulsingBadgeProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
