"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  value: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedProgress({
  value,
  delay = 0,
  duration = 1.5,
  className = "",
}: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <Progress
        value={animatedValue}
        className={`transition-all ease-out ${className}`}
        style={{ transitionDuration: `${duration}s` }}
      />
    </motion.div>
  );
}
