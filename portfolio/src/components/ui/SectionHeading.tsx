import RevealOnScroll from "./RevealOnScroll";

export default function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <RevealOnScroll className="mb-12 md:mb-16">
      <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">{kicker}</p>
      <h2 className="font-serif text-3xl text-foreground md:text-5xl">{title}</h2>
    </RevealOnScroll>
  );
}
