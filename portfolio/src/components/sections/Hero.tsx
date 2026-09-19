"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import Magnetic from "../ui/Magnetic";
import { profile } from "@/data/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-start justify-center px-6 md:px-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm font-medium tracking-[0.2em] text-accent uppercase"
        >
          {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-xl text-xl text-muted md:text-2xl"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-lg text-base text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View my work
              <FiArrowUpRight />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
