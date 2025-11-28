import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  status: string;
  statusVariant: "default" | "secondary" | "destructive";
  description: string;
}

const Events = () => {
  const upcomingEvents: Event[] = [
    {
      id: "erfurt-2025",
      name: "Erfurt Innovation Area 2025",
      date: "August 28, 2025",
      location: "Erfurt",
      status: "Applications Open",
      statusVariant: "secondary",
      description: "Join us in Erfurt for the Innovation Area event, where education innovators showcase cutting-edge solutions for digital learning, assessment tools, and classroom technology. Network with educators and explore the future of education.",
    },
    {
      id: "essen-2025",
      name: "Essen Innovation Area 2025",
      date: "October 1, 2025",
      location: "Essen",
      status: "Applications Open",
      statusVariant: "secondary",
      description: "The Essen Innovation Area brings together forward-thinking companies and educational institutions. Discover innovative teaching methods, AI-powered learning platforms, and collaborative tools transforming modern education.",
    },
    {
      id: "rostock-2025",
      name: "Rostock Innovation Area 2025",
      date: "November 4, 2025",
      location: "Rostock",
      status: "Applications Closing Soon",
      statusVariant: "destructive",
      description: "Don't miss the Rostock Innovation Area! This event highlights breakthrough technologies in VR learning, adaptive assessment systems, and content management solutions. Apply now before spaces fill up.",
    },
  ];

  const scrollToEvent = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-12 md:py-16 px-4 md:px-6 mt-[72px]">
        <div className="container mx-auto max-w-4xl">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-foreground animate-fade-in">
            Upcoming Innovation Area Events
          </h1>

          {/* Events List */}
          <div className="space-y-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <Card
                key={event.id}
                id={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 md:p-8">
                  {/* Event Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-semibold">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        {event.name}
                      </h2>
                    </div>
                    <Badge
                      variant={event.statusVariant}
                      className="text-xs font-semibold px-3 py-1 whitespace-nowrap"
                    >
                      {event.status}
                    </Badge>
                  </div>

                  {/* Event Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Learn More Button */}
                  <Button
                    variant="outline"
                    onClick={() => scrollToEvent(event.id)}
                    className="group hover:scale-105 transition-transform"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Want to participate?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Showcase your innovation at our upcoming events and connect with educators, 
                institutions, and decision-makers across Germany.
              </p>
              <Link to="/how-to-apply">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:scale-105 transition-transform"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
