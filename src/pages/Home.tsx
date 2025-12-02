import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnovationCard from "@/components/InnovationCard";
import EventCard from "@/components/EventCard";
import LoginModal from "@/components/LoginModal";
import { innovations } from "@/data/innovations";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Open login modal if redirected from protected route
  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginOpen(true);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  const featuredInnovations = innovations.slice(0, 6);
  const upcomingEvents = [
    { id: 1, title: "Innovation Area Magdeburg 2025" },
    { id: 2, title: "Innovation Area Erfurt 2025" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center px-4 md:px-6 py-12 md:py-20 mt-[72px]"
        style={{
          background: "linear-gradient(to bottom, hsl(200, 45%, 96%), hsl(0, 0%, 100%))",
        }}
      >
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-12 text-foreground">
            Shaping the Future of Digital Education in Germany
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12">
            As an independent think tank, we connect policy vision with innovative solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-8 py-4 rounded-lg hover:opacity-90 hover:scale-105 transition-all">
              <Link to="/policy">Explore Our Vision</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/apply/select-event");
                } else {
                  setIsLoginOpen(true);
                }
              }}
              className="px-8 py-4 rounded-lg hover:bg-primary/10 hover:scale-105 transition-all"
            >
              Join the Innovation Area
            </Button>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground animate-fade-in">
            Our Three Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow animate-fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">📄</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Policy & Vision</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                We develop strategic papers and frameworks that guide Germany's education system into the future
              </p>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link to="/policy">Read Our Position Papers</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow animate-fade-in animate-delay-100">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Curated Connections</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                We bring together education innovators and policy-makers in moderated, curated settings - creating meaningful dialogue beyond transactions
              </p>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link to="/events">See Our Events</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow animate-fade-in animate-delay-200">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">💻</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">The Digital Hub</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                We provide the digital space where all stakeholders can register, stay informed, and discover education innovations
              </p>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link to="/innovations">Explore Innovations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadshow Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground animate-fade-in">
            Bring the Innovation Area to Your Event
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 animate-fade-in animate-delay-100">
            Host a curated showcase of education innovations at your conference or municipality
          </p>
          <Button 
            size="lg" 
            asChild 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg hover:scale-105 transition-all animate-fade-in animate-delay-200"
          >
            <Link to="/roadshow">Request a Roadshow</Link>
          </Button>
        </div>
      </section>

      {/* About ZDB */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground animate-fade-in">
            What is ZDB?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground animate-fade-in">
            ZDB is an independent, non-profit think tank actively shaping the future of digital education in Germany. Through policy development, curated events, and our digital platform, we create the space where vision meets innovation.
          </p>
        </div>
      </section>

      {/* Featured Innovations */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground animate-fade-in">
            Featured Innovations
          </h2>
          {featuredInnovations.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredInnovations.map((innovation, index) => (
                  <div 
                    key={innovation.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <InnovationCard
                      name={innovation.name}
                      description={innovation.description}
                      categories={innovation.categories}
                      event={innovation.event}
                      onClick={() => navigate(`/innovations/${innovation.id}`)}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-8 md:mt-12">
                <Button asChild size="lg" variant="outline" className="hover:scale-105 transition-transform">
                  <Link to="/innovations">View All Innovations</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Featured innovations coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground animate-fade-in">
            Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="animate-fade-in">
                  <EventCard
                    name="Innovation Area Magdeburg 2025"
                    date="March 15-17, 2025"
                    location="Magdeburg, Germany"
                    description="Join us at didacta 2025 to explore the latest educational innovations and connect with leading startups."
                  />
                </div>
                <div className="animate-fade-in animate-delay-100">
                  <EventCard
                    name="Innovation Area Erfurt 2025"
                    date="June 8-10, 2025"
                    location="Erfurt, Germany"
                    description="Discover digital solutions at the Education Innovation Summit."
                  />
                </div>
              </div>
              <div className="text-center mt-8 md:mt-12">
                <Button asChild size="lg" variant="outline" className="hover:scale-105 transition-transform">
                  <Link to="/events">View All Events</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No upcoming events scheduled</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <LoginModal 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        redirectPath="/apply/select-event"
      />
    </div>
  );
};

export default Home;
