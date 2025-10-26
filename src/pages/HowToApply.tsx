import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const HowToApply = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Apply</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the ZDB Innovation Area and showcase your EdTech solution
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">About the Application Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The ZDB Innovation Area is seeking innovative EdTech companies and
                startups that are transforming digital education in Germany. We carefully
                curate solutions that demonstrate real impact, scalability, and alignment
                with educational goals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Selected companies will gain visibility among decision-makers, educators,
                and policy-makers across Germany, with opportunities to present at
                exclusive events and connect with potential partners.
              </p>
            </div>

            {/* Eligibility Criteria */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Eligibility Criteria</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      Educational Technology Focus
                    </h3>
                    <p className="text-muted-foreground">
                      Your solution must directly address challenges in teaching,
                      learning, or educational administration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Proven Track Record</h3>
                    <p className="text-muted-foreground">
                      Demonstrate successful implementation in at least one educational
                      institution or pilot program.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Innovation & Impact</h3>
                    <p className="text-muted-foreground">
                      Show how your solution provides unique value and measurable
                      improvements to educational outcomes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Scalability</h3>
                    <p className="text-muted-foreground">
                      Your technology should be scalable to multiple institutions and
                      adaptable to different educational contexts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Steps */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Application Steps</h2>
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-semibold">Submit Initial Application</h3>
                  </div>
                  <p className="text-muted-foreground ml-14">
                    Complete our online application form with details about your company,
                    solution, and impact metrics.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">Review Process</h3>
                  </div>
                  <p className="text-muted-foreground ml-14">
                    Our selection committee evaluates applications based on innovation,
                    impact, and alignment with our mission.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">Interview & Demo</h3>
                  </div>
                  <p className="text-muted-foreground ml-14">
                    Selected applicants will be invited to present their solution and
                    discuss their vision with our team.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">Onboarding</h3>
                  </div>
                  <p className="text-muted-foreground ml-14">
                    Approved companies join the Innovation Area with profile creation,
                    event participation, and networking opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-muted p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Applications are reviewed on a rolling basis. Start your application
                today and join Germany's leading EdTech showcase platform.
              </p>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Start Your Application
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowToApply;
