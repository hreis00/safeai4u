"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const displayValue = useTransform(springValue, latest =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => motionValue.set(value)}
    >
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  );
}
