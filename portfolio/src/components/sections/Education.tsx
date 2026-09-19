import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import { education } from "@/data/content";

export default function Education() {
  return (
    <section id="education" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Education" title="Academic background" />

        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((item, i) => (
            <RevealOnScroll key={item.degree} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <p className="text-sm font-medium tracking-[0.15em] text-accent uppercase">{item.period}</p>
                <h3 className="mt-2 font-serif text-xl text-foreground">{item.degree}</h3>
                <p className="mt-1 text-base text-muted">{item.institution}</p>
                {item.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
