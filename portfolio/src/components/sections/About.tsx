import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="About" title="A little about me" />

        <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
          <RevealOnScroll delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
            {about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="grid grid-cols-3 gap-6 self-start md:grid-cols-1">
            {about.highlights.map((item) => (
              <div key={item.label} className="border-l-2 border-accent pl-4">
                <p className="font-serif text-3xl text-foreground md:text-4xl">{item.value}</p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
