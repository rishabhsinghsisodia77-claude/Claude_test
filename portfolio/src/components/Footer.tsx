import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex gap-6">
          {profile.socials.map((social) => (
            <a key={social.label} href={social.href} className="transition-colors hover:text-accent">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
