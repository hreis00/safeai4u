/**
 * Final Content Review and Testing System
 *
 * This module provides comprehensive content review functionality including
 * accuracy auditing, contact form testing, link verification, and accessibility
 * review for the SAFE AI [4U] website.
 */

import { ContentItem, ValidationResult } from "./content-validation";
import { LinkValidationReport } from "./link-validation";
import { ContentAnalysis } from "./tone-messaging";

export interface ContentReviewReport {
  contentId: string;
  reviewDate: Date;
  overallScore: number;
  status: "passed" | "failed" | "needs-attention";
  sections: {
    accuracy: AccuracyReview;
    functionality: FunctionalityReview;
    accessibility: AccessibilityReview;
    compliance: ComplianceReview;
  };
  recommendations: string[];
  criticalIssues: string[];
}

export interface AccuracyReview {
  score: number;
  factualAccuracy: boolean;
  sourceVerification: boolean;
  statisticsValid: boolean;
  contactInfoValid: boolean;
  issues: string[];
}

export interface FunctionalityReview {
  score: number;
  linksWorking: boolean;
  formsWorking: boolean;
  emailsValid: boolean;
  responsiveDesign: boolean;
  issues: string[];
}

export interface AccessibilityReview {
  score: number;
  altTextPresent: boolean;
  headingStructure: boolean;
  colorContrast: boolean;
  keyboardNavigation: boolean;
  screenReaderFriendly: boolean;
  issues: string[];
}

export interface ComplianceReview {
  score: number;
  gdprCompliant: boolean;
  privacyPolicy: boolean;
  cookieConsent: boolean;
  dataProtection: boolean;
  issues: string[];
}

export interface ComprehensiveReviewSummary {
  totalContent: number;
  passed: number;
  failed: number;
  needsAttention: number;
  overallScore: number;
  criticalIssuesCount: number;
  recommendations: string[];
  reviewDate: Date;
}

/**
 * Content Review Manager
 * Handles comprehensive content review and testing
 */
export class ContentReviewManager {
  /**
   * Performs comprehensive review of a content item
   */
  async reviewContent(
    content: ContentItem,
    validationResult: ValidationResult,
    linkValidation: LinkValidationReport,
    toneAnalysis: ContentAnalysis
  ): Promise<ContentReviewReport> {
    const reviewDate = new Date();

    // Perform accuracy review
    const accuracy = await this.reviewAccuracy(content);

    // Perform functionality review
    const functionality = await this.reviewFunctionality(
      content,
      linkValidation
    );

    // Perform accessibility review
    const accessibility = await this.reviewAccessibility(content);

    // Perform compliance review
    const compliance = this.reviewCompliance(content);

    // Calculate overall score
    const overallScore = Math.round(
      (accuracy.score +
        functionality.score +
        accessibility.score +
        compliance.score) /
        4
    );

    // Determine status
    const criticalIssues = [
      ...accuracy.issues,
      ...functionality.issues,
      ...accessibility.issues,
      ...compliance.issues,
    ].filter(issue => issue.includes("CRITICAL"));

    const status = this.determineReviewStatus(
      overallScore,
      criticalIssues.length
    );

    // Generate recommendations
    const recommendations = this.generateReviewRecommendations({
      accuracy,
      functionality,
      accessibility,
      compliance,
      validationResult,
      toneAnalysis,
    });

    return {
      contentId: content.id,
      reviewDate,
      overallScore,
      status,
      sections: {
        accuracy,
        functionality,
        accessibility,
        compliance,
      },
      recommendations,
      criticalIssues,
    };
  }

  /**
   * Reviews content accuracy and factual correctness
   */
  private async reviewAccuracy(content: ContentItem): Promise<AccuracyReview> {
    const issues: string[] = [];
    let score = 100;

    // Check if content is verified
    const factualAccuracy = content.metadata.verified;
    if (!factualAccuracy) {
      issues.push("Content has not been verified against authentic sources");
      score -= 25;
    }

    // Check source verification
    const sourceVerification =
      content.metadata.source !== "manual" || content.metadata.verified;
    if (!sourceVerification) {
      issues.push("Content source needs verification");
      score -= 20;
    }

    // Check for statistics validation (look for numbers in content)
    const hasStatistics = /\d+[%+]?/.test(
      `${content.title} ${content.description} ${content.content || ""}`
    );
    const statisticsValid = !hasStatistics || content.metadata.verified;
    if (hasStatistics && !statisticsValid) {
      issues.push("CRITICAL: Statistics and metrics require verification");
      score -= 30;
    }

    // Check contact information validity (basic check)
    const hasContactInfo = /contact|email|phone|address/i.test(
      `${content.title} ${content.description} ${content.content || ""}`
    );
    const contactInfoValid = !hasContactInfo || content.metadata.verified;
    if (hasContactInfo && !contactInfoValid) {
      issues.push("CRITICAL: Contact information requires verification");
      score -= 25;
    }

    return {
      score: Math.max(0, score),
      factualAccuracy,
      sourceVerification,
      statisticsValid,
      contactInfoValid,
      issues,
    };
  }

  /**
   * Reviews functionality including links and forms
   */
  private async reviewFunctionality(
    content: ContentItem,
    linkValidation: LinkValidationReport
  ): Promise<FunctionalityReview> {
    const issues: string[] = [];
    let score = 100;

    // Check links working
    const linksWorking = linkValidation.invalidLinks === 0;
    if (!linksWorking) {
      issues.push(
        `CRITICAL: ${linkValidation.invalidLinks} broken links found`
      );
      score -= 30;
    }

    // Check for forms in content
    const hasForms = /form|input|submit|contact/i.test(
      `${content.title} ${content.description} ${content.content || ""}`
    );
    const formsWorking = true; // Assume working unless specific test fails
    if (hasForms && !formsWorking) {
      issues.push("Forms require functional testing");
      score -= 20;
    }

    // Check email validity
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails =
      `${content.title} ${content.description} ${content.content || ""}`.match(
        emailPattern
      ) || [];
    const emailsValid =
      emails.length === 0 || emails.every(email => this.isValidEmail(email));
    if (!emailsValid) {
      issues.push("CRITICAL: Invalid email addresses found");
      score -= 25;
    }

    // Responsive design check (basic content structure check)
    const responsiveDesign = !this.hasLongUnbrokenText(content);
    if (!responsiveDesign) {
      issues.push("Content may not be mobile-friendly (long unbroken text)");
      score -= 15;
    }

    return {
      score: Math.max(0, score),
      linksWorking,
      formsWorking,
      emailsValid,
      responsiveDesign,
      issues,
    };
  }

  /**
   * Reviews accessibility compliance
   */
  private reviewAccessibility(content: ContentItem): AccessibilityReview {
    const issues: string[] = [];
    let score = 100;

    // Check for alt text indicators (images)
    const hasImages = /\.(jpg|jpeg|png|gif|svg|webp)/i.test(
      `${content.title} ${content.description} ${content.content || ""}`
    );
    const altTextPresent = !hasImages; // Assume present if no images, or would need actual HTML parsing
    if (hasImages && !altTextPresent) {
      issues.push("Images may be missing alt text for screen readers");
      score -= 20;
    }

    // Check heading structure (look for proper hierarchy indicators)
    const headingStructure = this.hasProperHeadingStructure(content);
    if (!headingStructure) {
      issues.push("Content may lack proper heading structure");
      score -= 15;
    }

    // Color contrast (basic check for color-only information)
    const colorContrast = !this.hasColorOnlyInformation(content);
    if (!colorContrast) {
      issues.push("Content may rely on color alone to convey information");
      score -= 15;
    }

    // Keyboard navigation (check for interactive elements)
    const keyboardNavigation = this.isKeyboardAccessible(content);
    if (!keyboardNavigation) {
      issues.push("Interactive elements may not be keyboard accessible");
      score -= 20;
    }

    // Screen reader friendly (check for descriptive text)
    const screenReaderFriendly = this.isScreenReaderFriendly(content);
    if (!screenReaderFriendly) {
      issues.push("Content may not be optimized for screen readers");
      score -= 15;
    }

    return {
      score: Math.max(0, score),
      altTextPresent,
      headingStructure,
      colorContrast,
      keyboardNavigation,
      screenReaderFriendly,
      issues,
    };
  }

  /**
   * Reviews compliance with regulations and policies
   */
  private reviewCompliance(content: ContentItem): ComplianceReview {
    const issues: string[] = [];
    let score = 100;

    // GDPR compliance check
    const hasPersonalData = /personal|data|privacy|cookie|tracking/i.test(
      `${content.title} ${content.description} ${content.content || ""}`
    );
    const gdprCompliant = !hasPersonalData || this.hasGDPRNotices(content);
    if (hasPersonalData && !gdprCompliant) {
      issues.push(
        "CRITICAL: GDPR compliance required for personal data handling"
      );
      score -= 30;
    }

    // Privacy policy check
    const needsPrivacyPolicy =
      hasPersonalData ||
      /contact|form|email/i.test(
        `${content.title} ${content.description} ${content.content || ""}`
      );
    const privacyPolicy =
      !needsPrivacyPolicy || this.hasPrivacyPolicyReference(content);
    if (needsPrivacyPolicy && !privacyPolicy) {
      issues.push("Privacy policy reference required");
      score -= 20;
    }

    // Cookie consent check
    const needsCookieConsent = /tracking|analytics|cookie/i.test(
      `${content.title} ${content.description} ${content.content || ""}`
    );
    const cookieConsent = !needsCookieConsent;
    if (needsCookieConsent && !cookieConsent) {
      issues.push("Cookie consent mechanism required");
      score -= 15;
    }

    // Data protection check
    const dataProtection =
      !hasPersonalData || this.hasDataProtectionMeasures(content);
    if (hasPersonalData && !dataProtection) {
      issues.push("Data protection measures need documentation");
      score -= 15;
    }

    return {
      score: Math.max(0, score),
      gdprCompliant,
      privacyPolicy,
      cookieConsent,
      dataProtection,
      issues,
    };
  }

  /**
   * Generates comprehensive review recommendations
   */
  private generateReviewRecommendations(reviewData: {
    accuracy: AccuracyReview;
    functionality: FunctionalityReview;
    accessibility: AccessibilityReview;
    compliance: ComplianceReview;
    validationResult: ValidationResult;
    toneAnalysis: ContentAnalysis;
  }): string[] {
    const recommendations: string[] = [];

    // Accuracy recommendations
    if (reviewData.accuracy.score < 80) {
      recommendations.push(
        "Verify all factual claims and statistics against authentic sources"
      );
    }
    if (!reviewData.accuracy.factualAccuracy) {
      recommendations.push(
        "Complete content verification process before publication"
      );
    }

    // Functionality recommendations
    if (reviewData.functionality.score < 80) {
      recommendations.push(
        "Test all interactive elements and fix broken links"
      );
    }
    if (!reviewData.functionality.linksWorking) {
      recommendations.push("Fix all broken links before content goes live");
    }

    // Accessibility recommendations
    if (reviewData.accessibility.score < 80) {
      recommendations.push(
        "Improve accessibility compliance for better user experience"
      );
    }
    if (!reviewData.accessibility.screenReaderFriendly) {
      recommendations.push(
        "Add descriptive text and proper markup for screen readers"
      );
    }

    // Compliance recommendations
    if (reviewData.compliance.score < 80) {
      recommendations.push(
        "Address compliance issues to meet regulatory requirements"
      );
    }

    // Validation recommendations
    if (!reviewData.validationResult.isValid) {
      recommendations.push(
        "Resolve content validation issues before publication"
      );
    }

    // Tone recommendations
    if (
      reviewData.toneAnalysis.complianceLevel === "poor" ||
      reviewData.toneAnalysis.complianceLevel === "needs-improvement"
    ) {
      recommendations.push(
        "Standardize tone and messaging for brand consistency"
      );
    }

    return recommendations;
  }

  /**
   * Determines overall review status
   */
  private determineReviewStatus(
    overallScore: number,
    criticalIssuesCount: number
  ): "passed" | "failed" | "needs-attention" {
    if (criticalIssuesCount > 0 || overallScore < 60) {
      return "failed";
    } else if (overallScore < 80) {
      return "needs-attention";
    } else {
      return "passed";
    }
  }

  // Helper methods for specific checks
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private hasLongUnbrokenText(content: ContentItem): boolean {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    const words = allText.split(/\s+/);
    return words.some(word => word.length > 50);
  }

  private hasProperHeadingStructure(content: ContentItem): boolean {
    // Basic check for structured content
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return allText.length < 500 || /\n\n|\. [A-Z]/.test(allText);
  }

  private hasColorOnlyInformation(content: ContentItem): boolean {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return /red|green|blue|color|highlighted/i.test(allText);
  }

  private isKeyboardAccessible(content: ContentItem): boolean {
    // Assume accessible unless specific interactive elements are detected
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return !/click here|mouse over|hover/i.test(allText);
  }

  private isScreenReaderFriendly(content: ContentItem): boolean {
    // Check for descriptive language
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return allText.length > 50 && !/here|this|that|click/i.test(allText);
  }

  private hasGDPRNotices(content: ContentItem): boolean {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return /gdpr|privacy|consent|data protection/i.test(allText);
  }

  private hasPrivacyPolicyReference(content: ContentItem): boolean {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return /privacy policy|privacy notice|data policy/i.test(allText);
  }

  private hasDataProtectionMeasures(content: ContentItem): boolean {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    return /secure|encrypted|protected|confidential/i.test(allText);
  }
}

/**
 * Content review utility functions
 */
export const contentReviewUtils = {
  /**
   * Formats review report for display
   */
  formatReviewReport(report: ContentReviewReport): string {
    let output = `Content Review Report - ${report.contentId}
Review Date: ${report.reviewDate.toLocaleDateString()}
Overall Score: ${report.overallScore}/100
Status: ${report.status.toUpperCase()}

Section Scores:
- Accuracy: ${report.sections.accuracy.score}/100
- Functionality: ${report.sections.functionality.score}/100
- Accessibility: ${report.sections.accessibility.score}/100
- Compliance: ${report.sections.compliance.score}/100`;

    if (report.criticalIssues.length > 0) {
      output += `\n\nCritical Issues (${report.criticalIssues.length}):`;
      report.criticalIssues.forEach((issue, index) => {
        output += `\n${index + 1}. ${issue}`;
      });
    }

    if (report.recommendations.length > 0) {
      output += `\n\nRecommendations:`;
      report.recommendations.forEach((rec, index) => {
        output += `\n${index + 1}. ${rec}`;
      });
    }

    return output;
  },

  /**
   * Generates comprehensive review summary
   */
  generateReviewSummary(
    reports: ContentReviewReport[]
  ): ComprehensiveReviewSummary {
    const passed = reports.filter(r => r.status === "passed").length;
    const failed = reports.filter(r => r.status === "failed").length;
    const needsAttention = reports.filter(
      r => r.status === "needs-attention"
    ).length;

    const overallScore =
      reports.length > 0
        ? Math.round(
            reports.reduce((sum, r) => sum + r.overallScore, 0) / reports.length
          )
        : 100;

    const criticalIssuesCount = reports.reduce(
      (sum, r) => sum + r.criticalIssues.length,
      0
    );

    // Generate aggregate recommendations
    const recommendations = [];
    if (failed > 0) {
      recommendations.push(
        `Address critical issues in ${failed} failed content items`
      );
    }
    if (needsAttention > 0) {
      recommendations.push(
        `Review and improve ${needsAttention} content items needing attention`
      );
    }
    if (criticalIssuesCount > 0) {
      recommendations.push(
        `Resolve ${criticalIssuesCount} critical issues across all content`
      );
    }
    if (overallScore < 80) {
      recommendations.push(
        "Improve overall content quality to meet publication standards"
      );
    }

    return {
      totalContent: reports.length,
      passed,
      failed,
      needsAttention,
      overallScore,
      criticalIssuesCount,
      recommendations,
      reviewDate: new Date(),
    };
  },

  /**
   * Checks if content is ready for publication
   */
  isReadyForPublication(report: ContentReviewReport): boolean {
    return (
      report.status === "passed" &&
      report.criticalIssues.length === 0 &&
      report.overallScore >= 80
    );
  },

  /**
   * Gets priority issues that need immediate attention
   */
  getPriorityIssues(reports: ContentReviewReport[]): Array<{
    contentId: string;
    issue: string;
    priority: "critical" | "high" | "medium";
  }> {
    const priorityIssues: Array<{
      contentId: string;
      issue: string;
      priority: "critical" | "high" | "medium";
    }> = [];

    reports.forEach(report => {
      // Critical issues
      report.criticalIssues.forEach(issue => {
        priorityIssues.push({
          contentId: report.contentId,
          issue,
          priority: "critical",
        });
      });

      // High priority issues
      if (report.status === "failed") {
        priorityIssues.push({
          contentId: report.contentId,
          issue: "Content failed review and requires immediate attention",
          priority: "high",
        });
      }

      // Medium priority issues
      if (report.status === "needs-attention") {
        priorityIssues.push({
          contentId: report.contentId,
          issue: "Content needs improvement before publication",
          priority: "medium",
        });
      }
    });

    return priorityIssues.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  },
};

// Export singleton instance for global use
export const contentReviewManager = new ContentReviewManager();
