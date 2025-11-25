import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full bg-card border-b border-border transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZDB</span>
              </div>
              <h1 className="text-xl font-bold text-primary">
                Innovation Area
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/innovations"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                  isActive("/innovations") ? "text-primary after:w-full" : "text-foreground"
                }`}
              >
                Innovations
              </Link>
              <Link
                to="/events"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                  isActive("/events") ? "text-primary after:w-full" : "text-foreground"
                }`}
              >
                Events
              </Link>
              <Link
                to="/how-to-apply"
                className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                  isActive("/how-to-apply") ? "text-primary after:w-full" : "text-foreground"
                }`}
              >
                How to Apply
              </Link>
            </div>

            {/* Login Button */}
            <Button 
              variant="outline" 
              onClick={() => setIsLoginOpen(true)}
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
};

export default Navigation;
