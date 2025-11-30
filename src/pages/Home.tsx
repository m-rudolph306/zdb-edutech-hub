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
            Discover Digital Innovations in Education
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12">
            Explore cutting-edge solutions transforming learning experiences across Germany and beyond
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-8 py-4 rounded-lg hover:opacity-90 hover:scale-105 transition-all">
              <Link to="/innovations">Browse Innovations</Link>
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
              Apply as Startup
            </Button>
          </div>
        </div>
      </section>

      {/* Innovation Area Explanation */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground animate-fade-in">
            What is the Innovation Area?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">For Decision Makers</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Discover proven solutions that address real educational challenges and see innovations in action
              </p>
            </div>
            <div className="text-center animate-fade-in animate-delay-100">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍🏫</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">For Educators</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Explore tools that can enhance your teaching and engage directly with innovators
              </p>
            </div>
            <div className="text-center animate-fade-in animate-delay-200">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">For Innovators</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Present your solutions to key stakeholders and connect with potential partners
              </p>
            </div>
          </div>
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
