import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import RevealOnScroll from "../ui/RevealOnScroll";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Work" title="Selected projects" />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.08}>
              <TiltCard className="h-full rounded-2xl border border-border bg-surface p-8">
                <h3 className="font-serif text-2xl text-foreground">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-accent">
                      #{t.replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent"
                    >
                      Live site <FiArrowUpRight />
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent"
                    >
                      Code <FiGithub />
                    </a>
                  )}
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
