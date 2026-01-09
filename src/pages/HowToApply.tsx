import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoginModal from "@/components/LoginModal";
import SignupRequestModal from "@/components/SignupRequestModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  CheckCircle2,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  Calendar,
  Network,
  Lightbulb,
  Shield,
  Zap,
  MessageSquare,
  Clock,
  UserCheck,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const HowToApply = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupRequestOpen, setIsSignupRequestOpen] = useState(false);

  const selectionCriteria = [
    {
      icon: Target,
      title: "Fokus auf Bildungstechnologie",
      description:
        "Ihre Lösung muss direkt Herausforderungen im Bereich Lehren, Lernen oder Bildungsverwaltung adressieren.",
    },
    {
      icon: Award,
      title: "Innovation & Einzigartigkeit",
      description:
        "Zeigen Sie, wie sich Ihre Lösung von bestehenden Alternativen abhebt und einzigartigen Mehrwert bietet.",
    },
    {
      icon: TrendingUp,
      title: "Nachgewiesene Erfolge",
      description:
        "Belegen Sie erfolgreiche Implementierungen in Bildungseinrichtungen oder dokumentierte Pilotprojekt-Ergebnisse.",
    },
    {
      icon: Users,
      title: "Skalierungspotenzial",
      description:
        "Ihre Technologie sollte auf mehrere Institutionen skalierbar und an verschiedene Bildungskontexte anpassbar sein.",
    },
    {
      icon: Globe,
      title: "Relevanz für den deutschen Markt",
      description:
        "Übereinstimmung mit deutschen Bildungsstandards, Datenschutzanforderungen und kulturellem Kontext.",
    },
  ];

  const twoStageProcess = [
    {
      stage: "Stufe 1",
      icon: Clock,
      title: "Registrierungsanfrage",
      description:
        "Stellen Sie eine Registrierungsanfrage mit grundlegenden Informationen zu Ihrem Unternehmen und Ihrer Innovation. Unser Team prüft Ihre Anfrage innerhalb von 5-7 Werktagen.",
      steps: [
        "Unternehmensdaten eingeben",
        "Kurzbeschreibung Ihrer Innovation",
        "Prüfung durch ZDB-Team",
        "Genehmigung & Kontoeröffnung",
      ],
    },
    {
      stage: "Stufe 2",
      icon: FileCheck,
      title: "Event-Bewerbung",
      description:
        "Nach Genehmigung Ihres Kontos können Sie sich für konkrete Innovation Area Events bewerben. Wählen Sie die passenden Veranstaltungen und reichen Sie Ihre vollständige Bewerbung ein.",
      steps: [
        "Anmeldung mit genehmigtem Konto",
        "Auswahl der Events",
        "Vollständige Bewerbung einreichen",
        "Teilnahme an Events",
      ],
    },
  ];

  const benefits = [
    {
      icon: Network,
      title: "Strategisches Networking",
      description:
        "Engagieren Sie sich mit Bildungsakteuren und Entscheidungsträgern in kuratierten, moderierten Settings.",
    },
    {
      icon: Calendar,
      title: "Event-Teilnahme",
      description:
        "Präsentieren Sie Ihre Innovation bei exklusiven Innovation Area Events in deutschen Großstädten.",
    },
    {
      icon: Lightbulb,
      title: "Sichtbarkeit & Reichweite",
      description:
        "Prominente Platzierung auf unserem Digital Hub mit detailliertem Unternehmensprofil und Lösungsdarstellung.",
    },
    {
      icon: MessageSquare,
      title: "Direkte Lead-Generierung",
      description:
        "Interessierte Institutionen können Sie direkt über unseren Digital Hub entdecken und kontaktieren.",
    },
    {
      icon: Shield,
      title: "Qualitätssiegel",
      description:
        "Die Mitgliedschaft in der Innovation Area signalisiert Qualität und Zuverlässigkeit gegenüber potenziellen Kunden.",
    },
    {
      icon: Zap,
      title: "Marktintelligenz",
      description:
        "Gewinnen Sie Einblicke in Markttrends, Kundenbedürfnisse und die Wettbewerbslandschaft.",
    },
  ];

  const handleStartApplication = () => {
    if (isAuthenticated) {
      navigate("/apply/select-event");
    } else {
      setIsSignupRequestOpen(true);
    }
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            Teil der Innovation Area werden
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Präsentieren Sie Ihre Bildungstechnologie Deutschlands führenden Institutionen und Entscheidungsträgern bei unseren exklusiven Events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
            <Button
              size="lg"
              onClick={handleStartApplication}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              Registrierungsanfrage stellen
            </Button>
            {!isAuthenticated && (
              <Button
                size="lg"
                variant="outline"
                onClick={handleLogin}
                className="text-lg px-8 py-6"
              >
                Bereits genehmigt? Anmelden
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Two-Stage Process */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Unser Zwei-Stufen-Prozess
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Die Innovation Area setzt auf kuratierte Qualität. Deshalb durchlaufen alle Innovatoren einen zweistufigen Bewerbungsprozess.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {twoStageProcess.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                          {stage.stage}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {stage.description}
                    </p>
                    <ul className="space-y-3">
                      {stage.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="text-sm text-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                    {index === 0 && (
                      <div className="mt-6 pt-6 border-t">
                        <Button
                          onClick={handleStartApplication}
                          className="w-full bg-secondary hover:bg-secondary/90"
                        >
                          Jetzt Registrierungsanfrage stellen
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is Innovation Area */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Was ist die Innovation Area?
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Die Innovation Area ist Deutschlands führender Digital Hub, wo Vision auf Innovation trifft.
              Als Teil der ZDB-Think-Tank-Mission kuratieren wir eine sorgfältig ausgewählte Präsentation
              innovativer Lösungen, die Lehren, Lernen und Bildungsverwaltung in Deutschland transformieren.
            </p>
            <p className="text-lg">
              Durch unsere exklusiven Events in deutschen Großstädten bringen wir Innovatoren, Pädagogen,
              Administratoren und politische Entscheidungsträger zusammen, um die neuesten Entwicklungen
              im EdTech-Bereich zu erkunden. Jedes Innovation Area Event bietet Live-Demonstrationen,
              Networking-Möglichkeiten und direkten Zugang zu Entscheidungsträgern aus Bildungseinrichtungen.
            </p>
            <p className="text-lg">
              Unser strenger Auswahlprozess stellt sicher, dass nur die wirkungsvollsten, skalierbarsten
              und innovativsten Lösungen präsentiert werden. Durch die Mitgliedschaft in der Innovation Area
              gewinnt Ihr Unternehmen beispiellose Sichtbarkeit auf dem deutschen Bildungsmarkt.
            </p>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Auswahlkriterien
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectionCriteria.map((criterion, index) => {
              const Icon = criterion.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-secondary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">
                          {criterion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            Vorteile der Mitgliedschaft
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Bereit, die Bildung zu transformieren?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Werden Sie Teil der Innovation Area und engagieren Sie sich mit Deutschlands Bildungseinrichtungen 
            durch kuratierte Events und strategisches Networking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={handleStartApplication}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl px-12 py-8 hover:scale-105 transition-transform shadow-lg"
            >
              Registrierungsanfrage starten
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Fragen? Kontaktieren Sie uns unter{" "}
            <a
              href="mailto:apply@innovationarea.de"
              className="text-primary hover:underline"
            >
              apply@innovationarea.de
            </a>
          </p>
        </div>
      </section>

      <Footer />
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <SignupRequestModal open={isSignupRequestOpen} onOpenChange={setIsSignupRequestOpen} />
    </div>
  );
};

export default HowToApply;
