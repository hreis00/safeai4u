"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Animation Components
import { FadeInUp } from "@/components/animations/FadeInUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { FloatingCard } from "@/components/animations/InteractiveElements";
import { AnimatedProgress } from "@/components/animations/AnimatedProgress";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

interface ServiceTabCard {
  icon: string;
  title: string;
  description: string;
  content: string;
  progress: {
    label: string;
    value: number;
  };
  badges: string[];
}

interface ServiceTab {
  value: string;
  label: string;
  cards: ServiceTabCard[];
}

interface ServiceTabsProps {
  title: string;
  description: string;
  tabs: ServiceTab[];
  defaultTab?: string;
}

export function ServiceTabs({
  title,
  description,
  tabs,
  defaultTab,
}: ServiceTabsProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeInUp className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        </FadeInUp>

        <Tabs defaultValue={defaultTab || tabs[0]?.value} className="w-full">
          <FadeInUp delay={0.2}>
            <TabsList className="grid w-full grid-cols-3">
              {tabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </FadeInUp>

          {tabs.map(tab => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="space-y-6 mt-8"
            >
              <StaggerContainer className="grid gap-8 md:grid-cols-2">
                {tab.cards.map((card, cardIndex) => (
                  <StaggerItem key={cardIndex}>
                    <FloatingCard>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <span>{card.icon}</span>
                            {card.title}
                          </CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {card.content}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{card.progress.label}</span>
                              <span>
                                <AnimatedCounter
                                  value={card.progress.value}
                                  suffix="%"
                                />
                              </span>
                            </div>
                            <AnimatedProgress
                              value={card.progress.value}
                              className="w-full"
                              delay={cardIndex * 0.2}
                            />
                          </div>
                          {card.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {card.badges.map((badge, badgeIndex) => (
                                <Badge key={badgeIndex} variant="outline">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </FloatingCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
