/**
 * Content Management CLI Utilities
 *
 * This module provides command-line utilities for testing and managing
 * the content validation and audit system.
 */

import {
  contentHelpers,
  validateContentSystem,
  contentConfig,
} from "./content-helpers";
import { linkValidator, linkValidationUtils } from "./link-validation";
import {
  contentVersionManager,
  contentVersioningUtils,
} from "./content-versioning";
import { toneMessagingAnalyzer, toneMessagingUtils } from "./tone-messaging";
// contentReviewUtils imported but used in performFinalContentReview method

/**
 * CLI utility functions for content management
 */
export const contentCLI = {
  /**
   * Runs system validation check
   */
  checkSystem(): void {
    console.log("🔍 Validating Content Management System...\n");

    const systemCheck = validateContentSystem();

    if (systemCheck.isValid) {
      console.log("✅ System Status: HEALTHY");
    } else {
      console.log("❌ System Status: ISSUES DETECTED");
    }

    if (systemCheck.issues.length > 0) {
      console.log("\n🚨 Issues:");
      systemCheck.issues.forEach(issue => console.log(`  - ${issue}`));
    }

    if (systemCheck.recommendations.length > 0) {
      console.log("\n💡 Recommendations:");
      systemCheck.recommendations.forEach(rec => console.log(`  - ${rec}`));
    }

    console.log("\n📊 Configuration:");
    console.log(
      `  - Min Authenticity Score: ${contentConfig.qualityThresholds.minimumAuthenticityScore}%`
    );
    console.log(
      `  - Min Verification Rate: ${contentConfig.qualityThresholds.minimumVerificationRate}%`
    );
    console.log(
      `  - Max Title Length: ${contentConfig.seoTargets.maxTitleLength} chars`
    );
    console.log(
      `  - Max Description Length: ${contentConfig.seoTargets.maxDescriptionLength} chars`
    );
  },

  /**
   * Creates sample content for testing
   */
  async createSampleContent(): Promise<void> {
    console.log("🏗️  Creating sample content for testing...\n");

    const sampleContent = [
      {
        id: "hero-home",
        type: "hero" as const,
        title: "SAFE AI [4U] - Responsible AI Development",
        description:
          "Leading AI consulting and development with conscience, serving humanity through healthcare, education, and societal applications.",
        content:
          "We believe in developing AI solutions that prioritize ethical considerations and human welfare. Our team specializes in responsible AI practices that ensure technology serves humanity's best interests.",
      },
      {
        id: "service-consulting",
        type: "service" as const,
        title: "AI Consulting Services",
        description:
          "Expert guidance for implementing responsible AI solutions in your organization.",
        content:
          "Our AI consulting services help organizations navigate the complex landscape of artificial intelligence implementation while maintaining ethical standards and regulatory compliance.",
      },
      {
        id: "placeholder-test",
        type: "testimonial" as const,
        title: "Lorem Ipsum Testimonial",
        description: "This is placeholder content that should be flagged",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is dummy content for testing purposes.",
      },
    ];

    for (const sample of sampleContent) {
      try {
        const result = await contentHelpers.createContent(
          sample.id,
          sample.type,
          sample.title,
          sample.description,
          sample.content,
          "system"
        );

        console.log(`✅ Created: ${sample.id}`);
        console.log(`   Score: ${result.validation.score}/100`);
        console.log(`   Issues: ${result.validation.issues.length}`);

        if (result.validation.issues.length > 0) {
          console.log("   🚨 Issues found:");
          result.validation.issues.forEach(issue =>
            console.log(
              `     - ${issue.severity.toUpperCase()}: ${issue.message}`
            )
          );
        }
        console.log("");
      } catch (error) {
        console.log(`❌ Failed to create ${sample.id}: ${error}`);
      }
    }
  },

  /**
   * Displays audit report
   */
  showAuditReport(): void {
    console.log("📋 Content Audit Report\n");

    try {
      const summary = contentHelpers.getAuditSummary();
      console.log(summary);

      const attention = contentHelpers.getContentNeedingAttention();

      if (attention.needingReview.length > 0) {
        console.log("\n🔍 Content Needing Review:");
        attention.needingReview.forEach(content =>
          console.log(`  - ${content.id}: ${content.title}`)
        );
      }

      if (attention.unverified.length > 0) {
        console.log("\n⚠️  Unverified Content:");
        attention.unverified.forEach(content =>
          console.log(`  - ${content.id}: ${content.title}`)
        );
      }

      if (attention.recommendations.length > 0) {
        console.log("\n💡 Recommendations:");
        attention.recommendations.forEach(rec => console.log(`  - ${rec}`));
      }
    } catch (error) {
      console.log(`❌ Failed to generate audit report: ${error}`);
    }
  },

  /**
   * Validates sample content with comprehensive validation
   */
  async validateSampleContent(): Promise<void> {
    console.log("🔍 Running comprehensive content validation...\n");

    try {
      const results =
        await contentHelpers.validateAllContentComprehensive("system");

      console.log("📊 Comprehensive Validation Summary:");
      console.log(`  Total Content: ${results.aggregateReport.totalContent}`);
      console.log(`  Content Passed: ${results.aggregateReport.contentPassed}`);
      console.log(`  Links Passed: ${results.aggregateReport.linksPassed}`);
      console.log(
        `  Overall Score: ${results.aggregateReport.overallScore}/100`
      );
      console.log(
        `  Critical Issues: ${results.aggregateReport.criticalIssues}\n`
      );

      console.log("📝 Detailed Results:");
      results.contentResults.forEach(result => {
        const contentStatus = result.contentValidation.isValid ? "✅" : "❌";
        const linkStatus = linkValidationUtils.meetsLinkQualityStandards(
          result.linkValidation
        )
          ? "✅"
          : "❌";

        console.log(`  ${result.contentId}:`);
        console.log(
          `    Content: ${contentStatus} (${result.contentValidation.score}/100)`
        );
        console.log(
          `    Links: ${linkStatus} (${result.linkValidation.validLinks}/${result.linkValidation.totalLinks})`
        );

        if (result.contentValidation.issues.length > 0) {
          console.log("    Content Issues:");
          result.contentValidation.issues.forEach(issue =>
            console.log(
              `      - ${issue.severity.toUpperCase()}: ${issue.message}`
            )
          );
        }

        if (result.linkValidation.brokenLinks.length > 0) {
          console.log("    Broken Links:");
          result.linkValidation.brokenLinks.forEach(link =>
            console.log(`      - ${link.url}: ${link.error}`)
          );
        }
      });

      if (results.recommendations.length > 0) {
        console.log("\n💡 Recommendations:");
        results.recommendations.forEach(rec => console.log(`  - ${rec}`));
      }
    } catch (error) {
      console.log(`❌ Validation failed: ${error}`);
    }
  },

  /**
   * Tests link validation system
   */
  async testLinkValidation(): Promise<void> {
    console.log("🔗 Testing Link Validation System...\n");

    const testUrls = [
      "https://safe-ai-4u.eu",
      "https://linkedin.com/in/djdasilva",
      "https://httpstat.us/404", // This will fail
      "mailto:contact@safe-ai-4u.eu",
      "tel:+1234567890",
      "/about",
      "#contact",
      "invalid-url",
    ];

    try {
      console.log("🔍 Validating test URLs...");
      const results = await linkValidator.validateLinks(testUrls);

      console.log("\n📊 Link Validation Results:");
      results.forEach(result => {
        const status = result.isValid ? "✅" : "❌";
        const timing = result.responseTime ? ` (${result.responseTime}ms)` : "";
        console.log(`  ${status} ${result.url}${timing}`);

        if (result.error) {
          console.log(`    Error: ${result.error}`);
        }
        if (result.redirectUrl) {
          console.log(`    Redirected to: ${result.redirectUrl}`);
        }
      });

      const report = await linkValidator.generateLinkReport(testUrls);
      console.log("\n📋 Link Report Summary:");
      console.log(linkValidationUtils.formatLinkReport(report));

      const recommendations =
        linkValidationUtils.generateLinkRecommendations(report);
      if (recommendations.length > 0) {
        console.log("\n💡 Link Recommendations:");
        recommendations.forEach(rec => console.log(`  - ${rec}`));
      }
    } catch (error) {
      console.log(`❌ Link validation test failed: ${error}`);
    }
  },

  /**
   * Tests content versioning system
   */
  async testVersioning(): Promise<void> {
    console.log("📚 Testing Content Versioning System...\n");

    try {
      // Create test content with versioning
      const testContent = await contentHelpers.createContent(
        "version-test",
        "hero",
        "Test Content for Versioning",
        "This is a test content item for versioning demonstration",
        "Initial content for versioning test",
        "system"
      );

      console.log("✅ Created initial version");
      console.log(`   Version: ${testContent.version.version}`);
      console.log(`   Content Score: ${testContent.validation.score}/100`);

      // Update the content to create a new version
      const updatedContent = await contentHelpers.updateContent(
        "version-test",
        {
          title: "Updated Test Content for Versioning",
          description:
            "This content has been updated to demonstrate versioning",
          content:
            "Updated content with responsible AI practices and ethical considerations",
        },
        "system",
        "Added ethical AI messaging"
      );

      console.log("\n✅ Created updated version");
      console.log(`   Version: ${updatedContent.version.version}`);
      console.log(`   Content Score: ${updatedContent.validation.score}/100`);

      // Get version history
      const history = contentVersionManager.getVersionHistory("version-test");
      if (history) {
        console.log("\n📚 Version History:");
        console.log(contentVersioningUtils.formatVersionHistory(history));

        // Compare versions
        if (history.versions.length >= 2) {
          const diff = contentVersionManager.compareVersions(
            "version-test",
            1,
            2
          );
          console.log("\n🔄 Version Comparison (v1 → v2):");
          console.log(contentVersioningUtils.formatVersionDiff(diff));
        }

        // Get version stats
        const stats = contentVersionManager.getVersionStats("version-test");
        console.log("\n📊 Version Statistics:");
        console.log(`   Total Versions: ${stats.totalVersions}`);
        console.log(`   Published Versions: ${stats.publishedVersions}`);
        console.log(`   Draft Versions: ${stats.draftVersions}`);
        if (stats.mostActiveUser) {
          console.log(`   Most Active User: ${stats.mostActiveUser}`);
        }
      }
    } catch (error) {
      console.log(`❌ Versioning test failed: ${error}`);
    }
  },

  /**
   * Tests tone and messaging standardization system
   */
  async testToneAndMessaging(): Promise<void> {
    console.log("📝 Testing Tone and Messaging Standardization...\n");

    const testContent = [
      {
        title: "Amazing AI Solutions That Will Revolutionize Your Business!",
        description:
          "Our incredible AI technology is the best in the market. Don't miss out on this game-changing opportunity!",
        content:
          "We offer cutting-edge AI solutions that will transform your organization. Our revolutionary approach delivers unbelievable results.",
      },
      {
        title:
          "Professional AI Consulting Services for Responsible Implementation",
        description:
          "Expert AI consulting with ethical considerations and responsible development practices for healthcare and enterprise applications.",
        content:
          "Our responsible AI consulting services prioritize human welfare and ethical implementation, ensuring AI serves organizational needs with conscience.",
      },
    ];

    try {
      console.log("🔍 Analyzing content tone and messaging...\n");

      for (let i = 0; i < testContent.length; i++) {
        const content = testContent[i];
        console.log(
          `📄 Content ${i + 1}: "${content.title.substring(0, 50)}..."`
        );

        // Analyze tone and messaging
        const analysis = toneMessagingAnalyzer.analyzeContent(content);

        console.log(`   Tone Score: ${analysis.toneScore}/100`);
        console.log(`   Messaging Score: ${analysis.messagingScore}/100`);
        console.log(`   Consistency Score: ${analysis.consistencyScore}/100`);
        console.log(
          `   Compliance Level: ${analysis.complianceLevel.toUpperCase()}`
        );

        if (analysis.issues.length > 0) {
          console.log("   🚨 Issues Found:");
          analysis.issues.forEach(issue => {
            console.log(
              `     - ${issue.severity.toUpperCase()}: ${issue.message}`
            );
          });
        }

        // Test standardization
        const standardization =
          toneMessagingAnalyzer.standardizeContent(content);
        if (standardization.changes.length > 0) {
          console.log("   🔧 Standardization Changes:");
          standardization.changes.forEach(change => {
            console.log(`     - ${change.field}: ${change.reason}`);
          });
        }

        // Test company messaging validation
        const allText = `${content.title} ${content.description} ${content.content}`;
        const messagingValidation =
          toneMessagingUtils.validateCompanyMessaging(allText);
        console.log(
          `   Company Values: ${messagingValidation.hasCompanyValues ? "✅" : "❌"}`
        );
        console.log(
          `   Key Messages: ${messagingValidation.hasKeyMessages ? "✅" : "❌"}`
        );
        console.log(
          `   Brand Voice: ${messagingValidation.alignsWithBrandVoice ? "✅" : "❌"}`
        );
        console.log(`   Messaging Score: ${messagingValidation.score}/100\n`);
      }

      console.log("📊 Tone and Messaging Guidelines:");
      console.log(
        "   Professional Terms: expert, professional, comprehensive, proven"
      );
      console.log(
        "   Ethical Terms: responsible, ethical, conscience, human-centered"
      );
      console.log(
        "   Avoid: amazing, incredible, revolutionary, game-changing"
      );
      console.log(
        "   Preferred CTAs: Schedule AI Consultation, Explore AI Services"
      );

      console.log("\n💡 Key Company Messages:");
      console.log(
        "   - 'We should stop playing with AI and use it with conscience'"
      );
      console.log(
        "   - Expert AI consulting services for responsible implementation"
      );
      console.log("   - Healthcare AI solutions with ethical considerations");
      console.log(
        "   - 15+ years of AI research experience in responsible development"
      );
    } catch (error) {
      console.log(`❌ Tone and messaging test failed: ${error}`);
    }
  },

  /**
   * Performs final content review and testing
   */
  async performFinalContentReview(): Promise<void> {
    console.log("🔍 Performing Final Content Review and Testing...\n");

    try {
      // Test contact functionality
      console.log("📧 Testing Contact Functionality:");
      const contactTests = await contentHelpers.testContactFunctionality();
      console.log(
        `   Email Tests: ${contactTests.summary.validEmails}/${contactTests.summary.totalEmails} passed`
      );
      console.log(
        `   Form Tests: ${contactTests.summary.workingForms}/${contactTests.summary.totalForms} working`
      );

      contactTests.emailTests.forEach(test => {
        const status = test.isValid ? "✅" : "❌";
        console.log(
          `     ${status} ${test.email}${test.error ? ` - ${test.error}` : ""}`
        );
      });

      contactTests.formTests.forEach(test => {
        const status = test.isWorking ? "✅" : "❌";
        console.log(
          `     ${status} ${test.formId}${test.error ? ` - ${test.error}` : ""}`
        );
      });

      // Perform accessibility audit
      console.log("\n♿ Accessibility Audit:");
      const accessibilityAudit =
        await contentHelpers.performAccessibilityAudit();
      console.log(`   Overall Score: ${accessibilityAudit.overallScore}/100`);
      console.log(`   Issues Found: ${accessibilityAudit.issues.length}`);

      if (accessibilityAudit.issues.length > 0) {
        console.log("   Issues:");
        accessibilityAudit.issues.forEach(issue => {
          console.log(
            `     - ${issue.severity.toUpperCase()}: ${issue.description}`
          );
        });
      }

      // Perform final review for all content
      console.log("\n📋 Final Content Review:");
      const finalReview =
        await contentHelpers.performFinalReviewForAllContent("system");

      console.log(`   Total Content: ${finalReview.summary.totalContent}`);
      console.log(`   Passed: ${finalReview.summary.passed}`);
      console.log(`   Failed: ${finalReview.summary.failed}`);
      console.log(`   Needs Attention: ${finalReview.summary.needsAttention}`);
      console.log(`   Overall Score: ${finalReview.summary.overallScore}/100`);
      console.log(
        `   Critical Issues: ${finalReview.summary.criticalIssuesCount}`
      );

      if (finalReview.priorityIssues.length > 0) {
        console.log("\n🚨 Priority Issues:");
        finalReview.priorityIssues.slice(0, 5).forEach((issue, index) => {
          console.log(
            `   ${index + 1}. [${issue.priority.toUpperCase()}] ${issue.contentId}: ${issue.issue}`
          );
        });
        if (finalReview.priorityIssues.length > 5) {
          console.log(
            `   ... and ${finalReview.priorityIssues.length - 5} more issues`
          );
        }
      }

      if (finalReview.summary.recommendations.length > 0) {
        console.log("\n💡 Final Recommendations:");
        finalReview.summary.recommendations.forEach((rec, index) => {
          console.log(`   ${index + 1}. ${rec}`);
        });
      }

      // Publication readiness check
      console.log("\n🚀 Publication Readiness:");
      const readinessChecks = [
        {
          name: "All content passed review",
          passed: finalReview.summary.failed === 0,
        },
        {
          name: "No critical issues",
          passed: finalReview.summary.criticalIssuesCount === 0,
        },
        {
          name: "Overall score above 80",
          passed: finalReview.summary.overallScore >= 80,
        },
        {
          name: "Contact functionality working",
          passed:
            contactTests.summary.validEmails ===
            contactTests.summary.totalEmails,
        },
        {
          name: "Accessibility score above 80",
          passed: accessibilityAudit.overallScore >= 80,
        },
      ];

      readinessChecks.forEach(check => {
        const status = check.passed ? "✅" : "❌";
        console.log(`   ${status} ${check.name}`);
      });

      const allPassed = readinessChecks.every(check => check.passed);
      console.log(
        `\n📊 Publication Status: ${allPassed ? "✅ READY" : "❌ NOT READY"}`
      );

      if (!allPassed) {
        console.log(
          "\n⚠️  Address the failed checks above before publishing content."
        );
      }
    } catch (error) {
      console.log(`❌ Final content review failed: ${error}`);
    }
  },

  /**
   * Shows help information
   */
  showHelp(): void {
    console.log("🛠️  Content Management System - CLI Utilities\n");
    console.log("Available commands:");
    console.log("  checkSystem()           - Validate system configuration");
    console.log("  createSampleContent()   - Create test content items");
    console.log("  showAuditReport()       - Display audit report");
    console.log("  validateSampleContent() - Comprehensive content validation");
    console.log("  testLinkValidation()    - Test link validation system");
    console.log("  testVersioning()        - Test content versioning system");
    console.log(
      "  testToneAndMessaging()  - Test tone and messaging standardization"
    );
    console.log(
      "  performFinalContentReview() - Final content review and testing"
    );
    console.log("  runFullTest()           - Complete system test");
    console.log("  showHelp()              - Show this help message\n");

    console.log("Example usage:");
    console.log("  import { contentCLI } from './src/lib/content-cli';");
    console.log("  contentCLI.checkSystem();");
    console.log("  await contentCLI.createSampleContent();");
    console.log("  await contentCLI.testLinkValidation();");
    console.log("  await contentCLI.testVersioning();");
    console.log("  await contentCLI.testToneAndMessaging();");
    console.log("  await contentCLI.performFinalContentReview();");
    console.log("  contentCLI.showAuditReport();\n");

    console.log("Configuration:");
    console.log(
      "  Quality thresholds and SEO targets can be adjusted in content-helpers.ts"
    );
    console.log(
      "  Validation rules can be customized in content-validation.ts"
    );
    console.log(
      "  Link validation settings can be modified in link-validation.ts"
    );
    console.log(
      "  Versioning behavior can be configured in content-versioning.ts"
    );
  },

  /**
   * Runs a complete system test with all validation systems
   */
  async runFullTest(): Promise<void> {
    console.log("🚀 Running Complete Content Validation System Test\n");
    console.log("=".repeat(60));

    // Step 1: System check
    console.log("\n1️⃣  System Validation");
    console.log("-".repeat(20));
    this.checkSystem();

    // Step 2: Create sample content
    console.log("\n2️⃣  Sample Content Creation");
    console.log("-".repeat(30));
    await this.createSampleContent();

    // Step 3: Test link validation
    console.log("\n3️⃣  Link Validation Testing");
    console.log("-".repeat(25));
    await this.testLinkValidation();

    // Step 4: Test versioning system
    console.log("\n4️⃣  Content Versioning Testing");
    console.log("-".repeat(30));
    await this.testVersioning();

    // Step 5: Test tone and messaging
    console.log("\n5️⃣  Tone and Messaging Testing");
    console.log("-".repeat(30));
    await this.testToneAndMessaging();

    // Step 6: Comprehensive validation
    console.log("\n6️⃣  Comprehensive Content Validation");
    console.log("-".repeat(35));
    await this.validateSampleContent();

    // Step 7: Final content review and testing
    console.log("\n7️⃣  Final Content Review and Testing");
    console.log("-".repeat(35));
    await this.performFinalContentReview();

    // Step 8: Audit report
    console.log("\n8️⃣  Audit Report");
    console.log("-".repeat(15));
    this.showAuditReport();

    console.log("\n" + "=".repeat(60));
    console.log("✅ Complete content validation system test finished!");
    console.log("\nSystem Features Tested:");
    console.log("  ✅ Content authenticity validation");
    console.log("  ✅ Professional language checking");
    console.log("  ✅ SEO optimization validation");
    console.log("  ✅ Automated link checking");
    console.log("  ✅ Content versioning and change tracking");
    console.log("  ✅ Tone and messaging standardization");
    console.log("  ✅ Final content review and testing");
    console.log("  ✅ Comprehensive audit system");
    console.log("\nNext steps:");
    console.log("  1. Review any issues identified above");
    console.log("  2. Begin registering real website content");
    console.log("  3. Set up regular validation workflows");
    console.log("  4. Configure automated link checking schedules");
    console.log("  5. Establish content review and approval processes");
  },
};

/**
 * Quick test function that can be called directly
 */
export async function testContentSystem(): Promise<void> {
  await contentCLI.runFullTest();
}

// Export for easy CLI access
export default contentCLI;
