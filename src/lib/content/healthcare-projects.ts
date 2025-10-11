/**
 * Healthcare Projects Data
 *
 * Specific healthcare AI projects showcased on the SAFE AI [4U] website
 */

export interface HealthcareProject {
  id: string;
  icon: string;
  title: string;
  description: string;
  content?: string;
  features?: string[];
  buttonText?: string;
  buttonHref?: string;
}

export const healthcareProjects: HealthcareProject[] = [
  {
    id: "metatron",
    title: "METATRON",
    description:
      "An interconnected data and machine learning master-infrastructure, increasing the capabilities of machine learning models using graph networks. By connecting data from multiple sources and integrating synthetic data, gives rise to models with more informed outputs, while guaranteeing patients' privacy.",
    icon: "🔗",
    features: [
      "Graph network integration",
      "Multi-source data connection",
      "Synthetic data generation",
      "Privacy-preserving architecture",
    ],
  },
  {
    id: "space-medicine",
    title: "SPACE MEDICINE",
    description:
      "This project aims to provide tools to aid healthcare research and development of procedures to face the specific challenges of microgravity settings.",
    icon: "🚀",
    features: [
      "Microgravity health monitoring",
      "Remote healthcare solutions",
      "AI-assisted diagnostics",
      "Space environment adaptation",
    ],
  },
  {
    id: "isekai",
    title: "ISEKAI",
    description:
      "Gamify your physical activity! Set your personalized activity goals and boost your motivation to exercise by seeing them integrated as real-world quests with an engaging gameplay and great in-game rewards. Train for battle, explore your surroundings, get the loot!",
    icon: "🎮",
    features: [
      "Gamified exercise tracking",
      "Personalized activity goals",
      "Real-world quest integration",
      "Engagement and rewards system",
    ],
  },
];

export const healthcareProjectsMetadata = {
  sectionTitle: "Solutions for Healthcare",
  sectionDescription:
    "Innovative AI projects revolutionizing healthcare delivery, from enhancing diagnostics to personalized treatment plans",
  ctaText: "Explore Healthcare Solutions",
  ctaHref: "/services",
};
