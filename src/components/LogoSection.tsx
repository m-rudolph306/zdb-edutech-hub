import { Logo } from "@/data/logos";

interface LogoSectionProps {
  title: string;
  subtitle?: string;
  logos: Logo[];
  variant?: "grid" | "carousel" | "small";
}

const LogoSection = ({ title, subtitle, logos, variant = "grid" }: LogoSectionProps) => {
  const getGridClass = () => {
    switch (variant) {
      case "small":
        return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6";
      case "carousel":
        return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 md:gap-6";
      default:
        return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8";
    }
  };

  const getLogoSize = () => {
    switch (variant) {
      case "small":
        return "h-12 md:h-14";
      default:
        return "h-14 md:h-16";
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground animate-fade-in">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-muted-foreground text-center mb-8 md:mb-10 max-w-3xl mx-auto animate-fade-in">
            {subtitle}
          </p>
        )}
        <div className={`${getGridClass()} animate-fade-in`}>
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center p-3 md:p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
              title={logo.name}
            >
              {logo.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.name}
                  className={`${getLogoSize()} w-auto object-contain grayscale hover:grayscale-0 transition-all`}
                />
              ) : (
                <div className={`${getLogoSize()} flex items-center justify-center`}>
                  <span className="text-xs md:text-sm text-muted-foreground text-center font-medium line-clamp-2 px-1">
                    {logo.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
