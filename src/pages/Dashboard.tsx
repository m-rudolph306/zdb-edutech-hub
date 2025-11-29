import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Calendar, TrendingUp, User, Settings, ExternalLink } from "lucide-react";

interface Application {
  id: string;
  event: string;
  submittedAt: string;
  status: "submitted" | "under-review" | "selected" | "rejected";
  innovationName: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Load all applications from localStorage
    const loadedApplications: Application[] = [];
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
      }
    }
    setApplications(loadedApplications);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const upcomingEvents = [
    {
      id: 1,
      name: "Innovation Area Erfurt 2025",
      date: "August 28, 2025",
      location: "Erfurt, Germany",
    },
    {
      id: 2,
      name: "Innovation Area Essen 2025",
      date: "October 1, 2025",
      location: "Essen, Germany",
    },
    {
      id: 3,
      name: "Innovation Area Rostock 2025",
      date: "November 4, 2025",
      location: "Rostock, Germany",
    },
  ];

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return <Badge variant="secondary">Submitted</Badge>;
      case "under-review":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Under Review</Badge>;
      case "selected":
        return <Badge className="bg-green-500 hover:bg-green-600">Selected</Badge>;
      case "rejected":
        return <Badge variant="destructive">Not Selected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground animate-fade-in">
            Welcome back, {user?.companyName}!
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in animate-delay-100">
            Manage your applications and track your Innovation Area journey
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="animate-fade-in animate-delay-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
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
                  <CardTitle>My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-6">
                        You haven't applied to any events yet
                      </p>
                      <Button
                        onClick={() => navigate("/apply")}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        Apply Now
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
                                  Applied: {new Date(app.submittedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                {getStatusBadge(app.status)}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/apply/confirmation?id=${app.id}`)}
                                >
                                  View Details
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
                        Apply to New Event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="animate-fade-in animate-delay-400">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit My Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/events")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Events
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/innovations")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Browse Innovations
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Events */}
              <Card className="animate-fade-in animate-delay-500">
                <CardHeader>
                  <CardTitle>Upcoming Events You Might Like</CardTitle>
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
                          Apply
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;