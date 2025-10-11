import { Badge } from "@/components/ui/badge";
import { FadeInUp, StaggerContainer } from "@/components/animations";

export interface InstructorBio {
  name: string;
  title: string;
  photo?: string;
  bio: string[];
}

export interface InstructorSectionProps {
  instructor: InstructorBio;
  background?: "default" | "muted";
}

/**
 * InstructorSection Component
 *
 * Displays instructor biography and credentials.
 * Used on Services and Workshops pages.
 *
 * @example
 * ```tsx
 * <InstructorSection
 *   instructor={{
 *     name: "David Belo, PhD",
 *     title: "Founder & Lead Instructor",
 *     bio: ["...", "..."]
 *   }}
 * />
 * ```
 */
export function InstructorSection({
  instructor,
  background = "muted",
}: InstructorSectionProps) {
  const sectionClass = background === "muted" ? "bg-section-muted" : "";

  return (
    <section className={`container mx-auto px-4 py-16 ${sectionClass}`}>
      <div className="max-w-4xl mx-auto">
        <StaggerContainer>
          {/* Header */}
          <FadeInUp>
            <div className="text-center space-y-4 mb-8">
              <Badge variant="secondary" className="text-sm">
                INSTRUCTOR
              </Badge>
              <h2 className="text-3xl font-bold">{instructor.name}</h2>
              <p className="text-xl text-primary">{instructor.title}</p>
            </div>
          </FadeInUp>

          {/* Biography */}
          <FadeInUp delay={0.2}>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              {instructor.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </FadeInUp>
        </StaggerContainer>
      </div>
    </section>
  );
}
