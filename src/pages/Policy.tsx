import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Newspaper, ExternalLink, Calendar, Download } from "lucide-react";

type PolicyType = "all" | "position" | "press";

interface PolicyItem {
  id: string;
  type: "position" | "press";
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  downloadUrl?: string;
  externalUrl?: string;
}

const policyItems: PolicyItem[] = [
  {
    id: "1",
    type: "position",
    title: "Digitale Bildung 2030: Eine strategische Vision",
    titleEn: "Digital Education 2030: A Strategic Vision",
    description: "Unser Positionspapier zur Zukunft der digitalen Bildung in Deutschland mit konkreten Handlungsempfehlungen für Bund und Länder.",
    descriptionEn: "Our position paper on the future of digital education in Germany with concrete recommendations for federal and state governments.",
    date: "2025-11-15",
    downloadUrl: "#",
  },
  {
    id: "2",
    type: "position",
    title: "KI in der Schule: Chancen und Herausforderungen",
    titleEn: "AI in Schools: Opportunities and Challenges",
    description: "Analyse des Potenzials künstlicher Intelligenz im Bildungsbereich und Empfehlungen für einen verantwortungsvollen Einsatz.",
    descriptionEn: "Analysis of the potential of artificial intelligence in education and recommendations for responsible implementation.",
    date: "2025-09-20",
    downloadUrl: "#",
  },
  {
    id: "3",
    type: "press",
    title: "ZDB im Interview: Bildungsinnovation braucht Dialog",
    titleEn: "ZDB Interview: Education Innovation Needs Dialogue",
    description: "Unser Geschäftsführer im Gespräch mit dem Tagesspiegel über die Bedeutung von Think Tanks in der Bildungspolitik.",
    descriptionEn: "Our CEO in conversation with Tagesspiegel on the importance of think tanks in education policy.",
    date: "2025-10-05",
    externalUrl: "#",
  },
  {
    id: "4",
    type: "position",
    title: "Lehrerfortbildung Digital: Bestandsaufnahme und Perspektiven",
    titleEn: "Digital Teacher Training: Status and Perspectives",
    description: "Umfassende Analyse der aktuellen Lehrerfortbildungslandschaft mit Fokus auf digitale Kompetenzen.",
    descriptionEn: "Comprehensive analysis of the current teacher training landscape with focus on digital competencies.",
    date: "2025-08-12",
    downloadUrl: "#",
  },
  {
    id: "5",
    type: "press",
    title: "Bildung neu denken - Artikel in der ZEIT",
    titleEn: "Rethinking Education - Article in ZEIT",
    description: "Gastbeitrag über die Notwendigkeit eines Paradigmenwechsels in der deutschen Bildungslandschaft.",
    descriptionEn: "Guest article on the need for a paradigm shift in the German education landscape.",
    date: "2025-07-28",
    externalUrl: "#",
  },
  {
    id: "6",
    type: "position",
    title: "Datenschutz und Bildungstechnologie",
    titleEn: "Data Protection and Education Technology",
    description: "Leitfaden für Schulen und Bildungseinrichtungen zum datenschutzkonformen Einsatz digitaler Werkzeuge.",
    descriptionEn: "Guide for schools and educational institutions on GDPR-compliant use of digital tools.",
    date: "2025-06-10",
    downloadUrl: "#",
  },
  {
    id: "7",
    type: "press",
    title: "Podcast: Die Zukunft des Lernens",
    titleEn: "Podcast: The Future of Learning",
    description: "Unser Expertenteam diskutiert aktuelle Trends und Entwicklungen im Bildungsbereich.",
    descriptionEn: "Our expert team discusses current trends and developments in education.",
    date: "2025-05-22",
    externalUrl: "#",
  },
  {
    id: "8",
    type: "position",
    title: "Bildungsgerechtigkeit im digitalen Zeitalter",
    titleEn: "Educational Equity in the Digital Age",
    description: "Analyse der digitalen Kluft in deutschen Schulen und Handlungsempfehlungen für mehr Chancengleichheit.",
    descriptionEn: "Analysis of the digital divide in German schools and recommendations for greater equality.",
    date: "2025-04-18",
    downloadUrl: "#",
  },
];

const Policy = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<PolicyType>("all");

  const filteredItems = policyItems.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTitle = (item: PolicyItem) => (language === "de" ? item.title : item.titleEn);
  const getDescription = (item: PolicyItem) => (language === "de" ? item.description : item.descriptionEn);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 mt-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            {t("policy.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            {t("policy.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 md:px-6 bg-muted/30 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="flex items-center gap-2"
            >
              {t("policy.filter.all")}
              <Badge variant="secondary" className="ml-1">
                {policyItems.length}
              </Badge>
            </Button>
            <Button
              variant={filter === "position" ? "default" : "outline"}
              onClick={() => setFilter("position")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {t("policy.filter.position")}
              <Badge variant="secondary" className="ml-1">
                {policyItems.filter((i) => i.type === "position").length}
              </Badge>
            </Button>
            <Button
              variant={filter === "press" ? "default" : "outline"}
              onClick={() => setFilter("press")}
              className="flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" />
              {t("policy.filter.press")}
              <Badge variant="secondary" className="ml-1">
                {policyItems.filter((i) => i.type === "press").length}
              </Badge>
            </Button>
          </div>
        </div>
      </section>

      {/* Policy Items Grid */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-all hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {item.type === "position" ? (
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Newspaper className="h-5 w-5 text-secondary" />
                        </div>
                      )}
                      <Badge variant={item.type === "position" ? "default" : "secondary"}>
                        {item.type === "position" ? t("policy.type.position") : t("policy.type.press")}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-3 leading-snug">{getTitle(item)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {getDescription(item)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(item.date)}
                    </div>
                    {item.downloadUrl ? (
                      <Button size="sm" variant="outline" asChild>
                        <a href={item.downloadUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          {t("policy.download")}
                        </a>
                      </Button>
                    ) : item.externalUrl ? (
                      <Button size="sm" variant="outline" asChild>
                        <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("policy.readMore")}
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("policy.noResults")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {t("policy.cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("policy.cta.description")}
          </p>
          <Button size="lg" asChild className="px-8 py-6 text-lg">
            <a href="mailto:policy@zdb.de">{t("policy.cta.button")}</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policy;
