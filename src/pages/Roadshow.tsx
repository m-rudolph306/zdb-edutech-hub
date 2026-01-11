import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Award, Briefcase, CheckCircle2, Building2, GraduationCap, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Roadshow = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inquiryId, setInquiryId] = useState("");
  const [eventDate, setEventDate] = useState<Date>();

  const [formData, setFormData] = useState({
    organizationType: "",
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    eventName: "",
    eventLocation: "",
    expectedAttendees: "",
    eventType: "",
    focusAreas: [] as string[],
    specialRequirements: "",
    budgetRange: "",
    howDidYouHear: "",
    agreeToContact: false,
  });

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: checked
        ? [...prev.focusAreas, area]
        : prev.focusAreas.filter((a) => a !== area),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToContact) {
      toast({
        title: t("roadshow.toast.agreementRequired"),
        description: t("roadshow.toast.agreementDescription"),
        variant: "destructive",
      });
      return;
    }

    if (!eventDate) {
      toast({
        title: t("roadshow.toast.dateRequired"),
        description: t("roadshow.toast.dateDescription"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Generate inquiry ID
    const id = `RW-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    setInquiryId(id);

    // Save to localStorage
    const inquiryData = {
      ...formData,
      eventDate: eventDate.toISOString(),
      id,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    localStorage.setItem(`roadshow_${id}`, JSON.stringify(inquiryData));

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowConfirmation(true);

    toast({
      title: t("roadshow.toast.submitted"),
      description: t("roadshow.toast.submittedDescription"),
    });

    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const focusAreas = [
    { id: "k12", labelKey: "roadshow.form.focusAreas.k12" },
    { id: "higher", labelKey: "roadshow.form.focusAreas.higher" },
    { id: "teacher", labelKey: "roadshow.form.focusAreas.teacher" },
    { id: "leadership", labelKey: "roadshow.form.focusAreas.leadership" },
    { id: "tech", labelKey: "roadshow.form.focusAreas.tech" },
    { id: "other", labelKey: "roadshow.form.focusAreas.other" },
  ];

  const howItWorks = [
    { step: 1, titleKey: "roadshow.how.step1.title", descKey: "roadshow.how.step1.description" },
    { step: 2, titleKey: "roadshow.how.step2.title", descKey: "roadshow.how.step2.description" },
    { step: 3, titleKey: "roadshow.how.step3.title", descKey: "roadshow.how.step3.description" },
    { step: 4, titleKey: "roadshow.how.step4.title", descKey: "roadshow.how.step4.description" },
  ];

  if (showConfirmation) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px]">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-secondary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t("roadshow.confirmation.title")}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {t("roadshow.confirmation.description")}
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">{t("roadshow.confirmation.inquiryId")}</p>
              <p className="text-2xl font-bold text-primary">{inquiryId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/")} variant="outline">
                {t("roadshow.confirmation.returnHome")}
              </Button>
              <Button onClick={() => navigate("/events")} className="bg-secondary hover:bg-secondary/90">
                {t("roadshow.confirmation.viewEvents")}
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            {t("roadshow.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-100">
            {t("roadshow.hero.subtitle")}
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg hover:scale-105 transition-all animate-fade-in animate-delay-200"
          >
            {t("roadshow.hero.button")}
          </Button>
        </div>
      </section>

      {/* What is Roadshow Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
            {t("roadshow.what.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            {t("roadshow.what.description")}
          </p>
        </div>
      </section>

      {/* Three Benefits */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t("roadshow.why.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{t("roadshow.why.curated.title")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.why.curated.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{t("roadshow.why.professional.title")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.why.professional.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{t("roadshow.why.impact.title")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.why.impact.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t("roadshow.who.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">{t("roadshow.who.cities.title")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.who.cities.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Users className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">{t("roadshow.who.conferences.title")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.who.conferences.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Briefcase className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">{t("roadshow.who.fairs.title")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.who.fairs.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t("roadshow.how.title")}
          </h2>
          <div className="space-y-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-12 md:py-20 px-4 md:px-6 bg-background scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                {t("roadshow.form.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Type */}
                <div className="space-y-2">
                  <Label htmlFor="organizationType">{t("roadshow.form.orgType")} *</Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("roadshow.form.orgType.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city">{t("roadshow.form.orgType.city")}</SelectItem>
                      <SelectItem value="conference">{t("roadshow.form.orgType.conference")}</SelectItem>
                      <SelectItem value="fair">{t("roadshow.form.orgType.fair")}</SelectItem>
                      <SelectItem value="district">{t("roadshow.form.orgType.district")}</SelectItem>
                      <SelectItem value="other">{t("roadshow.form.orgType.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizationName">{t("roadshow.form.orgName")} *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">{t("roadshow.form.contactName")} *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("roadshow.form.email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("roadshow.form.phone")} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Event Details */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">{t("roadshow.form.eventDetails")}</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">{t("roadshow.form.eventName")} *</Label>
                      <Input
                        id="eventName"
                        value={formData.eventName}
                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t("roadshow.form.eventDate")} *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !eventDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {eventDate ? format(eventDate, "PPP") : <span>{t("roadshow.form.eventDate.placeholder")}</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={eventDate}
                            onSelect={setEventDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventLocation">{t("roadshow.form.eventLocation")} *</Label>
                      <Input
                        id="eventLocation"
                        value={formData.eventLocation}
                        onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                        placeholder={t("roadshow.form.eventLocation.placeholder")}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="expectedAttendees">{t("roadshow.form.expectedAttendees")}</Label>
                        <Input
                          id="expectedAttendees"
                          type="number"
                          value={formData.expectedAttendees}
                          onChange={(e) => setFormData({ ...formData, expectedAttendees: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventType">{t("roadshow.form.eventType")} *</Label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("roadshow.form.eventType.placeholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference">{t("roadshow.form.eventType.conference")}</SelectItem>
                            <SelectItem value="fair">{t("roadshow.form.eventType.fair")}</SelectItem>
                            <SelectItem value="municipal">{t("roadshow.form.eventType.municipal")}</SelectItem>
                            <SelectItem value="other">{t("roadshow.form.eventType.other")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">{t("roadshow.form.focusAreas")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("roadshow.form.focusAreas.hint")}</p>
                  <div className="space-y-3">
                    {focusAreas.map((area) => (
                      <div key={area.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={area.id}
                          checked={formData.focusAreas.includes(area.id)}
                          onCheckedChange={(checked) => handleFocusAreaChange(area.id, checked as boolean)}
                        />
                        <label htmlFor={area.id} className="text-sm cursor-pointer">
                          {t(area.labelKey)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">{t("roadshow.form.specialRequirements")}</Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    placeholder={t("roadshow.form.specialRequirements.placeholder")}
                    rows={4}
                  />
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="budgetRange">{t("roadshow.form.budget")}</Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("roadshow.form.budget.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under5k">{t("roadshow.form.budget.under5k")}</SelectItem>
                      <SelectItem value="5k-10k">{t("roadshow.form.budget.5k10k")}</SelectItem>
                      <SelectItem value="10k-20k">{t("roadshow.form.budget.10k20k")}</SelectItem>
                      <SelectItem value="over20k">{t("roadshow.form.budget.over20k")}</SelectItem>
                      <SelectItem value="discuss">{t("roadshow.form.budget.discuss")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* How Did You Hear */}
                <div className="space-y-2">
                  <Label htmlFor="howDidYouHear">{t("roadshow.form.howDidYouHear")}</Label>
                  <Input
                    id="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                  />
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="agreeToContact"
                    checked={formData.agreeToContact}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToContact: checked as boolean })}
                    required
                  />
                  <label htmlFor="agreeToContact" className="text-sm cursor-pointer">
                    {t("roadshow.form.agreeToContact")} *
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("roadshow.form.submitting") : t("roadshow.form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t("roadshow.faq.title")}
          </h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">{t("roadshow.faq.q1")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.faq.a1")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">{t("roadshow.faq.q2")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.faq.a2")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">{t("roadshow.faq.q3")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.faq.a3")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">{t("roadshow.faq.q4")}</h3>
                <p className="text-muted-foreground">
                  {t("roadshow.faq.a4")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roadshow;
