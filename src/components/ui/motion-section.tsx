"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function MotionSection({ children, className, id }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}
