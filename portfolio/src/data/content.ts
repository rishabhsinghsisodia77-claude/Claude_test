// Placeholder content - replace every value here with your real details.
// Nothing else in the codebase needs to change when you edit this file.

export const profile = {
  name: "Your Name",
  title: "Full-Stack Developer & Creative Technologist",
  tagline: "I build fast, thoughtful products for the web.",
  location: "Mumbai, India",
  email: "your.email@example.com",
  resumeUrl: "#",
  avatarInitials: "YN",
  socials: [
    { label: "GitHub", href: "https://github.com/yourusername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "Twitter", href: "https://twitter.com/yourusername" },
  ],
};

export const about = {
  bio: [
    "I'm a software engineer who enjoys turning ambiguous problems into clean, usable products. My background spans full-stack web development, with a particular interest in interfaces that feel alive - subtle motion, responsive feedback, and details most people won't consciously notice but will definitely feel.",
    "Outside of shipping code, I like reading about design systems, tinkering with side projects, and finding the smallest possible solution to a problem before reaching for a bigger one.",
  ],
  highlights: [
    { label: "Years of experience", value: "5+" },
    { label: "Projects shipped", value: "20+" },
    { label: "Companies worked with", value: "4" },
  ],
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "REST APIs", "GraphQL"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel"] },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short, concrete description of what this project does, who it's for, and the problem it solves. Swap in a real project with a link.",
    tech: ["Next.js", "TypeScript", "Postgres"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Project Two",
    description:
      "Another real project goes here. Describe the interesting technical decision you made, not just the feature list.",
    tech: ["React", "Node.js", "Redis"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Project Three",
    description:
      "A third project - maybe a side project or open-source contribution that shows range beyond your day job.",
    tech: ["Python", "FastAPI"],
    codeUrl: "#",
  },
  {
    title: "Project Four",
    description:
      "Keep the strongest projects near the top. Each card tilts toward the cursor - hover to see it.",
    tech: ["Swift", "SwiftUI"],
    liveUrl: "#",
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Company Name",
    period: "2023 - Present",
    description:
      "Describe your scope and a couple of concrete outcomes - what you built, what changed because of it, roughly how much impact it had.",
  },
  {
    role: "Software Engineer",
    company: "Previous Company",
    period: "2021 - 2023",
    description:
      "Same format: what you owned, what you shipped, and a result worth bragging about.",
  },
  {
    role: "Junior Developer",
    company: "First Company",
    period: "2019 - 2021",
    description: "Where you started - the skills you built here that still matter today.",
  },
];

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  description?: string;
};

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Your University",
    period: "2015 - 2019",
    description: "Relevant coursework, honors, or activities worth mentioning.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "A short, specific quote about working with you - what stood out, not generic praise. Swap in a real one from a manager, teammate, or client.",
    name: "Reference Name",
    role: "Their Role, Their Company",
  },
  {
    quote:
      "Two or three real testimonials are much stronger than several vague ones. Ask a former manager or client for a sentence or two.",
    name: "Another Reference",
    role: "Their Role, Their Company",
  },
];
