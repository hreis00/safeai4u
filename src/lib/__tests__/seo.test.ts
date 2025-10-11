import {
  AI_KEYWORDS,
  BASE_SEO,
  PAGE_SEO,
  generatePageMetadata,
  generateOrganizationStructuredData,
  generateServiceStructuredData,
  generateCourseStructuredData,
  generatePersonStructuredData,
  generateProjectStructuredData,
  generateReviewStructuredData,
  generateFAQStructuredData,
} from "../seo";

describe("SEO Utilities", () => {
  describe("AI_KEYWORDS", () => {
    it("should contain primary AI keywords", () => {
      expect(AI_KEYWORDS.primary).toContain("responsible AI");
      expect(AI_KEYWORDS.primary).toContain("AI consulting");
      expect(AI_KEYWORDS.primary).toContain("AI education");
      expect(AI_KEYWORDS.primary).toContain("ethical AI");
      expect(AI_KEYWORDS.primary).toContain("AI development");
      expect(AI_KEYWORDS.primary).toContain("healthcare AI");
      expect(AI_KEYWORDS.primary).toContain("AI training");
      expect(AI_KEYWORDS.primary).toContain("AI governance");
    });

    it("should contain secondary AI keywords", () => {
      expect(AI_KEYWORDS.secondary).toContain("machine learning");
      expect(AI_KEYWORDS.secondary).toContain("artificial intelligence");
      expect(AI_KEYWORDS.secondary).toContain("AI ethics");
      expect(AI_KEYWORDS.secondary).toContain("AI safety");
      expect(AI_KEYWORDS.secondary).toContain("AI implementation");
      expect(AI_KEYWORDS.secondary).toContain("AI strategy");
      expect(AI_KEYWORDS.secondary).toContain("AI workshops");
      expect(AI_KEYWORDS.secondary).toContain("AI solutions");
    });

    it("should contain location keywords", () => {
      expect(AI_KEYWORDS.location).toContain("Portugal");
      expect(AI_KEYWORDS.location).toContain("Europe");
      expect(AI_KEYWORDS.location).toContain("EU");
    });

    it("should contain industry keywords", () => {
      expect(AI_KEYWORDS.industry).toContain("healthcare");
      expect(AI_KEYWORDS.industry).toContain("education");
      expect(AI_KEYWORDS.industry).toContain("technology");
      expect(AI_KEYWORDS.industry).toContain("consulting");
    });
  });

  describe("BASE_SEO", () => {
    it("should have correct site information", () => {
      expect(BASE_SEO.siteName).toBe("SAFE AI [4U]");
      expect(BASE_SEO.siteUrl).toBe("https://safe-ai-4u.eu");
      expect(BASE_SEO.defaultTitle).toBe(
        "SAFE AI [4U] - Responsible AI Solutions"
      );
      expect(BASE_SEO.titleTemplate).toBe("%s | SAFE AI [4U]");
      expect(BASE_SEO.author).toBe("David Belo");
      expect(BASE_SEO.organization).toBe("SAFE AI [4U]");
      expect(BASE_SEO.locale).toBe("en_US");
      expect(BASE_SEO.type).toBe("website");
    });

    it("should have comprehensive default description", () => {
      expect(BASE_SEO.defaultDescription).toContain("Expert AI consulting");
      expect(BASE_SEO.defaultDescription).toContain("development");
      expect(BASE_SEO.defaultDescription).toContain("education services");
      expect(BASE_SEO.defaultDescription).toContain("Responsible AI solutions");
      expect(BASE_SEO.defaultDescription).toContain("healthcare");
      expect(BASE_SEO.defaultDescription).toContain("education");
      expect(BASE_SEO.defaultDescription).toContain("enterprise applications");
      expect(BASE_SEO.defaultDescription).toContain("Europe");
    });

    it("should have default keywords from AI_KEYWORDS", () => {
      expect(BASE_SEO.defaultKeywords).toContain("responsible AI");
      expect(BASE_SEO.defaultKeywords).toContain("AI consulting");
      expect(BASE_SEO.defaultKeywords).toContain("AI education");
      expect(BASE_SEO.defaultKeywords).toContain("ethical AI");
      expect(BASE_SEO.defaultKeywords).toContain("AI development");
      expect(BASE_SEO.defaultKeywords).toContain("healthcare AI");
      expect(BASE_SEO.defaultKeywords).toContain("AI training");
      expect(BASE_SEO.defaultKeywords).toContain("AI governance");
      expect(BASE_SEO.defaultKeywords).toContain("machine learning");
      expect(BASE_SEO.defaultKeywords).toContain("artificial intelligence");
      expect(BASE_SEO.defaultKeywords).toContain("AI ethics");
      expect(BASE_SEO.defaultKeywords).toContain("AI safety");
    });
  });

  describe("PAGE_SEO", () => {
    it("should have home page SEO configuration", () => {
      const homeSEO = PAGE_SEO.home;

      expect(homeSEO.title).toContain("SAFE AI [4U]");
      expect(homeSEO.title).toContain("Responsible AI Solutions");
      expect(homeSEO.title).toContain("Healthcare");
      expect(homeSEO.title).toContain("Education");

      expect(homeSEO.description).toContain("Transform your organization");
      expect(homeSEO.description).toContain("ethical AI solutions");
      expect(homeSEO.description).toContain("Expert consulting");
      expect(homeSEO.description).toContain("custom development");
      expect(homeSEO.description).toContain("comprehensive training");

      expect(homeSEO.keywords).toContain("responsible AI solutions");
      expect(homeSEO.keywords).toContain("AI consulting services");
      expect(homeSEO.keywords).toContain("healthcare AI development");
      expect(homeSEO.keywords).toContain("AI education training");
      expect(homeSEO.keywords).toContain("ethical AI implementation");
      expect(homeSEO.keywords).toContain("AI strategy consulting");
      expect(homeSEO.keywords).toContain("Portugal AI company");
    });

    it("should have about page SEO configuration", () => {
      const aboutSEO = PAGE_SEO.about;

      expect(aboutSEO.title).toContain("About SAFE AI [4U]");
      expect(aboutSEO.title).toContain("David Belo");
      expect(aboutSEO.title).toContain("Mission for Responsible AI");

      expect(aboutSEO.description).toContain("Meet David Belo");
      expect(aboutSEO.description).toContain(
        "15+ years of AI research experience"
      );
      expect(aboutSEO.description).toContain("develop AI with conscience");
      expect(aboutSEO.description).toContain("healthcare");
      expect(aboutSEO.description).toContain("education");
      expect(aboutSEO.description).toContain("society responsibly");

      expect(aboutSEO.keywords).toContain("David Belo AI expert");
      expect(aboutSEO.keywords).toContain("AI research experience");
      expect(aboutSEO.keywords).toContain("responsible AI mission");
      expect(aboutSEO.keywords).toContain("AI ethics leadership");
      expect(aboutSEO.keywords).toContain("healthcare AI research");
      expect(aboutSEO.keywords).toContain("AI company Portugal");
      expect(aboutSEO.keywords).toContain("ethical AI development");
    });

    it("should have services page SEO configuration", () => {
      const servicesSEO = PAGE_SEO.services;

      expect(servicesSEO.title).toContain("AI Services");
      expect(servicesSEO.title).toContain(
        "Consulting, Development & Education"
      );
      expect(servicesSEO.title).toContain("SAFE AI [4U]");

      expect(servicesSEO.description).toContain("Expert AI consulting");
      expect(servicesSEO.description).toContain("custom development");
      expect(servicesSEO.description).toContain(
        "comprehensive education services"
      );
      expect(servicesSEO.description).toContain("Responsible AI solutions");
      expect(servicesSEO.description).toContain("ethical implementation");

      expect(servicesSEO.keywords).toContain("AI consulting services");
      expect(servicesSEO.keywords).toContain("AI development company");
      expect(servicesSEO.keywords).toContain("AI education programs");
      expect(servicesSEO.keywords).toContain("healthcare AI solutions");
      expect(servicesSEO.keywords).toContain("responsible AI consulting");
      expect(servicesSEO.keywords).toContain("AI strategy services");
      expect(servicesSEO.keywords).toContain("AI implementation support");
    });

    it("should have projects page SEO configuration", () => {
      const projectsSEO = PAGE_SEO.projects;

      expect(projectsSEO.title).toContain("AI Projects & Case Studies");
      expect(projectsSEO.title).toContain("METATRON");
      expect(projectsSEO.title).toContain("Space Medicine");
      expect(projectsSEO.title).toContain("ISEKAI");

      expect(projectsSEO.description).toContain(
        "Explore our innovative AI projects"
      );
      expect(projectsSEO.description).toContain(
        "METATRON healthcare infrastructure"
      );
      expect(projectsSEO.description).toContain("Space Medicine research");
      expect(projectsSEO.description).toContain("ISEKAI wellness platform");
      expect(projectsSEO.description).toContain("Real-world applications");
      expect(projectsSEO.description).toContain("responsible AI development");

      expect(projectsSEO.keywords).toContain("AI project portfolio");
      expect(projectsSEO.keywords).toContain("healthcare AI projects");
      expect(projectsSEO.keywords).toContain("METATRON AI system");
      expect(projectsSEO.keywords).toContain("space medicine AI");
      expect(projectsSEO.keywords).toContain("AI case studies");
      expect(projectsSEO.keywords).toContain("responsible AI applications");
      expect(projectsSEO.keywords).toContain("AI research projects");
    });

    it("should have workshops page SEO configuration", () => {
      const workshopsSEO = PAGE_SEO.workshops;

      expect(workshopsSEO.title).toContain("AI Workshops & Training Programs");
      expect(workshopsSEO.title).toContain("Professional AI Education");

      expect(workshopsSEO.description).toContain("Comprehensive AI workshops");
      expect(workshopsSEO.description).toContain("training programs");
      expect(workshopsSEO.description).toContain("professionals");
      expect(workshopsSEO.description).toContain("responsible AI development");
      expect(workshopsSEO.description).toContain("ethics");
      expect(workshopsSEO.description).toContain("implementation");
      expect(workshopsSEO.description).toContain("hands-on education");
      expect(workshopsSEO.description).toContain("expert instruction");

      expect(workshopsSEO.keywords).toContain("AI workshops");
      expect(workshopsSEO.keywords).toContain("AI training programs");
      expect(workshopsSEO.keywords).toContain("professional AI education");
      expect(workshopsSEO.keywords).toContain("AI ethics training");
      expect(workshopsSEO.keywords).toContain("healthcare AI workshops");
      expect(workshopsSEO.keywords).toContain("AI certification programs");
      expect(workshopsSEO.keywords).toContain("responsible AI training");
    });

    it("should have contact page SEO configuration", () => {
      const contactSEO = PAGE_SEO.contact;

      expect(contactSEO.title).toContain("Contact SAFE AI [4U]");
      expect(contactSEO.title).toContain(
        "AI Consulting & Partnership Inquiries"
      );

      expect(contactSEO.description).toContain("Get in touch");
      expect(contactSEO.description).toContain("AI consulting");
      expect(contactSEO.description).toContain("partnership opportunities");
      expect(contactSEO.description).toContain("project inquiries");
      expect(contactSEO.description).toContain("Professional AI services");
      expect(contactSEO.description).toContain("Europe");
      expect(contactSEO.description).toContain("healthcare");
      expect(contactSEO.description).toContain("education");
      expect(contactSEO.description).toContain("responsible AI implementation");

      expect(contactSEO.keywords).toContain("AI consulting contact");
      expect(contactSEO.keywords).toContain("AI partnership inquiries");
      expect(contactSEO.keywords).toContain("healthcare AI consulting");
      expect(contactSEO.keywords).toContain("AI project consultation");
      expect(contactSEO.keywords).toContain("responsible AI services");
      expect(contactSEO.keywords).toContain("AI expert consultation");
      expect(contactSEO.keywords).toContain("Portugal AI company contact");
    });

    it("should have OpenGraph data for all pages", () => {
      Object.values(PAGE_SEO).forEach(pageSEO => {
        expect(pageSEO.openGraph).toBeDefined();
        expect(pageSEO.openGraph.title).toBeDefined();
        expect(pageSEO.openGraph.description).toBeDefined();
        expect(pageSEO.openGraph.title.length).toBeGreaterThan(0);
        expect(pageSEO.openGraph.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe("generatePageMetadata", () => {
    it("should generate metadata for home page", () => {
      const metadata = generatePageMetadata("home");

      expect(metadata.title).toBe(PAGE_SEO.home.title);
      expect(metadata.description).toBe(PAGE_SEO.home.description);
      expect(metadata.keywords).toBe(PAGE_SEO.home.keywords);
      expect(metadata.authors).toEqual([{ name: BASE_SEO.author }]);
      expect(metadata.creator).toBe(BASE_SEO.author);
      expect(metadata.publisher).toBe(BASE_SEO.organization);
      expect(metadata.category).toBe("Technology");
    });

    it("should generate metadata for about page", () => {
      const metadata = generatePageMetadata("about");

      expect(metadata.title).toBe(PAGE_SEO.about.title);
      expect(metadata.description).toBe(PAGE_SEO.about.description);
      expect(metadata.keywords).toBe(PAGE_SEO.about.keywords);
    });

    it("should generate metadata for services page", () => {
      const metadata = generatePageMetadata("services");

      expect(metadata.title).toBe(PAGE_SEO.services.title);
      expect(metadata.description).toBe(PAGE_SEO.services.description);
      expect(metadata.keywords).toBe(PAGE_SEO.services.keywords);
    });

    it("should generate metadata for projects page", () => {
      const metadata = generatePageMetadata("projects");

      expect(metadata.title).toBe(PAGE_SEO.projects.title);
      expect(metadata.description).toBe(PAGE_SEO.projects.description);
      expect(metadata.keywords).toBe(PAGE_SEO.projects.keywords);
    });

    it("should generate metadata for workshops page", () => {
      const metadata = generatePageMetadata("workshops");

      expect(metadata.title).toBe(PAGE_SEO.workshops.title);
      expect(metadata.description).toBe(PAGE_SEO.workshops.description);
      expect(metadata.keywords).toBe(PAGE_SEO.workshops.keywords);
    });

    it("should generate metadata for contact page", () => {
      const metadata = generatePageMetadata("contact");

      expect(metadata.title).toBe(PAGE_SEO.contact.title);
      expect(metadata.description).toBe(PAGE_SEO.contact.description);
      expect(metadata.keywords).toBe(PAGE_SEO.contact.keywords);
    });

    it("should include robots configuration", () => {
      const metadata = generatePageMetadata("home");

      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      });
    });

    it("should include OpenGraph configuration", () => {
      const metadata = generatePageMetadata("home");

      expect(metadata.openGraph).toEqual({
        type: BASE_SEO.type,
        locale: BASE_SEO.locale,
        url: BASE_SEO.siteUrl,
        siteName: BASE_SEO.siteName,
        title: PAGE_SEO.home.openGraph.title,
        description: PAGE_SEO.home.openGraph.description,
        images: [
          {
            url: `${BASE_SEO.siteUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: PAGE_SEO.home.openGraph.title,
          },
        ],
      });
    });

    it("should include Twitter configuration", () => {
      const metadata = generatePageMetadata("home");

      expect(metadata.twitter).toEqual({
        card: "summary_large_image",
        title: PAGE_SEO.home.openGraph.title,
        description: PAGE_SEO.home.openGraph.description,
        creator: "@safeai4u",
        images: [`${BASE_SEO.siteUrl}/og-image.jpg`],
      });
    });

    it("should include canonical URL", () => {
      const metadata = generatePageMetadata("home");

      expect(metadata.alternates).toEqual({
        canonical: BASE_SEO.siteUrl,
      });
    });

    it("should merge custom metadata when provided", () => {
      const customMetadata = {
        title: "Custom Title",
        description: "Custom Description",
        openGraph: {
          title: "Custom OG Title",
        },
      };

      const metadata = generatePageMetadata("home", customMetadata);

      expect(metadata.title).toBe("Custom Title");
      expect(metadata.description).toBe("Custom Description");
      expect(metadata.openGraph?.title).toBe("Custom OG Title");
      expect(metadata.openGraph?.description).toBe(
        PAGE_SEO.home.openGraph.description
      );
    });
  });

  describe("generateOrganizationStructuredData", () => {
    it("should generate valid organization structured data", () => {
      const structuredData = generateOrganizationStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("Organization");
      expect(structuredData.name).toBe(BASE_SEO.organization);
      expect(structuredData.alternateName).toBe("SAFE AI 4U");
      expect(structuredData.url).toBe(BASE_SEO.siteUrl);
      expect(structuredData.logo).toBe(`${BASE_SEO.siteUrl}/logo.png`);
      expect(structuredData.description).toBe(BASE_SEO.defaultDescription);
    });

    it("should include founder information", () => {
      const structuredData = generateOrganizationStructuredData();

      expect(structuredData.founder).toEqual({
        "@type": "Person",
        name: BASE_SEO.author,
        jobTitle: "Founder & CEO",
        description:
          "AI expert with 15+ years of research experience in responsible AI development",
      });
    });

    it("should include address information", () => {
      const structuredData = generateOrganizationStructuredData();

      expect(structuredData.address).toEqual({
        "@type": "PostalAddress",
        addressCountry: "PT",
        addressRegion: "Portugal",
      });
    });

    it("should include contact point information", () => {
      const structuredData = generateOrganizationStructuredData();

      expect(structuredData.contactPoint).toEqual({
        "@type": "ContactPoint",
        telephone: "+351-XXX-XXX-XXX",
        contactType: "customer service",
        email: "info@safe-ai-4u.eu",
        availableLanguage: ["English", "Portuguese", "Spanish"],
      });
    });

    it("should include social media links", () => {
      const structuredData = generateOrganizationStructuredData();

      expect(structuredData.sameAs).toEqual([
        "https://www.linkedin.com/in/djdasilva/",
        "https://safe-ai-4u.eu",
      ]);
    });

    it("should include service areas and types", () => {
      const structuredData = generateOrganizationStructuredData();

      expect(structuredData.areaServed).toEqual([
        "Europe",
        "North America",
        "Global",
      ]);
      expect(structuredData.serviceType).toEqual([
        "AI Consulting",
        "AI Development",
        "AI Education",
        "Healthcare AI",
        "Responsible AI Implementation",
      ]);
    });
  });

  describe("generateServiceStructuredData", () => {
    it("should generate valid service structured data", () => {
      const structuredData = generateServiceStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("Service");
      expect(structuredData.name).toBe("Responsible AI Solutions");
      expect(structuredData.description).toContain("Expert AI consulting");
      expect(structuredData.description).toContain("development");
      expect(structuredData.description).toContain("education services");
      expect(structuredData.description).toContain(
        "responsible and ethical AI implementation"
      );
    });

    it("should include provider information", () => {
      const structuredData = generateServiceStructuredData();

      expect(structuredData.provider).toEqual({
        "@type": "Organization",
        name: BASE_SEO.organization,
        url: BASE_SEO.siteUrl,
      });
    });

    it("should include service catalog", () => {
      const structuredData = generateServiceStructuredData();

      expect(structuredData.hasOfferCatalog).toEqual({
        "@type": "OfferCatalog",
        name: "AI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Consulting",
              description:
                "Strategic AI consulting for healthcare, education, and enterprise applications",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Development",
              description:
                "Custom AI solution development with ethical implementation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Education",
              description:
                "Professional AI training and workshops for responsible AI development",
            },
          },
        ],
      });
    });
  });

  describe("generateCourseStructuredData", () => {
    it("should generate valid course structured data", () => {
      const structuredData = generateCourseStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("Course");
      expect(structuredData.name).toBe("Professional AI Training Programs");
      expect(structuredData.description).toContain(
        "Comprehensive AI education"
      );
      expect(structuredData.description).toContain("foundations");
      expect(structuredData.description).toContain("applied development");
      expect(structuredData.description).toContain("ethics");
    });

    it("should include provider information", () => {
      const structuredData = generateCourseStructuredData();

      expect(structuredData.provider).toEqual({
        "@type": "Organization",
        name: BASE_SEO.organization,
        url: BASE_SEO.siteUrl,
      });
    });

    it("should include course instances", () => {
      const structuredData = generateCourseStructuredData();

      expect(structuredData.hasCourseInstance).toHaveLength(3);

      const foundationCourse = structuredData.hasCourseInstance[0];
      expect(foundationCourse.name).toBe("AI Foundations Workshop");
      expect(foundationCourse.description).toBe(
        "Perfect starting point for AI newcomers and professionals"
      );
      expect(foundationCourse.courseMode).toEqual(["In-person", "Online"]);
      expect(foundationCourse.duration).toBe("P2D");

      const developmentCourse = structuredData.hasCourseInstance[1];
      expect(developmentCourse.name).toBe("Applied AI Development");
      expect(developmentCourse.description).toBe(
        "Build production-ready AI applications and solutions"
      );
      expect(developmentCourse.courseMode).toBe("In-person");
      expect(developmentCourse.duration).toBe("P3D");

      const ethicsCourse = structuredData.hasCourseInstance[2];
      expect(ethicsCourse.name).toBe("AI Ethics & Leadership");
      expect(ethicsCourse.description).toBe(
        "Lead responsible AI initiatives in your organization"
      );
      expect(ethicsCourse.courseMode).toBe("Executive Retreat");
      expect(ethicsCourse.duration).toBe("P2D");
    });

    it("should include instructor information for all courses", () => {
      const structuredData = generateCourseStructuredData();

      structuredData.hasCourseInstance.forEach(course => {
        expect(course.instructor).toEqual({
          "@type": "Person",
          name: BASE_SEO.author,
          jobTitle: "AI Expert & Founder",
        });
      });
    });
  });

  describe("generatePersonStructuredData", () => {
    it("should generate valid person structured data for David Belo", () => {
      const structuredData = generatePersonStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("Person");
      expect(structuredData.name).toBe(BASE_SEO.author);
      expect(structuredData.jobTitle).toBe("Founder & CEO");
      expect(structuredData.description).toContain(
        "AI expert with 15+ years of research experience"
      );
      expect(structuredData.description).toContain(
        "responsible AI development"
      );
      expect(structuredData.description).toContain("healthcare AI");
      expect(structuredData.description).toContain(
        "ethical technology implementation"
      );
    });

    it("should include professional information", () => {
      const structuredData = generatePersonStructuredData();

      expect(structuredData.url).toBe(BASE_SEO.siteUrl);
      expect(structuredData.image).toBe(
        "https://safe-ai-4u.eu/wp-content/uploads/2023/10/Untitled-7-1-768x768.png"
      );
      expect(structuredData.sameAs).toEqual([
        "https://www.linkedin.com/in/djdasilva/",
        "https://safe-ai-4u.eu",
      ]);
    });

    it("should include work information", () => {
      const structuredData = generatePersonStructuredData();

      expect(structuredData.worksFor).toEqual({
        "@type": "Organization",
        name: BASE_SEO.organization,
        url: BASE_SEO.siteUrl,
      });
    });

    it("should include expertise areas", () => {
      const structuredData = generatePersonStructuredData();

      expect(structuredData.knowsAbout).toEqual([
        "Artificial Intelligence",
        "Machine Learning",
        "Healthcare AI",
        "AI Ethics",
        "Responsible AI Development",
        "AI Education",
        "AI Consulting",
      ]);
    });

    it("should include educational background", () => {
      const structuredData = generatePersonStructuredData();

      expect(structuredData.alumniOf).toEqual({
        "@type": "Organization",
        name: "University Research Institution",
      });

      expect(structuredData.hasCredential).toEqual({
        "@type": "EducationalOccupationalCredential",
        name: "PhD in Computer Science",
        description: "Specialization in artificial intelligence systems",
      });
    });
  });

  describe("generateProjectStructuredData", () => {
    it("should generate valid project structured data", () => {
      const structuredData = generateProjectStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("CreativeWork");
      expect(structuredData.name).toBe("AI Research Projects Portfolio");
      expect(structuredData.description).toContain("Innovative AI projects");
      expect(structuredData.description).toContain("transforming healthcare");
      expect(structuredData.description).toContain("space exploration");
      expect(structuredData.description).toContain("digital wellness");
    });

    it("should include creator and publisher information", () => {
      const structuredData = generateProjectStructuredData();

      expect(structuredData.creator).toEqual({
        "@type": "Person",
        name: BASE_SEO.author,
      });

      expect(structuredData.publisher).toEqual({
        "@type": "Organization",
        name: BASE_SEO.organization,
        url: BASE_SEO.siteUrl,
      });
    });

    it("should include project components", () => {
      const structuredData = generateProjectStructuredData();

      expect(structuredData.hasPart).toHaveLength(3);

      const metatronProject = structuredData.hasPart[0];
      expect(metatronProject["@type"]).toBe("SoftwareApplication");
      expect(metatronProject.name).toBe("METATRON");
      expect(metatronProject.description).toContain("Conceptual framework");
      expect(metatronProject.description).toContain("interconnected data");
      expect(metatronProject.description).toContain(
        "machine learning infrastructure"
      );
      expect(metatronProject.description).toContain("healthcare AI");
      expect(metatronProject.applicationCategory).toBe(
        "Healthcare AI Infrastructure"
      );
      expect(metatronProject.operatingSystem).toBe("Cross-platform");
      expect(metatronProject.softwareRequirements).toBe(
        "Machine Learning Infrastructure"
      );

      const spaceMedicineProject = structuredData.hasPart[1];
      expect(spaceMedicineProject["@type"]).toBe("ResearchProject");
      expect(spaceMedicineProject.name).toBe("Space Medicine AI");
      expect(spaceMedicineProject.description).toContain("Research initiative");
      expect(spaceMedicineProject.description).toContain("AI applications");
      expect(spaceMedicineProject.description).toContain(
        "healthcare challenges"
      );
      expect(spaceMedicineProject.description).toContain(
        "extreme environments"
      );
      expect(spaceMedicineProject.funding).toEqual({
        "@type": "Grant",
        name: "Research Initiative",
      });

      const isekaiProject = structuredData.hasPart[2];
      expect(isekaiProject["@type"]).toBe("SoftwareApplication");
      expect(isekaiProject.name).toBe("ISEKAI");
      expect(isekaiProject.description).toContain(
        "Conceptual gamification platform"
      );
      expect(isekaiProject.description).toContain(
        "AI-enhanced physical wellness"
      );
      expect(isekaiProject.applicationCategory).toBe("Wellness Technology");
      expect(isekaiProject.operatingSystem).toBe("Cross-platform");
    });
  });

  describe("generateReviewStructuredData", () => {
    it("should generate valid review structured data", () => {
      const structuredData = generateReviewStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("Organization");
      expect(structuredData.name).toBe(BASE_SEO.organization);
    });

    it("should include aggregate rating", () => {
      const structuredData = generateReviewStructuredData();

      expect(structuredData.aggregateRating).toEqual({
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "25",
        bestRating: "5",
        worstRating: "1",
      });
    });

    it("should include individual reviews", () => {
      const structuredData = generateReviewStructuredData();

      expect(structuredData.review).toHaveLength(3);

      const firstReview = structuredData.review[0];
      expect(firstReview["@type"]).toBe("Review");
      expect(firstReview.reviewRating).toEqual({
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      });
      expect(firstReview.author).toEqual({
        "@type": "Person",
        name: "Dr. Maria Santos",
      });
      expect(firstReview.reviewBody).toContain(
        "approach to responsible AI development"
      );
      expect(firstReview.reviewBody).toContain("SAFE AI [4U]");
      expect(firstReview.reviewBody).toContain("ethical healthcare innovation");
      expect(firstReview.reviewBody).toContain("research-driven methodology");
      expect(firstReview.reviewBody).toContain("patient safety");
      expect(firstReview.datePublished).toBe("2024-01-15");

      const secondReview = structuredData.review[1];
      expect(secondReview.author).toEqual({
        "@type": "Person",
        name: "Alex Thompson",
      });
      expect(secondReview.reviewBody).toContain("educational workshops");
      expect(secondReview.reviewBody).toContain("essential knowledge");
      expect(secondReview.reviewBody).toContain("implementing AI ethically");
      expect(secondReview.reviewBody).toContain("practical frameworks");
      expect(secondReview.datePublished).toBe("2024-02-10");

      const thirdReview = structuredData.review[2];
      expect(thirdReview.author).toEqual({
        "@type": "Person",
        name: "Dr. Elena Rodriguez",
      });
      expect(thirdReview.reviewBody).toContain("reinforced our belief");
      expect(thirdReview.reviewBody).toContain(
        "AI development must prioritize human welfare"
      );
      expect(thirdReview.reviewBody).toContain("AI with conscience");
      expect(thirdReview.reviewBody).toContain("organizational values");
      expect(thirdReview.datePublished).toBe("2024-03-05");
    });
  });

  describe("generateFAQStructuredData", () => {
    it("should generate valid FAQ structured data", () => {
      const structuredData = generateFAQStructuredData();

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("FAQPage");
    });

    it("should include FAQ questions and answers", () => {
      const structuredData = generateFAQStructuredData();

      expect(structuredData.mainEntity).toHaveLength(4);

      const firstFAQ = structuredData.mainEntity[0];
      expect(firstFAQ["@type"]).toBe("Question");
      expect(firstFAQ.name).toBe("What is responsible AI development?");
      expect(firstFAQ.acceptedAnswer).toEqual({
        "@type": "Answer",
        text: "Responsible AI development is an approach that prioritizes ethical considerations, human welfare, and societal benefit throughout the AI development lifecycle. It includes bias detection, transparency, accountability, and ensuring AI systems serve humanity's best interests.",
      });

      const secondFAQ = structuredData.mainEntity[1];
      expect(secondFAQ.name).toBe("What services does SAFE AI [4U] offer?");
      expect(secondFAQ.acceptedAnswer.text).toContain("three core services");
      expect(secondFAQ.acceptedAnswer.text).toContain(
        "AI consulting and strategy development"
      );
      expect(secondFAQ.acceptedAnswer.text).toContain(
        "custom AI solution development"
      );
      expect(secondFAQ.acceptedAnswer.text).toContain(
        "comprehensive AI education and training programs"
      );
      expect(secondFAQ.acceptedAnswer.text).toContain(
        "responsible AI implementation"
      );

      const thirdFAQ = structuredData.mainEntity[2];
      expect(thirdFAQ.name).toBe("Who can benefit from AI workshops?");
      expect(thirdFAQ.acceptedAnswer.text).toContain(
        "professionals at all levels"
      );
      expect(thirdFAQ.acceptedAnswer.text).toContain("beginners to executives");
      expect(thirdFAQ.acceptedAnswer.text).toContain(
        "healthcare professionals"
      );
      expect(thirdFAQ.acceptedAnswer.text).toContain("technology teams");
      expect(thirdFAQ.acceptedAnswer.text).toContain("academic researchers");
      expect(thirdFAQ.acceptedAnswer.text).toContain("business leaders");

      const fourthFAQ = structuredData.mainEntity[3];
      expect(fourthFAQ.name).toBe(
        "What makes SAFE AI [4U] different from other AI companies?"
      );
      expect(fourthFAQ.acceptedAnswer.text).toContain("core philosophy");
      expect(fourthFAQ.acceptedAnswer.text).toContain(
        "We should stop playing with AI and use it with conscience"
      );
      expect(fourthFAQ.acceptedAnswer.text).toContain(
        "15+ years of AI research experience"
      );
      expect(fourthFAQ.acceptedAnswer.text).toContain(
        "unwavering commitment to ethical development"
      );
      expect(fourthFAQ.acceptedAnswer.text).toContain(
        "human-centered innovation"
      );
    });
  });
});
