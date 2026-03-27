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
    slug: "northlight-travel",
    title: "SLAM: Autonomous Robot Navigation System",
    shortDescription:
      "A SLAM-based navigation system for autonomous robots, enabling real-time mapping and localization in dynamic environments.",
    details:
      "The SLAM: Autonomous Robot Navigation System is designed to provide robust and efficient navigation capabilities for autonomous robots. It utilizes Simultaneous Localization and Mapping (SLAM) techniques to create accurate maps of the environment while keeping track of the robot's position. This system is ideal for applications such as warehouse automation, delivery robots, and exploration in unknown terrains.",
    thumbnail:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Live Demo", url: "https://example.com/" },
    ],
  },
  {
    slug: "lumen-commerce",
    title: "Accurate Blood Pressure Monitor",
    shortDescription:
      "Designed and implemented a blood pressure monitoring system that delivers clinical-grade accuracy in a compact, user-friendly device.",
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
    title: "4 DOF Robotic Arm",
    shortDescription:
      "A robotic arm with four degrees of freedom, designed for precise manipulation and control.",
    details:
      "The 4 DOF Robotic Arm is a versatile mechanical system capable of performing complex tasks with high precision. It features advanced control algorithms and a user-friendly interface for seamless operation.",
    thumbnail:
      "/4DOF.jpg",
    image:
      "/4DOF.jpg",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Case Study", url: "https://example.com/" },
    ],
  },
  {
    slug: "quiet-journal",
    title: "Autonomous Maze Navigation Robot",
    shortDescription:
      "An autonomous robot designed to navigate complex mazes using advanced sensors and algorithms.",
    details:
      "The Autonomous Maze Navigation Robot is a cutting-edge solution for exploring and mapping unknown environments. It utilizes state-of-the-art sensor fusion and machine learning algorithms to achieve real-time navigation and obstacle avoidance.",
    thumbnail:
      "/RBE2002.jpg",
    image:
      "/RBE2002.jpg",
    links: [
      { label: "GitHub", url: "https://github.com/" },
      { label: "Live Demo", url: "https://example.com/" },
    ],
  },
  {
    slug: "pulse-fit",
    title: "Robotic linkage system",
    shortDescription:
      "A health and wellness platform blending coaching insights with meaningful progress tracking.",
    details:
      "Pulse Fit helps users build consistent habits through tailored plans, progress milestones, and in-app coaching. The project balanced clean visuals with motivating micro-interactions to improve retention and daily engagement.",
    thumbnail:
      "/RBE2001.jpg",
    image:
      "/RBE2001.jpg",
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
];

export function getProjectBySlug(slug?: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}
