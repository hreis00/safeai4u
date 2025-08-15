/**
 * Link Validation System
 *
 * This module provides automated link checking functionality for external references
 * and internal links across the SAFE AI [4U] website.
 */

export interface LinkValidationResult {
  url: string;
  isValid: boolean;
  status?: number;
  responseTime?: number;
  error?: string;
  lastChecked: Date;
  redirectUrl?: string;
}

export interface LinkValidationReport {
  totalLinks: number;
  validLinks: number;
  invalidLinks: number;
  brokenLinks: LinkValidationResult[];
  slowLinks: LinkValidationResult[];
  redirectedLinks: LinkValidationResult[];
  lastScanDate: Date;
}

/**
 * Link Validator Class
 * Handles automated checking of internal and external links
 */
export class LinkValidator {
  private readonly timeout: number;
  private readonly maxRedirects: number;
  private readonly slowThreshold: number;

  constructor(
    options: {
      timeout?: number;
      maxRedirects?: number;
      slowThreshold?: number;
    } = {}
  ) {
    this.timeout = options.timeout || 10000; // 10 seconds
    this.maxRedirects = options.maxRedirects || 5;
    this.slowThreshold = options.slowThreshold || 3000; // 3 seconds
  }

  /**
   * Validates a single URL
   */
  async validateLink(url: string): Promise<LinkValidationResult> {
    const startTime = Date.now();
    const result: LinkValidationResult = {
      url,
      isValid: false,
      lastChecked: new Date(),
    };

    try {
      // Handle different URL types
      if (this.isInternalLink(url)) {
        return this.validateInternalLink(url);
      }

      if (this.isEmailLink(url)) {
        return this.validateEmailLink(url);
      }

      if (this.isTelLink(url)) {
        return this.validateTelLink(url);
      }

      // Validate external HTTP/HTTPS links
      const response = await this.fetchWithTimeout(url);
      const responseTime = Date.now() - startTime;

      result.status = response.status;
      result.responseTime = responseTime;
      result.isValid = response.ok;

      // Check for redirects
      if (response.redirected && response.url !== url) {
        result.redirectUrl = response.url;
      }

      if (!response.ok) {
        result.error = `HTTP ${response.status}: ${response.statusText}`;
      }

      return result;
    } catch (error) {
      result.error = error instanceof Error ? error.message : "Unknown error";
      result.responseTime = Date.now() - startTime;
      return result;
    }
  }

  /**
   * Validates multiple links concurrently
   */
  async validateLinks(urls: string[]): Promise<LinkValidationResult[]> {
    const promises = urls.map(url => this.validateLink(url));
    return Promise.all(promises);
  }

  /**
   * Extracts all links from HTML content
   */
  extractLinksFromContent(content: string): string[] {
    const links: string[] = [];

    // Extract href attributes from anchor tags
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
      links.push(match[1]);
    }

    // Extract src attributes from images
    const srcRegex = /src=["']([^"']+)["']/gi;
    while ((match = srcRegex.exec(content)) !== null) {
      links.push(match[1]);
    }

    // Extract URLs from text content (markdown links, etc.)
    const urlRegex = /https?:\/\/[^\s\)]+/gi;
    while ((match = urlRegex.exec(content)) !== null) {
      links.push(match[0]);
    }

    // Remove duplicates and filter out invalid URLs
    return [...new Set(links)].filter(url => this.isValidUrl(url));
  }

  /**
   * Generates a comprehensive link validation report
   */
  async generateLinkReport(urls: string[]): Promise<LinkValidationReport> {
    const results = await this.validateLinks(urls);

    const validLinks = results.filter(r => r.isValid);
    const invalidLinks = results.filter(r => !r.isValid);
    const brokenLinks = results.filter(
      r => !r.isValid && r.status && r.status >= 400
    );
    const slowLinks = results.filter(
      r => r.responseTime && r.responseTime > this.slowThreshold
    );
    const redirectedLinks = results.filter(r => r.redirectUrl);

    return {
      totalLinks: results.length,
      validLinks: validLinks.length,
      invalidLinks: invalidLinks.length,
      brokenLinks,
      slowLinks,
      redirectedLinks,
      lastScanDate: new Date(),
    };
  }

  private async fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        method: "HEAD", // Use HEAD to avoid downloading content
        redirect: "follow",
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private validateInternalLink(url: string): LinkValidationResult {
    // For internal links, we'll assume they're valid if they follow proper format
    // In a real application, you'd check against your routing system
    const result: LinkValidationResult = {
      url,
      isValid: true,
      lastChecked: new Date(),
    };

    // Basic validation for internal link format
    if (!url.startsWith("/") && !url.startsWith("#")) {
      result.isValid = false;
      result.error = "Internal link should start with / or #";
    }

    return result;
  }

  private validateEmailLink(url: string): LinkValidationResult {
    const emailRegex =
      /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(url);

    return {
      url,
      isValid,
      lastChecked: new Date(),
      error: isValid ? undefined : "Invalid email format",
    };
  }

  private validateTelLink(url: string): LinkValidationResult {
    const telRegex = /^tel:\+?[0-9\s\-\(\)]+$/;
    const isValid = telRegex.test(url);

    return {
      url,
      isValid,
      lastChecked: new Date(),
      error: isValid ? undefined : "Invalid telephone format",
    };
  }

  private isInternalLink(url: string): boolean {
    return (
      url.startsWith("/") ||
      url.startsWith("#") ||
      url.startsWith("./") ||
      url.startsWith("../")
    );
  }

  private isEmailLink(url: string): boolean {
    return url.startsWith("mailto:");
  }

  private isTelLink(url: string): boolean {
    return url.startsWith("tel:");
  }

  private isValidUrl(url: string): boolean {
    try {
      // Check for common URL patterns
      if (
        this.isInternalLink(url) ||
        this.isEmailLink(url) ||
        this.isTelLink(url)
      ) {
        return true;
      }

      // Check for valid HTTP/HTTPS URLs
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  }
}

/**
 * Content Link Scanner
 * Scans content items for links and validates them
 */
export class ContentLinkScanner {
  private linkValidator: LinkValidator;

  constructor(linkValidator?: LinkValidator) {
    this.linkValidator = linkValidator || new LinkValidator();
  }

  /**
   * Scans a content item for links and validates them
   */
  async scanContentLinks(content: {
    title: string;
    description: string;
    content?: string;
  }): Promise<{
    links: string[];
    validationResults: LinkValidationResult[];
    report: LinkValidationReport;
  }> {
    const allText = `${content.title} ${content.description} ${content.content || ""}`;
    const links = this.linkValidator.extractLinksFromContent(allText);

    const validationResults = await this.linkValidator.validateLinks(links);
    const report = await this.linkValidator.generateLinkReport(links);

    return {
      links,
      validationResults,
      report,
    };
  }

  /**
   * Scans multiple content items and generates aggregate report
   */
  async scanMultipleContent(
    contentItems: Array<{
      id: string;
      title: string;
      description: string;
      content?: string;
    }>
  ): Promise<{
    contentReports: Array<{
      contentId: string;
      links: string[];
      validationResults: LinkValidationResult[];
    }>;
    aggregateReport: LinkValidationReport;
  }> {
    const contentReports = [];
    const allLinks: string[] = [];

    for (const item of contentItems) {
      const scanResult = await this.scanContentLinks(item);
      contentReports.push({
        contentId: item.id,
        links: scanResult.links,
        validationResults: scanResult.validationResults,
      });
      allLinks.push(...scanResult.links);
    }

    // Remove duplicates for aggregate report
    const uniqueLinks = [...new Set(allLinks)];
    const aggregateReport =
      await this.linkValidator.generateLinkReport(uniqueLinks);

    return {
      contentReports,
      aggregateReport,
    };
  }
}

/**
 * Link validation utility functions
 */
export const linkValidationUtils = {
  /**
   * Formats a link validation report for display
   */
  formatLinkReport(report: LinkValidationReport): string {
    const successRate =
      report.totalLinks > 0
        ? Math.round((report.validLinks / report.totalLinks) * 100)
        : 0;

    let output = `Link Validation Report (${report.lastScanDate.toLocaleDateString()}):
- Total Links: ${report.totalLinks}
- Valid Links: ${report.validLinks} (${successRate}%)
- Invalid Links: ${report.invalidLinks}`;

    if (report.brokenLinks.length > 0) {
      output += `\n\nBroken Links (${report.brokenLinks.length}):`;
      report.brokenLinks.forEach(link => {
        output += `\n- ${link.url} (${link.error})`;
      });
    }

    if (report.slowLinks.length > 0) {
      output += `\n\nSlow Links (${report.slowLinks.length}):`;
      report.slowLinks.forEach(link => {
        output += `\n- ${link.url} (${link.responseTime}ms)`;
      });
    }

    if (report.redirectedLinks.length > 0) {
      output += `\n\nRedirected Links (${report.redirectedLinks.length}):`;
      report.redirectedLinks.forEach(link => {
        output += `\n- ${link.url} → ${link.redirectUrl}`;
      });
    }

    return output;
  },

  /**
   * Checks if link validation meets quality standards
   */
  meetsLinkQualityStandards(report: LinkValidationReport): boolean {
    const successRate =
      report.totalLinks > 0
        ? (report.validLinks / report.totalLinks) * 100
        : 100;

    return (
      successRate >= 95 && // At least 95% of links should be valid
      report.brokenLinks.length === 0 // No broken links allowed
    );
  },

  /**
   * Generates recommendations based on link validation report
   */
  generateLinkRecommendations(report: LinkValidationReport): string[] {
    const recommendations: string[] = [];
    const successRate =
      report.totalLinks > 0
        ? (report.validLinks / report.totalLinks) * 100
        : 100;

    if (successRate < 95) {
      recommendations.push(
        `Improve link success rate (currently ${Math.round(successRate)}%, target: 95%)`
      );
    }

    if (report.brokenLinks.length > 0) {
      recommendations.push(
        `Fix ${report.brokenLinks.length} broken links immediately`
      );
    }

    if (report.slowLinks.length > 0) {
      recommendations.push(
        `Optimize or replace ${report.slowLinks.length} slow-loading links`
      );
    }

    if (report.redirectedLinks.length > 0) {
      recommendations.push(
        `Update ${report.redirectedLinks.length} redirected links to point directly to final URLs`
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "All links meet quality standards - maintain current link hygiene"
      );
    }

    return recommendations;
  },
};

// Export singleton instances for global use
export const linkValidator = new LinkValidator();
export const contentLinkScanner = new ContentLinkScanner(linkValidator);
