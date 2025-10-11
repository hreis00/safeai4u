/**
 * Services Data
 *
 * Core AI solutions and service pillars for SAFE AI [4U]
 */

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  content: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

export const services: Service[] = [
  {
    id: "sai-4health",
    icon: "❤️",
    title: "SAI [4Health]",
    description: "Solutions for Healthcare",
    content:
      "With our cutting-edge services, we open the door to a new era of medical possibilities. From enhancing diagnostics to personalized treatment plans, our AI solutions revolutionize healthcare delivery, optimize healthcare processes, and unlock medical insights that were once hidden.",
    features: [
      "Enhanced diagnostic accuracy",
      "Personalized treatment plans",
      "Healthcare delivery optimization",
    ],
    buttonText: "Explore Healthcare Solutions",
    buttonHref: "/services",
  },
  {
    id: "sai-4mind",
    icon: "🧠",
    title: "SAI [4Mind]",
    description: "Empowering Minds",
    content:
      "Unveil the wonders of AI with us! Our engaging teaching services will equip you with the skills and knowledge to conquer the boundless possibilities of Artificial Intelligence. Let's embark on this thrilling journey together and pave the way for a smarter future.",
    features: [
      "AI skills and knowledge development",
      "Professional training workshops",
      "Educational AI mastery programs",
    ],
    buttonText: "Join the AI Journey",
    buttonHref: "/workshops",
  },
  {
    id: "sai-4trust",
    icon: "🛡️",
    title: "SAI [4Trust]",
    description: "Responsible AI for All",
    content:
      "Step into the world of Responsible AI! Join us to explore the ethical side of technology and make a positive impact. Let's shape a better future together, harmonizing innovation with social consciousness. Embrace the power of AI with a conscience.",
    features: [
      "Ethical AI development",
      "Social consciousness integration",
      "Responsible AI frameworks",
    ],
    buttonText: "Discover Responsible AI",
    buttonHref: "/services",
  },
];

export const servicesMetadata = {
  sectionTitle: "Our Core AI Solutions",
  sectionDescription:
    "From healthcare innovation to educational empowerment and ethical AI development, we create solutions that serve humanity with conscience and responsibility",
  background: "default" as const,
  columns: 3 as const,
};

