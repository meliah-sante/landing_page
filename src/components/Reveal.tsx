import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      data-reduced-motion={reducedMotion ? "true" : "false"}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.58, delay, ease: "easeOut" }}
      className={cn("will-change-transform motion-reduce:transform-none", className)}
    >
      {children}
    </motion.div>
  );
}
