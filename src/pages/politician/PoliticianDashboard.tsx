import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Lightbulb,
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Search,
  Building2,
  Globe,
} from "lucide-react";
import EventsCalendar from "@/components/EventsCalendar";

interface Innovation {
  id: string;
  name: string;
  company: string;
  category: string;
  region: string;
  description: string;
  status?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
}

interface RegionStats {
  name: string;
  count: number;
}

const PoliticianDashboard = () => {
  const { t, language } = useLanguage();
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [regionStats, setRegionStats] = useState<RegionStats[]>([]);
  const [categoryStats, setCategoryStats] = useState<{ name: string; count: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load innovations (both from static data and submitted innovations)
    const loadedInnovations: Innovation[] = [];

    // Load user-submitted innovations (approved only)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("innovation_INV-")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        if (data.status === "approved") {
          loadedInnovations.push({
            id: data.id || key.replace("innovation_", ""),
            name: data.name || "",
            company: data.company || "",
            category: data.categories?.[0] || "Other",
            region: data.region || "Germany",
            description: data.description || "",
            status: data.status,
          });
        }
      }
    }

    // Add sample data for demo purposes
    const sampleInnovations: Innovation[] = [
      { id: "1", name: "EduVR Learning", company: "TechStart GmbH", category: "VR", region: "Bayern", description: "Immersive VR learning platform", status: "approved" },
      { id: "2", name: "AI Tutor Pro", company: "LearnAI AG", category: "AI", region: "Berlin", description: "AI-powered tutoring system", status: "approved" },
      { id: "3", name: "ClassConnect", company: "EduConnect", category: "Management", region: "Hamburg", description: "School management platform", status: "approved" },
      { id: "4", name: "LernBot", company: "Innovation Labs", category: "AI", region: "Baden-Württemberg", description: "Chatbot for learning support", status: "approved" },
      { id: "5", name: "DigitalPrüfung", company: "Assessment GmbH", category: "Assessment", region: "Nordrhein-Westfalen", description: "Digital assessment platform", status: "approved" },
    ];

    const allInnovations = [...loadedInnovations, ...sampleInnovations];
    setInnovations(allInnovations);

    // Calculate region stats
    const regions: Record<string, number> = {};
    allInnovations.forEach((i) => {
      regions[i.region] = (regions[i.region] || 0) + 1;
    });
    setRegionStats(Object.entries(regions).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));

    // Calculate category stats
    const categories: Record<string, number> = {};
    allInnovations.forEach((i) => {
      categories[i.category] = (categories[i.category] || 0) + 1;
    });
    setCategoryStats(Object.entries(categories).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));

    // Load events
    const savedEvents = localStorage.getItem("admin_events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Default events
      setEvents([
        { id: "evt-1", name: "Innovation Area Erfurt 2025", date: "2025-08-28", location: "Erfurt", category: "open" },
        { id: "evt-2", name: "Innovation Area Essen 2025", date: "2025-10-01", location: "Essen", category: "open" },
        { id: "evt-3", name: "Innovation Area Rostock 2025", date: "2025-11-04", location: "Rostock", category: "future" },
      ]);
    }
  };

  const filteredInnovations = innovations.filter((i) => {
    const matchesSearch =
      !searchQuery ||
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || i.category === categoryFilter;
    const matchesRegion = regionFilter === "all" || i.region === regionFilter;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date()).length;

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      AI: "bg-purple-100 text-purple-800",
      VR: "bg-blue-100 text-blue-800",
      Assessment: "bg-green-100 text-green-800",
      Management: "bg-orange-100 text-orange-800",
      Content: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const uniqueCategories = [...new Set(innovations.map((i) => i.category))];
  const uniqueRegions = [...new Set(innovations.map((i) => i.region))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t("politician.title")}</h1>
          <p className="text-muted-foreground">{t("politician.subtitle")}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{innovations.length}</p>
                  <p className="text-sm text-muted-foreground">{t("politician.stats.innovations")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingEvents}</p>
                  <p className="text-sm text-muted-foreground">{t("politician.stats.upcomingEvents")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{regionStats.length}</p>
                  <p className="text-sm text-muted-foreground">{t("politician.stats.regions")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{categoryStats.length}</p>
                  <p className="text-sm text-muted-foreground">{t("politician.stats.categories")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Events Calendar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t("politician.eventsCalendar")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventsCalendar events={events} />
              </CardContent>
            </Card>

            {/* Regional Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t("politician.regionalDistribution")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {regionStats.slice(0, 6).map((region) => (
                    <div key={region.name} className="flex items-center justify-between">
                      <span className="text-sm">{region.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(region.count / innovations.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-6 text-right">{region.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t("politician.categoryDistribution")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryStats.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <Badge className={getCategoryBadge(category.name)}>{category.name}</Badge>
                      <span className="text-sm font-medium">{category.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Innovation Browser */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  {t("politician.innovationBrowser")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("politician.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder={t("politician.allCategories")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("politician.allCategories")}</SelectItem>
                      {uniqueCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder={t("politician.allRegions")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("politician.allRegions")}</SelectItem>
                      {uniqueRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Innovation List */}
                <div className="space-y-4">
                  {filteredInnovations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{t("politician.noInnovations")}</p>
                    </div>
                  ) : (
                    filteredInnovations.map((innovation) => (
                      <div
                        key={innovation.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">{innovation.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Users className="h-3 w-3" />
                              <span>{innovation.company}</span>
                              <span>•</span>
                              <MapPin className="h-3 w-3" />
                              <span>{innovation.region}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {innovation.description}
                            </p>
                          </div>
                          <Badge className={getCategoryBadge(innovation.category)}>
                            {innovation.category}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-4 border-t text-sm text-muted-foreground text-center">
                  {t("politician.showing")} {filteredInnovations.length} {t("politician.of")} {innovations.length} {t("politician.innovations")}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events List */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t("politician.upcomingEventsList")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter((e) => new Date(e.date) >= new Date())
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{event.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(event.date)}</span>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Badge variant={event.category === "open" ? "default" : "secondary"}>
                          {event.category === "open" ? t("politician.open") : t("politician.upcoming")}
                        </Badge>
                      </div>
                    ))}
                  {events.filter((e) => new Date(e.date) >= new Date()).length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      {t("politician.noUpcomingEvents")}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticianDashboard;
