import { FiAward } from "react-icons/fi";
import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import { awards } from "@/data/content";

export default function Awards() {
  return (
    <section id="awards" className="bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Recognition" title="Awards & achievements" />

        <div className="grid gap-6 sm:grid-cols-2">
          {awards.map((award, i) => (
            <RevealOnScroll key={award.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-border bg-background p-8">
                <FiAward className="mt-1 shrink-0 text-accent" size={22} />
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">{award.period}</p>
                  <h3 className="mt-1 font-serif text-xl text-foreground">{award.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{award.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
