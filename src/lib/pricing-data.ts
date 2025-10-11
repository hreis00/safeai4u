// Pricing and engagement models for SAFE AI [4U] services
// Based on requirements 2.2, 7.1, 7.2 for pricing structure and engagement processes

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  ideal_for: string[];
  cta_text: string;
  popular?: boolean;
}

export interface EngagementProcess {
  step: number;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface ServicePricing {
  service_id: string;
  service_name: string;
  pricing_model: "project" | "retainer" | "hourly" | "custom";
  tiers: PricingTier[];
  engagement_process: EngagementProcess[];
  consultation_info: {
    description: string;
    duration: string;
    includes: string[];
  };
}

export const consultingPricing: ServicePricing = {
  service_id: "ai-consulting",
  service_name: "AI Consulting & Strategy",
  pricing_model: "project",
  tiers: [
    {
      name: "AI Readiness Assessment",
      description:
        "Comprehensive evaluation of your AI readiness and strategic recommendations",
      price: "€5,000 - €15,000",
      duration: "2-4 weeks",
      features: [
        "Current state analysis",
        "AI maturity assessment",
        "Strategic recommendations",
        "Implementation roadmap",
        "Risk assessment report",
      ],
      ideal_for: [
        "Organizations new to AI",
        "Companies planning AI transformation",
        "Teams needing strategic direction",
      ],
      cta_text: "Start Assessment",
    },
    {
      name: "AI Strategy Development",
      description:
        "Complete AI strategy with detailed implementation plan and governance framework",
      price: "€15,000 - €35,000",
      duration: "4-8 weeks",
      features: [
        "Comprehensive AI strategy",
        "Detailed implementation roadmap",
        "Ethical AI framework",
        "Governance structure",
        "Change management plan",
        "3-month follow-up support",
      ],
      ideal_for: [
        "Mid to large enterprises",
        "Organizations with complex AI needs",
        "Companies requiring governance frameworks",
      ],
      cta_text: "Develop Strategy",
      popular: true,
    },
    {
      name: "Ongoing AI Advisory",
      description:
        "Continuous strategic guidance and support for your AI initiatives",
      price: "€3,000 - €8,000/month",
      duration: "6-12 months",
      features: [
        "Monthly strategic reviews",
        "Quarterly progress assessments",
        "Ongoing risk monitoring",
        "Technology evaluation support",
        "Team mentoring",
        "Priority email/call support",
      ],
      ideal_for: [
        "Organizations with active AI programs",
        "Companies needing ongoing guidance",
        "Teams implementing complex AI systems",
      ],
      cta_text: "Get Advisory Support",
    },
  ],
  engagement_process: [
    {
      step: 1,
      title: "Initial Consultation",
      description:
        "Free 30-minute consultation to understand your needs and challenges",
      duration: "30 minutes",
      deliverables: [
        "Needs assessment",
        "Service recommendation",
        "Proposal outline",
      ],
    },
    {
      step: 2,
      title: "Proposal & Planning",
      description: "Detailed proposal with scope, timeline, and deliverables",
      duration: "1 week",
      deliverables: [
        "Detailed proposal",
        "Project timeline",
        "Success metrics",
      ],
    },
    {
      step: 3,
      title: "Discovery & Analysis",
      description: "Deep dive into your current state and requirements",
      duration: "1-2 weeks",
      deliverables: [
        "Current state analysis",
        "Requirements documentation",
        "Stakeholder interviews",
      ],
    },
    {
      step: 4,
      title: "Strategy Development",
      description: "Collaborative development of your AI strategy and roadmap",
      duration: "2-4 weeks",
      deliverables: [
        "AI strategy document",
        "Implementation roadmap",
        "Risk assessment",
      ],
    },
    {
      step: 5,
      title: "Delivery & Handover",
      description: "Final presentation and knowledge transfer to your team",
      duration: "1 week",
      deliverables: [
        "Final presentation",
        "Documentation package",
        "Follow-up plan",
      ],
    },
  ],
  consultation_info: {
    description:
      "Start with a free consultation to discuss your AI goals and challenges",
    duration: "30 minutes",
    includes: [
      "Assessment of your current AI readiness",
      "Discussion of your specific goals and challenges",
      "Overview of our approach and methodology",
      "Customized service recommendations",
      "Next steps and timeline discussion",
    ],
  },
};

export const developmentPricing: ServicePricing = {
  service_id: "ai-development",
  service_name: "AI Development & Implementation",
  pricing_model: "project",
  tiers: [
    {
      name: "Proof of Concept",
      description: "Validate your AI concept with a working prototype",
      price: "€10,000 - €25,000",
      duration: "4-8 weeks",
      features: [
        "Technical feasibility analysis",
        "Data assessment and preparation",
        "Prototype development",
        "Performance evaluation",
        "Scalability recommendations",
      ],
      ideal_for: [
        "Startups validating AI concepts",
        "Companies exploring AI feasibility",
        "Organizations testing new AI applications",
      ],
      cta_text: "Build Prototype",
    },
    {
      name: "MVP Development",
      description:
        "Full-featured minimum viable product ready for testing and deployment",
      price: "€25,000 - €75,000",
      duration: "8-16 weeks",
      features: [
        "Complete AI application development",
        "User interface and experience design",
        "Integration with existing systems",
        "Testing and quality assurance",
        "Deployment support",
        "3-month maintenance included",
      ],
      ideal_for: [
        "Companies ready to deploy AI solutions",
        "Organizations with validated concepts",
        "Teams needing production-ready systems",
      ],
      cta_text: "Develop MVP",
      popular: true,
    },
    {
      name: "Enterprise Solution",
      description:
        "Comprehensive AI system with advanced features and enterprise-grade security",
      price: "€75,000 - €200,000+",
      duration: "16-32 weeks",
      features: [
        "Custom AI model development",
        "Advanced analytics and reporting",
        "Enterprise security and compliance",
        "Scalable cloud architecture",
        "Advanced integrations",
        "12-month support and maintenance",
        "Training and documentation",
      ],
      ideal_for: [
        "Large enterprises with complex needs",
        "Organizations requiring custom AI models",
        "Companies with strict compliance requirements",
      ],
      cta_text: "Build Enterprise Solution",
    },
  ],
  engagement_process: [
    {
      step: 1,
      title: "Requirements Analysis",
      description:
        "Detailed analysis of your technical requirements and constraints",
      duration: "1-2 weeks",
      deliverables: [
        "Technical specification",
        "Architecture design",
        "Data requirements",
      ],
    },
    {
      step: 2,
      title: "Design & Planning",
      description: "System design and project planning with clear milestones",
      duration: "1-2 weeks",
      deliverables: [
        "System architecture",
        "UI/UX designs",
        "Development plan",
      ],
    },
    {
      step: 3,
      title: "Development Sprints",
      description: "Iterative development with regular reviews and feedback",
      duration: "4-24 weeks",
      deliverables: [
        "Working software increments",
        "Regular demos",
        "Progress reports",
      ],
    },
    {
      step: 4,
      title: "Testing & Validation",
      description:
        "Comprehensive testing including performance and security validation",
      duration: "1-3 weeks",
      deliverables: [
        "Test results",
        "Performance benchmarks",
        "Security assessment",
      ],
    },
    {
      step: 5,
      title: "Deployment & Training",
      description: "Production deployment and team training",
      duration: "1-2 weeks",
      deliverables: ["Production deployment", "User training", "Documentation"],
    },
  ],
  consultation_info: {
    description: "Free technical consultation to assess your development needs",
    duration: "45 minutes",
    includes: [
      "Technical requirements review",
      "Feasibility assessment",
      "Technology recommendations",
      "Project scope and timeline estimation",
      "Development approach discussion",
    ],
  },
};

export const educationPricing: ServicePricing = {
  service_id: "education-training",
  service_name: "AI Education & Training",
  pricing_model: "custom",
  tiers: [
    {
      name: "Executive Workshop",
      description:
        "Strategic AI education for leadership teams and decision makers",
      price: "€2,500 - €5,000",
      duration: "Half or full day",
      features: [
        "AI strategy and business impact",
        "Ethical AI considerations",
        "Risk management and governance",
        "Industry case studies",
        "Interactive Q&A sessions",
      ],
      ideal_for: [
        "C-level executives",
        "Board members",
        "Senior management teams",
      ],
      cta_text: "Book Executive Workshop",
    },
    {
      name: "Technical Training Program",
      description:
        "Comprehensive technical training for development and data science teams",
      price: "€5,000 - €15,000",
      duration: "2-5 days",
      features: [
        "Hands-on AI development training",
        "Best practices and methodologies",
        "Ethical AI implementation",
        "Real-world project exercises",
        "Certification upon completion",
        "3-month follow-up support",
      ],
      ideal_for: [
        "Development teams",
        "Data scientists",
        "Technical professionals",
      ],
      cta_text: "Enroll Technical Training",
      popular: true,
    },
    {
      name: "Custom Training Program",
      description:
        "Tailored training program designed for your organization's specific needs",
      price: "€10,000 - €30,000+",
      duration: "1-4 weeks",
      features: [
        "Customized curriculum development",
        "Organization-specific case studies",
        "Multiple delivery formats",
        "Ongoing mentorship program",
        "Performance assessments",
        "6-month support package",
      ],
      ideal_for: [
        "Large organizations",
        "Companies with specific AI use cases",
        "Teams needing specialized training",
      ],
      cta_text: "Design Custom Program",
    },
  ],
  engagement_process: [
    {
      step: 1,
      title: "Learning Needs Assessment",
      description:
        "Comprehensive assessment of your team's current knowledge and learning objectives",
      duration: "1 week",
      deliverables: [
        "Skills assessment",
        "Learning objectives",
        "Training recommendations",
      ],
    },
    {
      step: 2,
      title: "Curriculum Design",
      description:
        "Custom curriculum development based on your specific needs and goals",
      duration: "1-2 weeks",
      deliverables: [
        "Training curriculum",
        "Learning materials",
        "Assessment framework",
      ],
    },
    {
      step: 3,
      title: "Training Delivery",
      description:
        "Interactive training sessions with hands-on exercises and real-world applications",
      duration: "1-5 days",
      deliverables: [
        "Training sessions",
        "Practical exercises",
        "Knowledge assessments",
      ],
    },
    {
      step: 4,
      title: "Assessment & Certification",
      description:
        "Evaluation of learning outcomes and certification for participants",
      duration: "1 week",
      deliverables: [
        "Performance assessments",
        "Certificates",
        "Improvement recommendations",
      ],
    },
    {
      step: 5,
      title: "Follow-up Support",
      description:
        "Ongoing support and mentorship to ensure knowledge retention and application",
      duration: "3-6 months",
      deliverables: [
        "Regular check-ins",
        "Additional resources",
        "Continued guidance",
      ],
    },
  ],
  consultation_info: {
    description:
      "Free educational consultation to understand your training needs",
    duration: "30 minutes",
    includes: [
      "Current skills assessment",
      "Learning objectives discussion",
      "Training format recommendations",
      "Curriculum overview",
      "Scheduling and logistics planning",
    ],
  },
};

export const allServicePricing = [
  consultingPricing,
  developmentPricing,
  educationPricing,
];
