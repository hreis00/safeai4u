// Contact Page Content

export interface ContactInfo {
  title: string;
  value: string;
  icon: string;
  link?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

// Main Contact Information
export const contactInfo: ContactInfo[] = [
  {
    title: "EMAIL",
    value: "david.belo@safe-ai-4u.eu",
    icon: "📧",
    link: "mailto:david.belo@safe-ai-4u.eu",
  },
  {
    title: "PHONE NUMBER",
    value: "+351 935208153",
    icon: "📱",
    link: "tel:+351935208153",
  },
  {
    title: "LOCATION",
    value: "Mira de Aire, Portugal",
    icon: "📍",
  },
];

// Hero Content
export const contactHero = {
  badgeText: "GET IN TOUCH",
  title: "CONTACT US",
  description:
    "Have questions about our AI solutions? Interested in workshops or consulting services? We'd love to hear from you!",
};

// Form Section Title
export const formSection = {
  title: "SEND US A MESSAGE",
  description:
    "Fill out the form below and we'll get back to you within 24 hours.",
};

// Closing Quote
export const closingQuote = {
  text: "We are optimists who love to work together",
  icon: "💬",
};
