import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FocusEvent, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, User, FileText, Settings, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  const menuRef = useRef<HTMLElement | null>(null);
  const [viewportLeft, setViewportLeft] = useState<number | null>(null);

  const handleDesktopTriggerEnter = useCallback(
    (e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
      const root = menuRef.current;
      if (!root) return;

      const rootRect = root.getBoundingClientRect();
      const triggerRect = e.currentTarget.getBoundingClientRect();
      const center = triggerRect.left + triggerRect.width / 2 - rootRect.left;

      setViewportLeft(center);
    },
    [],
  );

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

  const topBarLinks = [
    { label: t("nav.topbar.press"), href: "/press" },
    { label: t("nav.topbar.statutes"), href: "/statutes" },
    { label: t("nav.topbar.donate"), href: "/donate" },
    { label: t("nav.topbar.contact"), href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-muted/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6 h-9 flex items-center justify-end gap-1">
          {topBarLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1",
                index < topBarLinks.length - 1 && "border-r border-border/50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-md" : "bg-background/95 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs md:text-sm">
              ZDB
            </div>
            <span className="font-bold text-base md:text-xl text-foreground">Innovation Area</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu
              ref={menuRef as any}
              style={
                viewportLeft != null
                  ? ({
                      ["--navigation-menu-viewport-left" as any]: `${viewportLeft}px`,
                    } as CSSProperties)
                  : undefined
              }
            >
              <NavigationMenuList>
                {/* Policy */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onMouseEnter={handleDesktopTriggerEnter}
                    onFocus={handleDesktopTriggerEnter}
                    className="text-sm font-medium bg-transparent hover:bg-accent"
                  >
                    {t("nav.policy")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[220px] p-2 bg-background">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/policy"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{t("nav.policy.readPapers")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Events */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onMouseEnter={handleDesktopTriggerEnter}
                    onFocus={handleDesktopTriggerEnter}
                    className="text-sm font-medium bg-transparent hover:bg-accent"
                  >
                    {t("nav.events")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[220px] p-2 bg-background">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{t("nav.events.upcoming")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/roadshow"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{t("nav.roadshow.request")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/apply"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{t("nav.events.apply")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Digital Hub */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onMouseEnter={handleDesktopTriggerEnter}
                    onFocus={handleDesktopTriggerEnter}
                    className="text-sm font-medium bg-transparent hover:bg-accent"
                  >
                    {t("nav.digitalHub")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[220px] p-2 bg-background">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/innovations"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{t("nav.digitalHub.about")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/apply"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{t("nav.digitalHub.apply")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Section */}
            <div className="flex items-center gap-2 ml-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium px-3 py-2 rounded-md transition-colors hover:bg-accent
                      ${isActive("/dashboard") ? "text-primary bg-primary/10" : "text-foreground"}`}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-secondary text-secondary hover:bg-secondary/10 transition-colors"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {user?.companyName}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-background">
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        {t("nav.myDashboard")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        <FileText className="mr-2 h-4 w-4" />
                        {t("nav.myApplications")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <Settings className="mr-2 h-4 w-4" />
                        {t("nav.profileSettings")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("nav.logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                >
                  {t("nav.login")}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in max-h-[calc(100vh-73px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {/* Top bar links for mobile */}
              <div className="flex flex-wrap gap-2 pb-3 border-b border-border mb-2">
                {topBarLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground px-2 py-1"
                  >
                    {link.label}
                  </Link>
                ))}
                <LanguageToggle />
              </div>

              {/* Policy */}
              <div className="space-y-1">
                <div className="text-sm font-semibold text-foreground px-3 py-2">{t("nav.policy")}</div>
                <Link
                  to="/policy"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-6 py-2"
                >
                  {t("nav.policy.readPapers")}
                </Link>
              </div>

              {/* Events */}
              <div className="space-y-1">
                <div className="text-sm font-semibold text-foreground px-3 py-2">{t("nav.events")}</div>
                <Link
                  to="/events"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-6 py-2"
                >
                  {t("nav.events.upcoming")}
                </Link>
                <Link
                  to="/roadshow"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-6 py-2"
                >
                  {t("nav.roadshow.request")}
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-6 py-2"
                >
                  {t("nav.events.apply")}
                </Link>
              </div>

              {/* Digital Hub */}
              <div className="space-y-1">
                <div className="text-sm font-semibold text-foreground px-3 py-2">{t("nav.digitalHub")}</div>
                <Link
                  to="/innovations"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-6 py-2"
                >
                  {t("nav.digitalHub.about")}
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground px-6 py-2"
                >
                  {t("nav.digitalHub.apply")}
                </Link>
              </div>


              {/* Auth Section */}
              <div className="border-t border-border pt-4 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                      {user?.companyName}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center text-sm font-medium py-2 px-3 rounded-md transition-colors text-foreground hover:bg-accent"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t("nav.myDashboard")}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center text-sm font-medium py-2 px-3 rounded-md transition-colors text-foreground hover:bg-accent"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {t("nav.profileSettings")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-sm font-medium py-2 px-3 rounded-md transition-colors text-foreground hover:bg-accent w-full text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("nav.logout")}
                    </button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="w-full"
                  >
                    {t("nav.login")}
                  </Button>
                )}
              </div>
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
