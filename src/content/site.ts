// Edit this file to update the text shown across the site.
// Everything a visitor reads on the homepage funnels through here.

export const site = {
  name: "Jessie Lu",
  handle: "@whenwedisappear",
  tagline: "17 · Grade 11 · Ontario, Canada",
  bio: "A high schooler sketching out a future in engineering — currently splitting my time between calculus homework, side projects, and finding new music. This site is where I keep track of all of it.",
  pfp: "/images/pfp.jpg",
  location: "Ontario, Canada",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Super-JSB", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/lujessie099", icon: "instagram" },
  { label: "Discord", copyValue: "whenwedisappear", icon: "discord" },
] as const;

export const interests = [
  {
    title: "Sound",
    description: "Indie, lo-fi, bedroom pop, and C-pop — usually all in the same playlist.",
  },
  {
    title: "Aesthetic",
    description: "Dreamcore, weirdcore, liminal spaces, tacticalcore. Blue and green, always.",
  },
  {
    title: "Words",
    description:
      "Reading and writing whenever I can. Currently rotating The Three-Body Problem, Crime and Punishment, and Harry Potter.",
  },
  {
    title: "Screen",
    description: "Rewatching The Big Bang Theory more times than I'd like to admit.",
  },
];

export const plans = [
  {
    period: "Now",
    title: "Grade 11",
    description: "Building the fundamentals — math, physics, and code — while shipping small projects on the side.",
  },
  {
    period: "Next",
    title: "Learning to draw, going deeper on code",
    description: "Picking up digital art from scratch and pushing past the basics in programming.",
  },
  {
    period: "Later",
    title: "Engineering, university",
    description: "Aiming for an engineering program — this site and these projects are the early groundwork.",
  },
];

export const csWork = [
  {
    title: "Personal Website",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    description:
      "This site. Built with Claude Code from a blank folder — design, content, and animation all part of the same build.",
    href: "https://github.com/Super-JSB/personal-website",
  },
  {
    title: "Codepet Labs",
    tags: ["AI-Assisted", "8-Week Program"],
    description:
      "An invitation-only, startup-style summer builder program run by Codepet.ca. Using AI-assisted workflows and GitHub, with weekly check-ins, to build small projects, prototypes, and demos.",
    href: "#",
  },
];

export const buildStack = {
  aiTool: {
    name: "Claude Code",
    role: "AI pair-programmer used to design and build this entire site",
  },
  editor: {
    name: "Claude Code CLI",
    role: "Agentic terminal editor — planning, editing, and running commands",
  },
  stack: [
    { name: "Next.js", role: "React framework (App Router)" },
    { name: "TypeScript", role: "Type-safe application code" },
    { name: "Tailwind CSS", role: "Utility-first styling" },
    { name: "Framer Motion", role: "Animation & interaction" },
    { name: "Vercel", role: "Hosting & deployment" },
    { name: "GitHub", role: "Version control & CI" },
  ],
};

export const track = {
  title: "浆果",
  artist: "TINY7",
  src: "/audio/track-1.mp3",
  cover: "/images/pfp.jpg",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Interests", href: "#interests" },
  { label: "Plans", href: "#plans" },
  { label: "CS Work", href: "#cs-work" },
  { label: "Blog", href: "/blog" },
  { label: "Stack", href: "#stack" },
];
