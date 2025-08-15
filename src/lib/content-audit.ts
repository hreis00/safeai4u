/**
 * Content Audit System
 *
 * This module provides functionality to track content changes, verification status,
 * and maintain an audit trail for all content modifications on the SAFE AI [4U] website.
 */

import { ContentItem, ValidationResult } from "./content-validation";

export interface AuditEntry {
  id: string;
  contentId: string;
  timestamp: Date;
  action: AuditAction;
  userId?: string;
  changes: ContentChange[];
  validationResult?: ValidationResult;
  notes?: string;
}

export type AuditAction =
  | "created"
  | "updated"
  | "validated"
  | "verified"
  | "flagged"
  | "approved"
  | "rejected";

export interface ContentChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changeType: "addition" | "modification" | "deletion";
}

export interface AuditReport {
  totalContent: number;
  verifiedContent: number;
  pendingReview: number;
  criticalIssues: number;
  lastAuditDate: Date;
  contentByType: Record<string, number>;
  recentChanges: AuditEntry[];
}

/**
 * Content Audit Manager
 * Handles tracking and reporting of content changes and verification status
 */
export class ContentAuditManager {
  private auditLog: AuditEntry[] = [];
  private contentRegistry: Map<string, ContentItem> = new Map();

  /**
   * Registers a new content item in the audit system
   */
  registerContent(content: ContentItem, userId?: string): void {
    this.contentRegistry.set(content.id, content);

    const auditEntry: AuditEntry = {
      id: this.generateAuditId(),
      contentId: content.id,
      timestamp: new Date(),
      action: "created",
      userId,
      changes: [
        {
          field: "content",
          oldValue: null,
          newValue: content,
          changeType: "addition",
        },
      ],
      notes: `Content item created: ${content.type} - ${content.title}`,
    };

    this.auditLog.push(auditEntry);
  }

  /**
   * Records content updates and tracks changes
   */
  recordContentUpdate(
    contentId: string,
    updatedContent: ContentItem,
    userId?: string,
    notes?: string
  ): void {
    const existingContent = this.contentRegistry.get(contentId);
    if (!existingContent) {
      throw new Error(`Content with ID ${contentId} not found in registry`);
    }

    const changes = this.detectChanges(existingContent, updatedContent);
    this.contentRegistry.set(contentId, updatedContent);

    const auditEntry: AuditEntry = {
      id: this.generateAuditId(),
      contentId,
      timestamp: new Date(),
      action: "updated",
      userId,
      changes,
      notes,
    };

    this.auditLog.push(auditEntry);
  }

  /**
   * Records validation results for content
   */
  recordValidation(
    contentId: string,
    validationResult: ValidationResult,
    userId?: string
  ): void {
    const auditEntry: AuditEntry = {
      id: this.generateAuditId(),
      contentId,
      timestamp: new Date(),
      action: "validated",
      userId,
      changes: [],
      validationResult,
      notes: `Validation completed. Score: ${validationResult.score}. Issues: ${validationResult.issues.length}`,
    };

    this.auditLog.push(auditEntry);
  }

  /**
   * Marks content as verified by an authorized user
   */
  verifyContent(contentId: string, userId: string, notes?: string): void {
    const content = this.contentRegistry.get(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    // Update content verification status
    const updatedContent: ContentItem = {
      ...content,
      metadata: {
        ...content.metadata,
        verified: true,
        needsReview: false,
        lastUpdated: new Date(),
      },
    };

    this.contentRegistry.set(contentId, updatedContent);

    const auditEntry: AuditEntry = {
      id: this.generateAuditId(),
      contentId,
      timestamp: new Date(),
      action: "verified",
      userId,
      changes: [
        {
          field: "metadata.verified",
          oldValue: false,
          newValue: true,
          changeType: "modification",
        },
      ],
      notes: notes || "Content verified by authorized user",
    };

    this.auditLog.push(auditEntry);
  }

  /**
   * Flags content for review
   */
  flagForReview(contentId: string, reason: string, userId?: string): void {
    const content = this.contentRegistry.get(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    const updatedContent: ContentItem = {
      ...content,
      metadata: {
        ...content.metadata,
        needsReview: true,
        reviewNotes: reason,
        lastUpdated: new Date(),
      },
    };

    this.contentRegistry.set(contentId, updatedContent);

    const auditEntry: AuditEntry = {
      id: this.generateAuditId(),
      contentId,
      timestamp: new Date(),
      action: "flagged",
      userId,
      changes: [
        {
          field: "metadata.needsReview",
          oldValue: false,
          newValue: true,
          changeType: "modification",
        },
      ],
      notes: `Content flagged for review: ${reason}`,
    };

    this.auditLog.push(auditEntry);
  }

  /**
   * Generates a comprehensive audit report
   */
  generateAuditReport(): AuditReport {
    const allContent = Array.from(this.contentRegistry.values());
    const verifiedContent = allContent.filter(c => c.metadata.verified);
    const pendingReview = allContent.filter(c => c.metadata.needsReview);

    // Count critical issues from recent validations
    const recentValidations = this.auditLog
      .filter(entry => entry.action === "validated" && entry.validationResult)
      .slice(-10); // Last 10 validations

    const criticalIssues = recentValidations.reduce((count, entry) => {
      const criticalCount =
        entry.validationResult?.issues.filter(
          issue => issue.severity === "critical"
        ).length || 0;
      return count + criticalCount;
    }, 0);

    // Group content by type
    const contentByType = allContent.reduce(
      (acc, content) => {
        acc[content.type] = (acc[content.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Get recent changes (last 20 entries)
    const recentChanges = this.auditLog
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 20);

    return {
      totalContent: allContent.length,
      verifiedContent: verifiedContent.length,
      pendingReview: pendingReview.length,
      criticalIssues,
      lastAuditDate: new Date(),
      contentByType,
      recentChanges,
    };
  }

  /**
   * Gets audit history for a specific content item
   */
  getContentAuditHistory(contentId: string): AuditEntry[] {
    return this.auditLog
      .filter(entry => entry.contentId === contentId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Gets all content items that need review
   */
  getContentNeedingReview(): ContentItem[] {
    return Array.from(this.contentRegistry.values()).filter(
      content => content.metadata.needsReview
    );
  }

  /**
   * Gets all unverified content items
   */
  getUnverifiedContent(): ContentItem[] {
    return Array.from(this.contentRegistry.values()).filter(
      content => !content.metadata.verified
    );
  }

  /**
   * Exports audit log for external analysis
   */
  exportAuditLog(): AuditEntry[] {
    return [...this.auditLog].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  /**
   * Imports content registry from external source
   */
  importContentRegistry(content: ContentItem[]): void {
    content.forEach(item => {
      this.contentRegistry.set(item.id, item);
    });
  }

  private detectChanges(
    oldContent: ContentItem,
    newContent: ContentItem
  ): ContentChange[] {
    const changes: ContentChange[] = [];

    // Check title changes
    if (oldContent.title !== newContent.title) {
      changes.push({
        field: "title",
        oldValue: oldContent.title,
        newValue: newContent.title,
        changeType: "modification",
      });
    }

    // Check description changes
    if (oldContent.description !== newContent.description) {
      changes.push({
        field: "description",
        oldValue: oldContent.description,
        newValue: newContent.description,
        changeType: "modification",
      });
    }

    // Check content changes
    if (oldContent.content !== newContent.content) {
      changes.push({
        field: "content",
        oldValue: oldContent.content,
        newValue: newContent.content,
        changeType: "modification",
      });
    }

    // Check metadata changes
    const oldMeta = oldContent.metadata;
    const newMeta = newContent.metadata;

    if (oldMeta.verified !== newMeta.verified) {
      changes.push({
        field: "metadata.verified",
        oldValue: oldMeta.verified,
        newValue: newMeta.verified,
        changeType: "modification",
      });
    }

    if (oldMeta.authenticityScore !== newMeta.authenticityScore) {
      changes.push({
        field: "metadata.authenticityScore",
        oldValue: oldMeta.authenticityScore,
        newValue: newMeta.authenticityScore,
        changeType: "modification",
      });
    }

    if (
      JSON.stringify(oldMeta.seoKeywords) !==
      JSON.stringify(newMeta.seoKeywords)
    ) {
      changes.push({
        field: "metadata.seoKeywords",
        oldValue: oldMeta.seoKeywords,
        newValue: newMeta.seoKeywords,
        changeType: "modification",
      });
    }

    return changes;
  }

  private generateAuditId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Utility functions for content auditing
 */
export const contentAuditUtils = {
  /**
   * Creates a formatted audit report summary
   */
  formatAuditSummary(report: AuditReport): string {
    const verificationRate =
      report.totalContent > 0
        ? Math.round((report.verifiedContent / report.totalContent) * 100)
        : 0;

    return `
Content Audit Summary (${report.lastAuditDate.toLocaleDateString()}):
- Total Content Items: ${report.totalContent}
- Verified Content: ${report.verifiedContent} (${verificationRate}%)
- Pending Review: ${report.pendingReview}
- Critical Issues: ${report.criticalIssues}

Content by Type:
${Object.entries(report.contentByType)
  .map(([type, count]) => `- ${type}: ${count}`)
  .join("\n")}
    `.trim();
  },

  /**
   * Checks if content audit meets quality thresholds
   */
  meetsQualityThresholds(report: AuditReport): boolean {
    const verificationRate =
      report.totalContent > 0
        ? (report.verifiedContent / report.totalContent) * 100
        : 0;

    return (
      verificationRate >= 80 && // At least 80% verified
      report.criticalIssues === 0 && // No critical issues
      report.pendingReview <= Math.ceil(report.totalContent * 0.1) // Max 10% pending review
    );
  },

  /**
   * Generates recommendations based on audit report
   */
  generateRecommendations(report: AuditReport): string[] {
    const recommendations: string[] = [];
    const verificationRate =
      report.totalContent > 0
        ? (report.verifiedContent / report.totalContent) * 100
        : 0;

    if (verificationRate < 80) {
      recommendations.push(
        `Increase content verification rate (currently ${Math.round(verificationRate)}%, target: 80%)`
      );
    }

    if (report.criticalIssues > 0) {
      recommendations.push(
        `Address ${report.criticalIssues} critical content issues immediately`
      );
    }

    if (report.pendingReview > Math.ceil(report.totalContent * 0.15)) {
      recommendations.push(
        `Reduce pending review backlog (${report.pendingReview} items need attention)`
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "Content audit meets all quality thresholds - maintain current standards"
      );
    }

    return recommendations;
  },
};

// Export singleton instance for global use
export const contentAuditManager = new ContentAuditManager();
