"use client";

import { useRef, type ReactNode } from "react";
import TimelineTraveler from "./TimelineTraveler";

export default function TimelineContainer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative border-l border-border pl-8">
      <TimelineTraveler containerRef={ref} />
      {children}
    </div>
  );
}
