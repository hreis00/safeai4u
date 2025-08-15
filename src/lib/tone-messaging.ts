/**
 * Tone and Messaging Standardization System
 *
 * This module provides utilities for standardizing tone, messaging, and
 * call-to-action language across the SAFE AI [4U] website to ensure
 * consistent professional communication and ethical AI messaging.
 */

export interface ToneGuidelines {
  professional: {
    required: string[];
    avoid: string[];
    examples: string[];
  };
  ethical: {
    required: string[];
    avoid: string[];
    examples: string[];
  };
  callToAction: {
    preferred: string[];
    avoid: string[];
    examples: string[];
  };
}

export interface MessagingStandards {
  companyValues: string[];
  keyMessages: string[];
  brandVoice: {
    characteristics: string[];
    toneAttributes: string[];
  };
  terminology: {
    preferred: Record<string, string>;
    avoid: string[];
  };
}

export interface ContentAnalysis {
  toneScore: number;
  messagingScore: number;
  consistencyScore: number;
  issues: ToneIssue[];
  suggestions: string[];
  complianceLevel: "excellent" | "good" | "needs-improvement" | "poor";
}

export interface ToneIssue {
  type: "tone" | "messaging" | "terminology" | "cta";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  suggestion: string;
  location?: string;
}

/**
 * SAFE AI [4U] Tone and Messaging Guidelines
 */
export const safeAIToneGuidelines: ToneGuidelines = {
  professional: {
    required: [
      "expert",
      "professional",
      "comprehensive",
      "proven",
      "specialized",
      "experienced",
      "evidence-based",
      "research-driven",
    ],
    avoid: [
      "awesome",
      "amazing",
      "incredible",
      "unbelievable",
      "revolutionary",
      "game-changing",
      "cutting-edge",
      "state-of-the-art",
    ],
    examples: [
      "Expert AI consulting services with proven methodologies",
      "Professional AI development with comprehensive support",
      "Specialized healthcare AI solutions based on research",
    ],
  },
  ethical: {
    required: [
      "responsible",
      "ethical",
      "conscience",
      "human-centered",
      "transparent",
      "accountable",
      "beneficial",
      "serving humanity",
    ],
    avoid: [
      "disruptive",
      "revolutionary",
      "transformative",
      "breakthrough",
      "next-generation",
      "advanced",
      "sophisticated",
    ],
    examples: [
      "Responsible AI development with ethical considerations",
      "AI solutions designed with human welfare as priority",
      "Transparent AI implementation serving organizational needs",
    ],
  },
  callToAction: {
    preferred: [
      "Schedule AI Consultation",
      "Explore AI Services",
      "Learn About AI Solutions",
      "Discover AI Training",
      "Contact AI Experts",
      "Get AI Guidance",
      "Start AI Journey",
    ],
    avoid: [
      "Get Started Now!",
      "Try It Today!",
      "Don't Miss Out!",
      "Act Fast!",
      "Limited Time!",
      "Sign Up Now!",
      "Click Here!",
    ],
    examples: [
      "Schedule a consultation to discuss your AI needs",
      "Explore our comprehensive AI consulting services",
      "Learn how responsible AI can benefit your organization",
    ],
  },
};

/**
 * SAFE AI [4U] Messaging Standards
 */
export const safeAIMessagingStandards: MessagingStandards = {
  companyValues: [
    "We should stop playing with AI and use it with conscience",
    "AI must serve humanity with responsibility and ethics",
    "Responsible AI development prioritizes human welfare",
    "Transparent and accountable AI implementation",
    "Evidence-based AI solutions with proven methodologies",
  ],
  keyMessages: [
    "Expert AI consulting services for responsible implementation",
    "Healthcare AI solutions with ethical considerations",
    "Professional AI training programs for organizational capability",
    "AI governance frameworks ensuring compliance and trust",
    "15+ years of AI research experience in responsible development",
  ],
  brandVoice: {
    characteristics: [
      "Professional and authoritative",
      "Ethical and responsible",
      "Human-centered and compassionate",
      "Evidence-based and research-driven",
      "Transparent and trustworthy",
    ],
    toneAttributes: [
      "Confident but not arrogant",
      "Knowledgeable but accessible",
      "Serious but approachable",
      "Expert but humble",
      "Professional but warm",
    ],
  },
  terminology: {
    preferred: {
      AI: "artificial intelligence",
      "responsible AI": "ethical AI development",
      "AI consulting": "AI advisory services",
      "AI development": "AI solution development",
      "AI training": "AI education programs",
      "AI implementation": "AI deployment",
      "AI governance": "AI ethics and compliance",
    },
    avoid: [
      "AI revolution",
      "AI disruption",
      "AI transformation",
      "next-gen AI",
      "AI breakthrough",
      "AI innovation",
      "AI advancement",
    ],
  },
};

/**
 * Tone and Messaging Analyzer
 */
export class ToneMessagingAnalyzer {
  private guidelines: ToneGuidelines;
  private standards: MessagingStandards;

  constructor(
    guidelines: ToneGuidelines = safeAIToneGuidelines,
    standards: MessagingStandards = safeAIMessagingStandards
  ) {
    this.guidelines = guidelines;
    this.standards = standards;
  }

  /**
   * Analyzes content for tone and messaging compliance
   */
  analyzeContent(content: {
    title: string;
    description: string;
    content?: string;
    ctaText?: string[];
  }): ContentAnalysis {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    const ctaText = content.ctaText?.join(" ") || "";

    const issues: ToneIssue[] = [];
    let toneScore = 100;
    let messagingScore = 100;
    let consistencyScore = 100;

    // Analyze professional tone
    const professionalIssues = this.analyzeProfessionalTone(allText);
    issues.push(...professionalIssues);
    toneScore -= professionalIssues.length * 10;

    // Analyze ethical messaging
    const ethicalIssues = this.analyzeEthicalMessaging(allText);
    issues.push(...ethicalIssues);
    messagingScore -= ethicalIssues.length * 12;

    // Analyze call-to-action language
    const ctaIssues = this.analyzeCallToAction(ctaText);
    issues.push(...ctaIssues);
    consistencyScore -= ctaIssues.length * 15;

    // Analyze terminology consistency
    const terminologyIssues = this.analyzeTerminology(allText);
    issues.push(...terminologyIssues);
    consistencyScore -= terminologyIssues.length * 8;

    // Generate suggestions
    const suggestions = this.generateSuggestions(issues);

    // Determine compliance level
    const averageScore = (toneScore + messagingScore + consistencyScore) / 3;
    const complianceLevel = this.determineComplianceLevel(averageScore, issues);

    return {
      toneScore: Math.max(0, toneScore),
      messagingScore: Math.max(0, messagingScore),
      consistencyScore: Math.max(0, consistencyScore),
      issues,
      suggestions,
      complianceLevel,
    };
  }

  /**
   * Standardizes content according to tone and messaging guidelines
   */
  standardizeContent(content: {
    title: string;
    description: string;
    content?: string;
    ctaText?: string[];
  }): {
    standardized: typeof content;
    changes: Array<{
      field: string;
      original: string;
      standardized: string;
      reason: string;
    }>;
  } {
    const changes: Array<{
      field: string;
      original: string;
      standardized: string;
      reason: string;
    }> = [];

    const standardizedTitle = this.standardizeText(content.title, "title");
    const standardizedDescription = this.standardizeText(
      content.description,
      "description"
    );
    const standardizedContent = content.content
      ? this.standardizeText(content.content, "content")
      : content.content;
    const standardizedCTA = content.ctaText?.map(cta =>
      this.standardizeCTA(cta)
    );

    // Track changes
    if (standardizedTitle !== content.title) {
      changes.push({
        field: "title",
        original: content.title,
        standardized: standardizedTitle,
        reason: "Improved professional tone and ethical messaging",
      });
    }

    if (standardizedDescription !== content.description) {
      changes.push({
        field: "description",
        original: content.description,
        standardized: standardizedDescription,
        reason: "Enhanced messaging consistency and professional language",
      });
    }

    if (standardizedContent && standardizedContent !== content.content) {
      changes.push({
        field: "content",
        original: content.content || "",
        standardized: standardizedContent,
        reason: "Aligned with ethical AI messaging and terminology standards",
      });
    }

    if (
      standardizedCTA &&
      JSON.stringify(standardizedCTA) !== JSON.stringify(content.ctaText)
    ) {
      changes.push({
        field: "ctaText",
        original: content.ctaText?.join(", ") || "",
        standardized: standardizedCTA.join(", "),
        reason: "Improved call-to-action language for professional consistency",
      });
    }

    return {
      standardized: {
        title: standardizedTitle,
        description: standardizedDescription,
        content: standardizedContent,
        ctaText: standardizedCTA,
      },
      changes,
    };
  }

  private analyzeProfessionalTone(text: string): ToneIssue[] {
    const issues: ToneIssue[] = [];

    // Check for unprofessional language
    this.guidelines.professional.avoid.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      if (regex.test(text)) {
        issues.push({
          type: "tone",
          severity: "medium",
          message: `Unprofessional language detected: "${term}"`,
          suggestion: `Replace with more professional alternatives like: ${this.guidelines.professional.required.slice(0, 3).join(", ")}`,
        });
      }
    });

    // Check for presence of professional language
    const hasRequiredTerms = this.guidelines.professional.required.some(term =>
      new RegExp(`\\b${term}\\b`, "i").test(text)
    );

    if (!hasRequiredTerms) {
      issues.push({
        type: "tone",
        severity: "medium",
        message: "Content lacks professional terminology",
        suggestion: `Include professional terms like: ${this.guidelines.professional.required.slice(0, 5).join(", ")}`,
      });
    }

    return issues;
  }

  private analyzeEthicalMessaging(text: string): ToneIssue[] {
    const issues: ToneIssue[] = [];

    // Check for ethical AI messaging
    const hasEthicalTerms = this.guidelines.ethical.required.some(term =>
      new RegExp(`\\b${term}\\b`, "i").test(text)
    );

    if (!hasEthicalTerms) {
      issues.push({
        type: "messaging",
        severity: "high",
        message: "Content lacks ethical AI messaging",
        suggestion: `Include ethical terms like: ${this.guidelines.ethical.required.slice(0, 4).join(", ")}`,
      });
    }

    // Check for terms to avoid
    this.guidelines.ethical.avoid.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      if (regex.test(text)) {
        issues.push({
          type: "messaging",
          severity: "medium",
          message: `Avoid overly promotional language: "${term}"`,
          suggestion: `Replace with ethical messaging focused on responsibility and human benefit`,
        });
      }
    });

    return issues;
  }

  private analyzeCallToAction(ctaText: string): ToneIssue[] {
    const issues: ToneIssue[] = [];

    if (!ctaText) return issues;

    // Check for preferred CTA language
    const hasPreferredCTA = this.guidelines.callToAction.preferred.some(cta =>
      ctaText.toLowerCase().includes(cta.toLowerCase())
    );

    if (!hasPreferredCTA) {
      issues.push({
        type: "cta",
        severity: "medium",
        message: "Call-to-action doesn't use preferred professional language",
        suggestion: `Use professional CTAs like: ${this.guidelines.callToAction.preferred.slice(0, 3).join(", ")}`,
      });
    }

    // Check for CTAs to avoid
    this.guidelines.callToAction.avoid.forEach(avoid => {
      if (ctaText.toLowerCase().includes(avoid.toLowerCase())) {
        issues.push({
          type: "cta",
          severity: "high",
          message: `Avoid aggressive CTA language: "${avoid}"`,
          suggestion: `Use professional alternatives like: ${this.guidelines.callToAction.preferred.slice(0, 2).join(" or ")}`,
        });
      }
    });

    return issues;
  }

  private analyzeTerminology(text: string): ToneIssue[] {
    const issues: ToneIssue[] = [];

    // Check for terms to avoid
    this.standards.terminology.avoid.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      if (regex.test(text)) {
        issues.push({
          type: "terminology",
          severity: "low",
          message: `Avoid promotional terminology: "${term}"`,
          suggestion: "Use more measured, professional language",
        });
      }
    });

    return issues;
  }

  private generateSuggestions(issues: ToneIssue[]): string[] {
    const suggestions: string[] = [];

    if (issues.some(i => i.type === "tone")) {
      suggestions.push(
        "Enhance professional tone with expert, evidence-based language"
      );
    }

    if (issues.some(i => i.type === "messaging")) {
      suggestions.push(
        "Strengthen ethical AI messaging emphasizing responsibility and human benefit"
      );
    }

    if (issues.some(i => i.type === "cta")) {
      suggestions.push(
        "Use professional call-to-action language that builds trust"
      );
    }

    if (issues.some(i => i.type === "terminology")) {
      suggestions.push(
        "Replace promotional terms with professional, measured language"
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Content meets tone and messaging standards - maintain consistency"
      );
    }

    return suggestions;
  }

  private determineComplianceLevel(
    averageScore: number,
    issues: ToneIssue[]
  ): "excellent" | "good" | "needs-improvement" | "poor" {
    const criticalIssues = issues.filter(i => i.severity === "critical").length;
    const highIssues = issues.filter(i => i.severity === "high").length;

    if (criticalIssues > 0 || averageScore < 50) {
      return "poor";
    } else if (highIssues > 2 || averageScore < 70) {
      return "needs-improvement";
    } else if (averageScore < 85) {
      return "good";
    } else {
      return "excellent";
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private standardizeText(text: string, _context: string): string {
    // TODO: In future versions, context could be used for context-specific standardization rules
    let standardized = text;

    // Replace unprofessional terms
    this.guidelines.professional.avoid.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      standardized = standardized.replace(regex, "professional");
    });

    // Replace promotional terms with ethical alternatives
    this.guidelines.ethical.avoid.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      standardized = standardized.replace(regex, "responsible");
    });

    // Apply preferred terminology
    Object.entries(this.standards.terminology.preferred).forEach(
      ([key, value]) => {
        const regex = new RegExp(`\\b${key}\\b`, "gi");
        standardized = standardized.replace(regex, value);
      }
    );

    return standardized;
  }

  private standardizeCTA(cta: string): string {
    let standardized = cta;

    // Replace aggressive CTAs with professional alternatives
    this.guidelines.callToAction.avoid.forEach(avoid => {
      if (standardized.toLowerCase().includes(avoid.toLowerCase())) {
        standardized = "Schedule AI Consultation";
      }
    });

    return standardized;
  }
}

/**
 * Tone and messaging utility functions
 */
export const toneMessagingUtils = {
  /**
   * Formats tone analysis results for display
   */
  formatAnalysisReport(analysis: ContentAnalysis): string {
    let report = `Tone & Messaging Analysis Report:
- Tone Score: ${analysis.toneScore}/100
- Messaging Score: ${analysis.messagingScore}/100
- Consistency Score: ${analysis.consistencyScore}/100
- Compliance Level: ${analysis.complianceLevel.toUpperCase()}`;

    if (analysis.issues.length > 0) {
      report += `\n\nIssues Found (${analysis.issues.length}):`;
      analysis.issues.forEach((issue, index) => {
        report += `\n${index + 1}. ${issue.severity.toUpperCase()}: ${issue.message}`;
        report += `\n   Suggestion: ${issue.suggestion}`;
      });
    }

    if (analysis.suggestions.length > 0) {
      report += `\n\nRecommendations:`;
      analysis.suggestions.forEach((suggestion, index) => {
        report += `\n${index + 1}. ${suggestion}`;
      });
    }

    return report;
  },

  /**
   * Checks if content meets tone and messaging standards
   */
  meetsToneStandards(analysis: ContentAnalysis): boolean {
    return (
      (analysis.complianceLevel === "excellent" ||
        analysis.complianceLevel === "good") &&
      analysis.issues.filter(
        i => i.severity === "critical" || i.severity === "high"
      ).length === 0
    );
  },

  /**
   * Generates tone improvement recommendations
   */
  generateToneRecommendations(analysis: ContentAnalysis): string[] {
    const recommendations: string[] = [];

    if (analysis.toneScore < 80) {
      recommendations.push(
        "Improve professional tone with expert, evidence-based language"
      );
    }

    if (analysis.messagingScore < 80) {
      recommendations.push(
        "Strengthen ethical AI messaging and company values alignment"
      );
    }

    if (analysis.consistencyScore < 80) {
      recommendations.push(
        "Standardize terminology and call-to-action language"
      );
    }

    const criticalIssues = analysis.issues.filter(
      i => i.severity === "critical"
    ).length;
    if (criticalIssues > 0) {
      recommendations.push(
        `Address ${criticalIssues} critical tone and messaging issues`
      );
    }

    return recommendations;
  },

  /**
   * Validates content against company messaging standards
   */
  validateCompanyMessaging(content: string): {
    hasCompanyValues: boolean;
    hasKeyMessages: boolean;
    alignsWithBrandVoice: boolean;
    score: number;
  } {
    const lowerContent = content.toLowerCase();

    // Check for company values
    const hasCompanyValues = safeAIMessagingStandards.companyValues.some(
      value =>
        lowerContent.includes(
          value.toLowerCase().split(" ").slice(0, 3).join(" ")
        )
    );

    // Check for key messages
    const hasKeyMessages = safeAIMessagingStandards.keyMessages.some(message =>
      lowerContent.includes(
        message.toLowerCase().split(" ").slice(0, 3).join(" ")
      )
    );

    // Check brand voice alignment
    const alignsWithBrandVoice =
      safeAIMessagingStandards.brandVoice.characteristics.some(char =>
        lowerContent.includes(char.toLowerCase().split(" ")[0])
      );

    const score =
      [hasCompanyValues, hasKeyMessages, alignsWithBrandVoice].filter(Boolean)
        .length * 33.33;

    return {
      hasCompanyValues,
      hasKeyMessages,
      alignsWithBrandVoice,
      score: Math.round(score),
    };
  },
};

// Export singleton instance for global use
export const toneMessagingAnalyzer = new ToneMessagingAnalyzer();
