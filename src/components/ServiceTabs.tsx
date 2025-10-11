// Animation Components
import { FadeInUp } from "@/components/animations/FadeInUp";
import { ServiceTabsInteractive } from "./ServiceTabsInteractive";

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
    <section role="region" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeInUp className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            {description}
          </p>
        </FadeInUp>

        <ServiceTabsInteractive tabs={tabs} defaultTab={defaultTab} />
      </div>
    </section>
  );
}
