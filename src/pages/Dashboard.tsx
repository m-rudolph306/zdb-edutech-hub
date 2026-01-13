import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Calendar, TrendingUp, User, ExternalLink, Lightbulb, Plus } from "lucide-react";

interface UserInnovation {
  id: string;
  name: string;
  description: string;
  categories: string[];
  region: string;
  technology: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Application {
  id: string;
  event: string;
  submittedAt: string;
  status: "submitted" | "under-review" | "selected" | "rejected";
  innovationName: string;
}

interface RoadshowInquiry {
  id: string;
  organizationName: string;
  eventName: string;
  eventDate: string;
  submittedAt: string;
  status: "new" | "in-discussion" | "confirmed" | "completed" | "declined";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isInnovator } = useAuth();
  const { t, language } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [roadshowInquiries, setRoadshowInquiries] = useState<RoadshowInquiry[]>([]);
  const [userInnovations, setUserInnovations] = useState<UserInnovation[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<RoadshowInquiry | null>(null);

  useEffect(() => {
    // Load all applications from localStorage
    const loadedApplications: Application[] = [];
    const loadedInquiries: RoadshowInquiry[] = [];
    const loadedInnovations: UserInnovation[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("application_IA-")) {
        const data = localStorage.getItem(key);
        if (data) {
          const appData = JSON.parse(data);
          loadedApplications.push({
            id: appData.id,
            event: appData.event,
            submittedAt: appData.submittedAt,
            status: "submitted",
            innovationName: appData.innovationName,
          });
        }
      } else if (key?.startsWith("roadshow_RW-")) {
        const data = localStorage.getItem(key);
        if (data) {
          const inquiryData = JSON.parse(data);
          loadedInquiries.push({
            id: inquiryData.id,
            organizationName: inquiryData.organizationName,
            eventName: inquiryData.eventName,
            eventDate: inquiryData.eventDate,
            submittedAt: inquiryData.submittedAt,
            status: inquiryData.status,
          });
        }
      } else if (key?.startsWith("innovation_INV-")) {
        const data = localStorage.getItem(key);
        if (data) {
          const innovationData = JSON.parse(data);
          // Only load innovations submitted by current user
          if (innovationData.submittedBy === user?.id) {
            loadedInnovations.push({
              id: innovationData.id,
              name: innovationData.name,
              description: innovationData.description,
              categories: innovationData.categories,
              region: innovationData.region,
              technology: innovationData.technology,
              status: innovationData.status,
              createdAt: innovationData.createdAt,
            });
          }
        }
      }
    }
    setApplications(loadedApplications);
    setRoadshowInquiries(loadedInquiries);
    setUserInnovations(loadedInnovations);
  }, [user?.id]);

  const upcomingEvents = [
    {
      id: 1,
      name: "Innovation Area Erfurt 2025",
      date: language === "de" ? "28. August 2025" : "August 28, 2025",
      location: "Erfurt, Germany",
    },
    {
      id: 2,
      name: "Innovation Area Essen 2025",
      date: language === "de" ? "1. Oktober 2025" : "October 1, 2025",
      location: "Essen, Germany",
    },
    {
      id: 3,
      name: "Innovation Area Rostock 2025",
      date: language === "de" ? "4. November 2025" : "November 4, 2025",
      location: "Rostock, Germany",
    },
  ];

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return <Badge variant="secondary">{t("dashboard.status.submitted")}</Badge>;
      case "under-review":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t("dashboard.status.underReview")}</Badge>;
      case "selected":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("dashboard.status.selected")}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("dashboard.status.notSelected")}</Badge>;
      default:
        return null;
    }
  };

  const getInnovationStatusBadge = (status: UserInnovation["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">{t("dashboard.innovation.status.pending")}</Badge>;
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("dashboard.innovation.status.approved")}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("dashboard.innovation.status.rejected")}</Badge>;
      default:
        return null;
    }
  };

  const getRoadshowStatusBadge = (status: RoadshowInquiry["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">{t("dashboard.roadshow.status.new")}</Badge>;
      case "in-discussion":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t("dashboard.roadshow.status.inDiscussion")}</Badge>;
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("dashboard.roadshow.status.confirmed")}</Badge>;
      case "completed":
        return <Badge className="bg-primary hover:bg-primary/90">{t("dashboard.roadshow.status.completed")}</Badge>;
      case "declined":
        return <Badge variant="destructive">{t("dashboard.roadshow.status.declined")}</Badge>;
      default:
        return null;
    }
  };

  const updateInquiryStatus = (inquiryId: string, newStatus: RoadshowInquiry["status"]) => {
    const key = `roadshow_${inquiryId}`;
    const data = localStorage.getItem(key);
    if (data) {
      const inquiryData = JSON.parse(data);
      inquiryData.status = newStatus;
      localStorage.setItem(key, JSON.stringify(inquiryData));
      setRoadshowInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq))
      );
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground animate-fade-in">
            {t("dashboard.welcome")}, {user?.companyName}!
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in animate-delay-100">
            {t("dashboard.subtitle")}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="animate-fade-in animate-delay-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("dashboard.stats.totalApplications")}</p>
                    <p className="text-3xl font-bold">{applications.length}</p>
                  </div>
                  <FileText className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in animate-delay-150">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("dashboard.stats.pendingReview")}</p>
                    <p className="text-3xl font-bold">
                      {applications.filter((app) => app.status === "submitted").length}
                    </p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in animate-delay-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("dashboard.stats.upcomingEvents")}</p>
                    <p className="text-3xl font-bold">{upcomingEvents.length}</p>
                  </div>
                  <Calendar className="h-10 w-10 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* My Applications */}
              <Card className="animate-fade-in animate-delay-300">
                <CardHeader>
                  <CardTitle>{t("dashboard.myApplications")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-6">
                        {t("dashboard.noApplications")}
                      </p>
                      <Button
                        onClick={() => navigate("/apply")}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        {t("dashboard.applyNow")}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <Card key={app.id}>
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{app.innovationName}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{app.event}</p>
                                <p className="text-xs text-muted-foreground">
                                  {t("dashboard.applied")}: {formatDate(app.submittedAt)}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                {getStatusBadge(app.status)}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/apply/confirmation?id=${app.id}`)}
                                >
                                  {t("dashboard.viewDetails")}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        onClick={() => navigate("/apply/select-event")}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        {t("dashboard.applyToNewEvent")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* My Innovations - Innovator Only */}
              {isInnovator && (
                <Card className="animate-fade-in animate-delay-350">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{t("dashboard.myInnovations")}</CardTitle>
                      <Button
                        size="sm"
                        onClick={() => navigate("/dashboard/submit-innovation")}
                        className="bg-secondary hover:bg-secondary/90"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {t("dashboard.submitInnovation")}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {userInnovations.length === 0 ? (
                      <div className="text-center py-12">
                        <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-6">
                          {t("dashboard.noInnovations")}
                        </p>
                        <Button
                          onClick={() => navigate("/dashboard/submit-innovation")}
                          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        >
                          {t("dashboard.submitFirstInnovation")}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userInnovations.map((innovation) => (
                          <Card key={innovation.id}>
                            <CardContent className="pt-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{innovation.name}</h3>
                                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {innovation.description}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {innovation.categories.map((cat) => (
                                      <Badge key={cat} variant="outline" className="text-xs">
                                        {cat}
                                      </Badge>
                                    ))}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {t("dashboard.submitted")}: {formatDate(innovation.createdAt)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  {getInnovationStatusBadge(innovation.status)}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="animate-fade-in animate-delay-400">
                <CardHeader>
                  <CardTitle>{t("dashboard.quickActions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isInnovator && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/dashboard/submit-innovation")}
                    >
                      <Lightbulb className="mr-2 h-4 w-4" />
                      {t("dashboard.submitInnovation")}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {t("dashboard.editProfile")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/events")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {t("dashboard.viewAllEvents")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/innovations")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("dashboard.browseInnovations")}
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Events */}
              <Card className="animate-fade-in animate-delay-500">
                <CardHeader>
                  <CardTitle>{t("dashboard.recommendedEvents")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.slice(0, 2).map((event) => (
                    <Card key={event.id}>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-1">{event.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                          onClick={() => navigate("/apply/select-event")}
                        >
                          {t("dashboard.apply")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Roadshow Inquiries - Admin Section */}
              {roadshowInquiries.length > 0 && (
                <Card className="animate-fade-in animate-delay-400">
                  <CardHeader>
                    <CardTitle>{t("dashboard.roadshowInquiries")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roadshowInquiries.map((inquiry) => (
                        <Card key={inquiry.id}>
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{inquiry.eventName}</h3>
                                <p className="text-sm text-muted-foreground mb-1">{inquiry.organizationName}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                  <Calendar className="h-3 w-3" />
                                  <span>{t("dashboard.event")}: {formatDate(inquiry.eventDate)}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {t("dashboard.submitted")}: {formatDate(inquiry.submittedAt)}
                                </p>
                              </div>
                              <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                  {getRoadshowStatusBadge(inquiry.status)}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedInquiry(inquiry)}
                                  >
                                    {t("dashboard.viewDetails")}
                                  </Button>
                                </div>
                                <div className="flex gap-2">
                                  <select
                                    className="text-xs border rounded px-2 py-1"
                                    value={inquiry.status}
                                    onChange={(e) =>
                                      updateInquiryStatus(inquiry.id, e.target.value as RoadshowInquiry["status"])
                                    }
                                  >
                                    <option value="new">{t("dashboard.roadshow.status.new")}</option>
                                    <option value="in-discussion">{t("dashboard.roadshow.status.inDiscussion")}</option>
                                    <option value="confirmed">{t("dashboard.roadshow.status.confirmed")}</option>
                                    <option value="completed">{t("dashboard.roadshow.status.completed")}</option>
                                    <option value="declined">{t("dashboard.roadshow.status.declined")}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            {selectedInquiry?.id === inquiry.id && (
                              <div className="mt-4 pt-4 border-t text-sm space-y-2">
                                <p>
                                  <strong>ID:</strong> {inquiry.id}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const data = localStorage.getItem(`roadshow_${inquiry.id}`);
                                    if (data) {
                                      const fullData = JSON.parse(data);
                                      console.log("Full inquiry data:", fullData);
                                      alert(
                                        `${t("dashboard.fullDetails")}:\n\n${Object.entries(fullData)
                                          .map(([key, value]) => `${key}: ${value}`)
                                          .join("\n")}`
                                      );
                                    }
                                  }}
                                >
                                  {t("dashboard.exportData")}
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
