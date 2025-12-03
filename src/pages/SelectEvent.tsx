import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  venue: string;
  status: "open" | "closing-soon" | "closed";
  deadline: string;
  description: string;
  round: 1 | 2;
}

const SelectEvent = () => {
  const navigate = useNavigate();

  const events: Event[] = [
    {
      id: "mainz-2026",
      name: "Mainz Innovation Area 2026",
      date: "March 19, 2026",
      location: "Mainz, Germany",
      venue: "Bildung Digital Messe Mainz",
      status: "open",
      deadline: "January 31, 2026",
      description: "Join us in Mainz for the first Innovation Area event of 2026. Showcase your education innovation to leading educators and decision-makers.",
      round: 1,
    },
    {
      id: "magdeburg-2026",
      name: "Magdeburg Innovation Area 2026",
      date: "April 23, 2026",
      location: "Magdeburg, Germany",
      venue: "Bildung Digital Messe Magdeburg",
      status: "open",
      deadline: "January 31, 2026",
      description: "Present your educational technology at Magdeburg's Innovation Area. Engage with educators and institutions across central Germany.",
      round: 1,
    },
    {
      id: "berlin-2026",
      name: "Berlin Innovation Area 2026",
      date: "2026 (Date TBD)",
      location: "Berlin, Germany",
      venue: "Bildung Digital Messe Berlin",
      status: "open",
      deadline: "January 31, 2026",
      description: "Experience the Innovation Area in Germany's capital. Showcase your innovation at this premier event.",
      round: 1,
    },
    {
      id: "erfurt-2026",
      name: "Erfurt Innovation Area 2026",
      date: "August 28, 2026",
      location: "Erfurt, Germany",
      venue: "Bildung Digital Messe Erfurt",
      status: "closed",
      deadline: "May 31, 2026",
      description: "Join us in Erfurt for the Innovation Area event, where education innovators showcase cutting-edge solutions for digital learning.",
      round: 2,
    },
    {
      id: "essen-2026",
      name: "Essen Innovation Area 2026",
      date: "October 1, 2026",
      location: "Essen, Germany",
      venue: "Bildung Digital Messe Essen",
      status: "closed",
      deadline: "May 31, 2026",
      description: "The Essen Innovation Area brings together forward-thinking companies and educational institutions.",
      round: 2,
    },
    {
      id: "rostock-2026",
      name: "Rostock Innovation Area 2026",
      date: "November 4, 2026",
      location: "Rostock, Germany",
      venue: "Bildung Digital Messe Rostock",
      status: "closed",
      deadline: "May 31, 2026",
      description: "Don't miss the Rostock Innovation Area! This event highlights breakthrough technologies in VR learning and adaptive assessment systems.",
      round: 2,
    },
  ];

  // Check current date to determine application availability
  const currentDate = new Date();
  const round1End = new Date("2026-01-31T23:59:59");
  const round2Start = new Date("2026-05-01T00:00:00");
  const round2End = new Date("2026-05-31T23:59:59");

  const isRound1Active = currentDate <= round1End;
  const isRound2Active = currentDate >= round2Start && currentDate <= round2End;
  const round1Closed = currentDate > round1End;
  const round2NotYetOpen = currentDate < round2Start;

  const round1Events = events.filter(e => e.round === 1);
  const round2Events = events.filter(e => e.round === 2);

  const getStatusBadge = (status: Event["status"], isAvailable: boolean) => {
    if (!isAvailable) {
      return <Badge className="bg-muted text-muted-foreground rounded-full">Not Yet Available</Badge>;
    }
    switch (status) {
      case "open":
        return <Badge className="bg-secondary text-secondary-foreground rounded-full">Applications Open</Badge>;
      case "closing-soon":
        return <Badge className="bg-accent text-accent-foreground rounded-full">Applications Closing Soon</Badge>;
      case "closed":
        return <Badge className="bg-muted text-muted-foreground rounded-full">Applications Closed</Badge>;
      default:
        return null;
    }
  };

  const handleApply = (eventId: string) => {
    navigate(`/apply/form?event=${eventId}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-h1 font-heading mb-4 text-foreground text-center animate-fade-in">
            Which Event Would You Like to Apply To?
          </h1>
          <p className="text-body text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Select an upcoming Innovation Area event to submit your application. Events are organized in two application rounds for 2026.
          </p>

          {/* Round 1 Events */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-h2 font-heading mb-2 text-foreground">Round 1: Apply by January 31, 2026</h2>
              <p className="text-body text-muted-foreground">
                Round 1 applications cover slots for the first three events of 2026 (Mainz, Magdeburg, Berlin).
              </p>
              {!isRound1Active && round1Closed && (
                <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
                  <p className="text-small text-muted-foreground">
                    Round 1 applications have closed. {round2NotYetOpen ? "Round 2 applications will open on May 1st, 2026." : "Round 2 applications are now open!"}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {round1Events.map((event, index) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-h3 font-heading mb-2">{event.name}</CardTitle>
                        <div className="flex flex-col gap-2 text-small text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Application Deadline: {event.deadline}</span>
                          </div>
                        </div>
                      </div>
                      <div>{getStatusBadge(event.status, isRound1Active)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-muted-foreground mb-6">{event.description}</p>
                    <Button
                      onClick={() => handleApply(event.id)}
                      disabled={!isRound1Active}
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

          {/* Round 2 Events */}
          <div>
            <div className="mb-6">
              <h2 className="text-h2 font-heading mb-2 text-foreground">Round 2: Applications Open May 1-31, 2026</h2>
              <p className="text-body text-muted-foreground">
                Round 2 applications cover slots for the final three events of 2026 (Erfurt, Essen, Rostock).
              </p>
              {round2NotYetOpen && (
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-small text-foreground">
                    Round 2 applications will open on May 1st, 2026. Mark your calendar!
                  </p>
                </div>
              )}
              {currentDate > round2End && (
                <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
                  <p className="text-small text-muted-foreground">
                    All applications for 2026 are now closed. Thank you for your interest!
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {round2Events.map((event, index) => (
                <Card
                  key={event.id}
                  className={`transition-all animate-fade-in ${isRound2Active ? "hover:shadow-lg" : "opacity-75"}`}
                  style={{ animationDelay: `${(round1Events.length + index) * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-h3 font-heading mb-2">{event.name}</CardTitle>
                        <div className="flex flex-col gap-2 text-small text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Application Deadline: {event.deadline}</span>
                          </div>
                        </div>
                      </div>
                      <div>{getStatusBadge(event.status, isRound2Active)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-muted-foreground mb-6">{event.description}</p>
                    <Button
                      onClick={() => handleApply(event.id)}
                      disabled={!isRound2Active}
                      className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      size="lg"
                    >
                      {isRound2Active ? "Apply to This Event" : "Applications Open May 1st"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SelectEvent;
