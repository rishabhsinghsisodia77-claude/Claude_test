import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import TimelineContainer from "../ui/TimelineContainer";
import { experience } from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Experience" title="Where I've worked" />

        <TimelineContainer>
          {experience.map((item, i) => (
            <RevealOnScroll key={`${item.company}-${item.period}`} delay={i * 0.1} className="relative pb-12 last:pb-0">
              <span className="absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-sm font-medium tracking-[0.15em] text-accent uppercase">{item.period}</p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">{item.role}</h3>
              <p className="mt-1 text-base text-muted">{item.company}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.description}</p>
            </RevealOnScroll>
          ))}
        </TimelineContainer>
      </div>
    </section>
  );
}
