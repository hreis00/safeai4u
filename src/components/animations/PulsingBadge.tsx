"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface PulsingBadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function PulsingBadge({
  children,
  variant = "secondary",
  className = "",
}: PulsingBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`inline-block cursor-default ${className}`}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="inline-block"
      >
        <Badge variant={variant}>{children}</Badge>
      </motion.div>
    </motion.div>
  );
}
