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
    "nav.innovations": "Innovationen",
    "nav.howToApply": "So bewerben",
    
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
    "partners.statesTitle": "Für wen wir arbeiten",
    "partners.statesSubtitle": "Wir arbeiten mit allen 16 Bundesländern und dem BMBF zusammen, um digitale Bildung voranzutreiben",
    "partners.partnersTitle": "Unsere Partner und Verbände",
    "partners.sponsorsTitle": "Unsere Unterstützer",
    "partners.sponsorsSubtitle": "Wir sind öffentlich und spendenfinanziert. Wir bedanken uns bei zahlreichen Unterstützern, vielen Einzelspendern und insbesondere bei unseren institutionellen Förderern:",
    "partners.mainSponsor": "Hauptsponsor",
    
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
    "footer.aboutTitle": "Über ZDB Innovation Area",
    
    // Roadshow Page
    "roadshow.hero.title": "Innovation Area On Demand",
    "roadshow.hero.subtitle": "Bringen Sie Deutschlands führende Bildungsinnovationsschau zu Ihrer Veranstaltung",
    "roadshow.hero.button": "Anfrage senden",
    "roadshow.what.title": "Was ist Roadshow on Demand?",
    "roadshow.what.description": "Städte, Kommunen, Bildungskonferenzen und Messen können die Innovation Area als Komplettpaket buchen. Wir bringen unsere kuratierte Auswahl an Bildungsinnovatoren direkt zu Ihrer Veranstaltung – inklusive professioneller Präsentation und Moderation.",
    "roadshow.why.title": "Warum Innovation Area Roadshow?",
    "roadshow.why.curated.title": "Kuratierte Auswahl",
    "roadshow.why.curated.description": "Wir wählen 5-6 passende Innovatoren speziell für Ihr Publikum und Ihren Veranstaltungsfokus aus",
    "roadshow.why.professional.title": "Professionelle Durchführung",
    "roadshow.why.professional.description": "Komplette Organisation, Aufbau und Moderation inklusive – wir kümmern uns um alles",
    "roadshow.why.impact.title": "Policy Impact",
    "roadshow.why.impact.description": "Bringen Sie Ihre Stakeholder mit geprüften, forschungsbasierten Bildungslösungen zusammen",
    "roadshow.who.title": "Für wen ist das?",
    "roadshow.who.cities.title": "Städte & Kommunen",
    "roadshow.who.cities.description": "Bringen Sie Innovation in lokale Bildungsinitiativen und Politikdiskussionen",
    "roadshow.who.conferences.title": "Bildungskonferenzen",
    "roadshow.who.conferences.description": "Erweitern Sie Ihre Veranstaltung mit kuratierter Innovationsschau und Expertenmoderation",
    "roadshow.who.fairs.title": "Messen",
    "roadshow.who.fairs.description": "Fügen Sie Premium-Innovationsinhalte zu Ihrem Ausstellungsprogramm hinzu",
    "roadshow.how.title": "So funktioniert es",
    "roadshow.how.step1.title": "Anfrage senden",
    "roadshow.how.step1.description": "Füllen Sie unser Formular mit Ihren Veranstaltungsdetails und Anforderungen aus",
    "roadshow.how.step2.title": "Beratungsgespräch",
    "roadshow.how.step2.description": "Wir besprechen Ihre Ziele und Ihr Publikum in einem Beratungsgespräch",
    "roadshow.how.step3.title": "Kuration",
    "roadshow.how.step3.description": "Wir wählen und bereiten die perfekten Innovatoren für Ihre Veranstaltung vor",
    "roadshow.how.step4.title": "Ihre Veranstaltung",
    "roadshow.how.step4.description": "Die Innovation Area erwacht an Ihrem Veranstaltungsort zum Leben – mit voller Unterstützung",
    "roadshow.form.title": "Innovation Area für Ihre Veranstaltung anfragen",
    "roadshow.form.orgType": "Organisationstyp",
    "roadshow.form.orgType.placeholder": "Organisationstyp auswählen",
    "roadshow.form.orgType.city": "Stadt/Kommune",
    "roadshow.form.orgType.conference": "Bildungskonferenz",
    "roadshow.form.orgType.fair": "Messe",
    "roadshow.form.orgType.district": "Schulbezirk",
    "roadshow.form.orgType.other": "Andere",
    "roadshow.form.orgName": "Organisationsname",
    "roadshow.form.contactName": "Ansprechpartner",
    "roadshow.form.email": "E-Mail",
    "roadshow.form.phone": "Telefon",
    "roadshow.form.eventDetails": "Veranstaltungsdetails",
    "roadshow.form.eventName": "Veranstaltungsname",
    "roadshow.form.eventDate": "Veranstaltungsdatum",
    "roadshow.form.eventDate.placeholder": "Datum auswählen",
    "roadshow.form.eventLocation": "Veranstaltungsort",
    "roadshow.form.eventLocation.placeholder": "Stadt, Veranstaltungsort",
    "roadshow.form.expectedAttendees": "Erwartete Teilnehmerzahl",
    "roadshow.form.eventType": "Veranstaltungsart",
    "roadshow.form.eventType.placeholder": "Veranstaltungsart auswählen",
    "roadshow.form.eventType.conference": "Konferenz",
    "roadshow.form.eventType.fair": "Messe",
    "roadshow.form.eventType.municipal": "Kommunale Veranstaltung",
    "roadshow.form.eventType.other": "Andere",
    "roadshow.form.focusAreas": "Schwerpunkte",
    "roadshow.form.focusAreas.hint": "Alle zutreffenden auswählen",
    "roadshow.form.focusAreas.k12": "Schulbildung (K-12)",
    "roadshow.form.focusAreas.higher": "Hochschulbildung",
    "roadshow.form.focusAreas.teacher": "Lehrerausbildung",
    "roadshow.form.focusAreas.leadership": "Bildungsführung",
    "roadshow.form.focusAreas.tech": "Technologieintegration",
    "roadshow.form.focusAreas.other": "Andere",
    "roadshow.form.specialRequirements": "Besondere Anforderungen",
    "roadshow.form.specialRequirements.placeholder": "Erzählen Sie uns von Ihrer Veranstaltung und was Sie suchen",
    "roadshow.form.budget": "Budgetrahmen (Optional)",
    "roadshow.form.budget.placeholder": "Budgetrahmen auswählen",
    "roadshow.form.budget.under5k": "Unter 5.000 €",
    "roadshow.form.budget.5k10k": "5.000 € - 10.000 €",
    "roadshow.form.budget.10k20k": "10.000 € - 20.000 €",
    "roadshow.form.budget.over20k": "Über 20.000 €",
    "roadshow.form.budget.discuss": "Zu besprechen",
    "roadshow.form.howDidYouHear": "Wie haben Sie von uns erfahren? (Optional)",
    "roadshow.form.agreeToContact": "Ich stimme zu, von ZDB bezüglich dieser Anfrage kontaktiert zu werden",
    "roadshow.form.submit": "Anfrage senden",
    "roadshow.form.submitting": "Wird gesendet...",
    "roadshow.confirmation.title": "Vielen Dank für Ihre Anfrage!",
    "roadshow.confirmation.description": "Wir werden Ihre Anfrage prüfen und Sie innerhalb von 2-3 Werktagen kontaktieren",
    "roadshow.confirmation.inquiryId": "Ihre Anfrage-ID",
    "roadshow.confirmation.returnHome": "Zurück zur Startseite",
    "roadshow.confirmation.viewEvents": "Events ansehen",
    "roadshow.faq.title": "Häufig gestellte Fragen",
    "roadshow.faq.q1": "Wie weit im Voraus sollten wir buchen?",
    "roadshow.faq.a1": "Wir empfehlen 3-6 Monate Vorlaufzeit für optimale Kuration und Vorbereitung.",
    "roadshow.faq.q2": "Können wir bestimmte Innovatoren auswählen?",
    "roadshow.faq.a2": "Wir freuen uns über Ihre Vorschläge und kuratieren basierend auf Ihren Schwerpunkten und Publikumsbedürfnissen.",
    "roadshow.faq.q3": "Was ist im Paket enthalten?",
    "roadshow.faq.a3": "Komplette Organisation, Startup-Auswahl, Aufbau, Moderation und Abbau – alles, was Sie für eine erfolgreiche Präsentation brauchen.",
    "roadshow.faq.q4": "Ist das auch international verfügbar?",
    "roadshow.faq.a4": "Derzeit konzentrieren wir uns auf Deutschland, sind aber offen für Gespräche über internationale Veranstaltungen.",
    "roadshow.toast.agreementRequired": "Zustimmung erforderlich",
    "roadshow.toast.agreementDescription": "Bitte stimmen Sie zu, bezüglich Ihrer Anfrage kontaktiert zu werden",
    "roadshow.toast.dateRequired": "Datum erforderlich",
    "roadshow.toast.dateDescription": "Bitte wählen Sie ein Veranstaltungsdatum",
    "roadshow.toast.submitted": "Anfrage gesendet!",
    "roadshow.toast.submittedDescription": "Wir kontaktieren Sie innerhalb von 2-3 Werktagen",
    
    // Innovations Page
    "innovations.title": "Alle Innovationen",
    "innovations.search": "Innovationen suchen...",
    "innovations.allCategories": "Alle Kategorien",
    "innovations.allRegions": "Alle Regionen",
    "innovations.allTechnologies": "Alle Technologien",
    "innovations.clearFilters": "Filter zurücksetzen",
    "innovations.showing": "Zeige",
    "innovations.innovation": "Innovation",
    "innovations.innovations": "Innovationen",
    "innovations.noResults": "Keine Innovationen gefunden. Versuchen Sie, Ihre Filter anzupassen.",
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
    "nav.digitalHub.about": "About the Hub",
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
    "nav.innovations": "Innovations",
    "nav.howToApply": "How to Apply",
    
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
    "partners.statesTitle": "Who We Work With",
    "partners.statesSubtitle": "We collaborate with all 16 federal states and the BMBF to advance digital education",
    "partners.partnersTitle": "Our Partners and Associations",
    "partners.sponsorsTitle": "Our Supporters",
    "partners.sponsorsSubtitle": "We are publicly and donation-funded. We thank numerous supporters, many individual donors, and especially our institutional sponsors:",
    "partners.mainSponsor": "Main Sponsor",
    
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
    "footer.aboutTitle": "About ZDB Innovation Area",
    
    // Roadshow Page
    "roadshow.hero.title": "Innovation Area On Demand",
    "roadshow.hero.subtitle": "Bring Germany's premier education innovation showcase to your event",
    "roadshow.hero.button": "Submit Inquiry",
    "roadshow.what.title": "What is Roadshow on Demand?",
    "roadshow.what.description": "Cities, municipalities, education conferences, and trade fairs can book the Innovation Area as a complete package. We bring our curated selection of education innovators directly to your event, complete with professional presentation and moderation.",
    "roadshow.why.title": "Why Choose Innovation Area Roadshow?",
    "roadshow.why.curated.title": "Curated Selection",
    "roadshow.why.curated.description": "We handpick 5-6 relevant innovators specifically for your audience and event focus",
    "roadshow.why.professional.title": "Professional Execution",
    "roadshow.why.professional.description": "Full organization, setup, and moderation included - we handle everything",
    "roadshow.why.impact.title": "Policy Impact",
    "roadshow.why.impact.description": "Bring your stakeholders together with vetted education solutions backed by research",
    "roadshow.who.title": "Who Is This For?",
    "roadshow.who.cities.title": "Cities & Municipalities",
    "roadshow.who.cities.description": "Bring innovation to local education initiatives and policy discussions",
    "roadshow.who.conferences.title": "Education Conferences",
    "roadshow.who.conferences.description": "Enhance your event with curated innovation showcase and expert moderation",
    "roadshow.who.fairs.title": "Trade Fairs",
    "roadshow.who.fairs.description": "Add premium innovation content to your exhibition program",
    "roadshow.how.title": "How It Works",
    "roadshow.how.step1.title": "Submit Inquiry",
    "roadshow.how.step1.description": "Fill out our form with your event details and requirements",
    "roadshow.how.step2.title": "Consultation Call",
    "roadshow.how.step2.description": "We'll discuss your goals and audience in a consultation call",
    "roadshow.how.step3.title": "Curation",
    "roadshow.how.step3.description": "We handpick and prepare the perfect innovators for your event",
    "roadshow.how.step4.title": "Your Event",
    "roadshow.how.step4.description": "Innovation Area comes to life at your venue with full support",
    "roadshow.form.title": "Request Innovation Area for Your Event",
    "roadshow.form.orgType": "Organization Type",
    "roadshow.form.orgType.placeholder": "Select organization type",
    "roadshow.form.orgType.city": "City/Municipality",
    "roadshow.form.orgType.conference": "Education Conference",
    "roadshow.form.orgType.fair": "Trade Fair",
    "roadshow.form.orgType.district": "School District",
    "roadshow.form.orgType.other": "Other",
    "roadshow.form.orgName": "Organization Name",
    "roadshow.form.contactName": "Contact Person Name",
    "roadshow.form.email": "Email",
    "roadshow.form.phone": "Phone",
    "roadshow.form.eventDetails": "Event Details",
    "roadshow.form.eventName": "Event Name",
    "roadshow.form.eventDate": "Event Date",
    "roadshow.form.eventDate.placeholder": "Pick a date",
    "roadshow.form.eventLocation": "Event Location",
    "roadshow.form.eventLocation.placeholder": "City, Venue",
    "roadshow.form.expectedAttendees": "Expected Attendees",
    "roadshow.form.eventType": "Event Type",
    "roadshow.form.eventType.placeholder": "Select event type",
    "roadshow.form.eventType.conference": "Conference",
    "roadshow.form.eventType.fair": "Fair",
    "roadshow.form.eventType.municipal": "Municipal Event",
    "roadshow.form.eventType.other": "Other",
    "roadshow.form.focusAreas": "Focus Areas",
    "roadshow.form.focusAreas.hint": "Select all that apply",
    "roadshow.form.focusAreas.k12": "K-12 Education",
    "roadshow.form.focusAreas.higher": "Higher Education",
    "roadshow.form.focusAreas.teacher": "Teacher Training",
    "roadshow.form.focusAreas.leadership": "Educational Leadership",
    "roadshow.form.focusAreas.tech": "Technology Integration",
    "roadshow.form.focusAreas.other": "Other",
    "roadshow.form.specialRequirements": "Special Requirements",
    "roadshow.form.specialRequirements.placeholder": "Tell us about your event and what you're looking for",
    "roadshow.form.budget": "Budget Range (Optional)",
    "roadshow.form.budget.placeholder": "Select budget range",
    "roadshow.form.budget.under5k": "Under €5,000",
    "roadshow.form.budget.5k10k": "€5,000 - €10,000",
    "roadshow.form.budget.10k20k": "€10,000 - €20,000",
    "roadshow.form.budget.over20k": "Over €20,000",
    "roadshow.form.budget.discuss": "To be discussed",
    "roadshow.form.howDidYouHear": "How did you hear about us? (Optional)",
    "roadshow.form.agreeToContact": "I agree to be contacted by ZDB regarding this inquiry",
    "roadshow.form.submit": "Submit Inquiry",
    "roadshow.form.submitting": "Submitting...",
    "roadshow.confirmation.title": "Thank You for Your Inquiry!",
    "roadshow.confirmation.description": "We'll review your request and contact you within 2-3 business days",
    "roadshow.confirmation.inquiryId": "Your Inquiry ID",
    "roadshow.confirmation.returnHome": "Return to Homepage",
    "roadshow.confirmation.viewEvents": "View Events",
    "roadshow.faq.title": "Frequently Asked Questions",
    "roadshow.faq.q1": "How far in advance should we book?",
    "roadshow.faq.a1": "We recommend 3-6 months lead time for optimal curation and preparation.",
    "roadshow.faq.q2": "Can we choose specific innovators?",
    "roadshow.faq.a2": "We welcome your input and will curate based on your focus areas and audience needs.",
    "roadshow.faq.q3": "What's included in the package?",
    "roadshow.faq.a3": "Full organization, startup selection, setup, moderation, and teardown - everything you need for a successful showcase.",
    "roadshow.faq.q4": "Is this available internationally?",
    "roadshow.faq.a4": "Currently focused on Germany, but we're open to discussions for international events.",
    "roadshow.toast.agreementRequired": "Agreement Required",
    "roadshow.toast.agreementDescription": "Please agree to be contacted regarding your inquiry",
    "roadshow.toast.dateRequired": "Date Required",
    "roadshow.toast.dateDescription": "Please select an event date",
    "roadshow.toast.submitted": "Inquiry Submitted!",
    "roadshow.toast.submittedDescription": "We'll contact you within 2-3 business days",
    
    // Innovations Page
    "innovations.title": "All Innovations",
    "innovations.search": "Search innovations...",
    "innovations.allCategories": "All Categories",
    "innovations.allRegions": "All Regions",
    "innovations.allTechnologies": "All Technologies",
    "innovations.clearFilters": "Clear Filters",
    "innovations.showing": "Showing",
    "innovations.innovation": "innovation",
    "innovations.innovations": "innovations",
    "innovations.noResults": "No innovations found. Try adjusting your filters.",
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
