/**
 * Content Management System - Main Export
 *
 * This module exports all content validation, audit, and helper utilities
 * for the SAFE AI [4U] website content management system.
 */

// Core validation system
export type {
  ContentItem,
  ContentMetadata,
  ValidationResult,
  ValidationIssue,
} from "../content-validation";

export {
  ContentValidator,
  contentValidationUtils,
} from "../content-validation";

// Audit system
export type {
  AuditEntry,
  AuditAction,
  ContentChange,
  AuditReport,
} from "../content-audit";

export {
  ContentAuditManager,
  contentAuditManager,
  contentAuditUtils,
} from "../content-audit";

// Helper functions
export {
  contentHelpers,
  contentConfig,
  validateContentSystem,
} from "../content-helpers";

// CLI utilities
export { contentCLI, testContentSystem } from "../content-cli";

/**
 * Quick start guide for using the content management system:
 *
 * 1. Import the main utilities:
 *    import { contentHelpers, contentCLI } from '@/lib/content';
 *
 * 2. Test the system:
 *    contentCLI.checkSystem();
 *
 * 3. Create content:
 *    const result = await contentHelpers.createContent(
 *      'hero-home',
 *      'hero',
 *      'Your Title',
 *      'Your Description'
 *    );
 *
 * 4. Validate content:
 *    const validation = await contentHelpers.validateContent('hero-home');
 *
 * 5. Get audit report:
 *    const report = contentHelpers.getAuditReport();
 */
