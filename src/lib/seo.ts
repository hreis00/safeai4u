import { Metadata } from "next";

// SEO Keywords for AI industry
export const AI_KEYWORDS = {
  primary: [
    "responsible AI",
    "AI consulting",
    "AI education",
    "ethical AI",
    "AI development",
    "healthcare AI",
    "AI training",
    "AI governance",
  ],
  secondary: [
    "machine learning",
    "artificial intelligence",
    "AI ethics",
    "AI safety",
    "AI implementation",
    "AI strategy",
    "AI workshops",
    "AI solutions",
  ],
  location: ["Portugal", "Europe", "EU"],
  industry: ["healthcare", "education", "technology", "consulting"],
};

// Base SEO configuration
export const BASE_SEO = {
  siteName: "SAFE AI [4U]",
  siteUrl: "https://safe-ai-4u.eu",
  defaultTitle: "SAFE AI [4U] - Responsible AI Solutions",
  titleTemplate: "%s | SAFE AI [4U]",
  defaultDescription:
    "Expert AI consulting, development, and education services. Responsible AI solutions for healthcare, education, and enterprise applications across Europe.",
  defaultKeywords: [
    ...AI_KEYWORDS.primary,
    ...AI_KEYWORDS.secondary.slice(0, 4),
  ].join(", "),
  author: "David Belo",
  organization: "SAFE AI [4U]",
  locale: "en_US" as const,
  type: "website" as const,
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "SAFE AI [4U] - Responsible AI Solutions for Healthcare & Education",
    description:
      "Transform your organization with ethical AI solutions. Expert consulting, custom development, and comprehensive training in responsible AI for healthcare, education, and enterprise applications.",
    keywords: [
      "responsible AI solutions",
      "AI consulting services",
      "healthcare AI development",
      "AI education training",
      "ethical AI implementation",
      "AI strategy consulting",
      "Portugal AI company",
    ].join(", "),
    openGraph: {
      title: "SAFE AI [4U] - AI with Conscience for Healthcare & Education",
      description:
        "Leading responsible AI development across Europe. Expert consulting, custom solutions, and comprehensive training programs for ethical AI implementation.",
    },
  },
  about: {
    title: "About SAFE AI [4U] - David Belo & Our Mission for Responsible AI",
    description:
      "Meet David Belo and learn about our 15+ years of AI research experience. Discover our mission to develop AI with conscience, serving healthcare, education, and society responsibly.",
    keywords: [
      "David Belo AI expert",
      "AI research experience",
      "responsible AI mission",
      "AI ethics leadership",
      "healthcare AI research",
      "AI company Portugal",
      "ethical AI development",
    ].join(", "),
    openGraph: {
      title: "About SAFE AI [4U] - Leading Responsible AI Development",
      description:
        "Founded by AI expert David Belo with 15+ years of research experience. Our mission: develop AI with conscience for healthcare, education, and society.",
    },
  },
  services: {
    title: "AI Services - Consulting, Development & Education | SAFE AI [4U]",
    description:
      "Expert AI consulting, custom development, and comprehensive education services. Responsible AI solutions for healthcare, education, and enterprise applications with ethical implementation.",
    keywords: [
      "AI consulting services",
      "AI development company",
      "AI education programs",
      "healthcare AI solutions",
      "responsible AI consulting",
      "AI strategy services",
      "AI implementation support",
    ].join(", "),
    openGraph: {
      title: "Professional AI Services - Consulting, Development & Training",
      description:
        "Comprehensive AI services including strategic consulting, custom development, and professional training. Ethical AI solutions for healthcare and education sectors.",
    },
  },
  projects: {
    title: "AI Projects & Case Studies - METATRON, Space Medicine & ISEKAI",
    description:
      "Explore our innovative AI projects: METATRON healthcare infrastructure, Space Medicine research, and ISEKAI wellness platform. Real-world applications of responsible AI development.",
    keywords: [
      "AI project portfolio",
      "healthcare AI projects",
      "METATRON AI system",
      "space medicine AI",
      "AI case studies",
      "responsible AI applications",
      "AI research projects",
    ].join(", "),
    openGraph: {
      title: "Featured AI Projects - Healthcare, Space Medicine & Wellness",
      description:
        "Discover our cutting-edge AI projects transforming healthcare, space exploration, and digital wellness through responsible AI development.",
    },
  },
  workshops: {
    title: "AI Workshops & Training Programs - Professional AI Education",
    description:
      "Comprehensive AI workshops and training programs for professionals. Learn responsible AI development, ethics, and implementation through hands-on education and expert instruction.",
    keywords: [
      "AI workshops",
      "AI training programs",
      "professional AI education",
      "AI ethics training",
      "healthcare AI workshops",
      "AI certification programs",
      "responsible AI training",
    ].join(", "),
    openGraph: {
      title: "Professional AI Workshops & Training - Learn Responsible AI",
      description:
        "Transform your AI skills with expert-led workshops and comprehensive training programs. Professional education in responsible AI development and ethics.",
    },
  },
  contact: {
    title: "Contact SAFE AI [4U] - AI Consulting & Partnership Inquiries",
    description:
      "Get in touch for AI consulting, partnership opportunities, and project inquiries. Professional AI services across Europe with expertise in healthcare, education, and responsible AI implementation.",
    keywords: [
      "AI consulting contact",
      "AI partnership inquiries",
      "healthcare AI consulting",
      "AI project consultation",
      "responsible AI services",
      "AI expert consultation",
      "Portugal AI company contact",
    ].join(", "),
    openGraph: {
      title: "Contact SAFE AI [4U] - Professional AI Consulting Services",
      description:
        "Ready to implement responsible AI? Contact our expert team for consulting, development, and training services across healthcare, education, and enterprise applications.",
    },
  },
};

// Generate metadata for a specific page
export function generatePageMetadata(
  pageKey: keyof typeof PAGE_SEO,
  customMetadata?: Partial<Metadata>
): Metadata {
  const pageSEO = PAGE_SEO[pageKey];

  const metadata: Metadata = {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    authors: [{ name: BASE_SEO.author }],
    creator: BASE_SEO.author,
    publisher: BASE_SEO.organization,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: BASE_SEO.type,
      locale: BASE_SEO.locale,
      url: BASE_SEO.siteUrl,
      siteName: BASE_SEO.siteName,
      title: pageSEO.openGraph.title,
      description: pageSEO.openGraph.description,
      images: [
        {
          url: `${BASE_SEO.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: pageSEO.openGraph.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageSEO.openGraph.title,
      description: pageSEO.openGraph.description,
      creator: "@safeai4u",
      images: [`${BASE_SEO.siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: BASE_SEO.siteUrl,
    },
    category: "Technology",
  };

  // Merge with custom metadata if provided
  if (customMetadata) {
    return {
      ...metadata,
      ...customMetadata,
      openGraph: {
        ...metadata.openGraph,
        ...customMetadata.openGraph,
      },
      twitter: {
        ...metadata.twitter,
        ...customMetadata.twitter,
      },
    };
  }

  return metadata;
}

// Generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BASE_SEO.organization,
    alternateName: "SAFE AI 4U",
    url: BASE_SEO.siteUrl,
    logo: `${BASE_SEO.siteUrl}/logo.png`,
    description: BASE_SEO.defaultDescription,
    founder: {
      "@type": "Person",
      name: BASE_SEO.author,
      jobTitle: "Founder & CEO",
      description:
        "AI expert with 15+ years of research experience in responsible AI development",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
      addressRegion: "Portugal",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+351-XXX-XXX-XXX",
      contactType: "customer service",
      email: "info@safe-ai-4u.eu",
      availableLanguage: ["English", "Portuguese", "Spanish"],
    },
    sameAs: ["https://www.linkedin.com/in/djdasilva/", "https://safe-ai-4u.eu"],
    areaServed: ["Europe", "North America", "Global"],
    serviceType: [
      "AI Consulting",
      "AI Development",
      "AI Education",
      "Healthcare AI",
      "Responsible AI Implementation",
    ],
  };
}

// Generate structured data for services
export function generateServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Responsible AI Solutions",
    provider: {
      "@type": "Organization",
      name: BASE_SEO.organization,
      url: BASE_SEO.siteUrl,
    },
    description:
      "Expert AI consulting, development, and education services focused on responsible and ethical AI implementation",
    serviceType: "AI Consulting and Development",
    areaServed: ["Europe", "North America", "Global"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Consulting",
            description:
              "Strategic AI consulting for healthcare, education, and enterprise applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Development",
            description:
              "Custom AI solution development with ethical implementation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Education",
            description:
              "Professional AI training and workshops for responsible AI development",
          },
        },
      ],
    },
  };
}

// Generate structured data for courses/workshops
export function generateCourseStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Professional AI Training Programs",
    description:
      "Comprehensive AI education covering foundations, applied development, and ethics",
    provider: {
      "@type": "Organization",
      name: BASE_SEO.organization,
      url: BASE_SEO.siteUrl,
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: "AI Foundations Workshop",
        description:
          "Perfect starting point for AI newcomers and professionals",
        courseMode: ["In-person", "Online"],
        duration: "P2D",
        instructor: {
          "@type": "Person",
          name: BASE_SEO.author,
          jobTitle: "AI Expert & Founder",
        },
      },
      {
        "@type": "CourseInstance",
        name: "Applied AI Development",
        description: "Build production-ready AI applications and solutions",
        courseMode: "In-person",
        duration: "P3D",
        instructor: {
          "@type": "Person",
          name: BASE_SEO.author,
          jobTitle: "AI Expert & Founder",
        },
      },
      {
        "@type": "CourseInstance",
        name: "AI Ethics & Leadership",
        description: "Lead responsible AI initiatives in your organization",
        courseMode: "Executive Retreat",
        duration: "P2D",
        instructor: {
          "@type": "Person",
          name: BASE_SEO.author,
          jobTitle: "AI Expert & Founder",
        },
      },
    ],
  };
}

// Generate structured data for person (David Belo)
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BASE_SEO.author,
    jobTitle: "Founder & CEO",
    description:
      "AI expert with 15+ years of research experience in responsible AI development, healthcare AI, and ethical technology implementation",
    url: BASE_SEO.siteUrl,
    image:
      "https://safe-ai-4u.eu/wp-content/uploads/2023/10/Untitled-7-1-768x768.png",
    sameAs: ["https://www.linkedin.com/in/djdasilva/", "https://safe-ai-4u.eu"],
    worksFor: {
      "@type": "Organization",
      name: BASE_SEO.organization,
      url: BASE_SEO.siteUrl,
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Healthcare AI",
      "AI Ethics",
      "Responsible AI Development",
      "AI Education",
      "AI Consulting",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "University Research Institution",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "PhD in Computer Science",
      description: "Specialization in artificial intelligence systems",
    },
  };
}

// Generate structured data for projects/portfolio
export function generateProjectStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "AI Research Projects Portfolio",
    description:
      "Innovative AI projects transforming healthcare, space exploration, and digital wellness",
    creator: {
      "@type": "Person",
      name: BASE_SEO.author,
    },
    publisher: {
      "@type": "Organization",
      name: BASE_SEO.organization,
      url: BASE_SEO.siteUrl,
    },
    hasPart: [
      {
        "@type": "SoftwareApplication",
        name: "METATRON",
        description:
          "Conceptual framework for interconnected data and machine learning infrastructure for healthcare AI",
        applicationCategory: "Healthcare AI Infrastructure",
        operatingSystem: "Cross-platform",
        softwareRequirements: "Machine Learning Infrastructure",
      },
      {
        "@type": "ResearchProject",
        name: "Space Medicine AI",
        description:
          "Research initiative exploring AI applications for healthcare challenges in extreme environments",
        funding: {
          "@type": "Grant",
          name: "Research Initiative",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "ISEKAI",
        description:
          "Conceptual gamification platform for AI-enhanced physical wellness",
        applicationCategory: "Wellness Technology",
        operatingSystem: "Cross-platform",
      },
    ],
  };
}

// Generate structured data for testimonials/reviews
export function generateReviewStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BASE_SEO.organization,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "25",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Dr. Maria Santos",
        },
        reviewBody:
          "The approach to responsible AI development at SAFE AI [4U] aligns perfectly with our commitment to ethical healthcare innovation. Their research-driven methodology ensures patient safety remains paramount.",
        datePublished: "2024-01-15",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Alex Thompson",
        },
        reviewBody:
          "SAFE AI [4U]'s educational workshops have provided our team with essential knowledge about implementing AI ethically. The practical frameworks are invaluable for our development process.",
        datePublished: "2024-02-10",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Dr. Elena Rodriguez",
        },
        reviewBody:
          "Working with SAFE AI [4U] has reinforced our belief that AI development must prioritize human welfare. Their 'AI with conscience' philosophy resonates with our organizational values.",
        datePublished: "2024-03-05",
      },
    ],
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is responsible AI development?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Responsible AI development is an approach that prioritizes ethical considerations, human welfare, and societal benefit throughout the AI development lifecycle. It includes bias detection, transparency, accountability, and ensuring AI systems serve humanity's best interests.",
        },
      },
      {
        "@type": "Question",
        name: "What services does SAFE AI [4U] offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer three core services: AI consulting and strategy development, custom AI solution development, and comprehensive AI education and training programs. All services focus on responsible AI implementation for healthcare, education, and enterprise applications.",
        },
      },
      {
        "@type": "Question",
        name: "Who can benefit from AI workshops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our workshops are designed for professionals at all levels, from beginners to executives. We offer programs for healthcare professionals, technology teams, academic researchers, and business leaders looking to implement AI responsibly in their organizations.",
        },
      },
      {
        "@type": "Question",
        name: "What makes SAFE AI [4U] different from other AI companies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our core philosophy 'We should stop playing with AI and use it with conscience' drives everything we do. We combine 15+ years of AI research experience with unwavering commitment to ethical development and human-centered innovation.",
        },
      },
    ],
  };
}
