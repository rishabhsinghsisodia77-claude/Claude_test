# Portfolio

A personal portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Minimal/elegant design with cursor-reactive interactivity: a soft spotlight that follows the cursor, magnetic buttons, and project cards that tilt in 3D on hover. Includes a light/dark theme toggle.

## Editing your content

Everything you'd want to change - your name, bio, skills, projects, work experience, education, testimonials, and contact links - lives in one file:

```
src/data/content.ts
```

Edit the values there; no other file needs to change. It's currently filled with clearly-labeled placeholder content ("Your Name", "Project One", etc.) - replace it with your real details.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Vercel

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project**, select this repository.
4. Since this repo also contains a separate Telegram bot at the root, set the project's **Root Directory** to `portfolio` in the import settings.
5. Deploy. Vercel auto-detects Next.js and builds/deploys automatically on every push to this branch.

## Structure

- `src/data/content.ts` - all editable content
- `src/components/sections/` - each page section (Hero, About, Skills, Projects, Experience, Education, Testimonials, Contact)
- `src/components/ui/` - interactive primitives (`Magnetic`, `TiltCard`, `CursorSpotlight`, `ThemeToggle`, `RevealOnScroll`)
- `src/app/globals.css` - color tokens and theme (light/dark), fonts wired in `src/app/layout.tsx`
