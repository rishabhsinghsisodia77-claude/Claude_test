"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

function getSnapshot(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function CursorSpotlight() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 30, stiffness: 200, mass: 0.5 });
  const y = useSpring(rawY, { damping: 30, stiffness: 200, mass: 0.5 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(var(--spotlight), 0.10), transparent 70%)`;

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}
