import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    "nav.innovations": "Innovationen",
    "nav.events": "Veranstaltungen",
    "nav.roadshow": "Roadshow",
    "nav.howToApply": "So bewerben",
    "nav.dashboard": "Dashboard",
    "nav.login": "Anmelden",
    "nav.myDashboard": "Mein Dashboard",
    "nav.myApplications": "Meine Bewerbungen",
    "nav.profileSettings": "Profileinstellungen",
    "nav.logout": "Abmelden",
    
    // Home - Hero
    "home.hero.title": "Die Zukunft der digitalen Bildung in Deutschland gestalten",
    "home.hero.subtitle": "Als unabhängiger Think Tank bringen wir politische Visionen und innovative Lösungen durch kuratierte Dialoge zusammen",
    "home.hero.exploreVision": "Unsere Vision entdecken",
    "home.hero.joinInnovation": "Innovation Area beitreten",
    
    // Home - Three Pillars
    "home.pillars.title": "Unsere drei Säulen",
    "home.pillars.policy.title": "Politik & Vision",
    "home.pillars.policy.description": "Wir entwickeln strategische Papiere und Rahmenwerke, die das deutsche Bildungssystem in die Zukunft führen",
    "home.pillars.policy.button": "Positionspapiere lesen",
    "home.pillars.connections.title": "Kuratierte Verbindungen",
    "home.pillars.connections.description": "Wir bringen Bildungsinnovatoren und politische Entscheidungsträger in moderierten, kuratierten Umgebungen zusammen",
    "home.pillars.connections.button": "Unsere Veranstaltungen",
    "home.pillars.hub.title": "Der digitale Hub",
    "home.pillars.hub.description": "Wir bieten den digitalen Raum, in dem sich alle Beteiligten registrieren, informieren und Bildungsinnovationen entdecken können",
    "home.pillars.hub.button": "Innovationen entdecken",
    
    // Home - Roadshow
    "home.roadshow.valueProposition": "Von der Anfrage zur Präsentation in 2-3 Wochen – wir kümmern uns um alles.",
    "home.roadshow.label": "Innovation Area On Demand",
    "home.roadshow.title": "Bringen Sie die Innovation Area zu Ihrer Veranstaltung",
    "home.roadshow.description": "Städte, Kommunen und Konferenzen können unsere kuratierte Innovationsschau als Komplettpaket buchen",
    "home.roadshow.benefit1": "Kuratierte Auswahl von 5-6 Bildungsinnovatoren",
    "home.roadshow.benefit2": "Professioneller Aufbau und Moderation",
    "home.roadshow.benefit3": "Auf Ihre Schwerpunkte zugeschnitten",
    "home.roadshow.button": "Roadshow anfragen",
    
    // Home - CTA
    "home.cta.title": "Bereit zum Entdecken?",
    "home.cta.description": "Entdecken Sie unsere Veranstaltungen, durchstöbern Sie Innovationen oder erfahren Sie, wie Sie Teil der Innovation Area werden",
    "home.cta.viewEvents": "Veranstaltungen",
    "home.cta.browseInnovations": "Innovationen",
    "home.cta.howToApply": "So bewerben",
    
    // Footer
    "footer.description": "Gestaltung der Zukunft der digitalen Bildung in Deutschland durch strategische Vision und kuratierte Verbindungen.",
    "footer.quickLinks": "Schnelllinks",
    "footer.contact": "Kontakt",
    "footer.rights": "Alle Rechte vorbehalten.",
  },
  en: {
    // Navigation
    "nav.innovations": "Innovations",
    "nav.events": "Events",
    "nav.roadshow": "Roadshow",
    "nav.howToApply": "How to Apply",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login",
    "nav.myDashboard": "My Dashboard",
    "nav.myApplications": "My Applications",
    "nav.profileSettings": "Profile Settings",
    "nav.logout": "Logout",
    
    // Home - Hero
    "home.hero.title": "Shaping the Future of Digital Education in Germany",
    "home.hero.subtitle": "As an independent think tank, we bring policy vision and innovative solutions together through curated dialogue",
    "home.hero.exploreVision": "Explore Our Vision",
    "home.hero.joinInnovation": "Join the Innovation Area",
    
    // Home - Three Pillars
    "home.pillars.title": "Our Three Pillars",
    "home.pillars.policy.title": "Policy & Vision",
    "home.pillars.policy.description": "We develop strategic papers and frameworks that guide Germany's education system into the future",
    "home.pillars.policy.button": "Read Our Position Papers",
    "home.pillars.connections.title": "Curated Connections",
    "home.pillars.connections.description": "We bring together education innovators and policy-makers in moderated, curated settings - creating meaningful dialogue beyond transactions",
    "home.pillars.connections.button": "See Our Events",
    "home.pillars.hub.title": "The Digital Hub",
    "home.pillars.hub.description": "We provide the digital space where all stakeholders can register, stay informed, and discover education innovations",
    "home.pillars.hub.button": "Explore Innovations",
    
    // Home - Roadshow
    "home.roadshow.valueProposition": "From inquiry to showcase in 2-3 weeks—we handle everything.",
    "home.roadshow.label": "Innovation Area On Demand",
    "home.roadshow.title": "Bring the Innovation Area to Your Event",
    "home.roadshow.description": "Cities, municipalities, and conferences can book our curated innovation showcase as a complete package",
    "home.roadshow.benefit1": "Curated selection of 5-6 education innovators",
    "home.roadshow.benefit2": "Professional setup and moderation",
    "home.roadshow.benefit3": "Customized to your focus areas",
    "home.roadshow.button": "Request a Roadshow",
    
    // Home - CTA
    "home.cta.title": "Ready to Explore?",
    "home.cta.description": "Discover our events, browse innovations, or learn how to become part of the Innovation Area",
    "home.cta.viewEvents": "View Events",
    "home.cta.browseInnovations": "Browse Innovations",
    "home.cta.howToApply": "How to Apply",
    
    // Footer
    "footer.description": "Shaping the future of digital education in Germany through strategic vision and curated connections.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored === "en" || stored === "de") ? stored : "de";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
