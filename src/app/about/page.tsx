import { Hero } from "@/components/Hero";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInUp, StaggerContainer } from "@/components/animations";
import {
  introStatement,
  missionContent,
  valuesContent,
  teamMembers,
  closingSection,
} from "@/lib/content/about-page-data";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("about");

// Helper function to parse markdown-style bold text
function parseBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );
}

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="OUR STORY"
        title="ABOUT US"
        description={introStatement}
      />

      {/* Mission & Values Section */}
      <section className="container mx-auto px-4 py-16 bg-section-muted">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Mission Column */}
              <FadeInUp delay={0.1}>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <h2 className="text-3xl font-bold">
                      {missionContent.title}
                    </h2>
                    <div className="space-y-4">
                      {missionContent.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base text-muted-foreground leading-relaxed"
                        >
                          {parseBoldText(paragraph)}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInUp>

              {/* Values Column */}
              <FadeInUp delay={0.2}>
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <h2 className="text-3xl font-bold">
                      {valuesContent.title}
                    </h2>
                    <div className="space-y-4">
                      {valuesContent.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base text-muted-foreground leading-relaxed"
                        >
                          {parseBoldText(paragraph)}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInUp>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Meet Our Team</h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Visionaries and innovators dedicated to building responsible
                  AI solutions that make a positive impact on healthcare,
                  education, and society.
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Closing Section */}
      <div className="mb-16">
        <section className="container mx-auto px-4 py-16 bg-section-muted">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold">{closingSection.heading}</h2>
                <p className="text-2xl text-primary font-semibold">
                  {closingSection.subheading}
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>
      </div>
    </div>
  );
}
