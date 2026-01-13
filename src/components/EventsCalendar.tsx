import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
}

interface EventsCalendarProps {
  events: Event[];
}

const EventsCalendar = ({ events }: EventsCalendarProps) => {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = language === "de"
    ? ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayNames = language === "de"
    ? ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month, 1).getDay();
    // Convert Sunday (0) to 6, and shift others (Mon=0, Tue=1, etc.)
    return day === 0 ? 6 : day - 1;
  };

  const getEventsForDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = new Date();

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const renderDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const hasEvents = dayEvents.length > 0;

      days.push(
        <div
          key={day}
          className={`
            relative h-10 flex flex-col items-center justify-center rounded-md text-sm
            ${isToday(day) ? "bg-primary text-primary-foreground font-bold" : ""}
            ${hasEvents && !isToday(day) ? "bg-secondary/20" : ""}
            ${!hasEvents && !isToday(day) ? "hover:bg-muted" : ""}
          `}
          title={dayEvents.map((e) => e.name).join(", ")}
        >
          <span>{day}</span>
          {hasEvents && (
            <div className="absolute bottom-1 flex gap-0.5">
              {dayEvents.slice(0, 3).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full ${isToday(day) ? "bg-primary-foreground" : "bg-secondary"}`}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Get events for current month
  const currentMonthEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <Button variant="ghost" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs text-muted-foreground font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>

      {/* Events for current month */}
      {currentMonthEvents.length > 0 && (
        <div className="pt-4 border-t space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {language === "de" ? "Events in diesem Monat" : "Events this month"}
          </p>
          {currentMonthEvents
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{event.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
                      day: "numeric",
                      month: "short",
                    })} - {event.location}
                  </p>
                </div>
                <Badge variant={event.category === "open" ? "default" : "secondary"} className="ml-2 shrink-0">
                  {event.category === "open" ? (language === "de" ? "Offen" : "Open") : (language === "de" ? "Geplant" : "Planned")}
                </Badge>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
