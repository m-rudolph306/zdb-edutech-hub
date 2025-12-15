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
  { name: "Didacta Verband", logo: "/logos/partners/didacta.svg", alt: "Didacta Verband e.V." },
  { name: "Bündnis für Bildung", logo: "/logos/partners/buendnis.svg", alt: "Bündnis für Bildung e.V." },
  { name: "Forum Bildung Digitalisierung", logo: "/logos/partners/forum-bildung.svg", alt: "Forum Bildung Digitalisierung" },
  { name: "Startup Verband", logo: "/logos/partners/startup-verband.svg", alt: "Bundesverband Deutsche Startups e.V." },
];

const sponsorLogos = [
  { name: "CANCOM", logo: "/logos/sponsors/cancom.svg", alt: "CANCOM", tier: "main" },
  { name: "Inventorio", logo: "/logos/sponsors/inventorio.svg", alt: "Inventorio", tier: "sponsor" },
];

const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* State Education Ministries */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("partners.statesTitle")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("partners.statesSubtitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {stateLogos.map((state) => (
              <div
                key={state.name}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow group"
              >
                <div className="relative w-full h-16 flex items-center justify-center">
                  {/* Temporary placeholder - replace with actual logo */}
                  <img
                    src={state.logo}
                    alt={state.alt}
                    className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      // Fallback to text if logo not found
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
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners and Associations */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("partners.partnersTitle")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow group"
              >
                <div className="relative w-full h-20 flex items-center justify-center">
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

        {/* Sponsors */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("partners.sponsorsTitle")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("partners.sponsorsSubtitle")}
          </p>
          <div className="flex flex-col items-center gap-8">
            {/* Main Sponsor */}
            <div className="bg-card border-2 border-primary/20 rounded-lg p-8 w-full max-w-md">
              <div className="text-xs font-semibold text-primary text-center mb-4">
                {t("partners.mainSponsor")}
              </div>
              <div className="relative w-full h-24 flex items-center justify-center">
                <img
                  src={sponsorLogos.find(s => s.tier === "main")?.logo}
                  alt={sponsorLogos.find(s => s.tier === "main")?.alt}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-text text-lg text-center font-bold text-muted-foreground';
                      fallback.textContent = sponsorLogos.find(s => s.tier === "main")?.name || '';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>

            {/* Regular Sponsors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {sponsorLogos.filter(s => s.tier === "sponsor").map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="bg-card border border-border rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-16 flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.alt}
                      className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-text text-base text-center font-semibold text-muted-foreground';
                          fallback.textContent = sponsor.name;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartnersSection;
