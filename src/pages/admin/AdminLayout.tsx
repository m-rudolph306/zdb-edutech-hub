import { Outlet, NavLink, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Lightbulb,
  Calendar,
  Truck,
  ChevronRight,
} from "lucide-react";

const AdminLayout = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: t("admin.nav.dashboard"), exact: true },
    { path: "/admin/users", icon: Users, label: t("admin.nav.users") },
    { path: "/admin/applications", icon: FileText, label: t("admin.nav.applications") },
    { path: "/admin/innovations", icon: Lightbulb, label: t("admin.nav.innovations") },
    { path: "/admin/events", icon: Calendar, label: t("admin.nav.events") },
    { path: "/admin/roadshow", icon: Truck, label: t("admin.nav.roadshow") },
  ];

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/admin") return t("admin.nav.dashboard");
    const item = navItems.find((item) => item.path === path);
    return item?.label || "";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="pt-[72px] flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-72px)] bg-background border-r hidden md:block">
          <div className="p-4">
            <h2 className="text-lg font-bold text-primary mb-4">{t("admin.title")}</h2>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span>{t("admin.title")}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{getBreadcrumb()}</span>
          </div>

          {/* Page Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
