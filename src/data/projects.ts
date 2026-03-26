export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  details: string;
  thumbnail: string;
  image: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "lumen-commerce",
    title: "Lumen Commerce",
    shortDescription:
      "A minimalist storefront system focused on swift checkout and frictionless product discovery.",
    details:
      "Lumen Commerce is a performance-first e-commerce experience with streamlined browsing, predictive search, and a conversion-optimized checkout flow. I handled product architecture, design system implementation, and frontend performance tuning.",
    thumbnail:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Live Demo", url: "https://example.com/" },
    ],
  },
  {
    slug: "aero-analytics",
    title: "Aero Analytics",
    shortDescription:
      "A data dashboard that turns complex business metrics into clear visual narratives.",
    details:
      "Aero Analytics provides real-time KPI tracking with modular chart blocks and context-aware filtering. The interface prioritizes legibility and efficient workflows, making it easy for teams to identify trends and act quickly.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Case Study", url: "https://example.com/" },
    ],
  },
  {
    slug: "quiet-journal",
    title: "Quiet Journal",
    shortDescription:
      "A calm writing app designed around intentional reflection and distraction-free sessions.",
    details:
      "Quiet Journal offers a serene writing environment with adaptive prompts, mood tracking, and multi-device sync. I focused on interaction details, typographic rhythm, and accessibility to keep writing effortless and inclusive.",
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Live Demo", url: "https://example.com/" },
    ],
  },
  {
    slug: "pulse-fit",
    title: "Pulse Fit",
    shortDescription:
      "A health and wellness platform blending coaching insights with meaningful progress tracking.",
    details:
      "Pulse Fit helps users build consistent habits through tailored plans, progress milestones, and in-app coaching. The project balanced clean visuals with motivating micro-interactions to improve retention and daily engagement.",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "App Preview", url: "https://example.com/" },
    ],
  },
  {
    slug: "slate-studio",
    title: "Slate Studio",
    shortDescription:
      "A collaborative workspace for design teams to review, annotate, and iterate faster.",
    details:
      "Slate Studio centralizes design feedback with timeline-based commenting, version snapshots, and smart notifications. I led UX architecture and interaction design to reduce collaboration friction across distributed teams.",
    thumbnail:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Case Study", url: "https://example.com/" },
    ],
  },
  {
    slug: "northlight-travel",
    title: "Northlight Travel",
    shortDescription:
      "An immersive itinerary builder that simplifies trip planning from inspiration to booking.",
    details:
      "Northlight Travel helps users create personalized routes, save destination ideas, and coordinate plans with friends. The experience combines rich visuals and practical planning tools while staying lightweight and mobile-friendly.",
    thumbnail:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Live Demo", url: "https://example.com/" },
    ],
  },
];

export function getProjectBySlug(slug?: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
