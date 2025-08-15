// Keyword optimization utilities for AI-related content

// Type definitions for keyword data
interface KeywordData {
  variations: string[];
  density: number;
  priority: "high" | "medium" | "low";
}

type KeywordCluster = Record<string, KeywordData>;

export const AI_KEYWORD_CLUSTERS: Record<string, KeywordCluster> = {
  // Primary AI keywords with high search volume
  primary: {
    "responsible AI": {
      variations: [
        "responsible artificial intelligence",
        "ethical AI",
        "AI ethics",
      ],
      density: 2.5, // Target density percentage
      priority: "high",
    },
    "AI consulting": {
      variations: [
        "artificial intelligence consulting",
        "AI strategy consulting",
        "AI advisory services",
      ],
      density: 2.0,
      priority: "high",
    },
    "AI education": {
      variations: [
        "AI training",
        "artificial intelligence education",
        "AI learning programs",
      ],
      density: 1.8,
      priority: "high",
    },
    "healthcare AI": {
      variations: [
        "medical AI",
        "AI in healthcare",
        "healthcare artificial intelligence",
      ],
      density: 1.5,
      priority: "medium",
    },
  },

  // Secondary supporting keywords
  secondary: {
    "machine learning": {
      variations: ["ML", "deep learning", "neural networks"],
      density: 1.2,
      priority: "medium",
    },
    "AI development": {
      variations: [
        "AI solution development",
        "artificial intelligence development",
        "custom AI",
      ],
      density: 1.0,
      priority: "medium",
    },
    "AI governance": {
      variations: ["AI compliance", "AI regulation", "AI policy"],
      density: 0.8,
      priority: "low",
    },
    "AI safety": {
      variations: ["safe AI", "AI security", "AI risk management"],
      density: 0.8,
      priority: "low",
    },
  },

  // Long-tail keywords for specific use cases
  longTail: {
    "responsible AI solutions for healthcare": {
      variations: ["ethical AI in healthcare", "healthcare AI ethics"],
      density: 0.5,
      priority: "medium",
    },
    "AI consulting services Portugal": {
      variations: ["AI consultant Portugal", "Portuguese AI company"],
      density: 0.3,
      priority: "low",
    },
    "professional AI training programs": {
      variations: ["AI certification courses", "AI workshop training"],
      density: 0.4,
      priority: "medium",
    },
  },
};

// Content optimization suggestions for different page types
export const CONTENT_OPTIMIZATION_TEMPLATES = {
  hero: {
    title: {
      keywords: ["responsible AI", "AI consulting", "healthcare AI"],
      structure: "Primary Keyword + Value Proposition + Target Audience",
      examples: [
        "Responsible AI Solutions for Healthcare & Education",
        "Expert AI Consulting Services for Ethical Implementation",
        "Professional AI Training Programs for Responsible Development",
      ],
    },
    description: {
      keywords: [
        "AI consulting",
        "responsible AI",
        "AI education",
        "healthcare AI",
      ],
      structure: "Problem + Solution + Keywords + Call to Action",
      minLength: 150,
      maxLength: 160,
    },
  },

  service: {
    title: {
      keywords: ["AI consulting", "AI development", "AI education"],
      structure: "Service Type + Industry + Location/Scope",
    },
    description: {
      keywords: ["responsible AI", "AI implementation", "AI strategy"],
      structure: "Service Description + Benefits + Keywords + Target Audience",
    },
  },

  about: {
    title: {
      keywords: ["AI expert", "responsible AI", "AI research"],
      structure: "Person/Company + Expertise + Mission",
    },
    description: {
      keywords: ["AI research", "responsible AI development", "AI ethics"],
      structure: "Background + Experience + Philosophy + Keywords",
    },
  },
};

// Keyword density checker
export function calculateKeywordDensity(
  content: string,
  keyword: string
): number {
  const words = content.toLowerCase().split(/\s+/).length;
  const keywordOccurrences = (
    content.toLowerCase().match(new RegExp(keyword.toLowerCase(), "g")) || []
  ).length;
  return (keywordOccurrences / words) * 100;
}

// Content optimization analyzer
export function analyzeContentOptimization(
  content: string,
  targetKeywords: string[]
): {
  keyword: string;
  density: number;
  target: number;
  status: "under" | "optimal" | "over";
  suggestions: string[];
}[] {
  return targetKeywords.map(keyword => {
    const density = calculateKeywordDensity(content, keyword);
    const target = getTargetDensity(keyword);

    let status: "under" | "optimal" | "over" = "optimal";
    const suggestions: string[] = [];

    if (density < target * 0.8) {
      status = "under";
      suggestions.push(
        `Increase usage of "${keyword}" - current: ${density.toFixed(1)}%, target: ${target}%`
      );
      suggestions.push(
        `Consider adding variations: ${getKeywordVariations(keyword).join(", ")}`
      );
    } else if (density > target * 1.5) {
      status = "over";
      suggestions.push(
        `Reduce usage of "${keyword}" - current: ${density.toFixed(1)}%, target: ${target}%`
      );
      suggestions.push("Use synonyms and variations to avoid keyword stuffing");
    }

    return {
      keyword,
      density: Number(density.toFixed(1)),
      target,
      status,
      suggestions,
    };
  });
}

// Get target density for a keyword
function getTargetDensity(keyword: string): number {
  // Check all keyword clusters for the target density
  for (const cluster of Object.values(AI_KEYWORD_CLUSTERS)) {
    const keywordData = cluster[keyword];
    if (keywordData) {
      return keywordData.density;
    }
  }
  return 1.0; // Default density
}

// Get keyword variations
function getKeywordVariations(keyword: string): string[] {
  for (const cluster of Object.values(AI_KEYWORD_CLUSTERS)) {
    const keywordData = cluster[keyword];
    if (keywordData) {
      return keywordData.variations;
    }
  }
  return [];
}

// Generate optimized content suggestions
export function generateContentSuggestions(
  pageType: keyof typeof CONTENT_OPTIMIZATION_TEMPLATES,
  currentContent: string
): {
  section: string;
  currentIssues: string[];
  suggestions: string[];
  keywordOpportunities: string[];
} {
  const analysis = analyzeContentOptimization(
    currentContent,
    Object.keys(AI_KEYWORD_CLUSTERS.primary)
  );

  const currentIssues = analysis
    .filter(item => item.status !== "optimal")
    .flatMap(item => item.suggestions);

  const suggestions = [
    "Ensure natural keyword integration that maintains readability",
    "Use semantic variations to avoid repetition",
    "Include location-based keywords where relevant (Portugal, Europe)",
    "Add industry-specific terms (healthcare, education, technology)",
  ];

  const keywordOpportunities = Object.keys(
    AI_KEYWORD_CLUSTERS.secondary
  ).filter(keyword => calculateKeywordDensity(currentContent, keyword) < 0.5);

  return {
    section: pageType,
    currentIssues,
    suggestions,
    keywordOpportunities,
  };
}

// Optimized content snippets for common sections
export const OPTIMIZED_CONTENT_SNIPPETS = {
  heroTitles: [
    "SAFE AI [4U] - Responsible AI Solutions for Healthcare & Education",
    "Expert AI Consulting Services for Ethical Technology Implementation",
    "Professional AI Training Programs for Responsible Development",
    "Leading AI Development Company in Portugal - Ethical AI Solutions",
  ],

  heroDescriptions: [
    "Transform your organization with responsible AI consulting, custom development, and comprehensive training. Expert AI solutions for healthcare, education, and enterprise applications across Europe.",
    "Discover ethical AI implementation through expert consulting, professional training, and custom development services. Specializing in healthcare AI, responsible AI governance, and AI education programs.",
    "Partner with Portugal's leading AI consulting firm for responsible artificial intelligence solutions. Professional AI development, training, and strategic consulting for healthcare and education sectors.",
  ],

  serviceDescriptions: {
    consulting:
      "Strategic AI consulting services focused on responsible implementation, healthcare AI solutions, and ethical technology governance for organizations across Europe.",
    development:
      "Custom AI development services with emphasis on responsible AI practices, healthcare applications, and ethical implementation frameworks.",
    education:
      "Comprehensive AI education and training programs covering responsible AI development, healthcare AI applications, and professional certification courses.",
  },

  aboutDescriptions: [
    "Led by AI expert David Belo with 15+ years of research experience in responsible AI development, healthcare AI, and ethical technology implementation across Portugal and Europe.",
    "Founded on the principle of developing AI with conscience, our team combines deep AI research expertise with unwavering commitment to responsible AI practices and human-centered innovation.",
  ],
};

// SEO content validation rules
export const SEO_VALIDATION_RULES = {
  title: {
    minLength: 30,
    maxLength: 60,
    mustInclude: ["AI", "SAFE AI [4U]"],
    shouldInclude: ["responsible", "consulting", "healthcare", "education"],
  },
  description: {
    minLength: 120,
    maxLength: 160,
    mustInclude: ["AI", "responsible"],
    shouldInclude: [
      "consulting",
      "healthcare",
      "education",
      "Portugal",
      "Europe",
    ],
  },
  content: {
    minKeywordDensity: 0.5,
    maxKeywordDensity: 3.0,
    requiredKeywords: ["responsible AI", "AI consulting"],
    recommendedKeywords: ["healthcare AI", "AI education", "AI development"],
  },
};

// Validate SEO content against rules
export function validateSEOContent(content: {
  title: string;
  description: string;
  body: string;
}): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Title validation
  if (content.title.length < SEO_VALIDATION_RULES.title.minLength) {
    issues.push(
      `Title too short: ${content.title.length} chars (min: ${SEO_VALIDATION_RULES.title.minLength})`
    );
  }
  if (content.title.length > SEO_VALIDATION_RULES.title.maxLength) {
    issues.push(
      `Title too long: ${content.title.length} chars (max: ${SEO_VALIDATION_RULES.title.maxLength})`
    );
  }

  // Description validation
  if (content.description.length < SEO_VALIDATION_RULES.description.minLength) {
    issues.push(
      `Description too short: ${content.description.length} chars (min: ${SEO_VALIDATION_RULES.description.minLength})`
    );
  }
  if (content.description.length > SEO_VALIDATION_RULES.description.maxLength) {
    issues.push(
      `Description too long: ${content.description.length} chars (max: ${SEO_VALIDATION_RULES.description.maxLength})`
    );
  }

  // Keyword validation
  SEO_VALIDATION_RULES.content.requiredKeywords.forEach(keyword => {
    const density = calculateKeywordDensity(content.body, keyword);
    if (density < SEO_VALIDATION_RULES.content.minKeywordDensity) {
      issues.push(
        `Missing or insufficient "${keyword}" keyword (${density.toFixed(1)}%)`
      );
      suggestions.push(`Add "${keyword}" naturally throughout the content`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    suggestions,
  };
}
