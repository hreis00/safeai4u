// Service data for SAFE AI [4U] services page
// Based on requirements 2.1, 2.2, 2.3 for comprehensive service descriptions

export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  targetAudience: string[];
  deliverables: string[];
  methodology: string[];
}

export const aiConsultingServices: ServiceDetail = {
  id: "ai-consulting",
  title: "AI Consulting & Strategy",
  shortDescription:
    "Expert guidance for responsible AI implementation across your organization",
  fullDescription:
    "Our AI consulting services help organizations navigate the complex landscape of artificial intelligence implementation with a focus on ethical, responsible, and sustainable AI practices. We work closely with your team to develop comprehensive AI strategies that align with your business objectives while ensuring compliance with emerging AI regulations and ethical standards.",
  features: [
    {
      title: "AI Readiness Assessment",
      description:
        "Comprehensive evaluation of your organization's AI maturity and implementation readiness",
      icon: "🔍",
    },
    {
      title: "Ethical AI Framework Development",
      description:
        "Custom frameworks ensuring responsible AI practices aligned with your values",
      icon: "⚖️",
    },
    {
      title: "AI Strategy & Roadmap",
      description:
        "Strategic planning for AI adoption with clear milestones and success metrics",
      icon: "🗺️",
    },
    {
      title: "Risk Assessment & Mitigation",
      description:
        "Identification and mitigation of AI-related risks including bias and privacy concerns",
      icon: "🛡️",
    },
  ],
  benefits: [
    {
      title: "Reduced Implementation Risk",
      description: "Minimize costly mistakes with expert guidance from day one",
    },
    {
      title: "Accelerated Time-to-Value",
      description:
        "Faster ROI through strategic planning and proven methodologies",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Stay ahead of AI regulations with proactive compliance strategies",
    },
    {
      title: "Sustainable AI Practices",
      description:
        "Build AI systems that serve humanity and create long-term value",
    },
  ],
  targetAudience: [
    "C-level executives planning AI transformation",
    "IT leaders evaluating AI technologies",
    "Healthcare organizations implementing AI solutions",
    "Educational institutions adopting AI tools",
    "Government agencies exploring AI applications",
  ],
  deliverables: [
    "AI readiness assessment report",
    "Custom AI strategy document",
    "Implementation roadmap with timelines",
    "Risk assessment and mitigation plan",
    "Ethical AI guidelines and policies",
  ],
  methodology: [
    "Discovery workshops and stakeholder interviews",
    "Current state analysis and gap assessment",
    "Best practices research and benchmarking",
    "Collaborative strategy development",
    "Implementation planning and change management",
  ],
};

export const aiDevelopmentServices: ServiceDetail = {
  id: "ai-development",
  title: "AI Development & Implementation",
  shortDescription:
    "Custom AI solutions built with cutting-edge technology and responsible practices",
  fullDescription:
    "We develop custom AI solutions that address your specific business challenges while maintaining the highest standards of ethical AI development. Our team combines deep technical expertise with a commitment to responsible AI, ensuring your solutions are not only powerful but also trustworthy, transparent, and aligned with human values.",
  features: [
    {
      title: "Custom AI Model Development",
      description:
        "Tailored machine learning models designed for your specific use cases and data",
      icon: "🤖",
    },
    {
      title: "Healthcare AI Solutions",
      description:
        "Specialized AI applications for medical diagnosis, treatment planning, and patient care",
      icon: "🏥",
    },
    {
      title: "Educational AI Platforms",
      description:
        "Intelligent tutoring systems and personalized learning solutions",
      icon: "🎓",
    },
    {
      title: "Explainable AI Implementation",
      description:
        "Transparent AI systems with clear decision-making processes",
      icon: "💡",
    },
  ],
  benefits: [
    {
      title: "Tailored Solutions",
      description:
        "AI systems designed specifically for your unique requirements and constraints",
    },
    {
      title: "Ethical by Design",
      description:
        "Built-in safeguards ensuring responsible AI behavior from the ground up",
    },
    {
      title: "Scalable Architecture",
      description:
        "Future-proof solutions that grow with your organization's needs",
    },
    {
      title: "Ongoing Support",
      description:
        "Continuous monitoring, maintenance, and optimization of your AI systems",
    },
  ],
  targetAudience: [
    "Healthcare providers seeking AI-powered diagnostics",
    "Educational institutions developing smart learning platforms",
    "Research organizations requiring custom AI tools",
    "Enterprises needing specialized AI applications",
    "Startups building AI-first products",
  ],
  deliverables: [
    "Custom AI models and algorithms",
    "Complete application development",
    "Integration with existing systems",
    "Comprehensive testing and validation",
    "Documentation and training materials",
  ],
  methodology: [
    "Requirements analysis and technical specification",
    "Data assessment and preparation strategies",
    "Iterative development with regular feedback",
    "Rigorous testing including bias and fairness evaluation",
    "Deployment support and knowledge transfer",
  ],
};

export const educationServices: ServiceDetail = {
  id: "education-training",
  title: "AI Education & Training",
  shortDescription:
    "Comprehensive AI education programs promoting responsible AI literacy",
  fullDescription:
    "Our education and training programs are designed to build AI literacy across all levels of your organization. We believe that widespread understanding of AI principles, capabilities, and limitations is essential for responsible AI adoption. Our programs combine theoretical knowledge with practical applications, always emphasizing ethical considerations and human-centered AI development.",
  features: [
    {
      title: "Executive AI Workshops",
      description:
        "Strategic AI education for leadership teams and decision makers",
      icon: "👔",
    },
    {
      title: "Technical AI Training",
      description:
        "Hands-on training for developers, data scientists, and technical teams",
      icon: "💻",
    },
    {
      title: "AI Ethics Seminars",
      description:
        "Comprehensive programs on responsible AI development and deployment",
      icon: "🎯",
    },
    {
      title: "Custom Curriculum Development",
      description:
        "Tailored training programs designed for your organization's specific needs",
      icon: "📚",
    },
  ],
  benefits: [
    {
      title: "Organization-wide AI Literacy",
      description:
        "Build comprehensive understanding across all departments and levels",
    },
    {
      title: "Responsible AI Culture",
      description: "Foster a culture of ethical AI development and deployment",
    },
    {
      title: "Practical Skills Development",
      description:
        "Hands-on experience with real-world AI tools and techniques",
    },
    {
      title: "Continuous Learning Support",
      description: "Ongoing resources and support for continued AI education",
    },
  ],
  targetAudience: [
    "Corporate teams transitioning to AI-enhanced workflows",
    "Academic institutions developing AI curricula",
    "Healthcare professionals adopting AI tools",
    "Government agencies implementing AI policies",
    "Non-profit organizations exploring AI applications",
  ],
  deliverables: [
    "Customized training curricula and materials",
    "Interactive workshops and hands-on sessions",
    "AI ethics guidelines and best practices",
    "Certification programs and assessments",
    "Ongoing mentorship and support resources",
  ],
  methodology: [
    "Learning needs assessment and gap analysis",
    "Curriculum design with practical applications",
    "Interactive delivery with real-world case studies",
    "Continuous assessment and feedback integration",
    "Post-training support and resource provision",
  ],
};

export const allServices = [
  aiConsultingServices,
  aiDevelopmentServices,
  educationServices,
];
