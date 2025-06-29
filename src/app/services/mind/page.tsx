import { Metadata } from "next";
import { Testimonials } from "@/components/ui/testimonials";
import { FAQ } from "@/components/ui/faq";

// Components
import { Hero } from "@/components/Hero";
import { ServiceTabs } from "@/components/ServiceTabs";
import { QuoteHighlight } from "@/components/QuoteHighlight";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "SAI [4Mind] - AI Education & Training",
  description:
    "Empowering minds with AI education, workshops, and training programs.",
};

export default function MindPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Empowering Minds"
        title="SAI [4Mind]"
        description="Unlock the boundless possibilities of Artificial Intelligence through engaging education, hands-on workshops, and comprehensive training programs."
        primaryButton={{
          text: "View Workshops",
          href: "/workshops",
        }}
        secondaryButton={{
          text: "Start Learning",
          href: "/contact",
        }}
      />

      {/* Learning Paths */}
      <ServiceTabs
        title="Transformative Learning Experiences"
        description="From beginners to advanced practitioners, our educational programs equip you with the skills to thrive in the AI-driven future."
        defaultTab="fundamentals"
        tabs={[
          {
            value: "fundamentals",
            label: "AI Fundamentals",
            cards: [
              {
                icon: "🧠",
                title: "Core Concepts",
                description:
                  "Master the fundamental principles of artificial intelligence",
                content:
                  "Build a solid foundation in machine learning, neural networks, and AI algorithms through interactive lessons and real-world examples.",
                progress: {
                  label: "Concept Mastery",
                  value: 95,
                },
                badges: ["Machine Learning", "Neural Networks", "Data Science"],
              },
              {
                icon: "📚",
                title: "Structured Learning",
                description:
                  "Progressive curriculum designed for maximum retention",
                content:
                  "Our carefully crafted learning paths take you from complete beginner to confident AI practitioner with hands-on projects and mentorship.",
                progress: {
                  label: "Learning Retention",
                  value: 88,
                },
                badges: ["Beginner Friendly", "Progressive", "Mentorship"],
              },
            ],
          },
          {
            value: "practical",
            label: "Practical Applications",
            cards: [
              {
                icon: "🛠️",
                title: "Hands-on Projects",
                description: "Build real-world AI applications and solutions",
                content:
                  "Work on industry-relevant projects that showcase your skills and build a portfolio that demonstrates your AI capabilities.",
                progress: {
                  label: "Project Success Rate",
                  value: 92,
                },
                badges: [
                  "Portfolio Building",
                  "Industry Relevant",
                  "Practical Skills",
                ],
              },
              {
                icon: "🚀",
                title: "Innovation Labs",
                description: "Experiment with cutting-edge AI technologies",
                content:
                  "Access to latest AI tools, frameworks, and technologies to experiment and create innovative solutions.",
                progress: {
                  label: "Innovation Score",
                  value: 96,
                },
                badges: ["Latest Tech", "Experimentation", "Innovation"],
              },
            ],
          },
          {
            value: "ethics",
            label: "Ethics & Responsibility",
            cards: [
              {
                icon: "⚖️",
                title: "Responsible AI",
                description:
                  "Understanding the ethical implications of AI technology",
                content:
                  "Learn to develop and deploy AI systems that are fair, transparent, and beneficial for society while avoiding harmful biases.",
                progress: {
                  label: "Ethics Understanding",
                  value: 94,
                },
                badges: ["Fairness", "Transparency", "Bias Prevention"],
              },
              {
                icon: "🌍",
                title: "Social Impact",
                description: "Creating AI solutions that benefit humanity",
                content:
                  "Focus on developing AI applications that address real-world problems and contribute positively to society and sustainable development.",
                progress: {
                  label: "Social Consciousness",
                  value: 98,
                },
                badges: ["Social Good", "Sustainability", "Impact Focused"],
              },
            ],
          },
        ]}
      />

      {/* Learning Quote */}
      <QuoteHighlight
        quote="We should stop playing with AI and use it with
            conscience."
        author="David Belo"
        role="Founder & CEO"
        organization="SAFE AI [4U]"
      />

      {/* Program Highlights */}
      <ServiceShowcase
        title="Featured Programs"
        description="Comprehensive learning experiences designed to unlock your AI potential"
        background="default"
        columns={3}
        items={[
          {
            badge: "Beginner",
            title: "AI Foundations Workshop",
            description: "Perfect starting point for AI newcomers",
            features: [
              "Introduction to AI and ML",
              "Hands-on coding exercises",
              "Real-world case studies",
              "Certificate of completion",
            ],
            buttonText: "Learn More",
            buttonHref: "/workshops#foundations",
          },
          {
            badge: "Intermediate",
            title: "Applied AI Development",
            description: "Build production-ready AI applications",
            features: [
              "Advanced ML algorithms",
              "Model deployment strategies",
              "Performance optimization",
              "Portfolio project guidance",
            ],
            buttonText: "Learn More",
            buttonHref: "/workshops#applied",
          },
          {
            badge: "Advanced",
            title: "AI Ethics & Leadership",
            description: "Lead responsible AI initiatives",
            features: [
              "Ethical AI frameworks",
              "Bias detection and mitigation",
              "AI governance strategies",
              "Leadership certification",
            ],
            buttonText: "Learn More",
            buttonHref: "/workshops#ethics",
          },
        ]}
      />

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <Testimonials
          title="Learners and Educators Love Our Programs"
          description="Success stories from AI professionals, educators, and career changers"
          testimonials={[
            {
              quote:
                "The structured learning path took me from complete beginner to landing my first AI role in just 6 months. The mentorship was incredible.",
              author: "Maria Santos",
              role: "AI Developer",
              organization: "Tech Innovation Corp",
              initials: "MS",
            },
            {
              quote:
                "As an educator, I've integrated these ethical AI frameworks into our curriculum. Students are now developing truly responsible AI solutions.",
              author: "Prof. James Mitchell",
              role: "Computer Science Professor",
              organization: "University of Technology",
              initials: "JM",
            },
            {
              quote:
                "The hands-on projects and innovation labs gave me the confidence to lead AI initiatives at my company. Best career investment I've made.",
              author: "Sarah Kim",
              role: "AI Strategy Lead",
              organization: "Fortune 500 Company",
              initials: "SK",
            },
          ]}
        />
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <FAQ
          title="AI Education Questions & Answers"
          description="Common questions about our training programs and learning paths"
          faqs={[
            {
              question: "Do I need prior programming experience to start?",
              answer:
                "No! Our AI Foundations Workshop is designed for complete beginners. We start with basic concepts and gradually build up to more complex topics. Many successful graduates started with no programming background.",
            },
            {
              question: "How long does it take to complete a program?",
              answer:
                "Program duration varies by level. Foundations Workshop takes 4-6 weeks, Applied AI Development takes 12-16 weeks, and Ethics & Leadership is 8-10 weeks. All programs are designed to fit around your schedule with flexible learning options.",
            },
            {
              question: "What kind of support do you provide during learning?",
              answer:
                "We provide comprehensive support including dedicated mentors, peer study groups, office hours with instructors, and a vibrant online community. You're never learning alone.",
            },
            {
              question: "Are the programs recognized by employers?",
              answer:
                "Yes! Our programs are developed in partnership with leading tech companies and are recognized across the industry. Many graduates receive job offers before completing their programs.",
            },
            {
              question: "Can I get hands-on experience with real projects?",
              answer:
                "Absolutely! Every program includes real-world projects that you can add to your portfolio. Our Innovation Labs provide access to cutting-edge AI tools and technologies for experimentation.",
            },
          ]}
        />
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Unlock Your AI Potential?"
        description="Join thousands of learners who have transformed their careers with our comprehensive AI education programs."
        primaryButton={{ text: "Browse Workshops", href: "/workshops" }}
        secondaryButton={{ text: "Get Learning Plan", href: "/contact" }}
      />
    </div>
  );
}
