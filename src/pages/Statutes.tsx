import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Download, Scale, Users, Target, Building } from "lucide-react";

const Statutes = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Target,
      titleKey: "statutes.section.purpose.title",
      contentKey: "statutes.section.purpose.content",
    },
    {
      icon: Users,
      titleKey: "statutes.section.membership.title",
      contentKey: "statutes.section.membership.content",
    },
    {
      icon: Building,
      titleKey: "statutes.section.organization.title",
      contentKey: "statutes.section.organization.content",
    },
    {
      icon: Scale,
      titleKey: "statutes.section.governance.title",
      contentKey: "statutes.section.governance.content",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 mt-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            {t("statutes.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            {t("statutes.subtitle")}
          </p>
          <Button size="lg" className="animate-fade-in animate-delay-200">
            <Download className="h-4 w-4 mr-2" />
            {t("statutes.downloadPdf")}
          </Button>
        </div>
      </section>

      {/* Statutes Overview */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {t(section.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{t(section.contentKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t("statutes.legal.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t("statutes.legal.content")}</p>
              <div className="text-sm text-muted-foreground">
                <p><strong>{t("statutes.legal.registration")}:</strong> VR 12345 B</p>
                <p><strong>{t("statutes.legal.court")}:</strong> Amtsgericht Berlin-Charlottenburg</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Statutes;
