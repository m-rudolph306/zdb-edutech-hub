import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Users, Clock, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Event {
  id: string;
  name: string;
  date: string;
  fullDate: string;
  location: string;
  venue: string;
  category: "past" | "open" | "future";
  statusLabel: string;
  description: string;
  startupsCount: number;
  deadline?: string;
}

const Events = () => {
  const { t } = useLanguage();

  const events: Event[] = [
    // Past Events
    {
      id: "berlin-2025",
      name: "Berlin Innovation Area 2025",
      date: "Nov 15",
      fullDate: "November 15, 2025",
      location: "Berlin",
      venue: "Bildung Digital Messe Berlin",
      category: "past",
      statusLabel: t("events.status.completed"),
      description: "The Berlin Innovation Area brought together leading education innovators and decision-makers.",
      startupsCount: 8,
    },
    {
      id: "hamburg-2025",
      name: "Hamburg Innovation Area 2025",
      date: "Sep 20",
      fullDate: "September 20, 2025",
      location: "Hamburg",
      venue: "Bildung Digital Messe Hamburg",
      category: "past",
      statusLabel: t("events.status.completed"),
      description: "A successful showcase of innovative education solutions in Hamburg.",
      startupsCount: 6,
    },
    // Open Registrations (Round 1)
    {
      id: "mainz-2026",
      name: "Mainz Innovation Area 2026",
      date: "Mar 19",
      fullDate: "March 19, 2026",
      location: "Mainz",
      venue: "Bildung Digital Messe Mainz",
      category: "open",
      statusLabel: t("events.status.open"),
      description: "Join us in Mainz for the first Innovation Area event of 2026. Showcase your education innovation to leading educators and decision-makers.",
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
      category: "open",
      statusLabel: t("events.status.open"),
      description: "Present your educational technology at Magdeburg's Innovation Area. Engage with educators and institutions across central Germany.",
      startupsCount: 8,
      deadline: "January 31, 2026",
    },
    {
      id: "berlin-2026",
      name: "Berlin Innovation Area 2026",
      date: "May 7",
      fullDate: "May 7, 2026",
      location: "Berlin",
      venue: "Bildung Digital Messe Berlin",
      category: "open",
      statusLabel: t("events.status.open"),
      description: "Experience the Innovation Area in Germany's capital. Showcase your innovation at this premier event.",
      startupsCount: 8,
      deadline: "January 31, 2026",
    },
    // Future Events (Round 2)
    {
      id: "erfurt-2026",
      name: "Erfurt Innovation Area 2026",
      date: "Aug 28",
      fullDate: "August 28, 2026",
      location: "Erfurt",
      venue: "Bildung Digital Messe Erfurt",
      category: "future",
      statusLabel: t("events.status.comingSoon"),
      description: "Join us in Erfurt for the Innovation Area event. Applications open May 1st.",
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
      category: "future",
      statusLabel: t("events.status.comingSoon"),
      description: "The Essen Innovation Area brings together forward-thinking companies and educational institutions. Applications open May 1st.",
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
      category: "future",
      statusLabel: t("events.status.comingSoon"),
      description: "Don't miss the Rostock Innovation Area! Applications open May 1st.",
      startupsCount: 8,
      deadline: "May 31, 2026",
    },
  ];

  const pastEvents = events.filter((e) => e.category === "past");
  const openEvents = events.filter((e) => e.category === "open");
  const futureEvents = events.filter((e) => e.category === "future");

  const getCategoryBadgeClass = (category: Event["category"]) => {
    switch (category) {
      case "open":
        return "bg-secondary text-secondary-foreground";
      case "future":
        return "bg-accent text-accent-foreground";
      case "past":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  const EventCard = ({ event, index }: { event: Event; index: number }) => (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border bg-card animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-6">
        {/* Date Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
            <Calendar className="h-5 w-5" />
            <span className="font-heading font-bold text-lg">{event.date}</span>
          </div>
          <Badge className={`${getCategoryBadgeClass(event.category)} rounded-full px-3 py-1`}>
            {event.statusLabel}
          </Badge>
        </div>

        {/* Event Name */}
        <h3 className="text-xl font-heading font-bold mb-2 text-foreground">
          {event.name}
        </h3>

        {/* Location & Venue */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Key Info */}
        <div className="space-y-2 mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{event.startupsCount} Startups</span>
          </div>
          {event.deadline && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{t("events.deadline")}: {event.deadline}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {event.category === "open" ? (
            <>
              <Link to="/apply" className="flex-1">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  {t("events.applyNow")}
                </Button>
              </Link>
              <Button variant="outline" className="flex-1">
                {t("events.learnMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : event.category === "past" ? (
            <Button variant="outline" className="w-full">
              {t("events.viewRecap")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
              {t("events.registrationOpens")} May 1st
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-12 md:py-16 px-4 md:px-6 mt-[110px]">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground animate-fade-in">
              {t("events.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t("events.subtitle")}
            </p>
          </div>

          {/* Section 1: Open Registrations */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-secondary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {t("events.section.open")}
              </h2>
              <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                {t("events.round1")}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("events.section.open.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>

          {/* Section 2: Future Events */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-accent rounded-full" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {t("events.section.future")}
              </h2>
              <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                {t("events.round2")}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("events.section.future.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {futureEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>

          {/* Section 3: Past Events */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-muted-foreground rounded-full" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {t("events.section.past")}
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("events.section.past.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>

          {/* Sponsor Acknowledgment */}
          <p className="text-center text-sm text-muted-foreground mb-12 animate-fade-in">
            {t("events.sponsorAcknowledgment")}
          </p>

          {/* Bottom CTA */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-foreground">
                {t("events.cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t("events.cta.description")}
              </p>
              <Link to="/apply">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:scale-105 transition-transform"
                >
                  {t("events.applyNow")}
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