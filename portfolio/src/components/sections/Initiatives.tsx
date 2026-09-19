import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { initiatives } from "@/data/content";

export default function Initiatives() {
  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Impact" title="Key initiatives" />

        <div className="grid gap-6 sm:grid-cols-2">
          {initiatives.map((initiative, i) => (
            <RevealOnScroll key={initiative.title} delay={i * 0.08}>
              <TiltCard className="h-full rounded-2xl border border-border bg-surface p-8">
                <h3 className="font-serif text-2xl text-foreground">{initiative.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{initiative.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {initiative.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-border px-3 py-1 text-xs text-accent"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
