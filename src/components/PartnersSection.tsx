import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Logo configuration - replace placeholder paths with actual logo imports
const stateLogos = [
  { name: "Baden-Württemberg", logo: "/logos/states/baden-wuerttemberg.svg", alt: "Baden-Württemberg Kultusministerium" },
  { name: "Bayern", logo: "/logos/states/bayern.svg", alt: "Bayerisches Staatsministerium für Unterricht und Kultus" },
  { name: "Berlin", logo: "/logos/states/berlin.svg", alt: "Senatsverwaltung für Bildung, Jugend und Familie Berlin" },
  { name: "Brandenburg", logo: "/logos/states/brandenburg.svg", alt: "Ministerium für Bildung, Jugend und Sport Brandenburg" },
  { name: "Bremen", logo: "/logos/states/bremen.svg", alt: "Senatorin für Kinder und Bildung Bremen" },
  { name: "Hamburg", logo: "/logos/states/hamburg.svg", alt: "Behörde für Schule und Berufsbildung Hamburg" },
  { name: "Hessen", logo: "/logos/states/hessen.svg", alt: "Hessisches Kultusministerium" },
  { name: "Mecklenburg-Vorpommern", logo: "/logos/states/mecklenburg-vorpommern.svg", alt: "Ministerium für Bildung und Kindertagesförderung MV" },
  { name: "Niedersachsen", logo: "/logos/states/niedersachsen.svg", alt: "Niedersächsisches Kultusministerium" },
  { name: "Nordrhein-Westfalen", logo: "/logos/states/nrw.svg", alt: "Ministerium für Schule und Bildung NRW" },
  { name: "Rheinland-Pfalz", logo: "/logos/states/rheinland-pfalz.svg", alt: "Ministerium für Bildung Rheinland-Pfalz" },
  { name: "Saarland", logo: "/logos/states/saarland.svg", alt: "Ministerium für Bildung und Kultur Saarland" },
  { name: "Sachsen", logo: "/logos/states/sachsen.svg", alt: "Sächsisches Staatsministerium für Kultus" },
  { name: "Sachsen-Anhalt", logo: "/logos/states/sachsen-anhalt.svg", alt: "Ministerium für Bildung Sachsen-Anhalt" },
  { name: "Schleswig-Holstein", logo: "/logos/states/schleswig-holstein.svg", alt: "Ministerium für Allgemeine und Berufliche Bildung SH" },
  { name: "Thüringen", logo: "/logos/states/thueringen.svg", alt: "Thüringer Ministerium für Bildung, Jugend und Sport" },
  { name: "Kultusministerkonferenz", logo: "/logos/states/kmk.svg", alt: "Kultusministerkonferenz" },
  { name: "BMBF", logo: "/logos/states/bmbf.svg", alt: "Bundesministerium für Bildung und Forschung" },
];

// Bildungspartner (Education Partners) - matching official website
const bildungspartner = [
  { name: "EduAct", logo: "https://zukunft-digitale-bildung.de/wp-content/uploads/2023/06/62d47f65817b056708ca703d_Asset-1@10x-1.png", alt: "EduAct" },
  { name: "Eduvation", logo: "https://www.eduvation.de/wp-content/uploads/2021/10/eduvation-logo.svg", alt: "Eduvation" },
  { name: "Education 360°", logo: "https://education360.de/wp-content/uploads/2020/09/education-360-logo.png", alt: "Education 360°" },
];

const PartnersSection = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* State Education Ministries - "Unsere Adressaten" */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("partners.statesTitle")}
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("partners.statesSubtitle")}
          </p>

          {/* Scrollable container */}
          <div className="relative group/scroll">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 border border-border/50 shadow-md opacity-0 group-hover/scroll:opacity-100 hover:bg-muted transition-all duration-300 -translate-x-1/2"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/90 border border-border/50 shadow-md opacity-0 group-hover/scroll:opacity-100 hover:bg-muted transition-all duration-300 translate-x-1/2"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Scrollable row */}
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scroll-smooth px-4 py-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {stateLogos.map((state) => (
                <div
                  key={state.name}
                  className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-default"
                  title={state.alt}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <img
                      src={state.logo}
                      alt={state.alt}
                      className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-text text-sm text-center text-muted-foreground font-medium';
                          fallback.textContent = state.name.slice(0, 3);
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground text-center leading-tight w-24 line-clamp-2">
                    {state.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bildungspartner - Clean centered grid */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("partners.partnersTitle")}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {bildungspartner.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center justify-center"
              >
                <div className="h-16 md:h-20 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className="max-h-full max-w-[180px] md:max-w-[220px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-text text-lg font-medium text-muted-foreground';
                        fallback.textContent = partner.name;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">
            {t("partners.cta.title")}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t("partners.cta.description")}
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            asChild 
            className="px-8 py-4 rounded-lg hover:scale-105 transition-all"
          >
            <Link to="/apply">{t("partners.cta.button")}</Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default PartnersSection;
