import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Kind words" title="What people say" />

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-background p-8">
                <p className="font-serif text-xl leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-6 text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
