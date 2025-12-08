import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Users, Monitor } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
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
        className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center px-4 md:px-6 py-12 md:py-20 mt-[100px]"
        style={{
          background: "linear-gradient(to bottom, hsl(200, 45%, 96%), hsl(0, 0%, 100%))",
        }}
      >
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-12 text-foreground">
            {t("home.hero.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-8 py-4 rounded-lg hover:opacity-90 hover:scale-105 transition-all">
              <Link to="/policy">{t("home.hero.exploreVision")}</Link>
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
              {t("home.hero.joinInnovation")}
            </Button>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground animate-fade-in">
            {t("home.pillars.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow animate-fade-in">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">{t("home.pillars.policy.title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                {t("home.pillars.policy.description")}
              </p>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link to="/policy">{t("home.pillars.policy.button")}</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow animate-fade-in animate-delay-100">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">{t("home.pillars.connections.title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                {t("home.pillars.connections.description")}
              </p>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link to="/events">{t("home.pillars.connections.button")}</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow animate-fade-in animate-delay-200">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">{t("home.pillars.hub.title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                {t("home.pillars.hub.description")}
              </p>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link to="/innovations">{t("home.pillars.hub.button")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadshow Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[hsl(200,70%,95%)]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg md:text-xl font-semibold text-primary mb-4 animate-fade-in">
            {t("home.roadshow.valueProposition")}
          </p>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block animate-fade-in">
            {t("home.roadshow.label")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground animate-fade-in">
            {t("home.roadshow.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 animate-fade-in animate-delay-100">
            {t("home.roadshow.description")}
          </p>
          
          <ul className="space-y-3 mb-8 animate-fade-in animate-delay-100 text-left max-w-md mx-auto">
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1">✓</span>
              <span className="text-muted-foreground">{t("home.roadshow.benefit1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1">✓</span>
              <span className="text-muted-foreground">{t("home.roadshow.benefit2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-1">✓</span>
              <span className="text-muted-foreground">{t("home.roadshow.benefit3")}</span>
            </li>
          </ul>
          
          <Button 
            size="lg" 
            asChild 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg hover:scale-105 transition-all animate-fade-in animate-delay-200"
          >
            <Link to="/roadshow">{t("home.roadshow.button")}</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground animate-fade-in">
            {t("home.cta.title")}
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-8 animate-fade-in">
            {t("home.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="px-8 py-4 rounded-lg hover:scale-105 transition-all"
            >
              <Link to="/events">{t("home.cta.viewEvents")}</Link>
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="px-8 py-4 rounded-lg hover:scale-105 transition-all"
            >
              <Link to="/innovations">{t("home.cta.browseInnovations")}</Link>
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="px-8 py-4 rounded-lg hover:scale-105 transition-all"
            >
              <Link to="/apply">{t("home.cta.howToApply")}</Link>
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
