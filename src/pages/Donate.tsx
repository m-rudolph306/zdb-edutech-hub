import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Building, Users, Lightbulb, CreditCard, FileText } from "lucide-react";

const Donate = () => {
  const { t } = useLanguage();

  const impactAreas = [
    {
      icon: Lightbulb,
      titleKey: "donate.impact.innovation.title",
      descriptionKey: "donate.impact.innovation.description",
    },
    {
      icon: Users,
      titleKey: "donate.impact.community.title",
      descriptionKey: "donate.impact.community.description",
    },
    {
      icon: Building,
      titleKey: "donate.impact.events.title",
      descriptionKey: "donate.impact.events.description",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 mt-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-fade-in">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in animate-delay-100">
            {t("donate.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            {t("donate.subtitle")}
          </p>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("donate.impact.title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{t(area.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{t(area.descriptionKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("donate.options.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bank Transfer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {t("donate.bank.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 mb-2 bg-amber-100 border border-amber-300 rounded-lg">
                  <p className="text-amber-800 text-sm font-medium">
                    {t("donate.bank.placeholder")}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">{t("donate.bank.description")}</p>
                <div className="bg-muted p-4 rounded-lg text-sm space-y-1 opacity-60">
                  <p><strong>IBAN:</strong> [IBAN folgt]</p>
                  <p><strong>BIC:</strong> [BIC folgt]</p>
                  <p><strong>{t("donate.bank.recipient")}:</strong> ZDB e.V.</p>
                  <p><strong>{t("donate.bank.reference")}:</strong> Spende</p>
                </div>
              </CardContent>
            </Card>

            {/* Online Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t("donate.online.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{t("donate.online.description")}</p>
                <Button className="w-full" size="lg">
                  {t("donate.online.button")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tax Deductible */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t("donate.tax.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("donate.tax.description")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
