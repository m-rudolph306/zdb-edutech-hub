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
    // Top Bar Navigation
    "nav.topbar.press": "Presse",
    "nav.topbar.statutes": "Satzung",
    "nav.topbar.donate": "Spenden",
    "nav.topbar.contact": "Kontakt",
    
    // Main Navigation
    "nav.policy": "Policy",
    "nav.policy.readPapers": "Positionspapiere lesen",
    "nav.events": "Veranstaltungen",
    "nav.events.upcoming": "Kommende Events",
    "nav.events.apply": "Jetzt bewerben",
    "nav.digitalHub": "Digital Hub",
    "nav.digitalHub.about": "Über den Hub",
    "nav.digitalHub.apply": "Jetzt bewerben",
    "nav.roadshow": "Roadshow",
    "nav.roadshow.request": "Roadshow anfragen",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "nav.dashboard": "Dashboard",
    "nav.myDashboard": "Mein Dashboard",
    "nav.myApplications": "Meine Bewerbungen",
    "nav.profileSettings": "Profileinstellungen",
    "nav.logout": "Abmelden",
    
    // Home - Hero
    "home.hero.slogan": "Für eine chancengerechte, nachhaltige und zukunftsfähige Bildung für alle",
    "home.hero.coreStatement": "Wir verbinden Politik und Innovation",
    "home.hero.thinkTankDescription": "Als unabhängiger Think Tank bringen wir politische Vision und innovative Lösungen durch gezielten Dialog zusammen",
    "home.hero.exploreVision": "Unsere Vision entdecken",
    "home.hero.joinInnovation": "Innovation Area beitreten",
    
    // Home - Three Pillars
    "home.pillars.title": "Unsere drei Säulen",
    "home.pillars.policy.title": "Policy Papers & Vision",
    "home.pillars.policy.description": "Positionspapiere, die unser Bildungssystem in die Zukunft führen",
    "home.pillars.policy.button": "Positionspapiere lesen",
    "home.pillars.events.title": "Events & Roadshows",
    "home.pillars.events.description": "Wir bringen Bildungsinnovatoren und politische Entscheidungsträger in moderierten, kuratierten Umgebungen zusammen",
    "home.pillars.events.button": "Events ansehen",
    "home.pillars.hub.title": "Digital Hub",
    "home.pillars.hub.description": "Wir bieten den digitalen Raum, in dem sich alle Beteiligten registrieren, informieren und Bildungsinnovationen entdecken können",
    "home.pillars.hub.button": "Zum Hub",
    
    // Home - Roadshow
    "home.roadshow.valueProposition": "Von der Anfrage zur Präsentation in 2-3 Wochen – wir kümmern uns um alles.",
    "home.roadshow.label": "Innovation Area On Demand",
    "home.roadshow.title": "Bringen Sie die Innovation Area zu Ihrer Veranstaltung",
    "home.roadshow.description": "Städte, Kommunen und Konferenzen können unsere kuratierte Innovationsschau als Komplettpaket buchen",
    "home.roadshow.benefit1": "Kuratierte Auswahl von 5-6 Bildungsinnovatoren",
    "home.roadshow.benefit2": "Professioneller Aufbau und Moderation",
    "home.roadshow.benefit3": "Auf Ihre Schwerpunkte zugeschnitten",
    "home.roadshow.button": "Roadshow anfragen",
    
    // Home - Logo Sections
    "home.logos.ministries.title": "Für wen wir arbeiten",
    "home.logos.partners.title": "Unsere Partner und Verbände",
    "home.logos.supporters.title": "Unsere Unterstützer",
    "home.logos.supporters.subtitle": "Wir sind öffentlich und spendenfinanziert. Wir bedanken uns bei zahlreichen Unterstützern, vielen Einzelspendern und insbesondere bei unseren institutionellen Förderern:",
    
    // Partners Section
    "partners.statesTitle": "Unsere Adressaten",
    "partners.statesSubtitle": "Wir arbeiten mit allen 16 Bundesländern und dem BMBF zusammen, um digitale Bildung voranzutreiben",
    "partners.partnersTitle": "Verbände und Partner",
    "partners.cta.title": "Werden Sie Teil unserer Mission",
    "partners.cta.description": "Gemeinsam gestalten wir die Zukunft der digitalen Bildung in Deutschland",
    "partners.cta.button": "Jetzt bewerben",
    
    // Home - CTA
    "home.cta.title": "Bereit zum Entdecken?",
    "home.cta.description": "Entdecken Sie unsere Veranstaltungen, durchstöbern Sie Innovationen oder erfahren Sie, wie Sie Teil der Innovation Area werden",
    "home.cta.viewEvents": "Veranstaltungen",
    "home.cta.browseInnovations": "Innovationen",
    "home.cta.howToApply": "So bewerben",
    
    // Policy Page
    "policy.title": "Policy Übersicht",
    "policy.subtitle": "Unsere Positionspapiere und Medienbeiträge zur Zukunft der digitalen Bildung",
    "policy.filter.all": "Alle anzeigen",
    "policy.filter.position": "Positionspapiere",
    "policy.filter.press": "Presseauftritte",
    "policy.type.position": "Positionspapier",
    "policy.type.press": "Presseauftritt",
    "policy.download": "Herunterladen",
    "policy.readMore": "Weiterlesen",
    "policy.noResults": "Keine Einträge gefunden",
    "policy.cta.title": "Interesse an unserer Arbeit?",
    "policy.cta.description": "Kontaktieren Sie uns für Medienanfragen, Kooperationen oder weitere Informationen zu unseren Positionen.",
    "policy.cta.button": "Kontakt aufnehmen",
    
    // Events Page
    "events.title": "Innovation Area Events",
    "events.subtitle": "Erleben Sie die Innovation Area auf unseren Veranstaltungen in ganz Deutschland, wo Bildungsinnovatoren und Entscheidungsträger in kuratierten, moderierten Settings zusammenkommen.",
    "events.section.open": "Offene Anmeldungen",
    "events.section.open.description": "Bewerben Sie sich jetzt für diese Events. Bewerbungsfrist: 31. Januar 2026.",
    "events.section.future": "Zukünftige Veranstaltungen",
    "events.section.future.description": "Diese Events sind geplant. Die Bewerbungsphase beginnt am 1. Mai 2026.",
    "events.section.past": "Vergangene Events",
    "events.section.past.description": "Erfolgreiche Innovation Area Events aus der Vergangenheit.",
    "events.status.open": "Bewerbung offen",
    "events.status.comingSoon": "Demnächst",
    "events.status.completed": "Abgeschlossen",
    "events.round1": "Runde 1",
    "events.round2": "Runde 2",
    "events.deadline": "Bewerbungsfrist",
    "events.applyNow": "Jetzt bewerben",
    "events.learnMore": "Mehr erfahren",
    "events.viewRecap": "Rückblick ansehen",
    "events.registrationOpens": "Anmeldung startet",
    "events.cta.title": "Möchten Sie teilnehmen?",
    "events.cta.description": "Präsentieren Sie Ihre Innovation auf unseren kommenden Events und treten Sie in Dialog mit Bildungsexperten, Institutionen und Entscheidungsträgern in ganz Deutschland.",
    "events.sponsorAcknowledgment": "Die Innovation Area Roadmap 2026 ist finanziell gesichert durch unsere Sponsoren: Cancom und Inventorio",
    
    // Footer
    "footer.description": "Gestaltung der Zukunft der digitalen Bildung in Deutschland durch strategische Vision und kuratierte Verbindungen.",
    "footer.quickLinks": "Schnelllinks",
    "footer.contact": "Kontakt",
    "footer.rights": "Alle Rechte vorbehalten.",
  },
  en: {
    // Top Bar Navigation
    "nav.topbar.press": "Press",
    "nav.topbar.statutes": "Statutes",
    "nav.topbar.donate": "Donate",
    "nav.topbar.contact": "Contact",
    
    // Main Navigation
    "nav.policy": "Policy",
    "nav.policy.readPapers": "Read Position Papers",
    "nav.events": "Events",
    "nav.events.upcoming": "Upcoming Events",
    "nav.events.apply": "Apply Now",
    "nav.digitalHub": "Digital Hub",
    "nav.digitalHub.about": "About Hub",
    "nav.digitalHub.apply": "Apply Now",
    "nav.roadshow": "Roadshow",
    "nav.roadshow.request": "Request a Roadshow",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.dashboard": "Dashboard",
    "nav.myDashboard": "My Dashboard",
    "nav.myApplications": "My Applications",
    "nav.profileSettings": "Profile Settings",
    "nav.logout": "Logout",
    
    // Home - Hero
    "home.hero.slogan": "For equitable, sustainable, and future-ready education for all",
    "home.hero.coreStatement": "We Connect Politics and Innovation",
    "home.hero.thinkTankDescription": "As an independent think tank, we bring policy vision and innovative solutions together through targeted dialogue",
    "home.hero.exploreVision": "Explore Our Vision",
    "home.hero.joinInnovation": "Join the Innovation Area",

    // Home - Three Pillars
    "home.pillars.title": "Our Three Pillars",
    "home.pillars.policy.title": "Policy Papers & Vision",
    "home.pillars.policy.description": "Position papers that guide our education system into the future",
    "home.pillars.policy.button": "Read Position Papers",
    "home.pillars.events.title": "Events & Roadshows",
    "home.pillars.events.description": "We bring together education innovators and policy-makers in moderated, curated settings",
    "home.pillars.events.button": "View Events",
    "home.pillars.hub.title": "Digital Hub",
    "home.pillars.hub.description": "We provide the digital space where all stakeholders can register, stay informed, and discover education innovations",
    "home.pillars.hub.button": "Go to Hub",
    
    // Home - Roadshow
    "home.roadshow.valueProposition": "From inquiry to showcase in 2-3 weeks—we handle everything.",
    "home.roadshow.label": "Innovation Area On Demand",
    "home.roadshow.title": "Bring the Innovation Area to Your Event",
    "home.roadshow.description": "Cities, municipalities, and conferences can book our curated innovation showcase as a complete package",
    "home.roadshow.benefit1": "Curated selection of 5-6 education innovators",
    "home.roadshow.benefit2": "Professional setup and moderation",
    "home.roadshow.benefit3": "Customized to your focus areas",
    "home.roadshow.button": "Request a Roadshow",
    
    // Home - Logo Sections
    "home.logos.ministries.title": "Who We Work For",
    "home.logos.partners.title": "Our Partners and Associations",
    "home.logos.supporters.title": "Our Supporters",
    "home.logos.supporters.subtitle": "We are publicly and donation-funded. We thank our many supporters, individual donors, and especially our institutional sponsors:",
    
    // Partners Section
    "partners.statesTitle": "Our Addressees",
    "partners.statesSubtitle": "We collaborate with all 16 federal states and the BMBF to advance digital education",
    "partners.partnersTitle": "Associations & Partners",
    "partners.cta.title": "Become Part of Our Mission",
    "partners.cta.description": "Together we shape the future of digital education in Germany",
    "partners.cta.button": "Apply Now",
    
    // Home - CTA
    "home.cta.title": "Ready to Explore?",
    "home.cta.description": "Discover our events, browse innovations, or learn how to become part of the Innovation Area",
    "home.cta.viewEvents": "View Events",
    "home.cta.browseInnovations": "Browse Innovations",
    "home.cta.howToApply": "How to Apply",
    
    // Policy Page
    "policy.title": "Policy Overview",
    "policy.subtitle": "Our position papers and media contributions on the future of digital education",
    "policy.filter.all": "Show All",
    "policy.filter.position": "Position Papers",
    "policy.filter.press": "Press Appearances",
    "policy.type.position": "Position Paper",
    "policy.type.press": "Press Appearance",
    "policy.download": "Download",
    "policy.readMore": "Read More",
    "policy.noResults": "No entries found",
    "policy.cta.title": "Interested in Our Work?",
    "policy.cta.description": "Contact us for media inquiries, collaborations, or more information about our positions.",
    "policy.cta.button": "Get in Touch",
    
    // Events Page
    "events.title": "Innovation Area Events",
    "events.subtitle": "Experience the Innovation Area at our events across Germany, where education innovators and decision-makers come together in curated, moderated settings.",
    "events.section.open": "Open Registrations",
    "events.section.open.description": "Apply now for these events. Application deadline: January 31, 2026.",
    "events.section.future": "Future Events",
    "events.section.future.description": "These events are planned. Applications open May 1, 2026.",
    "events.section.past": "Past Events",
    "events.section.past.description": "Successful Innovation Area events from the past.",
    "events.status.open": "Applications Open",
    "events.status.comingSoon": "Coming Soon",
    "events.status.completed": "Completed",
    "events.round1": "Round 1",
    "events.round2": "Round 2",
    "events.deadline": "Deadline",
    "events.applyNow": "Apply Now",
    "events.learnMore": "Learn More",
    "events.viewRecap": "View Recap",
    "events.registrationOpens": "Registration Opens",
    "events.cta.title": "Want to participate?",
    "events.cta.description": "Showcase your innovation at our upcoming events and engage with educators, institutions, and decision-makers across Germany.",
    "events.sponsorAcknowledgment": "The 2026 Innovation Area roadmap is financially secured thanks to our sponsors: Cancom and Inventorio",
    
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
