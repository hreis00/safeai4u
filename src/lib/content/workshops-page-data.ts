// Workshops Page Content

export interface WorkshopOffering {
  id: string;
  title: string;
  subtitle?: string;
  status: "available" | "unavailable";
  dates?: string;
  link?: string;
  description?: string;
  featured?: boolean;
  price?: number;
  currency?: string;
}

// Workshop Offerings
export const workshopOfferings: WorkshopOffering[] = [
  {
    id: "intro-ml-healthcare-copy",
    title: "Intro to Machine Learning for Healthcare Copy",
    status: "unavailable",
    link: "/contact?workshop=intro-ml-healthcare",
    description:
      "Introductory workshop covering machine learning fundamentals applied to healthcare scenarios.",
    featured: false,
    price: 30,
    currency: "€",
  },
  {
    id: "python-machine-learning",
    title: "Introduction to Python for Machine Learning",
    status: "available",
    link: "/contact?workshop=python-ml",
    description:
      "Learn Python programming fundamentals and apply them to machine learning problems. Perfect for beginners looking to start their ML journey.",
    featured: true,
    price: 100,
    currency: "€",
  },
  {
    id: "ml-healthcare",
    title: "Machine Learning for Healthcare",
    status: "available",
    link: "/contact?workshop=ml-healthcare",
    description:
      "Explore machine learning techniques specifically designed for healthcare applications and medical data analysis.",
    featured: false,
    price: 50,
    currency: "€",
  },
  {
    id: "deep-learn-biosignals",
    title: "Workshop Deep Learn Biosignals",
    status: "available",
    link: "/contact?workshop=deep-learn-biosignals",
    description:
      "Deep dive into deep learning architectures for biosignal processing. Learn RNNs, CNNs, and GANs for time-series medical data.",
    featured: true,
    price: 50,
    currency: "€",
  },
  {
    id: "deep-learn-biosignals-weekend",
    title: "Workshop Deep Learn Biosignals ON WEEKEND",
    status: "unavailable",
    link: "/contact?workshop=deep-learn-biosignals-weekend",
    description:
      "Weekend intensive workshop on deep learning for biosignals. Same comprehensive content, weekend schedule.",
    featured: false,
    price: 50,
    currency: "€",
  },
];

// Hero Content
export const workshopsHero = {
  badgeText: "EMPOWERING MINDS",
  title: "WORKSHOPS",
  description:
    "Master the essential techniques and architectures for processing and analyzing biosignals with deep learning. Join our hands-on workshops and become part of a community devoted to continuous improvement.",
  primaryButton: {
    text: "View Workshops",
    href: "#workshops",
  },
  secondaryButton: {
    text: "Contact Us",
    href: "#contact-form",
  },
};

// Contact Form Section
export const contactFormMeta = {
  title: "Interested in Our Workshops?",
  description:
    "If you're interested in these or other workshops, do not hesitate to contact us. Tell us about your interests and we'll help you find the perfect program.",
};

// Interest Checkboxes Options
export const interestOptions = [
  { id: "python", label: "Python" },
  { id: "responsible-ai", label: "Responsible AI" },
  { id: "workshops", label: "Workshops" },
  { id: "healthcare", label: "Healthcare" },
  { id: "community", label: "Community" },
  { id: "projects", label: "Projects" },
  { id: "mlops", label: "MLOps" },
  { id: "expert-consultancy", label: "Expert Consultancy" },
  { id: "other", label: "Other" },
];

// Context Subsections (if detailed content becomes available)
export const contextSections = [
  {
    id: "why-biosignals",
    title: "Why Biosignals?",
    description:
      "Biosignals provide rich, real-time data about human health and physiology.",
  },
  {
    id: "challenges",
    title: "Challenges in Healthcare",
    description:
      "Healthcare data is complex, noisy, and requires specialized processing techniques.",
  },
  {
    id: "ai-solution",
    title: "AI as the Solution",
    description:
      "Deep learning enables automated feature extraction and pattern recognition in biosignals.",
  },
];
