import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "open" | "closing-soon" | "closed";
  deadline: string;
  description: string;
}

const SelectEvent = () => {
  const navigate = useNavigate();

  const events: Event[] = [
    {
      id: 1,
      name: "Innovation Area Erfurt 2025",
      date: "August 28, 2025",
      location: "Erfurt, Germany",
      status: "open",
      deadline: "July 28, 2025",
      description: "Join us at the Education Innovation Summit in Erfurt to showcase your solution to leading educators and decision-makers.",
    },
    {
      id: 2,
      name: "Innovation Area Essen 2025",
      date: "October 1, 2025",
      location: "Essen, Germany",
      status: "open",
      deadline: "September 1, 2025",
      description: "Present your educational technology at one of Germany's premier EdTech events in Essen.",
    },
    {
      id: 3,
      name: "Innovation Area Rostock 2025",
      date: "November 4, 2025",
      location: "Rostock, Germany",
      status: "closing-soon",
      deadline: "October 4, 2025",
      description: "Showcase your innovation at our northern Germany event, connecting with educational institutions across the region.",
    },
  ];

  const getStatusBadge = (status: Event["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500 hover:bg-green-600">Applications Open</Badge>;
      case "closing-soon":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Applications Closing Soon</Badge>;
      case "closed":
        return <Badge variant="secondary">Applications Closed</Badge>;
      default:
        return null;
    }
  };

  const handleApply = (eventId: number) => {
    navigate(`/apply/form?event=${eventId}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-center animate-fade-in">
            Which Event Would You Like to Apply To?
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Select an upcoming Innovation Area event to submit your application. Each event offers unique opportunities to connect with educators and institutions.
          </p>

          <div className="space-y-6">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{event.name}</CardTitle>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Application Deadline: {event.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div>{getStatusBadge(event.status)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  <Button
                    onClick={() => handleApply(event.id)}
                    disabled={event.status === "closed"}
                    className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                  >
                    Apply to This Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SelectEvent;
