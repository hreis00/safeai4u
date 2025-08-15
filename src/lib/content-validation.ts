/**
 * Content Validation Utilities
 *
 * This module provides utilities for validating content authenticity,
 * SEO optimization, and professional standards across the SAFE AI [4U] website.
 */

export interface ContentItem {
  id: string;
  type:
    | "hero"
    | "service"
    | "testimonial"
    | "statistic"
    | "project"
    | "meta"
    | "contact";
  title: string;
  description: string;
  content?: string;
  metadata: ContentMetadata;
}

export interface ContentMetadata {
  verified: boolean;
  lastUpdated: Date;
  source: string;
  seoKeywords: string[];
  authenticityScore: number; // 0-100
  professionalScore: number; // 0-100
  needsReview: boolean;
  reviewNotes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  score: number;
  issues: ValidationIssue[];
  suggestions: string[];
}

export interface ValidationIssue {
  type: "authenticity" | "seo" | "professional" | "technical";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  field?: string;
}

/**
 * Validates content for authenticity and professional standards
 */
export class ContentValidator {
  private readonly placeholderPatterns = [
    /lorem ipsum/i,
    /placeholder/i,
    /sample text/i,
    /dummy content/i,
    /test content/i,
    /\[.*\]/g, // Bracketed placeholders
    /TODO:/i,
    /FIXME:/i,
  ];

  private readonly professionalPatterns = {
    unprofessional: [
      /\b(awesome|amazing|incredible|unbelievable)\b/gi,
      /!!+/g, // Multiple exclamation marks
      /\?\?+/g, // Multiple question marks
      /\b(very|really|super|extremely)\s+/gi, // Weak intensifiers
    ],
    required: [
      /\b(responsible|ethical|conscience|humanity)\b/i, // Company values
    ],
  };

  /**
   * Validates a content item against authenticity and professional standards
   */
  validateContent(content: ContentItem): ValidationResult {
    const issues: ValidationIssue[] = [];
    let score = 100;

    // Check for placeholder content
    const placeholderIssues = this.checkPlaceholders(content);
    issues.push(...placeholderIssues);
    score -= placeholderIssues.length * 15;

    // Check professional language
    const professionalIssues = this.checkProfessionalLanguage(content);
    issues.push(...professionalIssues);
    score -= professionalIssues.length * 10;

    // Check SEO optimization
    const seoIssues = this.checkSEOOptimization(content);
    issues.push(...seoIssues);
    score -= seoIssues.length * 8;

    // Check authenticity markers
    const authenticityIssues = this.checkAuthenticity(content);
    issues.push(...authenticityIssues);
    score -= authenticityIssues.length * 12;

    const suggestions = this.generateSuggestions(issues);

    return {
      isValid:
        issues.filter(i => i.severity === "critical" || i.severity === "high")
          .length === 0,
      score: Math.max(0, score),
      issues,
      suggestions,
    };
  }

  private checkPlaceholders(content: ContentItem): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const textToCheck = `${content.title} ${content.description} ${content.content || ""}`;

    for (const pattern of this.placeholderPatterns) {
      if (pattern.test(textToCheck)) {
        issues.push({
          type: "authenticity",
          severity: "critical",
          message:
            "Content contains placeholder text that needs to be replaced with authentic information",
          field: "content",
        });
      }
    }

    return issues;
  }

  private checkProfessionalLanguage(content: ContentItem): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const textToCheck = `${content.title} ${content.description} ${content.content || ""}`;

    // Check for unprofessional patterns
    for (const pattern of this.professionalPatterns.unprofessional) {
      if (pattern.test(textToCheck)) {
        issues.push({
          type: "professional",
          severity: "medium",
          message:
            "Content contains unprofessional language or excessive superlatives",
          field: "language",
        });
      }
    }

    // Check for required company values
    const hasRequiredValues = this.professionalPatterns.required.some(pattern =>
      pattern.test(textToCheck)
    );

    if (content.type === "hero" || content.type === "service") {
      if (!hasRequiredValues) {
        issues.push({
          type: "professional",
          severity: "medium",
          message:
            "Content should emphasize responsible AI and ethical practices",
          field: "messaging",
        });
      }
    }

    return issues;
  }

  private checkSEOOptimization(content: ContentItem): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check if SEO keywords are present
    if (
      !content.metadata.seoKeywords ||
      content.metadata.seoKeywords.length === 0
    ) {
      issues.push({
        type: "seo",
        severity: "high",
        message: "Content lacks SEO keywords for AI-related terms",
        field: "seoKeywords",
      });
    }

    // Check title length for SEO
    if (content.title.length > 60) {
      issues.push({
        type: "seo",
        severity: "medium",
        message:
          "Title is too long for optimal SEO (should be under 60 characters)",
        field: "title",
      });
    }

    // Check description length for SEO
    if (content.description.length > 160) {
      issues.push({
        type: "seo",
        severity: "medium",
        message:
          "Description is too long for meta description (should be under 160 characters)",
        field: "description",
      });
    }

    return issues;
  }

  private checkAuthenticity(content: ContentItem): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check verification status
    if (!content.metadata.verified) {
      issues.push({
        type: "authenticity",
        severity: "high",
        message: "Content has not been verified against authentic sources",
        field: "verification",
      });
    }

    // Check authenticity score
    if (content.metadata.authenticityScore < 70) {
      issues.push({
        type: "authenticity",
        severity: "medium",
        message:
          "Content authenticity score is below acceptable threshold (70%)",
        field: "authenticityScore",
      });
    }

    // Check if content needs review
    if (content.metadata.needsReview) {
      issues.push({
        type: "authenticity",
        severity: "medium",
        message:
          content.metadata.reviewNotes || "Content has been flagged for review",
        field: "review",
      });
    }

    return issues;
  }

  private generateSuggestions(issues: ValidationIssue[]): string[] {
    const suggestions: string[] = [];

    if (issues.some(i => i.type === "authenticity")) {
      suggestions.push(
        "Verify all claims against real company capabilities and documentation"
      );
      suggestions.push(
        "Replace placeholder content with authentic information from safe-ai-4u.eu"
      );
    }

    if (issues.some(i => i.type === "professional")) {
      suggestions.push("Use professional, measured language that builds trust");
      suggestions.push(
        "Emphasize responsible AI practices and ethical development"
      );
    }

    if (issues.some(i => i.type === "seo")) {
      suggestions.push(
        "Include relevant AI keywords: 'responsible AI', 'AI consulting', 'AI education'"
      );
      suggestions.push(
        "Optimize title and description lengths for search engines"
      );
    }

    return suggestions;
  }
}

/**
 * Utility functions for content validation
 */
export const contentValidationUtils = {
  /**
   * Creates a new content item with default metadata
   */
  createContentItem(
    id: string,
    type: ContentItem["type"],
    title: string,
    description: string,
    content?: string
  ): ContentItem {
    return {
      id,
      type,
      title,
      description,
      content,
      metadata: {
        verified: false,
        lastUpdated: new Date(),
        source: "manual",
        seoKeywords: [],
        authenticityScore: 0,
        professionalScore: 0,
        needsReview: true,
        reviewNotes: "Newly created content requires validation",
      },
    };
  },

  /**
   * Updates content metadata after validation
   */
  updateContentMetadata(
    content: ContentItem,
    validationResult: ValidationResult,
    source?: string
  ): ContentItem {
    return {
      ...content,
      metadata: {
        ...content.metadata,
        lastUpdated: new Date(),
        authenticityScore: validationResult.score,
        professionalScore: validationResult.score,
        needsReview: !validationResult.isValid,
        source: source || content.metadata.source,
        reviewNotes:
          validationResult.issues.length > 0
            ? validationResult.issues.map(i => i.message).join("; ")
            : undefined,
      },
    };
  },

  /**
   * Checks if content meets minimum quality standards
   */
  meetsQualityStandards(content: ContentItem): boolean {
    return (
      content.metadata.verified &&
      content.metadata.authenticityScore >= 70 &&
      content.metadata.professionalScore >= 70 &&
      !content.metadata.needsReview
    );
  },

  /**
   * Generates SEO keywords for AI-related content
   */
  generateAIKeywords(contentType: ContentItem["type"]): string[] {
    const baseKeywords = [
      "AI",
      "artificial intelligence",
      "responsible AI",
      "ethical AI",
    ];

    const typeSpecificKeywords: Record<ContentItem["type"], string[]> = {
      hero: ["AI consulting", "AI development", "AI solutions"],
      service: [
        "AI consulting services",
        "AI development",
        "AI education",
        "AI training",
      ],
      testimonial: ["AI success stories", "AI client testimonials"],
      statistic: ["AI metrics", "AI performance", "AI results"],
      project: ["AI projects", "AI case studies", "AI implementations"],
      meta: ["AI company", "AI expertise", "AI professionals"],
      contact: ["AI consultation", "AI contact", "AI services"],
    };

    return [...baseKeywords, ...typeSpecificKeywords[contentType]];
  },
};
