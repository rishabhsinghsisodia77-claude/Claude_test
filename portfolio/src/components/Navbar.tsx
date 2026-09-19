"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ui/ThemeToggle";
import Magnetic from "./ui/Magnetic";
import { profile } from "@/data/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 md:px-10">
          <a href="#top" className="font-serif text-lg text-foreground">
            {profile.name}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <Magnetic>
              <a
                href="#contact"
                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/*
        Rendered as a sibling of <header>, not nested inside it: Safari treats an
        ancestor with backdrop-filter (our scrolled-state blur) as the containing
        block for position:fixed descendants, which breaks this overlay's fixed
        positioning. Keeping it outside <header> avoids that entirely.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-lg px-2 py-3 text-lg text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
