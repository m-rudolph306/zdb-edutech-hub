import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Plus, Edit, Trash2, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  venue: string;
  category: "past" | "open" | "future";
  deadline?: string;
  maxStartups: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const defaultEvents: Event[] = [
  {
    id: "evt-1",
    name: "Innovation Area Erfurt 2025",
    date: "2025-08-28",
    location: "Erfurt, Germany",
    venue: "Messe Erfurt",
    category: "open",
    deadline: "2025-01-31",
    maxStartups: 8,
    description: "Join us at the Innovation Area in Erfurt for our largest event of the year.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "evt-2",
    name: "Innovation Area Essen 2025",
    date: "2025-10-01",
    location: "Essen, Germany",
    venue: "Messe Essen",
    category: "open",
    deadline: "2025-01-31",
    maxStartups: 6,
    description: "Showcase your innovation at the heart of the Ruhr area.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "evt-3",
    name: "Innovation Area Rostock 2025",
    date: "2025-11-04",
    location: "Rostock, Germany",
    venue: "StadtHalle Rostock",
    category: "future",
    maxStartups: 5,
    description: "Northern Germany's premier education innovation event.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const AdminEvents = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Event>>({
    name: "",
    date: "",
    location: "",
    venue: "",
    category: "future",
    deadline: "",
    maxStartups: 6,
    description: "",
  });
  const [eventDate, setEventDate] = useState<Date>();
  const [deadlineDate, setDeadlineDate] = useState<Date>();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const savedEvents = localStorage.getItem("admin_events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Initialize with default events
      setEvents(defaultEvents);
      localStorage.setItem("admin_events", JSON.stringify(defaultEvents));
    }
  };

  const saveEvents = (updatedEvents: Event[]) => {
    localStorage.setItem("admin_events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const openCreateDialog = () => {
    setIsCreating(true);
    setSelectedEvent(null);
    setFormData({
      name: "",
      date: "",
      location: "",
      venue: "",
      category: "future",
      deadline: "",
      maxStartups: 6,
      description: "",
    });
    setEventDate(undefined);
    setDeadlineDate(undefined);
    setEditDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setIsCreating(false);
    setSelectedEvent(event);
    setFormData(event);
    setEventDate(event.date ? new Date(event.date) : undefined);
    setDeadlineDate(event.deadline ? new Date(event.deadline) : undefined);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !eventDate) {
      toast({
        title: t("admin.events.error"),
        description: t("admin.events.errorDescription"),
        variant: "destructive",
      });
      return;
    }

    const eventData: Event = {
      id: isCreating ? `evt-${Date.now()}` : selectedEvent!.id,
      name: formData.name || "",
      date: eventDate.toISOString().split("T")[0],
      location: formData.location || "",
      venue: formData.venue || "",
      category: formData.category as Event["category"],
      deadline: deadlineDate?.toISOString().split("T")[0],
      maxStartups: formData.maxStartups || 6,
      description: formData.description || "",
      createdAt: isCreating ? new Date().toISOString() : selectedEvent!.createdAt,
      updatedAt: new Date().toISOString(),
    };

    let updatedEvents: Event[];
    if (isCreating) {
      updatedEvents = [...events, eventData];
    } else {
      updatedEvents = events.map((e) => (e.id === eventData.id ? eventData : e));
    }

    saveEvents(updatedEvents);
    setEditDialogOpen(false);

    toast({
      title: isCreating ? t("admin.events.created") : t("admin.events.updated"),
      description: isCreating ? t("admin.events.createdDescription") : t("admin.events.updatedDescription"),
    });
  };

  const handleDelete = (id: string) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    saveEvents(updatedEvents);

    toast({
      title: t("admin.events.deleted"),
      description: t("admin.events.deletedDescription"),
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryBadge = (category: Event["category"]) => {
    switch (category) {
      case "open":
        return <Badge className="bg-green-500 hover:bg-green-600">{t("admin.events.category.open")}</Badge>;
      case "future":
        return <Badge variant="secondary">{t("admin.events.category.future")}</Badge>;
      case "past":
        return <Badge variant="outline">{t("admin.events.category.past")}</Badge>;
    }
  };

  const getApplicationCount = (eventName: string) => {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("application_IA-")) {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        if (data.event === eventName) count++;
      }
    }
    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("admin.events.title")}</h1>
          <p className="text-muted-foreground">{t("admin.events.subtitle")}</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          {t("admin.events.createEvent")}
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{event.name}</CardTitle>
                {getCategoryBadge(event.category)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {getApplicationCount(event.name)} / {event.maxStartups} {t("admin.events.applications")}
                  </span>
                </div>
              </div>
              {event.deadline && (
                <p className="text-xs text-muted-foreground">
                  {t("admin.events.deadline")}: {formatDate(event.deadline)}
                </p>
              )}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(event)}>
                  <Edit className="h-4 w-4 mr-1" />
                  {t("admin.events.edit")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? t("admin.events.createEvent") : t("admin.events.editEvent")}
            </DialogTitle>
            <DialogDescription>
              {isCreating ? t("admin.events.createDescription") : t("admin.events.editDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("admin.events.form.name")} *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Innovation Area Berlin 2026"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("admin.events.form.category")} *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Event["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">{t("admin.events.category.open")}</SelectItem>
                    <SelectItem value="future">{t("admin.events.category.future")}</SelectItem>
                    <SelectItem value="past">{t("admin.events.category.past")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("admin.events.form.date")} *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !eventDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventDate ? format(eventDate, "PPP") : t("admin.events.form.selectDate")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={eventDate} onSelect={setEventDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>{t("admin.events.form.deadline")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !deadlineDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadlineDate ? format(deadlineDate, "PPP") : t("admin.events.form.selectDeadline")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={deadlineDate} onSelect={setDeadlineDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("admin.events.form.location")}</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Berlin, Germany"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("admin.events.form.venue")}</Label>
                <Input
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="Messe Berlin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("admin.events.form.maxStartups")}</Label>
              <Input
                type="number"
                value={formData.maxStartups}
                onChange={(e) => setFormData({ ...formData, maxStartups: parseInt(e.target.value) || 6 })}
                min={1}
                max={20}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("admin.events.form.description")}</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setEditDialogOpen(false)}>
                {t("admin.events.cancel")}
              </Button>
              <Button className="flex-1 bg-secondary hover:bg-secondary/90" onClick={handleSave}>
                {isCreating ? t("admin.events.create") : t("admin.events.save")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
