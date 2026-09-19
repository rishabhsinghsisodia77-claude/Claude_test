import { FiArrowUpRight } from "react-icons/fi";
import RevealOnScroll from "../ui/RevealOnScroll";
import Magnetic from "../ui/Magnetic";
import { profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Contact</p>
          <h2 className="font-serif text-4xl text-foreground md:text-6xl">Let&apos;s build something.</h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            Have a project in mind or just want to say hello? My inbox is open.
          </p>

          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-opacity hover:opacity-90"
              >
                {profile.email}
                <FiArrowUpRight />
              </a>
            </Magnetic>
          </div>

          <div className="mt-10 flex justify-center gap-8">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
