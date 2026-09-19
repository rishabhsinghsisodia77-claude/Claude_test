"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { RefObject } from "react";

export default function TimelineTraveler({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.5 });
  const top = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      aria-hidden
      className="absolute -left-[calc(2rem+9px)] z-10 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-accent"
      style={{
        top,
        boxShadow: "0 0 0 4px var(--accent-soft), 0 0 20px 2px var(--accent-soft)",
      }}
    />
  );
}
