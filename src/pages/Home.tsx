import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, GraduationCap, Rocket } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnovationCard from "@/components/InnovationCard";
import EventCard from "@/components/EventCard";
import { innovations } from "@/data/innovations";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const featuredInnovations = innovations.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative min-h-[500px] flex items-center py-20 md:py-32"
          style={{
            background: "linear-gradient(to bottom, hsl(200, 45%, 96%), hsl(0, 0%, 100%))",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Discover the Future of Digital Education
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Explore curated innovations transforming education in Germany
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/innovations">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4 rounded-lg text-base hover:opacity-90 transition-opacity">
                  Browse Innovations
                </Button>
              </Link>
              <Link to="/how-to-apply">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 rounded-lg text-base hover:bg-primary/10 transition-colors">
                  Apply as Startup
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What is Innovation Area Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is Innovation Area?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The ZDB Innovation Area is a curated showcase of cutting-edge educational
                technology solutions from leading companies across Germany and beyond. We
                bring together innovators, educators, and decision-makers to accelerate
                the digital transformation of education.
              </p>
              <p>
                Our platform provides a centralized hub where stakeholders can discover
                vetted EdTech solutions, connect with innovators, and stay informed about
                the latest developments in digital education. Join us in shaping the
                future of learning.
              </p>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* For Decision-Makers */}
              <div className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Decision-Makers</h3>
                <p className="text-muted-foreground">
                  Discover vetted solutions for digital education challenges
                </p>
              </div>

              {/* For Educators */}
              <div className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">
                  <GraduationCap className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Educators</h3>
                <p className="text-muted-foreground">
                  Explore innovative tools transforming teaching and learning
                </p>
              </div>

              {/* For Innovators */}
              <div className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">
                  <Rocket className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Innovators</h3>
                <p className="text-muted-foreground">
                  Get noticed by policy-makers and education leaders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Innovations */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Featured Innovations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredInnovations.map((innovation) => (
                <InnovationCard
                  key={innovation.id}
                  name={innovation.name}
                  description={innovation.description}
                  categories={innovation.categories}
                  event={innovation.event}
                />
              ))}
            </div>

            <div className="text-center">
              <Link to="/innovations">
                <Button size="lg" variant="outline">
                  View All Innovations
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Upcoming Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <EventCard
                name="EdTech Innovation Summit"
                date="March 15, 2025"
                location="Magdeburg"
                description="Join leading educators and innovators to explore the latest trends in educational technology."
              />
              <EventCard
                name="Digital Learning Conference"
                date="April 22, 2025"
                location="Erfurt"
                description="A comprehensive conference focused on implementing digital solutions in educational institutions."
              />
            </div>

            <div className="text-center">
              <Link to="/events">
                <Button size="lg" variant="outline">
                  See All Events
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
