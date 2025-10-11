import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { generatePageMetadata, generateProjectStructuredData } from "@/lib/seo";

// Animation Components
import {
  FadeInUp,
  StaggerContainer,
  FloatingCard,
  AnimatedCounter,
} from "@/components/animations";

// Components
import { Hero } from "@/components/Hero";
import { CallToAction } from "@/components/CallToAction";

export const metadata = generatePageMetadata("projects");

export default function ProjectsPage() {
  const projectStructuredData = generateProjectStructuredData();

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
      />
      {/* Hero Section */}
      <Hero
        badgeText="AI Innovation Projects • Healthcare & Society"
        title="Solutions for Healthcare, Space Medicine & Wellness"
        description="Discover our groundbreaking AI projects: METATRON's interconnected healthcare data infrastructure, SPACE MEDICINE tools for extreme environments, and ISEKAI's gamified wellness platform. Real-world examples of responsible AI serving humanity."
      />

      {/* METATRON Project */}
      <section id="metatron" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
                  <div className="space-y-6">
                    <Badge
                      variant="outline"
                      className="bg-white/80 dark:bg-gray-800/80"
                    >
                      Data Infrastructure
                    </Badge>
                    <div>
                      <h2 className="text-3xl font-bold mb-4">METATRON</h2>
                      <p className="text-lg text-muted-foreground">
                        An interconnected data and machine learning
                        master-infrastructure, increasing the capabilities of
                        machine learning models using graph networks. By
                        connecting data from multiple sources and integrating
                        synthetic data, gives rise to models with more informed
                        outputs, while guaranteeing patients&apos; privacy.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Architecture Focus</div>
                        <div className="text-muted-foreground">
                          Multi-source Integration
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Privacy Approach</div>
                        <div className="text-muted-foreground">
                          Privacy-First Design
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Key Features</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Graph Network Research</span>
                          <span>Ongoing</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Privacy Framework Development</span>
                          <span>Active</span>
                        </div>
                        <Progress value={80} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Ethical AI Integration</span>
                          <span>Core Focus</span>
                        </div>
                        <Progress value={90} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Research Areas</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Graph-based data relationship modeling</li>
                        <li>• Distributed learning methodologies</li>
                        <li>• Privacy-preserving data techniques</li>
                        <li>• Ethical AI framework development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeInUp>
        </div>
      </section>

      {/* Space Medicine Project */}
      <section
        id="space-medicine"
        className="container mx-auto px-4 py-16 bg-muted/50"
      >
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={0.2}>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      Mission Objectives
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Remote Monitoring Research</span>
                          <span>Exploring</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AI Diagnostic Framework</span>
                          <span>Developing</span>
                        </div>
                        <Progress value={45} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Ethical Guidelines</span>
                          <span>Priority Focus</span>
                        </div>
                        <Progress value={85} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Research Areas</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Remote physiological monitoring systems</li>
                        <li>• AI-assisted diagnostic tools for isolation</li>
                        <li>• Telemedicine infrastructure design</li>
                        <li>• Mental health support technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900">
                  <div className="space-y-6">
                    <Badge
                      variant="outline"
                      className="bg-white/80 dark:bg-gray-800/80"
                    >
                      Space Medicine
                    </Badge>
                    <div>
                      <h2 className="text-3xl font-bold mb-4">
                        SPACE MEDICINE
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        This project aims to provide tools to aid healthcare
                        research and development of procedures to face the
                        specific challenges of microgravity settings. Developing
                        AI solutions for extreme environments and isolated
                        conditions.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Research Focus</div>
                        <div className="text-muted-foreground">
                          Remote Healthcare AI
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Application Scope</div>
                        <div className="text-muted-foreground">
                          Extreme Environments
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeInUp>
        </div>
      </section>

      {/* ISEKAI Project */}
      <section id="isekai" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={0.4}>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
                  <div className="space-y-6">
                    <Badge
                      variant="outline"
                      className="bg-white/80 dark:bg-gray-800/80"
                    >
                      Gamified Wellness
                    </Badge>
                    <div>
                      <h2 className="text-3xl font-bold mb-4">ISEKAI</h2>
                      <p className="text-lg text-muted-foreground">
                        Gamify your physical activity! Set your personalized
                        activity goals and boost your motivation to exercise by
                        seeing them integrated as real-world quests with
                        engaging gameplay and great in-game rewards. Train for
                        battle, explore your surroundings, get the loot!
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Development Stage</div>
                        <div className="text-muted-foreground">
                          Prototype Phase
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Focus Area</div>
                        <div className="text-muted-foreground">Wellness AI</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Game Features</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AI Personalization Research</span>
                          <span>Active</span>
                        </div>
                        <Progress value={70} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Gamification Framework</span>
                          <span>Developing</span>
                        </div>
                        <Progress value={55} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Ethical Design Principles</span>
                          <span>Core Focus</span>
                        </div>
                        <Progress value={90} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Research Concepts</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• AI-driven personalization algorithms</li>
                        <li>• Behavioral psychology integration</li>
                        <li>• Responsible gamification design</li>
                        <li>• Privacy-preserving wellness tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeInUp>
        </div>
      </section>

      {/* Project Impact */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <FadeInUp>
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-3xl font-bold">Research Foundation</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Building responsible AI solutions through dedicated research
                  and ethical development
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-3">
              <FloatingCard delay={0.1}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      <AnimatedCounter value={15} suffix="+" />
                    </div>
                    <CardTitle className="text-lg">
                      Years of AI Research
                    </CardTitle>
                    <CardDescription>
                      Dedicated to responsible AI development
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter value={3} />
                    </div>
                    <CardTitle className="text-lg">
                      Core Research Areas
                    </CardTitle>
                    <CardDescription>
                      Healthcare, Education, and Society
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      <AnimatedCounter value={100} suffix="%" />
                    </div>
                    <CardTitle className="text-lg">Ethical Focus</CardTitle>
                    <CardDescription>
                      Committed to responsible AI practices
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FloatingCard>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold">Technology Foundation</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Cutting-edge technologies powering our innovative solutions
              </p>
            </div>
          </FadeInUp>

          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai">AI & ML</TabsTrigger>
              <TabsTrigger value="data">Data Science</TabsTrigger>
              <TabsTrigger value="cloud">Cloud & Infrastructure</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="mt-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Neural Networks</div>
                  <div className="text-sm text-muted-foreground">
                    Deep learning architectures
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Graph ML</div>
                  <div className="text-sm text-muted-foreground">
                    Network-based learning
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">
                    Federated Learning
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Distributed AI training
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">
                    Big Data Analytics
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Large-scale processing
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">
                    Real-time Processing
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Stream analytics
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Synthetic Data</div>
                  <div className="text-sm text-muted-foreground">
                    Privacy-preserving datasets
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cloud" className="mt-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Kubernetes</div>
                  <div className="text-sm text-muted-foreground">
                    Container orchestration
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Multi-cloud</div>
                  <div className="text-sm text-muted-foreground">
                    Hybrid deployments
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Edge Computing</div>
                  <div className="text-sm text-muted-foreground">
                    Distributed processing
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Zero Trust</div>
                  <div className="text-sm text-muted-foreground">
                    Security architecture
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Encryption</div>
                  <div className="text-sm text-muted-foreground">
                    End-to-end protection
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-lg font-semibold">Privacy Tech</div>
                  <div className="text-sm text-muted-foreground">
                    Differential privacy
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="Ready to Innovate with Us?"
        description="Join us in creating the next generation of AI solutions that transform industries and improve lives worldwide."
        primaryButton={{
          text: "Start a Project",
          href: "/contact",
          variant: "default",
        }}
        secondaryButton={{
          text: "Explore Services",
          href: "/services",
          variant: "outline",
        }}
      />
    </div>
  );
}
