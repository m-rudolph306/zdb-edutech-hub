import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnovationCard from "@/components/InnovationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Mail, Calendar } from "lucide-react";
import { innovations } from "@/data/innovations";

const InnovationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const innovation = innovations.find((item) => item.id === Number(id));

  if (!innovation) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-72px)] mt-[72px]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Innovation Not Found</h1>
            <Button onClick={() => navigate("/innovations")}>Back to Innovations</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedInnovations = innovations
    .filter((item) => item.id !== innovation.id && item.categories.some(cat => innovation.categories.includes(cat)))
    .slice(0, 3);

  const categoryColors: Record<string, string> = {
    AI: "bg-badge-ai text-white",
    VR: "bg-badge-vr text-white",
    Assessment: "bg-badge-assessment text-white",
    Management: "bg-badge-management text-white",
    "Content Creation": "bg-badge-content text-white",
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-12 md:py-16 px-4 md:px-6 mt-[72px]">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/innovations"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6 md:mb-8 animate-fade-in"
          >
            ← Back to Innovations
          </Link>

          {/* Innovation Header */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Logo */}
            <div className="flex items-center justify-center animate-fade-in bg-muted rounded-lg p-12">
              <span className="text-6xl font-bold text-muted-foreground">{innovation.name.charAt(0)}</span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center animate-fade-in animate-delay-100">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{innovation.name}</h1>
              
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {innovation.categories.map((cat, idx) => (
                  <Badge key={idx} className={categoryColors[cat] || "bg-muted"}>
                    {cat}
                  </Badge>
                ))}
                <Badge variant="outline">{innovation.technology}</Badge>
                <Badge variant="outline">{innovation.region}</Badge>
              </div>

              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Transforming education through innovative technology solutions
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2 hover:scale-105 transition-transform">
                  <ExternalLink size={18} />
                  Visit Website
                </Button>
                <Button size="lg" variant="outline" className="gap-2 hover:scale-105 transition-transform">
                  <Mail size={18} />
                  Contact Company
                </Button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Description */}
            <div className="md:col-span-2 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">About {innovation.name}</h2>
              <div className="prose prose-base md:prose-lg max-w-none text-muted-foreground space-y-4">
                <p>{innovation.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* Key Information Box */}
            <Card className="animate-fade-in animate-delay-100">
              <CardHeader>
                <CardTitle className="text-xl">Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Category</p>
                  <p className="text-foreground">{innovation.categories.join(", ")}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Technology Type</p>
                  <p className="text-foreground">{innovation.technology}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Region</p>
                  <p className="text-foreground">{innovation.region}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Target Audience</p>
                  <p className="text-foreground">K-12 Schools, Teachers</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Founded</p>
                  <p className="text-foreground">2020</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* The Solution Section */}
          <div className="mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">The Solution</h2>
            <div className="bg-muted/30 rounded-lg p-6 md:p-8">
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Our solution addresses the challenge of engaging students in remote learning environments by providing interactive, 
                AI-powered tools that adapt to each student's learning pace and style.
              </p>
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-foreground">Key Features:</h3>
              <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Personalized learning paths powered by AI algorithms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Real-time collaboration tools for group projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Comprehensive analytics dashboard for teachers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Integration with existing Learning Management Systems</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Event Participation */}
          <div className="mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">Innovation Area Participation</h2>
            <div className="space-y-4 md:space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">{innovation.event}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">March 15-17, 2025 • Magdeburg, Germany</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Innovations */}
          <div className="mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">Similar Innovations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedInnovations.map((related, index) => (
                <div 
                  key={related.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <InnovationCard
                    name={related.name}
                    description={related.description}
                    categories={related.categories}
                    event={related.event}
                    onClick={() => navigate(`/innovations/${related.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20 animate-fade-in">
            <CardContent className="p-6 md:p-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Interested in this innovation?</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Discover how {innovation.name} can help transform your educational environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="hover:scale-105 transition-transform">Contact via Innovation Area</Button>
                <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform">
                  <Link to="/innovations">View All Innovations</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovationDetail;
