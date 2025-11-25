import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnovationCard from "@/components/InnovationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Mail, MapPin, Calendar } from "lucide-react";
import { innovations } from "@/data/innovations";

const InnovationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const innovation = innovations.find((item) => item.id === Number(id));

  if (!innovation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Innovation Not Found</h1>
            <Button onClick={() => navigate("/innovations")}>
              Back to Innovations
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate related innovations (same category, excluding current)
  const relatedInnovations = innovations
    .filter(
      (item) =>
        item.id !== innovation.id &&
        item.categories.some((cat) => innovation.categories.includes(cat))
    )
    .slice(0, 3);

  const categoryColors: Record<string, string> = {
    AI: "bg-badge-ai text-white",
    VR: "bg-badge-vr text-white",
    Assessment: "bg-badge-assessment text-white",
    Management: "bg-badge-management text-white",
    "Content Creation": "bg-badge-content text-white",
    Hardware: "bg-muted text-muted-foreground",
  };

  // Sample additional data
  const keyInfo = {
    targetAudience: innovation.technology === "Software" ? "K-12 Schools, Universities" : innovation.technology === "Hardware" ? "Schools, Training Centers" : "Educational Institutions",
    foundedYear: 2020 + (innovation.id % 4),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Back Button */}
        <section className="bg-muted py-4 border-b">
          <div className="container mx-auto px-4">
            <Link
              to="/innovations"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Innovations
            </Link>
          </div>
        </section>

        {/* Innovation Header */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Logo */}
              <div className="md:col-span-4">
                <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-6xl font-bold text-muted-foreground">
                    {innovation.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-8">
                <h1 className="text-4xl font-bold mb-4 text-foreground">
                  {innovation.name}
                </h1>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {innovation.categories.map((category, index) => (
                    <Badge
                      key={index}
                      className={`text-sm ${
                        categoryColors[category] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  {innovation.description.substring(0, 120)}...
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Company
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Description */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6">
                  About {innovation.name}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{innovation.description}</p>
                  <p>
                    Our mission is to transform education through innovative
                    technology solutions that empower educators and inspire
                    learners. We believe in creating accessible, engaging, and
                    effective learning experiences for all students.
                  </p>
                  <p>
                    With a focus on cutting-edge technology and pedagogical
                    excellence, we partner with schools and institutions to
                    deliver measurable improvements in learning outcomes and
                    student engagement.
                  </p>
                </div>
              </div>

              {/* Key Information Box */}
              <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-lg shadow-md border">
                  <h3 className="text-xl font-bold mb-4">Key Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Category
                      </p>
                      <p className="text-foreground">
                        {innovation.categories.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Technology Type
                      </p>
                      <p className="text-foreground">{innovation.technology}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Region
                      </p>
                      <p className="text-foreground">{innovation.region}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Target Audience
                      </p>
                      <p className="text-foreground">{keyInfo.targetAudience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Founded Year
                      </p>
                      <p className="text-foreground">{keyInfo.foundedYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">The Solution</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-muted-foreground mb-6">
                  {innovation.name} addresses critical challenges in modern
                  education by providing an innovative platform that combines
                  advanced technology with proven pedagogical methods.
                </p>
                <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Intuitive user interface designed for educators</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Real-time analytics and reporting</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Seamless integration with existing systems</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Scalable architecture for growing institutions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Comprehensive training and support</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
                <span className="text-muted-foreground">
                  Demo Screenshot Placeholder
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Event Participation */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              Innovation Area Participation
            </h2>
            <div className="bg-card p-6 rounded-lg shadow-md border">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {innovation.event}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {innovation.event.split(" ")[0]}, Germany
                    </p>
                    <p className="text-muted-foreground">
                      Showcased innovative solutions to education leaders and
                      decision-makers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Innovations */}
        {relatedInnovations.length > 0 && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Similar Innovations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedInnovations.map((item) => (
                  <InnovationCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    categories={item.categories}
                    event={item.event}
                    onClick={() => navigate(`/innovations/${item.id}`)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Box */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Interested in this innovation?
              </h2>
              <p className="text-muted-foreground mb-8">
                Connect with {innovation.name} through our Innovation Area
                platform
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Contact via Innovation Area
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/innovations")}
                >
                  View All Innovations
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InnovationDetail;
