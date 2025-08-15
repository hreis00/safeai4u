/**
 * Content Versioning System
 *
 * This module provides content versioning and change tracking functionality
 * for the SAFE AI [4U] website content management system.
 */

import { ContentItem } from "./content-validation";

export interface ContentVersion {
  id: string;
  contentId: string;
  version: number;
  content: ContentItem;
  timestamp: Date;
  userId?: string;
  changeDescription?: string;
  tags: string[];
  isPublished: boolean;
  parentVersion?: number;
}

export interface VersionDiff {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changeType: "added" | "modified" | "removed";
}

export interface VersionHistory {
  contentId: string;
  versions: ContentVersion[];
  currentVersion: number;
  totalVersions: number;
  firstCreated: Date;
  lastModified: Date;
}

/**
 * Content Version Manager
 * Handles versioning, rollback, and change tracking for content items
 */
export class ContentVersionManager {
  private versions: Map<string, ContentVersion[]> = new Map();
  private currentVersions: Map<string, number> = new Map();

  /**
   * Creates the first version of a content item
   */
  createInitialVersion(
    content: ContentItem,
    userId?: string,
    description?: string
  ): ContentVersion {
    const version: ContentVersion = {
      id: this.generateVersionId(content.id, 1),
      contentId: content.id,
      version: 1,
      content: { ...content },
      timestamp: new Date(),
      userId,
      changeDescription: description || "Initial content creation",
      tags: ["initial"],
      isPublished: false,
    };

    this.versions.set(content.id, [version]);
    this.currentVersions.set(content.id, 1);

    return version;
  }

  /**
   * Creates a new version of existing content
   */
  createNewVersion(
    contentId: string,
    updatedContent: ContentItem,
    userId?: string,
    description?: string,
    tags: string[] = []
  ): ContentVersion {
    const existingVersions = this.versions.get(contentId) || [];
    if (existingVersions.length === 0) {
      throw new Error(
        `No existing versions found for content ID: ${contentId}`
      );
    }

    const currentVersion = this.getCurrentVersion(contentId);
    if (!currentVersion) {
      throw new Error(`Current version not found for content ID: ${contentId}`);
    }

    const newVersionNumber = currentVersion.version + 1;
    const newVersion: ContentVersion = {
      id: this.generateVersionId(contentId, newVersionNumber),
      contentId,
      version: newVersionNumber,
      content: { ...updatedContent },
      timestamp: new Date(),
      userId,
      changeDescription: description || `Version ${newVersionNumber} update`,
      tags: [...tags],
      isPublished: false,
      parentVersion: currentVersion.version,
    };

    existingVersions.push(newVersion);
    this.versions.set(contentId, existingVersions);
    this.currentVersions.set(contentId, newVersionNumber);

    return newVersion;
  }

  /**
   * Gets the current (latest) version of content
   */
  getCurrentVersion(contentId: string): ContentVersion | null {
    const versions = this.versions.get(contentId);
    const currentVersionNumber = this.currentVersions.get(contentId);

    if (!versions || !currentVersionNumber) {
      return null;
    }

    return versions.find(v => v.version === currentVersionNumber) || null;
  }

  /**
   * Gets a specific version of content
   */
  getVersion(contentId: string, versionNumber: number): ContentVersion | null {
    const versions = this.versions.get(contentId);
    if (!versions) {
      return null;
    }

    return versions.find(v => v.version === versionNumber) || null;
  }

  /**
   * Gets complete version history for content
   */
  getVersionHistory(contentId: string): VersionHistory | null {
    const versions = this.versions.get(contentId);
    if (!versions || versions.length === 0) {
      return null;
    }

    const sortedVersions = [...versions].sort((a, b) => a.version - b.version);
    const currentVersion = this.currentVersions.get(contentId) || 0;

    return {
      contentId,
      versions: sortedVersions,
      currentVersion,
      totalVersions: versions.length,
      firstCreated: sortedVersions[0].timestamp,
      lastModified: sortedVersions[sortedVersions.length - 1].timestamp,
    };
  }

  /**
   * Compares two versions and returns differences
   */
  compareVersions(
    contentId: string,
    fromVersion: number,
    toVersion: number
  ): VersionDiff[] {
    const fromVersionData = this.getVersion(contentId, fromVersion);
    const toVersionData = this.getVersion(contentId, toVersion);

    if (!fromVersionData || !toVersionData) {
      throw new Error(`Version not found for comparison`);
    }

    return this.generateDiff(fromVersionData.content, toVersionData.content);
  }

  /**
   * Rolls back content to a previous version
   */
  rollbackToVersion(
    contentId: string,
    targetVersion: number,
    userId?: string,
    reason?: string
  ): ContentVersion {
    const targetVersionData = this.getVersion(contentId, targetVersion);
    if (!targetVersionData) {
      throw new Error(`Target version ${targetVersion} not found`);
    }

    // Create a new version based on the target version content
    const rollbackContent = { ...targetVersionData.content };
    rollbackContent.metadata.lastUpdated = new Date();

    const newVersion = this.createNewVersion(
      contentId,
      rollbackContent,
      userId,
      reason || `Rollback to version ${targetVersion}`,
      ["rollback", `from-v${targetVersion}`]
    );

    return newVersion;
  }

  /**
   * Publishes a specific version
   */
  publishVersion(
    contentId: string,
    versionNumber: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId?: string
  ): ContentVersion {
    // TODO: In a real implementation, userId would be used for audit logging
    const version = this.getVersion(contentId, versionNumber);
    if (!version) {
      throw new Error(`Version ${versionNumber} not found`);
    }

    // Unpublish all other versions
    const versions = this.versions.get(contentId) || [];
    versions.forEach(v => {
      v.isPublished = false;
    });

    // Publish the target version
    version.isPublished = true;
    version.tags = [
      ...version.tags.filter(t => t !== "published"),
      "published",
    ];

    // Update current version pointer
    this.currentVersions.set(contentId, versionNumber);

    return version;
  }

  /**
   * Gets the published version of content
   */
  getPublishedVersion(contentId: string): ContentVersion | null {
    const versions = this.versions.get(contentId);
    if (!versions) {
      return null;
    }

    return versions.find(v => v.isPublished) || null;
  }

  /**
   * Tags a version with additional metadata
   */
  tagVersion(
    contentId: string,
    versionNumber: number,
    tags: string[]
  ): ContentVersion {
    const version = this.getVersion(contentId, versionNumber);
    if (!version) {
      throw new Error(`Version ${versionNumber} not found`);
    }

    version.tags = [...new Set([...version.tags, ...tags])];
    return version;
  }

  /**
   * Removes tags from a version
   */
  removeVersionTags(
    contentId: string,
    versionNumber: number,
    tagsToRemove: string[]
  ): ContentVersion {
    const version = this.getVersion(contentId, versionNumber);
    if (!version) {
      throw new Error(`Version ${versionNumber} not found`);
    }

    version.tags = version.tags.filter(tag => !tagsToRemove.includes(tag));
    return version;
  }

  /**
   * Finds versions by tags
   */
  findVersionsByTags(contentId: string, tags: string[]): ContentVersion[] {
    const versions = this.versions.get(contentId);
    if (!versions) {
      return [];
    }

    return versions.filter(version =>
      tags.some(tag => version.tags.includes(tag))
    );
  }

  /**
   * Gets version statistics
   */
  getVersionStats(contentId: string): {
    totalVersions: number;
    publishedVersions: number;
    draftVersions: number;
    averageTimeBetweenVersions: number;
    mostActiveUser?: string;
  } {
    const versions = this.versions.get(contentId) || [];

    const publishedVersions = versions.filter(v => v.isPublished).length;
    const draftVersions = versions.length - publishedVersions;

    // Calculate average time between versions
    let totalTimeDiff = 0;
    for (let i = 1; i < versions.length; i++) {
      const timeDiff =
        versions[i].timestamp.getTime() - versions[i - 1].timestamp.getTime();
      totalTimeDiff += timeDiff;
    }
    const averageTimeBetweenVersions =
      versions.length > 1 ? totalTimeDiff / (versions.length - 1) : 0;

    // Find most active user
    const userCounts = versions.reduce(
      (acc, version) => {
        if (version.userId) {
          acc[version.userId] = (acc[version.userId] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    const mostActiveUser = Object.entries(userCounts).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    return {
      totalVersions: versions.length,
      publishedVersions,
      draftVersions,
      averageTimeBetweenVersions,
      mostActiveUser,
    };
  }

  /**
   * Exports version history for backup or analysis
   */
  exportVersionHistory(contentId: string): VersionHistory | null {
    return this.getVersionHistory(contentId);
  }

  /**
   * Imports version history from backup
   */
  importVersionHistory(versionHistory: VersionHistory): void {
    this.versions.set(versionHistory.contentId, versionHistory.versions);
    this.currentVersions.set(
      versionHistory.contentId,
      versionHistory.currentVersion
    );
  }

  private generateVersionId(contentId: string, version: number): string {
    return `${contentId}_v${version}_${Date.now()}`;
  }

  private generateDiff(
    oldContent: ContentItem,
    newContent: ContentItem
  ): VersionDiff[] {
    const diffs: VersionDiff[] = [];

    // Compare title
    if (oldContent.title !== newContent.title) {
      diffs.push({
        field: "title",
        oldValue: oldContent.title,
        newValue: newContent.title,
        changeType: "modified",
      });
    }

    // Compare description
    if (oldContent.description !== newContent.description) {
      diffs.push({
        field: "description",
        oldValue: oldContent.description,
        newValue: newContent.description,
        changeType: "modified",
      });
    }

    // Compare content
    if (oldContent.content !== newContent.content) {
      diffs.push({
        field: "content",
        oldValue: oldContent.content,
        newValue: newContent.content,
        changeType: oldContent.content ? "modified" : "added",
      });
    }

    // Compare metadata
    const oldMeta = oldContent.metadata;
    const newMeta = newContent.metadata;

    if (oldMeta.verified !== newMeta.verified) {
      diffs.push({
        field: "metadata.verified",
        oldValue: oldMeta.verified,
        newValue: newMeta.verified,
        changeType: "modified",
      });
    }

    if (
      JSON.stringify(oldMeta.seoKeywords) !==
      JSON.stringify(newMeta.seoKeywords)
    ) {
      diffs.push({
        field: "metadata.seoKeywords",
        oldValue: oldMeta.seoKeywords,
        newValue: newMeta.seoKeywords,
        changeType: "modified",
      });
    }

    return diffs;
  }
}

/**
 * Content versioning utility functions
 */
export const contentVersioningUtils = {
  /**
   * Formats version history for display
   */
  formatVersionHistory(history: VersionHistory): string {
    let output = `Version History for ${history.contentId}:
- Total Versions: ${history.totalVersions}
- Current Version: ${history.currentVersion}
- First Created: ${history.firstCreated.toLocaleDateString()}
- Last Modified: ${history.lastModified.toLocaleDateString()}

Versions:`;

    history.versions
      .sort((a, b) => b.version - a.version)
      .forEach(version => {
        const publishedFlag = version.isPublished ? " [PUBLISHED]" : "";
        const tags =
          version.tags.length > 0 ? ` (${version.tags.join(", ")})` : "";
        output += `\n- v${version.version}${publishedFlag}: ${version.changeDescription}${tags}`;
        output += `\n  ${version.timestamp.toLocaleDateString()} by ${version.userId || "system"}`;
      });

    return output;
  },

  /**
   * Formats version differences for display
   */
  formatVersionDiff(diffs: VersionDiff[]): string {
    if (diffs.length === 0) {
      return "No differences found between versions.";
    }

    let output = "Changes:\n";
    diffs.forEach(diff => {
      output += `\n- ${diff.field} (${diff.changeType}):`;
      if (diff.changeType === "added") {
        output += `\n  + ${diff.newValue}`;
      } else if (diff.changeType === "removed") {
        output += `\n  - ${diff.oldValue}`;
      } else {
        output += `\n  - ${diff.oldValue}`;
        output += `\n  + ${diff.newValue}`;
      }
    });

    return output;
  },

  /**
   * Validates version integrity
   */
  validateVersionIntegrity(history: VersionHistory): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    // Check version numbering
    const sortedVersions = [...history.versions].sort(
      (a, b) => a.version - b.version
    );
    for (let i = 0; i < sortedVersions.length; i++) {
      if (sortedVersions[i].version !== i + 1) {
        issues.push(`Version numbering gap detected at version ${i + 1}`);
      }
    }

    // Check for multiple published versions
    const publishedVersions = history.versions.filter(v => v.isPublished);
    if (publishedVersions.length > 1) {
      issues.push(
        `Multiple published versions found: ${publishedVersions.map(v => v.version).join(", ")}`
      );
    }

    // Check current version exists
    const currentVersionExists = history.versions.some(
      v => v.version === history.currentVersion
    );
    if (!currentVersionExists) {
      issues.push(
        `Current version ${history.currentVersion} not found in version list`
      );
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  },
};

// Export singleton instance for global use
export const contentVersionManager = new ContentVersionManager();
