"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeInUp } from "@/components/animations/FadeInUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  initials: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  description = "Hear from healthcare professionals and organizations who trust our AI solutions",
}: TestimonialsProps) {
  return (
    <section className="py-16">
      <FadeInUp className="text-center space-y-6 mb-12">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">{description}</p>
      </FadeInUp>

      <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <StaggerItem key={index}>
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <blockquote className="text-sm italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.organization}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
