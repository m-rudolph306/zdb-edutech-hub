import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InnovationCardProps {
  name: string;
  description: string;
  categories: string[];
  event?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  AI: "bg-badge-ai text-white",
  VR: "bg-badge-vr text-white",
  Assessment: "bg-badge-assessment text-white",
  Management: "bg-badge-management text-white",
};

const InnovationCard = ({
  name,
  description,
  categories,
  event,
  imageUrl,
  onClick,
}: InnovationCardProps) => {
  return (
    <div 
      className="bg-card rounded-lg shadow-md hover:shadow-hover hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-full h-48 bg-muted flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-muted-foreground text-sm">Image Placeholder</div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-card-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              className={`text-xs ${categoryColors[category] || "bg-muted text-muted-foreground"}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Event participation */}
        {event && (
          <p className="text-xs text-muted-foreground mb-4">
            Participated in: <span className="font-medium">{event}</span>
          </p>
        )}

        {/* Button */}
        <Button 
          variant="outline" 
          className="w-full mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default InnovationCard;
