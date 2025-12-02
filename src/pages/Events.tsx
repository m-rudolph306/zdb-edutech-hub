import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Users, Clock, LayoutGrid, List } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  fullDate: string;
  location: string;
  venue: string;
  status: "open" | "closing-soon" | "closed" | "complete";
  statusLabel: string;
  description: string;
  startupsCount: number;
  deadline: string;
}

type ViewType = "grid" | "list";
type FilterType = "all" | "upcoming" | "past" | "applications-open";

const Events = () => {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const events: Event[] = [
    {
      id: "mainz-2026",
      name: "Mainz Innovation Area 2026",
      date: "Mar 19",
      fullDate: "March 19, 2026",
      location: "Mainz",
      venue: "Bildung Digital Messe Mainz",
      status: "open",
      statusLabel: "Applications Open",
      description: "Join us in Mainz for the first Innovation Area event of 2026. Showcase your education innovation to leading educators and decision-makers. Part of Round 1 applications.",
      startupsCount: 8,
      deadline: "January 31, 2026",
    },
    {
      id: "magdeburg-2026",
      name: "Magdeburg Innovation Area 2026",
      date: "Apr 23",
      fullDate: "April 23, 2026",
      location: "Magdeburg",
      venue: "Bildung Digital Messe Magdeburg",
      status: "open",
      statusLabel: "Applications Open",
      description: "Present your educational technology at Magdeburg's Innovation Area. Connect with educators and institutions across central Germany. Part of Round 1 applications.",
      startupsCount: 8,
      deadline: "January 31, 2026",
    },
    {
      id: "berlin-2026",
      name: "Berlin Innovation Area 2026",
      date: "TBD",
      fullDate: "Berlin 2026 (Date TBD)",
      location: "Berlin",
      venue: "Bildung Digital Messe Berlin",
      status: "open",
      statusLabel: "Applications Open",
      description: "Experience the Innovation Area in Germany's capital. Showcase your innovation at this premier event. Part of Round 1 applications.",
      startupsCount: 8,
      deadline: "January 31, 2026",
    },
    {
      id: "erfurt-2026",
      name: "Erfurt Innovation Area 2026",
      date: "Aug 28",
      fullDate: "August 28, 2026",
      location: "Erfurt",
      venue: "Bildung Digital Messe Erfurt",
      status: "open",
      statusLabel: "Applications Open May 1st",
      description: "Join us in Erfurt for the Innovation Area event, where education innovators showcase cutting-edge solutions for digital learning, assessment tools, and classroom technology. Part of Round 2 applications (Opens May 1st).",
      startupsCount: 8,
      deadline: "May 31, 2026",
    },
    {
      id: "essen-2026",
      name: "Essen Innovation Area 2026",
      date: "Oct 1",
      fullDate: "October 1, 2026",
      location: "Essen",
      venue: "Bildung Digital Messe Essen",
      status: "open",
      statusLabel: "Applications Open May 1st",
      description: "The Essen Innovation Area brings together forward-thinking companies and educational institutions. Discover innovative teaching methods and collaborative tools. Part of Round 2 applications (Opens May 1st).",
      startupsCount: 8,
      deadline: "May 31, 2026",
    },
    {
      id: "rostock-2026",
      name: "Rostock Innovation Area 2026",
      date: "Nov 4",
      fullDate: "November 4, 2026",
      location: "Rostock",
      venue: "Bildung Digital Messe Rostock",
      status: "open",
      statusLabel: "Applications Open May 1st",
      description: "Don't miss the Rostock Innovation Area! This event highlights breakthrough technologies in VR learning, adaptive assessment systems, and content management solutions. Part of Round 2 applications (Opens May 1st).",
      startupsCount: 8,
      deadline: "May 31, 2026",
    },
  ];

  const getStatusBadgeClass = (status: Event["status"]) => {
    switch (status) {
      case "open":
        return "bg-secondary text-secondary-foreground border-transparent";
      case "closing-soon":
        return "bg-accent text-accent-foreground border-transparent";
      case "closed":
        return "bg-muted text-muted-foreground border-transparent";
      case "complete":
        return "bg-primary text-primary-foreground border-transparent";
      default:
        return "";
    }
  };

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "applications-open") return event.status === "open" || event.status === "closing-soon";
    if (activeFilter === "upcoming") return event.status !== "complete";
    if (activeFilter === "past") return event.status === "complete";
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-12 md:py-16 px-4 md:px-6 mt-[72px]">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-h1 font-heading mb-4 text-foreground animate-fade-in">
              Innovation Area Events
            </h1>
            <p className="text-body text-muted-foreground max-w-2xl">
              Join us at upcoming Innovation Area events across Germany to connect with education innovators and policy-makers.
            </p>
          </div>

          {/* Filters & View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className="rounded-full"
              >
                All Events
              </Button>
              <Button
                variant={activeFilter === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("upcoming")}
                className="rounded-full"
              >
                Upcoming
              </Button>
              <Button
                variant={activeFilter === "past" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("past")}
                className="rounded-full"
              >
                Past
              </Button>
              <Button
                variant={activeFilter === "applications-open" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("applications-open")}
                className="rounded-full"
              >
                Applications Open
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 bg-muted p-1 rounded-lg">
              <Button
                variant={viewType === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewType("grid")}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewType === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewType("list")}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>

          {/* Grid View */}
          {viewType === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border bg-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    {/* Date Badge */}
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                        <Calendar className="h-5 w-5" />
                        <span className="font-heading font-bold text-h5">{event.date}</span>
                      </div>
                    </div>

                    {/* Event Name */}
                    <h3 className="text-h3 font-heading mb-2 text-foreground">
                      {event.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-small text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <Badge className={`${getStatusBadgeClass(event.status)} rounded-full px-3 py-1`}>
                        {event.statusLabel}
                      </Badge>
                    </div>

                    {/* Key Info */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-2 text-small text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{event.startupsCount} Startups</span>
                      </div>
                      <div className="flex items-center gap-2 text-small text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-small text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Deadline: {event.deadline}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link to="/how-to-apply" className="flex-1">
                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                          Apply Now
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* List View */}
          {viewType === "list" && (
            <div className="mb-12 overflow-x-auto animate-fade-in">
              <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left p-4 text-small font-heading text-foreground">Date</th>
                    <th className="text-left p-4 text-small font-heading text-foreground">Event Name</th>
                    <th className="text-left p-4 text-small font-heading text-foreground">Location</th>
                    <th className="text-left p-4 text-small font-heading text-foreground">Status</th>
                    <th className="text-left p-4 text-small font-heading text-foreground">Startups</th>
                    <th className="text-left p-4 text-small font-heading text-foreground">Deadline</th>
                    <th className="text-left p-4 text-small font-heading text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, index) => (
                    <tr
                      key={event.id}
                      className={`border-b border-border transition-colors hover:bg-muted/50 ${
                        index % 2 === 0 ? "bg-card" : "bg-muted/20"
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-small">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{event.fullDate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-heading font-semibold text-foreground">{event.name}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-small text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusBadgeClass(event.status)} rounded-full`}>
                          {event.statusLabel}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-small text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.startupsCount}</span>
                        </div>
                      </td>
                      <td className="p-4 text-small text-muted-foreground">{event.deadline}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link to="/how-to-apply">
                            <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                              Apply
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-body mb-4">No events found matching your filters.</p>
              <Button variant="outline" onClick={() => setActiveFilter("all")}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-h2 font-heading mb-4 text-foreground">
                Want to participate?
              </h2>
              <p className="text-body text-muted-foreground mb-6 max-w-2xl mx-auto">
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
