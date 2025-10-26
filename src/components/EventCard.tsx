import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  name: string;
  date: string;
  location: string;
  description?: string;
}

const EventCard = ({ name, date, location, description }: EventCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-border">
      <div className="flex items-start gap-4 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="font-semibold">{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 text-card-foreground">{name}</h3>

      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}

      <a
        href="#"
        className="text-sm font-medium text-primary hover:underline inline-block"
      >
        View Details →
      </a>
    </div>
  );
};

export default EventCard;
