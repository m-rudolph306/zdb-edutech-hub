import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Users, Monitor } from "lucide-react";

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
            As an independent think tank, we bring policy vision and innovative solutions together through curated dialogue
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
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
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
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
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
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-primary" />
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
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[hsl(200,70%,95%)]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column - 60% */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block animate-fade-in">
                Innovation Area On Demand
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground animate-fade-in">
                Bring the Innovation Area to Your Event
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 animate-fade-in animate-delay-100">
                Cities, municipalities, and conferences can book our curated innovation showcase as a complete package
              </p>
              
              <ul className="space-y-3 mb-8 animate-fade-in animate-delay-100">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span className="text-muted-foreground">Curated selection of 5-6 education innovators</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span className="text-muted-foreground">Professional setup and moderation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">✓</span>
                  <span className="text-muted-foreground">Customized to your focus areas</span>
                </li>
              </ul>
              
              <Button 
                size="lg" 
                asChild 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg hover:scale-105 transition-all animate-fade-in animate-delay-200"
              >
                <Link to="/roadshow">Request a Roadshow</Link>
              </Button>
            </div>
            
            {/* Right Column - 40% with visual flow */}
            <div className="lg:col-span-2 order-1 lg:order-2 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-border/50">
                <div className="flex flex-col items-center gap-4">
                  {/* Visual Flow: City → ZDB → Innovation → Event */}
                  <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl md:text-3xl">🏛️</span>
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground font-medium">Your Event</span>
                    </div>
                    
                    <div className="text-primary text-xl md:text-2xl">→</div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">ZDB</span>
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground font-medium">We Curate</span>
                    </div>
                    
                    <div className="text-primary text-xl md:text-2xl">→</div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl md:text-3xl">💡</span>
                      </div>
                      <span className="text-xs mt-2 text-muted-foreground font-medium">Innovators</span>
                    </div>
                  </div>
                  
                  <div className="text-primary text-2xl mt-2">↓</div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center border-2 border-secondary/30">
                      <span className="text-3xl md:text-4xl">🎯</span>
                    </div>
                    <span className="text-sm mt-3 text-foreground font-semibold">Innovation Showcase</span>
                    <span className="text-xs text-muted-foreground">at Your Event</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground animate-fade-in">
            Ready to Explore?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-8 animate-fade-in">
            Discover our events, browse innovations, or learn how to become part of the Innovation Area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="px-8 py-4 rounded-lg hover:scale-105 transition-all"
            >
              <Link to="/events">View Events</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="px-8 py-4 rounded-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all"
            >
              <Link to="/innovations">Browse Innovations</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="px-8 py-4 rounded-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all"
            >
              <Link to="/apply">How to Apply</Link>
            </Button>
          </div>
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
