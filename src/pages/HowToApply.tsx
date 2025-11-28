import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoginModal from "@/components/LoginModal";
import {
  CheckCircle2,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  Calendar,
  Network,
  Lightbulb,
  Shield,
  Zap,
  MessageSquare,
} from "lucide-react";

const HowToApply = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const selectionCriteria = [
    {
      icon: Target,
      title: "Educational Technology Focus",
      description:
        "Your solution must directly address challenges in teaching, learning, or educational administration with proven impact.",
    },
    {
      icon: Award,
      title: "Innovation & Uniqueness",
      description:
        "Demonstrate how your solution provides unique value and stands out from existing alternatives in the market.",
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description:
        "Show successful implementation in at least one educational institution or documented pilot program results.",
    },
    {
      icon: Users,
      title: "Scalability Potential",
      description:
        "Your technology should be scalable to multiple institutions and adaptable to different educational contexts.",
    },
    {
      icon: Globe,
      title: "German Market Relevance",
      description:
        "Alignment with German educational standards, data protection requirements, and cultural context.",
    },
  ];

  const applicationSteps = [
    {
      number: 1,
      title: "Submit Initial Application",
      description:
        "Complete our online application form with details about your company, solution, target audience, and impact metrics. Include case studies and testimonials if available.",
    },
    {
      number: 2,
      title: "Review Process (2-3 weeks)",
      description:
        "Our selection committee evaluates applications based on innovation, impact, scalability, and alignment with our mission. We review all submissions carefully.",
    },
    {
      number: 3,
      title: "Interview & Demo",
      description:
        "Selected applicants will be invited to present their solution via video call. Prepare a 15-minute demo showcasing key features and educational value.",
    },
    {
      number: 4,
      title: "Onboarding & Launch",
      description:
        "Approved companies join the Innovation Area with profile creation, marketing materials preparation, and coordination for upcoming event participation.",
    },
  ];

  const benefits = [
    {
      icon: Network,
      title: "Network Access",
      description:
        "Connect with educators, decision-makers, and policy-makers across Germany's educational institutions.",
    },
    {
      icon: Calendar,
      title: "Event Participation",
      description:
        "Showcase your innovation at exclusive Innovation Area events in major German cities throughout the year.",
    },
    {
      icon: Lightbulb,
      title: "Visibility & Exposure",
      description:
        "Featured placement on our platform with detailed company profile and solution showcase reaching thousands of educators.",
    },
    {
      icon: MessageSquare,
      title: "Direct Lead Generation",
      description:
        "Interested institutions can contact you directly through the platform, creating qualified sales opportunities.",
    },
    {
      icon: Shield,
      title: "Quality Seal",
      description:
        "Being part of Innovation Area signals quality and reliability to potential customers and partners.",
    },
    {
      icon: Zap,
      title: "Market Intelligence",
      description:
        "Gain insights into market trends, customer needs, and competitor landscape through our community.",
    },
  ];

  const handleStartApplication = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            Join Innovation Area
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Showcase your educational technology to Germany's leading institutions
            and decision-makers at premier Innovation Area events.
          </p>
          <Button
            size="lg"
            onClick={handleStartApplication}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 hover:scale-105 transition-transform animate-fade-in animate-delay-200"
          >
            Start Application
          </Button>
        </div>
      </section>

      {/* What is Innovation Area */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            What is Innovation Area?
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Innovation Area is Germany's premier platform connecting cutting-edge
              educational technology companies with schools, universities, and
              educational institutions. We curate a carefully selected showcase of
              innovative solutions that are transforming teaching, learning, and
              educational administration across the country.
            </p>
            <p className="text-lg">
              Through our exclusive events held in major German cities, we bring
              together innovators, educators, administrators, and policy-makers to
              explore the latest advances in EdTech. Each Innovation Area event
              features live demonstrations, networking opportunities, and direct
              access to decision-makers from educational institutions seeking to
              modernize their technology infrastructure.
            </p>
            <p className="text-lg">
              Our rigorous selection process ensures that only the most impactful,
              scalable, and innovative solutions are featured. By joining Innovation
              Area, your company gains unparalleled visibility in the German
              education market, access to qualified leads, and the credibility that
              comes with being recognized as a leader in educational technology.
            </p>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Selection Criteria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectionCriteria.map((criterion, index) => {
              const Icon = criterion.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-secondary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">
                          {criterion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Application Process
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {applicationSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <Card className="md:ml-16 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="absolute left-0 md:left-3 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg">
                          {step.number}
                        </div>
                        <div className="ml-16 md:ml-4">
                          <h3 className="text-xl font-bold mb-2 text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Benefits of Joining
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Transform Education?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Innovation Area today and connect with Germany's educational
            institutions. Applications are reviewed on a rolling basis.
          </p>
          <Button
            size="lg"
            onClick={handleStartApplication}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl px-12 py-8 hover:scale-105 transition-transform shadow-lg"
          >
            Start Your Application
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Questions? Contact us at{" "}
            <a
              href="mailto:apply@innovationarea.de"
              className="text-primary hover:underline"
            >
              apply@innovationarea.de
            </a>
          </p>
        </div>
      </section>

      <Footer />
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
};

export default HowToApply;
