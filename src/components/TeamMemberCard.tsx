import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FadeInUp } from "@/components/animations";
import type { TeamMember } from "@/lib/content/about-page-data";

interface TeamMemberCardProps {
  member: TeamMember;
  delay?: number;
}

export function TeamMemberCard({ member, delay = 0 }: TeamMemberCardProps) {
  return (
    <FadeInUp delay={delay}>
      <Card>
        <CardContent className="p-8 space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.title}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <p className="text-primary font-semibold">{member.title}</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Key Experience */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Key Experience</h4>
            {member.keyExperience.map((experience, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm font-medium italic">{experience.title}</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {experience.points.map((point, pointIndex) => (
                    <li key={pointIndex}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Useful Links</h4>
            <div className="flex flex-wrap gap-2">
              {member.links.map((link, index) => (
                <Button key={index} variant="outline" size="sm" asChild>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeInUp>
  );
}
