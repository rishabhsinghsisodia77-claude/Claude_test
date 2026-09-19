// Real content for Rishabh Singh Sisodia's portfolio, sourced from his resume.
// Edit any value here to update the site - nothing else needs to change.

export const profile = {
  name: "Rishabh Singh Sisodia",
  title: "Growth Manager @ Swiggy Instamart",
  tagline: "I drive product-led growth through data, pricing strategy, and relentless experimentation.",
  location: "Bengaluru, India",
  email: "rishabhsinghsisodia7@gmail.com",
  resumeUrl: "#",
  avatarUrl: "/avatar.jpg",
  socials: [{ label: "LinkedIn", href: "https://linkedin.com/in/rishabhsinghsisodia" }],
};

export const about = {
  bio: [
    "I'm a growth and analytics professional with a physics research background - B.Tech + M.Tech in Engineering Physics from IIT (BHU), Varanasi, followed by a PhD in Physics at IIT Delhi that I left in 2024 to move into industry. That pivot took me from open-ended theoretical problems to turning equally messy, ambiguous ones - pricing, retention, personalization at scale - into data-driven frameworks that ship measurable growth.",
    "At Swiggy Instamart, I've owned growth charters spanning 90+ cities, built pricing and personalization systems reaching over a million users, and been promoted from Business Associate to Growth Manager within 12 months. I like getting close to the data, running fast experiments, and building the org-level playbooks that let a team keep winning after I've moved on.",
  ],
  highlights: [
    { label: "Years in growth & analytics", value: "2+" },
    { label: "Cities scaled across", value: "90+" },
    { label: "Awards & recognitions", value: "3" },
  ],
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  { category: "Analytics & Data", items: ["SQL", "Python", "Excel", "VBA", "Google Analytics", "Data Studio", "Mixpanel"] },
  {
    category: "Strategy & Growth",
    items: ["GTM Strategy", "A/B Testing", "Funnel Analysis", "Cohort Analysis", "Pricing & Revenue Optimization", "Stakeholder Management"],
  },
  { category: "AI-Assisted Tools", items: ["Vibe Coding", "Claude Code"] },
];

export type Initiative = {
  title: string;
  description: string;
  highlights: string[];
};

export const initiatives: Initiative[] = [
  {
    title: "Fresh as a Destination",
    description:
      "Drove product-led growth for the Fresh category, a high-retention vertical, by architecting a gateway SKU and differential pricing framework across 1,800 SKUs to convert first-time trial into repeat behavior.",
    highlights: ["25K incremental daily orders", "40%+ customer penetration", "1,800 SKUs"],
  },
  {
    title: "Rs 9 Store — Growth Strategy & Scale",
    description:
      "Owned the end-to-end growth charter for Rs 9 Store - pricing strategy, assortment planning, CRM, experimentation, analytics, stakeholder management, and city expansion.",
    highlights: ["33K incremental daily orders", "30% platform penetration", "90+ cities"],
  },
  {
    title: "WhatsApp Personalization at Scale",
    description:
      "Owned one of Instamart's largest personalization initiatives, generating creatives at scale across a million user-item combinations to lift click-through and campaign traffic.",
    highlights: ["900K+ creatives generated", "4% CTR (4x BAU)", "+20% campaign traffic"],
  },
  {
    title: "Global Sporting Events Pricing",
    description:
      "Built pricing and demand optimization models for global sporting events including the FIFA World Cup 2026 and Olympics 2024, increasing revenue opportunity through forecasting and pricing simulations.",
    highlights: ["+35% revenue opportunity", "Demand forecasting", "Pricing simulations"],
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
    role: "Growth Manager",
    company: "Swiggy Instamart, Bengaluru",
    period: "Apr 2026 - Present",
    description:
      "Driving product-led growth for the Fresh category and scaling the Fresh-led growth playbook into a formal charter within the Performance Management team, spanning 40 cities and 7 categories.",
  },
  {
    role: "Business Associate",
    company: "Swiggy Instamart, Bengaluru",
    period: "Apr 2025 - Apr 2026",
    description:
      "Owned the Rs 9 Store growth charter end-to-end, led an org-wide churn diagnostics initiative across 9 cities, and built a customer-level category affinity engine that improved festive campaign CTR by 2pp.",
  },
  {
    role: "Senior Business Analyst",
    company: "Accordion, Hyderabad",
    period: "Jan 2024 - Apr 2025",
    description:
      "Built pricing and demand optimization models for global sporting events, led advanced analytics engagements across 2 client accounts, and automated reporting workflows to cut manual effort by 25 hours/week.",
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
    degree: "PhD, Physics (left to join industry)",
    institution: "Indian Institute of Technology Delhi",
    period: "2023 - 2024",
    description: "Left the program in 2024 to move into growth and analytics roles in industry.",
  },
  {
    degree: "B.Tech + M.Tech, Engineering Physics",
    institution: "Indian Institute of Technology (BHU), Varanasi",
    period: "2018 - 2023",
    description: "CGPA: 9.26/10",
  },
];

export type Award = {
  title: string;
  description: string;
  period: string;
};

export const awards: Award[] = [
  {
    title: "Promoted to Growth Manager",
    description: "Promoted from Business Associate to Growth Manager within 12 months of joining.",
    period: "2026",
  },
  {
    title: "Swiggsational Award",
    description: "Awarded for outstanding execution and planning of the Rs 9 Store initiative.",
    period: "AMJ '26",
  },
  {
    title: "MAD Award",
    description: "Recognized for driving growth in the Fresh category through cross-functional collaboration.",
    period: "March 2026",
  },
  {
    title: "Swiggstar Award",
    description: "Recognized for driving habit formation among early-stage users, improving long-term retention.",
    period: "JAS '25",
  },
];

export type Certification = {
  name: string;
  issuer: string;
};

export const certifications: Certification[] = [
  { name: "SQL (Advanced, Intermediate, Basic)", issuer: "HackerRank" },
  { name: "Python", issuer: "Coursera" },
];
