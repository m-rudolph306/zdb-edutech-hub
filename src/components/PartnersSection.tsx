import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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

const partnerLogos = [
  { name: "Didaktikerverband", logo: "/logos/partners/didacta.svg", alt: "Didaktikerverband" },
  { name: "Startup Verband", logo: "/logos/partners/startup-verband.svg", alt: "Bundesverband Deutsche Startups e.V." },
  { name: "KMK", logo: "/logos/partners/kmk.svg", alt: "Kultusministerkonferenz" },
  { name: "Inventorio", logo: "/logos/partners/inventorio.svg", alt: "Inventorio" },
  { name: "Bündnis für Bildung", logo: "/logos/partners/buendnis.svg", alt: "Bündnis für Bildung e.V." },
  { name: "Forum Bildung Digitalisierung", logo: "/logos/partners/forum-bildung.svg", alt: "Forum Bildung Digitalisierung" },
];

const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* State Education Ministries - "Unsere Adressaten" */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("partners.statesTitle")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("partners.statesSubtitle")}
          </p>
          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {stateLogos.map((state) => (
              <div
                key={state.name}
                className="flex-shrink-0 min-w-[150px] bg-card border border-border rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow group"
              >
                <div className="relative w-full h-20 flex flex-col items-center justify-center gap-2">
                  <img
                    src={state.logo}
                    alt={state.alt}
                    className="max-w-full max-h-14 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-text text-xs text-center text-muted-foreground font-medium';
                        fallback.textContent = state.name;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  <span className="text-xs text-center text-muted-foreground font-medium line-clamp-1">{state.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners and Associations - "Verbände und Partner" */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {t("partners.partnersTitle")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow group"
              >
                <div className="relative w-full h-16 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-text text-sm text-center text-muted-foreground font-medium';
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
