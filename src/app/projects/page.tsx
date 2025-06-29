import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Featured Projects - SAFE AI [4U]",
  description:
    "Explore our innovative AI projects: METATRON, Space Medicine, and ISEKAI.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero
        badgeText="Innovation in Action"
        title="Featured Projects"
        description="Discover how our AI solutions are transforming industries and creating real-world impact across healthcare, space exploration, and digital wellness."
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
                        master-infrastructure that revolutionizes healthcare AI
                        capabilities.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Data Sources</div>
                        <div className="text-muted-foreground">
                          500+ Integrated
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Privacy Level</div>
                        <div className="text-muted-foreground">100% Secure</div>
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
                          <span>Graph Network Integration</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Synthetic Data Generation</span>
                          <span>88%</span>
                        </div>
                        <Progress value={88} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Privacy Preservation</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Technical Highlights</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Graph neural networks for data connectivity</li>
                        <li>• Federated learning architecture</li>
                        <li>• Advanced synthetic data algorithms</li>
                        <li>• Real-time privacy monitoring</li>
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
                          <span>Microgravity Adaptation</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Remote Diagnostics</span>
                          <span>87%</span>
                        </div>
                        <Progress value={87} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Emergency Response</span>
                          <span>96%</span>
                        </div>
                        <Progress value={96} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Research Applications</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Physiological monitoring in microgravity</li>
                        <li>• Automated medical intervention systems</li>
                        <li>• Radiation exposure assessment</li>
                        <li>• Psychological health support</li>
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
                        Pioneering healthcare solutions for the unique
                        challenges of microgravity environments and space
                        exploration.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Mission Support</div>
                        <div className="text-muted-foreground">
                          24/7 Monitoring
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Research Impact</div>
                        <div className="text-muted-foreground">
                          Global Scale
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
                        Transform your physical activity into an engaging RPG
                        adventure with personalized goals and real-world
                        rewards.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Active Users</div>
                        <div className="text-muted-foreground">10,000+</div>
                      </div>
                      <div>
                        <div className="font-medium">Engagement Rate</div>
                        <div className="text-muted-foreground">85% Daily</div>
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
                          <span>Motivation Boost</span>
                          <span>94%</span>
                        </div>
                        <Progress value={94} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Goal Achievement</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>User Retention</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-medium">Gaming Elements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Real-world quest mapping</li>
                        <li>• Personalized activity goals</li>
                        <li>• Achievement and reward systems</li>
                        <li>• Social challenges and competition</li>
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
                <h2 className="text-3xl font-bold">Project Impact</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Measuring the real-world impact of our innovative AI solutions
                </p>
              </div>
            </FadeInUp>

            <div className="grid gap-8 md:grid-cols-3">
              <FloatingCard delay={0.1}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      <AnimatedCounter value={500} suffix="+" />
                    </div>
                    <CardTitle className="text-lg">
                      Healthcare Institutions
                    </CardTitle>
                    <CardDescription>
                      Using METATRON infrastructure
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter value={15} />
                    </div>
                    <CardTitle className="text-lg">Space Missions</CardTitle>
                    <CardDescription>
                      Supported by our medical AI
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <Card className="text-center p-6">
                  <CardHeader>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      <AnimatedCounter value={2.5} suffix="M" />
                    </div>
                    <CardTitle className="text-lg">Steps Gamified</CardTitle>
                    <CardDescription>
                      Through ISEKAI platform daily
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
