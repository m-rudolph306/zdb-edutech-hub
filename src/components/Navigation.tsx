import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, FileText, Settings, LogOut, LayoutDashboard } from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-md" : "bg-background/95 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs md:text-sm">
              ZDB
            </div>
            <span className="font-bold text-base md:text-xl text-foreground">Innovation Area</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/innovations"
              className={`text-sm font-medium transition-all duration-300 relative
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right 
                after:transition-transform after:duration-300 hover:after:scale-x-100 
                hover:after:origin-bottom-left
                ${isActive("/innovations") ? "text-primary after:scale-x-100" : "text-foreground"}`}
            >
              Innovations
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-all duration-300 relative
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right 
                after:transition-transform after:duration-300 hover:after:scale-x-100 
                hover:after:origin-bottom-left
                ${isActive("/events") ? "text-primary after:scale-x-100" : "text-foreground"}`}
            >
              Events
            </Link>
            <Link
              to="/apply"
              className={`text-sm font-medium transition-all duration-300 relative
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right 
                after:transition-transform after:duration-300 hover:after:scale-x-100 
                hover:after:origin-bottom-left
                ${isActive("/apply") ? "text-primary after:scale-x-100" : "text-foreground"}`}
            >
              How to Apply
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-all duration-300 relative
                    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                    after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right 
                    after:transition-transform after:duration-300 hover:after:scale-x-100 
                    hover:after:origin-bottom-left
                    ${isActive("/dashboard") ? "text-primary after:scale-x-100" : "text-foreground"}`}
                >
                  Dashboard
                </Link>

                {/* User Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-secondary text-secondary hover:bg-secondary/10 transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user?.companyName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background">
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      My Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <FileText className="mr-2 h-4 w-4" />
                      My Applications
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="border-secondary text-secondary hover:bg-secondary/10 transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/innovations"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 px-4 rounded-md transition-colors
                  ${isActive("/innovations") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`}
              >
                Innovations
              </Link>
              <Link
                to="/events"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 px-4 rounded-md transition-colors
                  ${isActive("/events") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`}
              >
                Events
              </Link>
              <Link
                to="/apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 px-4 rounded-md transition-colors
                  ${isActive("/apply") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`}
              >
                How to Apply
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium py-2 px-4 rounded-md transition-colors
                      ${isActive("/dashboard") ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`}
                  >
                    Dashboard
                  </Link>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                      {user?.companyName}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center text-sm font-medium py-2 px-4 rounded-md transition-colors text-foreground hover:bg-accent"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      My Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center text-sm font-medium py-2 px-4 rounded-md transition-colors text-foreground hover:bg-accent"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-sm font-medium py-2 px-4 rounded-md transition-colors text-foreground hover:bg-accent w-full text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="border-secondary text-secondary hover:bg-secondary/10 transition-colors w-full"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
};

export default Navigation;
