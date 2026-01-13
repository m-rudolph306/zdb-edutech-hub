import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Users,
  FileText,
  Lightbulb,
  Calendar,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

interface Stats {
  pendingUsers: number;
  approvedUsers: number;
  totalApplications: number;
  pendingInnovations: number;
  approvedInnovations: number;
  roadshowInquiries: number;
}

interface RecentActivity {
  id: string;
  type: "user" | "application" | "innovation" | "roadshow";
  action: string;
  item: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    pendingUsers: 0,
    approvedUsers: 0,
    totalApplications: 0,
    pendingInnovations: 0,
    approvedInnovations: 0,
    roadshowInquiries: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Load statistics from localStorage
    const signupRequests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
    const pendingUsers = signupRequests.filter((r: any) => r.status === "pending").length;
    const approvedUsers = signupRequests.filter((r: any) => r.status === "approved").length;

    let totalApplications = 0;
    let pendingInnovations = 0;
    let approvedInnovations = 0;
    let roadshowInquiries = 0;
    const activities: RecentActivity[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("application_IA-")) {
        totalApplications++;
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        activities.push({
          id: key,
          type: "application",
          action: t("admin.activity.newApplication"),
          item: data.innovationName || "Unknown",
          timestamp: data.submittedAt,
        });
      } else if (key?.startsWith("innovation_INV-")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        if (data.status === "pending") pendingInnovations++;
        if (data.status === "approved") approvedInnovations++;
        activities.push({
          id: key,
          type: "innovation",
          action: t("admin.activity.newInnovation"),
          item: data.name || "Unknown",
          timestamp: data.createdAt,
        });
      } else if (key?.startsWith("roadshow_RW-")) {
        roadshowInquiries++;
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        activities.push({
          id: key,
          type: "roadshow",
          action: t("admin.activity.newRoadshow"),
          item: data.eventName || "Unknown",
          timestamp: data.submittedAt,
        });
      }
    }

    // Add signup requests to activities
    signupRequests.forEach((req: any) => {
      activities.push({
        id: req.id,
        type: "user",
        action: req.status === "pending" ? t("admin.activity.newSignup") : t("admin.activity.userApproved"),
        item: req.companyName || req.email,
        timestamp: req.submittedAt,
      });
    });

    // Sort by timestamp and take latest 10
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setStats({
      pendingUsers,
      approvedUsers,
      totalApplications,
      pendingInnovations,
      approvedInnovations,
      roadshowInquiries,
    });
    setRecentActivity(activities.slice(0, 10));
  }, [t]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "application":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "innovation":
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
      case "roadshow":
        return <Truck className="h-4 w-4 text-purple-500" />;
    }
  };

  const statCards = [
    {
      title: t("admin.stats.pendingUsers"),
      value: stats.pendingUsers,
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      link: "/admin/users",
    },
    {
      title: t("admin.stats.approvedUsers"),
      value: stats.approvedUsers,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/admin/users",
    },
    {
      title: t("admin.stats.totalApplications"),
      value: stats.totalApplications,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      link: "/admin/applications",
    },
    {
      title: t("admin.stats.pendingInnovations"),
      value: stats.pendingInnovations,
      icon: Lightbulb,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      link: "/admin/innovations",
    },
    {
      title: t("admin.stats.roadshowInquiries"),
      value: stats.roadshowInquiries,
      icon: Truck,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/admin/roadshow",
    },
  ];

  const quickActions = [
    { label: t("admin.quickAction.reviewUsers"), link: "/admin/users", icon: Users },
    { label: t("admin.quickAction.reviewApplications"), link: "/admin/applications", icon: FileText },
    { label: t("admin.quickAction.reviewInnovations"), link: "/admin/innovations", icon: Lightbulb },
    { label: t("admin.quickAction.manageEvents"), link: "/admin/events", icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("admin.dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("admin.dashboard.subtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(stat.link)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={cn("p-3 rounded-full", stat.bgColor)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t("admin.quickActions")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="w-full justify-between"
                onClick={() => navigate(action.link)}
              >
                <span className="flex items-center gap-2">
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("admin.recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {t("admin.noActivity")}
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function (imported from lib/utils but declared here for clarity)
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default AdminDashboard;
