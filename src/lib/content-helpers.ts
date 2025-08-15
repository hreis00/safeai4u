/**
 * Content Helper Functions
 *
 * This module provides high-level helper functions that integrate content validation
 * and audit systems for easy use throughout the SAFE AI [4U] website.
 */

import {
  ContentItem,
  ContentValidator,
  ValidationResult,
  contentValidationUtils,
} from "./content-validation";
import {
  contentAuditManager,
  AuditReport,
  contentAuditUtils,
} from "./content-audit";
import {
  contentLinkScanner,
  LinkValidationReport,
  linkValidationUtils,
} from "./link-validation";
import { contentVersionManager, ContentVersion } from "./content-versioning";
import {
  toneMessagingAnalyzer,
  ContentAnalysis,
  toneMessagingUtils,
} from "./tone-messaging";
import {
  contentReviewManager,
  ContentReviewReport,
  contentReviewUtils,
} from "./content-review";

// Initialize validator instance
const validator = new ContentValidator();

/**
 * Content management helper functions
 */
export const contentHelpers = {
  /**
   * Creates and validates a new content item with full validation suite
   */
  async createContent(
    id: string,
    type: ContentItem["type"],
    title: string,
    description: string,
    content?: string,
    userId?: string
  ): Promise<{
    content: ContentItem;
    validation: ValidationResult;
    linkValidation: LinkValidationReport;
    version: ContentVersion;
  }> {
    // Create content item with default metadata
    let contentItem = contentValidationUtils.createContentItem(
      id,
      type,
      title,
      description,
      content
    );

    // Add appropriate SEO keywords
    contentItem.metadata.seoKeywords =
      contentValidationUtils.generateAIKeywords(type);

    // Validate the content
    const validationResult = validator.validateContent(contentItem);

    // Validate links in content
    const linkScanResult = await contentLinkScanner.scanContentLinks({
      title: contentItem.title,
      description: contentItem.description,
      content: contentItem.content,
    });

    // Update metadata based on validation
    contentItem = contentValidationUtils.updateContentMetadata(
      contentItem,
      validationResult,
      "manual"
    );

    // Create initial version
    const initialVersion = contentVersionManager.createInitialVersion(
      contentItem,
      userId,
      "Initial content creation with validation"
    );

    // Register in audit system
    contentAuditManager.registerContent(contentItem, userId);
    contentAuditManager.recordValidation(
      contentItem.id,
      validationResult,
      userId
    );

    return {
      content: contentItem,
      validation: validationResult,
      linkValidation: linkScanResult.report,
      version: initialVersion,
    };
  },

  /**
   * Updates existing content with full validation suite and versioning
   */
  async updateContent(
    contentId: string,
    updates: Partial<Pick<ContentItem, "title" | "description" | "content">>,
    userId?: string,
    notes?: string
  ): Promise<{
    content: ContentItem;
    validation: ValidationResult;
    linkValidation: LinkValidationReport;
    version: ContentVersion;
  }> {
    // Get existing content (in a real app, this would come from a database)
    const existingContent = this.getContentById(contentId);
    if (!existingContent) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    // Apply updates
    const updatedContent: ContentItem = {
      ...existingContent,
      ...updates,
      metadata: {
        ...existingContent.metadata,
        lastUpdated: new Date(),
        needsReview: true, // Flag for review after updates
      },
    };

    // Validate updated content
    const validationResult = validator.validateContent(updatedContent);

    // Validate links in updated content
    const linkScanResult = await contentLinkScanner.scanContentLinks({
      title: updatedContent.title,
      description: updatedContent.description,
      content: updatedContent.content,
    });

    // Update metadata based on validation
    const finalContent = contentValidationUtils.updateContentMetadata(
      updatedContent,
      validationResult,
      "manual"
    );

    // Create new version
    const newVersion = contentVersionManager.createNewVersion(
      contentId,
      finalContent,
      userId,
      notes || "Content update with validation",
      ["update"]
    );

    // Record changes in audit system
    contentAuditManager.recordContentUpdate(
      contentId,
      finalContent,
      userId,
      notes
    );
    contentAuditManager.recordValidation(contentId, validationResult, userId);

    return {
      content: finalContent,
      validation: validationResult,
      linkValidation: linkScanResult.report,
      version: newVersion,
    };
  },

  /**
   * Validates existing content and updates audit records
   */
  async validateContent(
    contentId: string,
    userId?: string
  ): Promise<ValidationResult> {
    const content = this.getContentById(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    const validationResult = validator.validateContent(content);
    contentAuditManager.recordValidation(contentId, validationResult, userId);

    return validationResult;
  },

  /**
   * Verifies content as authentic and accurate
   */
  async verifyContent(
    contentId: string,
    userId: string,
    notes?: string
  ): Promise<void> {
    contentAuditManager.verifyContent(contentId, userId, notes);
  },

  /**
   * Flags content for review with specific reason
   */
  async flagContentForReview(
    contentId: string,
    reason: string,
    userId?: string
  ): Promise<void> {
    contentAuditManager.flagForReview(contentId, reason, userId);
  },

  /**
   * Gets comprehensive audit report
   */
  getAuditReport(): AuditReport {
    return contentAuditManager.generateAuditReport();
  },

  /**
   * Gets formatted audit summary
   */
  getAuditSummary(): string {
    const report = contentAuditManager.generateAuditReport();
    return contentAuditUtils.formatAuditSummary(report);
  },

  /**
   * Gets content that needs attention
   */
  getContentNeedingAttention(): {
    needingReview: ContentItem[];
    unverified: ContentItem[];
    recommendations: string[];
  } {
    const needingReview = contentAuditManager.getContentNeedingReview();
    const unverified = contentAuditManager.getUnverifiedContent();
    const report = contentAuditManager.generateAuditReport();
    const recommendations = contentAuditUtils.generateRecommendations(report);

    return {
      needingReview,
      unverified,
      recommendations,
    };
  },

  /**
   * Validates all content and generates quality report
   */
  async validateAllContent(userId?: string): Promise<{
    results: Array<{ contentId: string; validation: ValidationResult }>;
    summary: {
      total: number;
      passed: number;
      failed: number;
      averageScore: number;
    };
  }> {
    const allContent = this.getAllContent();
    const results: Array<{ contentId: string; validation: ValidationResult }> =
      [];

    for (const content of allContent) {
      const validation = await this.validateContent(content.id, userId);
      results.push({ contentId: content.id, validation });
    }

    const passed = results.filter(r => r.validation.isValid).length;
    const failed = results.length - passed;
    const averageScore =
      results.reduce((sum, r) => sum + r.validation.score, 0) / results.length;

    return {
      results,
      summary: {
        total: results.length,
        passed,
        failed,
        averageScore: Math.round(averageScore),
      },
    };
  },

  /**
   * Checks if content meets quality standards for publication
   */
  isReadyForPublication(contentId: string): boolean {
    const content = this.getContentById(contentId);
    if (!content) return false;

    return contentValidationUtils.meetsQualityStandards(content);
  },

  /**
   * Gets content audit history
   */
  getContentHistory(contentId: string) {
    return contentAuditManager.getContentAuditHistory(contentId);
  },

  /**
   * Placeholder method to get content by ID
   * In a real application, this would query a database
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getContentById(_contentId: string): ContentItem | null {
    // TODO: In a real application, this would query a database using contentId
    // This is a placeholder - in a real app, you'd query your database
    // For now, we'll return null to indicate content not found
    return null;
  },

  /**
   * Placeholder method to get all content
   * In a real application, this would query a database
   */
  getAllContent(): ContentItem[] {
    // This is a placeholder - in a real app, you'd query your database
    return [];
  },

  /**
   * Comprehensive content validation with all systems including tone and messaging
   */
  async performComprehensiveValidation(
    contentId: string,
    userId?: string
  ): Promise<{
    contentValidation: ValidationResult;
    linkValidation: LinkValidationReport;
    toneAnalysis: ContentAnalysis;
    versionInfo: ContentVersion | null;
    recommendations: string[];
  }> {
    const content = this.getContentById(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    // Perform content validation
    const contentValidation = validator.validateContent(content);

    // Perform link validation
    const linkScanResult = await contentLinkScanner.scanContentLinks({
      title: content.title,
      description: content.description,
      content: content.content,
    });

    // Perform tone and messaging analysis
    const toneAnalysis = toneMessagingAnalyzer.analyzeContent({
      title: content.title,
      description: content.description,
      content: content.content,
    });

    // Get version information
    const versionInfo = contentVersionManager.getCurrentVersion(contentId);

    // Generate comprehensive recommendations
    const recommendations = [
      ...contentValidation.suggestions,
      ...linkValidationUtils.generateLinkRecommendations(linkScanResult.report),
      ...toneMessagingUtils.generateToneRecommendations(toneAnalysis),
    ];

    // Record validation in audit system
    contentAuditManager.recordValidation(contentId, contentValidation, userId);

    return {
      contentValidation,
      linkValidation: linkScanResult.report,
      toneAnalysis,
      versionInfo,
      recommendations,
    };
  },

  /**
   * Validates all content with comprehensive reporting
   */
  async validateAllContentComprehensive(userId?: string): Promise<{
    contentResults: Array<{
      contentId: string;
      contentValidation: ValidationResult;
      linkValidation: LinkValidationReport;
    }>;
    aggregateReport: {
      totalContent: number;
      contentPassed: number;
      linksPassed: number;
      overallScore: number;
      criticalIssues: number;
    };
    recommendations: string[];
  }> {
    const allContent = this.getAllContent();
    const contentResults = [];
    let totalContentScore = 0;
    let totalLinkScore = 0;
    let criticalIssues = 0;

    for (const content of allContent) {
      const validation = await this.performComprehensiveValidation(
        content.id,
        userId
      );

      contentResults.push({
        contentId: content.id,
        contentValidation: validation.contentValidation,
        linkValidation: validation.linkValidation,
      });

      totalContentScore += validation.contentValidation.score;

      const linkSuccessRate =
        validation.linkValidation.totalLinks > 0
          ? (validation.linkValidation.validLinks /
              validation.linkValidation.totalLinks) *
            100
          : 100;
      totalLinkScore += linkSuccessRate;

      criticalIssues += validation.contentValidation.issues.filter(
        i => i.severity === "critical"
      ).length;
      criticalIssues += validation.linkValidation.brokenLinks.length;
    }

    const contentPassed = contentResults.filter(
      r => r.contentValidation.isValid
    ).length;
    const linksPassed = contentResults.filter(r =>
      linkValidationUtils.meetsLinkQualityStandards(r.linkValidation)
    ).length;

    const overallScore =
      allContent.length > 0
        ? Math.round(
            (totalContentScore + totalLinkScore) / (allContent.length * 2)
          )
        : 100;

    // Generate aggregate recommendations
    const recommendations = [];
    if (contentPassed < allContent.length * 0.8) {
      recommendations.push("Improve content validation rate (target: 80%)");
    }
    if (linksPassed < allContent.length * 0.9) {
      recommendations.push(
        "Fix broken links and improve link quality (target: 90%)"
      );
    }
    if (criticalIssues > 0) {
      recommendations.push(
        `Address ${criticalIssues} critical issues immediately`
      );
    }

    return {
      contentResults,
      aggregateReport: {
        totalContent: allContent.length,
        contentPassed,
        linksPassed,
        overallScore,
        criticalIssues,
      },
      recommendations,
    };
  },

  /**
   * Gets content authenticity flags and verification status
   */
  getContentAuthenticityStatus(contentId: string): {
    isAuthentic: boolean;
    verificationScore: number;
    authenticityFlags: string[];
    needsVerification: boolean;
  } {
    const content = this.getContentById(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    const authenticityFlags = [];
    const verificationScore = content.metadata.authenticityScore;

    // Check for authenticity markers
    if (!content.metadata.verified) {
      authenticityFlags.push("unverified");
    }
    if (content.metadata.needsReview) {
      authenticityFlags.push("needs-review");
    }
    if (content.metadata.source === "manual") {
      authenticityFlags.push("manual-entry");
    }
    if (verificationScore < 70) {
      authenticityFlags.push("low-authenticity-score");
    }

    return {
      isAuthentic: content.metadata.verified && verificationScore >= 70,
      verificationScore,
      authenticityFlags,
      needsVerification:
        !content.metadata.verified || content.metadata.needsReview,
    };
  },

  /**
   * Batch validates multiple content items for authenticity
   */
  async batchValidateAuthenticity(
    contentIds: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId?: string
  ): Promise<{
    results: Array<{
      contentId: string;
      isAuthentic: boolean;
      issues: string[];
    }>;
    summary: {
      total: number;
      authentic: number;
      needsAttention: number;
    };
  }> {
    // TODO: In a real implementation, userId would be used for audit logging
    const results = [];
    let authenticCount = 0;

    for (const contentId of contentIds) {
      try {
        const status = this.getContentAuthenticityStatus(contentId);
        const issues = status.authenticityFlags;

        results.push({
          contentId,
          isAuthentic: status.isAuthentic,
          issues,
        });

        if (status.isAuthentic) {
          authenticCount++;
        }
      } catch (error) {
        results.push({
          contentId,
          isAuthentic: false,
          issues: [
            `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          ],
        });
      }
    }

    return {
      results,
      summary: {
        total: contentIds.length,
        authentic: authenticCount,
        needsAttention: contentIds.length - authenticCount,
      },
    };
  },

  /**
   * Analyzes and standardizes content tone and messaging
   */
  async standardizeContentToneAndMessaging(
    contentId: string,
    userId?: string
  ): Promise<{
    analysis: ContentAnalysis;
    standardized: {
      title: string;
      description: string;
      content?: string;
    };
    changes: Array<{
      field: string;
      original: string;
      standardized: string;
      reason: string;
    }>;
  }> {
    const content = this.getContentById(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    // Analyze current tone and messaging
    const analysis = toneMessagingAnalyzer.analyzeContent({
      title: content.title,
      description: content.description,
      content: content.content,
    });

    // Standardize content
    const standardizationResult = toneMessagingAnalyzer.standardizeContent({
      title: content.title,
      description: content.description,
      content: content.content,
    });

    // If changes were made, update the content
    if (standardizationResult.changes.length > 0) {
      await this.updateContent(
        contentId,
        {
          title: standardizationResult.standardized.title,
          description: standardizationResult.standardized.description,
          content: standardizationResult.standardized.content,
        },
        userId,
        "Standardized tone and messaging for consistency"
      );
    }

    return {
      analysis,
      standardized: standardizationResult.standardized,
      changes: standardizationResult.changes,
    };
  },

  /**
   * Batch standardizes tone and messaging for multiple content items
   */
  async batchStandardizeToneAndMessaging(
    contentIds: string[],
    userId?: string
  ): Promise<{
    results: Array<{
      contentId: string;
      analysis: ContentAnalysis;
      changesCount: number;
      success: boolean;
      error?: string;
    }>;
    summary: {
      total: number;
      standardized: number;
      failed: number;
      totalChanges: number;
    };
  }> {
    const results = [];
    let totalChanges = 0;
    let standardizedCount = 0;

    for (const contentId of contentIds) {
      try {
        const result = await this.standardizeContentToneAndMessaging(
          contentId,
          userId
        );

        results.push({
          contentId,
          analysis: result.analysis,
          changesCount: result.changes.length,
          success: true,
        });

        totalChanges += result.changes.length;
        if (result.changes.length > 0) {
          standardizedCount++;
        }
      } catch (error) {
        results.push({
          contentId,
          analysis: {
            toneScore: 0,
            messagingScore: 0,
            consistencyScore: 0,
            issues: [],
            suggestions: [],
            complianceLevel: "poor" as const,
          },
          changesCount: 0,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return {
      results,
      summary: {
        total: contentIds.length,
        standardized: standardizedCount,
        failed: results.filter(r => !r.success).length,
        totalChanges,
      },
    };
  },

  /**
   * Validates content against company messaging standards
   */
  validateCompanyMessaging(contentId: string): {
    hasCompanyValues: boolean;
    hasKeyMessages: boolean;
    alignsWithBrandVoice: boolean;
    score: number;
    recommendations: string[];
  } {
    const content = this.getContentById(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    const validation = toneMessagingUtils.validateCompanyMessaging(allText);

    const recommendations = [];
    if (!validation.hasCompanyValues) {
      recommendations.push(
        "Include company values like 'AI with conscience' and 'responsible AI'"
      );
    }
    if (!validation.hasKeyMessages) {
      recommendations.push(
        "Incorporate key messages about expert AI consulting and healthcare AI"
      );
    }
    if (!validation.alignsWithBrandVoice) {
      recommendations.push(
        "Align content with professional, ethical brand voice characteristics"
      );
    }

    return {
      ...validation,
      recommendations,
    };
  },

  /**
   * Performs final comprehensive content review
   */
  async performFinalContentReview(
    contentId: string,
    userId?: string
  ): Promise<ContentReviewReport> {
    const content = this.getContentById(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    // Get all validation results
    const validation = await this.performComprehensiveValidation(
      contentId,
      userId
    );

    // Perform final review
    const reviewReport = await contentReviewManager.reviewContent(
      content,
      validation.contentValidation,
      validation.linkValidation,
      validation.toneAnalysis
    );

    return reviewReport;
  },

  /**
   * Performs final review for all content
   */
  async performFinalReviewForAllContent(userId?: string): Promise<{
    reports: ContentReviewReport[];
    summary: {
      totalContent: number;
      passed: number;
      failed: number;
      needsAttention: number;
      overallScore: number;
      criticalIssuesCount: number;
      recommendations: string[];
    };
    priorityIssues: Array<{
      contentId: string;
      issue: string;
      priority: "critical" | "high" | "medium";
    }>;
  }> {
    const allContent = this.getAllContent();
    const reports: ContentReviewReport[] = [];

    for (const content of allContent) {
      try {
        const report = await this.performFinalContentReview(content.id, userId);
        reports.push(report);
      } catch (error) {
        console.error(`Failed to review content ${content.id}:`, error);
      }
    }

    const summary = contentReviewUtils.generateReviewSummary(reports);
    const priorityIssues = contentReviewUtils.getPriorityIssues(reports);

    return {
      reports,
      summary,
      priorityIssues,
    };
  },

  /**
   * Checks if content is ready for publication
   */
  isContentReadyForPublication(contentId: string): Promise<{
    ready: boolean;
    report: ContentReviewReport;
    blockers: string[];
  }> {
    return this.performFinalContentReview(contentId).then(report => {
      const ready = contentReviewUtils.isReadyForPublication(report);
      const blockers = ready
        ? []
        : [
            ...report.criticalIssues,
            ...(report.status === "failed"
              ? ["Content failed overall review"]
              : []),
            ...(report.overallScore < 80
              ? ["Overall score below publication threshold"]
              : []),
          ];

      return {
        ready,
        report,
        blockers,
      };
    });
  },

  /**
   * Tests all contact forms and email links
   */
  async testContactFunctionality(): Promise<{
    emailTests: Array<{
      email: string;
      isValid: boolean;
      error?: string;
    }>;
    formTests: Array<{
      formId: string;
      isWorking: boolean;
      error?: string;
    }>;
    summary: {
      totalEmails: number;
      validEmails: number;
      totalForms: number;
      workingForms: number;
    };
  }> {
    // This is a placeholder implementation
    // In a real application, you would test actual forms and email addresses
    const emailTests = [
      { email: "contact@safe-ai-4u.eu", isValid: true },
      { email: "info@safe-ai-4u.eu", isValid: true },
    ];

    const formTests = [
      { formId: "contact-form", isWorking: true },
      { formId: "service-inquiry-form", isWorking: true },
    ];

    return {
      emailTests,
      formTests,
      summary: {
        totalEmails: emailTests.length,
        validEmails: emailTests.filter(t => t.isValid).length,
        totalForms: formTests.length,
        workingForms: formTests.filter(t => t.isWorking).length,
      },
    };
  },

  /**
   * Performs accessibility audit on content
   */
  async performAccessibilityAudit(): Promise<{
    overallScore: number;
    issues: Array<{
      type: string;
      severity: "low" | "medium" | "high" | "critical";
      description: string;
      recommendation: string;
    }>;
    recommendations: string[];
  }> {
    // This is a placeholder implementation
    // In a real application, you would use accessibility testing tools
    const issues = [
      {
        type: "alt-text",
        severity: "medium" as const,
        description: "Some images may be missing alt text",
        recommendation: "Add descriptive alt text to all images",
      },
      {
        type: "heading-structure",
        severity: "low" as const,
        description: "Heading hierarchy could be improved",
        recommendation: "Ensure proper h1-h6 heading structure",
      },
    ];

    const overallScore = 85; // Placeholder score
    const recommendations = [
      "Add alt text to all images for screen reader accessibility",
      "Ensure proper heading hierarchy throughout content",
      "Test keyboard navigation for all interactive elements",
      "Verify color contrast meets WCAG guidelines",
    ];

    return {
      overallScore,
      issues,
      recommendations,
    };
  },
};

/**
 * Content validation constants and configurations
 */
export const contentConfig = {
  // Quality thresholds
  qualityThresholds: {
    minimumAuthenticityScore: 70,
    minimumProfessionalScore: 70,
    maximumCriticalIssues: 0,
    minimumVerificationRate: 80, // percentage
  },

  // SEO optimization targets
  seoTargets: {
    maxTitleLength: 60,
    maxDescriptionLength: 160,
    minKeywordCount: 3,
    maxKeywordCount: 10,
  },

  // Required AI-related keywords for different content types
  requiredKeywords: {
    hero: ["responsible AI", "AI consulting"],
    service: ["AI development", "AI education"],
    project: ["AI implementation", "AI solutions"],
    testimonial: ["AI success"],
    contact: ["AI consultation"],
  },

  // Company values that should be emphasized
  companyValues: [
    "responsible AI",
    "ethical AI",
    "AI with conscience",
    "serving humanity",
    "healthcare AI",
    "education AI",
    "societal impact",
  ],
};

/**
 * Utility function to check if the content system is properly configured
 */
export function validateContentSystem(): {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check if audit system is initialized
  try {
    const report = contentAuditManager.generateAuditReport();
    if (report.totalContent === 0) {
      recommendations.push(
        "No content registered in audit system - begin by registering existing content"
      );
    }
  } catch {
    issues.push("Audit system initialization failed");
  }

  // Check validator functionality
  try {
    const testContent = contentValidationUtils.createContentItem(
      "test",
      "hero",
      "Test Title",
      "Test Description"
    );
    validator.validateContent(testContent);
  } catch {
    issues.push("Content validator initialization failed");
  }

  if (issues.length === 0 && recommendations.length === 0) {
    recommendations.push(
      "Content validation and audit system is properly configured"
    );
  }

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}
