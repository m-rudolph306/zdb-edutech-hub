import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "./LoginModal";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-primary">
                ZDB Innovation Area
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/innovations"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/innovations") ? "text-primary" : "text-foreground"
                }`}
              >
                Innovations
              </Link>
              <Link
                to="/events"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/events") ? "text-primary" : "text-foreground"
                }`}
              >
                Events
              </Link>
              <Link
                to="/how-to-apply"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/how-to-apply") ? "text-primary" : "text-foreground"
                }`}
              >
                How to Apply
              </Link>
            </div>

            {/* Login Button */}
            <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
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
