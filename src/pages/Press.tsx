import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Newspaper, Download, Mail, Phone } from "lucide-react";

const Press = () => {
  const { t } = useLanguage();

  const pressReleases = [
    {
      id: "1",
      date: "2025-12-01",
      titleDe: "ZDB startet neue Bildungsinitiative",
      titleEn: "ZDB launches new education initiative",
      summaryDe: "Der Zukunftsraum Digitale Bildung präsentiert wegweisende Projekte für digitales Lernen.",
      summaryEn: "The Digital Education Future Space presents pioneering projects for digital learning.",
    },
    {
      id: "2",
      date: "2025-10-15",
      titleDe: "Innovation Area auf der didacta 2025",
      titleEn: "Innovation Area at didacta 2025",
      summaryDe: "Erfolgreiche Präsentation von 12 EdTech-Startups auf Deutschlands größter Bildungsmesse.",
      summaryEn: "Successful presentation of 12 EdTech startups at Germany's largest education fair.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 mt-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            {t("press.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            {t("press.subtitle")}
          </p>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-12 px-4 md:px-6 bg-muted/30 border-b">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {t("press.contact.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t("press.contact.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" asChild>
                  <a href="mailto:presse@zdb.de">
                    <Mail className="h-4 w-4 mr-2" />
                    presse@zdb.de
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+4930123456789">
                    <Phone className="h-4 w-4 mr-2" />
                    +49 30 123 456 789
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("press.releases.title")}</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={release.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Newspaper className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {t("language") === "de" ? release.titleDe : release.titleEn}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{release.date}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {t("language") === "de" ? release.summaryDe : release.summaryEn}
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t("press.download")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("press.kit.title")}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t("press.kit.description")}</p>
          <Button size="lg">
            <Download className="h-4 w-4 mr-2" />
            {t("press.kit.download")}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
