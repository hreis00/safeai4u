import { Metadata } from "next";
import { Testimonials } from "@/components/ui/testimonials";
import { FAQ } from "@/components/ui/faq";

// Reusable Components
import { Hero } from "@/components/Hero";
import { ServiceTabs } from "@/components/ServiceTabs";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "SAI [4Trust] - Responsible AI",
  description:
    "Responsible AI solutions for ethical technology implementation and social consciousness.",
};

export default function TrustPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Responsible AI for All"
        title="SAI [4Trust]"
        description="Building trust through ethical AI implementation that harmonizes innovation with social consciousness, creating technology that serves humanity responsibly."
        primaryButton={{
          text: "Partner with Us",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Our Mission",
          href: "/about",
        }}
      />

      {/* Trust Pillars */}
      <ServiceTabs
        title="Pillars of Responsible AI"
        description="Our comprehensive approach to ethical AI ensures technology development that prioritizes human welfare and societal benefit."
        defaultTab="transparency"
        tabs={[
          {
            value: "transparency",
            label: "Transparency",
            cards: [
              {
                icon: "🔍",
                title: "Explainable AI",
                description:
                  "Making AI decisions understandable and interpretable",
                content:
                  "Our AI systems provide clear explanations for their decisions, enabling stakeholders to understand and trust the technology.",
                progress: {
                  label: "Interpretability Score",
                  value: 94,
                },
                badges: [
                  "Decision Trees",
                  "Feature Importance",
                  "Model Interpretation",
                ],
              },
              {
                icon: "📊",
                title: "Open Documentation",
                description:
                  "Comprehensive documentation of AI systems and processes",
                content:
                  "Complete transparency in our methodologies, data sources, and system architectures to build stakeholder confidence.",
                progress: {
                  label: "Documentation Coverage",
                  value: 98,
                },
                badges: ["Model Cards", "Data Sheets", "Process Maps"],
              },
            ],
          },
          {
            value: "fairness",
            label: "Fairness",
            cards: [
              {
                icon: "⚖️",
                title: "Bias Detection",
                description:
                  "Systematic identification and mitigation of algorithmic bias",
                content:
                  "Advanced techniques to detect, measure, and eliminate biases that could lead to unfair or discriminatory outcomes.",
                progress: {
                  label: "Bias Reduction",
                  value: 91,
                },
                badges: [
                  "Statistical Parity",
                  "Equal Opportunity",
                  "Demographic Parity",
                ],
              },
              {
                icon: "🌍",
                title: "Inclusive Design",
                description:
                  "AI systems designed to serve diverse communities equitably",
                content:
                  "Ensuring our AI solutions work fairly across different demographics, cultures, and socioeconomic backgrounds.",
                progress: {
                  label: "Inclusivity Rating",
                  value: 96,
                },
                badges: [
                  "Universal Design",
                  "Cultural Sensitivity",
                  "Accessibility",
                ],
              },
            ],
          },
          {
            value: "accountability",
            label: "Accountability",
            cards: [
              {
                icon: "📋",
                title: "Governance Framework",
                description:
                  "Structured oversight and governance of AI systems",
                content:
                  "Comprehensive governance structures ensure responsible AI development, deployment, and ongoing monitoring throughout the system lifecycle.",
                progress: {
                  label: "Governance Maturity",
                  value: 93,
                },
                badges: [
                  "Ethics Boards",
                  "Risk Management",
                  "Compliance Monitoring",
                ],
              },
              {
                icon: "🛡️",
                title: "Continuous Monitoring",
                description:
                  "Ongoing assessment of AI system performance and impact",
                content:
                  "Real-time monitoring and regular audits ensure AI systems continue to operate ethically and effectively over time.",
                progress: {
                  label: "Monitoring Coverage",
                  value: 97,
                },
                badges: [
                  "Performance Tracking",
                  "Impact Assessment",
                  "Regular Audits",
                ],
              },
            ],
          },
        ]}
      />

      {/* Trust in Action */}
      <ServiceShowcase
        title="Trust in Action"
        description="Real-world examples of how our responsible AI principles create positive impact"
        background="muted"
        columns={3}
        items={[
          {
            badge: "Healthcare",
            title: "Fair Medical AI",
            description: "Eliminating bias in diagnostic algorithms",
            content:
              "Our healthcare AI systems undergo rigorous bias testing to ensure equal treatment quality across all patient demographics.",
            metric: {
              label: "Impact",
              value: 40,
              suffix: "% reduction in diagnostic disparities",
            },
          },
          {
            badge: "Education",
            title: "Inclusive Learning",
            description: "AI education accessible to all communities",
            content:
              "Our educational programs are designed to bridge the digital divide, ensuring AI literacy reaches underserved communities.",
            metric: {
              label: "Impact",
              value: 200,
              suffix: "+ communities reached globally",
            },
          },
          {
            badge: "Governance",
            title: "Ethical Standards",
            description: "Industry-leading AI ethics framework",
            content:
              "We've developed comprehensive ethical guidelines that serve as a model for responsible AI development across industries.",
            metric: {
              label: "Impact: Adopted by",
              value: 50,
              suffix: "+ organizations",
            },
          },
        ]}
      />

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <Testimonials
          title="Trusted by Ethics Leaders"
          description="Hear from the experts who are building a more responsible AI future"
          testimonials={[
            {
              quote:
                "Safe AI 4U's commitment to transparency and accountability sets the gold standard for responsible AI development. Their framework has transformed how we approach ethics in our research.",
              author: "Dr. Rebecca Chen",
              role: "AI Ethics Researcher",
              organization: "Stanford",
              initials: "DR",
            },
            {
              quote:
                "The bias detection tools and governance frameworks provided by Safe AI 4U have been instrumental in ensuring our AI systems serve all users fairly. Outstanding partnership.",
              author: "Marcus Anderson",
              role: "Chief Ethics Officer",
              organization: "TechCorp",
              initials: "MA",
            },
            {
              quote:
                "Working with Safe AI 4U has accelerated our mission to make AI accessible and fair for underserved communities worldwide. Their inclusive design approach is revolutionary.",
              author: "Dr. Amara Mohammed",
              role: "Director",
              organization: "Global AI Ethics Initiative",
              initials: "AM",
            },
          ]}
        />
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <FAQ
          title="Responsible AI Questions"
          description="Common questions about ethical AI implementation and governance"
          faqs={[
            {
              question: "How do you ensure AI systems are free from bias?",
              answer:
                "We employ multi-layered bias detection including statistical parity analysis, demographic parity testing, and equal opportunity assessment. Our systems undergo continuous monitoring with diverse test datasets, and we maintain bias audit trails throughout the AI lifecycle. Regular third-party audits ensure ongoing fairness.",
            },
            {
              question: "What makes AI governance effective?",
              answer:
                "Effective AI governance requires clear accountability structures, regular impact assessments, stakeholder engagement, and transparent decision-making processes. We establish ethics boards, implement risk management frameworks, and maintain compliance monitoring systems that adapt to evolving regulations.",
            },
            {
              question: "How do you balance innovation with responsibility?",
              answer:
                "We integrate ethical considerations from the earliest design phases, using responsible innovation frameworks that consider societal impact alongside technical advancement. Our approach includes stakeholder consultation, impact assessment, and iterative development that prioritizes safety and fairness.",
            },
            {
              question: "What role does transparency play in AI trust?",
              answer:
                "Transparency is fundamental to building trust. We provide explainable AI systems, comprehensive documentation, open methodologies, and clear communication about AI capabilities and limitations. Users understand how decisions are made and can verify system behavior.",
            },
            {
              question:
                "How do you address AI's impact on different communities?",
              answer:
                "We conduct inclusive design processes that engage diverse communities from project inception. Our development includes cultural sensitivity analysis, accessibility considerations, and community feedback loops. We ensure AI benefits are distributed equitably across different populations.",
            },
            {
              question: "What standards guide your AI ethics framework?",
              answer:
                "Our framework aligns with international standards including IEEE Ethics in Design, EU AI Act principles, and UNESCO AI Ethics recommendations. We also incorporate domain-specific guidelines and maintain certification with recognized ethics bodies to ensure comprehensive coverage.",
            },
          ]}
        />
      </section>

      {/* Partnership Opportunities */}
      <ServiceShowcase
        title="Partnership Opportunities"
        description="Collaborate with us to build a more ethical and inclusive AI future"
        background="default"
        columns={2}
        items={[
          {
            title: "AI Ethics Consulting",
            description:
              "Comprehensive ethical AI assessment and strategy development",
            features: [
              "Ethical impact assessments",
              "Bias auditing and mitigation",
              "Governance framework development",
              "Regulatory compliance guidance",
              "Staff training and certification",
            ],
            buttonText: "Get Assessment",
            buttonHref: "/contact?service=consulting",
          },
          {
            title: "Responsible AI Certification",
            description:
              "Validate your organization's commitment to ethical AI",
            features: [
              "Comprehensive ethics evaluation",
              "Industry-recognized certification",
              "Ongoing monitoring and support",
              "Public trust and credibility",
              "Continuous improvement guidance",
            ],
            buttonText: "Start Certification",
            buttonHref: "/contact?service=certification",
          },
        ]}
      />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <CallToAction
          title="Ready to Build Trustworthy AI?"
          description="Join the movement towards responsible AI that benefits everyone.
                Let's create technology with conscience together."
          primaryButton={{ text: "Start Partnership", href: "/contact" }}
          secondaryButton={{ text: "Learn Ethics", href: "/workshops" }}
        />
      </section>
    </div>
  );
}
