import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Skills" title="What I work with" />

        <div className="grid gap-10 sm:grid-cols-2">
          {skills.map((group, i) => (
            <RevealOnScroll key={group.category} delay={i * 0.08}>
              <h3 className="mb-4 text-sm font-medium tracking-[0.2em] text-muted uppercase">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
